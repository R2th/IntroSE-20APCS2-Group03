Code ruby của bạn là smell code. Có lẽ nó là một số phương thức quá dài với các tham biến quá nhiều, một vài class mà chúng ta đã làm cho nó quá nhiều việc ở trong đó, hay là một cái tên bất thường ở chỗ này hoặc chỗ khác. Không có codebase nào hoàn hảo, nhưng đánh chú ý là những thiếu sót và tái cấu trúc có thể cải thiện trạng thái của nhiều điều - vì vậy hãy xem xét 1 số ví dụ về smell code, các tiềm năng để sửa chúng và một công cụ sẽ giúp tìm chúng trong ứng dụng rails của chúng ta.
## **Trùng lặp method**
Một trong số lưu ý dễ nhất (và đơn giản nhất để sửa) code smells là trùng lặp method: đó là tình huống khi 1 method được thực hiện 2 hoặc nhiều lần trong 1 ngữ cảnh.
Giả sử chúng ta có 1 class đại diện cho 1 văn phòng mà có một method đánh giá xem thời tiết hiện tại có giúp tập trung vào các nhiệm vụ lập trình hay không. Để đánh giá về thời tiết, class Office cộng tác với nguồn thời tiết và hỏi về thời tiết hiện tại tại thành phố của văn phòng:
```
class Office 
  def weather_assessment 
    if @weather_source.weather_at(@city).skies == :clear 
      'Too sunny' 
    elsif @weather_source.weather_at(@city).temp > 20 
      'Too hot' 
    else 
      'Perfect for coding' 
    end 
  end 
end
```

Trong thực hiện ở trên, method `Office#weather_assessment` tạo 2 cuộc gọi `WeatherSource#weather_at` (có thể dẫn đến yêu cầu đồng bộ hóa qua mạng), mỗi lần thực hiện với mỗi đối số tương tự. Mặc dù có thể những trường hợp này đều được đảm bảo - kết quả của method có thể là dễ bay hơi hoặc rõ ràng là nó tăng gấp đôi khả năng đọc - trong phần lớn các trường hợp thực hiện 1 cuộc gọi và lưu trữ kết quả của nó tại local là một giải pháp tốt hơn. 
```
class Office 
  def weather_assessment 
    weather = @weather_source.weather_at(@city) 
    if weather.skies == :clear 
      'Too sunny' 
    elsif weather.temp > 20 
      'Too hot' 
    else 
      'Perfect for coding' 
    end 
  end 
end
```

## **Dữ liệu Clump**
Hãy tạo ra một vài method cho class Office của chúng ta - lần này hãy sử dụng một cộng tác viên điều hướng để tính toán khoảng cách, chỉ đường và bạn sẽ cần 1 hộ chiếu để đến tọa độ địa lí của văn phòng với một vĩ độ và tọa độ bắt đầu.
```
class Office 
  def directions(source_lat, source_lon) 
    @nav_source.directions(from: [source_lat, source_lon], to: [@lat, @lon]) 
  end

  def distance(source_lat, source_lon) 
    @nav_source.distance(from: [source_lat, source_lon], to: [@lat, @lon]) 
  end

  def needs_passport?(source_lat, source_lon) 
    @nav_source.borders?(from: [source_lat, source_lon], to: [@lat, @lon]) 
  end 
end
```

Chú ý rằng tất cả các method này đều có một đối số. Smell này gọi là cụm dữ liệu, và - ngoại trừ mỗi lần sắp xếp là tình cờ - điều này thường có nghĩa là có một đối tượng cấp cao hơn thường bị thiếu trong quá trình thực hiện. Trong trường hợp này đối tượng như vậy có thể là một cấu trúc địa chỉ đại diện cho cặp vĩ độ / kinh độ được cho sau:
```
Location = Struct.new(:lat, :lon)

class Office 
  def directions(source_location) 
    @nav_source.directions(from: source_location, to: @location) 
  end

  def distance(source_location) 
    @nav_source.distance(from: source_location, to: @location) 
  end

  def needs_passport?(source_location) 
    @nav_source.borders?(from: source_location, to: @location) 
  end 
end
```

## **Lặp lại điều kiện**
Giả sử rằng (trong 1 tổ chức thân thiện từ xa) chúng ta không biết chính xác vị trí của một số văn phòng của chúng ta. Trong trường hợp này chúng ta có thể bị gây chú ý để bảo vệ các cuộc gọi NavSource với kiểm tra có điều kiện: 
```
class Office 
  def directions(source_location) 
    if @location 
      @nav_source.directions(from: source_location, to: @location)   
    end 
  end

  def distance(source_location) 
    if @location 
      @nav_source.distance(from: source_location, to: @location) 
    end 
  end

  def needs_passport?(source_location) 
    if @location 
      @nav_source.borders?(from: source_location, to: @location) 
    end 
  end 
end
```

Smell này được gọi là điều kiện lặp đi lặp lại - việc kiểm tra tương tự lặp đi lặp lại cho thấy có thể có 1 giải pháp tốt hơn. Trừ khi bộ kiểm tra như vậy có khả năng đọc đặc biệt, việc tái cấu trúc thường mang lại một giải pháp tốt hơn nhưng liệu việc tái cấu trúc nên bao gồm một việc giới thiệu 1 lớp LocatedOffice riêng biệt hoặc giải thích về NavSource về việc xử lí NullLocations phụ thuộc vào codebase được đề cập đến.
## **Boolean / biến điều khiển**
Bây giờ hãy thêm một thuộc tính cho biết hôm nay hoặc ngày mai các nhà phát triển thích chương trình Office bằng ngôn ngữ Ruby - và chúng ra làm cho nó trở nên có tham số được sao cho mọi người có thể chọn liệu đây có phải làm một câu hỏi nghiệm ngặt hay không.
```
class Office 
  def ruby_developers?(strict = true) 
    languages = @employees.map(&:primary_language).uniq 
    if strict 
      languages == ['Ruby'] 
    else 
      languages.include?('Ruby') 
    end 
  end 
end
```

Lọai mã này gọi là smell tham số boolean (1 trường hợp của rất nhiều tham số điều khiển chung), người gọi biết chính xác đường dẫn mà method sẽ thực hiện và điều khiển việc thực thi từ bên ngoài. Các refactorings điển hình là để thuộc từ nhận định thành các method chuyên dụng hoặc là nhiều class hơn, mỗi class sẽ thực hiện một trong cách đường dẫn code.
Trong trường hợp này có vẻ như phương pháp riêng biệt hoạt động khá tốt:
```
class Office 
  def only_ruby_developers? 
    languages == ['Ruby'] 
  end

  def ruby_developers? 
    languages.include?('Ruby') 
  end

  private

  def languages 
    @employees.map(&:primary_language).uniq 
  end 
end
```

## **Tính năng Envy**
Một smell code là một vấn đề phức tạp để refactor, nhưng nó xảy ra khá thường xuyên, đó là tính năng đố kị.
Hãy thêm 1 method Office#good_fit? đánh giá rằng liệu 1 văn phòng nhất định có phù hợp với nhân viên nhất định (được thông qua 1 tham số), chúng ta sẽ xem xét văn phòng phù hợp khi nhân viên hòa nhã hoặc thích thành phố nơi đặt văn phòng:
```
class Office 
  def good_fit?(employee) 
    employee.sociable? || employee.likes?(@city) 
  end 
end
```

Lưu ý method này thú vị hơn nhiều trong việc kiểm tra các tham số của nó, nếu không phải là tham chiếu đến biến ví dụ @city nó sẽ là một hàm tiện ích - một method hoặc động duy nhất trên các đối số và nó có thể di chuyển đến bất cứ nơi nào trong hệ thống mà không thay đổi bất kì cơ chế nào.
Tính năng tái cấu trúc có đặc điểm là smell đố kị có liên quan nhiều hơn, nhưng khái niệm chung là giống nhau. Có một điều may rủi là phương pháp này sẽ hoặc động tốt hơn nếu nó được thực hiện trong bố cảnh tham số của nó:
```
class Office 
  def good_fit?(employee) 
    employee.would_like_to_work?(@city) 
  end 
end

class Employee 
  def would_like_to_work?(city) 
    sociable? || likes?(city) 
  end 
end
```

## **Tìm smells code với Reek**
Bây giờ chúng ta đã biết có một vãi smells code phổ biến, làm thế nào chúng ta có thể tìm thấy chúng trong codebase Ruby ? Đây là nơi Reek sẽ đến - Reek là một máy dò smell code, có thể phân tích các tập tin Ruby và phát hiện ra smell code, và bạn có thể nghĩ nó như công cụ Rubocop cho kiến trúc và chất lượng code của bạn.
Cách sử dụng của Reek khá đơn giản: 
```
$ gem install reek 
$ reek office.rb 
office.rb -- 8 warnings: 
  [1]:Office has no descriptive comment (IrresponsibleModule) 
  [12, 18, 24]:Office takes parameters [source_lat, source_lon] to 3 methods (DataClump) 
  [13, 19, 25]:Office tests @lat && @lon at least 3 times (RepeatedConditional) 
  [40, 40]:Office#good_fit? refers to employee more than self (maybe move it to another class?) (FeatureEnvy) 
  [30]:Office#ruby_developers? has boolean parameter 'strict' (BooleanParameter) 
  [32]:Office#ruby_developers? is controlled by argument strict (ControlParameter) 
  [33, 35]:Office#ruby_developers? refers to languages more than self (maybe move it to another class?) (FeatureEnvy) 
  [3, 5]:Office#weather_assessment calls @weather_source.weather_at(@city) 2 times (DuplicateMethodCall)
```

Chú ý rằng Reek báo cáo tất cả cá smell code đã được thảo luận ở trên, cũng như gợi ý rằng việc triển khai ban đầu của Office#ruby_developers? cũng có mùi của tính năng đố kị, điều này gợi ý rằng có thể bộ sưu tập ngôn ngữ là các đối tượng cần thực hiện thuộc tính. Reek cũng đánh cờ mặc định cho một số class và module mà thiếu comment code là việc làm vô trách nhiệm. 
Reek cũng có thể được sử dụng trên toàn bộ thư mục và đi kèm với một cấu hình Rake task và một bộ Rspec matcher, do đó nó dễ dàng để tích hợp vài bài test của bạn làm cho máy chủ CI của bạn đánh cờ bất kì với các smell code.
## **Cấu hình Reek**
Những quan điểm của Reek về những gì tạo thành 1 smell code là do sự cần thiết quá mức của chủ quan, trong khi nó tương đối dễ dàng để thực hiện các quyết định và thực thi một số phong cách cú pháp nhất định, ý kiến về việc một mã là smell code và liệu nó được refactor có thay đổi nhiều hơn và thường phải đối chiếu với sự rõ ràng và dễ đọc và bản gốc.
May mắn thay, điều này có thể được giải quyết bằng việc cấu hình sâu vào Reek, cả trên cấp độ dự án và khi nói đến các mẫu mã cụ thể.
Một dự án lớn (và cho những dự án lớn được làm mịn) có thể thêm vào bằng cách tạo một tệp yaml và kết thúc bởi đuôi reek. Ví dụ, cấu hình mặc định của smell code là cờ tích cực ngay cả các cụm nhỏ nhất mà chúng được lặp lại:
```
DataClump: 
  max_copies: 2 
  min_clump_size: 2
```
Ngược lại, một method được coi là có một danh sách các tham số dài khi nó có từ 4 hay nhiều hơn tham số trở lên - ngoại trừ bộ khởi tạo, nó có thể lên tới 5 mà không bị gắn cờ:
```
LongParameterList: 
  max_params: 3 
  overrides: 
    initialize: 
      max_params: 5
```

Tương tự như vậy, một method được cho là có quá nhiều lệnh thực hiện khi nó có nhiều hơn 5 lệnh - ngoại trừ các hàm tạo, hơi khó phân chia trong thực tiễn:
```
TooManyStatements: 
  max_statements: 5 
  exclude: 
  - initialize
```

Cài đặt loại trừ có thể được điều chỉnh theo nhu cầu sử dụng - chỉ từ một trường hợp duy nhất của AClas#somemethod đối với biểu thức chính quy khớp với 1 tập hợp các method.
ở một đầu khác của việc cấu hình, bất kì các phương pháp nào cũng có thể được tùy chỉnh với một tập các comment, thay đổi việc gắn cờ của Reek theo từng method, ví dụ như chúng ta chấp nhất 1 cuộc gọi method được thực hiện 2 lần trong một trường hợp cụ thể:
```
# :reek:DuplicateMethodCall: { max_calls: 2 } 
def weather_assessment 
  if @weather_source.weather_at(@city).skies == :clear 
    'Too sunny' 
  elsif @weather_source.weather_at(@city).temp > 20 
    'Too hot' 
  else 
    'Perfect for coding' 
  end 
end
```

Comment như vậy sẽ có cơ hội cao hơn để được di chuyển cùng với các method khi nó được refactor và giữ thực hiện thêm một cuộc gọi thứ 3 (tại thời điểm đó phương pháp được smelly thêm 1 lần).
## **Kết luận**
Bây giờ bạn đã biết làm thế nào để tìm, và có khả năng refactor smell code trong code của bạn thì điều quan trọng phải nhớ rằng không smell code không có nghĩa là mã xấu, để trích dẫn nội dung tin cậy từ wiki:
> Lưu ý rằng 1 smell code là một gợi ý rằng có điều gì đó có thể là sai, không phải sự chắc chắn. Một cấu trúc hoàn hảo có thể bị coi là 1 smell code bởi vì nó thường được lạm dụng, hoặc bởi vì có 1 sự thay thế đơn giản hơn mà nó hoạt động trong hầu hết các trường hợp. Gọi 1 smell code không phải là một tấn công, nó đơn giản là dấu hiệu cho thấy một cái nhìn gần hơn đó là đảm bảo.
> 

Trong khi nó có thể là một sự lôi cuốn để bỏ đi tất cả và cố gắng sửa chữa mỗi smell code cho đến khi Reek không gắn cờ cho cái gì nữa, đây không phải là tốt. Trích dẫn wiki 1 lần nữa:
> Các quy tắc là để hướng dẫn những người khôn ngoan và sự phục tùng của những kẻ ngốc. Có 2 cách tiếp cận chính để lập trình:
> - Thực tiễn: smell code được xem xét trong tùy từng trường hợp
> - Thực dụng: tất cả các smell code nên tránh, không có ngoại lệ
> ...và do đó 1 smell code là một dấu hiệu thực tiễn xấu có thể đối với một người theo chủ nghĩa thực dụng, nhưng một dấu hiệu chắc chắn của việc thực hiện xấu là người thực dụng 
> 

Tôi khuyên các bạn nên điều tra các smell code của các bạn và sắp xếp lại những thứ có trong vấn đề - nhưng cũng học cách chấp nhận những điều không tránh khỏi, cả 2 kinh nghiệm sẽ cho bạn nâng cao sự phát triển, bạn có thể đọc thêm về smell code (và khả năng tái cấu trúc) ở trong tài liệu của Reek.
Bài viết tham khảo tại: https://blog.codeship.com/how-to-find-ruby-code-smells-with-reek/