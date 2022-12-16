# 1. Phân biệt var và let trong JavaScript
<br>


| <div align="center">Phân biệt</div> | <div align="center">Var</div>  | <div align="center">Let</div> |
| -------- | -------- | -------- |
| <div align="center">Giống nhau </div> |  Đều là từ khoá - keyword. Cùng được dùng để khai báo biến trong JavaScript | 
| <div align="center">--------</div> | <div align="center">--------</div> | <div align="center">--------</div> |
|  <div align="center">Khác nhau</div>  |  Phạm vi của biến sử dụng var là phạm vi hàm hoặc bên ngoài hàm, toàn cục. |  Phạm vi của biến sử dụng let là phạm vi một khối (block), xác định bởi cặp {}.   |
||Biến var có thể được cập nhật và khai báo lại trong phạm vi tồn tại.  | Biến let có thể được cập nhật nhưng không thể khai báo lại.|
|| có thể được khai báo mà không cần khởi tạo.|có thể được khai báo mà không cần khởi tạo.|
||có thể được truy cập mà không cần khởi tạo vì giá trị mặc định của nó là "undefined".	|không thể được truy cập mà không có khởi tạo, vì nó trả về một lỗi.|

<div align="center">Bảng phân biệt tổng quát giữa var và let</div>
<br>


![](https://images.viblo.asia/8d204f2a-86eb-43c8-8db2-e09e77da3cb1.PNG)

<div align="center">Bảng sự khác biệt của hai biến var, let.</div>

# 2. Var
### 2.1 Khai báo với từ khóa Var :
 Biến let có thể được cập nhật nhưng không thể khai báo lại
### 2.2 Phạm vi hoạt động: <br>
 Phạm vi toàn cầu hoặc phạm vi Function (hàm). Phạm vi của từ khóa var là phạm vi toàn cục hoặc phạm vi Function (hàm). Nó có nghĩa là các biến được định nghĩa bên ngoài hàm có thể được truy cập trên toàn cục và các biến được xác định bên trong một hàm cụ thể có thể được truy cập bên trong hàm. Hãy xem các ví dụ của LPTech dưới đây
### 2.3 Ví dụ: 
*   **Ví dụ 1**:  Biến 'a' được khai báo trên toàn cục. Vì vậy, phạm vi của biến 'a' là toàn cục và nó có thể được truy cập ở mọi nơi trong chương trình. 

```
<script>
    var a = 10
        function f(){
            console.log(a)
        }
    f();
    console.log(a);
</script>
```

**Kết quả:**  <br>

![](https://images.viblo.asia/618f4168-f502-4edb-8ac3-e0426df7bd24.PNG)

* **Ví dụ 2**: Biến 'a' được khai báo bên trong hàm. Nếu người dùng cố gắng truy cập nó bên ngoài function, nó sẽ hiển thị lỗi. Người dùng có thể khai báo 2 biến trùng tên bằng từ khóa var . 
Ngoài ra, người dùng có thể gán lại giá trị vào biến var.
```
<script>
        function f(){ 
            // nó có thể truy cập bất kỳ đâu trong hàm này
            var $bien = 10
            console.log($bien)
        }
    f();
        //biến $bien không thể truy cập được bên ngoài function
    console.log($bien);
</script>
```

**Kết quả:** <br>

![](https://images.viblo.asia/b9db3266-e099-4041-a82e-bab65db318bf.PNG)

<br>

* **Ví dụ 3**:  Người dùng có thể khai báo lại biến bằng var và người dùng có thể cập nhật biến var.

```
<script>
            var $bien = 10

            //người dùng có thể khai báo lại biến $bien sử dụng var
            var $bien = 8

            //người dùng có thể vập nhập biến $bien bằng var
            $bien = 7
            
</script>
```

**Kết quả:** <br>

![](https://images.viblo.asia/f1873d8b-1934-4b88-aa31-528a3546ceaf.PNG)



* **Ví dụ 4**: Nếu người dùng sử dụng biến var trước khi khai báo, biến này sẽ khởi tạo với giá trị không xác định .

```
<script>
      
         console.log($bien)
        //biến $bien chưa được khai báo mà được gọi ra
         var $bien = 10;
</script>
```

**Kết quả:**<br>

![](https://images.viblo.asia/7d453c6a-f09c-4873-affc-753af89ad060.PNG)


# 3. Let
### 3.1 Khai báo với từ khóa  Let : 
Từ khóa **let** là phiên bản cải tiến của từ khóa  **var**.
### 3.2 Phạm vi hoạt động: <br>
 Phạm vi của một biến let chỉ là phạm vi khối. Nó không thể truy cập được bên ngoài khối cụ thể ({block}). Hãy xem các ví dụ của LPTech dưới đây.
### 3.3 Ví dụ: 
* **Ví dụ 1**: <br>

![](https://images.viblo.asia/684c27df-e07e-4b80-aee8-86a15c2d5bdd.PNG)

* **Ví dụ 2**: Đoạn mã trả về lỗi vì chúng ta đang truy cập biến let bên ngoài khối hàm.

```
<script>
        let $bien_one = 10;
            function f() {
                if (true) {
                let $bien_two = 0
                //in ra 0
                console.log($bien_two);
            }
            // nó đưa ra lỗi vì biến $bien+two được định nghĩa trong khối if 
            console.log($bien_two);
}
f();
//in ra 10
console.log($bien_one);
</script>
```

**Kết quả:**<br>

![](https://images.viblo.asia/0a98b0f3-0751-48c3-9dfa-01927f0ce120.PNG)

* **Ví dụ 3**:  Người dùng không thể khai báo lại biến đã định nghĩa với từ khóa let nhưng có thể cập nhật lại.
<br>

![](https://images.viblo.asia/b5391664-01ec-4e5a-bcb2-5777707dbe03.PNG)



* **Ví dụ 4**: Người dùng có thể khai báo biến trùng tên ở các khối khác nhau bằng từ khóa let .
<br>

![](https://images.viblo.asia/a6201a74-8f24-4528-b9cb-7797244bf2a0.PNG)

# 4. Nên sử dụng var hay let?
* `Từ khóa var đã lỗi thời`. Chỉ nên sử dụng từ khóa let để khai báo biến.
* Từ phiên bản ES6,`` mình khuyên bạn chỉ nên dùng từ khóa let.``
<br>


Tham khảo:
*  [phan-biet-va-cach-dung-var-let-va-const-trong-javascript](https://levanphu.info/phan-biet-va-cach-dung-var-let-va-const-trong-javascript)