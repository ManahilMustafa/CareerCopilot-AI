const testimonials = [
  {
    name: "Sarah Khan",
    role: "Frontend Developer",
    review:
      "CareerCopilot AI helped me optimize my resume and land interviews much faster.",
  },
  {
    name: "Ali Raza",
    role: "Software Engineer",
    review:
      "The interview preparation agent generated incredibly accurate technical questions.",
  },
  {
    name: "Emma Wilson",
    role: "UI/UX Designer",
    review:
      "The career roadmap feature gave me a clear path to transition into product design.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Loved by Professionals
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            Thousands of users are improving resumes,
            preparing interviews, and accelerating careers.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-purple-500/40 hover:bg-white/10"
            >
              
              {/* Review */}
              <p className="leading-8 text-gray-300">
                “{item.review}”
              </p>

              {/* User */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-400">
                  {item.role}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}