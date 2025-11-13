import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type menu = {
  label: string;
  onPress: () => void;
};
export type medicationItem = {
  id?: number;
  name?: string;
  doses?: string;
  value?: string;
  takeby?: string;
  schedule?: string;
  takeTime?: string;
  nextDose?: string;
  reminder?: boolean;
};
export interface blogItem {
  id: number;
  badge?: string;
  title?: string;
  subtitle?: string;
  author?: string;
  date?: string;
  category?: string;
  image?: string;
  blogIcon?: string;
}

export interface ReportData {
  id: number;
  name?: string;
  date: string;
  taken?: boolean;
}

export interface ReportsByDate {
  [key: string]: ReportData[];
}
export interface ReportCardListProps {
  data: { name: string; date: any };
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'outline_icon';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  image?: 'pdf';
  menu?: menu[];
}
export interface AppModalProps {
  visible?: boolean;
  onClose?: () => void;
  btn1Action?: () => void;
  btn2Action?: () => void;
  handleCancelAppointment?: () => void;
  style?: StyleProp<ViewStyle>;
  title?: string;
  description?: string;
  btn1Text?: string;
  btn1Style?: StyleProp<ViewStyle>;
  btn2Style?: StyleProp<ViewStyle>;
  btn2Text?: string;
  btn1Image?: string;
  btn2Image?: string;
  item?: ReportData | ReportData[];
  variant?:
  | 'primary'
  | 'membership'
  | 'buy'
  | 'appointment_details'
  | 'list'
  | 'refill'
  | 'locked';
  btn1variant?: 'primary' | 'outline';
  btn2variant?: 'primary' | 'outline';
}
export interface CardListProps {
  data: { name?: string; date: any };
  onPress?: () => void;
  variant?: 'primary' | 'outline' | 'outline_icon';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  modal?: boolean;
}
export interface MedicationProps {
  item: medicationItem;
  doseIcon?: string;
  doseIconColor?: string;
  doseIconSize?: number;
  refilShow?: boolean;
  inTakeAction?: () => void;
  takenAction?: () => void;
}
export interface BlogProps {
  variant?: 'primary' | 'product_library';
  item: blogItem;
}
export interface chatItem {
  id: number;
  name?: string;
  message?: string;
  time?: string;
  profileImage?: string;
  unreadMsgCount?: number;
}
