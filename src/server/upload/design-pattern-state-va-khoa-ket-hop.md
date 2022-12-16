`State Pattern` cho phép một đối tượng thay đổi hành vi của nó khi trạng thái bên trong của nó thay đổi. 
## Xây dựng một khóa kết hợp
Chúng ta sẽ học về `State Pattern` thông qua việc xây dựng một khóa kết hợp. 

Theo WikiHow, mở khóa kết hợp bao gồm ba bước:
1. Xoay mặt số ba lần theo chiều kim đồng hồ để xóa bất kỳ số nào đã nhập trước đó trong khóa.
2. Nhập tổ hợp ba số của bạn: a) xoay mặt số sang phải và dừng ở số đầu tiên của bạn, b) xoay mặt số sang trái, đi qua số 0 và dừng ở số thứ hai của bạn, c) xoay mặt số sang phải và dừng lại ở số cuối.
3. Kéo khóa mở.
Để xây dựng khóa kết hợp, chúng ta cần xác định ba điều:
1. Tất cả các trạng thái có thể khóa có thể vào.
2. Tất cả các sự kiện có thể xảy ra ở mỗi trạng thái.
3. Kết quả của mỗi sự kiện có thể xảy ra trong từng trạng thái.

Hãy bắt đầu bằng cách đi qua con đường hạnh phúc: mở khóa mà không có bất kỳ sai lầm nào. (Để giữ mọi thứ đơn giản, ta sẽ bỏ qua hướng quay số).

Giả sử mã khóa là 789.

Chúng ta bắt đầu từ trạng thái clear, quay số 7, 8 và 9, và kéo khóa mở.

![](https://images.viblo.asia/d06cd625-5a55-4836-b11a-0610dbd4e082.png)

Khi khóa đã mở, ta có thể đẩy để khóa nó.

![](https://images.viblo.asia/35db498b-ad76-4e19-9759-4598244e27f4.png)

Khóa sẽ đi vào trạng thái `EnteredWrongPin`.

![](https://images.viblo.asia/d070d0d3-bc05-42c5-80a4-404e359a8741.png)

Cách duy nhất để thoát khỏi trạng thái `EnteredWrongPin` là đưa khóa về trạng thái `Cleared`.

![](https://images.viblo.asia/4d4ca285-3cf8-4583-a72d-317c702867a5.png)

Ở đây, ta đã có thể xác định tất cả các trạng thái có thể có:
1. Cleared
2. Entered Pin One
3. Entered Pin Two
4. Entered Pin Three
5. Unlocked
6. Entered Wrong Pin

... và tất cả các sự kiện có thể có:
1. Dial to a Number
2. Pull to Open
3. Push to Lock`.
4. Clear

Việc cuối cùng là xác định các sự kiện có thể xảy ra ở mỗi trạng thái cụ thể. Dưới đây là biểu đồ chuyển trạng thái hoàn chỉnh:

![](https://images.viblo.asia/8627bb56-32ac-45a6-8cfd-7655de9f6788.png)

## Code It Out

Từ những điều trên, rõ ràng là ta cần định nghĩa 6 trạng thái và hành vi tương ứng với mỗi sự kiện có thể xảy ra.

### Ta bắt đầu với trạng thái đơn giản nhất `ClearedState`.

```
class ClearedState
  attr_reader :lock, :state_name
  
  def initialize(lock)
    @lock = lock
    @state_name = 'Cleared State'
  end
  
  def dial_to(number)
    if number == 7
      lock.state = lock.entered_pin_one_state
    else
      lock.state = lock.entered_wrong_pin_state
    end
  end
  
  def clear
    puts "The lock is cleared. Clear does nothing."
  end
  
  def pull_to_open
    puts 'The lock is still locked'
    puts "  currently in #{state_name}"
  end
  
  def push_to_lock
    puts 'The lock is already locked'
    puts "  currently in #{state_name}"
  end
end
```
khi `dial_to(number)` xảy ra, `ClearedState` kiểm tra xem số có phải số đầu tiên trong mã của khóa hay không. (Mã đúng là 789). Nếu đúng, nó chuyển trạng thái của khóa thành `entered_pin_one_state`. Nếu không trạng thái của khóa sẽ chuyển thành `entered_wrong_pin_state`.

Khi `clear` xảy ra, `ClearedState` không làm gì cả và đưa ra một thông báo.

Khi `pull_to_open` xảy ra, `EnteredPinOneState` thông báo rằng khóa vẫn bị khóa.

Khi `push_to_lock` xảy ra, `EnteredPinOneState` thông báo rằng khóa đã được khóa.

Lưu ý rằng khi khóa đang ở `ClearedState`, sự kiện duy nhất tạo ra sự thay đổi trạng thái là `dial_to(number)`.

### Tiếp theo là `EnteredPinOneState`

Khóa sẽ ở trạng thái này sau khi ta nhập chữ số đầu tiên của mã trong `ClearedState`. 
```
class EnteredPinOneState
  attr_reader :lock, :state_name
  
  def initialize(lock)
    @lock = lock
    @state_name = 'Entered Pin One State'
  end
  
  def dial_to(number)
    if number == 8
      lock.state = lock.entered_pin_two_state
    else
      lock.state = lock.entered_wrong_pin_state
    end
  end
  
  def clear
    lock.state = lock.cleared_state
  end
  
  def pull_to_open
    puts 'The lock is still locked'
    puts "  currently in #{state_name}"
  end
  
  def push_to_lock
    puts 'The lock is already locked'
    puts "  currently in #{state_name}"
  end
end
```
Khi `dial_to(number)` xảy ra, `EnteredPinOneState` kiểm tra số có phải là chữ số thứ 2 trong mã của khóa hay không. Nếu đúng, nó chuyển trạng thái của khóa thành `entered_pin_two_state`. Nếu không, trạng thái của khóa sẽ được chuyển thành `entered_wrong_pin_state`.

Khi `clear` xảy ra, `EnteredPinOneState` chuyển trạng thái của khóa thành `cleared_state`.

Khi `pull_to_open` xảy ra, `EnteredPinOneState` thông báo rằng khóa vẫn bị khóa.

Khi `push_to_lock` xảy ra, `EnteredPinOneState` thông báo rằng khóa đã bị khóa.

### `EnteredPinTwoState`

Khóa sẽ ở trạng thái này sau khi chúng ta nhập chữ số thứ hai của mã khi ở `EnteredPinOneState`. Trong trường hợp này, điều đó có nghĩa là bạn nhập đúng chữ số 8 khi khóa đang ở `EnteredPinOneState`

```
class EnteredPinTwoState
  attr_reader :lock, :state_name
  
  def initialize(lock)
    @lock = lock
    @state_name = 'Entered Pin Two State'
  end
  
  def dial_to(number)
    if number == 9
      lock.state = lock.entered_pin_three_state
    else
      lock.state = lock.entered_wrong_pin_state
    end
  end
  
  def clear
    lock.state = lock.cleared_state
  end
 ` 
  def pull_to_open`
    puts 'The lock is still locked'
    puts "  currently in #{state_name}"
  end
  
  def push_to_lock
    puts 'The lock is already locked'
    puts "  currently in #{state_name}"
  end
end
```

### `EnteredPinThreeState`

```
class EnteredPinThreeState
  attr_reader :lock, :state_name
  
  def initialize(lock)
    @lock = lock
    @state_name = 'Entered Pin Three State'
  end
  
  def dial_to(number)
    lock.state = lock.entered_wrong_pin_state
  end
  
  def clear
    lock.state = lock.cleared_state
  end
  
  def pull_to_open
    lock.state = lock.unlocked_state
  end
  
  def push_to_lock
    puts 'The lock is already locked'
    puts "  currently in #{state_name}"
  end
end
```

Nếu chúng ta `pull_to_open` ở trạng thái này, khóa sẽ được chuyển đến trạng thái `unlocked_state`. Nhưng nếu chúng ta `dial_to` một số nào đó, khóa sẽ quay trở lại trạng thái `entered_wrong_pin_state`. Điều này là do ở trạng thái này, khóa đã nhận được toàn bộ mã pin, 789, một cách chính xác, và không mong đợi thêm bất kỳ chữ số nào.

Tất nhiên, chúng ta cũng có thể `clear` khóa và đặt nó trở lại thành `clear_state` nếu chúng ta muốn. Và `push_to_lock` sẽ cho bạn biết khóa đã bị khóa.

### `UnlockedState`

`UnlockedState` khá đơn giản. Điều duy nhất bạn có thể làm với khóa đã mở là đẩy và khóa nó. Tất cả các sự kiện khác, `dial_to(number)`, `clear` và `pull_to_open`, không làm gì ngoài việc cho bạn biết khóa đã được mở khóa.

```
class UnlockedState
  attr_reader :lock, :state_name
  
  def initialize(lock)
    @lock = lock
    @state_name = 'Unlocked State'
  end
  
  def dial_to(number)
    puts 'The lock is unlocked. Dial does nothing.'
  end
  
  def clear
    puts 'The lock is unlocked. Clear does nothing.'
  end
  
  def pull_to_open
    puts 'The lock is unlocked. Pull does nothing.'
  end
  
  def push_to_lock
    lock.state = lock.cleared_state
  end
end
```
### EnteredWrongPinState

Tương tự, nếu khóa nằm trong `EnteredWrongPinState`, không có gì thay đổi trạng thái của nó ngoài `clear`. Tất cả các sự kiện khác, `dial_to(number)`, `pull_to_open` và `push_to_lock`, không làm gì ngoài việc cho bạn biết khóa nằm trong `EnteredWrongPinState`.

```
class EnteredWrongPinState
  attr_reader :lock, :state_name
  
  def initialize(lock)
    @lock = lock
    @state_name = 'Entered Wrong Pin State'
  end
  
  def dial_to(number)
    puts "The lock is in #{state_name}. Dial does nothing."
  end
  
  def clear
    lock.state = lock.cleared_state
  end
  
  def pull_to_open
    puts 'The lock is still locked'
    puts "  currently in #{state_name}"
  end
  
  def push_to_lock
    puts 'The lock is already locked'
    puts "  currently in #{state_name}"
  end
end
```

### Cuối cùng là xây dựng `Lock`

```
class Lock
  attr_reader :cleared_state, :entered_pin_one_state, 
              :entered_pin_two_state, :entered_pin_three_state, 
              :unlocked_state, :entered_wrong_pin_state
  attr_accessor :state
  
  def initialize
    @cleared_state = ClearedState.new(self)
    @entered_pin_one_state = EnteredPinOneState.new(self)
    @entered_pin_two_state = EnteredPinTwoState.new(self)
    @entered_pin_three_state = EnteredPinThreeState.new(self)
    @unlocked_state = UnlockedState.new(self)
    @entered_wrong_pin_state = EnteredWrongPinState.new(self)
    
    @state = cleared_state
  end
  
  def show_current_state
    puts "currently in #{state.state_name}"
  end
  
  def dial_to(number)
    state.dial_to(number)
  end
  
  def clear
    state.clear
  end
  
  def pull_to_open
    state.pull_to_open
  end
  
  def push_to_lock    
    state.push_to_lock
  end
end
```

Mặc dù code dài, nhưng nó khá đơn giản.

Trong hàm khởi tạo, khóa thực hiện hai điều: 1) tạo ra sáu trạng thái có thể có và 2) đặt trạng thái ban đầu của nó thành `cleared_state`.

Chúng ta có một phương thức, `show_current_state`, in ra trạng thái khóa hiện tại của khóa.

Cuối cùng, khóa đáp ứng với tất cả bốn sự kiện có thể: `dial_to(number)`, `clear`, `pull_to_open`, và `push_to_lock`. Tất cả việc nó cần làm là gọi trạng tái hiện tại của nó thực hiện sự kiện tương ứng.

Do đó, hành vi của khóa sẽ khác nhau cho cùng một sự kiện khi nó ở các trạng thái khác nhau.

## Điều kỳ diệu của `State Pattern` đến từ việc chia nhỏ các mối quan tâm

Tất cả các class mà ta đã tạo, `Lock` và 6 `states` là rất đơn giản.

`Lock` không biết gì ngoài sáu trạng thái có thể có và bốn sự kiện có thể xảy ra. Nó không biết chính xác những gì sẽ xảy ra khi bất kỳ sự kiện nào trong bốn sự kiện đó xảy ra. Nó tin tưởng vào trạng thái hiện tại của nó để xử lý điều đó.

Mỗi class `state` biết làm thế nào để đáp ứng với từng sự kiện có thể.

Khi chúng ta kết hợp các trạng thái đơn giản với một đối tượng đơn giản biết trạng thái của nó và ủy quyền xử lý các sự kiện, một điều kỳ diệu sẽ xảy ra. Chúng ta có một đối tượng thông minh, có hành vi phù hợp với bối cảnh hiện tại.

## Lợi thế của `State Pattern`

Nếu chúng ta viết lại class `Lock` mà không sử dụng `State Pattern`, code sẽ vô cùng khó hiểu và khó theo dõi.

Có 6 trạng thái và 4 sự kiện. Tổng cộng có 6 * 4 = 24 hành vi khác nhau. Cố gắng nắm bắt 24 hành vi khác nhau trong một class là điên rồ. Thay đổi hành vi trong tương lai sẽ là một vấn đề đau đầu.

`State Pattern` cho phép chúng ta gói gọn hành vi trong các đối tượng trạng thái, trong đó:
1. Dễ đọc hiểu - mỗi trạng thái nắm bắt rõ ràng kết quả của từng sự kiện.
2. Đạt được sự tách biệt các mối quan tâm - khi chúng ta cần thay đổi hành vi của một trạng thái, chúng ta có thể cập nhật trạng thái đó để các trạng thái khác không bị ảnh hưởng.

## Tham khảo
[http://www.sihui.io/design-pattern-state/](http://www.sihui.io/design-pattern-state/)