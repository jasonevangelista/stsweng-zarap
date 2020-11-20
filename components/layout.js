import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <section>{children}</section>
      <Footer />
    </div>
  );
}
