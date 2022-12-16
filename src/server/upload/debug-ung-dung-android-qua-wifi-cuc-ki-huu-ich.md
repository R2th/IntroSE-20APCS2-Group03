![](https://images.viblo.asia/cf49bf77-fafd-410f-8a26-db8903f270e7.jpg)

 Hôm nay, Mình xin giới thiệu cho mọi người một Tip siêu hay trong **debug ứng dụng Android** . 
Chắc hẳn đối với những anh em lập trình ứng dung Android thì việc mong muốn Debug ứng dụng của mình lên device thật là điều hàng ngày. Vì đơn giản khi debug trên máy thật sẽ giúp biết được ứng dụng hoạt động thật nhất khi đến tay user.

Mọi người sẽ nghĩ:  "Ôi dào, cắm cable vào là xong chứ gì, có gì mà Tip nào?".

Đúng là vậy, nhưng khi cắm cable vào thì sẽ có một số hạn chế sau:

1.  Không phải lúc nào cũng có đủ cable cho tất cả mọi người.
2.  Cable dùng được một thời gian sẽ bị lỏng, dẫn đến device lúc nhận lúc không.
3.  "Dây dợ loằng ngoằng, vướng víu".

Thật may cũng có vô vàn Developer Android cũng than trời kêu đất như bạn. Và đó là lúc một plugin thần thánh ra đời: **Android wifi adb** .

Cái tên nói nên tất cả. Nghe cái là mình cũng biết là plugin này sẽ giúp mình **Debug ứng dụng Android thông qua Wifi** .
# How It works

Lan man quá. Nhưng phải nói vậy các bạn mới biết mình yêu quý  **Plugin Android wifi adb** này chừng nào.
## Bước 1: 
Trong Android Studio bạn chọn `File -> Settings`

![](https://images.viblo.asia/5aa5e31a-06cf-4362-8f2f-0d4117ab8195.png)
## Bước 2:
Đi đến `Plugins`  và chọn `Browse repository`  . Tiếp theo trên thanh tìm kiếm hãy tìm kiếm với Keyword "Android Wifi adb". Cài đặt Plugin này.

![](https://images.viblo.asia/a6d80f27-e381-4d65-8b2c-65e8e0f7422a.png)
## Bước 3:
Để đảm bảo Plugin hoạt động bạn cần Restart Android Studio. Sau khi restart bạn hãy nhìn sang bên phải sẽ thấy một phần của **Android wifi adb**.
Tới bước này các bạn cần kết nối Wifi device của bạn tới cùng mạng với máy tính đang debug ứng dụng android. 

Chờ đã! Nhưng làm sao máy tính của tôi biết là cần debug trên thiết bị Android nào của tôi nhỉ?:question::question::question:.Lúc này thì bạn vẫn kết nối máy tính của bạn với device thông qua cable. Sau khi kết nối thì bạn chỉ chọn đúng tên device bạn đang cắm vào rồi chọn nút "connect" . Xong, Bây giờ bạn có thể rút cable.  Android Studio của bạn đã có khả năng Debug qua Wifi.

![](https://images.viblo.asia/7766a069-b9a0-40f1-97c0-8e27286703af.png)

Xong rồi đó. Bạn lại thêm một cẩm nang bỏ túi xịn sò. Mà mình đoán là các bạn ở đây sau khi biết thì sẽ sử dụng nó hàng ngày.

Thanks for Reading.