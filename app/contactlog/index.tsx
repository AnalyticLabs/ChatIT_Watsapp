import { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Image, Text } from "react-native";
import { UserPlus, Users } from "lucide-react-native";
import ContactLogHeader from "../../components/ContactLogHeader";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "~/features/auth/authAction";
import { setProfileData } from "~/features/dashboard/dashboardSlice";
import { RootState } from "~/store";

const contacts = [
  {
    id: 1,
    name: "Me (You)",
    subtitle: "Message yourself",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jhon Doe",
    subtitle: "Cann't talk chatit only",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Wade Warren",
    subtitle: "Hey there! I am using WhatsApp.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Jorem Bell",
    subtitle: "Everything is unbelievable until or unless u go for it❤️",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Annette Black",
    subtitle: "Hey there! I am using WhatsApp.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

export default function ContactLogScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector(
    (state: RootState) => state.dashboard.profileData
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res: any = await dispatch<any>(getAllUsers());
        const mappedData = res.map((user: any) => ({
          id: user._id,
          name: user.username,
          message: user.about || "Hey there! I’m using ChatIt",
          avatar: user.profilePicture,
        }));
        dispatch(setProfileData(mappedData));
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <View className="flex-1 bg-white dark:bg-[#0e0c19]">
      <ContactLogHeader
        contactCount={contacts.length}
        onSearch={setSearchQuery}
      />

      {/* Top Actions */}
      <View className="px-5 space-y-4 mt-4">
        <TouchableOpacity className="flex-row items-center space-x-5 pb-3">
          <View className="bg-blue-600 p-3 rounded-full">
            <Users size={24} color="white" />
          </View>
          <Text className="dark:text-white text-black text-lg font-semibold px-3">
            New group
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center space-x-5">
          <View className="bg-blue-600 p-3 rounded-full">
            <UserPlus size={24} color="white" />
          </View>
          <Text className="dark:text-white text-black text-lg font-semibold px-3">
            New contact
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-5 mt-8">
        <Text className="text-gray-500 text-[16px] font-semibold">
          Contacts on ChatIt
        </Text>
      </View>

      {/* Contact List */}
      <ScrollView className="mt-2 px-1">
        {filteredContacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-900"
          >
            <Image
              source={{ uri: contact.avatar }}
              className="w-12 h-12 rounded-full mr-4"
            />
            <View className="flex-1">
              <Text className="dark:text-white text-black text-[15px] font-medium">
                {contact.name}
              </Text>
              {contact.message ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  className="text-gray-400 text-[12px] mt-1"
                >
                  {contact.message}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}

        {filteredContacts.length === 0 && (
          <Text className="text-center text-gray-400 font-medium mt-6">
            No contacts found
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
