#  Android Q là gì? Adroid Q có phải Android 10?
Mỗi năm Google sẽ gới thiệu đến người dùng một hệ điều hành mới theo tên gọi của một món bánh tráng miệng và được sắp xếp theo thứ tự Anphabe. Phiên bản 2018 có tên gọi Android 9 Pie hay còn gọi Android P vậy nên theo quy luật tên gọi hệ điều hành Android 2019 thứ 10 này sẽ bắt đầu bằng chữ cái Q.
Tuy nhiên, năm nay Google chỉ gọi là Android 10 mà không có đặt tên theo món ăn nào cả.

Android 10 là phiên bản kế nhiệm của Android Pie. Phiên bản này sẽ được giới thiệu tại sự kiện Google I/O 2019 vào ngày 7/5. Và chính thức ra mắt ngày 4/9/2019 với nhiều tính năng mới bổ ích. Hôm nay mình sẽ chia sẻ tới mọi người một số tính năng mà mình thấy là hữu ích nhật trong **Android10** mà chúng ta nên chú ý.
# 1. Nhận diện khuôn mặt 3D
Theo nguồn tin mới nhất, Google sẽ tham gia vào đường đua bảo mật trên smartphone với việc tích hợp tính năng nhận dạng khuôn mặt trên phiên bản Android Q của mình.
![](https://images.viblo.asia/6b8d1ebb-9205-4a38-9b3e-ecdfd6fbac1b.jpg)
Người dùng sẽ có thể sử dụng công nghệ mới này để mở khóa điện thoại, mua hàng và đăng nhập vào ứng dụng. Bên cạnh đó, họ vẫn có thể đặt mật khẩu, mã PIN làm phương thức xác thực dự phòng nếu tính năng mở khóa bằng khuôn mặt không thành công.

Việc cập nhật tính năng bảo mật này trên hệ điều hành sẽ cho phép các nhà phát triển ứng dụng và các nhà sản xuất smartphone dễ dàng tích hợp công nghệ nhận dạng khuôn mặt vào ứng dụng và thiết bị của họ.
# 2. Lưu trữ an toàn tại bộ nhớ ngoài
Đối với các nhà phát triển, có những thay đổi về cách ứng dụng của bạn có thể sử dụng các phần được chia sẻ trên external storage


* Để cung cấp cho người dùng quyền kiểm soát nhiều hơn đối với các file (tệp) của họ và để hạn chế sự lộn xộn của file, Android 10thay đổi cách các ứng dụng có thể truy cập các tệp trên bộ nhớ ngoài (external storage) của thiết bị. Android 10 thay thế các quyền (permission) READ_EXTERNAL_STORAGE và WRITE_EXTERNAL_STORAGE bằng các quyền cụ thể hơn, cụ thể hơn về các permission riêng biệt liên quan đến media và các ứng dụng truy cập các tệp trên external storage sẽ không yêu cầu quyền cụ thể.
* Android 10 cung cấp cho mỗi ứng dụng một isolated storage sandbox (1 bộ nhớ đặc biệt của ứng dụng) được lưu trữ riêng biệt vào external storage, chẳng hạn như /sdcard. Sẽ không có ứng dụng nào khác có thể truy cập trực tiếp vào các tập tin trong isolated storage sandbox của ứng dụng của bạn. Vì các tệp là riêng tư đối với ứng dụng của bạn, và bạn không còn cần bất kỳ quyền nào để truy cập và lưu các tệp của riêng bạn trong bộ nhớ ngoài. Thay đổi này giúp dễ dàng duy trì quyền riêng tư của các tệp của người dùng và giúp giảm số lượng quyền mà ứng dụng của bạn cần.
> Lưu ý: Nếu người dùng gỡ cài đặt ứng dụng của bạn, các tệp trong isolated storage sandbox của bạn sẽ được dọn sạch.

# 3.Quản lý vị trí
Với Android 10, hệ điều hành giúp người dùng có nhiều quyền kiểm soát hơn khi các ứng dụng muốn truy cập vị trí của device . Như trong các phiên bản trước của hệ điều hành, ứng dụng chỉ có thể nhận được vị trí khi ứng dụng đã yêu cầu bạn cho phép và bạn đã cấp nó . Vì thế việc truy cập vị trí của device vẫn được thực hiện kể cả ứng dụng đang chạy ở background .
Android 10 cho phép người dùng cấp cho ứng dụng quyền xem vị trí **never**, **only when the app is in use** (running) hoặc **all the time**( kể cả ở background).

![](https://images.viblo.asia/7db6bde8-32e7-4b09-95e6-a0bc4467e8d4.png)
Hộp thoại này cho phép người dùng cấp quyền truy cập vị trí cho hai phạm vi khác nhau: khi sử dụng (foreground only) hoặc mọi lúc (foreground and background). Để hỗ trợ kiểm soát mà người dùng có quyền truy cập vào thông tin vị trí của ứng dụng, Android 10 giới thiệu quyền truy cập vị trí mới, ACCESS_BACKGROUND_LOCATION. Không giống như các quyền ACCESS_FINE_LOCATION và ACCESS_COARSE_LOCATION  hiện có, quyền mới chỉ ảnh hưởng đến quyền truy cập của ứng dụng vào vị trí khi nó chạy ở chế độ background. Một ứng dụng được coi là ở chế độ background trừ khi một trong các hoạt động của nó visible hoặc ứng dụng đang chạy foreground service.

# 4. Tính năng Live Captions
Một tính năng hữu ích được Google tích hợp vào Android Q đó là Live Captions, cho phép thêm các chú thích trực tiếp vào video đang được trình chiếu trên các thiết bị chạy Android 10. Tính năng này cũng có thể hiển thị trực tiếp phụ đề cho những nội dung đang được nói trên video, cho phép người xem có thể hiểu được những gì đang xảy ra trên đoạn video trong trường hợp đang xem video ở nơi đông người không thể nghe được tiếng... theo Google, tính năng này còn thực sự hiệu quả với những ai gặp vấn đề về thính giác không thể nghe rõ được âm thanh trong video vẫn có thể hiểu được nội dung của đoạn video đó.
![](https://images.viblo.asia/7cddd2ff-7cf3-42e7-8975-e339b66dd659.jpg)
Tính năng thú vị này có thể kích hoạt ở bất kỳ video nào, cho dù người dùng xem trên web hoặc trên ứng dụng... Live Captions sẽ tự động nhận diện và phân tích nội dung của video để đưa ra lời chú thích trực tiếp khi video đang trình chiếu. Các nội dung chú thích được ghi dưới dạng chữ viết nổi bật trên file video.
# 5. Thay thế hoàn toàn nút quay lại bằng cử chỉ vuốt
Khi Android 9 Pie ra mắt vào năm 2018, Google bắt đầu cho thấy những nỗ lực đầu tiên trong việc loại bỏ nút bấm điều hướng. Lý do thôi thúc Google làm điều này, không ai khác chỉ có thể là Apple: trước trào lưu điện thoại màn hình viền mỏng đang lên ngôi, thao tác cử chỉ của iPhone là phù hợp, hiện đại và tân tiến hơn rất nhiều so với những nút bấm ảo của Android.
Mặc dù vậy, Android Pie nhận được nhiều lời chỉ trích hơn là khen ngợi khi tất cả những gì Google làm là loại bỏ nút Recents và gán nó vào thao tác vuốt từ nút Home trong khi nút Back vẫn giữ nguyên vị trí.


Hiện tại, Google đã hoàn tất bộ điều hướng bằng cử chỉ vuốt, thay thế cho ba phím truyền thống trước đây. Trong đó bao gồm nút home kéo dài (đã được làm nhỏ hơn) và biểu tượng mũi tên khi thực hiện cử chỉ vuốt để quay lại trên màn hình, bạn có thể điều chỉnh độ nhạy nhằm tránh thao tác nhầm, đồng thời thêm tùy chọn kiểu điều hướng mà người dùng mong muốn (điều hướng bằng cử chỉ hoặc ba phím truyền thống).
* Home: Nếu bạn muốn về màn hình chính, tất cả những gì phải làm là vuốt nhanh từ phía dưới màn hình phía thanh home ngang lên trên.

![](https://images.viblo.asia/b6d47879-cd41-49de-ae42-4808758357a8.gif)
* Cửa sổ đa tác vụ: Khi đang vuốt để về màn hình chính, nhấn giữ ngón tay trên màn hình một giây thay vì bỏ tay ra sẽ đưa bạn đến cửa sổ đa tác vụ. Từ đây bạn sẽ thấy một danh sách bao gồm những ứng dụng gần đây và có thể cuộn ngang để xem tất cả những gì bạn đã mở.

![](https://images.viblo.asia/778f3efa-e92b-4c5b-8126-648dcea2b535.gif)
* Chuyển đổi giữa các ứng dụng: Vuốt qua trái hoặc phải trên thanh điều hướng để chuyển giữa các ứng dụng thay vì phải vào cửa sổ đa tác vụ.

![](https://images.viblo.asia/539aadae-1a9e-46e9-a166-9e8b09895022.gif)

* Back: Đây là thứ mà Google không thể sao chép được từ iPhone, hay nói một cách khác là iPhone không có để mà sao chép. Vì vậy, Google chuyển sang sao chép các hãng sản xuất của Trung Quốc như Xiaomi, Huawei với thao tác vuốt từ cạnh màn hình. Dù vậy Google co thay đổi đôi chút khi cho phép người dùng vuốt không chỉ riêng cạnh trái mà là cả cạnh phải màn hình nữa.

![](https://images.viblo.asia/ced7e0d2-680d-4b62-a730-0e6558114fe3.gif)
* Kích hoạt Google Assistant: Do không còn nút Home nên để kích hoạt trợ lý ảo, bạn phải vuốt chéo từ góc dưới bên trái hoặc góc dưới bên phải màn hình. Sẽ có những chỉ báo ở hai cạnh để giúp bạn nên vuốt từ phía nào.

![](https://images.viblo.asia/441c3e56-5cc1-48f0-91c0-8f34cf9ba7fa.png)

**Ảnh hưởng đến menu điều hướng của ứng dụng**

Với nút Back, việc vuốt từ cạnh trái hay cạnh phải có thể gây ra vấn đề với một số ứng dụng có menu trượt ra từ hai cạnh của màn hình khiến menu này không thể trượt ra được (các hãng sản xuất như Xiaomi, Huawei cho phép người dùng vuốt từ cạnh trái để quay lại nhưng chỉ là ở nửa dưới màn hình còn khi vuốt ở nửa trên menu vẫn sẽ hiện ra).

![](https://images.viblo.asia/796f6f71-88a8-43a4-a980-0ffcd08b53c0.gif)

Để khắc phục vấn đề này, kể từ Android 10 Beta 5, Google đã giới thiệu một tính năng gọi là "peek behaviour" để người dùng mở được menu trượt này. Có hai cách thực hiện:
* Giữ ngón tay ở cạnh màn hình, đợi cho menu trượt lộ ra, sau đó tiếp tục vuốt ngón tay để kéo menu ra.
![](https://images.viblo.asia/4cb756d7-3aec-4548-8762-f4f1d3a7b702.gif)
* Sử dụng hai ngón tay để kéo menu ra.

> Trên các bản Android 10 Beta, ngoài hệ thống cử chỉ đầy đủ, người dùng vẫn có thể chuyển sang hệ thống điều hướng khác như hệ thống điều hướng hai nút của Android Pie hay hệ thống điều hướng ba nút cổ điển.

# 6. Tích hợp tính năng quản lý smartphone dành cho phụ huynh

Android 10 cũng được tích hợp tính năng tính năng với tên gọi Family Link, cho phép các bậc phụ huynh quản lý thời gian sử dụng smartphone của con cái bằng cách giới hạn thời dùng các ứng dụng trong ngày. Sau khi hết thời gian đã thiết lập, các ứng dụng đó sẽ không được tiếp tục chạy cho đến ngày hôm sau.
Một điều khá thú vị của tính năng này đó là cho phép các bậc phụ huynh ban thêm “đặc ân” 5 phút sử dụng sau khi đã hết thời gian giới hạn. Điều này cho phép trẻ có thể chạy thêm ứng dụng trong 5 phút để có thể lưu lại các nội dung đang chạy trên ứng dụng.

![](https://images.viblo.asia/e69f371e-6af5-49a3-864c-8f6cd8e542ba.jpg)
# 7. Chặn thu thập thông tin trái phép
Trên Android 10, bạn có thể thiết lập quyền riêng tư của từng ứng dụng, bởi vì giờ đây nó đã được tách ra làm một phần riêng biệt trong cài đặt.
![](https://images.viblo.asia/040e03d2-f6a9-477d-b947-70b93b4947f9.jpg)

# 8. Chế độ tối Dark Mode trên toàn hệ thống
Chế độ Dark Mode là tính năng được người dùng rất yêu thích và hiện đã được tích hợp trên nhiều ứng dụng và phần mềm. Bắt kịp xu hướng, Android 10 dự kiến sẽ bổ sung tính năng này trên toàn hệ thống, cho phép người dùng dễ dàng bật/tắt thông qua menu cài đặt.
Bạn có thể tùy chỉnh kích hoạt tính năng này dựa trên thời gian thực hoặc bật/tắt thủ công nếu muốn. Khi được bật, tất cả các ứng dụng sẽ có tông màu xám đậm, trong khi các bảng cài đặt sẽ có nền màu đen.
Tính năng này còn được dự đoán sẽ hỗ trợ các ứng dụng của bên thứ ba, hứa hẹn sẽ là một tin vui cho cả người dùng và các nhà phát triển ứng dụng. Dark Mode sẽ giúp tiết kiệm pin, bảo vệ mắt và mang đến cái nhìn mới mẻ hơn cho thiết bị của bạn.
![](https://images.viblo.asia/9db017bd-b5fa-4af2-a145-922d89e33c98.jpg)
# 9. Hỗ trợ màn hình gập
Điện thoại thông minh có thể gập lại đang là một lĩnh vực rất nhiều công ty tập trung nghiên cứu và Android 10 cũng có thể hỗ trợ cho dòng điện thoại mới này. Hệ điều hành được thiết kế để cho phép chuyển đổi liền mjach giữa màn hình trong và ngoài, đa nhiệm tốt hơn trên màn hình lớn hơn và thích ứng với mọi kích thước màn hình.
{@embed: https://www.youtube.com/watch?v=4dIULf4ma_I}
# Tổng kết
Android 10 Q đang cố gắng cải thiện những ý tưởng mà chúng ta từng nhìn thấy nhưng chưa thực sự mang lại nhiều giá trị trên Android 9 Pie: Digital Wellbeing, tăng cường ứng dụng AI (trí tuệ nhân tạo) và điều hướng bằng cử chỉ.
Với sự ra đời của Project Mainline, người dùng có thể kỳ vọng vấn đề cập nhật bảo mật chậm sẽ được giải quyết, dù có lẽ Android sẽ không bao giờ hỗ trợ cập nhật phần mềm lâu dài như iOS.
Mặt khác, đã không có chủ đề lớn nào được tìm thấy và cũng không có sự thay đổi mô hình nào trong điện toán di động. Ngoài ra, Google cho biết Android đã sẵn sàng cho 5G, đồng thời cam kết hỗ trợ các thiết bị màn hình gập.
Cuối cùng, Android Q đã giới thiệu được những tính năng thực sự hữu ích và hấp dẫn như Live Caption hay Focus Mode.

Tham khảo: {@embed: https://www.youtube.com/watch?v=vnt6GBmnpjE}