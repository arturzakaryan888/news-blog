"use client";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ScrollToBottomButton from "@/components/ScrollToBottomButton";
import Header from "@/components/Header";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900">
        <ThemeProvider attribute="class">
          <Header />
          {children}
          <ScrollToBottomButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
