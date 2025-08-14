import React, { FC, useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface ImageUploaderProps {
  fileList: any[];
  setFileList: (files: any[]) => void;
  setFiles: (files: File[]) => void;
  title?: string;
  imageLength?: string;
  isMultiple: boolean;
  allowedFileTypes?: string[];
  ErrorMsg?: string;
  maxFileSizeMB?: number;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  fileList,
  setFileList,
  setFiles,
  title = 'Upload',
  imageLength,
  isMultiple,
  maxFileSizeMB,
  allowedFileTypes = [],
  ErrorMsg,
}) => {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const getBase64 = (file: File | Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }

    const isPdf = file.type === 'application/pdf' || file.name?.endsWith('.pdf');
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url?.substring(file.url.lastIndexOf('/') + 1));

    if (isPdf) {
      setPreviewImage(file.url || file.preview); // base64 fallback for preview if needed
    } else {
      setPreviewImage(file.url || file.preview);
    }
  };

  const handleChange: any = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
    const rawFiles: File[] = newFileList
      .filter((file: any) => file.originFileObj)
      .map((file: any) => file.originFileObj);
    setFiles(rawFiles);
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileUrl = URL.createObjectURL(file);
      const newFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: fileUrl,
      };
      setFileList([...fileList, newFile]);
      onSuccess(newFile);
    } catch (error) {
      onError(error);
    }
  };

  const beforeUpload = (file: File) => {

    if (allowedFileTypes && !allowedFileTypes.includes(file.type)) {
      Modal.error({
        title: 'Invalid File Type',
        content: ErrorMsg,
      });
      return Upload.LIST_IGNORE;
    }

    if (maxFileSizeMB && file.size / 1024 / 1024 > maxFileSizeMB) {
      Modal.error({
        title: 'File Too Large',
        content: `File must be smaller than ${maxFileSizeMB}MB.`,
      });
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{title}</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
        multiple={isMultiple}
        beforeUpload={beforeUpload}
        showUploadList={{ showRemoveIcon: true }}
      >
        {fileList.length >= Number(imageLength) ? null : uploadButton}
      </Upload>

      {/* <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal> */}

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        width={800}
      >
        {previewTitle?.endsWith('.pdf') ? (
          <iframe
            src={previewImage}
            style={{ width: '100%', height: '600px', border: 'none' }}
            title="PDF Preview"
          />
        ) : (
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        )}
      </Modal>
    </>
  )
}

export default ImageUploader