![](https://images.viblo.asia/4329c125-adaa-41bc-852e-09a617250e12.jpeg)

### Tốt hay xấu

Exception.

Hay nhiều người còn gọi là bug (nhưng thực ra không phải vậy). Được cho là một thứ gì đó thật đen tối.
Vì cơ bản, mỗi khi nó xuất hiện đồng nghĩa với việc app nát rồi, đặc biệt là khi đó là những dòng code do bạn code ra.
Điều này có thể hình tượng hóa bằng dòng suy nghĩ kiểu *hỏng rồi*, *ôi chết cha tôi rồi*, *em xin lỗi đừng đánh em*. (Kiểu kiểu vậy)

Tuy nhiên, mọi chuyện sẽ còn tệ hơn khi mà chúng ta chả hề nhận được cảnh báo nào cả. Ví dụ:

```ruby
  # Do không xin được tiền chơi nét, nên hai anh em lại ở nhà xem tivi
  tien_choi_net = ga_thang_em_xin_tien_me
  ** NoMethodError: thằng em ko dám  --> cuộc chơi tới đây là kết thúc
  di_net(tien_choi_net)                   # anh em vui vẻ đi chơi không mất xu nào.
  
  # Dù chả xin được tiền, nhưng 2 thằng vẫn kéo nhau ra nét
  tien_choi_net = ga_thang_em_xin_tien_me # nil
  di_net(tien_choi_net)                   # tiền mất tật mang huynh đệ tương tàn.
```

Như vậy, chẳng hề chúng ta lại đi ghét exception mà hãy nâng niu quý mến nó, mỗi lần nó xuất hiện là một lời cảnh bảo hữu ích: _"đại ca ơi có biến rồi"_

=> Nào thì ~~nhấc mông lên~~ ngồi xuống và fix bug thôi :v

### Cách xài cơ bản

Văng lỗi có chủ đích
```ruby
  # Chỉ với "fail" hay "raise" là bạn có thể tự văng một cái exception rồi.
  # Fail như này thực ra là bằng với fail(StandardError).
  # Và bạn đoán đúng rồi đó, argument đầu tiên là type của error,
  # và mặc định là StandardError.
  say_yeah    # "yeahhh"
  fail
  say_oh_yeah # ...
  
  # Thêm tí nội dung.
  # Như vậy là đã sáng tỏ, argument thứ 2 nhận một string,
  # đóng vai trò là lời nhắn nhủ cho những ai gặp exception này
  # tương tự với cái ví dụ trên,
  # viết kiểu này tương đương với fail(StandardError, "ồn quá nên cho im")
  say_yeah     # "yeahhh"
  fail "ồn quá nên cho im"
  say_oh_yeah  # ...
```

Văng lỗi để kích hoạt rollback của transaction
```ruby
  ActiveRecord::Base.transaction do
    sim_dien_thoai.update!(number: 123123) # dù sim hợp lệ
    fail if sim_dien_thoai != sim_so_dep   # nhưng số xấu thì ko thèm xài
  end
```

Bắt lỗi kiểu đầy đủ
```ruby
  def __
    begin
      study
      fail "buồn ngủ vl"
    rescue StandardError => e
      puts e
      drink_coffee
    end
  end
```

Bắt lỗi kiểu nhẹ nhàng
```ruby
  def __
    study
    fail "buồn ngủ vl"
  rescue => e  # đúng rồi đó bạn, ko điền gì thì mặc định là StandardError luôn
    puts e
    drink_coffee
  end
```

Bắt lỗi kiểu lười biếng (kiểu I don't care, just do it)
```ruby
  def __
    do_something_risky # chời liều
  rescue
    go_to_hospital     # méo cần biết gẫy chân hay gẫy tay, hay gẫy cái gì khác, vô viện!
  end
```

Bắt lỗi kiểu đá bóng
```ruby
  def __
    nghich_ngu
  rescue => e
    raise(e)
  end
# như này để??? Chính là nó bạn:
# "đùn đẩy trách nhiệm -> method nào số đen gọi cái này mà bị hỏng thì tự đi mà xử"
```

### Raise hay Fail?

Điều này khá là bối rối, hai thằng này thực chất là khác nhau mỗi cái tên gọi.

Thằng `raise` nó nổi tiếng hơn thằng `fail` là nhờ Rails. (xin để độc giả tự tìm hiểu vì nó lấn sang khía cạnh lịch sử rồi =))

Nhưng mà về cơ bản, các bô lão hay dùng theo cách sau: "chỉ dùng raise khi _bắt lỗi kiểu đá bóng_"

(Tui xin nhắc lại là các cụ hay dùng kiểu đấy thôi nhé, chứ xài cái nào cũng đc hết)

### Thích thì fail?

Dù exception rất hữu dụng vì nó cung cấp đầy đủ thông tin lỗi cho chúng ta, nhưng nó lại là một trong những pha xử lí nặng nề, thằng này chạy đặc biệt ngốn hiệu năng (ngôn ngữ nào cũng thế chứ không phải riêng ruby). Vậy nên hãy cân nhắc trước khi sử dụng bạn nhé!

Điều này cũng giải đáp thắc mắc mấy cái câu hỏi vu vơ thời trẩu tre luôn, một ví dụ là:

```ruby
  # cách chính thống, giải pháp nhẹ nhàng mà hiệu quả
  def create
    house = House.new(house_params)
    if house.valid?
      house.save
      do_extra_thing
    else
      handle_failure
    end
  end
  
  # cách chơi trội, trông cool ngầu ở ngoài bề mặt nhưng quá cồng kềnh và nặng nề bên trong
  def create
    House.create!(house_params)
    do_extra_thing
  rescue
    handle_failure
  end
```

### Rescue or not?

Một trick khá hữu dụng trong trường hợp bạn muốn chạy thêm code chỉ khi thành công, đó là nối else ngay sau rescue.

Cái này đôi khi sẽ hữu dụng hơn so với `ensure` (dù kết quả thế nào, ta vẫn chạy)

```ruby
  ...
    do_something_awesome_but_risky
  rescue
    comment_negatively   # never give up, oc ch*, atsm
  else
    comment_positive     # hell yeah, that's it, you da'bet
  ...
```

Thank you for reading and happy coding!!