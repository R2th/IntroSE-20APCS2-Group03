## Giới thiệu
Aspect ratio là tỉ lệ khung hình của 1 element, là mối quan hệ giữa chiều rộng và chiều cao của element đó. Trong thiết kế web được sử dụng để duy trì tỷ lệ cho các video để khi responsvie tránh tình trạng video đó bị crop. Có  2 tỷ lệ phổ biến hiện nay đó là 4:3 và 16:9.
## Cách thực hiện
* **Bước 1:**
Đầu tiên tiên ta cần tạo các phần từ HTML, gồm có phần tử cha có tên là `.aspect-ratio-169`, và bên trong là 1 phần tử con ( có thể mà image hoặc 1 video bất kỳ), ở đây mình dùng iframe video.

**HTML:**
```
<div class="aspect-ratio-169">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/BIvezCVcsYs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
```
*  **Bước 2:**
Sử dụng 1 số thuộc tính cơ bản của CSS để tạo ra aspect ratio.

**CSS:**
```
.aspect-ratio-169 {
  display: block;
  position: relative;
  padding-top: 56.25%;
}

.aspect-ratio-169 iframe {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
```
**Giải thích:**
- ở class `.aspect-ratio-169` ta sử dụng `positon: realative` dùng để thiết lập một phần tử sử dụng các thuộc tính position *(absolute,static,fixed)* mà không làm ảnh hưởng đến việc hiển thị ban đầu.
- ở element con `(mình đang sử dụng iframe)` sử dụng `position: absolute` dùng để thiết lập vị trí của một phần tử nhưng nó sẽ luôn nằm trong một phần tử mẹ đang là relative. Với chiều dài và rộng là 100% và bắt đầu với toạ độ left: 0 và top: 0, như vậy là phần tử cha rộng bao nhiều thì phần tử con sẽ có độ rộng và dài bấy nhiêu.
- Để có tỷ lệ ratio là 16/9 trong mọi màn hình khi resize thì bắt buộc ta phải sử dụng đơn vị là % thay vì 1 đơn vi cố định như px, và tỉ lệ đó được tính bằng chiều (rộng / dài)*100% = (9/16)*100% = 56.15%. dó cũng chính là giá trì padding top ta cần tạo ra kích thước của phần tử cha và tỷ lệ khung hình.

 Kết quả thu được sẽ là 1 tỷ lệ khung hình 16/9 kể cả khi bạn reszie browser vẫn luôn giữ nguyên tý lệ khung hình đó.
 {@embed: https://codepen.io/TrinhThang/pen/abojjaV}
 
 Ngoài ra các bạn có thể dùng aspec ratio cho hình hảnh và khi sử dụng cho hình ảnh bạn nên dùng` object-fit`,
 ` object-position` , và còn 1 số tỷ lệ khác như: 

```
aspect ratio  | padding-bottom (or padding-top) value
--------------|----------------------
    16:9      |       56.25%
    4:3       |       75%
    3:2       |       66.66%
    8:5       |       62.5%
```
## Kết luận
Sau khi đọc bài viết trên mong rằng cách bạn có thể hiểu được và sử dụng aspect ratio vào việc xây dựng những layout đẹp mắt, đáp ứng được tất cả các màn hình mà không bị vỡ hay crop. Cảm ơn các bạn đã đọc và theo dõi bài viết của mình, xin cảm ơn.