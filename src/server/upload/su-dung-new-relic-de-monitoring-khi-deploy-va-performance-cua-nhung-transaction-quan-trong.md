Nguồn bài viết : [デプロイ時や重要なトランザクションのパフォーマンス監視をしよう - New Relic を使ったアプリケーションのパフォーマンス監視入門](https://qiita.com/kumatronik/items/d2e07285c3cb37f6bc6b)

Ở những bài viết trước tôi đã giới thiệu cách phân tích performance từ những dữ liệu default mà New Relic thu thập được.

Song để có thể phân tích hiệu quả hơn thì việc customize dựa trên tình trạng của 1 service cố định là điều nên làm.
Vì vậy lần này tôi sẽ giới thiệu những customize point của APM, hi vọng sẽ giúp ích được cho service của các bạn.

# Sử dụng deploy trace để so sánh performance trước và sau khi deploy

Thời điểm deploy là thời điểm được cho rằng performance giảm xuống nhiều nhất do có bug, do code thay đổi dẫn đến nhiều ảnh hưởng. 

Vì vậy nếu so sánh performance sau khi release mà thấp hơn so với trước khi release thì cần thiết phải biết được càng sớm càng tốt, để có thể roll back lại version cũ, giảm ảnh hưởng cho người dùng.


New Relic có chức năng có thể giúp ta thấy được performance trước và sau khi deploy.
Ở màn hình này, thời điểm deploy ở giữa của chart. Theo như line màu xám, thì ta có thể so sánh được ngay là performance đã giảm hay tăng.
![](https://images.viblo.asia/6919e6b9-e09d-4e7a-a8f3-dc8084c69a74.png)

# Đến lịch sử deploy

Khi muốn check lịch sử deploy thì chỉ cần chọn Deployments menu ở chính giữa bên trái.

Theo đó, lịch sử sẽ hiển thị như dưới đây, và bạn có thể chọn thời điểm deploy muốn check sau đó màn hình sẽ hiển thị như ảnh phía trên.
![](https://images.viblo.asia/52c55101-19be-454a-adf6-fe8875ff28bc.png)

# Có thể so sánh với transaction chậm của lần trước

Trong Deployments còn 1 tab nữa là tab Change report. Ở đây ta có thể biết được top 10 transaction chậm của lần deploy trước đã thay đổi như thế nào ở lần deploy này.
![](https://images.viblo.asia/d3d5d305-6ffd-48c3-982d-8f48974235fe.png)
Như có thể thấy ở hình phía trên, nếu nhìn vào 「/vets(GET)」thứ tư từ trên xuống sẽ thấy lần trước response time trung bình là 1390ms thì bây giờ đã nhanh lên rất nhiều chỉ còn 323ms.

Bằng cách sử dụng màn hình này ta có thể biết được việc cải thiện performance có hiệu quả hay không.

# Có thể check được ngay tại màn hình Overview 

Có 1 điểm hay ở New Relic là có thể check thời điểm deploy không chỉ ở màn hình Deployments chuyên dụng mà còn có thể check ở màn Overview. Deploy maker hiển thị là đường thẳng màu xanh ở main chart.

Vì vậy, nếu xem Overview thì có thể biết được thời điểm deploy. Nếu sau đường màu xanh mà performance giảm xuống thì có thể xác định nguyên nhân là ngay trước khi deploy.

![](https://images.viblo.asia/c8587307-4436-4844-9121-1364bf1c2316.png)

# Cách tạo maker của thời điểm deploy

New Relic không thể tự xác định thời điểm deploy, vì vậy cần có setting thời điểm deploy với mỗi service.

Có rất nhiều cách setting nhưng cách thông dụng nhất là dùng curl để gợi API của New Relic deploy maker như dưới đây.
```
curl -X POST 'https://api.newrelic.com/v2/applications/${APP_ID}/deployments.json' \
     -H 'X-Api-Key:${API_KEY}' -i \
     -H 'Content-Type: application/json' \
     -d \
'{
  "deployment": {
    "revision": "REVISION",
    "changelog": "Added: /v2/deployments.rb, Removed: None",
    "description": "Added a deployments resource to the v2 API",
    "user": "datanerd@example.com"
  }
}' 
```

# Cài đặt Apdex, cài đặt alert để monitoring những transaction quan trọng của service 

Ta có thể biết được perfomance liên quan đến toàn bộ transaction ở trang Transaction, tuy nhiên thay vì check tất cả như vậy thì tôi nghĩ nên tập trung vào các transaction quan trong trong service như doanh thu hay cạnh tranh business.

Có rất nhiều trường hợp thay vì các transaction rất chậm thì những xử lí như search hay login chỉ chậm 1 chút thôi mới là vấn đề.

Theo đó, chức năng để tập trung monitoring những transaction quan trong được gọi là Key Transaction. Nếu đăng kí 1 transaction thành key transaction thì sẽ có những điểm tiện lợi như dưới đây

1. Có màn hình overview chuyên dụng cho transaction đó
2. Có thể setting chỉ số Apdex cho transaction đó
3. Có thể setting Alert cho transaction đó
4. Có SLA report chuyên dụng cho transaction đó
5. (Khác nhau theo ngôn ngữ lập trình) Có thể thống kê performance trên đơn vị gọi method của transaction đó, gọi là X-Ray session

Nếu đăng kí 1 transaction thành key transaction thì sẽ có màn hình chuyên dụng như dưới đây, có thể biết được response time, throughput, Apdex, error rate của riêng 1 transaction.
![](https://images.viblo.asia/a2efae66-8489-462a-aab7-be32595aa871.png)

# Cách access key transaction 
Click vào Key transactions ở top menu thứ 3 từ bên trái sẽ hiển thị ra list các transaction đang được đăng kí.
![](https://images.viblo.asia/13938b1b-c01e-47ba-89ce-0decb1acc44a.png)

# Cách thêm key transaction 
Để thêm ta chỉ cần nhấn Add more ở list key transaction, tuy nhiên sau đó việc chọn traansaction rất phiền phức nên tôi sẽ giới thiệu 1 cách khác, là cách đi từ Transaction.


Từ list Transaction ta chọn transaction muốn thêm sau đó bên cạnh transaction đó sẽ hiển thị link Track as key transaction, nhấn vào link sẽ hiển thị pop up với button Track Key Transaction, nhấn vào đó là màn hình Transaction sẽ được tạo.
![](https://images.viblo.asia/7ba1467c-1836-4aba-b427-07c47c833973.png)

# Cách setting chỉ số Apdex của key transaction 
Việc setting này sẽ giúp ta đo và giám sát được độ hài lòng của user trên đơn vị transaction, đặc biệt là với các transaction quan trọng với business.

Ví dụ với toàn bộ site thì 0,5s là được nhưng với xử lí search thì nên là 0,3s chẳng hạn, khi đó ta sẽ đăng kí xử lí search là key transaction rồi setting tùy chọn.

Để setting ta chọn gear icon của đối tượng transaction thì pop up sẽ hiện ra như sau
![](https://images.viblo.asia/89c31db7-bff1-4e27-950b-6b6b659abe41.png)

Ở đây ta setting Apdex cho mục App của phần Apdex T.