import { useDispatch } from "react-redux";
import { setCurrentBookings, setLoading } from "../redux/bookingSlice";
import { fetchCurrentBookings } from "../services/bookingApi";

export const CurrentBookings = () => {
  const dispatch = useDispatch();

  const loadCurrentBookings = async () => {
    dispatch(setLoading(true));
    const res = await fetchCurrentBookings();
    dispatch(setCurrentBookings(res.data));
    dispatch(setLoading(false));
  };

  return { loadCurrentBookings };
};
