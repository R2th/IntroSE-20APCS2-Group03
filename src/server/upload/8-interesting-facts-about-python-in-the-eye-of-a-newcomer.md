Gần đây mình mới nhảy sang vọc Python, vì bản tính tò mò nên mình hay đi tìm những trick hay của ngôn ngữ đó =)) Nên hôm nay mình sẽ liệt kê ra những thứ hay ho mình tìm đc dưới con mắt một thanh niên Ruby nhảy sang :3 

### else kết đôi với for ????

Mọi người đã bao giờ thấy else đi với vòng lặp for bao giờ chưa ạ =)) Thế mà Py nó có có một loại cú pháp đặc biệt chỉ thực thi nếu vòng lặp for thoát tự nhiên mà không có bất kỳ câu lệnh ngắt nào.

```python
def func(array): 
     for num in array: 
        if num%2==0: 
            print(num) 
            break # Case1: Break được gọi nên đoạn mã trong else sẽ ko đc thực thi. 
     else: # Case 2: Else đc thực thi vì ko có thằng break nào  
        print("No call for Break. Else is executed")  
  
print("1st Case:") 
a = [2] 
func(a) 
print("2nd Case:") 
a = [1] 
func(a) 
```

Kết quả của function trên:

> 1st Case:
> 2

> 2nd Case:
> No call for Break. Else is executed

### Giải nén biến :3  

Chức năng Argument Unpacking (giải nén biến) là một tính năng tuyệt vời khác của Python. Chúng ta có thể giải nén một List hoặc một Dictionary để dùng như một biến số bằng cách sử dụng * và ** . Điều này thường được gọi là toán tử Splat. Ví dụ ở đây:

```python
def point(x, y): 
    print(x,y) 
  
foo_list = (3, 4) 
bar_dict = {'y': 3, 'x': 2} 
  
point(*foo_list) # Giải nén Lists 
point(**bar_dict) # Giải nén Dictionaries 
```

Output:

> 3 4

> 2 3

### Tìm index trong loop

Việc này khá đơn giản, nhưng ko như Ruby có hàm each_with_index với một cái tên chỉ rõ chức năng của nó =)) Py có hàm tương ứng 'enumerate' mà cái tên nó ko liên quan cho lắm =,.,= Nói chung nó cũng trả về một phần tử của vòng lặp đi kèm với index của nó:

```python
vowels=['a','e','i','o','u'] 
for i, letter in enumerate(vowels): 
    print (i, letter) 
```

Output:

> (0, 'a')

> (1, 'e')

> (2, 'i')

> (3, 'o')

> (4, 'u')

### To infinity and beyond !!! and back ??

Chúng ta có thể định nghĩa được vô cực phải không? Nhưng chờ đã! Không phải với Python. Hãy xem ví dụ tuyệt vời này:

```python
# Dương vô cực
p_infinity = float('Inf') 
  
if 99999999999999 > p_infinity: 
    print("The number is greater than Infinity!") 
else: 
    print("Infinity is greatest") 
  
# Âm vô cực
n_infinity = float('-Inf') 
if -99999999999999 < n_infinity: 
    print("The number is lesser than Negative Infinity!") 
else: 
    print("Negative Infinity is least") 
```

Output:

> Infinity is greatest

> Negative Infinity is least

### Slice Operator

Python’s có một thứ đặc biệt gọi là Slice Operator. Thực ra nó chỉ là tập hợp những cách màu mè để lấy ra các mục từ danh sách, cũng như thay đổi chúng. Hãy xem đoạn mã này:

```python
# Slice Operator 
a = [1,2,3,4,5] 
  
print(a[0:2]) # Lấy phần tử từ 0 đến 2 nhưng ko lấy 2 (yaoming)
  
print(a[0:-1]) # Lấy hết trừ thanh niên cuối hàng
  
print(a[::-1]) # Đảo ngược list
  
print(a[::2]) # Bỏ qua 2 phần tử đầu
  
print(a[::-2]) # Bỏ 2 phần tử cuối 
```

Output:

> [1, 2]

> [1, 2, 3, 4]

> [5, 4, 3, 2, 1]

> [1, 3, 5]

> [5, 3, 1]

### Có giải nén thì phải có nén chứ nhỉ (2 cái ko liên quan đến nhau đâu =)))))

Muốn nén hai List thành 1 ma trận 2 chiều. Chỉ cần sử dụng zip để làm điều đó. 

```python
matrix = [[1, 2, 3], [4, 5, 6]] 
print(zip(*matrix)) 
```

Kết quả (thử dùng giải nén xem có ra gì ko nhá):

> [(1, 4), (2, 5), (3, 6)]

### Khai báo function tại chỗ (wow)

Bạn muốn khai báo một function nhỏ, nhưng bạn không muốn kéo xuống và khai báo nó ở dưới. Đừng lo, bạn có thể sử dụng lambda. Từ khóa lambda trong python dùng để khai báo hàm ẩn danh, bạn có thể khai báo function mọi lúc mọi nơi mà ko ngại bố con thằng nào =)) (đùa đấy khai báo mấy hàm nhỏ gọn thui nhá :v)

```python
subtract = lambda x, y : x-y 
subtract(5, 4) 
```

### Lặp String N lần

Bình thường ở những ngôn ngữ khác để làm việc này chúng ta sẽ sử dụng vòng lặp, nhưng python có một thủ thuật đơn giản liên quan đến một chuỗi và một số bên trong chức năng print. (Tưởng gì chứ Ruby cũng có)

```python
str ="Point";
print(str * 3);
```

Output:

> PointPointPoint



Mình mới bắt đầu học nên mới chỉ tìm hiểu cái hay của ngôn ngữ, lần sau mình sẽ trở lại và lợi hại hơn với những điểm hay của framework Django. Rất cảm ơn mọi người đã đọc bài viết của mình (bow)