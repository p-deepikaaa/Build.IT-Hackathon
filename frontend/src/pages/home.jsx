import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "Medical Support",
    desc: "Connect with neighbors who have medicine and first-aid supplies.",
    emoji: "🩺",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    title: "Food & Water",
    desc: "Request or offer food, water and groceries.",
    emoji: "🍞",
    accent: "bg-green-50 text-green-600",
  },
  {
    title: "Shelter",
    desc: "Find temporary shelter during emergencies.",
    emoji: "🏠",
    accent: "bg-gray-100 text-gray-700",
  },
  {
    title: "Electricity",
    desc: "Share generators and charging stations.",
    emoji: "⚡",
    accent: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Transportation",
    desc: "Offer or request emergency rides.",
    emoji: "🚗",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    title: "AI Matching",
    desc: "AI instantly connects requests with nearby helpers.",
    emoji: "🤖",
    accent: "bg-green-50 text-green-600",
  },
];

const STEPS = [
  {
    label: "Request Help",
    desc: "Post your emergency request.",
  },
  {
    label: "AI Processing",
    desc: "AI analyzes urgency and location.",
  },
  {
    label: "Find Neighbor",
    desc: "Nearby volunteers are notified.",
  },
  {
    label: "Receive Help",
    desc: "Resources reach you quickly.",
  },
];

const STATS = [
  {
    title: "Open Requests",
    value: "12",
    color: "text-blue-600",
  },
  {
    title: "Resources",
    value: "26",
    color: "text-green-600",
  },
  {
    title: "Successful Matches",
    value: "18",
    color: "text-gray-800",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}

      <section className="bg-gradient-to-b from-slate-50 to-white py-24 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
            AI Powered Hyperlocal Platform
          </span>

          <h1 className="text-6xl font-bold mt-6 text-slate-900">
            NeighborGrid 
          </h1>

          <p className="mt-6 text-xl text-gray-600">
            Connect people who need help with neighbors who can provide it during disasters.
          </p>

          <div className="mt-10 flex justify-center gap-5">

            <Link
              to="/request"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
            >
              Request Help
            </Link>

            <Link
              to="/offer"
              className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
            >
              Offer Resource
            </Link>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="max-w-5xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-6">

          {STATS.map((item) => (

            <div
              key={item.title}
              className="bg-white shadow rounded-2xl p-6 text-center"
            >

              <h3 className="text-gray-500">
                {item.title}
              </h3>

              <p className={`text-4xl font-bold mt-3 ${item.color}`}>
                {item.value}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold text-center">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {FEATURES.map((feature) => (

            <div
              key={feature.title}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
            >

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${feature.accent}`}
              >
                {feature.emoji}
              </div>

              <h3 className="text-xl font-semibold mt-5">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* How it works */}

      <section className="bg-slate-100 py-20 px-6">

        <h2 className="text-4xl font-bold text-center">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-14">

          {STEPS.map((step, index) => (

            <div
              key={step.label}
              className="bg-white rounded-2xl shadow p-6 text-center"
            >

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto">
                {index + 1}
              </div>

              <h3 className="font-semibold mt-4">
                {step.label}
              </h3>

              <p className="text-gray-600 mt-2">
                {step.desc}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t py-8 text-center text-gray-500">
        © {new Date().getFullYear()} NeighborGrid • Built for Hackathon
      </footer>

    </div>
  );
}

export default Home;