# Giới Thiệu

CURL là bộ thư viện được sử dụng để giúp thực hiện việc chuyển dữ liệu thông qua nhiều giao thức khác nhau (như HTTP, FPT...). Với giao thức HTTP, cURL hỗ trợ việc gửi dữ liệu sử dụng tất cả các phương thức hiện có như GET, POST, PUT, DELETE... cURL cũng hỗ trợ việc chuyền dữ liệu sử dụng giao thức HTTPS. Ngoài ra, chúng ta cũng có thể thực hiện việc xác thực request gửi đi thông qua cURL. Việc xác thực có thể được thực hiện thông qua việc thiết lập header cho request hoặc sử dụng cookies...

Trong bài viết này chúng ta sẽ tìm hiểu cURL được sử dụng trong ngôn ngữ PHP như thế nào.

Lưu ý: Nếu bạn sử dụng Linux thì sau khi đọc bài viết này bạn có thể tham khảo thêm bài viết sử dụng curl trên cửa sổ dòng lệnh để biết cách sử dụng câu lệnh curl trên terminal của Linux.

# Ví dụ dùng CURL trong PHP
Một ứng dụng CURL thường có 3 bước cơ bản:

Bước 1: Khởi tạo CURL

Bước 2: Cấu hình thông số cho CURL

Bước 3: Thực thi CURL

Bước 4: Ngắt CURL, giải phóng dữ liệu

```
// Tạo mới một CURL

$ch = curl_init();

 

// Cấu hình cho CURL

curl_setopt($ch, CURLOPT_URL, "https://viblo.asia/");

 

// Thực thi CURL

curl_exec($ch);

 

// Ngắt CURL, giải phóng

curl_close($ch);
```

Trong phần cấu hình, chúng ta đặc biệt chú ý đến lệnh curl_setopt(1,2,3);

Đây là một hàm quan trọng trong CURL để xử lí các dữ liệu vào.

Curl_setopt(1,2,3) có 3 tham số đầu vào:

* 1 là đối tượng CURL
* 2 là tên cấu hình
* 3 là giá trị
Một số tên cấu hình thông dụng với CURL:

* CURLOPT_URL: đường dẫn tới URL cần xử lý
* CURLOPT_RETURNTRANSFER: nếu true thì sẽ trả kết quả về ở hàm curl_exec nên ta phải echo kết quả đó mới in lên trình duyệt, nếu false thì thực thi là nó in kết quả lên trình duyệt luôn
* CURLOPT_USERAGENT: Dùng để giả lập đang gửi ở trình duyệt nào (user agent)
* CURLOPT_TIMEOUT: Thiết lập thời gian sống của một request CURL
* CURLOPT_FILE: Lưu kết quả vào file
* CURLOPT_POSTFIELDS: giá trị của nó chính là một mảng các key => value, tương ứng với name và value của nó trong các thẻ input khi submit FORM
…..
Ngoài ra còn có rất nhiều Option với các value khác nữa đối với hàm CURL_setopt mà trong bài viết này không thể liệt kê hết được. Nếu các bạn thực sự quan tâm có thể vào trang chủ của php để tìm hiểu thêm:  http://php.net/manual/en/function.curl-setopt.php

## Ví dụ sau sử dụng CURL gọi theo phương thức GET lấy dữ liệu JSON thời tiết hiện tại của Hà Nội, Việt Nam từ dịch vụ thời tiết của YAHOO:
```
<?//-----------------------------------------------------------------------------------
 
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 0,
    CURLOPT_URL => 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22hanoi%2C%20vietnam%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
    CURLOPT_USERAGENT => 'Viblo test cURL Request',
    CURLOPT_SSL_VERIFYPEER => false
));

$resp = curl_exec($curl);

//Dữ liệu thời tiết ở dạng JSON
$weather = json_decode($resp);
var_dump($weather);

curl_close($curl);
```

## Ví dụ sử dụng CURL POST

Ví dụ sau sử dụng dịch vụ chạy thử REST ở địa chỉ https://reqres.in/api/register để thử POST đăng nhập hệ thống. Thông tin đăng nhập gồm email và passowrd. Bạn chạy thử, thử thay cả email khác.


```
//-----------------------------------------------------------------------------------
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'https://reqres.in/api/register',
    CURLOPT_USERAGENT => 'Viblo Exmaple POST',
    CURLOPT_POST => 1,
    CURLOPT_SSL_VERIFYPEER => false, //Bỏ kiểm SSL
    CURLOPT_POSTFIELDS => http_build_query(array(
        'email' => 'sydney@fife',
        'password' => 'pistol'
    ))
));
$resp = curl_exec($curl);

var_dump($resp);

curl_close($curl);
//-----------------------------------------------------------------------------------
?>
```

# Sử dụng CURL post dữ liệu JSON

Rất nhiều dịch vụ Webservice ví dụ của Google, Facebook ... sử dụng REST post JSON để làm việc, chứ không hẳn là POST kiểu như FORM HTML post lên, trong trường hợp này thực hiện các bước

* Mảng dữ liệu POST phải chuyển thành chuỗi json với hàm json_encode
* Thiết lập thêm CURLOPT_HTTPHEADER với kiểu application/json
* Thiết lập thêm CURLOPT_CUSTOMREQUEST là POST, PUT ... tùy thuộc dịch vụ

Ví dụ

```
$data = array("name" => "Hagrid", "age" => "36");
$data_string = json_encode($data);

$curl = curl_init('http://example.api.com');

curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string))
);

$result = curl_exec($curl);
curl_close($curl);
```


Với ba đoạn trên, bạn có thẩy lấy dữ liệu từ site khác đưa vào site đích một cách đơn giản. Ngoài ra bạn có thể sử dụng một số hàm sau cho mục đích nâng cao hơn.đặt một User-agent tùy biến ( giả tên trình duyệt một cách ngẫu nhiên-“random”)

```
function getRandomUserAgent()

{

    $userAgents=array(

        "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6)    Gecko/20070725 Firefox/2.0.0.6",

        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",

        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30)",

        "Opera/9.20 (Windows NT 6.0; U; en)",

        "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 8.50",

        "Mozilla/4.0 (compatible; MSIE 6.0; MSIE 5.5; Windows NT 5.1) Opera 7.02 [en]",

        "Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; fr; rv:1.7) Gecko/20040624 Firefox/0.9",

        "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/48 (like Gecko) Safari/48"       

    );

    $random = rand(0,count($userAgents)-1);

 

    return $userAgents[$random];

}
```

Sau đó có thể dùng tiếp Option CURLOPT_USERAGENT để đặt trình duyệt giả


`curl_setopt($ch,CURLOPT_USERAGENT,getRandomUserAgent());`

* Xử lí redirects

Để xử lí điều hướng URL, ta có thể sử dụng Option CURLOPT_FOLLOWLOCATION với Value là TRUE. Số lượng lớn nhất của redirects được điều khiển bằng Option CURLOPT_MAXREDIRS

```
curl_setopt($ch,CURLOPT_FOLLOWLOCATION,TRUE);

curl_setopt($ch,CURLOPT_MAXREDIRS,2);//only 2 redirects
```

# Tham Khảo

http://php.net/manual/en/book.curl.php