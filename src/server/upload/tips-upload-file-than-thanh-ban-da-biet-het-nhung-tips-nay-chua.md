Xin chào các bạn,

Hiện nay, trên các trang mạng xã hội cũng như trong quá trình làm việc, việc bạn phải upload một file hay nhiều file bằng nhiều hình thức khác nhau lên website là một việc rất thường xuyên phải sử dụng. Vậy, bạn có từng tò mò muốn biết cách để có thể upload file bằng cách sử dụng javaScript hay không? Trong bài viết này, mình xin giới thiệu một số tip upload file đơn giản nhưng vô cùng hữu ích dành cho frontend-developer.  Chúng ta cùng bắt đầu ngay thôi nào :muscle::muscle:

## 1. Upload file sơ cấp
Tại sao  mình gọi là "sơ cấp" bởi vì ngay bản thân nó được coi là cái base, sơ khai cho các tips phía dưới, không có điều kiện phức tạp.

- Để upload được file, chúng ta cần có điều kiện tiên quyết, là thẻ input có ***type= "file".***
```html
<input type="file" id="file-uploader">
```
Bằng cách sử dụng loại type này, giao diện người dùng sẽ xuất hiện button cho phép upload 1 hay nhiều file. Nhưng theo mặc định, nó chỉ cho phép chúng ta upload 1 file duy nhất.

- Đầu tiên, chúng ta khai báo biến `fileUploader` gán với phần tử có id là `file-uploader`
```js
const fileUploader = document.getElementById('file-uploader');
```
Sau đó, thêm sự kiện `change`để đọc file khi file được upload thành công. Tiếp đó, chúng ta sẽ lấy được thông tin của file đã tải lên bằng property `event.target.files`

```js
fileUploader.addEventListener('change', (event) => {
  const files = event.target.files;
  console.log('files', files);
});
```

Thử ngó qua demo dưới đây bạn nhé:
{@embed: https://jsfiddle.net/netnguyen270/yjf0283s/2/}

## 2. Multiple file uploads
Để upload multiple file, ta thêm thuộc tính multiple vào file input.
```html
<input type="file" id="file-uploader" multiple />
```
Cũng giống như ví dụ trước, chúng ta đề cập đến việc upload 1 file đơn, thì sang upload nhiều file, nó hầu như không khác gì cả. Vẫn sử dụng code trên, chúng ta thử `console.log('files', files)` bạn có nhận thấy, `FileList` là một obj không? Bạn hiểu ý mình rồi chứ:

 ![](https://images.viblo.asia/be28fa4e-8d24-4b80-83e1-71cd4addaa62.png)

Ngó qua demo nhé:

{@embed: https://jsfiddle.net/netnguyen270/cuqy15mh/2/}

## 3. Bạn có biết accept property?
Có khi nào bạn đặt câu hỏi, có cách nào để giới hạn loại file mà mình muốn tải lên hay không? Ví dụ như bạn có thể chỉ muốn hiển thị các loại hình ảnh được phép duyệt khi người dùng tải lên ảnh hồ sơ chẳng hạn.

Thì khi đó, chúng ta có một cách vô cùng đơn giản đó là sử dụng thuộc tính accept. 

```html
<input type="file" id="file-uploader" accept=".jpg, .png" multiple>
```

Trong code trên, trình duyệt sẽ chỉ cho phép các file có phần mở rộng là jpg và png thì mới có thể upload file lên được.
Khá đơn giản phải không nào, chúng ta cùng xem demo luôn nhé:

{@embed: https://jsfiddle.net/netnguyen270/tfm97p58/1/}

## 4. Quản lý nội dung file
Có phải nhiều khi bạn rất muốn hiển thị nội dung của file có những gì sau khi upload file thành công không? Đối với ảnh hồ sơ, sẽ rất khó hiểu nếu chúng tôi không hiển thị ảnh đã tải lên cho người dùng ngay sau khi tải lên.

Đến đây, chũng ta  có thể sử dụng obj `FileReader`để chuyển đổi file sang chuỗi nhị phân. Sau đó, thêm event `load`  để tải chuỗi nhị phân lên file thành công.

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

Hãy thử chọn một file ảnh trong demo bên dưới và xem nó hiển thị như nào bạn nhé:

{@embed: https://jsfiddle.net/netnguyen270/subLj0gh/1/}

## 5. Validate file size
Như các bạn đã thấy, việc đọc dữ liệu kích thước của một file là điều dễ dàng thực hiện, chúng ta thực sự có thể sử dụng nó để xác nhận kích thước file. Bạn có thể cho phép người dùng tải lên tệp hình ảnh có dung lượng tối đa 1MB. Hãy xem chúng ta làm thế nào để thực hiện được điều đó nhé.

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

Cụ thể hơn, chúng ta coi demo nhé. Hãy thử tải lên một file có kích thước khác nhau để xem cách nó hoạt động nhé:

{@embed: https://jsfiddle.net/netnguyen270/wxyg5t1o/1/}

## 6. Hiển thị tiến trình upload file
Khi bạn muốn tăng trải nghiệm người dùng bằng cách cho phép người dùng có thể dễ dàng nhìn thấy tốc độ tiến trình upload file của họ.

FileReader có một sự kiện khác được gọi là `progress` để biết số lượng đã được tải là bao nhiêu, đồng thời chúng ta có thể sử dụng thẻ `progress` của HTML5 để tạo thanh tiến trình.

```js
reader.addEventListener('progress', (event) => {
  if (event.loaded && event.total) {
    // Calculate the percentage completed
    const percent = (event.loaded / event.total) * 100;
    // Set the value to the progress component
    progress.value = percent;
  }
});
```

Bạn hãy thử tải lên một file có dung lượng lớn và thấy thanh tiến trình hoạt động như nào ở demo bên dưới nhé.

{@embed: https://jsfiddle.net/netnguyen270/z57akqw9/1/}

## 7. Kéo, thả và tải
Hiện nay, việc những trang web không hỗ trợ việc kéo, thả để upload file đã trở thành lỗi thời. Bằng những lợi ích nhanh, tiện của việc kéo thả mà việc sử dụng chúng thành ra rẩt cần thiết. Chúng ta cùng xem làm thế nào để tạo ra điều đó với một vài bước đơn giản dưới đây nhé.

Đầu tiên, hãy tạo vùng thả và tùy chọn một phần để hiển thị nội dung file đã tải lên. Chúng ta sẽ sử dụng một file ảnh để kéo và thả vào đây.

```js
 <div class="vb-content">
    <h1>Drag & Drop an Image</h1>
    <div id="drop-zone">
        DROP HERE
    </div>
    <div id="content">
      Your image to appear here..
    </div>
 </div>
```

Get dropzone và content theo id tương ứng của chúng.
```js
 const dropZone = document.getElementById('drop-zone');
 const content = document.getElementById('content');
```

Sau đó thêm sự kiện dragover
```js
dropZone.addEventListener('dragover', event => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
});
```
Tiếp theo, xác định những gì chúng ta muốn làm khi hình ảnh bị xóa. Chúng ta sẽ cần một trình nghe sự kiện `drop` để xử lý điều đó.
```js
dropZone.addEventListener('drop', event => {
  // Get the files
  const files = event.dataTransfer.files;

// Now we can do everything possible to show the
// file content in an HTML element like, DIV
});
```

Và bây giờ thì hãy thử kéo và thả tệp hình ảnh trong demo bên dưới và xem nó hoạt động như thế nào bạn nhé:
{@embed: https://jsfiddle.net/sgdncutq/2/}

## Kết Luận

Thế là đến kết bài rồi, trên đây là một số tips khá hay mà mình có lượm nhặt được về vấn đề upload file "thần thánh". Mong rằng bài viết của mình phần nào đó có thể giúp ích được cho các bạn trong quá trình làm việc. Như thường lệ, hãy cho mình 1 upvote để có thêm động lực ra những bài tiếp theo nhé ! 😆 

Xin cảm ơn !