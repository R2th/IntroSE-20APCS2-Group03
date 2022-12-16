**Khi ứng dụng của chúng ta phát triển càng lớn, chắc chắn chúng có xu hướng chứa nhiều dữ liệu hơn và yêu cầu các truy vấn ngày càng phức tạp. Và bởi vì CPU thì nhanh, Disk thì chậm và ứng dụng của chúng ta thì thường không yêu cầu quá nhiều tính toán, nên các trang web thường bị ràng buộc về I / O. Do vậy, nếu muốn tối ưu hóa hiệu năng ứng dụng của bạn, chắc chắn bạn nên tìm cách tối ưu cơ sở dữ liệu và truy vấn trước tiên.**
<br><br>
*Mình đọc được một quy tắc để xem và phát hiện có câu SQL nào thừa không. Đó là, trong một `Rails controller action` thì chỉ nên có 1 câu SQL cho mỗi bảng. Nếu bạn nhìn thấy nhiều hơn 1 câu SQL cho một bảng, thì câu (s) đó có thể được xem xét là không cần thiết và bạn nên tìm cách giảm bớt số lượng query ở bảng đó.*

-----
-----


Đầu tiên hãy nhìn đoạn code dưới đây:
```ruby
User.where(id: user_ids).each do |user|
  # Lots of user processing 
end
```
Nó đơn giản đúng không, nếu có `user_ids` thì block `user processing` sẽ chạy, nếu không có `user_ids` thì block đó sẽ bị skip. Tuy nhiên, điều này không đúng lắm, để mình giải thích tại sao nhé.<br><br>
Khi chúng ta chạy đoạn trên thì nó sẽ thực hiện truy vấn vào db kể cả khi `user_ids` là empty.
```ruby
(pry)> User.where(id: [])
User Load (1.0ms)  SELECT `users`.* FROM `users` WHERE 1=0
=> []
```
Nhìn thấy cái `1=0` không, đó là cách `ActiveRecord` đảm bảo không có records nào được return. Tất nhiên đó là 1 câu query khá nhanh (1.0 ms), nhưng nếu ta chạy đoạn trên cực nhiều lần thì nó sẽ trở thành vấn đề cho db của bạn.<br>
Một cách là không chạy đoạn SQL lookup trừ khi ta chắc chắn cần chạy.
```ruby
return unless user_ids.any?
User.where(id: user_ids).each do |user|
  # Lots of user processing 
end
```
Bằng cách này ta sẽ bỏ được những lần hit vào db thừa thãi và đồng thời tăng tốc code của bạn.Giả sử bạn cần chạy đoạn code trên 10k lần, nó sẽ tốn của bạn khoảng 0.5s
```ruby
(pry)> Benchmark.realtime do                                                           
>   10_000.times { User.where(id: []) }                                                    
> end                                                                                          
=> 0.5508159045130014
```
so sánh với đoạn code khi check trước `user_ids` có rỗng không, chúng ta chỉ tốn chưa tới 1/1000s
```ruby
(pry)> Benchmark.realtime do                                                           
>   10_000.times do                                                                            
>       next unless ids.any?                                                                     
>       User.where(:id => [])                                                                   
>   end                                                                                        
> end                                                                                          
=> 0.0006368421018123627
```


-----
-----
*Nếu bạn thấy một loạt các truy vấn trong `console` của mình, tất cả đều liên quan đến một hành động duy nhất và tất cả đều trông giống nhau một cách đáng ngờ, thì bạn có thể đã gặp N + 1 queries; bạn có thể thực hiện một truy vấn để truy xuất một đối tượng cha và sau đó N truy vấn bổ sung, một truy vấn cho mỗi đối tượng con.*<br><br>
Ví dụ, bạn có đối trượng `House` với quan hệ `has_many` `people`, còn đối tượng `Person` thì `belongs_to` `House`.<br> Controller bạn sẽ để thế này `@people = Person.all` còn view bạn sẽ để thế này
```ruby
<% @people.each do | person | %>
  <div> <%= person.house %> </div>
<% end %>
```
Khi đó nếu bạn nhìn console của mình thì nó sẽ là như thế này:
```sql
Person Load (40.7ms) SELECT "person".* FROM "people"
House Load (0.8ms) SELECT "houses".* FROM "houses" WHERE "houses"."id" = ? LIMIT 1 [["id", 1]]
House Load (0.7ms) SELECT "houses".* FROM "houses" WHERE "houses"."id" = ? LIMIT 1 [["id", 3]]
House Load (0.7ms) SELECT "houses".* FROM "houses" WHERE "houses"."id" = ? LIMIT 1 [["id", 5]]
House Load...
```
Điều này xảy ra vì ActiveRecord, giống như hầu hết các ORMs, sẽ mặc định lazy loads mọi thứ. Chúng ta không cần lấy `house` cho đến khi ta ở trong vòng lặp, so nên khi gọi `Person.all`, nó chỉ load data của `Person`, chứ không phải của các records có quan hệ.<br><br>
**Cách fix?** `@people = Person.all.includes(:house)`
<br>

Với cách sử dụng `includes`, chúng ta đã `eager load` các records quan hệ (`house`) vào, cho nên chúng ta chỉ cần query vào db đúng 2 lần; lần đầu để lấy `Person`, lần hai để lấy `House`. (Chúng ta không kết thúc với việc load ra it data hơn, chúng ta chỉ hit vào db ít lần hơn mà thôi).
<br><br>
*Chi tiết về `Eager Loading` các bạn có thể tìm những bài đã có trên Viblo hoặc các nguồn tương tự, mình sẽ không nói sâu trong bài này.*

-----
-----

Đừng dùng `count` trong khi query trừ khi bạn thực sự có lí do để dùng; `size` sẽ chọn ra cách phù hợp nhất và nhanh nhất để làm điều bạn muốn.<br><br>
Nhìn cách `size` được implement đi:
```ruby
# File activerecord/lib/active_record/relation.rb, line 210
def size
  loaded? ? @records.length : count(:all)
end
```
Thấy không, nếu `records` đã được `load` rồi, nó sẽ chỉ cần đếm thôi, tránh được 1 lần hit vào db để thực hiên câu query COUNT nữa.
<br>

Và đừng dùng `length` để đếm có bao nhiêu records; `ActiveRecord` không có property `length`, cho nên nếu bạn dùng nó, ví dụ `Person.all.length`, đầu tiên nó sẽ load tất cả các `Person` ra, convert vào 1 mảng, hãy nhìn cái này đi:

```sql
> Person.all.length
Person Load (346.0ms) SELECT “people”.* FROM “people”

> Person.all.size
(12.0ms) SELECT COUNT(*) FROM “people”
```
*Ouch!*



-----
-----

**Trên đây là một số tip của mình, hy vong nó có ích cho các bạn.**<br><br>
**Tham khảo:**<br>
https://dev.to/molly_struve/preventing-useless-database-hits-2f50