import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cesto.amigo',   // <-- ID válido para Android
  appName: 'Cesto Amigo',
  webDir: 'dist',
  bundledWebRuntime: false
};

export default config;
