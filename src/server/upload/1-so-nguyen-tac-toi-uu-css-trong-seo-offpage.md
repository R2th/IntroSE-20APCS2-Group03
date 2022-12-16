**Giới thiệu:**

Đối với một lập trình viên web thì CSS là một phần không thể thiếu trong thiết kế. Cùng mới HTML... nó làm nên giao diện bề ngoài cho website đó. Ngày nay khi yêu cầu về tốc độ load website ngày càng quan trọng trong SEO thì vấn đề tối ưu CSS lại càng quan trọng hơn. Vây đâu là cách giúp tối ưu CSS tốt nhất ?

![](https://images.viblo.asia/8b2364c4-961c-41da-8d28-71108d8a9dad.jpg)

**1. Sử dụng Css Sprite**

Đây là 1 phương pháp giảm số lượng yêu cầu load hình trong HTTP Request, để hiểu rõ hơn về phương pháp này các bạn tham khảo hình dưới đây :

![](https://images.viblo.asia/c1d22681-1de2-43b8-8572-75d6a6f55082.jpg)

Đây là 1 file hình sử dụng **css sprite** của youtube,  từ logo, các nút bấm, background và các biểu tượng mạng xã hội đều được đưa vào chung 1 tấm hình, và để sử dụng chúng , chúng ta chỉ cần việc dùng **backgrond-image** và **background-position** để sắp xếp sao cho chính xác là được.

**2. Kết nối tất cả các file css thành một file duy nhất**

Các bạn nên nhớ 1 điều là **1 CSS file = 1 HTTP request** , vì thế càng dùng nhiều file css thì HTTP request càng cao, và kéo theo website của bạn cũng chậm đi vì phải xử lý nhiều request, vì thế nếu các file css mà bạn sử dụng không có gì quá đặc biệt hơn so với các file khác thì nên gộp chúng lại với nhau thành một file duy nhất. Các bạn có thể tham khảo ví dụ sau :

Trước lúc gộp file :
```
<link rel="stylesheet" type="text/css" href="content.css" />
<link rel="stylesheet" type="text/css" href="about.css" />
<link rel="stylesheet" type="text/css" href="contact.css" />
```
Sau khi gộp chúng lại:

`<link rel="stylesheet" type="text/css" href="layout.css" />`

Như vậy file **layout.css** chứa toàn bộ nội dung trong các file **content.css**, **about.css** và **contact.css**

**3. Gọi file css từ bên ngoài**

Có rất nhiều bạn sử dụng các đoạn css ngay trong các phần tử HTML , và điều này là một sai lầm lớn, tuy rằng nó sẽ giảm HTTP request nhưng nó lại làm cho trang html của bạn phình to ra, và đặc biệt sau mỗi lần load trang, trình duyệt sẽ lại phải tải lại toàn bộ các đoạn css đó, vì thế mình khuyên các bạn nên đóng gói css là 1 file bên ngoài và gọi nó trong HTTM document, kỹ thuật này sẽ giúp bạn dễ dàng duy trì và quản lý, đặc biệt các file này sẽ được lưu trữ (cache) khi trang được load lần đầu tiên và sẽ không phải gọi lại trong lần kế tiếp.

**4. Luôn luôn đặt file css nằm ở vị trí top trong thẻ <head>**

Tại sao phải như vậy, lý do rất đơn giản, bạn thử nghĩ xem, khi load trang, trình duyệt sẽ load từ đầu cho đến cuối, và nếu bạn đặt css ở dưới cùng, thì các phần tử html sẽ được load trước, và các phần tử này sẽ rối tung lên khi xuất hiện vì file css chưa được định dạng bởi trình duyệt, thực ra điều này chỉ có thể thấy khi trang web của bạn load chậm, tuy nhiên bạn nên tạo cho mình 1 phong cách thiết kế tốt đó là luôn luôn đặt file css nằm ở top trong phần tử <head>

**5. Sử dụng Link thay vì @import**

Bạn nên hạn chế sử dụng @import hoặc tốt nhất là không nên dùng @import trong file CSS, bởi vì nó sẽ làm giảm quá trình tải file và cũng không sử dụng được khả năng tải file đồng thời của browser.

**6. Kết hợp các mã màu một cách tối đa**

`article { background-color: rgb(255,255,255); `

/*Hoặc*/

` article { background-color: #ffffff; }`

Nhưng có thể viết lại ngắn hơn:

` article { background: #fff; }`

Với những mã màu thập lục có dạng #xxxxxx hoặc #xxyyzz thì lần lượt có thể viết gọn lại thành #xxx và #xyz.

Ví dụ: #ff0000(màu đỏ) thành #f00, #000000(màu đen) thành #000

**7. Các thuộc tính trùng lặp nên viết gọn lại**

```
p {
font-family: Arial;
font-weight: normal;
line-height: 1.33em;
font-size: 1.22em;
}
```
...

```
p {
font-family: Georgia, serif;
font-weight: normal;
line-height: 1.33em;
font-size: 1.33em;
}
```
Hoàn toàn có thể viết lại thành:

```
p {
font-family: Georgia, serif;
font-weight: normal;
line-height: 1.33em;
font-size: 1.33em;
}
```

**8. Rút gọn cú pháp nếu có thể**

Ví dụ về thẻ p được css lại: 

```
p {
font-family: Georgia, serif;
font-weight: normal;
line-height: 1.33em;
font-size: 1.33em;
}
```
Nhưng có thể dùng cú pháp sau :

```
p {
font: normal 1.33em/1.33 Georgia, serif;
}
```

**9. Các giá trị sử dụng số nên rút gọn lại**

Ví dụ sử dụng thuộc tính margin: 

` margin: 10px 20px 10px 20px;`

Vì margin-top và margin-bottom, margin-left và margin-right trùng nhau về giá trị, bạn hoàn toàn có thể viết lại thành:

`margin: 10px 20px;`

**10. Phần nguyên và đơn vị có giá trị bằng 0**

Ví dụ: opacity: 0.5; Có thể thay thế bằng: opacity: .5; padding: 0px; Có thể thay thế bằng: padding: 0;

**11. Có thể bỏ dấu ; nằm sau giá trị của thuộc tính cuối cùng**

```
p {
font-family: Georgia, serif;
font-weight: normal;
line-height: 1.33em;
font-size: 1.33em; (Có thể bỏ dấu 
}
```
Và hoàn toàn có thể tối ưu hơn dưới dạng:

`p { font: normal 1.33em/1.33 Georgia, serif }`

**12. Gỡ bỏ các dòng comment trong file css**

Nhiều comment quá sẽ làm tổn hại đến tài nguyên server, băng thông, thời gian load, nếu muốn tối ưu tối đa bạn cũng có thể loại bỏ những comment.

```
/************************************/
/*          Content Page            */
/************************************/
nên sử dụng thằng này :
/* content page */
```

**13. Kết hợp toàn bộ các file css vào 1 tập tin css duy nhất**

Việc kết hợp sẽ giảm tải được nhiều dòng, bớt việc làm cho Robot của SE (Search Engine). Tốt hơn cho page speed.

**14. Validate CSS**

Để các trình duyệt có thể duyệt file CSS một cách chính xác, tối ưu hoàn toàn thì file CSS cũng phải validate, hãy sử dụng công cụ CSS Validator của W3C để kiểm tra - http://jigsaw.w3.org/css-validator/ 

**15. Sử dụng những công cụ tối ưu CSS**

Sau khi đọc hết những thủ thuật này và bạn không muốn phải mất công làm từng bước bằng tay thì có thể sử dụng 1 số công cụ giúp bạn tối ưu file css trong web của bạn, đặc biệt là các công cụ này hoàn toàn miễn phí, các bạn có thể tham khảo 1 số công cụ như sau :

CSS Optimizer

Flumpcakes CSS Optimizer

Clean CSS

CSS Drive CSS Compressor

Online YUI Compressor

Style Neat

**Kết luận:**

Hy vọng rằng với bài viết này có thể giúp bạn thực hiện tốt hơn việc tối ưu css của website mình cũng như đảm bảo được tốc độ và thẩm mỹ website - một điều khá quan trọng trong SEO.

**Tham khảo:**

https://www.thuthuatweb.net/css/14-cach-giup-ban-toi-uu-va-giam-dung-luong-file-css.html

http://cunglamseo.com/