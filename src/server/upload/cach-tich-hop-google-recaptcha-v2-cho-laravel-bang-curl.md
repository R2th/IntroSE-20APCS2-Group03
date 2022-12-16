# Mở đầu
Trong việc triển khai các ứng dụng web, mobile,... sẽ gặp phải trường hợp đối tượng xấu hoặc người dùng cố ý submit form liên tục 1 cách không hợp lệ (spam), điều này ảnh hưởng đến tính xác thực của thông tin trong ứng dụng, nghiêm trọng nhất là ảnh hưởng đến cơ sở dữ liệu do có quá nhiều bản ghi không hợp lệ.

Để giải quyết vấn đề này thì có khá nhiều cách, có thể lọc ip phía hosting, sử dụng bản ghi lịch sử thao tác để đánh giá độ trust của user, sử dụng xác thực người dùng thật bên thứ 3,.... Trong bài viết này mình sẽ hướng dẫn các bạn cách sử dụng Google recaptcha v2 để xác thực người dùng thật, hiện tại thì Google đã có recaptcha v3, nhưng recaptcha v2 vẫn được ưa chuộng và nhiều người sử dụng, những user hay sử dụng duyệt ẩn danh (như mình) mà gặp recaptcha v3 là tèo tèo rồi ^ ^

# Cách đăng ký Google recaptcha v2
Các bạn truy cập vào link sau để tạo key sử dụng recaptcha, nhớ đăng nhập tài khoản google trước nhé:
[Google recaptcha](https://www.google.com/recaptcha/intro/v3.html)

Sau đó bấm vào mục 'Admin console' :
![](https://images.viblo.asia/45486870-d6e2-45ad-805d-90e27d3134df.PNG)

Đối với những bạn nào chưa từng tạo repatcha thì sẽ được redirect thẳng đến trang tạo captcha lần đầu, những lần sau sẽ vào trang quản lý, muốn tạo thêm các bạn chỉ cần nhấn vào dấu + Create là được:
![](https://images.viblo.asia/ea79a6a4-fd91-40d7-a0d9-3d0d0d7ca172.png)

Ở mục label bạn điền nhãn của project, hoặc tên gì cho dễ quản lý là được, ở đây mình để là 'test' .

Ở mục recaptcha type bạn chọn *recaptcha v2*, và chọn tiếp *"I'm not a robot" checkbox* .

Mục domain thì điền domain mà sau này bạn deploy ứng dụng, hoặc đang phát triển thì điền là *localhost* như mình cũng được.

Xong rồi tích vào ô đồng ý điều khoản dịch vụ như mình, ô *send alerts to owners* bạn có thể không tích cũng được, nhưng theo mình cứ để đấy cho google gửi thông báo. Sau đó nhấn Submit.
![](https://images.viblo.asia/62510057-6b69-47bc-9074-7359407d9b66.png)
Đăng ký xong thì google sẽ cấp cho chúng ta 1 *site key* để sử dụng trên trang giao diện và 1 *secret key* để xác thực bên phía server, các bạn nhớ bảo mật *sercet key* nhé, ở đây mình làm demo nên mình không che thôi :D . Tiếp tục nhấn vào *Go to analytics* để đến trang thống kê hoặc *go to setttings* để config lại thông tin captcha.

# Tích hợp vào form phía client
Ở phía client chúng ta sẽ sử dụng *site key* , các bạn xem hướng dẫn đầy đủ của bác Gồ [tại đây](https://developers.google.com/recaptcha/docs/display) 
![](https://images.viblo.asia/d5fb67b0-bf29-450c-9b9a-371880624171.png)

Các bạn thêm script của google recaptcha vào trong phần *head* của trang, và trong cặp thẻ *form* thì thêm vào thẻ div như hình bên dưới, trong phần *data-sitekey="your_site_key"* thì thay *your_site_key* bằng site_key bạn vừa đăng ký ở trên. thẻ div này sẽ tự tạo ra 1 trường input có tên là *g-recaptcha-response* để gửi về phía server xác thực. Tạm xong phần client :3 

# Xác thực bên phía server
Các bạn có thể xem hướng dẫn đầy đủ của Google [tại đây](https://developers.google.com/recaptcha/docs/verify)

Có nhiều cách để xác thực như sử dụng guzzlehttp, sử dung curl,... trong bài này mình sẽ hướng dẫn các bạn sử dụng curl có sẵn, không phải cài đặt.

Bên phía controller thì các bạn tạo function xử lý tương ứng với route, ở đây mình ví dụ 1 function xử lý Comment trong bài viết :
```php
function postComment(Request $request,$id){

        $recaptcha_secret = "6Lc8hp0UAAAAAD7Ix0sFRazaixdqnH8x--pzV5dl";  //khóa bí mật tùy theo project
        $recaptcha_response = $request->input('g-recaptcha-response');  // token xác thực từ client gửi về
 
        $veri = curl_init();  //hàm khởi tạo
 
        $captcha_url = "https://www.google.com/recaptcha/api/siteverify";  //url xác thực của google
        //các câu lệnh set option cho biến xác thực
        curl_setopt($veri,CURLOPT_URL,$captcha_url);
        curl_setopt($veri,CURLOPT_POST,true);
        curl_setopt($veri,CURLOPT_POSTFIELDS,"secret=".$recaptcha_secret."&response=".$recaptcha_response);
        curl_setopt($veri,CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($veri,CURLOPT_RETURNTRANSFER,true);

        $recaptcha_output = curl_exec($veri); //thực thi và lấy kết quả

        curl_close($veri); //đóng 

        $decode_captcha = json_decode($recaptcha_output);  //dịch ngược json

        $captcha_status = $decode_captcha->success; //lấy giá trị key success

        if ($captcha_status == true){
            // do somethings here
            $cm->save();
            return redirect()->back()->with('thongbao','Bình luận thành công');
        }else{
            return redirect()->back()->with('thongbao','Bình luận không thành công,bạn chưa vượt qua Captcha');
        }
    }
```

Vậy là xong rồi, mặc dù recaptcha v2 có thể vượt được nhưng mà cũng phải đầu tư kha khá đấy (gõ captcha thuê) nhưng vẫn được sử dụng khá rộng dãi nhờ tính linh hoạt, chứ recaptcha v3 xác thực dựa vào chấm điểm mà dùng tab ẩn danh là failed rồi :D

Hy vọng bài viết của mình có thể giúp ích được cho những bạn đang tìm hiểu cách tích hợp captcha vào ứng dụng/sản phẩm của mình. Chúc các bạn thành công!

Tham khảo:
*  [https://stackoverflow.com/questions/50253428/...](https://stackoverflow.com/questions/50253428/verify-recaptcha-v2-always-false)
*  [https://stackoverflow.com/questions/31354633/....](https://stackoverflow.com/questions/31354633/curl-recaptcha-not-working-php)