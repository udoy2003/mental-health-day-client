
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { topics } from "../../../lib/topics";

export default function TopicDetailPage() {
  const params = useParams();
  const topic = topics.find((item) => item.slug === params.slug);

  if (!topic) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5">
        <div className="w-full max-w-lg rounded-3xl border border-slate-300 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-emerald-900">
            Topic not found
          </h1>
          <p className="mt-3 text-slate-600">
            The topic you are looking for is not available.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const Icon = topic.icon;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-300 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-bold text-emerald-800">
            Mental Health Day
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-slate-400 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
          >
            Login
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-100 transition hover:text-white"
          >
            <ArrowLeft size={17} /> Back to Home
          </Link>

          <div className="mt-9 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-800 shadow-lg">
            <Icon size={34} />
          </div>

          <p className="mt-6 font-semibold text-emerald-200">
            Mental Health Learning Resource
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {topic.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50">
            {topic.summary}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3 md:py-14">
        <div className="space-y-7 md:col-span-2">
          <article className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                <BookOpen size={23} />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  Section 01
                </p>
                <h2 className="text-xl font-bold text-emerald-950">
                  Understanding this topic
                </h2>
              </div>
            </div>

            <p className="mt-5 leading-8 text-slate-700">
              {topic.introduction}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200 text-emerald-800">
                <Lightbulb size={23} />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  Section 02
                </p>
                <h2 className="text-xl font-bold text-emerald-950">
                  What may contribute to it?
                </h2>
              </div>
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              There may be several contributing factors. These experiences are
              different for each person and do not automatically indicate a
              mental health condition.
            </p>

            <ul className="mt-6 space-y-4">
              {topic.why.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                    {index + 1}
                  </span>
                  <span className="leading-7 text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                <AlertCircle size={23} />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  Section 03
                </p>
                <h2 className="text-xl font-bold text-emerald-950">
                  Common signs and experiences
                </h2>
              </div>
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              A person may experience some of the following. Not everyone
              experiences all of them, and these signs alone cannot provide a
              diagnosis.
            </p>

            <ul className="mt-6 space-y-4">
              {topic.signs.map((sign) => (
                <li key={sign} className="flex gap-3 leading-7 text-slate-700">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-emerald-700"
                    size={20}
                  />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                <HeartHandshake size={23} />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  Section 04
                </p>
                <h2 className="text-xl font-bold text-emerald-950">
                  Practical steps you can try
                </h2>
              </div>
            </div>

            <p className="mt-4 leading-7 text-slate-600">
              These are general wellbeing suggestions, not a replacement for
              professional care. Choose what feels safe and realistic for you.
            </p>

            <div className="mt-6 space-y-4">
              {topic.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-xl border border-slate-300 bg-slate-50 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-600">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-800">
                <ShieldCheck size={23} />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  Section 05
                </p>
                <h2 className="text-xl font-bold text-emerald-950">
                  When should you seek professional help?
                </h2>
              </div>
            </div>

            <p className="mt-4 leading-7 text-emerald-950">
              Consider speaking with a qualified mental health professional
              when:
            </p>

            <ul className="mt-5 space-y-4">
              {topic.professional.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-emerald-950">
                  <CheckCircle2
                    className="mt-1 shrink-0 text-emerald-700"
                    size={20}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-emerald-950">
              Important reminder
            </h2>
            <p className="mt-4 leading-8 text-slate-700">{topic.reminder}</p>
            <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-500">
              This page is for educational purposes only. It does not provide
              diagnosis, treatment, or emergency services.
            </p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <HeartHandshake size={30} className="text-emerald-700" />
            <h2 className="mt-4 text-xl font-bold text-emerald-900">
              Would you like support?
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              You can create an account and submit a counseling request through
              Mental Health Day.
            </p>
            <Link
              href="/register"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-800"
            >
              Get Support <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-slate-200 p-6">
            <h2 className="font-bold text-emerald-900">
              Explore other topics
            </h2>
            <div className="mt-4 space-y-3">
              {topics
                .filter((item) => item.slug !== topic.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/topics/${item.slug}`}
                    className="block rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:text-emerald-800"
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </section>

      <footer className="border-t border-slate-300 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-semibold text-emerald-800">
            Mental Health Day
          </Link>
          <p>Educational information and supportive resources.</p>
        </div>
      </footer>
    </main>
  );
}