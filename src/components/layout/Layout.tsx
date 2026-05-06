import Header from "./Header";
import Navbar from "./Navbar";

export const LayoutGuest = ({ children }: { children: React.ReactNode }) => (
    <>
      <Header />
      {children}
    </>
);

export const Layout = ({ children }: { children: React.ReactNode }) => (
    <>
      <Navbar />
      {children}
    </>
);
