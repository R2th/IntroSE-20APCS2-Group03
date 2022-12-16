Đây là bài dịch, bài gốc mời các bạn xem ở đây:​ https://www.sitepoint.com/ruby-uses-memory/

Tôi chưa bao giờ gặp developer nào phàn nàn về việc code chạy nhanh hơn hay chiếm ít RAM hơn. Trong Ruby, bộ nhớ đặc biệt quan trọng, nhưng một số ít các developer biết được việc sử dụng bộ nhớ của họ tăng hay giảm khi code của họ được thực thi. Bài viết này sẽ bắt đầu với một sự hiểu biết cơ bản về cách các đối tượng Ruby liên quan đến việc sử dụng bộ nhớ và tôi sẽ giới thiệu một số thủ thuật phổ biến để tăng tốc đoạn code của bạn trong khi sử dụng ít bộ nhớ hơn.

## Duy trì object
Cách rõ ràng nhất mà Ruby tăng vọt trong việc sử dụng bộ nhớ là bằng cách giữ lại các đối tượng. Các hằng số trong Ruby không bao giờ được don dẹp vì vậy nếu một hằng số có một tham chiếu đến một đối tượng, thì đối tượng đó không bao giờ có thể được thu dọn.

```ruby
RETAINED = []
100_000.times do
  RETAINED << "a string"
end
```

Nếu chúng ta chạy đoạn code trên và debug với `GC.stat (: total_freed_objects)`, nó sẽ trả về số đối tượng đã được Ruby cấp phát. Chạy đoạn code này trước và sau ta sẽ thấy kết quả thay đổi rất ít:

```ruby
# Ruby 2.2.2

GC.start
before = GC.stat(:total_freed_objects)

RETAINED = []
100_000.times do
  RETAINED << "a string"
end

GC.start
after = GC.stat(:total_freed_objects)
puts "Objects Freed: #{after - before}"

# => "Objects Freed: 6
```

Chúng ta đã tạo 100.000 bản sao của `"a string"` nhưng vì chúng ta có thể sử dụng những giá trị đó trong tương lai, chúng sẽ không thể được thu dọn. Các đối tượng không thể được thu dọn khi chúng được tham chiếu bởi một đối tượng toàn cục. Điều này được áp dụng cho các hằng số, các biến toàn cục, các module và các class. Điều quan trọng là phải thận trọng khi tham chiếu đến các đối tượng từ bất kỳ thứ gì có thể truy cập toàn cục.

Nếu chúng ta làm điều tương tự mà không giữ lại bất kỳ object nào:

```ruby
100_000.times do
  foo = "a string"
end
```

Các object được giải phóng nhanh chóng: `Objects Freed: 100005`. Bạn cũng có thể xác minh rằng bộ nhớ nhỏ hơn nhiều, khoảng 6mb so với 12mb khi giữ lại một tham chiếu đến các đối tượng.
Các đối tượng được lưu giữ có thể được xác minh thêm bằng cách sử dụng `GC.stat(:total_allocated_objects)`, số đối tượng được lưu giữ sẽ bằng `total_allocated_objects - total_freed_objects`.

## Duy trì tốc độ
Mọi người trong Ruby đều quen thuộc với DRY hay "Don't repeat yourself". Điều này đúng với cấp phát đối tượng như đối với code của bạn. Đôi khi, nó có ý nghĩa để giữ lại các đối tượng để tái sử dụng hơn là phải tái tạo chúng nhiều lần. Ruby có tính năng này được xây dựng trong các string. Nếu bạn gọi `freeze` trên một chuỗi, trình thông dịch sẽ biết rằng bạn không có kế hoạch sửa đổi chuỗi đó nó có thể được tái sử dụng. Đây là một ví dụ:

```ruby
RETAINED = []
100_000.times do
  RETAINED << "a string".freeze
end
```

Chạy đoạn code này, bạn vẫn sẽ nhận được `Objects Freed: 6`, nhưng việc sử dụng bộ nhớ cực kỳ thấp. Xác minh nó với `GC.stat(:total_allocated_objects)`, chỉ một vài đối tượng được phân bổ là `"a string"` đang được giữ lại và sử dụng lại.
Thay vì phải lưu trữ 100.000 đối tượng khác nhau, Ruby có thể lưu trữ một đối tượng chuỗi với 100.000 tham chiếu đến đối tượng đó. Ngoài việc giúp bộ nhớ giảm, còn làm cho thời gian chạy giảm vì Ruby phải dành ít thời gian hơn cho việc tạo đối tượng và cấp phát bộ nhớ.

Khi điều này được xây dựng trong Ruby để loại tránh việc làm trùng lặp các chuỗi thường được sử dụng, bạn có thể làm điều tương tự với bất kỳ đối tượng nào khác mà bạn muốn bằng cách gán nó cho một hằng số. Đây là một cách phổ biến để lưu trữ các kết nối bên ngoài, như Redis, ví dụ:

```ruby
RETAINED_REDIS_CONNECTION = Redis.new
```

Vì hằng số có tham chiếu đến kết nối Redis, nó sẽ không bao giờ bị thu gom rác. Điều thú vị là đôi khi bằng cách cẩn trọng trong việc các đối tượng được giữ lại, chúng ta thực sự có thể giảm mức sử dụng bộ nhớ.

## Các object có thời gian sống ngắn
Hầu hết các đối tượng đều có thời gian sống thật ngắn ngủi, có nghĩa là ngay sau khi tạo ra chúng không có tham chiếu. Ví dụ, hãy xem đoạn code này:

```ruby
User.where(name: "schneems").first
```

Nhìn lướt qua, có vẻ như nó yêu cầu một vài đối tượng hoạt động (hash, symbol :name, và chuỗi "schneems"). Tuy nhiên, khi bạn gọi nó, nhiều đối tượng trung gian được tạo ra để tạo ra câu lệnh SQL đúng , sử dụng một câu lệnh đã chuẩn bị sẵn sàng, và hơn thế nữa, nhiều đối tượng trong số này chỉ tồn tại miễn là các phương thức nới mà chúng được tạo ra đang được thực hiện. Tại sao chúng ta quan tâm đến việc tạo các đối tượng nếu chúng không được giữ lại?

Việc tạo số lượng vừa phải các đối tượng có thời gian sống trung bình hoặc dài sẽ làm cho bộ nhớ của bạn tăng dần theo thời gian. Chúng có thể khiến cho bộ thu dọc rác của Ruby cần nhiều bộ nhớ hơn nếu bộ thu dọc rác được kích hoạt tại một thời điểm mà các đối tượng đó vẫn được tham chiếu.

## Bộ nhớ Ruby tăng lên
Khi bạn có nhiều đối tượng được sử dụng hơn Ruby có thể sử dụng với bộ nhớ, nó phải cấp phát bộ nhớ bổ sung. Yêu cầu bộ nhớ từ hệ điều hành là một điều xa xỉ, do đó, Ruby cố gắng làm điều đó không thường xuyên. Thay vì yêu cầu một vài KB tại một thời điểm, nó phân bổ một đoạn lớn hơn nó cần. Bạn có thể đặt số lượng này theo cách thủ công bằng cách đặt biến môi trường `RUBY_GC_HEAP_GROWTH_FACTOR`.

Ví dụ, nếu Ruby tiêu tốn 100 mb và bạn đặt `RUBY_GC_HEAP_GROWTH_FACTOR = 1.1` thì khi Ruby cấp phát bộ nhớ một lần nữa, nó sẽ nhận được 110 mb. Khi một ứng dụng Ruby khởi động, nó sẽ tiếp tục tăng theo tỷ lệ phần trăm tương tự cho đến khi nó đạt đến việc toàn bộ chương trình có thể thực thi trong phạm vi bộ nhớ được cấp phát. Giá trị thấp hơn cho biến môi trường này có nghĩa là chúng ta phải chạy bộ thu dọn rác và cấp phát bộ nhớ thường xuyên hơn, nhưng chúng ta sẽ làm chậm việc tiến đến bộ nhớ tối đa được phép sử dụng. Giá trị lớn hơn có nghĩa là ít GC hơn, tuy nhiên chúng ta có thể phân bổ bộ nhớ nhiều hơn mức cần thiết.

Để tối ưu hóa một trang web, nhiều nhà phát triển muốn nghĩ rằng "Ruby không bao giờ phát hành bộ nhớ". Điều này không hoàn toàn đúng, vì Ruby có bộ nhớ trống. Chúng ta sẽ nói về điều này sau.

Nếu bạn xem xét các hành vi này, nó có thể có ý nghĩa hơn về cách các đối tượng không được giữ lại có thể tác động đến việc sử dụng bộ nhớ tổng thể. Ví dụ:

```ruby
def make_an_array
  array = []
  10_000_000.times do
    array <<  "a string"
  end
  return nil
end
```

Khi chúng ta gọi phương thức này, 10.000.000 chuỗi được tạo ra. Khi ra khỏi phương thức, các chuỗi đó không được tham chiếu bởi bất kỳ thứ gì và sẽ được thu gom rác. Tuy nhiên, trong khi chương trình đang chạy, Ruby phải cấp phát bộ nhớ bổ sung để lấy chỗ cho 10.000.000 chuỗi. Điều này đòi hỏi hơn 500MB bộ nhớ!

![](https://images.viblo.asia/ef3da022-4a25-49b2-b74f-857491d9ae05.png)

Nó không quan trọng nếu phần còn lại của ứng dụng của bạn vừa với 10mb, quá trình này sẽ cần 500MB RAM được phân bổ để xây dựng array đó. Trong khi đây là một ví dụ tầm thường, hãy tưởng tượng rằng process sử dụng hết bộ nhớ ở giữa request thực sự lớn. Bây giờ GC phải chạy và phân bổ bộ nhớ nhiều hơn nếu nó không thể thu thập đủ chỗ.

Ruby nắm giữ bộ nhớ được cấp phát này một thời gian, vì việc phân bổ bộ nhớ tốn kém. Nếu quá trình sử dụng số lượng bộ nhớ tối đa đó một lần, nó có thể xảy ra một lần nữa. Bộ nhớ sẽ được giải phóng dần dần, nhưng rất chậm. Nếu bạn lo ngại về hiệu suất, tốt hơn hết là giảm thiểu các điểm nóng tạo đối tượng bất cứ khi nào có thể.

## Sửa đổi tại chỗ để cải thiện tốc độ

Một mẹo mà tôi đã sử dụng để tăng tốc các chương trình và cắt giảm phân bổ đối tượng là bằng cách sửa đổi trạng thái thay vì tạo các đối tượng mới. Ví dụ, đây là một số mã được lấy từ gem `mime-types`:

```ruby
matchdata.captures.map { |e|
  e.downcase.gsub(%r{[Xx]-}o, '')
end
```

Đoạn code này lấy đối tượng `matchdata` được trả về từ phương thức `match` của regex. Sau đó nó tạo ra một mảng của mỗi phần tử được lấy bởi regex và chuyển nó vào block. Block tạo chuỗi chữ thường và loại bỏ một số nội dung. Điều này trông giống như đoạn code hoàn toàn hợp lý. Tuy nhiên, nó được gọi hàng ngàn lần khi gem `mime-types` được require. Mỗi phương thức gọi hàm `downcase` và `gsub` tạo một đối tượng chuỗi mới, tốn thời gian và bộ nhớ. Để tránh điều này, chúng ta có thể thực hiện sửa đổi tại chỗ:

```ruby
matchdata.captures.map { |e|
  e.downcase!
  e.gsub!(%r{[Xx]-}o, ''.freeze)
  e
}
```

Kết quả là chắc chắn nó trông dài dòng hơn, nhưng nó cũng nhanh hơn nhiều. Thủ thuật này hoạt động vì chúng ta không bao giờ tham chiếu chuỗi gốc được truyền vào block, do đó, không quan trọng việc chúng ta sửa đổi chuỗi hiện tại thay vì tạo chuỗi mới.
Lưu ý: bạn không cần phải sử dụng hằng số để lưu biểu thức chính quy, vì tất cả các cụm từ biểu thức chính quy được "cố định" bởi trình thông dịch Ruby.

Sửa đổi tại chỗ là một nơi mà bạn thực sự có thể gặp rắc rối. Thật dễ dàng để sửa đổi một biến mà bạn không nhận ra đang được sử dụng ở một nơi khác, dẫn đến các biến hồi quy tinh tế và khó tìm. Trước khi thực hiện loại tối ưu hóa này, hãy đảm bảo rằng bạn có các unit test case tốt. Ngoài ra, chỉ tối ưu hóa “điểm nóng”, đoạn code mà bạn đã đo và xác định tạo ra một số lượng lớn các đối tượng.

Nó sẽ là một sai lầm khi nghĩ rằng "các đối tượng chậm". Sử dụng đúng các đối tượng có thể làm cho chương trình dễ hiểu và dễ dàng hơn để tối ưu hóa. Ngay cả những công cụ và kỹ thuật nhanh nhất, khi được sử dụng không hiệu quả, sẽ làm chậm tốc độ.

## Thật tốt khi được giải phóng
Như đã đề cập trước đó, Ruby có giải phóng bộ nhớ, mặc dù chậm chạp. Sau khi chạy phương thức `make_an_array` làm cho bộ nhớ của chúng ta phình ra, bạn có thể quan sát Ruby giải phóng bộ nhớ bằng cách chạy:

```ruby
while true
  GC.start
end
```

Rất chậm, bộ nhớ của ứng dụng sẽ giảm. Ruby phát hành một số lượng nhỏ các trang trống (một tập hợp các slots) tại một thời điểm khi có quá nhiều bộ nhớ được cấp phát. Các lần gọi đến hệ điều hành để `malloc`, mà hiện đang được sử dụng để cấp phát bộ nhớ, cũng có thể giải phóng bộ nhớ giải phóng trở lại hệ điều hành tùy thuộc vào việc hệ điều hành triển khai thư viện cấp phát bộ nhớ như thế nào.

Đối với hầu hết các ứng dụng, chẳng hạn như ứng dụng web, hành động gây ra phân bổ bộ nhớ có thể được kích hoạt bằng cách truy cập tới endpoint. Khi endpoint được truy cập thường xuyên, chúng ta không thể dựa vào khả năng của Ruby để giải phóng bộ nhớ để giữ chân ứng dụng của chúng ta nhỏ. Ngoài ra, giải phóng bộ nhớ cần có thời gian. Tốt nhất là nên giảm thiểu việc tạo đối tượng ở các điểm nóng khi có thể.