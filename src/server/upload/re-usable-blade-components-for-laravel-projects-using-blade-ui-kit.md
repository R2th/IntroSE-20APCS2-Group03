# **1.Giới thiệu**
Mới đây, một thành viên nổi bật của cộng đồng Laravel là **Dries Vints** đã phát hành  một dự án mã nguồn mở khá hấp dẫn mang tên là **Blade UI Kit** .
![](https://images.viblo.asia/6b3a2a4a-0e0f-435b-8210-b7d967734abf.jpg)

**Blade UI Kit** là một package bao gồm các **components**  đã được tạo sẵn , việc của bạn là chỉ cần sử dụng nó trong **Blade Views** của bạn, tất nhiên là bạn có thể mở rộng và **custom** lại nó.

Theo mặc định, **Blade UI Kit** bao gồm các **components**  như : 

* A countdown timer
* Markdown and rich text editors
* An avatar generator
* Form inputs
* Markdown to HTML converter
* Date & Color pickers

Và còn rất nhiều **components** hay ho trên này nữa, anh em có thể xem chi tiết trên
[Document](https://blade-ui-kit.com/docs/0.x/introduction)
# **2.Bắt đầu**
### Requirements
* **PHP** 7.3 or higher
* **Laravel** 7.0 or higher

### Installation
Trước khi cài đặt một **package**, bạn nên xóa bộ nhớ cache cấu hình của mình:

```
php artisan config:clear
```

Sau đó cài đặt bằng cách **run**:
``` 
 composer require blade-ui-kit/blade-ui-kit
```

### Test
Để show ra 1 **alert** theo cách thông thường thì anh em hay code

```
@if (session('status'))
    <div class="alert alert-success" role="alert">
        {{ session('status') }}
    </div>
@endif
```
nhưng với **Blade UI Kit**  thần thánh thì chúng ta chỉ cần 1 dòng code thôi ( thực chất là chúng ta include 1 **components**)
```
<x-alert class="alert alert-success"/>
```
Để tạo một  **password input**
```
<x-password />
```
Để tạo 1 **Form**
```
<x-form action="http://example.com">
    Form fields...
</x-form>
```
Để tạo **Form File Uploads**
```
<x-form action="http://example.com" has-files>
    Form fields...
</x-form>
```
### Custom
Để thay đổi **name** và  **class** của  **password input** thì cũng giống như HTML ta thêm vào 2 **attribute** 
```
<x-password name="my_password" class="p-4" />
```
Sau khi render ra **HTML**:
```
<input name="my_password" type="password" id="my_password" class="p-4" />
```

### Example 
Đây là 1 project được phát triển dựa trên các **components** từ **Blade UI Kit** :
[Example Laravel project](https://github.com/blade-ui-kit/blade-ui-kit-example)
# **3.Kết luận**
Hiện tại, **Blade UI Kit** đang ở giai đoạn phát triển, có nghĩa là nó có thể vẫn còn một số lỗi, cho đến khi nó được hoàn thiện.

Hy vọng với **package** này anh em có thể rút ngắn thời gian để hoàn thiện **HTML** cho phần view **blade** của mình.

Thân ái chồ tạm biệt và quyết thắng !