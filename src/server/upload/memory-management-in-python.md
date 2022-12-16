Với developer, việc hiểu quản lý bộ nhớ thường ít được nghĩ tới. Tuy nhiên, việc này rất quan trọng trong thực tế. Khi dữ liệu ít, ừ thì việc quản lý bộ nhớ nó không được quan tâm. Nhưng khi dự án phình to, dữ liệu nó nở ra nhiều, việc quản lý bộ nhớ không thể bỏ qua. Cái này cũng dễ hiểu, dữ liệu nhiều mà code không tối ưu được về memory, memory lại không nâng cấp dẫn tới ứng dụng chậm chạp hoặc xử lý sai nếu memory leaks. Nếu nâng memory, nó lại dẫn tới chi phí duy trì hệ thống tăng. Đều là vấn đề bất cập cả.

Đầu tiên, bộ nhớ vật lý sẽ được OS tạo ra một bộ nhớ ảo, nơi mà tất cả các ứng dụng, bao gồm cả Python có thể truy cập. Bộ nhớ ảo đó sẽ có trình bảo lý riêng do hệ diều hành làm chủ. Trình quản lý bộ nhớ OS sẽ cấp một đoạn bộ nhớ cho Python.

![](https://images.viblo.asia/8666338d-ee74-4df4-959f-634525ba5a9e.jpg)

Với Python, hầu như việc quản lý bộ nhớ sẽ do Python Memory Manager xử lý.

Với Python developer, phần quan trọng nhất của quản lý bộ nhớ là memory allocation. Memory allocation có 2 loại:

- Static Memory Allocation
- Dynamic Memory Allocation

Static Memory Allocation còn được gọi là Compile-time allocation. Nó được áp dụng cho variable static và variable global. Memory cho các variable được cấp phát tại thời điểm compilation. `Stack` được sử dụng để implement static allocation. Trong trường hợp này, memory không thể được sử dụng lại.

```c
static int a=10;
```

Dynamic Memory Allocation được áp dụng cho variable local, function argumen. Memory cho các variable được cấp phát tại thời điểm runtime. `Heap` được sử dụng để implement dynamic allocation. Trong trường hợp này, memory có thể được giải phóng.

```c
int *p;
p=new int;
```

> Everything in Python is an object.
> 

Đó là điểm hay của Python. Nó có nghĩa, Dynamic Memory Allocation mới chính là nên tảng của Python Memory Management. Khi object không còn cần thiết, Python Memory Management sẽ tự động lấy lại bộ nhớ đã bị object đó chiếm dụng.

Private heap chứa đựng toàn bộ Python objects và data structures. Python memory manager quản lý các private heap theo yêu cầu và developer không có kiểm soát các private heap này. Python memory manager cũng sẽ tương tác với system memory manager để đame bảo có đủ không gian cho private heap.

Python memory manager quản lý các khổi bộ nhớ, chúng được gọi là các `Blocks`. Các `Blocks` cũng size tạo lên `Pool`. Các pools được tạo lên trong `Arenas`. `Arenas` là phần lớn nhất của bộ nhớ và được liên kết trên một ranh giới trang trong bộ nhớ. Một khối bộ nhớ 256kB được phân bổ trên heap = 64 pools. Nếu object không cần thiết nữa, nó sẽ bị hủy và đất chỗ nó chiếm dụng sẽ được Python memory manager lấp đầy bằng một object khác cùng kích thước.

![](https://images.viblo.asia/feb115ea-d201-44d7-9c03-d447d04fe288.jpg)

Một điều quan trọng là Python memory manager không nhất thiết giải phóng bộ nhớ từ object bị destroyed trở lại OS. Có thể, nó sẽ trả lại cho python interpreter. Python cũng sẽ có một số lượng nhở các objects allocator được giữa lại để sử dụng thêm.

## Best Practices for Efficient Python Code

Mục đích của Practices là giúp Python code của bạn sử dụng memory một cách tối ưu hơn.

### Sử dụng join
 
 Ta có đoạn code:
 
```py
mymsg=’line1\n’
mymsg+=’line2\n’
```

Thay thế bằng:

```py
mymsg=[‘line1’,’line2']
‘\n’.join(mymsg)
```

### Tránh sử dụng `+` để nối các string

Lý do là bởi, string thì immutable, mỗi khi thêm một element vào string, Python sẽ tạo ra một string mới với một địa chỉ mới trên memory. Điều này sẽ làm memory cần được phân bổ mỗi lần thay string. Thay thế thì có thể chọn một số giải pháp:

```py
msg=’hello %s world’ % myvar
```

Hoặc:

```py
msg=’hello {} world’.format(myvar)
```

Từ bản `Python 3.5` trở đi, để tiện sử dụng, ta có thể sử dụng cách sau:

```py
msg=f’hello {myvar} world’
```

### Sử dụng Generators

Thông thường thì một hàm thường sẽ `return` về dữ liệu và hủy khi kết thúc. Nhưng nếu ta muốn `yield` về một giá trị và tiếp tục gọi lại hàm và nhận một giá trị khác. Điều này có ý nghĩa gì ?? Nếu bạn có một big dataset, bạn không phải chờ toàn bộ dữ liệu để có thể truy cập.

Ví dụ:

```py
def __iter__(self):
     return self._generator()
def _generator(self):
     for itm in self.items():
         yield itm
```

### Đặt evaluations ngoài loop

Ví dụ chuẩn mà bạn nên dùng:

```py
match_regex=re.compile(“foo|bar”)
for i in big_it:
     m = match_regex.search(i)
         ….
```

### Gán function cho một biến cục bộ

Python truy cập vào các variable local tốt hơn nhiều so với variable global.

```py
myLocalFunc=myObj.func
for i in range(n):
    myLocalFunc(i)
```

### Sử dụng built-in functions and libraries

Bạn nên sử dụng buil-in functions và libraries bất cứ lúc nào có thể. Lý do, bởi những functions/libraries đó được tối ưu tốt nhất cho performance.

Ví dụ:

```py
mylist=[]
for myword in oldlist:
      mylist.append(myword.upper())
```

Thay thế bằng:

```py
mylist=map(str.lower, oldlist)
```

### Sử dụng `itertools` thay thế loop

`itertools` tiết kiệm rất nhiều thời gian cho vòng loop.

Ví dụ:

```py
mylist=[]
for shape in [True, False]:
     for weight in (1, 5):
          firstlist=firstlist+function(shape, weight)
```

Thay thế bằng:

```py
from itertools import product, chain
list(chain.from_iterable(function(shape, weight) for weight, shape in product([True, False], range(1, 5))))
```

## Check for performance in Python code

Python hỗ trợ 2 modules: cProfile và Profile giúp việc check performance code.

```sh
python -m cProfile [-o output_file][-s sort_order](-m module | myscript.py)
```

## Tóm lại

Developer nên chú ý tới việc quản lý bộ nhớ. Nó giúp bạn tự tin hơn khi xử lý những project lớn và yêu cầu hiều năng cao.

Source: https://towardsdatascience.com/memory-management-in-python-6bea0c8aecc9