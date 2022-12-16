## I. Lời mở đầu
Hacker đã trở một phần không thể thiếu của thế giới công nghệ. Đó là những cá nhân/tập thể đã xâm nhập vào hệ thống máy tính của những công ty công nghệ, các trang web thương mại, các trường đại học hay thậm chí là cơ quan an ninh, quốc phòng… Và trang web của bạn cũng không tránh khỏi việc hacker ghé thăm.
Bằng việc sử dụng một số kiến thức bảo mật cũng như sự bất cẩn của nhà phát triển, người dùng. Website đã bị tấn công và chiếm quyền điều khiển.
Mình cũng đã viết một số bài để phòng tránh hacker tấn công các trang web của mình:

- [Hacker đã tấn công trang web của tôi như thế nào](https://viblo.asia/p/hacker-da-tan-cong-trang-web-cua-toi-nhu-the-nao-naQZR9kAKvx)
- [Sử dụng HTML Purifier để ngăn chặn tấn công XSS trong PHP](https://viblo.asia/p/su-dung-html-purifier-de-ngan-chan-tan-cong-xss-trong-php-Qpmlerzr5rd)
- [Các kiến thức cần phải biết khi sử dụng Nginx](https://viblo.asia/p/cac-kien-thuc-can-phai-biet-khi-su-dung-nginx-RQqKLeMNZ7z)

## II. Nội dung chính
![](https://images.viblo.asia/bdf8a097-6b5b-4064-8c7e-4e2057ed5fed.png)

**1. Khái niệm mimes, mimeTypes và extension trong file?**

**- Định nghĩa về mimes:**
>MIME viết tắt của "Multipurpose Internet Mail Extensions" là một chuẩn Internet về định dạng cho thư điện tử, hầu như mọi thư điện tử Internet được truyền qua giao thức SMTP theo định dạng MIME.

Một số mime phổ biến như: jpg,bmp,png,...

**- Định nghĩa về mimeTypes:**
>MIME types được sử dụng ngày càng rộng rãi trong nhiều ứng dụng liên quan đến Internet và ở nhiều nơi khác, mặc dù việc sử dụng chúng cho thông tin loại trên đĩa rất hiếm. Chúng bao gồm một hệ thống định danh được tiêu chuẩn hóa (được quản lý bởi IANA) bao gồm một type và một sub-type, được phân tách bằng dấu gạch chéo - ví dụ: text/html hoặc image/gif. Chúng ban đầu được dự định như một cách để xác định loại file nào được đính kèm vào e-mail, độc lập với hệ điều hành nguồn và đích. MIME types xác định các file trên BeOS, AmigaOS 4.0 và MorphOS, cũng như lưu trữ các chữ ký ứng dụng duy nhất để khởi chạy ứng dụng. Trong AmigaOS và MorphOS, hệ thống MIME types hoạt động song song với hệ thống Datatype cụ thể của Amiga.

**2. Mối quan hệ giữa các loại mimeType và file .extension là gì?**
- MimeType: Tiêu chuẩn để đại điện, mô tả về nội dung cho tệp (như : image/jpeg). Dựa vào mimeType sẽ có các mime (extension) tương ứng.
- Extension: Phần mở rộng của file hay phần mở rộng tên tệp là các chữ cái được hiển thị ngay sau đoạn cuối cùng trong tên file. Một extension có thể ánh xạ và tương ứng với không hoặc 1 mimeType. Ví dụ: File test.php có phần mở rộng là .php. Phần mở rộng này cho phép hệ điều hành biết loại file đó là gì và chương trình nào sẽ chạy khi bạn mở file này.

Lợi dụng việc server "đoán" sự tương ứng (ánh xạ) giữa mimeType và mime. Bằng một số thủ thuật hacker sẽ đổi extension của file để upload lên server thực thi file và chiếm quyền. Ví dụ một file ảnh có tên là hinhanh.png sau đó được đổi thành hinhanh.png.php để thực thi. Dựa vào mineType và extension, server sẽ "đoán" loại tệp và mở một chương trình liên quan đến loại đó và khi mã độc được thực thi thì bạn biết điều gì xảy ra rồi đó.

Một số mimeTypes và extension tương ứng:
| MIME type (lowercased) | Extension |
| -------- | -------- | 
|    image/jpeg  | jpeg jpg jpe |
|    audio/x-ms-wma  | wma |

Xem chi tiết tại: https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types

**3. Upload file đã bị bypass như thế nào?**

- Validate mimes và mimeTypes:
Với việc sử dụng Framework thì validate request upload file cũng không có gì khó khăn cả. Nhưng đoạn validate thường dùng này sẽ bị bypass trong vòng một nốt nhạc.
```php
/**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'file' => [
                'required',
                'image',
                'mimes:jpeg,png',
                'mimetypes:image/jpeg,image/png',
                'max:2048',
            ],
        ];
    }
```
Như mình có nói ở trên dựa vào MimeType server sẽ "đoán" được extension của tệp để thực thi. Bạn validate mime, mimeType bản chất chỉ mới validate content-type. Bằng một số tool hacker sẽ đổi extension của file gửi lên, thêm mã độc và bypass vào hệ thống. Trước giờ mình cứ tưởng validate mimes là đã validate phần extension của tệp rồi. Hình bên dưới là hacker sửa nội dung của tệp và đổi extension về đuôi có thể thực thi.
![](https://images.viblo.asia/3226bb5f-f7c9-4c31-b105-d5e30d2213c3.png)

**4. Customize validate rule laravel để fix bypass upload file như thế nào?**

Để chắc chắn rằng hacker không thể bypass khi đổi extension và thực thi trên hệ thống. Ta cần phải validate thêm phần extension trước khi lưu file vào server. Mình có lục tung phần docs của Laravel nhưng không hề thấy có validate phần này. Vậy nên mình đã tự customize như sau:
Tự đăng ký một validate rule trong ```AppServiceProvider.php```
```php
use Illuminate\Http\UploadedFile;
use Validator;

/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    Validator::extend('file_extension', function ($attribute, $value, $parameters, $validator) {
        if (!$value instanceof UploadedFile) {
            return false;
        }

        $extensions = implode(',', $parameters);
        $validator->addReplacer('file_extension', function (
            $message,
            $attribute,
            $rule,
            $parameters
        ) use ($extensions) {
            return \str_replace(':values', $extensions, $message);
        });

        $extension = strtolower($value->getClientOriginalExtension());

        return $extension !== '' && in_array($extension, $parameters);
    });
}

```
Sau khi đã đăng ký validate rule ở trên, ta dễ dàng sử dụng validate một cách dễ dàng với tên đăng ký tương ứng. Vậy là xong với việc validate đầy đủ cả mime, mineTypes và extension thì hệ thống upload cũng khá an toàn rồi.
```php
/**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'file' => [
                'required',
                'image',
                'file_extension:jpeg,png',
                'mimes:jpeg,png',
                'mimetypes:image/jpeg,image/png',
                'max:2048',
            ],
        ];
    }
```
## III. Tạm kết
Sau bài này mình rút ra được rằng framework "ngon" đến mấy thì cũng có lỗ hổng. Trước khi sử dụng cái gì thì hãy tìm hiểu kỹ về nó. Mong được sự góp ý từ mọi người.
![](https://images.viblo.asia/13cadc45-fcee-4376-9773-4fa1748f5123.jpg)