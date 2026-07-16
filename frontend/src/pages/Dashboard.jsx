import { useEffect, useState } from "react";

import RequestCard from "../components/RequestCard";
import ResourceCard from "../components/ResourceCard";
import SummaryCard, { StatCard } from "../components/SummaryCard";
import MapCard from "../components/MapCard";

import {
  Activity,
  Package,
  AlertTriangle,
} from "lucide-react";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch requests and resources from FastAPI
        const [requestsResponse, resourcesResponse] = await Promise.all([
          fetch("https://neighborgrid-backend.onrender.com/requests"),
          fetch("https://neighborgrid-backend.onrender.com/resources"),
        ]);

        if (!requestsResponse.ok || !resourcesResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const requestsData = await requestsResponse.json();
        const resourcesData = await resourcesResponse.json();

        console.log("Dashboard Requests:", requestsData);
        console.log("Dashboard Resources:", resourcesData);

        // Convert backend request structure
        // into the structure expected by RequestCard
        const formattedRequests = requestsData.map((request) => ({
          id: request.id,

          title: request.description
            ? request.description.length > 45
              ? `${request.description.substring(0, 45)}...`
              : request.description
            : "Community Help Request",

          description: request.description,

          category: request.category,

          status: request.status || "Pending",

          priority:
            request.urgency?.toLowerCase() === "critical"
              ? "emergency"
              : request.urgency?.toLowerCase() || "medium",

          location: request.location,

          // Keep coordinates returned by backend
          latitude: request.latitude,
          longitude: request.longitude,

          // Backend currently does not store timestamps
          time: "Recently",

          author: request.name,
        }));

        // Convert backend resource structure
        // into the structure expected by ResourceCard
        const formattedResources = resourcesData.map((resource) => ({
          id: resource.id,

          title:
            resource.resource_type ||
            "Community Resource",

          description: resource.description,

          category: resource.resource_type,

          status:
            resource.availability
              ?.toLowerCase()
              .includes("available")
              ? "available"
              : "reserved",

          quantity: resource.quantity,

          availability: resource.availability,

          location: resource.location,

          // Keep coordinates returned by backend
          latitude: resource.latitude,
          longitude: resource.longitude,

          // Backend currently does not store timestamps
          time: "Recently",

          author: resource.name,
        }));

        setRequests(formattedRequests);
        setResources(formattedResources);

      } catch (err) {
        console.error(
          "Dashboard error:",
          err
        );

        setError(
          "Unable to load dashboard data. Make sure the backend is running."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Dashboard statistics from REAL database data
  const openRequests = requests.filter(
    (request) =>
      request.status?.toLowerCase() === "pending" ||
      request.status?.toLowerCase() === "open"
  ).length;

  const availableResources = resources.filter(
    (resource) =>
      resource.status === "available"
  ).length;

  const emergencyAlerts = requests.filter(
    (request) =>
      request.priority === "emergency" &&
      (
        request.status?.toLowerCase() === "pending" ||
        request.status?.toLowerCase() === "open"
      )
  ).length;

  // Create Leaflet map points from requests and resources
  const mapPoints = [
    // Request markers
    ...requests
      .filter(
        (request) =>
          request.latitude != null &&
          request.longitude != null
      )
      .map((request) => ({
        id: `request-${request.id}`,
        lat: request.latitude,
        lng: request.longitude,
        title: request.title,
        kind: "need",
      })),

    // Resource markers
    ...resources
      .filter(
        (resource) =>
          resource.latitude != null &&
          resource.longitude != null
      )
      .map((resource) => ({
        id: `resource-${resource.id}`,
        lat: resource.latitude,
        lng: resource.longitude,
        title: resource.title,
        kind: "resource",
      })),
  ];

  console.log(
    "Map Points:",
    mapPoints
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Heading */}

      <h1 className="mb-8 text-4xl font-bold">
        Community Dashboard
      </h1>

      {/* Loading */}

      {loading && (
        <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-4 text-blue-700">
          Loading community dashboard...
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="mb-8 rounded-xl border border-red-100 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          icon={Activity}
          label="Open Requests"
          value={openRequests.toString()}
          trend="Live data"
          tone="primary"
        />

        <StatCard
          icon={Package}
          label="Available Resources"
          value={availableResources.toString()}
          trend="Live data"
          tone="success"
        />

        <StatCard
          icon={AlertTriangle}
          label="Emergency Alerts"
          value={emergencyAlerts.toString()}
          tone="emergency"
        />

      </div>

      {/* AI Summary */}

      <div className="mt-8">

        <SummaryCard
          body={`NeighborGrid currently has ${openRequests} open requests and ${availableResources} available resources. ${emergencyAlerts} active critical requests require priority attention.`}
          items={[
            {
              label: "Requests",
              value: requests.length.toString(),
            },
            {
              label: "Resources",
              value: resources.length.toString(),
            },
            {
              label: "Emergency",
              value: emergencyAlerts.toString(),
            },
          ]}
        />

      </div>

      {/* Map */}

      <h2 className="mb-6 mt-10 text-2xl font-bold">
        Nearby Requests & Resources
      </h2>

      <MapCard points={mapPoints} />

      {/* Recent Requests */}

      <h2 className="mb-6 mt-10 text-2xl font-bold">
        Recent Requests
      </h2>

      <div className="grid gap-6">

        {!loading &&
          requests.length === 0 && (
            <p className="text-slate-500">
              No requests available.
            </p>
          )}

        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
          />
        ))}

      </div>

      {/* Available Resources */}

      <h2 className="mb-6 mt-12 text-2xl font-bold">
        Available Resources
      </h2>

      <div className="grid gap-6">

        {!loading &&
          resources.length === 0 && (
            <p className="text-slate-500">
              No resources available.
            </p>
          )}

        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
          />
        ))}

      </div>

    </div>
  );
}

export default Dashboard;