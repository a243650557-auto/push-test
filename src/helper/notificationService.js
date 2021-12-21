import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  console.log('enable', enabled);
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    console.log('fcm yokrn', fcmToken);
  } catch (e) {
    alert(e?.message);
  }
};
