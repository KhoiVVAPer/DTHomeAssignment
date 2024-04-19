import React, {FC} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import {Location} from 'src/types';
import {LocationRow} from '@components/LocationRow/LocationRow';
import MapView, {Marker} from 'react-native-maps';
import {styles} from './Locations.styles';
import {images} from '@assets/images';
import LottieView from 'lottie-react-native';
import {lotties} from '@assets/lotties';
import {ShareIcon} from 'src/assets/icons';

export type LocationsProps = {
  listLocation: Location[];
  isScheduleLocationEnable: boolean;
  isDisabledLocationPermission: boolean;
  onSelectLocationItem: (locationId: string) => void;
  locationViewing?: Location;
  onDeleteLocationItem: (locationId: string) => void;
  onEditLocationItem: (locationId: string, newLocationName: string) => void;
  opacityRef: Animated.Value;
  heightRef: Animated.Value;
  isCompleteExpanded: boolean;
  onRequestPermission: () => void;
  onShareLocation: () => void;
};

const ListLocationHeader = ({
  isScheduleLocationEnable,
}: {
  isScheduleLocationEnable: boolean;
}) => {
  return isScheduleLocationEnable ? (
    <View style={styles.row}>
      <LottieView
        source={lotties.location}
        style={styles.animationSize}
        autoPlay
        loop
      />
      <Text>collecting locations...</Text>
    </View>
  ) : null;
};

const LocationsView: FC<LocationsProps> = ({
  listLocation,
  onSelectLocationItem,
  locationViewing,
  onDeleteLocationItem,
  onEditLocationItem,
  opacityRef,
  heightRef,
  isCompleteExpanded,
  isDisabledLocationPermission,
  isScheduleLocationEnable,
  onRequestPermission,
  onShareLocation,
}: LocationsProps) => {
  if (isDisabledLocationPermission) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.imageWrapper}>
          <Image source={images.map} />
        </View>
        <Text>Please enable location permission to use the app</Text>
        <TouchableOpacity
          onPress={onRequestPermission}
          style={styles.goToSettingBtn}>
          <Text style={styles.goToSettingLabel}>Go to settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            height: heightRef,
            opacity: opacityRef,
          },
        ]}>
        {locationViewing && (
          <>
            <View style={styles.mapContainer}>
              {!isCompleteExpanded ? (
                <ActivityIndicator />
              ) : (
                <MapView
                  style={styles.map}
                  region={{
                    latitude: locationViewing.lat,
                    longitude: locationViewing.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  <Marker
                    key={locationViewing.id}
                    coordinate={{
                      latitude: locationViewing.lat,
                      longitude: locationViewing.long,
                    }}
                    title={locationViewing.title}
                    description={'test'}
                  />
                </MapView>
              )}
            </View>
            <View style={styles.headerInfoContainer}>
              <View style={styles.rowBetween}>
                <View>
                  <Text>{locationViewing.title}</Text>
                  <Text>{`Captured on: ${locationViewing.datetime}`}</Text>
                  <Text>{`${locationViewing.lat} : ${locationViewing.long}.`}</Text>
                </View>
                <Pressable onPress={onShareLocation}>
                  <ShareIcon size={40} />
                </Pressable>
              </View>
            </View>
          </>
        )}
      </Animated.View>
      <FlatList
        data={listLocation}
        keyExtractor={item => item.id}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListHeaderComponent={() => (
          <ListLocationHeader
            isScheduleLocationEnable={isScheduleLocationEnable}
          />
        )}
        renderItem={({item}) => {
          const isSelected = item.id === locationViewing?.id;
          return (
            <LocationRow
              data={item}
              onSelectLocationItem={onSelectLocationItem}
              onDelete={onDeleteLocationItem}
              onEdit={onEditLocationItem}
              isSelected={isSelected}
            />
          );
        }}
      />
    </View>
  );
};

export default LocationsView;
