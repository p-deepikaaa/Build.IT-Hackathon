import { useState } from "react";


const CATEGORIES = ["Medical", "Food & Water", "Shelter", "Electricity", "Transportation"];
const PRIORITIES = ["Low", "Medium", "High", "Critical"];

export default function RequestHelp() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    category: CATEGORIES[0],
    priority: PRIORITIES[1],
    description: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API integration to FastAPI backend goes here
    console.log("Request submitted:", form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Request Help</h1>
          <p className="mt-3 text-slate-600">
            Tell your neighbors what you need. We'll match you with someone nearby, fast.
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm">
          <span className="text-xl">🚨</span>
          <div>
            <p className="text-sm font-semibold text-red-700">Life-threatening emergency?</p>
            <p className="mt-1 text-sm text-red-600">
              Please contact local emergency services immediately. NeighborGrid supplements
              community support and is not a replacement for emergency response.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center shadow-sm">
            <p className="text-2xl">✅</p>
            <h2 className="mt-3 text-xl font-semibold text-emerald-800">Request submitted</h2>
            <p className="mt-2 text-sm text-emerald-700">
              Nearby neighbors are being notified. We'll match you as soon as possible.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 555 000 0000"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe exactly what you need..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Street, area, or landmark"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-2xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Submit Request
            </button>
          </form>
        )}

        {/* Tips card */}
        <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Tips for a faster match</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• Be specific about quantity and urgency in your description.</li>
            <li>• Add a clear landmark so neighbors can find you quickly.</li>
            <li>• Keep your phone reachable — matched neighbors may call directly.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}