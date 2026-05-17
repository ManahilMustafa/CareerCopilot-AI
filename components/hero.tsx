import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white">

      {/* Gradient Glow */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur">
          Multi-Agent AI Career Platform
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Land Your Dream Job Faster With AI
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          Analyze resumes, match jobs, generate cover letters,
          prepare interviews, and build your career roadmap —
          powered by AI agents.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            href="/dashboard"
            className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105"
          >
            Get Started
          </Link>

          <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10">
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-center">

          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="mt-1 text-sm text-gray-400">
              Resumes Analyzed
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">95%</h3>
            <p className="mt-1 text-sm text-gray-400">
              ATS Optimization
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">4x</h3>
            <p className="mt-1 text-sm text-gray-400">
              Faster Job Matching
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}