import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { userMock } from "../mocks/userMock";
import { Booking } from "../model/bookingModel";
import { User } from "../model/userModel";

type BookingContextType = {
  bookings: Booking[];
  user: Omit<User, "password"> | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updated: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  movieSeatMap: Record<string, number>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Persist updated bookings while preserving other users' data
const syncBookingsToLocalStorage = (
  userId: string,
  updatedBookings: Booking[]
) => {
  const storedBookings = localStorage.getItem("allBookings");
  const checkBookings = storedBookings ? JSON.parse(storedBookings) : [];
  const otherUserBookings = checkBookings.filter(
    (b: Booking) => b.userId !== userId
  );
  const mergedBookings = [...otherUserBookings, ...updatedBookings];
  localStorage.setItem("allBookings", JSON.stringify(mergedBookings));
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [movieSeatMap, setMovieSeatMap] = useState<Record<string, number>>({});

  // Login logic — validate against mock users and load their bookings
  const login = (username: string, password: string): boolean => {
    const foundUser = userMock.data.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser({ id: foundUser.id, username: foundUser.username });
      const stored = localStorage.getItem("allBookings");
      if (stored) {
        const allBookingsStored = JSON.parse(stored) as Booking[];
        const userBookings = allBookingsStored.filter(
          (b) => b.userId === foundUser.id
        );
        setBookings(userBookings);

        const seatMap: Record<string, number> = {};
        allBookingsStored.forEach((booking) => {
          seatMap[booking.movieId] = Math.max(
            (seatMap[booking.movieId] ?? 50) - booking.seatCount,
            0
          );
        });
        setMovieSeatMap(seatMap);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
  };

  // Add new booking and update seat count map
  const addBooking = (booking: Booking) => {
    const seatCount = Math.min(booking.seatCount, 10);
    const previousCount =
      movieSeatMap[booking.movieId] ?? booking.availableSeats ?? 0;
    const bookingWithUser = {
      ...booking,
      seatCount,
      username: user?.username || "",
      userId: user?.id || "",
    };

    setBookings((prev) => {
      const updatedBookings = [...prev, bookingWithUser];
      syncBookingsToLocalStorage(user?.id || "", updatedBookings);
      return updatedBookings;
    });

    setMovieSeatMap((prev) => ({
      ...prev,
      [booking.movieId]: Math.max(previousCount - seatCount, 0),
    }));
  };

  // Update an existing booking and adjust seat map
  const updateBooking = (id: string, updated: Partial<Booking>) => {
    setBookings((prev) => {
      const updatedBookings = prev.map((b) => {
        if (b.id === id) {
          const oldSeatCount = b.seatCount;
          const newSeatCount = Math.min(updated.seatCount ?? oldSeatCount, 10);
          const diff = oldSeatCount - newSeatCount;
          const previousCount =
            movieSeatMap[b.movieId] ?? b.availableSeats ?? 0;

          setMovieSeatMap((map) => ({
            ...map,
            [b.movieId]: Math.min(Math.max(previousCount + diff, 0), 50),
          }));

          return { ...b, ...updated, seatCount: newSeatCount };
        }
        return b;
      });
      syncBookingsToLocalStorage(user?.id || "", updatedBookings);
      return updatedBookings;
    });
  };

  // Cancel a booking and restore seat availability
  const cancelBooking = (id: string) => {
    setBookings((prev) => {
      const bookingToCancel = prev.find((b) => b.id === id);
      if (!bookingToCancel) return prev;
      const previousCount =
        movieSeatMap[bookingToCancel.movieId] ??
        bookingToCancel.availableSeats ??
        0;

      setMovieSeatMap((map) => ({
        ...map,
        [bookingToCancel.movieId]: Math.min(
          previousCount + bookingToCancel.seatCount,
          50
        ),
      }));

      const updatedBookings = prev.filter((b) => b.id !== id);
      syncBookingsToLocalStorage(user?.id || "", updatedBookings);
      return updatedBookings;
    });
  };

  // On first load, calculate seat map from local storage
  useEffect(() => {
    const stored = localStorage.getItem("allBookings");
    if (stored) {
      const all = JSON.parse(stored) as Booking[];

      const seatMap: Record<string, number> = {};
      all.forEach((booking) => {
        seatMap[booking.movieId] = Math.max(
          (seatMap[booking.movieId] ?? 50) - booking.seatCount,
          0
        );
      });

      setMovieSeatMap(seatMap);
    }
  }, []);

  const value: BookingContextType = {
    bookings,
    user,
    isLoggedIn: !!user,
    login,
    logout,
    addBooking,
    updateBooking,
    cancelBooking,
    movieSeatMap,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

// Custom hook to consume booking context safely
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context)
    throw new Error("useBooking must be used within BookingProvider");
  return context;
};
