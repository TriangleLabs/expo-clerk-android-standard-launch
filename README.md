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

The Expo plugin `plugins/android-standard-launch.js` changes the Android launch mode to "standard." If you remove this plugin, you can see that the Oauth mode works fine again.
