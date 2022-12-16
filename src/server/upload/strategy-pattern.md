## Bài viết này mô tả quá trình tối ưu hóa behavior các đối tượng theo strategy pattern
Bạn đầu ta có class Gau với duy nhất 1 method hien_thi để show ra hình dáng của các con gấu

```ruby
class Gau
  def hien_thi
    p "Hiển thị"
  end
end

gau_truc = Gau.new
gau_truc.hien_thi

gau_do_choi = Gau.new
gau_do_choi.hien_thi
```

Do yêu cầu bài toán, ta thêm hành động "đi" cho các con gấu.
### Cách 1
``` ruby
class Gau
  def di
    p "đi"
  end

  def hien_thi
    p "Hiển thị"
  end
end
```

Nhưng do không phải gấu nào đi cũng giống nhau nên ta phải ghi đè ở các subclass

```ruby
class GauTruc < Gau
  def di
    p "đi bằng chân"
  end
end

class GauDoChoi < Gau
  def di
    p "đi bằng động cơ"
  end
end

# ...vân vân và mây mây

class GauBong < Gau
  def di
    p "Không đi được"
  end
end

gau_truc = GauTruc.new
gau_truc.di

gau_do_choi = GauDoChoi.new
gau_do_choi.di

gau_bong = GauBong.new
gau_bong.di
```
=> Các supclass kế thừa từ superclass "Gau" gây phức tạp, khó bảo trì và mở rộng sau này

### Cách 2
```ruby
class Gau
  def di
    p "đi"
  end

  def hien_thi
    p "Hiển thị"
  end
end

module DiBangChan
  def di
    p "đi bằng chân"
  end
end

module DiBangDongCo
  def di
    p "đi bằng động cơ"
  end
end

module KhongDiDuoc
  def di
    p "Không đi được"
  end
end

class GauTruc < Gau
  include DiBangChan
end

class GauDoChoi < Gau
  include DiBangDongCo
end

class GauBong < Gau
  include KhongDiDuoc
end

gau_truc = GauTruc.new
gau_truc.di

gau_do_choi = GauDoChoi.new
gau_do_choi.di

gau_bong = GauBong.new
gau_bong.di
```
=> Tuy các phần biến đổi được được tách ra thành các module độc lập, nhưng việc mở rộng vẫn còn phức tạp do phải tạo ra các subclass kế thừa từ superclass

### Cách 3
```ruby
class Gau
  def initialize loai_gau
    @gau = loai_gau.new
  end

  def di
    @gau.di
  end

  def hien_thi
    p "Hiển thị"
  end
end

module Loai
    class GauTruc
      def di
        p "đi bằng chân"
      end
    end

    class GauDoChoi
      def di
        p "đi bằng động cơ"
      end
    end

    class GauBong
      def di
        p "Không đi được"
      end
    end
end

gau_truc = Gau.new Loai::GauTruc
gau_truc.di

gau_do_choi = Gau.new Loai::GauDoChoi
gau_do_choi.di

gau_bong = Gau.new Loai::GauBong
gau_bong.di
```
=> Đến đây ta thấy không còn việc kế thừa giữa các class nữa và việc khởi tạo một object rõ ràng hơn. Nếu muốn mở rộng chỉ cần thêm các class cần thiết vào trong module "Loai". Việc bảo trì, mở rộng trở nên rất dễ dàng.