import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
