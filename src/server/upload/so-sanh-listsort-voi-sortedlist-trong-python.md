# 1. Giới thiệu
Tìm hiểu kỹ hơn về các phương pháp sắp xếp danh sách tích hợp trong Python liên quan đến việc tiêu thụ bộ nhớ và hiệu suất thời gian
Trong python có 2 phương pháp sắp xếp thường dùng đối với 1 list đó là list.sort() và sorted(list). Vậy, phương pháp nào để sắp xếp danh sách hiệu quả hơn: Sử dụng hàm sorted sẵn trong Python hay dựa vào phương thức list.sort.
Bài toán đưa ra bắt đầu với một list chứa 1.000.000 số ngẫu nhiên (số nguyên) được xây dựng bằng module random:
```
import random
arr = [random.randint(0, 50) for r in range(1_000_000)]
```
Các số được tạo nằm trong phạm vi từ 0 đến 50 .
# 2. Tiêu thụ bộ nhớ
Chúng ta hãy xem xét mức tiêu thụ bộ nhớ của cả hai chức năng. Chúng ta sử dụng module resource dựng sẵn để theo dõi mức sử dụng bộ nhớ tối đa. Vì resource module cho phép chúng ta theo dõi việc sử dụng bộ nhớ của một luồng, chúng ta đang chạy sắp xếp danh sách của chúng tôi trong một luồng riêng biệt. Bạn có thể sử dụng FunctionSniffingClass để sử dụng.

```
import random
import resource
import sys
import time

from sniffing import FunctionSniffingClass


def list_sort(arr):
    return arr.sort()


def sorted_builtin(arr):
    return sorted(arr)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Please run: python (sort|sorted)")
    elif sys.argv[1] == "sorted":
        func = sorted_builtin
    elif sys.argv[1] == "sort":
        func = list_sort
    else:
        sys.exit("Please run: python (sort|sorted)")

    # Lib Testing Code
    arr = [random.randint(0, 50) for r in range(1_000_000)]
    mythread = FunctionSniffingClass(func, arr)
    mythread.start()

    used_mem = 0
    max_memory = 0
    memory_usage_refresh = .005 # Seconds

    while(1):
        time.sleep(memory_usage_refresh)
        used_mem = (resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)
        if used_mem > max_memory:
            max_memory = used_mem

        # Check to see if the function call is complete
        if mythread.isShutdown():
            # Uncomment if yu want to see the results
            # print(mythread.results)
            break;

    print("\nMAX Memory Usage:", round(max_memory / (2 ** 20), 3), "MB")
 ```
 Chúng ta tạo hai hàm wrapper cho các hàm dựng sẵn để có thể chuyển chúng dưới dạng đối số cho FunctionSniffingClass. Chúng ta có thể chuyển trực tiếp hàm sorted tích hợp vào FunctionSniffingClass, nhưng chúng ta muốn có cùng cơ hội cho cả hai tích hợp. Hơn nữa, một số phân tích đối số dòng lệnh đơn giản được triển khai để có thể sử dụng nó đơn giản trong command line. Hãy xem kết quả:
 ```
 $ python memory_measurement/main.py sort
Calling the Target Function...
Function Call Complete

MAX Memory Usage: 23.371 MB
$ python memory_measurement/main.py sorted
Calling the Target Function...
Function Call Complete

MAX Memory Usage: 30.879 MB
 ```
 Như bạn có thể thấy, hàm sorted đã tiêu thụ thêm khoảng 32% bộ nhớ như phương thức list.sort. Điều này có thể dự đoán được vì cái sau sẽ sửa đổi danh sách tại chỗ, trong khi những cái đầu tiên luôn tạo ra một danh sách riêng.
 # 3. Tốc độ
 Để có thể tính thời gian thực hiện của cả hai chức năng trình wrapper,  chúng ta sử dụng module boxx của bên thứ ba. Sử dụng hàm timeit để tính thời gian thực thi
 ```
 import random

from boxx import timeit


def list_sort(arr):
    return arr.sort()


def sorted_builtin(arr):
    return sorted(arr)


def main():
    arr = [random.randint(0, 50) for r in range(1_000_000)]

    with timeit(name="sorted(list)"):
        sorted_builtin(arr)

    with timeit(name="list.sort()"):
        list_sort(arr)


if __name__ == "__main__":
    main()
 ```
 Hãy chắc chắn chạy hàm sort_builtin trước vì phương thức list.sort sắp xếp danh sách ngay tại chỗ, vì vậy hàm sorted sẽ không phải sắp xếp bất cứ thứ gì!
 Chạy đoạn code trên sẽ in kết quả sau:
 ```
 $ python main.py
"sorted(list)" spend time: 0.1104379
"list.sort()" spend time: 0.0956471
 ```
 Như bạn có thể thấy, phương thức list.sort nhanh hơn một chút so với hàm sorted, cùng xem mã bytecode để có kết quả:
 ![](https://images.viblo.asia/45722bf4-5d5c-45e4-905c-42516186adce.png)
 
 list.sort()
 ![](https://images.viblo.asia/974168dc-9600-44e9-a38b-e337cc9db80a.png)
 
 sorted(list)
 Cả hai hàm bytecode khá giống nhau. Sự khác biệt duy nhất là, hàm list_sort trước tiên tải danh sách, tải phương thức (sắp xếp) theo sau bằng cách gọi phương thức trong danh sách mà không có bất kỳ đối số nào, trong khi đó hàm sorted_builtin trước tiên tải hàm được sắp xếp sẵn, sau đó tải danh sách và gọi hàm được tải với danh sách làm đối số.
 
 list.sort có thể hoạt động với kích thước đã biết và các phần tử hoán đổi trong kích thước đó, trong khi được sắp xếp phải hoạt động với kích thước không xác định. Do đó, danh sách mới được tạo bởi sắp xếp cần phải được thay đổi kích thước nếu không đủ bộ nhớ khi nối thêm phần tử mới. Và điều này cần có thời gian!
 ```
 list.sort() tạo ra 1 list copy mới sau đó mới sort , do đó nhanh hơn nhưng tốn tài nguyên hơn
 ```
 Nguồn: https://medium.com/@DahlitzF/list-sort-vs-sorted-list-aab92c00e17