**Giới thiệu cơ bản về Vue 2**

Xin chào các bạn, hôm nay mình đã quay trở lại để tiếp tục với web-pack và vue-cli **vue-loader** ở tập 12 trước.

Hôm nay mình sẽ giới thiệu đến các bạn tính năng ***Hot Reload*** trong webpack **vue-loader**.

Mở đầu bài học hôm nay thì chúng ta sẽ setup 1 project sử dụng web-pack như bài 12 đã hướng dẫn

![](https://images.viblo.asia/d8a9b475-37af-4c8f-8a6d-94405528167c.jpg)

Đầu tiên mình sẽ khởi tạo project tên là lesson
![](https://images.viblo.asia/0351c097-76c2-4bf1-bd36-d3ac8d409f4d.jpg)

Tiếp đến là npm install để cài đặt các thư viện
![](https://images.viblo.asia/c06c32c2-7728-41e6-9e31-8a460afda89a.jpg)

Okie giờ mở project trên subl ở file package.json các bạn sẽ thấy đoạn scripts có mô tả 2 môi trường là dev và prod.
Trên môi trường dev thì có thể thấy --hot ở cuối scripts đó chính là hot reload để phục vụ việc chúng ta phát triển project được đơn giản và tiện lợi.
![](https://images.viblo.asia/f10bb5b2-27e8-41d3-a898-59717d79e82d.jpg)

Quay trở lại với file App.vue. mình sẽ viết lại template sử dụng 1 components tên là counter. Chú ý chúng ta sẽ phải import components vào file và khai báo thêm ở phần export default như sau :
![](https://images.viblo.asia/3427b30b-09a2-4aa1-8035-f2a60766d758.jpg)

Tạo thêm file src/components/Counter.vue. Ở đây mình sẽ thực hiện việc show số lần count sau khi click vào button Increment
![](https://images.viblo.asia/0d8a4e9d-d06a-4280-b1dd-d4a2d4cd0255.jpg)

F5 ở trình duyệt chúng ta sẽ được kết quả :
![](https://images.viblo.asia/d64feb20-1485-4df9-87c5-3b06ef5696f2.jpg)

Mình sẽ click thử vài lần xem code có đang hoạt động tốt hay không.
![](https://images.viblo.asia/6dea2a91-ebb9-4040-993d-fca775c5c4ec.jpg)

Giờ chúng ta sẽ đổi text The Count Is thành The Count. Sau khi save lại ở subl thì trên trình duyệt đã được thay đổi text
![](https://images.viblo.asia/2943e932-09be-419b-b7f0-f185619e8210.jpg)

Tiếp tục đổi giá trị count += từ 1 thành 20. Save sau đó click button count = 29
![](https://images.viblo.asia/3b27920c-e721-4369-b4c3-8ca8c38c9b90.jpg)

Qua 2 lần thử trên nếu các bạn để ý sẽ thấy biến count sẽ không được reset lại và vẫn + tiếp vào giá trị count cũ là 9 -> 29. Đó chính là tính năng Hot Reload. Tính năng được mô tả ở docs như sau

> "Hot Reload" is not simply reloading the page when you edit a file. With hot reload enabled, when you edit a *.vue file, all instances of that component will be swapped in without reloading the page. It even preserves the current state of your app and these swapped components! This dramatically improves the development experience when you are tweaking the templates or styling of your components.

Để sử dụng hoặc disabled chúng ta sẽ 
![](https://images.viblo.asia/02d833ac-9599-4d63-8a43-4b2970fc17e9.jpg)


Vậy có nghĩa là tính năng này chỉ tồn tại ở môi trường dev. 


Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn những phần khác của Vue2, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!