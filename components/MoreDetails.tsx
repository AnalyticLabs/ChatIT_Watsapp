import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useColorScheme } from "~/lib/useColorScheme";
import { useRouter } from "expo-router";
import { logout } from "~/features/auth/authAction";
import { useAppDispatch } from "~/store";

interface MoreDetailsProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export function MoreDetails({ isOpen, setIsOpen }: MoreDetailsProps) {
  const { colors } = useTheme();
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const menuItems: {
    label: string;
    icon: "users" | "volume-2" | "star" | "settings" | "log-out";
    onPress?: () => void | Promise<void>;
  }[] = [
    { label: "New group", icon: "users" },
    { label: "New broadcast", icon: "volume-2" },
    { label: "Starred messages", icon: "star" },
    { label: "Settings", icon: "settings" },
    {
      label: "Logout",
      icon: "log-out",
      onPress: async () => {
        await dispatch(logout());

        setTimeout(() => {
          router.replace("/");
        }, 100);
      },
    },
  ];

  return (
    <View className="relative">
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Feather name="more-vertical" size={25} color={colors.text} />
      </TouchableOpacity>

      {isOpen && (
        <Pressable
          onPressOut={() => setIsOpen(false)}
          className="absolute right-0 top-10 w-52 bg-[#fcfcfc] dark:bg-gray-800 p-2 rounded-xl shadow-lg shadow-gray-700 z-50"
        >
          {menuItems.map(({ label, icon, onPress }, index) => (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                setIsOpen(false);
                if (onPress) await onPress();
              }}
              className="flex-row items-center gap-2 p-2 rounded-md active:bg-neutral-200 dark:active:bg-neutral-700"
            >
              <Feather
                name={icon}
                size={20}
                color={isDarkColorScheme ? "white" : "black"}
              />
              <Text className="text-black dark:text-white text-[16px] font-semibold">
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </Pressable>
      )}
    </View>
  );
}
