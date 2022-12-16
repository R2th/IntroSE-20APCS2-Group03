# Giới thiệu
Ngày nay, cuộc sống con người ngày càng có xu hướng trở nên vội vỡ, gấp gáp và dường như sự kiên trì của họ ngày càng giảm đi. Trước sự phát triển như vũ bão của internet thì điều đó càng trở nên phổ biến, người dùng có nhiều mối quan tâm hơn như mạng xã hội, tin tức, xem phim, mua sắm,..Chính vì vậy một website muốn thu hút được nhiều người dùng và bán được nhiều sản phẩm ngoài việc có ý tưởng hay, giao diện đẹp, thân thiện với người dùng,... thì tốc độ là yếu tố cực kỳ quan trọng, với mỗi giây cải thiện được cũng có thể giữ chân thêm nhiều người dùng website của bạn. Điều đó càng rõ nét hơn khi tỉ lệ người dùng mobile chiếm tỉ trọng ngày càng lớn. Đối với người dùng mobile thì các yếu tố về tốc độ, tiết kiệm dung lượng sẽ là ưu tiên cao. Do vậy đối với người lập trình ứng dụng web cần phải chú trọng nhiều hơn để làm sao cho ứng dụng của mình càng nhanh càng tốt. Điều trước tiên, bạn cần biết cải thiện những gì và ở đâu. Thật may mắn Google đã cung cấp cho chúng ta các công cụ để thực hiện việc đó như https://developers.google.com/speed/pagespeed/insights, hay Lighthouse của Chrome. Ở đó bạn sẽ thấy Google sẽ gợi ý rất cụ thể các điểm cần cải thiện. Bài viết hôm nay mình giới thiệu đến các bạn các giải pháp để loại bỏ các thành phần blocking việc render của web. Đây là yếu tố ảnh hưởng khá lớn đến điểm **Total Blocking Time** đo bởi Google speed insight.

# Các xác định thành phần render-blocking
1. Mở website cần cải thiện trên trình duyệt chrome
2. Open Chrome Dev Tool
3. Vào phần more tool
4. Chọn Lighthouse

Giao diện Lighthouse như hình bên dưới:

![](https://images.viblo.asia/2eb462b7-493e-4a3d-8e9c-9383915f20e9.png)


Click button **Generate report**

![](https://images.viblo.asia/a66a6eef-ff8b-4b9b-b297-6a885859c81a.png)
<div align="center"><b>Danh sách các tài nguyên render-blocking</b></div>

###
Các bạn có thể thấy tool đã liệt kê ra những tài nguyên nào làm ảnh hưởng đến quá trình render web page. Thông thường là các thẻ script, link stylesheet sẽ là các đối tượng render-blocking. 

Các ```<script>``` thỏa mãn các điều kiện sau:

- Nằm trong thẻ head của html 
- Không có thuộc tính ```async```
- Không có thuộc tính ```defer```

Các ```<link rel="stylesheet">``` thỏa mãn các điều kiện:
- Không có thuộc tính ```disabled```
- Không có thuộc tính ```media```


Từ đây chúng ta sẽ đi tìm các giải pháp loại bỏ việc blocking này.

# Các giải pháp loại bỏ blocking
### Loại bỏ script render-blocking
Trước tiên chúng ta cần xác định đâu là phần tài nguyên quan trọng (critical).  Tài nguyên quan trọng là những tài nguyên cần cho việc render ban đầu của page. Để làm điều đó bạn cần mở coverage tool:
- Mở web trên Chrome
- Control+Shift+P để mở Open the Command Menu.
- Gõ ```coverage```
- Refresh page

Kết quả sẽ như hình bên dưới:
![](https://images.viblo.asia/fa573e91-cadb-420c-a393-7fcb3c3f4594.png)

- Phần màu xanh là critical code
- Phần màu đỏ là code chưa cần luôn ở thời điểm load page hoặc là code không sử dụng

Trước tiên bạn cần tách phần critical code ra một file riêng và đặt link như thông thường:
```html
<script src="js/critical.js"></script>
```

Đối với phần code còn lại bạn cần xem xét những thành phần nào không sử dụng đến thì xóa đi, còn lại thực hiện load bất đồng bộ cho chúng

```html
<script src="js/non-critical.js" async></script>
```

Hoặc

```html
<script src="js/non-critical.js" defer></script>
```

Mặc dù cả hai đều là load bất đồng bộ tuy nhiên chúng vẫn có những điểm khác nhau:
- ```async```: Khi script load thì quá trình parse html vẫn diễn ra song song, chỉ đến khi Execute script thì parse html mới tạm dừng. Execute script sẽ thực hiện ngay sau khi việc download script hoàn thành. Do vậy quá trình thực thi sẽ không theo thứ tự load. Nên dùng trong trường hợp script không phụ thuộc vào các lib hay thành phần khác.
- ```defer```: Khi script load thì quá trình parse html vẫn diễn ra song song, chỉ đến khi parse html hoàn thành thì Execute script mới chạy. Như vậy việc dùng ```defer``` thì parse html không phải tạm dừng. Execute script ở đây sẽ theo thứ tự load script. Nên dùng khi script phụ thuộc vào script hoặc các thành phần khác và ngược lại.

Để dễ hình dung, các bạn có thể quan sát hình sau:

![](https://images.viblo.asia/60cd84b5-11ed-45a8-b426-d42a184d354c.png)


### Loại bỏ stylesheets render-blocking

Tương tự như phần script bạn cần tách thành 2 phần critical styles và non-critical styles.

##### Đối với critical styles:
- Load inline
```html
<style type="text/css">
// css code
</style>
```
- Hoặc load sử dụng link như thông thường:

```html
<link rel="stylesheet" href="css/critical-sstyles.css">
```

##### Đối với non critical styles
- Dùng ```preload``:
```html
<link rel="preload" href="non-critical-style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="non-critical-style.css"></noscript>
```
- Dùng loadCss js<br>
Tham khảo https://github.com/filamentgroup/loadCSS
```html
<script src="'js/loadcss.js"></script>
<script id="loadcss">
    loadCSS("css/non-critical-styles.css", document.getElementById("loadcss"));
</script>
```

- Minify css<br>
Minify giúp dung lượng cần load nhỏ và làm giảm thời gian của render-blocking. Có nhiều tool để thực hiện việc đó như webpack, gulp,..

# Thảo luận
Bài viết này tôi mong muốn giới thiệu đến các bạn các xác định tài nguyên là nguyên nhân và một số các giải pháp để loại bỏ render-blocking của tài nguyên js/css. Đây chỉ là một phần nhỏ trong các giải pháp nhằm cải thiện tốc độ load của web page nhưng cũng rất quan trọng. Hy vọng mang đến cho các bạn những điều bổ ích. Cảm ơn các bạn đã theo dõi bài biết.

**Tham khảo:**
https://web.dev/render-blocking-resources/