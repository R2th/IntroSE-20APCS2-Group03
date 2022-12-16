Chắc hẳn các bạn cũng đã biết đến khái niệm **Deque** trong ruby và đang cố gắng cài đặt nó cho chương trình của mình. Trong bài viết này mình sẽ giúp các bạn hiểu rõ hơn về khái niệm **Deque** trong Ruby rằng tại sao lại cần đến nó và cách hoạt động của nó như thế nào.

Vậy **[Deque](https://www.rubydoc.info/github/immutable-ruby/immutable-ruby/Immutable/Deque)** (viết tắt của **double-ended queue**) là gì? 

Nó là một kiểu cấu trúc dữ liệu trừu tượng, là một bộ sưu tập các đối tượng theo thứ tự, cho phép các phần tử được lấy, thêm và xóa ở phía trước và cuối của chuỗi trong thời gian không đổi. Điều này làm cho **Deque** hoàn hảo để sử dụng như một hàng đợi hoặc ngăn xếp bất biến.

**Deque** khác với **Vector** ở chỗ là một Vector cho phép truy cập đến chỉ mục vào bất kỳ phần tử nào trong khi **Deque** chỉ cho phép truy cập vào phần tử đầu tiên và cuối cùng, nhưng việc thêm và xóa từ các đầu của **Deque** nhanh hơn so với việc thêm và xóa khỏi các đầu của **Vector**.

Để hiểu rõ hơn tầm quan trọng của **Deque**. Mình sẽ giả sử bạn có một số kiến thức về ký hiệu Big-O (Độ phức tạp của thuật toán) và các ký hiệu cho một số cấu trúc dữ liệu được xây dựng trong ngôn ngữ lập trình của bạn.
Hãy cũng xem xét ví dụ bên dưới đây:

Ta có một mảng như sau:
```
array = [1, 3, 5, 2]
```
Nếu bạn muốn truy cập đến phần tử đầu tiền trong bảng(index = 0) với khóa, thì độ phức tạp của thuật toán lúc này sẽ là **O(1)**
![](https://images.viblo.asia/110e7881-8791-4dea-a75d-3d3d41056875.png)
Hay bạn muốn thêm một phần tử vào sau mảng này, điều đó cũng chỉ mất với chi phí là **O(1)**:
![](https://images.viblo.asia/42d5f554-db89-412e-8231-5a661795995b.png)
Chí phí này cũng tương tự khi bạn muốn xóa phần tử khỏi mảng này:
![](https://images.viblo.asia/10c9e6c8-3fca-4b9b-a2cd-455e95379507.png)
Nhưng có một hoạt động vô cùng tốn kém khi xử lý với mảng, hãy thử tưởng tượng xem khi bạn muốn chèn thêm một phần tử vào đầu mảng này - bạn sẽ cần di chuyển tất cả các phần tử của mảng sang phải rồi mới có thể thực hiện thêm phần tử mới vào đầu, hoạt động này sẽ tốn rất nhiều chi phí với độ phức tạp là **O(n)** và ta sẽ không bao giờ làm như thế này:
![](https://images.viblo.asia/b1460f54-950a-4fb6-a819-31fe2f0b109e.png)
Từ điều này, chúng ta có thể thấy rằng chúng ta phải thực hiện sáu thao tác để thêm một phần tử vào phía trước của mảng. Hãy tưởng tượng nếu có một triệu phần tử trong mảng, điều đó sẽ nhanh chóng biến thành một triệu thao tác. Điều này cũng xảy ra tượng tự khi bạn muốn xóa 1 phần tử khỏi đầu mảng.

Nếu bạn đang thực hiện một số tác vụ trong đó việc truy cập các phần tử là mối quan tâm thứ yếu và bạn sẽ thêm và xóa từ phía trước cấu trúc dữ liệu thường xuyên. Thì lúc này một **Deque** sẽ có ích. Nó giống như một mảng kết thúc mở cho phép bạn thêm và xóa các phần tử từ đầu hoặc cuối của cấu trúc dữ liệu chỉ với chi phí là **O (1)**.

**Deque** cung cấp cho bạn một số phương thức tiện lợi, chẳng hạn như **pushFront**, **popFront**, **pushBack**, **popBack**, v.v.

**Deque** hoạt động trên nguyên tắc của các **Node** và **con trỏ(pointers)**.
![](https://images.viblo.asia/b1cd56db-761e-43a9-b65a-8b2b16d7bc5d.png)
Mỗi **node** có ít nhất hai phần, giá trị của node và ít nhất một con trỏ (nó có thể có hai phần, như chúng ta sẽ thấy sau trong hướng dẫn này). Con trỏ trỏ đến các nút khác và đây là cách một deque được liên kết trong bộ nhớ.

Chúng ta hãy thử cài đặt và xem mỗi phương thức này làm gì.

Đầu tiên mình tạo một lớp là **Node** cho phép ta tạo ra các **nodes**:
```
class Node
  attr_accessor :value, :next_node, :prev_node

  def initialize(value, next_node = nil, prev_node = nil)
    @value = value
    @next_node = next_node
    @prev_node = prev_node
  end
end
```
Từ lớp trên, chúng ta có thể thấy rằng giá trị của node được lưu trữ trong **@value** và các con trỏ là **@next_node** trỏ đến nút ở phía trước, và **@prev_node** trỏ đến nút ở phía sau.

Tiếp theo, mình khởi tạo lớp **Deque**. Có rất nhiều cách để thiết lập deque nhưng đây là cách yêu thích của mình, bạn cũng có thể tạo theo cách riêng của mình:
```
class Deque
  def initialize
    @first = Node.new(nil)
    @last = @first
  end
end
```
Mình sẽ khởi tạo **Deque** với một **node** duy nhất.

Tiếp theo, chúng ta cần một phương thức **pushFront** mà cho phép chúng ta thêm phần tử vào phía trước của **Deque**. Phương pháp này sẽ nhanh chóng trở thành người bạn tốt nhất của chúng tôi, cũng như đối tác **popFront** của nó:
```
def pushFront(number)
  @first = Node.new(number, @first, nil)
  @last = @first if @last and @last.value.nil?
end
```
Tiếp theo, chúng ta cần khai báo phương thức **pushBack**, một phương thức để thêm các node vào cuối của **Deque**:
```
def pushBack(number)
  self.pushFront(number) && return if @first.value.nil?
  @last.next_node = Node.new(number)
  @last = @last.next_node
end
```
Bây giờ mình đã tìm ra cách thêm phần tử vào **Deque**. Tiếp theo ta hãy thử tiến hành gỡ bỏ các phần tử. Đầu tiên, từ phía trước bằng phương thức **popFront**:
```
def popFront
  if @last == @first
    @first = Node.new(nil)
    @last = @first
    return 
  end
  @first = @first.next_node
end
```
Và từ phía sau bằng phương thức **popBack**:
```
def popBack
  @last = @last.prev_node and return unless @first == @last
  @first = Node.new(nil)
  @last = @first
end
```
Tiếp theo, Ta có thể muốn truy xuất phần tử đầu tiên hoặc cuối cùng vì chúng là yếu tố quan trọng nhất đối. Ta bắt đầu với cái đầu tiên, bằng **topFront**:
```
def topFront
  @first.value unless @first.nil?
end
```
Và phần tử cuối bằng **topBack**:
```
def topBack
  @last.value unless @last.nil?
end
```
Một điều quan trọng nữa mà ta có thể muốn hỏi **Deque** của chúng tôi là nếu nó trống hay không, ta chỉ cần kiểm tra **node** đầu tiên có trống hay không:
```
def is_empty?
  @first.nil?
end
```

Như vậy mình vừa mới tiến hành triển khai xong được cấu trúc Deque ở trong ruby và một số phương thức thiết yêu để làm việc với nó, các bạn cũng có thể triển khai được theo cách riêng của mình và cài đặt thêm một vài phương thức cần thiết khác.
### Tài liệu tham khảo:
- https://www.rubydoc.info/github/immutable-ruby/immutable-ruby/Immutable/Deque
- https://medium.com/better-programming/implementing-a-deque-in-ruby-cf6e9bfd9c3c