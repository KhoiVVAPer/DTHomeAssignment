/* eslint-disable react-hooks/exhaustive-deps */
import {Location} from 'src/types';
import {useLocationPermissions} from '@hooks/useLocationPermissions';
import {AppState} from 'react-native';
import GetLocation from 'react-native-get-location';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {usePersistState} from '@hooks/usePersistState';
import BackgroundTimer from 'react-native-background-timer';
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import {
  DEFAULT_NOTIFICATION_SCHEDULE,
  DEFAULT_REQUEST_LOCATION_TIME,
  FETCH_LOCATION_TIMEOUT,
} from 'src/const';

type AppContextData = {
  isFetchingLocation: boolean;
  setFetchingLocation: (shouldFetch: boolean) => void;
  requestLocationInterval: number;
  setRequestLocationInterval: (second: number) => void;
  listLocation: Location[];
  setListLocation: (listLocations: Location[]) => void;
  isDisabledLocationPermission: boolean;
  isScheduleNotificationEnable: boolean;
  isScheduleLocationEnable: boolean;
  startScheduleNotification: () => void;
  stopScheduleNotification: () => void;
  requestScheduleNotificationInterval: number; //seconds
  setRequestScheduleNotificationInterval: (second: number) => void;
  isDisabledNotificationPermission: boolean;
  stopFetchingUserLocation: () => void;
  startFetchingUserLocation: () => void;
};

const defaultContextValues: AppContextData = {
  isFetchingLocation: false,
  setFetchingLocation: () => undefined,
  requestLocationInterval: DEFAULT_REQUEST_LOCATION_TIME,
  setRequestLocationInterval: () => undefined,
  listLocation: [],
  isDisabledLocationPermission: false,
  setListLocation: () => undefined,
  isScheduleNotificationEnable: true,
  isScheduleLocationEnable: true,
  startScheduleNotification: () => undefined,
  stopScheduleNotification: () => undefined,
  requestScheduleNotificationInterval: DEFAULT_NOTIFICATION_SCHEDULE,
  setRequestScheduleNotificationInterval: () => undefined,
  isDisabledNotificationPermission: false,
  stopFetchingUserLocation: () => undefined,
  startFetchingUserLocation: () => undefined,
};

export const AppContext = createContext<AppContextData>(defaultContextValues);

export function useAppContextValue(): AppContextData {
  const fetchLocationIntervalRef = useRef<NodeJS.Timeout>();
  const [_isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const [_requestLocationInterval, setRequestLocationInterval] =
    usePersistState('requestLocationInterval', DEFAULT_REQUEST_LOCATION_TIME);
  const [_listLocation, setListLocation] = usePersistState('listLocations', []);
  const [_isDisabledLocationPermission, setIsDisabledLocationPermission] =
    useState<boolean>(false);
  const [_isScheduleLocationEnable, setIsScheduleLocationEnable] =
    usePersistState('isScheduleLocationEnable', true);
  const [_isScheduleNotificationEnable, setIsScheduleNotificationEnable] =
    usePersistState('isScheduleNotificationEnable', true);
  const [
    _requestScheduleNotificationInterval,
    setRequestScheduleNotificationInterval,
  ] = useState(DEFAULT_NOTIFICATION_SCHEDULE);
  const [secondLeft, setSecondLeft] = useState(DEFAULT_NOTIFICATION_SCHEDULE);
  const {checkPermission, requestPermission} = useLocationPermissions();
  const [
    _isDisabledNotificationPermission,
    setIsDisabledNotificationPermission,
  ] = useState<boolean>(false);
  const [_isNotMoving, setIsNotMoving] = useState<boolean>(false);

  useEffect(() => {
    if (secondLeft === 0) {
      onDisplayNotification();
      setSecondLeft(_requestScheduleNotificationInterval);
    }
  }, [_requestScheduleNotificationInterval, secondLeft]);

  useEffect(() => {
    setSecondLeft(_requestScheduleNotificationInterval);
  }, [_requestScheduleNotificationInterval]);

  useEffect(() => {
    if (_isFetchingLocation) {
      startFetchingUserLocation();
    } else {
      if (fetchLocationIntervalRef.current) {
        clearInterval(fetchLocationIntervalRef.current);
      }
    }
  }, [_isFetchingLocation, _listLocation]);

  const onDisplayNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: "You haven't move for 10 minutes",
      body: 'click here to stop collecting location',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        style: {
          type: AndroidStyle.BIGTEXT,
          text: 'click here to stop collecting location',
        },
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
    });
  };

  const startScheduleNotification = useCallback(async () => {
    setIsScheduleNotificationEnable(true);
    BackgroundTimer.stopBackgroundTimer();

    try {
      BackgroundTimer.runBackgroundTimer(() => {
        setSecondLeft((secs: number) => {
          console.log('secs', secs);
          if (secs > 0) {
            return secs - 1000;
          } else {
            return 0;
          }
        });
      }, 1000);
    } catch (e) {
      console.log('Error', e);
    }
  }, []);

  const stopScheduleNotification = async () => {
    setIsScheduleNotificationEnable(false);
    try {
      BackgroundTimer.stopBackgroundTimer();
    } catch (e) {
      console.log('Error', e);
    }
  };

  const startFetchingUserLocation = useCallback(() => {
    setIsScheduleLocationEnable(true);
    if (fetchLocationIntervalRef.current) {
      clearInterval(fetchLocationIntervalRef.current);
    }

    fetchLocationIntervalRef.current = setInterval(async () => {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: FETCH_LOCATION_TIMEOUT,
      });

      if (
        _listLocation.length > 0 &&
        location.latitude === _listLocation[0].lat &&
        location.longitude === _listLocation[0].long &&
        !_isDisabledNotificationPermission
      ) {
        if (!_isNotMoving) {
          startScheduleNotification();
        }
        setIsNotMoving(true);
      } else {
        setSecondLeft(_requestScheduleNotificationInterval);
        BackgroundTimer.stopBackgroundTimer();
      }

      const date = new Date(location.time);
      const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      setListLocation([
        {
          id: location.time,
          lat: location.latitude,
          long: location.longitude,
          datetime: formattedDate,
          title: formattedDate,
        },
        ..._listLocation,
      ]);
    }, _requestLocationInterval);
  }, [
    _isNotMoving,
    _listLocation,
    _requestLocationInterval,
    _requestScheduleNotificationInterval,
    setListLocation,
    startScheduleNotification,
  ]);

  const stopFetchingUserLocation = async () => {
    setIsScheduleLocationEnable(false);
    if (fetchLocationIntervalRef.current) {
      clearInterval(fetchLocationIntervalRef.current);
    }
  };

  const checkLocationPermission = useCallback(() => {
    checkPermission().then(value => {
      const isGranted = value === 'granted';
      setIsDisabledLocationPermission(!isGranted);
      if (isGranted) {
        setIsFetchingLocation(true);
      }
    });
  }, [checkPermission]);

  const checNotificationPermission = useCallback(() => {
    notifee.requestPermission().then(value => {
      const isGranted = value.authorizationStatus === 1;
      setIsDisabledNotificationPermission(!isGranted);
    });
  }, []);

  useEffect(() => {
    checkLocationPermission();
    requestPermission().then(() => {
      checNotificationPermission();
    });
    const appStateListener = AppState.addEventListener('change', state => {
      //check location permission each time user back to the app
      if (state === 'active') {
        checkLocationPermission();
        checNotificationPermission();
      }
    });
    return () => {
      appStateListener.remove();
    };
  }, [checkLocationPermission, requestPermission]);

  return useMemo(
    () => ({
      isScheduleLocationEnable: _isScheduleLocationEnable,
      isFetchingLocation: _isFetchingLocation,
      setFetchingLocation: setIsFetchingLocation,
      requestLocationInterval: _requestLocationInterval,
      setRequestLocationInterval,
      listLocation: _listLocation,
      isDisabledLocationPermission: _isDisabledLocationPermission,
      setListLocation: setListLocation,
      isScheduleNotificationEnable: _isScheduleNotificationEnable,
      startScheduleNotification,
      stopScheduleNotification,
      requestScheduleNotificationInterval: _requestScheduleNotificationInterval,
      setRequestScheduleNotificationInterval,
      isDisabledNotificationPermission: _isDisabledNotificationPermission,
      stopFetchingUserLocation,
      startFetchingUserLocation,
    }),
    [
      _isScheduleLocationEnable,
      _isFetchingLocation,
      _requestLocationInterval,
      setRequestLocationInterval,
      _listLocation,
      _isDisabledLocationPermission,
      setListLocation,
      _isScheduleNotificationEnable,
      _requestScheduleNotificationInterval,
      _isDisabledNotificationPermission,
      stopFetchingUserLocation,
      startFetchingUserLocation,
    ],
  );
}
