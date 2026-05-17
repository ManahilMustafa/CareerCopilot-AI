const features = [
  {
    title: "Resume Analyzer",
    description:
      "Analyze ATS score, identify missing keywords, and improve your resume instantly.",
    emoji: "📄",
  },
  {
    title: "Job Match Agent",
    description:
      "Compare your resume with job descriptions and calculate match scores using AI.",
    emoji: "🎯",
  },
  {
    title: "Interview Prep",
    description:
      "Generate technical, HR, and behavioral interview questions with model answers.",
    emoji: "🎤",
  },
  {
    title: "Career Roadmap",
    description:
      "Get a personalized roadmap from your current role to your dream career.",
    emoji: "🚀",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Powerful AI Career Tools
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            Everything you need to optimize resumes,
            prepare interviews, and grow your career
            with AI agents.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:bg-white/10"
            >
              
              {/* Emoji */}
              <div className="mb-6 text-5xl">
                {feature.emoji}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-4 leading-7 text-gray-400">
                {feature.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}