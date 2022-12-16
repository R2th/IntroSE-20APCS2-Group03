## 1. Yêu cầu
Yêu cầu bài toán là khi người dùng kéo thả ảnh từ máy tính vào vùng chỉ định thì chúng ta sẽ hiển thị hình ảnh preview để xem trước mà không cần phải upload lên server. Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.

![](https://images.viblo.asia/7695fd39-dc8d-4cee-986b-0b6aafe53814.gif)



## 2. HTML - CSS
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vanilla JS: Preview image when drag and drop</title>
  <!-- bootstrap 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
  <style>
    #dnd {height: 100px;display: flex;align-items: center;justify-content: center;margin: 0 auto 2rem;border: 2px dashed #ccc;}
    .drag-over {border-color: red !important;color: red;}
    .preview-img {max-width: 150px;margin: 0 1em 1em 0;padding: 0.5em;border: 1px solid #ccc; border-radius: 3px;display: inline-block;}
  </style>
</head>
<body>
  <div class="container">
    <h2 class="my-5 text-center">Preview image when drag and drop</h2>
    <div id="dnd">
      <span>Drag and drop file here to preview</span>
    </div>
    <div class="preview"></div>
  </div>
  <script> // code javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính
* Lắng nghe sự thay đổi (dragover hoặc dragleave) của `div#dnd`, ngăn chặn hành vi xử lý mặc định của trình duyệt
* Lắng nghe sự thay đổi (drop file) của `div#dnd`, khi người dùng kéo file và thả vào đó, lấy ra thông tin các file thông qua **DragEvent - dataTransfer**
* Kiểm tra đúng định dạng là ảnh
* Sử dụng **FileReader** để đọc file
* Hiển thị preview image

## 4. Javascript
**Step 1:** Lắng nghe sự thay đổi (dragover hoặc dragleave) của `div#dnd`, ngăn chặn hành vi xử lý mặc định của trình duyệt, khi drag trên vùng chọn thì thêm chút hiệu ứng như border và chữ thành màu đỏ.

```js
const dndElement = document.querySelector('#dnd')

dndElement.addEventListener('dragover', function(e) {
  e.preventDefault()
  this.classList.add('drag-over')
})

dndElement.addEventListener('dragleave', function(e) {
  e.preventDefault()
  this.classList.remove('drag-over')
})
```

**Step 2:** Lắng nghe sự thay đổi (drop file) của `div#dnd`, ngăn chặn hành vi xử lý mặc định của trình duyệt, lấy ra thông tin các file

```js
dndElement.addEventListener('drop', function(e) {
  e.preventDefault()
  const files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    const file = files[i]
    console.log(111, file)
  }
})
```
Ta thu được kết quả log khi thả 2 file ảnh vào
![](https://images.viblo.asia/974fecfb-f96d-4922-ab89-1cd057345d72.png)


Trong đối tượng **File** ta có thể lấy các thông tin cơ bản của file như:
- name: tên file
- size: kích thước file (có thể dùng để giới hạn kích thước).
- type: định dạng file (có thể dùng để validate có đúng là ảnh hay không).


**Step 3:** Tương ứng mỗi file sẽ gọi hàm `renderPreviewImage`, trong hàm này 
kiểm tra phải là định dạng ảnh, nếu không đúng thì thông báo lỗi
```js
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

dndElement.addEventListener('drop', function(e) {
  e.preventDefault()
  const files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    const file = files[i]
    renderPreviewImage(file)
  }
})

function renderPreviewImage(file) {
  const fileType = file['type']

  if (!validImageTypes.includes(fileType)) {
    resultElement.insertAdjacentHTML(
      'beforeend',
      '<span class="preview-img">Chọn ảnh đi :3</span>'
    )
    return
  }
}
```

**Step 4:** Nếu đúng định dạng là ảnh thì tiếp tục sử dụng **FileReader** để đọc file ảnh được chọn ở trên
```js
function renderPreviewImage(file) {
  ...

  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)
}
```

**Step 5:** Sử dụng **FileReader onload** để xử lý khi quá trình đọc file hoàn thành, chèn ảnh vào khu vực hiển thị
```js
function renderPreviewImage(file) {
  ...

  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)

  fileReader.onload = function() {
    const url = fileReader.result
    resultElement.insertAdjacentHTML(
      'beforeend',
      `<img src="${url}" alt="${file.name}" class="preview-img" />`
    )
  }
}
```
Dưới đây là toàn bộ code JS
```js
const dndElement = document.querySelector('#dnd')
const resultElement = document.querySelector('.preview')
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

dndElement.addEventListener('dragover', function(e) {
  e.preventDefault()
  this.classList.add('drag-over')
})

dndElement.addEventListener('dragleave', function(e) {
  e.preventDefault()
  this.classList.remove('drag-over')
})

dndElement.addEventListener('drop', function(e) {
  e.preventDefault()
  this.classList.remove('drag-over')
  const files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    const file = files[i]
    renderPreviewImage(file)
  }
})

function renderPreviewImage(file) {
  const fileType = file['type']

  if (!validImageTypes.includes(fileType)) {
    resultElement.insertAdjacentHTML(
      'beforeend',
      '<span class="preview-img">Chọn ảnh đi :3</span>'
    )
    return
  }

  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)

  fileReader.onload = function() {
    const url = fileReader.result
    resultElement.insertAdjacentHTML(
      'beforeend',
      `<img src="${url}" alt="${file.name}" class="preview-img" />`
    )
  }
}
```

## 5. Kết quả
{@embed: https://jsfiddle.net/trungnt256/tme0L5xo/18/embed/result,html,css,js/dark}


-----


Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://vanilla-js-preview-image-when-drag-and-drop.kentrung.repl.co/)
* [Code online](https://replit.com/@kentrung/Vanilla-JS-Preview-image-when-drag-and-drop)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256