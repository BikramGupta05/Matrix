import { useDispatch, useSelector } from "react-redux";
import { setRooms, setLoading } from "../redux/roomSlice";
import { fetchRoomsByDate } from "../services/roomApi";

export default function getRoomsByDate() {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector(state => state.room);

  const loadRooms = async () => {
    dispatch(setLoading(true));
    const res = await fetchRoomsByDate(selectedDate);
    dispatch(setRooms(res.data));
    dispatch(setLoading(false));
  };

  return { loadRooms };
}
