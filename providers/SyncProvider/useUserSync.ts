import { wsStore } from "@/stores/websocketStore";
import { ProfileResp } from "@/types/userTypes";

import { getUserUpdateOp } from "./opFormatters";

export default function useUserSync() {
  const isOnline = false;

  const updateUser = (newData: ProfileResp) => {
    const ws = wsStore.getState().ws;
    if (!isOnline || !ws) return;
    const updateOp = getUserUpdateOp(newData);
    ws.send(JSON.stringify(updateOp));
  };

  return { updateUser };
}
