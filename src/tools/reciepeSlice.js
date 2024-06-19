import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config/config";

export const fetchReciepe = createAsyncThunk("fetchReciepe", async (req) => {
  const response = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${req}&app_id=${config.appID}&app_key=${config.key}`
  );
  return response.json();
});

export const reciepeSlice = createSlice({
  name: "reciepe",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReciepe.pending, (state, _) => {
      state.isLoading = true;
      console.log("fetching data from edamam api");
    });
    builder.addCase(fetchReciepe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;

      console.log("fetch request is sucessfull");
    });
    builder.addCase(fetchReciepe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log("Error", state.isError);
    });
  },
});

export default reciepeSlice.reducer;
