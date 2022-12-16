Hiểu về thuôc tính position trong CSS có thể là một trong những trải nghiệm khó khăn cho chúng ta khi khi bắt đầu.
Nó là thuộc tính xác định loại của phương pháp định vị trí cho thành phần.

Cấu trúc:
 ```
 tag {
     position: giá trị;
 }
 ```
###  Có 2 loại positioning

Static positioning và relative positioning

Static positoning chỉ có một giá trị: ```position: static```. Nó là mặc định nên sẽ ít khi thấy nó được khai báo.

Relative positioning bao gồm các giá trị: ```relative, absolute, fixed```. Các giá trị này tương tác với nhau và cho phép bạn di chuyển các yếu tố xung quanh theo những cách thú vị.

### Static Positioning 

Mặc dù không thường xuyên nhưng thỉnh thoảng bạn sẽ thấy nó được khai báo:

```
    .tag {
        position: static;
    }
```
![](https://images.viblo.asia/810bb5f2-70c6-49cb-8aac-e4c9e59ba16f.png)

Static position là position mặc định của mọi thành phần, bất kể bạn khai báo hay không. Tất cả các thành phần sẽ nằm theo thứ tự trong document.

### Relative Positioning

Các gía trị của nó là: ```relative, fixed, absolute```, Nó cho phép các thành phần được xác định vị trí của chính chùng với các thuộc tính bố me, trình duyệt...

Tất cả loại relative positoning có làm như sau:
    **.** Được di chuyển thông qua việc sử dụng **offset properties**, đó là: **top**, **left**, **right**, **bottom**.
    **.** Chúng ta tạo relative-position , nó cho phép thành phần con với ```position: absolute```được định vị tương đối với vị trí của yếu tố này.
    
### Positon Relative

Cấu trúc:
```
    tag {
        positon: relative;
    }
```

Yếu tố: ```position: relative``` của một phần tử liên quan đến vị trí hiện tại của nó mà không thay đổi bố cục xung quanh vị trí đó.

Để rõ ràng, khi bạn sử dụng một offset để di chuyển trực quan một phần tử có ```position: relative```,  không gian mà nó chiếm trong document sẽ không di chuyển.

Hãy xem ví dụ:

```
    .ourBox {
          position: relative;
          top: 20px;
          left: 20px;
    }
```
![](https://images.viblo.asia/a938d899-8840-4803-bd22-bbd1a1093477.png)

Ở đây chúng ta có thể thấy phần trên của phần tử được bù 20 pixel, liên quan đến vị trí của phần tử trong luồng thông thường. Điều tương tự đang được áp dụng cho phía bên trái.

Lưu ý rằng vị trí của các hộp ở hai bên không thay đổi. Hãy nhớ rằng, khi bạn bù một vị trí phần tử với ```position: relative```, không gian nó chiếm không di chuyển, vì vậy nó sẽ giành được ảnh hưởng đến mọi thứ xung quanh nó.

Nó giống như chiếc hộp của chúng tôi có một tinh thần tự do và có thể đi bất cứ nơi nào nó muốn, nhưng luôn luôn liên quan đến nơi ban đầu.

### Position Absolute

```position: absolute``` của một phần tử liên quan đến vị trí của bố mẹ và thay đổi bố cục xung quanh vị trí đó.

Hãy xem ví dụ sau:

```
    .ourBoxesParent {
          position: relative;
    }
    .ourBox {
          position: absolute;
          top: 0;
          left: 0;
    }
```
![](https://images.viblo.asia/051632ba-7099-429f-9aad-ae1a9f38aa5d.png)

Chúng ta đã thêm một set vị trị của box ```position: relative```. Chúng ta cũng đã thay đổi bõ của chúng ta để được ```position: absolute```. Bây giờ 2 box sẽ xuất hiên cạnh nhau.

### Position Fixed

```fixed``` giống như ```absolute``` nhưng có một điểm chính khác nhau:
Phần tử được định vị tương đối với khung nhìn.

```
    .ourBox {
          position: fixed;  
          top: 0;
          left: 0;
    }
```

![](https://images.viblo.asia/e5eae793-0207-471c-a95e-b88ee718e10f.png)

Phần tử được định vị tương đối với chế độ xem. Điều này có nghĩa là ngay cả khi trang được cuộn, thì nó sẽ nằm luôn trên màn hình ngay tại vị trí chuẩn đó và đè lên trên các phần tử bên dưới.