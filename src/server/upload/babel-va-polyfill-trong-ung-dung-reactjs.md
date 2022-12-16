##  Mở đầu: 
Khi khởi tạo ứng dụng, reactjs và config babel, mình thắc mắc cũng như gặp 1 số trường hợp như babel sẽ transform code ReactJS của mình ra như thế nào, và rõ ràng là mình đã config babel để transform code của mình ra phiên bản js phù hợp, suport các version trình duyệt cũ rồi mà tại sao khi mở trình duyệt phiên bản đó lên thì nó vẫn không chạy được. Qua tìm tòi thì mình đã hiểu được 1 ít và muốn chia sẻ với mọi người hôm nay.

Để đi vào VD cụ thể để bạn dễ hình dung nhé:
## Khởi tạo ứng dụng
Lần này mình sẽ không dùng create-react-app nữa, mình khởi tạo luôn từ đầu:
Bạn tạo 1 thư mục và đặt tên theo bạn muốn, mình đặt là **example-babel**, cd đến file này và khởi tạo project bằng command line: `npm init -y`

Tiếp đó mình tạo 2 thư mục là **src** và **public**
ở thư mục **src** mình tạo file **index.jsx** có dạng:
```
const users = ['User-1', "User-2", "User-3", "User-4", "User-5"]
const formatedUser = users.map(user => `Hello ${user}`)
const helloMessage = formatedUser.join(', ')

const element = (
  <div>
    <p>{helloMessage}</p>
  </div>
)

ReactDOM.render(element, document.getElementById('root'))

```

Và ở thư mục **public** mình tạo file **index.html**, lưu ý là mình import React và ReactDOM = cdn nhé bạn.
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Example Babel</title>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  
</head>
<body>
  <div id="root"></div>
  <script src="./index.js"></script>
</body>
</html>
```

Lúc này, nếu thử mở file **index.html** bằng trình duyệt lên thì sẽ hiển thị trắng, không có gì cả.

Giờ mình sẽ cài đặt @babel/core chính là nhân của babel và @babel/cli để thực hiện lệnh với babel trên command-line interface :

`npm i -D @babel/core @babel/cli`

Để chắc chắn babel/cli hoạt động và kiểm tra version babel mình thực hiện lệnh trên command-line:

`node_modules/.bin/babel --version`

Nó hiển thị version hiện tại của babel mình cài đặt là 7.10.5. it work!

Tiếp theo, để chuyển đổi code jsx sang js, mình cần 1 preset cho babel, nó như kiểu là 1 plugin để giúp cho babel xác định việc cần transform code jsx sang js mà không phải những dạng khác.

Vì babel có thể làm khá là nhiều việc transform khác nhau, không chỉ jsx. Vậy nên mình sẽ cài @babel/preset-react:

`npm i -D @babel/preset-react`

Giờ thì mình đã có đủ công cụ để chuyển đổi code trong file jsx của mình sang js thuần rồi đó, mình run lệnh trên terminal:

`npx babel src --presets @babel/react --out-dir public`

Ở đây, babel command-line sẽ lấy input là thư mục với các file js nguồn trong src, tiếp đó là các presets thích hợp quy định việc transform, và sau nữa là thư mục để show ra output public.

Xong rồi đó, giờ bạn để ý xem trong thư mục public, babel sẽ sinh cho mình 1 file index.js và nó trông như thế này:
```
const users = ['User-1', "User-2", "User-3", "User-4", "User-5"];
const formatedUser = users.map(user => `Hello ${user}`);
const helloMessage = formatedUser.join(', ');
const element = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, helloMessage));
ReactDOM.render(element, document.getElementById('root'));
```

Và trên trình duyệt thì nó đã hiển thị ra đoạn code jsx mình đã viết:
![](https://images.viblo.asia/11d312aa-6c4a-405d-bbc3-c4cd5a769617.png)

Như vậy, bạn có thể thấy, babel chuyển đổi code js sang dạng React.createElement() thuần.
Nếu bạn chịu khó tìm hiểu các phiên bản reactjs thời ban đầu thì việc code ReactJS cũng tương tự như file mình vừa biên dịch ra, khá là dài và phức tạp phải không.
Khi babel đã render code jsx ra như vậy rồi, việc chuyển đổi từ React.createElement() sang html element sẽ do React, ReactDOM ở cdn mình import ở phần header của file html lo

Giờ đến phần thắc mắc, tại sao mình đã dùng babel để set target phiên bản trình duyệt mình muốn hỗ trợ rồi mà vẫn phải cần babel polyfill/

Đầu tiên, mình cài đặt @babel/preset-env để có thể config babel support cụ thể phiên bản trình duyệt, cũng như xác định các plugin mình sẽ sử dụng để transform:

`npm i @babel/preset-env -D`

Tiếp đó mình tạo file **.babelrc** để config babel và nhập:
```
{
 "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
Ở đây thay vì nhập preset như ở command-line phía trên (*npx babel src --presets @babel/react --out-dir public*) thì mình set luôn vào .**babelrc** cho nó ngắn gọn.
Như mình nói ở trên @babel/preset-env dùng để config version trình duyệt cụ thể, nên mình có sửa 1 chút ở đây:
```
{
  "presets": [
    ["@babel/preset-env", {
    "targets": {
    "ie": "11",
    "edge": "15",
    "safari": "10",
    "firefox": "50",
    "chrome": "49"
    }
    }],
    "@babel/preset-react"
  ]
}
```
Việc thêm cấu hình cho @babel/preset-env thì mình đặt nó trong 1 mảng, với giá trị đầu là preset @babel/preset-env và giá trị thứ 2 là object config thêm.
Bây giờ thay vì run **npx babel src --presets @babel/react --out-dir public** trên command-line thì mình run **npx babel src --out-dir public**. Và kết qủa là:
```
"use strict";

var users = ['User-1', "User-2", "User-3", "User-4", "User-5"];
var formatedUser = users.map(function (user) {
  return "Hello ".concat(user);
});
var helloMessage = formatedUser.join(', ');
var element = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, helloMessage));
ReactDOM.render(element, document.getElementById('root'));
```
Bạn có thể thấy, arrow function trong hàm map của mình đã chuyển sang function bình thường, template trong nó cũng chuyển thành hàm concat.
Nhưng nếu có điều kiện chạy thử trên những trình duyệt cũ như ie 11, nó vẫn không hỗ trợ, vậy tại sao? 
Tại vì babel chỉ biện dịch ra thứ mà những trình duyệt có thể hiểu được, nhưng không phải toàn bộ, bởi vì những trình duyệt đó còn thiếu những built-ins như hàm find, map của mảng, Object.assign… 
Vì vậy, babel **polyfill** đảm nhận vị trí hiểu được các cú pháp này, hay nói cách khác thì babel nhận trách nhiệm chuyển đổi code còn polyfill thì dùng để implement các mã code đã chuyển đổi này.
Việc implement của **polyfill** cần phải có sẵn ở thời điểm runtime nên mình để nó ở header trang html luôn.
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Example Babel</title>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

  <script src="https://unpkg.com/@babel/polyfill@7/dist/polyfill.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script src="/ZZ.js"></script>
</body>
</html>
```
Vậy là bạn có thể test ngon trên ie 11 rồi đó.
## Kết luận
Chú ý: Hy vọng qua bài vừa rồi, bạn có thể học được gì đó thú vj, hẹn gặp lại các bạn ở bài sau.