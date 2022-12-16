Chào mọi người.

Trước khi chính thức bước vào bài viết hôm nay, mình muốn cảm ơn các bạn đã luôn theo dõi serries về VueJS của mình. Nhiều bạn tìm các giải pháp trên Google cho những bài toán khó, và bằng một cách tình cờ đã tìm thấy những bài viết của mình, mình cảm thấy rất hạnh phúc khi những bài viết đơn giản của mình đã giúp đỡ được nhiều bạn đến vậy. Nhiều bạn còn recommend mình về nhiều bài toán mới. Song thay vì tìm kiếm 1 chủ đề cụ thể của VueJS, hy vọng các bạn sẽ tìm được lời giải trên (Pure) Javascript và tự mình convert sang VueJS như bài viết hôm nay của mình. :bow: Chúc các bạn 1 năm 2021 đầy sức mạnh và thành công.

Hôm nay, mình lại tiếp tục chia sẻ cho các bạn một số ít hiểu biết của mình về VueJS thông qua phương pháp Preview Image.

## I. FileReader:
Thông thường, để xem ảnh sau khi import, chúng ta sẽ sử dụng `FileReader` ([details](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)). Trong phần định nghĩa ở `MDN`, chúng ta được biết rằng: `FireReader` là 1 đối tượng cho phép Web App của chúng ta `đọc nội dung file không đồng bộ`.

Cú pháp khởi tạo 1 đối tượng FileReader cơ bản:
```js
const theReader = new FileReader();
```

Sau khi tạo 1 `theReader` từ `FileReader`, bạn sẽ được `kế thừa` những thuộc tính và phương thức sau:

### 1. Properties:
1.  `error`:  Trả về 1 object error hiển thị thông tin về lỗi trong quá trình đọc file.
2.  `result`: Nội dung file sau khi được đọc thành công. Tuỳ vào phương pháp đọc file, result sẽ trả về định dạng tương ứng,
3.  `readyState`: thông báo trạng thái của `theReader` với các giá trị :

| Trạng thái | Giá trị tương ứng | Ý nghĩa |
| -------- | -------- | -------- |
| DONE     | 2     | Toàn bộ file đã được đọc thành công     |
| LOADING     | 1     | Dữ liệu đang trong quá trình đọc   |
| EMPTY     | 0     | Chưa có dữ liệu nào được tải lên `theReader`  |

### 2. Methods:
1. `abort()`:  Thực hiện khi huỷ trạng thái đọc, sau `return`, giá trị `readyState` sẽ là `2 (DONE)`.
2. `readAsArrayBuffer()`: Đọc file với định dạng `Blob`, sau khi thành công sẽ trả về định dạng `array-buffer`.
3. `readAsBinaryString()`:  Tương tự như trên nhưng sẽ trả về định dạng dữ liệu `raw binary data from the file as a string`
4. `readAsDataURL()`: Tương tự như trên, sau khi đọc thành công sẽ trả về dạng `data:{url}` đại diện cho file data.
5. `readAsText()`: Tương tự như trên, sau khi đọc thành công sẽ trả về dạng `text string`.

### 3. Event handlers:
1. `onabort`: Khi huỷ bỏ việc tải lên, hàm bên trong sẽ thực hiện.
2. `onerror`: Khi xảy ra lỗi, hàm bên trong sẽ được thực hiện.
3. `onload`: sau khi tải lên thành công file, hàm bên trong sẽ được thực hiện.
4. `onloadstart`: Khi bắt đầu đọc file, hàm bên trong sẽ được thực hiện.
5. `onloadend`: Khi đọc file thành công hoặc thất bại, hàm bên trong sẽ được thực hiện.
6. `onprogress`: Khi đang đọc file, hàm bên trong sẽ được thực hiện.

Để thực hiện 1 hàm tải lên và xem trước ảnh cơ bản, chúng ta sẽ sử dụng `event handler: load`.

## II. Basic code with HTML and (Pure) Javascript:

Để đọc file, ta tạo 1 `input type file` để tải file lên, attribute `onchange` để quản lý khi file được tải lên sẽ gọi hàm `loadFile` để xử lý. Bên trong hàm `loadFile`, chúng ta sẽ gọi `theReader` là 1 đối tượng mới từ `FileReader`. Chúng ta gọi đến event handler `onload` và gán data mới đọc vào `src` của thẻ ảnh `img`. Ngoài ra, chúng ta sử dụng phương thức đọc file `readAsDataURL` để đọc file ảnh với định dạng `base64`, hỗ trợ việc upload lên server. Đoạn code cơ bản như sau:

```html
<!-- HTML -->
<input type="file" accept="image/*" onchange="loadFile(event)">
<img  id="output" />
```

```js
// JS
function loadFile(event) {
  let theReader = new FileReader();
  theReader.onload = function() {
    var output = document.getElementById("output");
    output.src = theReader.result;
  };
  theReader.readAsDataURL(event.target.files[0]);
}
```

Link code demo: [Here!](https://codepen.io/bautd-2046/pen/MWjxypK)

## III. Convert sang VueJS:
Bước này khá đơn giản, mình sẽ không giải thích lại mà gửi các bạn đoạn code sau:

```html
<template>
  <div>
    <input accept="image/*" type="file" @change="previewFiles($event)" />
    <img alt="" :src="newImage || emptyImage" />
  </div>
</template>
```

```js
import emptyImage from "@/assets/upload-image.png";

export default {
  name: "Home",
  data: () => ({
    newImage: "",
    emptyImage
  }),
  methods: {
    previewFiles(event) {
      const file = event.target.files[0];

      const theReader = new FileReader();
      // Nhớ sử dụng async/await để chờ khi đã convert thành công image sang base64 thì mới bắt đầu gán cho biến newImage
      // đây là 1 kinh nghiệm của mình khi upload multiple ảnh
      theReader.onloadend = async () => {
        this.newImage = await theReader.result;
      };
      theReader.readAsDataURL(file);
    }
  }
};
```

Link code demo: [Here](https://codepen.io/bautd-2046/pen/gOwEwoX)

Cảm ơn các bạn đã xem bài viết của mình. Chúc các bạn có thật nhiều niềm vui với VueJS :stuck_out_tongue_winking_eye::laughing:.