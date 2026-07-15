import RequestCard from "../components/RequestCard";
import ResourceCard from "../components/ResourceCard";
import SummaryCard, { StatCard } from "../components/SummaryCard";
import MapCard from "../components/MapCard";

import {
  Activity,
  Package,
  AlertTriangle,
} from "lucide-react";

const requests = [
  {
    title: "Need Insulin",
    description: "Urgently need insulin for my father.",
    category: "Medical",
    status: "Open",
    priority: "emergency",
    location: "Sector 8",
    time: "5 mins ago",
    author: "Rahul",
    matches: 3,
  },
  {
    title: "Need Drinking Water",
    description: "Family of four needs clean drinking water.",
    category: "Food",
    status: "Open",
    priority: "high",
    location: "Sector 4",
    time: "20 mins ago",
    author: "Priya",
    matches: 2,
  },
];

const resources = [
  {
    title: "Generator Available",
    description: "Portable generator available for emergency use.",
    category: "Electricity",
    status: "available",
    quantity: "2 Units",
    availability: "24 Hours",
    location: "Sector 5",
    time: "10 mins ago",
    author: "Aisha",
  },
  {
    title: "Food Packets",
    description: "Cooked meals available for affected families.",
    category: "Food",
    status: "available",
    quantity: "30 Meals",
    availability: "Until 8 PM",
    location: "Sector 3",
    time: "25 mins ago",
    author: "John",
  },
];

const points = [
  {
    id: 1,
    title: "Need Insulin",
    lat: 12.9716,
    lng: 77.5946,
    kind: "need",
  },
  {
    id: 2,
    title: "Water Available",
    lat: 12.975,
    lng: 77.598,
    kind: "offer",
  },
  {
    id: 3,
    title: "Food Packets",
    lat: 12.969,
    lng: 77.59,
    kind: "offer",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8">
        Community Dashboard
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">

        <StatCard
          icon={Activity}
          label="Open Requests"
          value="12"
          trend="+4 today"
          tone="primary"
        />

        <StatCard
          icon={Package}
          label="Available Resources"
          value="26"
          trend="+8"
          tone="success"
        />

        <StatCard
          icon={AlertTriangle}
          label="Emergency Alerts"
          value="3"
          tone="emergency"
        />

      </div>

      {/* AI Summary */}
      <div className="mt-8">

        <SummaryCard
          body="The AI has detected an increase in medical requests in Sector 8. Food and water supplies remain stable, while generator availability is limited. Priority matching is recommended for emergency medical needs."
          items={[
            {
              label: "Requests",
              value: "12",
            },
            {
              label: "Resources",
              value: "26",
            },
            {
              label: "Matches",
              value: "18",
            },
          ]}
        />

      </div>

      {/* Map */}
      <h2 className="text-2xl font-bold mt-10 mb-6">
        Nearby Requests & Resources
      </h2>

      <MapCard points={points} />

      {/* Requests */}
      <h2 className="text-2xl font-bold mt-10 mb-6">
        Recent Requests
      </h2>

      <div className="grid gap-6">
        {requests.map((request, index) => (
          <RequestCard
            key={index}
            request={request}
          />
        ))}
      </div>

      {/* Resources */}
      <h2 className="text-2xl font-bold mt-12 mb-6">
        Available Resources
      </h2>

      <div className="grid gap-6">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            resource={resource}
          />
        ))}
      </div>

    </div>
  );
}

export default Dashboard;