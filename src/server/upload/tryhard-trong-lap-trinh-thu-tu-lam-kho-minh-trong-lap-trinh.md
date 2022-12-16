## Một ngày chán đời hoặc đẹp trời bạn bỗng nhiên muốn tự làm khó bản thân mình với việc lập trình, bằng cách tạo ra những hàm mà không cần dùng những thứ cơ bản nhất trong lập trình đó là if hay loop.
##### Câu hỏi được đặt ra ngay lúc này là : *"Chúng ta có thể làm gì khi không có if hoặc loop nhỉ ?"*. Đương nhiên là được rồi, dưới đây ta sẽ dùng sự logic của toán học để giải quyết mấy vấn đề xàm xí này :D :smile:.
#### 1. Tìm số lớn nhất của n số
* `// input : 5, 3, 7`
* `// output : max is 7`

code có if ta sẽ viết tắt như sau.

```
def max a, b
  return a > b ? a : b
end
puts "max is " + max(max(5, 3), 7)  // output : max is 7
```
Đơn giản thì chúng ta làm như vậy. Nhưng nếu bạn thử thánh trí não bằng toán học bạn sẽ có một số suy nghĩ sau ;)

```
Nếu a > b ta có x = a - b <=> a = b + x
2*a = a + a
2*a = a + b + x
2*a = a + b + |a - b|
Vì a > b nên a là max của 2 số a và b
a = (a + b + |a - b|)/2
```
Từ đây ta có hàm tìm max hách não :D
```
def max a, b
    return ((a + b) + (a - b).abs) / 2
end
puts "max is " + max(max(5, 3), 7)  // output : max is 7
```
#### 2. Tìm tổng số chẵn lẻ trong 1 mảng
* `// input : ahihi_arr = [1, 4, 5, 9, 0, -1, 2, 7]`
* `// output : The odd number in the array is 5`

Code với if thần thánh
```
counter = 0
ahihi_arr.each { |item|
  counter += 1 if item.odd?
}
puts "The odd number in the array is " + counter
```
Phần này chắc dễ hơn. Vì với dân lập trình ai cũng biết số lẻ là số không chia hết cho 2 mà :D. Nhưng nếu nói cụ thể ra là số lẻ là số chia cho 2 dư 1 ngược lại thì dư 0. Vậy ta chỉ cần cộng tất tần tật giá trị chia lấy phần dư trong mảng là được :D. Nhưng nhớ là phải lấy trị tuyệt đối để đề phòng số âm nhé :D. code:

```
counter = 0
ahihi_arr.each { |item|
  counter += (item % 2).abs
}
puts "The odd number in the array is " + counter
```
#### 3. Hôm nay có phải cuối tuần không vậy ?
Thức dậy sau 1 đêm căng não gánh team liên  tục bạn tự hỏi "Hôm nay là cuối tuần nhỉ? Buồn ngủ quá :D".

Có thể bạn đã biết ở phương tây người ta tình 1 tuần bắt đầu vào chủ nhât và kết thúc vào T7. Làm như vậy để có cảm giác được nghỉ cuối tuần cũng như đầu tuần. Nên vì thế trong các hàm date bạn có thể lấy day of week và chúng được sắp xếp theo thứ tự từ 0 -> 6 tương đương từ CN -> T7.

* Code với if
 ```
def mydate date
    if date.wday == 6 || date.wday == 0
        return "weekend"
    end
        return "weekday"
end
```
Không cần if thì ta dùng một thứ tương tự if nào :D
```
def mydate_without_if date
    weekend = { 6 => "weekend", 0 => "weekend", 69 => "weekday" }
    weekend[date.wday] || weekend[69];
end
```
```
puts mydate Date.today // weekday :)) Vì hôm nay là T5
puts mydate_without_if Date.today // weekday :)) Vì hôm nay là T5
```
#### 4. Dùng toán học thay thế cho những dòng lặp cơ bản (loop)
Như bạn biết ở nước ngoài 1 tuần làm việc bao gôm 40h làm việc và chia đều cho 5 ngày mỗi ngày 8 tiếng. Đó là khoảng thời gian mà **Henry Ford** người tạo ra thương hiệu ô tô Ford đưa ra để cho nhân viên của mình nhằm giảm giờ làm và tăng năng xuất lao động.

Bài toán được đặt ra là Nếu bạn được giao tag trong thời hạn là n ngày vậy bao giờ bạn đến deadline tình từ ngày hôm nay (được nhận tag). Biết rằng công ty bạn không làm T7 và CN.

Ta có 2 method dùng vòng lặp như sau.
```
def add_working_days date, num
    num.times.inject(date) do |date|
        case date.wday
        when 5 then date + 3
        when 6 then date + 2
        else date + 1
        end
    end
end
```
```
def due_date_suggestion sum
    today = Date.today
    due_date = today + sum
    (today..due_date).each{|date| due_date += 2 if date.saturday?}
    puts(due_date)
end
```
Cả 2 cách này đều dựa trên việc bạn dùng vòng lặp xong cộng từng ngày lên nếu dính T7 thì cộng thêm 2 hoặc cộng thêm 1 nếu rơi vào T7 CN. Bạn có để ý vấn đề này không ?

* Ta có n ngày vậy khi thực hiện loop ta sẽ có **O\*n** độ phức tạp
* Nếu trong loop ta có m phương thức logic vậy tổng thể các thứ ta có được **O\*m\*n** độ phức tạp

Với suy nghĩ bằng cộng trừ nhân chia mình có thể làm được việc này không nhỉ? Và mình đã cho ra một hàm tuy không được đẹp nhưng giải quyết được vân đề này.

```
def my_add_day sum
    d = Date.today
    d = d + (7 * sum/5)
    sum = sum % 5
    if (6 - d.wday) > sum
        d = d + sum
    else
        d = d + sum + 2
    end
    return d
end
```
Từ hàm trên ta dễ dàng nhận thấy độ phức tạp của bài toán giờ chỉ là **O \* 1 = O**. Để làm được như này bạn chỉ cần suy nghĩ 1 xíu như sau là được:
* 1 tuần làm việc có 5 ngày nên với những `sum > 5` bạn chỉ cần lấy `sum / 5` là ra số tuần **nguyên** cộng thêm.
* Tiếp sau bạn có 1 khoảng sum dư và chắc chắn rằng `sum < 5`
* Từ đây ta có 2 sự lựa chọn. lấy `sum + today` ta sẽ rơi vài ngày vào T7 CN hoặc là không sao hết.
* Với trường hợp `sum + today` rơi vào T7 CN bạn chỉ cần cộng thêm 2 ngày đó vào là ra kết quả.

#### 5. Kết luận.
Bạn biết đó lập trình cũng chỉ là công việc giúp bạn giao tiếp với máy tính thông qua 1 ngôn ngữ thông dịch. Và dựa trên sự bá đạo của máy tính chúng ta tạo ra những thứ theo mong muốn của khách hàng hoặc chính bản thân mình. Với những thứ xàm xí như kiểu không dùng if hay loop như này thì ta được gì nhỉ.

* Tất nhiên ta được đem đi khoe thành quả nhức óc của mình để cho người khác cảm thấy thán phục
* Tạo ra những method tưởng dễ dàng nhưng làm người khác cảm thấy khó khăn trong việc đọc nó thế
* Và nếu được việc giảm hiệu xuất của các dòng lệnh cũ cũng là 1 tag tương đối đau đầu cho LTV chúng ta.

Cảm ơn các bạn đã đọc đến đây :D.