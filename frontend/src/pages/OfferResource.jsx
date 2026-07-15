import { useState } from "react";


const CATEGORIES = ["Medical", "Food & Water", "Shelter", "Electricity", "Transportation"];
const AVAILABILITY = ["Available now", "Available today", "Available this week"];

export default function OfferResource() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    category: CATEGORIES[0],
    quantity: "",
    availability: AVAILABILITY[0],
    location: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API integration to FastAPI backend goes here
    console.log("Resource offered:", form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Offer a Resource</h1>
          <p className="mt-3 text-slate-600">
            Share what you have. A small offer can make a big difference for someone nearby.
          </p>
        </div>

        {/* Info card */}
        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-sm font-semibold text-blue-700">How offering works</p>
            <p className="mt-1 text-sm text-blue-600">
              Your offer becomes visible to nearby neighbors with matching needs. Our AI
              prioritizes the closest, most urgent match automatically.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center shadow-sm">
            <p className="text-2xl">✅</p>
            <h2 className="mt-3 text-xl font-semibold text-emerald-800">Resource listed</h2>
            <p className="mt-2 text-sm text-emerald-700">
              Thank you for helping your community. We'll notify you when someone is matched.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
            >
              Offer another resource
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
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Quantity</label>
                <input
                  type="text"
                  name="quantity"
                  required
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 5 meals, 2 blankets"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Availability</label>
                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  {AVAILABILITY.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Street, area, or landmark"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what you're offering..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              List Resource
            </button>
          </form>
        )}
      </section>
    </div>
  );
}