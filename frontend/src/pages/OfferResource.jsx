import { useState } from "react";

const CATEGORIES = [
  "Medical",
  "Food & Water",
  "Shelter",
  "Electricity",
  "Transportation",
];

const AVAILABILITY = [
  "Available now",
  "Available today",
  "Available this week",
];

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get browser/device coordinates
  const getCurrentCoordinates = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({
          latitude: null,
          longitude: null,
        });

        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (geoError) => {
          console.warn(
            "Location permission unavailable:",
            geoError
          );

          // Continue without coordinates
          resolve({
            latitude: null,
            longitude: null,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // Get user's current coordinates
      const coordinates =
        await getCurrentCoordinates();

      const resourceData = {
        name: form.name,
        phone: form.phone,
        resource_type: form.category,
        quantity: form.quantity,
        description: form.description,
        location: form.location,
        availability: form.availability,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      };

      console.log(
        "Submitting resource:",
        resourceData
      );

      const response = await fetch(
        "https://neighborgrid-backend.onrender.com/resources",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resourceData),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to list resource"
        );
      }

      const data = await response.json();

      console.log(
        "Resource listed:",
        data
      );

      setResult(data);
      setSubmitted(true);

    } catch (err) {
      console.error(err);

      setError(
        "Unable to list resource. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  const handleAnotherResource = () => {
    setSubmitted(false);
    setResult(null);
    setError("");

    setForm({
      name: "",
      phone: "",
      category: CATEGORIES[0],
      quantity: "",
      availability: AVAILABILITY[0],
      location: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-3xl px-6 py-16">

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Offer a Resource
          </h1>

          <p className="mt-3 text-slate-600">
            Share what you have. A small offer can make a big difference for someone nearby.
          </p>
        </div>

        {/* Info card */}

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 shadow-sm">

          <span className="text-xl">
            💡
          </span>

          <div>
            <p className="text-sm font-semibold text-blue-700">
              How offering works
            </p>

            <p className="mt-1 text-sm text-blue-600">
              Your offer becomes visible to nearby neighbors with matching needs. Our AI
              prioritizes the closest, most urgent match automatically.
            </p>
          </div>

        </div>

        {submitted ? (

          <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center shadow-sm">

            <p className="text-2xl">
              ✅
            </p>

            <h2 className="mt-3 text-xl font-semibold text-emerald-800">
              Resource listed
            </h2>

            <p className="mt-2 text-sm text-emerald-700">
              Thank you for helping your community. We'll notify you when someone is matched.
            </p>

            {result && (

              <div className="mt-5 rounded-xl bg-white p-4 text-left text-sm text-slate-700">

                <p>
                  <strong>
                    Resource:
                  </strong>{" "}
                  {result.resource_type}
                </p>

                <p className="mt-2">
                  <strong>
                    Quantity:
                  </strong>{" "}
                  {result.quantity}
                </p>

                <p className="mt-2">
                  <strong>
                    Availability:
                  </strong>{" "}
                  {result.availability}
                </p>

                <p className="mt-2">
                  <strong>
                    Location:
                  </strong>{" "}
                  {result.location}
                </p>

              </div>

            )}

            <button
              onClick={handleAnotherResource}
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
                <label className="block text-sm font-medium text-slate-700">
                  Full Name
                </label>

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
                <label className="block text-sm font-medium text-slate-700">
                  Phone Number
                </label>

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
                <label className="block text-sm font-medium text-slate-700">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >

                  {CATEGORIES.map((category) => (

                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>

                  ))}

                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Quantity
                </label>

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
                <label className="block text-sm font-medium text-slate-700">
                  Availability
                </label>

                <select
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >

                  {AVAILABILITY.map((availability) => (

                    <option
                      key={availability}
                      value={availability}
                    >
                      {availability}
                    </option>

                  ))}

                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Location
                </label>

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
                <label className="block text-sm font-medium text-slate-700">
                  Description
                </label>

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

            {error && (

              <p className="mt-4 text-center text-sm font-medium text-red-600">
                {error}
              </p>

            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Getting Location & Listing Resource..."
                : "List Resource"}
            </button>

          </form>

        )}

      </section>
    </div>
  );
}