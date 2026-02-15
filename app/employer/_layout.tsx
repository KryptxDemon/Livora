import { Stack } from 'expo-router';

export default function EmployerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="registration" />
      <Stack.Screen name="package-select" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="post-job" />
      <Stack.Screen name="job-matching" />
      <Stack.Screen name="hiring-options" />
      <Stack.Screen name="rating" />
      <Stack.Screen name="complaint" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
