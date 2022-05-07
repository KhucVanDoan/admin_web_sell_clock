import React, { useEffect, useState } from "react";
import MainLayout from "../../containers/MainLayout";
import {
  Button,
  Modal,
  Space,
  Table,
  Form,
  Input,
  Pagination,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createSpecification,
  deleteSpecification,
  detailSpecification,
  listSpecification,
  updateSpecification,
} from "../../redux/actions/specification.action";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Specification() {
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState();
  const [id, setId] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.specification);

  useEffect(() => {
    dispatch(listSpecification({ page }));
  }, [dispatch, page]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a - b,
        multiple: 10,
      },
    },
    {
      title: "Loại thông số",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Hành động",
      dataIndex: "",
      key: "id",
      render: (item) => {
        return (
          <>
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
    setPage(page);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: state.item.name,
    });
  }, [form, state.item]);

  const showModal = () => {
    form.resetFields();
    setMode("CREATE");
    setVisible(true);
  };

  const showModalUpdate = (id) => {
    setId(id);
    setMode("UPDATE");
    setVisible(true);
    dispatch(detailSpecification(id));
  };

  const showTitle = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới màu sắc";
      case "UPDATE":
        return "Cập nhật màu sắc";
      default:
        break;
    }
  };

  const showLableButton = (mode) => {
    switch (mode) {
      case "CREATE":
        return "Tạo mới";
      case "UPDATE":
        return "Cập nhật";
      default:
        break;
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleDelete(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    switch (mode) {
      case "CREATE":
        dispatch(
          createSpecification(values, () =>
            dispatch(listSpecification({ page }))
          )
        );
        break;
      case "UPDATE":
        dispatch(
          updateSpecification(id, values, () =>
            dispatch(listSpecification({ page }))
          )
        );
        break;
      default:
        break;
    }

    setVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onClickDelete = (id) => {
    setVisibleDelete(true);
    setId(id);
  };
  const confirmDelete = () => {
    dispatch(
      deleteSpecification(id, () => {
        dispatch(listSpecification({ page }));
        setVisibleDelete(false);
      })
    );
  };
  return (
    <MainLayout>
      <h2>Danh sách thông số kỹ thuật</h2>
      <Space style={{ marginBottom: 20, float: "right" }}>
        <Button value="default" onClick={showModal}>
          Tạo mới
        </Button>
      </Space>
      <Modal
        title={showTitle(mode)}
        visible={visible}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
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
          <Form.Item
            label="Thông số kỹ thuật"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập thông số kỹ thuật" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {showLableButton(mode)}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* modal delete*/}
      <Modal
        // title="Bạn có chắc chắn muốn xoá bản ghi này không?"
        visible={visibleDelete}
        okText="Có"
        cancelText="Không"
        onOk={confirmDelete}
        onCancel={handleCancel}
      >
        <h2 style={{ marginTop: "20px" }}>
          Bạn có chắc chắn muốn xoá bản ghi này không?
        </h2>
      </Modal>
      <Table columns={columns} dataSource={state.items} pagination={false} />
      <Pagination
        style={{ marginTop: 10, float: "right" }}
        current={page}
        total={state.meta.total}
        onChange={onChange}
      />
    </MainLayout>
  );
}
