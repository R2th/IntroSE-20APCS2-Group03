Từ lúc học lập trình, chắc hẳn chúng ta đều đã nghe đến các khái niệm như **queue**, **stack**, **linked list** rồi một đống thứ hầm bà lằng ấy trong mấy môn lập trình cơ bản, kiểu dữ liệu rồi giải thuật này nọ. Nhưng hiểu được nó là một chuyện, biết nó là một chuyện, còn dùng nó trong thực tế như nào lại là một chuyện khác. 

Nhưng câu chuyện dưới đây lại là ở một thế giới khác, thế giới không có **queue** hay **stack**, câu chuyện kể về một người nông dân chăn rau, à chăn lợn, nhưng lợn dạo này dịch ốm quá nên chuyển qua buôn chuối và viết blog về thời hoàng kim buôn chuối của mình. Có vậy thôi.

## First things first

Vậy người nông dân đó là ai? Tất nhiên là người đang ngồi gõ những dòng chữ này cho các bạn đọc. Và cũng tất nhiên là anh ta chỉ chém gió về thời hoàng kim buôn chuối của mình. Nhưng bởi vì anh ta đâu có được đào tạo lập trình mà viết tiếp, do vậy phịa ra một câu chuyện gần gũi với anh ta hơn thì sẽ dễ mị dân hơn đúng không?

Vậy thì câu chuyện buôn chuối này của mình sẽ đem lại cho các bạn điều gì?

- **Queue không cao siêu và xa vời như bạn tưởng**
- **Queue hoàn toàn có thể được áp dụng vào project của bạn, ngay... ngày mai**

> Ngay ngày mai là xạo chó đấy, mai thì chưa chắc đã được đâu

## Câu chuyện trước khi có queue

Ngày đầu mở bán chuối, mình ngồi ở nhà và có 1 đơn hàng, mình hưng phấn chốt đơn với khách, ghi đơn hàng đó vào sổ, tính tiền rồi viết hóa đơn. Xong để tiết kiệm chi phí, mình còn tự mình ship chuối đến nhà khách hàng. Mất nửa buổi sáng, nhưng mình rất vui vì khởi đầu thuận lợi.

Ngày thứ 2 có 3 đơn hàng, sáng 1 đơn, chiều 1 đơn, tối 1 đơn, vẫn những công đoạn chốt đơn, ghi hàng vào sổ, tính tiền, viết hóa đơn, ship hàng. Mình thực hiện hết đơn này tới đơn khác, và mọi thứ vẫn êm ru.

Ngày thứ 3 có 5 đơn hàng, hơi overload chút xíu nhưng vì đơn vẫn trải đều khắp ngày nên mình vẫn đảm đương được.

...

Tới ngày thứ 7 thì xảy ra vấn đề. Hôm đó là mùng 1, buổi sáng sớm mình nhận được 1 đơn ở khá xa. Do mình trước nay tiết kiệm không xài 3G nên ra đường là tắt mạng. Mình làm hết mọi công đoạn xong, vừa hứng khởi bước vào nhà check tin nhắn thì nhận ra mình vừa mới bỏ lỡ ... 10 cuộc chat của khách hàng. Mình liên hệ lại với người ta, nhưng vì đã chờ mình quá lâu nên người ta đã đặt hàng nơi khác.

Và đó là cái giá phải trả cho bài học về việc xử lý kiểu chờ đợi.

## Tiếp cận với queue và background job

Sau hôm ấy, mình lập tức thay đổi cách làm việc để lúc nào cũng có thể chốt đơn, không xử lý đơn hàng kiểu chờ đợi hết đơn nọ tới đơn kia vậy nữa mà xử lý theo hàng đợi, khi mình chốt deal với khách hàng xong, mình sẽ cho khách 1 cái hẹn và sẽ chỉ ghi lại đơn hàng đó vào một danh sách chờ (**queue**), thuê một người khác (**worker**) phụ trách ghi hàng vào sổ, tính tiền, viết hóa đơn (**job**), thuê 1 số người khác nữa (**worker**) làm shipper chuyên ship chuối (**job**) theo danh sách đơn hàng kia.

Và thế là mình đã có thể xử lý vài chục đơn hàng 1 ngày.

Trên đây chính là một ví dụ đơn giản về việc áp dụng **queue** và **background job** cho mục đích tăng tốc xử lý. Thay vì mình cứ phải **chốt đơn, ghi hàng vào sổ, tính tiền, viết hóa đơn, ship hàng** rồi mới lại nhận đơn mới thì mình sẽ chỉ chốt đơn, hẹn giờ ship và xử lý tất cả những việc còn lại bằng việc thuê người khác chuyên nghiệp hơn. Khách hàng của mình sẽ được phản hồi sớm hơn, và mình cũng phục vụ được nhiều khách cùng lúc hơn.

## Nhưng tôi làm lập trình chứ có bán chuối đâu?

Vâng, chính vì bạn không bán chuối mà làm lập trình, nên hãy thử tưởng tượng tình huống:

- Hệ thống của bạn xử lý 1 công việc mất 0.5 giây, không có gì phải bàn.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/bm7kipu7vz_310-imported-1443570179-Screen-20shot-202012-04-12-20at-204.00.09-20PM.png)

- Hệ thống của bạn xử lý 1 công việc mất 10 giây. Và người dùng sẽ phải ngồi nhìn trình duyệt quay quay trong 10s để biết có gì xảy ra tiếp theo.
- Hệ thống **cùng lúc** chỉ có thể mở 100 kết nối. Vậy kết nối thứ 101 sẽ phải chờ 10s,... rồi kết nối phía sau sẽ bị chờ đợi, chờ đợi hoài, chờ đợi mãi,... rồi timeout.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/lzf4m21w6e_310-imported-1443570180-Screen-20shot-202012-04-12-20at-202.49.38-20PM.png)

Và đó là lúc bạn phải nghĩ tới **queue** và **background job**. Bạn chỉ cần mất 0.5s để ghi lại yêu cầu của khách hàng vào **queue**, phản hồi lại họ rằng bạn sẽ xử lý, rồi ngắt kết nối với họ và tạo các **background job** xử lý yêu cầu này trên các **worker**.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/9i1q069han_310-imported-1443570182-Screen-20shot-202012-04-12-20at-203.59.12-20PM.png)

> **Queue** là hàng đợi, rõ ràng rồi, đến trước xử lý trước (FIFO)

> **Background job** là những công việc được thực hiện dưới nền, tức là không làm gián đoạn tương tác với người dùng (non-blocking user activities)

> **Worker** là những thành phần riêng biệt (thường là các process riêng, service riêng,...) xử lý 1 số công việc chuyên biệt nào đó.

## Khi nào thì tôi nên sử dụng hình thức này?

Mặc dù hình thức tiếp cận qua background job này giúp cho khả năng xử lý của ứng dụng tăng thêm rất nhiều, tuy nhiên không phải hệ thống nào cũng cần nó, và không phải hệ thống nào nó cũng phù hợp với nó. Sau đây là một số dấu hiệu cho thấy bạn nên sử dụng queue và background job:

- Các hệ thống **chuyên ghi** với cường độ lớn (như log, tracking,...). Đẩy vào xử lý queue và background job sẽ giảm nguy cơ quá tải cho database.
- Các hệ thống **chuyên đọc** nhưng có tính chất **báo cáo, report**, số lượng request ít nhưng rất mất thời gian tổng hợp.
- Các hệ thống có **thời gian phản hồi lâu** vì tính chất công việc, giới hạn khách quan,... Việc phản hồi cho user ngay tức thì rồi chạy trong nền sẽ tạo trải nghiệm người dùng tốt hơn. Hệ thống cũng có khả năng phục vụ nhiều user hơn.
- Các công việc phát sinh từ nghiệp vụ chính, làm việc với **nhiều service ngoài** nhưng **không critical**. Ví dụ thu thập lịch sử hệ thống, gửi email, cập nhật thông tin từ các nguồn,...
- Các công việc mang tính **độc lập** và **ít ảnh hưởng bởi dây chuyền hay thứ tự**. Đảm bảo điều này để có thể scale hệ thống bằng cách thêm nhiều worker cùng lúc.

## Khi nào thì không nên dùng?

Còn sau đây là những ví dụ không khuyến khích sử dụng queue và background job trừ khi có kiến trúc phù hợp:

- Các hệ thống **chuyên đọc** có tính chất hoạt động như các hệ thống đọc bài viết, sản phẩm,... Các hệ thống này sẽ được optimize bằng con đường khác.
- Các công việc mang tính chất **quan trọng**, có tính **quyết định** nhưng có **thời gian phản hồi không quá dài**. Ví dụ các request liên quan tới việc thanh toán, tranh giành unique key hệ thống (như đặt chỗ, mua sản phẩm)

## Một vài ví dụ thực tế

Đây là một số hệ thống thực tế mình đã áp dụng queue và background job. Các bạn có thể tham khảo để có cái nhìn sát hơn:

- **Hệ thống tracking:** client gọi lên tracking system để ghi lại các thông tin người dùng như thông tin trình duyệt, ngày giờ truy cập, ip,... Khi đó hệ thống API sẽ đẩy thông tin đó vào queue trên redis trước, sau đó response OK cho client. Sau đó worker mới lấy thông tin từ queue và ghi vào database. Do số lượng request rất lớn và lượng data ghi vào db rất nhiều nên dùng queue sẽ **tránh quá tải database**
- **Hệ thống logging:** Sau hoạt động gì đó của user với hệ thống API, như login, logout, change profile, update post, view post,... hệ thống sẽ phát sinh ra các event, nhưng các event này không được xử lý ngay mà đưa vào queue nhằm **tránh block hoạt động của người dùng**.
- **Hệ thống notification:** Hệ thống này phụ trách việc gửi thông báo, sms, email cho người dùng. Đây là công việc **phát sinh từ nghiệp vụ chính, không critical** và **sử dụng nhiều service bên ngoài** nên sẽ được đẩy vào queue và gửi lần lượt.
- **Hệ thống analytic:** đây là hệ thống báo cáo nội bộ, tuy số lượng báo cáo không nhiều, nhưng mỗi báo cáo lại rất **tốn thời gian để phản hồi** vì phải tổng hợp số liệu. Do vậy đẩy vào queue để tạo trải nghiệm người dùng tốt hơn. Người dùng sẽ gửi yêu cầu xuất báo cáo và nhận được phản hồi đang xử lý. Sau khi được các worker xử lý xong sẽ thông báo lại cho user qua notification.

## Một vài điểm lưu ý và tổng kết

Qua một bài viết này, chắc các bạn cũng mong muốn xắn ngay tay áo để theo anh bán chuối làm queue đúng không? Nói đơn giản thì nói vậy chứ để các bạn có thể **mai áp dụng luôn** được thì cũng cần phải chú ý một số vấn đề phát sinh khi sử dụng hệ thống queue và background job:

- **Job tracking:** Các bạn phải có cơ chế theo dõi hoạt động của job khi áp dụng hình thức này. Xử lý background job có nghĩa là xử lý job âm thầm, mà lỗi là cũng âm thầm luôn, không đập vào mặt các bạn như ở ngoài API đâu. 
- **Error handling:** Sau khi theo dõi được hoạt động của các job, việc tiếp theo là xử lý lỗi phát sinh như thế nào, có cơ chế retry hay rollback như thế nào, thông báo cho người có trách nhiệm ra sao,... 
- **Retryable job:** Background job của các bạn cần được thiết kế sao cho có thể retry được, tức là lỗi hay không lỗi đều có thể chạy lại mà không xảy ra trùng lặp dữ liệu hay thừa dữ liệu.

Tất nhiên, câu chuyện mình nói ở trên về thanh niên bán chuối chỉ là câu chuyện **tuyệt đối hư cấu**. Các bạn đừng nên học tập mà bỏ nghề đi bán chuối giống mình nhé. Không dễ như vậy đâu =))