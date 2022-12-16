### Giới thiệu
Hôm nay chúng ta sẽ tìm hiểu về Core Web Vitals , một chuẩn do lường về Website mới được bổ sung bởi Google hơn một năm trở lại đây. Nếu các bạn quan tâm tới việt kiểm tra tốc độ và các chỉ số của Website sẽ dùng công cụ Google Speed Inside của Google đúng không, trước thì các bạn có thể thấy điểm số Website của mình khá là ok nhưng bây giờ với chuẩn đo lường mới mà Google bổ sung vào thì bạn sẽ giật mình khi điểm số Website của mình sẽ tụt khá đáng kể đấy.

 Core Web Vitals(CWV) bao gồm 3 tiêu chuẩn quan trọng như sau mà chúng ta sẽ cùng tìm hiểu lần lượt nhé
 ```
1. Largest Contentful Paint (Hiển thị nội dung lớn nhất – LCP)
2. First Input Delay (Thời gian phản hồi lần tương tác đầu tiên – FID)
3. Cumulative Layout Shift (Điểm số thay đổi bố cục ở dạng tích lũy – CLS)**
```

![](https://images.viblo.asia/aaa2b202-a8db-4d4a-80b3-b92cae9f6ce0.png)


###  Các tiêu chuẩn
**1.Largest Contentful Paint (Hiển thị nội dung lớn nhất – LCP)**

![](https://images.viblo.asia/6d123793-4aed-4140-bc6c-6eb6f25cecd7.png)


Largest Contentful Paint viết tắt là LCP là chỉ số đo lường thời gian tải hoàn tất của một thành phần lớn nhất trên website được hiển thị đầu tiên sau khi tải trang.

Trước đây Google có đưa ra FCP (First  Contentful Paint) để đo lường nội dung đầu tiên hiển thị ra thì giờ việc tối ưu sẽ được đo lường dựa trên một thành phần nào đó đã tải hoàn tất và việc đo lường này sẽ thực hiện bởi tiêu chuẩn Hiển thị nội dung lớn nhất (LCP)
LCP sẽ được tính thông qua việc tải hoàn tất của các thẻ sau trên trang như 
* Thẻ img hiển thị hình ảnh
* Thẻ video hiển thị video
* Background sử dụng css để hiển thị ảnh ra
* Thành phân block bố cục có chứa text bên trong

Chúng ta cùng xem ví dụ của Google đưa ra nhé
![](https://images.viblo.asia/9a50f81a-4aae-4fe0-8e21-e2c7b3bcc5e0.png)

Có thể thấy rõ đoạn chữ đầu tiên hiển thị ra được đánh giá theo chuẩn FCP, nhưng đến khi nào mà hình ảnh hiển thị trên cùng của Page được tải hoàn tất thì nó mới được tính theo chuẩn LCP

Trường hợp website sẽ hiển thị logo trước trên cùng, nhưng sử dụng logo bằng thẻ <img>, <image> hoặc sử dụng hàm url() trong CSS thì nó vẫn sẽ được tính bằng chuẩn của LCP đo thời gian tải hoàn tất của thành phần này.

![](https://images.viblo.asia/e3a454ba-0144-4bf5-b74a-0d3118b7484e.png)

Nếu thành phần hiển thị trên cùng của website không có hình ảnh, video thì dĩ nhiên nó sẽ áp dụng cho các phần tử trong website thuộc kiểu khối có chứa văn bản bên trong. Ví dụ ở ví dụ bên dưới, có một khu vực hiển thị chữ kiểu khối (thẻ p) thì LCP sẽ tính thành phần này.
    
  ![](https://images.viblo.asia/48e20ea1-861d-4ae2-8710-191b2e2e1263.png)

Theo chuẩn của Core Web Vitals thì điểm cần đạt được là dưới 2,5s
    
**2.First Input Delay (Thời gian phản hồi lần tương tác đầu tiên – FID)**
    
![](https://images.viblo.asia/840db267-80f2-439f-a5e3-14bf69fbf8ed.png)

First Input Delay (FID) là một chỉ số quan trọng, lấy người dùng làm trung tâm để đo đạc đáp ứng tải, vì nó định lượng trải nghiệm của người dùng cảm thấy ra sao khi họ cố gắng tương tác với trang không phản hồi-FID thấp giúp đảm bảo trang dễ dùng hơn.

Ví dụ như một button khi click vào sẽ thực hiện 1 action bật modal ,button đó cần có javascript để có thể mở lên và javascript được đọc từ CDN. Tuy nhiên khi sự cố mất mạng xảy ra thì thay vì bật luôn modal thì phải mất 1 thời gian trình duyệt mới sử lý xong vì chưa đọc được hết Javascript ,khoảng thời gian sử lý này gọi là First Input Delay (FID)

Theo chuẩn của Core Web Vitals thì FID sẽ tối ưu nếu kết quả là dưới 100 mili giây

**3.Cumulative Layout Shift (Điểm số thay đổi bố cục ở dạng tích lũy – CLS)**

 ![](https://images.viblo.asia/81d2f39e-52de-4141-8ca3-29ef90c39d21.png)

Cumulative Layout Shift là một chỉ số quan trọng đo độ ổn định và mức thay đổi bố cục bất ngờ của nội dung trang hiển thị trong suốt quá trình tải.

Ví dụ khi bạn bấm vào form submit màn confirm hiện ra có 2 button xác nhận và back lại và bạn muốn back lại nhưng lại có 1 content nào đó hiện ra làm nội dung bị tụt thay đổi khiến bạn bấm nhầm vào nút xác nhận, đó chính là Cumulative Layout Shift mà Google đang nói tới. Cái này thực sự ảnh hưởng rất nhiều đến trải nghiệm của người dùng và Google đã làm 1 video để mô tả rất thú vị các bạn có thể xem ở dưới.

{@embed: https://www.youtube.com/watch?v=1b1S163tDIs}

CLS không chỉ đo như vậy mà còn chi tiết hơn nhiều, mà nói một cách dễ hiểu thì nó sẽ đo lường bao nhiêu thành phần được dịch chuyển mỗi lần tải trang hoàn tất, hay sự ổn định của bố cục Website

Điểm số CLS sẽ được đo với công thức như sau:
```
CLS = impact fraction * distance fraction
```
Trong đó, Impact Fraction là phần bị tác động của đối tượng sau khi việc dịch chuyển xảy ra. Ví dụ của Google cho ta như sau:

![](https://images.viblo.asia/88228c50-daa3-4857-ad2e-e113cd05f60b.png)

Chúng ta có thể thấy ban đầu trạng thái vị trí text không thay đổi nhưng khi có 1 tác động gì đó nó bịu xê dịch như bên phải, khu vực nó dịch từ đầu đến chỗ đã dịch đến gọi là Impact Fraction

Phần bị dịch chuyển ở đây sẽ tương ứng với 25% trong tổng khu vực bị tác động, được quy đổi thành 0.25, hay được gọi là Distance Fraction. Phần còn lại là Impact Fraction, 75% tương ứng với 0.75.

Như vậy chiếu theo ví dụ trên, ta có CLS = 0.75 * 0.25, tương ứng 0.1875. Đối với Google, điểm CLS của website bạn chỉ nên thấp hơn 0.1.

### Cải thiện
Để cải thiện 3 chỉ số này chúng ra sẽ dùng công cụ Google Speed Inside hay Lighthouse của Google nó sẽ đo và chỉ ra cho chúng ra cái gì cần phải tối ưu để cải thiện tốc độ 
    
 ![image.png](https://images.viblo.asia/e6a19e86-fcc2-434f-a131-0ec1e516a0f9.png)

### Lời kết
Làm Frontend nếu chúng ra chú ý tới những chỉ số này để code và tối ưu ngay từ đầu thì sẽ giúp cho Website của chúng ra thêm nhanh và mang lại trải nghiệm tốt cho người dùng. Cảm ơn các bạn đã đọc bài!