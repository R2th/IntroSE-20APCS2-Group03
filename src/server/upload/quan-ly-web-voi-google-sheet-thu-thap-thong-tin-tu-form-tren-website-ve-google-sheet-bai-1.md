# Câu chuyện
Câu chuyện là khi xay dựng 1 website, thì việc đầu tiên bạn nghĩ tới là gì? Tất nhiên là dựng web bằng cái gì rồi :D Bằng PHP? Bằng Ruby? Bằng Java? Mà dùng mấy cái này lại phải cài đặt môi trường, ngại nhỉ? Cài đặt hay lỗi lắm, cứ dùng html không, rồi thêm các link cdn gắn vào dùng js các thứ có phải đơn giản nhanh gọn ko :D. Rồi cơ sở dữ liệu nữa, nên dùng mySQL hay gì? Giả sử bạn có ý định làm 1 web nhỏ thôi, chức năng ít, content ít, mà lúc build nghĩ đến phải cài đặt từ đầu với đám nặng nề kia cũng hơi... lười nhỉ? 

==> Giải pháp nho nhỏ: Nếu web nhỏ, content không nhiều, thì hãy theo dõi những bài viết này và tiếp sau đây của mình nhé, mình sẽ giúp các bạn xây dựng 1 web site mà quản lý nội dung bằng `ajax` gửi sang... Google sheet, không cần bạn biết PHP, Ruby, hay Java cho phức tạp, chỉ cần biết `html`, và 1 ít cách dùng `ajax` cộng thêm nội dung từ bài viết là được nhé :D

Bài toán hôm nay sẽ là: thu thập thông tin từ form html trên web, collect về google sheet. Lúc tìm hiểu nội dung này mình tìm được 2 cách:
 - Sử dụng ajax gửi tới 1 form Google Form có sẵn, sau đấy thì kết quả sẽ nằm ở file excel response của google. Cách này bạn có thể cùng lúc dùng form google thu thập dữ liệu, và dùng form trên web của bạn đổ về cùng form đó mà không cần phải nhúng form trong khi bạn đã có 1 giao diện form đẹp đẽ đã được build rồi :D
 - Sử dụng script trong Google sheet: cách này yêu cầu liên quan 1 chút về bảo mật nên không khuyến khích các bạn sử dụng các tài khoản công ty, hay tài khoản nhiều thông tin quan trọng để thực hành nhé, bù lại cách này giấu được link gốc tới file sheet của các bạn
 
Phần 1 mình sẽ giới thiệu cách đầu tiên nhé: Sử dụng Form response.
# Bắt tay vào làm
## Chuẩn bị
Để có thể dùng thì bạn chỉ cần:
 -  1 ít thôi kiến thức về Ajax (thực ra đi copy code cũng được, nhưng nếu bạn biết 1 ít thì mới custom lại theo mong muốn riêng của bạn được nhé)
 -  1 file Google Excel để lưu trữ thông tin trên drive mà bạn là owner (cái này mà không biết tạo thì mình cũng (quỳ))
 -  1 form html và bạn biết dùng cái Form này :D, trong bài mình dùng 1 file `.html` đơn giản nhất, không có yêu cầu PHP, ruby hay ngôn ngữ gì khác, với Ajax thì sử dụng link CDN khai báo trên header luôn
 -  1 file JS viết mã xử lý code đưa dữ liệu sang file excel (hoặc viết luôn vào thẻ script ở cuối file html cũng được)
 -  Môi trường và cài đặt: bạn cần 1 trình duyệt (mình sử dụng Chrome), 1 công cụ để... code, vậy thôi. Không cần mySQL, không cần PHP hay rails... 
## Xử lý phần Google Form & Google sheet response
Việc đầu tiên đương nhiên là các bạn sẽ cần vào tài khoản google của bạn để tạo 1 Form cái đã.
![](https://images.viblo.asia/895f8073-c635-4cb2-ae56-bb8c11759031.png)

Sau khi tạo 1 form như trên, giờ cần phải có file excel lưu lại dữ liệu cần thu thập, sử dụng form này auto render ra file excel mới luôn nhé :D

Các bạn chọn tab `Response`,  chọn vào biểu tượng google sheet như bên dưới: (đừng để ý chỗ response kia, mình tạo dữ liệu test cho mọi người nên có sẵn 4 cái đấy :D )
![](https://images.viblo.asia/2f988259-aabc-4dfa-88e4-980b2fd5b845.png)

Sau đấy chọn Render ra 1 file excel mới nhé, sau này các câu trả lời form sẽ được lưu lại ở đó.

Giờ bạn sẽ có 1 file excel được tạo ra với hàng đầu tiên là Timestamp và lần lượt các câu hỏi trong form của bạn.

Đã xong phần tạo form, tiếp theo, bạn sẽ cần thông tin của form này để sử dụng: Quay trở lại Form vừa tạo, chọn Xem trước - Preview (biểu tượng con mắt) để mở mẫu form ra 1 trang khác. Các bạn note lại cho mình các thông tin sau nhé:
* Link form: tại trang Xem trước biểu mẫu, các bạn sẽ copy URL của trang này, nó có dạng như sau: (chú ý có chữ `/viewform` ở cuối nhé)
>  https://docs.google.com/forms/d/e/1FAIpQLSdDl_lqF70OXMNCqLZEErqKGh1doSrYX-CuAbGFlQeH6Gr73Q/viewform

=> Thì các bạn note lại link URL trên cho mình, bỏ đuôi `/viewform` đi thay bằng `/formResponse?`. Kết quả Lưu lại như sau: 
> https://docs.google.com/forms/d/e/1FAIpQLSdDl_lqF70OXMNCqLZEErqKGh1doSrYX-CuAbGFlQeH6Gr73Q/formResponse?
* Lưu lại các trường của form: Các bạn sẽ `Inspect` từng `input` sử dụng để điền câu trả lời ứng với các câu hỏi, tìm tới **attribute `name`** của input, và lưu lại từng cái nhé. Nó sẽ có dạng `entry.123456gìđó`
![](https://images.viblo.asia/566849f5-1ec9-4559-80ea-d8237a808cd6.gif)

Các bạn sẽ lưu lại danh sách các input với 1 tên biến cho dễ xử lý, tham khảo như sau:
```
URL: https://docs.google.com/forms/d/e/1FAIpQLSdDl_lqF70OXMNCqLZEErqKGh1doSrYX-CuAbGFlQeH6Gr73Q/formResponse?
name: entry.881773734
email: entry.1618212381
mess: entry.273781435
...
```
Xử lý xong phần form google, giờ sang đến code nào
## Xử lý Form HTML
 - Trong bài này mình sẽ hướng dẫn sử dụng ajax để gửi form, nên đương nhiên cần phải khai báo đã nhé:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
```
Tiếp theo đương nhiên sẽ là tạo 1 form tương ứng với mục đích sử dụng rồi:
```html
<form name="cform" id="cform" target="_self" onsubmit="return postToGoogle();" action="">
    <label>Tên bạn</label>
    <input id="nameField" name="entry.881773734" type="text" placeholder="Tên bạn..." >
    <input id="emailField" name="entry.1618212381" type="email" placeholder="Địa chỉ email..." required>
    <textarea id="messField" name="entry.273781435" placeholder="Câu hỏi hoặc lời nhắn..."required></textarea>
    <button type="submit" id="send" name="send">Gửi</button>
</form>
<h3 id="success-msg" class="text-center" style="display: none;"> Your Message has been sended!</h3>
```
Phân tích này:
 - `onsubmit()`: sau khi submit form, sẽ trả về hành động thực hiện function `postToGoogle()`,  hàm xử lý này mình sẽ hướng dẫn ở dưới
 - Các Input: mình điền name của input tương ứng với các dữ liệu đã note từ form bên trên cho các bạn dễ liên kết, chứ name kia các bạn có thể bỏ nhé. Quan trọng là các bạn cần 1 thứ định danh duy nhất cho giá trị ô input bạn muốn lấy. Ở đây đoạn sau mình sẽ sử dụng `id` của các `input` làm cơ sở xác định giá trị của ô input muốn lấy, nên `id` mình đặt duy nhất, và dễ hiểu
 - `<h3>`: chỉ là 1 cái dòng hiển thị khi mình gửi form thành công thôi :D

Đại loại thì xong xuôi như trên các bạn sẽ có 1 cái form... không được đẹp như này :D, vì mình xử lý css cho thân thiện rồi, code ở trên tối giản cho mọi nguời đọc những cái cần thôi :D

 ![](https://images.viblo.asia/d1c14b9a-47a7-4b99-b106-2fbfa793c0cb.png)
## Xử lý Ajax gửi dữ liệu
Giờ đến lượt xử lý cái function `postToGoogle()` ở trên nhé:
```javascript
function postToGoogle() {
    //Xử lý lấy dữ liệu các input vào biến tương ứng thông qua ID của input
    var name = $("#nameField").val();
    var email = $("#emailField").val();
    var mess = $("#messField").val();
    //Đoạn giữa này có thể sử dụng để validate dữ liệu 1 lần nữa hoăc... bỏ qua nhé :D

    //Xử lý gửi dữ liệu lên form
    $.ajax({
        //Chỉ định đích gửi dữ liệu đến: là form response đã tạo ở trên
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdDl_lqF70OXMNCqLZEErqKGh1doSrYX-CuAbGFlQeH6Gr73Q/formResponse?",
        //URL lấy từ link đã note ở trên nhé
        data: { //gán các giá trị tương ứng vào các Input name tương ứng đã lấy ở trên
            "entry.881773734": name,
            "entry.1618212381": email,
            "entry.273781435": mess
        },
        type: "POST",
        dataType: "jsonp", //các bạn có thể để xml, nhưng khi bật console lên sẽ thấy báo đỏ lòm vì ko cho cross, còn cái này nó vẫn cảnh báo nhưng màu xám thôi, ko đỏ :v
        success: function(d)
    {}, //do đã bảo ở trên là nó ko cho cross đâu, nên khi gửi data xong ko trả về success được, ko cần điền cái này nhé
        error: function(x, y, z) {
            $('#success-msg').show(); //hiện ra cái mess báo thành công khi gửi xong
        }
    });

    return false;
}
```
Bây giờ các bạn check 1 lượt xem đúng hết các thông tin đã note chưa, rồi chạy và xem kết quả nhá :)
![](https://images.viblo.asia/fdb69be7-7472-4959-9c85-a206ee39de25.png)
# 1 chút lưu ý
## Các dạng câu trả lời cho Form
Trong bài trên mình chỉ giới thiệu sơ bộ cách làm, tuy nhiên các bạn chú ý, khi tạo 1 câu hỏi trong biểu mẫu Google Form thì có rất nhiều loại câu trả lời bạn có thể chọn: Short answer, Paragraph, multiple choice, checkbox, Dropdown, checkbox grid,... Tuy nhiên mình chưa tìm hiểu xử lý hết được tất cả các loại này, mình sẽ hướng dẫn mọi người xử lý 1 vài dạng cơ bản trước nhé:
*  **Câu trả lời dạng Short answer:** Loại này input đương nhiên sẽ có `type` là `text` rồi. Ngoài ra bạn có thể để `type` là email, password, hoặc thậm chí là dùng text area nữa. Nhưng mà nếu định sử dụng text area thì nên tham khảo dạng tiếp theo hơn nhé:
*  **Câu trả lời dạng Paragraph:** Cái này nghe là biết **nên** để `type` input tương ứng là `text` rồi
*  **Câu trả lời dạng multiple choice - hoặc dropdown:** 2 cái này dạng giống nhau, lúc này nên sử dụng `select - option` nhé, khi đó `value` của từng `option` chính là nội dung của từng câu trả lời lựa chọn trên Google Form. Sử dụng cái này các bạn cũng sẽ hơi khó khăn hơn trong việc `inspect` ra `name` để sử dụng, tuy nhiên cứ theo hướng dẫn, tìm đến phần tử nào đang bao bọc nhỏ nhất phần câu hỏi, mà có `name` na ná dạng mẫu nhé: `entry.1chuỗisố`
* Các bạn hoàn toàn có thể thay đổi kiểu input, ví dụ như: sử dụng `select-option` cho 1 câu trả lời dạng Short text,... tuy nhiên nhớ chú ý value cho đúng nhé, value chính là cái mà sẽ điền vào google sheet đấy
* Các dạng khác mình chưa có thời gian nghiên cứu, ai thử rồi có thể cho mình ít đóng góp phía dưới để các bạn khác tham khảo cùng nhé
## Về vấn đề câu hỏi Require bắt buộc trả lời

Với các câu hỏi bạn yêu cầu bắt buộc trả lời, hãy cho thêm attribute `required` vào input, double validate lần nữa bằng javascript trong function `postToGoogle()` cho chắc nhé

Để có thể chạy mượt mà theo mong muốn của các bạn nhất, nhớ tuân thủ theo hướng dẫn nhé, còn nếu muốn test ko theo hướng dẫn thì tùy bạn :v
# Lời kết
Trên đây là bài hướng dẫn lấy thông tin 1 form đơn giản về Google sheet, cách này đồng thời các bạn có thể tái sử dụng cả Google Form kia luôn nhé, vậy là có 2 cái form cùng đổ về 1 kho dữ liệu rồi :D. Bài tiếp theo cũng vẫn chủ đề này, nhưng là cách thứ 2 nhé ([Mọi người xem bài 2 tại đây](https://viblo.asia/p/quan-ly-web-voi-google-sheet-thu-thap-thong-tin-tu-form-tren-website-ve-google-sheet-bai-2-Qpmlewx9Krd))
Dưới đây là toàn bộ file source code của mình:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <!-- optional -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body>
<div class="row">
    <div class="col-md-6 col-offset-2">
        <form name="cform" id="cform" target="_self" onsubmit="return postToGoogle();" action="" method="post" class="col-md-6">
            <div class="form-group">
                <label>Tên bạn</label>
                <input id="nameField" type="text" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" placeholder="Tên bạn..." >
            </div>
            <div class="form-group">
                <input id="emailField" type="email" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 noMarr" placeholder="Địa chỉ email..." required>
            </div>
            <div class="form-group">
                <textarea id="messField" cols="" rows="" class="col-xs-12 col-sm-12 col-md-12 col-lg-12" placeholder="Câu hỏi hoặc lời nhắn gửi..."required></textarea>
            </div>
            <div class="form-group">
                <select id="color" name="entry.1498949366">
                    <option value="Xanh lá">Xanh lá</option>
                    <option value="Đỏ">Đỏ</option>
                </select>
            </div>
            <div class="form-group">
                <select id="dropdown" name="entry.1915682440">
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
            </div>
            <div class="form-group">
                <button type="submit" id="send" name="send" class="submitBtn common_btn btn btn-info">Gửi</button>
                <div id="simple-msg"></div>
            </div>
        </form>
        <h3 id="success-msg" class="text-center" style="display: none;"> Your Message has been sended!</h3>

        <h3 id="success-msg" style="text-align: center !important; margin-top:190px !important; display:none; color:#fff"> Your Request has been posted to Google Spreadsheet</h3>

    </div>
</div>


<script>
function postToGoogle() {
    alert('success');
    var name = $("#nameField").val();
    var email = $("#emailField").val();
    var mess = $("#messField").val();
    var color = $("#color").val();
    var dropdown = $("#dropdown").val();

    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdDl_lqF70OXMNCqLZEErqKGh1doSrYX-CuAbGFlOeH6Gr73Q/formResponse?",
        data: {"entry.881773734": name, "entry.1618212381": email, "entry.273781435": mess, "entry.1498949366": color, "entry.1915682440": dropdown},
        type: "POST",
        dataType: "jsonp",
        success: function(d)
    {},
        error: function(x, y, z) {
            $('#success-msg').show();
        }
    });

    return false;
}
</script>
</body>
</html>

```