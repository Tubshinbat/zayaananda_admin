const initialState = {
  loading: false,
  error: null,
  success: null,
  carts: [],
  paginationLast: {},
  excelData: [],
  cart: {},
  //count
  countLoading: false,
  totalCount: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state,
        error: null,
        success: null,
        carts: [],
        cart: {},
        excelData: [],
        loading: false,
      };

    case "LOAD_CART_START":
      return {
        ...state,
        loading: true,
        error: null,
        suceess: null,
        carts: [],
      };

    case "LOAD_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        carts: action.carts,
      };

    case "LOAD_CART_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        carts: [],
        error: action.error,
      };

    case "LOAD_CART_PAGINATION":
      return {
        ...state,
        paginationLast: action.pagination,
      };

    // EXCEL
    case "GET_CART_EXCELDATA_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        excelData: [],
      };

    case "GET_CART_EXCELDATA_SUCCESS":
      return {
        ...state,
        loading: false,
        excelData: action.excel,
        error: null,
        success: null,
      };

    case "GET_CART_EXCELDATA_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
        excelData: [],
      };

    // SAVE
    case "CREATE_CART_INIT":
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };

    case "CREATE_CART_START":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case "CREATE_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        cart: action.cart,
        success: "Амжилттай нэмэгдлээ",
      };
    case "CREATE_CART_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
        success: null,
      };

    case "DELETE_MULT_CART_START":
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case "DELETE_MULT_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Амжилттай устгагдлаа",
        error: null,
      };
    case "DELETE_MULT_CART_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    //GET
    case "GET_CART_INIT":
      return {
        ...state,
        loading: false,
        success: null,
        error: null,
        cart: {},
      };

    case "GET_CART_START":
      return {
        ...state,
        loading: true,
        cart: {},
        error: null,
      };

    case "GET_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        cart: action.cart,
        error: null,
      };

    case "GET_CART_ERROR":
      return {
        ...state,
        loading: false,
        cart: {},
        error: action.error,
      };
    //UPDATE
    case "UPDATE_CART_START":
      return {
        ...state,
        success: null,
        loading: true,
        error: null,
      };
    case "UPDATE_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        success: "Мэдээллийг амжилттай шинэчлэгдлээ",
        error: null,
      };
    case "UPDATE_CART_ERROR":
      return {
        ...state,
        loading: false,
        success: null,
        error: action.error,
      };

    // GET COUNT
    case "GET_COUNT_CART_START":
      return {
        ...state,
        countLoading: true,
        totalCount: null,
        error: null,
      };
    case "GET_COUNT_CART_SUCCESS":
      return {
        ...state,
        coutLoading: false,
        totalCount: action.orderCount,
        error: null,
      };
    case "GET_COUNT_CART_ERROR":
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
