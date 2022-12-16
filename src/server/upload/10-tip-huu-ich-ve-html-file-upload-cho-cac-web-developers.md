### Giới thiệu

Việc cần có upload files luôn là yêu cầu chính đối với nhiều ứng dụng web và di động. Upload file có mặt ở khắp mọi nơi, từ việc cần tải ảnh lên mạng xã hội, hay tải CV lên các website tìm kiếm việc làm.

Là một web developer, chúng ta phải biết rằng HTML có cung cấp native file upload với một chút hỗ trợ từ Javascript. Với HTML5 thì sẽ có File API được add thêm vào DOM, giúp có thể đọc list file và file object bên trong. Điều này sẽ giải quyết với khá nhiều trường hợp liên quan đến files.

Bài viết này sẽ thảo luận về 10 cách sử dụng trình hỗ trợ HTML file upload. 

### 1. Simple file upload

Đây là loại cơ bản nhất thường hay được sử dụng trong các ứng dụng web.
```
<input type="file" id="file-uploader">
```
User có thể tải một hoặc nhiều file từ button upload. Mặc định thường sẽ cho tải lên một file duy nhất từ trình duyệt gốc của hệ điều hành.

Khi tải lên thành công, File API có thể giúp đọc File object bằng cách sử dụng một đoạn code JS đơn giản. Để đọc File object, cần lắng nghe sự kiện thay đổi từ file uploader.

Đầu tiên, get file uploader theo id như sau:

```
const fileUploader = document.getElementById('file-uploader');
```
Sau đó, add event listener để đọc File object khi quá trình tải lên hoàn tất. Lấy thông tin file đã tải lên từ thuộc tính *event.target.files*.
```
fileUploader.addEventListener('change', (event) => {
  const files = event.target.files;
  console.log('files', files);
});
```
Quan sát output từ console của trình duyệt. Lưu ý rằng mảng FileList với File object có tất cả thông tin siêu dữ liệu về file được tải lên.

![](https://images.viblo.asia/3a344214-3961-485c-864a-47b9ac4822fc.png)

Link codepen tham khảo [tại đây](https://codepen.io/ngannk/pen/WNxGzrN)

### 2. Multiple file uploads

Có thể tải lên nhiều file cùng một lúc. Để làm điều đó, chỉ cần add thêm một atrribute là multiple vào input file.
```
<input type="file" id="file-uploader" multiple />
```

Bây giờ, file browser sẽ cho phép tải lên một hoặc nhiều file. Cũng giống như ví dụ trước, có thể add thêm change event handler để nắm bắt thông tin về các file đã tải lên. Để ý rằng FileList ở đây là một mảng, và sẽ có thông tin như sau:
![](https://images.viblo.asia/12f1167f-cd3a-4ac9-9f77-1f8128149a2c.png)

Link codepen tham khảo [tại đây](https://codepen.io/ngannk/pen/oNLzqbd)

### 3. File metadata
Bất cứ khi nào chúng tôi tải file lên, File object luôn có thông tin siêu dữ liệu là các file name, size, last update time, type, tên tệp,...Các thông tin này có thể hữu ích cho việc xác nhận và ra quyết định.

```
// Get the file uploader by id
const fileUploader = document.getElementById('file-uploader');

// Listen to the change event and read metadata
fileUploader.addEventListener('change', (event) => {
  // Get the FileList array
  const files = event.target.files;

  // Loop through the files and get metadata
  for (const file of files) {
    const name = file.name;
    const type = file.type ? file.type: 'NA';
    const size = file.size;
    const lastModified = file.lastModified;
    console.log({ file, name, type, size, lastModified });
  }
});
```
Đây là output của một single file upload
![](https://images.viblo.asia/1e297235-6814-4316-ace1-9f8de128a77f.png)

Link codepen [tham khảo](https://codepen.io/ngannk/pen/wvWzmMV) nào.

### 4. File accept property
Có thể sử dụng attribute *accept* để giới hạn loại file được tải lên, như việc chỉ được phép hiển thị một loại file ảnh khi cần upload ảnh lên hồ sơ chẳng hạn.
```
<input type="file" id="file-uploader" accept=".jpg, .png" multiple>
```
Đoạn code trên, trình duyệt chỉ cho phép upload một số file có đuôi là .jpg và .png.

Lưu ý, trong trường hợp này, file browser sẽ tự tuỳ chỉnh loại file lựa chọn thay vì cho chọn tất cả. Tuy nhiên, luôn có thể back lại việc cho upload all files nếu cần.
![](https://images.viblo.asia/31b5651e-00a5-4f60-ad7b-0aae33210776.png)

Tìm hiểu cụ thể hơn [ở đây](https://codepen.io/ngannk/pen/abZmYNL) nhé.

### 5. Quản lý file content
Có thể show file content sau khi upload file thành công. Đối với loại ảnh profile, sẽ khá bối rối nếu không hiểu thị ảnh đã tải lên ngay sau khi user upload. 

Vì thế, có thể sử dụng FileReader để convert file sang chuỗi binary (nhị phân). Sau đó add thêm event listener để get chuỗi binary lên file upload thành công.

```
// Get the instance of the FileReader
const reader = new FileReader();

fileUploader.addEventListener('change', (event) => {
  const files = event.target.files;
  const file = files[0];

  // Get the file object after upload and read the
  // data as URL binary string
  reader.readAsDataURL(file);

  // Once loaded, do something with the string
  reader.addEventListener('load', (event) => {
    // Here we are creating an image tag and adding
    // an image to it.
    const img = document.createElement('img');
    imageGrid.appendChild(img);
    img.src = event.target.result;
    img.alt = file.name;
  });
});
```
Hãy thử với ví dụ [tại đây](https://codepen.io/ngannk/pen/BazLrKg) nhé.

### 6. Validate file size

Có thể đọc size metadata của một file, và thậm chí có thể sử dụng nó để xác định file size. Có thể cho phép user tải lên file image với dụng lượng tối đa 1MB. Hãy thử xem ví dụ dưới đây.
```
// Listener for file upload change event
fileUploader.addEventListener('change', (event) => {
  // Read the file size
  const file = event.target.files[0];
  const size = file.size;

  let msg = '';

 // Check if the file size is bigger than 1MB and prepare a message.
  if (size > 1024 * 1024) {
      msg = `<span style="color:red;">The allowed file size is 1MB. The file you are trying to upload is of ${returnFileSize(size)}</span>`;
  } else {
      msg = `<span style="color:green;"> A ${returnFileSize(size)} file has been uploaded successfully. </span>`;
  }

  // Show the message to the user
  feedback.innerHTML = msg;
});
```
Thử upload nhiều file ảnh khác nhau và xem hiệu quả hoạt động của nó [tại đây](https://codepen.io/ngannk/pen/KKMgoMV).

### 7. Hiển thị file upload progress

Khả năng ổn áp nhất là cho user biết về tiến trình tải file lên đến đâu rồi. Hiện tại thì chúng ta đã biết về FileReader và các event đọc và load file.

```
const reader = new FileReader();
```

FileReader có một sự kiện khác, được gọi là *progress* để có thể nắm được thời gian tải file. Chúng ta có thể sử dụng *HTML5 progress* để tạo một progressbar như sau.

```
reader.addEventListener('progress', (event) => {
  if (event.loaded && event.total) {
    // Calculate the percentage completed
    const percent = (event.loaded / event.total) * 100;
    // Set the value to the progress component
    progress.value = percent;
  }
});
```

Thử tải một file lớn hơn và theo dõi progress bar hoạt động thế nào xem. [Link](https://codepen.io/ngannk/pen/vYKXRKV) trải nghiệm đây nhé.

### 8.  Directory upload

Có thể tải toàn bộ thư mục lên không? Tất nhiên là có thể, nhưng có hạn chế. Có một loại attributes nhưng không chuẩn lắm (ít nhất là trong bài viết này), gọi là *webkitdirectory* cho phép tải lên toàn bộ thư mục.
> Mặc dù ban đầu chỉ được triển khai cho các trình duyệt dựa trên WebKit, tuy nhiên *webkitdirectory* cũng có thể sử dụng được trong Microsoft Edge cũng như Firefox 50 trở lên. Mặc dù nó có hỗ trợ tương đối rộng, nhưng vẫn không phải là tiêu chuẩn và không nên được sử dụng trừ khi không có giải pháp thay thế.

```
<input type="file" id="file-uploader" webkitdirectory />
```
Việc này sẽ cho phép chọn thư mục như sau:

![](https://images.viblo.asia/15c3f138-dd9d-422a-a1d9-6a638ff9371e.png)

![](https://images.viblo.asia/18139d31-2f5c-4c46-b482-c45af9f0a7cc.png)

Khi click button upload, quá trình tải lên sẽ diễn ra. Một điểm quan trọng cần lưu ý ở đây, là mảng FileList sẽ có thông tin về tất cả các file trong thư mục được tải lên dưới dạng flat. Nhưng vấn đề là đối với mỗi File object, thuộc tính *webkitRelativePath* sẽ có đường dẫn thư mục.

Và File objects sẽ có các *webkitRelativePath* được điền như sau:

![](https://images.viblo.asia/41f6f4eb-d527-4b29-b1eb-0254f3e713d4.png)

Có thể sử dụng để render bất kì folder hay file theo cấu trúc UI nào mà chúng ta chọn. Khám phá thêm [tại đây](https://codepen.io/ngannk/pen/mdErxrv).

### 9. Drap & drop
Việc không hỗ trợ kéo thả để tải file lên thì đúng là quá lỗi thời phải không. Hãy làm việc đó với một vài bước đơn giản nào.

Đầu tiên, hãy tạo một drop zone (vùng thả file) và chọn một phần để hiển thị file content tải lên. Chúng ta sẽ sử dụng một file image và kéo thả tại đây.

```
<div id="container">
  <h1>Drag & Drop an Image</h1>
  <div id="drop-zone">
    DROP HERE
  </div>

  <div id="content">
    Your image to appear here..
  </div>

</div>
```

Khai báo id dropzone và content tương ứng.

```
 const dropZone = document.getElementById('drop-zone');
 const content = document.getElementById('content');
```

Thêm event *dragover* để hiển thị ảnh hưởng của thứ gì đó được sao chép.

```
dropZone.addEventListener('dragover', event => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
});
```

Tiếp đó, xác định những gì mong muốn khi image được drop. Cần sử dụng một event drop để xử lý việc này.

```
dropZone.addEventListener('drop', event => {
  // Get the files
  const files = event.dataTransfer.files;

// Now we can do everything possible to show the
// file content in an HTML element like, DIV
});
```
Trải nghiệm thêm về drap & drop [tại đây](https://codepen.io/ngannk/pen/vYKXRyQ) nhé.

### 10. Xử lý files với objectURLs

Có một phương pháp đặc biệt được gọi là *URL.createObjectURL ()* để tạo một URL duy nhất từ file. Cũng có thể giải phóng nó bằng cách sử dụng phương thức *URL.revokeObjectURL ()*.

Các phương thức DOM *URL.createObjectURL ()* và *URL.revokeObjectURL ()* cho phép tạo chuỗi URL đơn giản có thể được sử dụng để tham chiếu bất kỳ dữ liệu nào có thể được tham chiếu đến bằng cách sử dụng File object DOM, bao gồm các file local trên máy tính của người dùng.

```
img.src = URL.createObjectURL(file);
```
Tham khảo cụ thể hơn [tại đây](https://codepen.io/ngannk/pen/GRqjxNe).

### Kết luận

Nhiều khi một tính năng HTML cũng có thể đủ để giải quyết các trường hợp cơ bản và phổ biến. Và File upload ở đây khá thú vị khi cung cấp khá nhiều option mặc định để sử dụng trong ứng dụng web.