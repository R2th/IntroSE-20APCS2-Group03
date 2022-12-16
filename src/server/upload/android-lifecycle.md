Android có rất nhiều các components như Activity, Fragment, Service, BroadCastReceiver ... Mỗi thành phần đều có vòng đời của riêng chúng và có những thành phần mà vòng đời của chúng liên quan đến nhau. Việc hiểu được lifecycle của các components trong android sẽ giúp tránh được các lỗi thường gặp.

## Vòng đời của một Activity 
### App is finished and restarted
Trường hợp này xảy ra khi người dùng ấn vào back button hoặc ứng dụng gọi Activity.finish()
![](https://images.viblo.asia/f220cd5b-43cb-4380-a82a-facbee224ff2.png)

- method onSaveInstanceState sẽ không được gọi vì Activity lúc này đã finished
- Khi ứng dụng được mở lại thì hàm onCreate sẽ nhận đối số Bundle = null.

### User navigates away
Khi người ấn home button hoặc lựa chọn mở một ứng dụng khác 
![](https://images.viblo.asia/2ed0f0b7-53ff-47ee-865f-3252cf851f39.png)
- Method onSaveInstanceState sẽ được gọi để lưu trạng thái của ứng dụng để sử dụng khi Activity bị destroy.

### Configuration changes
Khi người dùng quay màn hình hoặc screen size bị thay đổi
![](https://images.viblo.asia/c12b8a9f-3d4a-4de4-bb56-cf6b05841bd6.png)

- Activity bị huỷ và trạng thái của activity được lưu lại khi tạo một instance mới . Hệ thống gọi 2 hàm onSaveInstanceState và onRestoreInstanceState. 
- Hàm onCreate được gọi khi activity khởi tạo lại có Bundle != null

### App is paused by the system
Một thành phần của ứng dụng khác hiển thị lên trên ứng dụng đang chạy như dialog request permission hay share dialog (Trường hợp show dialog của ứng dụng đang chạy hay xem notification từ menu không thuộc trường hợp này)

![](https://images.viblo.asia/e40be212-55b3-4fee-9fc0-2bbd075e5345.png)

## Multiple activities
### Navigating between activities

Trường hợp start một Activity mới và người dùng ấn back button để destroy activity 2 .

![](https://images.viblo.asia/c010a680-5835-4641-8fad-4eed1b65b8fc.png)

- Hệ thống gọi hàm onSaveInstanceState nhưng không gọi onRestoreInstanceState

### Activities in the back stack with configuration changes

![](https://images.viblo.asia/b8c46ee8-9697-4a00-a6ff-10206b565e9e.png)

- Tất cả các activity trong back stack đều cần restore state trong trường hợp configuration change

### App’s process is killed

Trường hợp khi hệ thống cần tài nguyên, hệ thống sẽ kill apps trong background

![](https://images.viblo.asia/2abc9ae7-082e-4296-a26c-6c1819887b51.png)

- Tất cả các activity trong back stack đều được lưu lại trạng thái . 
## Fragments
###  Activity with Fragment starts and finishes

![](https://images.viblo.asia/0e94258d-05e5-4ad4-b16b-9a2066ff2bc6.png)

- onCreate của Activity luôn được thực hiện trước nhưng một số hàm tương ứng như onStart, onResume... có thể thực hiện theo thứ tực khác nhau không phải lúc nào hàm của Activity cũng được gọi trước.

### Activity with Fragment is rotated
![](https://images.viblo.asia/4a3e327c-64ad-4005-ab62-4a6871f6574c.png)

- Fragment được save và restore state tương tự như Activity chỉ có một điểm khác là trong fragment không có hàm onRestoreInstanceState. Bundle != null tại onCreate, onCreateView, onActivityCreated.

Tham khảo:
- https://medium.com/google-developers/the-android-lifecycle-cheat-sheet-part-i-single-activities-e49fd3d202ab