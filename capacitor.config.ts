import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2d705dc2bbb4407880d1413db1b80727',
  appName: 'cesto-amigo-app',
  webDir: 'dist',
  server: {
    url: 'https://2d705dc2-bbb4-4078-80d1-413db1b80727.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#10b981',
      showSpinner: false
    }
  }
};

export default config;