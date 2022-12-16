## Đầu tiên: Database
Khi một ứng dụng phát triển lớn hơn, dữ liệu sẽ nhiều hơn, và các câu truy vấn cũng ngày càng phức tạp hơn, đòi hỏi những giải pháp để tăng tốc độ truy vấn.
### Index: vì sao và khi nào?
Index giống như quả thấp nhất trên cây để bạn có thể dễ dàng hái được. Trong thực tế, index giống như mục lục trong sách vậy, thay vì phải đọc toàn bộ cuốn sách, bạn có thể tra trên mục lục, tìm ra cái mình cần và đến thẳng trang đấy, index cũng vậy, nó cho database biết nơi để tìm ra cái chúng ta cần. Nói chung, cột nào mà bạn thường sử dụng để tìm (WHERE) hoặc sắp xếp (ORDER) sẽ là ứng cử viên để đánh index. Foreign key cũng thường được đánh index để cải thiện hiệu suất. Bạn có thể kiểm tra log để xem truy vấn nào bị chậm. Nếu chỉ có tầm vài trăm bản ghi, thì nó cũng chẳng quan trọng, nhưng khi dữ liệu lên tới trăm nghìn bản ghi trên mỗi bảng thì lại là một vấn đề hoàn toàn khác.

ActiveRecord tự động đánh index cho `id`, đóng vai trò là primary key. Vì vậy bạn có thể thấy khi tìm bằng `id` sẽ nhanh hơn tìm bằng các trường khác, ví dụ như `name`. Nhưng không phải lúc nào chúng ta cũng tìm kiếm theo id, người dùng thường sẽ muốn tìm theo tên, hay các thuộc tính gì đó của họ. Nếu bạn cũng thấy đúng, vậy thì đã đến lúc đánh index cho các cột đó.

Ví dụ nhé, đánh index cho `name` trong moder Person. Sau khi sinh file migrate trong console (`rails g migration add_index_to_name_column_on_person`), chúng ta thêm index:
```
class AddIndexToNameColumnOnPerson < ActiveRecord::Migration[5.2]
  def change
    add_index :people, :name
  end
end
```
Giờ xem cách nó chạy với database khoảng 30,000 bản ghi nhé.

Trước khi đánh index: `Person.find_by(name: "Iron Man") => 25.3ms`

Sau khi đánh index: `Person.find_by(name: "Caption American") => 0.6ms`

Không tệ lắm. Chúng ta không biết Iron Man ở đâu nên tìm mất hơn 25ms, nhưng khi chúng ta biết Caption American trong trong quán bar cuối đường, chúng ta có thể tìm thấy anh ấy ngay lập tức. Index thường hữu dụng khi giá trị đó là duy nhất, như tên, thay vì những thứ chung chung như màu tóc, giới tính. Nếu chúng ta có 100,000 bản ghi và bạn muốn tìm Iron Man theo giới tính, thì bạn sẽ phải đi qua khoảng 50,000 bản ghi để tìm thấy anh ấy... nó ko tiết kiệm thời gian hơn được mấy, và bởi vì bạn phải đánh index cho 100,000 bản ghi, nó sẽ rất tốn chỗ (vì thế nên đừng dùng nếu ko thật sự cần).

Tuy nhiên, điều gì sẽ xảy ra khi chúng ta có category với nhiều lựa chọn, nhưng chúng ta lại chỉ quan tâm đến 1 trong số chúng? Giống như chúng ta có 1 cột `classification` trong bảng Person, và 99,5% là người thường, thương nhân, binh lính, trong khi đó chúng ta chỉ quan tâm tới 0,5% là anh hùng? Vậy đánh index cho cột này chỉ để tìm kiếm anh hùng có lãng phí không? Có đấy.

### Partial Index
[Partial Indexing](https://www.postgresql.org/docs/11/indexes-partial.html) cho phép chúng ta đánh index cho 1 tập hơn con trong cột. Vì vậy, nếu chúng ta có 1 thuộc tính (ví dụ như `classification`) mà chúng ta chỉ muốn định định vị 1 nhóm nhỏ các bản ghi, chúng ta có thể chỉ đánh index cho các hàng phù hợp với tiêu chí chúng ta đang tìm kiếm - trong trường hợp này là anh hùng.
```
class AddPartialIndexToPersonOnCls < ActiveRecord::Migration[5.2]
  def change
    add_index :people, :classification, where: "(classification = hero)"
  end
end
```
Nó vẫn nhanh mà lại tiết kiệm bộ nhớ. Nếu partial index phù hợp với nhu cầu của bạn, bạn nên dùng nó thay vì đánh index toàn bộ.
### Pluck
Thử nhìn vào cách truy vấn này xem có thấy quen thuộc không nhé:
```
@items = Item.all.map { | item | [ item.name, item.category ] }
```
Mục đích của chúng ta là lấy ra một mảng các item với tên và category, nhưng câu lệnh trên lại lấy ra toàn bộ bảng `Item`, sau đó mỗi bản ghi lại lấy ra tên và category. Với khoảng 80,000 bản ghi, không có gì ngạc nhiên nếu phải mất đến 60s để truy vấn. Thay vì thế nếu dùng [phương thức `pluck`](https://guides.rubyonrails.org/active_record_querying.html#pluck), sẽ chỉ mất khoảng 3s:
```
@items = Item.pluck(:name, :category)
```
Vấn đề chính ở đây là gì? `pluck` và người anh em họ [`select`](https://apidock.com/rails/ActiveRecord/QueryMethods/select), có thể tiết kiệm cả tấn bộ nhớ và giữ cho trang web của bạn không bị chậm khi truy vấn dữ liệu.
## Pagination: Đừng sử dụng Kaminari (hay Will Paginate)
Phân trang rất tuyệt, nó khiến cuốc sống chúng ta dễ dàng hơn, trang load nhanh hơn, sử dụng bộ nhớ hiệu quả hơn bằng cách cắt hàng nghìn bản ghi thành nhiều trang, thay vì mớ hỗn độn không bao giờ kết thúc. Nhưng 2 gem phổ biến nhất được dùng để làm điều này trong Rails là Kaminari và Will Paginate - đều chậm, tốn bộ nhớ.

Vậy dùng cái gì thay thế? [Pagy](https://github.com/ddnexus/pagy), nhanh hơn, tốn ít bộ nhớ hơn, cũng rất dễ sử dụng, vào gem để đọc cụ thể hơn nhé.
## Chạy đồng thời các luồng
Rails hỗ trợ xử lý luồng, chắc bạn cũng biết, Sidekiq khá khá nổi tiếng trong lĩnh vực này. Tuy nhiên cũng không nhất thiết phải dùng Sidekiq để tận dụng luồng, nó [vốn có sẵn trong Ruby](https://ruby-doc.org/core-2.6.1/Thread.html). Nếu bạn có 1 vài trang quan trọng chỉ cần đợi 1 hoặc 2 request HTTP trước khi có thể chạy đầy đủ (có thể là lấy thông tin từ các trang khác, tùy theo thao tác người dùng), thì có lẽ không cần dùng đến gem cho trường hợp đơn giản thế này, bạn có thể tự tạo luồng.

Cách viết khá đơn giản:
```
Thread.new do
  <code here>
end
```
Tada, bạn có thể mở nhiều trang cùng lúc, thời gian cần để lấy thông tin từ tất cả các request HTTP sẽ bằng thời gian chờ trên trang chậm nhất, thay vì tổng số trang.
## Lazy-loading
Nế trang của bạn có nhiều hình ảnh, video off-screen (kiểu load trang là nó hiện ra ý), và nó được phát triển từ nền tảng Rails, Sinatra, Node, hay Super Ninja Fire Penguin Ultra, bạn có thể hưởng lợi từ lazy-loading. Trình duyệt mặc định là sẽ load hết tất cả bọn chúng ra, nếu mạng nhanh thì chẳng vấn đề, nhưng nếu mạng chậm, hoặc là điện thoại bị giới hạn data, thì nó bắt đầu không ổn, đôi khi nó còn là trải nghiệm người dùng, chẳng ai thích vào một trang mà phải chờ đợi nó load cả.

Trong Rails có gem [lazyload-rails](https://github.com/jassa/lazyload-rails) có thể hỗ trợ chúng ta trong khoản này. Giờ thay vì load hết tất cả một lúc, chúng ta cuộn chuột đến đâu, hình ảnh mới được load ra đến đấy.
## Eager Loading: tránh N+1 câu truy vấn
Nếu bạn thấy một loạt câu truy vấn trong log, tất cả đều liên quan đến 1 hành động và giống nhau 1 cách đáng ngờ, thì có lẽ bạn đã gặp phải N+1 rồi đấy. N+1 là khi bạn dùng 1 truy vấn đề lấy bản ghi cha, sau đó mới thực hiện từng truy vấn đối với các bản ghi con. Thực ra cái này dễ bị gặp phải lắm, nhất là khi database của bạn không nhiều dữ liệu, rất khó để nhận ra.

Ví dụ cho dễ hiểu nhé:

Chúng ta có `House has_many Person`, và ngược lại `Person belongs_to House`. Trong controller ta viết `@people = Person.all`. Và trong view ta lấy ra tất cả mọi người và nhà của họ, kiểu như vậy:
```
<% @people.each do | person | %>
  <div> <%= person.house %> </div>
<% end %>
```
Trong mỗi lần thực hiện vòng lặp, nó sẽ thực hiện câu truy vấn để lấy ra nhà của người đó. Nếu nhìn vào console sẽ thấy thế này:
```
Person Load (40.7ms) SELECT "person".* FROM "people"
House Load (0.8ms) SELECT "houses".* FROM "houses" WHERE "houses"."id" = ? LIMIT 1 [["id", 1]]
House Load (0.7ms) SELECT "houses".* FROM "houses" WHERE "houses"."id" = ? LIMIT 1 [["id", 3]]
House Load (0.7ms) SELECT "houses".* FROM "houses" WHERE "houses"."id" = ? LIMIT 1 [["id", 5]]
House Load...
```
Điều này xảy ra bởi vì ActiveRecord, mặc định sử dụng lazy load, vì vậy nó chỉ load khi chúng ta thật sự cần đến. Chúng ta không gọi đến House cho tới khi vào trong vòng lặp, vì vậy khi gọi `Person.all`, nó chỉ load duy nhất các dữ liệu Person cần thiết, không tính các bản ghi có liên kết với nó.

Vậy sửa thế nào? => `@people = Person.all.includes(:house)`

Chỉ đơn giản với `includes` chúng ta đã sử dụng [eager load](https://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations) để load luôn cả các bản ghi House có liên kết với Person, và nó chỉ sử dụng đúng 2 câu truy vấn, một cho moder Person, một cho moder House. Có thể sử dụng gem [Bullet](https://github.com/flyerhzm/bullet) để giúp bạn phát hiện và xử lý N+1 truy vấn.
## Update version Ruby
Một điều khá rõ ràng là phiên bản càng cao thì dùng càng tốt hơn. Mỗi phiên bản mới của Ruby lại có xu hướng cải thiện tốc độ và hiệu năng, đồng thời nó cũng cung cấp các method mới để sử dụng nhanh và dễ dàng hơn. Ví dụ trong Ruby 2.4, nó có thêm method `.match?`, dùng khi muốn test một chuỗi theo Regex, nhanh hơn nhiều so với dùng `.match`, hoặc là `.sum`, nhanh và mạnh hơn so với dùng `.reduce(:+)`.
## Cuối cùng: Gem, jQuery, .count và Caching
### Đừng lạm dụng Gem
Chúng ta thật sự cần sử dụng 1 số gem; nó linh hoạt, cung cấp thêm các chức năng cho ứng dụng mà lại tiết kiệm rất nhiều thời gian, và thậm chí chúng ta tự làm có thể còn không tốt bằng (ví dụ mấy gem như bCrypt, Devise, OAuth). Nếu có 1 gem có thể giải quyết tất cả vấn đề của bạn, thế thì thêm đi, nghĩ gì nữa, nhưng nếu bạn thêm 1 cái gem có đến 800 thứ mà chỉ để sử dụng 1 thứ, thì nghĩ lại đi. Gem cũng khá là nặng và tốn bộ nhớ, thâm chí nó còn ảnh hưởng đến hiệu năng và sẽ khó khăn hơn khi bạn muốn nâng cấp version Rails, vì có thể nó không support hoặc gây ra lỗi.  Hãy tìm 1 cái gem chuyên cho tính năng đấy của bạn, hoặc là tự làm chúng thay vì tải toàn bộ thư viện để làm điều này cho bạn.
### jQuery
Nếu bạn đang sử dụng jQuery trong ứng dụng của bạn, và bạn không cần hỗ trợ IE < 9, hãy dùng jQuery 3.x thay vì jQuery 1.x. Đơn giản chỉ là thay đổi `//= require jquery` (hoặc `require jquery.min`) trong file application.js thành `//= require jquery3.min`. Bạn cũng có thể sử dụng jQuery2 nếu muốn, nhưng dù là bạn chọn gì, nó cũng đều nhanh và nhỏ gọn hơn bản đầu tiên.
### Sử dụng .size, không phải .count
Đừng sử dụng `.count` trong câu truy vấn trừ khi bạn có lý do đặc biệt cần sử dụng nó; `.size` sẽ chọn cách thích hợp để thực hiện những gì bạn yêu cầu. (đọc cụ thể hơn ở [đây](http://web.archive.org/web/20100210204319/http://blog.hasmanythrough.com/2008/2/27/count-length-size) nhé, đại khái là nó sẽ dùng `.length` khi bản ghi đã được load ra rồi, tránh truy vấn thêm lần nữa, hoặc dùng `.count` khi bản ghi chưa được load ra). 
### Caching
Mục đích của cache là để lưu lại những dữ liệu hay dùng đến để tránh phải truy vấn vào database hoặc liên tục truy cập mạng để lấy cùng 1 thông tin. Phần lớn đã được lưu bởi trình duyệt, nhằm rút ngắn quá trình tải trang cho người dùng. Rails cũng có cơ chế tự động lưu cache, nhưng không phải cái gì nó cũng lưu và một số cái không lưu có thể làm ảnh hưởng đến hiệu suất.

Bởi vì nói về cache khá là dài, nên mình sẽ không đề cập sâu trong bài viết này, bạn có thể tham khảo thêm tại [đây](https://guides.rubyonrails.org/caching_with_rails.html), đặc biệt chú ý phần fragment caching, vì nó thường được sử dụng phổ biến nhất.

*Hết rồi đó, hy vọng bài viết sẽ có ích với bạn! :sunglasses:*

Nguồn: https://medium.com/@daniellempesis/speeding-up-your-ruby-on-rails-app-4c37ec71b126