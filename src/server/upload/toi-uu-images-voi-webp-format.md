Trong những bài viết gần đây, tôi đã giới thiệu với các bạn một vài giải pháp cải thiện web performance như:
- [Loại bỏ render-blocking resources](https://viblo.asia/p/loai-bo-render-blocking-resources-RQqKLogr57z)
- [Sử dụng workbox để cache third party scripts](https://viblo.asia/p/su-dung-workbox-de-cache-third-party-scripts-Eb85orz0l2G)

Để tiếp tục với chủ đề này, tôi sẽ giới thiệu tới các bạn làm thế nào để sử dụng image format hợp lý, responsive chúng ra sao và cách để lazy load những loại images này. Như chúng ta đã biết, images trong một website thường chiếm dung lượng lớn trong toàn bộ các resources nếu không nói là lớn nhất. Vì vậy, với mong muốn giảm dung lượng tải trang thì việc đầu tiên bạn cần làm là tìm cách tối ưu các images. Có nhiều cách làm điều đó như giảm size, sử dụng format hiệu quả, lazy load,..Trong bài viết này tôi sẽ tập trung vào cách sử dụng format **webp** và lazy load chúng.

# Webp format
**Webp** là một format image hiện đại được phát triển bở Google. Nó cung cấp khả năng nén image không mất mát dữ liệu hiệu quả vượt trội trên web. Webp sẽ làm dung lượng nhỏ hơn 26% so với ảnh PNG và 25-34% so với ảnh JPEG. Đồng thời nó cũng hỗ trợ transparency như ảnh PNG. Sử dụng webp giúp bạn tạo ra các image nhỏ hơn, giữ được chi tiết và tăng tốc độ tải trang của web. Các bạn có tìm hiểu thêm về image webp ở đây https://developers.google.com/speed/webp?hl=vi

Cho đến hiện tại hầu hết cá trình duyệt đã hỗ trợ format này như Google Chrome, Firefox, Edge, Opera browser. IE và Safari không hỗ trợ chúng, tuy nhiên đừng lo lắng về điều này vì các bạn các tool và libs để thực hiện việc hiện thị cho những trình duyệt không hỗ trợ.

# Convert images sang webp format
### 1. Sử dụng tool cwebp

#### Install cwebp trên ubuntu
```bash
sudo apt-get update
sudo apt-get install webp
```
#### Convert một image
Convert với default setting
```powershell
cwebp images/flower.jpg -o images/flower.webp
```
Convert với chất lượng bằng 90% so với ảnh gốc
```powershell
cwebp -q 90 images/flower.jpg -o images/flower.webp
```
#### Convert image trong thư mục
- Convert tất cả các image trong cùng một thư mục
```powershell
for file in images/*; do cwebp "$file" -o "${file%.*}.webp"; done
```
- Tạo một bash script (giả sử đặt tên file là ```webp-convert.sh```) để convert một thư mục image bất kỳ
```bash
#!/bin/bash

# converting JPEG images
find $1 -type f -and \( -iname "*.jpg" -o -iname "*.jpeg" \) \
-exec bash -c '
webp_path=$(sed 's/\.[^.]*$/.webp/' <<< "$0");
if [ ! -f "$webp_path" ]; then
  cwebp -quiet -q 90 "$0" -o "$webp_path";
fi;' {} \;

# converting PNG images
find $1 -type f -and -iname "*.png" \
-exec bash -c '
webp_path=$(sed 's/\.[^.]*$/.webp/' <<< "$0");
if [ ! -f "$webp_path" ]; then
  cwebp -quiet -lossless "$0" -o "$webp_path";
fi;' {} \;
```

Ở bash trên tôi chỉ convert 2 loại image `png` và `jpg`. Bạn có thể chỉ định bất kỳ loại format khác nữa nếu muốn. Khi bash script đã được tạo bạn có thể lưu trữ và thực hiện với bất kỳ thư mục nào, ví dụ với command sau:
```bash
./webp-convert.sh /<web_root_path>/public/images/
```

### 2. Sử dụng webpagetest
Ngoài cách dùng tool **cwebp**, các bạn có thể dùng nhiều tool online để convert image sang **webp**. Một trong những tool rất hữa ích đó là https://www.webpagetest.org/. Với web page test này chúng có thể phân tích chi tiết các tiêu chí liên quan đến performance như: **First Contentful Paint (FCP), Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), Speed Index**, ..Trong đó có chức năng **Image Analysis** giúp chúng ta có thể thấy được những image có thể cải thiện và format nào là tối ưu.

#### Thực hiện test performance một website
- Vào https://www.webpagetest.org/, tiếp theo đánh địa chỉ vào input, cấu hình một số thông số như **Test Location**, **Browser**,... và click button **Start Test**

![](https://images.viblo.asia/52dc7b01-1876-4c6b-b576-4c4df8b4b954.png)

- Tại trang **Summary** của webpagetest -> click link **Image Analysis** -> Chuyển đến trang phân tích image

![](https://images.viblo.asia/36cd131f-90e4-4706-8447-6caf7c632929.png)

- Tại trang **Image Analysis**, bạn sẽ thấy tất cả các images của của trang đang được test. Trong đó, bạn có thể biết được format, size của image hiện tại. Đồng thời cũng thấy được các đề suất tối ưu về size và format images như hình bên dưới:

![](https://images.viblo.asia/ad90b877-7a75-4379-8b05-9806c892df88.png)

Ở đây, tôi đang quan tâm đến ```webp``` và sẽ download nó về để thay thế image trong website của mình. Với việc dùng **webpagetest** để lấy về images ```webp``` có ưu điểm là tool đã tính toán để làm sao convert tối ưu. Do vậy, images **webp** ở đây thường là có dụng lượng nhỏ trong khi vẫn đảm bảo chất lượng hơn là convert thủ công. Ngoài ra cũng nhìn thấy được các lựa chọn khác về format như: ```avif```, ```jpeg2000```,..
# Cách sử dụng webp
### 1. Sử dụng webp trong html
Trong html bạn có thể dùng tag ```picture``` để hiển thị image `webp`
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="Alt Text!">
</picture>
```

Lưu ý rằng vẫn cần một tag ```img``` trong ```picture``` nhằm mục đích hiển thị image đối với các trình duyệt không hỗ trợ ```webp```.

Để xử lý responsive image với ```picture``` chúng ta có thể thêm thuộc tính ```media```. Câu hỏi đặt ra là liệu trình duyệt có tải cả 3 ảnh cùng lúc không ? Bạn không cần lắng về điều đó, trình duyệt sẽ dựa vào size màn hình kết hợp với thuộc tính ```media``` để load image tương ứng, chỉ một ảnh được load phù hợp với kích thước màn hình.

```html
 <picture>
    <source media="(min-width: 768px)" type="image/webp" srcset="image_pc.webp">
    <source media="(max-width: 767px)" type="image/webp" srcset="image_sp.webp">
    <img src="image_pc.png" alt="Alt Text!"">
</picture>
```

### 2. Sử dụng webp trong css
Để sử dụng `webp` trong css chúng ta cần đến thư viện **Modernizr**. Thư viện này sẽ thực hiện công việc check sự hỗ trợ CSS3 và HTML5 của trình duyệt từ đó giúp bạn có thể biết được trình duyệt có hỗ trợ ```webp``` hay không. Nếu trình duyệt hỗ trợ ```webp``` thì một class ```webp``` sẽ được thêm vào tag ```html``` ngược lại sẽ là class ```no-webp```. Dựa trên cơ sở đó, chúng ta có thể viết các css class tương ứng.

- Download js file https://modernizr.com/download và đưa vào tag ```script``` trong ```html```
```html
<script src="js/modernizr-custom.js" async></script>
```
- Viết css tương ứng cho trình duyệt hỗ trợ và không hỗ trợ webp

```css
.webp .elementWithBackgroundImage{
  background-image: url("image.webp");
}

.no-webp .elementWithBackgroundImage {
  background-image: url("image.png");
}
```

# Lazy load cho images webp
Để thực hiện lazy load cho image **webp** sử dụng tag ```picture``` chúng ta có thể dùng lib https://github.com/aFarkas/lazysizes

### 1. Cài đặt
```bash
npm install lazysizes --save
```

- Sử dụng tag ```script```
```html
<script src="lazysizes.min.js" async=""></script>
```

- Hoặc sử dụng ```import```

```js
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
```

### 2. Sử dụng
Việc áp dụng **lazysizes** rất đơn giản, bạn chỉ cần thêm ```class="lazyload"``` vào tag ```'img``` và không cần bất kỳ config nào khác
```html
<picture>
    <source media="(min-width: 768px)" type="image/webp" srcset="image_pc.webp">
    <source media="(max-width: 767px)" type="image/webp" srcset="image_sp.webp">
    <img src="image_pc.png" alt="Alt Text!" class="lazyload">
</picture>
```

Đó là tất cả những gì bạn cần làm để có thể áp dụng lazy load cho image ```webp``` sử dụng tag ```picture```

# Kết
Tối ưu dung lượng image trên website là rất quan trọng. Nó giúp giảm dung lượng resources được tải xuống, tăng tốc độ load trang, cải thiện điểm google speed. Điều này giúp cho website của bạn có trải nghiệm tốt hơn và thu hút được nhiều người dùng hơn. Có nhiều cách để thực hiện việc tối ưu image, trong số đó việc sử dụng image **webp** là phương án hiệu quả. Nó giúp giảm đáng kể dung lượng image đồng vẫn giữ được chất lượng tốt. Webp cũng được đa số các trình duyệt hỗ trợ, tương lai các trình duyệt hiện đại còn lại khả năng cũng sẽ cập nhật để hỗ trợ. Cảm ơn các bạn đã theo dõi bài viết.

Tham khảo:<br>
https://web.dev/serve-images-webp/<br>
https://css-tricks.com/using-webp-images/