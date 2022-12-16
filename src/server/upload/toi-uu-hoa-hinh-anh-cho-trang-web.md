*TL;DR*: bạn lười đọc? Không sao, [click vào đây](https://viblo.asia/p/toi-uu-hoa-hinh-anh-cho-trang-web-L4x5xwDalBM#_tom-lai-la-gi-22)
# Tối ưu hóa hình ảnh thì làm gì?
- Tốc độ tải trang của 1 trang web thì phụ thuộc vào nhiều yếu tố, từ cấu hình server, nơi đặt server, code có xịn hay lởm, rồi thì js, css thế nào ra sao. Ngoài ra, còn có "độ nặng" của các hình ảnh (icon, ảnh trong assets, ảnh người dùng upload,...) cũng ảnh hưởng đến tốc độ tải trang.
- Tối ưu hóa là làm những công việc đại loại như giảm kích thước (dimension) hoặc kích thước (size) của tệp hình ảnh, hoặc làm các công việc khác. Cụ thể sẽ được trình bày ở phía sau.
# Lợi ích của việc tối ưu hóa hình ảnh
Tất nhiên thì có lợi thì mới làm rồi, không thì cũng không rảnh:
- Cải thiện tốc độ tải trang: Nếu trang của chúng ta mất quá nhiều thời gian để tải, người dùng có thể cảm thấy khó chịu vì phải chờ đợi và chuyển sang một thứ khác hay ho hơn.
- Giúp cải thiện SEO: Các tệp lớn làm chậm trang web và các công cụ tìm kiếm thì "ghét" các trang web chậm. Google sẽ thu thập thông tin và lập chỉ mục hình ảnh trong trang web của chúng ta nhanh hơn cho tìm kiếm hình ảnh. (Xem thêm [How to Check Image Traffic in Google Analytics](https://passion.digital/blog/how-to-check-image-traffic-in-ga/))
- Tạo bản sao lưu sẽ nhanh hơn. (push lên git ấy :v)
- Kích thước file hình ảnh nhỏ hơn thì việc sử dụng băng thông sẽ ít hơn. Lấy 1 ví dụ, ảnh gốc 590 KB, sau khi nén còn 151 KB, giảm 439KB, và ảnh này là 1 trong số những bức ảnh nằm trên 1 trang của [dân trí](dantri.com.vn) với mức truy cập [100 triệu lượt 1 tuần](https://dantri.com.vn/xa-hoi/dan-tri-dat-ky-luc-truy-cap-moi-1344104149.htm) => tiết kiệm được 43.9TB băng thông 1 tuần cho 1 bức ảnh (tính đúng không nhỉ? sao mà to vãi thế @@) ờ đấy đại loại là tiết kiệm băng thông.
- Cần dung lượng lưu trữ ít hơn trên server. 
# Cách tối ưu hóa hình ảnh
## Chọn định dạng file phù hợp
Về cơ bản, có ba định dạng phổ biến nên được sử dụng: JPEG, PNG và GIF.
### JPG
- [JPG](https://en.wikipedia.org/wiki/JPEG) (còn được gọi là JPEG) là loại tệp phổ biến nhất cho hình ảnh trên web. JPG là hoàn hảo cho các bức ảnh bình thường hoặc các hình ảnh phức tạp chứa nhiều màu sắc, độ bóng, độ dốc hoặc các patterns phức tạp khác.
- JPG có thể được lưu 1 bức ảnh ở chất lượng cao, chất lượng thấp hoặc vị trí trung bình (giữa cao và thấp tùy người tạo ra). Điều này cho phép ta điều chỉnh và lưu hình ảnh chính xác theo cách mà ta muốn, cân bằng chất lượng và kích thước file.

### PNG
- [PNG](https://en.wikipedia.org/wiki/Portable_Network_Graphics) là một định dạng tệp phổ biến khác. Trong Adobe Photoshop , có tùy chọn để lưu PNG dưới định dạng PNG-8 hoặc PNG-24.
- PNG-8 có một pallet (phổ màu à hay gì đó đại loại là thể hiện được số lượng màu) màu rất hạn chế là 256 màu. Mặc dù kích thước hình ảnh nhỏ hơn, nhưng đây không phải là lựa chọn tốt cho ảnh chụp và hình ảnh phức tạp.
- PNG-24 cung cấp hình ảnh có chất lượng cao hơn nhiều nhưng cái giá phải trả là kích thước file lớn hơn.
- Tuy nhiên, người ta vẫn dùng PNG vì định dạng này có 1 thứ thú vị là `transparency` (tức là ảnh mà có nền trong suốt mà ta vẫn hay dùng đó). Đây là một trong những điểm khác biệt lớn nhất giữa PNG và JPEG.

### GIF
- [GIF](https://en.wikipedia.org/wiki/GIF) chỉ sử dụng 256 màu.
- Đây là lựa chọn tốt nhất khi mà ta muốn có 1 tấm ảnh động.

### SVG

[SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) là định dạng vectơ có thể mở rộng (scalable vector format) hoạt động tốt cho logos, icons, text và hình ảnh đơn giản.

- SVG tự động mở rộng trong cả trình duyệt và công cụ chỉnh sửa ảnh.
- Google lập chỉ mục SVG, giống như cách thực hiện PNG và JPG, do đó không phải lo lắng về SEO.
- SVG theo truyền thống (tất nhiên là không phải luôn luôn) có kích thước file nhỏ hơn so với PNG hoặc JPG.

Có thể đọc thêm [tại đây](http://genkihagata.com/blog/svg-vs-flat-images.html) về SVG.

## Nén ảnh
Nén hình ảnh liên quan đến việc giảm kích thước tính file mà không làm giảm đáng kể chất lượng của hình ảnh. À thì nói như vậy, nhưng mà rốt cuộc thì vẫn có 2 cách nén: lossy và lossless.

Ảnh gốc làm ví dụ: định dạng JPG - kích cỡ 590 KB
![hihi](https://kinsta.com/wp-content/uploads/2015/11/low-compression-high-quality-jpg.jpg)

### Lossy
Lossy - cách này sẽ loại bỏ một số dữ liệu bên trong image. Điều này sẽ làm suy giảm chất lượng hình ảnh, vì vậy bạn sẽ phải cẩn thận về việc giảm image đi bao nhiêu. Kích thước file có thể được giảm xuống một lượng khá lớn, nhưng bù lại hình ảnh có thể chả nhìn thấy gì. :v 

Và nén bằng cách này 1 cách mạnh tay: định dạng JPG - kích cỡ 68 KB

![hihi](https://kinsta.com/wp-content/uploads/2015/11/high-compression-low-quality-jpg.jpg)

### Lossless
Lossless - đây đúng là nén dữ liệu :v và nó chả mất mát gì cả. Cách này không làm giảm chất lượng nhưng nó sẽ yêu cầu các hình ảnh phải được giải nén trước khi chúng được hiển thị.

Ví dụ ảnh gốc: 3.5MB
![haha](https://cdn.perfmatters.io/wp-content/uploads/2017/05/1-jpg-uncompressed.jpg)

Ảnh được nén: 778KB

![aaa](https://cdn.perfmatters.io/wp-content/uploads/2017/05/1-jpg-compressed.jpg)

### Dùng cái gì để nén?
Trong thư viện imagemagik có 1 thứ để nén, chuyển đổi định dạng image là [convert](https://www.imagemagick.org/script/convert.php):
```
convert INPUT.gif_or_png -strip [-resize WxH] [-alpha Remove] OUTPUT.png
```

Ví dụ:

![](https://images.viblo.asia/928b221d-6600-4d50-810c-334f57984e16.png)

Hoặc đơn giản là dùng photoshop để xuất bản lại 1 bức ảnh có mức độ thân thiện hơn đối với trang web của mình :v

## Cân bằng giữa chất lượng và kích thước

Như ở trên đã nói, chúng ta có thể nén image, tuy nhiên thì nhẹ đi liền với xấu =)) cần phải cân bằng giữa nặng vừa vừa và dễ nhìn: ví dụ: Nén trung bình (chất lượng tuyệt vời) định dạng JPG - kích cỡ 151 KB

![jjjj](https://kinsta.com/wp-content/uploads/2015/11/medium-compression-medium-quality-jpg-1.jpg)

## Giảm kích thước hình ảnh
Cũng là kích thước image nhưng mà ở đây mình muốn nói về dimensions - chiều rộng và dài tính bằng px của image. Giảm kích thước image cũng khiến ảnh "nhẹ" đi đôi chút.

Chúng ta có thể làm là:
- Giảm kích thước hình ảnh trước khi lưu: dùng photoshop chẳng hạn, thay đổi kích thước của image rồi mới upload (người dùng có tâm)
- Giảm kích thước hình ảnh trong khi lưu hình ảnh: việc này của chúng ta đây, mình thì thường thay đổi nó trong hàm upload image:

```
class ImageService
{
    public static function uploadFile($image)
    {
        $dimension = [1920, 1080];
        //....
        $makeImage = Image::make($image)->orientate()->resize($dimension[0], $dimension[1])->stream();
        //....
        $storage->put($filePath, $makeImage->__toString(), 'public');
        //....
    }
}
```

## Xóa "siêu dữ liệu" khỏi các tệp

- Một trong những cách để giảm kích thước của ảnh là xóa `metadata` khỏi các file hình ảnh trước khi tải chúng lên trang web.
- Dữ liệu meta hình ảnh (hình như còn được gọi là `exif`) được lưu trữ trên bất kỳ ảnh nào và bao gồm: ngày chụp, mẫu máy ảnh, flash được sử dụng, Vị trí GPS, iso, kích thước ống kính, tốc độ màn chập v.v... 
- Một lý do chính đáng khác để xóa dữ liệu meta hình ảnh là vì mục đích bảo mật. Facebook nó đang làm điều đó, mọi ảnh upload lên fb thì không còn thông tin exif.

## Sử dụng thumbnail
Cái này hay này, thay vì hiển thị toàn bộ image ra trang của mình, thì thay vào đó là mình sẽ dùng thumbnail (sinh ra lúc upload file, chỗ mà resize trong ví dụ trên của mình ấy) là 1 hình ảnh nhỏ hơn, người dùng muốn xem ảnh to thì phải click vào thì ảnh to mới được load ra. Nói thì dài chứ đơn giản là dùng 1 thư viện như [Fancybox](http://fancybox.net/) chẳng hạn, hoặc đơn giản hơn là làm cái link nhảy sang tab khác. Ví dụ thì như Viblo này (nhưng mà hình như cũng không dùng thumbnail thì phải)

## Sử dụng text là text thay vì là text bằng hình
Nghe có vẻ lằng nhằng và khó hiểu, ý mình là ví dụ có những banner quảng cáo hay câu slogan gì gì đó, ngta thay vì viết ra, thì sẽ vẽ nhăng vẽ cuội và xuất thành 1 file image, rồi show nó ra. Thì bây giờ không nên làm thế, mà hay dùng trực tiếp là text và style lại nó bằng css chẳng hạn.

Cái này cũng khá là tốt cho SEO.

## Không Scale Images

Ví dụ ta có 1 image, đặt trong thẻ `img` và có set thuộc tính `height` và `width` nhỏ hơn kích thước thật của ảnh, với mong muốn là trông nó `bé` hơn thì sẽ `nhẹ` hơn, nhưng mà không phải, nó vẫn load `nặng` như vậy thôi. Hoặc là làm thế với mong muốn nó nhỏ đi để làm thumbnail, nhưng không nên làm thế, mà nên tạo 1 thumbnail lúc upload và dùng cái thumbnail đó cho trường hợp này.

## Kết hợp Images để tiết kiệm HTTP Requests
Cái này có vẻ khó hiểu này, đại loại là thay vì load lần lượt từng image thì ta giao lưu kết hợp nhiều image để load 1 lần cho vui, ngta gọi là multi-some. ok, đọc thêm [tại đây](http://www.websiteoptimization.com/speed/tweak/combine/)

## The Fewer Graphics the Better
Ý ở đây ngta bảo là dùng càng ít image thì càng tốt, không dùng thì cũng tốt. Thay vào đó có thể thay thế bằng cách style theo css thì tốt hơn.

## Sử dụng CDN

Giống như css hay js, chúng ta cũng có thể lưu hình ảnh trên cdn và không phải quan tâm lo lắng về vùng miền lẫn tốc độ load image mỗi khi đứt cáp quang nữa, họ lo hết cho mình.

## Lazy loading

Đây cũng là 1 cách hay này, tức là màn hình ở vị trí nào thì load ảnh ở vị trí đó, kéo xuống thì load tiếp ở vị trí tiếp theo. Ngày xưa mình làm Viblo cũng có áp dụng [jQuery Lazy](http://jquery.eisbehr.de/lazy/), giờ chắc đập đi làm lại hết rồi :v 
Yeah, thôi thì cũng có ví dụ tý code cho đỡ chán:

Thêm file html:

```html
<body class="asyncImage" data-src="https://i.imgur.com/EWx6Ao5.jpg">
  <div class="container">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</body>
```

Thêm tý css:

```css
body {
  background-image: url('https://i.imgur.com/ffmMq6q.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.container {
  width: 700px;
  margin: 0 auto;
}
```

Cuối cùng thêm tý js:

```javascript
(() => {
  'use strict';
  const objects = document.getElementsByClassName('asyncImage');
  Array.from(objects).map((item) => {
    const img = new Image();
    img.src = item.dataset.src;
    img.onload = () => {
      item.classList.remove('asyncImage');
      
      return item.nodeName === 'IMG' ? 
        item.src = item.dataset.src :        
        item.style.backgroundImage = `url(${item.dataset.src})`;
    };
  });
})();
```

Các bạn paste thử vào rồi chạy xem thế nào. :D

# Tóm lại là gì?
- Sử dụng hình ảnh vector SVG bất cứ khi nào có thể cùng với PNG và JPG.
- Sử dụng CDN để phục vụ khách hàng (có tâm) trên toàn tg.
- Xóa dữ liệu`metadata` không cần thiết.
- Cắt không gian màu trắng và tạo lại nó bằng cách sử dụng CSS.
- Sử dụng hiệu ứng CSS3 càng nhiều càng tốt
- Lưu hình ảnh theo kích thước phù hợp.
- Sử dụng phông chữ web thay vì đặt văn bản trong hình ảnh.
- Giảm độ sâu bit xuống.
- Sử dụng nén mất dữ liệu (lossy) nếu có thể.
- Sử dụng GIF nếu cần ảnh động (nhưng cũng nên nén lại)
- Sử dụng PNG nếu cần chi tiết cao và độ phân giải cao
- Sử dụng JPG cho ảnh chụp thường (photo) và ảnh chụp màn hình (screenshot)
- Xóa ảnh nào đó nếu không cần nó.
- Tải hình ảnh theo cách `lazy loading` để hiển thị trang đầu tiên nhanh hơn

# Kết luận
Kiến thức không tự sinh ra cũng không tự mất đi, nó chỉ chuyển hóa từ trang này sang trang khác. Bài viết được tham khảo tư liệu tại:

* https://kinsta.com/blog/optimize-images-for-web/
* http://genkihagata.com/blog/svg-vs-flat-images.html
* https://medium.com/front-end-hacking/how-to-optimize-image-loading-on-your-website-855020fb41ae
* https://developers.google.com/speed/docs/insights/OptimizeImages
* https://www.imagemagick.org/script/index.php
* https://www.abetterlemonadestand.com/optimizing-images-for-web/

Ngoài ra còn thêm các phần chém gió từ mình, do vậy có chém sai thì mọi người chém nhẹ tay, hoặc do buồn ngủ nên chém thiếu thì mọi người chém tiếp hộ mình.

Đặc biệt xin cảm ơn nhà tài trợ chính của bài viết:
- https://www.google.com/
- https://translate.google.com/

techtalk có lấy bài thì ghi cả tên tớ vào nữa nhé, hôm trước các bạn lấy bài tớ còn chèn link sai vào nguồn :-s