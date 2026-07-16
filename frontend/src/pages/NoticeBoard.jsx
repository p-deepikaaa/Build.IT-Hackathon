import PriorityBadge from "../components/PriorityBadge";

const NOTICES = [
  {
    id: 1,
    title: "Free Medical Camp",
    category: "Medical",
    date: "July 16, 2026",
    priority: "high",
    description:
      "A free medical camp is being organized at the Community Hall from 9 AM to 4 PM. Basic health checkups, first-aid support, and essential medicines will be available.",
    emoji: "🩺",
  },
  {
    id: 2,
    title: "Emergency Shelter Available",
    category: "Shelter",
    date: "July 16, 2026",
    priority: "critical",
    description:
      "Temporary emergency shelter is available at the Community Center. Beds, blankets, drinking water, and basic supplies are available for residents in need.",
    emoji: "🏠",
  },
  {
    id: 3,
    title: "Food Distribution Drive",
    category: "Food & Water",
    date: "July 16, 2026",
    priority: "medium",
    description:
      "Food packets and drinking water are being distributed at the community collection point from 12 PM to 3 PM. Residents requiring assistance can visit during these hours.",
    emoji: "📦",
  },
  {
    id: 4,
    title: "Temporary Road Closure",
    category: "Transport",
    date: "July 15, 2026",
    priority: "medium",
    description:
      "A nearby main road is temporarily closed due to maintenance work. Residents are advised to use alternate routes and allow additional travel time.",
    emoji: "🚧",
  },
  {
    id: 5,
    title: "Power Supply Update",
    category: "Electricity",
    date: "July 15, 2026",
    priority: "low",
    description:
      "Power supply has been restored in most affected areas. Residents still experiencing outages can submit a help request through NeighborGrid.",
    emoji: "⚡",
  },
];

export default function NoticeBoard() {
  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Notice Board
          </h1>

          <p className="mt-3 text-slate-600">
            Important community updates, emergency alerts, and local
            announcements.
          </p>
        </div>

        {/* Notices */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {NOTICES.map((notice) => (
            <article
              key={notice.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Top Section */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl">
                    {notice.emoji}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {notice.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                      {notice.category}
                    </p>
                  </div>
                </div>

                <PriorityBadge priority={notice.priority} />
              </div>

              {/* Description */}
              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                {notice.description}
              </p>

              {/* Date */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <span className="text-xs font-medium text-slate-400">
                  Posted on {notice.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}