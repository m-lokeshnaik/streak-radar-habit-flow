import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { RoutineTask } from '@/types/routine';

export async function requestNotificationPermissions() {
  try {
    if (Capacitor.isPluginAvailable('PushNotifications')) {
      // Request permission for push notifications
      await PushNotifications.requestPermissions();
      await PushNotifications.register();
    }

    if (Capacitor.isPluginAvailable('LocalNotifications')) {
      // Request permission for local notifications
      await LocalNotifications.requestPermissions();
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
}

export async function scheduleRoutineNotification(task: RoutineTask) {
  try {
    if (!Capacitor.isPluginAvailable('LocalNotifications')) {
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
        title: 'Routine Reminder',
        body: `Time for: ${task.name}`,
        id: parseInt(task.id),
        schedule: { at: scheduledTime },
        sound: 'beep.wav',
        smallIcon: 'ic_stat_icon_config_sample',
        actionTypeId: '',
        extra: null
      }]
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}

export async function cancelRoutineNotification(taskId: string) {
  try {
    if (!Capacitor.isPluginAvailable('LocalNotifications')) {
      return;
    }

    await LocalNotifications.cancel({
      notifications: [{ id: parseInt(taskId) }]
    });
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
}

// Set up push notification handlers
export function setupPushNotifications() {
  if (!Capacitor.isPluginAvailable('PushNotifications')) {
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
  });
}