# Phân loại
Đa ngôn ngữ trong 1 ứng dụng android được chia làm 2 loại:
* Thụ động: Ngôn ngữ ứng dụng phụ thuộc ngôn ngữ hệ thống thiết bị.
* Chủ động: Ngôn ngữ ứng dụng phụ không thuộc ngôn ngữ hệ thống thiết bị, có thể chỉnh ngay trong ứng dụng.

Tùy vào yêu cầu ứng dụng mà ta chọn 1 trong 2 cách. Ở đây mình sẽ giới thiệu cách 1 (thường được dùng nhiều hơn). Ngoài ra, bạn có thể tìm hiểu thêm cách 2 [ở đây](https://viblo.asia/p/da-ngon-ngu-trong-android-YmjvoLKyGqa).
# Hướng dẫn 
1. Tạo 1 project với Empty Activity.
2. Thêm code vào file **strings.xml** và **activity_main.xml** như sau:

    *strings.xml*

    ```
    <resources>
        <string name="app_name">MultiLanguage</string>
        <string name="hello_world">Hello World!</string>
    </resources>
    ```
    *activity_main.xml*
 
    ```
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.constraint.ConstraintLayout 
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/hello_world"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

    </android.support.constraint.ConstraintLayout>
    ```
  3. Quay lại **strings.xml**. 
    Chọn 'Open editor' trong thông báo trên đầu file, tìm và chọn biểu tượng![](https://images.viblo.asia/bbd4b4ea-558d-4d7d-9c0c-157857f098f5.png). Một danh sách xổ xuống, lúc này bạn gõ từ khóa việt nam để chọn mục ngôn ngữ Việt Nam có ảnh lá cờ.
    ![](https://images.viblo.asia/aeefb12d-ae87-42c7-bf33-c7ded3c13208.png)
 4. Cuối cùng thêm code vào file **strings.xml (vi-rVN)** (tự động sinh ra):
 
     *strings.xml (vi-rVN)*
   
     ```
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <string name="app_name">MutilLanguage</string>
        <string name="hello_world">Xin chào!</string>
    </resources> 
    ```
  
  ![](https://images.viblo.asia/8d1306be-7b09-4e53-94ce-7978f5272675.png)
#   Lưu ý
- Nếu không tìm thấy Open editor, hãy thử đóng project và mở lại nó, bạn sẽ thấy Open editor trên thanh thông báo.
- File **strings.xml** sẽ mặc định dùng nếu ứng dụng không hỗ trợ ngôn ngữ trên thiết bị.
- Mục ngôn ngữ có ảnh lá cờ là mặc định cho thiết bị.
- Download soucre code [ở đây](https://github.com/managoo/MultiLanguage)