import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  input: {
    width: 100,
  },
  btnEdit: {
    backgroundColor: 'green',
  },
  actionLabel: {
    color: 'white',
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
    marginLeft: 5,
  },
  inputWrapper: {
    marginHorizontal: 8,
    minWidth: 30,
  },
  settingItemContainer: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  note: {
    fontSize: 12,
  },
});
