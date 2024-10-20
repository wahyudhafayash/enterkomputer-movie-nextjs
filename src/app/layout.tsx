"use client";

import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import MobileNavigation from "./_components/MobileNavigation";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ClerkProvider } from "@clerk/nextjs";

const nunito = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>Enterkomputer Movie</title>
          <link
            rel="icon"
            type="image/png"
            href="https://enterkomputer.com/favicon.ico"
          />
        </head>
        <body className={`pb-14 lg:pb-0 ${nunito.className} antialiased`}>
          <Provider store={store}>
            <Header />
            <main>{children}</main>
            <MobileNavigation />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
