import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {CloseIcon} from '@assets/icons';

type AppModalProps = {
  children?: React.ReactNode;
  isVisible?: boolean;
  onClose?: () => void;
  onBackdropPress?: () => void;
};

export const AppModal: FC<AppModalProps> = ({
  children,
  isVisible,
  onClose,
  onBackdropPress,
}): JSX.Element => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      onBackdropPress={onBackdropPress}>
      <View style={styles.container}>
        <View style={styles.rowSpaceBetween}>
          <Text style={styles.title}>Map View</Text>
          <Pressable onPress={onClose} style={styles.closeIconContainer}>
            <CloseIcon size={22} />
          </Pressable>
        </View>
        <View style={styles.separateLine} />
        <View style={styles.content}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 12,
  },
  closeIconContainer: {
    marginRight: 5,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {flex: 1},
  separateLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#333',
    opacity: 0.2,
    marginVertical: 10,
  },
});
