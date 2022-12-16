### I) ViewModels

Vòng đời của ```ViewModel``` khá là đơn giản, chúng chỉ có một callback duy nhất đó là ```onCleared```. Tuy nhiên có 1 sự khác biệt giữa scope của thằng này đến một activity hoặc đến một fragment:

![](https://images.viblo.asia/3b19a6d9-8f78-48d2-a482-feff7159c077.png)


```ViewModel``` với chức năng chính của nó dùng  trong việc lưu trữ và đảm bảo tính toàn vẹn của dữ liệu. Nhìn vào sơ đồ trên chúng ta có thể thấy được ```ViewModel``` vẫn còn tồn tại sau khi người dùng đã xoay màn hình thiết bị, điều này rất thuận lợi cho việc update lại UI sau khi activity hoặc fragment được khởi tạo lại. Về chi tiết của thằng ```ViewModel``` này các bạn có thể tham khảo ở các bài viết khác.

### II) Translucent Activities

Các translucent activity thường có background trong suốt, để người dùng có thể nhìn thấy những gì xảy ra bên dưới.

Sau khi thuộc tính ```android:windowIsTranslucent``` được đươc thêm vào theme của một activity,  diagram sau đây sẽ có 1 vài sự thay đổi: Đó là ```background activity``` không bao giờ gọi hàm ```onStop``` mà  chỉ gọi hàm ```onPause```, vậy nên nó vẫn có thể tiếp tục trong việc update UI.


![](https://images.viblo.asia/d2f23c8e-dd6a-4eff-895b-b578b534472a.png)

Ngoài ra khi quay trở lại 1 task (trở lại app), cả 2 activity đồng thời sẽ restored và started và chỉ có translucent activity được resumed.

![](https://images.viblo.asia/fff1b009-b960-49ec-b781-f5528b957e57.png)

### III) Launch Modes
Về cơ bản, cách đề xuất để xử lý các tasks và backstack đó là: **đừng** , thay vào đó chúng ta  nên sử dùng các behavior mặc định. Để biết thêm chi tiết hơn, các bạn có thể tham khảo topic sau: [Tasks và BackStack](https://medium.com/androiddevelopers/tasks-and-the-back-stack-dbb7c3b0f6d4) .
Nếu bạn thực sự cần sử dụng ```SINGLE_TOP```, diagram của nó như sau:
![](https://images.viblo.asia/fa67890a-1c3e-4814-9e38-684de5dc85e2.png)
<div align="center">

*Single Top Behavior*
    
</div>


Để so sánh với ```SingleTop```, chúng ta có thể nhìn vào diagram của ```SingleTask``` để thấy nó có gì khác biệt

![](https://images.viblo.asia/0537db25-3562-4e3c-abb9-bf0c25a20054.png)

### IV) Tổng kết
Nguồn tham khảo: https://medium.com/androiddevelopers/the-android-lifecycle-cheat-sheet-part-iv-49946659b094