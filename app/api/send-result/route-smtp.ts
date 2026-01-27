import { NextRequest, NextResponse } from "next/server";
import { sendDiagnosticEmail } from "@/lib/email";
import { DiagnosticResult, UserAnswers } from "@/types/diagnostic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      phone,
      acceptCallback,
      result,
    }: {
      email: string;
      phone?: string;
      acceptCallback: boolean;
      result: DiagnosticResult;
      answers: UserAnswers;
    } = body;

    const info = await sendDiagnosticEmail({
      email,
      phone,
      acceptCallback,
      result,
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
