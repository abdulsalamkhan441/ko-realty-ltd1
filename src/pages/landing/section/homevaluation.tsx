"use client";

import React, { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronDown,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { valuationConfig as CLIENT_CONFIG } from "../../../types/sitecontent";
import { CLIENT_RENEG_LIMIT } from "tls";

// ============================================================================
// TYPES & VALIDATION LOGIC
// ============================================================================
interface PropertyOption {
  label: string;
  value: string;
}

interface FormData {
  name: string;
  emailOrPhone: string;
  propertyType: string;
  address: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY_FORM: FormData = {
  name: "",
  emailOrPhone: "",
  propertyType: "Single Family Home",
  address: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d()+\-.\s]{7,}$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (data.name.trim().length < 2) {
    errors.name = "That name looks too short.";
  }

  const contact = data.emailOrPhone.trim();
  if (!contact) {
    errors.emailOrPhone = "Please enter a phone number or email.";
  } else if (!EMAIL_RE.test(contact) && !PHONE_RE.test(contact)) {
    errors.emailOrPhone = "Enter a valid email or phone number.";
  }

  if (!data.address.trim()) {
    errors.address = "Please enter the property address.";
  } else if (data.address.trim().length < 5) {
    errors.address = "Enter a full street address.";
  }

  return errors;
}

async function submitValuationRequest(_data: FormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("You appear to be offline. Check your connection and try again.");
  }
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function HomeValuationSection() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const idPrefix = useId();
  const fieldId = (name: keyof FormData) => `${idPrefix}-${name}`;

  const updateField = (name: keyof FormData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (touched[name]) {
        const fieldErrors = validate(updated);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors[name] }));
      }
      return updated;
    });
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    setTouched({ name: true, emailOrPhone: true, address: true, propertyType: true });

    const firstInvalidKey = Object.keys(fieldErrors)[0] as keyof FormData | undefined;
    if (firstInvalidKey) {
      const el = document.getElementById(fieldId(firstInvalidKey));
      el?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await submitValuationRequest(formData);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setSubmitError(null);
    setSubmitted(false);
  };

  const inputBaseClasses =
    "w-full px-4 py-3.5 rounded-xl bg-white/70 text-brand-dark placeholder:text-brand-dark/40 font-sans text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed";

  const fieldClasses = (name: keyof FormData) =>
    `${inputBaseClasses} ${
      touched[name] && errors[name]
        ? "border border-red-600/60 focus:ring-red-600/40"
        : "border border-brand-dark/10 focus:ring-brand-dark/40"
    }`;

  return (
    <section id="valuation" className="relative w-full bg-brand-dark text-bg-ivory py-6 md:py-10 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="w-full bg-[#121619] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN: Section Overview & Direct Contact */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full gap-10 lg:gap-0">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent-champagne/40 bg-accent-champagne/10 text-accent-champagne mb-8"
                >
                  <Home size={14} className="text-accent-champagne" />
                  <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold">
                    {CLIENT_CONFIG.sectionTag}
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-serif text-bg-ivory tracking-tight leading-[1.1] mb-6"
                >
                  {CLIENT_CONFIG.title.main} <br />
                  <span className="font-serif italic font-normal text-accent-champagne">
                    {CLIENT_CONFIG.title.highlight}
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-sm font-sans font-light leading-relaxed text-bg-ivory/70 mb-2 max-w-lg"
                >
                  {CLIENT_CONFIG.description}
                </motion.p>
              </div>

              {/* Direct Contact Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-4 pt-6 border-t border-white/10"
              >
                <a
                  href={CLIENT_CONFIG.contactDetails.phone.href}
                  className="inline-flex items-center gap-3 text-sm font-sans font-medium text-bg-ivory hover:text-accent-champagne transition-colors group w-fit"
                >
                  <span className="w-9 h-9 rounded-full bg-white text-brand-dark flex items-center justify-center shrink-0 group-hover:bg-accent-champagne transition-colors">
                    <Phone size={15} />
                  </span>
                  <span>{CLIENT_CONFIG.contactDetails.phone.label}</span>
                </a>

                <a
                  href={CLIENT_CONFIG.contactDetails.email.href}
                  className="inline-flex items-center gap-3 text-sm font-sans font-medium text-bg-ivory hover:text-accent-champagne transition-colors group w-fit"
                >
                  <span className="w-9 h-9 rounded-full bg-white text-brand-dark flex items-center justify-center shrink-0 group-hover:bg-accent-champagne transition-colors">
                    <Mail size={15} />
                  </span>
                  <span>{CLIENT_CONFIG.contactDetails.email.label}</span>
                </a>

                <div className="inline-flex items-center gap-3 text-sm font-sans font-medium text-bg-ivory w-fit">
                  <span className="w-9 h-9 rounded-full bg-white text-brand-dark flex items-center justify-center shrink-0">
                    <MapPin size={15} />
                  </span>
                  <span>{CLIENT_CONFIG.contactDetails.location}</span>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6 bg-accent-champagne text-brand-dark rounded-2xl p-6 sm:p-10 shadow-xl"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                    className="py-10 text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-dark text-accent-champagne flex items-center justify-center">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-brand-dark">
                      Valuation Request Received
                    </h3>
                    <p className="text-xs font-sans text-brand-dark/80 max-w-sm leading-relaxed">
                      Thank you! ko realty ltd will review your request and reach out
                      shortly to discuss your custom market evaluation.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="mt-2 text-xs font-sans font-bold uppercase tracking-widest text-brand-dark underline underline-offset-4 hover:text-brand-dark/70 transition-colors cursor-pointer"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={fieldId("name")}
                        className="text-xs uppercase tracking-wider font-sans font-bold text-brand-dark/80"
                      >
                        Your Name
                      </label>
                      <input
                        id={fieldId("name")}
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. John Smith"
                        value={formData.name}
                        disabled={isSubmitting}
                        onChange={(e) => updateField("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        aria-invalid={Boolean(touched.name && errors.name)}
                        aria-describedby={
                          touched.name && errors.name ? `${fieldId("name")}-error` : undefined
                        }
                        className={fieldClasses("name")}
                      />
                      {touched.name && errors.name && (
                        <p
                          id={`${fieldId("name")}-error`}
                          role="alert"
                          className="flex items-center gap-1.5 text-xs text-red-700 font-sans"
                        >
                          <AlertCircle size={13} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone or Email */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={fieldId("emailOrPhone")}
                        className="text-xs uppercase tracking-wider font-sans font-bold text-brand-dark/80"
                      >
                        Your Phone or Email
                      </label>
                      <input
                        id={fieldId("emailOrPhone")}
                        type="text"
                        inputMode="email"
                        autoComplete="tel email"
                        placeholder="e.g. john@example.com or (204) 555-0199"
                        value={formData.emailOrPhone}
                        disabled={isSubmitting}
                        onChange={(e) => updateField("emailOrPhone", e.target.value)}
                        onBlur={() => handleBlur("emailOrPhone")}
                        aria-invalid={Boolean(touched.emailOrPhone && errors.emailOrPhone)}
                        aria-describedby={
                          touched.emailOrPhone && errors.emailOrPhone
                            ? `${fieldId("emailOrPhone")}-error`
                            : undefined
                        }
                        className={fieldClasses("emailOrPhone")}
                      />
                      {touched.emailOrPhone && errors.emailOrPhone && (
                        <p
                          id={`${fieldId("emailOrPhone")}-error`}
                          role="alert"
                          className="flex items-center gap-1.5 text-xs text-red-700 font-sans"
                        >
                          <AlertCircle size={13} /> {errors.emailOrPhone}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={fieldId("address")}
                        className="text-xs uppercase tracking-wider font-sans font-bold text-brand-dark/80"
                      >
                        Property Address
                      </label>
                      <input
                        id={fieldId("address")}
                        type="text"
                        autoComplete="street-address"
                        placeholder="e.g. 123 Pembina Hwy, Winnipeg"
                        value={formData.address}
                        disabled={isSubmitting}
                        onChange={(e) => updateField("address", e.target.value)}
                        onBlur={() => handleBlur("address")}
                        aria-invalid={Boolean(touched.address && errors.address)}
                        aria-describedby={
                          touched.address && errors.address
                            ? `${fieldId("address")}-error`
                            : undefined
                        }
                        className={fieldClasses("address")}
                      />
                      {touched.address && errors.address && (
                        <p
                          id={`${fieldId("address")}-error`}
                          role="alert"
                          className="flex items-center gap-1.5 text-xs text-red-700 font-sans"
                        >
                          <AlertCircle size={13} /> {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Property Type */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor={fieldId("propertyType")}
                        className="text-xs uppercase tracking-wider font-sans font-bold text-brand-dark/80"
                      >
                        Property Type
                      </label>
                      <div className="relative">
                        <select
                          id={fieldId("propertyType")}
                          value={formData.propertyType}
                          disabled={isSubmitting}
                          onChange={(e) => updateField("propertyType", e.target.value)}
                          className={`${inputBaseClasses} border border-brand-dark/10 appearance-none cursor-pointer pr-10`}
                        >
                          {CLIENT_CONFIG.propertyOptions.map((option: PropertyOption) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={18}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-dark/60 pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Submit-level error */}
                    {submitError && (
                      <p
                        role="alert"
                        className="flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 font-sans"
                      >
                        <AlertCircle size={14} className="shrink-0" /> {submitError}
                      </p>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-dark text-bg-ivory hover:bg-brand-navy-dark transition-all duration-300 group shadow-md text-xs font-sans font-bold uppercase tracking-widest w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <span className="w-7 h-7 rounded-full bg-accent-champagne text-brand-dark flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          {isSubmitting ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Send size={13} className="-translate-x-0.5" />
                          )}
                        </span>
                        <span>{isSubmitting ? "Sending..." : "Request Free Evaluation"}</span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}