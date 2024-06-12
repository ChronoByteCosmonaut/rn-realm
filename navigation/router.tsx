import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../providers/AuthProvider";
import MainStack from "./main";
import AuthStack from "./auth";

const Router = () => {
  const { currentUser } = useAuth();
  console.log("🚀 ~ Router ~ currentUser:", currentUser?.id);

  return currentUser?.id ? <MainStack /> : <AuthStack />;
};

export default Router;
