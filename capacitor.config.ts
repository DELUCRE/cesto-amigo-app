import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cesto.amigo',   // Identificador único do app
  appName: 'Cesto Amigo',     // Nome que aparecerá no celular
  webDir: 'dist',             // Pasta onde ficam os arquivos buildados do seu front
  bundledWebRuntime: false
};

export default config;
