Hôm nay mình sẽ giới thiệu cho các bạn một dịch vụ khác của AWS có liên quan đến CloudFront.
Để biết CloudFront là gì các bạn có thể tham khảo [ở đây](https://viblo.asia/p/amazon-cloudfront-jvElaPLNZkw). 
Bài viết này sẽ giới thiệu cho các bạn hiểu Lambda@Edge dùng để làm gì, sử dụng như thế nào.
Khuyến khích các bạn tìm hiểu CloudFront trước khi đọc bài này.


## I. Lambda@Edge là gì?
Lambda@Edge cho phép bạn chạy các hàm của Lamda để customize nội dung mà CloudFront deliver tới người dùng, cụ thể hơn 1 chút nó cho phép chạy các function ở AWS location gần với người dùng nhất từ đó nâng cao tốc độ vận chuyển content.
Bạn có thể chạy function của Lambda để thay đổi CloudFront request và CloudFront response ở các thời điểm sau:
* Sau khi CloudFront nhận request từ viewer (viewer request)
* Trước khi CloudFront chuyển tiếp request tới origin (origin request)
* Sau khi CloudFront nhận response từ origin (origin response)
* Trước khi CloudFront chuyển tiếp response tới viewer (viewer response)

CloudFront sẽ nhận request và response lại cho user theo flow sau:
Nhận request từ user -> Chuyển tiếp request tới origin -> Nhận response từ origin -> Trả response về cho user

Tuy nhiên, với Lambda@Edge bạn có thể tự generate response  và trả về cho user mà không cần chuyển request lên origin. 
Bạn có thể áp dụng chức năng này trong 1 số trường hợp như sau:
* Kiểm tra cookies để rewrite lại URL thành 1 version của site để test A/B 
* Gửi những object khác nhau phù hợp với từng người dùng của bạn dựa trên thông tin User Agent. User Agent là header có chứa thông tin về device đã submit request hoặc version của app/site mà user request đang sử dụng,... Dựa vào thông tin này bạn có thể gửi những content phù hợp với từng người dùng, ví dụ như gửi image với độ phân giải phù hợp với device mà user đang dùng, control content phù hợp với version app mà user đang dùng.
* Kiểm tra header hoặc authorized token, insert corresponding header và allowing access control trước khi chuyển tiếp request tới origin.
* Thêm, sửa, xóaheaders, rewrite URL để direct users đến những object khác nhau đã có trong cache. 
* Generate HTTP responses mới để sử dụng trong 1 số trường hợp như điều hướng user chưa chứng thực đến trang login, hoặc tạo ra 1 trang tĩnh rồi trả về cho user. 


## II. Tạo một Lambda@Edge function đơn giản
 
### 1. Tạo AWS account
Vào trang web AWS, chọn Sign Up Now và đăng ký một tài khoản
### 2. Tạo CloudFront Distribution
Như đã nói từ đầu Lamda@Egde là 1 service tăng trải nghiệm CloudFront. Do đó, để sử dụng Lambda@Edge cần tạo một môi trường CloudFront trước.
Khi tạo môi trường CloudFront bạn sẽ phải chỉ định Origin (nơi CloudFront sẽ access tới để get content). Thông thường người ta sẽ chọn Amazon S3 bucket làm Origin.
### 3. Tạo function
Lambda@Edge cho phép bạn sử dụng CloudFront triggers để gọi Lambda function. Khi bạn liên kết CloudFront distribution với một Lambda function, CloudFront sẽ nhận request và response lại cho user ngay tại CloudFront edge locations đó và chạy Lambda function. Lambda functions có thể nâng cao security hoặc customize lại thông tin ở gần user nhất để trả về cho user, nhờ đó có thể cải thiện performance. 
Có nhiều cách để tạo một Lambda@Egde, tuy nhiên để đơn giản nhất trước tiên hãy bắt đầu với blueprints template ở Lambda Console. Function này được dùng để update security header đối với CloudFront Distribution của bạn.
Để tạo một function dựa trên blueprints và deploy cho nó chạy, bạn thực hiện như sau:
* Sign in vào AWS Management Console rồi open AWS Lambda console tại https://console.aws.amazon.com/lambda/.
Note: Bạn phải chọn vị trí của mình là US-East-1 (N. Virginia) Region. Nếu không bạn sẽ không thể tạo Lambda@Edge functions.
* Chọn **Create function**.
* Chọn **Blueprints**,  gõ keyword *CloudFront*  vào search field, nhấn **Return**. Khi đó, tất cả các blueprints liên quan đến cloudfront sẽ được hiển thị. 
* Chọn blueprint **cloudfront-modify-response-header**  để sử dụng.
* Điền các thông tin sau: 
*Name*: tên function 
*Role*: chọn permission cho function. Đơn giản nhất là cứ chọn **Basic Edge Lambda permissions**  rồi nhấn *Create new role*
*Role name*: đặt tên cho role bạn đã tạo 
* Chọn **Create function**. Ở trang tiếp theo bạn sẽ thấy hiển thị message thành công.
Tại tab Configuration, nhấn vào box tên function bạn sẽ thấy template code có sẵn ở cuối trang. Có thể modify code này để update securitu header.
Cuối cùng nhớ bấm Save code lại nhé.

4. Add CloudFront Trigger để run function
Tại tab Configuration, nhấn vào box CloudFront.
Tại  Configure triggers  ở cuối trang, chọn **Deploy to Lambda@Edge** để mở trang define trigger và deploy function.
Tại trang Deploy to Lambda@Edge nhập vào các thông tin cần thiết rồi nhấn Deploy để deploy code function của bạn.

5. Xác nhận function của bạn được chạy
Check xem function đã được chạy và bạn đã nhận được response mong muốn hay chưa.
Cụ thể trong ví dụ này chúng ta sẽ check HTTP response xem thử security header đã được add hay chưa.

6. Tracking issue
Nếu CloudFront return error và bạn không nhận được response mong muốn, bạn có thể điều tra nguyên nhân bằng cách xem CloudFront Logs.
Bạn phải sử dụng log được lưu ở AWS location gần nhất với địa điểm nơi bạn đã chạy function.
Ví dụ, nếu bạn chạy function ở London, thì hãy change Region ở CloudWatch console thành EU (London).

## Tổng kết
Khởi đầu nghe có vẻ nhưng thực tế nếu bạn đã thao tác quen thì cũng không khó nhằn lắm.
Bước base bao giờ cũng đơn giản, nhưng để tận dụng triệt để, tận dụng tốt các service của AWS bạn cần phải có kiến thức sâu hơn nữa, đồng thời phải yêu cầu cả kinh nghiệm.
Những cái này thì mình chưa có, dù sao cũng chúc các bạn vọc vui qua bài viết này :))