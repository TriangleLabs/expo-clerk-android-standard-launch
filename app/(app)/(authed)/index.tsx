import { useAuth } from "@clerk/clerk-expo";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthedPage() {
  const { signOut } = useAuth();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>This is an authed page!</Text>
      <Button title="Sign out" onPress={() => void signOut()} />
    </SafeAreaView>
  );
}
