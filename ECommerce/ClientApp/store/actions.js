// 카트에서 해당 상품을 추가한다.
export const addProductToCart= ({ state, commit }, product) => {
    const index = state.cart.findIndex(
      i=>
        i.productId===product.productId&&
        i.colourId===product.colourId&&
        i.storageId===product.storageId
    );
  
    if (index >= 0) {
      commit("updateProductQuantity", index);
    } else {
      commit("addProductToCart", product);
    }
};

// 카트에서 해당 내용을 삭제한다.
export const removeProductFromCart= ({ state, commit }, product) => {
    const index = state.cart.findIndex(
      i=>
        i.productId===product.productId&&
        i.colourId===product.colourId&&
        i.storageId===product.storageId
    );
  
    commit("removeProductFromCart", index);
  };


// 카트에서 갯수 변경
export const setProductQuantity= ({ state, commit }, payload) => {
  const index = state.cart.findIndex(
    i=>
      i.productId === payload.product.productId&&
      i.colourId === payload.product.colourId&&
      i.storageId === payload.product.storageId
  );

  if (payload.quantity>0) {
    payload.index = index;
    commit("setProductQuantity", payload);
  } else {
    commit("removeProductFromCart", index);
  }

};