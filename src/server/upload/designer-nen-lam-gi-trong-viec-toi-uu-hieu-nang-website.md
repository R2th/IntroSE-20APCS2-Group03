Như chúng ta đã biết, hiện nay tỉ lệ image đang chiếm đến 50% trên toàn bộ các trang web trên thế giới.

Việc hiệu năng trang web giảm cũng kéo theo rất nhiều thứ theo nó. Ví dụ như trải nghiệm người dùng thấp, doanh thu giảm. Đây là [1 ví dụ của Pinterest](https://nghethuatcoding.com/2019/05/02/cac-ki-su-pinterest-da-xay-dung-progressive-web-app-nhu-the-nao/) sau khi tối ưu thành công hiệu năng web mobile.

Qua đó chúng ta thấy được, 1 khi trải nghiệm người dùng tốt thì mọi thứ cũng đều trở nên tốt đẹp hơn. Trong đó có cả **doanh thu** đấy.

![](https://images.viblo.asia/5b5e5c5d-02b6-4fab-b6a1-8fc59cfd88fe.png)

Do đó, không chỉ developer mà ngay cả chính **designer cũng cần phải có trách nhiệm** trong vấn đề sử dụng image website cho hiệu quả.

Hiện nay website trên toàn thế giới đang có xu hướng càng ngày càng nặng hơn. Theo như thống kê của [httparchive.org](http://httparchive.org/interesting.php) cho chúng ta thấy, cách đây 7 năm (2012/02/15) kích thước trung bình của website là **986 KB**. Thời điểm thống kê (2018/02/15) thì nó đã đạt đến **3686 KB.**

Chỉ trong vòng gần 6 năm mà website đã nặng lên gần **373.8%. **Điều đó chứng tỏ website trên toàn thế giới đang có xu hướng xấu đi.

So với những năm trước đó thì video cũng chiếm 1 phần không nhỏ trong website, thế nhưng thằng đang chiếm nhiều nhất lại là image.
![](https://images.viblo.asia/735cf351-9deb-4f57-847c-bf2468099d29.jpg)

## Tại sao hiệu năng website lại quan trọng?

![](https://images.viblo.asia/5e3d86f3-019f-4b67-8c52-79ba0139c635.jpg)
 	
  * cứ khi tốc độ tải trang tăng từ 1s -> 3s thì tỉ lệ người dùng rời khỏi trang web tăng 32%

 	
  * cứ khi tốc độ tải trang tăng từ 1s -> 5s thì tỉ lệ người dùng rời khỏi trang web tăng 90%

 	
  * cứ khi tốc độ tải trang tăng từ 1s -> 6s thì tỉ lệ người dùng rời khỏi trang web tăng 106%

 	
  * cứ khi tốc độ tải trang tăng từ 1s -> 10s thì tỉ lệ người dùng rời khỏi trang web tăng 123%


Từ đó ta thấy được hiệu năng của trang web có mức độ ảnh hưởng to lớn như thế nào. Nó không chỉ ảnh hưởng đến trải nghiệm người dùng mà còn ảnh hưởng đến doanh thu của công ty (người dùng rời khỏi trang web tăng -> doanh thu đương nhiên sẽ giảm).


## Lí do tại sao website lại càng nặng?


Nguyên nhân chủ yếu khiến website nặng là do hình ảnh trên trang web chưa được tối ưu. Vậy nguyên nhân nào khiến nó chưa được tối ưu?

**Đầu tiên**, khi design và phát triển 1 website thì rất khó có thể biết được trách nhiệm của desinger kết thúc ở đâu? và trách nhiệm developer kết thúc ở đâu?

Ví dụ như việc nén hình ảnh để tối ưu tốc độ thì ai sẽ là người làm? Designer hay là Developer sẽ làm?

Thông thường thì designer sẽ chọn ảnh và sau đó nhờ developer upload lên server? Hay là khi upload ảnh lên server thì hệ thống sẽ tự đống nén ảnh?

**Thứ 2**, hầu hết các desinger đều không biết hiệu năng của website đang tồi tệ đến mức độ như thế nào? Bao nhiêu image đang có kích thước quá to và nó đang ảnh hưởng đến trải nghiệm của người dùng như thế nào?

**Thứ 3**, **những tool, những kĩ thuật về việc nén ảnh như pro thì designer hầu như không biết. Có lẽ đây là 1 trong những lí do chính.**


## Làm thế nào có thể tối ưu image website như pro?


Để làm được điều này thì trước khi quyết định sử dụng image trong website, thì các bạn hãy trả lời những câu hỏi dưới đây nhé.


### Có cần xử lý toàn bộ hình ảnh không?


Hình ảnh là 1 trong những bộ phận khá quan trọng trong website. 1 website mà toàn chữ chắc chẳng ai muốn đọc cả.

Thế nhưng 1 website mà có quá nhiều ảnh thì lại làm hiệu năng của website bị giảm xuống. Do đó mà trước khi thêm 1 ảnh nào đó vào trong website thì hãy thử nghĩ xem thật sự hình ảnh đó có cần hay không?

Nếu cho vào thì nó có làm content hay hơn không? Hay chỉ làm cho website trông đẹp hơn?


## Ảnh có phải loại vector hay không?


Hình ảnh mà bạn đang xử dụng có phải loại vector hay không? Nếu hình ảnh bạn đang dùng là loại vector thì đừng nên export nó ra dạng PNG hay JPG. Hãy nên export nó ra dạng SVG cho nhẹ nhé.

![](https://images.viblo.asia/5e3d86f3-019f-4b67-8c52-79ba0139c635.jpg)


Hiện tại hầu như browser nào cũng support SVG. Nên các bạn cũng không cần phải lo lắng cho điều này.


### Hình ảnh có nền trong suốt không?


Hình ảnh mà được lưu dưới dạng PNG sẽ luôn nặng hơn hình ảnh được lưu dưới dạng JPG. Nếu hình ảnh của bạn không cần nền trong suốt thì khi đó hãy export ra dạng JPG nhé.


## Hình ảnh đã được nén tối đa chưa?


Đa số designer đều nói trong Photoshop hay Pixelmator có cái option là "Save for Web". Nếu export ảnh mà chọn option này thì cũng nén ảnh OK rồi.

Thế nhưng so với các tool TinyPNG hay JPEGmini thì option "Save for Web" không phải là lựa chọn hợp lí.


### SVGOMG


Đây là 1 trong những ứng dụng web, có thể dùng trực tiếp [ở đây](https://jakearchibald.github.io/svgomg/). Ứng dụng này có thể giúp ta xoá 1 vài thông tin không cần thiết từ file SVG.

Ở trong những editor về graphics như photoshop thì luôn luôn có 1 vài thông tin về metadata, comment, 1 số hidden element. Những thông tin này có thể là nguyên nhân gây file SVG bị phình to.

Nếu xoá những thông tin này đi sẽ giúp giảm kích thước SVG khá tốt. Đặc biệt là không làm mất đi chất lượng hình ảnh.


### TinyPNG


Đây cũng là 1 trong những ứng dụng web, có thể sử dụng trực tiếp [tại đây](https://tinypng.com/).

Nếu như bạn có hình ảnh nào cần làm trong suốt background thì tool này là 1 tool khá hữu ích.


### JPEGmini


Đây là 1 trong những tool nén ảnh JPG tốt nhất từ trước đến nay mà mình đã dùng. Nó có thể nén hình ảnh đến 50% mà mắt thường nhìn vào cũng không thể phân biệt được đâu là ảnh gốc và đâu là ảnh đã nén.

Bạn có thể tải ứng dụng này [tại đây](https://www.jpegmini.com/creators). Tuy nhiên ứng dụng này là bản mất phí, dùng được cho cả Window lẫn Mac.


## Hình ảnh có cần phải responsive hay không?


Nếu bạn nghĩ, trang web của bạn không cần thiết phải hiển thị hình ảnh responsive đến cho người dùng thì cái này là hoàn toàn sai nhé.

Hiện tại tỉ lệ user dùng mobile càng ngày càng tăng lên. Nếu họ dùng wifi để kết nối đến thì không vấn đề gì. Nhưng đa số thời gian họ ở bên ngoài và dùng 3G, 4G để lướt web.

Khi đó tốc độ mạng cũng như băng thông sẽ bị hạn chế. Nếu phải load hình ảnh nặng thì UX sẽ không tốt. Do vậy việc cung cấp 1 hình ảnh nhẹ hơn trên mobile là 1 điều cần thiết.

Hiện tại đa số các hệ thống CMS như wordpress đều support responsive cho image.

Để hiểu sâu hơn về tính responsive trong image, các bạn có thể tham khảo [bài viết này](http://woutervanderzee.nl/artikelen/responsive-images-srcset-sizes/).


## Kết luận

Nếu xử lý hình ảnh trong website 1 cách cẩu thả sẽ là nguyên nhân chính gây phá hoại trải nghiệm người dùng, và có thể làm cho công ty của bạn mất tiền do nó ảnh hưởng tiêu cực đến hiệu suất.

Thật may mắn có rất nhiều công cụ, kĩ thuật giúp desinger làm được điều này.

Nếu các bạn có lời khuyên nào cho việc xử lý hình ảnh trên webiste thì hãy để lại lời nhắn ở phần comment bên dưới nhé.

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

->->->  [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)

Chúc các bạn 1 tuần thật vui vẻ.