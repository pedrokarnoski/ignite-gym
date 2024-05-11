import { StatusBar } from "expo-status-bar";

import { ToastProvider } from "@/components/Toast";

import { Routes } from "@/routes";

import { AuthContextProvider } from "@/contexts/AuthContext";

import "@/styles/global.css";

export default function App() {
  return (
    <ToastProvider position="bottom">
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
      <StatusBar style="light" />
    </ToastProvider>
  );
}
