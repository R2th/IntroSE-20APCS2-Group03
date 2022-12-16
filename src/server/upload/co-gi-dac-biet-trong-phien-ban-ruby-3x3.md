Hello guys, chắc hẳn thời gian vừa rồi chúng ta cũng đã nghe qua thông tin Ruby sắp cho ra mắt Ruby version 3, hay còn được gọi là ruby 3x3, vậy liệu Ruby version 3 này có gì mới, và có những update nào đáng phải kể đến, và tại sao mọi người lại gọi nó là ruby version 3x3, thì trong bài ngày hôm nay chúng ta sẽ cùng đi tìm hiểu và giải đáp những thông tin trên, và cùng đánh giá tổng quan xem liệu phiên bản lần này có phải 1 phiên bản có những đột phá như những gì đã được công bố trước đó chưa nhé !

![](https://images.viblo.asia/0fd0e521-1177-43c1-bc71-9f2937304b58.jpg)

# 1:  Ruby 3 major updates

Với Ruby phiên bản lần này , thì con số 3 thực sự rất quan trọng nó không đơn thuần chỉ là một con số 3 bình thường,  nó còn được thể hiện qua các mốc khác nhau như :
+ Số phiên bản phát hành (version 3.0)
+ Hiệu suất nhanh hơn ( Gấp 3 lần )
+ Có 3 cốt lõi chính. ( being faster, better, ensuring correctness.)

# 2:  Ruby 3 performance
Như các bạn đã đọc ở trên thì một trong những trọng tâm chính của Ruby 3 là hiệu suất, đội phát triển đã đặt ra một mục tiêu rất tham vọng là làm cho Ruby nhanh gấp 3 lần, trên các bài test và các thông kê trước khi phát hành thì nhà phát triển đã chỉ ra rõ điều này !

![](https://images.viblo.asia/6290cb0a-584f-4280-8e58-6e12712cd197.png)

Với đúng tư tưởng của mình: 

"**I hope to see Ruby help every programmer in the world to be productive, and to enjoy programming, and to be happy**" .  

Có một vài người hỏi rằng: 

"**Liệu mục tiêu là biến Ruby trở thành ngôn ngữ nhanh nhất** ?" 

Câu trả lời là không. Mục tiêu chính của Ruby 3x3 là làm cho Ruby nhanh hơn 3 lần so với Ruby 2. Khi ngôn ngữ Ruby được tăng hiệu suất, nó chắc chắn giúp ứng dụng của chúng ta nhanh hơn và có thể mở rộng. Trong đó có hai lĩnh vực có thể đo hiệu suất: bộ nhớ và CPU.

### CPU optimization
### 

Một số cải tiến trong Ruby đã được thực hiện để cải thiện tốc độ. Ruby đã tối ưu hóa trình biên dịch JIT (Just In Time) từ các phiên bản trước. Trình biên dịch Ruby MJIT lần đầu tiên được giới thiệu trong Ruby 2.6. Ruby 3 MJIT đi kèm với bảo mật tốt hơn và dường như cải thiện hiệu suất của ứng dụng web ở mức độ cao hơn.

Việc triển khai MJIT khác với JIT thông thường. Khi các phương thức được gọi nhiều lần, v.d. 10000 lần, MJIT sẽ chọn các phương thức như vậy có thể được biên dịch thành mã gốc và đặt chúng vào một hàng đợi. Sau đó MJIT sẽ tìm nạp hàng đợi và chuyển đổi chúng thành mã gốc.


-----


### Memory optimization
###

Ruby 3 đi kèm với một bộ thu gom rác nâng cao. Nó có API giống bộ đệm của python giúp sử dụng bộ nhớ tốt hơn. Kể từ Ruby 1.8, Ruby đã liên tục phát triển trong các thuật toán thu gom rác.


-----


**Automatic Garbage Compaction**

Thay đổi mới nhất trong việc thu gom rác là Nén nó lại. Nó đã được giới thiệu trong Ruby 2.7, nhưng ở phiên bản 2.7,  quá trình này hơi thủ công. Nhưng ở phiên bản 3 thì hoàn toàn tự động. Bộ nén được gọi một cách khéo léo để đảm bảo sử dụng bộ nhớ thích hợp.


-----


**Objects Grouping**

Máy bắt buộc rác di chuyển các đối tượng trong một gói. Nó nhóm các đối tượng phân tán lại với nhau tại một vị trí duy nhất trong bộ nhớ để bộ nhớ này có thể được sử dụng bởi các đối tượng nặng hơn sau này.


-----


**Parallelism and Concurrency in Ruby**

Như mọi người cũng đã biết sự đa luồng, tính song song, và đồng thời cùng lúc, là một trong những khía cạnh quan trọng của bất kỳ ngôn ngữ lập trình nào, và ở phiên bản Ruby lần này nhà phát triển đã cải thiện được điều đó, có thể đây là 1 trong những yếu tố giúp phiên bản này nhanh hơn một cách đáng kinh ngạc.



-----


**Other Ruby 3 features and changes** :

Trong khoảng thời gian 7 năm, cộng đồng Ruby đã chứng kiến sự cải thiện đáng kể về hiệu suất và các khía cạnh khác. Ngoài các mục tiêu chính, Ruby 3 là một bản cập nhật thú vị với nhiều tính năng mới, các thay đổi cú pháp tiện dụng và các cải tiến mới. Trong phần này, chúng ta sẽ thảo luận về một số tính năng đáng chú ý.
One-line pattern matching syntax change


> One-line pattern matching syntax change

Đối sánh mẫu một dòng trước đây đã sử dụng ```in```. Bây giờ nó được thay thế bằng ```=>```.

example:

ruby 2.7

```ruby
 { name: 'John', role: 'CTO' } in {name:}
 ```
 
 ruby 3.0
 ```ruby
   { name: 'John', role: 'CTO' } => {name:}
```


-----

> Endless Method definition :



Ruby 3.0 bổ sung thêm định nghĩa phương thức vô tận. Nó cho phép chúng ta tạo các định nghĩa phương pháp mà không cần từ khóa end. 
Theo nhà phát triển đã công bố thì đây sẽ 1 tính năng được đưa ra thử nghiệm với phiên bản lần này :
```ruby
# endless method definition
>> def raise_to_power(number, power) = number ** power

>> raise_to_power(2, 5)

=> 32
```




> Except method in Hash:

Ruby 3 thêm một phương thức mới, `except`, vào lớp Hash. Hash#except trả về một hàm băm loại trừ các khóa đã cho và giá trị của chúng.

Gỉa sử, một lúc nào đó chúng ta cần in hoặc ghi lại mọi thứ ngoại trừ một số dữ liệu nhạy cảm. Cụ thể là chúng ta muốn in chi tiết người dùng trong nhật ký nhưng không in mật khẩu, chúng ta có thể nhìn qua 1 ví dụ như sau :

```ruby
irb(main):001:0> user_details = { name: 'Akhil', age: 25, address: 'India', password: 'T:%g6R' }
irb(main):002:0> puts user_details.except(:password)
=> { name: 'Akhil', age: 25, address: 'India' }

irb(main):003:0> db_info = YAML.safe_load(File.read('./database.yml'))
irb(main):004:0> puts db_info.except(:username, :password)
=> { port: 5432, database_name: 'example_db_production' }
```

 **NOTE**:


>Trên đây là 1 vài những thay đổi, cập nhập đáng chú ý của phiên bản ruby lần này , có rất nhiều sự thay đổi đáng kinh ngạc, phải kể tới đó là hiệu năng của nó, đây có thể là những tính năng mà nhà cung cấp đã public, theo thông tin mà tôi đã tìm mà biết được , thì ngoài những tính năng trên được đưa vào bản cập nhật đi cùng đó có thể có những tính năng đang trong quá trình thử nghiệm cũng sẽ được đưa vào và các tính năng thử nghiệm khác sẽ được công bố trong thời gian tới . Một điều thắc mắc nữa là liệu ruby nâng cấp phiên bản mới vậy thì có ảnh hưởng gì đến các thư viện trước đó không ? Và câu trả lời là KHÔNG tại sao vậy, khi cho ra mắt ruby 3 thì các thư viện lõi đã được sửa đổi để phù hợp với mục tiêu của ruby , và điều này không có nghĩa là các ứng dụng cũ của chúng ta sẽ đột ngột dừng hoạt động. Ruby 3 vẫn đảm bảo rằng những thay đổi này tương thích lẫn nhau, tất cả đã sẵn sàng sử dụng tính năng mới và cảm nhận các cải tiến, hiệu suất mới .


**Conclusion**:

Với những cải tiến lớn về hiệu suất, khả năng sử dụng bộ nhớ, phân tích tĩnh và các tính năng mới, nhà phát triển đã rất tin tưởng vào tương lai của Ruby. Với Ruby 3, các ứng dụng có thể mở rộng hơn và làm việc thú vị hơn. Năm 2021 sắp tới không chỉ là một năm mới mà còn là một kỷ nguyên mới cho tất cả những người theo chủ nghĩa Ruby.