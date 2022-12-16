Hê nhô mn, tiếp tục với chuỗi bài viết tạo ứng dụng điểm danh, tiếp nối ở [phần 1](https://viblo.asia/p/1VgZv0eM5Aw), mình đã nói về cách hoạt động cũng như cách cài đặt ứng dụng, ở phần 2 này, mình sẽ tiến hành thiết lập một số bước để **hạn chế** người dùng điểm danh thay.

Mình chỉ nói là hạn chế, bởi vì theo như mình tìm hiểu thì các cách này vẫn có thể vượt qua được, nhưng dù gì đi nữa, nếu người dùng đã muốn thì sớm muộn, cách này hay cách khác ngta vẫn có  thể vượt qua.

Mọi người có tạo tài khoản test trong link test thông cảm nha, vì mình chưa hoàn thiện và update source code nên dữ liệu các file của bạn up lên có thể bị mất dẫn đến các lỗi không mong muốn, nên mình sẽ xóa dữ liệu cũ nha :> Thông cảm :>

----
**NOTE:** Có một sự cố mà không chỉ mình mà khá nhiều người mắc phải, mình vẫn chưa tìm được cách giải quyết cho vấn đề gửi mail, vì vậy khi bạn gửi mail trong link test, có thể có lúc được, có thể có lúc không, ai có thể giải quyết triệt để vấn đê này có thể bình luận bên dưới, mình sẽ tìm hiểu và cải thiện chức năng, cảm ơn mn đã quan tâm.

Nhưng thông thường, nếu gửi lần đầu không được, thì gửi lần thứ 2 sẽ được :)
# Các bước xác minh thiết bị
**Bước 1:**
Khi điểm danh lần đầu trên thiết bị, mình sẽ tạo ra 1 mã lưu vào localStorage của browser người dùng, và với mỗi lần điểm danh, ngoài việc lưu thông tin người dùng (id, họ tên, mình sẽ lưu thêm token này vào). Khi điểm danh cùng hoạt động đó cho lần thứ 2, mình sẽ đối chiếu token đã tạo và token trong danh sách người đã điểm danh. Nếu đã có thì thông báo đã điểm danh.
Mặc dù localStorage có thể sửa hoặc xóa được, nhưng đa phần lúc điểm danh, người dùng sẽ sử dụng điện thoại, nên việc sửa hoặc xóa thông tin là khó có thể xảy ra.

Hạn chế: Vì token chỉ được lưu trên localStorage của browser nên nếu người dùng sử dụng trình duyệt khác hoặc xóa localStorage thì mình không kiểm tra được.

**Bước 2:**
Đối với mỗi lần truy cập, mình sẽ chạy 1 api để lấy các thông tin {IP Public thiết bị, timezone thiết bị} và lưu vào cùng với thông tin điểm danh.

Hạn chế: Người dùng có thể sử dụng các phần mềm VPN, fakeIP thì có thể vượt qua bước này. Lý do tại sao mình lấy IP public và timezone, theo như mình test, khi sử dụng vpn thì timezone sẽ bị thay đổi, VD: mặc định nó sẽ là *Asia/HoChiMinh*, nhưng khi sử dụng VPN thì nó sẽ đổi thành *America/LosAngeles*), còn địa chỉ IP public, nói nôm na, đây là địa chỉ bạn sử dụng để giao tiếp với internet. Có nhiều cách để bạn biết địa chỉ IP public của mình, cách nhanh nhất và thông dụng nhất và cũng dễ gặp nhất là khi bạn truy cập vào trang speedtest để đo tốc độ mạng.
![](https://images.viblo.asia/a87627a5-7276-41e2-983a-e59f9f2c9f5c.png)

Theo như hình bên trên thì địa chỉ IP public của mình là 14.236.63.231.

Hoặc bạn có thể truy cập vào trang https://ipinfo.io/json, nó sẽ trả về cho bạn 1 object thông tin về địa chỉ ip mà bạn truy cập.

Nói ngoài 1 chút, thông thường 1 cục wifi ở nhà các bạn sẽ có 1 địa chỉ public, nhưng đối với các doanh nghiệp lớn hoặc các trường đại học, họ có thể thuê nhiều đường truyền để tăng tốc độ sử dụng mạng trong nội bộ, Vì vậy, để xác minh được điện thoại điểm danh đang ở vị trí điểm danh, bạn có thể yêu cầu người điểm danh truy cập mạng ở đó để xác minh.

---
Mình có tìm hiểu 1 chút về các cách lấy địa chỉ mac của thiết bị, tuy nhiên lúc test thì nó chỉ trả về địa chỉ mac của server thay vì trả về địa chỉ mac của máy. Mn có cách nào thì có thể bình luận bên dưới, mình sẽ xem xét và cải thiện bài viết. Cảm ơn!

---
**Bắt đầu thôi nào!**
## 1. Tạo mã và lưu vào localStorage
Để tạo token và lưu vào localStorage, mình có đoạn code sau:
```javascript
$(document).ready(function(){
       // Set up token in localStorage
      if(!window.localStorage){
        alert('Trình duyệt này không hỗ trợ chức năng này, vui lòng thử lại sau!\n(Hệ thống sẽ tự động đưa về trang chủ toladev)');
        window.location.href="https://toladev.info";
      }
      let token = sessionStorage.getItem("token-checkin-active");
      if(typeof(token)==undefined || token == "") {
        //Tạo localstorage
        let now = Date.now();
        let rstr= randStr(3);
        localStorage.setItem("token-checkin-active", now+"@"+rstr);
      }
    });
```
Đoạn code này sẽ tự động chạy khi trang web sẵn sàng, mã token được tạo ra nhằm mục đích định danh thiết bị. Để xác minh người dùng khi điểm danh.
## 2. Lấy địa chỉ IP public và timezone của người dùng
Để lấy địa chỉ ip public và timezone, có nhiều cách, mình sẽ xài tạm chức năng của ipinfo.io, mỗi lần truy cập, code tự động AJAX đến ipinfo để lấy thông tin. Thông tin này sẽ được gửi kèm khi tạo mã qr điểm danh.
```javascript
$(document).ready(function(){
      // Set up token in localStorage
      // Get ip public and timezone
      $.getJSON("https://ipinfo.io/json?token=<your token>", function(r){
        ip = r.ip;
        time = r.timezone;
        $('#ipAccess').text(ip);
      });
    });
```
Mình không biết thiếu cái phần token đó có sao hay không nữa :) Nhưng để lấy token, bạn tạo 1 cái tài khoản tại https://ipinfo.io thì nó sẽ cung cấp cho bạn access token (Free).
## 3. Thực hiện kiểm tra thông tin và tạo mã QR.
Sau khi người dùng nhập code và nhấn Kiểm tra, mình sẽ lấy các thông tin IP, timezone, code,token và gửi về server để kiểm tra.
Xét trong trường hợp, hoạt động tồn tại, người dùng chưa kiểm tra mã code và chưa có ai sử dụng thiết bị để kiểm tra mã code của họ, mình sẽ tạo ra một "vùng thông tin điểm danh"- mình tạm gọi là **vùng A**, vùng thông tin này bao gồm các thông tin trên (ipCheckin, timezone, id người dùng, token, createAt và isChecked với giá trị mặc định là false). Khi quản trị viên quét mã QR được tạo ra trên thiết bị người dùng. nó sẽ thực hiện thay đổi giá trị *isChecked* thành *true*.

Còn trong các trường hợp còn lại, hệ thống sẽ báo các lỗi tương đương với hành vi của người dùng.

Mình sẽ demo bên dưới:
![](https://images.viblo.asia/b972aa25-ce71-4396-b2f9-101375fb54c4.png)

Hình thứ nhất, là lúc mình nhập code điểm danh của  Nguyen Van A, mọi thứ đều diễn ra bình thường.

Hình thứ hai, một thông báo được hiện ra khi mình nhập code để điểm danh cho 1 người khác hoặc code không chính xác sau khi đã thực hiện tạo vùng A cho 1 code khác trước đó, thiết bị đã được sử dụng :)

Còn trong các trường hợp còn lại, code hoạt động sai, id người dùng sai thì mình đã giới thiệu ở phần trước.

-----
**Cập nhật thêm một số chức năng, hiện tại mình đã cập nhật thêm một số chức năng cho việc điểm danh:**
1. Gửi mail cho tất cả người dùng có địa chỉ email hợp lệ được khai báo trong danh sách tham dự. Gửi mail mình sử dụng nodemailer (Về cách gửi mail bạn có thể tham khảo bài viết của mình: https://viblo.asia/p/WAyK8Ook5xX)
2. HIển thị danh sách người tham dự và trạng thái tham gia hoạt động.

-----
Link download source code: https://github.com/nqh-webdev/toladev-checkin

-----
Link test: