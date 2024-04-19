import React, {FC, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styles} from '../Settings.styles';
import {DeleteIcon} from '../../../assets/icons/detele.icon';
import {CheckIcon} from '../../../assets/icons';
import {InputField} from '../../../components/TextInput/TextInput';

export type EditableSettingRowProps = {
  defaultValue: string;
  message: string;
  unit: string;
  min: number;
  subtitle: string;
  onConfirm: (value: number) => void;
};

export const EditableSettingRow: FC<EditableSettingRowProps> = ({
  defaultValue,
  message,
  unit,
  min,
  subtitle,
  onConfirm,
}: EditableSettingRowProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);

  const onChangeValue = (txt: string) => {
    setValue(txt);
  };

  const inputRef = useRef<TextInput>(null);

  const onConfirmEdit = () => {
    if (!isNaN(parseInt(value, 10)) && parseInt(value, 10) > min) {
      onConfirm(parseInt(value, 10) * 1000);
    } else {
      onConfirm(min * 1000);
      setValue(`${min}`);
    }
    setIsEdit(false);
    inputRef.current?.blur();
  };

  const onAbortEdit = () => {
    setIsEdit(false);
    setValue(defaultValue);
    inputRef.current?.blur();
  };

  const onPressEditRequestLocationIntervalIcon = () => {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  return (
    <View style={styles.settingItemContainer}>
      <View style={styles.rowBetween}>
        <View style={styles.row}>
          <Text>{message}</Text>
          <View style={styles.inputWrapper}>
            <InputField
              value={`${value}`}
              onChangeText={onChangeValue}
              keyboardType="number-pad"
              autoFocus={true}
              editable={isEdit}
              ref={inputRef}
            />
          </View>
          <Text>{unit}</Text>
        </View>
        {isEdit ? (
          <View style={styles.row}>
            <Pressable onPress={onConfirmEdit} style={styles.actionBtn}>
              <CheckIcon size={22} color="green" />
            </Pressable>
            <Pressable onPress={onAbortEdit} style={styles.actionBtn}>
              <DeleteIcon size={18} />
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={onPressEditRequestLocationIntervalIcon}
            style={[styles.actionBtn, styles.btnEdit]}>
            <Text style={styles.actionLabel}>Edit</Text>
          </Pressable>
        )}
      </View>
      <Text style={styles.note}>{subtitle}</Text>
    </View>
  );
};
