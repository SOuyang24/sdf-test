import React, { ReactNode } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
interface LayoutProps {
  children: ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
