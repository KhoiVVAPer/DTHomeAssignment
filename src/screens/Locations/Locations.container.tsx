import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import LocationsView from './Locations.view';
import {AppContext} from '@context/AppContext/AppContext';
import {Animated, Dimensions, Easing, Linking, Share} from 'react-native';
import {Location} from 'src/types';

const screenHeight = Dimensions.get('window').height;

const H_MAX_HEIGHT = screenHeight / 3;

const LocationContainer: FC = (): JSX.Element => {
  const {
    isDisabledLocationPermission,
    setListLocation,
    listLocation,
    isScheduleLocationEnable,
  } = useContext(AppContext);
  const [isDisplayMapView, setIsDisplayMapView] = useState<boolean>(false);
  const [locationViewing, setLocationViewing] = useState<Location>();
  const opacityRef = useRef(new Animated.Value(0)).current;
  const heightRef = useRef(new Animated.Value(0)).current;
  const [isCompleteExpanded, setIsCompleteExpanded] = useState<boolean>(false);

  const onShareLocation = async () => {
    if (locationViewing) {
      const url = `https://maps.google.com/?q=${locationViewing.lat},${locationViewing.long}`;
      await Share.share({
        title: 'This is my location',
        message: url,
      });
    }
  };

  const onOpenAppSetting = () => {
    Linking.openSettings();
  };

  const onSelectLocationItem = (locationId: string) => {
    if (locationId === locationViewing?.id) {
      setIsDisplayMapView(false);
      setLocationViewing(undefined);
      return;
    }

    const selectedLocation = listLocation.find(l => l.id === locationId);
    if (selectedLocation) {
      setLocationViewing(selectedLocation);
      setIsDisplayMapView(true);
    }
  };

  const onDeleteLocationItem = useCallback(
    (locationId: string) => {
      const newListItem = listLocation.filter(l => l.id !== locationId);
      setListLocation(newListItem);
      if (locationViewing?.id === locationId) {
        setLocationViewing(undefined);
        setIsDisplayMapView(false);
      }
    },
    [listLocation, locationViewing?.id, setListLocation],
  );

  const onEditLocationItem = (locationId: string, locationName: string) => {
    const selectedLocationIndex = listLocation.findIndex(
      l => l.id === locationId,
    );

    if (selectedLocationIndex >= 0) {
      const cloneListLocation = [...listLocation];
      cloneListLocation[selectedLocationIndex].title = locationName;
      setListLocation(cloneListLocation);
    }
  };

  useEffect(() => {
    if (!isDisplayMapView) {
      setIsCompleteExpanded(false);
    }
    Animated.timing(heightRef, {
      toValue: isDisplayMapView ? H_MAX_HEIGHT : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(opacityRef, {
        toValue: isDisplayMapView ? 1 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          setIsCompleteExpanded(true);
        }, 1000);
      });
    });
  }, [heightRef, isDisplayMapView, opacityRef]);

  return (
    <>
      <LocationsView
        listLocation={listLocation}
        onShareLocation={onShareLocation}
        isScheduleLocationEnable={isScheduleLocationEnable}
        onDeleteLocationItem={onDeleteLocationItem}
        onEditLocationItem={onEditLocationItem}
        locationViewing={locationViewing}
        onSelectLocationItem={onSelectLocationItem}
        isDisabledLocationPermission={isDisabledLocationPermission}
        opacityRef={opacityRef}
        heightRef={heightRef}
        isCompleteExpanded={isCompleteExpanded}
        onRequestPermission={onOpenAppSetting}
      />
    </>
  );
};

export default LocationContainer;
