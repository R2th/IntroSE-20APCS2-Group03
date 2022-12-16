# Giới thiệu 
Sau khi xử lý mua In-App Purchases chúng ta có thể sẽ cần xác thực hoá đơn với App Store. Chúng ta sẽ có thể lấy thông tin chi tiết về việc mua bán, sau đó có thể lưu trữ các thông tin này lại lên database. Có 2 cách để thực hiện: 
1. Kết nối tới trực tiếp tới Apple App Store 
2. Gửi receipt tới server của chúng ta, sau đó server sẽ thực hiện validate hoá đơn này với Apple App Store. Cách thứ 2 này đơn giản và bảo mật hơn, nó sẽ đảm bảo việc mua bán ko bị hack kiểu Man-in-the-middle (MITM)
Apple khuyến khích sử dụng server validation để kết nối với App Store. Sử dụng server sẽ giúp chúng ta có thể thiết kế app được nhận biết và tin tưởng chỉ bởi server, cho phép đảm bảo server kết nối tới App Store server. Không thể tạo 1 kết nối an toàn giữa thiết bị của user với Appstore trực tiếp được, vì chúng ta ko hề điều khiển bất cứ cái gì trong kết nối đó. 

# VALIDATE IN-APP PURCHASES
Để validate in-app purchase, ứng dụng chúng ta cần thực hiện các bước sau lần lượt: 
1. Parse và validate receipt, nếu receipt không hợp lệ tức là in-app purchase không hợp lệ 
2. Parse in-app purchase receipts, mỗi in-app purchase receipt này bao gồm tập các thuộc tính giống như application receipt. 
3. Kiểm tra từng product indentifier cho từng in-app purchase receipt và thực hiện cho phép các tính năng hay nội dung tương ứng trong app. 
Nếu validation thất bại thì sẽ không enable các tính năng người dùng muốn mua sử dụng trong ứng dụng. 

# SEND RECEIPT DATA TO YOUR SERVER
Sử dụng phương thức validateReceipt() dưới đây để nhận data của receipt, sau đó gửi data này lên server của chúng ta. Đối tượng receipt được gửi lên trong payload của 1 HTTP POST request, data này cần được encode base 64, server sẽ nhận được thông tin hoá đơn và các transaction đã mua: 
```
func validateReceipt() {
    var response: NSURLResponse?
    var error: NSError?
    
    var receiptUrl = NSBundle.mainBundle().appStoreReceiptURL
    var receipt: NSData = NSData(contentsOfURL:receiptUrl!, options: nil, error: nil)!
    
    var receiptdata: NSString = receipt.base64EncodedStringWithOptions(NSDataBase64EncodingOptions(rawValue: 0))
    //println(receiptdata)
    
    var request = NSMutableURLRequest(URL: NSURL(string: "http://www.brianjcoleman.com/code/verifyReceipt.php")!)
    
    var session = NSURLSession.sharedSession()
    request.HTTPMethod = "POST"
    
    var err: NSError?
    
    request.HTTPBody = receiptdata.dataUsingEncoding(NSASCIIStringEncoding)
    
    var task = session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
        var err: NSError?
        var json = NSJSONSerialization.JSONObjectWithData(data, options: .MutableLeaves, error: &err) as? NSDictionary
        
        if(err != nil)
        {
            println(err!.localizedDescription)
            let jsonStr = NSString(data: data, encoding: NSUTF8StringEncoding)
            println("Error could not parse JSON: '\(jsonStr)'")
        }
        else {
            if let parseJSON = json {
                println("Receipt \(parseJSON)")
            }
            else {
                let jsonStr = NSString(data: data, encoding: NSUTF8StringEncoding)
                println("Receipt Error: \(jsonStr)")
            }
        }
    })
    
    task.resume()
}
```
# IN-APP PURCHASE SHARED SECRET
Nếu ứng dụng của chúng ta cung cấp Auto-Renewable Subscriptions thì chúng ta cần gửi thêm password cùng với receipt data lên Apple cho việc validation. Nếu hoá đơn validate cho loại auto-renewing receipt, truy cập vào iTunes Connect và lấy thông tin shared secret của ứng dụng của chúng ta. Key này thường gồm 32 kí tự, kiểu kí tự alpha-numeric ví dụ như: e4b2dd30b7rt4a7382b5173hg790elk7
Vào iTunes Connect -> My Apps -> Chọn App -> Features -> In-App Purchases -> xem hoặc tạo mới shared secret 
![](https://images.viblo.asia/47d73633-fb89-428a-b011-82c49c3e2b39.png)

# SEND RECEIPT DATA TO APPLE USING PHP
Sử dụng PHP Script để lấy receipt data và gửi nó tới server Apple để validate. Script này sẽ cần truyền vào 2 giá trị: receipt data và password (chỉ cần dùng khi sử dụng auto-renewable subscriptions). Chúng ta cần thay thế text này với secret key lấy được từ iTunes Connect. Nếu app không sử dụng auto-renew subscription thì ta có thể bỏ passowrd parmeter chỉ cần gửi receipt data là đủ rồi.
Lưu lại thành file verifyReceipt.php, upload lên webserver của chúng ta và đổi quyền thành 755

```
<?php
	function getReceiptData($receipt)
	{
		$fh = fopen('showme.txt',w);
		fwrite($fh,$receipt);
		fclose($fh);
		$endpoint = 'https://sandbox.itunes.apple.com/verifyReceipt';
		
		$ch = curl_init($endpoint);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $receipt);
		$response = curl_exec($ch);
		$errno = curl_errno($ch);
		$errmsg = curl_error($ch);
		curl_close($ch);
		$msg = $response.' - '.$errno.' - '.$errmsg;
		echo $response;
	}
	
foreach ($_POST as $key=>$value){
	$newcontent .= $key.' '.$value;
}

$new = trim($newcontent);
$new = trim($newcontent);
$new = str_replace('_','+',$new);
$new = str_replace(' =','==',$new);

if (substr_count($new,'=') == 0){
if (strpos('=',$new) === false){
		$new .= '=';
}
}

$new = '{"receipt-data":"'.$new.'","password":"<INSERT YOUR IN-APP PURCHASE SHARED SECRET HERE>"}';
$info = getReceiptData($new);
	?>
```

# TESTING
Để test receipt validation, chúng ta chạy ứng dụng, mua in-app purchases, sau đó gọi hàm validateReceipt() để lấy receipt-data và gửi cho PHP server, PHP server sẽ gửi receipt này tới Apple server sau đó sẽ nhận thông tin phản hồi từ Apple server, parse JSON và lấy thông tin receipt. 
Trong quá trình test chúng ta có thể nhận được các mã lỗi sau trả về từ Apple: 

| Status Code | Description |
| -------- | -------- | 
| 21000     | The App Store could not read the JSON object you provided.     |
| 21002     | The data in the receipt-data property was malformed or missing.    |
| 21003 | The receipt could not be authenticated. |
| 21004 | The shared secret you provided does not match the shared secret on file for your account. Only returned for iOS 6 style transaction receipts for auto-renewable subscriptions. |
| 21005 | The receipt server is not currently available.  |
| 21006 | This receipt is valid but the subscription has expired. When this status code is returned to your server, the receipt data is also decoded and returned as part of the response.  |
| 21007 | This receipt is from the test environment, but it was sent to the production environment for verification. Send it to the test environment instead.  |
| 21008 | This receipt is from the production environment, but it was sent to the test environment for verification. Send it to the production environment instead. |

# RECEIPT DATA
Dưới đây là 1 sample ví dụ về receipt chúng ta có thể nhận được sau khi validation, chúng ta có thể parse và lưu lại vào databse để có thể sử dụng kiểm tra trạng thái mua bán của user. 
```
"latest_receipt_info" =     (
             {
         "is_trial_period" = false;
         "original_purchase_date" = "2015-05-20 17:41:12 Etc/GMT";
         "original_purchase_date_ms" = 1432143672000;
         "original_purchase_date_pst" = "2015-05-20 10:41:12 America/Los_Angeles";
         "original_transaction_id" = 1000000156014803;
         "product_id" = "com.brianjcoleman.testiap1";
         "purchase_date" = "2015-05-20 17:41:12 Etc/GMT";
         "purchase_date_ms" = 1432143672000;
         "purchase_date_pst" = "2015-05-20 10:41:12 America/Los_Angeles";
         quantity = 1;
         "transaction_id" = 1000000156014803;
     },
             {
         "expires_date" = "2015-05-23 17:05:59 Etc/GMT";
         "expires_date_ms" = 1432400759000;
         "expires_date_pst" = "2015-05-23 10:05:59 America/Los_Angeles";
         "is_trial_period" = false;
         "original_purchase_date" = "2015-05-23 17:03:00 Etc/GMT";
         "original_purchase_date_ms" = 1432400580000;
         "original_purchase_date_pst" = "2015-05-23 10:03:00 America/Los_Angeles";
         "original_transaction_id" = 1000000156451343;
         "product_id" = "com.brianjcoleman.testiap3";
         "purchase_date" = "2015-05-23 17:02:59 Etc/GMT";
         "purchase_date_ms" = 1432400579000;
         "purchase_date_pst" = "2015-05-23 10:02:59 America/Los_Angeles";
         quantity = 1;
         "transaction_id" = 1000000156451343;
         "web_order_line_item_id" = 1000000029801713;
     }
 );
 receipt =     {
     "adam_id" = 0;
     "app_item_id" = 0;
     "application_version" = 1;
     "bundle_id" = "com.brianjcoleman.iqtest";
     "download_id" = 0;
     "in_app" =         (
                     {
             "is_trial_period" = false;
             "original_purchase_date" = "2015-05-24 01:06:58 Etc/GMT";
             "original_purchase_date_ms" = 1432429618000;
             "original_purchase_date_pst" = "2015-05-23 18:06:58 America/Los_Angeles";
             "original_transaction_id" = 1000000156455961;
             "product_id" = "com.brianjcoleman.testiap2";
             "purchase_date" = "2015-05-24 01:06:58 Etc/GMT";
             "purchase_date_ms" = 1432429618000;
             "purchase_date_pst" = "2015-05-23 18:06:58 America/Los_Angeles";
             quantity = 1;
             "transaction_id" = 1000000156455961;
         },
                     {
             "is_trial_period" = false;
             "original_purchase_date" = "2015-05-20 17:41:12 Etc/GMT";
             "original_purchase_date_ms" = 1432143672000;
             "original_purchase_date_pst" = "2015-05-20 10:41:12 America/Los_Angeles";
             "original_transaction_id" = 1000000156014803;
             "product_id" = "com.brianjcoleman.testiap1";
             "purchase_date" = "2015-05-20 17:41:12 Etc/GMT";
             "purchase_date_ms" = 1432143672000;
             "purchase_date_pst" = "2015-05-20 10:41:12 America/Los_Angeles";
             quantity = 1;
             "transaction_id" = 1000000156014803;
         }
     );
     "original_application_version" = "1.0";
     "original_purchase_date" = "2013-08-01 07:00:00 Etc/GMT";
     "original_purchase_date_ms" = 1375340400000;
     "original_purchase_date_pst" = "2013-08-01 00:00:00 America/Los_Angeles";
     "receipt_type" = ProductionSandbox;
     "request_date" = "2015-05-24 16:31:18 Etc/GMT";
     "request_date_ms" = 1432485078143;
     "request_date_pst" = "2015-05-24 09:31:18 America/Los_Angeles";
     "version_external_identifier" = 0;
 };
 status = 0;
}
```

# Một số chú ý với luồng xử lý validation 
1. Sau khi user thực hiện mua thành công trên device ( đã bị trừ tiền) -> Gửi hoá đơn tới PHP Server để xác nhận, tuy nhiên do mất mạng hoặc lí do nào đó hoá đơn này không được gửi tới server của chúng ta => thông tin mua bán sẽ chưa được cập nhật, user sẽ chưa được update các item đã mua của mình. 
Trong trường hợp này chúng ta cần đẩy việc thanh toán vào 1 queue, nếu quá trình thực hiện trơn tru, server sau khi validate thành công sẽ gửi response thành công lại cho client, client sẽ cập nhật trạng thái giao dịch thành công. Trường hợp giao dịch bị đứt quãng khi gửi receipt lên server, thì ta sẽ không cập nhật trạng thái thành công cho receipt này, khi khởi động lại app, sẽ cần check hoá đơn nếu còn hoá đơn ở trạng thái pending chưa hoàn thành sẽ gửi lại lên server để validate và cập nhật hoàn thành giao dịch nếu thành công. 
2. Việc validate trên server sẽ luôn thực hiện validate với production server trước, nếu việc thực hiện test trên sandbox thì Apple Server sẽ trả về mã lỗi 21007 báo lỗi đang thực hiện trên môi trường sandbox, khi đó ta sẽ thực hiện validate lại receipt này trên môi trường sandbox. 
Tại sao lại cần validate mấy bước loằng ngoằng như vậy: xem xét trường hợp sau: 
App sau khi up lên App Store sẽ là môi trường production => gọi tới server PHP production => server Production sẽ validate với môi trường production của Apple. Luồng như sau: 
App (production) => Our Server (production) => Apple Server (production) 
Vấn đề ở đây là: khi Apple tiến hành review chức năng in-app của chúng ta thì app là môi trường production, tuy nhiên việc mua bán in-app vẫn thực hiện trên môi trường sandbox, tức luồng sẽ như sau: 
App (production) => Our Server (production) => Apple Server (sandbox)
Trong trường hợp này sẽ trả về mã lỗi 21007 như đã nói ở trên, nếu không sử lý request tiếp lên môi trường sandbox trong trường hợp này thì app sẽ bị reject do ko Apple ko tesst được việc mua bán trong trường hợp này. 

# Tham khảo: 
http://www.brianjcoleman.com/tutorial-receipt-validation-in-swift/