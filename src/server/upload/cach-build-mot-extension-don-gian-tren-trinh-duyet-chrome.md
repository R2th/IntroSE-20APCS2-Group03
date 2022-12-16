# 1. Lời mở đầu

Hello mọi người, mình vừa mới làm 1 việc rất là thú vị, đó là thử viết 1 extension đơn giản trên chrome.
Mình nghĩ là ai trong số chúng ta cũng từng nghe qua ít nhất 1, 2 lần về khái niệm **Extension** rồi đúng không nào. Tới đây, mình xin phép nhắc lại 1 chút, "extension" dich từ google translate nó là "phần mở rộng ", 
nghĩa là phần chúng ta có thể thêm vào từ bên ngoài,  nó chính xác là một loạt các tiện ích (trang web) dùng để tương tác với website thông qua api của trình duyệt, tất nhiên nó được lưu tại ngay trong trình duyệt.
Điều tuyệt vời hơn là chúng ta có thể tự build 1 extension  từ HTML, CSS, JavaScript và chạy nó luôn trên máy tính của mình.
Do là newbie nên bài viết sẽ còn nhiều sai sót, mn có thể góp ý dưới phần comment giúp mình. Chúng ta cùng bắt đầu nhé !

# 2. Coding...
Trong bài này mình sẽ tạo 1 extension để lấy ảnh từ [pexels](https://www.pexels.com/).
Đầu tiên các bạn tạo giúp mình 1 folder ( tên là gì cũng được), animal chẳng hạn nếu bạn "yêu" động vật:smiley_cat:.

![](https://images.viblo.asia/86452c56-93c0-4ab9-ad1b-34a41711f98c.png)

Nhìn vào cấu trúc thư mục thì các bạn sẽ thấy 1 file là manifest.json. đây là file bắt buộc phải có. Dưới đây là nội dung file

```js
{
    "name": "free images",
    "description": "free repo images",
    "version": "1.0",
    "manifest_version": 2,
    "author": "vodanh <vodanh@gmail.com>",
    "permissions": [
      "https://api.pexels.com/v1/"
    ],
    "browser_action": {
      "default_icon": "images/leaf.png",
      "default_popup": "index.html"
    }
  }
```

Cùng phân tích 1 chút :
- name: Tên của extension.
- description: Mô tả cho extension.
- version: Phiên bản của extenssion.
- manifest_version: là version chrome extension bạn sử dụng ( version mới là 2, cũ là 1).
- author : Thông tin tác giả
- permissions:  Khai báo các url website mà muốn nó chạy và các quyền.
- browser_action: Dùng để tùy chỉnh icon, popup, ...
'default_icon' dùng để link đến logo của extension của bạn, lưu ý là file logo phải có định dạng .png thì mới hiển thị được ( bắt buộc nếu là unpacked, nếu upload lên store thì ko cần) 
'default_popup' sẽ xác định file js mặc định sẽ chạy vào khi bạn bật extension lên
Các bạn xem đầy đủ cấu trúc tại [Manifest](https://developer.chrome.com/docs/extensions/mv3/manifest/)

Tiếp theo là file index.html 

```html
<html>
  <head>
	  <title>Animal</title>
	  <meta charset="UTF-8" />
    <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
    <div class="container-fluid">
        <div class="row">
          <div class="col-md-8">
            <input id="key"/>
          </div>
          <div class="col-md-12">
            <div id="result"></div>
          </div>
        </div>
      </div>
      <script src="js/popup.js"></script>
  </body>
</html>
```

Thẻ input dùng để nhập keyword tìm kiếm
Thẻ div có id = 'result' dùng để hiển thị kết quả tìm kiếm
File popup.js để lấy dữ liệu và xử lí dữ liệu lấy được từ api.

 Tiếp theo các bạn làm theo các bước này 
Vào cài đặt cho extension :

![](https://images.viblo.asia/9513ab7b-270d-42a6-9f11-af0b6d7315db.png)
Sau đó click vào Load unpacked và chọn folder animal vừa tạo ở trên

![](https://images.viblo.asia/fd472617-8906-45af-b42c-80cadee13804.png)
Nhớ bật Developer mode nhé

![](https://images.viblo.asia/3a754d57-2238-401c-b595-99f602fdf850.png)

Sau đó gim nó lên trên trình duyệt và chúng ta sẽ có 1 giao diện với icon tương ứng trong 'default_icon':
![](https://images.viblo.asia/9a23526f-63fe-4442-a40e-c448606066e4.png)

Ok, nếu đã làm tới đây thì bạn đã bước được 1 nửa đường rồi, tiếp đến mình sẽ tiến hành xử lí gọi api để lấy dữ liệu. Các bạn vào trang [pexels](https://www.pexels.com/) , đăng kí một tài khoản, các bạn có thể lấy  images hoăc videos tùy thích nhưng trước tiên cần request 1 aip key theo các bước sau, ( các bạn nên dành chút thời gian đọc document để hiểu rõ hơn cấu trúc response trả về ) :

 Đầu tiên các bạn trỏ vào avatar ở góc trên bên trái, 1 list các option hiển thị ra, bạn cần click vào mục **Image & Video API** 
 
 ![](https://images.viblo.asia/1ed99206-a0a1-477f-ac2e-303772e676bd.png)

Tiếp tục click vào **Get started**

![](https://images.viblo.asia/a5dbfd18-93ee-4351-8d46-fcb85597c8d0.png)

Copy api key và lưu vào đâu đó.

Sau khi có được key api rồi thì ta sẽ viết code cho file popup.js ( ở đây mình sẽ chọn images thay vì videos để load cho nhanh)

```js

document.getElementById("key").focus(); // focus vào ô input khi mở extension lên

function showPhotos(photos) { // hàm hiển thị ảnh ra màn hình
    document.getElementById("result").innerHTML = '';
    photos.map(photo => {
        const item =
          `<div class="card">
                <a href=${photo.url} target="_blank">
                  <img src=${photo.src.tiny} /> // mình lấy kiểu tiny để  tốc độ load được ổn định 
                </a>
            </div>`;
        document.getElementById("result").innerHTML += item;
    });
}

async function getPhotoUrlByName(keyword) { // thực hiện call api và trả về dữ liệu kiểu json, sau đó gọi hàm showPhotos()
  await fetch("https://api.pexels.com/v1/search?query=" + keyword, {
    headers: {
      Authorization: "YOUR_KEY_API" // lấy key api bạn lưu lại ở bước trên rồi paste lại vào đây
    }
  })
  .then(resp => {
    return resp.json() //trả về dữ liệu kiểu json
  })
  .then(data => {
      showPhotos(data.photos); // gọi hàm showPhotos()
  });
}

document.getElementById('key').addEventListener('input', async () => { // hàm sẽ lắng nghe thay đổi liên tục từ ô input với event 'input'
  let keyword = document.getElementById('key').value; // lấy giá trị từ thẻ input
  await getPhotoUrlByName(keyword); // thực hiện gọi hàm getPhotoUrlByName() với keyword vừa nhập
});
```


Code như vậy là xong, bây giờ quay lại extension setting và reload lại extension là bạn có thể sử dụng rồi đó, lưu ý là pexels.com chỉ cho tối đa 200 request mỗi giờ nên các bạn dùng tiết kiệm nhé ( vì bạn dùng free mà ). Ngoài ra các bạn cũng có thể vào trang [giphy](https://giphy.com/) để lấy đăng kí và lấy api nữa. Chúc các bạn thành công ^^.