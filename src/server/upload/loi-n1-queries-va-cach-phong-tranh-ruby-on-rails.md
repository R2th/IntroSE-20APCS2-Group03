Thông thường khi các bạn làm task liên quan đến list (action index) thì lỗi N+1 không quá nghiêm trọng vì hầu hết trong mọi trường hợp là các bạn đã phân trang cho record trước rồi. Nên bất quá thì cũng bị N+1 20 30 lần thôi. Nhưng nếu các bạn làm task liên quan đến export, lúc này bạn mới thấy tầm ảnh hưởng lớn lao của n+1 đến performance dự án như thế nào. Nếu loại bỏ được lỗi N+1 có thể tăng tốc độ export xuống rất rất nhiều lần. Cụ thể mình từng fix bug lỗi N+1 giúp giảm thời gian export từ 4 phút xuống còn 30s. (30s trong đó thời gian tải file chiếm nhiều nhất vì file quá nặng, còn riêng server xử lý thì chỉ mất khoảng 5 -10s ). Hôm nay hãy cùng mình tìm hiểu về lỗi N+1 và một số cách fix nó để tăng performance cho dự án nhé.
# 1. N+1 queries là gì ?
 Hiểu đơn giản là khi bạn thực hiện những câu query giống nhau trong 1 vòng lặp nào đó dẫn đến 1 câu query được gọi rất nhiều lần.

 Trường hợp cơ bản nhất mà chúng ta thấy đó là việc loop qua từng record của một câu query.

 Ví dụ: Bạn cần hiển thị 1 trang thống kê về model Books, đơn giản bạn gọi : 

` books = Book.all`

Sau đó loop qua từng record trong books và show giá trị lên. Tuy nhiên vấn đề sẽ xảy ra nếu bạn cần lấy ra tên tác giả cuốn sách bằng cách gọi tới bảng khác- là bảng author thông qua trường author_id.

Ở mỗi record book, bạn gọi bằng câu lệnh :` book.author.name` (book và author quan hệ 1-1).

Lúc này, bạn đang thực hiện câu query
```shell
SELECT * FROM authors WHERE author.id =  '#{book.author_id}'
```

Nếu có 1000 cuốn sách bạn phải gọi tới câu query này 1000 lần, khiến cho performance cực kì tệ hại, thậm chí có thể dẫn tới việc server quá tải.

# 2. Cách khắc phục 
## 2.1 Dùng includes
### 2.1.1 Cách dùng
Cách khắc phục cơ bản nhất đó là thêm method `.includes` vào. Rất đơn giản đúng không ?

Nhưng nó chỉ áp dụng được với các trường hợp thông thường, ví dụ như bài toán Books ở trên. Lúc này chúng ta chỉ cần gọi.

`books = Book.includes(:author)`

Câu lệnh này có nghĩa là khi load mỗi record book thì đã load kèm theo 1 author đi kèm thông qua 2 câu lệnh query
- Select all books
```markdown
    Book Load(0.4ms) SELECT * FROM books
```
- Load toàn bộ author theo kèm :
```markdown
  Author Load(4.4ms)  SELECT * FROM author WHERE author.id IN (1,2,3,4,5,6,7...n)
```
Author Load sẽ được lưu lại trong bộ nhớ Active record và khi chúng ta gọi` books.first.author` sẽ cho kết quả gần như ngay lập tức mà không cần truy vấn vào database.
### 2.1.2 Includes với nhiều field quan hệ phức tạp
Khi bạn cần include nhiều field và các field đó quan hệ phức tạp với nhau bạn viết như sau

`Book.includes(author: [{followers: :job}, :companies]) `

Trong đó :
 - author quan hệ 1 -1 với book nên author số ít
 - followers (người theo dõi của author) quan hệ 1-n nên followers số nhiều
 - mỗi follower có 1 job, quan hệ 1-1  nên job là số ít.
 - companies và followers đều là của author nên được viết thành mảng.
 - tương tự với các trường hợp phức tạp khác.

Gọi job ra : `books.first.author.followers.first.job`

Gọi companies ra :  `books.first.author.companies`

### 2.1.3 Cách kiểm tra xem đã hết N+1 hay là chưa ?

Cách đơn giản nhất và cùi mía nhất là kiểm tra các dòng query ở terminal. Nếu 1 câu gọi ra nhiều lần thì rõ ràng câu đó đang bị N+1. Nhưng nhìn vậy rất đau mắt và thiếu chuyên nghiệp. Nhiều lúc bạn còn có thể bỏ sót một vài trường hợp mà không nhận ra vì lý do chủ quan.

Cách mình thường dùng nhất đó là dùng binding.pry (hoặc byebug) vào trước câu lệnh nghi bị N+1 ( câu lệnh này đang nằm trong 1 vòng lặp nào đó ).

Run tới chỗ đang binding và thực hiện câu lệnh đó. Kiểm tra xem câu lệnh query có được gọi ra hay không. Nếu có, bạn đang bị N+1, còn trả ra kết quả ngay lập tức nghĩa là không bị.

Vẫn bị N+1:
```sql
>> book.author.name
Book Load (0.4ms)  SELECT  `books`.* FROM `books` WHERE `books`.`deleted_at` IS NULL
Author Load (0.2ms)  SELECT  `authors`.* FROM `authors` WHERE `authors`.`deleted_at` IS NULL
AND `authors`.`id` = 5 
=> "Conan Doyle"
```

Đã hết N+1:
```ruby
>> book.author.name 
=> "Conan Doyle"
```

## 2.2 Thay thế câu query bằng phương thức xử lý với mảng
Trong nhiều trường hợp chúng ta không phải chỉ lấy  trường có mối quan hệ không thôi mà chỉ lấy các trường đó với điều kiện nhất định.
Ví dụ ở bài toán Book ở trên, bây giờ yêu cầu không phải lấy ra toàn bộ follower của author mà chỉ lấy ra những follower có giới tính là nam (có gender = 1)

Lúc này nếu dùng `books =  Book.includes(author: :followers) `

Tiếp theo loop qua từng phần tử và gọi: `book.author.followers.where(gender: 1)`

Câu lệnh where ở trên sẽ bị bị N+1

Cách khắc phục chúng ta sẽ chuyển câu lệnh where(gender: 1) bằng hàm select trong ruby

Lúc này vẫn là `books =  Book.include(author: :followers) `

Khi loop qua, ta gọi :  `book.author.followers.select{|follower| follower.gender == 1}`

Nếu lấy giới tính nữ, ta gọi : `book.author.followers.select{|follower| follower.gender == 0}`

Hết bị n+1 nhé, performance tăng lên rất nhiều đấy.

Các bài toán thực tế mà mình gặp phải khó hơn ví dụ này rất nhiều, những câu query cũng sẽ lằng nhằng, rối rắm chứ không đơn giản như vậy. Nhưng bằng cách chuyển câu query khéo léo bạn hoàn toàn có thể biến nó thành 1 câu lệnh xử lý mảng được. Chuyển câu query thành xử lý mảng là cả 1 nghệ thuật đấy !

Một số kinh nghiệm của mình :
- WHERE thay bằng select
- dùng find để tìm phần tử đầu tiên tìm thấy (nếu ko tìm thấy trả ra null)
- điều kiện JOIN - ON trong query khi chuyển sang xử lý mảng cũng chỉ là select mà thôi.
- GROUP BY thay thế bằng group
- DISTINCT thay thế bằng uniq
- một số hàm xử lý mảng hay dùng khác : reduce, map, each, sum, with_index v....v....

## 2.3 Kết hợp giữa includes và điều kiện WHERE

Giống như ví dụ 3.1 ở trên nhưng bây giờ yêu cầu chỉ lấy ra những người dùng có giới tính là nam mà không quan tâm tới giới tính nữ, chúng ta sẽ sử dụng câu lệnh SQL thay vì dùng mảng, lúc này performance sẽ cao hơn.

Đầu tiên load ra những book có tác giả mà các tác giả đó có người theo dõi là nam
```python
books = Book.includes(author: :followers)
            .joins(author: :followers)
            .where(followers: {gender: 1})
```

Khi loop từng đối tượng ta chỉ cần gọi :
```python
book.author.followers
```

Dự án thực tế mình gặp trường hợp này khá nhiều.

Lưu ý : Nếu chúng ta không dùng `.includes(author: :followers)` thì `book.author.followers` sẽ gọi vào database và trả về toàn bộ followers giới tính cả nam lẫn nữ.

## 2.4 Chủ động select từ đầu trong câu SQL

Cách này ít gặp và thường chỉ dùng được trong trường hợp bạn muốn lấy ra 1 giá trị đơn lẻ nào đó, ví dụ, muốn lấy ra lương trong từng tháng của 1 member trong 1 công ty (và hàng tá điều kiện khác nữa )
Thay vì dùng cách 2.2 và 2.3 sẽ rất rắc rối thì các bạn có thể viết trong scope query:

```javascript
 select_fields = "salary_histories.salary AS sl, ..."
 condition_join = "INNER JOIN salary_histories ON salary_histories.member_id = ..."
 select(select_fields)
     .joins(condition_join)
     .where(...)
```

Lúc này khi loop qua từng phần tử bạn có thể gọi tới field `sl` để lấy ra lương của member tương ứng.

  # 3. Cảm ơn các bạn
  Thank you for watching!