import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the user state interface with all the new fields
interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    userType: string;
    coverphoto: string;
    password: string;
    photo: string;
    location: string;
    bio: string;
    portfolio: string;
    specialization: string;
    numberOfCollections: number;
    preferences: string;
    productPrices: number;
    specialty: string;
    productCapacity: number;
  } | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

// Create a slice to manage user data
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set the user data
    setUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    // Action to clear the user data (log out)
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
