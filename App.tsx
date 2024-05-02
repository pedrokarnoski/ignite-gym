import { StatusBar } from "expo-status-bar";

import { Routes } from "@/routes";
import "@/styles/global.css";

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar style="light" />
    </>
  );
}
