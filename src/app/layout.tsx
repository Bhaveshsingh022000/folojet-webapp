import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Branded tracking pages for Shopify merchants",
  description:
    "Branded tracking pages personalized for Shopify merchants. Say good bye to boring Fedex and UPS tracking pages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
