# Package là gì?
Là một lập trình viên PHP, bạn phải làm quen với việc sử dụng các framework. Các framework giúp cho quá trình phát triển dễ dàng hơn bằng cách đơn giản hóa các thao tác được sử dụng phổ biến trong việc phát triển các dự án web lớn như package, modules, plug-ins, ...
# Laravel Packages
Laravel là một trong những framework phổ biến nhất để phát triển các ứng dụng web. Nó cung cấp môi trường phát triển đơn giản và nhanh chóng cho các nhà phát triển. Laravel nhằm mục đích đưa tedium ra khỏi các dự án web thông thường như xác thực, định tuyến, phiên và bộ đệm, làm cho quá trình phát triển trở nên đơn giản và dễ hiểu. Nó sẽ không hy sinh chức năng ứng dụng và tạo điều kiện cho các nhà phát triển thực hiện các hoạt động được xác định tùy chỉnh. Chẳng hạn, bạn có thể sử dụng các cách khác nhau để truy cập cơ sở dữ liệu quan hệ, có thể thực hiện tiêm phụ thuộc và nhiều hơn nữa thông qua các package này.

Có hai loại package: một số là framework độc lập (độc lập) và một số khác là cho một framework cụ thể. Hướng dẫn này sẽ độc quyền bao gồm các gói Laravel tốt nhất có sẵn trên thị trường dev.

Một lợi thế lớn của việc sử dụng các Laravel package là chúng cho phép truy cập vào tất cả các tính năng mà khung cung cấp cho ứng dụng máy chủ của nó, bao gồm định tuyến, di chuyển, kiểm tra, chế độ xem và nhiều tính năng hữu ích khác. Một ưu điểm quan trọng khác của package là nguyên tắc Don’t Repeat Yourself (DRY) - Đừng lặp lại chính mình.
# 1. Spatie
Vai trò và quyền là một phần quan trọng của nhiều ứng dụng web. Trong lịch sử, Laravel có rất nhiều package cho họ và cũng đã cải thiện mã lõi. Spatie Roles & Perm Perm là một trong những package tốt nhất.

Ưu điểm
* Vai trò
* Quyền
* Quyền trực tiếp
* Middleware
* Chỉ thị nhiều lưỡi
* Lệnh nghệ nhân
# 2. Entrust
Package này cung cấp một cách linh hoạt để thêm Quyền dựa trên Vai trò vào ứng dụng Laravel 5 của bạn. Package này tạo bốn bảng: bảng vai trò để lưu trữ các bản ghi vai trò, bảng quyền để lưu trữ các bản ghi quyền, bảng Role_user để lưu trữ các mối quan hệ một-nhiều giữa các vai trò và người dùng, bảng allow_role để lưu trữ nhiều mối quan hệ giữa nhiều vai trò và quyền.

Bạn có thể tạo vai trò bằng cách viết đoạn code sau đây,
```
$admin = new Role();
$admin->name = 'admin';
$admin->display_name = 'User Administrator'; // optional
$admin->description  = 'User is allowed to manage and edit other users'; // optional
$admin->save();
```

Hãy kiểm tra cách gán vai trò cho người dùng,
```
user = User::where('username', '=', 'michele')->first();
$user->attachRole($admin);
Now, you must give permissions to these roles:
$createPost = new Permission();
$createPost->name         = 'create-post';
$createPost->display_name = 'Create Posts';
$createPost->description  = 'create new blog posts';
$createPost->save();
$admin->attachPermission($createPost);
```
# 3. Laravel Debugbar
![](https://images.viblo.asia/28978357-c644-4583-893a-fcb0d6079f7d.png)
Laravel Debugbar là một trong những Laravel package tốt nhất giúp người dùng thêm thanh công cụ dành cho nhà phát triển vào các ứng dụng của họ. Package này chủ yếu được sử dụng cho mục đích gỡ lỗi . Có rất nhiều tùy chọn có sẵn trong Debugbar. Nó sẽ giúp bạn hiển thị tất cả các truy vấn mà ứng dụng của bạn cung cấp - mọi thứ liên quan đến tuyến đường - mà bạn đã gọi sẽ hiển thị tất cả các mẫu được hiển thị, cũng như tất cả các tham số mà bạn đã vượt qua. Bạn có thể thêm tin nhắn bằng Façade (khi được thêm vào) và nó sẽ hiển thị dưới tab 'Messages' trong Debugbar.

```
Debugbar::info($object);
Debugbar::error('Error!');
Debugbar::warning('Watch out…');
Debugbar::addMessage('Another message', 'mylabel')
```
# 4. Laravel User Verification
Package này cho phép bạn xử lý xác minh người dùng và xác thực (các) email. Nó tạo và lưu trữ mã thông báo xác minh cho người dùng đã đăng ký, gửi hoặc xếp hàng email với liên kết mã xác minh, xử lý xác minh mã thông báo, đặt người dùng làm xác minh. Package này cũng cung cấp một chức năng, tức là phần mềm trung gian tuyến đã được xác minh.

```
public function register(Request $request)
{
   $this->validator($request->all())->validate();
   $user = $this->create($request->all());
   event(new Registered($user));
   $this->guard()->login($user);
   UserVerification::generate($user);
   UserVerification::send($user, 'My Custom E-mail Subject');
   return $this->registered($request, $user)
       ?: redirect($this->redirectPath());
}
```
# 5. Socialite
![](https://images.viblo.asia/b90ed8f2-bd62-4ae5-ac83-46fbdbea3fa0.png)
Socialite cung cấp một cách đơn giản và dễ dàng để xử lý xác thực OAuth. Nó cho phép người dùng đăng nhập thông qua một số mạng xã hội và dịch vụ phổ biến nhất bao gồm Facebook, Twitter, Google, GitHub và BitBucket.

```
$user = Socialite::driver('github')->user();
// OAuth Two Providers
$token = $user->token;
$refreshToken = $user->refreshToken; // not always provided
$expiresIn = $user->expiresIn;
// All Providers
$user->getId();
$user->getName();
$user->getEmail();
$user->getAvatar();
```
# 6. Laravel Mix
![](https://images.viblo.asia/189a1b69-4e31-4cb4-8811-8c4696e30d6a.png)
Trước đây được biết đến với cái tên Laravel Elixir, Laravel Mix cung cấp Giao diện lập trình ứng dụng (API) sạch và phong phú để xác định các bước xây dựng webpack-build cho dự án của bạn. Nó là công cụ biên dịch tài sản mạnh nhất hiện có cho Laravel.

```
mix.js('resources/assets/js/app.js', 'public/js')
.sass('resources/assets/sass/app.scss', 'public/css');
```
# 7. Eloquent-Sluggable
Slugging là quá trình tạo ra một phiên bản chuỗi đơn giản, thân thiện với URL bằng cách chuyển đổi nó thành một trường hợp và xóa khoảng trắng, chữ cái có dấu, ký hiệu, v.v. Với Eloquent-Sluggable, bạn có thể dễ dàng tạo sên cho tất cả các mô hình Eloquent trong dự án .

```
class Post extends Eloquent
{
   use Sluggable;
   protected $fillable = ['title'];
   public function sluggable() {
       return [
           'slug' => [
               'source' => ['title']
           ]
       ];
   }
}
$post = new Post([
   'title' => 'My Awesome Blog Post',
]);
// $post->slug is "my-awesome-blog-post
```
# 8. Migration Generator
Migration Generator là Laravel package mà bạn có thể sử dụng để tạo di chuyển từ cơ sở dữ liệu hiện có, bao gồm các chỉ mục và khóa ngoại. Khi bạn chạy lệnh sau, bạn có thể tạo di chuyển cho tất cả các bảng trong cơ sở dữ liệu của mình.

```
php artisan migrate:generate
```
# 9. Laravel Backup
Laravel package này tạo bản sao lưu tất cả các tệp của bạn trong một ứng dụng. Nó tạo ra một tệp zip chứa tất cả các tệp trong các thư mục bạn chỉ định cùng với kết xuất cơ sở dữ liệu của bạn. Bạn có thể lưu trữ bản sao lưu trên bất kỳ hệ thống tập tin. Để tạo bản sao lưu, tất cả những gì bạn cần làm là chạy lệnh sau:

```
php artisan backup:run
```
# 10. No Captcha
![](https://images.viblo.asia/33574c89-2eda-4aae-9423-37983d16f0d4.png)
No Captcha là package để triển khai xác thực Google reCaptcha và bảo vệ các biểu mẫu khỏi spam. Trước tiên, bạn cần lấy khóa API miễn phí từ reCaptcha.

```
NoCaptcha::shouldReceive('verifyResponse')
   ->once()
   ->andReturn(true);
$response = $this->json('POST', '/register', [
   'g-recaptcha-response' => '1',
   'name' => 'Pardeep',
   'email' => 'pardeep@example.com',
   'password' => '123456',
   'password_confirmation' => '123456',
]);
```
# 11. Laravel GraphQL
GraphQL là ngôn ngữ truy vấn dữ liệu cung cấp giải pháp thay thế cho kiến trúc REST truyền thống. Các nhà phát triển xác định cấu trúc của dữ liệu cần thiết và nhận chính xác cấu trúc tương tự từ máy chủ. Package này sẽ giúp bạn thiết lập và sử dụng GraphQL trong các ứng dụng Laravel của bạn.

Trình tạo bảng điều khiển quản trị Laravel
Có hai nhóm lớn của trình tạo bảng quản trị: trình tạo hình ảnh và dựa trên bảng điều khiển. Sự lựa chọn tùy thuộc vào sở thích của bạn, cho dù bạn muốn sử dụng GUI hay gõ các lệnh Artisan với các tham số.

Ngoài ra, một thuật ngữ quan trọng cần nhớ ở đây là CRUD, chữ viết tắt này là viết tắt của cụm từ “Create, Read, Update, Delete”.
# 12. Voyager: The Missing Laravel Admin
![](https://images.viblo.asia/a912180d-8847-4c3e-b63f-702789307f8b.png)
Voyager nổi bật với giao diện bóng bẩy và chuyên nghiệp, nhưng điểm chính là nó chỉ hoạt động. Hướng dẫn sử dụng rõ ràng, chủ đề giao diện người dùng thân thiện, không có lỗi rõ ràng hoặc các phần chưa hoàn thành. Đó là Voyager cho bạn. Ngay cả các biểu tượng như hình ảnh của đội trưởng cũng làm cho nó trông đẹp mắt.

Voyager cung cấp các tính năng thú vị, chẳng hạn như dữ liệu giả, quản lý phương tiện, ...
# 13. LaraAdmin: Admin Panel + CRM
Sau khi cài đặt và đăng nhập vào bảng quản trị của bạn, package này cho phép bạn tạo trực quan các mô-đun, đại diện cho CRUD của bạn.
# 14. Orchid
Nền tảng RAD hoạt động rất phù hợp để xây dựng một ứng dụng kinh doanh bằng cách sử dụng khung công tác Laravel. Nó có thể hoạt động như cơ sở cốt lõi cho các ứng dụng web hoặc có thể thực hiện các chức năng của CMS, CMF hoặc bảng quản trị cho trang web của bạn.
# 15. Bagisto
![](https://images.viblo.asia/fe750716-0ce6-48c2-b92e-62654d75d0dc.png)
Bagisto là package thương mại điện tử mã nguồn mở Laravel đã quản lý để thu hút sự chú ý của cộng đồng Laravel, trong một khoảng thời gian rất ngắn. Nó cung cấp quản lý người dùng Laravel vượt trội, tùy chọn quản lý kho hàng đa kho và nhiều hơn nữa.

Ngoài ra, Laravel package CMS được tích hợp với điều hướng bảng quản trị thân thiện với người dùng tích hợp, cung cấp các chức năng như Đa tiền tệ, Bản địa hóa, Cấp độ kiểm soát truy cập, Đa kênh, Tích hợp thanh toán và nhiều hơn nữa.
# 16. AvoRed
![](https://images.viblo.asia/6e365a9c-fd76-4837-b89b-710873f4a635.png)
Bạn có thể dễ dàng tùy chỉnh Giỏ hàng Laravel mã nguồn mở theo nhu cầu của mình. Nó cung cấp bố cục giao diện thân thiện với thiết bị di động theo mặc định, đó là lý do tại sao còn được package là một trong những gói SEO tốt nhất.

Nền tảng cho phép bạn tạo các thực thể sản phẩm như danh mục, thuộc tính, ... với khả năng quản lý đơn hàng hiệu quả để theo dõi đơn hàng, thông tin khách hàng và quản lý kho, ...
# 17. Laravel Telescope
Laravel Telescope là một trình gỡ lỗi PHP thanh lịch cho khung công tác Laravel. Nó cung cấp những hiểu biết sâu sắc về các yêu cầu đến ứng dụng của bạn, ngoại lệ, mục nhật ký, truy vấn cơ sở dữ liệu, công việc xếp hàng, thư, thông báo, hoạt động bộ đệm, tác vụ theo lịch trình, kết xuất biến và nhiều hơn nữa. Laravel Telescope làm cho một người bạn đồng hành tuyệt vời với môi trường phát triển Laravel địa phương của bạn.
# Kết luận
Tôi đã liệt kê các Laravel package khác nhau trong bài viết này mà bạn có thể sử dụng để tối ưu hóa năng suất dự án của mình. Vì Laravel cung cấp sự dễ dàng liền mạch cho các nhà phát triển để thực hiện các hoạt động được xác định tùy chỉnh, chọn một trong các package này, người dùng có thể dễ dàng thực hiện các tác vụ chức năng của mình với các gói. Nó phụ thuộc vào nhu cầu và yêu cầu của dự án, sử dụng các package giúp bạn thực hiện các công việc chức năng của mình.

Nguồn: https://www.cloudways.com/blog/best-laravel-packages/