import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { createGroupService } from "../../../services/Chat";
import { useTheme } from "../../../theme/ThemeProvider";
import { getUsersService } from "../../../services/Auth";
import { COLORS } from "../../../utils/constants";
import Header from "../../../components/Header";
import IMAGES from "../../../utils/IMAGES";

const CreateGroupScreen = () => {
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [image, setImage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await getUsersService();
            setUsers(res?.data?.data || []);
        } catch (err) {
            console.log("Error fetching users:", err);
        }
    };

    const toggleSelect = (user) => {
        const already = selectedUsers.find((u) => u._id === user._id);
        if (already) {
            setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const pickImage = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            selectionLimit: 1,
        });
        if (!result.didCancel && result.assets?.length > 0) {
            setImage(result.assets[0]);
        }
    };
    
    const onCreateGroup = async () => {
        if (!groupName.trim() || selectedUsers.length === 0) {
            alert("Please enter a group name and select at least one member");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            // Required fields
            formData.append("name", groupName);
            formData.append("description", description || "Welcome to the Group!");

            // Append all selected members as an array
            selectedUsers.forEach((user) => {
                formData.append("members[]", user._id);
            });

            // Handle image upload (if available)
            if (image?.uri) {
                formData.append("image", {
                    uri: image.uri,
                    name: image.fileName || "group.jpg",
                    type: image.type || "image/jpeg",
                });
            } 
            // else if (profilePictureUrl) {
            //     // Optional: if you want to send a URL instead of uploading
            //     formData.append("profilePicture", profilePictureUrl);
            // }
            console.log(formData,'-------formData');
            

            // Call your API service
            const res = await createGroupService(formData);

            console.log("✅ Group created:", res.data);
            alert("Group created successfully!");
            navigation.goBack();
        } catch (err) {
            console.log("❌ Create group error:", err?.response?.data || err);
            alert("Failed to create group.");
        } finally {
            setLoading(false);
        }
    };


    // const onCreateGroup = async () => {
    //     if (!groupName.trim() || selectedUsers.length === 0) {
    //         alert("Please enter a group name and select at least one member");
    //         return;
    //     }
    //     setLoading(true);
    //     const formData = new FormData();
    //     try {
    //         formData.append("name", groupName);
    //         formData.append("description", description || "Welcome to the Group!");
    //         selectedUsers.forEach((user) => formData.append("members", user._id));

    //         if (image?.uri) {
    //             formData.append("image", {
    //                 uri: image.uri,
    //                 name: image.fileName || "group.jpg",
    //                 type: image.type || "image/jpeg",
    //             });
    //         }

    //         const res = await createGroupService(formData);
    //         console.log("✅ Group created:", res.data);
    //         alert("Group created successfully!");
    //         navigation.goBack();
    //     } catch (err) {
    //         console.log(formData, " group error:", err?.response?.data);
    //         console.log("❌ Create group error:", err);
    //         alert("Failed to create group.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <View style={styles.container}>
            <Header onBack={() => navigation.goBack()} title="Create New Group" />

            {/* Group Image */}
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                ) : (
                    <Text style={{ color: "#666" }}></Text>
                )}
            </TouchableOpacity>

            {/* Group Name */}
            <TextInput
                style={styles.input}
                placeholder="Enter group name"
                value={groupName}
                onChangeText={setGroupName}
            />

            {/* Description */}
            <TextInput
                style={[styles.input, { height: 60 }]}
                placeholder="Group description (optional)"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            {/* Members List */}
            <Text style={styles.subHeader}>Select Members</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            toggleSelect(item), console.log(item, '=======');
                        }}
                        style={[
                            styles.userItem,
                            selectedUsers.some((u) => u._id === item._id) && {
                                backgroundColor: colors.primary + "22",
                            },
                        ]}
                    >
                        <Image
                            source={item.profilePicture ? {
                                uri: item.profilePicture
                            } : IMAGES.placeholder}
                            style={styles.avatar}
                        />
                        <Text style={styles.name}>{item?.phoneSuffix} {item.phoneNumber}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                disabled={loading}
                onPress={onCreateGroup}
                style={[styles.createBtn, { backgroundColor: colors.primary }]}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.createText}>Create Group</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default CreateGroupScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    header: { fontSize: 22, fontWeight: "600", marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 6,
        color: "#333",
    },
    userItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: "#eee",
        borderRadius: 8,
    },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    name: { fontSize: 15, color: COLORS.black },
    createBtn: {
        marginTop: 12,
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    createText: { color: "#fff", fontWeight: "600" },
    imagePicker: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#f2f2f2",
        marginBottom: 10,
    },
    imagePreview: { width: 100, height: 100, borderRadius: 50 },
});
