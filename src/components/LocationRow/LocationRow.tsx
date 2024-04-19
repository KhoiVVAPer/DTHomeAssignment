import React, {FC, memo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Location} from 'src/types';
import {CheckIcon, LocationIcon} from '@assets/icons';
import {InputField} from '../TextInput/TextInput';
import {DeleteIcon} from '@assets/icons/detele.icon';

type LocationRowProps = {
  data: Location;
  onSelectLocationItem: (locationId: string) => void;
  onDelete: (locationId: string) => void;
  onEdit: (locationId: string, locationName: string) => void;
  isSelected: boolean;
};

const areEqual = (oldProps: LocationRowProps, newProps: LocationRowProps) => {
  return (
    oldProps.data.title === newProps.data.title &&
    oldProps.onDelete === newProps.onDelete &&
    oldProps.isSelected === newProps.isSelected
  );
};

export const LocationRow: FC<LocationRowProps> = memo(
  ({data, onSelectLocationItem, onDelete, onEdit, isSelected}): JSX.Element => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [locationTitle, setLocationTitle] = useState<string>(data.title);

    const onEditBtnPress = () => {
      setIsEditMode(true);
    };

    const onConfirmEdit = () => {
      onEdit(data.id, locationTitle);
      setIsEditMode(false);
    };

    const onAbortEdit = () => {
      setIsEditMode(false);
    };

    return (
      <Pressable
        style={[styles.container, isSelected && styles.selectedContainer]}
        onPress={() => onSelectLocationItem(data.id)}>
        <LocationIcon size={35} />
        <View style={styles.titleContainer}>
          {!isEditMode ? (
            <Text>{locationTitle}</Text>
          ) : (
            <InputField value={locationTitle} onChangeText={setLocationTitle} />
          )}
        </View>
        {!isEditMode ? (
          <>
            <Pressable
              style={[styles.actionBtn, styles.editBtn]}
              onPress={onEditBtnPress}>
              <Text style={styles.actionLabel}>Edit</Text>
            </Pressable>
            <Pressable
              style={[styles.actionBtn, styles.deleteBtn]}
              onPress={() => onDelete(data.id)}>
              <Text style={styles.actionLabel}>Delete</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={onConfirmEdit} style={styles.actionBtn}>
              <CheckIcon size={22} color="green" />
            </Pressable>
            <Pressable onPress={onAbortEdit} style={styles.actionBtn}>
              <DeleteIcon size={18} />
            </Pressable>
          </>
        )}
      </Pressable>
    );
  },
  areEqual,
);

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 5,
    flex: 1,
  },
  selectedContainer: {
    borderWidth: 1,
    borderColor: 'red',
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 4,
    marginLeft: 5,
  },
  editBtn: {
    backgroundColor: 'gray',
  },
  deleteBtn: {
    backgroundColor: 'red',
  },
  actionLabel: {
    color: 'white',
  },
  container: {
    paddingHorizontal: 10,
    marginHorizontal: 5,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  column: {},
});
