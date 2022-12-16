![](https://images.viblo.asia/5329b5d0-bdfa-4548-ac59-112a7c63eb12.jpg)

Let’s racing, but with HTTP(s) requests !

*Bài viết đề cập tới target là các ứng dụng Web/Mobile API.

## 0. Introduction
Đây là một lỗ hổng thú vị, nhưng theo cá nhân (chủ quan) mình thấy thì dễ bị bỏ sót nếu pentester chưa có nhiều kinh nghiệm. Một phần bởi ở OWASP TOP 10 2017, lỗi này không được đề cập (tới nhiều !?).

Và ở OWASP TOP 10 2021, thì không thấy nó trong TOP 10 mà nó được đề cập ở 1 trong 4 phần tại A11:Next Steps, liên quan tới Code Quality.
![](https://images.viblo.asia/9fee9c9e-e745-41e9-8610-ab7b03313ee2.png)

Việc nằm trong TOP 10 hay không ảnh hưởng khá rõ nét tới việc nó có được quan tâm nhiều hay không. Khi mà trong requirement của khá nhiều đơn vị tuyển dụng ATTT đều yêu cầu ứng viên nắm được OWASP TOP 10, thành ra nếu chưa có điều kiện tìm hiểu thêm và làm thực tế nhiều hơn, sẽ dễ bỏ qua lỗ hổng trong “TOP 11” này.

Lỗi này được OWASP đề cập nhiều hơn trong các tài liệu liên quan tới Code Review, cá nhân mình kiểm thử qua nhiều project thì gặp lỗi này khá nhiều và mình tự gọi chung là lỗi Race Condition, dù **định nghĩa của Race Condition attack thường bao hàm rất rộng**, bao gồm cả về phần cứng (CPU, RAM…), hệ điều hành, software, databases…

Cách kiểm thử đôi khi cũng cần customize hoặc optimize để phù hợp với đối tượng được kiểm thử, nhưng phần nhiều là không quá khó. Trong bài viết này mình sẽ trình bày một số cách cơ bản thường dùng và cũng rất hiệu quả.

Tuỳ vào hoàn cảnh mà impact của lỗi cũng rất khác nhau, từ đó severity cũng khác nhau, đôi khi chỉ là Low, nhưng đôi khi lại có thể là Critical nếu tính cả điểm về business.

## 1. About the vulnerability

Về định nghĩa thì đa số các định nghĩa về race condition mình tìm được bao hàm chung cho cả các lỗi ngoài Web/Mobile API. Với webs, mình thấy có định nghĩa sau khá phù hợp với các case mình đã gặp, trích từ hacktricks, trong category kiểm thử lỗi race conditions trên ứng dụng web:

“Race conditions are **vulnerabilities** that **appear** in webs that limit the number of times you can perform an action. A very easy example can be found in this [report](https://medium.com/@pravinponnusamy/race-condition-vulnerability-found-in-bug-bounty-program-573260454c43).”

Race condition attack còn được gọi là TOCTTOU (Time of Check to Time of Use) attack, dựa trên thực tế rằng hệ thống máy móc (servers, databases,…) phải xử lý các tác vụ một cách tuần tự theo trình tự cụ thể.

Ví dụ với chức năng đặt phòng khách sạn (workflow chưa được thiết kế ổn áp):

**Step 1:** Khách A lên web, gửi request đặt phòng X vào ngày 31/12/2050.

**Step 2:** Hệ thống kiểm tra trạng thái của phòng X ngày 31/12/2050 (ví dụ status: available/unavailable).

**Step 3:** Nếu phòng còn trống (available) thì sẽ gán phòng X cho user A, cho user A thuê.

**Step 4:** Update status của phòng X ngày 31/12/2050 thành unavailable (tới đây thì đã ‘race’ xong rồi).

Nhưng sẽ như thế nào nếu “tại chính xác cùng một thời điểm” có 2 user A và B cùng gửi request tới hệ thống, yêu cầu đặt phòng X vào ngày 31/12/2050?

Vì request từ 2 user khác nhau, nên sẽ có cùng lúc 2 luồng xử lý tương tự như ví dụ trên được thực hiện. Nếu code quality không tốt, không áp dụng các cơ chế để phòng tránh race condition attack (ví dụ **locking**), rất có thể tại Step 2, cả 2 luồng đều cho ra kết quả True (available), dẫn tới tại Step 3, phòng được gán cho cả 2 user A và B, tức là ứng dụng sẽ response cho cả 2 user rằng cả 2 đã thuê được phòng.

## 2. Example & How to Testing
Concept kiểm thử lỗi này tương đối đơn giản, dưới đây mình sẽ giới thiệu 3 cách mình biết, bao gồm sử dụng Intruder, Python code và Turbo Intruder.

### 2.1. Using Burpsuite’s integrated feature: Intruder
Đối với penetration testing, đặc biệt là với web/mobile API, thì Burpsuite là công cụ được xem như là vũ khí chính và quan trọng nhất. Burpsuite cung cấp các chức năng có sẵn và các extensions hỗ trợ cho việc testing Race condition: Intruder và extension Turbo Intruder.

Turbo intruder và Intruder: Đương nhiên có chữ Turbo vào thì rõ ràng phải xịn hơn ở một số điểm nào đó rồi. Tuy nhiên trong thực tế thì Intruder là đã đủ tốt để kiểm thử lỗi này rồi. Không chỉ riêng ở ví dụ dưới đây, mà trong cả những trường hợp khác mình đã gặp.

Đây là lỗi được tìm ra bởi anh [Hoang Anh Thai](https://www.facebook.com/hoanganhthai) và được sharing public trên Facebook ngày 28/5/2022 (đã trao đổi với tác giả trước khi sharing):
![](https://images.viblo.asia/cb35a7d5-0703-4992-a102-d998d2bcac6c.PNG)
Không thể chắc chắn chính xác thời điểm lỗi được tìm thấy, vì khả năng cao là không thể tìm thấy hôm nay, vài ngày sau đã mang lên facebook public ngay được. Thông thường phải sau khoảng thời gian vài tuần/vài tháng sau khi báo cáo lỗ hổng, thì mới được phép public.

Tuy nhiên dựa vào phiên bản của Burpsuite, có thể thấy thời điểm là khá gần, ít nhất là nửa sau năm 2021.

Scenario là ở bước rút tiền, user sẽ gửi một HTTP POST request tới API server để yêu cầu rút tiền, nhưng thay vì gửi một request thì ‘attacker’ gửi nhiều requests ‘gần như đồng thời’ để khai thác lỗ hổng race condition, dẫn tới có thể rút được số tiền lần gấp 2 lần số tiền trong tài khoản. Công cụ được sử dụng để gửi nhiều HTTP requests cùng lúc là Intruder.

Lỗ hổng này không mới và cũng không quá khó để kiểm thử, nên mình khá bất ngờ khi một đơn vị lớn và business có liên quan tới **tiền** nong lại bỏ sót nó trong một chức năng tối quan trọng là rút tiền!

## 2.2. Using Python code
Quay lại ví dụ phía trên một chút, concept khá đơn giản là gửi một số lượng lớn requests trong một khoảng thời gian “gần như tức thì” và đương nhiên là càng ngắn càng tốt.

Giả sử như thời gian là “đủ ngắn” để có thể “race” được nhiều hơn thì sao? Liệu rằng thay vì có thể rút x2 tiền, attacker có thể rút x3 x5 x7 lần số tiền trong tài khoản không? Vì nếu có thể nạp vào/rút ra liên tục, thì x2 đã là quá ổn, làm đi làm lại thoải mái. Nhưng nếu chỉ có thể rút 1 lần và nguồn vào không chỉ đơn giản là nạp lại thì **xxx** to là tốt hơn.

Việc xxx được bao nhiêu lần so với ban đầu thì không chắc được, bởi một khi đã không có các cơ chế chống race condition, thì việc “race” được tới đâu lại phụ thuộc vào mạng, vào phần cứng ở cả 2 phía, các proxies, load balancer, databases,… nên mỗi hệ thống khả năng “race” được tới đâu là khác nhau. Ở phía attacker mà nói, chỉ có nâng cao impact bằng cách tối ưu nhất số lượng requests và thời gian gửi request càng đồng thời (càng ngắn) nhất càng tốt mà thôi.

Việc sử dụng Python để gửi nhận HTTP requests thì lại rất là đơn giản, đồng thời cũng có sẵn các thư viện hỗ trợ việc này. Cá nhân mình cũng chủ quan đánh giá, việc chạy code thực thi thì tính nhanh/đồng thời khả năng sẽ tốt hơn sử dụng các công cụ trong ứng dụng (Intruder/Turbo Intruder).

Đây là một ví dụ về lỗi race condition ở chức năng đăng ký user. Tại đây đơn giản là mình tạo ra nhiều user trùng thông tin (username, phone number, email…). Với một lần chạy mình “race” để tạo ra được khoảng gần 20 user trùng thông tin như vậy.
![](https://images.viblo.asia/29f37b33-90d1-4659-a885-7cf4e77d7c90.png)

Nghe thì thì có vẻ hay hay vậy thôi chứ thực ra với penetration tester, thì trong trường hợp này việc nâng cao impact khi sử dụng code exploit là **phụ** (vì dùng intruder cũng chứng minh được lỗi). Việc minh hoạ lỗi và đưa exploit code cho developers để họ tự tái hiện lỗi, tự kiểm tra giải pháp vá lỗi mới là **chính**; bởi developers thường sẽ không quen thuộc với các công cụ kiểm thử security, khó mà bảo rằng họ mở Burpsuite lên mà tự test thử đi, và quan trọng hơn là khách hàng/sếp của họ trả tiền để mình làm =)).

Còn đối với attacker thì ngược lại, liệu rằng nếu biết mình có thế xxx tài khoản, bạn có thể ‘giữ mình’?

## 2.3. Using Burpsuite’s extension: Turbo Intruder
[Đây](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-race-condition) là một bài lab ví dụ về việc tấn công race condition rất hay bởi nó đã làm bật rõ lên tính chất của lỗi liên quan mật thiết tới Code Quality.
```php
<?php
$target_dir = "avatars/";
$target_file = $target_dir . $_FILES["avatar"]["name"];

// temporary move
move_uploaded_file($_FILES["avatar"]["tmp_name"], $target_file);

if (checkViruses($target_file) && checkFileType($target_file)) {
    echo "The file ". htmlspecialchars( $target_file). " has been uploaded.";
} else {
    unlink($target_file);
    echo "Sorry, there was an error uploading your file.";
    http_response_code(403);
}

function checkViruses($fileName) {
    // checking for viruses
    ...
}

function checkFileType($fileName) {
    $imageFileType = strtolower(pathinfo($fileName,PATHINFO_EXTENSION));
    if($imageFileType != "jpg" && $imageFileType != "png") {
        echo "Sorry, only JPG & PNG files are allowed\n";
        return false;
    } else {
        return true;
    }
}
?>
```
Scenario đơn giản như sau:

User upload một file lên server (dùng để làm avatar).
Server lưu tạm nó vào một thư mục.
Server tiến hành kiểm tra file extension (phần mở rộng của file xem có phải là jpg và png hay không) **và** tiến hành kiểm tra xem có virus hay không.
Nếu không thoả mãn cả 2 điều kiện thì remove file và response 403 tới user. Nếu thoả mãn thì thông báo với user rằng file đã upload thành công.
Tại đây chúng ta có thể thấy: Thay vì white-list file extension được upload trước rồi mới lưu và scan virus, thì code cho phép upload ngay file lên server và phải đợi chạy xong 2 hàm *checkFileType* và *checkViruses* rồi mới có action tiếp theo với file. Trong quãng thời gian check này thì attacker tiến hành tấn công.

Video hướng dẫn đã được minh hoạ cụ thể tại đây:

[💉 Lab Web Shell Upload via Race Condition ! – YouTube](https://www.youtube.com/watch?v=mt0BN5pYHXI)

*Về cơ bản thì Turbo Intruder sẽ giúp attacker gửi (các) HTTP requests (giống hoặc khác nhau) với số lượng requests (có thể) vừa lớn mà lại vừa nhanh.*

Tại ví dụ cụ thể này, attacker gửi 2 requests gần như đồng thời. Request 1 là một HTTP POST request dùng để upload một web shell, request 2 là một HTTP GET request để trigger payload trong request 1 nhằm đạt được mục đích.

Nói cách khác, khi server “đang trong quá trình kiểm tra trước khi accept/remove”, thì attacker đã gần như ngay lập tức gửi một HTTP GET request để trigger payload. Chưa kể tới việc hàm *checkViruses* chạy bao lâu, càng lâu thì thời gian file tồn tại trên server càng dài.

Trong thực tế, case dạng như thế này các bạn có thể tham khảo bài viết của bạn @minhtuan.nguy tại đường dẫn sau:
[Phân tích lỗ hổng uploadfile trên Apache Ofbiz (CVE-2021-37608 bypass)](https://viblo.asia/p/phan-tich-lo-hong-uploadfile-tren-apache-ofbiz-cve-2021-37608-bypass-3P0lP6aoKox)

Các ví dụ trên được nêu ra chủ yếu để người đọc hiểu rõ hơn **Code Quality** là nhân tố quan trọng dẫn tới lỗ hổng này. Ngoài ra cũng để đưa ra một phương thức để kiểm thử lỗi race condition.

## 3. Reference
[Time-of-check to time-of-use – Wikipedia](https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use)

[Lab: Web shell upload via race condition | Web Security Academy (portswigger.net)](https://portswigger.net/web-security/file-upload/lab-file-upload-web-shell-upload-via-race-condition)

[Facebook](https://www.facebook.com/photo/?fbid=5926777637338750&set=a.516813291668572)

[Race Condition – HackTricks](https://book.hacktricks.xyz/pentesting-web/race-condition)

[Phân tích lỗ hổng uploadfile trên Apache Ofbiz (CVE-2021-37608 bypass)](https://viblo.asia/p/phan-tich-lo-hong-uploadfile-tren-apache-ofbiz-cve-2021-37608-bypass-3P0lP6aoKox)