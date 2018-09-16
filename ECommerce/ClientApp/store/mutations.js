
// 초기화
export const initialise = (state, payload) => {
  Object.assign(state, payload);
};


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

export const clearCartItems=state=> {
  state.cart= [];
};

export const setProductQuantity = (state, payload) => {
  let cartItem = Object.assign({}, state.cart[payload.index]);
  cartItem.quantity = payload.quantity;

  state.cart.splice(payload.index, 1, cartItem);
};


// 로그인 모달 보여주기/감추기
export const showAuthModal = state => {
  state.showAuthModal=true;
};

export const hideAuthModal = state => {
  state.showAuthModal=false;
};

// 로그인시 loading 여부 표시
export const loginRequest = state => {
  state.loading = true;
};

export const loginSuccess = (state, payload) => {
  state.auth=payload;
  state.loading = false;
};

export const loginError = state => {
  state.loading = false;
};

// 회원가입시 loading 여부 표시
export const registerRequest = state => {
  state.loading = true;
};

export const registerSuccess = state => {
  state.loading = false;
};

export const registerError = state => {
  state.loading = false;
};

// 로그아웃시...
export const logout = state=> {
  state.auth = null;
};