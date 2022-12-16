### Alex và những chiếc xe

Alex, một anh chàng mộc mạc với chiếc xe đạp cũ kĩ.

Mỗi sáng anh đều đi làm trên chiếc xe này. Việc đầu tiên anh làm sẽ là  kiểm tra chiếc xe, nếu có gì không ổn, xe buýt sẽ là lựa chọn thay thế.

Với tư duy nhanh nhẹn, coder chúng ta có thể nhanh chóng dịch cuộc đời của Alex thành mấy dòng code sau:

```ruby
class Person
  def initialize(phuong_tien)
    @phuong_tien = phuong_tien
  end
  
  def di_lam
  	if @phuong_tien.banh_xe.do_cang > 70
      puts "xe không non hơi thì ta chơi xe đạp"
      @phuong_tien.phong_veo_veo
    else
      puts "xe không đi được ta nhảy xe buýt"
    end
  end
end

class XeDap
	attr_accessor :banh_xe
  
  def initialize(banh_xe)...
  
  def phong_veo_veo
    # lốp còn hơi là còn đi
  end
end

xe_dap = XeDap.new
xe_dap.do_cang_lop_xe = 90 # độ căng lốp xe lên tới 90%, còn được gọi là căng vl
                           # tuy nhiên, khi bảo ai đó "căng vl", thì ko có nghĩa là độ căng lốp 
                           # xe của họ lên tới 90%
alex = Person(xe_dap)
alex.di_lam # => xe không non hơi thì ta chơi xe đạp
```

Chẳng mấy lâu sau, anh ta đã dành dụm đủ tiền mua xe máy. Tuy nhiên, từ lúc thay xe, anh ta luôn phải đi xe buýt :v

```ruby
class XeMay
	attr_accessor :banh_xe
  attr_accessor :binh_xang
  
  def initialize(banh_xe, binh_xang)...
  
  def phong_veo_veo
    # lốp còn hơi là còn đi
    # xe còn xăng là còn vút
  end
end

xe_may = XeMay.new
xe_may.banh_xe.do_cang = 90
alex.di_lam # => xe không non hơi thì ta chời xe đạp (??? xe máy mà ta)
            # => xăng hết cmnr anh ơi
```

Logic #di_lam của Alex rõ ràng là đang có vấn đề, nào ta cùng giúp Alex

```ruby
class Person
  ...
  def di_lam
    if @phuong_tien.banh_xe.do_cang > 70 && @phuong_tien.binh_xang.dung_tich > 0
      puts "xe không non hơi thì ta chơi xe máy"
      puts "xe còn xăng là ta phóng vèo vèo"
      @phuong_tien.phong_veo_veo
    else
      puts "xe không đi được ta nhảy xe buýt"
    end
  end
end

alex.di_lam # => xe không đi được ta nhảy xe buýt
xe_may.binh_xang.dung_tich = 100
alex.di_lam # => xe không non hơi thì ta chơi xe máy
            # => xe còn xăng là ta phóng vèo vèo
```

Một thời gian sau, Alex giàu hơn và chuyển sang ô tô, lại một lần nữa chúng ta phải giải quyết việc #di_lam của Alex,   và lúc này đây, mùi code thối đã bốc lên nồng nàn. Mỗi khi đổi xe, anh ta lại phải chỉnh đốn lại cách đi làm. Nguyên do? Alex đã biết quá nhiều về cấu tạo của chiếc xe, quá nhiều hơn mức cần thiết.

Giải quyết vấn đề lần này, chúng ta sẽ nghịch thử __Law of Demeter__

### Law of Demeter

Theo Wikipedia

> The Law of Demeter (LoD) or principle of least knowledge is a design guideline for developing software, particularly object-oriented programs. In its general form, the LoD is a specific case of loose coupling. The guideline was proposed by Ian Holland at Northeastern University towards the end of 1987, and can be succinctly summarized in each of the following ways:
> 
> 1. Each unit should have only limited knowledge about other units: only units "closely" related to the current unit.
> 
> 2. Each unit should only talk to its friends; don't talk to strangers.
> 
> 3. Only talk to your immediate friends.

Hoặc. Hiểu một cách đơn giản. __Hãy chỉ dùng một dấu chấm!!!__

Hay tôi thích hiểu theo kiểu khác là: __Hãy đùn đẩy trách nghiệm__

Nào ta cùng tìm những chỗ dùng nhiều hơn 1 dấu chấm ở code trên, đó là những chỗ bốc mùi:

```ruby
@phuong_tien.banh_xe.do_cang # thằng này
@phuong_tien.binh_xang.dung_tich # và cả thằng này nữa
```

Để refactor, trước hết hãy đi từ kết quả mà chúng ta mong muốn:

```ruby
def di_lam
  if @phuong_tien.di_duoc?
    puts "xe không non hơi thì ta chơi xe máy"
    puts "xe còn xăng là ta phóng vèo vèo"
    @phuong_tien.phong_veo_veo
  else
    puts "xe không đi được ta nhảy xe buýt"
  end
```

Như nầy thì cứ miễn là cái xe mới có hàm #di_duoc?, Alex sẽ chả bao giờ phải thay đổi cách đi làm của mình cả. Nói cách khác, anh ta méo có hiểu biết gì về cái xe cả, anh ta không còn phải có trách nhiệm kiểm tra xem với điều kiện nào thì xe đi được cả, mọi việc anh ta làm chỉ đơn giản là: _"ê xe đạp/máy/ô tô/vẹo gì cũng đc! đi được ko bây?"_

Ớ vậy thì trách nghiệm kiểm tra các điều kiện của xe đi được sẽ nằm ở đâu? Ở trong chính chiếc xe!

```ruby
class XeDap
	...
  def di_duoc?
    banh_xe.do_cang > 70
  end
end

class XeMay
  ...
  def di_duoc?
    banh_xe.do_cang > 70 && binh_xang.dung_tich > 0
  end
end
```

Và giờ, ta chẳng cần bao giờ phải quan tâm Alex sẽ đi làm như thế nào mỗi khi anh ta đổi xe nữa. Easy life!!

### Kết luận

Law of Demeter, theo tôi thấy, là một trong những cách xử lí dễ dàng nhất mà khiến code khô thoáng và dễ đổi hơn mà không cần phải suy nghĩ siêu nhân gì. Bản chất của cách dùng chỉ đơn giản là gói các chuỗi hàm vào một hàm khác với một cái tên nhiều ý nghĩa hơn. Tuy nhiên, nếu bạn để ý, mỗi lần ta thực hiện delegation, thì ta đang __tạo thêm 1 hàm nữa__, đây là cái giá của Law of Demeter. Và nếu vận dụng sai, nó sẽ dẫn đến code thối kiểu khác, với cái tên là _Middle man_ (nên là cái gì nhiều quá nó cũng không có tốt :v). Chúng ta sẽ bàn tới ở kì sau:

- Làm sao để áp dụng LoD với cái giá rẻ nhất.

- Xử lý Middle man.