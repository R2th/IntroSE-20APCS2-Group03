# I.Giới thiệu:
## 1.Stripe là gì:
- Stripe là một cổng thanh toán của Hoa Kỳ cho phép các trang thương mại điện tử nhận thanh toán trên website thương mại của mình. Hiện tại, Stripe có mặt tại 26 quốc gia:
![](https://images.viblo.asia/4337fbc8-2208-4f5c-851c-e21faf55d62d.png) <br>
- **Ưu điểm:**<br>
    + Công nghệ tiên tiến trong thanh toán và bảo mật.<br>
    + Công cụ báo cáo chi tiết.<br>
    + Là cổng thanh toán tuyệt vời khi kinh doanh Quốc Tế.<br>
    + Hỗ trợ nhiều đơn vị tiền tệ.<br>
- **Nhược điểm:** <br>
    + Chưa cho phép đăng ký ở nhiều quốc gia, trong đó có Việt Nam.<br>
## 2.Endpoint là gì: 
- Endpoint là một nơi mà cho Stripe sẽ gửi dữ liệu về thông tin các giao dịch cho tài khoản.
- Stripe có thể gửi các sự kiện webhook thông báo cho ứng dụng của bạn bất cứ khi nào sự kiện xảy ra trên tài khoản của bạn.<br> 
- Điều này đặc biệt hữu ích cho các sự kiện, như các khoản phí tranh chấp và các sự kiện thanh toán định kỳ mà không được kích hoạt bởi một yêu cầu API trực tiếp.<br>
- Cơ chế này cũng hữu ích cho các dịch vụ không chịu trách nhiệm trực tiếp khi thực hiện yêu cầu API, nhưng vẫn cần biết phản hồi từ yêu cầu đó.<br>
# II. Cách sử dụng Endpoint stripe trong zendframework
## 1. Cài đặt:
- Bạn có thể thêm vào vào stripe vào composer.json và chạy install.<br>
```
        "stripe/stripe-php": "^6.38"
```
- Tiếp theo bạn cần thêm bạn cần phải vào auto load ở config. Cụ thể là file modules.config.php
```
return [
 'Stripe\Stripe',
    'Application',
]
```

## 2. Setup controller.
- Bạn có thể tạo 1 ApIController với action là stripe để nhận dữ liệu trả về từ Stripe thông qua endpoint.
```
 public function stripeAction()
    {
        $rawRequest = file_get_contents('php://input');
        if (! $rawRequest) {
            e(__METHOD__, 'none value request!');
            header('HTTPS', true, 400);
            return $this->response;
        }
       \Stripe\Stripe::setApiKey('Key của account stripe của bạn');
        try {
            $event = \Stripe\Event::constructFrom(
                json_decode($rawRequest, true)
            );
        } catch(Exception $e) {
            // Invalid payload
            http_response_code(400);
            exit();
        } 
        header('HTTPS', true, 200);
    }
```
- Tiếp theo chúng ta sẽ cấu hình routes cho api tại file module/config/module.config.php để có thể sử dụng nó trong việc nhận dữ liệu từ stripe.<br>
```
 'api' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '/api[/:action]',
                    'defaults' => [
                        'controller'    => Controller\ApiController::class,
                        'action'        => 'stripe',
                    ],
                ],
            ],
```
- Vậy hiện tại chúng ta để hoàn thành xong phần server để nhận dữ liệu từ stripe trả về(nó có thể là trạng thái thanh toán, balace, ...).<br>
- Sau đó các bạn có thể tối ưu hơn hay xử lý lưu lại những record đó để kiểm tra hay không là tùy vào mục đích sử dụng của các bạn. 
## 3. Tạo endpoint trên stripe.
### 3.1 Tạo tài khoản Stripe.
- Bạn có thể bấm vào phần signup và tạo 1 tài khoản cực kì đơn giản theo hướng dẫn của Stripe: https://dashboard.stripe.com/register <br>
- Sau khi tạo sau chúng ta cần phải lấy SKkey tài khoản của mình tại tag Develop->APIKey để có thể setup môi trường.<br>
![](https://images.viblo.asia/9cda7579-c624-4356-95e2-55c4550808ef.png)
### 3.2 Tạo endpoint.
- Chúng ta vào phần Webhooks và bấm vào phần thêm add Endpoint. <br>
![](https://images.viblo.asia/9b8bf966-b3fe-4333-b786-5d6c46d15191.png)
- Sau đó nhập vào domain của bạn đi kèm với api nhận dữ liệu trả về chúng ta đã setup phía trên. VD: www.demo.com/api/stripe <br>
- Chọn loại dữ liệu mà bạn muốn stripe gửi về cho mình.<br>
- Nếu bạn sử dụng local thì có thể sử dụng ngrok để public domain để phục vụ cho quá trình test được chính xác hơn.<br>
- Chúng ta có thể tạo được nhiều endpoint nên rất thuận tiện cho việc quản lý các thông tin giao dịch tốt hơn.<br>
# III.Kết luận.
## 1. Chia sẻ:
- Đây là kinh nghiệm mình đã học tập được trong quá trình làm việc. Mong sẽ giúp được các bạn phần nào.<br>
- Mọi chia sẻ, góp ý vui lòng để lại comment phía bên dưới để mọi người cùng giải đáp.<br>
- Cám ơn mọi người đã dành thời gian đọc bài viết của mình. :)
## 2. Tài liệu tham khảo:
- Lý thuyết Stripe: https://duyalex.com/thanh-toan-quoc-te/stripe/stripe-la-gi/ <br>
- Tài liệu zendframework: https://framework.zend.com/ <br>
- Stripe document: https://stripe.com/docs <br>