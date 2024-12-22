import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();

enum Strategy {
  Google = "oauth_google",
}

export default function SignIn() {
  const [oauthPending, setOauthPending] = useState<Strategy.Google>();

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: Strategy.Google,
  });

  const onSelectAuth = async (strategy: Strategy) => {
    setOauthPending(strategy);

    const startOAuthFlow = {
      [Strategy.Google]: startGoogleOAuthFlow,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }

    setOauthPending(undefined);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Button
        title="Continue with Google"
        onPress={() => onSelectAuth(Strategy.Google)}
        disabled={Boolean(oauthPending)}
      />
    </SafeAreaView>
  );
}
