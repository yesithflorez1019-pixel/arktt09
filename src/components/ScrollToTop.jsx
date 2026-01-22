import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Al cambiar la ruta (pathname), sube el scroll a 0 (arriba)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}