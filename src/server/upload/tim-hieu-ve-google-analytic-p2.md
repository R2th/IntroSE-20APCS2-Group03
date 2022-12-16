## 1. Mở đầu 
<hr>

Trong bài viết trước liên quan đến `Google Analytic` của mình chúng ta cũng đã cùng nhau đi qua một số thông tin mà liên quan đến đối tượng (`Audience`) như độ tuổi/ giới tính, vị trí địa lý, ... và một số khái niệm cơ bản khác nhưu `User`, `Pageview`, `Session` và `Bounce Rate`. Trong trường hợp nếu bạn chưa đọc thì có thể đọc ở [đây](https://viblo.asia/p/tim-hieu-ve-google-analytic-Az45berqlxY). Còn nếu bạn đã đọc rồi thì ở bài hôm nay mình sẽ giới thiệu về một số thông tin liên quan đến phần `Acquisition` có thể hiểu nôm na là nó liên quan đến nguồn đưa người dùng đến với trang web của chúng ta. Nào chúng ta cùng bắt đầu.

## 2. Acquisition

<hr>
Các thông tin liên quan đến `Acquisition` bạn có thể tìm thấy ở đây:

![](https://images.viblo.asia/800748b5-d95e-45db-b03c-ac63516c28f8.png)

Các thông tin mà bạn thu thập được ở đây sẽ giúp bạn trong việc xác định cũng như so sánh được hiệu quả xem nguồn nào sẽ mang lại cho bạn số lượng truy cập vào trang web tốt nhất và đồng thời đưa ra được các chiến lược phù hợp trong việc liên hệ đặt quảng cáo. Dưới đây là nội dung mà chúng ta sẽ nhìn thấy trong tab `Overview`:

![](https://images.viblo.asia/0062ff37-a977-4e21-986d-d17fb713ab31.png)

Các thông tin trong tab này đều được `Google Analytic` tự động thu thập khi trang web của bạn đã nhúng phần `Analytic Code`. Cụ thể đối với phần thông tin `Acquisition` này thì `Google Analytic` sẽ tự động tiến hành thu thập một số thông tin sau mỗi khi có một lượt truy cập vào trang web của chúng ta:

- Medium: giống như cơ chế đưa người dùng đến với trang web của bạn.
- Source: là tên nguồn hay người dùng truy cập vào trang web của bạn từ đâu.
- Campaign: tên campagin đưa người dùng đến với trang web của bạn.

Do phần `campaign` đòi hỏi chúng ta sẽ phải cài dặt thêm nhiều thứ khác nên ở đây mình sẽ tạm thời không đề cập đến nó mà chúng ta sẽ chỉ đi vào 2 phần còn lại.

### a. Medium

Như đã giới thiệu ở trên thì `Medium` là cơ chế đamg người dùng từ đâu đó đến với trang web của chúng ta. `Medium` sẽ bao gồm 5 loại như sau:

- `Organic - tìm kiếm miễn phí`: là những truy cập vào trang web của chúng ta thông qua kết quả tìm kiếm **"miễn phí"** trên thông qua Google Search. Bạn có thể hiểu đơn giản khi bạn search một nội dung bất kì trên Google Search thì chúng ta sẽ nhận được kết quả như sau:

![](https://images.viblo.asia/33c017c5-a127-4581-b5b9-dd843cdc9fa0.png)

Khi chúng ta truy cập vào trang web bất kì bằng cách trên thì `GA` sẽ nhận diện `Medium` ở đây chính là `Organic`.

- `CPC - cost per click - tìm kiếm miễn phí`: tương tự cũng là người dùng truy cập vào trang web của bạn thông qua tìm kiếm trên Google Search nhưng ở đây người sở hữu trang web phải trả phí cho những lượt truy cập như này. Cụ thể ví dụ khi chúng ta tìm kiếm từ khóa "nhà đất" trên Google sẽ thu được kết quả như sau:

![](https://images.viblo.asia/effabd48-1d30-44eb-91ef-ea74a5b5030d.png)

Như bạn thấy ở 2 kết quả đầu tiên thì bên cạnh tên trang web sẽ có thêm từ `Ad` hay chính là để xác định trang web đang sử dụng `Google Ads`. Các truy cập vào trang web thông qua việc click vào kết quả tìm kiếm có từ `Ad` ở đầu sẽ có `Medium` là `CPC`.

- `Referral - nguồn giới thiệu`: đây là nguồn truy cập vào trang web của chúng ta thông qua một trang web khác.  Giả sử khi đọc bài viết dưới đây của mình:

![](https://images.viblo.asia/258d721e-e398-43e1-a538-3c7e3d97e878.png)

Bạn để ý sẽ thấy ở từ `Digital Ocean` mình có gắn link dẫn đến [Digital Ocean](https://m.do.co/c/317ae4174798). Nếu bạn truy cập vào một trang web thông qua đường link được gắn vào các nơi khác thì các lượ truy cập này sẽ được tính vào là `Referral`.

- `Email`: như cái tên của nó thì nó sẽ gồm các truy cập đến trang web của bạn thông qua email. Đây có thể là các email quảng cáo được gửi đến mail của bạn và bạn truy cập vào trang web đó bằng cách click vào được link mà họ cung cấp trong mail

![](https://images.viblo.asia/222a3b67-b914-4975-b0b6-8828114ab020.png)

Phía trên là một email quảng cáo mà mình nhận được từ bên `Udemy`. Nếu mình click vào chữ `Shop now` thì lập tức mình sẽ được chuyển qua trang `Udemy` và lượt truy cập này sẽ được tính là `Email`.

- `None`: đây là nguồn truy cập vào trang web của bạn thông qua việc người dùng gõ trực tiếp tên trang web của bạn lên browser mà không thông qua bất cứ hình thức nào khasc

### b. Source

Cung cấp cho chúng ta thêm thông tin liên quan đến lượt truy cập vào trang web của chúng ta. Ví dụ:

- Medium của chúng ta là `Organic - tìm kiếm miễn phí` thì lúc này `Source` sẽ là tên của công cụ tìm kiếm mà người dùng sử dụng như `Google Search`.
- Medium của chúng ta là `CPC - tìm kiếm trả phí` thì tương ứng `Source` của chúng ta sẽ là `Google` vì ở đây chúng ta đang dùng Google Ad
- Medium là `Referral - nguồn giới thiệu` thì như ví dụ trên khi bạn truy cập vào `Digital Ocean` thông qua đường link của mình trên `Viblo` nói trên thì lúc này `Source` của nó sẽ là `viblo.asia`
- Trong trường hợp bạn truy cập trực tiếp vào trang web bằng cách gõ thẳng URL của nó trên browser thì lúc này Medium của nó sẽ là `None` và tương ứng Source sẽ là `Direct`

### c. Source/ Medium

Khi truy cập vào tab `Acquisition/All Trafic/Source / Medium` ta sẽ thấy được phần báo cáo liên quan đến `Source/ Medium` của trang web của chúng ta, ví dụ:

![](https://images.viblo.asia/6be65783-7b29-496f-a22b-34fe320e63f6.png)

Như trong hình nói trên chúng ta có thể thấy lượt view nhiều nhất mà chúng ta thu thập được ở đầy là từ nguồn tìm kiếm miễn phí thông quan google (google/ organic), tiếp đó là thông qua việc truy cập trực tiếp vào trang web của chúng ta (direct/ none) và thứ ba đó chính là thông qua nguồn giới thiệu từ `analytics.google.com` (analytics.google.com/ referral). Dựa vào thông tin này bạn có thể xác định được nguồn nào đang đem lại cho bạn nhiều lượt truy cập nhất để có thể tập chung vào việc quảng cáo qua các nguồn đó.

Tuy nhiên không phải thông số đầu tiên bạn thấy là số lượng người dùng truy cập nhiều nhầ đồng nghĩa với việc nguồn đó là tốt nhất. Bạn nên dựa vào các thông số khác để xác định được nguồn nào đang mang lại hiệu quả nhất chứ trường hợp nguồn đầu tiên bạn thấy có thể đem lại lượt người dùng truy cập vào lớn nhất nhưng bù lại `Bounce Rate` cũng cao thì nguồn đó không hẳn là nguồn tốt nhất. Cụ thể để lấy được thông tin này chúng ta có thể bấm vào phần chọn phần biểu đồ có tên là `Compare` ở ngay phía trên bảng báo cáo:

![](https://images.viblo.asia/59d7b8d2-96e8-4477-a3e3-d4b35f561289.png)

Sau đó bạn tiếp tục chọn `Bounce Rate` ở cột chứa phần biểu đồ và thu được kết quả như sau:

![](https://images.viblo.asia/a83444e1-60e0-42f7-a02b-23dd4a02b5a4.png)

Như bạn thấy thì biểu đồ này sẽ dùng để so sánh `Bounce Rate` trung bình của trang web chúng ta với tất cả các `Source/Medium`  chúng ta đang thấy. Với `Source/ Medium` là `mail.googleplex.com/ referral` ta thấy tỉ lệ `Bounce Rate` của nó thấp hơn tận 71% (Bounce Rate càng thấp thì càng tốt) so với toàn trang nghĩa là ở đây chúng ta đang có một nguồn người dùn truy cập "chất lượng cao". Từ các thông tin như vậy ta có t hể xác định chính xác hết về việc chọn quảng cáo hoặc tập chung đẩy bài lên đâu.

### d. Channel

Ngoài việc xem báo cáo liên quan đến sự kết hợp giữa `Source/ Medium` cụ thể như mình đã giới thiệu qua ở bài trước, chúng ta cũng có thể xem riêng phần thống kê xem nguồn nào đem lại lượ truy cập vào trang web của chúng ta nhiều nhất thông qua tab `Acquisition/ All Traffic/ Channels`:

![](https://images.viblo.asia/8e0908b2-7b95-4bc2-a81c-d9a824fe9728.png)

`Channle` là sự gom nhóm các `Source` với nhau theo một điểm chung nào đó dưới một `Medium` thành các `Channel` (hay bạn có thể hiểu là một danh mục):

![](https://images.viblo.asia/84824d82-d33b-4c28-ae05-7f811a0df53b.png)

Như hình trên ta thấy chúng ta sẽ có một số channel cơ bản là `Organic Search` sẽ bao gồm toàn bộ các `Source` người dùng sử dụng để tìm kiếm và truy cập vào trang web của chúng ta. Tương tự với các channel còn lại. Ở đây bạn có t hể thấy ta có hai channel là `Social` và `Referral`, thực chất 2 `channel` này đều có cùng một `Medium` là `Referral`, tuy nhiên `GA` đã tự gom nhóm chúng thành 2 channel khác nhau một channel sẽ liên quan đến nguồn giới thiệu từ các trang mạng xã hội và một channel liên quan đến  các nguồn referral còn lại. Cụ thể khi chúng ta chọn vào channel `Social` sẽ thấy như sau:

![](https://images.viblo.asia/a2d0587c-8793-405a-94de-18e31d841781.png)

Nó sẽ chưa toàn bộ thông tin liên quan đến các trang mạng xã hội có link đến trang web của bạn như `Youtube`, `Facebook`, `Reddit`, ... . Ngoài ra bạn cũng có thể tự tạo channel của riêng mình nhưng tuy nhiên bài viết của mình chỉ dừng lại ở các kiến thức cơ bản nên mình sẽ không giới thiệu về phần này.

## 3. Kết bài
<hr>

Bài viết liên quan đến `Acquisition` của mình đến đây là kết thúc, tuy nhiên đây không phải là toàn bộ những nội dung mà phần `Acquisition` cung cấp cho chúng ta mà nó còn cả một số thông tin liên quan đến `Social`, `Google Console` tuy nhiên ở đây mình sẽ không đề cập đến mà chỉ nói đến những thông số đơn giản và cơ bản nhất. Cuối cùng cám ơn các bạn đã đọc bài và đừng quên để lại 1 upvote nhé :D.