Cá nhân mình thấy tư duy là một khả năng rất quan trọng không chỉ trong lập trình mà còn trong nhiều lĩnh vực khác nhau. Mình cảm thấy việc rèn luyện tư duy là một điều rất cần thiết vì vậy mình chọn cách thử sức viết code để giải quyết những bài toán nho nhỏ. hôm nay mình xin giới thiệu với mọi người một vài bài nho nhỏ như vậy cùng với cách giải của mình mong được mọi người có thể chia sẻ thêm những cách hoặc những bài toán thú vị khác :) 

* chú ý: mình đang dùng code ruby nhưng nếu các bạn muốn chia sẻ hãy cứ dùng ngôn ngữ nào các bạn muốn nhé!
### 1. Bài 1
một hình vuông x với diện tích là 1. Một đa giác n thu được bằng cách lấy n-1 hình vuông x và đặt chúng cạnh nhau xung quanh đa giác n-1. nhiệm vụ là phải tìm được diện tích của đa giác n. Nghe đề bài hơi khó hiểu nhỉ! bạn hãy nhìn ví dụ dưới đây về đa giác của chúng ta nhé
![](https://images.viblo.asia/7b92454e-5261-40c7-af5b-75cd92e69281.png)

ví dụ: đa giác n=2 được tạo ra bằng cách lấy n-1 = 1 hình vuông x đặt cạnh nhau xung quanh đa giác n=1 tương tự với các đa giác 3, 4.

được rồi tóm lại là chúng ta cần viết code để với đầu vào là n đầu ra là diện tích của đa giác đó ví dụ:

* n = 1 => diện tích là 1

* n = 2 => diện tích là 5

* n = 3 => diện tích là 13

### 2. Bài 2
Mùa hè nóng bức 1 công ty nọ tổ chức cho nhân viên đi chơi, họ nghỉ tại một khách sạn, khách sạn được thể hiện bằng một ma trận hình chữ nhật vỡi mỗi hàng của ma trận là một tầng, mỗi ô là một phòng và mỗi ô chứa 1 số nguyên đại diện cho giá phòng. trong đó cõ những phòng miễn phí (giá của nó là 0) nghe đồn là có vấn đề về tâm linh ở các phòng đó =)) vì vậy công t kia quyết địng không thuê những phòng có giá là 0 và cả những phòng bên dưới những phòng đo cho chắc cú =)). nhiệm vụ của bạn là hãy tính tổng giá của tất cả các phòng phù hợp với diều kiện trên.
bạn có thể hiểu đơn giản qua ví dụ:

đầu vào cho ma trận

```
matrix = [[0, 1, 1, 2], 
          [0, 5, 0, 0], 
          [2, 0, 3, 3]]
```

đầu ra kết quả là 9.

ở đây các phòng không thỏa mã điều kiện sẽ bị đánh dấu 'x'

```
[[x, 1, 1, 2], 
 [x, 5, x, x], 
 [x, x, x, x]]
```
vì vậy tổng giá các các phòng thỏa mãn là 1 + 1 + 2 + 5 = 9

### 3. Bài 3
Bạn có một chuỗi bao gồm các chữ cái tiếng Anh, dấu chấm câu, ký tự khoảng trắng và dấu ngoặc vuông

Nhiệm vụ của bạn là đảo ngược các chuỗi chứa trong mỗi cặp dấu ngoặc đơn phù hợp, bắt đầu từ cặp trong cùng. Chuỗi kết quả không được chứa bất kỳ dấu ngoặc đơn nào. chuỗi này được đảm bảo các dấu ngoặc đơn đi theo cặp nghĩa là sẽ không có dấu "(" nào không có dấu ")" ứng với nó.

ví dụ:

* đầu vào s = "a(bc)de"; đầu ra tương ứng là "acbde"
* đầu vào s = "co(de(fight)s)"; đầu ra tương ứng là "cosfighted"
* đầu vào s = "The ((quick (brown) (fox) jumps over the lazy) dog)"; đầu ra tương ứng là "The god quick nworb xof jumps over the lazy"

### 4. Bài giải cá nhân
**bài 1**
*  điều đầu tiên mình thấy là chúng ta có thể tính diện tích của đa giác n từ diện tích đa giác n-1 ok vậy thì chắc sẽ dùng được đệ quy nhỉ? 
* diện tích đa giác n = diện tích đa giác n-1 + diện tích của số ô vuông thêm vào (thực ra nói diện tích cho hay chứ nó là số ô vuông luôn vì diện tích mỗi ô vuông là 1 mà)  
* dễ thấy số ô vuông thêm vào sẽ là n*4 - 4 

vì vậy đây là cách của mình:
```ruby
def dientich(n)
    if (n == 1) 
        1
    else
        (n*4)-4 + dientich(n-1)
    end
end
```
**bài 2**

bài này chắc sẽ có nhiều cách nhưng cá nhân mình thích nghĩ nó nhẹ nhàng và vui vẻ hơn chút (có thể với người khác thì nó là code lởm :) )

* đầu tiên mình bắt đầu với ý nghĩ sẽ gán giá trị 0 cho các phần tử không thỏa mãn điều kiện sau đó tính tổng tất cả các phần tử.

đây là cách của mình:

```ruby
def matrixElementsSum(matrix)
    array = matrix.flatten
    row_length = array.length/matrix.length
    for i in 0..(array.length - row_length)
        if array[i] == 0
            array[i + row_length] = 0
        end
    end
    array.inject(0){|sum,x| sum + x }
end
```

**bài 3**

bài này chắc cú có thể xài regex rồi nhưng dùng regex cũng khá là khoai và nhìn chuỗi regex chả vui vẻ mấy mình có tham khảo được 1 đoạn code xử lý khá là thú vị muốn chia sẻ với mọi người (hơn là đọc code lởm của mình :) ) cùng đọc qua nhé 

```ruby
def reverseParentheses(s)
  stack = []
  word = ''
  s.chars.each do |c|
    if c == '('
      stack.push word
      word = ''
    elsif c == ')'
      word = stack.pop + word.reverse
    else
      word += c
    end
  end
  word
end
```

Nguồn tham khảo: https://app.codesignal.com/