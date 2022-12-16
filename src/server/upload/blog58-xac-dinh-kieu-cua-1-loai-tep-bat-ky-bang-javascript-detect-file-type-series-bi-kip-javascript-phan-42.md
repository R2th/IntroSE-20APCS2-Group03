![image.png](https://images.viblo.asia/94ba8848-3bd1-4b84-b52f-18bada2c9a13.png)

Mình là TUẤN hiện đang là một Full-stack Web Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Trong công việc hàng ngày, load lên tệp là một chức năng rất phổ biến. Trong một số trường hợp, chúng ta muốn có thể hạn chế loại tệp load lên, chẳng hạn như hạn chế load lên hình ảnh ở định dạng PNG. Đối với vấn đề này, chúng ta sẽ nghĩ đến việc giới hạn các loại tệp được load lên thông qua việc `accept` vào Properties của phần tử `input`:

```html
<input type="file" id="inputFile" accept="image/png" />
```

Mặc dù giải pháp này có thể đáp ứng hầu hết các trường hợp, nhưng nếu user thay đổi hậu tố (suffix) của hình ảnh định dạng `.jpeg` thành `.png`, giúp file đó có thể vượt qua chức năng giới hạn đơn giản ở trên. Vậy nên giải quyết vấn đề này như thế nào? **Chúng ta có thể xác định loại tệp chính xác bằng cách đọc binary data của tệp.** Trước khi giới thiệu sơ đồ implement thực tế, hãy giới thiệu một số kiến ​​thức liên quan.

Sẽ có bạn bảo ngay là: cái này có cả đống thư viện support rồi mà chỉ cần dùng là được. Ok cái hoàn toàn đúng và chúng ta cũng hoàn toàn không cần viết lại nó. Tuy nhiên, những bài viết của mình về những vấn đề tương tự như thế này nhằm giải thích cách nó hoạt động. Dùng cái thứ mình hiểu nó vẫn sướng hơn đúng ko ae.

OK GÉT GÔ!!

Làm cách nào để xem binary data của một bức ảnh?
========================================

Để xem binary data tương ứng với một hình ảnh, bạn có thể sử dụng một số Editors, chẳng hạn như **WinHex** trên nền tảng Windows hoặc **Synalyze It!** Editors hex **chuyên nghiệp trên nền tảng macOS.** Tuy nhiên, ở đây mình sử dụng **Binary Viewer extension** trong Editors Visual Studio Code để xem binary data tương ứng với avatar dưới đây.

![image.png](https://images.viblo.asia/818406ae-7777-4589-bde5-92603ff24b19.png)

Làm thế nào để phân biệt các loại hình ảnh?
========================================

Máy tính không phân biệt các loại hình ảnh khác nhau bằng tên hậu tố của hình ảnh, mà bằng “Magic Number”. Đối với một số loại tệp, nội dung của một vài byte đầu tiên được cố định và loại tệp có thể được đánh giá theo nội dung của các byte này.

Các Magic Number tương ứng với các loại hình ảnh phổ biến được hiển thị trong hình sau:

![image.png](https://images.viblo.asia/071b6536-2580-405f-bbdd-33b280edbf06.png)

Tiếp theo, hãy sử dụng **Binary Viewer extension** để xác minh loại hình ảnh đại diện của mình có đúng không?

![image.png](https://images.viblo.asia/56fcd7c2-ce43-4b7d-8c59-1374c08a6b41.png)

Như có thể thấy từ hình trên, 8 byte đầu tiên của hình ảnh loại PNG là **0x89 50 4E 47 0D 0A 1A 0A**. Khi bạn thay đổi tệp `bytefer-avatar.png` thành `bytefer-avatar.jpeg`, và mở tệp bằng Editors để xem nội dung nhị phân của hình ảnh, bạn sẽ thấy rằng 8 byte đầu tiên của tệp không thay đổi. Nhưng nếu bạn sử dụng phần tử `input[type=”file”]` để đọc thông tin tệp, kết quả sau đây sẽ được xuất ra:

```javascript
File
  lastModified: 1658647747405
  lastModifiedDate: Sun Jul 24 2022 15:29:07 
  name: "bytefer-avatar.jpeg"
  size: 47318
  type: "image/jpeg"
  webkitRelativePath: ""
  [[Prototype]]: File
```

Loại tệp chính xác không được phần mở rộng tệp hoặc loại MIME của tệp nhận dạng. Tiếp theo, cùng xem cách đảm bảo loại hình ảnh chính xác bằng cách đọc thông tin nhị phân của hình ảnh khi load hình ảnh lên.

Làm cách nào để xác định loại hình ảnh?
========================================

1\. tạo hàm readBuffer
---------------------------

Sau khi nhận được đối tượng tệp, chúng ta có thể đọc nội dung của tệp thông qua API FileReader. Bởi vì chúng ta không cần đọc toàn bộ thông tin của tệp, nên chúng ta tạo một hàm `readBuffer` để đọc phạm vi binary data được chỉ định trong tệp. Chỉ đọc từ byte vị trí `start` tới `end`:

```javascript
function readBuffer(file, start = 0, end = 2) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file.slice(start, end));
  });
}
```

Đối với hình ảnh loại PNG, 8 byte đầu tiên của tệp là **0x89 50 4E 47 0D 0A 1A 0A**. Do đó, khi chúng ta kiểm tra xem tệp đã chọn có phải là hình ảnh loại PNG hay không, chúng ta chỉ cần đọc 8 byte dữ liệu đầu tiên và xác định xem nội dung của từng byte có nhất quán hay không.

2\. Tạo chức hàm check
-------------------------------

Để so sánh từng byte và tái sử dụng code tốt hơn. Hãy tiếp tục và tạo một hàm có tên là `check`:

```javascript
function check(headers) {
  return (buffers, options = { offset: 0 }) =>
    headers.every(
      (header, index) => header === buffers[options.offset + index]
    );
}
```

3\. Xác định loại hình ảnh có phải là PNG
-------------------------------

Dựa vào hàm **readBuffer** và **check** đã được định nghĩa trước đó, chúng ta có thể thực hiện xác định loại hình ảnh có phải là PNG:

**Code HTML**

```html
<div>
   Choose File：<input type="file" id="inputFile" accept="image/*"
     onchange="handleChange(event)" />
   <p id="realFileType"></p>
</div>
```

**Code JavaScript**

```javascript
const isPNG = check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]); 
const realFileElement = document.querySelector("#realFileType");
async function handleChange(event) {
  const file = event.target.files[0];
  const buffers = await readBuffer(file, 0, 8);
  const uint8Array = new Uint8Array(buffers);
  realFileElement.innerText = `The type of ${file.name} is：${
    isPNG(uint8Array) ? "image/png" : file.type
  }`;
}
```

Sau khi ví dụ trên được chạy thành công, kết quả xác định tương ứng được hiển thị trong hình sau:

![image.png](https://images.viblo.asia/3d42ea06-1fbd-4dc0-bd97-96707a65eb8c.png)

Code hoàn chỉnh như sau:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>File Type Detect Demo</title>
    </head>
    <body>
        <div>
            <input type="file" id="inputFile" accept="image/*" onchange="handleChange(event)"/>
            <p id="realFileType"></p>
        </div>
        <script>
            function check(headers) {
                return (buffers,options={
                    offset: 0
                })=>headers.every((header,index)=>header === buffers[options.offset + index]);
            }

            function readBuffer(file, start=0, end=2) {
                return new Promise((resolve,reject)=>{
                    const reader = new FileReader();
                    reader.onload = ()=>{
                        resolve(reader.result);
                    }
                    ;
                    reader.onerror = reject;
                    reader.readAsArrayBuffer(file.slice(start, end));
                }
                );
            }

            const isPNG = check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
            const realFileElement = document.querySelector("#realFileType");

            async function handleChange(event) {
                const file = event.target.files[0];
                const buffers = await readBuffer(file, 0, 8);
                const uint8Array = new Uint8Array(buffers);
                realFileElement.innerText = `The type of ${file.name} is：${isPNG(uint8Array) ? "image/png" : file.type}`;
            }
        </script>
    </body>
</html>
```

Nếu bạn muốn xác định định dạng tệp JPEG, bạn cần định nghĩa hàm isJPEG.

```javascript
const isJPEG = check([0xff, 0xd8, 0xff]);
```

Tuy nhiên, nếu bạn muốn xác định các loại tệp khác, chẳng hạn như tệp PDF thì sao? Ở đây, trước tiên chúng ta sử dụng **Binary Viewer extension** để xem nội dung nhị phân của tệp PDF:

![image.png](https://images.viblo.asia/ced0222b-26e8-4c37-b666-a386c08d3e85.png)

Như có thể thấy từ hình trên, 4 byte đầu tiên của tệp PDF là **0x25 50 44 46** và chuỗi tương ứng là **%PDF**. Để cho phép user xác định loại một cách trực quan hơn, chúng ta có thể định nghĩa hàm `stringToBytes`:

```javascript
function stringToBytes(string) {
  return [...string].map((character) => character.charCodeAt(0));
}
```

Dựa vào hàm `stringToBytes`, chúng ta có thể dễ dàng định nghĩa một hàm `isPDF` như sau:

```javascript
const isPDF = check(stringToBytes("%PDF"));
```

Sử dụng hàm `isPDF`, bạn có thể thực hiện chức năng xác định tệp PDF. **Nhưng trong công việc thực tế, có rất nhiều loại tệp khác nhau.** Đối với tình huống này, bạn có thể sử dụng thư viện thứ ba tuyệt vời để thực hiện chức năng xác định loại tệp, chẳng hạn như thư viện [file-type](https://github.com/sindresorhus/file-type#readme) .

Ok, đó là cách xác định các loại tệp bằng JavaScript. Trong công việc thực tế, đối với các tình huống load tệp lên, vì lý do bảo mật, bạn nên giới hạn các loại tệp load lên trong quá trình phát triển. Đối với các trường hợp nghiêm ngặt hơn, bạn có thể cân nhắc sử dụng hàm được mô tả trong bài viết này để xác minh loại tệp.

Roundup
========================================
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
========================================
* https://tuan200tokyo.blogspot.com/2022/12/blog58-xac-inh-kieu-cua-1-loai-tep-bat.html