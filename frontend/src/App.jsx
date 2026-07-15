import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CommunityFeed from "./pages/CommunityFeed";
import NoticeBoard from "./pages/NoticeBoard";
import OfferResource from "./pages/OfferResource";
import RequestHelp from "./pages/RequestHelp";
import ResourceDetails from "./pages/ResourceDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<CommunityFeed />} />
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/offer" element={<OfferResource />} />
        <Route path="/request" element={<RequestHelp />} />
        <Route path="/resource/:id" element={<ResourceDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;