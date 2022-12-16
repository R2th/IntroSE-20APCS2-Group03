## I, Lời mở đầu
Là một Developer, không ai trong chúng ta được bỏ qua việc tăng performance cho ứng dụng, website,... mà mình tạo ra. Tuy nhiên, khi mới đi làm, hay còn gọi là những junior developer, chúng ta thường chỉ cần **"chạy được là được"**. Điều này tạo nên những app, website có hiệu năng cực kỳ tệ, mà phần lớn do developer thiếu kinh nghiệm. Dưới đây, mình muốn giới thiệu một số thủ thuật tuy khá nhỏ, dễ thực hiện nhưng lại cải thiện đáng kể hiệu suất cho website của bạn.

![](https://images.viblo.asia/7358aba3-c4d6-4bad-9715-f994c0017d50.png)
(Hình: một website siêu đơn giản nhưng có tốc độ load như rùa bò)
## II, Một số thủ thuật

### 1, Luôn luôn minimize các file js, css khi đưa lên production
Các file js, css nếu minimize ở môi trường develop thì sẽ chẳng có ý nghĩa gì, cũng như biến nó thành những file không-thể-đọc. Tuy nhiên đối với môi trường production thì lại khác ! 

Ở môi trường production, yếu tố tốc độ luôn được ưu tiên, vậy nên kích thước của các file mà client sẽ tải về cũng cần càng nhỏ càng tốt. Vậy nên đối với các file js, css, việc bỏ các dấu space, xuống dòng nhằm giảm kích thước của file là điều luôn phải làm khi đưa chúng lên production. Bởi vì khi ở production, sẽ chẳng có ai cần đọc những file này ngoài máy tính, mà máy tính thì chẳng quan tâm đến tính dễ đọc của code. Vậy nên bạn có bỏ toàn bộ các space cũng như xuống dòng thì các câu lệnh cũng được thực hiện y như vậy (đối với js và css thôi nhé).

![](https://images.viblo.asia/6c829b46-bc45-4c94-8dcf-ac6ce1f4ac2c.png)

> **Hãy luôn luôn minimize các file js và css**

Với câu hỏi làm thế nào để minimize các file js và css, thì bạn có thể google, trong vòng 1 tích tắc nó có thể đưa ta đến một vài địa chỉ sau đây:

https://javascript-minifier.com/

https://www.minifier.org/

https://cssminifier.com/

Đây đều là các trang minimize js, css rất tốt, bạn chỉ cần copy nội dung code của mình và dán lên đây, việc còn lại những trang web kia sẽ xử lý cho bạn, rất tiện lợi !

### 2, Giảm kích thước ảnh

Những bức ảnh có thể làm website của bạn trở nên cực kỳ nặng nề, đặc biệt nếu như website của bạn làm về thương mại điện tử, mạng xã hội,... với lượng data về ảnh cực kỳ lớn. Nếu không xử lý ảnh trước khi upload lên, nó sẽ khiến bạn cực kỳ đau đầu.

1. Hãy sử dụng [jpeg-optimizer](http://jpeg-optimizer.com/) và [tiny-png](https://tinypng.com/) để nén ảnh của bạn trước khi upload mà không làm ảnh hưởng đến chất lượng hình ảnh

![](https://images.viblo.asia/307059d9-c9c2-4dca-8490-09901becbd05.png)

2. Hãy xóa bỏ metadata của bức ảnh mà bạn upload lên website. Tin tôi đi, ngoài vấn đề performance ra, thì bạn cũng không muốn upload metadata của một bức ảnh lên internet đâu ! Trong mỗi bức ảnh, kể cả jpg hay png,... cũng đều có một lượng thông tin nhỏ đi kèm, nó lưu những thông tin như: ngày chụp, loại máy chụp, thậm chí là địa điểm chụp,... những thông tin này được gọi là metadata của bức ảnh. Loại bỏ lượng thông tin này đi sẽ giảm được một lượng kha khá data mà client phải tải về đối với những website chứa nhiều ảnh. Ngoài ra, nó còn bảo mật thông tin của người chụp bức ảnh. Để xóa metadata của ảnh, bạn có thể dùng tool [verexif](http://www.verexif.com/)

![](https://images.viblo.asia/a3f32cf8-c0d3-4267-b289-3d981507e7a6.png)

3. Hiển thị size khác nhau đối với các kích cỡ màn hình khác nhau:
    
    Ngày nay, với sự phát triển của smartphone, thì việc phải hiển thị trang web trên các màn hình với kích cỡ khác nhau là chuyện thường ngày. Vậy bạn hãy thử nhớ lại, xem đã bao giờ mình render một bức ảnh với kích cỡ lớn trên các smartphone chưa ? Và rằng với một màn hình smartphone bé như vậy, việc hiển thị một bức ảnh lớn, nặng liệu có hợp lý ? Vậy nên hãy nhớ, luôn hiển thị kích cỡ ảnh phù hợp với kích thước màn hình.
    
    Vậy làm thế nào để hiển thị kích cỡ ảnh phù hợp với kích thước màn hình ? Trong CSS3, với sự xuất hiện của Media Queries, mọi việc trở nên thật đơn giản. Bạn có thể theo dõi qua đoạn code sau đây:
    ```html
    <div class="example"></div>
    ```
    
    ```css
    .example {
       background-image: url("example.jpg");
    }

    @media only screen and (max-width: 500px){ //some value

       .example {
          background-image: url("example2.jpg");
       }
    }
    ```
    
    Bạn có thể tùy chỉnh kích cỡ, hoặc thậm trí là đổi ảnh khác đối với từng loại màn hình sao cho phù hợp với yêu cầu đặt ra.
    
4. Hãy sử dụng các CDN để chứa các file css, js, ảnh của bạn. Bạn đâu thể biết rằng user của mình sẽ truy cập website từ đâu, liệu rằng server bạn đặt ở Việt Nam, khi khách hàng truy cập website của bạn từ Nam Phi, website sẽ đạt được tốc độ bạn mong muốn ? Vậy nên, hãy luôn luôn sử dụng các CDN, họ sẽ lo mọi thứ cho bạn, không chỉ về khoảng cách địa lý, một số dịch vụ còn minimize file giúp bạn.

### 3, Giảm tổng số file mà client phải nhận

Điều này không có nghĩa là bạn viết ít code đi, hay phải gộp code của các bạn thành 1 file trên môi trường develop. Tuy nhiên, các bạn sẽ cần phải gộp code của các bạn lại thành **duy nhất 1 file** cho js, css (tất nhiên ảnh thì không phải gộp đâu nhé).

![](https://images.viblo.asia/81f1fccd-44b3-42dc-a203-9b63daeaa495.png)

Hãy thử tưởng tượng việc người dùng truy cập vào website của bạn cũng như việc họ đặt mua một món hàng. Nếu như các bạn ship từng bộ phận của món hàng đó một, thời gian vận chuyển sẽ tăng hơn nhiều so với việc bạn vận chuyển 1 lần toàn bộ món hàng đó luôn. Việc gửi các file html, css, js từ server đến client cũng vậy, việc bạn tách các file ra sẽ tăng thời gian load đối với website của bạn. Chưa kể đến việc trong giao thức http, mỗi client chỉ có thể tạo tối đa 5 kết nối đồng thời đến máy chủ, vậy nên việc gửi nhiều file khác nhau là không nên.

Để gộp các file js, css lại, hiện tại có rất nhiều công cụ hỗ trợ công việc này. Bạn có thể tham khảo qua về [webpack](https://webpack.js.org/), nó có rất nhiều công dụng hay ho mà một web developer cần phải biết.

## III, Lời kết
Trên đây mình đã tổng hợp một số cách thức siêu đơn giản bằng kinh nghiệm của mình để tăng performance cho các website. Hy vọng bài viết có ích cho các bạn.