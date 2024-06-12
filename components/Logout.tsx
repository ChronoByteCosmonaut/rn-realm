import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useAuth } from "../providers/AuthProvider";

const Logout = ({ closeRealm }: { closeRealm?: any }) => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  return (
    <Button
      title="Log Out"
      onPress={() => {
        Alert.alert("Log Out", null, [
          {
            text: "Yes, Log Out",
            style: "destructive",
            onPress: () => {
              //   navigation?.dispatch(StackActions.popToTop());
              //   closeRealm();
              signOut();
            },
          },
          { text: "Cancel", style: "cancel" },
        ]);
      }}
    />
  );
};

export default Logout;
