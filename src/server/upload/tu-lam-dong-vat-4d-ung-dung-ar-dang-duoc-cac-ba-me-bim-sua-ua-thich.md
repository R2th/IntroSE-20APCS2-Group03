![](https://images.viblo.asia/4b608a05-b496-4d7f-a177-a6bc351046e3.jpg)

Chào các bạn, hôm rồi đang ngồi làm việc thì thấy mấy bạn nữ ngồi cạnh chia sẻ nhau về 1 ứng dụng hay ho lắm, thích thú lắm, mà toàn các Mẹ bỉm sữa :v

Mình có ngó qua thì thấy đó là 1 ứng dụng AR, nó giúp các Mẹ có thể dậy cho trẻ biết những loài động vật 1 cách trực quan hơn, với những hình ảnh 3D kết hợp với môi trường thực tế bên ngoài.

Mình thấy cũng thú vị, nghịch cái này cũng vài năm rồi mà nghĩ chắc ko ai thích đâu, giờ thấy có người để ý vì vậy mình viết 1 bài hướng dẫn tự làm cái app đó luôn, vừa là để ôn lại kiến thức luôn ^_^

Trong bài này mình sẽ sử dụng công cụ hết sức quen thuộc đó là Vuforia, một trong những lib đầu tiên mình biết tới khi tìm hiểu về AR.

Bắt đầu thôi nào ^_^

Note: Trong bài viết này mình sử dụng Unity 2019 vì vậy 1 số bước sẽ khác so với các bản Unity 2018 và Unity 5, các bạn có thể để lại comment mình sẽ hướng dẫn nếu thấy có sự khác biệt nhé!

Bước 1: Download Vuforia Plugin:

- Sau khi bật Unity lên các bạn ấn Windows -> Vuforia Configuration.

![](https://images.viblo.asia/424fc838-4ce7-44ea-aee9-1c0bb682a983.JPG)

![](https://images.viblo.asia/64395fa3-816d-4a0f-9585-3f68bf3fc7e8.JPG)

- Bạn thấy có thông báo Vuforia is not enabled thì ấn vào Edit -> Project Settings -> Player -> XR Settings -> check vào checkbox của Vuforia Augmented Reality Supported -> Agree khi có popup hiện ra.

![](https://images.viblo.asia/a6452a82-b5fb-4a72-b116-c406c803b72b.JPG)

![](https://images.viblo.asia/118ccdb2-7d0b-4583-b4f0-8941265eb54d.JPG)

- Lúc này ở tab Inspector Vuforia đã được enable, nhưng nếu có thông báo yêu cầu update lên bản cao hơn thì bạn cứ tự tin mà ấn vào nút Download Vuforia Engine nhé ;)

![](https://images.viblo.asia/7ce2a0f2-88c8-4b65-afbb-28502ea24856.JPG)

Bước 2: Tạo License cho Vuforia.

- Bạn ấn vào nút Add Licesen nó sẽ đưa các bạn tới trang developer.vuforia.com để login và tạo License.

![](https://images.viblo.asia/731455a4-157c-40ec-b278-73c435073c7a.JPG)

- Bạn ấn Login, sau đó đăng nhập hoặc tạo tài khoản mới để có thể vào bên trong tạo License.

![](https://images.viblo.asia/0ef491dd-37b0-4e5f-a314-a73026a5b87c.JPG)

- Bạn ấn vào nút Get Development Key để tạo 1 License mới.

![](https://images.viblo.asia/2b1d9683-0381-4a89-b97d-9be9a664679c.JPG)

- Bạn điền tên License, check vào checkbox phía dưới rồi ấn Confirm.

![](https://images.viblo.asia/5b00eaee-acb0-4d9c-a224-e8b454b7fe84.JPG)

- Bạn ấn vào tên License vừa tạo để thấy được License của mình.

![](https://images.viblo.asia/a4af661a-4362-4ab9-850f-12007f921c05.JPG)

![](https://images.viblo.asia/d7b5306b-2710-4f57-ac0a-bf82d380bd83.JPG)

- Copy License đó vào trong Unity phần App License Key.

![](https://images.viblo.asia/21ebf35a-9407-4634-8113-a942bfa3d7d3.JPG)

Bước 3: Tạo Database cho Vuforia:

- Bạn ấn vào nút Add Database phía bên dưới để được dẫn tới trang web tạo database cho Vuforia nhé.

![](https://images.viblo.asia/e8a01489-84e9-416c-a448-b25cad17cc80.JPG)

- Bạn ấn vào nút Add Database trên web, sau đó điền tên database, rồi chọn device, ấn create.

![](https://images.viblo.asia/55469d04-34c6-464e-8547-674125f9e3b3.JPG)

![](https://images.viblo.asia/4d17304e-30db-4714-a07a-234d28d6152a.JPG)

- Ấn vào chọn Database vừa tạo để vào bên trong tạo target.

![](https://images.viblo.asia/4e31aa0e-c91f-499b-8970-1295a821b792.JPG)

- Chọn Type là Single Image, File chọn tới 1 file ảnh bất kì (hãy chọn file ảnh có liên quan tới con vật bạn muốn hiển thị), điện kích thước độ rộng của nhân vật, tên của Target rồi ấn Add.

![](https://images.viblo.asia/94fec33d-4f61-436e-924b-d655d08ebd65.JPG)

![](https://images.viblo.asia/ec412867-04c6-4602-8ab6-2881c69ec4db.JPG)

- Ấn nút Download Database (All) để lấy database đó về cho vào trong Unity.

![](https://images.viblo.asia/1576b8a7-f953-43b6-af14-e32b419786aa.JPG)

- Chọn Unity Editor khi popup hiện ra.

![](https://images.viblo.asia/7a00d0fb-2c9a-4c7f-8898-417ec9ba87c1.JPG)

- Ấn open sau khi đã download thành công để import vào trong Unity.

![](https://images.viblo.asia/6afbc36f-8dd8-42bc-85f9-31ee32ece668.JPG)

![](https://images.viblo.asia/05a21488-3b7f-4ce1-af0c-930aa9d8c521.JPG)

Bước 4: Tạo ARCamera và Thêm Target vào trong Scene.

- Các bạn tạo ARCamera trong Hierarchy.

![](https://images.viblo.asia/a61f70e6-4dd4-4189-9ad2-394b7d5d1ceb.JPG)

![](https://images.viblo.asia/47c3974a-66b7-4ead-b2c9-2a99a96e3f72.JPG)

- Tạo Image Target bằng cách vào GameObject -> Vuforia Engine -> Image.

![](https://images.viblo.asia/02ea003b-33a3-4ce8-84cb-88f756df8f92.JPG)

- Đưa 1 model 3D vào trong đối tượng ImageTarget (khi quét camera vào ImageTarget thì sẽ hiện ra đối tượng 3D này trên màn hình)

![](https://images.viblo.asia/29394bae-b5e3-4faf-90e4-f8c8acd3ea5d.JPG)

Bước 5: Build ra và test.

- Vào File -> Build Settings -> chọn Android (để build ra Android test, nếu các bạn dùng IOS thì switch qua IOS nhé) -> Switch Platform.

- Đợi cho tới khi Switch hoàn thành bạn hãy ấn Build rồi cài vào máy và test nhé!

Hi vọng thông qua bài viết này, các bạn sẽ có thể tự làm những món quà nho nhỏ cho các bé nhà mình nhé ^_^