# Cấu Trúc Rẽ Nhánh Switch ... Case Trong Javascript
Chúng ta có thể sử dụng nhiều lệnh if...else…if như trong chương trước để thực hiện một nhánh nhiều lựa chọn. Tuy nhiên, nó luôn luôn không phải là giải pháp tốt nhât, đặc biệt khi tất các các nhánh phụ thuộc vào giá trị của một biến đơn.

Bắt đầu với JavaScript, bạn có thể sử dụng một lệnh switch để xử lý chính xác tình huống này, và nó thực sự hiệu quả hơn so với việc lặp đi lặp lại các lệnh if…else if.
## Sơ đồ sau giải thích lệnh switch-case làm việc:
![](https://images.viblo.asia/809417b9-f0b7-4a59-ae70-1f9d1e74b8d7.JPG)
## 1. Lệnh switch case trong Javascript
Lênh ***switch case*** có công dụng giống như lệnh if else đó là đều dùng để rẻ nhánh chương trình, ứng với mỗi nhánh sẽ có một điều kiện cụ thể và điều kiện đó phải sử dụng toán tử so sánh bằng, còn đối với lệnh if else thì bạn có thể truyền vào một mệnh đề bất kì và **Sử dụng nhiều toán tử khác nhau.**

### Cú pháp : 
```
switch (variable)
{
    case value_1 : {
        // do some thing
        break;
    }
    case value_2 : {
        // do some thing
        break;
    }
    default : {
        // do something
    }
}
```

Nếu như trong tất cả các case không có  case nào phù hợp thì nó sẽ chạy lệnh ở **default**, ngược lại nếu có case nào phù hợp thì chương trình sẽ chạy trong case đó, đồng thời lệnh break sẽ giúp chương trình thoát khỏi lệnh **switch**, còn nếu bạn không thêm lệnh **break** thì chương trình sẽ tiếp tục kiểm tra và chạy tiếp ở case tiếp theo.

### Quy trình chạy như sau:

* Nếu tham số variable có giá trị là **value_1** thì những đoạn code nằm bên trong case 1 sẽ được thực hiện, ngược lại nó sẽ nhảy xuống case tiếp theo.
* Lúc này nếu variable có giá trị là **value_2** thì những đoạn code trong case 2 sẽ được thực hiện, ngược lại nó kiểm tra tiếp xem còn case nào không.
* Nhận thấy không còn case nào nữa nên nó sẽ kiểm tra có lệnh default không? Vì có lệnh default nên nó sẽ chạy đoạn code trong lệnh default đó rồi thoát khỏi switch case.

**Ví Dụ**: Viết chương trình cho người dùng nhập vào một số, kiểm tra số đó là số chẵn hay số lẻ.

Với bài toán này thì mình kết hợp lệnh [prompt()](https://www.w3schools.com/jsref/met_win_prompt.asp) để lấy thông tin từ người dùng, đồng thời kết hợp lệnh switch case để hiển thị kết quả. Có một lưu ý bạn nên sử dụng hàm [parseInt() ](https://www.w3schools.com/jsref/jsref_parseint.asp)để chuyển dữ liệu người dùng nhập sang number.

### Chương trình sử dụng lệnh switch  
```
<script>
    var number = parseInt(prompt("Nhập số cần kiểm tra"));

    var mod = (number % 2);

    switch (mod)
    {
        case 0 : {
            document.write(number + " là số chẵn");
            break;
        }
        case 1: {
            document.write(number + " là số lẽ");
            break;
        }
        default : {
            document.write("Ký tự bạn nhập không phải số");
        }
    }
</script>
```

### [Run Kết quả](https://codepen.io/v-hu/pen/OYmwyB)

Với ví dụ này thì bạn hoàn toàn có thể sử dụng lệnh if else để thực hiện.

### Chương trình sử dụng lệnh if else

```
var number = parseInt(prompt("Nhập số cần kiểm tra"));
 
var mod = (number % 2);
 
if (mod == 0){
    document.write(number + " là số chẵn");
}
else if (mod == 1){
    document.write(number + " là số lẽ");
}
else{
    document.write("Ký tự bạn nhập không phải số");
}
```
### [Run Kết quả](https://codepen.io/v-hu/pen/oRWMje)

# 2. Ví dụ lệnh switch case trong Javascript
**Ví dụ**: Viết chương trình cho người dùng nhập một màu, kiểm tra màu đó có phải màu đỏ (red) hay màu vàng (yellow) hay không? Nếu không phải thì thông báo cho người dùng biết nhập sai màu.

Chúng ta sẽ giải bài này bằng nhiều cách khác nhau và mỗi cách bạn sẽ học được một kinh nghiệm xử lý lệnh **switch case**.

### Trường hợp không có default

Trường hợp này nếu bạn nhập một màu khác với màu đỏ (red) và vàng (yellow) thì sẽ không có thông báo gì.

**Ví dụ :**

```
<script>
    var color = prompt("Nhập màu cần kiểm tra");

    switch (color){
        case 'red' : 
            document.write("Bạn nhập màu đỏ, đúng rồi đó");
            break;
        case 'yellow' : 
            document.write("Bạn nhập màu vàng, đúng rồi đó");
            break;    
    }
</script>
```

### [Run Kết quả](https://codepen.io/v-hu/pen/arWjom)

## Trường hợp không có break

Trường hợp này nếu bạn nhập vào màu đỏ (red) thì chương trình sẽ in ra cả lệnh ở case màu vàng (yellow) phía dưới, lý do là trong case màu đỏ ta không sử dụng lệnh break để thoát khỏi lệnh switch nên nó sẽ chạy thẳng xuống case phía dưới luôn mà không cần kiểm tra điều kiện.

```
var color = prompt("Nhập màu cần kiểm tra");
 
switch (color){
    case 'red' : 
        document.write("Bạn nhập màu đỏ, đúng rồi đó");
    case 'yellow' : 
        document.write("Bạn nhập màu vàng, đúng rồi đó");
        break;  
    default :
        document.write("Màu bạn nhập không có trong hệ thống");
}
```
Giả sử bạn thêm một case nữa cho màu xanh (blue), lúc nếu bạn nhập vào màu đỏ (red) thì kết quả chỉ in thêm lệnh màu vàng (yellow) thôi. Từ đó suy ra rằng nếu không có break thì nó chỉ chạy luôn case đầu tiên phía dưới nó.
**Ví dụ :**
```
<script>
    var color = prompt("Nhập màu cần kiểm tra");

    switch (color){
        case 'red' : 
            document.write("Bạn nhập màu đỏ, đúng rồi đó");
        case 'yellow' : 
            document.write("Bạn nhập màu xanh, đúng rồi đó");
            break;  
        default :
            document.write("Màu bạn nhập không có trong hệ thống");
    }
</script>
```
### [Run Kết quả](https://codepen.io/v-hu/pen/xNdMGv)

## Trường hợp gôm nhóm case
Nếu bạn để ý kỹ hơn thì thì thấy rằng nếu người dùng nhập vào màu đỏ (red), vàng (yellow) và xanh (blue) thì đều có thông báo nhập đúng. Vậy tai sao mình không gôm ba trường hợp đó thành một thôi.
**Ví dụ :**
```
<script>
    var color = prompt("Nhập màu cần kiểm tra");

    switch (color){
        case 'red' : 
            document.write("Bạn nhập màu đỏ, đúng rồi đó");
        case 'yellow' : 
            document.write("Bạn nhập màu xanh, đúng rồi đó");
            break;  
        default :
            document.write("Màu bạn nhập không có trong hệ thống");
    }
</script>
```
### [Run Kết quả](https://codepen.io/v-hu/pen/MdmLKP)

# 3. Lời kết
Từ ba trường hợp trên ta suy ra được kết luận như sau:  
* Để xử lý cho một trường hợp ngoại lệ nào đó thì ta sử dụng lệnh **default**.
* Nếu nhiều nhánh cùng xử lý chung một đoạn code thì ta sẽ bỏ đi lệnh **break** ở bên trong, như vậy nó sẽ chạy luôn **case** ở phía dưới mà không cần kiểm tra điều kiện.