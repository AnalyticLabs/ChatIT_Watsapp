import axios from "axios";
import { BASE_URL } from "./Endpoints";

export async function fetchAgoraToken(channelName: string, uid?: number, role?: "publisher"|"subscriber", expireSeconds?: number) {
  const res = await axios.post(`${BASE_URL}/api/agora/token`, { channelName, uid, role, expireSeconds });
  return res.data; // { token, channelName, uid }
}
