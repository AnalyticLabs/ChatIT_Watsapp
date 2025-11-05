import { Dimensions, NativeModules, Platform, StyleProp, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';
import { fontValue } from '../../utils/responsiveFonts';

export const { height, width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;
export interface StyleeProps extends StyleProp<any> {
  [key: string]: any;
}
export const linearGradColorsArr = [
  '#3895F3',
  '#398BDB',
  '#8B64E5',
  '#C96674',
  '#EA4559',
];
export const styles = StyleSheet.create({
  // bgWhite: {
  //   backgroundColor: COLORS.white,
  // },
  // bgMattBlack: {
  //   backgroundColor: COLORS.bgMattBlack,
  // },
  timePicker: {
    height: fontValue(40),
    width: fontValue(120),
    backgroundColor: 'rgba(131, 145, 161, 0.08)',
    borderRadius: fontValue(10),
    marginTop: fontValue(10),
    paddingHorizontal: fontValue(10)
  },
  checkWrp: {
    height: fontValue(32),
    width: fontValue(32),
  },
  checkContent: {
    marginTop: fontValue(13),
    alignItems: "center",

  },
  hourBox: {
    // height: getDimensionPercentage(230),
    // flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: fontValue(16),
    // justifyContent: 'space-between',
    // marginTop: heightDimen(30),
    paddingHorizontal: fontValue(13),
    // alignItems: 'center'
  },
  headingWhite: {
    fontSize: fontValue(16),
    color: COLORS.white,
  },
  suggestionModalView: {
    // position: 'absolute',
    // marginTop: scale(10),
    // flex: 1,
    // height: width / 2.5,
    // minHeight: width / 3,
    // width: width / 1.14,
    backgroundColor: COLORS.inputBg,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    marginHorizontal: fontValue(5)
  },
  simpleLine: {
    height: 1,
    width: '100%',
    marginVertical: fontValue(20),
  },
  heartStyle: {
    // height: heightfontValue(40),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    left: fontValue(13),
    // top: fontValue(10),
    height: fontValue(30),
    width: fontValue(30),
    top: fontValue(10),

    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent black
    borderRadius: 20,
    padding: fontValue(2),
    // backgroundColor:'red',
    // height:'50%'
  },
  suggestions: {
    paddingVertical: fontValue(10),
    padding: fontValue(5),
    borderBottomWidth: 0.5,
    // borderTopWidth: 0.5,
    borderColor: COLORS.black,
  },

  editor: {
    // backgroundColor: "rgba(51, 51, 51, 1)",
    // marginTop: fontValue(10),
    borderRadius: fontValue(10)
    // borderColor: "red",
    // borderWidth: 1,
  },
  cell: {
    // width: 50,
    // height: 50,
    lineHeight: 30,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: COLORS.inputBg,
    // alignSelf: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    borderColor: '#F1F1F1',
    // borderRadius: scale(20),
    color: COLORS.white,
    alignItems: "center",
    // top:20


  },
  codeFieldRoot: {
    justifyContent: "space-between",
    // gap: fontValue(20),
    // alignItems: 'flex-start'

    // alignItems: "center",

  },
  focusCell: {
    // borderColor: COLORS.primaryColor,
    backgroundColor: COLORS.cardBg,
    color: COLORS.white,
  },
  cellWrp: {
    backgroundColor: COLORS.inputBg,
    // borderWidth: 1,
    // borderColor: '#F1F1F1',
    // backgroundColor: "green",
    borderRadius: fontValue(10),
    height: fontValue(50),
    width: fontValue(54),
    justifyContent: "center",
    alignItems: "center",
  },
  rich: {
    minHeight: fontValue(260),
    maxHeight: fontValue(450),
    // flex: 1,
    backgroundColor: "rgba(51, 51, 51, 1)",
    marginTop: fontValue(10),

  },
  badge: {
    position: 'absolute',
    top: fontValue(-6),
    right: fontValue(-9),
    backgroundColor: 'black',
    borderRadius: fontValue(10),
    width: fontValue(18),
    height: fontValue(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: fontValue(1),
  },
  tab: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: height * 0.08,
    paddingHorizontal: 10,
    bottom: fontValue(10),
  },
  bellCount: {
    position: 'absolute', top: 0,
    right: fontValue(0),
    height: fontValue(18),
    width: fontValue(18),
    zIndex: 1,
    fontSize: fontValue(12),
    fontFamily: 'Poppins-Medium',
    marginTop: '5%',
    backgroundColor: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrpContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: fontValue(10),
  },
  tib: {
    textAlign: "center",
    color: "#515156",
  },
  richBar: {
    // height: 50,
    backgroundColor: "rgba(30, 30, 30, 1)",
    marginTop: fontValue(10),
    borderRadius: fontValue(8)
  },
  card: {
    width: width * 0.4,
    backgroundColor: '#1c1c1e',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },
  icon: {
    width: fontValue(50),
    height: fontValue(50),
    alignSelf: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingVertical: 5,
  },
  statusIcon: {
    width: fontValue(20),
    height: fontValue(20),
  },
  statusText: {
    color: '#000',
    fontSize: 14,
  },
  imgWrp: {
    height: fontValue(135),
    width: fontValue(135),
    marginTop: fontValue(5)
    // marginRight: fontValue(15)
  },
  imgWrpVendor: {
    height: fontValue(60),
    width: fontValue(80),
    marginTop: fontValue(5),
    // marginRight: fontValue(15)
  },
  imgMap: {
    justifyContent: 'flex-start',
    alignItems: "center",
    marginVertical: fontValue(10)
  },
  bttn: {
    justifyContent: 'center',
    alignContent: 'center',
    height: fontValue(50),
    width: '100%',
  },
  thumb: {
    height: fontValue(20),
    width: fontValue(20),
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    borderWidth: fontValue(4),
    borderColor: COLORS.white
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: COLORS.iconGrey,
    width: fontValue(35),
    height: fontValue(35),
    // top: 5,
    // marginTop: fontValue(-12),
    // bottom: 10
  },
  selectedDayContainer: {
    borderColor: COLORS.iconGrey,
    color: COLORS.black
  },
  dayText: {
    color: '#FFF',
  },
  disabledText: {
    color: COLORS.iconGrey,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // borderWidth: 1,
    // borderColor: '#D9534F',
  },
  discountedIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // borderWidth: 1,
    // borderColor: '#5D9CEC',
  },
  track: {
    height: 10,
    borderRadius: 8,
    // backgroundColor: COLORS.titleOpacty,
    backgroundColor: COLORS.inputBg,
  },

  hl: {
    width: '100%',
    height: fontValue(2),
    backgroundColor: COLORS.primary
  },
  calendar: {
    height: fontValue(20),
    width: fontValue(20),
    borderWidth: fontValue(1),
    borderColor: COLORS.white,
    borderRadius: fontValue(4),
    overflow: 'hidden',
  },
  halfBlack: {
    position: 'absolute',
    top: 0,
    width: '55%',
    height: '100%',
    backgroundColor: COLORS.black,
  },
  calendarContainer: {
    width: fontValue(20),
    height: fontValue(20),
  },

  img: {
    height: '100%',
    width: '100%'
  },

  constantImg: {
    height: fontValue(126),
    // width: fontValue(165),
    flex: 1,
    marginHorizontal: fontValue(2)
  },


  leftBottmRad15: {
    borderTopLeftRadius: fontValue(15),
    borderBottomRightRadius: fontValue(15)
  },
  leftBottmRad12: {
    borderTopLeftRadius: fontValue(12),
    borderBottomRightRadius: fontValue(12)
  },
  leftBottmRad20: {
    borderTopLeftRadius: fontValue(20),
    borderBottomRightRadius: fontValue(20)
  },
  leftBottmRad7: {
    borderTopLeftRadius: fontValue(7),
    borderBottomRightRadius: fontValue(7)
  },
  leftBottmRad10: {
    borderTopLeftRadius: fontValue(10),
    borderBottomRightRadius: fontValue(10)
  },
  leftBottmRad6: {
    borderTopLeftRadius: fontValue(6),
    borderBottomRightRadius: fontValue(6)
  },
  leftBottmRad8: {
    borderTopLeftRadius: fontValue(8),
    borderBottomRightRadius: fontValue(8)
  },
  leftBottmRad787: {
    borderTopLeftRadius: fontValue(7.87),
    borderBottomRightRadius: fontValue(7.87)
  },
  leftBottmRad5: {
    borderTopLeftRadius: fontValue(5.69),
    borderBottomRightRadius: fontValue(5.69)
  },

  bgWhite05: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',

  },
  bgPrimary: {
    backgroundColor: COLORS.primary,
  },

  bgBlack03: {
    backgroundColor: COLORS.black,
  },
  bgBlack: {
    backgroundColor: COLORS.inputBg,
  },
  iconDark: {
    backgroundColor: COLORS.iconDark,
  },

  bgGreyBlack: {
    backgroundColor: COLORS.darkTitle,
  },

  bgGreyCard: {
    backgroundColor: COLORS.cardBg,
  },
  bgWhite: {
    backgroundColor: COLORS.white,
  },
  // bgBlack05: {
  //   backgroundColor: COLORS.blackOpacity5,
  // }, 
  //padding

  //colors

  colorWhite: {
    color: COLORS.white,
  },
  colorRed: {
    color: COLORS.red,
  },
  colorPrimary: {
    color: COLORS.primary,
  },

  colorYellow: {
    color: COLORS.Yellow,
  },

  colorTitleOpcty: {
    color: COLORS.titleOpacty,
  },
  // colorGreyText: {
  //   color: COLORS.greyText,
  // },
  // colorGrey: {
  //   color: COLORS.grey,
  // },
  colorBlack: {
    color: COLORS.black,
  },
  // colorRed: {
  //   color: COLORS.red,
  // },
  // coloryellow: {
  //   color: COLORS.yellow,
  // },
  // colortextBlack: {
  //   color: COLORS.textBlack,
  // },
  // colortextBlue: {
  //   color: COLORS.blueBorder,
  // },

  //shadow
  shadowGreen: {
    // shadowColor: COLORS.green,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 10,
  },
  shadowWhite: {
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 15,
  },
  shadowBlue: {
    // shadowColor: COLORS.blue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 10,
  },
  shadowCard: {
    // shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,

    elevation: 7,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: fontValue(10),
  },
  absoluteCntnr: {
    position: 'absolute',
    top: '35%',
    left: fontValue(15),
    right: fontValue(15),
    borderRadius: fontValue(20)
  },

  primaryColr: {
    color: COLORS.primary
  },

  titleScndry: {
    color: COLORS.darkTitle
  },

  text30: {
    color: COLORS.white,
    fontSize: fontValue(30),
  },
  hdingWrp: {
    marginTop: Platform.OS === 'android' ? fontValue(54) : fontValue(94),
    justifyContent: 'flex-start',
    // marginLeft: fontValue(20)
  },

  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },
  w50: {
    width: '50%',
  },
  w48: {
    width: '48%',
  },
  dot: {
    height: fontValue(10),
    width: fontValue(10),
    borderRadius: fontValue(100),
    backgroundColor: COLORS.primary,
    position: 'absolute', top: '48%',
  },

  tabIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  alignItemStart: {
    alignItems: 'flex-start',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  jcCenter: {
    justifyContent: 'center',
  },
  jcEnd: {
    justifyContent: 'flex-end',
  },
  jcSbtw: {
    justifyContent: 'space-between',
  },
  jcSAround: {
    justifyContent: 'space-around',
  },
  jcSEven: {
    justifyContent: 'space-evenly',
  },
  fdr: {
    flexDirection: 'row',
  },
  fdc: {
    flexDirection: 'column',
  },
  textCap: {
    textTransform: 'capitalize',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  textCenter: {
    textAlign: 'center',
  },
  // borderGrey: {
  //   borderWidth: 1,
  //   borderColor: COLORS.greyBorder,
  // },
  borderWhite: {
    borderWidth: 1,
    borderColor: COLORS.white,
  },

  bgRed: {
    backgroundColor: COLORS.fullRed
  },
  borderDarkGrey: {
    // borderWidth: 1,
    borderColor: COLORS.titleOpacty,
  },

  borderBlack: {
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  borderPrimary: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  // borderBlue: {
  //   borderWidth: 1,
  //   borderColor: COLORS.blueBorder,
  // },

  //font sizes
  fs8: {
    fontSize: fontValue(8),
  },
  fs10: {
    fontSize: fontValue(10),
  },
  fs11: {
    fontSize: fontValue(11),
  },
  fs12: {
    fontSize: fontValue(12),
  },
  fs13: {
    fontSize: fontValue(13),
  },
  fs14: {
    fontSize: fontValue(14),
  },
  fs16: {
    fontSize: fontValue(16),
  },
  fs18: {
    fontSize: fontValue(18),
  },
  fs20: {
    fontSize: fontValue(20),
  },
  fs24: {
    fontSize: fontValue(24),
  },
  fs22: {
    fontSize: fontValue(22),
  },
  fs26: {
    fontSize: fontValue(26),
  },
  fs27: {
    fontSize: fontValue(27),
  },
  fs30: {
    fontSize: fontValue(30),
  },
  //fonts poppins and montserrat
  poppinsRegular: {
    fontFamily: 'Poppins-Regular',
  },
  poppinsMedium: {
    fontFamily: 'Poppins-Medium',
  },
  poppinsSemiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  poppinsBold: {
    fontFamily: 'Poppins-Bold',
  },
  //Montserrat
  montserratRegular: {
    fontFamily: 'Montserrat-Regular',
  },
  montserratMedium: {
    fontFamily: 'Montserrat-Medium',
  },
  montserratSemiBold: {
    fontFamily: 'Montserrat-SemiBold',
  },

  borderWidth0: {
    borderWidth: 0,
  },
  borderWidth1: {
    borderWidth: 1,
  },
  borderWidth2: {
    borderWidth: fontValue(2),
  },
  borderWidth3: {
    borderWidth: fontValue(3),
  },
  borderRad3: {
    borderRadius: 3,
  },
  borderRad7: {
    borderRadius: 7,
  },
  borderRad10: {
    borderRadius: 10,
  },
  borderRad15: {
    borderRadius: 15,
  },
  borderRad20: {
    borderRadius: 20,
  },
  borderRad50: {
    borderRadius: 50,
  },
  borderRad100: {
    borderRadius: 100,
  },
  //----
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  marginTopStatusBar: {
    marginTop: StatusBarManager.HEIGHT,
  },
  paddingTopStatusBar: {
    paddingTop: StatusBarManager.HEIGHT,
  },

  dFlex: {
    display: 'flex',
  },
  p0: {
    padding: 0,
  },
  ph5: {
    paddingHorizontal: '5%',
  },
  ph3: {
    paddingHorizontal: '3%',
  },
  ph10: {
    paddingHorizontal: '10%',
  },
  ph10px: {
    paddingHorizontal: 10,
  },
  ph1: {
    paddingHorizontal: '1%',
  },
  ph2: {
    paddingHorizontal: '2%',
  },
  pv0: {
    paddingVertical: '0%',
  },
  pv1: {
    paddingVertical: '1%',
  },
  pv5: {
    paddingVertical: '5%',
  },
  pv3: {
    paddingVertical: '3%',
  },
  pv4: {
    paddingVertical: '4%',
  },
  pv8: {
    paddingVertical: '8%',
  },
  pv10: {
    paddingVertical: '10%',
  },
  pv15: {
    paddingVertical: '15%',
  },
  pv2: {
    paddingVertical: '2%',
  },
  //margin
  m0: {
    margin: 0,
  },
  mt2: {
    marginTop: '2%',
  },
  mt3: {
    marginTop: '3%',
  },
  mt5: {
    marginTop: '5%',
  },
  mt10: {
    marginTop: '10%',
  },
  mt7: {
    marginTop: '7%',
  },
  mt8: {
    marginTop: '8%',
  },
  mt20: {
    marginTop: '20%',
  },
  m5: {
    margin: '5%',
  },
  m2: {
    margin: '2%',
  },
  mb5: {
    marginBottom: '5%',
  },
  mb10: { marginBottom: '10%' },
  mb20: { marginBottom: '20%' },

  scroll: {
    flexGrow: 1,
  }
});
