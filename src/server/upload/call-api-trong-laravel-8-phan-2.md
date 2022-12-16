Trong bài viết trước, mình đã giới thiệu về cách call API cần POST dữ liệu kèm theo.

Bài này mình sẽ tiếp tục giới thiệu tới các bạn về call API mà không cần truyền Input.

Nào mình cùng bắt đầu nhé:

Đầu tiên mình cần $apiUrl. Trong một dự án công ty, $apiUrl đến từ DEV backend. Hoặc có thể đến từ các đối tác, các công ty lớn như google, facebook,...

Nó có dạng như sau:

![](https://images.viblo.asia/967d9381-58dc-403e-8e99-2f48288d6a3d.jpg)


Tiêp theo mình cần biến $client từ GuzzleHttp như sau:

![](https://images.viblo.asia/ab489d9c-18c3-4e1b-880d-9f1c52fb786c.jpg)


 $apiUrl không cần Input kèm theo, mình vẫn cần truyền mảng rỗng cùng với nó như sau:
 
 ![](https://images.viblo.asia/39bff582-203b-433b-a34d-fa6098ff0729.jpg)


Gần xong rồi, giờ mình cần kiểm tra trạng thái của lần call api này qua $statusCode như sau:

![](https://images.viblo.asia/1f9a7627-f4b2-48e8-a228-a121a13a26b9.jpg)


Nếu $statusCode == 200 thì chúng ta nhận về dữ liệu thông qua hàm json_decode như trên.

Thế là xong rồi, tiếp theo bạn chỉ cần xử lý $content là xong rồi đó!

Chúc các bạn thành công!

Dưới đây là source code của mình:
```php
 $apiUrl = "https://abc/def/abc/course-score";

        $client = new \GuzzleHttp\Client();
        
        $response = $client->post($apiUrl, []);

        $statusCode = $response->getStatusCode();       

        if ($statusCode == 200) {   
            $content = json_decode($response->getBody(), true);
         }
```