import axios from "axios";

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

// 로그인
export const login = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("loginRequest");
    console.log("loginRequest", payload);
    axios
      .post("/api/token", payload)
      .then(response => {

        console.log("then start");
        const auth = response.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${
          auth.access_token
        }`;
        commit("loginSuccess", auth);
        commit("hideAuthModal");
        
        console.log("loginSuccess");
        resolve(response);
      })
      .catch(error => {
        console.log("loginError");
        commit("loginError");
        delete axios.defaults.headers.common["Authorization"];
        reject(error.response);
      });
  });
};

// 회원가입
export const register = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    commit("registerRequest");
    axios
      .post("/api/account", payload)
      .then(response => {
        commit("registerSuccess");
        resolve(response);
      })
      .catch(error => {
        commit("registerError");
        reject(error.response);
      });
  });
};

// 로그아웃
export const logout = ({ commit }) => {
  commit("logout");
  delete axios.defaults.headers.common["Authorization"];
};


// 로그아웃
export const loginError = ({ commit }) => {
  commit("loginError");
};
