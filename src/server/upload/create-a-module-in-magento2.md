![](https://images.viblo.asia/35b76c75-e0db-46c3-b40c-f8e7314cf430.png)

## 1.Tổng quát
* **Module** là một đơn vị cấu trúc của Magento. Toàn bộ hệ thống sẽ được xây dựng dựa trên các **Module**. Thông thường, bước đầu tiên để custom core của mangeto cũng là tạo module.
* Để tạo một module, chúng ta phải thực hiện các bước sau:
    * Tạo một thư mục **module**
    * Tạo file etc/module.xml
    * Tạo file registration.php
    * Chạy `script bin/magento setup:upgrade` để install module mới
    * Kiểm tra module được active hay chưa.
  

    chúng ta hãy cùng đi vào cụ thể từng bước nhé.
## 2. Tạo thư mục cho module
* Chúng ta có 2 nơi để tạo thư mục cho module. Đó là trong folder `app/code` và trong folder `vendor`.
* Tuỳ thuộc vào cách cài đặt Magento2, những module core của magento có thể được đặt trong các thư mục `vendor/magento/magento-*` (trường hợp dùng composer để install) hoặc `app/code/Magento/` (trường hợp clone Github)
* Vậy chúng ta nên đặt module mới ở đâu?
    * Nếu chúng ta build một module cho một project cụ thể, chúng ta sẽ tạo mới module ở trong thư mục `app/code` và commit lên repository của product trên Github.
    * Nếu chúng ta xây dựng một extension để tái sử dụng, chúng ta sẽ dùng `composer` để tạo nó và chúng ta sẽ đặt module ở trong `vendor/<YOUR_VENDOR>/module-something`
* Tên của module trong magento2 sẽ bao gồm 2 phần: tên vendor và tên của chính module đó. Nói cách khác, module sẽ được nhóm lại thành 1 vendor do vậy khi đặt tên của module ta phải chỉ định cả tên vendor đó.
* Trong ví dụ này chúng ta sẽ tạo một vendor là `Learning` và một module là `First Unit`
    * `cd` to folder root
    * `mkdir app/code/Learning`
    * `mkdir app/code/Learning/FirstUnit`
## 3. Tạo file etc/module.xml
* Trước tiên chúng ta phải đảm bảo rằng chúng ta có quyền để tạo file và folder trong folder root nhé.
* Nếu đã có quyền, chúng ta tạo một file `etc/module.xml`. Phải có file này thì module mới tồn tại được.
* File module.xml chứa các thông tin sau
    * Module name
    * Module version
    * Dependencies
* **Module name** đã được định nghĩa bằng tên thư mục mà chúng ta vừa tạo.
* Trong Magento2, tất cả các class name phải tuân theo cấu trúc thư mục. Bởi vì chúng ta tạo thư mục là `Learning/FirstUnit` nên module name của chúng ta sẽ là `Learning_FirstUnit`.
* Tất cả các class thuộc module này sẽ là bắt đầu với `Learning/FirstUnit` 
    
    Ví dụ `Learning\FirstUnit\Observer\Test`
* Tiếp theo đến **Module version**. Module version cho biết được phiên bản hiện tại của **database schema** và **data**, được sử dụng cho việc upgrade module.
* Ví dụ như giả định bạn muốn thay đổi cấu trúc bảng dữ liệu (database table schema) của module này. Làm thế nào để bạn đảm bảo rằng thay đổi này sẽ được áp dụng trên tất cả các phiên bản mã code đã được deploy rồi. 
* Magento sẽ có các **script install** và **upgrade** cho mỗi module (Hoặc bạn tự tạo). Các file script này sẽ có các command để thay đổi database schema và data.
* Để theo dõi xem liệu đã thực thi phần lệnh trong script hay chưa, magento sẽ track dựa vào **module version**. Mỗi lần bạn thực thi thay đổi mới trong database, bạn sẽ phải thực thi với version mới của module và tăng version của module lên tương ứng trong file module.xml.
* Magento sẽ lưu phiên bản hiện tại của module trong database. Nếu giá trị trong database và trong file module.xml không khớp với nhau, nó sẽ thực thi **upgrade** code.
* **Dependencies**: Nếu một module phụ thuộc vào một module khác thì chúng ta phải khai báo trong file modules.xml danh sách các module mà module hiện tại của chúng ta đang phụ thuộc vào. Ví dụ, module này chúng ta tạo ra sẽ phụ thuộc vào module Magento_Catalog.
* Đầu  tiên  chúng  ta  tạo folder etc:
`mkdir app/code/Learning/FirstUnit/etc`
* Tạo  file module.xmll
    ```xml
    <?xml version="1.0"?>
    <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
        <module name="Learning_FirstUnit" setup_version="0.0.1">
            <sequence>
                <module name="Magento_Catalog"/>
            </sequence>
        </module>
    </config>
    ```
* Trong file module mà  chúng  ta  vừa  tạo, chúng ta  đã  chỉ  định:
    * Module  name: `Learning_FirstUnit` dựa  trên folder mà chúng ta đã tạo.
    * Versionn: `0.0.1` (Version  khởi  tạo của module)
    * Dependency: `Magento_Catalog`. Chúng  ta  có  thể  có  nhiều  Dependency, khi  ấy  chúng  ta  hãy  liệt  kê  bằng  các  thẻ `<module name="..." />` ở  bên  trong  thẻ  `<sequence>`
## 4. Tạo  file  registration.php
* Mỗi  module  sẽ  phải  có  file  này  để  đăng  kí  cho  magento  biết  vị  trí  của  module. Tiếp  tục example, chúng  ta  sẽ  tạo  file  `app/code/Learning/FirstUnit/registration.php`
    ```php
    <?php \Magento\Framework\Component\ComponentRegistrar::register(
    \Magento\Framework\Component\ComponentRegistrar::MODULE, 'Learning_FirstUnit',
    __DIR__
    );
    ```
* File  **registrationn.phpp**  sẽ giống nhau đối với tất cả các module, chỉ  khác tên  của  module, ở  đây  của chúng ta là `Learning_FirstUnit`
## 5. Chạy  command
* Tạo  xong  module  chúng  ta  phải  chạy  command để  active  module, để  thông  báo  cho  magento  biết  về  sự  hiện  diện của nó.
    ```
    $ php bin/magento setup:upgrade
    ```
* Câu lệnh sẽ cho ra rất nhiều dòng input, hãy  check  xem một  trong  các  dòng  đó  có  `Learning_FirstUnit` hay  không.
## 6 Check  module  is  active
* Mặc  dù  chúng ta chưa add những logic code vào module, trong  ví  dụ  này  chúng  ta  chỉ  thực  hiện  tạo  module, module  hiện  taị  đang  trống  và  không  thể  nhìn  thấy  được.
* Để  kiểm tra module đã được nhận hay chưa, chúng  ta  hãy  kiểm  tra file `app/etc/config.php`, file  này  chứa  tất  cả  các  module  đã  được  active. Chúng  cũng  không  được  thay  đổi file này một cách  thủ  công.
* Check  module is  active  
```
$ grep Learning_FirstUnit app/etc/config.php
```

## 7. Kết  luận.
* Lại  là  một  bài viết  đơn  giản siêu siêu  beginer  cho  các  bạn  mới  mày  mò tìm hiểu  magento, thực  hiện  các  bước  trong  bài  viết, các  bạn  đã  có  thể  tạo  cho  mình  một  module  để  bắt  đầu  có  thể  add  những  logic  phực  tạp  hơn  cho  module  trong  magento. Mong  bài  viết  sẽ có  ích  đối  với  các  bạn  và  hãy  đón  chờ  các  bài  viết  tiếp  theo  của  mình  trong  serries  về  Magento  nhé. Ciao!
* Link gốc của bài viết: https://huongvnq.github.io/2021/07/18/create-a-new-module-in-magento2/
* Bài  viết  tham  khảo  https://devdocs.magento.com/videos/fundamentals/create-a-new-module/