// app/layout.js
import "../public/assets/css/style.css";
import "../public/assets/css/about.css";
import "../public/assets/css/prestations.css";
import "../public/assets/css/galerie.css";
import "../public/assets/css/realisations.css";
import "../public/assets/css/contact.css";
import "../public/assets/css/devis.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "D&D Prime - Interior & Event",
  description: "Décoration d'intérieur & événementiel sur-mesure",
};

export default function RootLayout({ children }) {
  const isHomePage = typeof window !== "undefined" && window.location.pathname === "/";
  return (
    <html lang="fr">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
          rel="stylesheet"
        />
      </head>
      {/* <body className={isHomePage ? "home-page" : ""}> */}
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
