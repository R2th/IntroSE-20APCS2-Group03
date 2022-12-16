### Đặt vấn đề
![](https://images.viblo.asia/46ce8080-f75b-48a4-80f9-afe6997b3f75.jpg)
1. Excel được sử dụng rộng rãi
Mặc dù nhiều người đang sử dụng Sheets như một công cụ bảng tính, nhưng Excel vẫn được tin dùng vì sự thoải mái. Phải mất một số lượng đáng kể về thời gian cho người sử dụng để chuyển sang một ứng dụng mới và và thoải mái như vậy giống như Excel.
Đến nay, chúng ta đã xem xét những lý do mà bạn sẽ chọn Microsoft Excel cho bảng tính. Giờ là thời gian tìm hiểu về Sheets với nhiều tính năng ấn tượng mà nó sở hữu. Google Sheets có nhiều tính năng không chỉ là phiên bản Excel trên Google. Hãy cùng xem xét những lý do mà Sheets luôn xứng đáng để bạn cân nhắc:

1. Sheets đã được kết nối
Trên tất cả, một lợi thế quan trọng của Sheets là kết nối và tích hợp với các ứng dụng khác. Ta cũng có thể thấy rằng hầu hết các dữ liệu bảng tính không phải gõ từ đầu — nó thường được nhập từ các nguồn khác như web hoặc các ứng dụng khác.

Vì Sheets thường truy xuất trực tiếp vào các nguồn dữ liệu khác nên giúp tiết kiệm rất nhiều thời gian bằng cách kết nối trực tiếp với các ứng dụng khác và kéo các dữ liệu vào bảng tính.

Chắc chắn là mỗi ứng dụng đều có lợi thế riêng. Vậy bạn nên chọn ứng dụng nào? Như mọi khi, các ứng dụng mà bạn chọn để sử dụng là một vấn đề thuộc về sở thích cá nhân và tùy vào cách bạn sẽ sử dụng nó.

Nếu dữ liệu của bạn sẽ mở rộng đến hàng ngàn dòng và bạn có thể cần phải thực hiện phân tích và tính toán phức tạp thì Microsoft Excel là công cụ tốt nhất cho công việc. Nó là công cụ giúp ta thoải mái nhất vì đơn giản là chúng ta dành hàng giờ làm việc với nó.

Nhưng điều đó không có nghĩa là Google Sheets không có mặt trong công việc hàng ngày của chúng ta. Thực tế, chúng ta thường xuyên sử dụng bảng tính như một vùng tạm và đặt những ý tưởng. Ta có thể bắt đầu với một trang trống và tạo ra dữ liệu được phân loại.

Bởi vì có nhiều người dùng Mac và không thích sử dụng Excel cho Mac (xin lỗi Microsoft), Google Sheets là ứng dụng cho công việc hàng ngày của họ. Vì vậy sử dụng Google Sheets, nó dễ dàng để bắt đầu. Và có thể ai cũng thích làm việc nhẹ nhàng với nó và dễ dàng mời người khác làm việc cùng trên Google Sheets.
### Cài đặt trên google developers
Các bạn truy cập vào trang: https://console.developers.google.com.

Tiếp tục chọn mục library rồi tìm kiếm Google Sheets API rồi ENABLE nó lên, bắt buộc phải ENABLE thì chúng ta mới dùng được api của google sheets.
![](https://images.viblo.asia/cda3f0a6-091a-4483-8a65-fc6c4ec14096.PNG)

Sau đó chọn mục Credentials rồi tiến hành tạo 1 *Oauth 2.0 client IDs* như trong hình để ứng dụng của chúng ta có thể xác thực tài khoản google.
![](https://images.viblo.asia/4a22a8d8-091b-4a8a-b456-aa812fbb2526.PNG)
### Cài đặt project
Khởi tao project laravel
```
composer create-project --prefer-dist laravel/laravel google-sheet-laravel
```
Sau khi tọa xong project laravel, ta cần cài thêm package google/apiclient để có thể viết google api cũng như thao tác với google sheets tại project.
```bash
composer require google/apiclient
```
![](https://images.viblo.asia/231a05a8-4444-4947-85f1-68687b6e2c74.PNG)
Sau khi đã tải về client_secret.json và đưa nó vào trong folder public.
Use 2 class của google/apiclient mà chúng ta cần sử dụng:
```php
    use Google_Client;
    use Google_Service_Sheets; 
```
Và cần xác thực với tài khoản google để thao tác với nó, chú ý phải thêm scope *\Google_Service_Sheets::SPREADSHEETS* để google cấp quyền truy cập đến google sheets.
![](https://images.viblo.asia/8c9dc8d3-ba64-4133-9a6c-3949a8fd5eb2.PNG)

Xác thực lại tài khoản và bấm cho phép là done rồi nhé. Google sẽ trả về một response code và ta cần thực hiện tiếp :sweat_smile::sweat_smile::sweat_smile:
```php
    protected $client;

    public function __construct()
    {
        $client = new Google_Client();
        $client->setAuthConfig('client_secret.json');
        $client->addScope([
            \Google_Service_Sheets::SPREADSHEETS
        ]);

        $guzzleClient = new \GuzzleHttp\Client(array('curl' => array(CURLOPT_SSL_VERIFYPEER => false)));
        $client->setHttpClient($guzzleClient);
        $this->client = $client;
    }
```
Bước tiếp theo chúng ta cần tạo một session để đảm bảo rằng ứng dụng của ta luôn kết nối được api đến google
```php
public function oauth()
    {
        session_start();

        $rurl = action('SheetController@oauth');
        $this->client->setRedirectUri($rurl);
        if (!isset($_GET['code'])) {
            $auth_url = $this->client->createAuthUrl();
            $filtered_url = filter_var($auth_url, FILTER_SANITIZE_URL);
            return redirect($filtered_url);
        } else {
            $this->client->authenticate($_GET['code']);
            $_SESSION['access_token'] = $this->client->getAccessToken();

            return redirect()->route('cal.index');
        }
    }
```
 Để thêm 1 bản ghi mới lên trên google sheets cũng khá đơn giản, ta cần sử dụng function spreadsheets_values->get() của Google_Service_Sheets. Chúng ta cần phải lấy *SheetId*, id của bản sheets lấy trên url của nó và rang mà chúng ta muốn đẩy dữ liệu vào. Ở đây mình đang để rang có tên là *rang test*
```php
    public function store(Request $request)
    {
        session_start();
        $service = new \Google_Service_Sheets($this->client);

        $spreadsheetId = [SheetId]; // Điền sheetId ở đây, lấy trên link của sheet nhé
        $range = 'rang test';
        $responseGet = $service->spreadsheets_values->get($spreadsheetId, $range);
        $data = [
            [
                'Quy',
                'Male',
                '12/12',
                'HN',
                'Vietnamese',
                'LOL Cub'
            ]
        ];
        $requestBody = new \Google_Service_Sheets_ValueRange([
            'values' => $data
        ]);
        $params = [
            'valueInputOption' => 'RAW'
        ];
        $response = $service->spreadsheets_values->append($spreadsheetId, $range, $requestBody, $params);
    }
```

Cuối cùng là tạo route để chúng ta có thể test những gì mình làm được nhỉ :laughing::laughing::laughing:
```php
Route::resource('sheets', 'SheetController');
Route::get('oauth', ['as' => 'oauthCallback', 'uses' => 'SheetController@oauth']);
```
Kết quả thu được là dữ liệu mà chúng ta muốn thêm đã có trên sheet rồi. Tuy nhiên trong quá trình export data có khá nhiều trường hợp xảy ra, bạn có thể vận dụng linh hoạt các api để có thể export ra luồng data theo ý mình.
![](https://images.viblo.asia/bd74d2f4-14a3-4c0b-bf01-1caaf5ec809c.PNG)
### Kết luận
Việc export data là việc không thể thiếu của mỗi dự án, tuy nhiên lựa chọn Microsoft Excel hay Google Sheets thì còn phụ thuộc vào các team nữa. Bạn cũng có thể note lại cái này để sử dụng khi cần. Cảm ơn bạn đã đọc hết bài này của mình!
![](https://images.viblo.asia/44306c29-91cb-43f1-9ca1-b6ebeb10fb48.jpg)