## Làm thế nào để thay đổi darktheme mà không cần khởi tạo lại app?
## 
Đầu tiên bạn phải thêm `configChanges mode` vào activity trong file Manifest 

![](https://images.viblo.asia/98160921-6944-4f7b-b535-fc9bff5d9dc2.png)

Dòng code này sẽ ngăn việc khởi tạo lại ứng dụng khi áp dụng darktheme theo cách thủ công hoặc từ thanh thông báo, vì vậy nếu bạn đã sử dụng color-night.xml, nó sẽ bị bỏ qua vì ứng dụng của bạn không được tạo lại. 

## Vậy nếu chỉnh màu bằng tay thì sao?
## 
Ở đây mình sẽ tạo thêm các màu với tên "Night" ở cuối để phân biệt ở file `colors.xml`

![](https://images.viblo.asia/c9597ddd-b174-4f68-ae87-02fe06efd168.png)

Sau đó, vào Activity và override lại hàm onConfigurationChanged và áp dụng màu dựa trên `nightModeFlags`

![](https://images.viblo.asia/b1ef360b-39d0-426c-b409-4c9d0a126491.png)

onConfigurationChanged sẽ được gọi khi trạng thái DayNight thay đổi. VD: Khi bạn bật/ tắt chế độ darkmode trên notification bar hay thực thi bằng code 

## Vậy khi fragments nằm trong Activity thì làm sao để bắt sự kiện thay đổi?
## 
Dễ thôi, mình chỉ cần tạo một interface và các fragment sẽ kế thừa nếu muốn áp dụng darkmode

![](https://images.viblo.asia/0a4e7ea7-6014-40e3-8929-a1e58465c6e9.png)

Và fragment kế thừa interface đó

![](https://images.viblo.asia/e7dcfba2-3e39-48ea-8303-67dd34cfc89b.png)

Và bạn phải notify Fragments sự kiện đó ở Activity, mỗi khi configuration thay đổi, fragment cũng sẽ nhận được trạng thái `DayNight`

![](https://images.viblo.asia/dba862c9-ec31-48e2-bee4-b723fd9d7031.PNG)

Sử dụng bằng cách sau:

![](https://images.viblo.asia/a4fd0a60-c9eb-4ad3-81c3-119124ee5f88.PNG)


Và thành quả cuối cùng

![](https://images.viblo.asia/0f936314-d444-42dc-97d5-ffee60c5d9c2.gif)