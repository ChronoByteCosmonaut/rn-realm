import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Links from "../screens/Links";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Links" component={Links} />
    </Stack.Navigator>
  );
}
