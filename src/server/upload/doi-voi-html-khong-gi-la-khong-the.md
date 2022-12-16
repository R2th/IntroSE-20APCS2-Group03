Đối với ứng dụng web và di động thì việc tải lại một file là rất quan trọng như với nhiều nhu cầu khác nhau từ người sử dụng: đăng hình sản phầm, logo, tập tin thống kê... Và nhờ một chút sự trợ giúp từ Javascript thì nhà HTML cũng cung cấp cách tải 1 tệp lên trang web của bạn. Cùng nhau tìm hiểu ở bài viết này nhé!
![](https://images.viblo.asia/52634e9c-ee13-4058-8fcb-49b83674b44d.png)


### 1. Tải 1 file
Chúng ta có thể dùng tag `<input>` và chọn định dạng là "file" để có thể upload file lên trang web hay ứng dụng của mình.
```html
<input type="file" id="file-uploader">
```
Với cách sử dụng này cho phép người dùng có nút tải lên một hoặc nhiều tệp nhưng theo mặc định nó cho phép tải lên một tệp duy nhất bằng trình duyệt tệp gốc của hệ điều hành.

Khi upload lên thành công, API File giúp có thể đọc File bằng cách sử dụng mã JavaScript đơn giản. Đầu tiên, lấy file theo id:
```js
const fileUploader = document.getElementById('file-uploader');
```
Sau đó, thêm event để đọc đối tượng tệp khi quá trình tải lên hoàn tất. Lấy thông tin file được tải lên từ thuộc tính event.target.files.
```js
fileUploader.addEventListener('change', (event) => {
  const files = event.target.files;
  console.log('files', files);
});
```
Bạn có thể xem chi tiết ở [demo](https://codepen.io/ho-ng-ni/pen/oNZRaOE) nhé!
### 2. Tải nhiều file
Khi chúng ta sử dụng cách trên nhưng muốn upload lên nhiều file một lúc thì chỉ cần thêm thuộc tính này trong tag `<input>`
```html
<input type="file" id="file-uploader" multiple />
```
Như vậy, trình duyệt file sẽ cho phép bạn upload lên một hoặc nhiều tệp một lúc. Cũng giống như trường hợp trên thì bạn có thể thêm event thay đổi để nắm bắt thông tin về các file được tải lên. Đối với nhiều tệp tải lên thì FileList được xem là một mảng.

Bạn có thể xem chi tiết ở  [demo](https://codepen.io/ho-ng-ni/pen/ZEeNmEB) nhé!
### 3. File metadata
Khi nào chúng ta upload một file lên trên trình duyệt, file đó sẽ có thông tin siêu dữ liệu như tên file, kích thước, thời gian cập nhật lần cuối, loại, v.v. Thông tin này có thể hữu ích cho việc xác nhận thêm và ra quyết định.
```js
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
Bạn có thể xem chi tiết ở [demo](https://codepen.io/ho-ng-ni/pen/XWMwxvM) nhé!
### 4. File accept property
Chúng ta có thể sử dụng thuộc tính accept để giới hạn loại tệp tải lên. Dùng trong các trường họp như khi bạn chỉ muốn hiển thị một số loại hình ảnh trong quy định khi người dùng tải lên ảnh hồ sơ.
```html
<input type="file" id="file-uploader" accept=".jpg, .png" multiple>
```
Như trong đoạn code trên, trình duyệt file sẽ chỉ cho phép các file có phần mở rộng là jpg và png.

Lưu ý, trong trường hợp này, trình duyệt file tự động đặt loại lựa chọn file là tùy chỉnh thay vì tất cả. Tuy nhiên, bạn luôn có thể thay đổi nó trở lại tất cả các file, nếu cần.

Bạn có thể xem chi tiết ở [demo](https://codepen.io/ho-ng-ni/pen/mdWYQev) nhé!
### 5. Quản lí nội dụng file
Sau khi upload file lên thành công thì bạn muốn hiển thị nội dung file lên, như trong các trường hợp cần hiển thị nội dung, hình ảnh khi tải lên hồ sơ cá nhân chẳng hạn.
Chúng ta có thể sử dụng đối tượng FileReader để chuyển đổi tệp sang chuỗi nhị phân. Sau đó, thêm event xử lý để tải chuỗi nhị phân lên file thành công.
```js
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
Bạn xem chi tiết ở [demo](https://codepen.io/ho-ng-ni/pen/YzZbRwJ) nhé!
### 6. Validate file size
Như các bạn đã thấy, chúng ta có thể đọc được kích thước của một file, chúng ta thực sự có thể sử dụng nó để xác thực kích thước file. Bạn có thể cho phép người dùng tải lên tệp hình ảnh có dung lượng tối đa 1MB.

```js
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
Bạn có thể xem chi tiết ở [demo](https://codepen.io/ho-ng-ni/pen/WNpBYxv) nhé! 
### 7. Xử lý file với objectURLs
Có một phương pháp đặc biệt được gọi là URL.createObjectURL () để tạo một URL duy nhất từ tệp. Bạn cũng có thể sử dụng nó bằng cách sử dụng phương thức URL.revokeObjectURL ().

URL.createObjectURL () và URL.revokeObjectURL () methods cho phép bạn tạo các chuỗi URL đơn giản có thể được sử dụng để tham chiếu bất kỳ dữ liệu nào có thể được tham chiếu đến bằng cách sử dụng đối tượng file DOM, bao gồm các file cục bộ trên máy tính của người dùng.
```js
img.src = URL.createObjectURL(file);
```
Bạn có thể xem chi tiết ở [demo](https://codepen.io/ho-ng-ni/pen/vYxwQxb) nhé!

### Tổng kết

Ở phía trên là một số chia sẻ về việc upload file lên trang web hay ứng dụng của bạn, hy vọng sẽ giúp ích được cho một số bạn. Bài viết được tham khảo [tại đây](https://blog.greenroots.info/10-useful-html-file-upload-tips-for-web-developers-ckgetegpf0c7go9s123wvg7bi).

Cảm ơn mọi người đã dành thời gian đọc bài viết!