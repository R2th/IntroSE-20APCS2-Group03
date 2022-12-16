Đã từng có 1 khoảng thời gian, khi phải làm những task về giao diện, mình sử dụng thuộc tính ```float``` để bổ trí layout cho 1 trang web. Cách làm này sẽ gây ra nhiều lỗi về giao diện, và kéo theo, yêu cầu rất nhiều effort kiểm tra lại về ```width```, ```max-width```, ```margin```,... bên cạnh đó còn yêu cầu sử dụng các thuộc tính không cần thiết đại để như thuộc tính ```position``` với giá trị ```absolute``` hay việc sử dụng đến các hàm ```calc()``` .

Sau một khoảng thời gian làm việc và được sự support từ đồng đội, mình dần dần chuyển qua sử dụng ```CSS Grid``` và ```Flexbox``` vì nhiều lợi ích của cách thức tiếp cận này mang lại (chủ yếu là dễ dùng, đỡ tốn effort trong việc test responsive). 

# Thiết kế cơ bản
Giả sử, chúng ta có 1 layout của 1 landing page như bên dưới. Trang web bao gồm 2 sections: header và vùng content chính. Đối với header, ta sử dụng CSS Flexbox để cho vị trí của site name ở bên cạnh navigation. Còn đối với main content area thì áp dụng Grid Layout để bố trí layout của article thành 7 cột.
![](https://images.viblo.asia/b30409b3-2d33-4ee0-9450-68fa3d23772d.jpg)

# Tạo responsive header cơ bản sử dụng Flexbox

Flexbox (Flexible Box Module) cho phép lập trình viên quản lý *bố cục một chiều*. Hãy cùng nghía qua 1 ví dụ thực tế:

### Định nghĩa 1 "flex container"
Trước tiên, chúng ta tạo ra 1 đoạn HTML tương ứng với phần header:
```html
<div id="header">
  <div class="title">Site title</div>
  <div class="navigation">Navigation</div>
</div>
```
Để header này có thuộc tính của Flexbox layout, đơn giản: cho ```#header``` có thuộc tính CSS như sau:
```css
#header {
  display: flex;
}
```

Bằng việc set thuộc tính ```display``` thành ```flex```, element ```#header``` trở thành *flex container*, và các thuộc tính con trực tiếp trở thành các *flex items*
![](https://images.viblo.asia/7dc0e84e-b269-4e08-b6f8-1edc8837306f.jpg)

### Thiết lập hướng của "flex container"
*Flex container* sẽ quyết định các mà các items trong đó được bố trí
```css
#header {
  display: flex;
  flex-direction: row;
}
```
```flex-direction: row;``` sẽ đặt các elements ở trên 1 dòng.
![](https://images.viblo.asia/70d1bb3f-474e-4fd5-a644-e14d7966b36f.jpg)
Tương tự, ```flex-direction: column;``` sẽ đặt các elements ở trên 1 cột.
![](https://images.viblo.asia/f6d01413-6f54-4917-bba0-a7343908d15c.jpg)

Đây chính là khái niệm *"bố cục một chiều"* mà chúng ta nhắc đến ở trên. Chúng ta có thể đặt các element theo chiều cang (row) HOẶC dọc (column), nhưng không thể cả ngang và dọc cùng 1 lúc.

### Căn chỉnh "flex item"
```css
#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
```
Ở đây, các ```flex item``` được xếp trên cùng 1 dòng. Thuộc tính ```justify-content``` sẽ sắp xếp/phân bổ lại các ```flex item``` này. Có nhiều giá trị cho thuộc tính này, tuy nhiên ```justify-content: space-between``` sẽ tối đa hóa không gian ở giữa element site-name và navigation. Các giá trị khác bao gồm: ```flex-start```, ```space-between```, ```center```,...
![](https://images.viblo.asia/03a80c48-ec5f-48f0-8a5b-b51cb05a7635.jpg)

### "Flex container" responsive
Bằng cách sử dụng Flexbox, việc đáp ứng tính responsive cho 1 container khá là dễ dàng. Chúng ta có thể thay đổi hướng của ```flex container``` chỉ với 1 dòng lệnh CSS.
![](https://images.viblo.asia/52935606-15f5-4764-bb5b-f8011688e552.jpg)

Để đặt element navigation bên dưới site-name trên các thiết bị có màn hình nhỏ, chúng ta chỉ cần thay đổi ```flex-direction``` sử dụng câu lệnh ```media```:
```css
@media all and (max-width: 900px) {
  #header {
    flex-direction: column;
  }
}
```
Kết quả là, đối với thiết bị có chiều ngang nhỏ hơn 900 pixels, menu sẽ được render như sau:
![](https://images.viblo.asia/74981b30-c767-4465-8384-07bc5c464d8c.jpg)

# Bố trí các article sử dụng CSS Grid
Flexbox xử lý các bố cục theo một chiều (một hàng hoặc một cột). Điều này trái ngược với ```CSS Grid Layout``` - cho phép lập trình viên bố trí các element theo cả hàng và cột, CÙNG MỘT LÚC. Trong phần tiếp theo này, mình sẽ giải thích cách sử dụng CSS Grid để làm cho việc bố trí các bài viết của thú vị hơn.
![](https://images.viblo.asia/5f4cd736-dab7-4ca3-bb51-bad27de2c6c6.jpg)
Lấy ví dụ bằng đoạn code HTML như sau:
```html
<article>
  <h1>Lorem ipsum dolor sit amet</h1>
  <p class="description">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  <figure class="right">
   <img src="./image.jpg">
   <figcaption>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</figcaption>
  </figure>
  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
  <footer>
    Some meta data
    Some meta data
    Some meta data
  </footer>
</article>
```

Hiểu 1 cách đơn giản, ```CSS Grid Layout``` cho phép bạn xác định các cột và hàng. Những cột và hàng đó tạo thành 1 lưới (grid), tương tự như Excel spreadsheet hoặc HTML. Các element được đặt vào grid, có thể 1 element trên 1 cell, hoặc 1 element trài dài trên nhiều cell thuộc nhiều dòng hoặc nhiều cột

Chúng ta áp dụng grid layout cho toàn bộ article để được 7 cột:
```css
article {
  display: grid;
  grid-template-columns: 1fr 200px 10px minmax(320px, 640px) 10px 200px 1fr;
}
```

Dòng lệnh đầu tiên ```display: grid;``` sẽ đặt bài viết vào 1 ```grid container```

Dòng lệnh tiếp theo ```grid-template-columns``` sẽ xác định các cột trong grid. Trong ví dụ của chúng ta, có 7 cột được định nghĩa. Cột ở giã được định nghĩa là ```minmax(320px, 640px)``` sẽ là cột chứa nội dung của các article. ```minmax(320px, 640px)``` có nghĩa chiều rộng của cột sẽ được co dãn trong khoảng 320 pixels và 640 pixels, điều này sẽ tạo nên yếu tố responsive.

Ở mỗi bên của main content section sẽ có 3 cột. Cột 3 và cột 5 sẽ cung câp 10 pixels padding. Cột 2 và cột 6 có chiều rộng 200 pixels, có thể sử dụng cho metadata hoặc hình ảnh.

2 cột ngoài cùng có chiều rộng là 1fr, đóng vai trò là lề. 1fr có nghĩa là fraction/fractional unit. Chiều rộng của fractional unit được tính toán bởi trình duyệt. Trình duyệt sẽ lấy khoảng trống còn lại sau khi đã trừ đi các cột đã được fix chiều rộng và chia cho số lượng của các fractional unit. Trong ví dụ này, mình định nghĩa 2 fractional units, và 2 cột này sẽ có chiều rộng như nhau, để đảm bảo rằng phần nội dung sẽ ở chính giữa trang. Nếu trình duyệt rộng 1440 pixels, các cột được fix chiều rộng sẽ chiếm 1060 pixels (640 +10 + 10 + 200 + 200). Vậy có nghĩa là còn lại 380 pixels, chia đều cho 2 fractional units, mỗi cột sẽ có chiều rộng là 190 pixels.
![](https://images.viblo.asia/a97982f4-0caa-4636-b4e4-a9923d3091fb.jpg)

Đối với các cột sẽ yêu cầu việc khai báo rõ ràng từng cột một, tuy nhiên đối với các hàng thì việc đó là không cần thiết. Hệ thống grid layout sẽ tự động tạo các dòng cho từng phần tử con trực tiếp.
![](https://images.viblo.asia/d08c1055-16ef-4628-9db9-9b04148c302b.jpg)

Đến đây bố cục lưới của chúng ta đã được xác định, chúng ta phải gán các content elements đến từng vị trí trong lưới. Theo mặc định, hệ thống CSS grid layout có 1 *flow model* - nó sẽ tự động gán nội dung vào cell còn trống tiếp theo. Rất có thể, bạn sẽ muốn xác định rõ ràng nội dung sẽ được gán ở đâu:
```css
article > * {
  grid-column: 4 / -4;
}
```

Đoạn code trên sẽ đảm bảo rằng các elements là direct child của article sẽ bắt đầu ở cột thứ 4 tính từ bên trái và kết thúc tại cột thứ tư tính từ bên phải. Để hiểu rõ cú pháp này, mình sẽ giải thích thêm về khái niệm *column lines* hoặc *grid lines*:
![](https://images.viblo.asia/e94eebc5-f5f4-403e-9886-e84c1875244f.jpg)

Bằng việc sử dụng ```grid-column: 4 / -4```,  các elements sẽ được hiển thị ở *"main column* nằm giữa column line 4 và -4.

Tuy nhiên, chúng ta muốn ghi đè mặc định đó cho 1 số content elements. Ví dụ, ta có thể muốn hiển thị metadata bên cạnh content, hoặc muốn ảnh rộng hơn. Và đây sẽ là lúc CSS grid layout tỏa sáng: để làm cho hình ảnh chiếm toàn bộ chiều rộng, chỉ cần 1 dòng lệnh để nó trài dài từ cột đầu tiên đến cột cuối cùng:
```css
article > figure {
  grid-column: 1 / -1;
}
```
Để đặt các metadata từ bên phải sang bên trái của main content, ta làm như sau:
```css
#main article > footer {
  grid-column: 2 / 3;
  grid-row: 2 / 4;
}
```
![](https://images.viblo.asia/ea6ea666-c810-461f-9667-c598bfc414a0.jpg)

Và đây là toàn bộ những gì mình muốn chia sẻ về Flexbox và Grid layout trong CSS. Hy vọng các bạn có thể áp dụng những kỹ thuật này để dễ dàng hơn trong việc code front-end


-----
*Bài viết được tham khảo tại [Redesigning a website using CSS Grid and Flexbox](https://dri.es/redesigning-a-website-using-css-grid-and-flexbox)*