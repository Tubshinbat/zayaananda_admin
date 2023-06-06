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
    type: "CLEAR_LESSON",
  };
};

// SAVE LESSON
export const saveLessonInit = () => {
  return {
    type: "CREATE_LESSON_INIT",
  };
};

export const saveLesson = (lesson) => {
  return function (dispatch) {
    dispatch(saveLessonStart());
    axios
      .post(`/lessons`, lesson)
      .then((response) => {
        const result = response.data;
        dispatch(saveLessonSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(saveLessonError(resError));
      });
  };
};

export const saveLessonStart = () => {
  return {
    type: "CREATE_LESSON_START",
  };
};

export const saveLessonSuccess = (result) => {
  return {
    type: "CREATE_LESSON_SUCCESS",
    lesson: result,
  };
};

export const saveLessonError = (error) => {
  return {
    type: "CREATE_LESSON_ERROR",
    error,
  };
};

// Excel lesson
export const getExcelData = (query) => {
  return function (dispatch) {
    dispatch(getExcelDataStart());
    axios
      .get("/lessons/excel?")
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
    type: "GET_LESSON_EXCELDATA_START",
  };
};

const getExcelDataSuccess = (data) => {
  return {
    type: "GET_LESSON_EXCELDATA_SUCCESS",
    excel: data,
  };
};

const getExcelDataError = (error) => {
  return {
    type: "GET_LESSON_EXCELDATA_ERROR",
    error,
  };
};

// LOAD LESSON

export const loadLesson = (query = "") => {
  return function (dispatch, getState) {
    dispatch(loadLessonStart());
    axios
      .get("lessons?" + query)
      .then((response) => {
        const loadLesson = response.data.data;
        const pagination = response.data.pagination;
        dispatch(loadLessonSuccess(loadLesson));
        dispatch(loadPagination(pagination));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(loadLessonError(resError));
      });
  };
};

export const loadLessonStart = () => {
  return {
    type: "LOAD_LESSON_START",
  };
};

export const loadLessonSuccess = (loadLesson, pagination) => {
  return {
    type: "LOAD_LESSON_SUCCESS",
    loadLesson,
    pagination,
  };
};

export const loadLessonError = (error) => {
  return {
    type: "LOAD_LESSON_ERROR",
    error,
  };
};

export const loadPagination = (pagination) => {
  return {
    type: "LOAD_PAGINATION",
    pagination,
  };
};

export const deleteMultLesson = (ids) => {
  return function (dispatch, getState) {
    dispatch(deleteMultStart());
    axios
      .delete("lessons/delete", { params: { id: ids } })
      .then((response) => {
        const deleteLesson = response.data.data;
        dispatch(deleteLessonSuccess(deleteLesson));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(deleteLessonError(resError));
      });
  };
};

export const deleteMultStart = () => {
  return {
    type: "DELETE_MULT_LESSON_START",
  };
};

export const deleteLessonSuccess = (deleteData) => {
  return {
    type: "DELETE_MULT_LESSON_SUCCESS",
    deleteLesson: deleteData,
  };
};

export const deleteLessonError = (error) => {
  return {
    type: "DELETE_MULT_LESSON_ERROR",
    error,
  };
};

// GET LESSON

export const getInit = () => {
  return {
    type: "GET_LESSON_INIT",
  };
};

export const getLesson = (id) => {
  return function (dispatch, getState) {
    dispatch(getLessonStart());
    axios
      .get("lessons/" + id)
      .then((response) => {
        const lesson = response.data.data;
        dispatch(getLessonSuccess(lesson));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getLessonError(resError));
      });
  };
};

export const getLessonStart = () => {
  return {
    type: "GET_LESSON_START",
  };
};

export const getLessonSuccess = (lesson) => {
  return {
    type: "GET_LESSON_SUCCESS",
    singleLesson: lesson,
  };
};

export const getLessonError = (error) => {
  return {
    type: "GET_LESSON_ERROR",
    error,
  };
};

//UPDATE LESSON

export const updateLesson = (id, data) => {
  return function (dispatch) {
    dispatch(updateLessonStart());
    axios
      .put(`lessons/${id}`, data)
      .then((response) => {
        const result = response.data;
        dispatch(updateLessonSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(updateLessonError(resError));
      });
  };
};

export const updateLessonStart = () => {
  return {
    type: "UPDATE_LESSON_START",
  };
};

export const updateLessonSuccess = (result) => {
  return {
    type: "UPDATE_LESSON_SUCCESS",
    updateLesson: result,
  };
};

export const updateLessonError = (error) => {
  return {
    type: "UPDATE_LESSON_ERROR",
    error,
  };
};

export const getCountLesson = () => {
  return function (dispatch) {
    dispatch(getCountLessonStart());

    axios
      .get(`lessons/count`)
      .then((response) => {
        const result = response.data.data;
        dispatch(getCountLessonSuccess(result));
      })
      .catch((error) => {
        const resError = errorBuild(error);
        dispatch(getCountLessonError(resError));
      });
  };
};

export const getCountLessonStart = () => {
  return {
    type: "GET_COUNT_LESSON_START",
  };
};

export const getCountLessonSuccess = (result) => {
  return {
    type: "GET_COUNT_LESSON_SUCCESS",
    orderCount: result,
  };
};

export const getCountLessonError = (error) => {
  return {
    type: "GET_COUNT_LESSON_ERROR",
    error,
  };
};
