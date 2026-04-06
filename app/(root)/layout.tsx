import NavbarMegaMenu from "@/components/layout/NavbarMegaMenu";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarMegaMenu />
      <main>{children}</main>
      <Footer />
    </>
  );
}