# Mở đầu
 Hôm nay mình sẽ tiếp tục viết tiếp về những kiến thức cơ bản của python, các bạn có thể xem P1 ở đây: https://viblo.asia/p/hoc-python-co-ban-p1-LzD5d6REZjY

## Classes & Objects

### Một chút ít lý thuyết:

**Object** là một đại diện của các đối tượng thế giới thực như ô tô, chó hoặc xe đạp. Các Object gồm hai đặc điểm chính: *dữ liệu* và* hành vi*.

  
Ô tô có dữ liệu như: số bánh, số cửa và chỗ ngồi Họ cũng thể thực hiện các hành vi như: tăng tốc, dừng lại, hiển thị lượng nhiên liệu còn lại v.v...


Chúng tôi xác định dữ liệu dưới dạng thuộc tính và hành vi như các phương thức trong lập trình hướng đối tượng:


Dữ liệu → Thuộc tính và Hành vi → Phương thức (Methods)


Một **Class** là bản thiết kế mà từ đó các Object riêng lẻ được tạo ra. Trong thế giới thực, chúng ta thường tìm thấy nhiều Object cùng loại giống như xe hơi.

Tất cả cùng một kiểu dáng và mô hình (và tất cả đều có một động cơ, bánh xe, cửa, vv).

Mỗi chiếc xe được chế tạo từ cùng một tập hợp các bản thiết kế và có cùng thành phần.


### lập trình hướng đối tượng trong Python


Python, như một ngôn ngữ lập trình hướng đối tượng nên nó có các khái niệm về Class và Object.

Một Class là một bản thiết kế chi tiết, một mô hình cho các đối tượng của nó.

Một Class sẽ xác định các thuộc tính và hành vi (như chúng ta đã nói trong phần lý thuyết).

Ví dụ, một Class xe có các thuộc tính riêng để xác định đối tượng nào là phương tiện. Số lượng bánh xe, loại bình xăng, sức chứa và vận tốc tối đa là tất cả các thuộc tính của một chiếc xe.

Với ý nghĩ này, hãy xem xét cú pháp Python cho Class về xe:

```
class Vehicle:
    pass
```

Chúng ta định nghĩa một class Vehicle bằng cách class + Tên của class. Dễ dàng phải không?

Các Object là các cá thể (instances) của một Class. Chúng ta tạo một Object bằng cách đặt:

```
car = Vehicle()
print(car) # <__main__.Vehicle instance at 0x7fb1de6c2638>
```

Ở đây *car* là một object của class Vehicle.

Hãy nhớ rằng class Vehicle của chúng ta có 4 thuộc tính: số lượng bánh xe, loại bình xăng, sức chứa và vận tốc tối đa

Chúng ta sẽ thiết lập tất cả các thuộc tính này khi tạo đối tượng xe.

Ở đây, chúng ta định nghĩa class để nhận dữ liệu khi nó khởi tạo nó:

```
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity
```

Chúng ta sẽ sử dụng phương pháp init và gọi nó là phương thức khởi tạo.

Vì vậy, khi chúng ta tạo ra Object xe, chúng ta có thể định nghĩa các thuộc tính này.

Hãy tưởng tượng rằng chúng ta yêu mô hình Tesla S, và chúng ta muốn tạo ra loại đối tượng này.

Nó có bốn bánh xe, chạy bằng năng lượng điện, có năm chỗ ngồi, và vận tốc tối đa là 250km / giờ (155 mph).

Hãy tạo đối tượng này:

```
tesla_model_s = Vehicle(4, 'electric', 5, 250)
```

Bốn bánh + loại tiêu thụ là điện + năm chỗ ngồi + tốc độ tối đa là 250km / h.

Tất cả các thuộc tính được thiết lập.

Nhưng làm cách nào chúng ta có thể truy cập vào các giá trị của các thuộc tính này?

Chúng ta gửi một tin nhắn cho đối tượng hỏi về họ.

Chúng ta gọi nó là một phương pháp (method).Đó là hành vi của đối tượng. 

```
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    def number_of_wheels(self):
        return self.number_of_wheels

    def set_number_of_wheels(self, number):
        self.number_of_wheels = number
```

Đây là triển khai 2 method: *numberofwheels* và *set_number_of_wheels*. Chúng ta sẽ gọi nó là **getter & setter**.

Bởi vì giá trị đầu tiên nhận giá trị thuộc tính của nó và giá trị thứ hai là giá trị thiết lập mới cho thuộc tính.

Trong Python, chúng ta có thể làm điều đó bằng cách sử dụng @property để xác định **getters** và **setters**.
Hãy xem nó bằng mã:

```
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    @property
    def number_of_wheels(self):
        return self.number_of_wheels

    @number_of_wheels.setter
    def number_of_wheels(self, number):
        self.number_of_wheels = number
```

Và chúng ta có thể sử dụng các method này làm thuộc tính:

```
tesla_model_s = Vehicle(4, 'electric', 5, 250)
print(tesla_model_s.number_of_wheels) # 4
tesla_model_s.number_of_wheels = 2 # setting number of wheels to 2
print(tesla_model_s.number_of_wheels) # 2
```

Điều này hơi khác so với method thông thường.

Các method này hoạt động như các thuộc tính.

Ví dụ: khi chúng tôi đặt số bánh xe mới, chúng tôi không áp dụng hai làm thông số, nhưng đặt giá trị 2 thành *numberofwheels*. Đây là một cách để viết code **getter** và **setter**.

Nhưng chúng ta cũng có thể sử dụng các phương thức cho những thứ khác, như phương thức “*makenoise*”. Hãy xem nó:

```
class Vehicle:
    def __init__(self, number_of_wheels, type_of_tank, seating_capacity, maximum_velocity):
        self.number_of_wheels = number_of_wheels
        self.type_of_tank = type_of_tank
        self.seating_capacity = seating_capacity
        self.maximum_velocity = maximum_velocity

    def make_noise(self):
        print('VRUUUUUUUM')
```

Khi chúng ta gọi phương thức này, nó chỉ trả về một String "VRRRRUUUUM."

```
tesla_model_s = Vehicle(4, 'electric', 5, 250)
tesla_model_s.make_noise() # VRUUUUUUUM
```