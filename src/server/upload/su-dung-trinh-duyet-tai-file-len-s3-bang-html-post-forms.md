Với nhu cầu upload file từ chính browser lên s3 chứ không cần thông qua server nhằm giảm tải cũng như đảm bảo hiệu suất hoạt động của server , với mục đích của dự án đồng thời tối ưu hóa việc upload file lên s3 với những file lớn, mình đã tìm hiểu hoạt động uploadfile bằng html post form , S3 cũng hỗ trợ cho phép trang web của bạn có thể tải tệp lên tài khoản S3 của bạn bằng trình duyệt web tiêu chuẩn. Bài viết là của tác giả James Murty, người tạo ra thư viện JetS3t Java S3 và là tác giả của Lập trình dịch vụ web Amazon: S3, EC2, SQS, FPS và SimpleDB (O’Reilly,, 2008)
# 1. Giới thiệu
Amazon’s Simple Storage Service (S3) cung cấp lưu trữ dữ liệu trực tuyến giá rẻ và không giới hạn cho bất kỳ ai có thẻ tín dụng và tài khoản Dịch vụ web Amazon (AWS). Nếu bạn có tài khoản AWS, bạn có thể tương tác với dịch vụ S3 bằng các công cụ chuyên dụng để tải lên và quản lý các tệp của mình. Sẽ rất thuận tiện khi bạn có quyền truy cập vào tài nguyên lưu trữ trực tuyến này, nhưng có thể có những trường hợp bạn muốn cho phép người khác tải tệp lên tài khoản của mình.

Với mục đích này, S3 chấp nhận tải lên thông qua các biểu mẫu HTML POST được tạo ra đặc biệt và được ủy quyền trước. Bạn có thể bao gồm các biểu mẫu này trong bất kỳ trang web nào để cho phép khách truy cập trang web của bạn gửi cho bạn các tệp không sử dụng nhiều hơn một trình duyệt web tiêu chuẩn. Trong bài viết này, mình sẽ trình bày cách xây dựng các biểu mẫu S3 POST đơn giản. Giả sử bạn đã đăng ký dịch vụ S3 và bạn có bucket s3 và có thể xem tệp trong tài khoản của mình. Trước khi bạn tiến hành, hãy tạo bucket của riêng bạn để lưu trữ các tệp đã tải lên - trong các ví dụ bên dưới mình sẽ sử dụng một bucket có tên s3-bucket.
# 2. POST Form Web Page
Đây là một trang web với form POST S3 mà bạn có thể sử dụng làm mẫu cho các form của riêng mình:
```
<html>
  <head>
    <title>S3 POST Form</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
    <form action="https://s3-bucket.s3.amazonaws.com/" method="post" enctype="multipart/form-data">
      <input type="hidden" name="key" value="uploads/${filename}"> <input type="hidden" name="AWSAccessKeyId" value="YOUR_AWS_ACCESS_KEY">
      <input type="hidden" name="acl" value="private">
      <input type="hidden" name="success_action_redirect" value="http://localhost/">
      <input type="hidden" name="policy" value="YOUR_POLICY_DOCUMENT_BASE64_ENCODED">
      <input type="hidden" name="signature" value="YOUR_CALCULATED_SIGNATURE">
      <input type="hidden" name="Content-Type" value="image/jpeg">
      <!-- Include any additional input fields here -->
      File to upload to S3: <input name="file" type="file">
      <br>
      <input type="submit" value="Upload File to S3">
    </form>
  </body>
</html>
```
Template này thể hiện một số tính năng quan trọng của form POST S3 và trang web có chứa nó:
* Trang web có chứa form có thẻ meta trong phần đầu thông báo cho các trình duyệt web sử dụng mã hóa ký tự unicode UTF-8.
* Tham số hành động của form chỉ định một URL S3 bao gồm tên của bucket đích của bạn, trong trường hợp này là nhóm được gọi là s3-bucket.
* Form chứa một số field đầu vào với tên và giá trị tham số sẽ được gửi đến dịch vụ S3. Nếu bất kỳ trường đầu vào bắt buộc nào bị thiếu hoặc nếu một trường có giá trị không chính xác, dịch vụ sẽ không chấp nhận tải lên từ biểu mẫu.

Dịch vụ S3 sử dụng thông tin từ các trường nhập mẫu của form để ủy quyền tải lên và để đặt các thuộc tính của các đối tượng tệp được tải lên. Dưới đây là mô tả về các trường đầu vào phổ biến nhất:
### key:
Tên cho object S3 sẽ lưu trữ dữ liệu tệp đã tải lên. Tên này có thể được đặt trước khi bạn biết thông tin nào người dùng sẽ tải lên, ví dụ: uploads/monthly_report.txt.

Nếu bạn không biết tên của tệp mà người dùng sẽ tải lên, giá trị khóa có thể bao gồm biến đặc biệt $ {filename} sẽ được thay thế bằng tên của tệp được tải lên. Ví dụ: giá trị khóa uploads/${filename}  sẽ trở thành tên đối tượng uploads/Birthday Cake.jpg nếu người dùng tải lên một tệp có tên là Birthday Cake.jpg.
### AWSAccessKeyId:
The Access Key Identifier credential for your Amazon Web Service account.
### acl:
Chính sách kiểm soát truy cập để áp dụng cho tệp đã tải lên. Nếu bạn không muốn tệp được tải lên được cung cấp cho công chúng, bạn nên sử dụng giá trị riêng tư. Để làm cho tệp được tải lên có sẵn công khai, hãy sử dụng giá trị đọc công khai.
### success_action_redirect:
Địa chỉ URL mà trình duyệt web của người dùng sẽ được chuyển hướng sau khi tệp được tải lên. URL này phải trỏ đến trang Tải lên thành công trên trang web của bạn, để bạn có thể thông báo cho người dùng của mình rằng các tệp của họ đã được chấp nhận. S3 sẽ thêm các tham số bucket, khóa và etag vào giá trị URL này để thông báo cho ứng dụng web của bạn về vị trí và giá trị hash của tệp được tải lên.
### policy:
policy document được mã hóa Base64 áp dụng các quy tắc cho tải lên tệp được gửi bởi form S3 POST. Tài liệu này được sử dụng để ủy quyền form và áp đặt các điều kiện cho các tệp có thể được tải lên. Tài liệu chính sách sẽ được mô tả chi tiết hơn dưới đây.
### signature:
Một giá trị chữ ký cho phép biểu mẫu và chứng minh rằng chỉ bạn mới có thể tạo ra nó. Giá trị này được tính bằng cách ký policy document được mã hóa Base64 với Khóa bí mật AWS của bạn, một quy trình mà tôi sẽ trình bày dưới đây.
### Content-Type:
Loại nội dung (loại mime) sẽ được áp dụng cho tệp đã tải lên, ví dụ image / jpeg cho các tệp hình ảnh JPEG. Nếu bạn không biết người dùng sẽ tải lên loại tệp nào, bạn có thể nhắc người dùng cung cấp loại nội dung phù hợp hoặc viết mã tập lệnh trình duyệt sẽ tự động đặt giá trị này dựa trên tên tập tin.
### file:
field nhập cho phép người dùng chọn tệp để tải lên. Trường này phải là trường cuối cùng trong biểu mẫu, vì bất kỳ trường nào bên dưới nó đều bị S3 bỏ qua.

Tổng quan về các trường nhập mẫu của biểu mẫu này sẽ giúp bạn sửa đổi form POST mẫu cho phù hợp với mục đích của riêng bạn. Tối thiểu, bạn sẽ cần chỉnh sửa tham số hành động form để chỉ vào bucket S3 của riêng bạn và đặt giá trị của trường AWSAccessKeyId thành thông tin xác thực khóa truy cập AWS của bạn.

Để hoàn thành biểu mẫu và làm cho dịch vụ S3 chấp nhận, bạn cũng cần tạo policy và signature.
# 3. Policy Document
Biểu mẫu S3 POST bao gồm một tài liệu policy cho phép form và áp đặt các giới hạn đối với các tệp có thể được tải lên. Khi S3 nhận được tệp qua form POST, nó sẽ kiểm tra tài liệu policy và signature để xác nhận rằng biểu mẫu được tạo bởi người được phép lưu trữ tệp trong tài khoản S3 đích.
A policy document là một tập hợp các thuộc tính được thể hiện trong  JavaScript Object Notation, điều này có nghĩa đơn giản là cấu trúc và nội dung của tài liệu phải tuân theo một định dạng nhất định. Mỗi policy document chứa hai mục cấp cao nhất:
* expiration - A Greenwich Mean Time  (GMT) chỉ định thời điểm policy document sẽ hết hạn. Khi policy document đã hết hạn, hình thức tải lên sẽ không còn hoạt động.
* conditions - Một bộ quy tắc để xác định các giá trị có thể được bao gồm trong các trường nhập mẫu của biểu mẫu và để áp đặt giới hạn kích thước cho tải lên tệp.

Đây là một policy document tương ứng với mẫu biểu mẫu POST ở trên. Chính sách này có ngày hết hạn vào ngày 1 tháng 1 năm 2009:
```
{"expiration": "2009-01-01T00:00:00Z",
  "conditions": [ 
    {"bucket": "s3-bucket"}, 
    ["starts-with", "$key", "uploads/"],
    {"acl": "private"},
    {"success_action_redirect": "http://localhost/"},
    ["starts-with", "$Content-Type", ""],
    ["content-length-range", 0, 1048576]
  ]
}
```
Để tạo form POST S3 hợp lệ, bạn phải bao gồm tài liệu policy có phần điều kiện chứa quy tắc cho hầu hết mọi trường nhập trong biểu mẫu. Tối thiểu, tài liệu này phải bao gồm các quy tắc cho nhóm và các giá trị chính của đối tượng tệp được tải lên. Ngoài hai quy tắc này, bạn sẽ cần bao gồm một quy tắc cho mọi trường nhập khác trong biểu mẫu ngoại trừ AWSAccessKeyId, chữ ký, chính sách và tệp.
Vì template POST của chúng ta bao gồm các trường đầu vào acl, success_action_redirect và Content-Type, Policy của chúng ta bao gồm các quy tắc tương ứng với các trường này. Policy Document của chúng ta cũng bao gồm quy tắc phạm vi độ dài nội dung bổ sung giới hạn kích thước của các tệp có thể được tải lên. Có ba loại quy tắc bạn có thể áp dụng trong policy documenth của mình:
* Quy tắc bình đẳng, kiểm tra xem giá trị của trường nhập liệu được đặt thành một chuỗi nhất định. Một quy tắc bình đẳng được thể hiện dưới dạng cặp tên và giá trị trong các ký tự dấu ngoặc, ví dụ: {"acl": "private"}
* Bắt đầu với quy tắc, kiểm tra xem trường nhập giá trị bắt đầu bằng một chuỗi đã cho. Nếu chuỗi đã cho trống, S3 sẽ chỉ kiểm tra xem trường có trong biểu mẫu hay không và không quan tâm nó chứa giá trị gì. Quy tắc bắt đầu được biểu thị dưới dạng mảng ba phần tử có chứa thuật ngữ start-with, theo sau là tên của trường đầu vào trước ký hiệu $, sau đó là giá trị chuỗi tiền tố để so sánh. chúng ta sử dụng quy tắc bắt đầu với các khóa và Content-Type vì chúng ta không biết trước tên của tệp mà người dùng sẽ tải lên hoặc loại tệp sẽ là gì. Quy tắc cho trường Content-Type  sử dụng một chuỗi trống để so sánh, có nghĩa là nó sẽ cho phép mọi giá trị loại nội dung. Quy tắc cho tên khóa đối tượng, sử dụng chuỗi tiền tố, tải lên, có nghĩa là giá trị khóa phải luôn bắt đầu bằng đường dẫn upload/subdirectory .
* Quy tắc độ dài nội dung, kiểm tra kích thước của tệp được tải lên nằm giữa giá trị tối thiểu và tối đa nhất định. Nếu quy tắc này không được bao gồm trong tài liệu chính sách, người dùng sẽ có thể tải lên các tệp có kích thước bất kỳ lên đến giới hạn 5 GB do S3 áp đặt. Quy tắc độ dài nội dung được thể hiện dưới dạng mảng ba phần tử có chứa thuật ngữ phạm vi độ dài nội dung, theo sau là các giá trị nguyên để đặt kích thước tệp tối thiểu và tối đa. Tài liệu chính sách ở trên bao gồm quy tắc độ dài nội dung sẽ ngăn biểu mẫu tải lên các tệp có kích thước lớn hơn 1MB (1.048.576 byte).

Điều quan trọng là đảm bảo rằng policy document của bạn tương ứng chính xác với biểu mẫu POST S3 của bạn. Nếu có bất kỳ sự khác biệt nào giữa các giá trị trường đầu vào trong biểu mẫu của bạn và các giá trị quy tắc trong tài liệu chính sách của bạn hoặc nếu biểu mẫu của bạn chứa các trường đầu vào không có quy tắc tương ứng trong chính sách của bạn, dịch vụ S3 sẽ từ chối biểu mẫu và trả lại không thể hiểu được Thông báo lỗi XML cho người dùng của bạn
# 4. Sign Your S3 POST Form
Để hoàn thành form POST S3 của bạn, bạn phải ký tên để chứng minh với S3 rằng bạn thực sự đã tạo biểu mẫu. Nếu bạn không ký đúng biểu mẫu hoặc nếu người khác cố gắng sửa đổi biểu mẫu của bạn sau khi đã được ký, dịch vụ sẽ không thể ủy quyền cho biểu mẫu đó và sẽ từ chối tải lên.
Để ký vào mẫu của bạn, bạn cần thực hiện hai bước:
* Base64 - mã hóa tài liệu chính sách và đưa nó vào trường nhập policy của biểu mẫu.
* Tính toán giá trị chữ ký (SHA-1 HMAC) từ policy docment được mã hóa bằng thông tin xác thực AWS Secret Key của bạn làm mật khẩu. Bao gồm giá trị này trong trường nhập chữ ký mẫu sau khi mã hóa Base64.

Hầu như tất cả các ngôn ngữ lập trình bao gồm các thư viện để thực hiện hai bước này. Dưới đây là một số đoạn mã ví dụ để thực hiện công việc với các ngôn ngữ khác nhau, giả sử bạn đã xác định các biến policy_document và aws_secret_key.

### Ruby
``` ruby
require 'base64'
require 'openssl'
require 'digest/sha1'

policy = Base64.encode64(policy_document).gsub("\n","")

signature = Base64.encode64(
    OpenSSL::HMAC.digest(
        OpenSSL::Digest::Digest.new('sha1'), 
        aws_secret_key, policy)
    ).gsub("\n","")
```
### Python
 ```python
 import base64
import hmac, hashlib

policy = base64.b64encode(policy_document)

signature = base64.b64encode(hmac.new(AWS_SECRET_ACCESS_KEY, policy, hashlib.sha1).digest())
 ```
 ### java
 ```java
 import sun.misc.BASE64Encoder;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

String policy = (new BASE64Encoder()).encode(
    policy_document.getBytes("UTF-8")).replaceAll("\n","").replaceAll("\r","");

Mac hmac = Mac.getInstance("HmacSHA1");
hmac.init(new SecretKeySpec(
    aws_secret_key.getBytes("UTF-8"), "HmacSHA1"));
String signature = (new BASE64Encoder()).encode(
    hmac.doFinal(policy.getBytes("UTF-8")))
    .replaceAll("\n", "");
 ```
Khi bạn đã tính các giá trị cho các trường nhập chính sách và chữ ký và bao gồm các giá trị này trong biểu mẫu của bạn, biểu mẫu sẽ được hoàn thành. Lưu trang web và tạo tài liệu dưới dạng tệp .html, mở nó trong trình duyệt web yêu thích của bạn và kiểm tra nó bằng cách tải một số tệp lên nhóm S3 của bạn.
Nguồn: https://aws.amazon.com/articles/browser-uploads-to-s3-using-html-post-forms/