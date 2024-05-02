import { StatusBar } from "expo-status-bar";

import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";

import "@/styles/global.css";

export default function App() {
  return (
    <>
      <SignUp />
      <StatusBar style="light" />
    </>
  );
}
