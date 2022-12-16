Trong lập trình, một hàm là một chuỗi các câu lệnh nhằm thực thi công việc nào đó và có thể được sử dụng lại nhiều lần.

### 1. Gọi hàm:
Để gọi một hàm đã khai báo, ta sử dụng cú pháp:
name(parameters)

Trong đó:
* name : là tên của hàm chúng ta muốn gọi.
* parameter: là các tham số chúng ta muốn truyền vào trong hàm.

Ví dụ:
![](https://images.viblo.asia/d784ede4-9bd5-4f1f-b475-8b7e8e14e2c7.png)

ở ví dụ trên: 
- type là tên hàm
- 30 là tham số truyền vào trong hàm

### 2. Hàm toán học:
Python có một thành phần (module) toán học cung cấp hầu hết các hàm toán học quen thuộc. 
Trước khi sử dụng hàm trong module thì chúng ta phải nhập tham số cho nó
vd:

```>>> import math```

khi đó chương trình sẽ tạo ra một module tên "math" và module sẽ bao gồm các hàm và các giá trị được định nghĩa trong module. để sử dụng một trong các hàm, bạn phải định nghĩa tên của module và tên của hàm, cách nhau bởi dấu chấm.

![](https://images.viblo.asia/49dc00af-1c8e-4798-9325-085814feed9e.png)

### 3. Tạo hàm mới:
Ngoài việc sử dụng các hàm có sẵn của Python, chúng ta cũng có thể tự tạo hàm mới bằng việc sử dụng def.

ví dụ:

  ```
  def hienthi(ten):
          print("Hello" + " " + ten + "!")
  ```
  Khi chạy hàm này sẽ cho ra kết quả:
  >Hello Viet !
  
Cú pháp của việc tạo hàm mới sẽ là:
``` 
def ten_ham(thamso):
        lenh_chay
```        

### 4. Xử lý chuỗi:
- Với các chuỗi ký tự ta có thể khai báo bằng dấu nháy " hoặc '.
>word1 = "test"
>
>word2 = 'test'

Có thể truy xuất từng ký tự trong chuỗi, vd:

![](https://images.viblo.asia/86781949-e527-4400-9f2b-ea11771e6309.png)

hay truy suất chuỗi ký tự:


![](https://images.viblo.asia/da113a2c-686a-4ffe-b82d-1a415d4defd5.png)

- Để nối chuỗi, ta có thể sử dụng cú pháp:

>string = string1 + " " + string2

- Lấy độ dài chuỗi, ta sử dụng hàm len()

![](https://images.viblo.asia/3c65141f-d073-40cc-962a-3d82c2eae6b3.png)

- Tìm và thay thế ký tự trong chuỗi sử dụng hàm replace(search, replace[, max])

![](https://images.viblo.asia/7c774a4b-705b-4486-bdc1-6f8b5c1b385c.png)

- Tách chuỗi ta sử dụng 
> split(str="", num=string.count(str))

![](https://images.viblo.asia/62393520-4328-4e6a-913f-877c40e98f24.png)

### 5. Mảng:
Theo wiki thì định nghĩa thì mảng là một tập hợp các phần tử cố định có cùng một kiểu, được lưu trữ liên tiếp nhau trong các ô nhớ. Kiểu phần tử có thể là có các kiểu bất kỳ: ký tự, số, chuỗi ký tự…; cũng có khi ta sử dụng kiểu mảng để làm kiểu phần tử cho một mảng.

Ví dụ:

numbers = [1, 5, 10, 100, 1000]
names = ['son', 'cuong', 'tuan', 'viet']

Thứ tự vị trí trong mảng được đánh số từ 0, vậy ta có thể truy xuất từng phần tử của mảng bằng cách:

![](https://images.viblo.asia/c44da09a-d4e7-4843-9ad2-d0754f092ac9.png)

* Kiểm tra phần tử trong mảng sử dụng toán tử in/not in

![](https://images.viblo.asia/18bd479f-ff1d-4473-86ab-660763d8a025.png)

* Trích xuất mảng con:
Mặc định nếu không ghi gì thì bắt đầu từ vị trí 0 và kết thúc ở vị trí cuối

![](https://images.viblo.asia/373e475f-6db4-4682-92b4-436e7a061732.png)

* Xóa phần tử của mảng:

![](https://images.viblo.asia/1ebd3c54-6ee9-4e98-aa69-0ad34136ec29.png)

Ngoài ra mình cũng có thể xóa nhiều phần tử một lúc

![](https://images.viblo.asia/317d5278-8687-451d-b145-860c540c7352.png)

* Nối 2 mảng
Để nối 2 mảng ta sử dụng toán tử + để nối giá trị 2 mảng.

![](https://images.viblo.asia/d402e221-7eda-4084-8eeb-3c8b85113a99.png)

* Thêm phần tử vào mảng
Để thêm phần tử vào cuối mảng, ta dùng phương thức append()

![](https://images.viblo.asia/eafba456-e986-4e1f-8ffe-80e04c3c5b1d.png)

* Sắp xếp giá trị các phần tử
Sử dụng phương thức list.sort([func]) để sắp xếp, mặc định sắp xếp sẽ theo thứ tự tăng dần.

![](https://images.viblo.asia/9483160c-4861-4d7d-8fc9-df70dc655b4e.png)

### 6. Tuple
Tuple cũng là một mảng nhưng có giá trị không thay đổi được và không hỗ trợ các phương thức append(), del ... tuy nhiên vẫn hỗ trợ các phương thức truy xuất như : tìm kiếm, ...

## 7. Dictionary
Dictionary cũng là một cấu trúc mảng, nhưng các phần tử bao gồm key và value. Một Dictionary được khai báo bằng cặp dấu {...}

> dic = {'a' : 1, 'b' : 2 }

Truy xuất một giá trị sẽ dựa vào key của đối tượng:

![](https://images.viblo.asia/9fa36115-1240-40b2-a545-ac7cc7f3ccf1.png)

Để thêm một phần tử vào đối tượng đã khai báo, sử dụng cấu trúc dict[key] = value

![](https://images.viblo.asia/6f5de05c-da77-410a-bd2f-c8dc9dc4dfa0.png)