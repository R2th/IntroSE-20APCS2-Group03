Đây là bài viết thứ hai của loạt CSS Grid. Trong bài đăng đầu tiên, chúng tôi đã thấy tất cả các điều cơ bản và các thuộc tính quan trọng nhất của CSS Grid. Nếu bạn muốn xem bài viết, bạn có thể tìm thấy nó ở [đây](https://viblo.asia/p/css-grid-layout-YWOZrQoYKQ0)
## Giới thiệu
Trong bài đăng này, chúng tôi sẽ xem xét 3 tình huống mà bạn có thể gặp phải trong các dự án của mình với tư cách là nhà phát triển web. Đầu tiên, chúng tôi sẽ implement một thành phần search-fitlers. Sau đó, chúng ta sẽ xem xét cách CSS Grid có thể giúp chúng ta dễ dàng thực hiện một bộ sưu tập hình ảnh mà nếu dùng cách bình thường thì sẽ rất khó khăn. Cuối cùng, tôi sẽ triển khai một trong những bố cục trang chủ "hợp thời trang" liên tục xuất hiện trên dribble.    
Vì bài viết này là về CSS grid, tôi sẽ tập trung vào việc thực hiện bố cục của từng ví dụ.

Nếu bạn đã sẵn sàng, hãy nhảy ngay vào phần đầu tiên nào!

### Search-filters
Trong phần này, chúng tôi sẽ triển khai search-filters wrapper giống như những cái chúng ta tìm thấy ở trên bộ sưu tập các sản phẩm hoặc không có gì cả. search-filters wrapper sẽ giữ một số inputs và hai nút action: `Reset và search`. Các nút hành động này phải luôn luôn ở góc dưới cùng bên phải của layout, như trong Hình 1 :

![](https://images.viblo.asia/0695be01-1fa7-4f6c-908a-4dcd4096f610.png)
Hình 1: search-filters  

Mặc dù nó có một nhược điểm, tôi muốn các nút action ở trên cột cuối cùng của hàng cuối cùng. Điều đó có nghĩa là nếu có một không gian cho nó, nó sẽ nằm trên cùng một dòng với input. Xem hình 2 bên dưới:

![](https://images.viblo.asia/6c952b42-51ef-4f85-a202-a181c472cbfa.png)
Hình 2: hành vi của các nút hành động   

Chà, nếu các thông số kỹ thuật rõ ràng, hãy triển khai nó bắt đầu bằng mã HTML sẽ giữ một số input và hai buttons action. Vì vậy, nó sẽ trông khá giống như thế này:
```
 <div class="filter-wrapper">
      <div class="filter-input">input 1</div>
      <div class="filter-input">input 2</div>
      <div class="filter-input">input 3</div>
      <div class="filter-input">input 4</div>
      <div class="filter-input">input 5</div>
      <div class="filter-input">input 6</div>

      <div class="action-btns">
        <button type="reset">Reset</button>
        <button type="submit">Search</button>
      </div>
    </div>
```
Cùng với đó, bây giờ chúng ta sẽ đặt lưới để nó tự động đặt (read dynamically) số lượng row và column. Chúng ta cũng nên đặt chiều cao của mỗi hàng và chiều rộng tối thiểu của mỗi cột để lưới sẽ trông đẹp mắt:
```
.filter-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
  grid-auto-rows: 6ch; /* height of each row (definition in the first post) */
  grid-gap: 2ch;
}
```
Bây giờ hãy thực hiện action của các buttons. Như đã nói trước đây, tôi muốn nó luôn ở góc dưới cùng bên phải, nghĩa là trên cột cuối cùng của hàng cuối cùng. Vì nó đã ở hàng cuối cùng (vì vị trí trong HTML), tôi chỉ cần xác định rằng nó phải nằm trên cột cuối cùng:
```
.filter-wrapper .action-btns {
  grid-column-end: -1;
}
```
Lưu ý rằng tôi đã không nhìn thấy grid-column-end trong bài đăng đầu tiên, nó xác định column-line nào sẽ kết thúc (mục này sẽ tự động tìm ra column-line bắt đầu).

Chỉ với vài dòng CSS này, tôi đã xác định action chính xác của search-filters wrapper. Mã code có thể được tìm thấy trên [codepen](https://codepen.io/anhnt1712/pen/ExPWvyd)

### Image gallery
Tiếp theo, hãy thực hiện một bộ sưu tập hình ảnh độc lập theo thứ tự. Giống như chúng ta đã thấy trong bài đăng đầu tiên, chúng ta có thể sử dụng `grid-auto-flow: dense` để cho phép trình duyệt tìm ra cách đặt các phần tử. Có nghĩa là nếu chúng ta có lưới sau:
![](https://images.viblo.asia/672b0a19-7a4a-4a47-98ed-9db60fddeb51.png)
Hình 3: grid được triển khai bad     

Tôi muốn trình duyệt sắp xếp lại các yếu tố theo cách không có khoảng trắng. Giống như trong Hình 4 bên dưới:
![](https://images.viblo.asia/86431bb5-e132-428e-b653-aaa19a44c92d.png)
Hình 4: Grid được thực hiện chính xác    

Chà, giả sử chúng ta có mã HTML sau:
```
<div class="gallery">
      <div class="gallery-item horizontal">1</div>
      <div class="gallery-item">2</div>
      <div class="gallery-item vertical">3</div>
      <div class="gallery-item">4</div>
      <div class="gallery-item horizontal">5</div>
      <div class="gallery-item vertical horizontal">6</div>
      <div class="gallery-item">7</div>
      <div class="gallery-item horizontal vertical">8</div>
      <div class="gallery-item vertical">9</div>
      <div class="gallery-item">10</div>
      <div class="gallery-item">11</div>
      <div class="gallery-item">12</div>
      <div class="gallery-item horizontal">13</div>
      <div class="gallery-item">14</div>
    </div>
```
Chúng tôi muốn các mục có horizontal class trải dài trên hai ô cột và các mục có vertical class trải dài trên hai ô hàng. Vì vậy, trong file CSS:
```
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
  grid-gap: 1rem;
  grid-auto-flow: dense;
}
.horizontal {
  grid-column: span 2;
}
.vertical {
  grid-row: span 2;
}
```
Và đó là cách dễ dàng. Bạn có thể tìm thấy mã hoàn chỉnh trong [codepen](https://codepen.io/anhnt1712/pen/wvMJqzo): 
![](https://images.viblo.asia/54291fb3-a906-45d5-9204-b6d4594c6b00.jpeg)
### Fancy homepage layout
Đối với ví dụ thực tế cuối cùng này, hãy thực sự triển khai bố cục trang chủ sẽ giống với Hình 5 sau đây :
![](https://images.viblo.asia/2b0e95aa-30e2-4438-a45a-fbf3d649bd23.jpeg)
Hình 5: Bố cục homepage ưa thích    

Tôi sẽ chia trang thành các yếu tố khác nhau. Ở đầu chúng ta có toolbar, sau đó chúng ta có khu vực title chính ở giữa bên trái. Tôi có panel màu trắng, và cuối cùng, tôi có carousel (với ba buttons lớn). Tôi sẽ làm việc với mẫu bên dưới đại diện cho các khu vực khác nhau mà tôi đã đề cập:
```
  <main class="fancy-homepage">
      <div class="toolbar">Toolbar</div>
      <div class="title">Main title</div>
      <div class="panel">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Aspernatur delectus voluptatem maxime modi nesciunt officia.
      </div>
      <div class="caroussel">
        <div class="caroussel-item">item 1</div>
        <div class="caroussel-item">item 2</div>
        <div class="caroussel-item">item 3</div>
      </div>
    </main>
```
Tôi sẽ bắt đầu bằng cách implement grid. Tôi đã hình dung ra một grid gồm 24 cột và 14 hàng hoạt động khá tốt cho việc này. Mã CSS sẽ trông như thế này:
```
.fancy-homepage {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(14, 1fr);
}
```
Tiếp theo, hãy đặt toolbar trên lưới. Tôi muốn toolbar trải dài trên một hàng và trải rộng trên tất cả các cột (tất cả chiều rộng của màn hình):
```
.toolbar {
  grid-row: 1 / span 1;
  grid-column: 1 / -1;
}
```
Sau này, chúng ta sẽ đặt panel. chúng ta sẽ để một hàng trống giữa toolbar và panel. Điều đó có nghĩa là panel sẽ bắt đầu ở hàng 3. Ngoài ra, chúng tôi muốn bảng bắt đầu ngay trước giữa chiều rộng của màn hình cho đến cạnh của màn hình (ở bên phải):
```
.panel {
  grid-row: 3 / -1; /* to leave an empty row between the toolbar and the panel */
  grid-column: 10 / -1; /* the width-middle of the screen is 12 */
}
```
Chúng ta sắp hoàn thành, hãy đặt carousel ngay bây giờ: tôi muốn nó ở dưới cùng của màn hình (bắt đầu một chút dưới giữa chiều cao của màn hình) và tôi muốn nó có chiều rộng:
```
.caroussel {
  grid-row: 9 / -1; /* the height-middle of the screen is 7 */
  grid-column: 1 / -1;
}
```
![](https://images.viblo.asia/b2bfbcb3-af77-4319-a514-5f7dedd371ee.png)
Hình 6: Fancy homepage layout draft    

Để hoàn thành ví dụ này, hãy đặt khu vực main-title trên không gian blanc ở giữa bên trái màn hình. Theo chiều dọc, giới hạn của nó phải là hàng 9 (vì đây là hàng bắt đầu của carousel) và theo chiều ngang giới hạn là dòng 10 cột (vì đây là dòng cột bắt đầu của panel). nhưng chúng ta hãy chừa một khoảng trống giữa các thành phần, vì vậy khu vực main-title phải bắt đầu ở dòng cột 2 và dừng ở dòng thứ 9 (10 - 1) và nó phải bắt đầu từ dòng 3 đến hàng thứ 8 (9 - 1):
```
.title {
  grid-row: 3 / 8;
  grid-column: 2 / 9;
}
```
Và đó là nó! Sau khi thêm một số kiểu dáng, vì vậy mọi thứ sẽ tốt đẹp, chúng tôi có kết quả cuối cùng trong [codepen](https://codepen.io/anhnt1712/pen/KKVWvNX)

![](https://images.viblo.asia/2b3c5050-4735-4821-ae99-583b4d641b10.png)
Một điều tốt đẹp bạn có thể làm để thực hành là rẽ nhánh codepen này và thay vì sử dụng các số đường lưới (có thể trở nên lộn xộn), thay vào đó, hãy sử dụng các đường lưới có tên (bạn có thể đặt bí danh cho các đường lưới, như chúng ta đã thấy trong bài đầu tiên )

# Wrapping up

Trong bài viết này, tôi đã thấy ba tình huống mà một nhà phát triển web có thể gặp phải bằng cách này hay cách khác và tôi đã thấy cách lưới CSS giúp tôi dễ dàng thực hiện một số hành vi (như tính độc lập thứ tự nguồn của thư viện hình ảnh) rất khó khăn để đạt được ở cách khác khác. Ngoài ra, lưới CSS cho phép tôi giữ một mẫu thực sự sạch trong khi thực hiện một số hành vi đặc biệt và một số (ít nhiều) bố cục ưa thích mà theo yêu cầu của tôi.

Tôi hy vọng bạn thích bài viết này, và rằng bạn đã tìm thấy thứ gì đó hữu ích :)