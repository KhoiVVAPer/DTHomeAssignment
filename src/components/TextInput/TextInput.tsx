import React, {FC, forwardRef} from 'react';
import {Platform, StyleSheet, TextInput, TextInputProps} from 'react-native';

type InputFieldProps = {} & TextInputProps;

export const InputField: FC<InputFieldProps> = forwardRef(
  (props: InputFieldProps, ref: React.Ref<TextInput>): JSX.Element => {
    return <TextInput {...props} style={styles.container} ref={ref} />;
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 7,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#333',
    paddingVertical: Platform.OS === 'ios' ? 8 : 3,
  },
});
