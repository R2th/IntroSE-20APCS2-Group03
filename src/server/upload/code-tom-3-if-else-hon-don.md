> Triết học là một thứ hack não bạn đọc, và đôi khi 1 đống điều kiện if else cũng có tác dụng tương tự...

```ruby
# Code siêu bốc mùi
# sinh ra trong quá trình trưởng thành của lập trình viên
# và đa số thì người cho ra chả phải là người gánh chịu...
# Nào hãy hít một hơi thật sâu và ngắm đoạn code sau đây:

if weather.raining
  if current_time > 7
    if today.sunday?
      if you.sleepy?
        go_back_to_sleep
      end
    else
      wake_up
      if coffee.present?
      	drink_coffee
      end
      go_to_work
    end
  else
    go_back_to_sleep
  end
else
  if current_time > 7
    unless today.sunday?
      go_to_work
    end
  else
    do_exercise
  end
end
```

![](https://images.viblo.asia/10741c3a-f56d-429d-8286-d58bc12ecd8f.jpg)

Điều kiện. Là thứ dễ trở nên bốc mùi nhất.

Mỗi khi muốn mở rộng một method, thêm các trường hợp cho nó, suy nghĩ đầu tiên ập đến sẽ là: "thêm tí điều kiện, DONE!"

Điều này không khiến method thối ngay, nguyên do là qua tay nhiều người, mỗi người "thêm tí", lâu dài nó sẽ phình ra thành nhúm code với hàng tá nhánh if else.

Tuy nhiên, dù nhanh bẩn, nhưng nó cũng dễ dọn, chúng ta hãy cùng điểm qua một vài skill cơ bản dễ chơi dễ trúng thưởng sau.

### Skill 1: truthy & falsy

Trong Ruby, ngoài nil và false ra, cái méo gì cũng đúng. Nên đôi khi, không nhất thiết phải xải #nil? hay #present?, #blank cho dài.

_(Điều này sẽ khác so với kha khá các ngôn ngữ, dí dụ như ở Javascript, string rỗng, array rỗng hay số 0 cũng có giá trị là "false" :V)_

```ruby
# bad
if coffee.present?
  drink_coffee
end

# good
drink_coffee if coffee
```

### Skill 2: Group conditions

Nhóm điều kiện thay vì lồng nó vào nhau.

_If mà không đi với else, hãy nhóm nó vào điều kiện bên ngoài._

```ruby
# bad
if today.sunday?
  if you.sleepy? # ko đi với else -> cho dung hợp với cái bên trên
    go_back_to_sleep
  end
...
    
# good
  if today.sunday? && you.sleepy?
    go_back_to_sleep
  ...
```

### Skill 3: Guard conditions

Ngăn cản mọi trường hợp ngoại lệ ở ngay đầu method.

_(cái xì tai này rất phổ biến với team xài NodeJs, với cái tên là "error first")_

```ruby
# not so bad but can still be better
if today.sunday? && you.sleepy?
  go_back_to_sleep
else
  wake_up
  drink_coffee if coffee
  go_to_work
end

# nice!
return go_back_to_sleep if today.sunday? && you.sleepy?
wake_up
drink_coffee if coffee
go_to_work
```

Một chút skill 1, cộng một tí skill 2 và kèm thêm xiu xíu skill 3, ta được thành quả sau:

```ruby
# awesome!!
if weather.raining
  return go_back_to_sleep if today.sunday? && you.sleepy? && current_time > 7
  wake_up
  drink_coffee if coffee
  go_to_work
else
  do_exercise if current_time < 7
  go_to_work unless today.sunday?
end
```

### Đôi lời kết

1. Mấy skill trên chả phải hữu hiệu cũng chả hề tối ưu nhất, bạn hoàn toàn có thể dùng nhiều cách hay ho hơn được biết với cái tên như "extract condition", "extract logic", ... hay là dùng "porlymorphic". Tuy nhiên, cái giá phải trả cho __code sạch hơn__ sẽ là __code bị thay đổi nhiều hơn__. Và chắn chắn là team bạn sẽ chả thích điều này đâu ==!

2. Khi refactor các condition (thực ra refactor cái vẹo gì cũng vậy), hãy luôn luôn có unit test để chống lưng cho code của bạn nhé. Chả ai quan ngại bạn viết có chuẩn hay không cả. _Shut up & show me the tests_ (họ nói vậy đấy :v)

3. "Úi xời lắm chuyện, thêm tí điều kiện, hơi bẩn chút thôi không sao hết" => Hãy nhớ đây mới là nguồn gốc của code bẩn bạn nhé =)))

_Thank you for reading!
Happy coding!_