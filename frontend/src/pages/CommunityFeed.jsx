import { useMemo, useState } from "react";

import RequestCard from "../components/RequestCard";

const FILTERS = ["All", "Medical", "Food", "Shelter", "Electricity", "Transport"];

const DUMMY_REQUESTS = [
  {
    id: 1,
    name: "Aditi Sharma",
    category: "Medical",
    priority: "Critical",
    description: "Need insulin urgently, pharmacy nearby is closed.",
    location: "Baner Road, Pune",
    time: "10 min ago",
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Rohan Verma",
    category: "Food",
    priority: "Medium",
    description: "Family of 4 needs dry rations for two days.",
    location: "Kothrud, Pune",
    time: "25 min ago",
    phone: "+91 98765 11223",
  },
  {
    id: 3,
    name: "Meera Iyer",
    category: "Shelter",
    priority: "High",
    description: "Home flooded, need temporary shelter for the night.",
    location: "Deccan Gymkhana, Pune",
    time: "40 min ago",
    phone: "+91 98765 99887",
  },
  {
    id: 4,
    name: "Kabir Singh",
    category: "Electricity",
    priority: "Low",
    description: "Looking for a power bank to charge medical devices.",
    location: "Aundh, Pune",
    time: "1 hr ago",
    phone: "+91 98765 66554",
  },
  {
    id: 5,
    name: "Priya Nair",
    category: "Transport",
    priority: "High",
    description: "Need a ride to the hospital, no cabs available.",
    location: "Hinjewadi, Pune",
    time: "2 hr ago",
    phone: "+91 98765 33221",
  },
  {
    id: 6,
    name: "Arjun Patel",
    category: "Medical",
    priority: "Medium",
    description: "Need first-aid supplies for a minor injury.",
    location: "Viman Nagar, Pune",
    time: "3 hr ago",
    phone: "+91 98765 44556",
  },
];

export default function CommunityFeed() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredRequests = useMemo(() => {
    if (activeFilter === "All") return DUMMY_REQUESTS;
    return DUMMY_REQUESTS.filter((r) => r.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-white">
      
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Community Feed</h1>
          <p className="mt-3 text-slate-600">
            Live requests from neighbors near you, updated in real time.
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

        {/* Request grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((item) => {
  const priorityMap = {
    emergency: "emergency",
    High: "high",
    Medium: "medium",
    Low: "low",
  };

  return (
    <RequestCard
      key={item.id}
      request={{
        title: item.category + " Request",
        description: item.description,
        category: item.category,
        status: "open",
        priority: priorityMap[item.priority],
        location: item.location,
        time: item.time,
        author: item.name,
        matches: Math.floor(Math.random() * 5) + 1,
      }}
    />
  );
})}
        </div>

        {filteredRequests.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-slate-500">No requests in this category right now.</p>
          </div>
        )}
      </section>
    </div>
  );
}