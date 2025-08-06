// features/dashboard/dashboardActions.ts
import { AppDispatch } from "~/store";
import { getAllUsers } from "~/features/auth/authAction";
import { getUserGroupsAPI } from "~/api/groupChatApi";
import { setProfileData, setGroups } from "./dashboardSlice";

// export const loadDashboardData = () => async (dispatch: AppDispatch) => {
//   try {
//     const users: any = await dispatch<any>(getAllUsers());
//     const mappedUsers = users.map((u: any) => ({
//       id: u._id,
//       name: u.username,
//       message: u.lastMessage?.content || "No messages yet",
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
//       avatar: u.profilePicture,
//       createdAt: u.createdAt,
//     }));
//     dispatch(setProfileData(mappedUsers));
//   } catch {}

//   try {
//     const groups: any = await getUserGroupsAPI();
//     const mappedGroups = groups.map((g: any) => ({
//       id: g._id,
//       name: g.name,
//       message: g.lastMessage?.content || "No messages yet",
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
//       avatar: g.profilePicture,
//       isGroup: true as const,
//       createdAt: g.createdAt,
//     }));
//     dispatch(setGroups(mappedGroups));
//   } catch {}
// };

export const loadDashboardData = () => async (dispatch: AppDispatch) => {
  try {
    const users = await dispatch<any>(getAllUsers()); // <-- Now returns array
    const mappedUsers = users.map((u: any) => ({
      id: u._id,
      name: u.username,
      message: u.lastMessage?.content || "No messages yet",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      avatar: u.profilePicture,
      createdAt: u.createdAt,
    }));
    dispatch(setProfileData(mappedUsers));
  } catch (err) {
    console.error("Failed to load users", err);
  }

  try {
    const groups = await getUserGroupsAPI();
    const mappedGroups = groups.map((g: any) => ({
      id: g._id,
      name: g.name,
      message: g.lastMessage?.content || "No messages yet",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      avatar: g.profilePicture,
      isGroup: true as const,
      createdAt: g.createdAt,
    }));
    dispatch(setGroups(mappedGroups));
  } catch (err) {
    console.error("Failed to load groups", err);
  }
};
