## Cài đặt
Đây là hình ảnh mà chúng ta sẽ sử dụng trong bài viết này:
![](https://images.viblo.asia/5190ba26-5baf-4bd7-95e7-585ba309c5c9.png)

Đây là code HTML:
 ```
 <div class="container">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
 </div>
```
Và đây là CSS:
```
    .container {
        display: grid;
        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 50px 50px;
    }
```
## Cơ bản reponsive với Fraction unit
CSS Grid có một giá trị mới gọi là Fraction unit(đơn vị phân số). Fraction unit được viết  fr và nó cho phép bạn chia container thành nhiều fraction như bạn muốn.
Thay đổi mỗi cột thành một fraction unit:
```
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 50px 50px;
}
```
Điều xảy ra ở đây là lưới chia toàn bộ chiều rộng thành ba phân số và mỗi cột chiếm một đơn vị mỗi cột. Đây là kết quả:
![](https://images.viblo.asia/b51dcafb-8c2f-452e-98a9-0f5602d34ff0.gif)

Nếu chúng ta thay đổi giá trị ``` grid-template-columns ```  cột thành ```1fr 2fr 1fr```, thì cột thứ hai bây giờ sẽ rộng gấp đôi so với hai cột khác. 
Tổng chiều rộng bây giờ là bốn đơn vị phân số, và đơn vị thứ hai chiếm hai trong số chúng, trong khi các đơn vị khác chiếm một đơn vị. Và đây là kết quả:
![](https://images.viblo.asia/fc1e7457-26ce-4717-a184-bf65298ca9df.gif)
Nói cách khác, giá trị đơn vị phân số giúp bạn dễ dàng thay đổi độ rộng của các cột.
## Nâng cao Reponsive
Tuy nhiên, ví dụ ở trên không đáp ứng yêu cầu mà chúng ta muốn, vì lưới này sẽ luôn rộng ba cột.
Chúng ta muốn lưới này thay đổi số lượng cột với chiều rộng của container. Để được điều này, bạn sẽ phải học ba khái niệm mới.
### repeat()
Chúng ta sẽ bắt đầu với hàm repeat ().  Đây là một cách tốt để điều chỉnh các cột và hàng của bạn.
```
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
}
```
Nói cách khác, ```repeat(3, 100px)``` giống hệt ```100px 100px 100px```. Tham số đầu tiên chỉ định số lượng cột hoặc hàng bạn muốn và thứ hai chỉ định chiều rộng của chúng,
vì vậy điều này sẽ chỉ cho chúng ta bố cục chính xác như chúng ta đã bắt đầu với:
![](https://images.viblo.asia/276ff8ed-8023-497e-9477-f4cbee834531.png)
### auto-fit
Sau đó, là auto-fit. Hãy bỏ qua việc có một số lượng cột cố định và thay vào đó là 3 cột tự động.
```
.container {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, 100px);
    grid-template-rows: repeat(2, 100px);
}
```
Và đây là kết quả:
![](https://images.viblo.asia/2332a3e8-7bea-4227-97f3-d2531efe570b.gif)
Lưới bây giờ thay đổi số lượng cột với chiều rộng của container. Nó chỉ đơn giản là cố gắng lắp càng nhiều cột rộng 100px vào vùng chứa càng tốt.
###   minmax()
Thành phần cuối cùng chúng ta cần để khắc phục điều này được gọi là minmax (). Chúng ta chỉ đơn giản là thay thế ```100px``` bằng ```minmax(100px, 1fr)``. Đây là CSS cuối cùng.
```
.container {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: repeat(2, 100px);
}
```
![](https://images.viblo.asia/36c6d762-0399-462e-af53-3740cbbaba2d.gif)
Và như bạn có thể thấy rằng hoạt động hoàn hảo. Hàm ``minmax(``) xác định phạm vi kích thước lớn hơn hoặc bằng ```min``` và nhỏ hơn hoặc bằng ```max```.
Vì vậy, các cột bây giờ sẽ luôn luôn ít nhất ```100px```. Tuy nhiên, nếu có nhiều không gian hơn, lưới sẽ chỉ phân phối đều cho từng cột, vì các cột biến thành một đơn vị phân số thay vì ```100 px```.
### Thêm hình ảnh
Bây giờ bước cuối cùng là thêm hình ảnh. Điều này không liên quan gì đến CSS Grid, nhưng hãy để vẫn nhìn vào code.
Chúng ta sẽ bắt đầu bằng cách thêm một thẻ hình ảnh bên trong mỗi mục lưới.
```
<div><img src="img/forest.jpg"/></div>
```
```
.container > div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```