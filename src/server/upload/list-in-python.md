> Mình cũng đang trong quá trình học về ngôn ngữ Python. Mình viết lên đây vừa thỏa mãn niềm đam mê viết lách vừa là cách hệ thống lại kiến thức. Hy vọng sẽ có ích cho ai đó.
### 1. Khái niệm
List trong Python là một dạng dữ liệu cho phép lưu trữ **nhiều kiểu dữ liệu khác nhau**. Và ta có thể truy xuất đến các phần tử bên trong nó thông qua vị trí của phần tử đó trong list.
Để khai báo một list trong Python thì chúng ta sử dụng cặp dấu ngoặc vuông [] và bên trong là các giá trị của list.
### 2. Cách truy cập đến các giá trị trong list
Để truy cập đến các giá trị trong list sử dụng cú pháp: 
```
list[index]
```
Trong đó: 
* ***list***: là tên của biến chứa List
* ***index***: là vị trí của giá trị trong list bạn muốn lấy ra. <br> Index sẽ được tính theo thứ tự như sau: 
<br> ![](https://images.viblo.asia/3fea1156-11f5-4880-8211-05878c92ed4e.png)
<br> Ví dụ: 
<br>![](https://images.viblo.asia/8207b856-d56d-4472-9f21-62dc1f17df17.png)
<br>Nếu muốn truy cập đến một phần của list sử dụng cú pháp: 
```
list[start:end]
```
Trong đó: 
* ***list***: là tên của biến chứa List
* ***start***: là ví trí bắt đầu lấy ra list con. Nếu để trống thì nó sẽ lấy từ đầy list.
* ***end***: là vị trí kết thúc. Nếu để trống thì nó sẽ lấy đến phần tử cuối cùng của list.
<br> Ví dụ: 
<br>![](https://images.viblo.asia/d25e67cc-fc01-4800-b219-06fe82f6ed54.png)
### 3. Concatenate lists
Để nối các list lại với nhau ta thực hiện như với các chuỗi. 
<br>Dùng + để gộp chuỗi. Dùng * nếu muốn lặp
<br>Note: Concat list tạo ra list mới, không phải chuỗi. 
Ví dụ: 
![](https://images.viblo.asia/f89d69bf-40a5-4239-92fe-d3e270dc3e5e.png)
### 4. Update phần tử trong list
* Có thể thay đổi giá trị của một hoặc nhiều phần tử trong list như sau:
 <br> ![](https://images.viblo.asia/e85ce1f7-735a-4d06-845a-1853ab286db8.png)

* Hoặc thêm phần tử vào cuối List sử dụng phương thức append()
<br>![](https://images.viblo.asia/08de269c-339f-4bd7-b144-14dd07fdae66.png)
* Hoặc xóa và trả về phần tử ở cuối List sử dụng phương thức pop()
<br> VD1:
<br>![](https://images.viblo.asia/84b6ecdc-2757-4659-bee3-11b6d5c4ce5e.png)
<br> VD2:
<br>![](https://images.viblo.asia/ae1b24e3-1fc8-4ca4-aa57-b7312738e37e.png)
<br> VD3: Có thể dùng phương thức pop() để xóa 1 vị phần tử bất kì trong list với điều kiện thêm index.
<br>![](https://images.viblo.asia/50d24754-d53c-44be-905d-d6353f67ac1c.png)
### 5. Sort()
* Phương thức sort() cho phép sắp xếp lại các phần tử của list. 
* Note: Có một lưu ý là không gán kết quả trả về list.sort() vào 1 biến vì giá trị của biến đó sẽ là None. Các bạn xem ví dụ nhé:
<br>VD1: Sắp xếp các phần tử của list
<br> ![](https://images.viblo.asia/d06907d0-05c0-4848-b5ba-04ba6bed4ab4.png)
<br> VD2: Không gán kết quả trả về list.sort() vào 1 biến
<br> ![](https://images.viblo.asia/95a984f6-d227-4c36-854e-d9f9d6bdd892.png)
<br> khi đó phải sử dụng như sau: 
<br> ![](https://images.viblo.asia/1ec1b3fe-cb55-4c63-893c-8e2fa0e8fc0a.png)
* Vẫn có thể từ khóa reverse cho sort()
<br> VD: 
<br> ![](https://images.viblo.asia/de26ca6b-0c5e-4361-9628-0025d3eb14de.png)

### 6. Bonus
**Bài toán 1**: 
<br>Có 1 list `b = ["Apple" ,"Banana","Cherry"]`. Bạn muốn thay đổi thứ tự của `"Apple"` và `"Cherry"` cho nhau. Bằng cách nào? 
<br> >  Ta có thể làm như sau: 
```php

temp = b[0]
b[0] = b[2]
b[2] = temp
print(b)

```
<br>![](https://images.viblo.asia/921ae224-1ae4-41a4-883f-0f5f93f80c78.png)
<br> > hoặc có cách khác hay hơn nè:
```php

b[2] , b[0] = b[0] , b[2]

```
![](https://images.viblo.asia/ff05d206-130b-475a-89cd-3505dde97276.png)

### Tài liệu tham khảo: 
https://toidicode.com/list-trong-python-346.html
<br>...mình sẽ update tiếp sau nhé!