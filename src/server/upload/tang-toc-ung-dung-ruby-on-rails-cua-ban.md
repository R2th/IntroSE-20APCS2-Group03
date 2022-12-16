# 1. Database
Khi các ứng dụng của bạn phát triển lớn hơn, chắc chắn chúng có xu hướng chứa nhiều dữ liệu hơn và yêu cầu các truy vấn ngày càng phức tạp. Và CPU nhanh, đĩa chậm và ứng dụng của của bạn thường không yêu cầu quá nhiều tính toán, nên các trang web thường bị ràng buộc I / O. Điều này gần như được đảm bảo là trường hợp nếu bạn bỏ qua việc tối ưu hóa hoàn toàn cơ sở dữ liệu và truy vấn của mình.

## Indexing

Một trong những điều thú vị nhất của bất kỳ CSDL nào đó là lập chỉ mục. Một sự tương tự thường được sử dụng để lập chỉ mục cơ sở dữ liệu là chỉ mục ở mặt sau của một cuốn sách; thay vì phải đọc toàn bộ cuốn sách, bạn có thể quét một chỉ mục theo thứ tự bảng chữ cái để tìm vị trí của những gì bạn đang tìm kiếm, và sau đó bỏ qua trang đó. Nó giống như lập chỉ mục; nó cho phép cơ sở dữ liệu của chúng tôi biết nơi để tìm những gì  yêu cầu.

Nói chung, bất kỳ cột nào bạn thường sử dụng để tìm kết quả `(WHERE)` hoặc sắp xếp `(SORT)` có thể là một ứng cử viên cho một chỉ mục. Khóa ngoại thường được lập chỉ mục để cải thiện hiệu suất. Bạn có thể kiểm tra `Log` ứng dụng của mình (hoặc Rails server) để kiểm tra xem truy vấn nào chậm.

Điều này có thể không quan trọng nếu bạn chỉ có vài trăm hàng dữ liệu - ví dụ như nếu bạn chỉ cần lưu tên của các quốc gia trên thế giới. Nhưng khi bạn bắt đầu nhận được hàng chục hoặc hàng trăm ngàn hàng trên mỗi bảng, điều này có thể tăng lên nhanh chóng. 

Trong các bước lập chỉ mục.

`ActiveRecord` đã tự động lập chỉ mục cho chúng ta - mọi bảng đều có `id`, đóng vai trò là khóa chính. Các khóa chính được lập chỉ mục theo mặc định; bạn có thể nhận thấy rằng việc tìm kiếm một cái gì đó theo id nhanh hơn  theo tên.

Nhưng có lẽ bạn không nên tìm kiếm mọi thứ theo id. Một người dùng có thể muốn tìm kiếm mọi thứ theo tên của họ hoặc một số thuộc tính. Nếu bạn thấy rằng đây là trường hợp, có lẽ đã đến lúc lập chỉ mục.

Hãy thêm Index `name` vào model `Person`. 
```
class AddIndexToNameColumnOnPerson < ActiveRecord::Migration[5.2]
  def change
    add_index :people, :name
  end
end
```

Hãy tạo data cho Model `Person` là 30_000.

**Before:** 
   ```
   Person.find_by(name: "Jon Snow") => 25.3ms
   ```
**After:** 
```
Person.find_by(name: "The Hound") => 0.6ms
```

Vì vậy với Index bạn nên kiểm tra lại Slow query trong hệ thống của bạn sau đó phân tích và đưa ra index hợp lý.


## Partial Indexing

Lập chỉ mục một phần cho phép chúng ta lập chỉ mục một tập hợp con của một cột. Vì vậy, nếu chúng tôi thấy chúng tôi có một thuộc tính (như `classification`) mà chúng tôi thường sử dụng để định vị một nhóm nhỏ các bản ghi, chúng tôi chỉ có thể lập chỉ mục các hàng trong cột phù hợp với tiêu chí mà chúng tôi đang tìm kiếm - trong trường hợp này , anh hùng.

```
class AddPartialIndexToPersonOnCls < ActiveRecord::Migration[5.2]
  def change
    add_index :people, :cls, where: "(cls = hero)"
  end
end
```

Điều này tăng tốc mọi thứ, tiết kiệm không gian và không lãng phí bộ nhớ. Nếu lập chỉ mục một phần phù hợp với nhu cầu của bạn, bạn hoàn toàn nên sử dụng nó thay vì chỉ mục đầy đủ.

# Rails app

## Eager Loading: Kill N+1 Queries
Nếu bạn thấy một loạt các truy vấn trong `logs`, tất cả đều liên quan đến một hành động duy nhất và tất cả đều trông giống nhau một cách đáng ngờ, thì có lẽ bạn đã gặp sự cố `N + 1`; bạn có thể thực hiện một truy vấn để truy xuất một đối tượng cha và sau đó N truy vấn bổ sung, một truy vấn cho mỗi đối tượng con.

Đây là điều mà bạn có thể dễ dàng bỏ lỡ trong quá trình phát triển và nếu bạn tiếp tục bỏ qua nó trên môi trường test hoặc có thể trường hợp của bạn cũng vượt qua cả quá trình test do data cũng không gần với thực tế. Tuy nhiên khi dữ liệu đạt con số đủ nhiều thì `N+1` query sẽ là ám ảnh thực sự. 

Ví dụ về `N+1` query có rất nhiều nên mình sẽ không tíếp tục về chúng.
## Pluck
Một người bạn của tôi gần đây đã xây dựng một ứng dụng và phàn nàn về việc mất khoảng một phút để tải một trang cụ thể lần đầu tiên. Khi tôi nhìn vào hành Controller của anh ấy, nó trông giống như thế này:

```
@items = Item.all.map { | item | [ item.name, item.category ] }
```

Tất cả những gì anh ta muốn là `name` và `category` của từng mục vào mảng riêng của mình, nhưng anh ta đã lấy được tât cả bảng `Item`   (một mô hình có hàng chục cột), chuyển đổi chúng thành các đối tượng Ruby với `.map` và cuối cùng ánh xạ qua họ để có được `name` và `category`.

Không có gì đáng ngạc nhiên, đây là một vấn đề khi anh ta có khoảng 80.000 records.

Thay vào đó, chúng tôi đã sửa đổi hành động của anh ấy để sử dụng phương pháp `Pluck` và thời gian giảm từ ~ 60s xuống còn khoảng 3s.
```
@items = Item.pluck(:name, :category)

```
Nội dung chính là:  `Pluck`, cùng với `Select`, có thể tiết kiệm được một tấn bộ nhớ và giữ cho trang web của bạn không bị chậm khi thu thập dữ liệu


## Gems
Đừng quá phụ thuộc vào Gem.
Các Gem nặng có thể trở nên khó sử dụng và đói bộ nhớ, điều này có thể ảnh hưởng đến hiệu suất và khiến việc nâng cấp lên các phiên bản Rails mới hơn trong tương lai khó khăn hơn do bị giảm hỗ trợ hoặc lỗi.
Vì có một Gem ngoài kia giải quyết tất cả các vấn đề của bạn cùng một lúc không? Tuyệt, đi lấy nó.  Tuy nhiên nếu bạn  có một chức năng bạn muốn thêm? Và Gem thêm vào thực hiện đựơc N chức năng trong khi bạn chỉ dùng 1 hoặc 2 chức năng.

## Lazy-Loading Content
Nếu bạn có các trang có nhiều hình ảnh hoặc video ngoài màn hình, bạn là Rails, Sinatra, Node hoặc Super Ninja Fire Penguin Ultra, bạn có thể được hưởng lợi từ việc tải nhanh.

Chúng tôi thực sự chú ý khi chúng tôi sử dụng điện thoại hoặc máy tính xách tay của chúng tôi kết nối với kết nối WiFi băng thông cao, độ trễ thấp, nhưng có hàng tá hình ảnh có trọng lượng hàng trăm KB mỗi lần xuất hiện khá nhanh.

Vấn đề là ở đây: Nếu bạn đã có hàng tấn phương tiện ngoài màn hình, một hành vi mặc định của trình duyệt là tải tất cả chúng. Nếu bạn có một thiết bị và kết nối nhanh, thì đó có lẽ là tốt (nếu không lý tưởng). Nếu bạn kết nối chậm hơn hoặc thiết bị di động bị giới hạn dữ liệu, điều này sẽ không ổn.

Tải một vài megabyte hình ảnh mà người dùng thậm chí có thể không thấy lãng phí dữ liệu, băng thông, sức mạnh xử lý và khả năng sử dụng pin. Mặc dù tác động lớn nhất sẽ xảy ra đối với các thiết bị có độ trễ cao hơn, công suất thấp hơn, nhưng điều này cũng có thể ảnh hưởng đến tải trang trên các máy nhanh, và đôi khi ngay cả một tốc độ nhỏ cũng có thể là sự khác biệt trong việc tải trang có cảm thấy tức thì hay không.




## Use .size, not .count
Không sử dụng `.count` trong một truy vấn trừ khi có một lý do cụ thể để làm như vậy.
`size` sẽ chọn cách thích hợp để thực hiện những gì bạn yêu cầu
Và không sử dụng `.length` để xác dịnh có bao nhiêu records.

ActiveRecord hiện không định nghĩa một thuộc tính `length`, vì vậy, nếu bạn gọi, ví dụ,
`Person.all.length` thay vì `Person.all.size`, tất cả các bản ghi `Person` được tải và chuyển đổi thành một mảng và bạn sẽ kết thúc với kết quả như thế này:

```
Person Load (346.0ms) SELECT “people”.* FROM “people”
```
Thay vì
```
(12.0ms) SELECT COUNT(*) FROM “people”
```
## Caching
Caching là một hành động khó khăn khi tìm hiểu. Và với Rails thì có hỗ trợ một cách là cache view. 
Chúng sẽ lưu lại nguyên giá trị HTML và sử dụng cho lần tới thay vì phải sử dụng query để thực hiện load.
Tham khảo tại: https://guides.rubyonrails.org/caching_with_rails.html
# Ruby

## Ruby version
Điều này có lẽ khá rõ ràng. Nhưng nếu bạn vẫn đang chạy `Ruby 2.0` (hoặc `2.2` hoặc `2.3` ..) thì bạn đã bỏ lỡ một chút hiệu năng.

Các phiên bản Ruby mới cũng mang lại những cải tiến cụ thể và các phương pháp mới thường nhanh hơn cho các trường hợp sử dụng cụ thể của chúng so với các phương pháp ít chuyên biệt hơn. Ruby 2.4 chẳng hạn

## Concurrency with Threading

Rails hỗ trợ luồng! Bạn có thể đã biết điều này; Sidekiq là một viên đá quý khá nổi tiếng. Nhưng bạn không cần phải có Sidekiq để tận dụng luồng; Nó được xây dựng ngay trong Ruby.
Việc phân luồng giành được cải thiện các tác vụ chuyên sâu về CPU (Ruby doesn cho phép thực thi song song các luồng), nhưng nếu bạn có các trang đang chờ chặn I / O, nó có thể khiến mọi thứ chạy trơn tru hơn rất nhiều.

Cú pháp khá đơn giản:
```
Thread.new do
  <code here>
end
```

Nếu bạn cần lấy giá trị của chuỗi khi nó phân giải (có thể bạn đã quét một trang và bạn muốn nhận kết quả khi nó kết thúc), bạn gọi `.value` ở cuối:

```
def scrape_page(url)
  Thread.new { Nokogiri::HTML(open(url)) }.value
end

```

Cache vs Thread là 2 phần khó với nhiều lập trình viên, tuy nhiên nó là cách tận dụng tối đa tài nguyên hệ thống và cũng giúp cho App của bạn nhanh hơn. 

Nguồn: https://medium.com/@daniellempesis/speeding-up-your-ruby-on-rails-app-4c37ec71b126