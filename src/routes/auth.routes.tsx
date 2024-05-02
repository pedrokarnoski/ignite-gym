import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { SignIn } from "@/pages/SignIn";
import { SignUp } from "@/pages/SignUp";

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  );
}
