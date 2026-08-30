import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CfaPage from "./pages/CfaPage";
import FrmPage from "./pages/FrmPage";
import FmPage from "./pages/FmPage";
import DemoPage from "./pages/DemoPage";
import ContactPage from "./pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cfa" element={<CfaPage />} />
          <Route path="/frm" element={<FrmPage />} />
          <Route path="/fm" element={<FmPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
