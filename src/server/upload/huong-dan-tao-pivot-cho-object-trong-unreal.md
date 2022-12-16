Chào các bạn, đợt này có nhiều thời gian mình có nghiên cứu về Unreal, vì vậy cơ bản thì kiến thức của mình cũng có chút giới hạn, mình chia sẻ ở góc độ biết gì nói đó, vì vậy mong ae nhẹ tay! ^_^

Trong quá trình nghiên cứu Unreal mình có kiếm 1 số model từ trên mạng về, tất nhiên là vì đồ free có cũng có 1 số vấn đề. Một trong những vấn đề đó là Pivot của tất cả các Object trong cái Model đó đều là 0 nhưng vị trí trên Map nó lại khác nhau :v (hiểu đơn giản thì Pivot nó ko nằm trên Object)

Vì bên Unity mình làm thì thấy cái này nó ko phải vấn đề gì cả, nhưng qua đây mò hoài ko chỉnh được, search thì ae trên mạng chỉ đề cập đến 1 cách là ấn ALT+Ctrl+Middle Mouse Button, nhưng nó dở ở chỗ chỉ để giải quyết vấn đề sắp xếp trên Editor thôi, chứ trong code hay blueprint nó lại quay lại vị trí cũ.

Mò mẫm khá nhiều thời gian, cuối cùng thấy có 1 thanh niên có cái mẹo hay quá, vì vậy chia sẻ ae luôn ^_^

### Bước 1: Chuẩn bị model.
- Tất nhiên là phải chuẩn bị rồi, vì ko có model thì biết chỉnh pivot cho cái gì đây ^_^
- Các bạn import model vào trong dự án nhé!

![](https://images.viblo.asia/b234c458-0e51-4a5a-adb0-74b31044771c.png)


### Bước 2: Tạo 1 Object mặc định bất kỳ trong Unreal.
- Các bạn có thể tạo Cude, Sphere, Cylinder, Cone gì cũng được, mục đích chính là sử dụng nó làm điểm set Pivot thôi vì vậy sau này nó cũng ko hiện trong game đâu.
- Các bạn kéo Object vừa tạo tới vị trí muốn set Pivot cho Model ở trên, sau đó set scale cho nó nhỏ nhất có thể sao cho trong game ko thể nhìn thấy.

![](https://images.viblo.asia/9643d025-f330-43c6-ad99-333db88c4c0c.png)
![](https://images.viblo.asia/8ffba7af-4e4e-48bd-bb3e-f7dea6f7be5c.png)


### Bước 3: Merge Object.
- Bước cuối cùng, các bạn sẽ merge Object và Model lại để được 1 Model mới có Pivot tại vị trí của Object vừa set ở bước 2.
- Chú ý, khi merge cần chọn Object trước sau đó mới chọn Model.
- Các bạn thao tác theo các bước sau: Window -> Developer Tools -> Merge Actors -> Chọn Object -> Chọn Model -> Ấn Merge -> chọn vị trí lưu và đặt tên cho Model mới.

![](https://images.viblo.asia/bc3c1a33-dca7-4b2b-87ae-c76cfcf552e3.png)
![](https://images.viblo.asia/f42c535d-1ae7-4a40-9cfe-f341f4842be0.png)
![](https://images.viblo.asia/880dbbf7-00b6-4f81-a921-7a01aa0a87c8.png)
![](https://images.viblo.asia/7b4fffe8-7a1c-499a-a21a-24e5161a68ab.png)


=> Như vậy là xong rồi, các bạn đã có 1 Model mới giống hệt Model cũ với vị trí Pivot như mong muốn để có thể làm việc trong game rồi nhé!

![](https://images.viblo.asia/932d37e6-6a0b-4649-83a3-cdf6a282068a.png)

Chúc các bạn thành công ^_^.