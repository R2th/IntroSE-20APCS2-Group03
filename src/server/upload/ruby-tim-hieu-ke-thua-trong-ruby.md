Chắc hẳn mỗi người trong chúng ta khi học hay làm việc thì đã nghe đến khái niệm kế thừa.

### Khái Niệm

> Kế thừa là 1 kỹ thuật mà trong đó 1 đối tượng thu được tất cả thuộc tính và hành vi của đối tượng cha.
> Tính kế thừa trong ruby hay bất kỳ ngôn ngữ nào khác cũng cùng 1 tư tưởng thiết kế như nhau.
> Khi sử dụng kế thừa từ 1 class (lớp) đang tồn tại, bạn có thể tái sử các phương thức và các trường của class cha, bạn cũng có thể bổ sung thêm các phương thức và các trường khác

Lý thuyết dài dòng là thế, bây giờ ta cùng tìm hiểu ví dụ cụ thể nhé

### Bài toán

> khách hàng muốn làm 1 app quản lý các dòng xe (xe hơi, xe tải, xe mô tô,…), ban đầu thì chỉ là 3 dòng xe. Với trường hợp này đối với những dev chưa có nhiều kinh nghiệm thì sẽ tạo ra 3 class riêng cho 3 dòng xe đó

```ruby
class Car
  attr_accessor :odometer
  attr_accessor :gas_used

  def mileage
      @odometer / @gas_used
  end

  def sound_horn
     puts "Beep! Beep!"
  end

  def steer
     puts "Turn front 2 wheels."
  end
end
#--------------------------------------------#

class Truck
 attr_accessor :odometer
 attr_accessor :gas_used

 def mileage
      @odometer / @gas_used
 end

 def sound_horn
     puts "Beep! Beep!"
 end

 def steer
       puts "Turn front 2 wheels."
 end
end
#--------------------------------------------#
class Motorcycle
 attr_accessor :odometer
 attr_accessor :gas_used

 def mileage
      @odometer / @gas_used
 end

 def sound_horn
      puts "Beep! Beep!"
  end

 def steer
      puts "Turn front 2 wheels."
  end
end
```

Hmmm. No way... App quản lý xe mà chỉ có 3 dòng xe thì đơn giản quá. Nếu như khách hàng muốn nâng số lượng dòng xe lên 100 dòng thì không lẽ phải tạo 100 class riêng cho nó? Và ta thấy thêm nữa là ở class Motorcycle (xe máy) thì nó đâu cần vô lăng (hàm steer) làm gì? ta thêm nó vào chẳng phải dư thừa hay sao? Và code tại 3 class kia có quá nhiều sự trùng lặp

Và ở đây kế thừa sẽ giải quyết tất cả, thay vì lặp lại các phương thức trên nhiều class tương tự nhau, kế thừa cho phép di chuyển các phương thức phổ biến đến 1 class duy nhất, Sau đó bạn có thể chỉ định các class khác kế thừa class này

### Chúng ta cùng refactor lại nó nhé, đập đi xây lại nào ...
> Để giải quyết bài toán trên, ta định nghĩa 1 superclass có tên là Vehicle (phương tiện) as follows...
```ruby
class Vehicle
  attr_accessor :odometer
  attr_accessor :gas_used

  def mileage
      @odometer / @gas_used
  end

  def sound_horn
     puts "Beep! Beep!"
  end

  def steer
     puts "Turn front 2 wheels."
 end

end
```
> Tiếp theo ta định nghĩa các subclasses

```ruby
class Car < Vehicle

end

class Truck < Vehicle

end

class Motorcycle < Vehicle

end
```
> Ruby sử dụng toán tử < để thể hiện các subclass là tập hợp của superclass.
> > Ta đã định nghĩa xong các subclass , nó sẽ kế thừa tất cả các thuộc tính và phương thức của superclass

```
vd:

truck = Truck.new

truck.sound_horn => "Beep! Beep!"

truck.odometer = 11432

truck.gas_used = 366

puts truck.mileage => 31
```

=> Có thể thấy các subclass có tất cả các chức năng giống như trước , không có code trùng lặp

Tiếp theo ->  Thêm các phương thức khác vào các subclasses
> Giờ ở class Truck (xe tải) , khách hàng muốn thêm chức năng hiển thị kéo hàng cho nó
> ta thêm method load_bed vào class Truck, và thuộc tính cargo (hàng hóa)
Ở đây ta không thể thêm load_bed vào class Vehicle, vì 2 class kia sẽ kế thừa, tại đây ta chỉ muốn class Truck kế thừa thôi

```ruby
class Truck < Vehicle
 attr_accessor :cargo

 def load_bed(contents)
       puts "Securing #{contents} in the truck bed."
      @cargo = contents
 end
end
```

=> Với những thay đổi trên , ta có 1 phiên bản Truck mới
```
truck = Truck.new

truck.load_bed("259 bouncy balls")

puts "The truck is carrying #{truck.cargo}."

=> Securing 259 bouncy balls in the truck bed.

      The truck is carrying 259 bouncy balls.
```
> Ghi đè các phương thức kế thừa

Quay trở lại với 3 class trên, ta thấy class Motorcyle kế thừa class Vehicle
```
motorcycle = Motorcycle.new

motorcycle.steer

=> Turn front 2 wheels.
```
Bây giờ giả sử ta không muốn class Moto in ra dòng trên với method steer mà với 1 đoạn văn khác thì ta sẽ ghi đè phương thức

```ruby
class Motorcycle < Vehicle
         def steer
            puts "Turn front wheel."
          end
end
```
và bây giờ

```
motorcycle = Motorcycle.new

motorcycle.steer

=> Turn front wheel
```

Để hiểu rõ hơn về ghi đè, chúng ta hãy tưởng tượng rằng... Chẳng hạn như ta xây dựng thêm 1 class nữa là `bicycle`, mà xe đạp thì chạy bằng cơm :)

=> hàm steer bây giờ sẽ phải custom lại 
```ruby
class Bicycle < Vehicle
 def steer
    puts "Chạy bằng cơm."
  end
end
```

oke vậy là cũng hòm hòm hiểu về kế thừa trong ruby rồi nhỉ. Hẹn gặp mọi người trong những bài viết tiếp theo. Sayonara