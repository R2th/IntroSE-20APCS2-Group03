## 1. Mở đầu
<hr>

Đối với mỗi developer cho dù là `web developer` hay thậm chí cả `mobile developer` thì chắc hẳn ai cũng đã từng nghe thấy từ `Google Analytics`. Như cái tên gọi của nó thì công cụ này được cung cấp bởi Google với mục đích dùng để thu thập dữ liệu trên các dịch vụ web của bạn và chuyển đổi nó thành các báo cáo hữu dụng hơn hỗ trợ chúng ta rất nhiều trong các hoạt động liên quan đến marketing online hay giúp chúng ta tìm ra các vấn đề khác liên quan đến người dùng dịch vụ. Trong bài viết ngày hôm nay mình sẽ chia sẻ với các bạn về một số điều liên quan đến `GA` mà mình tìm hiểu được.

## 2. Sử dụng GA ?
<hr>

Trước đây mình đã rất nhiều lần setup `GA` cho sản phẩm mà mình làm nhưng thực tế ở đây việc mình làm chỉ là:
- Đăng kí một tài khoản GA (nếu bạn không biết cách có thể xem hướng dẫn ở [đây](https://support.google.com/analytics/answer/1008015?hl=vi))
- Thêm tracking code của GA cung cấp vào trang web như sau:
```js
<!-- Global site tag (gtag.js) - Google AnalytVibloics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-123456789-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-123456789-1');
</script>
```
*Lưu ý: trong trường hợp bạn dùng React, Vue, Angular hay dạng website khác thì cách thêm vào trang web cũng sẽ khác đi một chút*

Đó là toàn bộ các step mình đã làm khi sử dụng GA và cũng chỉ thỉnh thoảng truy cập vào trang GA để xem các con số như có bao nhiêu người đang xem trang hay các trang đang có bao nhiêu lượt xem (pageviews) :joy::joy::joy: . Tuy nhiên gần đây do một số yêu cầu liên quan đến công việc cũng như mình tự nghĩ ra một số thứ khác cần tracking nên mình bắt đầu lên GA xem nhiều hơn và thậm chí còn bắt đầu tìm hiểu nhiền hơn về GA. Dưới đây là giao diện của GA cho các bạn dễ hình dùng:

![](https://images.viblo.asia/cd92f151-4cb7-49b3-a993-f62ff9e606c9.png)

Về cơ bản khi cài GA lên website thì thông thường chúng ta sẽ đều quan tâm đến số lượng người dùng đang truy cập vào trang web của chúng ta và trang nào (nội dung nào) đang được nhiều người xem nhất. Tuy nhiên khi tìm hiểu thì xem thử nội dung trong các tab bên tay phải thì mình phát hiện ra ngoài các thông tin mình nói trên GA còn lưu trữ rất nhiều các thông tin hay ho khác ví dụ như:
- Trong tab `Audience/Demographics` sẽ lưu trữ các thông tin liên quan đến tuổi và giới tính của người dùng trên trang của chúng ta:

![](https://images.viblo.asia/5ed0f9e3-69cc-4390-805c-ab22c10f7795.png)

![](https://images.viblo.asia/a86509b3-22f3-4546-ae97-090f59606073.png)

Đối với developer chúng ta thì có vẻ sẽ không sử dụng nhiều các thông tin này lắm như với cá nhân mình thì cũng chả biết dùng nó làm gì cả. Tuy nhiên đối với bên làm về Digital Marketing thì dựa vào những con số này có thể giúp họ kiểm tra xem đối tượng mà dịch vụ web hướng đến có đạt được đúng như mong muốn không để có thể đưa ra các điều chỉnh về nội dung trên trang web sao cho phù hợp.

- Trong tab `Audience/Geo` sẽ cung cấp cho chúng ta các thông tin liên quan đến vị trí địa lý như quốc gia, thành phố, vùng lãnh thổ, ...

![](https://images.viblo.asia/3806dbe0-54e3-43a7-aef3-94ff0aa58dd1.png)

![](https://images.viblo.asia/9012cd2e-28b6-4278-8488-ea7fd3c60cb7.png)

Một lần nữa thì với developer chúng ta thì qua phần này thì chúng ta cũng chỉ biết được là truy cập vào trang của chúng ta đang chủ yếu nằm ở đâu trên thế giới. Tuy nhiên khi chúng ta áp dụng các bộ khác nhau vào thì phần này sẽ giúp chúng ta chỉ ra được rằng ở khu vực nào trên thế giới đang có tỉ lệ người dùng mới truy cập vào trang web của chúng ta để từ đó ta có thể triển khai việc hỗ trợ cho vùng quốc gia hay ngôn ngữ đó khi truy cập vào trang.

- Trong tab `Mobile\Overview` sẽ cho chúng ta thấy ti lệ người dùng giữa các loại thiết bị như desktop, mobile, tablet

![](https://images.viblo.asia/61abd0ea-ec11-4b0a-afb3-62ec60544fe6.png)

Dựa vào thông tin này nếu bạn thấy tỉ lệ người dùng truy cập vào trang web của bạn bằng thiết bị di động ngày càng cao hơn thì chúng ta có thể tiến đến việc phát triển app riêng hoặc tiến hành tối ưu tốt hơn cho phiên bản mobile của web

- Trong tab `Technology\Browser & OS` sẽ cung cấp cho chúng ta ta thông tin về loại browser mà người dùng đang sử dụng cũng như hệ điều hành của họ:

![](https://images.viblo.asia/18c05655-3b6f-486c-b06c-6992974062d6.png)

Giả sử nếu ta thấy có vấn đế trên trình duyệt cho mobile dẫn đến việc người dùng thoát trang hoặc tỉ lệ thời gian dùng quá thấp thì ta có thể điều tra xem có vấn đề gì khi sử dụng sản phẩm của chúng ta trên hệ điều hành/ trình duyệt đó để đưa ra các giải pháp phù hợp như tối ưu hơn phiên bản mobile.

<br>

Ngoài ra còn rất nhiều các nội dung khác nhưng mình chưa khám phá hết nênViblo chỉ chia sẻ với các bạn một số nội dung nói trên thôi.

## 3. User, pageview, session,  và bounce rate
<hr>

Đây là những thông tin đầu tiên mà mình tìm hiểu khi khi sử dụng GA vì mình thấy nó xuất hiện ở ngay phần tab home cũng như trong các report khác.

### a. User

Bạn có thể hiểu đơn giản đây là con số liên quan đến user trên trang web của bạn. Về cơ bản khi bạn cài tracking code vào trang web thì mỗi khi có một user mới truy cập vào trang web của bạn thì `Tracking Code` sẽ tạo ra một con số là độc nhất là client ID lưu vào cookie cho thiết bị và trình duyệt mà bạn đang sử dụng. Mỗi khi bạn truy cập vào trang `Tracking Code` sẽ gửi kèm thông tin này lên và đây chính là cách GA xác định một user. Tuy nhiên việc tracking user này không giống với việc user đăng ký và đăng nhập tài khoản trên trang web của bạn vì cùng một tài khoảng khi bạn đăng nhập trên các thiết bị khác nhau thì vẫn là bạn. Còn với GA thì những trường hợp dưới đây sẽ tạo ra một user mới và làm thay đổi con số liên quan đển việc thống kê số lượng user trên GA:
- Khi bạn sử dụng thiết bị khác để truy cập => tạo ra một user mới
- Khi bạn thay đổi sử dụng trình duyệt khác => tạo ra một user mới
- Khi cookie của bạn bị clear => tạo ra một user mới

### b. Pageview

Con số này thì vô cùng đơn giản nó phản ảnh số lượt mà trang chứa nội dung cụ thể trên web của bạn (hay url) được truy cập vào bao nhiêu lần. Mỗi lần trang này (hay url) được tải thì chỉ số pageview này sẽ đồng thời được tăng lên 1

### c. Sessions

Trong GA session có thể được hiểu là một "phiên" làm việc của người dùng trên trang của bạn. Ở đây nó sẽ bao gồm toàn bộ các hành động mà người dùng làm trên trang của bạn trong một khoản thời gian. Giả sử trang web của bạn là một trang bán hàng và có một người dùng A truy cập vào trang của bạn để xem một sản phẩm thì `Tracking Code` sẽ tạo ra cho A một session và đồng thời tăng con số session trên GA lên một. Nếu A tiếp tục chuyển trang xem các sản phẩm khác thì session này sẽ vẫn tiếp tục được giữ nguyên và không làm thay đổi con số session trên GA. Tuy nhiên trong trường hợp sau 30p không có tương tác gì với trang web nữa thì session này sẽ bị hủy bọ. Lúc này nếu A lại quay lại truy cập vào xem sản phẩm khác thì một session mới sẽ được `Tracking Code` tạo ra và làm tăng số lượng session trên GA lên một. Đoạn này mình giải thích có vẻ hơi lằng nhằng nên mình sẽ lấy một ví dụ cụ thể hơn mà mình tìm được như sau:

Giả sử một người dùng tên là Phúc truy cập vào trang web của bạn lúc `14h01` thì nay lúc này `Tracking Code`  sẽ xử lý như sau:
- Tạo ra cho Phúc một session mới và đặt thời gian hết hạn là `14h01 + 30p = 14h31p`
- Tăng bộ tracking số lượng session trên trang GA lên 1
- Mỗi lần Phúc có tương tác với trang web của bạn như xem sản phẩm khác, chuyển trang, hoặc thực hiện các event mà bạn đã đăng kí trên GA thì sẽ thay đổi thời gian hết hạn của session:

![](https://images.viblo.asia/aa39b3c4-b8c3-44d4-a051-9b8654188749.png)

Tuy nhiên ra xử Phúc sau khi xem vài sản phẩm, Phúc bỏ đi ăn cơm lúc `14h02` rồi mới quay lại sử dụng trang web của bạn lúc `14h33`. Lúc này thì session trước đó đã hết hạn nên `Tracking Code` sẽ làm như sau:
- Tạo ra session mới cho Phúc và đặt thời gian hết hạn bằng thời gian tạo + 30p
- Tăng bộ tracking session lên GA lên

![](https://images.viblo.asia/4f2913c1-2551-4ef6-be9c-68f8850007e2.png)

Qua trình này tiếp tục được lặp lại như trên. Ngoài ra còn 2 trường hợp đặc biệt khác có thể tạo ra một session mới là:
-  **Qua ngày mới**: giả sử Phúc vào trang web của chúng ta lúc `23h50` và sử dụng liên tục đến `01h30` ngày hôm sau thì sẽ được tính là 2 session vì toàn bộ session trong một ngày sẽ tự động hết hạn vào lúc `23h59p59s` ngày hôm đó. Vì ở đây Phúc đã sử dụng trang web của chúng ta từ ngày hôm trước qua ngày hôm sau nên ở đây session cũ đã hết hạn và session mới đã được tạo ra
-  **Source thay đổi**: giả sử bạn vào fanpage của [Viblo trên facebook ](https://www.facebook.com/viblo.asia/) và click vào xem bài viết `Một vài tips sử dụng Flatlist để cải tiến performance trong React Native`, lúc này bạn sẽ được redirect đến trang Viblo chưa bài viết đó. Thì như mình nói ở trên lúc này bạn sẽ tạo ra một session mới trên. Nếu bạn tiếp tục xem các bài viết khác thì session này của bạn vẫn được duy trì hoặc thập chí bạn tắt tab mới đi và quay lại bấm vào cái link trên Viblo fanpage thì để truy cập lại thì session của bạn trên Viblo vẫn như vậy. Tuy nhiên nếu bạn truy cập trức tiếp bài viết nói trên bằng cách gõ nội dung vào URL hoặc search tên bài viết trên google thì session sẽ đều được tạo mới. Điều này xảy ra là do bạn đã thay đổi nguồn dẫn bạn tới trang của Viblo, cụ thể:
    -  Truy cập vào Viblo từ facebook => Tạo session mới 
    -  Truy cập vào Viblo từ gõ trực tiếp URL => Tạo session mới
    - Truy cập Viblo từ Google search => Tạo session mới

### d. Bounce Rate

Đây được coi là con số dùng để đanh giá tỉ lệ người dùng thoát trang của bạn ngay từ lần đầu tiên truy cập. Cụ thể nếu có bất cứ user nào truy cập vào 1 page trên trang của bạn và sau đó thoát ngay không xem bất cứ page nào nữa sẽ làm tăng tỉ lệ Bounce Rate lên. Giả sử với một trang tin tức thì bounce rate sẽ nói lên điều sau:
- Bounce rate cao: đồng nghĩa với việc mỗi lần người dùng truy cập vào trang của bạn chỉ đọc đúng một bài duy nhất đó và thoát trang ngay không đọc thêm gì cả. Từ đó ta có thể xem xét vấn đề nằm ở việc bài viết được gợi ý cho người đọc không hơp lý hay do khó sử dụng và từ đó tìm cách làm giảm con số này
- Bounce rate thấp: đồng nghĩa với việc mỗi người dùng truy cập vào trang của bạn sẽ xem nhiều hơn một bài và điều đó là tốt và bạn nên duy trì hoặc cải tiến cho tỉ lệ này thấp hơn nữa.

## 4. Kết bài 
<hr>

Bài viết của mình đến đây là kết thúc, nếu có chỗ nào bạn thấy không đúng hãy comment ở dưới để mình cập nhật lại. Cảm ớn các bạn đã đọc bài và đừng quên để lại một upvote :D