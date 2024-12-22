import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function OauthNativeCallback() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      void router.replace("/");
    }
  }, [isSignedIn, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
