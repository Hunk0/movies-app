import React from 'react'
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

function Uploader({ onChange }) {
    function fakeRequest({ file, onSuccess }) {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
    };

    return (
        <span>
            <Upload.Dragger name="files" accept="image/png, image/jpeg" maxCount={1} customRequest={fakeRequest} beforeUpload={onChange}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Has click para seleccionar un archivo</p>
                <p className="ant-upload-hint">Solo archivos de tipo imagen</p>
            </Upload.Dragger>
        </span>
    )
}

export default Uploader
