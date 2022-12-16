# Cách sử dụng hàm (Function) trong JavaScript
## 1)Hàm là gì ?

*  Hàm là một tập hợp gồm nhiều câu lệnh, các câu lệnh này được sắp xếp theo một thứ tự xác định để xây dựng thành **một chức năng cụ thể**.
*  Mỗi hàm sẽ có một cái tên và hàm chỉ thực thi khi nó được gọi đến tên.

**Ví dụ:**
* Trong kịch bản bên dưới, chúng ta có một hàm tên là GioiThieuBanThan.
* Hàm này gồm ba câu lệnh với chức năng là hiển thị một câu giới thiệu về bản thân.

```
<script>
    function GioiThieuBanThan(){
        var name = "Em
        var year = 1996
        document.write("Tôi là " + name + " sinh năm " + year);
    }
</script>
```

* Một hàm có thể được gọi nhiều lần (hay nói cách khác là không giới hạn số lần gọi hàm).

**Ví dụ:**

* Trong kịch bản bên dưới, hàm GioiThieuBanThan được gọi đến ba lần


```
<script>

   function GioiThieuBanThan(){
        var name = "Em;
        var year = 1996
        document.write("Tôi là " + name + " sinh năm " + year);
    }

    GioiThieuBanThan(); //Gọi lần thứ nhất

    document.write("<hr>");

    GioiThieuBanThan(); //Gọi lần thứ hai

    document.write("<br>");

    document.write("<br>");

    GioiThieuBanThan(); //Gọi lần thứ ba

</script>
```


## 2)Phân loại hàm

* Hàm được chia làm hai loại cơ bản: **hàm không có tham số & hàm có tham số**
* Hàm không có tham số là hàm mà kết quả thực thi của nó luôn luôn không thay đổi.

**Ví dụ :**

* Hàm GioiThieuBanThan bên dưới là một hàm không có tham số
* Kết quả thực thi của nó luôn là hiển thị dòng chữ "Tôi là Em sinh năm 1996

```
<script>

   function GioiThieuBanThan(){
        var name = "Em";
        var year = 1996;
        document.write("Tôi là " + name + " sinh năm " + year);
    }

    GioiThieuBanThan(); //Tôi là Nhân sinh năm 1993

    GioiThieuBanThan(); //Tôi là Nhân sinh năm 1993

    GioiThieuBanThan(); //Tôi là Nhân sinh năm 1993

</script>
```


- **Hàm có tham số là** loại hàm mà khi gọi hàm ta phải truyền giá trị vào cho nó. Tùy vào giá trị được truyền mà hàm sẽ thực thi và cho ra kết quả khác nhau

**Ví dụ :**

* Hàm GioiThieuBanThan bên dưới là một hàm không có tham số
* Kết quả thực thi của nó luôn là hiển thị dòng chữ "Tôi là Nhân sinh năm 1993"


```
<script>

   function GioiThieuBanThan(){
        var name = "Em";
        var year = 1996;
        document.write("Tôi là " + name + " sinh năm " + year);
    }

    GioiThieuBanThan(); //Tôi là Em sinh năm 1996

    GioiThieuBanThan(); //Tôi là Em sinh năm 1996

    GioiThieuBanThan(); //Tôi là Em sinh năm 1996

</script>
```


- Hàm có tham số là loại hàm mà khi gọi hàm ta phải truyền giá trị vào cho nó. Tùy vào giá trị được truyền mà hàm sẽ thực thi và cho ra kết quả khác nhau.

**Ví dụ:**

```
*  Hàm GioiThieuBanThan bên dưới có hai tham số là x & y

- Về nội dung của hàm:

* Biến name được gán giá trị bằng với giá trị của tham số x
* Biến year được gán giá trị bằng với giá trị của tham số y
- (1) Trong lần gọi hàm đầu tiên:

* Tham số x được truyền giá trị là Em sexsy ==> biến name có giá trị Em sexsy
* Tham số y được truyền giá trị là 1996 ==> biến year có giá trị 1996
==> Kết quả thực thi của hàm sẽ là hiển thị dòng chữ Tôi là Em sexsy sinh năm 1996
- (2) Trong lần gọi hàm thứ hai:

* Tham số x được truyền giá trị là La Thành Em ==> biến name có giá trị La Thành Em
* Tham số y được truyền giá trị là 1996 ==> biến year có giá trị 1996
==> Kết quả thực thi của hàm sẽ là hiển thị dòng chữ Tôi là La Thành Em sinh năm 1996
- (3) Trong lần gọi hàm thứ ba:

* Tham số x được truyền giá trị là Tần Thúc Bảo ==> biến name có giá trị Tần Thúc Bảo
* Tham số y được truyền giá trị là 1985 ==> biến year có giá trị 1985
==> Kết quả thực thi của hàm sẽ là hiển thị dòng chữ Tôi là Tần Thúc Bảo sinh năm 1985
```

-----
```
<script>

    function GioiThieuBanThan(x,y){
        var name = x;
        var year = y;
        document.write("Tôi là " + name + " sinh năm " + year);
    }

    GioiThieuBanThan("Em sexsy", 1996); //Tôi là Em sexsy sinh năm 1996

    GioiThieuBanThan("La Thành Em", 1996); //Tôi là La Thành Em sinh năm 1996

    GioiThieuBanThan("Tần Thúc Bảo", 1985); //Tôi là Tần Thúc Bảo sinh năm 1985

</script>
```

-----

## 3) Cách khai báo & gọi hàm "không có tham số"
*  Để khai báo (khởi tạo) một hàm thuộc thoại không có tham số, ta sử dụng cú pháp như sau:

```
function tên hàm() {
    //Danh sách các câu lệnh của hàm
}
```

- Để gọi một hàm thuộc loại không có tham số, ta sử dụng cú pháp:

```
tên hàm()
```

**Ví dụ:**
Tạo một hàm có tên GioiThieuBanThan với chức năng hiển thị câu "Tôi là Em sinh năm 1996"

```
<script>
    function GioiThieuBanThan(){
       document.write("Tôi là Em sinh năm 1996");
    }
    GioiThieuBanThan(); //Gọi hàm
</script>
```

# 4) Cách khai báo & gọi hàm "có tham số"

* Để khai báo một hàm thuộc thoại có tham số, ta sử dụng cú pháp như sau:

```
function tên hàm(tham số thứ nhất, tham số thứ hai, tham số thứ ba, ....) {
    //Danh sách các câu lệnh của hàm
}
```

- Tham số có tính năng gần giống như biến, tuy nhiên tham số thì chỉ có thể sử dụng bên trong hàm.

- Khi khai báo hàm, ta khai báo danh sách các tham số thì điều này cũng gần giống như việc khai báo danh sách các biến.

- Đối với hàm có tham số, khi gọi hàm ta phải truyền giá trị cho các tham số theo cú pháp như sau:

```
tên hàm(giá trị tham số thứ nhất, giá trị tham số thứ hai, giá trị tham số thứ ba, ....)
```

- Việc truyền giá trị cho tham số cũng tương tự như việc gán giá trị cho biến, nếu ta gọi hàm mà không truyền giá trị cho các tham số thì mặc định các tham số sẽ có giá trị là undefined

**Ví dụ:**
* Tạo một hàm có tên là GioiThieuBanThan
* Hàm GioiThieuBanThan có hai tham số là name & year

```
<script>

    function GioiThieuBanThan(name, year){
        document.write("Tôi là " + name + " sinh năm " + year);
    }

    GioiThieuBanThan(); //Tôi là undefined sinh năm undefined

    GioiThieuBanThan(" Em sexsy"); //Tôi là  Em sexsy sinh năm undefined

    GioiThieuBanThan("La Thành Em", 1996); //Tôi là La Thành Em sinh năm 1996

    GioiThieuBanThan("Tần Thúc Bảo", 1996); //Tôi là Tần Thúc Bảo sinh năm 1996

</script>
```

- Để tránh tình trạng tham số bị nhận giá trị undefined thì trong lúc khai báo hàm ta có thể gán giá trị mặc định cho các tham số, khi đó nếu lúc gọi hàm ta không truyền giá trị cho tham số thì tham số sẽ sử dụng giá trị mặc định được gán lúc khai báo.

**Ví dụ :**

* Hàm GioiThieuBanThan bên dưới có hai tham số là **name & year**
* Tham số là **name** được gán giá trị mặc định là Em sexsy
* Tham số là **yea**r được gán giá trị mặc định là 1996


```
<script>

    function GioiThieuBanThan(name = "Em sexsy", year = 1996){
        document.write("Tôi là " + name + " sinh năm " + year);
    }
    
    GioiThieuBanThan(); //Tôi là Em sexsy sinh năm 1996

</script>
```

## 5) Gọi hàm thông qua một sự kiện

```
<!DOCTYPE html>
<html>
<body>

    <button type="button" onclick="GioiThieu()">Bấm vào đây</button>

    <script>
       function GioiThieu(){
            alert("Tôi là Em sexsysinh năm 1996");
        }
    </script>

</body>
</html>
```

## 6) Lệnh return
- Lệnh return dùng để trả về cho hàm một giá trị.

(Sau khi thực thi xong, hàm sẽ có một giá trị, lúc đó nó có thể được sử dụng giống như một biến)

**Ví dụ 1:**

```
<script>

    function number(){
        return (10*10 - 50);
    }

    var result_01 = number();

    var result_02 = 7 + number() - 30;

    var result_03 = "Hello: " + number();

</script>
```

**Ví dụ 2 :**

```
<script>

    function number(a,b){
        return (a+b)*2;
    }

    var result_01 = number(5,10);

    var result_02 = number(2,8) - 5;

    var result_03 = 5*number(1,4) - 49;

</script>
```

**Ví dụ 3 :**

```
<script>

    function ThongTin(name, year){
        var hoten = "Họ tên: " + name;
        var namsinh = "Năm sinh: " + year;
        var thongtin = hoten + "<br>" + namsinh; 
        return thongtin;
    }

    var SinhVien = "SINH VIÊN<hr>" + ThongTin("Em sexsy ", 1996);

    document.write(SinhVien);
       
</script>
```

***- Lưu ý:*** Trong một hàm, sau khi thực thi xong lệnh return thì hàm sẽ kết thúc (tức là những câu lệnh nằm phía sau lệnh return sẽ không được thực thi). Cho nên trong một hàm, lệnh return cần phải được đặt ở vị trí cuối cùng.:+1::+1: