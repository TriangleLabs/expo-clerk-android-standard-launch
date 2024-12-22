import { Slot } from "expo-router";

import { ClerkProvider, getClerkInstance } from "@clerk/clerk-expo";
import Constants from "expo-constants";

const publishableKey = "CLERK_PUBLISHABLE_KEY";

export const clerkInstance = getClerkInstance({
  publishableKey,
});

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Slot />
    </ClerkProvider>
  );
}
