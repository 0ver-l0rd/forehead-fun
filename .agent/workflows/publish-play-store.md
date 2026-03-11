---
description: How to publish the Capacitor Android app to Google Play Store
---

# Publishing to Google Play Store (Android)

Follow these steps to generate a production-ready build and submit it to the Play Store.

## 1. Prepare for Release
- **Update App ID**: Ensure `appId` in `capacitor.config.ts` is your unique domain (e.g., `com.yourname.guesswho`).
- **Update Version**: Change `versionCode` and `versionName` in `android/app/build.gradle` for every new release.
- **App Icons**: Replace generic icons in `android/app/src/main/res/mipmap-*`.

## 2. Generate signed AAB (Android App Bundle)
1. Open the project in **Android Studio**.
2. Go to **Build > Generate Signed Bundle / APK...**.
3. Select **Android App Bundle** and click Next.
4. **Create a new Key Store**:
   - Keep this file safe! If you lose it, you cannot update your app.
   - Fill in the passwords and certificate details.
5. Select the **Release** build variant.
6. Click **Finish**. Your `.aab` file will be in `android/app/release/`.

## 3. Google Play Console Setup
1. Create a developer account at [play.google.com/console](https://play.google.com/console) (one-time $25 fee).
2. Click **Create app** and fill in basic details.
3. Complete the **Set up your app** tasks (Privacy policy, Content rating, Target audience, etc.).

## 4. Upload and Release
1. Go to **Production** or **Internal Testing** in the sidebar.
2. Click **Create new release**.
3. Upload the `.aab` file you generated in Step 2.
4. Review and rollout the release!

// turbo
## Summary Checklist
- [ ] Unique `appId` set?
- [ ] Signed AAB generated?
- [ ] Store listing (screenshots/descriptions) ready?
- [ ] Content ratings completed?
