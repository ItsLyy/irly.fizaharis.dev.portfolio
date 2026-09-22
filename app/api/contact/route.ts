import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendWhatsAppNotification } from "@/app/_lib/whatsapp";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name needs at least 2 characters")
    .max(50, "Name needs to be less than 50 characters"),
  email: z.string().email("Please provide a valid email address"),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(1000, "Message needs to be less than 1000 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = contactSchema.safeParse(body);

    if (!parseResult.success) {
      const firstError =
        parseResult.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        { error: firstError, details: parseResult.error.issues },
        { status: 400 },
      );
    }

    const { name, email, message } = parseResult.data;

    // Send notification to WhatsApp Bot
    const whatsappResult = await sendWhatsAppNotification({
      name,
      email,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Contact message processed successfully",
      whatsapp: whatsappResult,
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "Internal server error processing contact message" },
      { status: 500 },
    );
  }
}
