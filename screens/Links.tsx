import { View, Text } from "react-native";
import React from "react";
import Logout from "../components/Logout";
import { useNavigation } from "@react-navigation/native";

const Links = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Log out",
      headerLeft: () => <Logout />,
    });
  }, [navigation]);
  return (
    <View>
      <Text>Links go here</Text>
    </View>
  );
};

export default Links;
