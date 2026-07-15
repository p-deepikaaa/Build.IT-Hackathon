
import PriorityBadge from "../components/PriorityBadge";

const NOTICES = [
  {
    id: 1,
    title: "Medical Camp",
    category: "Medical",
    date: "July 16, 2026",
    priority: "High",
    description:
      "Free medical camp at Community Hall from 9 AM to 4 PM. Doctors and basic medicine available for all residents.",
    emoji: "🩺",
  },
  {
    id: 2,
    title: "Road Closed",
    category: "Transport",
    date: "July 15, 2026",
    priority: "Medium",
    description:
      "Main Street between 4th and 6th Avenue is closed for emergency repairs. Please use alternate routes.",
    emoji: "🚧",
  },
  {
    id: 3,
    title: "Community Shelter Open",
    category: "Shelter",
    date: "July 15, 2026",
    priority: "Critical",
    description:
      "Emergency shelter now open at Lincoln School Gymnasium. Beds, blankets, and meals available 24/7.",
    emoji: "🏠",
  },
  {
    id: 4,
    title: "Power Restored",
    category: "Electricity",
    date: "July 14, 2026",
    priority: "Low",
    description:
      "Power has been restored to Sectors 4 and 5. If your area is still affected, please report it.",
    emoji: "⚡",
  },
  {
    id: 5,
    title: "Food Distribution",
    category: "Food",
    date: "July 14, 2026",
    priority: "Medium",
    description:
      "Free food packets being distributed at the Central Park pavilion from 12 PM to 3 PM daily.",
    emoji: "🍞",
  },
];

export default function NoticeBoard() {
  return (
    <div className="min-h-screen bg-white">
      

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Notice Board</h1>
          <p className="mt-3 text-slate-600">
            Official community updates, closures, and announcements.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {NOTICES.map((notice) => (
            <div
              key={notice.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-xl">
                    {notice.emoji}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{notice.title}</h3>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      {notice.category}
                    </p>
                  </div>
                </div>
                <PriorityBadge priority={notice.priority} />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">{notice.description}</p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-medium text-slate-400">{notice.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}