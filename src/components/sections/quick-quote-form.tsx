"use client";

import { useState, FormEvent } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function QuickQuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    move_type: "House",
    move_date: "",
    from_suburb: "",
    to_suburb: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: formData.phone_number, source: "quick-quote" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", phone_number: "", email: "", move_type: "House", move_date: "", from_suburb: "", to_suburb: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
        <p className="font-bold text-[#011936]">Quote Requested!</p>
        <p className="text-xs text-gray-500 mt-1">We&apos;ll get back to you within 60 seconds.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
          <input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624] mt-1"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</label>
          <input
            required
            value={formData.phone_number}
            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            className="w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624] mt-1"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624] mt-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Type</label>
          <select
            value={formData.move_type}
            onChange={(e) => setFormData({ ...formData, move_type: e.target.value })}
            className="w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624] mt-1"
          >
            <option>House</option>
            <option>Unit</option>
            <option>Office</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Date</label>
          <input
            type="date"
            value={formData.move_date}
            onChange={(e) => setFormData({ ...formData, move_date: e.target.value })}
            className="w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624] mt-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">From</label>
          <input
            value={formData.from_suburb}
            onChange={(e) => setFormData({ ...formData, from_suburb: e.target.value })}
            className="w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624] mt-1"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">To</label>
          <input
            value={formData.to_suburb}
            onChange={(e) => setFormData({ ...formData, to_suburb: e.target.value })}
            className="w-full border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#FFB624] mt-1"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Message (Optional)</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={2}
          className="w-full border border-gray-200 bg-white px-3 py-2 text-xs resize-none focus:outline-none focus:border-[#FFB624] mt-1"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#FFB624] text-[#011936] font-bold text-sm py-2.5 hover:bg-yellow-500 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Get My Free Quote"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
