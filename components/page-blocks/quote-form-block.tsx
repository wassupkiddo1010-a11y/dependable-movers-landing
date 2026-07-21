"use client";

import { useState } from "react";
import Link from "next/link";
import { BlockReveal, FieldError, innerFieldClass, innerSelectClass } from "@/components/page-blocks/block-primitives";
import { LocationAutocompleteField } from "@/components/page-blocks/location-autocomplete-field";
import {
  MOVE_SIZE_OPTIONS,
  MOVE_TYPE_OPTIONS,
  QUOTE_CONTACT_CONSENT_LABEL,
  SMS_ACCOUNT_CONSENT_LABEL,
  SMS_MARKETING_CONSENT_LABEL,
} from "@/lib/quote-form-constants";
import { isKnownCityLabel } from "@/lib/city-autocomplete";
import { submitQuoteForm, type QuoteFormValues } from "@/lib/quote-submit";
import { ROUTES } from "@/lib/routes";
import { SITE_PHONE, SITE_PHONE_HREF } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const EMPTY_FORM: QuoteFormValues = {
  moving_from: "",
  moving_to: "",
  move_date: "",
  move_size: "",
  move_type: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  sms_marketing_consent: false,
  sms_account_consent: false,
  contact_consent: false,
};

const selectChevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230F172A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")";

export function QuoteFormBlock() {
  const [form, setForm] = useState<QuoteFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function setField<K extends keyof QuoteFormValues>(
    key: K,
    value: QuoteFormValues[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setStatus("idle");
  }

  function validate(): boolean {
    const next: Partial<Record<keyof QuoteFormValues, string>> = {};
    if (!form.moving_from.trim()) {
      next.moving_from = "This field is required.";
    } else if (!isKnownCityLabel(form.moving_from)) {
      next.moving_from = "Please select a location from the dropdown.";
    }
    if (!form.moving_to.trim()) {
      next.moving_to = "This field is required.";
    } else if (!isKnownCityLabel(form.moving_to)) {
      next.moving_to = "Please select a location from the dropdown.";
    }
    if (!form.move_date) next.move_date = "This field is required.";
    if (!form.move_size) next.move_size = "This field is required.";
    if (!form.move_type) next.move_type = "This field is required.";
    if (!form.first_name.trim()) next.first_name = "This field is required.";
    if (!form.last_name.trim()) next.last_name = "This field is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (form.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Please enter a valid phone number.";
    }
    if (!form.sms_marketing_consent) {
      next.sms_marketing_consent = "This consent is required.";
    }
    if (!form.sms_account_consent) {
      next.sms_account_consent = "This consent is required.";
    }
    if (!form.contact_consent) {
      next.contact_consent = "This consent is required.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus("idle");

    const result = await submitQuoteForm(form);
    setSubmitting(false);

    if (result.ok) {
      setStatus("success");
      setStatusMessage("Thank you — we'll be in touch shortly.");
      setForm(EMPTY_FORM);
      return;
    }

    setStatus("error");
    setStatusMessage(result.error);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <BlockReveal className="mx-auto w-full max-w-4xl">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)] md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#ED7D22]/10 blur-3xl"
        />
        <h2 className="text-center font-[family-name:var(--font-barlow-condensed)] text-3xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#0F172A] md:text-4xl">
          Request a Quote
        </h2>

        <form onSubmit={handleSubmit} className="relative mt-8 space-y-4" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <LocationAutocompleteField
              id="quote-moving-from"
              label="From Zip / City"
              value={form.moving_from}
              onChange={(value) => setField("moving_from", value)}
              placeholder="From Zip / City *"
              error={errors.moving_from}
              required
            />
            <LocationAutocompleteField
              id="quote-moving-to"
              label="To Zip / City"
              value={form.moving_to}
              onChange={(value) => setField("moving_to", value)}
              placeholder="To Zip / City *"
              error={errors.moving_to}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="quote-move-size" className="sr-only">
                Home Size
              </label>
              <select
                id="quote-move-size"
                required
                value={form.move_size}
                onChange={(event) => setField("move_size", event.target.value)}
                className={cn(innerSelectClass, errors.move_size && "border-[#ED7D22]")}
                style={{ backgroundImage: selectChevron }}
              >
                <option value="" disabled>
                  Home Size *
                </option>
                {MOVE_SIZE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError message={errors.move_size} />
            </div>
            <div>
              <label htmlFor="quote-move-type" className="sr-only">
                Move Type
              </label>
              <select
                id="quote-move-type"
                required
                value={form.move_type}
                onChange={(event) => setField("move_type", event.target.value)}
                className={cn(innerSelectClass, errors.move_type && "border-[#ED7D22]")}
                style={{ backgroundImage: selectChevron }}
              >
                <option value="" disabled>
                  Move Type *
                </option>
                {MOVE_TYPE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError message={errors.move_type} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="quote-move-date" className="sr-only">
                Move Date
              </label>
              <input
                id="quote-move-date"
                type="date"
                required
                min={today}
                value={form.move_date}
                onChange={(event) => setField("move_date", event.target.value)}
                className={cn(innerFieldClass, errors.move_date && "border-[#ED7D22]")}
              />
              <FieldError message={errors.move_date} />
            </div>
            <div>
              <label htmlFor="quote-first-name" className="sr-only">
                First Name
              </label>
              <input
                id="quote-first-name"
                type="text"
                required
                placeholder="First Name *"
                value={form.first_name}
                onChange={(event) => setField("first_name", event.target.value)}
                className={cn(innerFieldClass, errors.first_name && "border-[#ED7D22]")}
              />
              <FieldError message={errors.first_name} />
            </div>
            <div>
              <label htmlFor="quote-last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="quote-last-name"
                type="text"
                required
                placeholder="Last Name *"
                value={form.last_name}
                onChange={(event) => setField("last_name", event.target.value)}
                className={cn(innerFieldClass, errors.last_name && "border-[#ED7D22]")}
              />
              <FieldError message={errors.last_name} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="quote-email" className="sr-only">
                Email
              </label>
              <input
                id="quote-email"
                type="email"
                required
                placeholder="Email *"
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
                className={cn(innerFieldClass, errors.email && "border-[#ED7D22]")}
              />
              <FieldError message={errors.email} />
            </div>
            <div>
              <label htmlFor="quote-phone" className="sr-only">
                Phone
              </label>
              <input
                id="quote-phone"
                type="tel"
                required
                placeholder="Phone *"
                value={form.phone}
                onChange={(event) => setField("phone", event.target.value)}
                className={cn(innerFieldClass, errors.phone && "border-[#ED7D22]")}
              />
              <FieldError message={errors.phone} />
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
                <input
                  type="checkbox"
                  required
                  checked={form.sms_marketing_consent}
                  onChange={(event) =>
                    setField("sms_marketing_consent", event.target.checked)
                  }
                  className={cn(
                    "mt-0.5 h-4 w-4 rounded border-slate-300 text-[#ED7D22] focus:ring-[#ED7D22]",
                    errors.sms_marketing_consent && "border-[#ED7D22]"
                  )}
                />
                {SMS_MARKETING_CONSENT_LABEL}
              </label>
              <FieldError message={errors.sms_marketing_consent} />
            </div>
            <div>
              <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
                <input
                  type="checkbox"
                  required
                  checked={form.sms_account_consent}
                  onChange={(event) =>
                    setField("sms_account_consent", event.target.checked)
                  }
                  className={cn(
                    "mt-0.5 h-4 w-4 rounded border-slate-300 text-[#ED7D22] focus:ring-[#ED7D22]",
                    errors.sms_account_consent && "border-[#ED7D22]"
                  )}
                />
                {SMS_ACCOUNT_CONSENT_LABEL}
              </label>
              <FieldError message={errors.sms_account_consent} />
            </div>
            <div>
              <label className="flex items-start gap-3 text-xs leading-relaxed text-slate-600">
                <input
                  type="checkbox"
                  required
                  checked={form.contact_consent}
                  onChange={(event) =>
                    setField("contact_consent", event.target.checked)
                  }
                  className={cn(
                    "mt-0.5 h-4 w-4 rounded border-slate-300 text-[#ED7D22] focus:ring-[#ED7D22]",
                    errors.contact_consent && "border-[#ED7D22]"
                  )}
                />
                {QUOTE_CONTACT_CONSENT_LABEL}
              </label>
              <FieldError message={errors.contact_consent} />
            </div>
          </div>

          <p className="text-center text-xs leading-relaxed text-slate-500">
            *We do not share your information. If you do not consent to texts, call{" "}
            <a href={SITE_PHONE_HREF} className="underline">
              {SITE_PHONE}
            </a>
            . View our{" "}
            <Link href={ROUTES.privacyPolicy} className="underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href={ROUTES.termsAndConditions} className="underline">
              Terms
            </Link>
            .
          </p>

          {status === "success" ? (
            <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-800">
              {statusMessage}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-800">
              {statusMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="h-[52px] w-full rounded-2xl bg-[#ED7D22] font-[family-name:var(--font-barlow-condensed)] text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#D66A15] disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Get a Quote"}
          </button>
        </form>
      </div>
    </BlockReveal>
  );
}
