const { AndroidConfig, withAndroidManifest } = require("expo/config-plugins");
const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

function updateMainActivityLaunchMode(androidManifest) {
  const mainApplication = getMainApplicationOrThrow(androidManifest);

  if (!mainApplication.activity) {
    // If for some reason activities don't exist, just return
    return androidManifest;
  }

  // Find the MainActivity element
  const mainActivity = mainApplication.activity.find(
    (activity) => activity.$["android:name"] === ".MainActivity"
  );

  if (mainActivity) {
    // Update the launch mode of MainActivity to "standard"
    mainActivity.$["android:launchMode"] = "standard";
  }

  return androidManifest;
}

module.exports = function withBillingPermissionAndLaunchMode(config) {
  return withAndroidManifest(config, (config) => {
    let androidManifest = config.modResults;

    // Update MainActivity launchMode
    androidManifest = updateMainActivityLaunchMode(androidManifest);

    config.modResults = androidManifest;
    return config;
  });
};
