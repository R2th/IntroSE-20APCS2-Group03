Hello mọi người, hôm nay mình sẽ giới thiệu đến các bạn một chủ đề không hẳn là mới nhưng cần thiết, biết đâu đó trong quá trình làm việc hay bất kể khi nào đó chúng ta sẽ vô tình gặp phải, và hệ quả của nó sẽ ra sao nếu chúng ta không làm đúng cách, Ok giả xử như sau, mình có 1 rake task, nhiệm vụ của rake task này sẽ lấy data từ đâu đó về rồi thêm một vài điều kiện nữa nó sẽ được tạo thành một record và lưu nó xuống database, cụ thể hơn ở đây có khoảng 100k bản ghi, với cách làm bình thuờng và đơn giản hơn là chúng ta sẽ sử dụng ActiveRecord, Tuy nhiên ActiveRecord có cơ chế khiến cho việc tạo bản ghi rất chậm nên việc nhập dữ liệu sẽ ngốn rất nhiều thời gian, khả năng toang database là tương đối cao bởi vì khi ở đoạn này chúng ta sẽ phải kết nối 100k lần vào database thử tưởng tượng nếu databse đóng mở liên tục như vậy thì trường hợp xấu sẽ xảy ra với hệ thống chúng ta là gì ?, vậy phương án ở đây chúng ta làm thế nào để giải quyết vấn đề này ?

![](https://images.viblo.asia/2246564c-c893-4fed-b088-00e6e9600073.png)

# Activerecord-import :
Hiểu cơ bản Activerecord-import là một thư viện giúp chúng ta  việc thêm số lượng lớn dữ liệu vào database.

Bởi vì rails ActiveRecord không hỗ trợ việc thêm đồng thời nhiều bản ghi một lúc mà chính ta phải thêm một các tuần tự từng bản ghi như mình đã nói ở trên, vì vậy chúng ta sẽ bị lãng phí thời gian cho việc tạo kết nối, việc chờ đợi sẽ diễn ra rất lâu và có nhiều rủi do. Điều này giống như việc chúng ta vận chuyển từng kiện hàng lên xe một, cho đến khi hết hàng vậy, thay vì ném tất cả kiện hàng vào 1 xe và trở nó đi. 
thử 1 ví dụ sau đây nhé :


Thử nhập 100,000 posts bằng schema sau: 

```
create_table :posts do |t|
   t.column :name, :string, null: false
   t.column :description, :string
end
```

Đây là một giải pháp đơn giản sử dụng ActiveRecord: 

```
class Post < ActiveRecord::Base
end
```

Giả sử convert_csv_to_post_attributes là một phương thức convert CSV thành một mảng chứa các thuộc tính của Post model.
```
convert_csv_to_post_attributes.each do |attrs|
   Post.create!(attrs)
end
```

Đoạn code trên cực kỳ đơn giản, không có gì để tranh luận cả nhưng bạn nghĩ sẽ mất bao nhiêu lâu để thực hiện xong quá trình đó. Quá lãng phí thời gian. 

# Vì sao ActiveRecord lại chậm.
Mỗi bản ghi khi được tạo ra bằng ActiveRecord, đồng nghĩa với việc một câu lệnh truy vấn riêng biệt được tạo ra rồi gửi đến cơ sở dữ liệu. Vì vậy, khi nhập 100,000 posts thì đồng nghĩa với gửi 100,000 câu lệnh truy vấn khác nhau  tới cơ sở dữ liệu. Sau đó, cơ sở dữ liệu sẽ phải thao tác trên 100,000 câu lệnh riêng biệt và đóng/mở, thêm/ cập nhật 100,000 các thao tác khác để xử lý dữ liệu. Điều đó khiến việc nhập dữ liệu rất mất thời gian. Vậy nên đó không phải là cách chúng ta nên làm, và nếu như các bạn gặp trường hợp này thì hãy nên xử lý như sau :


### Tăng tốc độ bằng  import:

Thay vì dùng create!, chúng ta sẽ thử xây dựng các Book instances trong bộ nhớ và đưa chúng qua Post.import:
như sau :

```
books = convert_csv_to_post_attributes.map do |attrs|
  Post.new(attrs)
  end
Book.import posts
```

các bạn thử đoán xem là thời gian hệ thống xử lý ở đây là bao nhiêu, và tất nhiên rồi nó là rất rẩt nhanh, hơn 15-20 lần so với cách chúng ta làm như lúc đầu. Ở đây các bạn có thể hỉểu là phương thức nhập sẽ tiếp tục có hiệu lực và tìm ra cách tuần tự hóa tất cả các Book Instances thành các câu lệnh SQL có hiệu suất cao.

và tất nhiên nếu như trong quá trình đầu vào mà bạn không muốn có validations cho bất cứ bản ghi nào thì chỉ việc thêm như sau vào đoạn mã của mình:

```
posts = convert_csv_to_post_attributes.map do |attrs|
  Post.new(attrs)
   end
Post.import posts, validate: false
```

và tất nhiên nó sẽ nhanh hơn, bởi bản thân hê thống không cần phải quan tâm đến vấn đề điều kiện đầu vào của từng record một, thay vào đó là auto vào thẳng, à ở đây việc cài đặt validate: false để thể hiện rằng việc nhập Posts có bỏ qua validations. Lựa chọn có giá trị cũng được xác nhận là công nhận là chính xác để thực hiện validations, nhưng bạn cũng có thể giữ validations nếu muốn. 

##### import các cột và giá trị có validations :
Đôi khi chúng ta đã có sẵn dữ liệu theo một loạt các giá trị và tất cả những gì chúng ta cần làm là khớp với các cột cần import. Nếu bạn muốn bỏ qua việc tự xây dựng in-memory Post Instances, bạn có thể tự mình chuyển một loạt các cột trong bộ nhớ và các giá trị để đưa vào quá trình trình nhập: 
```
columns = [:name, :description]
```

Ví dụ [ ['Post #1', 'New Post'], ['Post #2', ' New Post 2'], ...]
```
array_of_post_attrs = convert_csv_to_post_attributes
Post.import columns, array_of_post_attrs, validate: true
```

Cách này mất khoảng 7.5 giây, tốc độ đã được cải thiện rất nhiều so với thời gian ban đầu tuy nhiên còn chậm hơn cách dùng mẫu import. 

và ngược lại nếu như bạn muốn các cột và giá trị không có validations thì dễ thôi, sẽ như sau :
```
columns = [:title, :description]
# E.g. [ ['Post #1', 'New post'], ['Post #2', 'Last Book'], ...]
array_of_post_attrs = convert_csv_to_post_attributes
Post.import columns, array_of_post_attrs, validate: false
```

Đây là biện pháp tối ưu nhất trong các mục nêu trên, và thời gian hoàn thành của nó sẽ chỉ trong một vài nốt nhạc ,

Trên đây là các gợi ý để cải thiện tốc độ import dữ liệu khối lượng lớn bằng Activerecord-import. Hãy sử dụng schema trên và việc import dữ liệu trên các cơ sở dữ liệu MySQL (InnoDB), PostgreSQL, và SQLite3  chúng ta sẽ nhận được những kết quả khác nhau, ở đây mình sẽ show các bạn xem một kết quả chạy trên MySQL.

| record    | ActiveRecord (#create)  | import(models) w/validations|import(models) w/o validations | import(cols, vals) w/validations |
| --------      | --------                                | -------- | ----- | ------ |
| 10           | 0.017                                 | 0.001     | 0.001 |  0.002  |
| 100         | 0.119                                 |  0.006     | 0.006 |  0.009  |
| 1,000      | 0.94                                   | 0.05     | 0.043 |  0.08  |
| 10,000    | 9.703                                | 0.582     | 0.433 |  0.81  |
| 100,000   |97.426                              | 4.965     | 4.662 |  7.491  |


ok, một cách trực quan nhất để chúng ta nhìn ra được tốc độ của nó, sẽ nhanh hơn rất nhiều lần so với cách làm trước đó như ở trên chúng ta đã có đề cập tới là việc sử dụng ActiveRecord (#create) , mất thời gian và rủi ro cao.


# Kết luận :
Như chúng ta đã thấy ở trên việc tăng tốc độ import dữ liệu nhanh hơn từ 13 đến 40 lần đã trở nên đơn giản hơn rất nhiều với chỉ một vài dòng code ngắn gọn của Activerecord-import, nếu bạn đang gặp vấn đề tương tự thì hãy thử làm quen và sử dụng nó để xem hiệu quả có khác biệt không nhé !