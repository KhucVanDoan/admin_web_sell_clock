import React, { useEffect, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Input,
  Upload,
  Pagination,
  Row,
  Col,
  Select,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listBranch } from "../../redux/actions/branch.action";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { formatMoney, formatTime, getBase64 } from "../../common/common";
import { listCategory } from "../../redux/actions/category.action";
import {
  createProduct,
  deleteProduct,
  detailProduct,
  listProduct,
  updateProduct,
} from "../../redux/actions/product.action";
import { listSpecification } from "../../redux/actions/specification.action";
import { BASE_URL } from "../../constants/config";
import BraftEditor from "braft-editor";
import parse from "html-react-parser";
import { ROOT_URL } from "../../constants/config";
import Search from "antd/lib/input/Search";
const { Option } = Select;

export default function Product() {
  const [visible, setVisible] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [mode, setMode] = useState();
  const [id, setId] = useState();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [filters, setFilters] = useState({ page: 1 });
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(listProduct(filters));
  }, [dispatch, filters]);

  const controls = [
    "bold",
    "italic",
    "underline",
    "text-color",
    "separator",
    "link",
    "separator",
    "media",
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "???nh",
      dataIndex: "itemImages",
      render: (record) => (
        <img
          src={`${ROOT_URL}/${record[0]?.url}`}
          alt="hi"
          style={{ width: "70px" }}
        />
      ),
    },
    {
      title: "T??n s???n ph???m",
      dataIndex: "name",
    },
    {
      title: "Danh m???c",
      dataIndex: "category",
      render: (record) => record?.name,
    },
    {
      title: "Gi?? s???n ph???m",
      dataIndex: "price",
      render: (record) => formatMoney(record),
    },
    {
      title: "Ng??y t???o",
      dataIndex: "createdAt",

      render: (record) => formatTime(record),
    },

    {
      title: "H??nh ?????ng",
      dataIndex: "",
      key: "id",
      render: (item) => {
        return (
          <>
            <EyeOutlined
              style={{
                cursor: "pointer",
                paddingRight: 10,
              }}
              onClick={() => showModalDetail(item.id)}
            />

            <DeleteOutlined
              style={{
                cursor: "pointer",
                paddingRight: 10,
              }}
              onClick={() => onClickDelete(item?.id)}
            />

            <EditOutlined
              style={{
                cursor: "pointer",
              }}
              onClick={() => showModalUpdate(item.id)}
            />
          </>
        );
      },
    },
  ];

  const onChange = (page) => {
    setFilters({
      ...filters,
      page: page,
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      name: state.product.item.name,
      description: BraftEditor.createEditorState(
        state.product.item.description
      ),
      categoryId: state.product.item?.category?.id,
      branchId: state.product.item?.branch?.id,
      price: state?.product.item?.price,
      salePrice: state?.product.item?.salePrice,
      stockQuantity: state?.product.item?.stockQuantity,
      specificationDetails: state.product.item?.specifications?.map((e) => ({
        specificationId: e.specificationId,
        content: e.content,
      })),
    });

    setFileList(
      state.product.item?.itemImages?.map((e) => ({
        uid: e.id,
        name: e.url,
        status: "done",
        url: `${BASE_URL}/${e.url}`,
        thumbUrl: `${BASE_URL}/${e.url}`,
      }))
    );
  }, [form, state.product.item]);
  const onClickDelete = (id) => {
    setVisibleDelete(true);
    setId(id);
  };
  const showModal = () => {
    setFileList([]);
    dispatch(listCategory({ filters }));
    dispatch(listBranch({ filters }));
    dispatch(listSpecification({ filters }));
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
  };

  const showModalUpdate = (id) => {
    dispatch(listCategory({ filters }));
    dispatch(listBranch({ filters }));
    dispatch(listSpecification({ filters }));
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailProduct(id));
  };

  const showModalDetail = (id) => {
    setId(id);
    setMode("DETAIL");
    setVisibleDetail(true);
    dispatch(detailProduct(id));
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "T???o m???i s???n ph???m";
      case "UPDATE":
        return "C???p nh???t s???n ph???m";
      case "DETAIL":
        return "Chi ti???t s???n ph???m";
      default:
        break;
    }
  };

  const showLableButton = (mode) => {
    switch (mode) {
      case "CREATE":
        return "T???o m???i";
      case "UPDATE":
        return "C???p nh???t";
      default:
        break;
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleDetail(false);
    setVisibleDelete(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    switch (mode) {
      case "CREATE":
        dispatch(
          createProduct(
            {
              ...values,
              description: values.description?.toHTML(),
              price: +values?.price,
              salePrice: +values?.salePrice,
            },
            () => dispatch(listProduct({ filters }))
          )
        );
        break;
      case "UPDATE":
        console.log("values", {
          ...values,
          description: values.description.toHTML(),
        });
        if (!values.images?.length) {
          values.images = { fileList };
        }
        dispatch(
          updateProduct(
            id,
            {
              ...values,
              description: values.description.toHTML(),
            },
            () => dispatch(listProduct({ filters }))
          )
        );
        break;
      default:
        break;
    }

    setVisible(false);
    setFileList([]);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);
  const confirmDelete = () => {
    dispatch(
      deleteProduct(id, () => {
        dispatch(listProduct({ filters }));
        setVisibleDelete(false);
      })
    );
  };
  function onChangeCategory(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleSearch = (value) => setFilters({ ...filters, keyword: value });

  return (
    <MainLayout>
      <h2>Danh s??ch s???n ph???m</h2>
      <Space style={{ marginBottom: 20 }}>
        <Search
          placeholder="T??m ki???m...."
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </Space>
      <Space style={{ marginBottom: 20, float: "right" }}>
        <Button value="default" onClick={showModal}>
          T???o m???i
        </Button>
      </Space>
      {/* modal create/update */}
      <Modal
        title={showTitle(mode)}
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
        width={1000}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Danh m???c"
                name="categoryId"
                rules={[{ required: true, message: "Vui l??ng ch???n danh m???c" }]}
              >
                <Select
                  showSearch
                  placeholder="Ch???n danh m???c"
                  optionFilterProp="children"
                  onChange={onChangeCategory}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {state.category.items?.length
                    ? state.category.items.map((item) => (
                        <Option value={item.id}>{item.name}</Option>
                      ))
                    : []}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="H??ng"
                name="branchId"
                rules={[{ required: true, message: "Vui l??ng ch???n h??ng" }]}
              >
                <Select
                  showSearch
                  placeholder="Ch???n h??ng"
                  optionFilterProp="children"
                  onChange={onChangeCategory}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {state.branch.items?.length
                    ? state.branch.items.map((item) => (
                        <Option value={item.id}>{item.name}</Option>
                      ))
                    : []}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="T??n s???n ph???m"
                name="name"
                rules={[
                  { required: true, message: "Vui l??ng nh???p t??n s???n ph???m" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gi?? s???n ph???m"
                name="price"
                rules={[
                  { required: true, message: "Vui l??ng nh???p gi?? s???n ph???m" },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gi?? khuy???n m??i"
                name="salePrice"
                rules={[
                  { required: true, message: "Vui l??ng nh???p gi?? khuy???n m??i" },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="S??? l?????ng"
                name="stockQuantity"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p s??? l?????ng s???n ph???m",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="???nh ?????i di???n"
                name="images"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <Upload
                  action={`${BASE_URL}/api`}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  preview
                >
                  {fileList?.length >= 8 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Col>
            <Col span={24}>
              <Form.Item
                label="M?? t??? ?????y ?????"
                name="description"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <BraftEditor
                  language={"vi-vn"}
                  className="my-editor"
                  controls={controls}
                  placeholder="Nh???p m?? t???"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Th??ng s??? k??? thu???t"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                required={true}
              >
                <Form.List name="specificationDetails">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            name={[name, "specificationId"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui l??ng ch???n th??ng s???",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              placeholder="Ch???n th??ng s???"
                              optionFilterProp="children"
                              onChange={onChangeCategory}
                              onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {state.specification.items?.length
                                ? state.specification.items.map((item) => (
                                    <Option value={item.id}>{item.name}</Option>
                                  ))
                                : []}
                            </Select>
                          </Form.Item>
                          <Form.Item name={[name, "content"]}>
                            <Input placeholder="Gi?? tr???" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Th??m th??ng s???
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {showLableButton(mode)}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* modal detail */}
      <Modal
        title={showTitle(mode)}
        visible={visibleDetail}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
        width={1000}
      >
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Danh m???c" name="categoryId">
                {state.product.item?.category?.name}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="H??ng" name="branchId">
                {state.product.item?.branch?.name}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="T??n s???n ph???m" name="name">
                {state.product.item?.name}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gi?? s???n ph???m" name="price">
                {formatMoney(state.product.item?.price)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Gi?? khuy???n m???i" name="salePrice">
                {formatMoney(+state.product.item?.salePrice)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="S??? l?????ng" name="stockQuantity">
                {state.product.item?.stockQuantity}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="???nh ?????i di???n"
                name="images"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  preview
                ></Upload>
              </Form.Item>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Col>
            <Col span={24}>
              <Form.Item
                label="M?? t??? ?????y ?????"
                name="description"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                {parse(state.product.item?.description || "")}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Th??ng s??? k??? thu???t"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                required={true}
              >
                <Row gutter={[16, 16]}>
                  <Col span={6}>Th??ng s???</Col>
                  <Col span={6}>Gi?? tr???</Col>
                </Row>
                {state.product.item?.specifications?.map((e) => (
                  <Row gutter={[16, 16]}>
                    <Col span={6}>{e.name}</Col>
                    <Col span={6}>{e.content}</Col>
                  </Row>
                ))}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* modal delete*/}
      <Modal
        title="B???n c?? ch???c ch???n mu???n xo?? s???n ph???m n??y kh??ng?"
        visible={visibleDelete}
        okText="C??"
        cancelText="Kh??ng"
        onOk={confirmDelete}
        onCancel={handleCancel}
      ></Modal>
      <Table
        columns={columns}
        dataSource={state.product.items}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 10, float: "right" }}
        current={filters?.page}
        total={state.product.meta.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
