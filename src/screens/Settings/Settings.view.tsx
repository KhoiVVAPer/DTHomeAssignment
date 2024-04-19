import React, {FC} from 'react';
import {Switch, View, Text, Pressable, Linking} from 'react-native';
import {styles} from './Settings.styles';
import {EditableSettingRow} from './components/EditableSettingRow';

export type SettingsProps = {
  setRequestLocationInterval: (second: number) => void;
  requestLocationInterval: number;
  isScheduleNotificationEnable: boolean;
  setRequestScheduleNotificationInterval: (second: number) => void;
  requestScheduleNotificationInterval: number; //seconds
  isDisabledNotificationPermission: boolean;
  isDisabledLocationPermission: boolean;
  onScheduleNotificationSettingChange: (value: boolean) => void;
  onFetchLocationSettingChange: (value: boolean) => void;
  isScheduleLocationEnable: boolean;
};

const SettingsView: FC<SettingsProps> = ({
  setRequestLocationInterval,
  requestLocationInterval,
  isScheduleNotificationEnable,
  setRequestScheduleNotificationInterval,
  requestScheduleNotificationInterval,
  isDisabledNotificationPermission,
  isDisabledLocationPermission,
  onScheduleNotificationSettingChange,
  onFetchLocationSettingChange,
  isScheduleLocationEnable,
}: SettingsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.settingItemContainer}>
        <View style={styles.rowBetween}>
          <Text>
            {isDisabledNotificationPermission
              ? 'Notification Disabled'
              : 'Enable notification'}
          </Text>
          {isDisabledNotificationPermission ? (
            <Pressable
              onPress={Linking.openSettings}
              style={[styles.actionBtn, styles.btnEdit]}>
              <Text style={styles.actionLabel}>Enable notification</Text>
            </Pressable>
          ) : (
            <Switch
              value={isScheduleNotificationEnable}
              onValueChange={onScheduleNotificationSettingChange}
            />
          )}
        </View>
      </View>
      <View style={styles.settingItemContainer}>
        <View style={styles.rowBetween}>
          <Text>
            {isDisabledLocationPermission
              ? 'Location disabled'
              : 'Enable Location'}
          </Text>
          {isDisabledLocationPermission ? (
            <Pressable
              onPress={Linking.openSettings}
              style={[styles.actionBtn, styles.btnEdit]}>
              <Text style={styles.actionLabel}>Enable location</Text>
            </Pressable>
          ) : (
            <Switch
              value={isScheduleLocationEnable}
              onValueChange={onFetchLocationSettingChange}
            />
          )}
        </View>
      </View>
      {!isDisabledNotificationPermission && (
        <EditableSettingRow
          defaultValue={`${requestScheduleNotificationInterval / 1000}`}
          message={'Send notification per:'}
          unit={'seconds'}
          subtitle={'(minimum 5 seconds)'}
          min={5}
          onConfirm={setRequestScheduleNotificationInterval}
        />
      )}
      <EditableSettingRow
        defaultValue={`${requestLocationInterval / 1000}`}
        message={'Fetch location per:'}
        unit={'seconds'}
        subtitle={'(minimum 5 seconds)'}
        min={5}
        onConfirm={setRequestLocationInterval}
      />
    </View>
  );
};

export default SettingsView;
