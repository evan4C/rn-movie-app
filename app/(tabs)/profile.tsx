import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";
const profile = () => {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5 ">
        <Image source={icons.person} className="size-10" tintColor="#FFF" />
        <Text className="text-gray-500 text-base">Profile</Text>
      </View>
    </View>
  );
};

export default profile;
