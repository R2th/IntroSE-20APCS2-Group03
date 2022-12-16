### Mở đầu
Việc tối ưu hóa các static resource đối với việc tải trang là rất quan trọng. Bên cạnh việc cấu hình gzip, browser cache, minify các tài nguyên như css, javascript, svg...vv. Thì một tài nguyên khác cũng khá quan trọng và rất nặng khác là image cũng cần được quan tâm và tối ưu dung lượng và chất lượng đến mức tốt nhất có thể. 

Cứ nhìn thế giới di động mà xem, tốc độ load trang nhanh như chớp, phần cũng bởi hầu hết hình ảnh trên trang của họ đều chỉ rơi vào khoảng 50 kB đổ lại. Chứ mình nhiều khi, đăng bài viết kiếm được cái ảnh là mừng rồi, bê nguyên cả cái ảnh to chà bá, cậy mình có lazy load ảnh rồi. Load sau chậm một chút cũng chả sao, ảnh sản phẩm nhiều khi nặng gần cả MB cũng tải luôn lên không lăn tăn gì cả. 

Nhưng sau một thời gian thấy tốc độ tải trang trung bình của user (thông qua analytics) thấy rằng khá chậm, và seo thì đì đọt. Nên mình mới nghĩ đến việc optimize một chút. Vậy nên hôm nay mình xin phép chia sẽ lại một chút kinh nghiệm nhỏ này, vì mình thấy nó khá là hiệu quả. Ít nhất, trước mắt thì điểm trên google pagespeed cải thiện được cũng khá là cao.... 

### Image next-gen format

Image next-gen format là những định dạng ảnh kiểu mới. Với khả năng nén dung lượng tốt hơn mà vẫn giữ nguyên được chất lượng ảnh. Có ba định dạng khá phổ biến mà [google pagespeed](https://developers.google.com/speed/pagespeed/insights/) khuyên dùng là `webp, JPEG 2000 và JPEG XR`. Nhưng xem xét một hồi thì mình thấy webp được nhiều trình duyệt hỗ trợ hơn cả (bạn có thể kiểm tra tại đây https://caniuse.com/#feat=webp  ) nên mình quyết định chọn định dạng ảnh này cho tất cả các ảnh trên trang web của.
 
 Để thấy được lợi ích, ta hãy thử convert thử một bức anh xem khả năng nén ảnh của định dạng này có thực sự tốt như mong muốn hay không nhé. Với bức ảnh messi mà mình chụp màn hình youtube dưới đây
 ![](https://images.viblo.asia/4479595f-57f0-414b-a92b-2f69758df736.png)
 
 Ở định dang png có kích cỡ là `970,9 kB`, convert sang định dạng `jpeg` có kích thước giảm xuống chỉ còn `550,6 kB` nhưng khi chuyển thành định dạng `webp` nó giảm xuống chỉ còn `183,2 kB` mà chất lượng bằng mắt thường thì không thể nào phân biệt được. Rất ấn tượng!
 
###  cwebp tool cho linux server
Sau khi thấy được lợi ích của định dạng ảnh mới này. Việc tiếp theo cần làm là format hết tất cả các ảnh hiện có sang định dạng webp, hiện trong folder mình có tầm > 3000 hình ảnh. Việc tải về, format hình ảnh xong rồi ngồi update cho từng sản phầm là không khả thi chút nào. Nên dùng tool vẫn là tốt nhất (hoặc có thể sử dụng một giải pháp khác mà mình cũng đã cân nhắc đó là sử dụng `gojek/darkroom` một open source Image Proxy của [gojek](https://www.gojek.com/) thì sẽ tiện hơn vì vừa có khể resize hình ảnh lẫn chuyển định dạnh tùy request, nhưng mà server của mình khá bé. Sợ không kham nổi, mà cấu hình cũng khá nhì nhằng) nên mình quyết định fomart một lần bằng công cụ `webp` bạn có thể tải về tool này bằng lệnh sau:

```
sudo apt-get update
sudo apt-get install webp 
```

Để format một ảnh đơn giản ta chỉ cần chạy lệnh cơ bản như sau:
```
cwebp -q 100 messi.png -o messi.webp // -q 100 là giữ nguyên 100 chất lượng hình ảnh, -o để chỉ rõ đường dẫn output
```
Rồi, bây giờ mình cần tìm tất cả ảnh trong folder có định dạng là `jpeg` sang `web` chứ không chỉ đơn thuần là convert một ảnh như ví dụ trên. Nên mình tạo một file bash (mình chôm chỉa được và sửa lại một tí cho phù hợp từ một bài viết trên DO mà mình để link ở cuối bài )như sau:

```bash
#!/bin/bash

# converting JPEG images
find $1 -type f -and \( -iname "*.jpeg" \) \ # Tìm tất cả file có đuôi định dạng là .jpeg trong folder $1 tham số truyền vào
-exec bash -c '
webp_path=$(sed 's/\.[^.]*$/.webp/' <<< "$0");  # Đổi tên ảnh abc.jpeg thành tên tương ứng nhưng đuôi là webp -> abc.webp
if [ ! -f "$webp_path" ]; then      # check xem ảnh đó với định dang webp đã tồi tại chưa, nếu chưa thì convert ảnh
  cwebp -quiet -q 90 "$0" -o "$webp_path";
fi;' {} \;
```
Và rồi thực thi file bash này, bạn nhớ cấp quyền `a+x` cho file bash này đã nhé.
```
./webp-convert.sh ./storage/app/public/img/ /* do mình dùng laravel nên ảnh mình để trong storage/app/public/img/ bạn có thể đổi đừng dẫn tương ứng */
```

Rồi, dù đã test đi test lại trên local cả chục lần. Lúc được lên production chạy thật vẫn rất chi là hồi hộp. mặc dùng biết chắc ảnh cũ với định dạng `jpeg` vẫn còn đó chưa bị xóa. chả có gì phải sợ. Vậy mà n chạy lâu (>3000 cái ảnh cơ mà) vẫn rất hoang mang. May là cuối cùng mọi thứ ngon lành. Không chắc mình bị ăn đấm đến chết quá (yaoming)

Việc cuối cùng chỉ cần viết một command để đổi lại tên ảnh trong DB nữa là được. Việc này với Laravel không khó khăn gì nên mình xin phép không đề cập tại đây...

### Kết luận

Mặc dù về lâu dài thì chưa biết. Nhưng trước mắt tốc độ tải trang cũng cải thiện thấy rõ, điểm google pagespeed của mình cũng cải thiện khá nhiều. Từ màu đỏ lên hẳn màu vàng trên thiết bị di dộng. 

Còn về SEO lâu dài thi chưa biết được, nhưng chắc sẽ tích cực thôi, vì tốc độc tải trang, là một trong những yếu tố quan trọng quyết định trang web của chúng ta có là ngôi sao trong mắt google hay không mà...

Dù rằng không có gì cao siêu cả, không phải như tối ưu query, không phải scale up phần cứng hay gì đó. Nhưng việc optimize ảnh cũng góp một phần rất quan trọng trong việc giảm thời gian tải trang của ứng dụng web của chúng ta. Và mình thấy n rất đáng phải làm, không chỉ đơn thuần là đổi format ảnh. Mà trong quá trình dev hay đăng sản phầm cũng nên chú ý sử dụng hình ảnh có kích thước phù hợp, lazy load ảnh để cho người dùng có được trải nghiệp tốt nhất có thể. Đừng để tải trang ì ạch, thực sự rất khó chịu....

Cuối cùng, cảm ơn các bạn đã giành thời gian cho bài viết của mình. Bài viết có vẻ hơi nhiều chữ và không có gì mới lắm, nhưng nếu bạn đọc đến đây. Thật sự cám ơn bạn rất nhiều ^^

![](https://i.imgur.com/3Q686p3.gif)


<br>

https://caniuse.com/#feat=webp
https://caniuse.com/#feat=jpeg2000
https://caniuse.com/#feat=jpeg2000
https://www.digitalocean.com/community/tutorials/how-to-create-and-serve-webp-images-to-speed-up-your-website