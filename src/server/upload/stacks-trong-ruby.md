# Stacks trong Ruby
![](https://images.viblo.asia/7c661d34-307e-424f-9332-0ed4dd884982.jpg)
Trong Ruby hash, array, set, and queue là những gì ta tìm hiểu chủ yếu. Tuy nhiên, Ruby còn cung cấp một số cấu trúc dữ liệu khác phức tạp hơn, biết về các cấu trúc dữ liệu nâng cao hơn cũng giúp mở mang được nhiều kiến thức thú vị. Trong bài viết này mình sẽ giới thiệu về Stacks trong Ruby.
## Giới thiệu về Data Structures
Cấu trúc dữ liệu (Data Structures) được sử dụng để lưu trữ và quản lý dữ liệu theo cách hiệu quả và có tổ chức để truy cập và sửa đổi dữ liệu nhanh hơn và dễ dàng. Một số cấu trúc dữ liệu cơ bản là Arrays, LinkedList, Stacks, Queues, v..v..
## Giới thiệu về stacks
* Stack (ngăn xếp) là một cấu trúc dữ liệu mà bạn có thể sử dụng nó như là một **"to-do" list**. Bạn có thể thêm phần tử vào hoặc lấy ra từng phần tử của stack và xử lý, thao tác với chúng tới khi stack rỗng (không còn phần tử nào nữa). <br>
* Ngăn xếp là một loại danh sách liên kết đặc biệt cho phép chúng tôi lưu trữ, truy xuất dữ liệu một cách hiệu quả theo phương pháp nhập sau, xuất trước - **LIFO (Last In - First Out)**. Hay nói cách khác, các phần tử được lấy theo thứ tự ngược lại so với được lưu trữ trên ngăn xếp. <br>
* Cũng như điều đó xảy ra với hàng đợi (queues), các ngăn xếp không cho phép chúng ta chèn / xóa các phần tử tại các vị trí ngẫu nhiên. Và giống như các hàng đợi, chúng không khác gì chuỗi các nút được kết nối. <br>
* Bây giờ, hãy nhìn thấy cách một ngăn xếp phát triển khi chúng ta lưu trữ các phần tử (push) 
```
push(1)   push(2)   push(3)
 ---       ---       ---
  1         2         3
 ---       ---       ---
            1         2
           ---       ---
                      1
                     ---
```
* Và cách ngăn xếp thu nhỏ lại khi chúng ta loại bỏ các phần tử (pop)
```
pop    pop    pop
---    ---    ---
 3      2      1
---    ---    ---
 2      1
---    ---
 1     
---
```
* Trái ngược với những gì xảy ra với danh sách liên kết thông thường, khi làm việc với ngăn xếp, bạn không nên sử dụng head và tail trực tiếp từ mã của mình. Cách an toàn nhất để tương tác với ngăn xếp là thông qua các phương thức **push, peek and pop**. <br>
Dưới đây là các mô tả ngắn gọn về mỗi phương pháp, độ phức tạp và mã nguồn của nó.
## Initialize
Phương thức này là constructor stack. Nó tạo ra một ngăn xếp trống, đặt nút head bằng nil và chiều dài ngăn xếp thành 0.  <br>
Độ phức tạp của phương thức này là O (1).
```
def initialize
  self.head   = nil
  self.length = 0
end
```
## Push
Tạo một nút mới để chèn một giá trị vào ngăn xếp. Nút mới di chuyển phần tử về ở đầu danh sách và trở thành đầu head của danh sách. <br>
Vì ngăn xếp giữ con trỏ đến head và tail của nó, nên độ phức tạp của phương thức này là O (1).
```
def push data
  node = Node.new data
  if length == 0
    self.tail = node
  end
  node.next = self.head
  self.head = node
  self.length += 1
end
```
## Pop
Loại bỏ một yếu tố từ ngăn xếp. Như nó xảy ra với hàng đợi, việc loại bỏ rất đơn giản vì chúng luôn xảy ra ở phần đầu của ngăn xếp. <br>
Để loại bỏ một phần tử khỏi ngăn xếp, chúng ta chỉ head vào nút mà nó bên cạnh nó và đặt đuôi thành 0 nếu ngăn xếp chỉ chứa một phần tử. <br>
Độ phức tạp của phương thức này là O (1).
```
def pop
  return nil unless self.length > 0
    
  self.head = self.head.next
  self.tail = nil if self.length == 1
  self.length -= 1
end
```
## Peek
Trả về nút mà ở head ngăn xếp mà không loại bỏ nó hoặc không nếu ngăn xếp trống. <br>
Vì pop không trả về phần tử bị loại bỏ, nên peek là cách để đi nếu bạn phải làm gì đó với phần tử đó. <br>
Độ phức tạp của phương thức này là O (1).
```
def peek
  self.head
end
```
## Clear
Pops tất cả các yếu tố từ ngăn xếp. <br>
Độ phức tạp của phương thức này là O (n).
```
def clear
  while self.peek
    pop
  end
end
```
## Each 
Phương thức này đi qua ngăn xếp năng suất một lần cho đến khi nó đạt đến phần tử cuối cùng. <br>
Độ phức tạp để mang lại mục tiếp theo trong ngăn xếp là O (1). Độ phức tạp để mang lại toàn bộ ngăn xếp là O (n).
```
def each
  return nil unless block_given?
  current = self.head
  while current
    yield current
    current = current.next
  end
end
```
## Print
In nội dung của ngăn xếp bằng cách đi qua các mục của nó. <br>
Độ phức tạp của phương thức này là O (n).
```
def print
  if self.length == 0
    puts "empty"
  else
    self.each { |node| puts node.data }
  end
end
```
## Khi nào nên sử dụng ngăn xếp
Sau khi tìm hiểu về ngăn xếp, mình có thể nói với bạn chắc chắn rằng các ngăn xếp là một trong những cấu trúc dữ liệu được sử dụng nhiều nhất trong lĩnh vực này. <br>
Ngăn xếp rất tốt trong việc quản lý các chuỗi hướng dẫn, phân tích các biểu thức và giải quyết các ưu tiên toán tử. <br>
## Kết luận
Trên đây là khái niệm cơ bản về cấu trúc dữ liệu và ngăn xếp. Hi vọng qua khái niệm mình đã trình bày thì các bạn sẽ nắm rõ hơn về ngăn xếp trong Ruby. Làm việc với ngăn xếp có những lợi thế riêng, vì thế mình hi vọng các bạn thích nó!