import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, HeartHandshake, Plus, Bell } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/feed", label: "Community Feed" },
  { to: "/notices", label: "Notice Board" },
];
const notifications = [
  {
    id: 1,
    title: "Medical Request",
    message: "Need insulin near Sector 8",
    time: "2 min ago",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "Resource Available",
    message: "Food packets available in Sector 3",
    time: "8 min ago",
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Flood Alert",
    message: "Heavy rainfall expected tonight",
    time: "20 min ago",
    color: "bg-yellow-500",
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

const dropdownRef = useRef(null);
useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
}, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 shadow-lg">
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5 text-white" />
          </div>

          <span className="text-2xl font-bold text-white">
            Neighbor<span className="text-blue-500">Grid</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">

          <div className="relative" ref={dropdownRef}>

  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative text-white hover:text-blue-400 transition"
  >
    <Bell size={22} />

    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
  </button>

  {showNotifications && (

    <div className="absolute right-0 mt-4 w-80 rounded-xl bg-white shadow-2xl border z-50 overflow-hidden">

      <div className="px-4 py-3 border-b font-semibold">
        Notifications
      </div>

      {notifications.map((item) => (

        <div
          key={item.id}
          className="flex gap-3 px-4 py-3 border-b hover:bg-gray-50"
        >

          <div
            className={`mt-2 h-3 w-3 rounded-full ${item.color}`}
          ></div>

          <div>

            <h4 className="font-medium text-gray-800">
              {item.title}
            </h4>

            <p className="text-sm text-gray-600">
              {item.message}
            </p>

            <span className="text-xs text-gray-400">
              {item.time}
            </span>

          </div>

        </div>

      ))}

      <Link
        to="/notices"
        onClick={() => setShowNotifications(false)}
        className="block text-center py-3 text-blue-600 font-medium hover:bg-gray-50"
      >
        View All Notifications →
      </Link>

    </div>

  )}

</div>

          <Link
            to="/request"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
          >
            <Plus size={18} />
            Request Help
          </Link>

        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-slate-800 px-6 py-4 space-y-4">

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/request"
            className="block bg-blue-600 text-center text-white py-2 rounded-lg"
          >
            Request Help
          </Link>

          <Link
            to="/offer"
            className="block bg-green-600 text-center text-white py-2 rounded-lg"
          >
            Offer Resource
          </Link>

        </div>
      )}
    </header>
  );
}

export default Navbar;