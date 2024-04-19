import {useCallback} from 'react';
import {Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  PermissionStatus,
} from 'react-native-permissions';

interface LocationPermissionFunc {
  // Function for checking location permissions
  checkPermission: () => Promise<PermissionStatus | null>;
  // Function for requesting location permissions
  requestPermission: () => Promise<PermissionStatus | null>;
}

// Android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
export const useAndroidLocationPermissions = (): LocationPermissionFunc => {
  const checkLocationPermission = useCallback(async () => {
    try {
      // Check Android permission
      const fineLocationStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      return fineLocationStatus;
    } catch (error) {
      console.error('Android: checkLocationPermission error', error);
      return null;
    }
  }, []);

  const requestLocationPermission = useCallback(async () => {
    try {
      // Request Android permission
      const permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      return permissionStatus;
    } catch (error) {
      console.error('Android: requestLocationPermission error', error);
      return null;
    }
  }, []);

  return {
    checkPermission: checkLocationPermission,
    requestPermission: requestLocationPermission,
  };
};

// iOS: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
export const useIosLocationPermissions = (): LocationPermissionFunc => {
  const checkLocationPermission = useCallback(async () => {
    try {
      // Check iOS 'location: when in use' permission
      const locationWhenInUseStatus = await check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      return locationWhenInUseStatus;
    } catch (error) {
      console.error('iOS: checkLocationPermission error', error);
      return null;
    }
  }, []);

  const requestLocationPermission = useCallback(async () => {
    try {
      // Request iOS 'location: when in use' permission
      const locationWhenInUseStatus = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      return locationWhenInUseStatus;
    } catch (error) {
      console.error('iOS: requestLocationPermission error', error);
      return null;
    }
  }, []);

  return {
    checkPermission: checkLocationPermission,
    requestPermission: requestLocationPermission,
  };
};

// Use hook based on platform
export const useLocationPermissions = Platform.select({
  android: useAndroidLocationPermissions,
  ios: useIosLocationPermissions,
  default: useAndroidLocationPermissions,
});
