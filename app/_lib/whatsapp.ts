/**
 * Custom Modules / Types
 */

export interface WhatsAppNotificationPayload {
  name: string;
  email: string;
  message: string;
}

export interface WhatsAppNotificationResult {
  success: boolean;
  provider: "callmebot" | "fonnte" | "none";
  message?: string;
  error?: string;
}

/**
 * Clean and normalize phone number.
 * Strips whitespace, hyphens, and formats leading local 08xx into 628xx.
 */
export function normalizePhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("08")) {
    cleaned = `628${cleaned.slice(2)}`;
  }
  return cleaned;
}

/**
 * Format message for WhatsApp with clean Markdown bolding and emojis
 */
export function formatWhatsAppContactMessage(
  payload: WhatsAppNotificationPayload,
): string {
  const timestamp = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date());

  return [
    "🔔 *New Message from Portfolio Website!*",
    "",
    `👤 *Name:* ${payload.name}`,
    `📧 *Email:* ${payload.email}`,
    `⏰ *Time:* ${timestamp} WIB`,
    "",
    "💬 *Message Details:*",
    payload.message,
    "",
    "───────────────",
    "Sent via Portfolio Contact Form",
  ].join("\n");
}

/**
 * Send WhatsApp notification via CallMeBot API
 */
async function sendViaCallMeBot(
  phone: string,
  apiKey: string,
  text: string,
): Promise<WhatsAppNotificationResult> {
  const normalizedPhone = normalizePhoneNumber(phone);
  const targetPhone = `+${normalizedPhone}`;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(targetPhone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(10000),
    });

    const responseText = await response.text();

    const isError =
      !response.ok ||
      responseText.toLowerCase().includes("invalid") ||
      responseText.toLowerCase().includes("color:red") ||
      responseText.toLowerCase().includes("not allowed");

    if (isError) {
      const cleanError = responseText.replace(/<[^>]*>/g, "").trim();
      console.error("[WhatsApp CallMeBot Error]:", cleanError);
      return {
        success: false,
        provider: "callmebot",
        error: cleanError || "CallMeBot rejected the request",
      };
    }

    return {
      success: true,
      provider: "callmebot",
      message: "Notification sent via CallMeBot",
    };
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Network error contacting CallMeBot";
    console.error("[WhatsApp CallMeBot Network Error]:", errorMsg);
    return {
      success: false,
      provider: "callmebot",
      error: errorMsg,
    };
  }
}

/**
 * Send WhatsApp notification via Fonnte API
 */
async function sendViaFonnte(
  phone: string,
  token: string,
  text: string,
): Promise<WhatsAppNotificationResult> {
  const normalizedPhone = normalizePhoneNumber(phone);

  try {
    const response = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: normalizedPhone,
        message: text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    const data = (await response.json()) as {
      status?: boolean;
      reason?: string;
    };

    if (!response.ok || !data.status) {
      return {
        success: false,
        provider: "fonnte",
        error: data.reason || "Fonnte rejected the request",
      };
    }

    return {
      success: true,
      provider: "fonnte",
      message: "Notification sent via Fonnte",
    };
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? error.message
        : "Network error contacting Fonnte";
    console.error("[WhatsApp Fonnte Network Error]:", errorMsg);
    return {
      success: false,
      provider: "fonnte",
      error: errorMsg,
    };
  }
}

/**
 * Unified dispatcher to notify owner's WhatsApp
 */
export async function sendWhatsAppNotification(
  payload: WhatsAppNotificationPayload,
): Promise<WhatsAppNotificationResult> {
  const provider = (process.env.WHATSAPP_PROVIDER || "callmebot").toLowerCase();
  const phone = process.env.WHATSAPP_PHONE || process.env.WHATSAPP_NUMBER || "";
  const callMeBotKey =
    process.env.WHATSAPP_BOT_API_KEY || process.env.CALLMEBOT_API_KEY || "";
  const fonnteToken = process.env.FONNTE_TOKEN || "";

  if (!phone) {
    console.warn(
      "[WhatsApp Notify Skipped]: WHATSAPP_PHONE is not configured in .env.local",
    );
    return {
      success: false,
      provider: "none",
      message: "WHATSAPP_PHONE not set in environment",
    };
  }

  const messageText = formatWhatsAppContactMessage(payload);

  if (provider === "fonnte" && fonnteToken) {
    return sendViaFonnte(phone, fonnteToken, messageText);
  }

  if (callMeBotKey) {
    return sendViaCallMeBot(phone, callMeBotKey, messageText);
  }

  console.warn(
    "[WhatsApp Notify Skipped]: Neither WHATSAPP_BOT_API_KEY (CallMeBot) nor FONNTE_TOKEN is set in .env.local",
  );
  return {
    success: false,
    provider: "none",
    message: "No WhatsApp Bot API credentials set in environment",
  };
}
