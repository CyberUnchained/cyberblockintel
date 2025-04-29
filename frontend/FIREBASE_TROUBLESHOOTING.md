# Firebase Authentication Troubleshooting Guide

## API Key Not Valid Error

If you're seeing an "API key not valid" error, follow these steps to resolve the issue:

1. **Check Firebase Console Settings**:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Go to Project Settings (gear icon)
   - Verify that the API key in your `firebase.js` file matches the one in the Firebase Console

2. **Check API Key Restrictions**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project
   - Go to "APIs & Services" > "Credentials"
   - Find your API key and check if it has any restrictions
   - If it's restricted to specific domains, make sure "localhost" is included in the allowed domains

3. **Enable Authentication Methods**:
   - In the Firebase Console, go to "Authentication"
   - Click on "Sign-in method"
   - Enable the authentication methods you want to use (Email/Password and Google)
   - For Google sign-in, configure the OAuth consent screen

4. **Check Firebase Rules**:
   - In the Firebase Console, go to "Authentication" > "Rules"
   - Make sure your rules allow the authentication operations you're trying to perform

5. **Check Network Connectivity**:
   - Ensure your application can connect to Firebase services
   - Check if there are any network restrictions or firewalls blocking the connection

## Google Sign-in Issues

If you're having issues with Google sign-in:

1. **Configure OAuth Consent Screen**:
   - In the Google Cloud Console, go to "APIs & Services" > "OAuth consent screen"
   - Configure the consent screen with the required information
   - Add the necessary scopes (email, profile)

2. **Add Authorized Domains**:
   - In the Firebase Console, go to "Authentication" > "Sign-in method" > "Google"
   - Add "localhost" to the authorized domains

3. **Check Web SDK Configuration**:
   - Make sure you've added the correct Firebase configuration to your `firebase.js` file
   - Verify that you're using the correct project ID and API key

## Email/Password Authentication Issues

If you're having issues with email/password authentication:

1. **Enable Email/Password Authentication**:
   - In the Firebase Console, go to "Authentication" > "Sign-in method"
   - Enable "Email/Password" authentication

2. **Check Password Requirements**:
   - Firebase requires passwords to be at least 6 characters long
   - Make sure your registration form enforces this requirement

3. **Check for Existing Users**:
   - If you're getting an "email-already-in-use" error, the email is already registered
   - Use the "Forgot Password" feature to reset the password for existing accounts

## General Troubleshooting

1. **Check Browser Console**:
   - Open your browser's developer tools (F12)
   - Check the console for any error messages
   - Look for network requests to Firebase services and check their status

2. **Verify Firebase SDK Version**:
   - Make sure you're using a compatible version of the Firebase SDK
   - Check the [Firebase release notes](https://firebase.google.com/support/release-notes/js) for any breaking changes

3. **Test with Firebase Demo App**:
   - Create a simple test app using the Firebase authentication demo
   - Compare the behavior with your application to identify any differences

4. **Contact Firebase Support**:
   - If you've tried all the above steps and are still having issues, contact [Firebase Support](https://firebase.google.com/support)
   - Provide detailed information about the error and your setup 