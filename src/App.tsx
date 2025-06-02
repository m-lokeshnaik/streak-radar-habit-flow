import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { App as CapacitorApp, Capacitor } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { useEffect } from 'react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    if (Capacitor.isPluginAvailable('SplashScreen')) {
      // Hide the splash screen
      await SplashScreen.hide();
    }

    if (Capacitor.isPluginAvailable('StatusBar')) {
      // Set status bar style
      await StatusBar.setBackgroundColor({ color: '#7C3AED' });
      await StatusBar.setStyle({ style: 'light' });
    }

    if (Capacitor.isPluginAvailable('App')) {
      // Handle back button
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          CapacitorApp.exitApp();
        } else {
          window.history.back();
        }
      });
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