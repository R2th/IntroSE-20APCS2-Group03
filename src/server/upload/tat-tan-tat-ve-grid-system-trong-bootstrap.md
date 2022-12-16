Như các bạn đã biết thì Bootstrap đang là một trong nhưng framework css phổ biến nhất hiện nay và một tính năng vô cùng mạnh mẽ của nó chính là Grid System (Hệ thống lưới) giúp chúng ta xây dựng layout một cách dễ dàng và thuận tiện nhất. Do vậy hôm nay chúng ta cùng tìm hiểu về nó nhé!

Trước khi vào phần chính chúng ta hay cùng tìm hiểu qua một số khái niệm cơ bản của bootstrap sau đây.
## 1. Breakpoint
Breakpoint (điểm ngắt) chính là thứ sẽ giúp bạn tùy chình layout trên mỗi viewport sizes (khung nhìn) khác nhau.
Bootstrap bao gồm 6 breakpoint mặc định hay còn gọi là các grid tiers (tầng lưới), với mỗi breakpoint này chúng ta có thể áp dụng các class khác nhau của bootstrap để có thể tùy chỉnh layout theo ý muốn của mình. Chúng ta sẽ hiểu rõ hơn về nó qua những ví dụ sẽ đề cập sau.

![](https://images.viblo.asia/0d82aca9-329e-481b-bf1b-301b421aad99.PNG)
Để ý thấy rằng từ màn hình xs trở lên mỗi breakpoint đều sử dụng dấu >= thay vì < điều đó cho thấy rằng những breakpoint này đang sử dụng thuộc tính min-width trong css. Thế nên các thuộc tính của breakpoint này sẽ áp dụng cho tất cả các kích thước màn hình lớn hơn hoặc bằng với width của breakpoint.
## 2. Container
Container (vùng chứa) dùng để bao quanh nội dung, nội dung bên trong container sẽ có kích thước tùy thuộc vào màn hình hoặc mỗi điểm ngắt. Container có 3 loại class chính gồm:

```container-fluid``` Chiều rộng luôn là 100% kích thước thước màn hình.

```container``` Chiều rộng sẽ thay đổi tùy theo kích thước màn hình (theo bảng bên dưới).

```container-{breakpoint}``` Chiều rộng luôn là 100% đến khi nào đạt tới điểm ngắt của breakpoint.

![](https://images.viblo.asia/974c5bc3-ab1d-427b-a712-d235419bbc1d.PNG)
## 3. Grid system
Hệ thống lưới của bootstrap sử dụng các container (vùng chứa), row (hàng) và col (cột) để xây dựng layout một cách linh hoạt, có thể bố trí và căn chỉnh nội dung theo từng kích thước màn hình khác nhau.
### 3.1. Cách nó hoạt động
* **Grid system** sử dụng 6 breakpoint để có thể dễ dàng responsive. 6 breakpoint này được dựng trên min-width media queries trong css do vậy mỗi thuộc tính của breakpoint sẽ ảnh hưởng lên chính nó và các breakpoint ở trên.
<br>
ví dụ: col-sm-4, phần tử chứa class này sẽ có độ rộng là 4 cột từ breakpoint sm trở lên.
* **Container** sẽ chứa nội dung của bạn và căn chỉnh nó theo chiều rộng của màn hình thiết bị, nó cùng sẽ tự động thêm padding để tránh content bị sát lề khi chiều rộng màn hình quá nhỏ.
* **Row** sẽ bao bọc các **Column**, class row sẽ có thuộc tính display: flex để khiến cho các cột nằm ngang. Mỗi cột sẽ có 1 phần padding ở 2 bên (được gọi là gutter) để điều chỉnh khoảng cách giữa các cột do vậy class row sẽ có thêm margin horizontal âm để xóa bỏ phần padding thừa ở 2 cột ngoài cùng 2 bên.
* Các **Column** rất linh hoạt, mỗi hàng sẽ có đến 12 cột cho phép bạn có thể tạo ra các phần tử trên một hàng có số cột khác nhau, chiều rộng khác nhau.
<br>
ví dụ: col-6, phần tử chứa class này sẽ chiếm chiều rộng bằng 1 nửa container chứa nó (50% width).
* **Gutters** được sử dụng để điều chỉnh khoảng cách giữa các phần tử trên cùng 1 hàng.
<br>
ví dụ: gx-* điều chỉnh khoảng cách ngang, gy-* điều chỉnh khoảng cách dọc và g-* điều chỉnh khoảng cách cả 2 chiều.
* Chúng ta có thể sử dụng Bootstrap bằng  **source Sass** để có thể dễ dàng tùy chỉnh grid system.

### 3.2. Breakpoint trên Grid system
Với mỗi breakpoint, container sẽ có chiều rộng khác nhau (như hình dưới) và chúng ta cũng có thể điều chỉnh độ rộng của mỗi cột bằng cú cú pháp `col-{breakpoint}-{number}`

![](https://images.viblo.asia/b2622eff-f6af-4433-9aaf-1954a6f004f1.PNG)

### 3.3. Chiều rộng Column tự động
#### Các Column có chiều rộng bằng nhau:
Chúng ta có thể sử dụng class `col`để khiến các cột có chiều rộng bằng nhau.

![](https://images.viblo.asia/96060f61-03d7-4818-86d8-cbe11c384895.PNG)

```html:html
<div class="container">
  <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col">
      2 of 3
    </div>
    <div class="col">
      3 of 3
    </div>
  </div>
</div>
```
#### Chỉ định chiều rộng cho 1 Column riêng biệt
Bạn cũng có thể chỉ định chiều rộng cho một cột riêng biệt và các cột còn lại sẽ tự động điều chỉnh chiều rộng để lấp đầy dòng.
![](https://images.viblo.asia/805ed0a6-4597-4de9-a88c-3a2f66537631.PNG)

```html:html
<div class="container">
  <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col-6">
      2 of 3 (wider)
    </div>
    <div class="col">
      3 of 3
    </div>
  </div>
</div> 
```
#### Chiều rộng của Column theo content
Sử dụng cú pháp `col-{breakpoint}-auto` để có được một cột có chiều dài dựa trên nội dung bên trong của nó.
![](https://images.viblo.asia/132030ce-dd6e-4407-8e51-f2c9bb767101.PNG)

```html:html
<div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-lg-2">
      1 of 3
    </div>
    <div class="col-md-auto">
      Variable width content
    </div>
    <div class="col col-lg-2">
      3 of 3
    </div>
  </div>
</div>
```
### 3.4. Responsive với Grid system
#### Áp dụng breakpoint
Chúng ta có thể sử dụng breakpoint để chỉ định độ rộng của cột cho từng màn hình cụ thể.
![](https://images.viblo.asia/276996f7-38dc-4d14-a425-224c4fd7767e.PNG)
```html:html
<div class="container">
  <div class="row">
    <div class="col-sm-8">col-sm-8</div>
    <div class="col-sm-4">col-sm-4</div>
  </div>
</div>
```
Đoạn code bên trên sẽ hiển thị 1 dòng với 2 cột từ màn hình sm trở lên, cột một có độ rộng là 8 ô còn cột 2 có độ rộng là 4 ô.

#### Kết hợp nhiều breakpoint
Nếu bạn muốn bố cục hiển thị khác trên một breakpoint nào đó thì hãy kết hợp chúng lại. Ví dụ nếu bạn muốn 1 bố cục hiển thị như sau:

Hiển thị trên màn hình md trở xuống:
![](https://images.viblo.asia/dca49eed-e24e-43d7-95f1-b876d79a6dfd.PNG)

Hiển thị trên màn hình md trở lên:
![](https://images.viblo.asia/d5c9abc9-7d83-4ea5-9462-98c71f1a3796.PNG)

Thì hãy sử dụng đoạn dưới đây. Mỗi cột trong dòng sẽ chiếm 6 ô nhưng từ màn hình md trở lên mỗi cột sẽ chiếm 4 ô.
```html:html
<div class="container">
  <div class="row">
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    <div class="col-6 col-md-4">.col-6 .col-md-4</div>
  </div>
```

#### Tùy chỉnh số cột ở mỗi dòng
Chúng ta có thể sử dụng class ```.row-cols-{number}``` cho mỗi dòng để đặt nhanh độ rộng của các cột trong hàng thay vì phải set riêng cho từng cột riêng biệt (Lưu ý number chỉ nhận giá trị là 'auto' hoặc từ 1 đến 6 thôi nhé).

![](https://images.viblo.asia/63f1b93f-073b-44f9-afd9-583b0e8dbfb8.PNG)

```html:html
<div class="container">
  <div class="row row-cols-5">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div>
```
Ví dụ bên trên sẽ hiển thị 5 cột trên 1 dòng.

#### Lồng nhau
Trong mỗi cột có thể lồng thêm các dòng nữa nhé, như ví dụ bên dưới:
![](https://images.viblo.asia/8b78a1ad-c8f6-4587-b2c3-33106fe6521f.PNG)
```html:html
<div class="container">
  <div class="row">
    <div class="col-sm-3">
      Level 1: .col-sm-3
    </div>
    <div class="col-sm-9">
      <div class="row">
        <div class="col-8 col-sm-6">
          Level 2: .col-8 .col-sm-6
        </div>
        <div class="col-4 col-sm-6">
          Level 2: .col-4 .col-sm-6
        </div>
      </div>
    </div>
  </div>
</div>
```
## 4. Phần kết
Như vậy trong bài viết nay chúng ta đã cùng tìm hiểu về Grid System trong Bootstrap, đây là một tính năng vô cùng mạnh mẽ của Bootstrap nên nếu làm chủ được nó thì công việc xây dựng bố cục cũng như phát triển web Front-end sẽ trở nên dễ dàng hơn rất nhiều. Rất mong rằng bài viết này sẽ giúp ích cho các bạn :grin:

**Tài liệu tham khảo:**
<br>
https://getbootstrap.com/