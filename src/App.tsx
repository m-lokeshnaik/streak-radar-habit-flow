
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useEffect } from 'react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    console.log(`Initializing app on ${Capacitor.getPlatform()} platform`);

    if (Capacitor.isNativePlatform()) {
      // Hide splash screen after initialization
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        setTimeout(async () => {
          await SplashScreen.hide();
        }, 3000);
      }

      // Configure status bar for mobile
      if (Capacitor.isPluginAvailable('StatusBar')) {
        await StatusBar.setBackgroundColor({ color: '#7C3AED' });
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setOverlaysWebView({ overlay: false });
      }

      // Handle Android back button
      if (Capacitor.isPluginAvailable('App')) {
        CapacitorApp.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            CapacitorApp.exitApp();
          } else {
            window.history.back();
          }
        });

        // Handle app state changes
        CapacitorApp.addListener('appStateChange', ({ isActive }) => {
          console.log('App state changed. Is active?', isActive);
        });

        // Handle app URL open (for deep linking)
        CapacitorApp.addListener('appUrlOpen', (event) => {
          console.log('App opened with URL:', event.url);
        });
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
