# Vì sao sử dụng Yarn?
### Chuyện về các package
Hồi đầu mới học về web, thì mình hay lên W3school lắm, trên đó thì khi mà mình cần mấy cái như font awesome, hay package js nào ấy, đều có cái link khai báo ở trên đầu na ná thế này này:
```html
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
```
Đấy, đại loại thế. Nên là sau này làm các đồ án, bài tập lớn, lười đi kiếm package tải về nên mình cũng copy-paste nguyên mấy dòng kia vào `header` cho lẹ :). Nhưng mà chuyện là thế này, khi mà mình demo bài tập ở trường ấy, dây mạng thì không có, Wifi thì bất ổn, thế là mấy cái mình khai báo trên kia không load được, js cũng ra console đỏ choét, hỏng hết cả cái giao diện mà mình tốn công vẽ cho đẹp (haiz). Vậy là sau đấy mình đành phải tải các package về project để sử dụng. Nhưng đến khi làm nhóm hay làm project mà sử dụng package giống project đã làm thì lại có cái khó chịu nho nhỏ. Đấy là mình phải đi lục lại project cũ, tìm xem cái package mà mình cần ở đâu (hoặc đi kiếm nguồn tải lại), xong đến lúc đưa code cho bạn thì phải đưa cả cái folder package đó copy đưa cho nữa. Bây giờ thử hình dung khi đẩy pull đấy lên git, nhìn cái pull request có khi cả mấy trăm file, vì mỗi package bên trong đã hơn chục file rồi, project thì tận dụng nhiều package quá, nhìn thấy phát ngợp luôn @@. Xong những người checkpull của các bạn nhìn cái đống đó thì chả muốn check nữa đâu :D. Rồi đến 1 lúc, package mà các bạn dùng được update vì có bug đc fix, hoặc bạn chuyển sang dùng phiên bản mới hơn, bạn sẽ lại tải lại từ đầu về để thay thế, xong lại đẩy lên đưa bạn cùng nhóm. Nghe hơi chán nhỉ, mấy đứa lười như mình là thấy khó chịu lắm luôn đấy :D.

Tuy nhiên, có 1 cái vấn đề hay ho nảy ra ở đây là, mấy package đấy mọi người đều dùng, có sẵn đấy rồi, chỉ cần có tên có version là kiếm được cái cần dùng rồi mà? 

Vậy là đến lúc này, nếu bạn được training tại education Framgia, bạn sẽ được các trainer yêu cầu sử dụng công cụ quản lý thư viện. Mình thì biết 3 loại: `bower`, `npm` và `yarn`. Bài này mình sẽ hướng dẫn mọi người làm quen với việc sử dụng yarn quản lý các gói thư viện nhé :D
### Yarn có gì hơn?
Cái này mình sẽ chỉ dẫn link, các bạn vào đọc thử xem nhé:

https://circleci.com/blog/why-are-developers-moving-to-yarn/
# Sử dụng yarn
## Chuẩn bị
Ở trên kia mình có đưa ra 1 link so sánh vì sao `yarn` lại đang dần thay thế `npm`, nhưng có 1 điều trớ trêu là để tải `Yarn` về sử dụng, bạn sẽ phải có `npm` và sử dụng `npm` để tải `yarn` về :v (nghe như kiểu phải dùng Internet Explorer để tải Chrome với Firefox về ấy nhỉ =)) )

Vậy nên để chuẩn bị, các bạn cần cài NodeJS cái đã.

Các bạn có thể truy cập vào [trang chủ](https://nodejs.org/en/) để tải về nhé :D

Vì mình sử dụng Ubuntu nên mình sẽ hướng dẫn cài đặt trên Ubuntu cho các bạn newbie lười đi tìm hiểu cách cài đặt luôn :)

Trước khi bắt đầu, chúng ta cần đảm bảo rằng bản sao của cơ sở dữ liệu nội bộ được cập nhật mới nhất. Sử dụng câu lệnh sau để cập nhật, `sudo apt-get` để yêu cầu quyền admin:
```bash
sudo apt-get update
```
Sau khi đã cập nhật xong, sử dụng câu lệnh sau để tải NodeJS về:
```bash
sudo apt-get install nodejs
```
Tiếp theo, chúng ta sẽ cần đến `npm` NodeJS Package Manager - chương trình quản lý các thư viện lập trình Javascript cho Node.js.
```bash
sudo apt-get install npm
```
Bây giờ bạn có thể kiểm tra xem đã tải thành công chưa và kiểm tra version bằng câu lệnh:
```bash
node -v //hoặc nodejs -v
```
## Tải và sử dụng yarn
Đầu tiên, cần phải tải `yarn` về bằng `npm` đã:
```bash
sudo npm install -g yarn
```
> `-g` là tham số global, bạn có thể không sử dụng tham số này để tải yarn cho riêng project mà bạn muốn
> 

Để kiểm tra đã tải về thành công chưa, có thể sử dụng câu lệnh kiểm tra phiên bản:
```bash
yarn --version
```
**Sử dụng Yarn** 

Sử dụng yarn khá đơn giản, nếu các bạn đã từng sử dụng npm hay bower thì yarn sử dụng tương tự như vậy. Với Yarn, để quản lý các package, yarn sử dụng file `package.json`, danh sách các package sử dụng sẽ được khai báo trong phần `dependencies` dưới dạng JSON `'key': 'value'`:
```json
    "dependencies": {
        "animate.css": "^3.7.0",
        "chosen-jquery": "^0.1.1",
        "flexslider": "^2.7.1",
        "font-awesome": "^4.7.0",
        "jquery-countdown": "^2.2.0",
        "jquery-legacy": "^1.12.0",
        "jquery-parallax.js": "^1.5.0",
        "jquery.counterup": "^2.1.0",
        "owl.carousel": "^2.3.4",
        "waypoints": "^4.0.1",
        "wow.js": "^1.2.2",
        "yarn": "^1.9.4"
    },
```
Phần key chính là tên các package, phần value là phiên bản của package đó. Các bạn có thể vào để kiểm tra phiên bản đang sử dụng, đồng thời đây chính là danh sách các package mà lệnh tải về của npm và yarn sẽ lựa chọn để tải về nhé.<br/>
* Bắt đầu sử dụng:
Tiếp theo để bắt đầu sử dụng Yarn cho project của bạn, mở terminal trong folder Project, gõ lệnh sau:
```bash
yarn init
```
Lệnh này sẽ tạo cho bạn file `pacakgae.json` để lưu các thông tin package nếu chưa tồn tại, tuy nhiên thì chúng ta cũng có thể tạo thủ công file này, nhưng mà mình khuyên là có sẵn lệnh auto thì cứ sài thôi chứu tội gì nhọc công :D <br/>
Đồng thời thì bạn sẽ nhận được 1 lô các câu hỏi như sau, cứ điền theo gợi ý, hoặc next luôn cũng được nhé.
![](https://images.viblo.asia/5c924a13-0272-40b8-b072-50e86d903573.png)
* File `yarn.lock` <br/>

Cả npm và yarn đều dựa vào file cấu hình `package.json` để thực hiện theo vết các gói phụ thuộc trong dự án. Nhưng phiên bản các gói thì không phải lúc nào cũng chính xác, mà thay vào đó, thường xác định một khoảng các phiên bản cho phép. Cách này cho phép chọn một phiên bản cụ thể, nhưng khi cài đặt npm thì thường sẽ chọn phiên bản mới nhất để khắc phục các lỗi phiên bản trước đó. 

Về lý thuyết, các phiên bản mới sẽ không phá vỡ các kiến trúc trong phiên bản cũ. Cơ mà thực tế không phải lúc nào cũng vậy :v. Sử dụng npm để quản lý gói phần mềm có thể dẫn đến trường hợp hai máy có cùng một file cấu hình `package.json` nhưng lại có các phiên bản của các gói khác nhau và nảy sinh các lỗi 'bug on my machine'.

Và để tránh việc phiên bản không trùng khớp, một phiên bản chính xác sẽ được đưa vào trong file lock để quản lý. Mỗi khi một module được thêm vào, yarn sẽ tạo ra (nếu chưa có) hoặc cập nhật file lock. Bằng cách này, yarn đảm bảo các máy khác nhau sẽ có cùng phiên bản chính xác trong khi vẫn có một loạt các phiên bản cho phép được định nghĩa trong file `package.json`
* Tải package:
Sau khi đã có `package.json`, để tải các package, vào terminal, gõ lệnh như sau:
```bash
yarn add [tên package]
//hoặc
yarn add [tên package]@[version] //để chọn version muốn tải
```
Với lệnh này, yarn sẽ viết thêm vào file `package.json` key: value của package mà bạn muốn tải. Nhờ đó, mỗi khi member khác tải code của bạn về thì đã có danh sách các package cần tải về rồi, chỉ cần 1 lệnh `yarn install` hoặc `npm install` là tải về tất cả những package đã khai báo thôi :D <br/>
* Upgrade package:
Nếu muốn upgrade package đã có, thì sử dụng câu lệnh như sau trong terminal:
```
yarn upgrade [tên package]
//hoặc
yarn upgrade [tên package]@[version]
```

Các bạn tra cứu tên chính xác của package muốn dùng trên đây nhé: https://yarnpkg.com/en/

* Xóa package:
Khi không muốn sử dụng package nào nữa, sử dụng lệnh sau để xóa:
```bash
yarn remove [tên package]
```

* Để tải tất cả các package cần dùng đã được khai báo trong `package.json` trong 1 lượt, sử dụng câu lệnh sau trong terminal:
```bash
npm install
```
hoặc
```bash
yarn install
```
hoặc
```bash
yarn
```
Đây cũng là lệnh mà các bạn khác sau khi lấy code của bạn về sẽ sử dụng để tải về tất cả các package bạn dùng đấy :D.
## Chút lưu ý 
* Khi khai báo các package các  bạn nhớ chú ý viết đường dẫn cho đúng nhé

* Nếu bạn đang training tại framgia, thì chắc bạn cũng biết, là cần phải khai báo gọi link từ trong folder `/public/` sang đúng không? Khi sử dụng các công cụ quản lý này, các bạn nhớ dùng Laravel Mix để mix từ `/node_modules/` sang `/public` rồi sử dụng nhé
# Kết
Yarn là công cụ quản lý thư viện do Facebook tự xây dựng, cố gắng khắc phục nhược điểm của npm. Vì thế nên có người khổng lồ Facebook cùng cộng đồng sử dụng đang lớn dần, thì tội gì bạn chưa "đu" theo thử xem nhỉ?<br/>
Bài viết của mình nếu có gì cần góp ý hoặc chưa đúng thì mọi người cứ góp ý để mình fix ngay nhé :D