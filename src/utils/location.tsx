import {PermissionsAndroid, Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermissionOnAndroid = async () => {
  return await new Promise(async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'App needs access to your location ' +
            'so you can use the app properly.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async location => {
            resolve(location.coords);
          },
          geo_error => {
            console.warn(geo_error);
            reject();
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.warn('Location permission denied');
        reject();
      }
    } catch (err) {
      console.warn(err);
      reject();
    }
  });
};

const requestLocationPermissionOnIOS = async () => {
  return await new Promise(async (resolve, reject) => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        console.log(
          '🚀 ~ file: location.tsx:89 ~ returnawaitnewPromise ~ result',
          result,
        );

        switch (result) {
          case RESULTS.GRANTED:
            console.warn(
              'This feature is not available (on this device / in this context)',
            );
            reject();
            break;
          case RESULTS.DENIED:
            console.warn(
              'The permission has not been requested / is denied but requestable',
            );
            reject();
            break;
          case RESULTS.LIMITED:
            console.warn(
              'The permission is limited: some actions are possible',
            );
            reject();
            break;
          case RESULTS.UNAVAILABLE:
            Geolocation.getCurrentPosition(
              async location => {
                resolve(location.coords);
              },
              geo_error => {
                console.warn(geo_error);
                reject();
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
            break;
          case RESULTS.BLOCKED:
            console.warn(
              'The permission is denied and not requestable anymore',
            );
            reject();
        }
      })
      .catch(error => {
        console.warn(error);
        reject();
      });
  });
};

export const GetCurrentLocation = async () => {
  try {
    if (Platform.OS === 'android') {
      return await requestLocationPermissionOnAndroid();
    } else {
      return await requestLocationPermissionOnIOS();
    }
  } catch (error) {
    return null;
  }
};
