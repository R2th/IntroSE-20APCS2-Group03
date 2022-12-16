## 22 quan điểm cần cân nhắc khi áp dụng web application framework
### Đặt log

#### Format log

Mấu chốt của thiết kế application log cần chi tiết, tham khảo [Quan điểm thiết kế log](https://qiita.com/nanasess/items/350e59b29cceb2f122b3) . Tùy theo logger mà có ít nhiều chút nhưng việc có thể làm thì là điều chắc chắn.

Ngoài ra **Format output nên để dạng JSON để sau dễ chỉnh sửa**. Vì sẽ dễ dàng liên kết với system collect log nên recommend. Nếu kết hợp vớ các môi trường grep search log như là [command jq](https://qiita.com/takeshinoda@github/items/2dec7a72930ec1f658af) thì sẽ nâng cao tầm nhìn đáng kể

#### Thời điểm xuất log

Việc cần phải output thì là 3 cái sau đây. Những cái này thì sẽ không nhận biết được cho người phát triển application mà sẽ thực hiện sẵn để output tự động.

* **Bắt đầu request** ：request parameter, class name/method name định thực hiện v. v... Output thông tin mà có thể hiểu được là đã định thực hiện cái gì.
* **Khi kết thúc request normal** ： output HTTP status code và thời gian thực hiện v. v... Do log sẽ mở rộng nên payload sẽ không output.
* **Khi kết thúc request abnormal（khi xảy ra exception）** ： output exception class name và error message. Không bắt buộc nhưng nếu output sẵn cùng với nội dung output khi start request chẳng hạn như request parameter, thì việc điều tra bug sẽ dễ dàng hơn

Thời điểm xuất log thích hợp nhất là ở 2 thời điểm sau

* **Khi liên kết hệ thống ngoài** ： trước khi communicate với external system, output sẵn request parameter. Khi nabnormal, hãy output error response. Khi kết thúc bình thường, nếu chỉ phân chia việc kết thúc bình thường thì OK.
* **Khi thực hiện SQL** ： O/R mapper thông thường thì có thể output log SQL đã thực hiện. Vì rất hữu ích khi debug nên ít nhất cũng output log trên môi trường phát triển. Nếu output cả trên môi trường thật, thì sẽ output ra log số lượng lớn, nên hãy cân nhắc để không bị chết do disk full.

#### Masking thông tin bảo mật

Trong những cái output log, có trường hợp bao gồm thông tin bảo mật (thông tin cá nhân, etc...). Trong trường hợp đó, **xử lý sẵn để có thể thực hiện xử lý mask thích hợp khi output log** . Dù không làm những việc như thế này thì application cũng sẽ hoạt động nên có xu hướng quên.

Ví dụ như Rails có cung cấp tiêu chuẩn [Cấu trúc mask thông tin bảo mật của request param](https://qiita.com/kakkunpakkun/items/4639bc653924e2dc8dbe).

```ruby
Rails.application.config.filter_parameters += ['password', 'card_number']
```

Khi thực hiện như trên thì lúc xuất log ra sẽ replace text  `[FILTERED]` .

#### Tương quan ID và retroactive tracing

Trường hợp server Web và application server được phân chia, thì dù thực hiện 1 xử lý trên micro service, nhưng sẽ thông qua nhiều server.

Cần có cơ chế để có thể trace xem đã xảy ra error ở đâu, và chuẩn bị cho trường hợp phát sinh error trong khi xử lý. Lý tưởng là việc lưu vào [distributed tracing system](http://techlife.cookpad.com/entry/2017/09/06/115710)như Zipkin và AWS X-Ray là lý tưởng, nhưng trong trường hợp không phải như vậy, thì phải bao gồm **tương quan ID** trong log. Về ID tương quan, cũng có giải thích ở mục 8.8 của [micro service architecture](https://www.amazon.co.jp/dp/4873117607).


### Chứng thực

#### Xử lý check

Nếu không thống nhất phương châm design trong project thì sẽ xuất hiện câu lệnh if để thực hiện check vào tất cả các điểm, và không thể liên kết được. Dù có thay đổi sau đó thì phạm vi ảnh hưởng khi đã xảy ra bug**cũng không vượt quá rào cản tâm lý**nhiều. Ví dụ trường hợp Play sử dụng [chức năng Filter](https://www.playframework.com/documentation/2.6.x/ScalaHttpFilters) là được. Tùy theo framework mà tên gọi khác nhau nên mọi người chủ động tìm kiém tư liệu nhé.

Để có thể get được framework và library support thì hãy design khởi tạo phát triển. Trước mắt, phải chiến thắng với cám dỗ là add câu lệnh if.

#### Common

Nếu cơ cấu như thế này chưa được cung cấp thì chỉ có kết hợp vào base class của controller, nhưng việc làm cho base class increase thì là anti pattern điển hình, nên nếu có thể thì muốn tránh. Trường hợp implement thì không phải là implement trực tiếp vào base class mà sẽ định nghĩa bằng class khác để chuyển nhượng, và giảm bớt việc phình to của base class.


## Yếu tố thường được xem trọng

### Cấu trúc directory

#### Tổng thể project

Cấu trúc directory của toàn bộ project thì sẽ base trên tiêu chuẩn framework. Tuy nhiên, ở cấu trúc tiêu chuẩn**thì chắc chắn sẽ xuất hiện những chướng ngại khó**nên cần thiết phải design cẩn thận.

Ví dụ, có nhiều Web application cần thực hiện batch, nhưng trong framework tiêu chuẩn, do có nhiều trường hợp nơi đặt script dùng cho batch chưa được quy định nên sẽ cắt directory độc lập.

#### Application code

Hầu hết các Web application framework đang là base MVC. Do đó, nếu base trên architecture khác MVC thì sẽ định nghĩa riêng cấu trúc directory.

Việc tạo directory thì đơn giản nhưng directory đó cần có trách nhiệm gì thì bên team phát triển cần phải có ý hiểu chung thông nhấy với nhau. Dù cấu trúc hóa hoàn mỹ đến đâu mà **các engineer liên quan không thể hiểu được thì cũng không có ý nghĩa**

#### Anti pattern

Việc không được làm tuyệt đối là**phải tạo directory thích hợp**. Do khó khăn trong nơi để, trước mắt, directory đã tạo thích hợp để hoạt động thì sẽ tiếp tục còn lại cho đến thế hệ sau. Nhiều trường hợp không có thời gian, làm khởi tạo phát triển.

Lý tưởng cấu trúc directory thì dù không đọc document thì cũng hiểu được trực quan là file mà mình muốn xem ở đâu. Vì sao lại có ở đây.


### Timezone

#### UTC or JST

Trường hợp cung cấp service ở nhật thì sẽ là 2 lựa chọn**UTC hoặc JST**. Không phải là cái nào đúng mà là tùy theo nguyên nhân external như là time zone của hệ thống liên kết, xem xét đến triển khai global, thì sẽ thay đổi xem chọn cái nào.

Ngoài ra, nên quyết định sẵn xem có ý thức được timezone bằng application code hay không. Ví dụ, nếu là Java, thì cần thống nhất xem sử dụng ` LocalDateTime ` không bao gồm time zone hay sử dụng ` ZonedDateTime ` bao gồm timezone trong trường hợp xử lý object ngày giờ.

#### Sai khác môi trường

Đặc biệt nếu chưa chỉ định time zone thì timezone của OS sẽ được sử dụng.

Có một số JST là, machine của developer là pattern sát thủ trên UTC. Ở CI thì vẫn còn machine nhưng nếu bị release môi trường thật thì cũng không thể đặt được. **định nghĩa ngầm là gốc của sự cố nên hãy định nghĩa rõ ràng timezone. **

#### Setting database server

**Nếu có thể thì nên thống nhất với timezone của application server và application. ** ví dụ, nếu không nghĩ gì đến RDS của AWS, mà build database server, thì timezone sẽ là UTC. Nếu mà JST application mà không biết điều này thì sẽ gây ra sự hỗn loạn.

Trường hợp dù thế nào cũng bị thành timezone khác do quá trình lịch sử v. v..., thì sẽ cho ý thức timezone bằng application code. Nếu là ngôn ngữ của hệ thống JVM thì sử dụng ` ZonedDateTime ` chứ không phải ` LocalDateTime `, và cho duy trì thông tin của time zone vào object ngày giờ.