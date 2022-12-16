Như bài trước thì mình đã đi tìm hiểu qua cơ bản về python và chạy chương trình đầu tiên, chương trình muôn thủa Hello world. Nếu bạn nào chưa xem thì xem [tại đây](https://viblo.asia/p/gioi-thieu-ve-python-va-chuong-trinh-hello-world-924lJ3Ym5PM). Còn phần này mình sẽ đi qua về variable trong python. Let's go.

**Quy tắc đặt tên biến**

Đầu tiên thì chúng ta cùng lướt qua về quy tắc đặt tên biến. Làm gì thì cũng phải biết quy tắc của nó.

Quy tắc:

* Tên biến chỉ có thể chứa chữ cái, số và dấu gạch dưới _. Có thể bắt đầu bằng chữ cái hoặc dấu gạch dưới, nhưng không được bắt đầu bằng số. VD: `bien`, `_bien` nhưng không thể đặt là `1_bien`.
* Khoảng trống (space) không được cho phép khi đặt tên biến, nhưng bạn có thể sử dụng dấu gạch dưới để tách các từ.
* Khi đặt tên biến không được sử dụng từ khóa Python và tên của hàm. Các từ khóa trong python mà ta không thể đặt cho biến.

![](https://images.viblo.asia/a96a9944-980a-4724-9017-8df17a354aae.png)

**Các kiểu dữ liệu trong python**

5 kiểu dữ liệu chuẩn trong python là:

* Number
* String
* List
* Tuple
* Set
* Dictionary

Ta có thể sử dụng hàm type() để kiểm tra kiểu dữ liệu của biến

**Number**

Python hỗ trợ 5 kiểu dữ liệu numbers khác nhau:

* Int
* Float
* Long
* Complex (số phức)
* Fraction (số thập phân)
 
 Các phép toán cơ bản với kiểu number: +, -, /, *, %, //, **
 
 **String**
 
 Bên cạnh số, Python cũng có thể thao tác với chuỗi, được biểu diễn bằng nhiều cách. Chúng có thể được để trong dấu nháy đơn ('...') hoặc kép ("...") ("""...""") với cùng một kết quả. Các chuỗi có thể được lập chỉ mục với số thứ tự của ký thự trong chuỗi.
 
 `word = "Python"`
 
 `word[0] => P`
 
 `word[0:2] => "Py"`
 
 `word[2:5] => "tho"`
 
 Nối chuỗi sử dụng toán tử +.
 
 **List**
 
 Trong Python, list được biểu diễn bằng dãy các giá trị, được phân tách nhau bằng dấu phẩy, nằm trong dấu []. Các danh sách có thể chứa nhiều mục với kiểu khác nhau, nhưng thông thường là các mục có cùng kiểu (có vẻ giống array, nhưng khác với array là các phần tử có thể khác kiểu).
 `squares = [1, 4, 9, 16, 25]`
 
 `list = [1, "Hello", 9.6]`
 
 Index (chỉ mục) của list: để truy cập các phần tử của list chúng ta dùng chỉ mục, thứ tự của phần tử trong list để lấy ra. vd:
 
 ![](https://images.viblo.asia/847cc2df-ea37-47a3-b71d-1a77be49d4a9.png)

Các phương thức khác:
![](https://images.viblo.asia/f3ea188e-9073-4001-b412-e665df772201.png)


Vì các kiểu dữ liêu trên các ngôn ngữ lập trình khác đều có nên mình sẽ viết nó ngắn gọn nhất. Còn 2 kiểu dữ liệu dưới đây là các kiểu dữ liệu chỉ có ở python.

**Tuple**

Tuple trong Python là một chuỗi các phần tử có thứ tự giống như list. Sự khác biệt giữa list và tuple là chúng ta không thể thay đổi các phần tử trong tuple khi đã gán, nhưng trong list thì các phần tử có thể thay đổi. Tuple thường được sử dụng cho các dữ liệu không cho phép sửa đổi.

Tuple thường được sử dụng cho các phần tử không cùng kiểu dữ liệu (khác nhau) và list thường sử dụng cho các phần tử có cùng kiểu dữ liệu. Việc Tuple không thay đổi khi sử dụng nên khi sử dụng sẽ đảm bảo rằng dữ liệu đó không bị thay đổi.

Tuple được tạo bằng cách đặt tất cả các phần tử của nó trong dấu ngoặc đơn (), phân tách bằng dấu phẩy. Bạn có thể bỏ dấu ngoặc đơn nếu muốn, nhưng nên thêm nó vào cho code rõ ràng hơn.

```
myTuple = (2, 4, 16, 256)
myTuple = 100, "nghiem tuan", 10.9
```

Tuple không bị giới hạn số lượng phần tử và có thể có nhiều kiểu dữ liệu khác nhau như số nguyên, số thập phân, list, string,...

Tạo tuple chỉ có một phần tử hơi phức tạp chút, nếu bạn tạo theo cách thông thường là cho phần tử đó vào trong cặp dấu () là chưa đủ, cần phải thêm dấu phẩy để chỉ ra rằng, đây là tuple.
![](https://images.viblo.asia/02b1f348-f785-4b84-b8bf-b7455f2db36e.png)

Để truy cập đến từng phần tử trong tuple cũng tương tự như list ta sử dụng []:
```
myTuple = (2, 4, 16, [50, 100])
print(myTuple[3][1]) //100
```

Không giống như list, tuple không thể thay đổi. Điều này có nghĩa là các phần tử của một tuple không thể thay đổi một khi đã được gán. Nhưng, nếu bản thân phần tử đó là một kiểu dữ liệu có thể thay đổi (như list chẳng hạn) thì các phần tử lồng nhau có thể được thay đổi.

![](https://images.viblo.asia/041fdafa-e3f6-44f9-abd8-e6a51a1d2759.png)

Các phần tử trong tuple không thể thay đổi nên chúng ta cũng không thể xóa, loại bỏ phần tử khỏi tuple. Nhưng việc xóa hoàn toàn một tuple có thể thực hiện được với từ khóa del.

```
del myTuple
```

-----

Kết luận bài này cũng khá dài rồi, về kiểu biến trong python còn 2 loại nữa là set và dictionary mình xin để lại cho số sau. :)