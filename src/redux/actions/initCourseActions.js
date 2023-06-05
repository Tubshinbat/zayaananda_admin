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
    type: "CLEAR_INITCOURSE",
  };
};

// SAVE INITCOURSE
export const saveInitCourseInit = () => {
  return {
    type: "CREATE_INITCOURSE_INIT",
  };
};

export const saveInitCourse = (initCourse) => {
  return function (dispatch) {
    dispatch(saveInitCourseStart());
    axios
      .post(`/initCourses`, initCourse)
      .then((response) => {
        const result = response.data;
        dispatch(saveInitCourseSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveInitCourseError(resError));
      });
  };
};

export const saveInitCourseStart = () => {
  return {
    type: "CREATE_INITCOURSE_START",
  };
};

export const saveInitCourseSuccess = (result) => {
  return {
    type: "CREATE_INITCOURSE_SUCCESS",
    initCourse: result,
  };
};

export const saveInitCourseError = (error) => {
  return {
    type: "CREATE_INITCOURSE_ERROR",
    error,
  };
};

// Excel initCourse
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("initCourses/excel?" + query)
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
    type: "GET_INITCOURSE_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_INITCOURSE_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_INITCOURSE_EXCELDATA_ERROR",
    error,
  };
};

// LOAD INITCOURSE

export const loadInitCourse = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadInitCourseStart());
    axios
      .get("initCourses?" + query)
      .then((response) => {
        const loadInitCourse = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadInitCourseSuccess(loadInitCourse));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadInitCourseError(resError));
      });
  };
};

export const loadInitCourseStart = () => {
  return {
    type: "LOAD_INITCOURSE_START",
  };
};

export const loadInitCourseSuccess = (loadInitCourse, pagination) => {
  return {
    type: "LOAD_INITCOURSE_SUCCESS",
    loadInitCourse,
    pagination,
  };
};

export const loadInitCourseError = (error) => {
  return {
    type: "LOAD_INITCOURSE_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultInitCourse = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("initCourses/delete", { params: { id: ids } })
      .then((response) => {
        const deleteInitCourse = response.data.data;
        dispatch(deleteInitCourseSuccess(deleteInitCourse));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteInitCourseError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_INITCOURSE_START",
  };
};

export const deleteInitCourseSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_INITCOURSE_SUCCESS",
    deleteInitCourse: deleteData,
  };
};

export const deleteInitCourseError = (error) => {
  return {
    type: "DELETE_MULT_INITCOURSE_ERROR",
    error,
  };
};

// GET INITCOURSE

export const getInit = () => {
  return {
    type: "GET_INITCOURSE_INIT",
  };
};

export const getInitCourse = (id) => {
  return function (dispatch, getState) {
    dispatch(getInitCourseStart());
    axios
      .get("initCourses/" + id)
      .then((response) => {
        const initCourse = response.data.data;
        dispatch(getInitCourseSuccess(initCourse));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getInitCourseError(resError));
      });
  };
};

export const getInitCourseStart = () => {
  return {
    type: "GET_INITCOURSE_START",
  };
};

export const getInitCourseSuccess = (initCourse) => {
  return {
    type: "GET_INITCOURSE_SUCCESS",
    singleInitCourse: initCourse,
  };
};

export const getInitCourseError = (error) => {
  return {
    type: "GET_INITCOURSE_ERROR",
    error,
  };
};

//UPDATE INITCOURSE

export const updateInitCourse = (id, data) => {
  return function (dispatch) {
    dispatch(updateInitCourseStart());
    axios
      .put(`initCourses/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateInitCourseSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateInitCourseError(resError));
      });
  };
};

export const updateInitCourseStart = () => {
  return {
    type: "UPDATE_INITCOURSE_START",
  };
};

export const updateInitCourseSuccess = (result) => {
  return {
    type: "UPDATE_INITCOURSE_SUCCESS",
    updateInitCourse: result,
  };
};

export const updateInitCourseError = (error) => {
  return {
    type: "UPDATE_INITCOURSE_ERROR",
    error,
  };
};

export const getCountInitCourse = () => {
  return function (dispatch) {
    dispatch(getCountInitCourseStart());

    axios
      .get(`initCourses/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountInitCourseSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountInitCourseError(resError));
      });
  };
};

export const getCountInitCourseStart = () => {
  return {
    type: "GET_COUNT_INITCOURSE_START",
  };
};

export const getCountInitCourseSuccess = (result) => {
  return {
    type: "GET_COUNT_INITCOURSE_SUCCESS",
    orderCount: result,
  };
};

export const getCountInitCourseError = (error) => {
  return {
    type: "GET_COUNT_INITCOURSE_ERROR",
    error,
  };
};
