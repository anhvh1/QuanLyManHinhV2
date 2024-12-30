import {PlusOutlined} from '@ant-design/icons';
import {Upload as UploadAnt} from 'antd';
import {getInfoFromToken} from '../../../../helpers/utility';
const Upload = (props) => {
  const {ListFile, setListFile, loading} = props;
  const getBase64 = (file, callback, listFile) => {
    // listFile.forEach(file => {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      callback(reader.result, file, listFile),
    );
    reader.readAsDataURL(file);
    // })
  };
  const genDataFileDinhKem = (base64, file, listFile) => {
    const newListFileDinhKem = [...ListFile, ...listFile];
    setListFile(newListFileDinhKem);
  };

  const beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getInfoFromToken()?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;
    const ListFileExist = [];
    listFile.forEach((file) => {
      const ExistFile = ListFile.filter(
        (item) => item.TenFileGoc === file.name,
      );
      if (ExistFile.length) {
        ListFileExist.push(file);
      }
    });
    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64(file, callback, listFile);
    }
    // }
    return false;
  };

  return (
    <div className="upload-wrapper">
      <UploadAnt
        showUploadList={false}
        // multiple={true}
        beforeUpload={(file, listFile) =>
          beforeUploadFile(file, genDataFileDinhKem, listFile)
        }
        accept={'.jpg,.png'}
        disabled={loading}
      >
        <img />
        <PlusOutlined className="plus-icon" />
      </UploadAnt>
    </div>
  );
};

export default Upload;
