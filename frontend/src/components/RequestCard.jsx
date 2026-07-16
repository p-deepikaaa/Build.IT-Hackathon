import { useState } from "react";
import { MapPin, Clock, Sparkles, X } from "lucide-react";
import PriorityBadge, { StatusPill } from "./PriorityBadge";

function RequestCard({ request }) {
  const isEmergency = request.priority === "emergency";
  const isMatched = request.status?.toLowerCase() === "matched";

  const [matchResult, setMatchResult] = useState(null);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const [matchError, setMatchError] = useState("");

  const findMatch = async () => {
    setLoadingMatch(true);
    setMatchError("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/match/${request.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to find AI match");
      }

      const data = await response.json();

      if (data.match) {
        setMatchResult(data.match);
      } else {
        setMatchError(data.message || "No matching resource found.");
      }
    } catch (error) {
      console.error("AI Match Error:", error);
      setMatchError("Unable to find a match right now.");
    } finally {
      setLoadingMatch(false);
    }
  };

  return (
    <article
      className={`group rounded-2xl border bg-white p-5 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1
      ${isEmergency ? "border-red-500" : "border-gray-200"}`}
    >
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-2 text-xs text-gray-500">
            {request.category}
          </p>

          <StatusPill label={request.status} tone="info" />
        </div>

        <PriorityBadge priority={request.priority} />
      </div>

      {/* Title */}
      <h3 className="mt-5 text-lg font-semibold text-gray-900">
        {request.title}
      </h3>

      {/* Description */}
      <p className="mt-2 leading-relaxed text-gray-600">
        {request.description}
      </p>

      {/* Location & Time */}
      <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={15} />
          {request.location}
        </span>

        <span className="flex items-center gap-1">
          <Clock size={15} />
          {request.time}
        </span>
      </div>

      {/* AI Match Result */}
      {matchResult && (
        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <h4 className="flex items-center gap-2 font-semibold text-blue-700">
              <Sparkles size={17} />
              AI Match Found
            </h4>

            <button
              type="button"
              onClick={() => setMatchResult(null)}
              className="text-gray-400 transition hover:text-gray-600"
            >
              <X size={17} />
            </button>
          </div>

          <p className="mt-3 text-sm text-gray-700">
            <strong>Matched Resource:</strong>{" "}
            {matchResult.matched_resource}
          </p>

          <p className="mt-2 text-sm text-gray-700">
            <strong>Why this match:</strong>{" "}
            {matchResult.reason}
          </p>
        </div>
      )}

      {/* Match Error */}
      {matchError && (
        <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50 p-3 text-sm text-orange-700">
          {matchError}
        </div>
      )}

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <div>
          <p className="font-medium text-gray-800">
            {request.author}
          </p>
        </div>

        {!isMatched && (
          <button
            type="button"
            onClick={findMatch}
            disabled={loadingMatch}
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Sparkles size={16} />

            {loadingMatch
              ? "Finding Match..."
              : matchResult
              ? "Refresh AI Match"
              : "Find AI Match"}
          </button>
        )}
      </div>
    </article>
  );
}

export default RequestCard;