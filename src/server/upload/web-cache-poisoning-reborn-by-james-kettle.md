# 1. Overview
## 1.1 - Về James Kettle
James Kettle là giám đốc mảng Web Security của [Portswigger](https://portswigger.net/). Nếu ai từng dùng BurpSuite thì đây chính là sản phẩm của tổ chức này. Hình dưới chính là avatar cho nickname của ông: **albinowax**

![](https://images.viblo.asia/406ed9b6-e74c-41cf-82f7-dd648ff44083.png)

<br>
Nhờ vào việc ông có những Bug Bounty "nặng tiền" dựa trên lỗ hổng này nhắm vào các tổ chức danh tiếng, thuyết trình về lỗ hổng này tại các hội nghị lớn khiến nó được chú ý. Cũng như ông đã viết về nó một cách đầy đủ, kèm theo các bài Labs được dựng nên một cách chuyên nghiệp. Không quá khi nói rằng, chính ông đã "reborn" lỗ hổng này.

## 1.2 - Về Web Cache Poisoning
Việc poison vùng Cache không phải chuyện mới. Nhưng nếu bạn thử Google search "Web Cache Poisoning", đa phần sẽ trả về kết quả từ cuối 2018 trở về nay. Đó là khi việc nhìn nhận và ảnh hưởng của lỗ hổng này không còn chỉ nằm ở mức **'theoretical' threat** - theo như đúng cách nói của James Kettle nữa. Nó đã thực sự là một mối hiểm họa, có thể ảnh hưởng tới toàn bộ Web service nếu mắc phải.

# 2. The Caching Concept
## 2.1 Web Caching và Web Cache
Việc caching được áp dụng rộng khắp ở mọi mặt trận trong ngành IT, ngay chiếc smartphone hay PC bạn đang dùng, việc Caching cũng diễn ra liên tục. Mục đích là tốc độ xử lý các tác vụ được nhanh hơn nhờ vào việc nó được lưu vào một vùng nhớ đệm, để mỗi khi tác vụ được request đến, nó response trực tiếp từ đây. <br>

![](https://images.viblo.asia/728a9944-e3f4-4ec8-8b10-d3d7baec87ee.png)

Tương tự như vậy, **Web Caching** là việc Web Server sẽ có một vùng nhớ đệm, đứng giữa các request và response. Dựa vào các thuật toán tối ưu cho việc caching, chúng sẽ quyết định điều kiện để một request được caching cùng vô số vấn đề liên quan khác được toidicodedao trình bày ở video  [này](https://www.youtube.com/watch?v=noZzKwWVHc0), và nếu user request tới resource đã được cached, chúng sẽ ngay lập tức gửi response chứ không cần gọi tới Web Server.

![](https://images.viblo.asia/36084d82-bbcc-4da0-b20e-c98a5370e0f2.png)



**Web cache:** Chính là vùng nhớ đệm dùng để lưu trữ. Cũng chính là mục tiêu poison của chúng ta. <br>
Và phải lưu ý cache trong bài viết này là shared cache chứ không phải private cache (cache cục bộ lưu trong máy client). Nó chính là vùng xám nhỏ xinh phía trên kia đấy. 

**Cơ chế caching:** Khi phân tích HTTP Header của gói tin gửi lên, Cache sẽ không đọc chúng theo kiểu byte-to-byte vì data trong này là khác nhau và chứa nhiều data không quan trọng , ví dụ như vùng chữ màu xanh phía dưới:


![](https://images.viblo.asia/7c89bf89-22a0-4bb4-a129-4c50129550ab.png)

Do đó, chúng dùng một thứ khác là **cache keys** ( vùng chữ màu cam phía trên ). Theo đó, chúng sẽ tìm và match một số thành phần cụ thể trong Header của HTTP Request để trả về resources đang được yêu cầu.
<br>
Tuy nhiên Cache keys tuỳ thuộc từng trường hợp và không cố định (hoặc có thể được xác định bằng header field **Vary**)
## 2.2 Web Cache Poisoning
Web Cache Poisoning **Không** phải là :
*  Browser cache poisoning
*  Web Cache Deception
*  Response Splitting / Request Smuggling
*  Theoretical

Mục tiêu của việc này là gửi một request có thể tạo ra một response có hại, đáng nói, nó được lưu lại tại vùng Cache và được sử dụng để phục vụ tiếp cho những user (victim) phía sau:

![](https://images.viblo.asia/1ffa75e0-26d1-430d-868e-85b99c2c54d4.png)


# 3. Methodology

![](https://images.viblo.asia/026d3977-94bd-4ee3-b5bc-e721f766a6e4.png)

Tất cả có ở sơ đồ phía trên và phân tích tổng quan của tác giả:<br>
Input được sử dụng để làm **Cache Keys** thì đã nói phía trên, nhưng bước đầu tại đây là xác định các **Unkeyed input**, vậy nó là gì ? Tác giả đã phát triển một extension trên Burpsuite để tự động hóa việc này. Chỗ này rất dễ nhầm lẫn, cùng xem 1 số ví dụ dưới đây :

![](https://images.viblo.asia/cb21542a-16af-4b51-892b-a71e2e7a291b.png)

Extension của ông - **Param Miner**, đã nhanh chóng phát hiện một unkeyed input, cụ thể ở đây là field **X-Forwarded-Host**, đáng nói là value của field này ( canary ), được sử dụng trong response trả về. Thay vì dòng chữ canary vô hại, hãy chèn vào đó 1 đoạn code JS:

![](https://images.viblo.asia/9f68e33c-afe4-4338-8b6c-faa55d6b2194.png)

Việc này cho thấy response trả về thực sự đã chứa code Javascript để trigger XSS được thêm vào ở request phía trên, đương nhiên có thể sử dụng mọi code JS tùy ý.  Bước cuối cùng sẽ xác định liệu request trên đã được cache? Còn Cache keys, như đã được trình bày ở **Cơ chế caching**, sẽ là phần: `www.redhat.com` và `/en?dontpoisoneveryone=1`. <br> 
Ông cũng lưu ý rằng đừng vì thấy Cache-Control: no-cache mà dừng lại, hãy cứ tấn công như thế nó không tồn tại :laughing:<br><br>
Gửi một request khác đến đúng resource của cache keys và không có field **X-Forwarded-Host** phía trên, việc cache request độc hại và response nó đã thực sự xảy ra:

![](https://images.viblo.asia/ac35cf0c-9ffa-4574-bfac-87063b70567d.png)


Đến đây nếu bạn còn chưa rõ về unkeyed input, hãy đọc định nghĩa sau của 1 "ninja" :
> Unkeyed input are parts of the request that are not used when generating the cache key.<br> For example the value of certain headers/cookies are not used when caching the request. If the value of these headers is reflected in the response, it’s possible to poison the cache.

Xong bước một :sweat_smile: Các bước tiếp theo chúng ta cần xác định mức độ thiệt hại chúng ta có thể làm với nó, sau đó cố gắng lưu nó vào vùng cache. Nếu thất bại, chúng ta cần tìm hiểu rõ hơn về cách thức hoạt động của bộ nhớ đệm trang web đó, tìm kiếm một "cacheable target page". Việc một page có được lưu trong cache không phụ thuộc vào nhiều yếu tố như: file extension, content-type, route, status code, và response headers.

Tiếp theo James Kettle quảng cáo cho extension của ông với lý do rất thuyết phục: Trong response của các resource đã được lưu trong cache có thể "che dấu" các **unkeyed input**, việc mò tay thì khổ lắm, vì vậy hãy sử dụng extension về để đảm vào vừa nhanh vừa hiệu quả mà lại vẫn an toàn cho Web Service, đúng theo tiêu chí **dontpoisoneveryone**.

# 4. Case Studies

Dưới đây là một số case study mà ông đã chỉ ra trong bài thuyết trình và bài viết của mình. Hi vọng nó giúp các bạn hiểu rõ hơn về lỗ hổng này.

## 4.1 - Discreet poisoning


Trong ví dụ phía trên, ông đã poison thành công với 1 unkeyed input và 2 cache keys. Việc cache lại là rất dễ dàng do cache keys đó là duy nhất. Mở rộng hơn, nếu ông muốn poison với cache keys ở home pages, thì request của ông phải là request đầu tiên sau khi vùng cache trước đó bị xóa đi ( do expired ). Việc này khá khó khăn và phức tạp, nhưng có một số trang web khiến cuộc sống dễ thở hơn như ví dụ dưới đây:

![](https://images.viblo.asia/f6ab6fe7-445a-4e26-9781-82df3afcef5c.png)

Phần unkeyed chính là **X-Host**, nhưng nó không phải ngôi sao chính ở đây. Hãy nhìn vào **Age** và **max-age**, chúng ta có thể biết rõ thời gian cache hết hạn và vào thời điểm đó hãy gửi requets liên tục tới nhằm poison vùng cache, nếu thỏa mãn điều kiện là request đầu tiên sau khi cache expired thì bất cứ ai vào trang web kia sẽ đều bị "dính chưởng".
## 4.2 - Selective Poisoning

Tương tự như phía trên, response trong HTTP Header chứa những thông tin rất giá trị, ở đây là field **Vary** :

![](https://images.viblo.asia/b0813045-f7cd-45bc-a26b-89eea3e1056f.png)

Nó đã chỉ ra rằng có field  **User-Agent** ở request cũng được sử dụng làm cache keys. Song song đó ông tìm ra rằng field **X-Forwarded-Host** là một unkeyed input. Việc còn lại là ông ghét brower nào, phiên bản nào ... và poison nó mà thôi. Nếu poison thành công, những user truy cập tới trang web trên bằng những browser đó sẽ đều "dính chưởng".

## 4.3 - Local Route Poisoning

Sau nỗ lực tìm ra các field Unkeyed bằng cách download và sục sạo 20,000 project PHP hàng đầu trên Github, ông nhận thấy có 2 field là **X-Original-URL** và **X-Rewrite-URL** có thể ghi đè path được yêu cầu trên request. Nhờ đó ở ví dụ phía dưới, ông đã có thể dễ dàng vượt qua WAF:

![](https://images.viblo.asia/31dd401f-d2d4-4daf-a895-27823566991a.png)

Thêm **X-Original-URL** vào:

![](https://images.viblo.asia/f491a015-bc9e-477b-b1b6-779dea72606a.png)

Việc thêm header này và nó được cache sẽ có thể khiến Web Server sẽ response những trang không chính xác theo yêu cầu của người dùng, như ví dụ dưới sau:

![](https://images.viblo.asia/49fa811c-4b3c-44fd-aaae-106a0158693e.png)

Nó đã xảy ra trong thế giới thực, những ai request đến **/education**,  web sẽ trả về view của **/gambling**. Đương nhiên nếu như vậy sẽ giống tấn công hơn là kiểm thử, đó là lý do parameter x=y được thay đổi. Ở ví dụ trên bài thuyết trình của mình, toàn bộ request sẽ là:  <br>
`GET /education?dontpoisoneveryone=1`
<br>
Như vậy vừa đảm bảo việc gửi ít request mà vẫn được cache (do cache keys là duy nhất )=> xác nhận poisoning thành công, vừa không ảnh hưởng tới business của trang [Unity.com](https://unity.com/)

# 5. Kết luận 

Bài viết hi vọng đã cung cấp cho các bạn những thông tin hữu ích về một kiểu tấn công không được biết đến quá nhiều nhưng cực kỳ nguy hiểm. Cũng như một phần sự rộng lớn của giao thức HTTP. Nếu có tò mò, các bạn có thể đọc thêm những tài liệu tham khảo ở phần 6

# 6. Tài liệu tham khảo
https://portswigger.net/research/practical-web-cache-poisoning <br>
https://www.youtube.com/watch?v=iSDoUGjfW3Q <br>