Nguồn bài viết [New Relic Insights って何？ 他のダッシュボードサービスと何が違うの？](https://qiita.com/kumatronik/items/b25313a8631e46140499)

Hôm nay trong bài viết này tôi sẽ giới thiệu về New Relic Insights, 1 service khá khác biệt so với các service còn lại của New Relic. Để cho dễ hiểu thì đây là dash board service, nếu nói về tính chất New Relic thì nó là 1 platform phân tích dữ liệu real time. Nhìn chung thì nó có những chức năng hướng đến business hơn là đơn thuần kĩ thuật.

![](https://images.viblo.asia/061dd043-898b-45f4-b903-6d5e7967721c.png)

# New Relic Insights có gì khác so với những dashboard service khác?

New Relic Insights mang 2 đặc điểm đặc trưng của các service New Relic.

Một là, với tư cách data source, nó có thể sử dụng data được thu thập từ các service khác của New Relic. Do đó không cần thiết phải cài đặt data source, và nếu như bạn đang sử dụng APM thì có thể ngay lập tức bắt đầu việc phân tích data. 

Hai là, nó có ngôn ngữ query chuyên dụng (NRQL), do đó không cần thiết phải là engineer chuyên ngành mà chỉ cần biết cách sử dụng thì có thể viết các query để xem được data muốn xem.

# Cách chúng tôi sử dụng New Relic Insights ở Degica

Ở công ty chúng tôi, Insights được sử dụng để hiển thị các loại data khác nhau của 1 service về quyết toán gọi là Komoju. 
Ví dụ như tỉ lệ giữa các phương pháp chi trả khác nhau, dự toán doanh thu, đơn giá trung bình hay conversion rate.

Dưới đây tôi sẽ giới thiệu sự kết hợp giữa data source và NRQL để thấy được Insights vừa là 1 tool để phân tích performance vừa là 1 tool để phân tích business hiệu quả mà các service khác khộng có được

# Có thể sử dụng được nhiều loại data source dù chỉ ở mức default 
Hiện tại thì Insights có thể default sử dụng data source của 4 loại service New Relic dưới đây 

APM: transaction data, error data

Browser: pageview data

Mobile: crash data, interaction data, session data

Synthetics: Synthetic check data、Synthetic request data

Ví dụ, ở transaction data của APM thì có thể sử dụng dữ liệu về số lần call database, response code của HTTP, path, host, user agent...
Theo đó có thể thấy được và so sánh những data mà ở dashboard của APM không có.

Ưu điểm của dashboard này là có thể tổng hợp được nhiều loại data từ nhiều nguồn data source. Bằng cách kết hợp transaction data, pageview data, Sythentics ta có thể so sánh được thông tin tổng hợp của 1 site 1 cách đơn giản.

Ngoài ra nếu trong trường hợp sử dụng nhiều app thì cần chỉ định tên app cụ thể để filter data, song ngược lại thì cũng có thể so sánh data của nhiều app khác nhau.

# Filter data source bằng NRQL

NRQL là viết tắt của New Relic Query Language, ngôn ngữ query được New Relic phát triển dựa trên SQL, dùng để filter, lấy thông tin từ data source nói ở phía trên. VÌ là dựa trên SQL nên cơ bản sẽ có lệnh SELECT, FROM, WHERE. Ví dụ để lấy Apdex score của Browser thì NRQL sẽ như dưới đây.
`SELECT apdex(duration, t: 2.0) FROM PageView WHERE appName='Komoju'`

SELECT  chỉ định data muốn lấy、FROM chỉ định data source (event) 、WHERE ở đây là chỉ định tên app.

![](https://images.viblo.asia/c0cf2740-56c8-4c4f-bb8e-3ebc151181f3.png)


![](https://images.viblo.asia/7984a9f9-bdb3-45e6-9eb0-a2519a74f007.png)


![](https://images.viblo.asia/085433b3-67de-4267-9dd7-e9ba765615a3.png)


![](https://images.viblo.asia/dc6677a4-3e96-4b22-8ccd-b79de3a0c260.png)


Cơ bản thì bằng cách viết NRQL như trên ta có thể tạo được nhiều bẳng và data list khác nhau, tổng hợp vào 1 dashboard, check kiểm tra hàng ngày, nếu cần thiết có thể sửa và thêm các thông tin khác.

Cách cấu trúc NRQL và keyword được viết cụ thể ở [NRQL reference](https://docs.newrelic.com/docs/insights/nrql-new-relic-query-language/nrql-resources/nrql-syntax-components-functions)

# Data explorer không cần dùng NRQL 

Tuy phía trên tôi có nói không cần là engineer vẫn có thể viết NRQL song vẫn phải nói rằng có nhiều keyword NRQL không quen thuộc, cần mất nhiều thời gian để học.

Nhưng trong Future Stack 15, New Relic đã có thông báo về những thay đổi lớn của Data explorer trong Insights. Nếu như trước đây nó chỉ đơn giản là list các data thu thập được thì hiện tại nó đã thay đổi như dưới đây

![](https://images.viblo.asia/e0d791d8-6429-4e59-8bfc-794b6fad3224.png)

Tóm lại là hiện tại chỉ bằng cách chọn điều kiện NRQL sẽ tự động được sinh ra và thêm vào dashboard. Theo đó người không phải engineer cũng có thể thao tác trên màn hình và xem được những data mong muốn. Đây là 1 chức năng rất mạnh và hiệu quả nên tôi nghĩ nó đã giúp năng tầm service của Insights lên 1 bậc.


Trên đây tôi đã giới thiệu 1 cách đơn giản về New Relic Insights, hy vọng đã giúp các bạn hình dung được phần nào về service này.

Tuy nhiên qua thực tế sử dụng thì ta có thể nhận thấy chỉ với data source default thôi thì chưa đủ để sử dụng cho phán đoán, phân tích business. 
Vì vậy lần tới đây tôi sẽ giới thiệu chức năng gửi data và kết hợp với custom API để mở rộng khả năng sử dụng của Insights.