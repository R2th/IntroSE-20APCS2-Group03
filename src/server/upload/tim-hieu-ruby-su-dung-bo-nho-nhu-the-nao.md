Sau một thời gian làm việc với ruby mình chưa từng nghĩ đến chuyện ngôn ngữ này sử dụng bộ nhớ như thế nào cho đến một ngày nhận được feedback từ khách hàng rằng sidekiq đang chiếm tới hơn 5Gb RAM trong khi không có job nào đang thực thi. Vậy tại sao bộ nhớ lại tăng lên hay giảm đi khi chúng ta chạy các dòng code và làm thế nào để sử dụng ít bộ nhớ nhất có thể, chúng ta hãy cùng tìm hiểu trong bài viết này nhé.
# Garbage collector là gì ?
Khi tạo một object trong ruby thì máy tính sẽ sử dụng bộ nhớ để lưu trữ object đó. Nếu như bạn tạo ra nhiều object cùng một lúc thì máy tính sẽ phải sử dụng rất nhiều memory. Do dung lượng RAM của bạn có giới hạn (tùy vào cấu hình sẵn có) nên đến một lúc nào đó bạn sẽ hết RAM để lưu trữ các object/sử dụng cho các công việc khác. Khi đó bạn sẽ phải "xả" (free) những vùng trong memory space không còn sử dụng đến, để có thể có dư memory cho các công việc khác.

Trong C, thường có những lúc phải sử dụng hai hàm có sẵn là "malloc()" và "free()" để quản lý memory khi chương trình chạy. Developer sẽ phải đặt hai hàm này bằng tay vào bên trong code của function để lấy bộ nhớ cho biến (malloc() ) và xả bộ nhớ khi không còn thao tác với biến đó nữa (free() ). Tuy nhiên, việc allocate memory và free memory bằng tay như vậy tốn rất nhiều effort của lập trình viên, đặc biệt là trong lập trình hướng đói tượng, vì các object được sử dụng và gọi đi gọi lại nhiều lần nên không xác định rõ khi nào thì nên xả memory, vì vậy phải có một tiến trình tự động thu thập những phần memory đã sử dụng xong và giải phóng phần đó.

Ruby cũng như một số ngôn ngữ lập trình khác đã có sẵn thư viện/module để xử lý việc này, gọi là "garbage collector". Trong ruby thì là module "GC". Tính năng garbage collector sẽ tự động phát hiện và giải phóng phần bộ nhớ không "vô dụng" - nghĩa là đang lưu trữ một biến hay object gì đó, nhưng biến và object này không còn được sử dụng nữa. Bạn sẽ không phải lo lắng đến việc allocate và free memory trong lúc code nữa khi đã có sự hỗ trợ của GC. Nhiệm vụ của GC trong ruby chính là garbage collector, giải phóng những phần memory đang không bị chiếm mà không có nhiệm vụ gì.

# Object Retention
Cách rõ ràng nhất khiến cho Ruby tăng lượng RAM sử dụng là giữ lại các đối tượng. Các hằng số trong Ruby không bao giờ được Garbage collector dọn dẹp, vì vậy nếu một hằng có tham chiếu đến một đối tượng, thì đối tượng đó không bao giờ có thể được giải phóng.
```
RETAINED = []
100_000.times do
  RETAINED << "a string"
end
```

Nếu chúng ta chạy đoạn mã trên và debug với GC.stat (: total_freed_objects), nó sẽ trả về số lượng đối tượng đã được Ruby giải phóng. Ta thấy kết quả rất ít thay đổi:
```
# Ruby 2.5.1p57

GC.start
before = GC.stat(:total_freed_objects)

RETAINED = []
100_000.times do
  RETAINED << "a string"
end

GC.start
after = GC.stat(:total_freed_objects)
puts "Objects Freed: #{after - before}"

# => Objects Freed: 1329
```

Ruby đã tạo ra 100.000 bản sao của "a string" nhưng chúng không thể được giải phóng. Các đối tượng không thể được giải phóng khi chúng được tham chiếu bởi một đối tượng global. Điều này áp dụng cho hằng, biến toàn cục, modules và class.

Nếu chúng ta làm điều tương tự mà không giữ lại bất kỳ đối tượng nào:
```
# Ruby 2.5.1p57

GC.start
before = GC.stat(:total_freed_objects)

100_000.times do
 foo = "a string"
end

GC.start
after = GC.stat(:total_freed_objects)
puts "Objects Freed: #{after - before}"

# => Objects Freed: 101112
```

Số đối tượng đã giải phóng: 101112. Bộ nhớ sử dụng cũng nhỏ hơn nhiều, khoảng 6mb so với 12mb khi giữ lại một tham chiếu đến các đối tượng. Số đối tượng được giữ lại có thể được xác định bằng GC.stat(:total_allocated_objects): Số đối tượng được giữ lại = total_allocated_objects - total_freed_objects.

# Giữ lại đối tượng để tăng tốc độ
Mọi người trong Ruby đều quen thuộc với DRY hoặc "Don’t repeat yourself". Điều này đúng với phân bổ đối tượng cũng như đối với code. Đôi khi, nó có ý nghĩa là giữ lại các đối tượng để tái sử dụng thay vì phải tạo lại chúng nhiều lần. Ruby có tính năng này tích hợp sẵn cho chuỗi. Nếu bạn call freeze một chuỗi, trình thông dịch sẽ biết rằng bạn không có kế hoạch sửa đổi chuỗi đó mà sẽ tái sử dụng lại. Dưới đây là một ví dụ:
```
RETAINED = []
100_000.times do
  RETAINED << "a string".freeze
end
```

Chạy đoạn mã này, số đối tượng được giải phóng không thay đổi nhiều nhưng mức sử dụng bộ nhớ cực kỳ thấp. Thay vì phải lưu trữ 100.000 đối tượng khác nhau, Ruby có thể lưu trữ một đối tượng chuỗi với 100.000 tham chiếu đến đối tượng đó. Ngoài việc giảm bộ nhớ, nó còn giảm thời gian chạy vì Ruby phải dành ít thời gian hơn cho việc tạo đối tượng và phân bổ bộ nhớ.

Bạn có thể làm điều tương tự với bất kỳ đối tượng nào khác mà bạn muốn bằng cách gán nó cho một hằng số. Đây đã là một pattern phổ biến khi lưu trữ các kết nối bên ngoài, như Redis, ví dụ:
```
RETAINED_REDIS_CONNECTION = Redis.new
```

Vì một hằng có tham chiếu đến kết nối Redis, nó sẽ không bao giờ bị Garbage collector giải phóng. Do đó khi tái sử dụng hằng số ở một đoạn code khác Ruby sẽ không mất thời gian tạo mới đối tượng, cấp phát và giải phóng bộ nhớ nữa.

# Short Lived Objects
Hầu hết các đối tượng trong ruby là Short Lived Objects, có nghĩa là khi tạo ra chúng không có tham chiếu đến. Ví dụ, hãy xem đoạn mã này:
```
User.where(name: "schneems").first
```

Nhìn bề ngoài, có vẻ như nó chỉ yêu cầu một vài đối tượng để hoạt động (hash, ký hiệu :name và chuỗi "schneems"). Tuy nhiên, khi bạn gọi nó, nhiều đối tượng trung gian khác được tạo để tạo câu lệnh SQL chính xác , sử dụng một câu lệnh đã được chuẩn bị nếu có, và nhiều hơn nữa. Nhiều đối tượng trong số này chỉ tồn tại chừng nào các phương thức mà chúng được tạo đang được thực thi. Tại sao chúng ta nên quan tâm đến việc tạo các đối tượng nếu chúng không được giữ lại?

Khi phương thức được gọi có thời gian xử lý đủ lâu sẽ khiến các đối tượng được tạo ra trong đó có thời gian tồn tại khá dài, điều này dẫn đến bộ nhớ của bạn tăng lên theo thời gian. Chúng có thể khiến cho Ruby GC cần thêm bộ nhớ nếu GC kích hoạt tại thời điểm các đối tượng đó vẫn được tham chiếu.

# Ruby tăng bộ nhớ như thế nào?
Khi số đối tượng được sử dụng vượt quá lượng bộ nhớ mà Ruby cấp phát, nó phải yêu cầu thêm bộ nhớ. Yêu cầu bộ nhớ từ hệ điều hành là một hoạt động "đắt đỏ", vì vậy Ruby cố gắng thực hiện nó không thường xuyên. Thay vì yêu cầu một vài KB tại một thời điểm, nó phân bổ một khối lớn hơn mức cần thiết. Bạn có thể đặt số tiền này theo cách thủ công bằng cách đặt biến môi trường RUBY_GC_HEAP_GROWTH_FACTOR.

Ví dụ: nếu Ruby tiêu thụ 100 mb và bạn đặt RUBY_GC_HEAP_GROWTH_FACTOR = 1.1 thì khi Ruby phân bổ lại bộ nhớ, nó sẽ nhận được 110 mb. Khi ứng dụng Ruby khởi động, nó sẽ tiếp tục tăng theo tỷ lệ phần trăm tương tự cho đến khi đạt đến một điểm nơi toàn bộ chương trình có thể thực thi trong phạm vi bộ nhớ được phân bổ. Thiết lập giá trị thấp hơn cho biến môi trường này đồng nghĩa là chúng ta phải chạy GC và phân bổ bộ nhớ thường xuyên hơn, nhưng chúng ta sẽ tiếp cận việc sử dụng bộ nhớ tối đa chậm hơn. Giá trị lớn hơn đồng nghĩa là ít phải chạy GC hơn, tuy nhiên chúng sẽ yêu cầu bộ nhớ lớn hơn cần thiết.

Vì mục đích tối ưu hóa một trang web, nhiều nhà phát triển thường nghĩ rằng Ruby không bao giờ giải phóng bộ nhớ. Điều này không hoàn toàn đúng, vì Ruby có giải phóng bộ nhớ. Chúng ta sẽ nói về điều này sau.

Cùng xem xét ví dụ sau để xem sự ảnh hưởng của các đối tượng không được giữ lại đối với bộ nhớ:
```
def make_an_array
  array = []
  10_000_000.times do
    array <<  "a string"
  end
  return nil
end
```

Khi chúng ta gọi phương thức này, 10.000.000 chuỗi được tạo. Khi phương thức thoát, các chuỗi đó không được tham chiếu bởi bất kỳ thứ gì và sẽ được Garbage collector giải phóng. Tuy nhiên, trong khi chương trình đang chạy, Ruby phải phân bổ bộ nhớ bổ sung để nhường chỗ cho 10.000.000 chuỗi. Điều này đòi hỏi hơn 500mb bộ nhớ!
![](https://images.viblo.asia/227106d6-7400-45e9-96d6-a4d4ef006b41.png)

GC phải kích hoạt và phân bổ thêm bộ nhớ nếu nó không thể thu thập đủ các vị trí để lưu trữ các đối tượng trong quá trình xây dựng mảng, điều này khiến bộ nhớ phân bổ của ruby tăng lên nhanh chóng. Ruby sẽ giữ bộ nhớ đã được phân bổ này một thời gian, vì nếu quá trình sử dụng lượng bộ nhớ tối đa đó xảy ra một lần, nó có thể xảy ra lần nữa, việc giải phóng và phân bổ lại bộ nhớ mỗi lần như vậy là rất tốn kém. Bộ nhớ sẽ được giải phóng dần dần, nhưng chậm. Nếu bạn quan tâm đến hiệu suất, tốt hơn hết là tạo ra ít đối tượng nhất có thể.

# Sửa đổi tại chỗ để tăng tốc độ
Một mẹo mà tôi đã sử dụng để tăng tốc chương trình và cắt giảm phân bổ đối tượng là sửa đổi trạng thái thay vì tạo đối tượng mới. Ví dụ, đây là một đoạn mã được lấy từ gem mime-types:
```
matchdata.captures.map { |e|
  e.downcase.gsub(%r{[Xx]-}o, '')
end
```

Trong đoạn mã này mỗi phương thức downcase và gsub tạo một đối tượng chuỗi mới, điều này yêu cầu thêm thời gian và bộ nhớ. Để tránh điều này, chúng tôi có thể thực hiện sửa đổi tại chỗ:
```
matchdata.captures.map { |e|
  e.downcase!
  e.gsub!(%r{[Xx]-}o, ''.freeze)
  e
}
```

Đoạn code chắc chắn dài dòng hơn, nhưng nó cũng nhanh hơn nhiều vì chúng ta sửa đổi chuỗi hiện tại thay vì tạo chuỗi mới.

Lưu ý: Bạn không cần sử dụng hằng số để lưu regex, vì trong Ruby tất cả các regex đề đã được freeze.

Sửa đổi tại chỗ có thể khiến bạn gặp rắc rối. Có thể bạn sẽ sửa đổi một biến mà bạn không nhận ra được mình đã sử dụng ở một nơi khác, dẫn đến sự hồi quy tinh vi và khó tìm. Trước khi thực hiện loại tối ưu hóa này, hãy chắc chắn rằng bạn có các bài test tốt.

Sẽ là một sai lầm khi nghĩ rằng "objects are slow". Sử dụng chính xác các đối tượng có thể làm cho một chương trình dễ hiểu hơn và dễ tối ưu hóa hơn. Ngay cả các công cụ và kỹ thuật nhanh nhất, khi được sử dụng không hiệu quả, sẽ gây ra sự chậm trễ.

# Cách tốt nhất để giải phóng bộ nhớ
Như đã đề cập trước đó, Ruby có giải phóng bộ nhớ, mặc dù chậm. Sau khi chạy phương thức make_an_array khiến bộ nhớ của chúng ta phình lên, bạn có thể quan sát bộ nhớ giải phóng Ruby bằng cách chạy:
```
while true
  GC.start
end
```

![](https://images.viblo.asia/06a84615-154b-45e4-bf70-db3b5d48a266.png)

Rất chậm, bộ nhớ của ứng dụng sẽ giảm. Ruby giải phóng một lượng nhỏ các page trống (một nhóm slot) nếu có quá nhiều bộ nhớ được phân bổ tại một thời điểm. Đối với hầu hết các ứng dụng, chẳng hạn như ứng dụng web, các hành động có thể khiến hệ thống cần phân bổ bộ nhớ đến một mức nào đó. Khi mà các hành động xảy ra thường xuyên trong khi việc giải phóng bộ nhớ của ruby lại không đủ nhanh để giữ ứng dụng của chúng ra nhỏ hơn. Tốt hơn hết là giảm thiểu việc tạo các đối tượng nhiều nhất có thể.

# Tài liệu tham khảo
- https://stackify.com/how-does-ruby-garbage-collection-work-a-simple-tutorial/
- https://www.sitepoint.com/ruby-uses-memory/
- https://viblo.asia/p/ruby-memory-optimization-maGK7Maelj2