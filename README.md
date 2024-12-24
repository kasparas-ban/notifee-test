# Notifee bug

## Bug description

When using Notifee for Android foreground notifications, `foregroundServiceTypes` parameter sometimes gets overwritten back to it's default value (`shortService`) during the build step.

In this example I try to use foreground notifications with the foregroundServiceType set to `specialUser`.

## Instructions to recreate the bug

1. Make sure you're on the `main` branch. Install all the packages

```bash
npm i
```

2. Run the app

```bash
npx expo run:android
```

You'll get an error saying `Could not resolve app.notifee:core:+.`. Go to the next step.

3. Go to android/build.gradle and add the following

```
maven {
   url "$rootDir/../node_modules/@notifee/react-native/android/libs"
}
```

as instructed in https://github.com/invertase/notifee/issues/350#issuecomment-1489972107

Then go to android/app/src/main/AndroidManifest.xml and add the following

```xml

<manifest xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools">
...
<!-- Permissions -->
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE"/>
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
...
<!-- Service -->
<service android:name="app.notifee.core.ForegroundService" tools:replace="android:foregroundServiceType" android:foregroundServiceType="specialUse" />
...
</manifest>
```

4. Run the app again

```bash
npx expo run:android
```

This time everything should work fine. Try pressing "Show notification", the notification should appear.

5. Build the app as APK

```bash
eas build -p android --profile preview --local
```

6. Install the .apk file directly to the android device and try pressing "Show notification". You'll get an error saying that the required permissions are not in the permissions list.

You can also see the bug with the following steps:

- Run `apktool d build-[some number].apk` to decompile the .apk file.
- Find the AndroidManifest.xml file inside the newly created folder.
- Search for `shortService` inside it. You'll see that the Notifee service is declared with `android:foregroundServiceType="shortService"` instead of `specialUse`.

## Resolution

1. Undo all the changes and start from the clean initial state

2. Delete the word `android` in the `.gitignore` file.

3. Repeat all the steps above to reproduce the bug. You'll find that everything works fine and the `specialUse` does in fact appear in the final APK file.
