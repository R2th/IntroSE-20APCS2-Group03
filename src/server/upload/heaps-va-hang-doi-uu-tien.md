# Sử dụng Heaps và Hàng đợi ưu tiến với module heapq

Heaps và hàng đợi ưu tiên ít được biết đến nhưng rất ngạc nhiên nó là kiến trúc dữ liệu rất có hữu dụng. Với cá vấn đề liên quan tới tìm kiếm phần tử tốt nhất trong dataset, họ thường đưa ra một phướng án dễ sử dụng và hiệu quả cao. Module `heapq` là một module trong thư viện chuẩn. Nó giúp tương tác với heap ở tầng thấp thông qua các hàm ở tầng cao.

Hàng đợi ưu tiên công cụ mạnh mẽ có thể giải quyết các vấn đề đa dạng như lập lịch gửi email, tìm đường ngắn nhất, hoặc merge các log file. Tập trình có nhiều bài toán cần tối ưu hóa và để tìm ra phương án tốt nhất để giải quyết bài toán.

## Heaps là gì ?

Heap là concrete data structure (cấu trúc dữ liệu cụ thể), trong khi hàng đợi ưu tiên (priority queues) là cấu trúc dữ liệu trừu tượng. Một cấu trúc dữ liệu trừu tượng xác định interface, trong khi concrete data structure định nghĩa cách triển khai nó.

Cấu trúc dữ liệu cụ thể được chỉ định để đảm bảo hiệu suất. Đảm bảo hiệu suất xác định mối quan hệ giữa kích thước của cấu trúc dữ liệu và thời gian hoạt động. Việc hiểu những điều đó cho phép bạn dự đoán sẽ mất bao nhiêu lâu để một chương trình chạy được với một lượng dữ liệu đầu vào.

### Cấu trúc dữ liệu, Heaps và Hàng đợi ưu tiên

Cấu trúc dữ liệu trựu tượng xác định các hoạt động và mối quan hệ giữa chúng. Trong hàng đợi ưu tiên, nó xác định 3 hoạt động là:
1. **is_empty** kiểm tra hàng đợi có trống không.
2. **add_element** thêm một phần tử vào hàng đợi.
3. **pop_element** đẩy phần tử với độ ưu tiên cao nhất.

Hàng đợi ưu tiên được sử dụng phổ biến để tối ưu hóa thực hiện một tác vụ, trong đó nhiệm vụ chính là thực hiện tác vụ với độ ưu tiên cao. Sau một nhiệm vụ được hoàn thành, độ ưu tiên của nó sẽ giảm xuống và nó được đưa về hàng đợi. Có 2 quy ước khác nhau để xác định hộ ưu tiên của một đối tượng:
1. Đối tượng **to** có độ ưu tiên cao
2. Đối tượng **bé** có độ ưu tiên cao.

Module `heapq` tuân theo quy tắc số hai, hay nói cách khác là sử dụng phổ biến hơn hẳn. Theo quy ước này, phần tử nhỏ nhất sẽ có mức độ ưu tiên cao nhất. Điều này nghe có vẻ hơi lạ, nhưng nó thường khá hữu tích. Với ví dụ thực tế ở bài này, bạn sẽ thấy phương pháp này hiệu quả như nào.

Concrete data structures thực hiện các hoạt động được định nghĩa bên trong một cấu trúc dữ liệu trừu tượng và được chỉ định rõ về đảm bảo hiệu suất.

Việc triển khai heaps trong hàng đợi ưu tiên đảm bảo rằng cả pushing và poping phần tử đều là phép toàn thời gian logarithmic. Điều này có nghĩa là thời gian cần thực hiển để push và pop là log cơ số 2 của số các phần tử. Phép toán loga tăng nhập. log cơ số 2 của 15 khoảng 4, log cơ số 2 của nghìn tỷ là 40. Điều đó nghĩa là nếu thuật toán đủ nhanh với 15 phần từ, thi nó cũng chỉ chậm đi 10 lần với nghìn tỷ phần tử. 

### Chi tiết về Heaps 

Heap khai triển một hàng đợi ưu tiên như một cây nhị phân hoàn chỉnh. Trong nhị phân cây, mỗi nút sẽ có hai con.

Thuộc tính hoàn chỉnh nghĩa là độ sâu của cây is log cơ số 2 của số phần tử, được làm tròn lên. Dưới đây là một ví dụ về cây nhị phân hoàn chỉnh:

![complete-binary-tree](https://files.realpython.com/media/heap-tree.4b4413ff133c.png)

Trong ví dụ cụ thể, tất cả các cấp độ đều hoàn chỉnh. Mỗi nút trừ nút sâu nhất thì sẽ có đúng 2 con. Ở đây có 7 nút ở 3 cấp (tầng) khác nhau. Log cơ số 2 của 7 là 2.8073549 làm tròn lên là 3. Node trên cùng gọi là nút gốc (root). Hiệu suất đảm bảo trong một heap phụ thuộc vào cách các phần tử thấm (percolate) lên trên hay xuốn dưới của cây. Kết quả thực tế của số phép so sánh thực hiện trong một heap là loga cơ số hai của sô phần tử trong cây. 

Trong một heap, giá trị của một node bất kỳ sẽ luôn nhỏ hơn giá trị của các node con. Đây cũng là chính chất của heap. Tính chất này khác với tìm kiếm nhị phân, trong đó chỉ nút bên trái sẽ có giá trị nhỏ hơn node cha.

Ví dụ, để push một phần tử vào 1 heap. Python thêm một node mới vào vị trí tiếp theo. Nếu lớp cuối cùng chưa đầy, thì node sẽ được thêm vào vị trí tiếp theo ở tầng đó. Và ngược lại, một tầng mới sẽ được tạo và khi đó phần tử sẽ được thêm vào lớp đó. Khi nút mới được thêm, Python sẽ so sánh nó với cha của nó. Nếu thuộc tính heap là violated, thì node này và cha của nó sẽ được hoán đổi cho nhau, và việc kiểm tra sẽ tiếp tục lại ở tầng con cha. Điều này tiếp diễn cho tới khi đảm bảo thuộc tính của heap hoặc tới được nút gốc.

Tương tự, khi pop phần tử nhỏ nhất, Python sẽ biết rằng do tính chất heap, phần tử đó sẽ nằm ở đầu cây. Nó sẽ thay thế phần tử này với phần tử cuối cùng ở lớp sấu nhất và sau đó kiểm tra lại tính chất của heap.

### Sử dụng hàng đợi ưu tiên

Heap là một cách để khai triển cho hàng đợi ưu tiên, rất hữu dụng cho các chương trình tìm kiếm một phẩn tử. Ví dụ bạn có thể sử dụng hàng đợi ưu tiên cho các công việc sau:
- Lấy 3 bài viết phổ biết nhất trong dữ liệu
- Tìm cách nhanh nhất để đi từ điểm này tới điểm khách 
- Dự đoán xe bus nào sẽ đên gia đầu tiên dựa vào tần suất 

Nhiều công việc khác dùng tới hàng đợi ưu tiên như lập lịch gửi mail. Tưởng tưởng một hệ thống có rất nhiều loại email, và mỗi loại cần gửi với tần suất nhất định. Ví dụ một loại email sẽ gửi đi sau mỗi 5p và một lại email khác cần gửi đi sau mõi 4 phút. Scheduler  có thể thêm cả 2 loại email vào hàng đợi và xác định thời gian tiếp email cần gửi. Dựa vào thời gian nhỏ nhất, nó sẽ xác định cái gì sẽ được gửi đi tiếp theo, tính toán thời gian nghỉ giữa hiệp. Sau khi scheduler tỉnh dậy, nó sẽ xử lý email, lấy email từ hàng đợi và tính toán thời gian tiếp theo, put email vào hàng đợi.

## Heap trong module `heap`

Mặc dù bạn thấy head được mô tả trước đó là dạng cây, nhưng điều bạn cần nhớ là nó là một cây nhị phân hoàn chỉnh. Sự hoàn chỉnh nghĩa là nó luôn luôn xác định số phần tử ở mỗi lớp trừ lớp cuối cùng. Vì điều này, heap có thể được khai triển dưới dạng list. Đó là điều mà module `heapq` đã làm.

Có ba quy tắc xác định mối quan hệ giữa phần tử có index `k` và các phần tử sung quanh. 

1. Con đầu tiên của nó ở vị trí `2*k+1`
2. Con thứ 2 của nó ở vị trí `2*k+2`
3. Cha của nó ở vị trí `(k-1)//2`

> Ký tự // là phép chia lấy phần nguyên. Nó sẽ luôn làm tròn xuống.
> 

Quy tắc trên nói cho cho bạn viết cách hình dung một cây nhị phân hoàn trình dưới dạng list. Hãy nhớ là một phần tử sẽ luôn có một cha, nhưng có thể có những phản tử không có con. Nếu `2*k` lớn hơn index của cuối cùng của list, thì phần tử đó sẽ không có bất kỳ con nào. Nếu `2*k+1` hợp lệ nhưng `2*k+2` thì không thì phần tử đó chỉ có một con.

Tính chất heap (heap property) nghĩa là nếu `h` là một heap, thì những thứ sau đây sẽ không bao giờ False:

```python
h[k] <= h[2*k + 1] and h[k] <= h[2*k + 2]
```

Nó có thể raise `IndexError` nếu bất kỳ chỉ số nào vượt ra khỏi độ dài của list, nhưn g nó sẽ không bao giờ `False`.

Nói một cách khác, một phần tử sẽ luôn nhỏ thơn các phần tử có index gấp đôi index của nó cộng 1, hoặc cộng 2. Dưới đây là một hình ảnh minh họa:

![](https://files.realpython.com/media/heap-list.2db422e53ead.png)

Các mũi tên đu từ phần tử `k` tới phần tử `2*k+1` và `2*k+2`. Phần tử đầu tiên sẽ có index là 0, nó sẽ có 2 mui tên tới vị trí index 1 và index 2. Hãy để ý cách mà mũi tên luôn đi từ giá trị nhỏ hơn tới giá trị lớn hơn. Đây là cách mà bạn kiểm tra xem danh sách này có thỏa mãn tính chât của heap hay không.

### Các toán tử cơ sở

Module `heapq` khai triển heap dưới dạng list. Không giống như các module khác, nó không định nghĩa custom classs. Module này các hàm hoạt động trực tiếp với list. Ví dụ, với bài toán email phía bên trên, các phần tử sẽ được thêm vào một heap lần lượt, bắt đầu khi một heap trống. Tuy nhiên, nếu đã có một danh sách các phần tử cần cho vào heap, thì module sẽ có `heapify()` để biến một danh sách thành một heap hợp lệ. Dưới đây là đoạn code sử dụng `heapify()` để trả về 1 heap

```python=
>>> import heapq
>>> a = [3, 5, 1, 2, 6, 8, 7]
>>> heapq.heapify(a)
>>> a
[1, 2, 3, 5, 6, 8, 7]
```

Mặc dù 7 đứng sau 8, danh sách này vẫn tuân theo tính chất của heap. Ví dụ `a[2]` là 3 nó sẽ nhỏ hơn `a[2*2+2]` là 7. Như bạn có thể thấy `heapify()` thay đổi vị trí của danh sách nhưng nó không sắp xếp. Một heap không nhất thiết phải sắp xếp để thỏa mãn tính chất. Tuy nhiên, vì mọi danh sách được sắp xếp đêu có thể thỏa mãn điều kiện, nên việc chạy `heapify()` trên danh sách đã sắp xếp sẽ thay đổi lại thứ tự các phần tử danh sách. 

Cách hoạt động cơ bản của `heapq` là giả định list là một `heap` đã tồn tại. Nó hữu ích để lưu ý rằng một danh sách trống hoặc danh sách khác sẽ luôn là một `heap`.

Từ phần tử đầu tiên, bạn không dùng tới hàm nào để tìm ra phần tử có giá trị nhỏ nhất vì phần tử này chính là phần tử nhỏ nhất ở vị trí a[0]. Để pop phần tử nhỏ nhất mà vẫn đảm bảo tích nhất của heap, ta có thể dùng hàm `heappop()` được định nghĩa sẵn trong module. Ví dụ dưới đây là cách sử dụng nó:

```python=
>>> import heapq
>>> a = [1, 2, 3, 5, 6, 8, 7]
>>> heapq.heappop(a)
1
>>> a
[2, 5, 3, 7, 6, 8]
```

Hàm sẽ trả về phần tử dầu là `1` và đảm bảo tính chất của heap trên mảng `a`. Ngoài ra, module cũng bao gồm luôn `heappush()` nhàm việc push một phần tử tới heap.

```python=
>>> import heapq
>>> a = [2, 5, 3, 7, 6, 8]
>>> heapq.heappush(a, 4)
>>> a
[2, 5, 3, 7, 6, 8, 4]
>>> heapq.heappop(a)
2
>>> heapq.heappop(a)
3
>>> heapq.heappop(a)
4
```

Sau khi push 4 vào heap, bạn sẽ pop ra 3 phần tử từ a. Vì 2 và 3 đã có trong heap và nhỏ hơn 4, nên chúng bị lấy ra đầu tiên.

### Các phép toán 

Vì hàng đợi ưu tiên thường được sử dụng để gộp các chuỗi đã sắp xếp nên module này cũng cung câp thêm phương thức là `megre()`. Phương thức này giả sử đầu vào của nó đã được sắp xếp và trả về một `iterator` - không phải list. Dưới đây là một ví dụ sử dụng nó để làm tính năng lập lịch cho email:

```python=
import datetime
import heapq

def email(frequency, details):
    current = datetime.datetime.now()
    while True:
        current += frequency
        yield current, details

fast_email = email(datetime.timedelta(minutes=15), "fast email")
slow_email = email(datetime.timedelta(minutes=40), "slow email")

unified = heapq.merge(fast_email, slow_email)
```

Đầu vào của hàm `megre()` là một generator vô cực (infinite generators). Giá trị trả về sẽ được gán cho biến `unified` cũng là một vòng lặp vô hạn. Vòng lặp này sẽ lấy các email sẽ được gửi theo thứ tự thời gian.

Để debug và xác nhận code hoạt động đúng thì bạn có thể in ra 10 phần tử email chuẩn bị gửi như sau:

```python=
>>> for _ in range(10):
...    print(next(element))
(datetime.datetime(2020, 4, 12, 21, 27, 20, 305358), 'fast email')
(datetime.datetime(2020, 4, 12, 21, 42, 20, 305358), 'fast email')
(datetime.datetime(2020, 4, 12, 21, 52, 20, 305360), 'slow email')
(datetime.datetime(2020, 4, 12, 21, 57, 20, 305358), 'fast email')
(datetime.datetime(2020, 4, 12, 22, 12, 20, 305358), 'fast email')
(datetime.datetime(2020, 4, 12, 22, 27, 20, 305358), 'fast email')
(datetime.datetime(2020, 4, 12, 22, 32, 20, 305360), 'slow email')
(datetime.datetime(2020, 4, 12, 22, 42, 20, 305358), 'fast email')
(datetime.datetime(2020, 4, 12, 22, 57, 20, 305358), 'fast email')
(datetime.datetime(2020, 4, 12, 23, 12, 20, 305358), 'fast email')
```

Lưu ý, cách gửi `fast email` được lập lịch là mỗi 15 phút, `slow email` là 40p và các email này được xen kẽ nhau và sắp xếp theo đúng thứ tự thời gian gửi. `megre()` khoogn đọc tất cả dữ liệu đầu vào mà thay vào nó, nó hoạt động rất động. Với cách tương tự, khi sử dụng để gộp các chuỗi được sắp xếp như log file được xếp theo thứ tự thời gian, thì nó sẽ chiếm ít dung lượng cho dù log file có nặng bao nhiêu.

## Các vấn đề Heaps có thể xử lý

Như bạn đã thấy trước đây, heaps rất tốt cho việc hợp nhất các chuỗi có thứ tự. Hai ứng dụng mà bạn có thể biết tới là lập lịch và hợp nhất các file log. Tuy nhiên còn nhiều ứng dụng hơn cho nó. Heaps có thể xác định `n` thứ hạng cao, `n` thứ hạng thấp của một điều gì đó. Và module này hỗ trợ function giúp cho việc đó. Ví dụ, đoạn code sau sẽ lấy ra các vận động viên được huy chương hoặc top 3 động viên về đích từ bảng dữ liệu `100 mét chạy nữ` trong Olympic Mùa Hè 2016.

```python=
>>> import heapq
>>> results="""\
... Christania Williams      11.80
... Marie-Josee Ta Lou       10.86
... Elaine Thompson          10.71
... Tori Bowie               10.83
... Shelly-Ann Fraser-Pryce  10.86
... English Gardner          10.94
... Michelle-Lee Ahye        10.92
... Dafne Schippers          10.90
... """
>>> top_3 = heapq.nsmallest(
...     3, results.splitlines(), key=lambda x: float(x.split()[-1])
... )
>>> print("\n".join(top_3))
Elaine Thompson          10.71
Tori Bowie               10.83
Marie-Josee Ta Lou       10.86
```

Đoạn code trển sử dụng `nsmallest()`, hàm này sẽ trả về các phần tử nhỏ nhất trong vòng lặp và cho phép 3 đối số truyền vào:
1. `n` xác định số phần tử trả về
2. `iterable` xác định hoặc tập dữ liệu so sánh
3. `key` là function để xác định phần tử được so sánh như thế nào

Ở đây `key` là function sẽ chia dòng theo ký tự khoảng chắng, và lấy phần tử cuối cùng sau đó chuyển nó sang dạng flow. Code sẽ sắp xếp các dòng theo số lần chạy và trả về 3 dòng với thời gian chạy nhỏ nhất. Chúng tương ứng với 3 người chạy nhanh nhất.

## Ví dụ: Tìm đường đi
 
Ví dụ sau đây là ví dụ thực tế cho việc sử dụng `heapq` để giải quyết vấn đề. Ví dụ sẽ sử dụng một thuật toán cổ điền, và một phần của nó yêu cầu heap

Giả sử một con robot cần xác định hướng trong một mê cung hai chiều. Con robot cần đi từ gốc tọa độ (phía trên góc trái) tơi đích là phía dưới bên phải. Con robot đó có một bản đồ được lưu trong bộ nhớ và có thể vẽ ra các con đường trước khi đi.

Mục tiêu là con robot cần hoàn thành mê cùng này nhanh nhất có thể. Thuật toán ta sẽ sử dụng là thuật toán `Dijkstra`. Sẽ có 3 cấu trúc dữ liệu được lưu và cập trong trong suốt thuật toàn:

1. `tentative ` là bản đồ mang tính chất thăm giò từ gốc tới một vị trí `pos`. Con đường này được gọi là `tentative` vì nó là con đường ngắn nhất đã biết và có thể cải thiện được
2. `certain ` là tập hợp các điểm mà có thể đi qua.
3. `candidates ` là một heap các vị trí của path. 

Ở mỗi bước, chúng ta sẽ xử lý 4 hành động:
1. Pop một `candidates`
2. Thêm một `candidate` tới `certain`. Nếu nó đã tồn tại thì có thể bỏ qua
3. Tìm ra con đường ngắn nhất tới candidate hiện tại
4. Với mỗi hàng xóm trực tiếp của `candidate`, xem xét liệu việc đi qua điểm đó có mang lại con đường ngắn nhất hay không. Sau đo cập nhập lại con đường cần thiết.

Các bước trên được chạy cho tới khi điểm đích được thêm vào trong tập `certain`. 

Vậy bạn đã hiểu thuật toan, bây giờ hãy viết những dòng code. Trước tiên, ta cần thêm thư viện `heapq` vào trong code:

```python=
import heapq
```

Bạn sẽ sử dụng các hàm mà `heapq` cung cấp để giúp bạn tìm vị trị thích hợp. Tiếp theo, chúng ta định nghĩa một bản đồ thông qua biến cùng tên.

```python=
map = """\
.......X..
.......X..
....XXXX..
..........
..........
"""
```

Ở đây ta sử dụng 3 dấu nháy để hiển thị một vùng mà robot có thể di chuyển một cách trực quan nhất. VBản đồ nay dduocj tối ưu hóa để dễ hiểu với người đọc. Dấu chấm là các điểm có thể đi còn X là chướng ngại vật, va vào chết luôn.

Hàm đâu tiên bạn cần viết là convert bản đồ này sang một thứ gì đó dễ phân tích hơn

```python=
def parse_map(map):
    lines = map.splitlines()
    origin = 0, 0
    destination = len(lines[-1]) - 1, len(lines) - 1
    return lines, origin, destination
```

Hàm này nhận một bản đồ và trả về 1 tuple với 3 phần tử:
1. Danh sách các line
2. Vị trí gốc tọa độ
3. Vị trí đích

Điều đó cho phép phần còn lại của mã có thể hoạt động trên cấu trúc dữ liệu máy tính. Danh sách `lines` có thể được đánh index bởi tọa độ x, y. Biểu thức `lines[y][x]` trả về giá trị của vị trí với 2 ký tự:
1. Dấu chấm (.) xác định tọa độ đó là không gian trống
2. `X` xác định nó là chướng ngại vật

Hàm `is_valid()` tiếp theo để tính toán tọa độ của các điểm (x,y) có hợp lệ hay không:

```python=
def is_valid(lines, position):
    x, y = position
    if not (0 <= y < len(lines) and 0 <= x < len(lines[y])):
        return False
    if lines[y][x] == "X":
        return False
    return True
```

Hàm này nhận vào 2 tham số:
1. `lines` là một list các line ở bên trên
2. `position` là vị trí cần kiểm tra dạng `(x,y)`

Để hợp lệ, vị trí đó cần nằm trong ranh giới của bản đồ và không phải là một chướng ngại vật,

Phương thúc này kiểm tra `y` hợp lệ dựa trên độ dài của danh sách của `lines`. Hàm tiếp theo sẽ kiểm tra sự hợp lệ của `x` bằng các chắc chắn rằng nó nằm bên trong `lines[y]`. Cuối cùng, sau khi biết các tọa độ này hợp lệ, code sẽ check xem nó có phải chướng ngại vật thông qua việc so sánh giá trị của nó có phải `X` hay không.

Tiếp tới, ta viết thêm 1 hàm nữa là lấy ra thằng hàng xóm của nó `get_neighbors()`:

```python=
def get_neighbors(lines, current):
    x, y = current
    for dx in [-1, 0, 1]:
        for dy in [-1, 0, 1]:
            if dx == 0 and dy == 0:
                continue
            position = x + dx, y + dy
            if is_valid(lines, position):
                yield position
```
Hàm này sẽ tả về tất cả các tọa độ hợp lệ xung quanh điểm hiện tại.
`get_neighbor()` sẽ tìm chính xác vị trí hàng xóm của nó, kể cả vị trí tréo. 

Cuối cùng là hàm quan trọng nhất, hàm tìm đường đi `get_shorter_paths()`
```python=
def get_shorter_paths(tentative, positions, through):
    path = tentative[through] + [through]
    for position in positions:
        if position in tentative and len(tentative[position]) <= len(path):
            continue
        yield position, path
```

`get_shorter_paths()` sẽ cung cấp các đường dẫn và vị trí đi qua sao cho ngắn nhất. Hàm này có 3 tham số:

1. `tentative` là điểm dictionay ánh xạ một điểm tới đường đi ngắn nhất đã biết
2. `positions` là vòng lặp các vị trí mà bạn muốn tìm đường đi ngắn nhất
3. `through` là một vị trí mà qua đó một đường ngắn nhất có thể được tìm thấy

Tóm tắt lại, để tìm đường đi ngắn nhất thì ta cần có 3 loại dữ liệu sau:

1. `tentative ` là bản đồ.
2. `certain ` là tập hợp các điểm.
3. `candidates ` là một heap các vị trí của path. 

Một phần tử bên trong`certain` nếu bạn chắc chắn trằng con đường ngắn nhất đã biết là con đường ngắn nhất có thể. Nếu đích của nó bên trong tập này, thì con đường ngắn nhất đã biết đến dích chắn chắn là con đường ngắn nhất có thể và bạn cso thể trả về con đường này.

Một heap là tập hợp độ dài những đoạn đường và được quản lý với sự trợ giúp của `heapq`

Ở mỗi bước, bạn sẽ xem xét các điểm với các đoạn ngắn đã biết. Đây là nơi heap thực hiện với `heappop()`. Không có đường nào ngắn hơn vị trí đang xét - tất cả các đường khcs đều đi qua một nút khác và tất cả các đường này đều dài hơn. Dó đó vị trí này được đánh dấu `certain`.

Sau đó bạn xem xét các hàng xóm chưa được xét và nếu việc đi qua nút hiện tại có cải tiến, thì bạn sẽ thêm nó vào `candidates` thông qua `heappush()`.

Đây là hàm `find_path()` để khai triển thuật toán:

```python=
def find_path(map):
    lines, origin, destination = parse_map(map)
    tentative = {origin: []}
    candidates = [(0, origin)]
    certain = set()
    while destination not in certain and len(candidates) > 0:
        _ignored, current = heapq.heappop(candidates)
        if current in certain:
            continue
        certain.add(current)
        neighbors = set(get_neighbors(lines, current)) - certain
        shorter = get_shorter_paths(tentative, neighbors, current)
        for neighbor, path in shorter:
            tentative[neighbor] = path
            heapq.heappush(candidates, (len(path), neighbor))
    if destination in tentative:
        return tentative[destination] + [destination]
    else:
        raise ValueError("no path")
```

`find_path()` sẽ nhận một bản đồ dưới dạng string và trả về một path phù hợp.

- Dòng 2-5: thiết lập các biến cần thiết.
- Dòng 6: định nghĩa vòng lặp. Nếu không có `candidates`, thì không có đường nào được tìm thấy. Nếu `destination `  trong `certain`, thì đường tới`destination` không thể ngắn hơn được.
- Dòng 7-10: lấy ứng viên qua `heappop()`, bỏ qua lặp nếu đã tồn tại trong `certain` và ngược lại.
- Dòng 11-15: sử dụng `get_neighbors()` và `get_shorter_paths()` để tìm kiếm con đường ngắn nhất tới vị trí hàng xóm và update vào `tentative ` và `candidates `
- Dòng 16-19: Trả về kết quả cuối cùng. Nếu 1 đường tìm thấy thì nó sẽ trả về đường nó. Còn không nó sẽ raise expection.

Nếu thuật toán trên sử dụng cho robot thì không sau, tuy nhiến nếu bạn muốn biết con đường nó ntn thì chúng ta cần thêm đoạn code để show nó:
```python=
def show_path(path, map):
    lines = map.splitlines()
    for x, y in path:
        lines[y] = lines[y][:x] + "@" + lines[y][x + 1 :]
    return "\n".join(lines) + "\n"
```

Hàm này nhận vào `path` và `map` sau đó tra về 1 bản đồ mới sử dụng `@` để biểu diễn. Khi chạy bạn sẽ thấy nó như thế này:


```python=
>>> path = find_path(map)
>>> print(show_path(path, map))
@@.....X..
..@....X..
...@XXXX..
....@@@@@.
.........@
```

## Tổng kết

Bây giờ bạn đã biết như thế nào là **heap** và **hàng đợi ưu tiên**, những vấn đề nào cần dùng chúng. Đồng thời bạn tìm hiểu được cách sử dụng module `heapq` khi áp dụng heap đồng thời áp dụng nó với một ví dụ thực tế. Hy vognj với kiến thức này, nó sẽ giúp bạn giải quyết các vấn đề tìm kiếm phần tử lớn nhất, nhỏ nhất hay các vấn đề khác.

# Tham khảo:
https://realpython.com/python-heapq-module/