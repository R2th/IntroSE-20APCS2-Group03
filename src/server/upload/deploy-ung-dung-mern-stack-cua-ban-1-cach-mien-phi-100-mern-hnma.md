## Hơ lôu anh em
Hẳn là trong quá trình học tập bạn nào cũng muốn nhìn thấy thành quả của mình chạy trên môi trường thực tế, ngoài ra thì có thể có 1 cái link đẹp đẹp cho vào CV hay đơn giản là khoe với thằng bạn là hôm nay tao học được món này mày ngó qua thấy ngon không. <br>
Trong quá trình học tập và làm việc hẳn là một số bạn cũng đã tìm thấy các nguồn tài nguyên free để mình có thể sử dụng hoặc có thể chưa tìm thấy, vậy hôm nay mình xin chia sẻ một số tài nguyên free để anh em có thể hoàn toàn deploy 1 project MERN hoàn toàn miễn phí.

Đó là **HNMA = Heroku + Netlify + MongoDB Atlas** <br>

## #1: tạo mongo database với MongoDB Atlas
**B1:** Các bạn truy cập vào link: https://www.mongodb.com/atlas/database , sau đó hoàn thành các bước đăng ký và login xong chúng ta sẽ được đưa vào màn hình Welcome của mongodb atlas <br>
![ma1.1.png](https://images.viblo.asia/e9fbff2f-243f-4719-9acf-06dc506d8e70.png)
<br>

**B2:** Ok, nhập các thông tin và click button **Finish** bên dưới cùng và chuyển sang màn hình lựa chọn các options cloud database của bạn<br>
![ma3.png](https://images.viblo.asia/dccb30c1-aeca-4932-a491-c410fa87fe8f.png)
<br>

**B3:** Bạn sẽ lựa chọn gói **Shared**, gói này hoàn toàn free và **không yêu cầu credit card** <br>

**B4:** Sau khi chọn gói Shared các bạn sẽ được đưa tới màn hình tạo **Cluster**, ở đây các bạn có thể chọn nhà cung cấp dịch vụ cloud và hiện họ đang cung cấp 3 cloud provide là AWS, Google cloud và Azure <br>
Đồng thời bạn cũng sẽ lựa chọn Region cho cloud db của bạn
<br>
<br>

![ma4.png](https://images.viblo.asia/3a0493ea-42d2-4573-851b-e6a2ad14c4c4.png)
<br>

**B5** Sau khi nhấn tạo Cluster bạn sẽ di chuyển qua màn hình setup các thông tin kết nối tới cloud db này <br>

Bao gồm: account info và access security <br>
Phần địa chỉ IP các bạn có thể click button **Add My Current IP Adress** để thêm IP của mình vào danh sách các địa chi IP có thể kết nối tới cloud database này, rất an toàn phải không :D hoặc bạn cũng có thể chọn allow every where trong phần cài đặt **Network access** sau khi tạo xong Cluster
<br>
![ma5.png](https://images.viblo.asia/36426d1e-25d0-4af9-8b0d-e4da94c7ce0b.png)
<br>

**B6** Chờ vài giây chúng ta sẽ có 1 con Cluster được tạo và bạn sẽ nhìn thấy màn hình bên dưới, chúng ta có thể nhấn nút **Connect** để lấy database connection string hoặc click **Browse Collections** để xem các collections hiện có của bạn (đương nhiên là bây giờ chưa có gì)<br> 

![ma7.png](https://images.viblo.asia/59542e72-adb6-49db-98e3-a18b60b0fe74.png)
<br>

OK, bây giờ chúng ta sẽ lấy connection string để tí nữa đưa vào ứng dụng Express (nodejs) của mình bằng cách click vào button **Connect** sau đó click vào phần **Connect your application**

![ma8.png](https://images.viblo.asia/efa549bd-dc20-44f3-a054-d5869be6f7d2.png)

OK, vậy là chúng ta đã có được connection string có dạng như sau: <br>
`mongodb+srv://demoadmin:<password>@cluster0.czqeroh.mongodb.net/retryWrites=true&w=majority `
<br>
**demoadmin**: chính là tài khoản access database mà các bạn đã tạo ở bước 5 <br>
**\<password>**: bạn thay đoạn này bằng password vừa tạo trước đó <br>
**cluster0.czqeroh.mongodb.net**: đoạn thông tin về cluster này chưa bao gồm db (collection) của bạn nên chúng ta có thể sửa thành như sau **cluster0.czqeroh.mongodb.net/ten_database_cua_ban**


## #2: Tạo Express, nodejs API và deploy lên heroku
**B1** Tạo Express API và kết nối tới database mongo atlas đã tạo ở trên <br>
<br>
![e0.png](https://images.viblo.asia/2819d8c8-a194-40f8-bbb6-79b71dc76035.png)
<br>
<br>
Đương nhiên là bạn sẽ cần phải code thêm phần CRUD một đối tượng nào đó 
1: Create user schema

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, min: 6 },
});

module.exports = mongoose.model('User', userSchema);

```


Cập nhật file **routers/users.js**

```
var express = require('express');
var router = express.Router();
const User = require('../model/user.model');


router.get('/dummy', async (req, res, next) => {
  const users = await User.insertMany([
    {
      username: 'user1',
      password: 123456
    }, {
      username: 'user2',
      password: 654321
    }
  ])

  res.send({
    msg: 'ok',
    data: users
  });
});

router.get('/', async (req, res, next) => {
  const users = await User.find()

  res.send({
    msg: 'ok',
    data: users
  });
});


module.exports = router;
```

<br>

OK, vậy là xong bước tạo API với Express và Nodejs (ở đây chỉ là demo nên mình chỉ tạo sample đơn giản như này để các bạn hiểu các bước làm thôi, còn độ phức tạp thì tùy ứng dụng của bạn)

**B2** Login với heroku 
<br>
Lưu ý, các bạn hoàn toàn có thể cài đặt Heroku CLI (https://devcenter.heroku.com/articles/heroku-cli) để tạo tác với Heroku thông qua command line, nếu các bạn muốn thì mình có thể hướng dẫn ở một bài khác

![b1.png](https://images.viblo.asia/ced41812-75b9-4b27-94cb-711cb8a8c6d8.png)
<br>

**B3**: Chọn create new app
<br>
<br>
![b2.png](https://images.viblo.asia/80bfc799-7753-44ff-b82d-b70a13fb0a04.png)

Các bạn nhập tên và lựa chọn region sau đó nhấn **Create app** là chúng ta đã hoàn thành bước tạo 1 project  trên heroku
![b3.png](https://images.viblo.asia/507b566a-66ff-4391-85ba-27bee53dba9b.png)

**B4**: Lựa chọn source code để deploy

Ở bước 3, sau khi tạo xong project các bạn sẽ nhìn thấy phần Deployment method, thì hiện tại chúng ta đang không sử dụng Heroku CLI nên mình sẽ deploy thông qua github

Click lựa chọn tab **Github**, sau đó nhập tên vào mục *Search for a repository to connect to* và click **Search** 

![b4.0.png](https://images.viblo.asia/7498b1c3-413d-404b-9ec9-f1ea46ded8df.png)


Ok, các bạn sẽ lựa chọn branch chưa code của mình sau đó nhấn **Connect**

![b4.png](https://images.viblo.asia/02de8c50-1e05-4a7b-891c-13f6672a2fd7.png)

Sau khi connect, các bạn sẽ lựa chọn branch để deploy sau đó click button **Deploy Branch**
Chờ vài giây sau khi deploy xong chúng ta có thể click button **View** để xem project của mình

**Lưu ý:** mỗi lần update code các bạn quay lại màn hình này và click button **Deploy Branch** để deploy lại code mới

Các bạn chú ý, chạy api create dummy user trước **/users/dummy** để tạo user, sau đó có thể truy cập api lấy toàn bộ user **/users**

![image.png](https://images.viblo.asia/12acbef2-3d48-4940-9312-dd3fe18ae71f.png)


OKe, vậy là đã xong bước deploy API lên **Heroku** và tạo database trên **MongoDB Atlas**, tiếp theo chúng ta sẽ deploy ứng dụng React lên Netlify 

## #3. Deploy React app lên Netlify
**B1** đương nhiên là cần tạo React app trước khi deploy rồi 

Và chúng ta cũng cần *install axios* để call api 

Sau khi tạo xong project react, install axios thì các bạn cập nhật code như sau 
![r2.png](https://images.viblo.asia/eeacb317-e342-469f-8486-1028a230abd0.png)

Okie, chạy `npm run build` để build project, sau đó chung ta sẽ nhận được 1 folder source đã được build ra là **build** (bước này hỗ trợ bước 2 khi lựa chọn *deploy manually*)

**B2** Tạo account và login vào netlify 

Sau khi login xong
![image.png](https://images.viblo.asia/05407b44-aae5-47e9-b2cc-27ad8bb64558.png)


Các bạn có thể lựa chọn 2 cách để deploy: <br>
Cách 1: là **import from Git** tức là sẽ liên kết với git và để Netlify tự build và deploy cho mình , khi đó các bạn phải điền tên branch cần build, tên command để build và tên thư mục public sau khi build

![image.png](https://images.viblo.asia/df64b926-e3c3-4ad8-bb11-3379daeb5b42.png)

Sau khi chỉnh sửa xong (hoặc để mặc định) các bạn click button **Deploy site** để deploy project React của mình

Cách 2: các bạn có thể build ở local sau đó kéo thả **thư mục** đã được build ra vào phần *deploy manually*

**B3** Truy cập đường dẫn đã deploy xong và cảm nhận thành quả

https://deme-mern-hnma.netlify.app/

![image.png](https://images.viblo.asia/9bf8f318-cce9-4b8e-bf5d-d0b7e2911023.png)


## #4.Thanks
Cảm ơn anh em đã dành thời gian đọc bài viết của mình. Bài viết hôm nay mình muốn chia sẻ với anh em về cách mà chúng ta có thể sử dụng các tài nguyên miễn phí trên internet để phục vụ mục đích học tập nghiên cứu của mình. <br>
Bài viết này vẫn còn rất nhiều thiếu xót và còn nhiều phần mình chưa giới thiệu tới anh em nhưng trên đây là cách đơn giản nhất để sử dụng các platform miễn phí để triển khai ứng dụng của bạn. <br>
Nếu có bất kì thắc mắc hoặc câu hỏi nào bạn hãy comment bên dưới để mình biết nhé 😁<br>
Cảm ơn các bạn đã đọc hết bài viết của mình, tạo ngay cho mình một ứng dụng MERN stack và deploy lên HNMA nào :D 😁😁 😄