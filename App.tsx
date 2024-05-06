import { StatusBar } from "expo-status-bar";

import { ToastProvider } from "@/components/Toast";

import { Routes } from "@/routes";

import "@/styles/global.css";

export default function App() {
  return (
    <ToastProvider position="bottom">
      <Routes />
      <StatusBar style="light" />
    </ToastProvider>
  );
}
