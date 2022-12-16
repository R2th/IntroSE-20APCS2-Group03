# **1.Introduction**
**CakePHP** là một Framework miễn phí, mã nguồn mở, phát triển nhanh chóng khuôn khổ cho PHP. Nó có một cấu trúc cơ bản giúp cho các lập trình viên dễ dàng tạo ra các ứng dụng web. Mục tiêu chính của **CakePHP** là cho phép bạn làm việc một cách có cấu trúc và nhanh chóng mà không mất tính linh hoạt.

![](https://images.viblo.asia/8e65c582-6647-40ab-9083-2bc730ca3de5.png)

Hôm nay mình sẽ chia sẻ với các bạn một **Packages** rất hay của **Cakephp** là  [**Upgrade shell**](https://api.cakephp.org/2.10/class-UpgradeShell.html), nó dùng để upgrade version từ  1.x to 2.x.
# **2.Prerequisites**
Giả sử ứng dụng đang dùng phiên bản [CakePHP 2.5.4 released](https://github.com/cakephp/cakephp/releases/tag/2.5.4) và **php** version **5.3**, vào một ngày đẹp trời nhiều mây, khách hàng muốn nâng cấp lên version 2.10 và php version cao hơn thì làm thế nào ?

Hướng dẫn chi tiết cài đặt **cakephp** 2.x nằm ở đây anh em nhé! [Installation](https://book.cakephp.org/2.0/en/installation.html).
# **3.Getting Started**
Để giải quyết vấn đề trên thì mình sử dụng  **Packages** [**Upgrade shell** ](https://book.cakephp.org/2.0/en/console-and-shells/upgrade-shell.html). 

Cấu trúc thư mục  ứng dụng **Cakephp 2.5**:

```
myProject/
    app/             <- Your App
    lib/            <- 2.5 Version of CakePHP
    plugins/
    vendors/
    .htaccess
    index.php
```

Tiến hành **upgrade** thôi nào:

1. Install **php 7.3** và các **extensions** liên quan.
2.  Download **CakePHP 2.10.18** từ https://github.com/cakephp/cakephp/releases/tag/2.10.18 ( ở đây mình muốn nâng lên version **2.10.18**).
3. Xóa  thư mục **lib**  và sao chép  **lib**  ở phiên bản **2.10.18**  vào ứng dụng hiện tại của bạn (myProject/lib).
4. cd  **app**
5. Run  **Console/cake upgrade all**

### Lưu ý: 
* Nếu xảy ra lỗi `Permission denied` thì cần cấp quyền cho **cake**: `sudo chmod -R 777 app/Console/cake`
* Để upgrade tất cả mọi thứ trong ứng dụng: `/Console/cake upgrade all` 
* Để upgrade một plugin: `./Console/cake upgrade all --plugin YourPluginName`
* view help: `./Console/cake upgrade --help`
* Nếu bạn đặt tên **action** quá đặc biệt, liên quan đến tên các **function** của Framework thì Upgrade shell sẽ tự động thay thế sang từ khóa mà nó hiểu được. ví dụ:

    ```
    public function up() {

        }
    ```
   
   Sau khi **upgrade**:
   ```
   public function strtoupper() {

    }
    ```
    
    Nó hiểu  **up** là hàm  **strtoupper** của **php**.  =))
# **4.Testing**

![](https://images.viblo.asia/da8e99f8-868b-4788-ba42-431b2a022030.png)

**Upgrade shell** sẽ tự động upgrade tất cả mọi thứ trong ứng dụng cho bạn, việc còn lại là chúng ta sẽ deploy lại và test xem có lỗi lầm nào không( sẽ có 1 vài lỗi liên quan đến version của php).

Hy vọng bài viết sẽ giúp ích cho anh em nào muốn nâng cấp lên phiên bản cakephp 2.x cao hơn!