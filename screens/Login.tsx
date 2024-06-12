import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../providers/AuthProvider";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const { user, signUp, signIn } = useAuth();

  const onPressSignIn = async () => {
    console.log("Trying sign in with user: " + email);
    try {
      await signIn(email, password);
    } catch (error) {
      const errorMessage = `Failed to sign in: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };

  const onPressSignUp = async () => {
    console.log("Trying signup with user: " + email);
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      const errorMessage = `Failed to sign up: ${error.message}`;
      console.error(errorMessage);
      Alert.alert(errorMessage);
    }
  };

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user != null) {
      navigation.navigate("Links");
    }
  }, [user]);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      style={{ flex: 1, paddingHorizontal: 16 }}
    >
      <View style={{ gap: 16, paddingTop: 24 }}>
        <Text style={{ fontWeight: 700, fontSize: 24 }}>
          Enter your details:
        </Text>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.12)",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 4,
            paddingHorizontal: 12,
          }}
        >
          <TextInput
            onChangeText={setEmail}
            style={{ paddingVertical: 10, flex: 1 }}
            placeholder="email"
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.12)",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 4,
            paddingHorizontal: 12,
          }}
        >
          <TextInput
            onChangeText={setPassword}
            style={{ paddingVertical: 10, flex: 1 }}
            placeholder="password"
            secureTextEntry={passwordShown ? false : true}
          />
          <Pressable
            style={({ pressed }) => [
              { transform: [{ scale: pressed ? 0.8 : 1 }] },
            ]}
            onPress={() => setPasswordShown(!passwordShown)}
          >
            <Ionicons size={20} name={passwordShown ? "eye-off" : "eye"} />
          </Pressable>
        </View>
      </View>

      <Button onPress={onPressSignIn} title="Sign In" />
      <Button onPress={onPressSignUp} title="Sign Up" />
    </ScrollView>
  );
};

export default Login;
