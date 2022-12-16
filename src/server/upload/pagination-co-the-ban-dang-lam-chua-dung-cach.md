Pagination? No problem! SELECT ... LIMIT X, Y Right?

Nah! Chưa chắc!

Bạn thấy đấy, logic trên không ổn định, nó có thể xảy ra vấn đề trong các app sử dụng ajax, hoặc infinite scroll.

### TL;DR?
- Đừng phân trang bằng row offset.
- Sử dụng một trường có tính ổn định cao hơn để phân trang, ví vụ các trường về ngày, tháng.
- Phải luôn deduplicate (chống duplicate) ở client side.
- Không tin tưởng bất kì bố con thằng nào cả, server không thể biết được những gì end-user nhìn thấy.

### Vấn đề mà chúng ta thường mắc phải là gì?
Có lẽ cho 1 ví dụ thì dễ hình dung hơn. Giả sử bạn có 1 trang comments trong bài viết của mình, và bạn sẽ muốn là những comment mới nhất được hiển thị ở trên cùng, từ spec trên có thể câu query sẽ được viết ra đại loại như sau:
```sql
SELECT * FROM comments ORDER BY date DESC LIMIT 0, 10
```
Easy! Câu truy vấn trên cho chúng ta 10 comment mới nhất, chả có gì sai ở đây cả. 

Bây giờ người dùng cuộn xuống dưới và bạn load thêm 10 comments nữa bằng câu query tương tự như trên, chỉ khác một chút là `LIMIT 10, 10`, và bạn đã có tiếp 10 comments...

...Đôi khi.

Thử hình dung như sau:

- User A đang xem 1 trang với 10 comments đầu tiên được hiển thị.
- User B gửi 1 comment mới ngay đúng trang đó.
- User A tải trang comment thứ 2.
- Ôi đệt! User A lại nhìn thấy cái comment lúc nãy vừa đọc.

Cái comment cuối ở page 1 nay sang nằm đầu page 2 do cái comment của thằng B lúc nãy. Tự dưng cái trang trở nên "luộm thuộm" 😩

Tình huống tương tự cũng xảy ra khi mà cái list comment bị xoá mất vài comment ở trang trước, trường hợp này thậm chí là còn tệ hơn. 

Thay vì đẩy các comment khác xuống trang sau, trường hợp này lại kéo các comment ở trang sau lên trang trước, và người dùng sẽ bị bỏ qua một số comments trong trường hợp đó. Đúng là như nồi 😤

### Stable pagination
Đừng lo, trường hợp này cũng khá dễ giải quyết. Thay vì dùng offset để phân trang, hãy tìm một trường nào đó ổn định hơn. Trong ví dụ trên chẳng hạn, có thể dùng trường `created_at` của comment.

Với ví dụ đó, câu query đầu tiên của bạn sẽ giống như cũ, nhưng từ các trang sau trở đi, thay vì truyền vào row offset, hãy truyền `created_at` của comment cuối cùng trong trang 1:
```sql
SELECT * FROM comments WHERE date < prevous_date LIMIT 10
```
Quá tuyệt vời~ Bây giờ bạn đã có thể đảm bảo là trong các trang phía sau người dùng sẽ chỉ thấy các comment cũ hơn comment cuối ở trang trước...

...Đôi khi.

### Cẩn thận
Chuyện gì sẽ xảy ra nếu như bạn có nhiều comment trùng giá trị ở `created_at`? Aww... đậu xanh 🤣

Một vài gợi ý có thể dùng trong tình huống này:

Nếu bạn có một trường id tự động tăng (auto incrementing identifier), quá tuyệt, dùng nó ngay. Nó bảo đảm giá trị không bị trùng như thời gian, quá ngon trong trường hợp này.

... Nhưng

Nếu không có id tự động tăng thì nàm thao? Đó là 1 câu chuyện hài, lộn chuyện dài 😒

Thay vì tìm cái comments được tạo ngay trước giá trị được gửi lên, hãy tìm những comments được tạo ngay tại ngày đó. Rồi tự filter những bản ghi bị trùng chứ còn gì nữa (lol)

.... Hoặc

Truyền thêm 1 vài giá trị khác vào để phục vụ cho việc loại bỏ các comment đã trùng (có thể là id của các comment ứng với ngày vừa gửi lên chẳng hạn).

Túm lại là cách đầu tiên vẫn khoẻ re nhất, với thanh niên nào dùng Rails hay Laravel thì đẹp rồi, id luôn tự tăng.

### Đôi khi...
(Lại nữa hả :v)

What about this?
![](https://images.viblo.asia/ff510abe-bd04-4836-b9fc-e84672970593.gif)

Quá quen thuộc rồi

Xin hỏi là làm thế nào để nhảy đến 1 trang bất kỳ nếu như dùng "stable offset" như `id` hoặc `created_at`?

Chịu 😂

Trước khi đi xa hơn thì bạn thử trả lời câu hỏi này đã:

Bạn có thường nhảy đến 1 trang xác định không? hay chỉ bấm next/prev/first/last?

Thách bạn chế được một thiết kế mà người dùng dễ dàng đến được chỗ họ cần, chắc chắn ko phải là cái `[3]` `[7]` ở trên kia rồi :joy:  Có cả tá cách làm khác hiệu quả hơn mà người dùng thường sẽ lựa chọn (ví dụ filter hoặc search)

Dù sao thì cái này cũng đặt ra một câu hỏi khá thú vị để bàn luận, nhỉ :smile:

### Unstable pagination

Stable pagination is not a [silver bullet](https://idioms.thefreedictionary.com/silver+bullet#:~:text=Something%20that%20provides%20an%20immediate,a%20solution%20does%20not%20exist.). Hãy nhìn xem những trang lớn như Reddit và Hacker News, pagination của họ vốn cũng không ổn định, các mục được sắp xếp đầy biến động theo ranking, và thường xuyên được chuyển vị trí ở trong list theo thời gian. Vậy họ làm như thế nào để đối phó với trường hợp này? Họ méo làm gì cả!

Cả 2 trang đó thường xảy ra tình trạng bài đăng bị lặp lại khi bạn chuyển trang. Nhưng nó cũng đâu phải là vấn đề gì quá tệ đâu nhỉ :v Bởi vì những trang đó họ đâu có làm infinite scroll (hoặc chưa làm?)

Tuy nhiên, có hàng tá các client apps ngoài kia tương tự như Reddit và Hacker News đang làm theo hướng infinite scrolling, và một trong số chúng cũng hiển thị những items bị duplicate khi bạn kéo xuống. Amateur hour! Những gì họ cần làm để fix là bỏ qua những item đã có khi append dữ liệu của page tiếp theo vào mảng.

Vẫn có thể hoàn toàn ẩn những item bị xuống hạng khỏi list khi scroll down. Tuy nhiên nó thực sự rất khó để giải quyết, cách làm đơn giản nhất có thể nghĩ đến là server gửi về full list từ đầu đến vị trí hiện tại mà user đang đứng ở mỗi lần load more, nhưng mà ý tưởng này kinh dị quá. Đừng quan tâm tới nó (vấn đề đó) nữa vẫn tốt hơn.