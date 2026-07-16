import { useEffect, useMemo, useState } from "react";

import RequestCard from "../components/RequestCard";

const FILTERS = [
  "All",
  "Medical",
  "Food",
  "Food & Water",
  "Shelter",
  "Electricity",
  "Transport",
];

export default function CommunityFeed() {
  const [requests, setRequests] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://neighborgrid-backend.onrender.com/requests"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch community requests");
        }

        const data = await response.json();

        console.log("Community Feed Requests:", data);

        const formattedRequests = data.map((request) => {
          const urgency = request.urgency?.toLowerCase();

          return {
            id: request.id,

            title: `${request.category || "Community"} Request`,

            description: request.description,

            category: request.category || "Other",

            status: request.status || "Pending",

            priority:
              urgency === "critical"
                ? "emergency"
                : urgency === "high"
                ? "high"
                : urgency === "low"
                ? "low"
                : "medium",

            location: request.location,

            time: "Recently",

            author: request.name,

            matchedResource: request.matched_resource,

            matchReason: request.match_reason,
          };
        });

        setRequests(formattedRequests);
      } catch (err) {
        console.error("Community Feed error:", err);

        setError(
          "Unable to load community requests. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    if (activeFilter === "All") {
      return requests;
    }

    return requests.filter(
      (request) =>
        request.category?.toLowerCase() ===
        activeFilter.toLowerCase()
    );
  }, [activeFilter, requests]);

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-6 py-16">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Community Feed
          </h1>

          <p className="mt-3 text-slate-600">
            Live requests from neighbors near you.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-4 text-center text-blue-700">
            Loading community requests...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-10 rounded-xl border border-red-100 bg-red-50 p-4 text-center text-red-700">
            {error}
          </div>
        )}

        {/* Request Grid */}
        {!loading && !error && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          filteredRequests.length === 0 && (
            <div className="mt-16 text-center">
              <p className="text-slate-500">
                No requests in this category right now.
              </p>
            </div>
          )}

      </section>
    </div>
  );
}