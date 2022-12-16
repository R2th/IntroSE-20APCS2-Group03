`*Bạn có đang quên một cái gì đó? Một mô hình dữ liệu để giúp bạn nhớ những ngày quan trọng trong đời - trước khi chúng xảy ra.*`

Bạn đã bao giờ quên một ngày quan trọng - sinh nhật mẹ của bạn hay kỷ niệm ngày chia tay nyc của bạn? :joy: Hay là quên trả bài khi về nhà sau một ngày làm việc :v, những điều như thế xảy ra rất nhiều trong cuộc sống thực. Có thể không phải tất cả chúng ta, nhưng với một số người trong chúng ta (bao gồm cả mình nữa :v, ừ đúng đấy :sweat_smile:). Để ngăn chặn những tấm bi kịch như vậy, chúng ta sẽ tạo ra một mô hình dữ liệu mà ta có thể sử dụng làm nền cho một ứng dụng sẽ thông báo cho bạn đúng thời gian. 

Đó là thời điểm để nói lời tạm biệt với tất cả những khuôn mặt thất vọng và buồn bã vì những món quà không được mua đúng hạn. :) 

Hãy cùng tìm hiểu ngay mô hình sau đây.

# Data Model
Mục tiêu của chúng ta là tạo ra một mô hình dữ liệu cho một ứng dụng cho phép ta xác định các sự kiện trong tương lai và tất cả các hành động liên quan đến chúng. Ứng dụng sẽ thông báo cho người dùng khi họ làm một việc thực tế nhất định và đánh dấu điều đó là xong khi hoàn thành. Một số nhiệm vụ đang lặp lại, ví dụ: sự kiện đó kích hoạt một sự kiện trong tương lai tại thời điểm chúng ta xác định. 

Tất nhiên, chúng ta cũng cần phát triển các ứng dụng web và di động để làm cho hệ thống này thực sự hữu ích. Nhưng hiện tại, hãy tập trung vào mô hình dữ liệu sau đây đã:


https://my.vertabelo.com/model/BgtAEWditFfGQcChWiU70WncJLCII01F

Mô hình bao gồm ba lĩnh vực chủ đề:
* User accounts & dates
* Events & actions (definition)
* Events & actions (real)

Chúng ta sẽ mô tả từng lĩnh vực trong ba chủ đề này theo thứ tự mà họ đã liệt kê.

### 1. User Accounts and Dates

Người dùng ứng dụng của chúng ta có thể tạo hồ sơ người dùng của riêng họ và lưu trữ những ngày quan trọng mà họ chọn. Để hỗ trợ điều đó, chúng ta sẽ sử dụng các bảng sau.

![](https://images.viblo.asia/57ea11e3-487d-4992-933b-91260191413f.png)

Bảng `user_account` có cấu trúc tương tự như bảng được mô tả trong nhiều bài viết về mô hình dữ liệu, nhưng hãy lặp lại một lần nữa. Đối với mỗi người dùng, chúng ta sẽ lưu trữ:

* `first_name` và `last_name` - Tên và họ của người dùng
* `user_name` - Tên người dùng đã chọn
* `password` - Giá trị hash của mật khẩu người dùng đã chọn.
* `mobile` - Số điện thoại được cung cấp
* `email` - Các email được sử dụng trong quá trình đăng ký.
* `confirmation_code` - Mã xác nhận được gửi cho người dùng để hoàn tất đăng ký.
* `confirmation_time` - Khi người dùng hoàn thành quá trình xác nhận.
* `insrt_ts` - timestamp khi bản ghi này được chèn.

Sau khi đăng ký hoàn tất, người dùng sẽ có thể chọn ngày quan trọng của riêng họ. Danh sách này được lưu trữ trong bảng đã chọn. Mặc dù chúng ta nói về ngày, nhưng những gì người dùng thực sự đang chọn là các quy tắc sẽ biểu thị ngày. Trước tiên, chúng ta sẽ mô tả tất cả các thuộc tính trong bảng này và sau đó chúng ta sẽ thảo luận về cách người dùng có thể đặt quy tắc sử dụng các thuộc tính đó. Các thuộc tính là:

* `user_account_id` - ID của người dùng đã chèn bản ghi này
* `date_year`, `date_month` và `date_day` - Giá trị số nguyên biểu thị các phần ngày (năm, tháng và ngày trong tháng).
* `date_weekday` - Một đại diện bằng văn bản của số thứ tự của ngày trong tuần. Chúng tôi sử dụng văn bản vì nó cho phép người dùng chọn các giá trị phức tạp hơn - họ có thể xác định cả ngày trong tuần và tuần trong tháng, ví dụ: thứ hai thứ hai trong mỗi tháng.

Xin lưu ý rằng tất cả bốn phần ngày có thể là NULL. Chúng ta đã giành được các hồ sơ cho phép các bản ghi với tất cả các giá trị NULL, vì vậy chúng ta sẽ kiểm tra theo chương trình rằng ít nhất một phần trong ngày sẽ là NOT NULL.

Một vài ví dụ:
* Nếu chúng ta muốn chọn một ngày chính xác, ví dụ: 31.12.2018, chúng tôi sẽ đặt các giá trị thành `date_year` = 2018, `date_month` = 12 và `date_day` = 31. Điều này xác định điều gì đó sẽ chỉ xảy ra một lần, vào ngày đó. 
* Nếu chúng ta sử dụng kết hợp `date_year` = 2019 và `date_month` = 1 , để lại hai giá trị NULL còn lại, sau đó chúng tôi sẽ xác định một cái gì đó sẽ lặp lại trong cả tháng 1 năm 2019.
* Sự kết hợp `date_year` = 2019 và `date_day` = 2 sẽ kích hoạt một sự kiện vào ngày thứ hai của mỗi tháng vào năm 2019.
* Nếu chúng ta chèn giá trị *<weekday:0><week in a month:2>*, chúng ta đang xác định điều gì đó sẽ xảy ra vào thứ Hai thứ hai hàng tháng.

### 2. Events and Actions (Definition)
Mình đã đề cập đến một thứ mơ hồ về một thứ gì đó, một thứ gì đó thực sự là một sự kiện. Sự kiện và hành động là lý do tại sao chúng ta ở đây. Chúng ta muốn liên kết miền thời gian với các sự kiện và hành động thực tế sẽ xảy ra trong tương lai. Trong  chủ đề này, chúng ta sẽ lưu trữ các định nghĩa cho tất cả các sự kiện và hành động. Những định nghĩa này sau đó sẽ được sử dụng để tạo ra các sự kiện và hành động thực tế.

![](https://images.viblo.asia/9596658f-6d7c-4b59-a5f6-81dff5127db5.png)

Bảng `event` chắc chắn là bảng trung tâm trong chủ đề này, nhưng trước khi mô tả nó, mình muốn mô tả hai từ, `event_catalog` và `recurrence_interval`. Cả hai đều có cùng cấu trúc, với khóa chính tăng tự động (`id`) và thuộc tính tên UNIQUE. 

`event_catalog` sẽ lưu trữ các giá trị như ngày sinh nhật, ngày lễ công cộng, ngày kỷ niệm, và ngày khác. Điều này sẽ giúp chúng ta phân loại các sự kiện của mình. 

Mặt khác, `recurrence_interval` sẽ lưu trữ các giá trị như "year"  "month", "week", và "day". Giá trị này biểu thị đơn vị thời gian sẽ trôi qua trước khi sự kiện / hành động được nhắc lại lặp lại (nếu nó được định nghĩa là một sự kiện định kỳ). Khi khoảng thời gian đó trôi qua, một bản mới của cùng một sự kiện / hành động sẽ được tạo ra. 

Bây giờ chúng ta đã sẵn sàng để đi vào trọng tâm của chủ đề này. Trong bảng `event`, người dùng xác định tất cả các sự kiện quan trọng đối với họ. Đối với mỗi sự kiện, chúng tôi sẽ lưu trữ:

* `selected_date_id`
* `event_catalog_id`
* `description` - Một mô tả văn bản bổ sung của sự kiện đó.
* `recurring` - Gắn flag nếu sự kiện đó đang diễn ra.
* `recurrence_interval_id` - Xác định tần suất lặp lại sự kiện (năm, tháng, v.v.). Kết hợp định nghĩa ngày từ `selected_date` với khoảng thời gian lặp lại sẽ cho phép chúng ta xác định điểm bắt đầu của sự kiện và có bao nhiêu sự kiện sau điểm bắt đầu đó sẽ được tạo tự động. Bằng cách này, chúng ta có thể định nghĩa một cái gì đó như: *"Bắt đầu từ thứ Hai thứ 2 mỗi tháng (bảng `selected_table`), tự động lên lịch các cuộc họp hàng ngày (thuộc tính `event.recurrence_interval`)”."*
* `recurring_frequency` - Một số biểu thị có bao nhiêu đơn vị (được xác định bởi `recurrence_interval_id`) phải vượt qua trước khi sự kiện này diễn ra một lần nữa (nếu nó là một sự kiện định kỳ). Đối với ví dụ trước (cuộc họp hàng ngày), chúng ta sẽ xác định giá trị này là 1.
* `recurring_times` - Số lượng các sự kiện của sự kiện này. Đối với ví dụ trước, đây sẽ là 5 (cuộc họp hàng ngày từ thứ Hai đến thứ Sáu).

Next!, chúng ta sẽ cần liên hệ đến những người liên quan (được người dùng biết đến) với các sự kiện. Danh sách tất cả những người được người dùng của chúng ta chèn vào được lưu trữ trong bảng `person`. Đối với mỗi người, người dùng sẽ xác định tên đầy đủ và mọi chi tiết bổ sung (nếu cần). 

Bây giờ, những người này có thể liên quan đến các sự kiện người dùng. Trong bảng `related_event`, chúng ta sẽ lưu trữ các tham chiếu đến `event` và `person` cũng như một số chi tiết về bản chất của mối quan hệ đó. Xin lưu ý rằng cùng một người có thể được thêm nhiều lần cho cùng một sự kiện. Điều này có thể có ý nghĩa nếu chúng ta muốn giữ nhiều hơn một bản ghi để chỉ ra một điều đặc biệt (ví dụ: Lời mời Sobin đến bữa tiệc, Sobin vừa là khách dự tiệc vừa là ca sĩ trong bữa tiệc). 

Hai bảng còn lại trong lĩnh vực chủ đề này có liên quan đến định nghĩa hành động. 

Hành động có thể là bất cứ điều gì liên quan đến sự kiện. Ví dụ: nếu chúng ta muốn nhắc nhở mình về ngày sinh nhật của mẹ, sẽ thật tuyệt nếu ứng dụng nói với chúng ta rằng: Bắt đầu nghĩ về món quà mà bạn muốn tặng cho mẹ của mình, gợi ý mua một món quà cho sinh nhật của mẹ. Quà tặng ngày B. Và một vài nụ hôn, quá, và cuối cùng là bạn đã thực hiện thành công một lần nữa trong năm nay. Bravo! hú hú:joy::joy: cho bạn (và cho tôi nữa :))!

Được rồi, nghiêm túc tí :). "Actiions" là tập hợp các văn bản được xác định trước sẽ thông báo cho người dùng khi cần làm gì đó. Chúng ta có một cuốn từ điển với các loại hành động được xác định trước như là bắt đầu nghĩ, ăn, mua một món quà, gợi cảm, tìm một nhạc sĩ, v.v. Khi xác định một sự kiện, người dùng sẽ chọn một hoặc nhiều hành động liên quan đến sự kiện đó và xác định các giá trị sau cho mỗi sự kiện:
* `event_id` - ID của sự kiện liên quan.
* `action_catalog_id` - Một giá trị được chọn từ từ điển `action_catalog`.
* `description` - Một mô tả tùy chọn của hành động đó. Mỗi khi hành động này được kích hoạt, ứng dụng của chúng tôi sẽ xem xét thuộc tính này, đọc các lệnh và thực hiện hành động đó.
* `action_code` - Một định nghĩa văn bản có cấu trúc của hành động đó.
* `starts_before` - Xác định số lượng đơn vị thời gian đã chọn sẽ trôi qua trước khi bắt đầu hành động này cho sự kiện đã chọn (nếu đây là hành động định kỳ). Nếu giá trị này không được xác định (nghĩa là được đặt thành NULL), thì các hành động sẽ bắt đầu tại cùng thời điểm sự kiện bắt đầu.
* `send_message` -  Một flag biểu thị nếu một tin nhắn nên được gửi đến người dùng hay không.
* `recurring` - Biểu thị nếu hành động này là định kỳ hay không.
* `recurring_interval_id` - Biểu thị khoảng / đơn vị cho sự lặp lại (nếu đây là một hành động định kỳ).
* `recurring_frequency` - Biểu thị số lượng đơn vị được chọn phải trôi qua giữa hai lần lặp lại của cùng một hành động (nếu đây là hành động định kỳ).
* `recurring_times` - Chúng ta sẽ tạo ra bao nhiêu trường hợp của hành động này?

Hành động tái phát theo mô hình tương tự như tái phát sự kiện. Nếu hành động được xác định là định kỳ, chúng ta sẽ tạo một thể hiện hành động mới sau khoảng thời gian được xác định.

### 3. Events and Actions (Real)
Cho đến nay, chúng ta đã tạo ra một mô hình dữ liệu cho phép chúng ta chèn các sự kiện và xác định các hành động. Bây giờ chúng ta sẽ chuyển sang một phần thú vị hơn của mô hình: các sự kiện và hành động thực tế.

![](https://images.viblo.asia/a8eda81b-cacd-427c-bc09-248fa507d7d5.png)

Bảng `event_instance` chứa danh sách tất cả các sự kiện được tạo tự động hoặc chèn thủ công. Mặc dù việc tạo tự động khá rõ ràng - đó là lý do tại sao chúng ta đã tạo ra mô hình này - việc chèn sự kiện thủ công cũng là một khả năng. Chúng ta có thể mong đợi rằng một sự kiện sẽ được chèn tự động vào thời điểm nó sắp xảy ra, vì vậy chúng ta thường chỉ có các sự kiện thực tế và trong quá khứ trong bảng này. Tuy nhiên, điều có thể xảy ra là chúng ta đã quan tâm đến một số sự kiện trong tương lai, ví dụ: chúng ta đã chuẩn bị cho một cuộc họp sẽ diễn ra vào tháng tới. Trong trường hợp đó, chúng ta sẽ có thể chèn thủ công một sự kiện trong tương lai (thời gian sự kiện được đề xuất theo quy tắc đã xác định) và mọi thứ liên quan đến sự kiện đó vào bảng này. Mặt khác, ứng dụng của chúng ta đã giành được ghi đè hoặc sao chép sự kiện đó. Nó sẽ nhận ra các sự kiện mà chúng ta đã chèn bằng cách sử dụng giá trị `event_time`. Đối với mỗi trường hợp sự kiện, chúng ta sẽ xác định:

* `event_id` 
* `event_time` - Thời gian sự kiện thực tế, trong định dạng văn bản có cấu trúc.
* `insert_ts` - timestamp khi sự kiện được chèn vào
* `event_completed` - Giá trị `boolean` biểu thị nếu sự kiện đã hoàn thành hay chưa. Sự kiện được tự động đặt thành hoàn thành, nếu tất cả các hành động liên quan được hoàn thành. Người dùng cũng có thể cài đặt thủ công thành "completed".

Cặp `event_id` - `event_time` là khóa thay thế / UNIQUE của bảng này.

Logic tương tự được sử dụng cho bảng `action_instance`. Các hành động cũng sẽ được tạo tự động khi đến hạn. Nếu một hành động được lặp lại, chúng ta sẽ có nhiều hơn một hành động được xác định cho cùng một sự kiện. Đối với mỗi hành động, chúng ta sẽ xác định:
* `action_id`
* `event_instance_id` - References các `event_instance` liên quan
* `action_time` - Thời gian thực tế của hành động, trong định dạng văn bản có cấu trúc.
* `insert_ts` -  timestamp khi sự kiện được chèn vào
* `action_completed` - Giá trị `boolean` biểu thị nếu hành động đã hoàn thành hay chưa. Người dùng sẽ đặt hành động này thành "completed" thủ công. Nếu thể hiện hành động được đặt thành ’hoàn thành, thì các thể hiện mới đã thắng được tạo ra (ngay cả khi định nghĩa cho biết chúng phải như vậy).

Trong bảng này, khóa thay thế / UNIQUE là sự kết hợp của `action_id` – `event_instance_id` – `action_time`.

 Bảng cuối cùng trong mô hình của chúng ta là bảng `message`. Nó được sử dụng để lưu trữ các thông điệp được tạo ra bởi các hành động. Những tin nhắn này được gửi đến người dùng. Đối với mỗi tin nhắn, chúng ta sẽ lưu trữ:
 
*  `action_instance_id` - ID của `action_instance` đã tạo thông báo này.
*  `message_title` - Tiêu đề
*  `message_text` - Văn bản thông báo chứa mô tả lý do tại sao thư này được tạo (nghĩa là các trường văn bản từ các bảng có liên quan).
* `insert_ts` - timestamp khi sự kiện được chèn vào
* `message_read` - Một flag biểu thị nếu người dùng đã đọc tin nhắn.

### Kết luận
Nếu bạn đã từng quên một ngày nào đó thật sự quan trọng :)). Hay share và like bài viết để tránh phải hối tiếc cả đời nha :v: 

Cảm ơn bạn đọc :D

Bài viết được tham khảo từ [đây](https://www.vertabelo.com/blog/technical-articles/the-important-dates-data-model).