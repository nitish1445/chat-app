import { io } from "socket.io-client";

const socketApi = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
});

export default socketApi;
