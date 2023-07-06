import axios from "../../axios-base";

const errorBuild = (error) => {
  let resError = "Алдаа гарлаа дахин оролдож үзнэ үү";

  if (resError) {
    resError = error.message;
  }

  if (error.response !== undefined && error.response.status !== undefined) {
    resError = error.response.status;
  }
  if (
    error.response !== undefined &&
    error.response.data !== undefined &&
    error.response.data.error !== undefined
  ) {
    resError = error.response.data.error.message;
  }
  return resError;
};

export const clear = () => {
  return {
    type: "CLEAR_CART",
  };
};

// SAVE CART
export const saveCartInit = () => {
  return {
    type: "CREATE_CART_INIT",
  };
};

export const saveCart = (data) => {
  return function (dispatch, getState) {
    dispatch(saveCartStart());
    axios
      .post(`orders`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveCartSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveCartError(resError));
      });
  };
};

export const saveCartStart = () => {
  return {
    type: "CREATE_CART_START",
  };
};

export const saveCartSuccess = (result) => {
  return {
    type: "CREATE_CART_SUCCESS",
    cart: result,
  };
};

export const saveCartError = (error) => {
  return {
    type: "CREATE_CART_ERROR",
    error,
  };
};

// LOAD CART

export const loadCart = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadCartStart());
    axios
      .get("orders?" + query)
      .then((response) => {
        const loadCart = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadCartSuccess(loadCart));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadCartError(resError));
      });
  };
};

export const loadCartStart = () => {
  return {
    type: "LOAD_CART_START",
  };
};

export const loadCartSuccess = (carts, pagination) => {
  return {
    type: "LOAD_CART_SUCCESS",
    carts,
    pagination,
  };
};

export const loadCartError = (error) => {
  return {
    type: "LOAD_CART_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_CART_PAGINATION",
    pagination,
  };
};

export const deleteMultCart = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("orders/delete", { params: { id: ids } })
      .then((response) => {
        const deleteCart = response.data.data;
        dispatch(deleteCartSuccess(deleteCart));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteCartError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_CART_START",
  };
};

export const deleteCartSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_CART_SUCCESS",
    deleteCart: deleteData,
  };
};

export const deleteCartError = (error) => {
  return {
    type: "DELETE_MULT_CART_ERROR",
    error,
  };
};

// GET CART

export const getInit = () => {
  return {
    type: "GET_CART_INIT",
  };
};

export const getCart = (id) => {
  return function (dispatch, getState) {
    dispatch(getCartStart());
    axios
      .get("orders/" + id)
      .then((response) => {
        const cart = response.data.data;
        dispatch(getCartSuccess(cart));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCartError(resError));
      });
  };
};

export const getCartStart = () => {
  return {
    type: "GET_CART_START",
  };
};

export const getCartSuccess = (cart) => {
  return {
    type: "GET_CART_SUCCESS",
    cart,
  };
};

export const getCartError = (error) => {
  return {
    type: "GET_CART_ERROR",
    error,
  };
};

//UPDATE CART

export const updateCart = (id, data) => {
  return function (dispatch) {
    dispatch(updateCartStart());
    axios
      .put(`orders/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateCartSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateCartError(resError));
      });
  };
};

export const updateCartStart = () => {
  return {
    type: "UPDATE_CART_START",
  };
};

export const updateCartSuccess = (result) => {
  return {
    type: "UPDATE_CART_SUCCESS",
    updateCart: result,
  };
};

export const updateCartError = (error) => {
  return {
    type: "UPDATE_CART_ERROR",
    error,
  };
};

export const getCountCart = () => {
  return function (dispatch) {
    dispatch(getCountCartStart());

    axios
      .get(`orders/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountCartSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountCartError(resError));
      });
  };
};

export const getCountCartStart = () => {
  return {
    type: "GET_COUNT_CART_START",
  };
};

export const getCountCartSuccess = (result) => {
  return {
    type: "GET_COUNT_CART_SUCCESS",
    orderCount: result,
  };
};

export const getCountCartError = (error) => {
  return {
    type: "GET_COUNT_CART_ERROR",
    error,
  };
};
