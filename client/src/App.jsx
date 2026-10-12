import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import KayChat from "./components/KayChat.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import AutoReveal from "./components/AutoReveal.jsx";
import PageMeta from "./components/PageMeta.jsx";
import NotFound from "./pages/NotFound.jsx";
import Admin from "./pages/Admin.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import ServiceWebDesign from "./pages/ServiceWebDesign.jsx";
import Work from "./pages/Work.jsx";
import WorkCategory from "./pages/WorkCategory.jsx";
import CaseStudies from "./pages/CaseStudies.jsx";
import WorkProject from "./pages/WorkProject.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/web-design" element={<ServiceWebDesign />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/case-studies" element={<CaseStudies />} />
          <Route path="/work/:category" element={<WorkCategory />} />
          <Route path="/work/:category/:slug" element={<WorkProject />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <KayChat />
      <CustomCursor />
      <AutoReveal />
      <PageMeta />
    </div>
  );
}
