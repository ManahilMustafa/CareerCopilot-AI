import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ResumeUpload from "@/components/resume-upload";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold">User Dashboard</h1>
          <p className="mt-2 text-gray-400">Manage your resumes and AI career insights</p>
        </div>

        {/* Action Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Main Upload Area */}
          <div className="lg:col-span-2">
            <ResumeUpload />
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Resumes Analyzed</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Avg. ATS Score</span>
                  <span className="font-medium">N/A</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">Saved Reports</h3>
              <p className="mt-4 text-center text-sm text-gray-500 italic">
                No saved reports yet.
              </p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
