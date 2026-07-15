import { Link } from "react-router-dom";
import { MapPin, Clock, Package, ArrowRight } from "lucide-react";
import { StatusPill } from "./PriorityBadge";

function ResourceCard({ resource }) {
  const statusTone = {
    available: "success",
    reserved: "warning",
    depleted: "neutral",
  };

  return (
    <article className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow transition-all duration-300 hover:border-green-400 hover:shadow-xl">
      {/* Top Green Line */}
      <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-green-500" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">

          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
            <Package className="h-5 w-5 text-green-600" />
          </span>

          <div>
            <p className="text-xs font-medium text-gray-500">
              {resource.category}
            </p>

            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
              Offering
            </span>
          </div>
        </div>

        <StatusPill
          label={resource.status}
          tone={statusTone[resource.status]}
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-base font-semibold">
        {resource.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-600">
        {resource.description}
      </p>

      {/* Quantity & Availability */}
      <div className="mt-4 grid grid-cols-2 gap-3">

        <div className="rounded-lg bg-gray-100 p-3">
          <p className="text-xs uppercase text-gray-500">
            Quantity
          </p>

          <p className="mt-1 flex items-center gap-2 font-medium">
            <Package size={15} />
            {resource.quantity}
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 p-3">
          <p className="text-xs uppercase text-gray-500">
            Available
          </p>

          <p className="mt-1 flex items-center gap-2 font-medium">
            <Clock size={15} />
            {resource.availability}
          </p>
        </div>

      </div>

      {/* Location */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">

        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {resource.location}
        </span>

        <span className="flex items-center gap-1">
          <Clock size={14} />
          {resource.time}
        </span>

      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t pt-4">

        <div>
          <p className="font-medium text-gray-800">
            {resource.author}
          </p>
        </div>

        <Link
          to="/resource"
          className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200"
        >
          View Details
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>

      </div>
    </article>
  );
}

export default ResourceCard;