import React, {FC, useContext} from 'react';
import SettingsView from './Settings.view';
import {AppContext} from '@context/AppContext/AppContext';

const SettingsContainer: FC = (): JSX.Element => {
  const {
    setRequestLocationInterval,
    requestLocationInterval,
    isScheduleNotificationEnable,
    startScheduleNotification,
    stopScheduleNotification,
    setRequestScheduleNotificationInterval,
    requestScheduleNotificationInterval,
    isDisabledNotificationPermission,
    isDisabledLocationPermission,
    stopFetchingUserLocation,
    startFetchingUserLocation,
    isScheduleLocationEnable,
  } = useContext(AppContext);

  const onScheduleNotificationSettingChange = (value: boolean) => {
    if (value) {
      startScheduleNotification();
    } else {
      stopScheduleNotification();
    }
  };

  const onFetchLocationSettingChange = (value: boolean) => {
    if (value) {
      startFetchingUserLocation();
    } else {
      stopFetchingUserLocation();
    }
  };

  return (
    <SettingsView
      onFetchLocationSettingChange={onFetchLocationSettingChange}
      setRequestLocationInterval={setRequestLocationInterval}
      onScheduleNotificationSettingChange={onScheduleNotificationSettingChange}
      requestLocationInterval={requestLocationInterval}
      isScheduleNotificationEnable={isScheduleNotificationEnable}
      setRequestScheduleNotificationInterval={
        setRequestScheduleNotificationInterval
      }
      isScheduleLocationEnable={isScheduleLocationEnable}
      requestScheduleNotificationInterval={requestScheduleNotificationInterval}
      isDisabledNotificationPermission={isDisabledNotificationPermission}
      isDisabledLocationPermission={isDisabledLocationPermission}
    />
  );
};

export default SettingsContainer;
