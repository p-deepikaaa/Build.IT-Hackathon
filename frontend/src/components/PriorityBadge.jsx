function PriorityBadge({ priority, className = "" }) {
  const styles = {
    emergency: {
      badge: "bg-red-100 text-red-700 border-red-300",
      dot: "bg-red-500",
      label: "Emergency",
    },
    high: {
      badge: "bg-orange-100 text-orange-700 border-orange-300",
      dot: "bg-orange-500",
      label: "High",
    },
    medium: {
      badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
      dot: "bg-yellow-500",
      label: "Medium",
    },
    low: {
      badge: "bg-green-100 text-green-700 border-green-300",
      dot: "bg-green-500",
      label: "Low",
    },
  };

  const meta = styles[priority] || styles.low;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${meta.badge} ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${meta.dot} ${
          priority === "emergency" ? "animate-pulse" : ""
        }`}
      />
      {meta.label}
    </span>
  );
}

export default PriorityBadge;

export function StatusPill({ label, tone = "neutral" }) {
  const tones = {
    neutral: "bg-gray-100 text-gray-700 border-gray-300",
    success: "bg-green-100 text-green-700 border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${tones[tone]}`}
    >
      {label}
    </span>
  );
}