**Call API qua ví dụ thực tế.**

Là công việc thường xuyên của các lập trình viên web, đặc biệt là các lập trình viên Backend!

Trong laravel, Intern hoặc Fresher thường viết Function call api trong Controller. Còn với junior & senior họ còn viết trong Command, Service nữa. 
Bài viết này mình sẽ chia sẻ cách call api trong Controller.

Nào mình cùng bắt đầu nhé!

Đầu tiên mình cần apiUrl, trong dự án Api thường sẽ đến từ lập trình viên Backend. Kèm theo đó, lập trình viên backend sẽ cho bạn biết api cần những thông tin đầu vào là gì để API có thể trả dữ liệu về,
nó có dạng như Url thường là: "https://abc.def.xxx/{email}/{phone}"

Trong Url API trên, ta thấy có đường dẫn và 2 biến được đặt trong cặp ngoặc nhọn { } là email và phone. Nghĩa là, API này muốn call nó, chúng ta phải truyền hai biến email và phone vào url.
Tùy vào yêu cầu của backend mà dữ liệu được truyền theo phương thức POST hoặc GET khác nhau. Thường dùng là phương thức POST.
Trong ví dụ này:
$apiUrl có dạng như sau: backend yêu cầu Post email hoặc phone kèm theo để lấy thông tin người dùng trong hệ thống!

![](https://images.viblo.asia/70401ece-1fba-4e96-9502-d2f4a35d72d2.jpg)

 và mình sẽ cần biến $postinput như sau:
 
 ![](https://images.viblo.asia/87c5704b-ef7e-4db3-afc3-07933297ebd7.jpg)
 
 Tiếp theo mình cần biến $header như sau:
 
 ![](https://images.viblo.asia/dd14f387-2a24-4a8b-a73f-5750c5cb43a7.jpg)
 
 Gần xong rồi, giờ sẽ lấy được dữ liệu về bằng cách kết nối 3 thành phần trên lại với nhau như sau:
 
 ![](https://images.viblo.asia/e856bd8d-3915-4ac8-b4a4-2231633a7cce.jpg)
 
 Khi mình gọi API, serve bên kia sẽ trả về cho mình trạng thái kết nối: thường có 3 trạng thái hay gặp: 200 - 404 - 500.
 Trong đó trạng thái 200 là báo kết nối thành công, 404 vs 500 là các lỗi khác nhau.
Mình cần kiểm tra trạng thái đó bằng cách check status code thông qua câu lệnh:

![](https://images.viblo.asia/aa527f58-8012-4644-9e3c-814841d5952f.jpg)

Khi status code = 200 nghĩa là kết nối API thành công, ta sẽ lấy dữ liệu từ đó thông qua câu lệnh sau:

![](https://images.viblo.asia/374705aa-caed-4c4f-8a56-5d99cdca596a.jpg)

 dữ liệu ta nhận về thường là một mảng, công việc tiếp theo của mình là truyền mảng đó qua view và hiển thị dữ liệu lên view.
 
Trên đây là chia sẻ của mình về Post to call api, do là bài viết đầu tiên của mình nên chỗ nào khó hiểu các bạn cho mình ý kiến với nha.

Bài viết tiếp theo của mình sẽ chia sẻ các call api không cần truyền input, các bạn chú ý theo dõi nhé!
Cảm ơn các bạn nhiều!
Đây là code mẫu của mình: 

$apiURL = 'https://abcxyz.vv.vn/v1/user/list';

            $postInput = [
                "email" => $emailfillter,
                "phone" => $phonefillter
            ];
            
            $headers = [
                'X-header' => 'value'
            ];
            
            $response = Http::withHeaders($headers)->post($apiURL, $postInput);
            
            $statusCode = $response->status();            
            
            if ($statusCode == 200) {
                $responseBody = json_decode($response->getBody(), true);
                $data = $responseBody;
            }
            
Chúc các bạn thành công