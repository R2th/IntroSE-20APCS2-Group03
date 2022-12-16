# Đối tượng toán học Math trong JavaScript

- Trong JavaScript có một đối tượng được xây dựng sẵn tên là Math. Đối tượng Math sẽ có các phương thức, với việc truy cập vào các phương thức đó, ta có thể thực hiện được những công việc toán học trên các con số, ví dụ như: *lấy giá trị tuyệt đối của một số, tính căn bậc hai của một số, tìm số lớn nhất, tìm số nhỏ nhất, làm tròn số, ....*
-  Dưới đây là danh sách các phương thức thường được sử dụng nhất của đối tượng Math:



| Phương thức | Mô tả chức năng |
| -------- | -------- | -------- |
| abs()    | Trả về giá trị tuyệt đối của một số    |
| random()    | Trả về một số ngẫu nhiên trong khoảng từ 0 đến 1  |
| sqrt()    | Trả về căn bậc hai của một số     |
|pow()    | Trả về lũy thừa của hai số xác định     |
| ceil()   | Làm tròn một số lên số nguyên gần nó nhất    |
| floor()     | Làm tròn một số xuống số nguyên gần nó nhất     |
| round()    | Làm tròn một số đến số nguyên gần nó nhất    |
| max()    | Trả về số lớn nhất trong danh sách     |
| min()    | Trả về số nhỏ nhất trong danh sácht    |


## 1) Phương thức abs()


* Phương thức abs() dùng để trả về giá trị tuyệt đối của một số.
* Lưu ý, phương thức abs() sẽ:

1. Trả về 0 nếu giá trị ban đầu là null
2. Trả về NaN nếu giá trị ban đầu không phải là một số

### Ví dụ :

```
<script>
    var a = Math.abs(8.75); //Trả về 8.75
    var b = Math.abs(-8.75); //Trả về 8.75
    var c = Math.abs(null); //Trả về 0
    var d = Math.abs("JavaScript"); //Trả về NaN
    var e = Math.abs(-7+3); //Trả về 4
</script>
```

### [Kết Quả ](https://codepen.io/v-hu/pen/EBgBmV)

## 2) Phương thức random()
* Phương thức random() dùng để trả về một số ngẫu nhiên trong khoảng từ 0 đến 1

### Ví dụ :
```
<!DOCTYPE html>
<html>
<body>

    <script>
        var a = Math.random();
        document.write(a + "<br>");
    </script>

</body>
</html>
```

> *  Lưu ý: Phương thức random() có thể trả về số 0, nhưng không bao giờ trả về số 1
### [Kết Quả ](https://codepen.io/v-hu/pen/JQRQyK)


## 3) Phương thức sqrt(x)

* Phương thức sqrt() dùng để trả về giá trị căn bậc hai của một số.
*  Lưu ý: Phương thức sqrt() sẽ trả về NaN nếu giá trị ban đầu là số âm.

### Ví dụ :
```
<!DOCTYPE html>
<html>
<body>

    <script>
        var a = Math.sqrt(0);
        var b = Math.sqrt(1);
        var c = Math.sqrt(4);
        var d = Math.sqrt(81);
        var e = Math.sqrt(49);
        var f = Math.sqrt(-4);

        document.write(a + "<br>");
        document.write(b + "<br>");
        document.write(c + "<br>");
        document.write(d + "<br>");
        document.write(e + "<br>");
        document.write(f + "<br>");
    </script>

</body>
</html>
```

### [Kết Quả](https://codepen.io/v-hu/pen/agmgEN)


## 4) Phương thức pow()
*  Phương thức pow() dùng để trả về lũy thừa của hai số xác định.
*  Cú pháp:
*  `Math.pow(x,y); //tương đương với xy trong đại số`

### Ví dụ :


```
<!DOCTYPE html>
<html>
<body>

    <script>
        var a = Math.pow(5,2);
        document.write(a);
    </script>

</body>
</html>
```

### [Kết Quả](https://codepen.io/v-hu/pen/EBgBpy)

## 5) Phương thức ceil()

* Phương thức ceil() dùng để làm tròn một số lên số nguyên gần nó nhất.
* Lưu ý: Nếu giá trị ban đầu là một số nguyên thì nó sẽ không được làm tròn.

### Ví dụ :
```
<!DOCTYPE html>
<html>
<body>

    <script>
        var a = Math.floor(3.60);
        var b = Math.floor(3.40);
        var c = Math.floor(3);
        var d = Math.floor(-3.60);
        var e = Math.floor(-3.40);
        var f = Math.floor(-3);

        document.write(a + "<br>");
        document.write(b + "<br>");
        document.write(c + "<br>");
        document.write(d + "<br>");
        document.write(e + "<br>");
        document.write(f + "<br>");
    </script>

</body>
</html>
```

### [Kết Quả](https://codepen.io/v-hu/pen/PrGryd)

## 6) Phương thức floor()
* Phương thức floor() dùng để làm tròn một số xuống số nguyên gần nó nhất.
* Lưu ý: Nếu giá trị ban đầu là một số nguyên thì nó sẽ không được làm tròn.

### Ví dụ :
```
<!DOCTYPE html>
<html>
<body>

    <script>
        var a = Math.floor(3.60);
        var b = Math.floor(3.40);
        var c = Math.floor(3);
        var d = Math.floor(-3.60);
        var e = Math.floor(-3.40);
        var f = Math.floor(-3);

        document.write(a + "<br>");
        document.write(b + "<br>");
        document.write(c + "<br>");
        document.write(d + "<br>");
        document.write(e + "<br>");
        document.write(f + "<br>");
    </script>

</body>
</html>
```

### [Kết Quả](https://codepen.io/v-hu/pen/vqXqvd)

## 7) Phương thức round(x)
* Phương thức round() dùng để làm tròn một số đến số nguyên gần nó nhất.
> (Tức là nếu một số nào đó có phần thập phần lớn hơn hoặc bằng 0.5 thì số đó sẽ được làm tròn lên, còn nếu phần thập phân nhỏ hơn 0.5 thì số đó sẽ bị làm tròn xuống. Lưu ý trường hợp nếu số là số âm thì khi phần thập phân lớn hơn 0.5 số sẽ được làm tròn xuống, còn nếu phần thập phần nhỏ hơn hoặc bằng 0.5 thì số sẽ được làm tròn lên)


* **Lưu ý**: Nếu giá trị ban đầu là một số nguyên thì nó sẽ không được làm tròn.

### Ví dụ :
```
 <script>
        var a = Math.round(3.60);
        var b = Math.round(3.50);
        var c = Math.round(3.49);
        var d = Math.round(-3.60);
        var e = Math.round(-3.50);
        var f = Math.round(-3.49);

        document.write(a + "<br>");
        document.write(b + "<br>");
        document.write(c + "<br>");
        document.write(d + "<br>");
        document.write(e + "<br>");
        document.write(f + "<br>");
    </script>
```

### [Kết Quả](https://codepen.io/v-hu/pen/zVKVbK)

## 8) Phương thức max()
* Phương thức max() dùng để trả về số lớn nhất trong danh sách các đối số.
* Cú pháp:

> Math.max(đối số thứ nhất, đối số thứ hai, đối số thứ ba, ...., đối số thứ n);
* **Lưu ý**, phương thức max() sẽ:

1. Trả về NaN nếu trong các đối số của phương thức max() có tồn tại đối số không phải là số.
2. Trả về -Infinity nếu phương thức max() không có đối số.

### Ví dụ :
```
<script>
    var a = Math.max(0, 16, -3, 5.25, 100, -1); //Trả về 100
    var b = Math.max(0, "JavaScript", -3, 5.25, 100, -1); //Trả về NaN
    var c = Math.max(); //Trả về -Infinity
</script>
```

### [Kết Quả](https://codepen.io/v-hu/pen/dBpBBJ)
## 9) Phương thức min()
* Phương thức min() dùng để trả về số nhỏ nhất trong danh sách các đối số.
* Cú pháp:

> Math.min(đối số thứ nhất, đối số thứ hai, đối số thứ ba, ...., đối số thứ n);
* **Lưu ý**, phương thức min() sẽ:

1. Trả về NaN nếu trong các đối số của phương thức min() có tồn tại đối số không phải là số.
2. Trả về Infinity nếu phương thức min() không có đối số.
### Ví dụ :
```
<script>
    var a = Math.min(0, 16, -3, 5.25, 100, -1); //Trả về -3
    var b = Math.min(0, "JavaScript", -3, 5.25, 100, -1); //Trả về NaN
    var c = Math.min(); //Trả về Infinity
</script>
```
### [Kết Quả](https://codepen.io/v-hu/pen/EBgBqZ)