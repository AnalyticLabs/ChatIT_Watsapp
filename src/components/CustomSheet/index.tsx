import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React from 'react';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { styles } from '../../assets/styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Props extends BottomSheetModalProps {
  children: any;
  snapPoints: any;
  bottomSheetRef: any;
  title?: string;
  onSelect?: any;
}
const CustomSheet = ({
  children,
  snapPoints,
  bottomSheetRef,
  title,
  onDismiss,
}: Props) => {
  return (
    <BottomSheetModal
      handleIndicatorStyle={[
        styles.mt2,
        { width: '15%', backgroundColor: '#D6D6D6', },
      ]}
      enablePanDownToClose
      enableOverDrag
      backdropComponent={props => (
        <TouchableOpacity
          onPress={() => bottomSheetRef?.current?.dismiss()}
          style={[props.style, { backgroundColor: 'rgba(0,0,0,0.2)' }]}
        />
      )}
      style={[styles.ph5]}
      backgroundStyle={[
        styles.bgBlack03,
        // styles.borderWhite,
        {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
      ]}
      onDismiss={onDismiss}
      index={0}
      snapPoints={snapPoints}
      keyboardBehavior="fillParent"
        // footerComponent={renderFooter}
      ref={bottomSheetRef}>
      {title && (
        <Text
          style={[
            styles.poppinsMedium,
            styles.fs14,
            styles.colorWhite,
            styles.mb5,
          ]}>
          {title}
        </Text>
      )}
      <BottomSheetView >
        {children}
      </BottomSheetView>

    </BottomSheetModal>
    // <BottomSheetModal
    //   ref={bottomSheetRef}
    //   index={0}
    //   snapPoints={snapPoints}
    //   enablePanDownToClose
    //   enableOverDrag
    //   backgroundStyle={{ backgroundColor: 'white', borderRadius: 20 }}
    //   // backdropComponent={renderBackdrop}
    // >
    //   <BottomSheetView style={styles.sheetContent}>
    //     <Text style={{ fontSize: 18, color: 'black' }}>
    //       🎉 Bottom Sheet Content 🎉
    //     </Text>
    //   </BottomSheetView>
    // </BottomSheetModal>
  );
};

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default CustomSheet;
