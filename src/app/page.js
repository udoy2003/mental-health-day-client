
import Link from "next/link";
import { ArrowRight, HeartHandshake, Brain, ShieldCheck, BookOpen, MessageCircleHeart, Moon, Users, AlertCircle } from "lucide-react";
import { topics } from "../lib/topics";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-300 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-emerald-800">
            Mental Health Day
          </Link>

          <nav className="flex items-center gap-3">
            <Link href="/login" className="rounded-xl px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">
              Login
            </Link>
            <Link href="/register" className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Get Support
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-emerald-300/40 bg-white/10 px-4 py-2 text-sm text-emerald-100">
              Your wellbeing matters
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
              Take a moment for your mental wellbeing.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-50">
              Understand your emotions, learn about mental health, and explore supportive resources at your own pace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-emerald-900 transition hover:bg-emerald-50">
                Register for Support <ArrowRight size={18} />
              </Link>
              <a href="#learn" className="rounded-xl border border-emerald-200/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Explore Resources
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200/30 bg-white/10 p-8 shadow-xl backdrop-blur-sm">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-800">
              <HeartHandshake size={34} />
            </div>
            <h2 className="text-2xl font-bold">You do not have to figure everything out alone.</h2>
            <p className="mt-4 leading-7 text-emerald-50">
              Asking for support is a positive step. Explore reliable information and, when you are ready, submit a counseling request.
            </p>
            <p className="mt-6 border-t border-white/20 pt-5 text-sm text-emerald-100">
              This website provides educational information and a way to request support. It does not replace professional diagnosis or emergency care.
            </p>
          </div>
        </div>
      </section>

      <section id="learn" className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold text-emerald-700">Understand mental health</p>
          <h2 className="mt-3 text-3xl font-bold text-emerald-950 md:text-4xl">Mental health is part of overall health</h2>
          <p className="mt-5 leading-8 text-slate-600">
            Mental health includes our emotional, psychological, and social wellbeing. It can influence how we think, feel, handle stress, build relationships, and make everyday decisions. Everyone has mental health, and it can change throughout life.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <Brain className="text-emerald-700" size={30} />
            <h3 className="mt-4 text-lg font-bold text-emerald-900">Understand yourself</h3>
            <p className="mt-2 leading-7 text-slate-600">Learn to notice emotions, thoughts, and changes in your daily wellbeing without judging yourself.</p>
          </div>
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <ShieldCheck className="text-emerald-700" size={30} />
            <h3 className="mt-4 text-lg font-bold text-emerald-900">Recognize changes</h3>
            <p className="mt-2 leading-7 text-slate-600">Pay attention when changes in mood, sleep, energy, or daily activities continue or become difficult to manage.</p>
          </div>
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <HeartHandshake className="text-emerald-700" size={30} />
            <h3 className="mt-4 text-lg font-bold text-emerald-900">Reach out for support</h3>
            <p className="mt-2 leading-7 text-slate-600">Talking with someone you trust or a qualified professional can help you explore what you are experiencing.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-300 bg-slate-200/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="font-semibold text-emerald-700">Notice the signs</p>
            <h2 className="mt-3 text-3xl font-bold text-emerald-950">When might someone need support?</h2>
            <p className="mt-4 leading-8 text-slate-600">
              People experience mental health difficulties in different ways. A change does not automatically mean someone has a mental health condition, but persistent or distressing changes deserve attention.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-300 bg-white p-6">
            <ul className="space-y-4">
              {[
                "Ongoing sadness, worry, irritability, or feeling overwhelmed",
                "Changes in sleep, appetite, energy, or concentration",
                "Losing interest in activities that once felt meaningful",
                "Difficulty managing studies, work, relationships, or daily tasks",
                "Feeling isolated or finding it hard to ask for help"
              ].map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-slate-700">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold text-emerald-700">Explore topics</p>
          <h2 className="mt-3 text-3xl font-bold text-emerald-950 md:text-4xl">Learn about what you may be experiencing</h2>
          <p className="mt-4 leading-8 text-slate-600">Explore these educational topics at your own pace. Choose a topic to read more.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link key={topic.slug} href={`/topics/${topic.slug}`} className="group rounded-2xl border border-slate-300 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-500 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Icon size={25} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-emerald-950">{topic.title}</h3>
                <p className="mt-2 min-h-14 leading-7 text-slate-600">{topic.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-700 group-hover:text-emerald-900">
                  Read more <ArrowRight size={17} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-emerald-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-semibold text-emerald-200">Counseling support</p>
            <h2 className="mt-3 text-3xl font-bold">Talking to someone can be a helpful first step.</h2>
            <p className="mt-4 leading-8 text-emerald-100">
              Counseling can offer a supportive space to discuss concerns, understand experiences, and consider helpful next steps. You can submit a request through your account.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
            <MessageCircleHeart size={32} className="text-emerald-200" />
            <h3 className="mt-4 text-xl font-bold">When to seek help</h3>
            <p className="mt-3 leading-7 text-emerald-100">
              Consider reaching out when distress continues, affects everyday life, or feels difficult to manage alone. If you or someone else is in immediate danger, contact local emergency services or go to the nearest emergency department.
            </p>
            <Link href="/register" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-emerald-900 hover:bg-emerald-50">
              Create an account <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-300 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-emerald-800">Mental Health Day</p>
          <p>Educational information and supportive resources.</p>
        </div>
      </footer>
    </main>
  );
}
