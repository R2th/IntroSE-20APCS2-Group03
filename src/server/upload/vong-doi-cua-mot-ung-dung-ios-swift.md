> ### Vòng đời của một ứng dụng iOS trải qua rất nhiều trạng thái khác nhau, sau đây chúng ta sẽ cùng nhau tìm hiểu về các trạng thái đó:
> ### 
![](https://images.viblo.asia/dd4a85a3-7050-4e6c-ad7d-fd83afc9b882.png)


>  Mọi ứng dụng iOS chạy trên các thiết bị đều có các trạng thái chuyển đổi như: **Not running, In active, Active, Background, Suspended**. Tại bất kì thời điểm nào, app của bạn đều rơi vào các trạng thái trên:
> 


| Trạng thái |Diễn tả |
| -------- | -------- | -------- |
| **Not running**	     |  
| **Active (Foreground)**	  |Trạng thái khi chương trình đang hoạt động bình thường	    |  
| **Inactive (Foreground)**	  |Tại trạng thái **Active**, nếu chương trình nhận được các sự kiện từ hệ thống như có tin nhắn mới, có điện thoại, thì ứng dụng sẽ chuyển sang trạng thái **Inactive**	    |  
| **Background**	  | Khi người dùng ấn phím **Home**, chương trình sẽ chuyển sang trạng thái **background**, ở trạng thái này ứng dụng hoàn toàn không hiển thị với người dùng, tuy nhiên các dòng lệnh vẫn được thực thi	    |  
| **Suspended**	  |Ứng dụng nếu ở trạng thái **background** sau 5 - 10 giây thì sẽ bị "đóng băng" tạm thời, và ứng dụng chỉ thoát khỏi đóng băng khi người dùng chạy lại chương trình|


> **Chúng ta có thể bắt được sự thay đổi trạng thái của app qua các hàm trong AppDelegate sau đây:** 
>
![image.png](https://images.viblo.asia/725bfb4a-d745-4dc4-be8d-7fa813ea6525.png)

- **didFinishLaunchingWithOptions**: Method này được gọi trước khi giao diện của app được hiển thị. Bạn có thể hoàn thiện giao diện của mình và cung cấp root viewcontroller trong method này.

- **applicationDidBecomeActive**: Method này được gọi để báo cho app của bạn biết khi nó chuyển trạng thái từ InActive sang Active. Bạn nên dùng method này để chạy lại các tác vụ đang bị dừng(hoặc chưa chạy) khi app bắt đầu chạy lại.

-  **applicationWillResignActive** : Method này được gọi để báo cho app biết rằng nó sắp chuyển từ trạng thái Active sang InActive. Bạn nên dùng method này để dừng các task đang chạy hoặc vô hiệu hoá timer trong app.

- **applicationDidEnterBackground** : Method này được gọi để báo cho app biết nó đang không chạy ở dưới Foreground. Bạn có khoảng tầm 5 - 10 giây để thực thi các task. Nếu như method của bạn không được thực thi và trả về trước thời gian hết hạn thì app sẽ bị hệ thống chấm dứt và xoá khỏi bộ nhớ.

- **applicationWillEnterForeground**: Method này được gọi như là 1 phần trong việc chuyển trạng thái từ Background sang Acitive. Bạn nên dùng method này để hoàn thành các thay đổi đối với app trước khi nó xuống Background. applicationDidBecomeActive sẽ được gọi ngay khi method này đã hoàn thành việc chuyển trạng thái của app từ InActive sang Active.

- **applicationWillTerminate**  --- Method này được gọi khi app của bạn sắp bị hệ thống khai tử khỏi bộ nhớ. Bạn nên dùng method này để thực thi các tác vụ dọn dẹp. Bạn có tầm khoảng 5 giây để thực thi tác vụ. Nếu hàm của bạn không trả về trước thời gian hết hạn, hệ thống sẽ tự động khai tử app kèm cả task đang thực thi của bạn khỏi bộ nhớ. Method này cũng được gọi trong trường hợp app đang chạy ở dưới background( không bị suspended) nhưng hệ thống lại cần phải huỷ nó vì vài lí do gì đó. Bạn không nên đợi applicationWillTerminate được gọi rồi mới lưu lại data. Trong một vài trường hợp hi hữu, applicationWillTerminate sẽ không được gọi trước khi áp bị khai tử (ví dụ trong trường hợp thiết bị của bạn reboot lại thì method này sẽ không được gọi).

> hoặc các trạng thái của app khi có **SceneDelegate** (hoạt động từ iOS 13 trở lên):
> 
![image.png](https://images.viblo.asia/1e90b950-5bda-45f3-acdf-97ea8171a042.png)

**Việc hiểu biết về các trạng thái sẽ giúp ích rất nhiều cho các bạn developer iOS, bài viết này sẽ giúp các bạn nắm được những điểm cơ bản nhất vòng đời của một ứng dụng iOS.**