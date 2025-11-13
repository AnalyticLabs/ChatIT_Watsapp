import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Image, PanResponder, Platform, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { CustomModal } from '../../components/commonComponents';
import { alignItemsCenter, flex1, flexRow, mb30, mh10, mh20, mh8, ml15, ml5, mt10, mv10, spaceBetween } from '../../components/commonStyles';
import {  commonText } from '../../components/commonText';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { myStatusView } from '../../utils/data/statusData';
import { DevHeight, DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { StatusImg1 } from '../../utils/png';
import { MyStatusPic } from '../../utils/svg';
import { StatusOptionModalComponent } from './statusContainer';

export type MyStatusProps = {
  
};

export const MyStatusView = ({ image }) => {
  return (
    <View>{image}</View>
  )
};

const MyStatus = (props: MyStatusProps) => {
  const [cardOpen, setCardOpen] = useState(false);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [callOptionModal, setCallOptionModal] = useState(false);
  const navigation = useNavigation();

  const handleCallOptionModal = () => {
    setCallOptionModal(!callOptionModal);
  }
  const closeCallOptionModal = () => {
    setCallOptionModal(false);
  }

  const translateY = new Animated.Value(0);
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      translateY.setValue(gestureState.dy);
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dy < -50) {
        setCardOpen(true);
        Animated.timing(translateY, { toValue: -200, duration: 300, useNativeDriver: false }).start();
      } else {
        setCardOpen(false);
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: false }).start();
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress1 < 1) {
        setProgress1(progress1 + 0.01);
      } else if (progress2 < 1) {
        setProgress2(progress2 + 0.01);
      } else {
        clearInterval(interval);
      }
    }, 2);

    return () => {
      clearInterval(interval);
    };
  }, [progress1, progress2]);

  const toggleCard = () => {
    if (translateY._value === 0) {
      setCardOpen(false);
      Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    } else {
      setCardOpen(true);
      Animated.timing(translateY, { toValue: -200, duration: 300, useNativeDriver: false }).start();
    }
  };

  const closeCard = () => {
    setCardOpen(false);
    Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  return (
    <SafeAreaView style={[commonView.mainContainer]}>
      <TouchableHighlight onPress={closeCard} style={[flex1]}>
        <Image source={StatusImg1} style={styles.image} />
      </TouchableHighlight>
      <View style={styles.progressBarsContainer}>
        <View style={[flex1, flexRow]}>
          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={progress1}
              width={null}
              height={4}
              color={'white'}
              borderColor={'transparent'}
              backgroundColor={colors.greyVar3}
            />
          </View>
          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={progress2}
              width={null}
              height={4}
              color={colors.white}
              borderColor={'transparent'}
              backgroundColor={colors.greyVar3}
            />
          </View>
        </View>
        <View style={[flexRow, alignItemsCenter, ml15, mt10]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CustomIcon name='chevron-left' size={15} color={colors.white} type='octicons' />
          </TouchableOpacity>
          <View style={[mh10]}>
            <MyStatusView image={<MyStatusPic />} />
          </View>
          <View>
            <Text style={[commonText.h15font500White]}>{labels.MyStatus}</Text>
            <Text style={[commonText.h14font400White]}>{labels.muteTime1}</Text>
          </View>
        </View>
      </View>
      {cardOpen ? (
        <View style={[styles.viewContainer, { backgroundColor: isDark() ? colors.darkModeVar4 : colors.white }]} >
          <View style={[styles.viewTopContainer, { backgroundColor: isDark() ? colors.darkModeVar6 : colors.primaryVar1 }]}>
            <View style={[mh10, spaceBetween, flexRow]}>
              <Text style={[commonText.h16font500Black]}>{labels.viewedBy15}</Text>
              <TouchableOpacity
                onPress={handleCallOptionModal}
              >
                <CustomIcon name='dots-three-vertical' type='entypo' color={isDark() ? colors.white : colors.greyVar4} size={15} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[mt10, mb30]}>
            {myStatusView.map((item) => {
              return (
                <View key={item.id} style={[flexRow, mh20, mv10, alignItemsCenter]}>
                  <Image style={{ height: 42, width: 42 }} source={item.image} />
                  <View style={[mh8]}>
                    <Text style={[commonText.h15font500Black]}>{item.name}</Text>
                    <Text style={[commonText.h14font400Gray4]}>{item.time}</Text>
                  </View>
                </View>
              )
            })}
          </View>
          <CustomModal
            isVisible={callOptionModal}
            width={DevWidth * 0.50}
            height={DevHeight * 0.4}
            modalData={<StatusOptionModalComponent />}
            marginTop={Platform.OS === 'ios' ? 100 : 350}
            onClose={closeCallOptionModal}
          />
        </View>
      ) : (
        <Animated.View
          style={[styles.swipeableContainer, { transform: [{ translateY }] }]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={toggleCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CustomIcon name='eye' size={20} color={colors.white} type='octicons' />
              <Text style={[ml5,{ color: colors.white },commonText.h16font500White]}> {labels.No25}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  progressBarsContainer: {
    left: 8,
    right: 8,
    marginTop: 10,
    position: 'absolute',
    flex: 1,
  },
  progressBarContainer: {
    flex: 1,
    marginRight: 8,
  },
  swipeableContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  viewContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  viewTopContainer: {
    height: 42,
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 6,
    justifyContent: 'center',
  }
});

export default MyStatus;