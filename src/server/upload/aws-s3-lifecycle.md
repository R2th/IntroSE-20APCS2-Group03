## Mở đầu
Trong bài viết lần trước, mình có mô tả sơ qua về AWS S3 rồi, các bạn quan tâm có thể đọc tại [link](https://viblo.asia/p/bao-ve-du-lieu-tren-aws-s3-RnB5pW86lPG#_tong-quan-0)

Một khía cạnh khác, thì bạn có thể chọn region cho S3 bucket, được hiểu là nơi mà dữ liệu sẽ được lưu trữ. Các region phân bố nhiều nơi trên thế giới. Mỗi region sẽ có địa chỉ địa lí cụ thể và là nơi tập hợp các data centers. Mỗi hoặc một vài data centers sẽ tạo nên Available Zone (AZ) (hiểu là vùng khả dụng). Ví dụ như khu vực Đông Hoa Kì (US East (Ohio) Region) thì có 3 AZs, Tây Hoa Kì (US West (Oregon) Region) có 4 AZs *(Số liệu được lấy từ https://aws.amazon.com/about-aws/global-infrastructure/regionsaz/)*  Các AZ độc lập với nhau về hệ thống điện, hệ thống làm mát, hệ thống bảo mật vật lí, và có thể kết nối với nhau thông qua hệ thống network với độ trễ cực thấp. Bạn chỉ có thể chọn region cho bucket mà ko thể chọn AZ, S3 sẽ chọn AZ ngẫu nhiên. Về cơ bản thì dữ liệu trên S3 sẽ được lưu trữ trên các máy chủ ở nhiều AZs của region. S3 sẽ thường xuyên kiểm tra dữ liệu lưu trữ trên các máy chủ bằng việc kiểm tra checksum, và sau đó đồng bộ dữ liệu bị thiếu để cho nhất quán với các máy chủ khác. Điều này chính là yếu tố then chốt giúp cho S3 đạt được độ ổn định, an toàn cho dữ liệu. 

Mỗi bucket sẽ chỉ có một region, và S3 mặc định sẽ chỉ lưu trữ dữ liệu trên region đó, trừ khi được chỉ định việc sao chép dữ liệu sang bucket ở region khác. Vì thế một object mặc định sẽ trải qua vòng đời từ lúc được tạo (create) rồi đến một loạt hành động như get, update, rồi cuối cùng là delete trên một region. Mà S3 lại tính phí dựa trên dung lượng object lưu trữ, vì thế nó khá tốn kém, hoặc là dư thừa với những object (hay hiểu là dữ liệu) không thường xuyên được tác động đến. Hãy tưởng tượng một hệ thống lớn, ví dụ như các mạng xã hội hoạt động qua nhiều nằm, lượng dữ liệu cũ nhiều vô kể, và truy cập đến cực kì ít. Nếu không có xử lí gì thì chi phí để lưu trữ những dữ liệu này cùng là một vấn đề lớn. Đó là ý tưởng của S3 lifecycle.

## S3 Storage class
S3 cung cấp nhiều storage classs (có thể hiểu nôm na là loại kho lưu trữ :D mình cũng chưa nghĩ ra từ tiếng Việt gì hợp lí nên tạm để nguyên tiếng Anh vậy). Các storage class khác nhau về nhiều điểm, ví dụ như độ trễ khi truy cập dữ liệu, cách lưu trữ object, hay phí sử dụng, vì thế mỗi storage class sẽ phù hợp với một loại dữ liệu khác nhau.

![](https://images.viblo.asia/22e6eaa0-d9f2-4d1e-abdd-ffb19af2e161.png)

(Ảnh được cắt từ video [The Amazon S3 Storage Classes - AWS Online Tech Talks](https://www.youtube.com/watch?v=wFSv2gSQADI&t=1984s) của AWS Online Tech Talks

- Loại đầu tiên, là mặc định của S3 khi tạo một bucket, đó là Amazon S3 Standard. S3 Standard lưu trữ dữ liệu ở các máy chủ đặt trên nhiều AZ khác nhau. Loại này có độ trễ khi xử lí thấp, tính ổn định và an toàn cao nên được gợi í để sử dụng cho các dữ liệu ngắn hạn, hoặc các dữ liệu dài hạn nhưng được truy cập thường xuyên.

- Tiếp theo là Amazon S3 Standard - Infrequent Access (Standard-IA), cách tổ chức lưu trữ dữ liệu, độ trễ và tính ổn định thì tương tự với S3 Standard, chỉ khác nhau ở cách tính chi phí. Loại này sẽ thu phí theo kiểu hơi "áp đặt", không giống như phong cách "dùng bao nhiêu trả bấy nhiêu" của AWS. Nếu object (hiểu là 1 đơn vị nhỏ nhất) lưu trữ ít hơn 30 ngày thì tính như 30 ngày, dung lượng của object nhỏ hơn 128KB thì tính là 128KB. Còn từ 30 ngày và 128KB trở lên thì tính như thường. Vì thế, Standard-IA phù hợp với các dữ liệu cần lưu trữ dài hạn, ví dụ như backup data, hoặc các dữ liệu đã cũ nhưng khi truy cập vẫn cần trả ra kết quả lập tức.

- Anh em sinh đôi với Standard-IA là One Zone - IA, khác biệt là ở chỗ One Zone - IA chỉ lưu trữ dữ liệu trên một AZ chứ không phải nhiều AZ, và chẳng may khi dữ liệu bị thất thoát, có thể là do thiên tai, hoặc tác động vật lí nào đó, thì sẽ không có khả năng tái phục hồi. Do đó, chỉ nên lưu trữ dữ liệu mà có thể tạo lại, hoặc dữ liệu là bản sao của các dữ liệu gốc ở trên các AZ khác.

- Amazon S3 Reduced Redundancy Storage (RRS). Loại này mình chưa thấy nó có tác dụng gì đặc biệt, và ngay cả trang chủ của AWS cũng không khuyến khích sử dụng. Độ trễ của loại này cao hơn 3 loại trên, và không có khả năng tự phục hồi dữ liệu nếu chẳng may bị mất. Chỉ những dữ liệu không quan trọng, không yêu cầu tính bảo mật, ví dụ như ảnh thumbnail của sản phẩm, thì nên lưu ở trên loại này.

- Khác biệt hoàn toàn là Amazon Glacier. Từ cái tên có thể hiểu là loại này nên dùng cho các loại dữ liệu ít khi truy cập, và thực tế đúng như vậy. Dữ liệu trên Glacier được lưu trữ dưới dạng `archives`, nhiều nhất có thể lên đến 40TB, và mỗi `archive` sẽ có ID duy nhất, được tự random ra lúc tạo và không thể thay đổi, vì thế mà các cũng khó mà có thể có friendly-name như các object được lưu trữ ở các storage kể trên. Một khi được tạo xong, các archives sẽ được mã hóa và không thể thay đổi, hiểu là đóng băng luôn. Còn khi lấy ra, thì thời gian để nhận về dữ liệu sẽ lên đến vài tiếng. Về cách tính phí thì sẽ gần giống Standard-IA, tối thiểu là 90 ngày và 40GB. Tổng kết lại thì Glacier phù hợp với các dữ liệu backup cực kì lớn, và không yêu cầu được trả ra ngay lập tức.

- Một loại mà có phí rẻ nhất là S3 Glacier Deep Archive. Về cơ bản thì cách lưu trữ dữ liệu và tính phí sẽ giống với Glacier, tuy nhiên thời gian trả ra dữ liệu lâu hơn Glacier.
-  S3 Intelligent-Tiering (S3 IT) là loại khá đặc biệt. Cơ chế hoạt động của loại này là sẽ chia dữ liệu vào 2 tầng chính, một tầng dành cho dữ liệu thường xuyên được sử dụng, tầng còn lại là cho dữ liệu ít được truy cập hơn. Thay vì người dùng phải tự chuyển bằng tay, S3 IT sẽ tự tính toán tần suất truy cập dựa trên lượng request đến dữ liệu và điều chỉnh dữ liệu giữa 2 tầng sao cho hợp lí.

Mọi người có thể theo dõi về phần trăm độ trễ, số lượng AZ của mỗi storage class ở [link](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html), còn về chi phí sử dụng cho mỗi GB thì ở [link](https://aws.amazon.com/s3/pricing/)

## S3 lifecycle

Vòng đời của một dữ liệu bắt đầu từ khi tạo, và kết thúc là xóa. Thông thường, khi tạo ra thì dữ liệu sẽ được truy cập nhiều, liên tục, và giảm dần theo thời gian. Dựa vào tính chất này, S3 có 2 phương pháp trong việc quản lí vòng đời của dữ liệu là:
- Transition actions được hiểu là chuyển dữ liệu đến một storage class phù hợp hơn (thường là chi phí duy trì rẻ hơn). Khi nào thì chuyển, và chuyển vào storage class nào sẽ do owner S3 quy định. Ví dụ, khi mới tạo thì dữ liệu nên lưu trữ ở Standard S3, sau 90 ngày, dữ liệu sẽ chuyển về Standard-IA, sau khoảng một năm nữa, sẽ chuyển về Glacier.

![](https://images.viblo.asia/a482a64d-4ff8-40bf-980c-5ee167adec83.png)

(Ảnh được lấy từ [bài viết](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html) của AWS)
- Expired actions, tức là xét thời gian lưu trữ dữ liệu. Khi hết thời gian thì dữ liệu được hiểu là hết hạn và sẽ tự động bị xóa bỏ.

Người sử dụng S3 có thể phối hợp 2 loại này, tức là đầu tiên sẽ dùng transition, sau đó là expired, xóa hoàn toàn dữ liệu luôn. Và thêm vào đó, có thể "lọc" để áp dụng lifecycle cho từng nhóm dữ liệu khác nhau. Chẳng hạn như lọc theo prefix, nhóm dữ liệu với bắt đầu với "user/" sẽ không bị expired, còn nhóm dữ liệu bắt đầu với "logs/" sẽ expired sau 1 năm. Hoặc là áp dụng lifecyle cho từng bucket riêng rẽ...

Vì có thể phối kết hợp nhiều lifecycle khác nhau nên việc xảy ra conflict là không thể tránh khỏi. Lúc này, S3 sẽ xử lí theo hướng của lifecycle tiết kiệm chi phí nhất. Một vài trường hợp dễ xảy ra như:
- 2 lifecycle cùng áp dụng cho một nhóm dữ liệu. Ví dụ như cùng với 1 bucket, lifecycle 1 là sẽ chuyển dữ liệu vào Amazon Glacier sau 1 năm, lifecycle 2 là sẽ xóa dữ liệu sau 1 năm. Theo tính chất kể trên, S3 sẽ theo hướng 2, xóa dữ liệu.
- lifecycle chỉ định cho các nhóm dữ liệu không phân tách hoàn toàn. Ví dụ lifecycle1 là chuyển dữ liệu với bucket A vào Standard-IA sau 1 năm, lifecycle2 là expired dữ liệu ở bucket A, trong tên có chứa "/logs" sau 1 năm. Với dữ liệu mà tên không chứa "/logs" thì sẽ đơn giản là apply quy tắc 1. Còn với dữ liệu mà tên có "/logs", thì theo tính toán về chi phí, sẽ được xóa, vì rẻ hơn.

Do đó, khi áp dụng lifecycle, ngoài việc cân nhắc các yếu tố về chi phí, độ an toàn, độ trễ của storage class, việc chỉ định nhóm dữ liệu để áp dụng cũng là cực kì quan trọng. Cần tránh rủi ro dữ liệu bị apply các lifecycle ngoài dự kiến, hoặc là apply quá nhiều dữ liệu không liên quan đến lifecycle, làm cho dữ liệu bị xóa hoàn toàn, hoặc lưu trong những storage class không phù hợp.

Một thông tin mà có thể sẽ được quan tâm, đó là dù theo phương pháp nào trong 2 phương pháp kể trên, thì thời gian của object (object's age) được tính như nào? 30 ngày, 1 tháng, 2 tháng sẽ tính từ lúc object được tạo, hay là từ request cuối cùng đến object? Câu trả lời là từ khi object được tạo ra, và sẽ được làm tròn đến nửa đêm. Ví dụ như object được tạo lúc 18:03 14/08/2021 và được xét expiration time hoặc transition time là 5 ngày, thì thời gian s3 thưc hiện các action đó là 00:00 20/08/2021 thay vì 18:03 19/08/2021.

## Kết
Bài viết nói về điểm khác biệt giữa các storage class của AWS S3 và cách sử dụng chúng trong việc tạo vòng đời của dữ liệu lưu trên AWS S3.
Cảm ơn các bạn đã theo dõi.