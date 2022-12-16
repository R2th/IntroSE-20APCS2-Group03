Ngày càng nhiều ứng dụng cung cấp webhooks dưới dạng tích hợp, thường là ngoài API. Ví dụ cổ điển, quen thuộc với hầu hết các nhà phát triển, là webhooks GitHub có thể thông báo cho các hệ thống khác của bạn, chẳng hạn như công cụ CI rằng một cam kết mới đã được thêm vào một nhánh. Nếu bạn tưởng tượng có bao nhiêu kho lưu trữ tồn tại trên GitHub và bao nhiêu hệ thống khác phản ứng với những thay đổi trên mỗi kho lưu trữ ... thì có một lý do khiến chúng xuất sắc với webhook! Cho dù đó là kiểm soát nguồn của bạn, cập nhật từ cảm biến IoT của bạn hoặc một sự kiện đến từ một thành phần khác trong ứng dụng của bạn, tôi có một số Ý kiến ​​(TM) về việc xử lý webhook, vì vậy tôi nghĩ tôi sẽ viết chúng ra và bao gồm một số mã, vì tôi nghĩ rằng đây là một lĩnh vực mà nhiều ứng dụng sẽ cần phải làm việc.

## Nhận và phản hồi
Phần lớn các vấn đề mà tôi đã gặp hoặc đã tạo ra khi làm việc với các webhook đến là cố gắng thực hiện quá nhiều một cách đồng bộ - vì vậy hãy thực hiện tất cả quá trình xử lý khi hook đến. Điều này dẫn đến các vấn đề vì hai lý do:

Kết nối web đến vẫn mở trong khi quá trình xử lý đang diễn ra. Có một số lượng kết nối web hạn chế, vì vậy khi chúng tôi hết, kết nối tiếp theo sẽ phải chờ, làm cho hệ thống chậm hơn .... bạn hiểu đấy. Đại loại là thứ tạo nên hình dạng đồ thị "khúc côn cầu" mà chúng ta thấy trên web, nơi mọi thứ trở nên chậm hơn và sau đó làm cho mọi thứ khác chậm hơn và tất cả đều là những quả bóng tuyết.

Nếu có sự cố xảy ra ở giữa, bạn không có cách nào để thử lại phần dữ liệu đó.

Vì vậy, lời khuyên của tôi là ngay lập tức lưu trữ và sau đó ghi nhận dữ liệu đến , sau đó xử lý nó một cách không đồng bộ. Giải pháp tốt nhất ở đây là sử dụng hàng đợi, nhưng nếu việc thêm các phần phụ thuộc mới vào ứng dụng của bạn không đơn giản, thì bạn hoàn toàn có thể bắt đầu với một cơ sở dữ liệu đơn giản. Lưu trữ bản ghi cho mỗi webhook đến, với một số loại định danh duy nhất, dấu thời gian về thời điểm nó đến, có thể là một số trường trạng thái để cho biết nó đã được xử lý chưa và toàn bộ tải trọng dữ liệu webhook khi bạn nhận được. Cũng có thể hữu ích khi đặt một số trường chính từ trọng tải đến vào các cột của riêng chúng, chẳng hạn như số tài khoản hoặc loại sự kiện, tùy thuộc vào loại dữ liệu bạn đang xử lý.

Đây là một đoạn mã nhanh mà tôi sử dụng trong một trong những bài nói chuyện của tôi về chủ đề này, sử dụng PHP để nhận một webhook đến và lưu trữ nó vào CouchDB (điều chỉnh theo yêu cầu nếu bạn không sử dụng CouchDB, điều này cũng sẽ hoạt động hoàn hảo với MySQL , đây chỉ là từ một dự án sử dụng CouchDB).
```php
 <?php
 
 if($json = json_decode(file_get_contents("php://input"), true)) {
     print_r($json);
     $data = $json;
 } else {
     print_r($_POST);
     $data = $_POST;
 }
 
 echo "Saving data ...\n";
 $url = "http://localhost:5984/incoming";
 
 $meta = &#91;"received" => time(),
     "status" => "new",
     "agent" => $_SERVER['HTTP_USER_AGENT']];
 
 $options = ["http" => [
     "method" => "POST",
     "header" => ["Content-Type: application/json"],
     "content" => json_encode(["data" => $data, "meta" => $meta])]
     ];
 
 $context = stream_context_create($options);
 $response = file_get_contents($url, false, $context);  
?>
```

Tập lệnh này bắt đầu bằng cách cố gắng đoán xem chúng ta có dữ liệu JSON đến hay một bài đăng biểu mẫu thông thường - và một trong hai cách tạo một $datamảng là trọng tải đến của webhook. Nó cũng xuất ra điều này cho mục đích gỡ lỗi, giúp xem những gì đã đến. Nếu có bất kỳ sự không chắc chắn nào về độ tin cậy của định dạng dữ liệu hoặc nếu bạn đang tích hợp với hệ thống của bên thứ ba, bạn cũng có thể muốn lưu trữ nội dung thực tế của file_get_contents("php://input")nguyên văn, trong trường hợp chúng cần thiết để gỡ lỗi hoặc tranh luận xem ai đã phá vỡ điều gì. !

Với dữ liệu trong tay, tập lệnh này cũng thiết lập một $metabiến, với các trường bổ sung để lưu trữ (trong trường hợp này, chỉ là trạng thái và tác nhân người dùng). Bản thân cơ sở dữ liệu sẽ cung cấp cho bản ghi của chúng ta một mã định danh duy nhất. Cuối cùng, POSTyêu cầu được thiết lập trên dòng 18 sẽ là cách chúng tôi chèn dữ liệu vào cơ sở dữ liệu của mình.

Nó không được gọi rõ ràng ở đây, nhưng khi một tập lệnh PHP hoàn tất thành công, nó sẽ trả về phản hồi 200 OK. Lưu ý rằng không có bước bổ sung nào ở đây, không có xác thực hoặc kiểm tra các trường hoặc tìm nạp thêm dữ liệu. Chỉ cần chấp nhận và khi nó được lưu trữ thành công, hãy trả lại "Cảm ơn!" (hay đúng hơn là trạng thái 200 OK).

## Lập kế hoạch xử lý

Với dữ liệu này tại chỗ, bạn có thể xử lý webhook không đồng bộ. Nếu bạn sử dụng hàng đợi thay vì cơ sở dữ liệu, thì bạn sẽ thiết lập một vài công nhân để xử lý dữ liệu đến. Với một giải pháp như ở trên, tôi khuyên bạn nên thực hiện một công việc cron để chọn các công việc chưa được xử lý và thực sự xử lý dữ liệu. Bạn luôn có thể webhook trở lại khi chúng hoàn tất nếu bạn cần cung cấp thông báo về việc dữ liệu đã được nhận và xử lý thành công hay chưa. Một lời khuyên nữa ở đây: hãy đặt giới hạn về số lượng công việc chưa được xử lý được chọn và đánh dấu chúng là "đang được xử lý". Nếu hệ thống đang bị tải quá nhiều thì nhiều hơn một trong các quy trình này sẽ hữu ích, vì vậy việc có thể nhận một vài công việc đang chờ mỗi quy trình sẽ rất hữu ích!

Hy vọng rằng, ví dụ ở đây sẽ giúp minh họa quan điểm mà tôi đã cố gắng thực hiện về các webhook đến. Đối với một hệ thống có thể mở rộng, mỗi phần của hệ thống muốn độc lập nhất có thể và các chiến thuật được nêu ở đây đã từng hoạt động hiệu quả đối với tôi trong quá khứ - hy vọng, chúng cũng hữu ích cho bạn.

#Nguồn: ST