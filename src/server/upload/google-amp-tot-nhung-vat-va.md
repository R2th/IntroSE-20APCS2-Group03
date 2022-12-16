### Mở đầu
    
![](https://images.viblo.asia/c640f7d6-46eb-4144-946c-71d9b0e81df6.jpg)
    
### Google AMP - Accelerated Mobile Pages
Trong nỗ lực tốt ưu hết cỡ trang web khi nhận thấy có đến 90% traffic đến từ trình duyệt di động. Mình đã bị thu hút bởi `Google AMP` - viết tắt của ` Accelerated Mobile Pages`. Một dự án của google trong nỗ lực tối ưu hóa hiệu năng và tốc độ của các trang web trên trình duyệt di động ở mức:
> Gần như không cần load, thậm chí mạng 3G chậm

Mình quyết định bỏ thời gian tìm hiểu và đưa vào trang web thử xem hiệu quả có thực sự tốt hơn không, và liệu có mang đến lợi ích như google quảng cáo hay không...

<br/>
Về lý thuyết thì dưới đây là những gì AMP mang đến:

- Tốt cho SEO, google sẽ ưu tiên bạn, kèm biểu tượng tia sét ấn tượng của AMP trên kết quả tìm kiếm từ thiết bị di động (tia sét như trong hình dưới ý). Thậm chí Search Console có hẳn một mục riêng có các trang AMP, hay Adwords cũng có mục thiết lập quảng cáo riêng dành cho các trang AMP.
![](https://images.viblo.asia/c3b6c17f-e6b4-48f5-9006-8cce0a001c74.png)

- Tăng tốc lên rất nhiều, khi trang của bạn có sử dụng AMP thì trang của chúng ta sẽ được cache lại bởi Google AMP Cache nên tăng tốc độc load ra rất nhiều, thậm chí có thể dùng từ "gấp nhiều". AMP sẽ khiến kết qủa test trên [pagespeed insight](https://developers.google.com/speed/pagespeed/insights/?hl=vi) bật hẳn lên từ màu đỏ sang màu xanh.
- Giảm tải server của chúng ta, trang của bạn được lấy ra và hiển thị cho người dùng - thực tế là trang đã được cache và lưu lại từ server của google nên giảm tải cho server của chúng ta. Hơn nữa server của google lại khỏe nữa, như vậy càng tốt...
- Do được tối ưu tối đa cho thiết bị di động, nơi mà lượng traffic chiếm đa số từ trình duyệt di động. 
Ví dụ như traffic rank dưới đây (mình chụp từ số liệu của SEMrush) thì mấy trang lớn đều có lượng truy cập từ di động nhiều hơn hẳn (trừ youtube)
![](https://images.viblo.asia/3aae606e-a624-4f23-9e27-75f871d61f37.png)
Thì việc tải trang nhanh trên trình duyệt di động mang đến những lợi ích không cần bàn cãi.

...

### Những khó chịu tối ưu và tích hợp google AMP 

Không phải khó mà chính xác là rắc rối và nhiều việc phải làm hơn. Nhất là khi định hướng lúc phát triển sản phẩm từ đầu có nhắm đến trình duyệt di động (responsive), nhưng không nhắm đến mục đính tối ưu theo google AMP. Mà đợi chạy lên production rồi mới nghĩ đến chuyện update để thêm AMP vào thì rất là khó - Tất nhiên là sẽ có cách giải quyết như mình đề cập ở cuối bài viết. Nhưng trước tiên, hãy thử tưởng tượng bạn có một trang web sử dụng `bootstrap và jquery` cùng `hàng tá những thư viện js, css khác nhau` và chúng ta phải đối mặt với những yêu cầu như dưới đây:

- Không được sử dụng external css. Điều này có nghĩa là tất cả css của bạn không được tách ra ngoài file riêng, mà phải copy để luôn ở đầu trang trong cặp thẻ style của AMP `<style amp-custom>`. Quay lại trường hợp đang đề cập ở trên, ta phải vào copy hết nội dung của `bootsrap.min.css`, `animate.css`, `custom.css`..blabla. Vào trong file template.
- css không được sử dụng thuộc tính `!importan` ở bất kỳ đâu. Và ví dụ, `boostrap` lại sử dụng một mớ `!importan` trong đó, nghĩa là chúng ta phải tìm hết chỗ nào xài `!important` và bỏ nó đi. Và các thư việc khác cũng vậy - Tất nhiên là hậu quả của việc sửa thư viện như vậy thì khỏi phải nói. Fix layout mệt nghỉ...
- Css không được bự hơn 50kB - tổng lượng css mà chúng ta vừa paste vào thẻ  `<style amp-custom>` không được lớn hơn 50kB  tức là nếu dùng bootstrap thì phải tạo bản custom và bỏ đi gần hết kiểu thế này.
 ![](https://images.viblo.asia/4da7a140-bce7-4d19-81ca-951dc9c1a550.jpeg)
- Điều tương tự css cũng xảy đến với `js`, bạn không được phép sử dụng external js. Và thật không may, ít ra css còn có thẻ  `<style amp-custom>` để bạn nhồi code css vào cặp thẻ đó. AMP chỉ chấp nhận js từ CDN của amp và phải được load bất đồng bộ `<script sync src="">`.  Chứ custom js thì chịu chết, chỉ có lách qua bằng cách dùng thẻ `iframe`.
- Và còn nhiều nhiều những điểm khó chịu khác nữa khi sử dụng google AMP. Bạn phải đối mặt với một số cú pháp lạ lẫm và trong các thẻ riêng biệt theo quy định của AMP (Bạn có thể xem qua chúng [tại đây](https://ampbyexample.com/)) . Nhất là trong trường hợp update lại trang cũ đang chạy thì để vượt qua được [Validator của AMP](https://validator.ampproject.org/), mà vẫn được giao diện ngon lành thì quả thực là mướt mồ hôi...
- Tạo đơn vị quảng cáo và thiết lập quảng cáo adsense cũng rắc rối hơn bình thường nữa (yaoming) <br>
...

Và vì những khó chịu trên, cách tốt nhất là bỏ thêm công sức và tiền bạc build hẳn một layout mới hoàn toàn, không sử dụng đến các đoạn mã javascript. Và trong trang html bình thường thì thêm thẻ  `<link rel="amphtml">` như dưới đây:
```
<link rel="amphtml" href="domain.com/amp/phien-ban-amp-cua-trang-abc.html" />
```
Cách này để thông báo cho google bot biết rằng:

`-` Hey, trang `domain.com/abc.html` có một phiên bản đã được tối ưu cho trình duyệt di động tại url 
`domain.com/amp/phien-ban-amp-cua-trang-abc.html`. Lần sau có ai tìm kiếm từ trình duyệt di động thì hiển thị trang đã tối ưu này ra cho họ nhé.
<br><br>Và trang `domain.com/amp/phien-ban-amp-cua-trang-abc.html` chỉ sử dụng cho việc SEO thôi. Còn các `internal link` trong trang AMP này thì đều chuyển hướng đến bản responsive bình thường - không AMP, để người dùng có được trải nghiệm tốt hơn, trong trường hợp trang của chúng ta có nhiều tính năng tương tác cần đến javascript. Và đây cũng là cách mà một số trang lớn sử dụng ví dụ như `vnexpress` có hai url như dưới đây:
```javascript
http://amp.vnexpress.net/bong-da/park-hang-seo-duoc-tang-cuong-them-hlv-han-quoc-cho-sea-games-3885547.html // Trang đã tối ưu AMP nằm ở subdomain amp.vnexpress.net
//------------------
https://vnexpress.net/bong-da/park-hang-seo-duoc-tang-cuong-them-hlv-han-quoc-cho-sea-games-3885547.html // Trang bình thường
```
Trang AMP ở đây đóng vai trò phục vụ cho việc tối ưu SEO cũng như vai trò hút người dùng đầu vào từ kết quả tìm kiếm. Mọi luồng hành vi người dùng đến các trang sau đó đều được chuyển đến trang bình thường. Để có được trải nghiệm người dùng (về mặt tính năng) tốt hơn nhiều so với trang AMP.
### Kết luận
Việc tối ưu và tích hợp AMP lợi ích về mặt tốc độ, cũng như được ưu tiên trên kết quả tìm kiếm từ thiết bị di động. Tuy nhiên lại mang đến những rắc rối không nhỏ kể như trên đây. Nhất là khi trang của chúng ta thực thi nhiều mã javascript và có nhiều thư viện ngoài thêm vào thì chắc là thôi, chỉ cần tối ưu responsive là đủ. Bởi thế mà dạo qua một vòng thì những trang lớn ở Việt Nam số trang sử dụng AMP chỉ gồm các trang tin tức như `24h.com`, `vnexpress` chứ không thấy phổ biến ở các trang thương mại điện tử...
<br><br>
Nhìn chung nên nhắm đến AMP từ đầu khi xây dựng sản phẩm thì tốt hơn, như vậy khi làm frontend sẽ đỡ mất thêm thời gian cũng như sức lực làm lại giao diện. Còn mình, mình chọn hướng build riêng lại giao diện di động gồm chỉ layout css và không thực thi mã javascrip như đã đề cập ở trên. Còn về hiệu quả AMP thế nào thì chưa chắc, bởi còn phải chờ thêm một thời gian khoảng vài tháng nữa xem hiệu năng, cũng như traffic có tăng thêm không, SEO có thực sự tốt hơn không. Hy vọng được có cơ hội chia sẻ thêm về vấn đề này trong một khoảng thời gian tới... 
<br><br>
Cảm ơn bạn đã giành thời gian cho bài viết của mình. Nhân tiện, mình mới tìm hiểu và áp dụng AMP thử xem, không tránh được những thiếu sót hay cái nhìn mang cảm tính cá nhân. Rất mong nhận được sự góp ý của bạn ở cuối bài viết ^^ <br><br>
![](https://i.imgur.com/3Q686p3.gif)