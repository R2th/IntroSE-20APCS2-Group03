*Độ phức tạp thời gian ước tính thời gian để chạy một thuật toán. Nó được tính bằng cách đếm các phép toán cơ bản.*

## Ví dụ (thuật toán lặp)
Thuật toán sau đây chạy mất bao lâu?

```
// Compute the maximum element in the array a.
Algorithm max(a):
    max ← a[0]
    for i = 1 to len(a)-1
        if a[i] > max
            max ← a[i]
    return max
```

Câu trả lời phụ thuộc vào các yếu tố như input, ngôn ngữ lập trình và thời gian chạy, kỹ năng code, trình biên dịch, hệ điều hành và phần cứng.

Chúng ta thường muốn lý giải về thời gian thực hiện theo cách chỉ phụ thuộc vào thuật toán và input của nó. Điều này có thể thực hiện được bằng cách chọn một phép toán cơ bản mà thuật toán thực hiện lặp đi lặp lại và ta sẽ có độ phức tạp thời gian T (n) là số lượng các phép toán như vậy mà thuật toán thực hiện với một mảng có độ dài n.

Đối với thuật toán ở trên, chúng ta có thể chọn so sánh [i]> max làm thao tác cơ bản.

1. Điều này thể hiện tốt thời gian chạy của thuật toán, vì phép so sánh mất nhiều thời gian hơn hẳn tất cả các hoạt động khác trong thuật toán này.
2. Ngoài ra, thời gian để thực hiện so sánh là không đổi: nó không phụ thuộc vào kích thước của a.
Vì vậy độ phức tạp thời gian, được đo bằng số lượng phép so sánh, trở thành T (n) = n - 1.

Nói chung, một phép toán cơ bản phải có hai thuộc tính:

1. Là phép toán được thực hiện thường xuyên nhất, ngay cả khi khi kích thước của đầu vào tăng lên.
2. Thời gian thực hiện phép toán đó phải không đổi: thời gian không được phép tăng khi kích thước của đầu vào tăng lên. Đây được gọi là unit cost.


## Trường hợp xấu nhất
Hãy xem xét thuật toán sau đây.

```
// Tell whether the array a contains x.
Algorithm contains(a, x):
    for i = 0 to len(a)-1
        if x == a[i]
            return true
    return false
```

Phép so sánh x == a [i] có thể được sử dụng như một phép toán cơ bản trong trường hợp này. Tuy nhiên, đối với thuật toán này, số lượng so sánh không chỉ phụ thuộc vào số phần tử n trong mảng mà còn phụ thuộc vào giá trị của x và các giá trị trong a:

* Nếu x không được tìm thấy trong thuật toán, hãy so sánh n lần,
* nhưng nếu x bằng a [0] thì chỉ có một phép so sánh.
Vì vậy, chúng ta thường chọn nghiên cứu độ phức tạp trong trường hợp xấu nhất:

* Cho T1 (n), T2 (n),... là thời gian thực hiện cho tất cả các đầu vào có thể có kích thước n.
* Độ phức tạp thời gian trong trường hợp xấu nhất W (n) sau đó được xác định là W (n) = max (T1 (n), T2 (n), Câu).
Độ phức tạp thời gian trong trường hợp xấu nhất cho thuật toán chứa do đó trở thành W (n) = n.

Độ phức tạp thời gian trong trường hợp xấu nhất đưa ra giới hạn trên về yêu cầu thời gian và thường dễ tính toán. Hạn chế là nó thường bị bi quan quá mức.


## Thời gian trung bình
Độ phức tạp thời gian trung bình là một biện pháp ít phổ biến hơn:

Cho T1 (n), T2 (n), Lần lượt là thời gian thực hiện cho tất cả các input có thể có kích thước n, và cho P1 (n), P2 (n),... là xác suất của các input này.
Độ phức tạp thời gian trường hợp trung bình được xác định là P1(n)T1(n) + P2(n)T2(n) + …
Thời gian trường hợp trung bình thường khó tính toán hơn và nó cũng đòi hỏi kiến thức về cách input được phân bố.


## Thời gian tuyến tính và bậc hai
Cuối cùng, chúng ta sẽ xem xét một thuật toán với độ phức tạp thời gian lớn.

```
// Reverse the order of the elements in the array a.
Algorithm reverse(a):
    for i = 1 to len(a)-1
        x ← a[i]
        for j = i downto 1
            a[j] ← a[j-1]
        a[0] ← x
```

Chúng ta chọn phép gán a [j] ← a [j-1] làm phép toán cơ bản. Cập nhật một phần tử trong một mảng là một phép toán có độ phức tạp thời gian liên tục và việc gán là thao tác chiếm nhiều thời gian nhất của thuật toán.

Số lượng các thao tác cơ bản chỉ phụ thuộc vào n trong trường hợp này và độ phức tạp thời gian trở thành

W(n) = 1 + 2 + … + n - 1 = n(n - 1)/2 = n2/2 - n/2.

Phép toán bậc hai chiếm nhiều thời gian nhất với n lớn và do đó chúng ta nói rằng thuật toán này có độ phức tạp thời gian bậc hai. Điều này có nghĩa là thuật toán scale tồi và chỉ có thể được sử dụng cho input nhỏ: để đảo ngược các phần tử của một mảng với 10.000 phần tử, thuật toán sẽ thực hiện khoảng 50.000.000 thao tác gán.

Trong trường hợp này, chúng ta có thể dễ dàng dùng một thuật toán có độ phức tạp thời gian tuyến tính.

```
Algorithm reverse(a):
    for i = 0 to n/2
        swap a[i] and a[n-i-1]
```

Đây là một cải thiện rất lớn so với thuật toán trước: một mảng với 10.000 phần tử giờ có thể được đảo ngược chỉ với 5.000 lần hoán đổi, tức là 10.000 thao tác. Đó là một cải tiến tốc độ gấp 5.000 lần, và sự cải tiến tiếp tục tăng lên khi đầu vào ngày càng lớn.

Khi nói về độ phức tạp thời gian, người ta hay sử dụng Big O Notation. Chúng ta có thể nói rằng độ phức tạp thời gian của thuật toán đầu tiên là Θ(n2), và thuật toán sau có độ phức tạp thời gian Θ (n).

Nguồn: https://yourbasic.org/algorithms/big-o-notation-explained/