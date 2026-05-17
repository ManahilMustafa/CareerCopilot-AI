const steps = [
  {
    number: "01",
    title: "Upload Resume",
    description:
      "Upload your existing resume securely in PDF format.",
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Our AI agents analyze ATS score, skills, and missing keywords.",
  },
  {
    number: "03",
    title: "Job Matching",
    description:
      "Match your resume against job descriptions and identify gaps.",
  },
  {
    number: "04",
    title: "Get Hired Faster",
    description:
      "Prepare interviews, optimize applications, and grow your career.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            How It Works
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            A simple AI-powered workflow to help you
            land better opportunities faster.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-purple-500/40 hover:bg-white/10"
            >
              
              {/* Number */}
              <div className="mb-6 text-5xl font-bold text-purple-400/80">
                {step.number}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-4 leading-7 text-gray-400">
                {step.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}