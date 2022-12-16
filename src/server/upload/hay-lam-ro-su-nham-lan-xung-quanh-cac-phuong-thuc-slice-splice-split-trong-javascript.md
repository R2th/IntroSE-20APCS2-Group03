Các phương thức có sẵn của JavaScript giúp chúng ta rất nhiều trong khi lập trình, khi mà chúng ta hiểu chúng một cách chính xác. Tôi muốn giải thích ba phương thức dễ gây nhầm lẫn trong bài viết này đó là: slice (), splice () và split (). Có lẽ vì việc đặt tên của chúng quá giống nhau nên chúng thường bị nhầm lẫn, ngay cả trong số các dev có kinh nghiệm.

<br>
Nào hãy bắt đầu…

## Mảng trong JavaScript
Thứ nhất, bạn cần hiểu cách các mảng JavaScript hoạt động như thế nào. Giống như các ngôn ngữ lập trình khác, tôi sử dụng các mảng để lưu trữ nhiều dữ liệu trong JS. Nhưng sự khác biệt là các mảng JS có thể chứa các loại dữ liệu khác nhau cùng một lúc.

<br>
Đôi khi chúng ta cần thực hiện các thao tác trên các mảng. Sau đó, chúng tôi sử dụng một số phương thức JS như slice () & splice (). Bạn có thể xem bên dưới cách khai báo một mảng trong JavaScript:

```
let newArray = [];   // khởi tạo mảng trong JS
```
Bây giờ, hãy khai báo một mảng khác với các kiểu dữ liệu khác nhau. Tôi sẽ sử dụng nó dưới đây trong ví dụ:

```
let array = [1, 2, 3, "hello world", 4.12, true];
```

Một mảng với các kiểu dữ liệu khác nhau: chuỗi, số và boolean được xem là hợp lệ trong JavaScript.

## Slice()

Phương thức **slice()** sao chép một phần nhất định của một mảng và trả về phần được sao chép đó thành một mảng mới. **Và nó làm không thay đổi thành phần của mảng ban đầu.**

```
array.slice(from, until);
```
* From: Vị trí bắt đầu của phần từ bị cắt trong mảng.
* Until: Số phần từ bị cắt tiếp theo bắt đầu từ vị trí *"from"*

Ví dụ, tôi muốn cắt ba phần tử đầu tiên từ mảng trên. Vì phần tử đầu tiên của mảng luôn được lập vị trí 0 và tôi thay “from” bằng 0.

```
array.slice(0, until); 
```

Bây giờ khi tôi muốn cắt ba phần tử đầu tiên, tôi thay thế tham số *"until"* bằng 3.

```
let newArray = array.slice(0, 3);   // Giá trị trả về cũng là một mảng
```

Cuối cùng, tôi gán Array đã cắt cho biến newArray. Bây giờ chúng ta hãy xem kết quả:
![](https://cdn-images-1.medium.com/max/800/1*UECVH_JWknae04kVqTr1gg.png)

![](https://cdn-images-1.medium.com/max/800/1*YImz2x-CAY-8wqoyT8c6eA.png)

> Lưu ý: phương thức Slice() cũng có thể được sử dụng cho các chuỗi.


## Splice()
Tên của hàm này rất giống với **slice()**. Sự tương đồng về đặt tên này thường gây nhầm lẫn cho các lập trình viên. Phương thức **splice()** thay đổi một mảng, bằng cách thêm hoặc loại bỏ các phần tử từ nó. Hãy xem cách thêm và xóa các phần tử bằng **slice()**:

### Xóa phần tử
Để xóa các phần tử, chúng ta cần cung cấp tham số vị trí bắt đầu và số lượng các phần tử cần xóa:
```
array.splice(index, number of elements);
```

**index** là điểm bắt đầu để xóa các phần tử. Các phần tử có số vị trí nhỏ hơn từ **index** sẽ không bị xóa:
```
array.splice(2);  // mọi phần tử bắt đầu từ vị trí thứ 2, sẽ bị xóa
```
Nếu bạn không truyền tham số thứ hai, mọi phần tử từ vị trí bắt đầu của mảng sẽ bị xóa khỏi mảng đó:

![](https://cdn-images-1.medium.com/max/800/1*OGTbYRkU4C_5iMF5Sw9lBA.png)

Ví dụ thứ hai, tôi đưa tham số thứ hai là 1, vì vậy các phần tử bắt đầu từ vị trí thứ 2 sẽ bị xóa từng cái một mỗi lần chúng ta gọi phương thức **splice()**:
```
array.splice(2, 1);
```
Mảng ban đầu:
![](https://cdn-images-1.medium.com/max/800/1*uCZHAfeq46dG182y6oHrpg.png)

kết quả sau khi gọi lần 1:
![](https://cdn-images-1.medium.com/max/800/1*gMh3g8RLvpAjMGxgfanB8w.png)

kết quả sau khi gọi lần 2:
![](https://cdn-images-1.medium.com/max/800/1*6YWBPU0UsPeoJTcwn8-gWg.png)

### Thêm phần tử

Để thêm các phần tử, chúng ta cần cung cấp các phần tử cho chúng như là các tham số thứ 3, thứ 4, thứ 5 (phụ thuộc vào số lượng cần thêm) vào phương thức **splice()**:

```
array.splice(index, number of elements, element, element);
```

Ví dụ, tôi sẽ thêm a và b vào phần đầu của mảng và tôi không xóa gì cả:
```
array.splice(0, 0, 'a', 'b');  
```
![](https://cdn-images-1.medium.com/max/800/1*E7TMFWTYGJDkuhG3VrTCKw.png)

## Split()

Các phương thức **Slice()** và **splice()** dành cho các mảng. Phương thức **split()** được sử dụng cho các chuỗi. Nó chia một chuỗi thành các chuỗi và trả về chúng như một mảng. Nó có 2 tham số, và cả hai đều là tùy chọn.

```
string.split(separator, limit);
```

* **Separator**: Xác định cách chia chuỗi… bằng dấu phẩy, ký tự, v.v.
* **Limit**: Giới hạn số lần chia tách

Phương thức **split()** không hoạt động trực tiếp cho các mảng. Tuy nhiên, trước tiên chúng ta có thể chuyển đổi các phần tử của mảng thành chuỗi, sau đó chúng ta có thể sử dụng phương thức **split()**.

```
let myString = array.toString();
```
![](https://cdn-images-1.medium.com/max/800/1*JW9u0vQSmZM6wQ540w3eTg.png)

Bây giờ, hãy chia myString bằng **dấu phẩy**, giới hạn chúng thành ba phần tử và trả về chúng dưới dạng mảng:

```
let newArray = myString.split(",", 3);
```

![](https://cdn-images-1.medium.com/max/800/1*v53Ct4WVDXNsCjzDAtpc_g.png)

Như chúng ta có thể thấy, myString được phân tách bằng **dấu phẩy**. Vì chúng ta giới hạn chia thành 3, chỉ có 3 phần tử đầu tiên được trả về.

> Chú ý: Chúng ta có một cách sử dụng phương thức này như sau: **array.split ("");** kết quả trả về là mỗi ký tự của chuỗi sẽ được chia thành các phần tử:

![](https://cdn-images-1.medium.com/max/800/1*s7RYTgCHVGzZKXDJZYyjaQ.png)

## Tổng kết
### Slice() 

* Sao chép các phần tử từ một mảng.
* Trả về chúng dưới dạng mảng mới.
* Không thay đổi mảng ban đầu.
* Bắt đầu cắt từ ... cho đến khi chỉ mục đã cho: **array.slice(from, until)** .
* Slice không bao gồm tham số chỉ mục **“until”** .
* Có thể được sử dụng cho cả mảng và chuỗi.

### Splice()

* Được sử dụng để thêm / xóa các phần tử khỏi mảng.
* Trả về một mảng các phần tử đã xóa.
* Thay đổi mảng Để thêm các phần tử: **array.splice(index, number of elements, elements)** .
* Để loại bỏ các phần tử: **array.splice(index, number of elements)** .
* Chỉ có thể được sử dụng cho mảng.

### Split()

* Chia chuỗi thành chuỗi.
* Trả về chúng trong một mảng. 
* Lấy 2 tham số, cả hai tham số là tùy chọn: **string.split(separator, limit)** .
* Không thay đổi chuỗi gốc.
* Chỉ có thể được sử dụng cho chuỗi.

<br>
Có nhiều phương thức tích hợp khác cho các mảng và chuỗi JavaScript. Nếu bạn tìm hiểu cách sử dụng, những phương pháp này giúp việc lập trình của bản rễ ràng hơn.

<br>
Thank you for reading!

[Nguồn tham khảo](https://medium.freecodecamp.org/lets-clear-up-the-confusion-around-the-slice-splice-split-methods-in-javascript-8ba3266c29ae)