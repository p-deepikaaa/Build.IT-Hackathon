import { useState } from "react";

export default function RequestHelp() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: "",
    location: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [matchResult, setMatchResult] = useState(null);

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
    setMatchResult(null);

    try {
      // Get user's current coordinates
      const coordinates =
        await getCurrentCoordinates();

      const requestData = {
        ...form,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      };

      console.log(
        "Submitting request:",
        requestData
      );

      // Step 1: Create request
      const response = await fetch(
        "http://127.0.0.1:8000/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to submit request"
        );
      }

      const data = await response.json();

      console.log(
        "Request submitted:",
        data
      );

      setResult(data);

      // Step 2: Try to match with an available resource
      const matchResponse = await fetch(
        `http://127.0.0.1:8000/match/${data.id}`
      );

      if (matchResponse.ok) {
        const matchData =
          await matchResponse.json();

        console.log(
          "Match result:",
          matchData
        );

        setMatchResult(matchData);

      } else {
        // Request is still successfully submitted
        // even if matching endpoint fails
        setMatchResult({
          status: data.status,
          message:
            "Your request was submitted, but resource matching is temporarily unavailable.",
        });
      }

      setSubmitted(true);

    } catch (err) {
      console.error(err);

      setError(
        "Unable to submit request. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  const handleAnotherRequest = () => {
    setSubmitted(false);
    setResult(null);
    setMatchResult(null);
    setError("");

    setForm({
      name: "",
      phone: "",
      description: "",
      location: "",
    });
  };

  const finalStatus =
    matchResult?.status ||
    result?.status ||
    "Pending";

  const hasMatch =
    matchResult?.match?.matched_resource;

  return (
    <div className="min-h-screen bg-white">

      <section className="mx-auto max-w-3xl px-6 py-16">

        {/* Heading */}

        <div className="text-center">

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Request Help
          </h1>

          <p className="mt-3 text-slate-600">
            Tell your neighbors what you need. We'll match you with someone
            nearby, fast.
          </p>

        </div>

        {/* Emergency Notice */}

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm">

          <span className="text-xl">
            🚨
          </span>

          <div>

            <p className="text-sm font-semibold text-red-700">
              Life-threatening emergency?
            </p>

            <p className="mt-1 text-sm text-red-600">
              Please contact local emergency services immediately.
              NeighborGrid supplements community support and is not a
              replacement for emergency response.
            </p>

          </div>

        </div>

        {submitted ? (

          /* SUCCESS SECTION */

          <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center shadow-sm">

            <p className="text-2xl">
              ✅
            </p>

            <h2 className="mt-3 text-xl font-semibold text-emerald-800">
              Request submitted
            </h2>

            <p className="mt-2 text-sm text-emerald-700">
              Your request has been analyzed and added to the community
              request system.
            </p>

            {result && (

              <div className="mt-5 rounded-xl bg-white p-4 text-left text-sm text-slate-700">

                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {result.category}
                </p>

                <p className="mt-2">
                  <strong>
                    Priority:
                  </strong>{" "}
                  {result.urgency}
                </p>

                <p className="mt-2">
                  <strong>
                    Status:
                  </strong>{" "}
                  {finalStatus}
                </p>

                {/* MATCH FOUND */}

                {hasMatch && (

                  <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">

                    <h3 className="font-semibold text-blue-700">
                      🤝 Best Match Found
                    </h3>

                    <p className="mt-3 text-slate-700">
                      <strong>
                        Matched Resource:
                      </strong>{" "}
                      {matchResult.match.matched_resource}
                    </p>

                    <p className="mt-3 text-slate-700">
                      <strong>
                        Why this match:
                      </strong>{" "}
                      {matchResult.match.reason}
                    </p>

                  </div>

                )}

                {/* NO MATCH / NO AVAILABLE RESOURCE */}

                {!hasMatch &&
                  matchResult?.message && (

                    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">

                      <h3 className="font-semibold text-amber-700">
                        ⏳ Waiting for a Resource
                      </h3>

                      <p className="mt-2 text-amber-700">
                        {matchResult.message}
                      </p>

                      <p className="mt-2 text-sm text-slate-600">
                        Your request remains in the system and can be matched
                        when a suitable resource becomes available.
                      </p>

                    </div>

                  )}

              </div>

            )}

            <button
              onClick={handleAnotherRequest}
              className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
            >
              Submit another request
            </button>

          </div>

        ) : (

          /* REQUEST FORM */

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
          >

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              {/* Name */}

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
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Phone */}

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
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Description */}

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
                  placeholder="Describe exactly what you need..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Location */}

              <div className="sm:col-span-2">

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
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* Error */}

            {error && (

              <p className="mt-4 text-center text-sm font-medium text-red-600">
                {error}
              </p>

            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Getting Location & Analyzing Request..."
                : "Submit Request"}
            </button>

          </form>

        )}

        {/* Tips */}

        <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">

          <h3 className="text-sm font-semibold text-slate-900">
            Tips for a faster match
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-slate-600">

            <li>
              • Be specific about quantity and urgency in your description.
            </li>

            <li>
              • Add a clear landmark so neighbors can find you quickly.
            </li>

            <li>
              • Keep your phone reachable — matched neighbors may call directly.
            </li>

          </ul>

        </div>

      </section>

    </div>
  );
}