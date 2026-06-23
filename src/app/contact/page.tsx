"use client";

import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-page" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#011936] py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[#FFB624] font-semibold text-xs uppercase tracking-[0.22em] mb-4">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Weekend Movers</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Ready to move? Have questions? We&apos;re here to help. Reach out and we&apos;ll get back to you within 60 seconds.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#011936] mb-8">Contact Information</h2>
            <div className="space-y-6">
              <a href="tel:+61416828199" className="flex items-start gap-4 group">
                <div className="bg-[#FFB624] w-12 h-12 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#011936]" />
                </div>
                <div>
                  <p className="font-bold text-[#011936] group-hover:text-[#FFB624] transition-colors">Phone</p>
                  <p className="text-gray-600">+61 416 828 199</p>
                  <p className="text-sm text-gray-400">Call us anytime</p>
                </div>
              </a>

              <a href="mailto:sales@weekendmovers.com.au" className="flex items-start gap-4 group">
                <div className="bg-[#FFB624] w-12 h-12 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#011936]" />
                </div>
                <div>
                  <p className="font-bold text-[#011936] group-hover:text-[#FFB624] transition-colors">Email</p>
                  <p className="text-gray-600">sales@weekendmovers.com.au</p>
                  <p className="text-sm text-gray-400">We reply within minutes</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="bg-[#FFB624] w-12 h-12 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#011936]" />
                </div>
                <div>
                  <p className="font-bold text-[#011936]">Location</p>
                  <p className="text-gray-600">Melbourne, VIC</p>
                  <p className="text-sm text-gray-400">Serving all Melbourne suburbs</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#FFB624] w-12 h-12 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#011936]" />
                </div>
                <div>
                  <p className="font-bold text-[#011936]">Service Hours</p>
                  <div className="text-gray-600 space-y-1">
                    <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p>Sat - Sun: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/book-move"
                className="inline-flex items-center gap-2 bg-[#FFB624] text-[#011936] font-bold text-lg px-8 py-4 hover:bg-yellow-500 transition-colors"
              >
                Book Your Move
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#011936] mb-8">Send Us a Message</h2>
            {status === "success" ? (
              <div className="bg-gray-50 p-8 text-center border border-gray-100">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-bold text-xl text-[#011936]">Message Sent!</p>
                <p className="text-gray-600 mt-2">We&apos;ll get back to you within 60 seconds.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-50 p-6 md:p-8 border border-gray-100 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600">Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1 w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-1 w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="mt-1 w-full border border-gray-200 bg-white px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#FFB624]"
                    placeholder="Tell us about your move..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#FFB624] text-[#011936] font-bold text-sm py-3 hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
                {status === "error" && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
