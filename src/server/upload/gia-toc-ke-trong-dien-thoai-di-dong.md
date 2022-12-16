### Gia tốc kế 
Gia tốc kế là một bộ phận tích hợp để đo gia tốc của bất kỳ thiết bị di động nào. 
Các chuyển động như đong đưa, nghiêng, xoay, lắc được phát hiện bằng gia tốc kế. 
Giá trị của XYZ được sử dụng để tính toán và phát hiện các chuyển động.
Bên cạnh di động, gia tốc kế được sử dụng để đo độ rung trên xe hơi, máy móc, tòa nhà, hệ thống kiểm soát quá trình và lắp đặt an toàn.

### Làm thế nào để đo gia tốc?

Gia tốc kế trong thiết bị di động cung cấp các giá trị tọa độ XYZ, được sử dụng để đo vị trí và gia tốc của thiết bị.
Tọa độ XYZ đại diện cho hướng và vị trí của thiết bị mà tại đó gia tốc xảy ra. 
Hướng quay và vị trí được đo bằng các cảm biến con quay hồi chuyển . Phần còn lại của thiết bị di động bao gồm gia tốc do trọng lực (g = 9,81m / s2) và giá trị gia tốc. 
Các giá trị gia tốc được cung cấp bởi thiết bị thường bao gồm lực hấp dẫn. 
Gia tốc kế cùng với gia tốc tuyến tính và con quay hồi chuyển sẽ cho kết quả có độ chính xác cao hơn. 
Gia tốc tuyến tính không bao gồm lực hấp dẫn. 
Giá trị gia tốc được chuyển vào các bộ lọc thông thấp / cao để tinh chỉnh kết quả, dựa trên ứng dụng đã được sử dụng.

### Sử dụng gia tốc kế trong thiết bị Android

khởi tạo trình quản lý cảm biến và cảm biến gia tốc.

```
 sensorManager = (SensorManager) getSystemService (Context.SENSOR_SERVICE);
 sensor = sensorManager.getSensorList (Sensor.TYPE_ACCELEROMETER) .get (0); 
```
 
 Đăng ký bộ cảm biến nghe ghi lại gia tốc. Đăng ký ở chế độ GAME để đo bộ tăng tốc cao hơn để phát triển trò chơi hoặc sử dụng chế độ NORMAL để đo gia tốc bình thường hoặc sử dụng chế độ FASTEST để đo dữ liệu nhanh nhất có thể.
 
`sensorManager.registerListener (accelerListListener, sensor, SensorManager.SENSOR_DELAY_GAME); `

```
private SensorEventListener accelerationListener = new SensorEventListener() {
@Override
public void onAccuracyChanged(Sensor sensor, int acc) {
}
@Override
public void onSensorChanged(SensorEvent event) {
final float alpha = 0.8f;
//gravity is calculated here
gravityV[0] = alpha * gravityV[0] + (1 - alpha) * event.values[0];
gravityV[1] = alpha * gravityV[1] + (1 - alpha)* event.values[1];
gravityV[2] = alpha * gravityV[2] + (1 - alpha) * event.values[2];
//acceleration retrieved from the event and the gravity is removed
x = event.values[0] - gravityV[0];
y = event.values[1] - gravityV[1];
z = event.values[2] - gravityV[2];
}
}
```
Tất cả hoạt động được thực hiện trong hàm "onSensorChanged". Ban đầu trọng lực được tính toán để nó có thể được loại bỏ khỏi các giá trị gia tốc, nếu cần thiết. Lực hấp dẫn được loại bỏ sẽ cho độ chính xác cao trong việc đo gia tốc, sự sai lệch về gia tốc là ít hơn khi so sánh với các đo có trọng lực.

Giá trị XYZ thay đổi đối với mọi gia tốc (cho mỗi 20 ms). Vì vậy, việc lặp lại các giá trị được chuyển vào bộ lọc thông thấp / cao sẽ giúp ta biết được hành vi người dùng điện thoại đang đi bộ, chạy, chạy bộ, v.v.