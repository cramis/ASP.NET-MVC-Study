export const addProductToCart = (state, product) => {
    product.quantity = 1;
    state.cart.push(product);
  };
  
export const updateProductQuantity = (state, index) => {
let cartItem = Object.assign({}, state.cart[index]);
cartItem.quantity++;

// 기존의 내용을 삭제하고 새로운 내용으로 대체한다.
state.cart.splice(index, 1, cartItem);
};

export const removeProductFromCart = (state, index) => {
  state.cart.splice(index, 1);
};

export const setProductQuantity = (state, payload) => {
  let cartItem = Object.assign({}, state.cart[payload.index]);
  cartItem.quantity = payload.quantity;

  state.cart.splice(payload.index, 1, cartItem);
};