import { Link } from "react-router-dom";
import { MapPin, Clock, Sparkles, ArrowRight } from "lucide-react";
import PriorityBadge, { StatusPill } from "./PriorityBadge";

function RequestCard({ request }) {
  const isEmergency = request.priority === "emergency";

  return (
    <article
      className={`group rounded-2xl border bg-white p-5 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1
      ${isEmergency ? "border-red-500" : "border-gray-200"}`}
    >
      {/* Top Section */}

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs text-gray-500 mb-2">
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

      <p className="mt-2 text-gray-600 leading-relaxed">
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

      {/* Bottom */}

      <div className="mt-6 flex items-center justify-between border-t pt-4">

        <div>
          <p className="font-medium text-gray-800">
            {request.author}
          </p>
        </div>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
        >
          <Sparkles size={16} />
          {request.matches} AI Matches
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>

      </div>
    </article>
  );
}

export default RequestCard;