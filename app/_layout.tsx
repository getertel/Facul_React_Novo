// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'react-native';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerStyle: { backgroundColor: '#f5f5f5', width: 240 },
        }}
      >
        <Drawer.Screen name="index" options={{ title: '🏠 Início' }} />
        <Drawer.Screen name="Sobre1" options={{ title: 'ℹ️ Sobre' }} />
      </Drawer>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
    </ThemeProvider>
  );
}