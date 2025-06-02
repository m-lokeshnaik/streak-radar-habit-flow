
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { RoutineTask } from '@/types/routine';

export async function requestNotificationPermissions() {
  try {
    console.log(`Running on ${Capacitor.getPlatform()} platform`);
    
    if (Capacitor.isNativePlatform()) {
      // Request push notification permissions for native platforms
      if (Capacitor.isPluginAvailable('PushNotifications')) {
        const result = await PushNotifications.requestPermissions();
        console.log('Push notification permissions:', result);
        
        if (result.receive === 'granted') {
          await PushNotifications.register();
        }
      }

      // Request local notification permissions
      if (Capacitor.isPluginAvailable('LocalNotifications')) {
        const result = await LocalNotifications.requestPermissions();
        console.log('Local notification permissions:', result);
      }
    } else {
      console.log('Running on web platform - native features disabled');
      
      // For web, try to request notification permissions using web API
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        console.log('Web notification permission:', permission);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
}

export async function scheduleRoutineNotification(task: RoutineTask) {
  try {
    if (!Capacitor.isNativePlatform() || !Capacitor.isPluginAvailable('LocalNotifications')) {
      console.log('Local notifications not available on this platform');
      return;
    }

    const [hours, minutes] = task.startTime.split(':').map(Number);
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0);

    // If the time has passed for today, schedule for tomorrow
    if (scheduledTime.getTime() < Date.now()) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    await LocalNotifications.schedule({
      notifications: [{
        title: 'Streak Radar Reminder',
        body: `Time for: ${task.name}`,
        id: parseInt(task.id),
        schedule: { at: scheduledTime },
        sound: 'beep.wav',
        smallIcon: 'ic_stat_icon_config_sample',
        actionTypeId: '',
        extra: null
      }]
    });

    console.log(`Notification scheduled for ${task.name} at ${task.startTime}`);
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}

export async function cancelRoutineNotification(taskId: string) {
  try {
    if (!Capacitor.isNativePlatform() || !Capacitor.isPluginAvailable('LocalNotifications')) {
      return;
    }

    await LocalNotifications.cancel({
      notifications: [{ id: parseInt(taskId) }]
    });
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
}

export function setupPushNotifications() {
  if (!Capacitor.isNativePlatform() || !Capacitor.isPluginAvailable('PushNotifications')) {
    console.log('Push notifications not available on this platform');
    return;
  }

  PushNotifications.addListener('registration', (token) => {
    console.log('Push registration success:', token.value);
  });

  PushNotifications.addListener('registrationError', (error) => {
    console.error('Push registration failed:', error);
  });

  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('Push notification received:', notification);
  });

  PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
    console.log('Push notification action performed:', notification);
    // You could navigate to specific screens based on notification data
  });
}

// FCM token management for future server integration
export async function getFCMToken(): Promise<string | null> {
  try {
    if (!Capacitor.isNativePlatform()) {
      return null;
    }

    // This would be used with Firebase Cloud Messaging
    // For now, we'll return a placeholder
    return 'fcm_token_placeholder';
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}
