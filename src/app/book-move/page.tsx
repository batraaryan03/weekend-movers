"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, AlertCircle, User, Truck as TruckIcon } from "lucide-react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export default function BookMovePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    movingFrom: "",
    movingTo: "",
    moveDate: "",
    moveSize: 2,
    serviceType: "residential" as "residential" | "commercial",
    packing: false,
    storage: false,
    additionalInfo: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          phone: form.phone,
          email: form.email,
          moveDate: form.moveDate,
          pickupSuburb: form.movingFrom,
          dropoffSuburb: form.movingTo,
          moveType: form.serviceType === "residential" ? "House" : "Office",
          message: `Move Size: ${form.moveSize} bedrooms | Service: ${form.serviceType} | Packing: ${form.packing} | Storage: ${form.storage} | ${form.additionalInfo}`,
          source: "book-move-page",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="pt-28 pb-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#011936] mb-4">
              Book Your Move
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Let&apos;s get you moving! Fill in the details below and our team
              will get back to you to confirm your booking.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 pb-20">
          {status === "success" ? (
            <div className="bg-gray-50 p-12 text-center border border-gray-100 rounded-lg">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="font-bold text-2xl text-[#011936]">
                Booking Confirmed!
              </p>
              <p className="text-gray-600 mt-3">
                We&apos;ll contact you within 60 seconds.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* ── Personal Details ── */}
              <div className="border-l-4 border-[#011936] bg-gray-50 px-8 py-4">
                <h2 className="text-xl font-bold text-[#011936] flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Details
                </h2>
              </div>
              <div className="px-8 py-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-[#011936]">
                      Full Name *
                    </label>
                    <input
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      placeholder="John Smith"
                      className="mt-1.5 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB624] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#011936]">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="mt-1.5 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB624] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="max-w-xs">
                  <label className="text-sm font-semibold text-[#011936]">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+61 400 000 000"
                    className="mt-1.5 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB624] focus:border-transparent"
                  />
                </div>
              </div>

              {/* ── Move Details ── */}
              <div className="border-l-4 border-[#FFB624] bg-[#FFFBF0] px-8 py-4">
                <h2 className="text-xl font-bold text-[#011936] flex items-center gap-2">
                  <TruckIcon className="w-5 h-5" />
                  Move Details
                </h2>
              </div>
              <div className="px-8 py-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-[#011936]">
                      Moving From *
                    </label>
                    <input
                      required
                      value={form.movingFrom}
                      onChange={(e) =>
                        setForm({ ...form, movingFrom: e.target.value })
                      }
                      placeholder="123 Old Street, Sydney"
                      className="mt-1.5 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB624] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#011936]">
                      Moving To *
                    </label>
                    <input
                      required
                      value={form.movingTo}
                      onChange={(e) =>
                        setForm({ ...form, movingTo: e.target.value })
                      }
                      placeholder="456 New Avenue, Melbourne"
                      className="mt-1.5 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB624] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="max-w-xs">
                  <label className="text-sm font-semibold text-[#011936]">
                    Preferred Move Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.moveDate}
                    onChange={(e) =>
                      setForm({ ...form, moveDate: e.target.value })
                    }
                    className="mt-1.5 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB624] focus:border-transparent"
                  />
                </div>

                {/* Move Size Slider */}
                <div>
                  <label className="text-sm font-semibold text-[#011936]">
                    Move Size (Number of Bedrooms)
                  </label>
                  <div className="flex items-center gap-4 mt-2">
                    <input
                      type="range"
                      min={1}
                      max={6}
                      value={form.moveSize}
                      onChange={(e) =>
                        setForm({ ...form, moveSize: Number(e.target.value) })
                      }
                      className="flex-1 h-2 bg-[#011936] rounded-lg appearance-none cursor-pointer accent-[#011936]"
                    />
                    <span className="w-10 h-10 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center font-bold text-[#011936]">
                      {form.moveSize}
                    </span>
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <label className="text-sm font-semibold text-[#011936]">
                    Service Type
                  </label>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceType"
                        checked={form.serviceType === "residential"}
                        onChange={() =>
                          setForm({ ...form, serviceType: "residential" })
                        }
                        className="w-4 h-4 accent-[#011936]"
                      />
                      <span className="text-sm text-gray-700">
                        Residential 🏠
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceType"
                        checked={form.serviceType === "commercial"}
                        onChange={() =>
                          setForm({ ...form, serviceType: "commercial" })
                        }
                        className="w-4 h-4 accent-[#011936]"
                      />
                      <span className="text-sm text-gray-700">
                        Commercial 🚚
                      </span>
                    </label>
                  </div>
                </div>

                {/* Additional Services */}
                <div>
                  <label className="text-sm font-semibold text-[#011936]">
                    Additional Services
                  </label>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.packing}
                        onChange={(e) =>
                          setForm({ ...form, packing: e.target.checked })
                        }
                        className="w-4 h-4 accent-[#011936]"
                      />
                      <span className="text-sm text-gray-700">Packing 📦</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.storage}
                        onChange={(e) =>
                          setForm({ ...form, storage: e.target.checked })
                        }
                        className="w-4 h-4 accent-[#011936]"
                      />
                      <span className="text-sm text-gray-700">Storage 🏛️</span>
                    </label>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="text-sm font-semibold text-[#011936]">
                    Additional Information *
                  </label>
                  <textarea
                    required
                    value={form.additionalInfo}
                    onChange={(e) =>
                      setForm({ ...form, additionalInfo: e.target.value })
                    }
                    rows={5}
                    placeholder="Any special items, access issues, or questions? Let us know here."
                    className="mt-1.5 w-full border border-gray-300 rounded-md px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FFB624] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="px-8 pb-8">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#FFB624] text-[#011936] font-bold text-lg py-4 rounded-md hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    "Submitting..."
                  ) : (
                    <>
                      Confirm Booking <span className="text-xl">→</span>
                    </>
                  )}
                </button>
                {status === "error" && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-3 justify-center">
                    <AlertCircle className="w-4 h-4" /> Something went wrong.
                    Please try again.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
