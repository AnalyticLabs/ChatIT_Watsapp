import {
    StyleSheet,
} from 'react-native';
import { isDark } from '../theme/themeContext';
import { colors } from '../utils/colors';
import { DevHeight, DevWidth } from '../utils/device';

export const commonView = StyleSheet.create({
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowSpaceEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  rowSpaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  purpleMainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  commonLineDividerGrey: {
    width: '88%',
    alignSelf: 'center',
    height: 1,
  },
  commonLineDividerPurple: {
    width: '88%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: isDark() ? `rgba(78, 80, 114, 0.3 )` : colors.primaryVar2,
  },
  tabContainer: {
    fontSize: 16,
    fontWeight: '500',
    flexDirection: 'row',
  },
  textNow: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '900',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  commonButtonNow: {
    width: '100%',
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    backgroundColor: colors.primaryVar3
  },
  commonButtonBook: {
    width: 200,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 9,
  },
  commonButtonFull: {
    backgroundColor: colors.primaryVar3,
    width: '45%',
    paddingVertical: 13,
    borderRadius: 5,
    alignSelf: 'center',
    borderColor: colors.white,
    borderWidth: 2
  },
  topContainerWhiteCard: {
    backgroundColor: 'white',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    elevation: 4,
    height: DevHeight / 10,
    justifyContent: 'center'
  },
  iconBackground: {
    width: 38,
    borderRadius: 5,
    justifyContent: 'center',
    height: 38,
    alignItems: 'center'
  },
  commonButtonSaveandCancel: {
    width: '48%',
    borderRadius: 10,
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.greyVar3
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonRound: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioBtn: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  cardSurface: {
    backgroundColor: colors.white,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 15,
    margin: 20,
    flexDirection: 'row',
    borderRadius: 8,
    shadowColor: colors.greyVar3,
  },
  longButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryVar3
  },
  smallButton: {
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyTabView: {
    alignSelf: 'center',
    marginTop: 15,
    height: 5,
    width: DevWidth * 0.2,
    backgroundColor: colors.greyVar0
  },
  fullCommonLineDividerGrey:{
    width: '100%',
    alignSelf: 'center',
    height: 1,
  },
  topContainerWhiteCardBase: {
    backgroundColor: isDark() ? colors.darkModeVar1 : colors.white,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    elevation: 2,
    shadowColor: '#000',
  },

  mediumCardSurface: {
    backgroundColor: isDark() ? colors.darkModeVar4 : colors.white,
    padding: 10,
    elevation: isDark() ? 0 : 2,
    marginTop: 20,
    flexDirection: 'row',
    borderRadius: 8,
    shadowColor: colors.greyVar4,
  },
  //  topContainerWhiteCardBase: {
  //   backgroundColor: isDark() ? colors.darkModeVar1 : colors.white,
  //   borderBottomStartRadius: 25,
  //   borderBottomEndRadius: 25,
  //   elevation: 2,
  //   shadowColor: '#000',
  // },
   messageCardBase: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 10,
  },
});

