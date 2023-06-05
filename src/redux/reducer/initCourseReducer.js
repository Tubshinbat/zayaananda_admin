const initialState = {
  loading: false,
  error: null,
  success: null,
  initCourses: [],
  paginationLast: {},
  excelData: [],
  initCourse: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_INITCOURSE":
      return {
        ...state,
        error: null,
        success: null,
      };

    case "LOAD_INITCOURSE_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        initCourses: [],
      };

    case "LOAD_INITCOURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        initCourses: action.loadInitCourse,
      };

    case "LOAD_INITCOURSE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        initCourses: [],
        error: action.error,
      };

    case "LOAD_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };
    // EXCEL
    case "GET_INITCOURSE_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_INITCOURSE_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
      };

    case "GET_INITCOURSE_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_INITCOURSE_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_INITCOURSE_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_INITCOURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        initCourse: action.initCourse,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_INITCOURSE_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "DELETE_MULT_INITCOURSE_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_INITCOURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_INITCOURSE_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_INITCOURSE_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        initCourse: {},
      };

    case "GET_INITCOURSE_START":
      return {
        ...state,
        loading: true,
        initCourse: {},
        error: null,
      };

    case "GET_INITCOURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        initCourse: action.singleInitCourse,
        error: null,
      };

    case "GET_INITCOURSE_ERROR":
      return {
        ...state,
        loading: false,
        initCourse: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_INITCOURSE_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_INITCOURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_INITCOURSE_ERROR":
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
    case "GET_COUNT_INITCOURSE_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_INITCOURSE_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_INITCOURSE_ERROR":
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
