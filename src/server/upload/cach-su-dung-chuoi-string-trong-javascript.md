# Cách sử dụng chuỗi (String) trong JavaScript
### 1) Chuỗi là gì?
* Chuỗi (hay còn gọi được là chuỗi ký tự) là một dãy các ký tự.

**Ví dụ:**



|Hoc |  Chuỗi gồm 3 ký tự|
| -------- | -------- | -------- |
|Hoc Chuoi |  Chuỗi gồm 8 ký tự|
|Tai lieu hoc |  Chuỗi gồm 12 ký tự|
|Tai lieu hoc JavaScript |  Chuỗi gồm 23 ký tự|
||  Chuỗi rỗng|

***

> **Chuỗi mà không chứa ký tự thì được gọi là chuỗi rỗng**

### 2) Cách viết một chuỗi

 *  Trong JavaScript, chuỗi phải được đặt bên trong cặp dấu nháy kép " " hoặc cặp dấu nháy đơn ' '


```
Ví dụ
--------------------------------------------------------------------------------------------------------------
<script>
    var a = "HTML và CSS"; //Biến a có giá trị là chuỗi HTML và CSS
    
    var b = 'Tài liệu JavaScript'; //Biến b có giá trị là chuỗi Tài liệu JavaScript
    
    var c = ""; //Biến c có giá trị là một chuỗi rỗng

</script>
```

[**Kết quả**](https://codepen.io/anon/pen/NmwLRv#anon-login)

* Hai dấu dùng để đặt xung quanh chuỗi phải cùng một loại, nếu khác loại sẽ dẫn đến sai cú pháp làm chương trình bị lỗi.
* 

```
Ví dụ
-------------------------------------------------------------------------------------------------------------------
<script>
    var a = "Tài liệu học JavaScript'; //SAI
    var b = 'Tài liệu học JavaScript"; //SAI
</script>
```

* Nếu chuỗi được đặt bên trong cặp dấu nháy kép thì chuỗi không được chứa ký tự là dấu nháy kép (tuy nhiên chuỗi được chứa ký tự là dấu nháy đơn).
* Tương tự, nếu chuỗi được đặt bên trong cặp dấu nháy đơn thì chuỗi không được chứa ký tự là dấu nháy đơn (tuy nhiên chuỗi được chứa ký tự là dấu nháy kép).

```
Ví dụ
-------------------------------------------------------------------------------------------------------------------
<script>
    var a = "Tài liệu học " JavaScript"; //SAI
    var b = 'Tài liệu học ' JavaScript'; //SAI
    var c = "Tài liệu học ' JavaScript"; //ĐÚNG
    var d = 'Tài liệu học " JavaScript'; //ĐÚNG
</script>
```

# 3) Cách nối các chuỗi lại với nhau
* Ta có thể nối hai hoặc nhiều chuỗi lại với nhau thành một chuỗi bằng cách sử dụng **toán tử +**

```
Ví dụ
-------------------------------------------------------------------------------------------------------------------
<script>
    var a = "Tài liệu" + " học " + "JavaScript";
</script>
```

[**Kết quả**](https://codepen.io/v-hu/pen/zXPJNe)

* Ở ví dụ trên, giá trị của biến a là một chuỗi được nối từ ba chuỗi **Tài liệu học  JavaScript** và cả ba chuỗi đều được đặt bên trong cặp dấu nháy kép. Điều đó không có nghĩa là để nối các chuỗi lại với nhau thì các chuỗi phải có cùng một loại dấu bao xung quanh, mà chỉ cần mỗi chuỗi viết đúng theo quy tắc là được.

```
Ví dụ
-------------------------------------------------------------------------------------------------------------------
<script>
    var a = 'Tài liệu' + ' học ' + "JavaScript";
</script>

```
[**Kết quả**](https://codepen.io/v-hu/pen/zXPJNe)

* Nếu giá trị của biến là một chuỗi thì biến đó cũng có thể sử dụng trong việc nối chuỗi.

```
Ví dụ
-------------------------------------------------------------------------------------------------------------------
<script>
    var a = "Tài liệu";
    var b = "Javascript";
    var c = a + " học " + b;
    document.write(c);
</script>
```

[**Kết quả**](https://codepen.io/v-hu/pen/xeParo)

# 4) Cách ngắt ký tự xuống dòng

* Đôi khi viết mã lệnh mà một chuỗi quá dài sẽ dẫn đến việc khó quan sát. Để khắc phục vấn đề này, ta có thể ngắt ký tự trong chuỗi xuống dòng bớt bằng cách đặt dấu gạch chéo ngược \ ở chỗ muốn ngắt xuống dòng.

```
Ví dụ
-------------------------------------------------------------------------------------------------------------------
<script>
    var a = "Đôi khi viết mã lệnh mà một chuỗi quá dài\
             sẽ dẫn đến việc khó quan sát.\
             Để khắc phục vấn đề này, ta có thể\
             ngắt bớt ký tự trong chuỗi xuống dòng\
             bằng cách đặt dấu gạch chéo ngược ở chỗ\
             muốn ngắt xuống dòng";
</script>
```

[**Kết quả**](https://codepen.io/v-hu/pen/BEmOwZ)


* Nếu là trường hợp nối chuỗi thì không cần dùng đến dấu gạch chéo ngược.


```
Ví dụ
-------------------------------------------------------------------------------------------------------------------
<script>
    var a = "Đôi khi viết mã lệnh mà một chuỗi quá dài " +
            "sẽ dẫn đến việc khó quan sát. " +
            "Để khắc phục vấn đề này, ta có thể " +
            "ngắt bớt ký tự trong chuỗi xuống dòng " +
            "bằng cách đặt dấu gạch chéo ngược ở chỗ " +
            "muốn ngắt xuống dòng";
</script>
```

[**Kết quả**](https://codepen.io/v-hu/pen/JVOarg)

# 5) Các ký tự đặc biệt

* Ký tự đặc biệt là những ký tự mà khi nó được viết vào bên trong một chuỗi sẽ có nguy cơ làm ảnh hưởng đến cú pháp của chuỗi, khiến câu lệnh bị lỗi.

* Ví dụ, trong phần Cách viết một chuỗi chúng tôi có nói đến việc *"nếu chuỗi được đặt bên trong cặp dấu nháy kép thì chuỗi không được chứa ký tự là dấu nháy kép" hoặc "nếu chuỗi được đặt bên trong cặp dấu nháy đơn thì chuỗi không được chứa ký tự là dấu nháy đơn",* bởi vì chúng là những ký tự đặc biệt.
* Dưới đây là ví dụ minh họa phân tích cho bạn thấy tại sao !?

![](https://images.viblo.asia/56c97b7c-e8c2-496c-8417-7e61fba4707a.PNG)

* Chúng ta có một giải pháp để có thể viết được ký tự đặc biệt trong chuỗi, đó chính là đặt dấu gạch chéo ngược phía trước ký tự đặc biệt.

```
Ví dụ
-------------------------------------------------------------------------------------------------------------------

<script>
    var a = "Tài liệu hướng dẫn\" học JavaScript";
</script>
```

[**Kết quả**](https://codepen.io/v-hu/pen/qwVMpB)

* Dưới đây là ba ký tự đặc biệt thường được sử dụng nhất trong chuỗi:






| Ký tự đặc biệt | Cách viết trong chuỗi | 
| -------- | -------- | -------- |
| "    | 	\"    |
|'    |  \\'   |
| \     | \\ \|

# 6) Đếm số lượng ký tự trong chuỗi

* Chúng ta có thể xác định được số lượng ký tự trong một chuỗi bằng cách truy cập vào thuộc tính length của chuỗi đó.

```
Ví dụ
-------------------------------------------------------------------------------------------------------------------

<script>
    var a = "Tai lieu hoc JavaScript";
    var num1 = a.length; //23 ký tự
    var num2 = "HTML".length; //4 ký tự
</script>
```

[**Kết quả**](https://codepen.io/v-hu/pen/KYyxoe)

> Hẹn bạn bài tiếp tiếp theo mình sẻ giởi thiệu về lệnh **"switch case"** trong JavaScript nhé ...:writing_hand::grinning: