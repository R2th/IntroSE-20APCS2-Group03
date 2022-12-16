![](https://images.viblo.asia/cb66d0f7-d112-4b88-a72e-61d614ab6b78.PNG)
Chắc hẳn rất nhiều người trong chúng ta đã làm việc nhiều với hiệu ứng parallax. Và thường là làm việc với thư viện [parallax.js](https://matthew.wagerfield.com/parallax/). Nhưng trong còn hiệu ứng parallax trong ReactJS thì sao =)). Hãy cùng tìm hiểu và làm một demo nào!

# 1. Giới thiệu về thư viện tạo hiệu ứng parallax trong ReactJS.
Chắc các bạn đã biết cơ chế để ReactJS update DOM trên. Nên việc tạo hiệu ứng trong ReactJS mặc dù không khó nhưng chúng ta sẽ phải tốn kha khá thời gian cho việc research nó. Thay vì tự làm một component dùng để tạo hiệu ứng thì chúng ta thường hướng đến việc tìm một thư viện thay thế, cung cấp cho chúng ta một danh sách các hiệu ứng và chỉ cần chỉnh sửa chút thôi.

Thì trong bài viết này mình sẽ giới thiệu tới các bạn một thư viện dùng để tạo hiệu ứng parallax trong ReactJS khi chúng ta thực hiện scroll đó chính là [react-scroll-parallax](https://github.com/jscottsmith/react-scroll-parallax).

[react-scroll-parallax](https://github.com/jscottsmith/react-scroll-parallax) là một thư viện dùng để tạo hiệu ứng parallax cho banner, image, hoặc những thẻ DOM khác. Nó hoạt động bằng cách sử dụng một scroll listener để thêm, thay đổi offset của những đối tượng(muốn tạo hiệu ứng) dựa vào vị trí của chúng.

Thư viện này cung cấp cho chúng ta 3 component chính như dưới:

+ `<Parallax>`  đây là component chính dùng để thay đổi vị trí của đối tượng DOM dựa vào vị trí của chúng.
+ `<ParallaxBanner>`  đây là trường hợp khác của `Parallax>`, nó dùng để tạo hiệu ứng parallax cho các banner.
+ `<ParallaxProvider>`  đây là provider dùng để wrap ngoài `<Parallax>` và `<ParallaxBanner>` để tạo context và kiếm xoát việc thay đổi.

Trong phần tiếp theo chúng ta hãy thử tạo 1 hiệu ứng parallax lên một banner bắng cách sử dụng  component `<ParallaxBanner>` nhé :)
# 2. Demo hiệu ứng parallax banner bằng `<ParallaxBanner>`

(1) Đầu tiên hãy tạo 1 base ReactJS bằng [create-react-app](https://github.com/facebook/create-react-app).

(2) Download 1 template html nhé! Mọi người có thể tìm ở [đây](https://www.creativebloq.com/web-design/free-bootstrap-themes-21619376) tìm cái nào có banner á nhé =)). Mình thì mình chọn cái [này](https://startbootstrap.com/themes/creative/).

(3) Sau khi chỉnh sửa đôi chút
![](https://images.viblo.asia/f2da19d3-697c-4b78-896b-4aa85cc4ec7a.PNG)
 và chạy thử lên thì chúng ta sẽ được như sau
![](https://images.viblo.asia/d5c08df7-73e4-42ec-bd7a-8494135bf22a.PNG)


(4) Tiếp tục hãy install thư viện [react-scroll-parallax](https://github.com/jscottsmith/react-scroll-parallax) về và sử dụng thui. Chúng ta đang tập trung vào làm parallax cho banner nên mình sẽ chỉ sử dụng phần có image như hình trên :)

(5) Sau khi install xong thì đầu tiên hãy wrap component `ParallaxProvider` vào `<App>` để không bị lỗi lầm gì nhé
![](https://images.viblo.asia/da432789-7c92-49c0-ab69-68206c0fa5a6.PNG)

(6) Tiếp đến mình sẽ vào `src/components/MaskHeader` và `src/components/SectionAbout` để apply parallax nhé

Ở `src/components/MaskHeader`
![](https://images.viblo.asia/9b0ab8de-32ca-4a07-a4b2-d98f89faae2a.PNG)
và ở `src/components/SectionAbout`
![](https://images.viblo.asia/714661d0-19f8-4cdc-8e43-09f8dd914238.PNG)
chú ý là chúng ta có thể truyền prop `className` vào để custom style nhé, chú ý prop `layers` là chỗ mình đưa cái image vào ở `src/components/MaskHeader` thì sử dụng hình mặc định từ template(vì nó hợp hơn những image khác), ở `src/components/SectionAbout` thì mình lấy 1 image từ [https://picsum.photos/](https://picsum.photos/).

Và đây là kết quả khi scroll xuống
![](https://images.viblo.asia/4f7db1a7-a0cc-4fc5-a659-4763ab6178d3.PNG)
![](https://images.viblo.asia/a823eb09-f5f6-431a-bc6a-78551c992f91.PNG)
![](https://images.viblo.asia/79938bcf-2bff-4e31-b04e-486fafeeb3af.PNG)

Rất thú vị đúng không ạ! Hiệu ứng parallax trong ReactJS. Còn rất nhiều demo nữa và tùy vào từng tình huống mà chúng ta muốn áp dụng parallax như thế nào nữa :)

# 3. Tổng kết
OK mình đã giới thiệu với các bạn về thự viện [react-scroll-parallax](https://github.com/jscottsmith/react-scroll-parallax), một thư viện thú vị trong việc áp đụng hiệu ứng parallax vào ReactJS. Khá đơn giản và dễ sử dụng. Mong là các bạn có thể áp dụng nó trong việc tạo hiệu ứng trong React sau này. Và cảm ơn đã đọc bài viết này đến cuối. Hẹn gặp lại các bạn trong một ngày không xa(ở những bài sau :v) =))