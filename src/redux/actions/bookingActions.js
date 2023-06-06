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
    type: "CLEAR_BOOKING",
  };
};

// SAVE BOOKING
export const saveBookingInit = () => {
  return {
    type: "CREATE_BOOKING_INIT",
  };
};

export const saveBooking = (data) => {
  return function (dispatch) {
    dispatch(saveBookingStart());
    axios
      .post(`/bookings`, data)
      .then((response) => {
        const result = response.data;
        dispatch(saveBookingSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveBookingError(resError));
      });
  };
};

export const saveBookingStart = () => {
  return {
    type: "CREATE_BOOKING_START",
  };
};

export const saveBookingSuccess = (result) => {
  return {
    type: "CREATE_BOOKING_SUCCESS",
    booking: result,
  };
};

export const saveBookingError = (error) => {
  return {
    type: "CREATE_BOOKING_ERROR",
    error,
  };
};

// Excel booking
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("bookings/excel?" + query)
      .then((response) => {
        const data = response.data.data;
        dispatch(getExcelDataSuccess(data));
      })
      .catch((error) => {
        let resError = errorBuild(error);
        dispatch(getExcelDataError(resError));
      });
  };
};

const getExcelDataStart = () => {
  return {
    type: "GET_BOOKING_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_BOOKING_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_BOOKING_EXCELDATA_ERROR",
    error,
  };
};

// LOAD BOOKING

export const loadBooking = (query = "") => {
  return function (dispatch) {
    dispatch(loadBookingStart());
    axios
      .get("/bookings?" + query)
      .then((response) => {
        const loadBooking = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadBookingSuccess(loadBooking));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadBookingError(resError));
      });
  };
};

export const loadBookingStart = () => {
  return {
    type: "LOAD_BOOKINGS_START",
  };
};

export const loadBookingSuccess = (bookings, pagination) => {
  return {
    type: "LOAD_BOOKINGS_SUCCESS",
    bookings,
    pagination,
  };
};

export const loadBookingError = (error) => {
  return {
    type: "LOAD_BOOKINGS_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_BOOKING_PAGINATION",
    pagination,
  };
};

export const deleteMultBooking = (ids) => {
  return function (dispatch) {
    dispatch(deleteMultStart());
    axios
      .delete("bookings/delete", { params: { id: ids } })
      .then((response) => {
        const deleteBooking = response.data.data;
        dispatch(deleteBookingSuccess(deleteBooking));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteBookingError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_BOOKING_START",
  };
};

export const deleteBookingSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_BOOKING_SUCCESS",
    deleteBooking: deleteData,
  };
};

export const deleteBookingError = (error) => {
  return {
    type: "DELETE_MULT_BOOKING_ERROR",
    error,
  };
};

// GET BOOKING

export const getInit = () => {
  return {
    type: "GET_BOOKING_INIT",
  };
};

export const getBooking = (id) => {
  return function (dispatch) {
    dispatch(getBookingStart());
    axios
      .get("bookings/" + id)
      .then((response) => {
        const booking = response.data.data;
        dispatch(getBookingSuccess(booking));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getBookingError(resError));
      });
  };
};

export const getBookingStart = () => {
  return {
    type: "GET_BOOKING_START",
  };
};

export const getBookingSuccess = (booking) => {
  return {
    type: "GET_BOOKING_SUCCESS",
    booking,
  };
};

export const getBookingError = (error) => {
  return {
    type: "GET_BOOKING_ERROR",
    error,
  };
};

//UPDATE BOOKING

export const updateBooking = (id, data) => {
  return function (dispatch) {
    dispatch(updateBookingStart());
    axios
      .put(`bookings/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateBookingSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateBookingError(resError));
      });
  };
};

export const updateBookingStart = () => {
  return {
    type: "UPDATE_BOOKING_START",
  };
};

export const updateBookingSuccess = (result) => {
  return {
    type: "UPDATE_BOOKING_SUCCESS",
    updateBooking: result,
  };
};

export const updateBookingError = (error) => {
  return {
    type: "UPDATE_BOOKING_ERROR",
    error,
  };
};

export const getCountBooking = () => {
  return function (dispatch) {
    dispatch(getCountBookingStart());

    axios
      .get(`bookings/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountBookingSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountBookingError(resError));
      });
  };
};

export const getCountBookingStart = () => {
  return {
    type: "GET_COUNT_BOOKING_START",
  };
};

export const getCountBookingSuccess = (result) => {
  return {
    type: "GET_COUNT_BOOKING_SUCCESS",
    orderCount: result,
  };
};

export const getCountBookingError = (error) => {
  return {
    type: "GET_COUNT_BOOKING_ERROR",
    error,
  };
};
