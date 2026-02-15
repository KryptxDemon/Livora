import { Stack } from 'expo-router';

export default function WorkerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="new-or-returning" />
      <Stack.Screen name="login" />
      <Stack.Screen name="registration-method" />
      <Stack.Screen name="register/face-capture" />
      <Stack.Screen name="register/basic-info" />
      <Stack.Screen name="register/skills" />
      <Stack.Screen name="register/experience" />
      <Stack.Screen name="register/work-location" />
      <Stack.Screen name="register/id-upload" />
      <Stack.Screen name="register/otp-verify" />
      <Stack.Screen name="voice-form" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
