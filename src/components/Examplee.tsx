import React, { useRef, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { 
    BottomSheetModal, 
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';

const ExampleSheet = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const openSheet = () => {
        bottomSheetRef.current?.present();
        console.log('pressed');
    };

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                onPress={() => bottomSheetRef.current?.dismiss()}
            />
        ),
        []
    );

    return (
        <GestureHandlerRootView style={styles.container}>
            <BottomSheetModalProvider>
                <View style={styles.content}>
                    <Button title="Open Bottom Sheet" onPress={openSheet} />

                    <BottomSheetModal
                        ref={bottomSheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        enablePanDownToClose
                        enableOverDrag
                        backgroundStyle={{ backgroundColor: 'white', borderRadius: 20 }}
                        backdropComponent={renderBackdrop}
                    >
                        <BottomSheetView style={styles.sheetContent}>
                            <Text style={{ fontSize: 18, color: 'black' }}>
                                🎉 Bottom Sheet Content 🎉
                            </Text>
                        </BottomSheetView>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
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

export default ExampleSheet;
