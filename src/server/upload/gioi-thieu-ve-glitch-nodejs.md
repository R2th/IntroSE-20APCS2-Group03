## Giới thiệu
Chào các bạn. Mình đang mới bắt đầu tìm hiểu về Node.JS và có rất nhiều thứ mình muốn tìm hiểu thêm, đây là lần đâu nên sẽ chỉ là một bài chia sẻ nhỏ nhỏ :slightly_smiling_face: ... về Glitch

[Glitch](https://glitch.com/) là một nền tảng được xây dựng bởi find folks tại Fog Creek Software, công ty được biết đến trên mạng internet với FogBugz, Trello, đồng sáng tạo StackOverflow (y). Hầu hết lập trình viên đều quen thuộc với cái tên Joel Soplsky (chắc chỉ bên nước ngoài :v) .

Một phần giới thiệu nhỏ để bạn làm quen với Glitch và biết cách thức và tại sao bạn có thể áp dụng  nó vào các dự án của bạn.

Tip: Sử dụng [Bit](https://github.com/teambit/bit) để xây dựng ứng dụng nhanh hơn với các "components". Dễ dàng chia sẻ và sử dụng lại "components" với team của bạn và sử dụng chúng để xây dựng nên các ứng dụng mới... Cùng cố gắng nào!.

## Glitch là gì?

Glitch là 1 nền tảng mà bạn có thể xây dựng ứng dùng Node.js trên cloud, public or private và hợp tác với đồng đội. Hay có thể hiểu đơn giản nó là 1 service để đấy ứng dụng Node.js lên thôi

Khi bạn thử  phát triển một ứng dụng web với Node.js, cài đặt server và đăng ký domain ... Nó rất phức tạp và tốn nhiều thời gian.

Glitch có thể giúp bạn tập trung vào việc sáng tạo ứng dụng chứ không phải mất công nghĩ làm sao đấy chúng lên cho mọi người biết đến.

Nó không chỉ là nơi bạn có thể đẩy ứng dụng của bạn lên một cách dễ dàng mà còn là một công cụ chỉnh sửa khá tốt

Review thế đủ rồi, cùng bắt đầu tạo nên một thứ gì đó vui vui nào :))

## Let's go
Đầu tiên thì ... đây là giao diện trang chủ của [Glitch](https://glitch.com/)

![](https://images.viblo.asia/8aeb9d3c-6a32-4be9-8bb2-9684f43364ea.png)

Bạn có thể đăng nhập qua Facebook hoặc Github đều được, nhưng đương nhiên là chọn Github sẽ tốt hơn rồi nhỉ :v: 

Trước đó bạn nên tạo một repo rỗng trên tài khoản Github của bạn và clone nó về local. 

```
git clone https://github.com/username/reponame.git
cd reponame
```

Chắc hẳn bạn phải thành thạo các bước cơ bản của Node.js rồi nhỉ? :)). Cùng thực hiện lại nào 


```
npm init
npm i express // hiện tại mình đang học express nên ... :))
```
Bạn tạo 1 file index.js giống như main ở trong package.json
```
touch index.js
```
### file index.js
```
const express = require('express')
const app = express()
const PORT = 8797
app.use('/', (req, res) => {
    res.json({"mess": "Hello Would!"})
})

app.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;
```

rồi run ```node index.js```

Phần setup coi như xong giờ là push code lên repo đã tạo ban đầu ...

**Và giờ là tới thao tác trên [Glitch](https://glitch.com/) nhá**, nhớ là đăng nhập bằng tài khoản Github mới tạo repo nhé!

step by step!!! (có 2 bước bé bé thôi :v)
1. Click New Project

![](https://images.viblo.asia/7bc80c22-9abf-41d1-8587-fd44e02be398.png)

Hãy click vào "Clone form Git Repo nhé" còn nếu bạn muốn tạo thêm form của Glitch thì có 3 sự lựa chọn bên trên

2. Sau khi điền link

![](https://images.viblo.asia/2d294bbd-c157-4315-91a5-9e3bc1aab5c5.png)

Chỉ cần điền đúng link repo là ta đã có 1 noi lưu code - chỉnh sửa - chia sẻ với mọi người, đặc biệt nó khá màu mè :v và có thể "Live app" nhá :)) (như một service vậy)

Giờ bạn có thể gửi đường link Live app cho bạn bè của mình và khoe "tao mới viết cái app có mấy phút haha" (thực chất app nó cái dell gì đầu :v) và cũng có thể gửi link "invite" bạn của mình vào editor trực tiếp :)) izi

Và đây là kết qủa (repo mình từng làm 1 blog chơi chơi :) )

![](https://images.viblo.asia/5999f7cd-b0fd-4499-bdb4-8e975f2a4e72.png)

## Lời kết
* Glitch là service public/save các ứng dụng Node.js
* Glitch là 1 cách dễ dàng để demo các ứng dụng web  của bạn
* Glitch miễn phí sử dụng:v: 

Hy vọng sau bài viết sẽ có nhiều người dùng và "vọc" thêm nhiều cái hay để chia sẻ :)) - chứ mình mới biết à!!!

Do ngoài trời đang mưa to gói bão nên mình phải vội về - chào các bạn :v:. Bài viết còn nhiều thiếu sót mong các bạn góp ý nhẹ nhàng (bow). Cảm ơn bạn!

Bài viết được tham khảo từ

https://viblo.asia/p/i-did-try-using-glitch-service-for-publishing-nodejs-web-applications-easily-for-free-jvElaODDKkw

https://blog.bitsrc.io/introduction-to-glitch-for-node-js-apps-in-the-cloud-cd263de5683f