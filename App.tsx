import { StatusBar } from "expo-status-bar";

import { SignIn } from "@/pages/SignIn";

import "@/styles/global.css";

export default function App() {
  return (
    <>
      <SignIn />
      <StatusBar style="light" />
    </>
  );
}
