## Giới thiệu
Đã một vài năm kể từ khi các đơn vị Viewport được giới thiệu trong CSS. Chúng là các đơn vị giúp responsive nghĩa là giá trị của chúng thay đổi mỗi khi thay đổi kích thước trình duyệt.  Nếu bạn đã nghe về các đơn vị này trước đây nhưng chưa tìm hiểu về chúng một cách chi tiết, bài viết này có thể giúp bạn hiểu hơn về chúng.
## Các đơn vị và ý nghĩa của chúng
Có 4 đơn vị dựa trên viewport trong CSS. Đó là `vh, vw, vmin` và `vmax`.
- **Viewport Height (vh)** - Đơn vị này dựa trên chiều cao của khung nhìn. Giá trị `1vh` bằng 1% chiều cao của khung nhìn.
- **Viewport Width (vw)** - Đơn vị này dựa trên chiều rộng của khung nhìn. Giá trị `1vw` bằng 1% chiều rộng khung nhìn.
- **Viewport Minimum (vmin)** - Đơn vị này dựa trên **kích thước nhỏ hơn** của khung nhìn. Nếu chiều cao của khung nhìn nhỏ hơn chiều rộng, giá trị của `1vmin` sẽ bằng 1% chiều cao của khung nhìn. Tương tự, nếu chiều rộng của khung nhìn nhỏ hơn chiều cao, giá trị của `1vmin` sẽ bằng 1% chiều rộng của khung nhìn.
- **Viewport Maximum (vmax)** - Đơn vị này dựa trên kích thước lớn hơn của khung nhìn. Nếu chiều cao của khung nhìn lớn hơn chiều rộng, giá trị của `1vmax` sẽ bằng 1% chiều cao của khung nhìn. Tương tự, nếu chiều rộng của khung nhìn lớn hơn chiều cao, giá trị của `1vmax` sẽ bằng 1% chiều rộng của khung nhìn.

Hãy cùng xem các giá trị của các đơn vị này trong các tình huống khác nhau:
- Nếu khung nhìn rộng 1200px và cao 1000px thì giá trị của `10vw` sẽ là 120px và `10vh` sẽ là 100px. Vì độ rộng khung nhìn nhìn lớn hơn độ cao của khung nhìn do đó giá trị của `10vmax` sẽ là 120px và `10vmin` sẽ là 100px.
- Nếu thiết bị ở chế độ xoay thì khung nhìn sẽ rộng 100px và cao 1200px, giá trị của `10vh` sẽ là 120px và `10vw` sẽ là 100px. Điều thú vị là giá trị của `10vmax` vẫn là 120px bởi vì sẽ tính toán dựa trên độ cao cảu khung nhìn. Tương tự `10vmin` sẽ là 100px.

Các đơn vị viewport có vẻ như tương tự đơn vị `%`. Tuy nhiên, chúng rất khác nhau. Trong trường hợp `%`, chiều rộng hoặc chiều cao của phần tử con được xác định đối với phần tử cha của nó. Đây là một ví dụ:

{@embed: https://codepen.io/SitePoint/pen/xqadex}

Như bạn có thể thấy, chiều rộng của phần tử con đầu tiên được đặt bằng 80% chiều rộng phần tử cha của nó. Tuy nhiên, phần tử con thứ hai có chiều rộng `80vw`, làm cho nó rộng hơn phần tử cha của nó.

## Ứng dụng của đơn vị Viewport
Vì các đơn vị này dựa trên kích thước khung nhìn, nên rất thuận tiện để sử dụng chúng trong các tình huống trong đó chiều rộng, chiều cao hoặc kích thước của các yếu tố cần được đặt so với khung nhìn.

### Fullscreen Background Images or Sections
Rất phổ biến đó là đặt hình ảnh nền của phần tử bao phủ hoàn toàn màn hình. Tương tự, bạn có thể muốn thiết kế một trang web trong đó mỗi phần riêng lẻ về một sản phẩm hoặc dịch vụ phải bao phủ toàn bộ màn hình. Trong những trường hợp như vậy, bạn có thể đặt chiều rộng của các phần tử tương ứng bằng 100% và đặt chiều cao của chúng bằng 100vh.
HTML code:
```
<div class="fullscreen a">
  <p>a<p>
</div>
```

CSS code:
```
.fullscreen {
  width: 100%;
  height: 100vh;
  padding: 40vh;
}

.a {
  background: url('path/to/image.jpg') center/cover;
}
```

{@embed: https://codepen.io/SitePoint/pen/gmdRYx}


### Tạo responsive cho Text
Như chúng ta đã đề cập ở trên, giá trị của đơn vị viewport sẽ thay đổi dựa trên kích thước của khung nhìn. Điều này có nghĩa là nếu bạn sử dụng thuộc tính `font-size` cho thẻ tiêu đề nó sẽ vừa vặn với các kích thước màn hình khác nhau. Khi khung nhìn thay đổi trình duyệt sẽ tự động co dãn font-size phù hợp. Điều duy nhất bạn phải làm đó là set thuộc tính `font-size` của phần tử bằng đơn vị viewport.

{@embed: https://codepen.io/SitePoint/pen/XMPgdr}

### Căn giữa phần tử

Các đơn vị viewport rất hữu ích khi bạn muốn đặt một yếu tố chính xác ở trung tâm của màn hình. Nếu bạn biết chiều cao của phần tử, bạn chỉ cần đặt giá trị trên cùng và dưới cùng của thuộc tính lề bằng `[(100 - chiều cao) / 2] vh`.

```
.centered {
  width: 60vw;
  height: 70vh;
  margin: 15vh auto;
}
```

{@embed: https://codepen.io/SitePoint/pen/evLRdq}


### Browser Support

Dựa trên dữ liệu từ [caniuse](http://caniuse.com/#feat=viewport-units) thì hầu hết các trình duyệt đều hỗ trợ đơn vị viewport. Chỉ còn 1 số vấn đề nhỏ trên trình duyệt IE9 và IE10.

## Kết luận 
Trong bài viết này, mình đã đề cập ngắn gọn về ý nghĩa, ứng dụng và hỗ trợ trình duyệt của các đơn vị viewport trong CSS. Nếu bạn biết về bất kỳ vấn đề ứng dụng hoặc trình duyệt thú vị nào khác liên quan đến các đơn vị này, hãy để lại comment phía dưới nhé.

Bài viết tham khảo: [CSS Viewport Unit](https://www.sitepoint.com/css-viewport-units-quick-start/)