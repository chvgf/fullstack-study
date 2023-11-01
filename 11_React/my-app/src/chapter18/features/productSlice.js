// import { createSlice } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   value: [],
// };

// export const productSlice = createSlice({
//   name: 'product', 
//   initialState, 
//   reducers: {
//     addProduct: (state) => {
//       state.value = (e) => {
//         return  e.target.value
//       }
//     },
//     addProductValue: (e) => {
//       return e.target.value
//     }
//   }
// });

// export const { addProduct,addProductValue } = productSlice.actions;

// export default productSlice.reducer;

const initialState = {
  productList: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState ,
  reducers: {
    addToProductList: (state, action) => {
      state.productList.push(action.payload);
    },
  }
});


export const {addToProductList} = productSlice.actions;

export default productSlice.reducer;