![](https://images.viblo.asia/c922c907-0c5b-47d1-9526-9a69232cd1ee.png)

<div align="center">
Nếu anh em chưa có gấu, thì cứ mạnh mẽ phấn đấu tỏ tình,

còn nếu tình bể bình rồi thì hãy thả thính cho nàng yêu không lối thoát
</div>

<br>

Hello, lại là mình, [HaiHaChan](https://viblo.asia/u/HaiHaChan) với những bí kíp tỏ tình "chỉ có dev mới hiểu" đây. Sau một thời gian miên man với công việc, mình đã quay trở lại. Và lần này sẽ là một ứng dụng đơn giản mà cực hữu ích cho anh em nhé. Một extension random những câu tỏ tình cực ngầu, cực chất, đảm bảo hay không phải nghĩ nha :)

Chắc anh em không xa lạ gì với extension, nhưng mình vẫn nói qua một chút nhé. **Extension** là các ứng dụng nhỏ, cho phép người dùng điều chỉnh chức năng và hành vi của browser theo nhu cầu hoặc sở thích cá nhân. Chúng được xây dựng trên các công nghệ web như HTML, JavaScript và CSS. Và hôm nay chúng ta sẽ dựng thử một extension đơn giản để nghịch ngợm nha.

>> Lưu ý: Bài viết chỉ mang tính nghịch ngợm và giải trí. Chống chỉ định với những thành phần nghiêm túc.

### 1. Config extension
Đầu tiên, chúng ta sẽ tạo 1 file `mainfest.json` để config ứng dụng.

```json:manifest.json
{
  "name": "M4U",
  "version": "1.0",
  "manifest_version": 2,
  "description": "Build a extension!",
  "permissions": ["activeTab", "declarativeContent", "storage"],
  "icons": {
    "16": "images/4u16.png",
    "32": "images/4u32.png",
    "128": "images/4u128.png"
  },
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "images/4u16.png",
      "32": "images/4u32.png",
      "128": "images/4u128.png"
    },
    "default_title": "M4U"
  }
}
```

Lưu ý, file manifest bắt buộc phải khai báo 3 thành phần:
- name: tên extension.
- version: phiên bản hiện tại của ứng dụng. Chrome sẽ dựa vào trường này để xác định xem extension của bạn có bản cập nhật mới hay không.
- manifest_version: phiên bản của file manifest.

Ngoài ra còn một số trường khác bạn nên quan tâm như:
- description: Mô tả ứng dụng.
- icons: Danh sách icons để hiển thị extension trên store.
- browser_action:
    - default_popup: File giao diện mặc định của extention
    - default_icon: Danh sách icons để hiển thị extension trên trình duyệt.
    - default_title: Title hiển thị khi hover chuột vào biểu tượng của extension trên trình duyệt.

Bạn có thể tìm hiểu chi tiết hơn tại: https://developer.chrome.com/extensions/manifest

**Mẹo nhỏ cho bạn**: Icon mình sử dụng được tải trên trang [Flaticon](https://www.flaticon.com/home). Trang này có rất nhiều icon đẹp và dễ thương, bạn hãy thử truy cập và tham khảo nhé :)

Sau khi config file mainfest, bạn hãy:

1. Truy cập trang quản lý extension [Extension Management](chrome://extensions/) tại [chrome://extensions/]()
>> Cách khác là bạn click vào **Chorme Menu** -> chọn **More Tools** -> chọn **Extensions**
2. Bật Chế độ `developer` bằng cách nhấp vào nút bật tắt **Developer mode**
3. Click **LOAD UNPACKED** và lựa chọn thư mục chứa extension của bạn.

Vậy là bạn đã cài xong extension cho browser của mình ở chế độ "developer".

![](https://images.viblo.asia/378269c8-7f05-4681-9383-3c02149f890b.png)


### 2. Dựng giao diện thôi nào

Như config ở trên, giao diện của extension là file `popup.html` nên giờ mình sẽ dựng một trang `popup.html`.

Giao diện mình mong muốn sẽ bao gồm:
- header: title của extension
- body: thông điệp và một nút để random ra thông điệp ngẫu nhiên

<br>

```html:popup.html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>M4U</title>
  <meta name="description" content="">
  <link rel="stylesheet" href="popup.css">
</head>

<body>
  <div class="app">
    <div class="main">
      <div class="title-container">
        <img src="./images/4u128.png" />
        <span class="heading">Message For You Today</span>
      </div>
      <div id="message"></div>
      <button class="btn" id="changeMessage">Random</button>
    </div>
  </div>
  <script src="popup.js"></script>
</body>

</html>
```

Thêm chút css cho giao diện thêm "sang chảnh" ha

```css:popup.css
body {
  margin: 0;
}

.app {
  width: 350px;
  min-height: 400px;
  font-size: 24px;
  background: linear-gradient(to right, #83a4d4, #b6fbff);
  font-family: 'Lato', sans-serif;
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  height: 100%;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
}

#message {
  width: 80%;
  margin: 0 auto 0;
  margin-bottom: 20px;
  min-height: 100px;
  font-size: 1rem;
}

.heading {
  color: #ffffff;
  font-size: 1em;
  font-weight: 300;
  line-height: 2em;
}

.sub-heading {
  color: #F5F5F5;
  font-size: 0.75em;
  max-width: 50%;
  text-align: justify;
}

.btn {
  background: none;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  padding: 8px 24px;
  margin-bottom: 20px;
}

.btn:hover {
  color: #EEEEEE;
  border-color: #EEEEEE
}

.btn:focus {
  outline: none;
}
```

**Mẹo nhỏ cho bạn**: Background mình dùng là màu gradient DigitalWater của [uiGradient](https://uigradients.com)

### 3. Thêm tính năng nữa nhé

Hiện tại giao diện cơ bản đã xong, tớ sẽ thêm js để random thông điệp mỗi khi mở extension nhé.

```popup.js
// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let btn = document.getElementById('changeMessage');

const messages = [
  "Thích em, anh có thể bỏ đi tôn nghiêm, bỏ đi tính nóng, bỏ đi cá tính,... Chuyện duy nhất anh không thể bỏ xuống được là việc thích em.",
  "Đừng bao giờ nói với anh lời tạm biệt. Trong thế giới của anh và em, ngay cả việc nói với em: \n'Gặp sau nhé!', \n'Hẹn mai gặp!', \n' Cuối tuần gặp!',...\n Chỉ có vậy thôi anh đã không nỡ.",
  "Tình yêu của anh giống như một hạt mầm vậy, chỉ có gặp em mới nở thành những bông hoa đẹp nhất",
  "Chuyện đáng tiếc nhất trên đời này chính là để gặp được em, anh đã dùng hết tất cả may mắn của mình mất rồi nên chẳng thể còn thêm để khiến em thích anh được nữa.",
  "Vào ngày thứ 101 anh gặp được em, anh đã bắt đầu tính toán hướng em `Cầu hôn lần thứ 101`.",
  "Trước đây anh dùng lý trí để sống. Gặp được em rồi, bắt đầu dùng trái tim để sống.",
  "Bởi vì em yêu anh, thế nên anh không tin trên thế giới này còn có chàng trai nào khác may mắn như anh.",
  "Đời này, câu cuối cùng nói với em nhất định sẽ là: 'Gặp sau nhé!'",
  "Nghe bài hát em nghe, đọc cuốn sách em đọc, ngồi chỗ em từng ngồi, đến những cửa hàng em thường đến,... Biết đâu, bất chợt một ngày em sẽ nói với anh rằng: Anh và em giống nhau thật đấy!",
  "Khi đó anh cứ thế thích em, mà em lại chẳng hề hay biết!",
  "Nếu như em muốn từ chối anh thì xin em đừng từ chối tuyệt tình như thế. Bởi vì dù em có nói 'Em không có thích anh như vậy', anh cũng sẽ hiểu thành 'Em thích anh một chút!'.",
  "Mỗi lần trông thấy em, con tim anh lại run lên thổn thức. Mỗi lần tạm biệt em, anh vẫn luôn lưu luyến không rời.",
  "Em đời này có hai lựa chọn, hoặc là em gả cho anh, hoặc là anh lấy em.",
  "Không cần tin vào thần linh, tin anh là đủ rồi, thần linh cũng không yêu em như anh.",
  "Bởi vì không sao đâu, nên đừng nói với anh lời xin lỗi.",
  "Có ngu ngốc đến đâu cũng phải biết một chuyện, đó là yêu bà xã.",
  "Yêu em là tín ngưỡng cả đời của anh, thương em cũng là chấp niệm cả đời của anh.",
  "Em chỉ cần làm Công chúa nhỏ, còn đội trời đạp đất cứ để anh lo.",
  "Có kiếp sau cũng muốn được thích em trước, dù máu có chảy, nước mắt có rơi, nhưng em không biết, thích em là một chuyện hạnh phúc đến nhường nào.",
];

document.getElementById('message').innerHTML = changeMessage();

btn.onclick = function() {
  document.getElementById('message').innerHTML = changeMessage();
};

function changeMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}
```

Và đây là kết quả mà mình thu được sau một hồi ngịch ngợm. Cũng "được của ló" ha 
![](https://images.viblo.asia/880dfd02-5904-4fd9-a75b-bb8e62d81f50.png)


Demo hiện tại chỉ có vài câu đơn giản. Anh em muốn nghịch ngợm thì có thể làm một file sưu tầm những messages hay ho để thả thính nàng hằng ngày nhé. Chúc anh em thành công và hẹn gặp lại ở những bài viết tiếp theo :)

Tài liệu tham khảo: https://developer.chrome.com/extensions

Nguồn thông điệp: Tình yêu là một loại dưỡng khí kỳ diệu - Thẩm Dục Luân

Source code: https://github.com/hatth-1632/m4u