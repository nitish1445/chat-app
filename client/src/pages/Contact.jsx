import React, { useState } from "react";
import { toast } from "react-hot-toast";

const supportCards = [
  {
    title: "General Help",
    value: "support@converse.app",
    note: "Response in 12-24 hours",
  },
  {
    title: "Business Enquiry",
    value: "business@converse.app",
    note: "Partnerships and enterprise plans",
  },
  {
    title: "Call Us",
    value: "+91 98765 43210",
    note: "Mon-Sat, 10:00 AM to 7:00 PM",
  },
];

const Contact = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSending(true);

    // Simulate a quick submit flow until API is wired.
    setTimeout(() => {
      toast.success("Your message has been sent.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSending(false);
    }, 600);
  };

  return (
    <>
      <main className="min-h-[calc(100vh-64px)] bg-linear-to-b from-sky-50 via-cyan-50 to-slate-100 py-10 px-4 md:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="mb-8 text-center md:text-left">
            <p className="mb-3 inline-flex rounded-full border border-cyan-300 bg-cyan-100/60 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-cyan-900">
              CONTACT CONVERSE
            </p>
            <h1 className="text-3xl font-black text-slate-900 md:text-5xl">
              Let&apos;s talk about your chat experience
            </h1>
            <p className="mt-3 text-slate-600 md:max-w-3xl">
              Have a question, feedback, or partnership idea? Send us a message
              and we will get back to you as soon as possible.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-4 lg:col-span-2">
              {supportCards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
                >
                  <h2 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-cyan-800 font-semibold">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{item.note}</p>
                </article>
              ))}

              <article className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                <h2 className="text-lg font-bold text-slate-900">Office</h2>
                <p className="mt-2 text-slate-700">
                  Converse Labs, Sector 62, Noida, Uttar Pradesh, India
                </p>
              </article>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-cyan-900/10 lg:col-span-3">
              <h2 className="text-2xl font-bold text-slate-900">
                Send Message
              </h2>
              <p className="mt-1 text-slate-600">
                Fill out the form and our team will contact you.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="form-control w-full">
                    <span className="label-text mb-1 text-slate-700">
                      Full Name
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      placeholder="Your full name"
                      className="input w-full bg-white border-slate-200 text-slate-800 focus:outline-none focus:border-cyan-400"
                    />
                  </label>

                  <label className="form-control w-full">
                    <span className="label-text mb-1 text-slate-700">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      placeholder="you@example.com"
                      className="input w-full bg-white border-slate-200 text-slate-800 focus:outline-none focus:border-cyan-400"
                    />
                  </label>
                </div>

                <label className="form-control w-full">
                  <span className="label-text mb-1 text-slate-700">
                    Subject
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    placeholder="How can we help you?"
                    className="input w-full bg-white border-slate-200 text-slate-800 focus:outline-none focus:border-cyan-400"
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text mb-1 text-slate-700">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    rows={6}
                    placeholder="Write your message here..."
                    className="textarea w-full bg-white border-slate-200 text-slate-800 focus:outline-none focus:border-cyan-400"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn btn-primary w-full md:w-auto px-8"
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70 py-4 text-center text-sm text-slate-600">
        © 2026 Converse. All rights reserved.
      </footer>
    </>
  );
};

export default Contact;
