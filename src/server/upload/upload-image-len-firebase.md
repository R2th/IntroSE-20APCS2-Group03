Có lẽ việc upload image hoặc file lên firebase đã không còn xa lạ hoặc đôi khi là đơn giản đối với mọi người. Tuy nhiên trong bài này mình đang cố gắng xây dựng 1 tầng chuyên xử lí phần upload data lên firebase và nó có thể hoạt động độc lập không phụ thuộc vào phục vụ cho kiến trúc nào, áp dụng cho React-native và ReactJs Webapp được.

Tiêu chí đơn giản là tác vụ upload data lên firebase sẽ chỉ bao gồm input và output. Còn làm thế nào để có được input đẩy vào sẽ thực hiện ở từng platform khác nhau.

Một ví dụ về việc xử lí image và upload với React-Native với imageUrl thì ta có thể sẽ dùng 'react-native-fetch-blob' để thực hiện đẩy image data về dạng firebase allow ( với phần hiện tại thì chỉ allow định dạng file kiểu Blob và File) hoặc là dạng base64. Chúng ta có thể sẽ code như sau đề giải quyết bài toán đặt ra.
```
  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      const imageRef = FirebaseClient.storage().ref('images').child('image_001')

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }
```

Thế là đã xong bài toán, tuy nhiên ở đây chúng ta thấy được nếu mang đoạn xử lí này đem giải quyết bài toán nếu mình đã có data dạng file rồi thì sao, có lẽ sẽ phải viết lại kha khá cái mới. Và nếu bạn muốn dựng 1 kiến trúc cho cả ReactJS web và React-Native thì sẽ không được đẹp lắm. Vì thế mình cần 1 tầng chuyên xử lí phần upload image và chúng ta chỉ truyền vào input thôi.

Mình sẽ tạo 1 phần xử lí storage như sau
```
import { call } from 'redux-saga/effects';
export const getRef = (rsf, pathOrRef) => {
  return typeof pathOrRef === 'string' ? rsf.app.storage().ref(pathOrRef) : pathOrRef;
};

function uploadFile(pathOrRef, file, metadata) {
  const ref = getRef(this, pathOrRef);
  const task = ref.put(file, metadata);
  return task;
}

```
Function uploadFile sẽ cho phép bạn truyền vào đường dẫn đến nơi bạn muốn lưu trữ image trên storage, file sẽ là dữ liệu được biến đổi trước tuỳ theo data hiện có của bạn để upload và có thể truyển thêm metadata của file.

Giờ chúng ta có thể implement khá đơn giản lại công việc upload như sau
```
 yield call(this.reduxSagaFirebase.storage.uploadFile,
      `pathString/${moment().format('MMMM__YYYY_H_mm_ss')}${fileName}`,
      blobFile,
      metadata
    );
```

blobFile ở đây chính là file input mà các bạn đã xử lí, ví dụ trong react-native bạn sẽ dùng react-native-fetch-blob để get file từ uri, hoặc sau khi dùng react-native-image-picker các bạn sẽ lấy response.uri để đẩy thành file, hoặc lấy ngay phần base64 string của nó để xử lí
```
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const blobFile = yield Blob.build(response.data, { type: `application/octet-stream;BASE64` });
      }
    });
```
sau đó đẩy blobFile lên firebase thôi. quá đơn giản phải không nào.
Tương tự khi làm với Reactjs WebApp cũng vậy thôi. 
Và nếu bạn nào muốn lấy kiểu như % upload image thì cũng có thể thêm phần xử lí kiểu như sau
```
  const task = this.reduxSagaFirebase.storage.uploadFile(filePath, file);

  task.on('state_changed', snapshot => {
    const pct = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
    console.log(`${pct}%`); // show phần trăm tiến trình nè
  })

  // Wait for upload to complete
  yield task;
```

Thanks you and good luck ;)