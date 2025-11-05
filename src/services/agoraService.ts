import axios from "axios";
const SERVER = "http://YOUR_SERVER_IP:4000";

export async function fetchAgoraToken(channelName: string, uid?: number, role?: "publisher"|"subscriber", expireSeconds?: number) {
  const res = await axios.post(`${SERVER}/api/agora/token`, { channelName, uid, role, expireSeconds });
  return res.data; // { token, channelName, uid }
}
