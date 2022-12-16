## Set custom domain free cho Firebase hosting

Như tiêu đề, em vừa tìm ra cách set được Domain của Freenom cho Firebase Hosting để đỡ phải vất vả nhập lại cái tên miền .firebaseapp.com khá vất vả cho anh em :3

### Tại sao lại là Firebase?
- Đơn giản là vì Firebase dùng rất sướng :3
- Thứ nhất: Firebase có sẵn cho chúng ta là Firebase Firestore và Firebase Realtime Database truy xuất khá nhanh hơn nữa lại còn có cả Realtime, đa nền tảng và Firestore còn có thể cache offline nữa đỡ mất công gọi lên Db get Data về :3 Giảm thời gian load cho user
- Firebase có sẵn Authentication, thay vì là phải làm login with Facebook, Google bla bla đọc doc ta chỉ cần xài Authentication là có thể làm login được :3 Mất vài dòng để gọi API và ta chỉ cần quản lí accounts của Firebase là được
- Serverless với Firebase Cloud Functions: Thề :D Em sang Firebase cũng chỉ vì cái này. Có User mới viết trigger bắt sự kiện vừa lẹ vừa nhanh :3
- Có Firebase Hosting kèm Server CDN nên load khá lẹ mà không có tình trạng bị sleep như trên heroku

## Nhược điểm:
- Xài nhiều phải trả tiền :(
- Không có PHP
- Không có SQL cho bác nào đang xài quen rồi

### Bắt đầu nào

#### Bước đầu tiên là tạo cho Project ta 1 tên miền đã 
Bác nào chưa có tên miền thì lên [Freenom](http://freenom.com) tạo thôi :3 Em cũng không nghĩ ra tên miền nào ra hồn nên đặt đại cái đã. Bác nào dùng tên miền của bên khác thì xem hướng dẫn vì em không có rõ tên miền bên khác nó như thế nào cả
Em làm cái tên miền [testcustomfb.ml](https://testcustomfb.ml) phát :D Em đang ôn thi đầu óc toàn lí hóa thôi không nghĩ được tên miền nào ngầu ngầu.
Quy trình đăng kí khá ez rồi nên em không hướng dẫn nữa
![Đăng kí xong Domain :3](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/y7s3poc4rm_Screenshot%20%2814%29.png)
Ok done rồi qua bước tiếp theo thôi
#### Tạo 1 Project Firebase
Chắc đây là bước ez sau bước trên rồi. Các bác vào [Firebase Console](https://console.firebase.google.com) và bấm Add Project rồi set name ![Tạo project](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/9ws5o8jofl_Screenshot%20%2815%29.png)
Set name, Id, region rồi create :)

#### Up web tĩnh của mình lên server
Nếu chưa có NodeJS thì các bác tải NodeJS về từ [NodeJS](http://Nodejs.org) vì ta sẽ cần dùng đến npm
Sau khi cài đặt hãy thử đã cài thành công chưa
```bash
$ node -v 
```
Ok, tiếp đến cần tải Firebase Tools CLI về từ npm
```bash
$ npm install -g firebase-tools
or
$ yarn global add firebase-tools
```
Ok xong rồi thì hãy vào project web của các bạn mở cmd hoặc terminal lên, gõ
```bash
$ firebase login 
// Để login vào tài khoản Google bạn đã create project trước
$ firebase init
// Initiate firebase
//Nó sẽ hiện lên bảng select, bấm space để chọn.
//Mình chỉ dùng Hosting thôi. Bạn nào muốn thử các thứ khá thì có thể chọn
```
Mặc định nó sẽ tạo ra 1 thư mục Public chứa Index.html và 404.html. Nó đã được import sẵn các script của Firebase. Nếu không cần sử dụng bạn chỉ cần delete toàn bộ trong thư mục public rồi paste code của bạn vào trong đó

Rồi để deploy lên ta dùng
```bash
$ firebase deploy
```
Mặc định ta sẽ có tên miền là projectid.firebaseapp.com
Bước tiếp theo là để config về domain của freenom này :3

###  Trỏ tên miền
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/cj9pjpypmi_image.png)
Các bạn vào trang console chọn tag Hosting sẽ thấy có button Connect Domain :3 Hãy thử bấm vô đó![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ezxyfakeol_image.png)
Ngay khi bấm vào nó sẽ hỏi tên miền ta muốn kết nối tới. Trước đó mình đã tạo tên miền là [testcustomfb.ml](https://testcustomfb.ml) nên mình sẽ nhập vào
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/63a8d6ifrh_image.png)
Nó sẽ có một cái như kiểu token :) ta login vào freenom để config DNS
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/sxnxwx7req_image.png)
Set TXT bỏ name nhé :D Paste nguyên cái token vào target rồi save lại và đi pha cho mình 1 cốc cafe chờ nó connect
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/zx03b53csa_image.png)
Nếu mà bấm verify nó sẽ không verify được. Mình chờ tầm 5-7 phút gì đó
Sau khi làm vài ván CS:GO tôi quay lại và verify thành công :D Thực ra có 5-7p thôi nhưng mà mải chơi nên là quên mất
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/qcrswxq2d8_image.png)
Ok trỏ về là xong, finish và chờ nó trỏ về thôi :3 Ez mà (Tầm 10-15p gì đó )
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/ixatfr5bf3_image.png)

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/gv71vdljyg_image.png)

Done

### NOTE: Một số trường hợp có thể https sẽ bị chéo đỏ fix như sau
Các bác lên trang [SSL For Free](https://www.sslforfree.com/) và nhập tên domain của web mình vào
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/p1fklwcvph_image.png)

Chọn Manual verification và bấm Manually Verify Domain
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/di4urdpydz_image.png)
Set thêm 2 cái TXT nữa + thêm www nữa để trỏ về www nha :3

Nó sẽ mất tầm 4h để lên SSL gì đó :D nên các bác gắng chờ nhé

Bài viết hôm nay của em là kết thúc có thắc mắc hay ý kiến góp ý nào các bác cứ bình luận bên dưới nhé