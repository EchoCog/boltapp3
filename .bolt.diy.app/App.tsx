import React, { useEffect } from 'react';
import { AppNavigator } from './app/navigation/AppNavigator';
import { initializeOfflineSupport } from './app/stores/offline';
import { initializeMonitoring } from './app/lib/modules/llm/android/monitoring';
import { initializeAllTasks } from './app/lib/modules/llm/android/tasks';
import { AndroidProviderRegistry } from './app/lib/modules/llm/android/registry';
import { backgroundTasks } from './app/utils/backgroundTasks';

export default function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize core services
        await initializeOfflineSupport();
        await initializeMonitoring();
        await initializeAllTasks();
        await AndroidProviderRegistry.getInstance().initialize();
        await backgroundTasks.start();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initializeApp();

    return () => {
      // Cleanup
      backgroundTasks.stop();
    };
  }, []);

  return <AppNavigator />;
}