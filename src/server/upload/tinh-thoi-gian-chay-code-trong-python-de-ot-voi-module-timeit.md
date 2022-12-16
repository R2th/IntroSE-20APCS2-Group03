# Xin chào mọi người, hôm nay mình xin giới thiệu một module rất hữu dụng trong việc đo lường thời gian chạy các code snippet nhỏ: timeit.
## I. Các cách sử dụng
- Module timeit có thể được sử dụng qua CLI:

    Ex: 
    
    `python3 -m timeit 'print ([n**2 for n in range(1000)])'`
 - Hoặc có thể được gọi trong code Python:

      Ex:
```Python
      >>> import timeit
      >>> def some_computation():
      ...     arr = [n*2+1 for n in range(100)]
      ...     print(len(arr))
      ...
      >>> timeit.timeit(some_computation, number=500)
```
## II. Các hàm được cung cấp

### Như có thể thấy thì bằng việc gọi `timeit.timeit`, bạn đã có thể tính toán số thời gian chạy của 1 hàm. Module timeit cung cấp 3 hàm khá tiện lợi và 1 public class Timer.

1. Class `timeit.Timer(stmt='pass', setup='pass', timer=<timer function>, globals=None)`


Đây là phần khung xương của cả module. Hầu hết các hàm khác của module này đều chỉ là một hàm bọc ngoài cho class này. Class Timer có thể nhận vào vài tham số. Statement (`stmt`) - là đoạn code hoặc hàm mà bạn muốn thực thi, `setup` - là đoạn code mà 
muốn chạy để chuẩn bị 1 số thứ trước khi tính thời gian. Lưu ý là hai hàm này có thể là một chuỗi tách nhau bởi dấu `;` .

Ex: 

```Python
>>> timeit.timeit("a = 0; a += sum((n for n in range(100)))", number=5)
```

`timer` là hàm tính thời gian và được đặt mặc định là `<default timer>` của module. Cuối cùng, `globals ` là tham số dùng để xác định namespace mà bạn thực thi hàm ( mặc định là được thực thi trong namespace của timeit). 


2. Hàm `timeit.timeit(stmt='pass', setup='pass', timer=<default timer>, number=1000000, globals=None)`

Hàm này sẽ tạo ra 1 Instance của class `Timer`, rồi truyền vào class này các tham số mà class yêu cẩu như trên. Có thể thấy có một tham số mới là `number`, bạn có thể dùng tham số này để xác định số lần mà bạn sẽ chạy hàm. 

3. Hàm `timeit.repeat(stmt='pass', setup='pass', timer=<default timer>, repeat=5, number=1000000, globals=None)`

 Tương tự như trên thì hàm này cũng sẽ tạo ra 1 Instance của class `Timer`. với các tham số truyền vào. Lần này thêm 1 tham số là `repeat` bên cạnh `number`. Có thể thấy hai tham số `repeat` và `number` dễ gây ra rối. Bạn có thể hiểu hai tham số này như sau: `repeat` là số lần mà bạn chạy cả hàm `timeit`, còn `number` là số lần mà bạn chạy đoạn code mà bạn muốn đo lường. Ví dụ :
 
 ```Python
 >>> timeit.repeat("a = 0; a += sum((n for n in range(100)))", number=5, repeat=6)
[4.750300013256492e-05, 3.776699986701715e-05, 8.781899987297948e-05, 7.135699979698984e-05, 3.9323000237345695e-05, 3.5535999813873786e-05]
 ```
 
 Có thể thấy ở trên, hàm `timeit` được lặp lại 6 lần và trả ra 6 kết quả khác nhau, mỗi lần chạy, hàm `timeit` chạy đoạn code mà mình đã truyền vào 5 lần.
 
4. `timeit.default_timer()`
Hàm này sẽ xác định hàm `timer` của module, luôn luôn là `time.perf_counter()`.

## III. Chạy module từ CLI

Cú pháp chạy hàm timeit từ CLI như sau

```Python
python -m timeit [-n N] [-r N] [-u U] [-s S] [-h] [statement ...]
```

Các tham số theo thứ tự như sau:
- `-n` hoặc `--number=N`

    Số lần mà hàm timeit sẽ chạy đoạn code của bạn
- `-r` hoặc `--repeat=N`

    Số lần mà bạn muốn hàm timeit chạy
- `-s` hoặc `--setup=S`

    Đây sẽ là đoạn code mà bạn muốn chạy để setup những thứ cần thiết cho đoạn code được đo lường. 
- `-p` hoặc `--process`

    Đây là cách để sử dụng hàm tính thời gian khác `time.process_time()` thay vì hàm mặc định là `time.perf_counter()`
 - `-u` hoặc `--unit=U`
 
     Đơn vị thời gian mà bạn muốn hiển thị ra. Có thể dùng `nsec`, `usec`, `msec` hoặc `sec`

Đó là tóm tắt của mình về module timeit. Bạn có thể đọc thêm ở [đây](https://docs.python.org/3/library/timeit.html). Cảm ơn vì đã đọc và chúc bạn tính thời gian hàm chạy của mình vui vẻ.