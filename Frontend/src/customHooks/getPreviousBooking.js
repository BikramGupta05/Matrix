import { useDispatch } from "react-redux";
import { setPreviousBookings, setLoading } from "../redux/bookingSlice";
import { fetchPreviousBookings } from "../services/bookingApi";

export const PreviousBookings = () => {
  const dispatch = useDispatch();

  const loadPreviousBookings = async () => {
    dispatch(setLoading(true));
    const res = await fetchPreviousBookings();
    dispatch(setPreviousBookings(res.data));
    dispatch(setLoading(false));
  };

  return { loadPreviousBookings };
};
