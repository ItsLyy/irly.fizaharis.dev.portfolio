#!/usr/bin/env node

import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

// Load environment variables from .env.local first, fallback to .env
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config();
}

const provider = (process.env.WHATSAPP_PROVIDER || "callmebot").toLowerCase();
const phone = process.env.WHATSAPP_PHONE || process.env.WHATSAPP_NUMBER || "";
const callMeBotKey =
  process.env.WHATSAPP_BOT_API_KEY || process.env.CALLMEBOT_API_KEY || "";
const fonnteToken = process.env.FONNTE_TOKEN || "";

console.log("\n==================================================");
console.log("  📲 Portfolio WhatsApp Notification Bot Tester");
console.log("==================================================\n");

function normalizePhoneNumber(rawPhone) {
  let cleaned = rawPhone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("08")) {
    cleaned = `628${cleaned.slice(2)}`;
  }
  return cleaned;
}

if (!phone) {
  console.error("❌ ERROR: WHATSAPP_PHONE is not set in .env.local!\n");
  console.log("👉 How to set up CallMeBot (100% Free):");
  console.log("1. Add +34 623 78 95 95 to your phone contacts (CallMeBot).");
  console.log(
    "   Or open: https://wa.me/34623789595?text=I%20allow%20callmebot%20to%20send%20me%20messages",
  );
  console.log(
    '2. Send this exact message to the bot: "I allow callmebot to send me messages"',
  );
  console.log("3. The bot will immediately reply with your personal API Key.");
  console.log("4. Add the following to your .env.local file:");
  console.log(
    '   WHATSAPP_PHONE="628xxxxxxxxxx"   (your number with country code)',
  );
  console.log(
    '   WHATSAPP_BOT_API_KEY="xxxxxx"   (the API key from the bot)\n',
  );
  process.exit(1);
}

const cleanPhone = normalizePhoneNumber(phone);
console.log(`📡 Configured Provider: ${provider}`);
console.log(`📱 Destination Phone : +${cleanPhone}`);

const timestamp = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
}).format(new Date());

const testMessage = [
  "🔔 *Test Notification from Portfolio WhatsApp Bot!*",
  "",
  "👤 *Name:* Test Visitor",
  "📧 *Email:* test@fizaharis.dev",
  `⏰ *Time:* ${timestamp} WIB`,
  "",
  "💬 *Message Details:*",
  "Congratulations! Your WhatsApp notification bot is configured and working perfectly! 🎉",
  "",
  "───────────────",
  "Sent via Portfolio Contact Form Tester",
].join("\n");

async function run() {
  if (provider === "fonnte") {
    if (!fonnteToken) {
      console.error("❌ FONNTE_TOKEN is missing in .env.local");
      process.exit(1);
    }
    console.log("🚀 Sending test message via Fonnte...");
    try {
      const response = await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          Authorization: fonnteToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target: cleanPhone,
          message: testMessage,
        }),
      });
      const data = await response.json();
      if (data.status) {
        console.log("✅ SUCCESS! Message sent to your WhatsApp!");
      } else {
        console.error("❌ Fonnte Error:", data.reason || data);
      }
    } catch (err) {
      console.error("❌ Request failed:", err.message);
    }
    return;
  }

  // CallMeBot (Default)
  if (!callMeBotKey) {
    console.error("❌ ERROR: WHATSAPP_BOT_API_KEY is not set in .env.local!\n");
    console.log("👉 How to get your API Key in 30 seconds:");
    console.log("1. Add +34 623 78 95 95 to your phone contacts (CallMeBot).");
    console.log(
      "   Or open: https://wa.me/34623789595?text=I%20allow%20callmebot%20to%20send%20me%20messages",
    );
    console.log('2. Send message: "I allow callmebot to send me messages"');
    console.log("3. Copy the API Key replied by CallMeBot.");
    console.log('4. Add `WHATSAPP_BOT_API_KEY="your_api_key"` to .env.local\n');
    process.exit(1);
  }

  console.log("🚀 Sending test message via CallMeBot...");
  const targetPhone = `+${cleanPhone}`;
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(targetPhone)}&text=${encodeURIComponent(testMessage)}&apikey=${encodeURIComponent(callMeBotKey)}`;

  try {
    const response = await fetch(url, { method: "GET" });
    const text = await response.text();

    const isError =
      !response.ok ||
      text.toLowerCase().includes("invalid") ||
      text.toLowerCase().includes("color:red") ||
      text.toLowerCase().includes("not allowed");

    if (isError) {
      const cleanError = text.replace(/<[^>]*>/g, "").trim();
      console.error("❌ CallMeBot Error:", cleanError);
      console.log("\n💡 Troubleshooting Tips:");
      console.log(
        "1. Ensure you sent 'I allow callmebot to send me messages' to +34 623 78 95 95 first.",
      );
      console.log(
        "2. Ensure your phone number matches the number you messaged CallMeBot from.",
      );
      console.log("3. Double check the WHATSAPP_BOT_API_KEY in .env.local.");
    } else {
      console.log("✅ SUCCESS! Message sent to your WhatsApp!");
      console.log("📱 Check your WhatsApp notifications on your phone.");
    }
  } catch (err) {
    console.error("❌ Network request failed:", err.message);
  }
}

run();
