# LINEPAY là gì?
LinePay là ví điện tử tích hợp của Line dùng như một cổng thanh toán các dịch vụ. LinePay chủ yếu là thị trường Nhật Bản sử dụng để thanh toán ngay tại các cửa hàng thực tế ngoại tuyến. Đây là loại thẻ trả trước có thể sử dụng tại 30 triệu cửa hàng tại Nhật và ở nước ngoài cùng với JCB. Về bản chất, tính năng lớn nhất của thẻ LINE Pay là tích lũy "LINE Points" mỗi khi bạn sử dụng như một thẻ tín dụng, tỉ lệ trả điểm vào khoảng 2% (2 điểm cho mỗi 100 yên).

# LINEPAY API? 
Thiết kế hệ thống cho LinePay
![](https://images.viblo.asia/a5e40e11-ce70-4484-9138-39ae7941d67a.png)
Các thức đăng ký trở thành người bán hàng trên LINEPAY
### Quy trình đăng ký sử dụng Linepay
![](https://images.viblo.asia/419b5cff-3583-4ce7-86d3-8610daeaa716.png)
1. Truy cập trang (https://pay.line.me)
2. Điền các thông tin cơ bản cần thiết
3. Đăng ký trở thành người bán hàng ( quy trình review của linepay)
4. Đồng ý với các phí và chu kỳ thanh toán của LINEPAY và xác nhận mã PIN danh tính
5. Hoàn tất đăng ký
6. Xác nhận email để kết thúc quy trình đăng ký
### Quy trình sử dụng LINEPAY để thanh toán
![](https://images.viblo.asia/bb0686ea-832d-49be-a5d6-fadbd5d0c3eb.png)
1. RESERVE: Call API reserve - trạng thái lần đần tiên kết nối
2. AUTH: Lựa chọn thanh toán từ ứng dụng LINE Pay và cho phép sử dụng thanh toán từ LINE Pay thành công
3. CANCEL: Hủy thanh toán từ LINEPAY
4. CAPTURE_WAIT: Trạng thái "WAIT" được xác nhận khi một parameter của RESERVE API trả về "False"
### Quy trình thanh toán bằng PC ( WEB Browser nói chung)
![](https://images.viblo.asia/6f9ddfbd-82c9-4e43-b266-ab28b5ce5d96.png)
1. Người dùng lựa chọn phương thức thanh toán từ việc đặt hàng
2. Dịch vụ sẽ gọi API Reserve Payment và tạo ra một thông tin đặt hàng với transactions_id. Với các tham số đầu vào được khai báo, khách hàng sẽ được trả về 1 đường dẫn "paymentUrl"
Request:
```
POST https://sandbox-api-pay.line.me/v2/payments/request HTTP/1.1
Content-Type: application/json
X-LINE-ChannelId: {channel id}
X-LINE-ChannelSecret: {channel secret}
X-LINE-MerchantDeviceProfileId: {DEVICE_PROFILE_ID}
{
    "productName": "Test Product",
    "orderId": "ORD_i0q1kW0yFrOp0fCAvctq7g6Y3",
    "confirmUrlType": "CLIENT",
    "currency": "JPY",
    "amount": 100,
    "capture": true,
    "payType": "NORMAL",
    "cancelUrl": "https://tools-merchant.com/payment/general/confirm?type=cancel",
    "confirmUrl": "https://tools-merchant.com/payment/general/confirm?orderId=ORD_i0q1kW0yFrOp0fCAvctq7g6Y3",
    "productImageUrl": "https://tools-merchant.com/cony-money-box-1.jpg",
    "extras": {
        "addFriends": [{
            "type": "LINE_AT",
            "idList": ["@aaa", "@bbb"]
        }],
        "branchName": "test_branch_1",
        "branchId": "branch1"
    }
```
RESPONSE
```
{
    "returnCode": "0000",
    "returnMessage": "Success.",
    "info": {
        "paymentUrl": {
            "web": "https://sandbox-web-pay.line.me/web/payment/wait?transactionReserveId=cFJFbUx5aU5NSGxZUmRnWmtQV1ZPT3pZb0c3Ym9NcGMvM0s3WGdHc2JGeGUyU09mNGRJRi83ZWxzL3l3OVEreg",
            "app": "line://pay/payment/cFJFbUx5aU5NSGxZUmRnWmtQV1ZPT3pZb0c3Ym9NcGMvM0s3WGdHc2JGeGUyU09mNGRJRi83ZWxzL3l3OVEreg"
        },
        "transactionId": "2019061311372683710",
        "paymentAccessToken": "113552948987"
    }
}
```

Sau khi redirect đến đường dẫn thanh toán, hệ thống sẽ cần confirm lại thanh toán được tạo ra
REQUEST:
```
POST https://sandbox-api-pay.line.me/v2/payments/2019061211372655410/confirm HTTP/1.1
Content-Type: application/json
X-LINE-ChannelId: {channel id}
X-LINE-ChannelSecret: {channel secret}
X-LINE-MerchantDeviceProfileId: {DEVICE_PROFILE_ID}
{
    "amount": 1000,
    "currency": "JPY"
}
```

RESPONSE:
```
{
    "returnCode": "0000",
    "returnMessage": "Success.",
    "info": {
        "transactionId": 2019061211372655410,
        "orderId": "ORD_SMCD1JHbLLvdESnykyJjgGQ3Q",
        "payInfo": [{
            "method": "BALANCE",
            "amount": 889
        }, {
            "method": "DISCOUNT",
            "amount": 111
        }]
    }
}
```

Khi confirm xong, việc ghi nhận đơn hàng sẽ là thành công.
Example gửi nhận thông tin trong linepay
REQUEST:
Danh sách các API cần gọi tham chiếu: 
```
protected static $apiUris = [
        'request' => '/v3/payments/request',
        'confirm' => '/v3/payments/{transactionId}/confirm',
        'refund' => '/v3/payments/{transactionId}/refund',
        'details' => '/v3/payments',
        'check' => '/v3/payments/requests/{transactionId}/check',
        'authorizationsCapture' => '/v3/payments/authorizations/{transactionId}/capture',
        'authorizationsVoid' => '/v3/payments/authorizations/{transactionId}/void',
        'preapproved' => '/v3/payments/preapprovedPay/{regKey}/payment',
        'preapprovedCheck' => '/v3/payments/preapprovedPay/{regKey}/check',  
        'preapprovedExpire' => '/v3/payments/preapprovedPay/{regKey}/expire',
        'oneTimeKeysPay' => '/v2/payments/oneTimeKeys/pay',
        'ordersCheck' => '/v2/payments/orders/{orderId}/check',
        'ordersVoid' => '/v2/payments/orders/{orderId}/void',
        'ordersCapture' => '/v2/payments/orders/{orderId}/capture',
        'ordersRefund' => '/v2/payments/orders/{orderId}/refund',
        'authorizations' => '/v2/payments/authorizations',
    ];
```

Hàm __construct 
```
function __construct($optParams) 
    {
        // Assignment
        $channelId = isset($optParams['channelId']) ? $optParams['channelId'] : null;
        $channelSecret = isset($optParams['channelSecret']) ? $optParams['channelSecret'] : null;
        $merchantDeviceType = isset($optParams['merchantDeviceType']) ? $optParams['merchantDeviceType'] : null;
        $merchantDeviceProfileId = isset($optParams['merchantDeviceProfileId']) ? $optParams['merchantDeviceProfileId'] : null;
        $isSandbox = isset($optParams['isSandbox']) ? $optParams['isSandbox'] : false;
        // Check
        if (!$channelId || !$channelSecret) {
            throw new Exception("channelId/channelSecret are required", 400);
        }
        // Base URI
        $baseUri = ($isSandbox) ? self::SANDBOX_API_HOST : self::API_HOST;
        // Headers
        $headers = [
            'Content-Type' => 'application/json',
            'X-LINE-ChannelId' => $channelId,
        ];
        // Save channel secret
        $this->channelSecret = (string) $channelSecret;
        // MerchantDeviceType
        if ($merchantDeviceType) {
            $headers['X-LINE-MerchantDeviceType'] = $merchantDeviceType;
        }
        // MerchantDeviceProfileId
        if ($merchantDeviceProfileId) {
            $headers['X-LINE-MerchantDeviceProfileId'] = $merchantDeviceProfileId;
        }
        // Load GuzzleHttp\Client
        $this->httpClient = new HttpClient([
            'base_uri' => $baseUri,
            // 'timeout'  => 6.0,
            'headers' => $headers,
            'http_errors' => false,
        ]);
        return $this;
    }
```

Handle request gửi đi
```
protected function requestHandler($version, $method, $uri, $queryParams=null, $bodyParams=null, $options=[])
    {
        // Headers
        $headers = [];
        // Query String
        $queryString = ($queryParams) ? http_build_query($queryParams) : null;
        $url = ($queryParams) ? "{$uri}?{$queryString}" : $uri ;
        // Body
        $body = ($bodyParams) ? json_encode($bodyParams) : '';
        // Guzzle on_stats
        $stats = null;
        $options['on_stats'] = function (\GuzzleHttp\TransferStats $transferStats) use (&$stats) {
            // Assign object
            $stats = $transferStats;
            $stats->responseTime = microtime(true);
            $stats->requestTime = $stats->responseTime - $stats->getTransferTime();
        };
        switch ($version) {
            case 'v2':
                // V2 API Authentication
                $headers['X-LINE-ChannelSecret'] = $this->channelSecret;
                break;
            
            case 'v3':
            default:
                // V3 API Authentication
                $authNonce = date('c'); // ISO 8601 date
                $authParams = ($method=='GET' && $queryParams) ? $queryString : (($bodyParams) ? $body : null);
                $authMacText = $this->channelSecret . $uri . $authParams . $authNonce;
                $headers['X-LINE-Authorization'] = base64_encode(hash_hmac('sha256', $authMacText, $this->channelSecret, true));
                $headers['X-LINE-Authorization-Nonce'] = $authNonce;
                break;
        }
        // Send request with PSR-7 pattern
        $this->request = new Request($method, $url, $headers, $body);
        $this->request->timestamp = microtime(true);
        try {
            $response = $this->httpClient->send($this->request, $options);
        } catch (\GuzzleHttp\Exception\ConnectException $e) {
            throw new \yidas\linePay\exception\ConnectException($e->getMessage(), $this->request);
        }
        return new Response($response, $stats);
    }
```
Request tạo đơn hàng
```
public function request($bodyParams)
    {
        return $this->requestHandler('v3', 'POST', self::$apiUris['request'], null, $bodyParams, [
            'connect_timeout' => 5,
            'timeout' => 20,
            ]);
    }
```

Request confirm đơn hàng
```
 public function confirm($transactionId, $bodyParams)
    {
        return $this->requestHandler('v3', 'POST', str_replace('{transactionId}', $transactionId, self::$apiUris['confirm']), null, $bodyParams, [
            'connect_timeout' => 5,
            'timeout' => 40,
            ]);
    }
```