MongoDB Atlas hiểu đơn giản là tạo database online.

**Ưu điểm:** có bản miễn phí.

**Nhược điểm:** với bản miễn phí thì giới hạn dung lượng, giới hạn kết nối, giới hạn tốc độ... lâu lâu không dùng thì bị xóa.


Dưới đây là hướng dẫn cách tạo và kết nối MongoDB Atlas trong nodeJS.
## Step 1: Đăng ký tài khoản
- Truy cập trang chủ: https://www.mongodb.com/
- Đăng ký sau đó đăng nhập

## Step 2: Tạo mới project
Click vào danh sách Project và click `New Project`

![Tạo mới project mongoDB](https://images.viblo.asia/6e4abd7d-758c-48ac-8ee1-bee5cc286fb9.png)

## Step 3: Đặt tên project
Tên Project phải là duy nhất (và một vài hạn chế khác).
Mình đặt tên là `mongo-test` nếu ok không bị trùng thì click vào `Next`

![đặt tên project mongoDB](https://images.viblo.asia/432a2031-40b6-4320-9537-f5589d9490bb.png)


## Step 4: Thêm thành viên và set quyền truy cập project
Hiện tại chưa làm chung với ai cả nên ta click vào `Create Project`.

![Thêm thành viên và set quyền truy cập project mongoDB](https://images.viblo.asia/60a51f3e-53ed-44eb-a523-235580069864.png)


Đợi một lúc để quá trình hoàn thành thì chúng ta đã có Project mới như hình

![tạo project mongoDB thành công](https://images.viblo.asia/6e0c4fa2-3dcd-4fdd-aa76-1e765ff66068.png)


## Step 5: Tạo database
Click vào `Build a Database`

![](https://images.viblo.asia/cdad0b34-b18d-4718-bda3-21ef3e63ac4b.png)


## Step 6: Chọn cloud database
Cái gì miễn phí thì chọn, sau đó click `Create`

![](https://images.viblo.asia/d4eb9b89-84ca-4911-b0bb-fe0ca3992343.png)


## Step 7: Tạo Cluster
- `Provider & Region`: AWS và Singapore
-  `Cluster Tier`: mặc định là M0 sandbox free forever
-   `Cluster Name`: đặt tên là `cluster-mongo-test`
-   Sau đó click vào `Create Cluster`


![](https://images.viblo.asia/8ca72a34-b504-45dc-9d0f-6e32400cfa70.jpg)

**Giao diện khi hoàn thành**

![](https://images.viblo.asia/e8ac57e1-8398-4e1f-92df-2f8353f3cc52.png)


## Step 8: Chọn kiểu connect
Click vào `connect`

![](https://images.viblo.asia/c76758c5-5047-4782-9f0d-1c885cbe52a6.png)


## Step 9:  Thêm IP và database user
**Phần 1: Add a connection IP address**
* Add Your Current IP Address
* Add a Different IP Address
* Allow Access from Anywhere

Mình chọn `Allow Access from Anywhere` và click luôn vào `Add IP Address`

**Phần 2: Create a Database User.**

Mình đặt tên là `mongo-user` và password `!23456`. Tiếp theo là click vào `Create Database User`

![](https://images.viblo.asia/ae6c5622-09af-48ab-a3b4-d5c3ffa7e9d9.png)

**Kết quả**

![](https://images.viblo.asia/4835e2e6-d4b2-4fad-827e-b445e56e047d.png)


## Step 10: Chọn phương thức kết nối
Click vào `Choose a connection method`

![](https://images.viblo.asia/5db46358-5ff6-48b9-875a-7ec94bd20153.png)

## Step 11: Chọn kết nối tới application
Click vào `Connect your application`

![](https://images.viblo.asia/c79f21ce-0885-4b31-a4c0-0b27843843ae.jpg)

## Step 12: Tạo mã kết nối
Chọn `driver and version` và copy đoạn mã kết nối được tự động sinh ra

![](https://images.viblo.asia/16b5c53f-ddfe-48c8-ab67-c333e15c5706.png)

## Step 13: Kết nối mongoDB Atlas thông qua mongoose
- Tạo mới một dự án bằng câu lệnh: `npm init -y`
- Cài đặt [mongoose](https://mongoosejs.com/docs/index.html#getting-started) bằng câu lệnh: `npm install mongoose`
- Tạo file `index.js` tại thư mục root của dự án: `touch index.js`
- Bên dưới là code file này, copy đoạn mã ở step 12 và thay thế `<password>` bằng mật khẩu `!23456`. 
```index.js
const mongoose = require('mongoose')
const URL = 'mongodb+srv://mongo-user:<password>@cluster-mongo-test.fxndsza.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    await mongoose.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB()
```
- Test xem đã kết nối được chưa? nếu hiện log ra như này là ok con dê rồi.
```
$ node index.js

Connected to mongoDB
```