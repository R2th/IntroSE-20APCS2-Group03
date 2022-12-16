Tiếp nối cho [serive](https://viblo.asia/s/design-pattern-ruby-P0lPmJGg5ox) về Design Pattern mình tìm hiểu và muốn chia sẽ. Bài viết này mình sẽ chia sẽ về Prototype pattern trong ruby.
# Định nghĩa:
Nó thuộc nhóm Creational Patterns. và là một pattern điển hình của lập trình hướng đối tượng OOP. Ý tưởng của pattern này liên quan đến việc khởi tạo một Object mới từ một Object đã có thay vì tạo mới.
Nếu việc tạo ra Object quá lớn và tốn nhiều tài nguyên thì việc áp dụng pattern này là khá phù hợp.
# Trông nó như thế nào:
Prototype(bản mẫu) nó là kỹ thuật nhân bản đối tượng, tức là tạo ra một đối tượng mới từ một đối tượng được xây dựng trước đó bằng 1 method clone().
Và kỹ thuật này gồm các bước :
* Tạo dựng một đối tượng là cơ sở. sở hữu một phương thức với tác dụng là sao chép clone().
* Các đối tượng con sẽ sở hữu method đó và cài đặt lại cho phù hợp với từng object cụ thể.
* Nội dung của method clone() sẽ trả về một object là bản mẫu của Object được xây dự làm cơ sở. và các object con có thể sử dụng được method clone() này.

Lúc đó sẽ phát sinh 2 vấn đề về việc nhân bản đó là object mẫu có chứa các object con khác. Object mới sẽ tham chiếu(chỉ tham chiếu đến các object con bên trong object mẫu)hoặc nhận dữ liệu cụ thể(copy lại toàn bộ values của object con bên trong object mẫu), lúc này sẽ có 2 hình thức nhân bản:
* Shallow copy: chỉ tham chiếu với các object con của object mẫu hay cụ thể hơn là object mới và object mẫu sẽ cùng trỏ tới object con trong object mẫu mà thôi. ( Loạn não :D ).
![](https://images.viblo.asia/100decf3-1d57-4957-b600-9054764eca80.jpg)
* Deep copy: Object mới sẽ copy lại toàn bộ thuộc tính của object con bên trong object mẫu.
![](https://images.viblo.asia/9793a8c2-ba24-4b84-9d16-d46f7cee07fa.jpg)

# Thực hiện cài đặt thử nào:
```
class Product
  attr_accessor :price, :brand

  def initialize(price, brand)
    @price = price,
    @brand = brand
  end

  def _clone_shallow
    Product.new(self.price, self.brand)
  end

  def _clone_deep
    new_brand = Brand.new(self.brand.prd_name)
    Product.new(self.price, new_brand)
  end
end

class Brand
  attr_accessor :prd_name

  def initialize name
    @prd_name = name
  end
end
```

```
# Tạo một đối tượng Brand
brand_original = Brand.new 'BMW'
# Tạo đối tượng mẫu và values của nó.
product_orignal = Product.new 1000, brand_original
# Thực hiện việc nhân bản Object con với hình thức shallow copy
product_shallow_clone = product_original._clone_shallow
# Thực hiện việc nhân bản Object con với hình thức deep copy
product_deep_clone = product_original._clone_deep
```

Khi brand_original thay đổi giá trị thì giá trị của brand trong product_original và product_shallow_clone cũng sẽ thay đổi theo.
còn đối với product_deep_clone thì giá trị brand sẽ không bị thay đổi.

Đoạn code trên và ví dụ về việc xây dựng một prototype pattern đơn giản.

# Ưu điểm của nó: 
* Tránh được việc nhiều lớp con cho mỗi đối tượng tạo như Abstract Factory Pattern (pattern này mình sẽ giới thiệu sau nhé)
* Giảm chi phí để tạo ra một đối tượng mới. Điều này sẽ làm tăng hiệu suất so với việc sử dụng từ khoá new để tạo đối tượng mới.
* Khởi tạo một đối tượng mới bằng cách thay đổi một vài thuộc tính của một Object. 
* Khởi tạo Object mới bằng cách thay đổi cấu trúc.Rất nhiều ứng dụng xây dựng hệ thống từ nhiều phần và các phần con. Các phần con lại khởi tạo từ nhiều phần con khác (chia nhỏ bài toán). Prototype pattern cũng hỗ trợ điều này. Nghĩa là các phần đó có thể được khởi tạo từ việc copy một nguyên mẫu từ một “cấu trúc” khác. Miễn là các phần kết hợp đều thể hiện Clone() và được sử dụng với cấu trúc khác nhau làm nguyên mẫu.
* Giảm việc phân lớp: Đôi khi hệ thống quá phức tạp vì có quá nhiều class, và cây thừa kế của lớp khởi tạo có quá nhiều lớp song song cùng mức. Prototype pattern rõ ràng làm giảm số lớp và sự phức tạp của cây thừa kế (class hierarchy).