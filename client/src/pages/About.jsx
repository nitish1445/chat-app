import React from "react";
import { Link } from "react-router-dom";

const coreValues = [
  {
    title: "Real-Time by Default",
    description:
      "Messages appear instantly so teams can make decisions quickly without refreshing or jumping between tools.",
  },
  {
    title: "Simple and Focused",
    description:
      "The interface is clean and readable, helping users stay focused on conversation instead of UI noise.",
  },
  {
    title: "Secure Access",
    description:
      "Email authentication and Google sign-in make onboarding easy while keeping account access protected.",
  },
];

const appHighlights = [
  "Direct chat flow with contact sidebar",
  "Google login integration for faster onboarding",
  "Responsive layout for desktop and mobile screens",
  "Theme-ready UI using utility-first styling",
];

const About = () => {
  return (
    <>
      <main className="min-h-[calc(100vh-64px)] bg-linear-to-b from-cyan-50 via-sky-50 to-slate-100 text-slate-800">
        <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-18">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-cyan-300 bg-cyan-100/60 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-cyan-900">
                ABOUT CONVO
              </p>
              <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-6xl">
                Built to keep conversations moving
              </h1>
              <p className="mt-4 max-w-xl text-slate-600 md:text-lg">
                Convo is a modern chat app designed for fast communication,
                clean collaboration, and everyday reliability. It helps users
                connect in real-time with an interface that stays smooth and
                easy to use.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/chatting" className="btn btn-primary btn-lg">
                  Open Chat
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-outline btn-secondary btn-lg"
                >
                  Contact Team
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-200 bg-white p-6 shadow-2xl shadow-cyan-900/10">
              <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                What this app delivers
              </h2>
              <div className="mt-4 space-y-3">
                {appHighlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-22">
          <div className="mb-6">
            <p className="mb-2 inline-flex rounded-full border border-cyan-300 bg-cyan-100/60 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-cyan-900">
              WHY WE BUILT IT
            </p>
            <h2 className="text-2xl font-black text-slate-900 md:text-4xl">
              Fast communication should feel effortless
            </h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Teams lose time when chat tools are cluttered or slow. Convo is
              built to reduce friction: clean layouts, clear conversation paths,
              and dependable authentication so people can focus on work.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {coreValues.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-900/10"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <footer className="border-t border-slate-200 bg-white/70 py-4 text-center text-sm text-slate-600">
          © 2026 Convo. All rights reserved.
        </footer>
      </main>
    </>
  );
};

export default About;
