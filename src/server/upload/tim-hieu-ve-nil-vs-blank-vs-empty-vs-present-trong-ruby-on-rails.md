## Vấn đề :
Bạn thường xuyên phải kiểm tra xem một đối tượng có rỗng không. Và khi bạn tìm kiếm sẽ ra rất nhiều cách thức kiểm tra, và bạn không hiểu chính xác thì "rỗng" nghĩa là gì?
Vâỵ cùng tìm hiểu về các cách thức kiểm tra này nhé !!!
## Sử dụng If trong trường hợp này có liệu đã đủ ???
`if false` hoặc `if nil` sẽ không thực hiện điều kiện tương ứng, bởi vì false và nil được coi là giá trị sai.

Nói cách khác nếu bạn ép kiểu nil hoặc false là boolean, nó sẽ trả về false. Mọi loại giá trị khác đều được coi là true trong Ruby . Điều nảy xảy ra không chỉ dành riêng cho Ruby, nó còn hoạt động với JavaScript.

![](https://images.viblo.asia/dc3ec3a6-76cc-4550-a4de-c832ca41a480.png)

## nil? trong Ruby và kiểm tra đối tượng có nil?

Thật dễ dàng, trong Ruby bạn có thể kiểm tra xem một đối tượng có phải là nil hay không, chỉ bằng cách gọi nil? trên đối tượng ... ngay cả khi đối tượng là con số không :grinning:

Lưu ý: trong Ruby theo quy ước thì mọi phương thức kết thúc bằng dấu chấm hỏi đều được thiết kế để trả về boolean (true hoặc false). Trong JavaScript, quy ước lại khác: thường loại phương thức này bắt đầu bằng "is" (isEmpty, isNumeric, v.v.)

![](https://images.viblo.asia/6425da98-e522-4461-9a3d-5295f61a4193.png)

## .empty? trong Ruby, dùng để kiêm tra xem size có bằng 0 hay không ???

.empty? là một phương thức Ruby, chỉ hoạt động với Hash, Array hoặc String. Nhưng không phải cho mọi Enumerable. Nó trả về true nếu kích thước size lớn hơn 0. Đối với những trường hợp khác nó trả về một NoMethodError.

![](https://images.viblo.asia/263efdf4-7d0d-4ddb-8da7-21034bf496a0.png)

## .blank? từ ActiveSupport trong Rails

ActiveSupport là tập hợp các hàm tiện ích được Rails nhúng thẳng vào lớp của thư viện chuẩn của Ruby (như Array, String, Hash), và .blank? được định nghĩa trong ActiveSupport, vì vậy nếu bạn đang ở trong môi trường Rails, bạn sẽ được sử dụng nó mà không phải khai báo thêm gì.

NoMethodError ở trên có thể gây khó chịu. Vì vậy method .blank? được thêm vào ActiveSupport. 

Một đối tượng là blank khi nó nil hoặc false , ngoài ra Array và Hash là blank khi chúng là empty.

![](https://images.viblo.asia/0aed211d-da16-4fc6-b9c0-062dbf8408ce.png)

## .present? từ ActiveSupport trong Rails

.present? sẽ là phủ định của blank?

![](https://images.viblo.asia/c4cb428c-28af-497b-97f4-e4a3c6b6aa12.png)

## kết luận
Để ghi nhớ ở đây tôi sẽ tạo 1 bảng như sau
![](https://images.viblo.asia/3fb60519-93d2-463b-b733-e5211f0ad61f.png)

Bài viết còn sơ sài do là bài đâu tiên mình chia sẻ , cảm ơn bạn đã đọc .