import { NextResponse } from "next/server";
import { submitQuoteLead } from "@/lib/submissions/submit-quote";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = String(body.full_name ?? body.fullName ?? "").trim();
    const parts = fullName.split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ") || "Contact";
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    const payload = {
      moving_from: "Contact form inquiry",
      moving_to: "N/A",
      move_date: "",
      move_size: message.slice(0, 120),
      move_type: "Contact",
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      sms_marketing_consent: Boolean(
        body.sms_marketing_consent ?? body.smsMarketingConsent
      ),
      sms_account_consent: Boolean(
        body.sms_account_consent ?? body.smsAccountConsent
      ),
      source: "dependablemovers.com-contact",
      submitted_at: new Date().toISOString(),
    };

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
