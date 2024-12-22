# Debugging Clerk Expo Google OAuth with Android "standard" launchMode

When setting Android launch mode to "standard" instead of the default "singleTask," the Oauth flow fails to set an active session. We need to be able to use "singleTask" launch mode for `react-native-purchases` on Android, as instructed in the [installation documentation](https://www.revenuecat.com/docs/getting-started/installation/android#set-the-correct-launchmode).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo run:android
   ```
3. Add the Clerk publishable key in `app/_layout.tsx`
   ```js
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
   ```

You'll notice that after completing the OAuth flow and redirecting back to the app, the app hangs at the `app/oauth-native-callback.tsx` screen because `isSignedIn` is false.

The Expo plugin `plugins/android-standard-launch.js` changes the Android launch mode to "standard." If you remove this plugin, you can see that the OAuth flow works as expected again.
