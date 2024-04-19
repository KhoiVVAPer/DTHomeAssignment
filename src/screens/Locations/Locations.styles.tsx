import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  animationSize: {width: 50, height: 50},
  emptyContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    padding: 20,
  },
  goToSettingBtn: {
    padding: 12,
    borderRadius: 4,
    backgroundColor: 'green',
    marginTop: 15,
  },
  goToSettingLabel: {
    color: 'white',
  },
  headerContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  mapContainer: {flex: 1, alignItems: 'center', justifyContent: 'space-around'},
  headerInfoContainer: {padding: 10},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
