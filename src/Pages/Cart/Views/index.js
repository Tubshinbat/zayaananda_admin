import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Upload,
  message,
  Tag,
  Tooltip,
  Select,
  InputNumber,
  DatePicker,
} from "antd";
import { connect } from "react-redux";
import dayjs from "dayjs";

//Components
import PageTitle from "../../../Components/PageTitle";
import Loader from "../../../Components/Generals/Loader";
import { PlusOutlined } from "@ant-design/icons";

//Actions
import { tinymceAddPhoto } from "../../../redux/actions/imageActions";
import * as actions from "../../../redux/actions/cartActions";

// Lib
import base from "../../../base";
import axios from "../../../axios-base";
import { toastControl } from "src/lib/toasControl";
import { convertFromdata } from "../../../lib/handleFunction";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const View = (props) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [choiseUser, setChoiseUser] = useState();
  const [carts, setCarts] = useState([]);
  // Tags

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState("");
  const [paidType, setPaidType] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });

  // FUNCTIONS
  const init = () => {
    props.getBooking(props.match.params.id);
  };

  const clear = () => {
    props.clear();
    form.resetFields();
    setLoading(false);
  };

  // -- TREE FUNCTIONS

  const handleAdd = (values, status = null) => {
    if (!values.status) values.status = true;
    if (status == "draft") values.status = false;
    if (!values.paid) values.paid = false;
    if (!values.userId) delete values.userId;
    if (choiseUser) values.userId = choiseUser;

    const data = {
      ...values,
    };

    // console.log(values);

    const sendData = convertFromdata(data);
    props.updateCart(props.match.params.id, sendData);
  };

  const handleUser = (value) => {
    setChoiseUser(value);
  };

  // USEEFFECT
  useEffect(() => {
    init();
    return () => clear();
  }, []);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      setTimeout(() => props.history.replace("/carts"), 2000);
    }
  }, [props.success]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  useEffect(() => {
    if (props.cart) {
      setPaid(props.cart.paid);
      setPaidType(props.cart.paidType);
      setStatus(props.cart.status);

      form.setFieldsValue({ ...props.cart });
      if (props.cart.carts) {
        setCarts(props.cart.carts);
      }
    }
  }, [props.cart]);

  // Functios

  const choiseTimes = () => {
    const time = [];
    for (let i = 1; i <= 12; i++) {
      time.push({
        label: i + ":00",
        value: i + ":00",
      });
    }
    return time;
  };

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name={`Захиалга: P${props.cart.orderNumber}`} />
        <div className="page-sub-menu"></div>
        <div className="content">
          <Loader show={loading.visible}> {loading.message} </Loader>
          <div className="container-fluid">
            <Form layout="vertical" form={form}>
              <div className="row">
                <div className="col-8">
                  {carts &&
                    carts.map((el) => (
                      <div className="card card-primary">
                        <div className="card-body">
                          <div className="choise-service">
                            <div className="choise-img">
                              <img
                                src={base.cdnUrl + "/150x150/" + el.picture}
                              />
                            </div>
                            <div className="choise-service-detials">
                              <div className="choise-title">
                                <span> Бүтээгдэхүүн </span>
                                <h5>{el.name}</h5>
                              </div>

                              <p className="choise-service-price">
                                {el.qty +
                                  "x" +
                                  new Intl.NumberFormat().format(el.price)}
                                ₮
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <div className="page_detials_sub">
                    <h4>Захиалга өгсөн</h4>
                  </div>
                  <div className="card card-primary">
                    <div className="card-body">
                      <div className="row booking-details">
                        <div className="col-md-6">
                          <labe> Захиалга өгсөн нэр: </labe>
                          {props.cart.firstName}
                        </div>
                        <div className="col-md-6">
                          <labe> Овог нэр: </labe>
                          {props.cart.lastName}
                        </div>
                        <div className="col-md-6">
                          <labe> Утасны дугаар: </labe>
                          {props.cart.phoneNumber}
                        </div>
                        <div className="col-md-6">
                          <labe> Имэйл: </labe>
                          {props.cart.email}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">Төлбөрийн мэдээлэл</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <label>
                            Төлбөр:
                            {new Intl.NumberFormat().format(
                              props.cart.totalPrice
                            )}
                            {" ₮"}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">Өөрчлөлт</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <Form.Item label="Идэвхтэй эсэх" name="status">
                            <Switch
                              checkedChildren="Идэвхтэй"
                              unCheckedChildren="Идэвхгүй"
                              size="medium"
                              checked={status}
                              onChange={(e) => setStatus(e)}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item
                            label="Төлбөрөө төлсөн эсэх"
                            name="paidType"
                          >
                            <Select
                              style={{
                                width: "100%",
                              }}
                              options={[
                                {
                                  value: "qpay",
                                  label: "Qpay",
                                },
                                {
                                  value: "bankaccount",
                                  label: "Банкаар шилжүүлсэн",
                                },
                              ]}
                              value={paidType}
                            ></Select>
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item label="Төлбөрөө төлсөн эсэх" name="paid">
                            <Switch
                              checkedChildren="Төлсөн"
                              unCheckedChildren="Төлөөгүй"
                              size="medium"
                              checked={paid}
                              onChange={(e) => setPaid(e)}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="control-bottons">
                        <Button
                          key="submit"
                          htmlType="submit"
                          className="add-button"
                          loading={props.loading}
                          onClick={() => {
                            form
                              .validateFields()
                              .then((values) => {
                                handleAdd(values);
                              })
                              .catch((info) => {
                                // console.log(info);
                              });
                          }}
                        >
                          Хадгалах
                        </Button>
                        <Button
                          key="draft"
                          type="primary"
                          onClick={() => {
                            form
                              .validateFields()
                              .then((values) => {
                                handleAdd(values, "draft");
                              })
                              .catch((info) => {
                                // console.log(info);
                              });
                          }}
                        >
                          Ноороглох
                        </Button>
                        <Button onClick={() => props.history.goBack()}>
                          Буцах
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    success: state.cartReducer.success,
    error: state.cartReducer.error,
    loading: state.cartReducer.loading,
    cart: state.cartReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tinymceAddPhoto: (file) => dispatch(tinymceAddPhoto(file)),
    updateCart: (id, data) => dispatch(actions.updateCart(id, data)),
    getBooking: (id) => dispatch(actions.getCart(id)),
    clear: () => dispatch(actions.clear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
