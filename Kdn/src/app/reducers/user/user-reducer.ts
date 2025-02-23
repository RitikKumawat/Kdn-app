import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IUserState {
  user: {
    _id: string;
    username: string;
    role:string;
  };
}

const initialState: IUserState = {
  user: {_id: '', username: '',role:''},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<IUserState['user']>) => {
      state.user = action.payload;
    },
  },
});

export const {updateUserData} = userSlice.actions;

export default userSlice.reducer;
