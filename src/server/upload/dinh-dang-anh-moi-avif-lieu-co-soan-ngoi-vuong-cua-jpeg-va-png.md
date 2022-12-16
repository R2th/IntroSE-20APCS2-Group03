## Mở bài
Chào các bạn, cho phép mình giật dòng tít câu view tí nhé. Ngày 28 tháng 8 vừa rồi, Chrome 85 đã chính thức hỗ trợ ảnh [AVIF](https://developers.google.com/web/updates/2020/08/nic85). Bạn thử search nhanh trên Google là sẽ thấy ngay cộng đồng developer háo hức và kì vọng vào nó như thế nào (mình không nói điêu đâu). Vậy AVIF là định dạng ảnh gì và nó có gì đặc biệt so với các định dạng ảnh lâu đời như JPEG hay PNG? Hãy cùng mình tìm hiểu nhé.

![](https://images.viblo.asia/9aea2d56-24b9-4518-aba8-7964b794d628.jpg)

Vẫn như mọi lần, bạn có thể đọc bài viết gốc của mình tại đây: https://phucluong.com/dinh-dang-anh-moi-avif-lieu-co-soan-ngoi-vuong-cua-jpeg-va-png/

## Bối cảnh lịch sử
Hiện tại bạn vẫn còn sử dụng ảnh JPEG và PNG chứ? Không phải chỉ mình bạn đâu, mà cả thế giới này vẫn đang sử dụng chúng. Từ các trang web, cho đến các phần mềm, và cả các thiết bị như điện thoại, máy tính bảng... đều mặc định sử dụng định dạng ảnh này.

JPEG ra đời năm 1992, PNG ra đời năm 1996, nay đã là năm 2020 rồi, chẳng lẽ chúng ta không có định dạng ảnh nào tốt hơn để thay thế sao? Mà khoan đã, điều này có gì đáng quan tâm chứ, chúng vẫn rất tốt mà? Hãy cùng mình điểm qua một vài điểm yếu tiêu biểu khi sử dụng ảnh JPEG và PNG nhé:

* **Dung lượng ảnh quá lớn**: hiển nhiên ảnh càng nặng thì web load càng chậm, các thiết bị lưu trữ ảnh cũng sẽ mau chóng bị "đầy" nếu các bạn lưu trữ quá nhiều ảnh. Ngoài ra, dung lượng ảnh quá lớn cũng sẽ khiến dung lượng của video lớn theo.
* **Nén ảnh sẽ giảm chất lượng đáng kể**: để web load nhanh hơn, ta thường nén ảnh xuống mức "chấp nhận được" (kết hợp với crop), từ vài MB xuống còn vài trăm KB chẳng hạn, hoặc thậm chí xuống vài chục KB. Đây là một practice thường dùng và "chuẩn mực" của bất kì frontend developer nào khi muốn tối ưu trang web của mình. Tuy nhiên bạn sẽ luôn phải đắn đo giữa dung lượng ảnh và chất lượng ảnh. *Giá như có một phép màu giúp nén tấm ảnh xuống siêu thấp, nhưng chất lượng vẫn tương đối cao thì tốt biết mấy.*
* **Thiếu các chức năng cần thiết**: JPEG là ảnh lossy, PNG là ảnh lossess. JPEG không hỗ trợ transparency, PNG thì có. JPEG không hỗ trợ ảnh động, PNG thì [có](https://en.wikipedia.org/wiki/APNG). Bù lại thì PNG dung lượng thường lớn hơn JPEG, nên tùy vào mục đích sử dụng, chúng ta thường phải convert qua lại giữa 2 định dạng ảnh này. *Giá như có một phép màu giúp trộn tất cả các chức năng trên vào một định dạng ảnh duy nhất thì tốt biết mấy.*

Vì thế, từ lâu đã có rất nhiều dự án (của các công ty hoặc nhóm độc lập) nghiên cứu và phát triển các định dạng ảnh mới thay thế cho JPEG và PNG. Một trong số chúng như HEIF, JPEG XR, JPEG XL, JPEG 2000, WebP, AVIF... Trong bài viết này mình sẽ giới thiệu về định dạng AVIF như một ứng viên cực kì sáng giá, tuy nhiên cũng không thể làm ngơ người anh WebP cũng đã rất thành công. Hãy cùng tìm hiểu định dạng ảnh "không mới cũng không cũ" WebP nhé.

## Giới thiệu một tí về tiền bối WebP
WebP ra đời năm 2010 và được phát triển bởi Google, và đến nay ảnh WebP đã được [hỗ trợ](https://caniuse.com/?search=webp) bởi hầu hết các browser. Chắc chắn bạn cũng đã ít nhiều thấy định dạng ảnh này xuất hiện rồi đúng không.

Ảnh WebP có tất cả các chức năng mà mình liệt kê ở trên. Nó vừa hỗ trợ lossy, lossess, transparency (alpha channel), ảnh động... Và điều đặc biệt, **nó được nén rất tốt**. Theo Google, nó giúp giảm dung lượng ảnh từ [25-34%](https://developers.google.com/speed/webp) so với JPEG.

Nếu bạn thường sử dụng công cụ [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) của Google để đánh giá tốc độ web thì chắc hẳn bạn sẽ thường xuyên nhận được lời hướng dẫn convert ảnh của bạn về các định dạng ảnh hiện đại để giảm dung lượng. Thực tế thì công cụ này sẽ thử [chuyển tấm ảnh của bạn về WebP](https://web.dev/uses-webp-images/) và so sánh sự khác biệt về dung lượng rồi mới đưa ra khuyến cáo.

![Gợi ý chuyển đổi định dạng ảnh để tăng tốc độ web của Google](https://images.viblo.asia/087400d8-dc88-411f-a58b-ae02b63635e7.png)

## Hậu bối AVIF có gì đặc biệt?
AVIF là viết tắt của "AV1 Image File Format", và AV1 có thể tạm hiểu là tên của thuật toán nén (không chỉ cho ảnh mà còn cho cả video). AVIF ra đời với sứ mệnh thay thế không chỉ JPEG, PNG hay GIF, mà còn thay thế cả người tiền bối WebP của mình nữa. Đọc đến đây là bạn có thể hiểu ra rằng, AVIF có tất cả các chức năng như WebP mà mình trình bày ở trên, và nó còn "siêu nén" hơn cả WebP nữa. Mình xin liệt kê lại ở đây nếu bạn nào bỏ qua phần giới thiệu WebP ở trên. Các chức năng cơ bản của ảnh đều nằm trong một định dạng duy nhất là AVIF:

* Hỗ trợ lossy (như JPEG) và lossess (như PNG)
* Hỗ trợ transparency (alpha channel) như PNG
* Hỗ trợ ảnh động với định dạng .avifs (như GIF hay APNG)
* Siêu nén với chất lượng được duy trì tốt (hơn cả người tiền bối WebP)

Có một điều quan trọng bạn cũng nên biết là AV1 và AVIF đều được khởi xướng và phát triển cũng được [vài năm rồi](https://en.wikipedia.org/wiki/AV1), và cũng đã trải qua nhiều cuộc thử nghiệm mang kết quả tốt. Tuy nhiên với góc nhìn của một web developer, nó sẽ chẳng có ý nghĩa gì nếu browser không support ảnh AVIF. Vì thế vào ngày 28-8-2020 vừa qua, Chrome 85 đã [chính thức hỗ trợ ảnh AVIF](https://developers.google.com/web/updates/2020/08/nic85). Ngoài ra Firefox cũng sẽ sớm support mặc định định dạng ảnh này (hiện tại bạn cần bật cờ `image.avif.enabled` trên firefox để sử dụng). Bạn tham khảo các browser hiện đang support AVIF [tại đây](https://caniuse.com/avif)

## So sánh
Theo kết quả đo của Daniel Aleksandersen tại [Ctrl.blog](https://www.ctrl.blog/entry/webp-avif-comparison.html#section-results), AVIF có mức giảm dung lượng đáng kể so với JPEG và WebP. Cụ thể AVIF **trung bình** giảm đến **50% so với JPEG, và 20% so với WebP** (bạn có thể suy ra rằng WebP cũng có mức giảm khá tốt là 30% so với JPEG)

Nếu chỉ đưa ra số liệu thôi thì nhàm chán quá, nhìn hình thì sẽ trực quan hơn nhiều phải không. Ở đây mình sẽ chọn một bức ảnh để thử so sánh mức độ nén của AVIF, WebP và JPEG.

Tấm ảnh được đưa lên thớt là tấm ảnh (png) nàng công chúa tóc xù của Disney. Mình tải về với kích thước 800x509, dung lượng **849KB**. Vì AVIF vẫn còn kén trình duyệt, nên mình sẽ screenshot lại để mọi người so sánh (sẽ không chính xác lắm), tuy nhiên mình vẫn sẽ đính kèm ảnh gốc nếu bạn nào muốn xem nhé.

Ảnh gốc PNG của nàng công chúa tóc xù là 849KB:

![Ảnh gốc PNG của nàng công chúa tóc xù là 849KB](https://images.viblo.asia/f3cadc33-f325-43e3-a599-6d0d3f405364.png)

<div align="center"><em>Ảnh gốc PNG của nàng công chúa tóc xù là 849KB</em></div>

![Ảnh JPEG nén đến mức chấp nhận được là 110KB](https://images.viblo.asia/d5c10ce1-8ec9-4a43-9b85-851b17721db5.png)

<div align="center"><em>Ảnh JPEG nén đến mức chấp nhận được là 110KB</em></div>

![Ảnh WebP nén đến mức chấp nhận được là 83.7KB](https://images.viblo.asia/7ab22291-6aeb-4f59-a171-b332a413b0a2.png)

<div align="center"><em>Ảnh WebP nén đến mức chấp nhận được là 83.7KB</em></div>

![Ảnh AVIF nén đến mức chấp nhận được là 78.5KB](https://images.viblo.asia/c2c5d56e-db8e-4838-b403-5755ba9f81b5.png)

<div align="center"><em>Ảnh AVIF nén đến mức chấp nhận được là 78.5KB</em></div>


Các bạn có thể thấy ảnh AVIF và WebP đều nén khá tốt mà vẫn giữ được chất lượng ở mức chấp nhận được. Thú thật mình không phải chuyên gia nên không thể tùy chỉnh cấu hình để có một so sánh chính xác. Nhưng mình cũng đã cố gắng nén ở mức mà mắt mình thấy hợp lý (góc nhìn của một user thường).

Để bổ sung cho phần so sánh, mình sẽ nén cả 3 tấm ảnh về cùng dung lượng là khoảng 11-12KB, hãy cùng xem kết quả nào:

![Ảnh JPEG nén xuống ~11KB](https://images.viblo.asia/871508b0-0be1-44e3-8f2d-29babb8386b2.png)

<div align="center"><em>Ảnh JPEG nén xuống ~11KB</em></div>

![Ảnh WebP nén xuống ~11KB](https://images.viblo.asia/15bbe7dc-ac65-4669-a6b8-ad03cfaa53da.png)

<div align="center"><em>Ảnh WebP nén xuống ~11KB</em></div>

![Ảnh AVIF nén xuống ~11KB](https://images.viblo.asia/c01c632f-cbfb-4107-8b42-73a5bda4e453.png)

<div align="center"><em>Ảnh AVIF nén xuống ~11KB</em></div>

Các bạn thấy đấy, nén sâu sẽ giúp dễ dàng nhận ra sự khác biệt giữa các định dạng. Nếu các bạn muốn tìm hiểu sâu hơn thì có thể đọc bài viết của [Netflix Techblog](https://netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4). Bài viết này có rất nhiều thông tin hữu ích, cả về mặt kĩ thuật, thông số kĩ thuật cho đến hình ảnh minh họa trực quan.

## Tạo ảnh AVIF như thế nào
Hiện tại công cụ tạo ảnh AVIF không nhiều, nhưng may mắn trang [Squoosh](https://squoosh.app/) của Google đã cho phép chúng ta chuyển đổi và nén ảnh sang nhiều định dạng khác nhau với nhiều mức độ nén khác nhau (có cả AVIF và WebP). Nếu bạn nào chưa biết trang web này, thì nó hoạt động khá giống với trang [TinyPNG](https://tinypng.com/) nhưng đặc biệt hơn là bạn có thể tùy chỉnh định dạng và mức độ nén theo ý muốn. Ngoài ra Squoosh còn cho phép bạn so sánh ảnh trước và sau khi chuyển đổi rất trực quan và tiện lợi.

![Webapp Squoosh của Google](https://images.viblo.asia/d34d4657-51b7-4efc-b1fe-8481f886a154.jpg)

Nếu bạn muốn vọc sâu hơn về mã nguồn để encode/decode ảnh AVIF, thì có thể tham khảo thư viện [libavif](https://github.com/AOMediaCodec/libavif).

## Browser support?
Như mình có chia sẻ ở trên, Chrome chỉ vừa mới chính thức hỗ trợ AVIF cách đây chưa đầy 1 tháng, nhưng đó đã là một tín hiệu khả quan. Thêm nữa là Firefox cũng đã hỗ trợ với cờ `image.avif.enabled` được bật. Sẽ sớm thôi là Edge, Opera hay Safari (riêng Safari thì mình không chắc).

* AVIF: [https://caniuse.com/avif](https://caniuse.com/avif)
* WebP: [https://caniuse.com/webp](https://caniuse.com/webp)

Vậy câu hỏi đặt ra là chúng ta có nên sử dụng AVIF cho web của chúng ta không? Câu trả lời này tùy vào tính chất và mục tiêu dự án của bạn. Tuy nhiên tại thời điểm này, nếu không sử dụng AVIF, việc sử dụng người anh WebP cũng là một việc đáng cân nhắc.

Ngoài ra, có một kĩ thuật khá hay ho và an toàn nếu bạn vừa muốn sử dụng công nghệ mới, vừa muốn hỗ trợ các browser cũ hơn, là sử dụng thẻ `picture`.

```html
<picture>
  <!-- Nếu browser hỗ trợ AVIF, thì load AVIF -->
  <source srcset="image.avif" type="image/avif">

  <!-- Nếu không hỗ trợ AVIF, thì load WebP -->
  <source srcset="image.webp" type="image/webp">

  <!-- Nếu không hỗ trợ cả 2 định dạng ảnh trên, fallback về ảnh jpeg -->
  <img src="image.jpg">
</picture>
```

## Lời kết
AVIF vẫn còn rất trẻ và vẫn đang được tối ưu cả về thuật toán lẫn tốc độ encode/decode. Vì thế chúng ta hãy mong đợi đến ngày AVIF được phổ biến rộng rãi như cách JPEG và PNG đã từng và đang "bá chủ võ lâm" hiện nay. Tuy nhiên để đánh bại được JPEG hay PNG, web là chưa đủ. Nó cần phải được hỗ trợ mặc định bởi nhiều phần mềm, thiết bị điện tử khác (cả ảnh và video) thì mới mong có thể soán ngôi vương được. Hoặc không, sẽ lại có một định dạng khác ra đời và tiếp tục cuộc hành trình dang dở.

Hi vọng các bạn thích bài viết lần này của mình. Nếu thấy hay thì upvote để mình có động lực viết các bài tiếp theo nhé.