"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    moveDate: "",
    pickupSuburb: "",
    dropoffSuburb: "",
    moveType: "House",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "booking-form" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", phone: "", email: "", moveDate: "", pickupSuburb: "", dropoffSuburb: "", moveType: "House", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <section id="contact" className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center py-12">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="font-bold text-xl text-[#011936]">Request Submitted!</p>
          <p className="text-gray-600 mt-2">We&apos;ll be in touch within 60 seconds.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#011936] mb-2">Detailed Booking</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">Ready to lock it in? Provide your details below.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 border border-gray-100 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600">Name *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Phone *</label>
              <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600">Email *</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Date</label>
              <input type="date" value={form.moveDate} onChange={(e) => setForm({ ...form, moveDate: e.target.value })} className="mt-1 w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600">Pickup</label>
              <input value={form.pickupSuburb} onChange={(e) => setForm({ ...form, pickupSuburb: e.target.value })} placeholder="Suburb" className="mt-1 w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Drop-off</label>
              <input value={form.dropoffSuburb} onChange={(e) => setForm({ ...form, dropoffSuburb: e.target.value })} placeholder="Suburb" className="mt-1 w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Move Type</label>
            <select value={form.moveType} onChange={(e) => setForm({ ...form, moveType: e.target.value })} className="mt-1 w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624]">
              <option>House</option>
              <option>Apartment</option>
              <option>Office</option>
              <option>Studio</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Additional Details</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} className="mt-1 w-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#FFB624]" />
          </div>
          <button type="submit" disabled={status === "loading"} className="w-full bg-[#FFB624] text-[#011936] font-bold text-sm py-3 hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {status === "loading" ? "Sending..." : <><Send className="w-4 h-4" /> Submit Request</>}
          </button>
          {status === "error" && (
            <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
