Hello 500 anh em, như mọi người đã biết thì sau những năm tháng code vật code vã thế nào chúng ta cũng cho ra đời một sản phẩm web chất lượng. <br>
Và khi các bạn muốn chia sẻ thành quả với những người khác (ví dụ code cái web tỏ tình gửi cho crush). Thì các bạn không thể nào gửi cái link `http://localhost:xxxx/` sang crush vào bảo nó "Oh my love, can you click this link to see all my love?". Khả năng cao là bạn sẽ được crush cho vào danh sách anh trai/ em gái mưa liền. Và hôm nay mình sẽ giới thiệu cho các bạn cách để deploy một web tĩnh lên firebase hosting nhé.<br>
# Chuẩn bị
Để deploy lên firebase hosting thì các bạn cần có những thứ sau:
* Một firebase project, nếu chưa có các bạn có thể truy cập vào [firebase console](https://console.firebase.google.com/) để tạo nhé.
* Một ứng dụng mà bạn muốn deploy, ở đây mình đang demo với một ứng dụng React được tạo từ `create-react-app` nhé.
# Build ứng dụng
Vì mình đang demo bằng React nên sử dụng combo `npm run build` để thực hiện việc build ứng dụng phục vụ cho việc deploy.<br>
Sau khi mình chạy lệnh trên thì sẽ tạo ra một folder `build` chứa tất tần tật mọi thứ từ js, css, media, ...
# Thiết lập firebase
## Cài đặt Firebase CLI
Các bạn gõ lệnh trên vào terminal để cài đặt.
```
npm install -g firebase-tools
```
## Đăng nhập vào Firebase
Sử dụng lệnh `firebase login` để thực hiện việc đăng nhập vào firebase. <br>
Sau khi sử dụng lệnh trên thì mọi người sẽ được chuyển hướng đến web và đăng nhập như bình thường nhé.
## Thiết lập hosting
Sau khi đã đăng nhập thì các bạn sử dụng lệnh bên dưới để tạo file `firebase.json` phục vụ cho việc thiết lập cấu hình hosting.
```
firebase init hosting
```
Lúc này firebase sẽ yêu cầu bạn chọn firebase project (nếu tài khoản bạn có nhiều hơn 1 project) và tạo file `.firebaserc` với cấu trúc như sau để lưu thông tin firebase project bạn sẽ deploy.
```
{
  "projects": {
    "default": "tên firebase project của bạn"
  }
}
```
Tiếp đó nó sẽ hỏi các bạn những câu hỏi như hình dưới nhé.
![](https://images.viblo.asia/1443f224-fd57-4772-8027-934eb0f32854.png)
* **What do you want to use as your public directory?** yêu cầu bạn chọn một thư mục từ root để làm các công việc của thư mục `public`. Ở đây mình chọn thư mục `build` được tạo ra ở bước `Build ứng dụng` phía trên.
* **Configure as a single-page app (rewrite all urls to /index.html)?** chọn xem bạn có cần định cấu hình ứng dụng firebase của mình dưới dạng single-page-app hay không. Mình chọn không.
* **Set up automatic builds and deploys with GitHub?** Thiết lập auto build và deploy với Github, mình chưa chơi kiểu này bao giờ nên cũng mạnh dạn say no :)
* **File build/404.html already exists. Overwrite?** Nó hỏi mình có ghi đè file build/404.html không thôi, chả có gì cả.
* **File build/index.html already exists. Overwrite?** Tương tự với file build/index.html, bọn này hỏi nhiều thật (chan).

Sau khi hỏi nhiều mà mình trả lời chẳng được bao nhiêu đâm ra nó cũng chán không hỏi nữa và bắt đầu tạo file `firebase.json` cho mình :). 
```
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```
Đây là file được firebase tạo cho mình. Thấy được có vài dòng à. Các bạn có thể tham khảo thêm về các thiết lập của nó ở bản [example firebase.json](https://firebase.google.com/docs/hosting/full-config#firebase-json_example) nhé.
# Deploy
Sau khi đã thiết lập đủ mọi thứ trên đời thì các bạn cũng có đủ vốn để đi deploy ứng dụng cái web tỏ tình. Thật là hồi hộp, chắc crush sẽ cảm động đến khóc mất thôi :v<br>
Để thực hiện bước cuối cùng thì các bạn chỉ cần gõ từng phím một dòng lệnh bên dưới và tìm địa điểm chụp ảnh cưới đi là được rồi.
```
firebase deploy --only hosting
```
Sau khi deploy hoàn tất thì nó sẽ ném ra cho các bạn cái link để truy cập từ browser. Và đây là sản phẩm của mình.<br>
[Web tỏ tình của tớ](https://laravel-8c2d4.web.app/)<br> Cùng click vào để xem cách mình tỏ tình nhé :heart_eyes::heart_eyes:<br>
loading<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
.<br>
10%<br>
20%<br>
30%<br>
40%<br>
50%<br>
60%<br>
70%<br>
80%<br>
90%<br>
100%<br>
done<br>
Bất ngờ chưa, crush ở đâu ra mà tỏ với chả tình. Đây chỉ là cái web todo thôi nhé mọi người :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:
# Tổng kết
Như các bạn thấy đó. Quá trình deploy lên firebase hosting thật là nhanh chóng và tiện lợi đúng ko nhỉ.<br>
Lúc mình demo thì nếu bỏ qua quá trình build ứng dụng thì chỉ mất chưa tới 5' để deploy ứng dụng lên trển.<br>
Mọi người có thể lên thẳng  [docs](https://firebase.google.com/docs/hosting) để tìm hiểu thêm nhé. Chồ thân ái và quyết thắng.