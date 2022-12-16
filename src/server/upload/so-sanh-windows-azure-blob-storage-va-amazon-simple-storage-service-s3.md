Trong bài đăng viết này, chúng ta sẽ cùng nhau so sánh giữa [Windows Azure Blob Storage](https://docs.microsoft.com/en-us/rest/api/storageservices/Blob-Service-REST-API?redirectedfrom=MSDN) và [Amazon Simple Storage Service (S3)](http://aws.amazon.com/s3/) dựa trên quan điểm chức năng cốt lõi của chúng. Trong bài chia sẻ này, chúng ta sẽ tập trung vào các khái niệm cốt lõi, giá cả và so sánh tính năng giữa các blob containers và buckets.

Để ngắn gọn hơn về cách gọi 2 khái niệm trên, chúng ta sẽ gọi Windows Azure Blob Storage là WABS và Amazon Simple Storage Service là AS3 trong phần còn lại của bài đăng chia sẻ này nhé mọi người.

Từ quan điểm chức năng cơ bản, cả WABS và AS3 đều cung cấp chức năng tương tự. Nói một cách đơn giản, cả hai đều có thể được coi là hệ thống files trên cloud cho phép chúng ta lưu trữ một lượng lớn dữ liệu phi cấu trúc (thường ở dạng tệp).

Trong cả hai hệ thống, bạn có thể tạo một blob containers hoặc buckets, nó có thể chứa các blob containers hoặc các đối tượng tương ứng.

Ở cấp độ cao, cả hai hệ thống đều cung cấp chức năng tương tự. Dưới đây là một số trong số các chức năng chúng cung cấp:

* Về bản chất, cả hai hệ thống đều là hệ thống tập tin trên đám mây với hai mức phân cấp.
* Cả hai hệ thống đều cho phép bạn lưu trữ lượng lớn dữ liệu một cách đáng tin cậy và rẻ.
* Cả hai hệ thống đều cho phép bạn bảo vệ nội dung của mình khỏi bị truy cập trái phép.
* Cả hai hệ thống đều cho phép bạn giữ nhiều phiên bản của cùng một đối tượng, tuy nhiên cách chúng thực hiện việc thiết lập phiên bản trên 2 hệ thống là khác nhau.
* Cả hai hệ thống đều cho phép bạn hiển thị nội dung của buckets và blob containers thông qua mạng phân phối nội dung (CDN) tương ứng của chúng để có độ trễ và bộ nhớ đệm nội dung thấp hơn.
* Cả hai hệ thống đều cung cấp cơ chế kiểm soát truy cập để bảo vệ dữ liệu được lưu trữ. AS3 có nhiều tùy chọn ([Amazon Identity and Access Management (IAM), Bucket Policies, ACLs and Query String Authentication](http://docs.amazonwebservices.com/AmazonS3/2006-03-01/dev/UsingAuthAccess.html)) trong đó WABS cung cấp [ACLs and Shared Access Signatures](http://msdn.microsoft.com/en-us/library/windowsazure/ee393341.aspx).

Tuy nhiên, giữa chúng cũng có một vài sự khác biệt chính như sau:

* WABS chỉ hỗ trợ giao thức HTTP (qua REST) tuy nhiên AS3 hỗ trợ HTTP (qua REST và SOAP) cũng như giao thức BitTorrent để thực hiện phân phối nội dung ngang hàng.
* AS3 có các cơ chế công khai để import và export dữ liệu cực lớn ([Amazon Import / Export](http://aws.amazon.com/importexport/)). Tính năng này chưa có sẵn công khai trong WABS.
* Trong AS3, bạn có thể đặt các đối tượng để tự động xóa sau một khoảng thời gian nhất định. Tính năng này hiện không khả dụng trong WABS.
* AS3 cho phép bạn tính phí khách hàng khi họ sử dụng tài nguyên AS3 được lưu trữ trong tài khoản của bạn bằng [Amazon DevPay](http://docs.amazonwebservices.com/AmazonS3/latest/dev/UsingDevPay.html). Đây là một công cụ tuyệt vời để xây dựng các ứng dụng SaaS. Tính năng này hiện không khả dụng trong WABS. Tuy nhiên, một tính năng khác có sẵn trong AS3 không có trong WABS là [Requester Pay Buckets](http://docs.amazonwebservices.com/AmazonS3/latest/dev/RequesterPaysBuckets.html), nơi người dùng truy cập vào dữ liệu được lưu trữ trong bucket được trả tiền cho việc sử dụng.
* AS3 cho phép bạn mã hóa dữ liệu được lưu trữ bằng mã hóa phía máy chủ (Server Side Encryption - SSE). Tính năng này không có sẵn trong WABS.
* AS3 hỗ trợ cả virtual-hosted style (ví dụ: http://mybucket.s3.amazon.com/myobject ) và path-style (ví dụ: http://s3-eu-west-1.amazonaws.com/mybucket/myobject ) trong khi WABS chỉ hỗ trợ path-style (ví dụ: http://myaccount.blob.core.windows.net/myblobcontainer/myblob ).
* AS3 cung cấp tính năng Lưu trữ dự phòng giảm (Reduced Redundancy Storage - RRS) trong đó khách hàng có thể chọn lưu trữ dữ liệu của họ ở mức dự phòng thấp hơn (độ bền 99,99% và tính khả dụng 99,99%) so với mức dự phòng tiêu chuẩn của AS3 (độ bền 99,999999999% và độ khả dụng 99,99%) do đó giảm được chi phí cho dung lượng lưu trữ. Điều này khá khá hữu ích để giảm chi phí dung lượng lưu trữ cho các dữ liệu không quan trọng và dễ dàng tái tạo. Còn WABS thì chỉ cung cấp một mức dự phòng.

## Các khái niệm

Trước khi chúng ta nói chi tiết hơn về hai dịch vụ này, mình nghĩ điều quan trọng là phải hiểu rõ một số khái niệm. Nếu bạn đã quen thuộc với các khái niệm cơ bản của WABS và AS3, các bạn có thể bỏ qua phần này.

**Blob Containers and Bucket**s : Nếu các dịch vụ này là hệ thống tệp trên đám mây, hãy nghĩ đến một blob container (trong WABS) hoặc một bucket (trong AS3) như là thư mục hoặc danh mục. Trong tài khoản lưu trữ (trong WABS) hoặc tài khoản (trong AS3), bạn có thể có không hoặc nhiều blob containers và buckets tương ứng và chúng sẽ chứa các blobs hoặc mục tương ứng.

Một vài nhận xét về blob containers và buckets:

* Không có khái niệm về lồng nhau (nested) của blob containers và buckets. Cả WABS và AS3 đều chỉ hỗ trợ 2 phân cấp và không cho phép các thư mục lồng nhau. Tuy nhiên, cả hai hệ thống đều cho phép bạn tạo hệ thống phân cấp ảo cho thư mục bằng cách sử dụng  “prefix”.
* Không có giới hạn về số lượng blob containers và buckets mà bạn có thể tạo trong mỗi hệ thống.
* Cả hai hệ thống đều cho phép bạn lưu trữ một trang web tĩnh trong blob container và  bucket tuy nhiên cách triển khai của AS3 gọn gàng hơn nhiều vì nó cho phép bạn xác định tài liệu gốc và chỉ mục cũng như tùy chỉnh các trang lỗi cho lỗi 4xx (ví dụ: lỗi 404).
* Cả AS3 và WABS đều cung cấp khả năng mà bạn có thể ghi lại các yêu cầu được thực hiện dựa trên các tài nguyên. Tính năng này được gọi là “**logging**” trong AS3 và “**Storage Analytics**” trong WABS. Sự khác biệt là việc ghi nhật ký hoạt động ở cấp nhóm trong AS3 trong khi phân tích bộ nhớ hoạt động ở cấp tài khoản lưu trữ trong WABS. Hơn nữa, việc đăng nhập AS3 đặt dữ liệu vào một nhóm riêng do người dùng xác định, trong đó như trong WABS, dữ liệu phân tích lưu trữ đi vào các bảng và blob containers được xác định trước được tạo tự động cho bạn khi bạn bật phân tích lưu trữ trên tài khoản lưu trữ của mình.

**Blobs and Objects**: Đơn giản chỉ cần đặt các blob (trong WABS) và các object (trong AS3) là các tệp trong hệ thống tệp đám mây của bạn. Chúng lần lượt được đặt vào buckets và blob containers.

Một vài nhận xét về blob và object:

* Không có giới hạn về số lượng blob và object bạn có thể lưu trữ. Mặc dù AS3 không cho bạn biết dung lượng lưu trữ tối đa được phân bổ cho bạn, nhưng tổng số blob trong WABS bị giới hạn bởi kích thước tài khoản lưu trữ của bạn (hiện tại là 100 TB).
* Kích thước tối đa của một object mà bạn có thể lưu trữ trong AS3 là 5 TB trong khi kích thước tối đa của một blob trong WABS là 1 TB.
* Trong WABS, có hai loại blob - Block Blobs và Page Blobs. Block Blobs phù hợp để truyền tải trọng tải (ví dụ: hình ảnh, video, tài liệu, v.v.) và có thể có kích thước tối đa là 200 GB. Page Blobs phù hợp với tải trọng đọc / ghi ngẫu nhiên và có thể có kích thước tối đa là 1 TB. Trường hợp sử dụng phổ biến của một blob trang là VHD được gắn kết dưới dạng ổ đĩa trong vai trò Windows Azure. Trong AS3, không có sự phân biệt như vậy.
* Cả hai hệ thống đều khá phong phú về tính năng liên quan đến các hoạt động trên các blob và object. Bạn có thể sao chép, tải lên, tải xuống và thực hiện các thao tác khác trên chúng.
* Mặc dù cả hai hệ thống đều cho phép bạn bảo vệ nội dung của mình khỏi bị truy cập trái phép, nhưng cơ chế ACL rất chi tiết trong AS3, nơi bạn có thể đặt ACL tùy chỉnh trên từng đối tượng trong một nhóm. Trong WABS, nó chỉ ở mức blob container.

## Pricing

Trước khi chúng tôi tìm hiểu sâu về chức năng, hãy xem giá cả của chúng thế nào nhé. Trong cả hai hệ thống, không có chi phí trả trước. Mô hình định giá khá đơn giản và dựa trên mức tiêu thụ. Trong cả hai hệ thống, chi phí được tính dựa trên cơ sở sử dụng và có ba thành phần:

* **Transaction**: Bạn bị tính phí cho số lượng giao dịch bạn đã thực hiện đối với mỗi hệ thống. Nói một cách đơn giản, một giao dịch đơn lẻ có thể được định nghĩa là một lệnh gọi đến chức năng trong mỗi hệ thống. Tuy nhiên, có một sự khác biệt đáng kể trong cách tính giá này trong mỗi hệ thống. **Trong khi trong WABS, chi phí cho mỗi giao dịch là cố định (hiện tại là 0,01$ cho 10.000 giao dịch), trong AS3, chi phí này thay đổi dựa trên loại giao dịch được thực hiện**. Vì vậy, nếu bạn thực hiện các thao tác PUT, COPY, POST hoặc LIST, bạn phải trả giá / giao dịch cao hơn (ví dụ: 0,01$ cho 1.000 giao dịch trong US Standard Region) và đối với GET và tất cả các Yêu cầu khác, bạn phải trả giá / giao dịch thấp hơn (ví dụ: 0,01$ cho 10.000 giao dịch trong US Standard Region). Một điều quan trọng cần lưu ý là tất cả các yêu cầu xóa đều miễn phí trong AS3.
* **Storage**: Bạn bị tính phí cho lượng dữ liệu bạn lưu trữ trong mỗi hệ thống. Với AS3, bạn có thể lưu trữ các đối tượng có dư thừa tiêu chuẩn hoặc giảm dư thừa. Bạn trả tiền cho bộ nhớ dựa trên mức dự phòng mà bạn đã chọn (thấp hơn để giảm dư thừa).
* **Data Transfer**: Bạn bị tính phí cho số lượng dữ liệu được truyền từ/đến từng hệ thống. Cả hai hệ thống đều cung cấp tính năng xâm nhập miễn phí (tức là dữ liệu đến từ bên ngoài) nhưng tính phí cho việc xuất dữ liệu (tức là dữ liệu đi ra ngoài). Dữ liệu được truyền giữa AS3 và Amazon EC2 trong một khu vực là miễn phí (tức là 0,00$ mỗi GB). Dữ liệu được truyền giữa AS3 và Amazon EC2 ở các khu vực khác nhau sẽ được tính phí theo tỷ lệ truyền dữ liệu qua Internet ở cả hai phía của quá trình truyền. Tương tự trong WABS, chỉ dữ liệu đi ra khỏi trung tâm dữ liệu mới bị tính phí.

Ngoài ra còn có một khái niệm về định giá chuyên biệt và cả hai hệ thống đều cung cấp các gói định giá và ưu đãi khác nhau mà chúng ta có thể tận dụng. Để biết thêm chi tiết về giá cả, mọi người có thể tham khảo https://www.windowsazure.com/en-us/pricing/details/ cho WABS và http://aws.amazon.com/s3/pricing/ cho AS3.

## Chức năng/tính năng

Bảng sau đây tóm tắt danh sách các chức năng được cung cấp bởi WABS và AS3.

|  | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Create Container/PUT Bucket     | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/dd179468.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUT.html)     |
| List Containers/GET Service     | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/dd179352.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTServiceGET.html)     |
| Delete Container/DELETE Bucket    | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/dd179408.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketDELETE.html)     |
| List Blobs/GET Bucket (List Objects)     | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/dd135734.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketGET.html)     |
| Set Blob Service Properties/PUT Bucket logging     | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/hh452235.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUTlogging.html)     |
| Get Blob Service Properties/GET Bucket logging     | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/hh452239.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketGETlogging.html)     |
| Set Container ACL/PUT Bucket acl     | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/dd179391.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUTacl.html)     |
| Get Container ACL/GET Bucket acl    | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/dd179391.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketGETacl.html)     |
| List Blobs/GET Bucket Object versions     | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/dd135734.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketGETVersion.html)     |
| List Blobs/List Multipart Uploads    | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/dd135734.aspx)     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadListMPUpload.html)     |
| Set Container Metadata    | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/dd179362.aspx)     | No     |
| Get Container Metadata    | [Yes](http://msdn.microsoft.com/en-us/library/windowsazure/ee691976.aspx)     | No     |
| PUT Bucket versioning   | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUTVersioningStatus.html)     |
| GET Bucket versioning    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketGETversioningStatus.html)     |
| PUT Bucket lifecycle    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUTlifecycle.html)     |
| GET Bucket lifecycle    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketGETlifecycle.html)     |
| DELETE Bucket lifecycle    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketDELETElifecycle.html)     |
| PUT Bucket policy    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUTpolicy.html)     |
| GET Bucket policy    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUTpolicy.html)     |
| DELETE Bucket policy    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketDELETEpolicy.html)     |
| PUT Bucket notification    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUTnotification.html)     |
| GET Bucket notification   | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketGETnotification.html)     |
| PUT Bucket requestPayment   | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTrequestPaymentPUT.html)     |
| GET Bucket requestPayment    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTrequestPaymentGET.html)     |
| PUT Bucket website    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketPUTwebsite.html)     |
| GET Bucket website    | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketGETwebsite.html)     |
| DELETE Bucket website   | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketDELETEwebsite.html)     |
| HEAD Bucket   | No     | [Yes](http://docs.amazonwebservices.com/AmazonS3/latest/API/RESTBucketHEAD.html)     |

Bây giờ chúng ta sẽ khám phá một vài chức năng này một cách chi tiết hơn.

### Create Container/PUT Bucket

Như tên cho thấy, chức năng này tạo ra một blob container hoặc một bucket mới trong WABS và AS3 tương ứng.

Một điều quan trọng cần hiểu là các blob container trong WABS được xác định phạm vi trong một tài khoản lưu trữ trong khi các bucket trong AS3 được xác định phạm vi trong tài khoản Amazon. Khi bạn tạo tài khoản lưu trữ trong WABS, bạn sẽ phải chỉ định vị trí (trung tâm dữ liệu) của tài khoản lưu trữ đó. Do đó, tất cả các blob container của bạn đều nằm trong một trung tâm dữ liệu cụ thể (vị trí địa lý bị ràng buộc). Như khi bạn tạo một bucket trong AS3, bạn có thể chỉ định vùng mà bạn muốn tạo nhóm này. Vì vậy, về bản chất, bạn có thể có các bucket của mình trải rộng trên tất cả các trung tâm dữ liệu trong AS3 nếu có nhu cầu về yêu cầu như vậy. Để thực hiện điều tương tự trong WABS, trước tiên bạn cần tạo tài khoản lưu trữ trong các trung tâm dữ liệu khác nhau và sau đó tạo các vùng chứa blob trong mỗi tài khoản lưu trữ.

Có một vài quy tắc khi nói đến việc đặt tên cho bucket / blob container. Bảng sau đây sẽ tóm tắt các quy tắc này:

|  | WABS | AS3 |
| -------- | -------- | -------- |
| Min/Max độ dài      | 3/63     | 3/63     |
|Phân biệt chữ hoa chữ thường      | Chữ thường (Lower case)     | Chữ thường (Lower case)     |
|Các ký tự được phép      | Chữ và số và dấu gạch ngang (-)     | Chữ và số, Dấu gạch ngang (-) và Dấu chấm (.)     |

Có một số quy tắc khác để đặt tên cho bucket / blob container:

* Tên blob container phải bắt đầu bằng chữ cái hoặc số, tức là không được bắt đầu bằng ký tự gạch ngang (-). Hơn nữa, mọi ký tự gạch ngang (-) phải được đặt ngay trước và theo sau bởi một chữ cái hoặc số; Dấu gạch ngang liên tiếp không được phép trong tên vùng chứa.
* Khi đặt tên bucket trong AS3, chúng phải là một chuỗi gồm một hoặc nhiều nhãn được phân tách bằng dấu chấm (.), trong đó mỗi phần phải bắt đầu và kết thúc bằng chữ cái viết thường hoặc số. Ngoài ra, tên bucktet không được định dạng dưới dạng Địa chỉ IP (ví dụ: 127.0.0.1).
* Nếu bạn tạo một bucket trong vùng “US Standard”, AS3 tuân theo quy ước đặt tên ít nghiêm ngặt hơn bằng cách cho phép bạn có tên bucket dài từ 3 đến 255 ký tự và chứa các chữ cái hoa, số, dấu chấm (.), Dấu gạch ngang (-) và dấu gạch dưới (_).

Một vài điều chú ý khác:

* Nếu không có vị trí nào được chỉ định trong khu vực mà bucket sẽ được tạo, AS3 sẽ tạo một bucket trong khu vực "US Standard".
* Khi tạo một bucket / blob container, bạn cũng có thể đặt ACL cho bucket / blob container đó. Đặt ACL tại thời điểm tạo là tùy chọn và nếu không được chỉ định, theo mặc định, cả hai hệ thống đều tạo bucket / blob container “**Private**” mà chỉ chủ sở hữu mới có thể truy cập theo mặc định.
* WABS cho phép bạn chỉ định metadata tùy chỉnh cho blob container. Metadata về cơ bản là một tập hợp tên / giá trị. Kích thước tối đa của tất cả các cặp tên / giá trị trong metadata có thể là 8KB. AS3 không cho phép bạn có metadata tùy chỉnh trên một bucket.

### List Containers/GET Service

Như tên cho thấy, hàm này trả về danh sách tất cả các blob container trong tài khoản lưu trữ trong WABS và tất cả các bucket thuộc sở hữu của người gửi đã xác thực yêu cầu.

Một vài nhận xét về chức năng:

* Một lệnh gọi đến chức năng List Containers trong WABS trả về tối đa 5000 blob containers. Nếu có nhiều hơn 5000 vùng blob containers, WABS cũng trả về mã thông báo tiếp tục bằng cách sử dụng nhóm blob containers tiếp theo, nó giống kiểu paginate nhé mọi người. Theo mặc định, WABS trả về tối đa 5000 blob containers nhưng bạn cũng có thể hướng dẫn WABS trả về số lượng blob containers ít hơn. Tuy nhiên, tối đa là 5000.
* Bạn cũng có thể thực hiện lọc phía máy chủ bằng cách hướng dẫn WABS chỉ trả lại những blob containers có tên bắt đầu bằng một “**prefix**” được chỉ định.
* Bạn cũng có thể hướng dẫn WABS tùy chọn trả về metadata blob containers với danh sách blob containers.

### Delete Container/DELETE Bucket

Như tên cho thấy, chức năng này xóa một blob container và một bucket trong WABS và AS3 tương ứng.

Một vài nhận xét về chức năng này:

* Có vẻ như hoạt động Delete Container là một hoạt động đồng bộ, trên thực tế thì lại không phải vậy. Khi bạn gửi yêu cầu xóa một blob container trong WABS, nó sẽ được hệ thống đánh dấu để xóa và không thể truy cập được nữa. Blob container bị xóa thông qua quá trình thu gom rác. Thời gian thực tế để xóa một blob container trong số những thứ khác phụ thuộc vào kích thước của dữ liệu có trong blob container. Theo kinh nghiệm của mình, việc xóa một blob container rất lớn có thể mất hàng giờ. Trong thời gian này, việc tạo blob container có cùng tên sẽ dẫn đến lỗi (Lỗi xung đột - Mã trạng thái HTTP 409). Do đó, cần phải cân nhắc trước về tác động của việc này trong khi đang xóa bảng.
* Trong AS3, một bucket phải trống trước khi có thể xóa nó. Trước tiên, bạn cần xóa tất cả các đối tượng khỏi một bucket trước khi có thể thực hiện thao tác này trên một bucket.

### List Blobs/GET Bucket (List Objects)

Hàm này được sử dụng để lấy danh sách blobs và objects trong blob container và bucket tương ứng. Cả hai chức năng gần như giống hệt nhau theo nghĩa:

* Trong cả hai hàm, bạn có thể giới hạn số lượng blob bạn muốn mỗi hàm trả về.
* Cả hai hàm đều có giới hạn trên về số lượng blob mà dịch vụ sẽ trả về. Trong trường hợp WABS, nó là 5000 trong khi trong trường hợp AS3, nó là 1000. Điều này có nghĩa là trong một lần gọi dịch vụ này, WABS có thể trả về một danh sách bao gồm tối đa 5000 blob trong khi AS3 có thể trả về một danh sách bao gồm trong số tối đa 1000 đối tượng.
* Cả hai hàm đều hỗ trợ khái niệm dấu phân cách. Trong cả hai hệ thống, dấu phân cách là một ký tự để nhóm các blob hoặc đối tượng. Dấu phân cách thường được sử dụng nhất là “/”. Như đã đề cập ở trên, cả WABS và AS3 đều chỉ hỗ trợ phân cấp hai cấp. Sử dụng dấu phân cách có thể tạo ra một thư mục ảo giống như hệ thống phân cấp. Ví dụ: giả sử bạn có các blob (hoặc đối tượng) sau: images/a.png, images/b.png, images/c.png, logs/1.txt, logs/2.txt, files.txt. Khi bạn gọi hàm này và cung cấp “/” làm dấu phân cách, cả hai hệ thống đều trả về những thứ sau: hình ảnh, nhật ký và files.txt.
* Cả hai chức năng đều hỗ trợ khái niệm lọc danh sách phía máy chủ bằng cách sử dụng cái được gọi là **prefix**. Khi yêu cầu của bạn chứa **prefix**, cả hai hệ thống sẽ trả về các mục bắt đầu bằng **prefix** đó. Trong ví dụ trên, nếu chúng tôi cung cấp tiền tố là “image” (và không có dấu phân cách) thì cả hai hệ thống sẽ trả về như sau: image/a.png, image/b.png và image/c.png.
* Cả hai chức năng đều hỗ trợ khái niệm điểm đánh dấu, một loại mã thông báo tiếp nối để hướng dẫn cả hai hệ thống bắt đầu liệt kê các mục từ điểm đánh dấu này.
* Cả hai hệ thống đều trả về các mục theo thứ tự bảng chữ cái.

Bên cạnh đó thì giữa 2 service cũng có một số khác biệt:

* Như đã đề cập ở trên, trong một lần gọi hàm này, WABS có thể trả về tối đa 5000 blob trong khi AS3 có thể trả về tối đa 1000 đối tượng.
* Khi fetch danh sách, bạn cũng có thể hướng dẫn WABS trả lại snapshots cho các blob. Trong AS3, có một chức năng riêng biệt (GET Bucket Object versions) được mô tả bên dưới.
* Khi fetch danh sách, bạn cũng có thể hướng dẫn WABS trả về metadata cho các blob. AS3 không hỗ trợ metadata cho các object, do đó không thể lấy được thông tin này.
* Khi fetch danh sách, bạn có thể hướng dẫn WABS trả lại danh sách các blob chưa được committed (tức là được tải lên một phần). AS3 chỉ trả về các đối tượng được tải lên đầy đủ.

### Set Blob Service Properties/PUT Bucket logging

Như đã đề cập ở trên, cả hai hệ thống đều cung cấp khả năng mà bạn có thể ghi lại nhật ký các yêu cầu được thực hiện trên các buckets và blob containers của bạn. Tính năng này không được bật theo mặc định và bạn cần phải bật tính năng này theo cách thủ công. Bạn sẽ sử dụng chức năng này để kích hoạt việc ghi lại nhật ký. Nó được gọi là [Storage Analytics](http://msdn.microsoft.com/en-us/library/windowsazure/hh343270.aspx) trong WABS (hay đúng hơn là Windows Azure) và dành cho cả ba thành phần của Windows Azure Storage (Table, Queue và Blob Storage).

Tuy nhiên, các thức ghi nhật ký trong mỗi hệ thống lại có sự khác biệt:

* Trong WABS, việc ghi nhật ký được bật ở mức blob storage, và tương tự nó thì trong AS3, nó được thực hiện ở mức bucket. Điều này có nghĩa là khi bạn bật logging trong WABS, nó sẽ được bật cho tất cả các blob containers trong tài khoản lưu trữ, trong khi đó khi bạn bật logging cho AS3, nó chỉ được bật cho một bucket cụ thể. AS3 thực sự cũng đi xuống một cấp, nơi bạn có thể bật ghi nhật ký cho các đối tượng nhất định bắt đầu bằng “prefix” được xác định trước. Ví dụ: giả sử bạn có một bucket gọi là “data” và nó chứa các đối tượng thuộc loại “images” và “errors”. Nếu bạn đã viết các đối tượng loại hình ảnh có tiền tố là “siteimages”, thì bạn chỉ có thể bật ghi nhật ký cho tiền tố “siteimages”. Trong trường hợp này, AS3 sẽ chỉ ghi nhật ký các yêu cầu đối với các đối tượng mà tên đối tượng bắt đầu bằng “siteimages”.
* Trong WABS, dữ liệu ghi nhật ký được lưu trữ trong Windows Azure Storage Table do hệ thống xác định ($MetricsTransactionsBlob) và Blob Container ($logs), tương tự thì trong AS3, dữ liệu này được lưu trữ trong bucket do người dùng xác định.
* Trong WABS, bạn chỉ có thể lưu trữ tối đa 20 TB dữ liệu như một phần của phân tích lưu trữ. Hơn nữa, dữ liệu được lưu giữ trong khoảng thời gian tối đa là 365 ngày sau đó dữ liệu sẽ bị xóa. Tuy nhiên, khi cấu hình phân tích lưu trữ, bạn cũng có thể hướng dẫn Windows Azure giữ dữ liệu này trong một khoảng thời gian nhỏ hơn (giả sử 30 ngày). Trong trường hợp đó, dữ liệu cũ hơn 30 ngày sẽ được Windows Azure sẽ tự động xóa. Logging trong AS3 không có hạn chế này.
* Trong WABS, chỉ chủ sở hữu tài khoản mới có quyền truy cập vào dữ liệu này, còn với  AS3, bạn có thể cung cấp quyền kiểm soát chi tiết đối với người có quyền truy cập vào dữ liệu và các quyền (Full/Read/Write) đối với dữ liệu đó.

### Get Blob Service Properties/GET Bucket logging

Chức năng này được sử dụng để lấy thông tin về cấu hình ghi nhật ký trong mỗi hệ thống. Vì trong AS3, người dùng không phải chủ sở hữu cũng có thể có quyền truy cập vào dữ liệu này, GET Bucket logging trả về thông tin đó cùng với trạng thái ghi nhật ký.

### Set Container ACL/PUT Bucket acl

Hàm này được sử dụng để set ACL cho blob container và bucket. Đối với blob container trong WABS, bạn cũng có thể xác định một hoặc nhiều chính sách truy cập.

Các giá trị ACL có thể có cho blob container là:

* Full public read access (Container): Container và blob data có thể được đọc thông qua yêu cầu ẩn danh. Client có thể liệt kê các blob trong container thông qua yêu cầu ẩn danh, nhưng không thể liệt kê các container trong tài khoản lưu trữ.
* Public read access for blobs only (Blob): Dữ liệu của blob trong container có thể được đọc qua yêu cầu ẩn danh, nhưng dữ liệu trong container thì không khả dụng. Client không thể liệt kê các blob trong container thông qua yêu cầu ẩn danh.
* No public read access (Private): Chỉ chủ sở hữu tài khoản mới có thể đọc dữ liệu của container và dữ liệu trong blob.

Các giá trị ACL có thể có cho bucket là:

* READ: Khi ACL này được cấp cho bucket, nó cho phép người được cấp liệt kê các đối tượng trong bucket.
* WRITE: Khi ACL này được cấp cho bucket, nó cho phép người được cấp quyền tạo, ghi đè và xóa bất kỳ đối tượng nào trong bucket.
* READ_ACP: Khi ACL này được cấp cho bucket, nó cho phép người được cấp đọc ACL của bucket.
* WRITE_ACP: Khi ACL này được cấp cho bucket, nó cho phép người được cấp ghi ACL cho bucket.
* FULL_CONTROL: Khi ACL này được cấp cho bucke, nó cho phép người được cấp quyền READ, WRITE, READ_ACP và WRITE_ACP trên bucket.

Một điều thú vị khi thiết lập ACL trong AS3 là nó rất chi tiết theo nghĩa là bạn có thể cấp các tập hợp quyền khác nhau cho những người dùng khác nhau. Ví dụ: tôi có thể đặt READ_ACL cho user1 trong khi WRITE_ACL cho user2. Tính linh hoạt này không có trong WABS. Bạn chỉ có thể đặt một loại quyền trên toàn thể blob container.

Một điều thú vị về chức năng này trong WABS là ngoài việc thiết lập ACL, bạn cũng có thể đặt một hoặc nhiều (tối đa 5) chính sách truy cập mức container. Chính sách truy cập mức container cho phép bạn chỉ định tập hợp các quyền có giới hạn thời gian. Ví dụ: bạn có thể tạo chính sách truy cập với quyền “Write” trên blob container có hiệu lực trong một ngày. Khi sử dụng chính sách này, bạn có thể tạo một URL mà bạn có thể chia sẻ với người dùng của mình, những người sau đó sẽ có thể ghi vào blob container đó nhưng chỉ trong khoảng thời gian chính sách có hiệu lực. Một ưu điểm khác khi sử dụng chính sách truy cập mức container là nó cho phép bạn linh hoạt hơn trong việc cấp **Shared Access Signatures**. Shared Access Signatures cho phép bạn cung cấp quyền truy cập vào các blob containers và blobs ở cấp độ chi tiết hơn so với việc set quyền của blob container để truy cập một cách công khai. Bằng cách chỉ định Shared Access Signatures, bạn có thể cấp cho người dùng quyền truy cập vào một blob cụ thể hoặc bất kỳ blob nào trong container được chỉ định trong một khoảng thời gian nhất định.

### Get Container ACL/GET Bucket acl

Chức năng này được sử dụng để lấy ACL cho blob container và bucket. Trong trường hợp WABS, chức năng này cũng trả về các chính sách truy cập được xác định cho blob container đó.

### List Blobs/GET Bucket Object versions

Như mình đã đề cập ở trên, cả WABS và AS3 đều hỗ trợ thiết lập phiên bản cho các blob (được gọi là snapshot) và các đối tượng tương ứng mặc dù theo một cách hoàn toàn khác. Chức năng này được sử dụng để lấy danh sách các blob snapshot và các phiên bản của đối tượng. Trong AS3, chức năng này chỉ trả về các đối tượng đã được tạo phiên bản, tuy nhiên trong WABS, điều tương tự có thể được thực hiện thông qua chức năng List Blobs được mô tả ở trên (bằng cách hướng dẫn WABS trả về snapshots của các blobs cùng với các blobs).

**NOTE**: Nếu bạn chỉ muốn fetch danh sách các snapshots của blob trong WABS hoặc các phiên bản của một đối tượng đơn lẻ trong AS3, bạn có thể gọi hàm này và truyền tên đầy đủ của blob làm **prefix**.

### List Blobs/List Multipart Uploads

Như tôi đã đề cập ở trên, cả WABS và AS3 đều hỗ trợ uploading các blob và object theo khối. Trong WABS khi tải lên các blob “Block”, bạn có thể chia các blob thành các khối và sau đó tải các khối này lên. Sau khi tất cả các khối được tải lên, bạn có thể commit các khối này và sau đó khối sẽ có sẵn để sử dụng. Tương tự trong AS3, bạn có thể tải lên một đối tượng bằng cách chia nó thành nhiều phần và tải các phần này lên. Khi tất cả các phần được tải lên, bạn có thể hoàn tất quá trình tải lên bằng cách committing các phần này.

Chức năng List Multipart Uploads trong AS3 cho bạn biết quá trình tải lên nhiều phần đang diễn ra, tức là quá trình tải lên trong đó đối tượng đang được tải lên được chia thành các phần và quá trình tải lên các phần đã bắt đầu nhưng chưa hoàn thành hoặc bị hủy bỏ. WABS cung cấp chức năng tương tự thông qua chức năng List Blobs được mô tả ở trên (bằng cách hướng dẫn WABS trả về các blob uncommitted cùng với các blob đã committed).

### Set Container Metadata

|  | WABS | AS3 |
| -------- | -------- | -------- |
| Set Container Metadata     | Yes     | No     |

Chức năng được sử dụng để set một hoặc nhiều cặp *name/value* do người dùng xác định cho blob container trong WABS.

Một vài nhận xét về chức năng này:

* Chức năng này ghi đè metadata đã tồn tại.
* Kích thước tối đa của metadata có thể là 8 KB.
* Tên metadata phải là mã định danh C# hợp lệ.

### Get Container Metadata

|  | WABS | AS3 |
| -------- | -------- | -------- |
| Get Container Metadata     | Yes     | No     |

Chức năng này được sử dụng để lấy metadata do người dùng xác định cho blob container.

### PUT Bucket versioning

|  | WABS | AS3 |
| -------- | -------- | -------- |
| PUT Bucket versioning     | No    | Yes     |

Việc tạo phiên bản cho phép bạn duy trì nhiều bản sao của một đối tượng. Chức năng này cho phép một đối tượng  có thể có nhiều phiên bản trong một bucket. Bất kỳ khi nào một thao tác PUT, POST, COPY hoặc DELETE được gọi trên một đối tượng, một phiên bản mới của một đối tượng sẽ được tạo ra, đây là đối tượng ngay trước khi thao tác được thực hiện trên một đối tượng. Theo mặc định, tính năng này không được bật trên bucket và bạn sẽ sử dụng chức năng này để kích hoạt. Để tắt/tạm ngừng việc lập phiên bản, bạn sẽ gọi lại hàm này.

Mình đã đề cập rằng WABS không hỗ trợ chức năng này tuy nhiên điều đó không hoàn toàn đúng. WABS cung cấp một tính năng được gọi là “[Snapshot Blob](http://msdn.microsoft.com/en-us/library/windowsazure/ee691971.aspx)”, khi nó được gọi sẽ tạo ra một bản sao chỉ đọc của version mới nhất của blob.

Tuy nhiên, có một số khác biệt trong cách thiết lập phiên bản hoạt động trong hai hệ thống:

* Trong AS3, nó được chỉ định ở mức bucket. Sau khi kích hoạt, nó có thể áp dụng cho tất cả các đối tượng trong bucket đó và AS3 tự động bắt đầu giữ các phiên bản của đối tượng khi  thao tác PUT, POST, COPY hoặc DELETE được thực hiện trên các đối tượng đó. Tính năng Snapshot Blob trong WABS hoạt động ở mức blob và bạn sẽ cần gọi hàm này một cách rõ ràng để tạo snapshot. Như vậy, WABS cung cấp tính linh hoạt hơn vì nó hoạt động ở cấp độ blob riêng lẻ, tuy nhiên nó trở thành trách nhiệm của nhà phát triển trong việc tạo snapshot của blob.
* Trong WABS, một khi blob chính bị xóa, tất cả các snapshot của nó (các phiên bản đã đọc) cũng sẽ bị xóa. Trong AS3, thì nó không như vậy. AS3 cung cấp khả năng bảo vệ tốt hơn chống lại việc xóa ngẫu nhiên.
* Liên quan đến phí lưu trữ, trong WABS bạn chỉ bị tính phí cho các khối snapshot khác với các khối trong blob ban đầu. Trong AS3, mỗi phiên bản của một đối tượng được coi như một đối tượng, do đó bạn trả phí lưu trữ giống như bạn trả cho một đối tượng.

### GET Bucket versioning

|  | WABS | AS3 |
| -------- | -------- | -------- |
| GET Bucket versioning     | No    | Yes     |

Chức năng này được sử dụng để lấy trạng thái thiết lập versioning (Enabled hoặc Suspended) của một nhóm trong AS3. Trường hợp chế độ cho phép thiết lập versioning không được bật or bị tạm ngừng trên nhóm thì sẽ nhận được response trống.

### PUT Bucket lifecycle

|  | WABS | AS3 |
| -------- | -------- | -------- |
| PUT Bucket lifecycle     | No    | Yes     |

AS3 có tính năng gọn gàng này, nơi bạn có thể hướng dẫn nó tự động xóa các đối tượng khỏi bucket sau một khoảng thời gian nhất định. Ví dụ: giả sử bạn đang lưu trữ nhật ký dưới dạng obkect trong bucket, tuy nhiên, bạn muốn các nhật ký cũ hơn 30 ngày tự động xóa. AS3 có thể làm điều đó cho bạn.

Theo mặc định, các đối tượng vẫn ở trong bucket vĩnh viễn cho đến khi bạn xóa chúng. Để AS3 xóa nó cho bạn, bạn sử dụng chức năng này. Sử dụng chức năng này, bạn có thể bật hoặc tắt tính năng xóa đối tượng tự động trong nhóm bằng AS3. Khi bật chức năng này, bạn chỉ định số ngày (hay gọi là ngày hết hạn). Khi vòng đời của một bucket được đặt, AS3 sẽ tự động xóa các đối tượng cũ hơn ngày hết hạn.

Một điều thú vị khác về chức năng này là nó có thể áp dụng ở mức thư mục. Ví dụ: giả sử bạn đang lưu trữ nhật ký truy cập và nhật ký lỗi trong bucket "logs" của mình. Giả sử bạn đang lưu trữ tất cả nhật ký liên quan đến quyền truy cập trong thư mục “accesslogs” (tức là nhật ký có tiền tố là “accesslogs”) và nhật ký liên quan đến lỗi trong thư mục “errorlogs”. Trong chức năng này, bạn có khả năng chỉ định vòng đời cho tất cả các đối tượng chỉ trong thư mục “accesslogs”. Khi đó AS3 sẽ chỉ tự động xóa các đối tượng khỏi thư mục “accesslogs” sau khi chúng hết hạn (nghĩa là AS3 sẽ tự động xóa các đối tượng có tiền tố “accesslog” trong nhóm “logs” đã hết hạn).

Tuy nhiên, bạn không thể sử dụng chức năng này nếu bạn đã từng thiết lập versioning trên bucket.

### GET Bucket lifecycle

|  | WABS | AS3 |
| -------- | -------- | -------- |
| GET Bucket lifecycle     | No    | Yes     |

Chức năng này trả về thông tin cấu hình vòng đời được cài đặt trên bucket.

### DELETE Bucket lifecycle

|  | WABS | AS3 |
| -------- | -------- | -------- |
| DELETE Bucket lifecycle     | No    | Yes     |

Chức năng này xóa thông tin cấu hình vòng đời được cài đặt trên bucket.

### PUT Bucket policy

|  | WABS | AS3 |
| -------- | -------- | -------- |
| PUT Bucket policy    | No    | Yes     |

Như đã đề cập ở trên, AS3 cung cấp nhiều cơ chế để bảo vệ bucket và đối tượng của bạn khỏi bị truy cập trái phép. Policy cho bucket là một trong số đó. Đơn giản chỉ cần đặt một Policy cho bucket để xác định quyền truy cập cho các tài nguyên AS3. Sử dụng Policy cho bucket, chủ sở hữu bucket có thể:

* Cho phép hoặc từ chối bất kỳ quyền cấp bucket nào.
* Cấp hoặc từ chối quyền đối với bất kỳ đối tượng nào trong một bucket.

Để tìm hiểu thêm về bucket policy, hãy xem tiếp tại [đây](http://docs.amazonwebservices.com/AmazonS3/latest/dev/UsingBucketPolicies.html).

### GET Bucket policy

|  | WABS | AS3 |
| -------- | -------- | -------- |
| GET Bucket policy    | No    | Yes     |

Chức năng này trả về setting policy cho một bucket.

### DELETE Bucket policy

|  | WABS | AS3 |
| -------- | -------- | -------- |
| DELETE Bucket policy    | No    | Yes     |

Chức năng này sẽ xóa setting policy đã được set trên bucket.

### PUT Bucket notification

|  | WABS | AS3 |
| -------- | -------- | -------- |
| PUT Bucket notification    | No    | Yes     |

Đây lại là một tính năng trong AS3 cho phép gửi tin nhắn đến Amazon Simple Notification Service (SNS) khi Amazon S3 phát hiện được có event quan trọng trên một bucket. 

Trong quá trình triển khai, chỉ có một sự kiện mà thông báo sẽ được gửi đi. Sự kiện đó được gọi là “*s3: ReducedRedundancyLostObject*” và nó được đưa ra khi AS3 phát hiện ra nó đã mất tất cả các bản sao của một đối tượng và không thể phục vụ các yêu cầu cho đối tượng đó nữa.

Bạn sử dụng chức năng này để bật hoặc tắt thông báo thay đổi trạng thái của bucket.

### GET Bucket notification

|  | WABS | AS3 |
| -------- | -------- | -------- |
| GET Bucket notification    | No    | Yes     |

Chức năng này trả về cấu hình thông báo cho một bucket.

### PUT Bucket requestPayment

|  | WABS | AS3 |
| -------- | -------- | -------- |
| PUT Bucket requestPayment    | No    | Yes     |

Theo mặc định, chủ sở hữu bucket trả tiền cho các lượt tải xuống từ bucket. Tuy nhiên, AS3 có khái niệm này, trong đó chủ sở hữu bucket có thể định cấu hình một tài khoản khác để trả tiền cho các lần tải xuống từ bucket. Chức năng này được sử dụng cho mục đích đó. Sử dụng cài đặt này, chủ sở hữu bucket có thể chỉ định rằng người yêu cầu tải xuống sẽ bị tính phí tải xuống. Để biết thêm thông tin về chức năng này, bạn có thể tham khảo tại [đây](http://docs.amazonwebservices.com/AmazonS3/2006-03-01/dev/RequesterPaysBuckets.html?r=7393).

### GET Bucket requestPayment

|  | WABS | AS3 |
| -------- | -------- | -------- |
| GET Bucket requestPayment    | No    | Yes     |

Chức năng này trả về cấu hình *requestPayment* cho một bucket.

### PUT Bucket website

|  | WABS | AS3 |
| -------- | -------- | -------- |
| PUT Bucket website    | No    | Yes     |

Tuy nhiên, một tính năng khác trong AS3 là khả năng lưu trữ các trang web tĩnh trong bucket. Đúng là bạn cũng có thể đạt được điều tương tự với WABS nhưng điều bạn không thể làm là chỉ định tài liệu mặc định, tài liệu lỗi cũng như bạn không thể trỏ tên miền tùy chỉnh đến trang web đó. Tất cả những điều này bạn có thể làm ở đây trong AS3. Để tìm hiểu thêm về cách lưu trữ các trang web tĩnh trong một nhóm trong AS3, bạn có thể tham khảo tại [đây](http://docs.amazonwebservices.com/AmazonS3/latest/dev/WebsiteHosting.html).

Sử dụng chức năng này, bạn có thể thiết lập cấu hình một bucket để sử dụng như một trang web tĩnh. Bạn có thể cung cấp tài liệu mặc định cho trang web của mình cũng như tài liệu khi xảy ra lỗi (ví dụ: lỗi 404).

### GET Bucket website

|  | WABS | AS3 |
| -------- | -------- | -------- |
| GET Bucket website    | No    | Yes     |

Chức năng này trả về cấu hình website cho bucket.

### DELETE Bucket website

|  | WABS | AS3 |
| -------- | -------- | -------- |
| DELETE Bucket website    | No    | Yes     |

Chức năng này sẽ xóa cấu hình website cho bucket.

### HEAD Bucket

|  | WABS | AS3 |
| -------- | -------- | -------- |
| HEAD Bucket    | No    | Yes     |

Chức năng đơn giản này có thể được sử dụng để xác định xem một bucket có tồn tại hay không và người gọi có quyền truy cập vào bucket hay không.

## Tổng kết

Mặc dù về cơ bản cả hai dịch vụ đều cung cấp loại chức năng tương tự, IMO Amazon S3 phong phú hơn khi nói đến các tính năng. Một phần là do Amazon đã khởi đầu sớm hơn. Mình cũng thực sự hy vọng rằng Windows Azure Blob Storage bắt kịp với họ và cung cấp một số tính năng hiện đang bị thiếu và rất cần. Cá nhân mình thực sự thích các tính năng mà WABS không có của Amazon S3  hoặc có thể được cải thiện trong Windows Azure Blob Storage:

* Khả năng lưu trữ các trang web tĩnh như Amazon S3.
* Kiểm soát truy cập.
* Tự động xóa nội dung.
* Phiên bản: ngay cả khi bạn xóa mục cơ sở, các phiên bản của nó vẫn được giữ nguyên.
* Một cái gì đó tương tự như Reduced Redundant Storage..

Tương tự, mình cũng muốn thấy những điều sau trong Amazon S3:

* Có thể xóa một bucket mà không cần xóa các đối tượng trước.
* Hợp nhất một số chức năng v.d. Có thể dễ dàng hợp nhất Get Bucket, Get Bucket versioning, và List Multipart Uploads thành một chức năng.

Nguồn tài liệu: https://gauravmantri.com/2012/05/09/comparing-windows-azure-blob-storage-and-amazon-simple-storage-service-s3part-i/