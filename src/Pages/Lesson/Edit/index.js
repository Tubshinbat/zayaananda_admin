import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Upload,
  Space,
  Radio,
  message,
  InputNumber,
  Select,
} from "antd";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

//Components
import PageTitle from "../../../Components/PageTitle";
import { InboxOutlined } from "@ant-design/icons";
import Loader from "../../../Components/Generals/Loader";

//Actions
import * as actions from "../../../redux/actions/initCourseActions";
import { loadInitCourse } from "../../../redux/actions/initCourseActions";


// Lib
import base from "../../../base";
import axios from "../../../axios-base";
import { toastControl } from "src/lib/toasControl";
import { convertFromdata } from "../../../lib/handleFunction";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const { Dragger } = Upload;

const Edit = (props) => {
  const [form] = Form.useForm();
  const [isDiscount, setIsDiscount] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [videos, setVideos] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [type, setType] = useState("online");
  const [deleteFiles, setDeleteFiles] = useState([]);
  const [loading, setLoading] = useState({
    visible: false,
    message: "",
  });

  const [checkedRadio, setCheckedRadio] = useState({
    status: true,
  });

  // FUNCTIONS
  const init = () => {
    props.getInitCourse(props.match.params.id);
  };

  const clear = () => {
    props.clear();
    form.resetFields();
    setPictures([]);
    setLoading(false);
  };

  // -- TREE FUNCTIONS

  const handleChange = (event) => {
    form.setFieldsValue({ details: event });
  };

  const handleRadio = (value, type) => {
    setCheckedRadio((bc) => ({ ...bc, [type]: value }));
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const handleEdit = (values, status = null) => {
    if (values.status === undefined) values.status = true;
     
    if (pictures.length > 0) {
      values.pictures = pictures.map((el) => el.name);
    } else {
      values.pictures = [];
    }

    if (deleteFiles && deleteFiles.length > 0) {
      deleteFiles.map(async (deleteFile) => {
        await axios.delete("/imgupload", { data: { file: deleteFile } });
      });
    }

    const data = {
      ...values,
    };

    if (status === "draft") {
      data.status = false;
    }

    const sendData = convertFromdata(data);
    props.updateLesson(props.match.params.id, sendData);
  };

  const handleRemove = (stType, file) => {
    let index;
    let deleteFile;
    let list;

    switch (stType) {
      case "videos":
        index = videos.indexOf(file);
        deleteFile = videos[index].name;
        list = videos.slice();
        list.splice(index, 1);
        setVideos(list);
        break;
      default:
        index = pictures.indexOf(list);
        deleteFile = pictures[index].name;
        list = pictures.slice();
        list.splice(index, 1);
        setPictures(list);
        break;
    }
    setDeleteFiles((bf) => [...bf, deleteFile]);
    // axios
    //   .delete("/imgupload", { data: { file: deleteFile } })
    //   .then((succ) => {
    //     toastControl("success", "Амжилттай файл устгагдлаа");
    //   })
    //   .catch((error) =>
    //     toastControl("error", "Файл устгах явцад алдаа гарлаа")
    //   );
  };

  // CONFIGS

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);

        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    fmData.append("file", file);
    try {
      const res = await axios.post("/imgupload", fmData, config);
      const img = {
        name: res.data.data,
        url: `${base.cdnUrl}${res.data.data}`,
      };
      setPictures((bfPicture) => [...bfPicture, img]);
      onSuccess("Ok");
      message.success(res.data.data + " Хуулагдлаа");
      return img;
    } catch (err) {
      toastControl("error", err);
      onError({ err });
      return false;
    }
  };

  const uploadOptions = {
    onRemove: (file) => handleRemove("pictures", file),
    fileList: [...pictures],
    customRequest: uploadImage,
    accept: "image/*",
    name: "picture",
    multiple: true,
    listType: "picture",
  };

  const videoUploadOptions = {
    onRemove: (file) => handleRemove("videos", file),
    customRequest: (options) => uploadFile(options, "videos"),
    fileList: [...videos],
    accept: "video/*",
    name: "video",
    multiple: true,
  };

  const uploadFile = async (options, stType) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("file", file);
    try {
      setLoading({ visible: true, message: "Түр хүлээнэ үү файл хуулж байна" });
      const res = await axios.post("/imgupload/file", fmData, config);
      const data = {
        name: res.data.data,
        status: "done",
      };

      setVideos((bv) => [...bv, data]);
      onSuccess("Ok");
      message.success(res.data.data + " Хуулагдлаа");
      setLoading({ visible: false, message: "" });
    } catch (error) {
      toastControl("error", error);
      onError({ error });
    }
  };

  // USEEFFECT
  useEffect(() => {
    init();
    return () => clear();
  }, []);

  useEffect(() => {
    if (props.lesson) {
      form.setFieldsValue({ ...props.lesson });
      setCheckedRadio(() => ({
        status: props.lesson.status,
      }));

      if (props.lesson.pictures && props.lesson.pictures.length > 0) {
        setPictures(
          props.lesson.pictures.map((img) => ({
            name: img,
            url: `${base.cdnUrl}${img}`,
          }))
        );
      } else {
        setPictures(() => []);
      }

      if(props.lesson.video){
        setVideos([{
          name:props.lesson.video,
          status:"done"
        }])
      }

    }
  }, [props.initCourse]);

  // Ямар нэгэн алдаа эсвэл амжилттай үйлдэл хийгдвэл энд useEffect барьж аваад TOAST харуулна
  useEffect(() => {
    toastControl("error", props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.success) {
      toastControl("success", props.success);
      setTimeout(() => props.history.replace("/courses"), 2000);
    }
  }, [props.success]);


  useEffect(() => {
    if (props.initCourses) {
      let datas = props.initCourses.map((course) => {
        return {
          label: course.name,
          value: course._id,
        };
      });
      setCourseList(datas);
    }
  }, [props.initCourses]);

  return (
    <>
      <div className="content-wrapper">
        <PageTitle name="Хичээл шинчлэх" />
        <div className="page-sub-menu"></div>
        <div className="content">
          <Loader show={loading.visible}> {loading.message} </Loader>
          <div className="container-fluid">
            <Form layout="vertical" form={form}>
              <div className="row">
                <div className="col-8">
                  <div className="card card-primary">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <Form.Item
                            label="Хичээлийн нэр"
                            name="name"
                            rules={[requiredRule]}
                            hasFeedback
                          >
                            <Input placeholder="Хичээлийн нэр оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item
                            label="Курс сонгох"
                            name="parentId"
                            rules={[requiredRule]}
                            hasFeedback
                          >
                            <Select
                              showSearch
                              placeholder="Курс сонгох"
                              optionFilterProp="children"
                              options={courseList}
                              filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                              }
                            ></Select>
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <Form.Item
                            label="Дэлгэрэнгүй"
                            name="details"
                            getValueFromEvent={(e) =>
                              e.target && e.target.getContent()
                            }
                            rules={[requiredRule]}
                          >
                            <Editor
                              apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                              init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                  "advlist textcolor autolink lists link image charmap print preview anchor tinydrive ",
                                  "searchreplace visualblocks code fullscreen",
                                  "insertdatetime media table paste code help wordcount image media  code  table  ",
                                ],
                                toolbar:
                                  "mybutton | addPdf |  image | undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic forecolor  backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link  | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                                file_picker_types: "image",
                                tinydrive_token_provider: `${base.apiUrl}users/jwt`,
                                automatic_uploads: false,
                                setup: (editor) => {
                                  editor.ui.registry.addButton("mybutton", {
                                    text: "Файл оруулах",
                                    onAction: () => {
                                      var input =
                                        document.createElement("input");
                                      input.setAttribute("type", "file");
                                      input.onchange = async function () {
                                        var file = this.files[0];
                                        const fData = new FormData();
                                        fData.append("file", file);
                                        setLoading({
                                          visible: true,
                                          message:
                                            "Түр хүлээнэ үү файл хуулж байна",
                                        });
                                        const res = await axios.post(
                                          "/file",
                                          fData
                                        );
                                        const url =
                                          `${base.cdnUrl}` + res.data.data;
                                        editor.insertContent(
                                          `<a href="${url}"> ${res.data.data} </a>`
                                        );
                                        setLoading({
                                          visible: false,
                                        });
                                      };
                                      input.click();
                                    },
                                  });
                                  editor.ui.registry.addButton("addPdf", {
                                    text: "PDF Файл оруулах",
                                    onAction: () => {
                                      let input =
                                        document.createElement("input");
                                      input.setAttribute("type", "file");
                                      input.setAttribute("accept", ".pdf");
                                      input.onchange = async function () {
                                        let file = this.files[0];
                                        const fData = new FormData();
                                        fData.append("file", file);
                                        setLoading({
                                          visible: true,
                                          message:
                                            "Түр хүлээнэ үү файл хуулж байна",
                                        });
                                        const res = await axios.post(
                                          "/file",
                                          fData
                                        );
                                        const url = base.cdnUrl + res.data.data;
                                        editor.insertContent(
                                          `<iframe src="${url}" style="width:100%; min-height: 500px"> </iframe>`
                                        );
                                        setLoading({
                                          visible: false,
                                        });
                                      };
                                      input.click();
                                    },
                                  });
                                },
                                file_picker_callback: function (
                                  cb,
                                  value,
                                  meta
                                ) {
                                  var input = document.createElement("input");
                                  input.setAttribute("type", "file");
                                  input.setAttribute("accept", "image/*");
                                  input.onchange = async function () {
                                    var file = this.files[0];
                                    const fData = new FormData();
                                    fData.append("file", file);
                                    const res = await axios.post(
                                      "/imgupload",
                                      fData
                                    );
                                    const url =
                                      `${base.cdnUrl}` + res.data.data;
                                    cb(url);
                                  };
                                  input.click();
                                },
                              }}
                              onEditorChange={(event) => handleChange(event)}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-12">
                          <div className="card">
                            <div class="card-header">
                              <h3 class="card-title">Видео оруулах</h3>
                            </div>
                            <div className="card-body">
                              <Dragger
                                {...videoUploadOptions}
                                className="upload-list-inline"
                              >
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Видеогоо энэ хэсэг рүү чирч оруулна уу
                                </p>
                                <p className="ant-upload-hint">
                                  Нэг болон түүнээс дээш файл хуулах боломжтой
                                </p>
                              </Dragger>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">ТОХИРГОО</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4">
                          <Form.Item label="Идэвхтэй эсэх" name="status">
                            <Switch
                              checkedChildren="Идэвхтэй"
                              unCheckedChildren="Идэвхгүй"
                              size="medium"
                              checked={checkedRadio.status}
                              onChange={(checked) =>
                                handleRadio(checked, "status")
                              }
                              defaultChecked
                            />
                          </Form.Item>
                        </div>
                        <div className="col-4">
                          <Form.Item label="Онцлох" name="star">
                            <Switch
                              size="medium"
                              checked={checkedRadio.star}
                              onChange={(checked) =>
                                handleRadio(checked, "star")
                              }
                            />
                          </Form.Item>
                        </div>
                        <div className="col-4">
                          <Form.Item label="Хөнгөлөлтэй эсэх" name="isDiscount">
                            <Switch
                              size="medium"
                              checked={isDiscount}
                              onChange={(value) => setIsDiscount(value)}
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
                                handleEdit(values);
                              })
                              .catch((info) => {
                                // console.log(info);
                              });
                          }}
                        >
                          Нийтлэх
                        </Button>
                        <Button
                          key="draft"
                          type="primary"
                          onClick={() => {
                            form
                              .validateFields()
                              .then((values) => {
                                handleEdit(values, "draft");
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
                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">ТӨРӨЛ</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <Form.Item name="type" value={type}>
                            <Radio.Group
                              defaultValue={type}
                              onChange={onChangeType}
                            >
                              <Space direction="vertical">
                                <Radio value={"online"} selected>
                                  Онлайн курс
                                </Radio>
                                <Radio value={"local"}>Танхим </Radio>
                              </Space>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div class="card-header">
                      <h3 class="card-title">Зураг оруулах</h3>
                    </div>
                    <div className="card-body">
                      <Dragger
                        {...uploadOptions}
                        className="upload-list-inline"
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Зургаа энэ хэсэг рүү чирч оруулна уу
                        </p>
                        <p className="ant-upload-hint">
                          Нэг болон түүнээс дээш файл хуулах боломжтой
                        </p>
                      </Dragger>
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
    success: state.initCourseReducer.success,
    error: state.initCourseReducer.error,
    loading: state.initCourseReducer.loading,
    initCourse: state.initCourseReducer.initCourse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInitCourse: (id, data) =>
      dispatch(actions.updateInitCourse(id, data)),
    clear: () => dispatch(actions.clear()),
    getInitCourse: (id) => dispatch(actions.getInitCourse(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
