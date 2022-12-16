## Mở đầu
Z-index là một thuộc tính CSS cho phép bạn định vị các phần tử trong các lớp chồng lên nhau.

Chúng ta thường nghĩ đơn giản là chỉ số z-index cao hơn nghĩa là phần tử đó sẽ nằm trên các phần tử có chỉ số z-index thấp hơn. Nhưng có một số quy tắc bổ sung làm cho mọi thứ phức tạp hơn. Và nó vẫn không hoạt động ngay cả khi bạn đặt z-index là 99999!?

Hãy cùng nhau tìm hiểu 4 lý do phổ biến tại sao z-index lại không hoạt động nhé ^^


## 1. Các phần tử trong cùng bố cục sẽ hiển thị theo thứ tự xuất hiện, với các phần tử sau nằm trên các phần tử xuất hiện trước

Chúng ta có ví dụ đơn giản bao gồm 3 phần tử chính:

*  Một khối hình ảnh pháo bông
*  Một khối văn bản
*  Một khối hình ảnh pháo bông khác


```
<section class="content">
  
  <!-- Top -->
  <div class="content__top"></div>
  
  <!-- Body -->
  <div class="content__body"> Happy New Year! Happy New Year!... </div>
  
  <!-- Bottom -->
  <div class="content__bottom"></div>
  
</section>
```


Khi chúng ta muốn khối văn bản nằm trên cả 2 khối hình ảnh, và để đạt được điều đó chúng ta thêm margin âm vào 2 khối hình ảnh để chúng chồng lên khối văn bản như sau:

```
.content__top { 
    margin-bottom: -130px;
 }

.content__bottom {    
    float: right;
    margin-top: -140px;
 }
```


Tuy nhiên kết quả như sau:

{@embed: https://codepen.io/nhungpt6/pen/pozQaLp}



Tại sao khối hình ảnh đầu tiên nằm dưới khối văn bản và khối hình ảnh bottom nằm trên khối văn bản?
Lý do là do thứ tự xếp chồng tự nhiên trên trang web. Khi mà các phần tử không được gán chỉ số z-index thì thứ tự xếp chồng của chúng được xác định bởi thứ tự xuất hiện, theo đó thì các khối sau sẽ được xếp nằm trên các khối đi trước chúng.

Vậy làm thế nào để khối hình ảnh bottom nằm dưới khối văn bản? 
Hãy xem lý do thứ 2 nhé!


## 2. Phần tử không được đặt vị trí

Muốn đặt vị trí cho một phần tử hãy thêm thuộc tính CSS position, ví dụ như static, relative, absolute,...

Theo quy tắc này, các phần tử được đặt vị trí sẽ hiển thị trên các phần tử không được bố trí.

Đặt khối văn bản có position: relative và chúng ta có kết quả như mong muốn ban đầu là khối văn bản nằm trên 2 khối hình ảnh:

![](https://images.viblo.asia/e7d9ac9c-e67d-4ea3-86cc-b3be6951d640.PNG)

Tiếp theo chúng ta muốn xoay khối hình ảnh bottom sử dụng thuộc tính transform để chỉ nhìn thấy hình pháo bông chứ k muốn thấy chữ Happy New Year 2019. Tuy nhiên nó có thể ảnh hưởng đến thuộc tính z-index. Đến với lý do thứ 3 để giải quyết vấn đề nhé!


## 3. Đặt một số thuộc tính CSS như Opacity hay Transform sẽ khiến phần tử đó thay đổi thứ tự xếp chồng

Như chúng ta muốn chỉ nhìn thấy hình pháo bông chứ không muốn thấy chữ Happy New Year 2019, chúng ta thêm transform: rotate(180deg)


```
.content__bottom {    
    float: right;
    margin-top: -140px;
    transform: rotate(180deg);
 }
```


Nhưng điều này như đã nói nó sẽ khiến phần tử được đặt thay đổi thứ tự xếp chồng, như kết qủa sau, khối hình ảnh bottom lại xếp trên khối văn bản:

![](https://images.viblo.asia/aa80df35-0417-489e-9dce-f5e02dc00c22.png)



Có thể bạn không gặp vấn đề này thường xuyên, tuy nhiên việc thêm transform hoặc opacity sẽ làm thay đổi bối cảnh xếp chồng, mặc dù không có position hay z-index nhưng nó được hoạt động như nó được định vị tương đối z-index: 0. Điều này đủ để đặt khối bottom lên 2 khối còn lại không được đặt z-index.

Giải pháp cho vấn đề này là đặt position và z-index cụ thể cho các khối để đạt được mong muốn:

```
.content__body {
   position: relative; 
   z-index: 2; 
} 

.content__top, .content__bottom {
   position: relative;
   z-index: 1; 
}
```

Như vậy kết quả đã đúng như chúng ta mong muốn:

![](https://images.viblo.asia/4bc34321-6e97-481e-b92e-73abcbf39d63.png)


## 4. Phần tử con nằm trong phần tử cha mẹ có z-index thấp

Chúng ta cùng đến với lý do thứ 4 nhé!
Hãy xem ví dụ sau:

{@embed: https://codepen.io/nhungpt6/pen/XWryYjE?editors=1100}



Chúng ta có page đơn giản, khi click vào hình ảnh chúng ta có một modal xuất hiện tuy nhiên chúng ta muốn nó được hiển thị trên hết tất cả mọi thứ bao gồm cả tab bên phải, còn bây giờ thì nó vẫn đang ở dưới phần tab, chúng ta cùng xem là tại sao nhé

```
.content { 
   position: relative; 
   z-index: 1; 
} 

.modal { 
   position: fixed; 
   z-index: 100; 
} 

.side-tab { 
   position: fixed; 
   z-index: 5; 
}
```

Tại sao modal có z-index: 100 lớn hơn phần tử tab có z-index: 5 ??? 
Như chúng ta đã xét trong các trường hợp trên, chúng đáp ứng đủ các điều kiện về thứ tự xuất hiện, chỉ số z-index tuy nhiên còn khái cạnh khác nữa là nó bị giới hạn bởi phần tử cha mẹ chứa nó.

Ở đây modal đang được chứa trong phần tử cha mẹ có z-index thấp hơn:

```
<section class="content">            
    <div class="modal"></div>
</section>

<div class="side-tab"></div>
```

Như vậy chúng ta đã thấy modal tuy có z-index lớn hơn nhưng chúng vẫn bị giới hạn bởi phần tử cha mẹ, vì vậy giá trị z-index của chúng bị mất ý nghĩa. Chúng ta có một vài giải pháp sau:

* Di chuyển modal ra ngoài khỏi phần tử cha mẹ là content như thế này:

```
<section class="content"></section>

<div class="modal"></div>

<div class="side-tab"></div>
```


* Xoá các thuộc tính đặt vị trí của phần tử cha mẹ content, nó sẽ không giới hạn chỉ số của modal con bên trong

 ```
 .content { 
   // No position set 
} 

.modal { 
   position: absolute; 
   z-index: 100; 
} 

.side-tab { 
   position: absolute; 
   z-index: 5; 
}
```


## Kết luận
Hy vọng sẽ có ích với các bạn  ^^

Chỉ số z-index có thể được giải quyết bằng cách làm theo hai nguyên tắc sau:

* Kiểm tra xem các phần tử có vị trí được đặt và z-index đúng thứ tự không.
* Hãy chắc chắn rằng bạn không có các yếu tố cha mẹ giới hạn z-index của các phần tử con của nó.