"use client";

import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
// import Footer from "./_components/Footer";
import MobileNavigation from "./_components/MobileNavigation";
import { Provider } from "react-redux";
import { store } from "../store/store";

const nunito = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`pb-14 lg:pb-0 ${nunito.className} antialiased`}>
        <Provider store={store}>
          <Header />

          <main>{children}</main>

          {/* <Footer /> */}

          <MobileNavigation />
        </Provider>
      </body>
    </html>
  );
}
