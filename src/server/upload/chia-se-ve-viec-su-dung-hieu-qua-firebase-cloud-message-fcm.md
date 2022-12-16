### I. Giới thiệu
Như tiêu đề, bài viết này mình xin chia sẻ về việc sử dụng FCM - qua việc mình đúc rút ra khi có các issues liên quan để các bạn chưa và sắp sử dụng FCM có thể sử dụng mà không bị mắc phải.
### II. Nội dung
- FCM thì đã quá nổi tiếng rồi, version cũ là legacy http và version mới nhất hiện tại đang là http v1.

- Về sự khác biệt thì bạn có thể xem [ở đây](https://firebase.google.com/docs/cloud-messaging/migrate-v1)

- Một vấn đề khác mà link trên không đề cập tới là khi sử dụng send trực tiếp thì `http v1` gửi được 500 devices/batch còn `legacy http` được 1000 devices/batch

- Vậy thi có những cách gửi nào trong FCM? Theo tìm hiểu của mình thì có 2 cách đó là gửi theo `group` và theo `topic`. Cùng đi tìm hiểu 2 cách này nhé (Ở bài viết này mình sẽ hướng dẫn bằng việc sử dụng `legacy http` nhé, còn sử dụng `http v1` bạn có thể tham khảo thêm package [Firebase Admin SDK for PHP](https://firebase-php.readthedocs.io/en/5.6.0/))

- Trước tiên để rõ ràng dễ hiểu hơn thì mình chbi sẵn function `excute` để thao tác với FCM nhé
```

    private function execute($url, $dataPost = [], $method = 'POST')
    {
        $result = false;
        try {
            $client = new Client();
            $result = $client->request($method, $url, [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'key',
                ],
                'json' => $dataPost,
                'timeout' => 300,
            ]);

            $result = $result->getStatusCode() == Response::HTTP_OK;
        } catch (\Exception $e) {
            $this->logger()->error($e);
        }

        return $result;
    }
```
#### 1. Send via group
- Là gửi theo 1 tập các device tokens được định sẵn (có thể qua việc truy vấn theo một bài toán nào đó bất kì)
Ví dụ có bài toán như sau: Gửi notificaiton cho tất cả devices
```
$deviceTokens = Guest::pluck('device_token')->toArray();
$chunkDeviceTokens = array_chunk($deviceTokens, 1000); //Ở đây nếu như số lượng device tokens mà > 1000 thì bạn nên chunk ra nhé. Có thể sử dụng thế này sau đó foreach nhé
$url = 'https://fcm.googleapis.com/fcm/send';
// nếu > 1000 thì foreach và gọi hàm này.
$data = [
    'registration_ids' => $chunkDeviceTokens,
    'notification' => [
        'body' => 'Something',
        'title' => 'Something',
],

$this->execute($url, $data) 
```
Nhìn vào đây có thể thấy nếu như dữ liệu query càng ngày càng nhiều thì liệu gửi trực tiếp này có tốt không? chắc chắn là không tốt rồi. Vậy ta có cách thứ 2 là `send via topic`
#### 2. Send via topic
- Để làm được việc này mình cùng xem qua 2 phương thức `subscribe topic` và `unsubcribe topic` của FCM
```
 https://iid.googleapis.com/iid/v1:batchAdd
 https://iid.googleapis.com/iid/v1:batchRemove
```
Với bài toán trên, thì cách hợp lý nhất là mỗi khi user đăng ký tài khoản thì bạn phải subscribe topic tại thời điểm đó (gỉa sử topic có tên là `all_devices`)
* Subscribe topic
```
$url = 'https://iid.googleapis.com/iid/v1:batchAdd';
$data = [
    'to' => '/topics/all_devices',
    'registration_tokens' => ['array_device_token'],
];
$this->excute($url, $data);
```
Vậy đến khi cần gửi notification (Có thể run bằng cronjob chẳng hạn)
Bạn chỉ cần thay `registration_ids` thành `to` đến topic: chẳng hạn
```
$data = [
    'to' => '/topics/all_devices',
    'notification' => [
        'body' => 'Something',
        'title' => 'Something',
],
```
- Và việc unsubscribe topic này chỉ được thực hiện khi có sự kiện như remove app, hoặc update device token...Khi đó bạn cũng thực hiện như subscribe và chỉ khác url

```
$url = 'https://iid.googleapis.com/iid/v1:batchRemove';
$data = [
    'to' => '/topics/all_devices',
    'registration_tokens' => ['array_device_token'],
];
$this->excute($url, $data);
```

* Note: Case gặp bug ở cách send này là nếu cách làm như cách `send via group` với  cycle `subscribe -> send -> unsubscribe` bởi vì FCM hoạt động theo `async`, nôm na rằng khi bạn khi bạn thực hiện  đồng thời cycle này ví dụ cho 2000 devices khi đó sẽ phải chunk devices cho thành từng block 1000 và phải dùng đến `foreach`, đại loại nó sẽ thế này
```
$chunkDevices = array_chunk($deviceTokens, 1000);
foreach ($chunkDevices as $item) {
    subscribeTopic('topic', $item);
    send('topic', $notification);
    unsubcribeTopic('topic', $item);
}
```
Nhìn vào đây có thể thấy vòng lặp sẽ chạy 2 lần tương ứng với 2 batch và 2 batch này hoàn toàn có thể có thời điểm sẽ chạy đồng thời với nhau khi đó sẽ gặp các case như: 1 devices nhận được notification nhiều lần hoặc có device lại không nhận được lần nào. Bạn hãy chú ý, `hàm send chỉ được phép gọi 1 lần nếu sử dụng subscribe topic`
* Một bài toán tương tự khác cho việc sử dụng subscribe topic ví dụ như: Nhận notification từ những model (Player, Streamer, influencer ...hay shop hoặc salon bất kì) nào bạn đang follow thi bạn hoàn toàn có thể subscribe một topic ngay khi user thực hiện action follow.
* Với những bài toàn không cố định như follow model hay gửi all như trên thì bạn nên sử dụng `send via group` ví dụ:

+ Gửi notification cho các user đăng ký bài tập vào một ngày bất kỳ.

+ Gửi notification cho các user có ngày sinh nhật bất kỳ....etc.

### III. Tổng kết
Hi vọng bài chia sẻ này của mình có thể gíup bạn nắm chắc được FCM và khi nào nên dùng `send via group` và khi nào nên dùng `send via topic`