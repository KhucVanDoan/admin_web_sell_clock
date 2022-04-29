import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import MainLayout from "../../containers/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  detailSetting,
  updateSetting,
} from "../../redux/actions/setting.action";
import { BASE_URL } from "../../constants/config";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64 } from "../../common/common";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

export default function Setting() {
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const state = useSelector((state) => state.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue({
      title: state.item?.title,
      description: state.item?.description,
      keyword: state.item?.keyword,
    });

    // setFileList(
    //   state.product.item?.productImages?.map((e) => ({
    //     uid: e.id,
    //     name: e.url,
    //     status: "done",
    //     url: `${BASE_URL}/${e.url}`,
    //     thumbUrl: `${BASE_URL}/${e.url}`,
    //   }))
    // );
  }, [form, state]);

  const onFinish = (values) => {
    dispatch(updateSetting(values, () => dispatch(detailSetting())));
  };

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

  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <MainLayout>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Cài đặt thông tin website
      </h2>

      <Form {...layout} name="nest-messages" onFinish={onFinish} form={form}>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="keyword" label="Từ khoá" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Ảnh slide"
          name="images"
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 20 }}
        >
          <Upload
            action={`${BASE_URL}/api`}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            preview
          >
            {fileList?.length >= 3 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 3 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
}
