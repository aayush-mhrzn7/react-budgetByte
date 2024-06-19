import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config/config";

export const fetchInfo = createAsyncThunk("foodDetails", async (id) => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${config.appID}&app_key=${config.key}`
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
});
export const foodSlice = createSlice({
  name: "food",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInfo.pending, (state, _) => {
      state.isLoading = true;
      console.log("fetching food information from edamam api");
    });
    builder.addCase(fetchInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;

      console.log(" successfully fetched food information from edamam api ");
    });
    builder.addCase(fetchInfo.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log(state);
      console.log(state.isError);
      console.log(" failed to fetch food information from edamam api");
    });
  },
});

export default foodSlice.reducer;
