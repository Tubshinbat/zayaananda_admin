const initialState = {
  loading: false,
  error: null,
  success: null,
  lessons: [],
  paginationLast: {},
  excelData: [],
  lesson: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_LESSON":
      return {
        ...state,
        error: null,
        success: null,
      };

    case "LOAD_LESSON_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        lessons: [],
      };

    case "LOAD_LESSON_SUCCESS":
      return {
        ...state,
        loading: false,
        lessons: action.loadLesson,
      };

    case "LOAD_LESSON_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        lessons: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    // EXCEL
    case "GET_LESSON_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_LESSON_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
      };

    case "GET_LESSON_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_LESSON_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_LESSON_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_LESSON_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        lesson: action.lesson,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_LESSON_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "DELETE_MULT_LESSON_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_LESSON_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_LESSON_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_LESSON_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        lesson: {},
      };

    case "GET_LESSON_START":
      return {
        ...state,
        loading: true,
        lesson: {},
        error: null,
      };

    case "GET_LESSON_SUCCESS":
      return {
        ...state,
        loading: false,
        lesson: action.singleLesson,
        error: null,
      };

    case "GET_LESSON_ERROR":
      return {
        ...state,
        loading: false,
        lesson: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_LESSON_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_LESSON_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_LESSON_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };
    case "UPDATE_END":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
      };

    // GET COUNT
    case "GET_COUNT_LESSON_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_LESSON_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_LESSON_ERROR":
      return {
        ...state,
        countLoading: false,
        totalCount: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
