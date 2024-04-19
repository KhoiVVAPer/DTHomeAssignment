/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import Route from './Routes';
import LocationContainer from '@screens/Locations/Locations.container';
import {Pressable} from 'react-native';
import {SettingIcon} from '@assets/icons';
import SettingsContainer from '@screens/Settings/Settings.container';
import notifee, {EventType} from '@notifee/react-native';
import {AppContext} from '@context/AppContext/AppContext';

const Stack = createStackNavigator();

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export const AppNavigator = (props: Partial<StackNavigatorProps>) => {
  const {stopFetchingUserLocation} = useContext(AppContext);
  const headerRightStyles = {marginRight: 5};

  useEffect(() => {
    notifee.onForegroundEvent(({type}) => {
      if (type === EventType.PRESS) {
        stopFetchingUserLocation();
      }
    });
  }, [stopFetchingUserLocation]);

  return (
    <Stack.Navigator
      {...props}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: '#1C274C',
      }}>
      <Stack.Screen
        name={Route.LOCATIONS_SCREEN}
        component={LocationContainer}
        options={({navigation}) => ({
          title: 'Locations',
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate(Route.SETTING_SCREEN);
              }}
              style={headerRightStyles}>
              <SettingIcon size={30} color="white" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name={Route.SETTING_SCREEN}
        component={SettingsContainer}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};
