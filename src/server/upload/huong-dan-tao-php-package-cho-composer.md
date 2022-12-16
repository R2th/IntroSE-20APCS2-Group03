![](https://images.viblo.asia/5d43352c-0aee-4e65-91d0-a02f679b62b0.png)

Gần đây, gần đây tôi đã cố gắng hết sức để tải lên nhiều mã đến các kho lưu trữ nguồn mở như **Github** và **Codepen**. Nó làm cho việc khởi động các dự án mới trở nên đơn giản hơn nhiều khi tôi có thể sao chép một bản tóm tắt từ **Github** của mình hoặc sao chép một đoạn mã **CSS** / **JS** từ **CodePen**. Nhưng điều gì xảy ra khi tôi cần đưa thư viện hoặc mô-đun vào một số dự án? Nhân bản và sao chép dán chỉ không đóng gói nó tại thời điểm đó.

Đóng gói thành **NPM** và **Composer** ( hoặc **Packagist**). NPM là phần mềm quản lý package cho Javascript sử dụng **Node**, và **Composer** cũng tương tự nhưng sử dụng bằng **PHP**.

Hôm nay, chúng ta xem xét submiting một PHP "package"  đến Composer thông qua Packagist, vì vậy chúng ta có thể cài đặt package  vào project bằng cách sử dụng `composer require`

**Các bước đơn giản:**
Thực hiện dễ dàng với 4 bước (trừ phần bạn code **package** trong **PHP**) . Trước khi bắt đầu, bạn cần tạo 1 repo trên **Githib** và commit code lên đó. Cũng cần phải có tài khoản trên **Github** và **Packagist**.
 * Tạo file composer.json trong project:
```
{
    "name": "your-brand-name/your-project",
    "type": "library",
    "description": "Your package description goes here",
    "keywords": ["relevant","tags","go","here"],
    "homepage": "https://yourcompany.com",
    "license": "MIT",
    "authors": [
        {
             "name": "Nhan Nguyen",
             "email": "nguyennhan09cntt@gmail.com",
             "homepage": "http://nhannvt.com",
             "role": "Developer"
        }
    ],
}
```
  * [Tạo 1 repo mới trên Github](https://github.com/new) và đẩy code local của bạn lên remote Github repo.
  * [Gửi package của bạn đến Packagist](https://packagist.org/packages/submit)
  * Hoàn thành! Package của bạn đã online và  Packagist sẽ cung cấp Composer với tên project của bạn. (e.g. composer require username/package-name)
Bạn sẽ có thể xem gói của bạn trực tiếp tại: 
https://packagist.org/packages/your-username/package-name

**Thật dễ dàng, không có lý do**
Một trong những nguyên tắc lập trình lớn nhất mà tôi cố gắng áp dụng là DRY, đừng lặp lại chính mình. Khi mã của bạn có thể đã được lưu trữ trên Github, đó chỉ là một quá trình gồm hai bước để đưa mã của bạn vào nơi mà phiên bản của nó được kiểm soát.
Thay vì dựa vào git clone hoặc subodules, việc sử dụng một composer dependency sẽ hiệu quả hơn nhiều.

**Lấy mã của tôi để chạy thử**
```
composer require nhannguyen09cntt/php-discourse-sdk
```

Tham khảo: https://github.com/nhannguyen09cntt/php-discourse-sdk

Nguồn: https://4rum.vn/t/h-ng-d-n-t-o-php-package-cho-composer/3077