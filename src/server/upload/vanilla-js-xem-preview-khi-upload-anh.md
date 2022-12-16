## 1. Yêu cầu
Yêu cầu bài toán là khi người dùng chọn ảnh từ máy tính thì chúng ta sẽ hiển thị hình ảnh preview để xem trước mà không cần phải upload lên server. Đây là một trong những [bài tập vanilla Javascript](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox) ở mức cơ bản giúp các bạn làm quen, chủ yếu giải thích về Javascript nên phần giao diện sẽ không phân tích nhiều. Hi vọng với bài tập này các bạn sẽ thấy thích thú khi học Javascript.

![](https://images.viblo.asia/890977fa-2b53-4f95-b871-128d128cbf6e.gif)


## 2. HTML - CSS
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vanilla JS: Preview image file upload</title>
  <!-- bootstrap css 4.5.0 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
  <style>
    .preview-img {max-width: 150px;margin: 0 1em 1em 0;padding: 0.5em;border: 1px solid #ccc; border-radius: 3px;}
  </style>
</head>
<body>
  <div class="container">
    <h1 class="my-5 text-center">Preview image file upload</h1>
    <input type="file" class="form-control mb-4" />
    <div class="preview"></div>
  </div>
<script> // code javascript </script>
</body>
</html>
```

## 3. Hướng giải quyết chính
* Lắng nghe sự thay đổi (change) của input file
* Lấy ra các file vừa chọn thông qua **FileList**
* Kiểm tra đúng định dạng là ảnh
* Sử dụng **FileReader** để đọc file
* Hiển thị preview image

## 4. Javascript
**Step 1:** Lắng nghe sự thay đổi của input file

```js
const ipnFileElement = document.querySelector('input')

ipnFileElement.addEventListener('change', function(e) {
  // code here
})
```
**Step 2:** Lấy ra file vừa được chọn

```js
ipnFileElement.addEventListener('change', function(e) {
  // step 2
  const files = e.target.files
  console.log(111, files)
  console.log(222, files[0])
})
```
Ta thu được kết quả log như sau
![](https://images.viblo.asia/77a9370b-b488-409f-9679-43b4751e97fa.png)


Nếu muốn chọn được nhiều file thì html ta thêm multiple
```html
<input type="file" multiple />
```
Ta thu được kết quả log khi chọn 3 file như sau
![](https://images.viblo.asia/73101be2-e2d0-4cb1-900d-ec6f6449ce44.png)


Trong đối tượng **File** ta có thể lấy các thông tin cơ bản của file như:
- name: tên file
- size: kích thước file (có thể dùng để giới hạn kích thước).
- type: định dạng file (có thể dùng để validate có đúng là ảnh hay không).


**Step 3:** Kiểm tra phải là định dạng ảnh, nếu không đúng thì thông báo lỗi
```js
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

ipnFileElement.addEventListener('change', function(e) {
  const files = e.target.files
  const file = files[0]
  const fileType = file['type']
  
  if (!validImageTypes.includes(fileType)) {
    resultElement.insertAdjacentHTML(
      'beforeend',
      '<span class="preview-img">Chọn ảnh đi :3</span>'
    )
    return
  }
})
```

**Step 4:** Nếu đúng định dạng là ảnh thì tiếp tục sử dụng **FileReader** để đọc file ảnh được chọn ở trên
```js
ipnFileElement.addEventListener('change', function(e) {
  const files = e.target.files
  const file = files[0]
  ...
  
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)
})
```

**Step 5:** Sử dụng **FileReader onload** để xử lý khi quá trình đọc file hoàn thành, chèn ảnh vào khu vực hiển thị
```js
ipnFileElement.addEventListener('change', function(e) {
  ...
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)
  
  fileReader.onload = function() {
    const url = fileReader.result
    // Something like: data:image/png;base64,iVBORw...Ym57Ad6m6uHj96js
    const htmlString = `<img src="${url}" alt="${file.name}" class="img-thumbnail preview-img" />`
    resultElement.insertAdjacentHTML('beforeend', htmlString)
  }
})
```
Dưới đây là toàn bộ code JS
```js
const ipnFileElement = document.querySelector('input')
const resultElement = document.querySelector('.preview')
const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']

ipnFileElement.addEventListener('change', function(e) {
  const files = e.target.files
  const file = files[0]
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
})
```

## 5. Kết quả
{@embed: https://jsfiddle.net/trungnt256/uat5v9r4/7/embed/result,html,css,js/dark}


-----


Bài viết đến đây là hết, hi vọng với bài viết này các bạn đã thêm được nhiều kiến thức bổ ích. Hẹn gặp lại các bạn ở bài viết tiếp theo!

* [Demo online](https://vanilla-js-preview-image-file-upload.kentrung.repl.co/)
* [Code online](https://replit.com/@kentrung/Vanilla-JS-Preview-image-file-upload)
* [Series vanilla javascript projects](https://viblo.asia/s/vanilla-javascript-projects-P0lPmryg5ox)
* Liên hệ: trungnt256