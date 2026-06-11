import { NextResponse } from "next/server";
import {
  buildQuotePayload,
  validateQuotePayload,
} from "@/lib/submissions/quote-payload";
import { submitQuoteLead } from "@/lib/submissions/submit-quote";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const payload = buildQuotePayload({
      movingFrom: String(body.moving_from ?? body.movingFrom ?? ""),
      movingTo: String(body.moving_to ?? body.movingTo ?? ""),
      moveDate: String(body.move_date ?? body.moveDate ?? ""),
      moveSize: String(body.move_size ?? body.moveSize ?? ""),
      moveType: String(body.move_type ?? body.moveType ?? ""),
      firstName: String(body.first_name ?? body.firstName ?? ""),
      lastName: String(body.last_name ?? body.lastName ?? ""),
      email: String(body.email ?? ""),
      phone: String(body.phone ?? ""),
      smsMarketingConsent: Boolean(
        body.sms_marketing_consent ?? body.smsMarketingConsent
      ),
      smsAccountConsent: Boolean(
        body.sms_account_consent ?? body.smsAccountConsent
      ),
      contactConsent: Boolean(body.contact_consent ?? body.contactConsent),
    });

    const validationError = validateQuotePayload(payload);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const result = await submitQuoteLead(payload);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 503 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
