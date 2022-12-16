## 1. Giới thiệu
![](https://images.viblo.asia/3aa7b7b2-414d-4865-af57-46a0a4160dcf.jpeg)

**Composer** là một công cụ quản lý các thư viện trong PHP (**Dependency Management**), công cụ này giúp ta tiết kiệm khá nhiều thời gian với các gói thư việ cần thiết mà project của bạn cần sử dụng, bạn chỉ cần khai báo nó, composer sẽ tự động tải code của các thư viện về thông qua một server cộng đồng.

Nhưng bạn có biết có rất nhiều thứ mà bạn có thể làm với **Composer** ngoài việc chỉ cài đặt và cập nhật các **Dependency** ?

Trong bài viết này, tôi sẽ liệt kê các tính năng như vậy để có thể giúp bạn vận dụng vào công việc cũng như các dự án của mình.
## 2. Bắt đầu
* **List the packages that are installed**
    ```
    composer show 
    ```

* **List all packages available in all your repositories.**
    ```
    composer show --all 
    ```

* **Get information about a certain package**
    ```
    composer show spatie/laravel-web-tinker
    composer show spatie/laravel-web-tinker 1.0.0 (package version)
    ```
    
 * **Navigate to package's repository URL**
    ```
    composer browse spatie/laravel-web-tinker
    ```
    
  * **Navigate to package's homepage**
    ```
    composer browse spatie/laravel-web-tinker --homepage 
    ```  
    
  * **Only show the homepage or repository URL**
    ```
    composer browse spatie/laravel-web-tinker --show 
    ```  
* **Validate**

    Bạn có thể Validate **composer.json** của dự án, giúp tìm ra các vấn đề với **composer.json** của bạn (nếu có).
    ```
    composer validate
    ```      
 * **Find outdated packages**
     
     Bạn có thể kiểm tra các **Dependency** đã lỗi thời bằng cách sử dụng:
    ```
    composer outdated
    ```         
## 3. Kết thúc
Tôi chưa bao giờ biết tất cả những tính năng thú vị này cho đến khi tôi tình cờ tìm thấy chúng. Tôi hy vọng bạn sẽ học được điều gì đó mới mẻ thông qua bài viết này !

Thân ái, chồ tộm biệt, quyết thắng !