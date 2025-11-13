//import liraries
import { StyleSheet } from 'react-native';
import { isDark } from '../theme/themeContext';
import { colors } from '../utils/colors';
import { alignItemsCenter, alignSelfCenter, justyfyCenter, letterSpacing03, letterSpacing04, txtCenter } from './commonStyles';

const styles = StyleSheet.create({
  black: {
    color: colors.black
  },
  blackvar2: {
    color: colors.blackVar2
  },
  blackvar1: {
    color: colors.blackVar1
  },
  white: {
    color: colors.white,
  },
  green: {
    color: colors.green,
  },
  red: {
    color: colors.red,
  },
  textcolorGray: {
    color: colors.greyVar4,
  },
  greyVar3: {
    color: colors.greyVar3,
  },
  greyVar4: {
    color: colors.greyVar4,
  },
  blueVar1: {
    color: colors.blueVar1
  },
  primaryVar3: {
    color: colors.primaryVar3,
  },
  greyVar4Color: {
    color: colors.greyVar4,
  },
  greyVar8Color: {
    color: colors.greyVar8,
  },
  blueVar2: {
    color: colors.blueVar2,
  },
  darkModeVar4: {
    color: colors.darkModeVar4,
  },
  h1: {
    fontSize: 25,
  },
  h2: {
    fontSize: 36,
  },
  h3: {
    fontSize: 24,
  },
  h4: {
    fontSize: 21,
  },
  h5: {
    fontSize: 20,
  },
  h6: {
    fontSize: 18,
  },
  h7: {
    fontSize: 16,
  },
  h8: {
    fontSize: 15,
  },
  h9: {
    fontSize: 14,
  },
  h10: {
    fontSize: 12,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  fontBold400: {
    fontWeight: '400',
  },
  fontRegular: {
    fontWeight: '500',
  },
  fontBold600: {
    fontWeight: '600',
  },
  fontBold700: {
    fontWeight: '700',
  },
  fontBold800: {
    fontWeight: '800',
  },
  fontBold900: {
    fontWeight: '900',
  },
  fontNormal: {
    fontWeight: 'normal'
  },
});
const { green, red, textcolorGray, black, blackvar2, white, primaryVar3, blackvar1, blueVar1, greyVar3, greyVar4Color, blueVar2, greyVar8Color } = styles;
const { fontBold, fontRegular, fontBold400, fontBold600, fontBold700, fontBold800, fontNormal, fontBold900 } = styles;
const {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7,
  h8,
  h9,
  h10
} = styles;

export const commonText = StyleSheet.create({
  h16BlackText: {
    ...h7,
    ...black
  },
  h18BoldGrey: {
    ...h6,
    ...textcolorGray,
    ...fontBold700,
    ...txtCenter
  },
  h16SemiBoldBlack: {
    ...h7,
    color: isDark() ? colors.greyVar0 : colors.greyVar4,
    ...fontRegular,
    ...letterSpacing03
  },
  h16SemiBoldBlack1: {
    ...h7,
    color: isDark() ? colors.greyVar0 : colors.black,
    ...fontRegular,
    ...letterSpacing03
  },
  h14GreyVar4Bold400: {
    ...h9,
    color: isDark() ? colors.greyVar0 : colors.black,
    ...fontBold400
  },
  h15Green: {
    ...green,
    ...h8,
    ...letterSpacing03
  },
  h14GreenBold400: {
    color: isDark() ? colors.greenVar2 : colors.green,
    ...h9,
    ...letterSpacing03
  },
  h15Red: {
    ...red,
    ...h8,
    ...letterSpacing03
  },
  h14RedBold400: {
    color: isDark() ? colors.redVar2 : colors.red,
    ...h9,
    ...letterSpacing03
  },
  h14font500Gray4: {
    color: isDark() ? colors.greyVar3 : colors.greyVar4,
    ...h9,
    ...fontRegular
  },
  h14font500Gray41: {
    color: isDark() ? colors.greyVar0 : colors.greyVar4,
    ...h9,
    ...fontRegular
  },
  h14font400Black: {
    ...black,
    color: isDark() ? colors.greyVar0 : colors.black,
  },
  h15Grey: {
    color: isDark() ? colors.white : colors.greyVar4,
    ...h8
  },
  h15Grey1: {
    ...h8,
    color: isDark() ? colors.greyVar3 : colors.greyVar4,
  },
  h15PurpletoGrey: {
    ...h8,
    ...fontRegular,
    color: isDark() ? colors.greyVar0 : colors.primaryVar3,
  },
  h15font500White: {
    ...h8,
    ...fontRegular,
    ...white
  },
  h16font600Black: {
    ...h7,
    ...fontBold600,
    color: isDark() ? colors.greyVar0 : colors.black,
  },
  h15font500Black: {
    ...h8,
    ...fontRegular,
    color: isDark() ? colors.greyVar0 : colors.black,
  },
  h15fontBold600: {
    ...h8,
    ...fontBold600
  },
  h15font600: {
    ...h8,
    ...fontBold600,
    ...white
  },
  h20font600BlackVar2: {
    ...h5,
    ...fontBold600,
    color: isDark() ? colors.white : colors.blackVar2,
  },
  h20font600Black: {
    ...h5,
    ...fontBold600,
    color: isDark() ? colors.white : colors.black,
  },
  h14font400White: {
    ...h9,
    ...white,
    ...fontBold400
  },
  h14font400Gray4: {
    ...h9,
    color: isDark() ? colors.greyVar3 : colors.greyVar4,
    ...fontBold400
  },
  h14font400Purple3: {
    ...h9,
    ...fontBold400,
    ...primaryVar3
  },
  h14font400Blue: {
    ...h9,
    ...fontBold400,
    ...blueVar2
  },
  h16fontSemiBoldBluevar4: {
    ...h7,
    ...fontRegular,
    ...blueVar1
  },
  h16fontSemiBoldGreyvar4: {
    ...h7,
    ...fontRegular,
    ...greyVar4Color
  },
  h16font900: {
    ...h7,
    ...fontBold900,
    ...alignItemsCenter,
    ...justyfyCenter,
    borderColor: colors.greyVar4
  },
  h16fontNormalGray4: {
    ...h8,
    ...fontBold600,
    color: isDark() ? colors.greyVar0 : colors.greyVar4,
  },
  h12fontBold400blackVar2: {
    ...h10,
    ...fontBold400,
    color: isDark() ? colors.greyVar0 : colors.blackVar2,
  },
  h12fontBold400GreyVar4DarkWhite: {
    ...h10,
    ...fontBold400,
    color: isDark() ? colors.white : colors.greyVar4,
  },
  h12fontBold400GreyVar4: {
    ...h10,
    ...fontBold400,
    color: isDark() ? colors.greyVar3 : colors.greyVar4,
  },
  h12purpleVar3Text: {
    ...h10,
    color: isDark() ? colors.greyVar0 : colors.primaryVar3,
  },
  h12font400Black: {
    ...h10,
    ...fontBold400,
    color: isDark() ? colors.greyVar0 : colors.blackVar1,
  },
  h12DefaultGreyVar3: {
    ...h10,
    ...fontBold400,
    ...greyVar3,
  },
  h12fontNormalGray: {
    ...h10,
    ...fontNormal,
    ...greyVar3,
  },
  h16font900Black: {
    ...h7,
    ...fontBold900,
    ...black,
  },
  TextNowSecond: {
    ...h7,
    ...white,
    ...fontBold900,
    ...justyfyCenter,
    ...alignSelfCenter
  },
  h25fontBoldBlack: {
    ...h1,
    ...fontBold,
    ...black
  },
  h16fontNormalPurple: {
    ...h7,
    ...fontNormal,
    ...primaryVar3
  },
  h16fontNormalBlue: {
    ...h7,
    ...fontNormal,
    ...blueVar1
  },
  h16fontNormalGray: {
    ...h7,
    ...fontNormal,
    ...greyVar3
  },
  h18fontNormalGray: {
    ...h6,
    ...fontNormal,
    ...greyVar3
  },
  h18GreyVar4Text: {
    ...h8,
    ...textcolorGray
  },
  h16fontBoldBlack: {
    ...h7,
    ...fontBold600,
    color: isDark() ? colors.greyVar0 : colors.black,
  },
  h18Blackvar2Bold600: {
    ...h6,
    ...fontBold600,
    color: isDark() ? colors.greyVar0 : colors.blackVar2,
  },
  h18fontBoldBlack: {
    ...h6,
    ...fontBold,
    color: isDark() ? colors.white : colors.black,
  },
  h14blackVar1bold400Text: {
    ...h9,
    ...fontBold400,
    color: isDark() ? colors.greyVar3 : colors.blackVar1,
  },
  h12GreyVar8: {
    ...h9,
    ...fontBold400,
    color: isDark() ? colors.greyVar3 : colors.greyVar8,
  },
  h14blueVar1Text: {
    ...h9,
    ...blueVar1
  },
  h14redText: {
    ...h9,
    ...red
  },
  h14purpleVar3Text: {
    ...h9,
    color: isDark() ? colors.greyVar3 : colors.primaryVar3,
  },
  h14GreyVar3Bold500Text: {
    ...h9,
    ...fontRegular,
    color: isDark() ? colors.blackVar1 : colors.greyVar3,
  },
  h14GreyVar4Bold400Text: {
    ...h9,
    ...fontBold400,
    color: isDark() ? colors.greyVar3 : colors.greyVar4,
  },
  h14font400grey3black2: {
    ...h9,
    ...fontBold400,
    color: isDark() ? colors.greyVar3 : colors.blackVar2,
  },
  h14BlackVar2Bold400Text: {
    ...h9,
    ...fontBold400,
    color: isDark() ? colors.greyVar0 : colors.blackVar2,
  },
  h12BlackText: {
    ...h9,
    ...fontBold400,
    color: isDark() ? colors.darkModeVar4 : colors.white,
  },
  h14BlackText: {
    ...h9,
    ...black,
    color: isDark() ? colors.greyVar0 : colors.black,
  },
  h18BlackBoldText: {
    ...h6,
    ...black,
    ...fontRegular
  },
  h20BlackBoldText: {
    ...h5,
    ...black,
    ...fontBold700,
    ...letterSpacing04
  },
  h16GreyVar4Bold600Text: {
    ...h7,
    color: isDark() ? colors.greyVar0 : colors.greyVar4,
    ...fontBold600
  },
  h16Black600Text: {
    ...h7,
    color: isDark() ? colors.greyVar0 : colors.blackVar2,
    ...fontBold600
  },
  h18BlackBoldText600: {
    ...h6,
    color: isDark() ? colors.greyVar0 : colors.black,
    ...fontBold600
  },
  h18BlackText: {
    ...h6,
    color: isDark() ? colors.white : colors.black,
    ...fontBold600
  },
  h18WhiteText: {
    fontSize: 18,
    color: isDark() ? colors.white : colors.black,
  },
  h16WhiteText: {
    fontSize: 16,
    color: isDark() ? colors.white : colors.black,
  },
  h15GreySemiBold: {
    ...h8,
    ...textcolorGray,
    ...fontRegular
  },
  h14Blackvar2Bold500Same: {
    ...h9,
    ...blackvar2,
    ...fontRegular
  },
  h14Blackvar2Bold500: {
    ...h9,
    ...fontRegular,
    color: isDark() ? colors.greyVar0 : colors.blackVar2,
  },
  h15Blackvar2Bold500: {
    ...h8,
    ...fontRegular,
    color: isDark() ? colors.greyVar0 : colors.blackVar2,
  },
  h14Grey: {
    ...h9,
    ...textcolorGray
  },
  h15PurpleVar3Bold500: {
    ...h8,
    ...fontRegular,
    color: isDark() ? colors.greyVar0 : colors.primaryVar3,
  },
  h15BlackBold600: {
    ...h8,
    ...black,
    ...fontBold600
  },
  h12font400Grey: {
    ...h10,
    ...fontBold400,
    color: isDark() ? colors.greyVar3 : colors.greyVar4,
  },
  h12Grey: {
    ...h10,
    color: isDark() ? colors.greyVar3 : colors.greyVar4,
  },
  h16font500White: {
    ...h7,
    ...fontRegular,
    ...white
  },
  h16font500Black: {
    color: isDark() ? colors.greyVar3 : colors.greyVar4,
    ...h7,
    ...fontRegular
  },
  defaulth15Grey: {
    ...h8,
    ...textcolorGray
  }
})
