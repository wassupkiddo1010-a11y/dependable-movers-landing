"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BlockReveal,
  FieldError,
  innerFieldClass,
  innerTextareaClass,
} from "@/components/page-blocks/block-primitives";
import {
  SMS_ACCOUNT_CONSENT_LABEL,
  SMS_MARKETING_CONSENT_LABEL,
} from "@/lib/quote-form-constants";
import { submitContactForm, type ContactFormValues } from "@/lib/quote-submit";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

const EMPTY: ContactFormValues = {
  full_name: "",
  phone: "",
  email: "",
  message: "",
  sms_marketing_consent: false,
  sms_account_consent: false,
};

export function ContactFormBlock() {
  const [form, setForm] = useState<ContactFormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function setField<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setStatus("idle");
  }

  function validate() {
    const next: Partial<Record<keyof ContactFormValues, string>> = {};
    if (!form.full_name.trim()) next.full_name = "This field is required.";
    if (form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) next.message = "This field is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result = await submitContactForm(form);
    setSubmitting(false);
    if (result.ok) {
      setStatus("success");
      setStatusMessage("Thank you — we'll get back to you shortly.");
      setForm(EMPTY);
      return;
    }
    setStatus("error");
    setStatusMessage(result.error);
  }

  return (
    <BlockReveal className="mx-auto w-full max-w-2xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.2)] md:p-8">
          <h2 className="font-[family-name:var(--font-barlow-condensed)] text-3xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#0F172A]">
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="contact-full-name" className="sr-only">
                Full Name
              </label>
              <input
                id="contact-full-name"
                type="text"
                required
                placeholder="Full Name *"
                value={form.full_name}
                onChange={(event) => setField("full_name", event.target.value)}
                className={cn(innerFieldClass, errors.full_name && "border-[#ED7D22]")}
              />
              <FieldError message={errors.full_name} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  placeholder="Phone *"
                  value={form.phone}
                  onChange={(event) => setField("phone", event.target.value)}
                  className={cn(innerFieldClass, errors.phone && "border-[#ED7D22]")}
                />
                <FieldError message={errors.phone} />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="Email *"
                  value={form.email}
                  onChange={(event) => setField("email", event.target.value)}
                  className={cn(innerFieldClass, errors.email && "border-[#ED7D22]")}
                />
                <FieldError message={errors.email} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                placeholder="How can we help? *"
                value={form.message}
                onChange={(event) => setField("message", event.target.value)}
                className={cn(innerTextareaClass, errors.message && "border-[#ED7D22]")}
              />
              <FieldError message={errors.message} />
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
                <input
                  type="checkbox"
                  checked={form.sms_marketing_consent}
                  onChange={(event) =>
                    setField("sms_marketing_consent", event.target.checked)
                  }
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#ED7D22] focus:ring-[#ED7D22]"
                />
                {SMS_MARKETING_CONSENT_LABEL}
              </label>
              <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
                <input
                  type="checkbox"
                  checked={form.sms_account_consent}
                  onChange={(event) =>
                    setField("sms_account_consent", event.target.checked)
                  }
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#ED7D22] focus:ring-[#ED7D22]"
                />
                {SMS_ACCOUNT_CONSENT_LABEL}
              </label>
            </div>

            <p className="text-xs text-slate-500">
              By submitting, you agree to our{" "}
              <Link href={ROUTES.privacyPolicy} className="underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href={ROUTES.termsAndConditions} className="underline">
                Terms & Conditions
              </Link>
              .
            </p>

            {status === "success" ? (
              <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                {statusMessage}
              </p>
            ) : null}
            {status === "error" ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                {statusMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="h-[52px] w-full rounded-2xl bg-[#ED7D22] font-[family-name:var(--font-barlow-condensed)] text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#D66A15] disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </form>
      </div>
    </BlockReveal>
  );
}
