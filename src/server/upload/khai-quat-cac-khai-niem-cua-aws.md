**Chú ý:** *bài viết này sẽ là một bài giới thiệu về các khái niệm được được đơn giản hóa ở mức độ cao với mục đich là cung cấp cho người đọc một khung tham chiếu để phục vụ cho việc tìm hiểu sau này. Điều này có nghĩa là bài viết này sẽ không phải là bài hướng dẫn các bạn cách dùng một service nào đó của AWS và cũng sẽ không dùng các định nghĩa hay giải thích mang tính kĩ thuật.*
<br>

*Source: https://www.udemy.com/course/aws-concepts/*

-----

# I. Lời mở đầu
Đây là phần mở đầu của series về AWS của mình. Để có thể đọc bài viết này, bạn sẽ chẳng cần phải có tí kiến thức gì về AWS, cloud computing hay thậm chí là IT luôn :D. Điều này có nghĩa là, bài viết này không chỉ dành cho dân Dev đang muốn upgrade technical của mình mà nó còn dành cho những người không trực tiếp làm trong lĩnh vực IT nhưng muốn nắm được một cách tổng quan Cloud và AWS là gì (ví dụ như những người thuộc về mảng business của các công ty IT hay của các công ty khách hàng của các công ty IT chẳng hạn).
<br>

Ở bài này, mình sẽ tập trung vào những khái niệm cơ bản nhất về cloud computing mà bạn cần nắm được thông qua các thuật ngữ của AWS. Và điều này sẽ giúp các bạn có được một nền tảng để tiếp tục đi sâu hơn và tìm hiểu về các concept nâng cao hơn.
<br>

Mình cũng sẽ dùng các ví dụ thực tế về các tập đoàn lớn đang sử dụng AWS cũng như cách họ sử dụng một số các service thông dụng mà AWS cung cấp để giúp các bạn hiểu được các lợi ích mà AWS đem lại.


-----


# II. AWS & điện toán đám mây (Cloud computing)
## 2.1 Mô tả
Đầu tiên hãy nói về "Cloud", bạn hãy coi nó giống như là một chiếc máy tính, tablet, hay smartphone... ở một nơi nào đó không phải ở chỗ của bạn. Và bạn có thể tận dùng nó (về sức chứa, về khả năng xử lý v.v...) bằng một cách nào đó thông qua internet:
![](https://images.viblo.asia/b6cb3d78-1dbf-4c67-a2cf-116cfc8a22df.JPG)

Trong thực tế thì không chỉ có một chiếc máy tính mà sẽ là cả một data center, là một nơi mà có hàng dãy các loại máy tính mà bạn có thể tận dụng:
![](https://images.viblo.asia/6fbe65c6-babe-4b26-b955-ad97d8834517.png)

Qua hình trên bạn có thể thấy rằng, khi sử dụng iCloud, DropBox, AWS... để lưu trữ file, ảnh, tài liệu... thì không phải chúng được gửi đến một đám mây hay một chiếc hộp "ma thuật" nào đó, mà thực ra chúng được lưu trữ tại một trong các máy server (hay người ta còn gọi là "rack") trong một cái data center ở một nơi nào đó trên thế giới như trong hình trên.
<br>

Qua ví dụ về cloud ở trên thì chắc hẳn bạn đã thấy được rằng, AWS là một nhà cung cấp dịch vụ cloud. Thông thường khi nói về các nhà cung cấp dịch vụ cloud, người ta thường nghĩ đến khả năng lưu trữ, xử lý máy tính, database. Nhưng thực ra AWS còn cung cấp rất nhiều thứ khác, ví dụ như: mạng lưới, phân tích, các công cụ cho developer, ảo hóa, bảo mật... bạn không cần phải biết hay hiểu hết tất cả các dịch vụ này, mình chỉ muốn cho các bạn thấy rằng, việc sử dụng iCloud hay DropBox để lưu ảnh, file chỉ là một phần rất nhỏ trong Cloud computing.

## 2.2 Lợi ích
### 2.2.1 Đối với cá nhân
Bạn có thể lưu ảnh, video, file của mình trên Cloud, và Cloud sẽ cho phép bạn "sao lưu" và "chia sẻ" dữ liệu.
<br>

Ví dụ, bạn muốn lưu ảnh từ các chuyến du lịch hoặc các tài liệu, nhạc, video... nhưng nếu lưu trên ổ đĩa máy tính cá nhân của mình thì sẽ luôn có rủi ro ổ đĩa của bạn có thể bị lỗi, hỏng hóc, khi đó bạn có thể sử dụng iCloud hoặc DropBox để sao lưu và bạn sẽ luôn có một bản sao dữ liệu của mình.
<br>

Cloud cũng rất tốt trong việc "chia sẻ", và chia sẻ ở đây không chỉ là việc bạn chia sẻ file hay ảnh của mình với những người khác mà bản chất nó là việc chia sẻ giữa các thiết bị để bạn có thể truy cập vào cùng một file từ điện thoại, máy tính công ty, máy tính cá nhân... của mình, tức là bạn có thể truy cập chúng tại bất cứ đâu, miễn là có thiết bị.
![](https://images.viblo.asia/51ed30ac-ffce-4a93-9b8f-1bad5e0fa6a3.png)

Qua ví dụ trên, mình muốn giới thiệu với các bạn hai thuật ngữ trong Cloud:
- #1 - "**High Availability**" (tính khả dụng cao): nếu bạn đưa một file lên Cloud, bạn có thể truy cập nó từ bất cứ loại thiết bị nào miễn là nó có kết nối internet.
- #2 - "**Fault Tolerant**" (tính chấp nhận lỗi): nếu bạn có một file chỉ ở trên máy tính tại nhà của mình và ổ cứng của máy tính tại nhà của bạn bị hỏng thì file đó sẽ bị mất vĩnh viễn. Nhưng nếu bạn lưu file đó trên cloud và nó được sao lưu trên nhiều service thì dù file đó có bị lỗi hoặc server cloud mà bạn đang truy cập file đó bị lỗi thì sẽ luôn có bản sao khác, nghĩa là dù hệ thống có bị lỗi thì bạn vẫn có khả năng lấy lại được file đó.

### 2.2.2 Đối với doanh nghiệp
#### Ví dụ không sử dụng Cloud
Chúng ta có ví dụ về một công ty phần mềm. Công ty này không sử dụng dịch vụ Cloud nào cả mà sử dụng server tại chỗ (on-premise servers) của công ty để lưu trữ dữ liệu, code hoặc khi người dùng sử dụng phần mềm của công ty, họ sẽ truy cập phần mềm trên server của công ty.
<br>

Vào năm 2016, công ty có 1000 user và cần 3 server vật lý để vận hành phục vụ lượng user này:
![](https://images.viblo.asia/02d890a4-e85e-4bf7-bb45-e96cbbe10ef6.png)

 Công ty estimate rằng, vào năm 2017, số lượng user sẽ tăng lên tới 5000. Lúc này 3 server sẽ không đủ để handle lượng user và công ty cần thêm 3 server nữa để chịu tải.
 ![](https://images.viblo.asia/65334f77-db5f-4fd3-ace3-fb3458753b3f.png)

 Tuy nhiên, để có thể thêm 3 server tại chỗ nữa, công ty phải chuẩn bị:
- chỗ trống để đặt thêm 3 server mới.
- nghiên cứu tìm mua loại server phù hợp trên thị trường và tốn một lượng lớn kinh phí để mua và đợi server được vận chuyển tới (có thể kéo dài từ 1 đến vài tuần).
- setup server, test server, cài đặt và chạy các phần mềm (điều này cũng có thể tốn khá nhiều thời gian).

Sau đó, giả sử ước tính của công ty là chính xác, tức là công ty phảt triển tốt và công ty tiếp tục ước tính tới năm 2018 lượng user sẽ tăng lên tới 20,000. Lúc này, công ty sẽ cần phải có thêm 12 server và công ty lại phải tiếp tục chuẩn bị chỗ trống để đặt thêm server và tiếp tục bỏ tiền ra để mua thêm server rồi tiếp tục quá trình order, đợi hàng, cài đặt.
![](https://images.viblo.asia/d50410be-71df-426a-a892-912a58651587.png)

Tuy nhiên có một vấn đề lớn ở đây là, có thể đến thời điểm hiện tại, công ty đã bỏ ra hàng chục nghìn USD để mua những chiếc máy tính cao cấp này. Nhưng nếu đến năm 2018, thực tế khác với estimate của công ty và lượng người dùng chỉ tăng lên 7000 user:
![](https://images.viblo.asia/19c3676f-3dc2-42fe-bfd0-341f35069b5f.png)

Lúc này gần như toàn bộ lượng server mà công ty mua cho năm 2018 sẽ không được sử dụng. Đó là một sự lãng phí vồ cùng lớn về tài nguyên và tiền bạc.
<br>

Lúc này họ sẽ phải bán những server đó đi hoặc cứ để server ở đấy chờ cho đến khi lượng user tăng lên. Nhưng đối với các doanh nghiệp, đặc biệt là những doanh nghiệp đang phát triển, bỏ ra cả chục ngàn USD vào những chiếc server rất có thể là một khoản đầu tư lớn, nếu họ không thể khiến lượng user tăng lên để lấp đầy những server đó thì đây sẽ là một tổn thất lớn cho công ty.
<br>

Vấn đề trên của các data center tại chỗ chính là thứ mà các dịch vụ Cloud tìm cách giải quyết.

#### Ví dụ sử dụng Cloud
Chúng ta tiếp tục áp dụng kịch bản như ở ví dụ trên, nhưng lần này công ty có sử dụng dịch vụ Cloud của một nhà cung cấp, ví dụ như AWS.
<br>

Vào năm 2016, công ty có 1000 user trên 2 **Cloud server**:

![](https://images.viblo.asia/cadfbdab-99b0-4414-8b65-ddade909317e.png)

Sau đó công ty phát triển và ở ví dụ lần này mình sẽ không đặt mốc thời gian, vì lúc này các mốc thời gian đã không còn ý nghĩa nữa do công ty không cần phải dự trù, ước tính tăng trưởng trong tương lai nữa.
![](https://images.viblo.asia/227911d4-b488-494b-9256-9d3b3fe894d5.png)

Khi lượng user tăng lên thì nhà cung cấp dịch vụ Cloud sẽ ngay lập tức, tự động tăng thêm server cho công ty. Tức là chỉ trong vài phút, đã giúp công ty thực hiện được quá trình mà trước đây khi dùng data center tại chỗ phải tốn hàng tuần để thực hiện: ước tính tăng trưởng, chuẩn bị chỗ trống trong data center, tìm hiểu loại server cần mua, order, đợi nhận hàng, setup, cài đặt phần mềm, test, load phần mềm vào server mới.
<br>

Tiếp tục với ví dụ của chúng ta, giả sử lượng user của công ty giảm xuống từ 4000 còn 3000 user:
![](https://images.viblo.asia/c455857a-fe6d-4ca2-98ce-c60d96122b2c.png)

Bạn có thể thấy, khi lượng user giảm, một server cũng biến mất theo. Bởi vì khi bạn sử dụng dịch vụ Cloud, nhất là khi sử dụng server, bạn sẽ chỉ dùng đến chúng khi cần thiết. Thế nên, ngay khi lượng user giảm xuống còn 3000, nhà cùng cấp đơn giản chỉ cần ngưng hoạt động một server và công ty sẽ không bị thu phí sử dụng server đó nữa.
<br>

Vậy là không như ví dụ sử dụng server tại chỗ, bạn phải mua các server vật lý và đặt chúng trong công ty, và nếu chúng không được sử dụng thì công ty sẽ rơi vào tình trạng lãng phí tài nguyên. Sử dụng một nhà cung cấp dịch vụ Cloud, bạn chỉ đơn giản là thuê phần cứng theo yêu cầu, nghĩa là khi lượng user tăng thì số server sẽ tăng theo, và khi lượng user giảm thì số server sẽ bị cắt bớt và bạn không phải tốn chi phí cho chúng nữa.
<br>

Qua hai ví dụ trên, chúng ta lại có thêm hai thuật ngữ Cloud nữa, đây cũng chính là 2 trong những lý do chính mà các doanh nghiệp sử dụng Cloud:
- #3 - "**Scalability**" (khả năng mở rộng): khi số lượng user tăng thì bạn có thể dễ dàng tăng số lượng server lên một cách nhanh chóng, hay nói cách khác bạn có thể mở rộng một cách vô cùng dễ dàng.
- #4 - "**Elasticity**" (khả năng co dãn): không chỉ tăng mà bạn cũng có thể giảm số lượng server một cách dễ dàng.

-----

# III. Giới thiệu các service chính của AWS
Hay xem sơ đồ đơn giản mô tả kiến trúc của AWS sau:
![](https://images.viblo.asia/98148372-d773-4956-94b8-6a40bf9985a9.png)

Ta có thể thấy bên trong AWS chúng ta sẽ có các service, kiến trúc mạng và còn nhiều thứ khác nữa, đầu tiên chúng ta sẽ tìm hiểu về VPC.
## 1. VPC
VPC là viết tắt của "Virtual Private Cloud". Nhưng VPC hay Virtual Private Cloud nghĩa là gì? Ý nghĩa của nó đối với chúng ta là như thế nào? Mình sẽ lấy Facebook để giúp các bạn hình dung được VPC là như thế nào, vì giữa chúng có một sự tương đồng nhất định.
![](https://images.viblo.asia/8f01c361-6816-4491-9687-bd4773403320.png)

Ta có thể thấy, ở Facebook sẽ có nhiều trang khác nhau. Trang của bạn trên Facebook là nơi mà bạn có thể đăng các post, ảnh, video của mình. Và nếu bạn muốn, bạn có thể đặt một lớp bảo mật lên trang của mình để quyết định xem ai được phép xem post của bạn dựa theo việc bạn cho phép người đó kết bạn với mình hay không.
<br>

Vậy có thể nói, trang của bạn là một khu vực riêng tư của bạn trên Facebook, nơi mà bạn có thể upload các thứ quan trọng với bạn hoặc những thứ bạn muốn chia sẻ với người khác. Nhưng bạn cũng có một lớp bảo mật để quyết định xem ai sẽ được phép truy cập dựa theo danh sách bạn bè hoặc thậm chí từng người trong danh sách bạn bè của bạn sẽ có quyền truy cập đến các post, ảnh, video nhất định. Và mỗi trang Facebook là một khu vực riêng tư của mỗi người.
<br>

Tương tự như vậy, AWS cũng có nhiều VPC (tương ứng với các trang ở Facebook), trong mỗi VPC chúng ta có thể đặt các resource khác nhau như EC2, RDS... (chúng ta sẽ tìm hiểu cụ thể về những khái niệm này sau). Và cũng giống như các trang của Facebook, VPC của bạn là một khu vực riêng tư của bạn trong AWS, nơi mà bạn có thể đặt các resource, file... những thứ mà bạn muốn sử dụng qua AWS. Bạn cũng có thể đặt một lớp bảo mật lên trên chúng để có thể cấp quyền/hạn chế người khác sử dụng database, EC2 server... của bạn.
![](https://images.viblo.asia/30ec484f-6bd3-4938-8faa-0cc170107d82.png)

## 2. EC2 (Part 1)
Ở phần này, chúng ta sẽ xem xem Netflix sử dụng các resource của AWS như EC2, RDS... như thế nào trong hệ thống của họ (trong phần này chúng ta sẽ tập trung vào EC2).
<br>

Giới thiệu qua về Netflix cho bạn nào chưa biết thì Netflix có lẽ là nhà cung cấp streaming video số một thế giới và cũng là khách hàng sử dụng các cloud resource số một của AWS.
<br>

Vậy thì trước tiên, EC2 là gì? EC2 là viết tắt của "Elastic Cloud Compute" tuy nhiên bạn cũng không cần nhớ cái này cho lắm, cái quan trọng là cần nắm được về mặt khái niệm EC2 là gì và nó làm được gì.
<br>

Có thể nói EC2 cơ bản tương đương với một cái máy tính giống như cái mà bạn đang sử dụng ngay lúc này:
![](https://images.viblo.asia/f1e52d74-3d4b-43a7-a51d-ecdc1df0d797.png)

Một cái máy tính cơ bản sẽ bao gồm các thành phần sau:
- CPU: cung cấp sức mạnh xử lý
- Hệ điều hành: Linux, Windows, MacOS...
- Hard Drive: dùng trong việc lưu trữ cục bộ
- Network Card: dùng để truy cập internet
- Firewall: an ninh cho máy
- RAM: truy cập và chạy các chương trình

Tuy nhiên, trong AWS thì một cách chính xác hơn, chúng ta phải coi EC2 tương đương với một máy chủ (server computer), bởi vì nhìn chung AWS được sử dụng bởi các doanh nghiệp, và thường thì họ muốn sử dụng sức mạnh xử lý của các EC2 trong việc làm server.
<br>

Và lúc này chúng ta lại có một thuật ngữ nữa trong Cloud: #5 - "**Instance**". Sau này bạn sẽ thấy trong AWS hay trong công việc, người ta thường nói instance EC2 thay vì server EC2, ví dụ như cấp một instance, bật/tắt một instance...
<br>

Quay lại với Netflix thì họ đã sử dụng EC2 như thế nào? Nếu bạn vào trang www.netflix.com, bạn sẽ thấy hình ảnh tương tự như sau:

![](https://images.viblo.asia/ff45e5c6-1e49-45f2-bd4e-e0ff9764d34c.jpg)

Về bản chất thì ở đây EC2 đóng vai trò là một máy chủ hay chính xác hơn là máy chủ lưu trữ web (web hosting server). Khi ban truy cập vào địa chỉ www.netflix.com thì bản chất là bạn đang kết nối tới một instance EC2 đang hoạt động với tư cách là một máy chủ lưu trữ web. Instance EC2 này sẽ chứa tất cả các file và code của trang này:
![](https://images.viblo.asia/ff45e5c6-1e49-45f2-bd4e-e0ff9764d34c.jpg)

Đó chính là một trong những tính năng, chức năng của một instance EC2 trong Netflix nói riêng hay trong cả Internet nói chung: một máy chủ lưu trữ web. Nó chứa toàn bộ các file và code cần thiết để hiển thị một trang web tới user truy cập trang web đó.

-----

## 3. RDS
Tiếp tục dùng Netflix làm ví dụ thì chúng ta sẽ tìm hiểu xem sau khi bạn đăng nhập, đăng kí vào Netflix thì điều gì sẽ xảy ra với các thông tin bạn nhập vào form.
![](https://images.viblo.asia/66450c45-0b8c-4f5c-bcd1-d6d423867ce1.png)

Đây chính là lúc mà RDS sẽ được ứng dụng. RDS là một nền tảng database được cung cấp bởi AWS, và một trong những ứng dụng phổ biến nhất của các chương trình database chính là lưu trữ thông tin tài khoản của người dùng.
![](https://images.viblo.asia/01324e1f-51ed-48e1-9144-04b610998696.png)

Vậy là khi bạn vào trang đăng kí của Netflix được host trên EC2 và bạn nhập các thông tin của mình vào thì chúng sẽ được gửi tới lưu trong RDS hoặc nếu bạn đăng nhập thì nó sẽ được check để so sánh với các thông tin trong database rồi trả về EC2 và trả về mấy tính của bạn.
<br>

Sau khi bạn đăng nhập vào Netflix, sẽ có một danh sách các show hoặc các tập phim mà Netflix có. Đây cũng là một ứng dụng phổ biến của RDS hay các chương trình database nói chung: lưu trữ các danh sách.
![](https://images.viblo.asia/4390c7a9-3d87-4282-a762-f3654dff9406.png)

Giờ chúng ta hay xem xét một kịch bản như sau: giả sử ban ngày Netflix có vài ngàn user sử dụng, vào lúc 7h tối, mọi người trở về nhà sau khi làm việc rồi ăn tối và đến 8h khi mọi việc đã xong họ muốn xem TV một chút, vậy là lúc này sẽ có thêm nhiều người sử dụng Netflix hơn, và rồi đến 8h30 lại có thêm người sử dụng, đến 9h lại có thêm nhiều hơn nữa và đến 10h lượng user sử dụng sẽ đông gấp 5 lần so với thời điểm 7h.
<br>

Hãy nhớ lại ở phần trước thì minh có nói về sự khác nhau giữa server tại chỗ và server cloud về mặt **Scalability** và **Elasticity**, tức là nếu có thêm nhiều user sử dụng hệ thống hoặc phần mềm của bạn thì bạn sẽ cần thềm nhiều server hơn.
<br>

Quay lại ví dụ của chúng ta thì nếu server mà Netflix dùng là server tại chỗ tức là họ sẽ không có khả năng tăng thêm server ngay lập tức khi cần. Lúc này tất cả các user vào Netflix vào lúc 9h, 10h... đều sẽ truy cập vào cùng một server và mỗi server chỉ có thể xử lý một lượng truy cập nhất định, nếu có quá nhiều truy cập, server sẽ bị quá tải, khi đó thì sẽ không một ai có thể truy cập Netflix nữa.
![](https://images.viblo.asia/304cfadf-91c2-4d59-b45e-7a52459008e7.png)

Giờ thì hãy xét lại ví dụ trên với cloud. Khi có thêm user truy cập vào lúc 8h, AWS sẽ tự động tăng thêm một instance EC2 đễ handle những user này, rồi đến thời điểm 9h, 10h... lượng user truy cập tăng lên gấp hai, ba lần, AWS sẽ tiếp tục tăng thêm các instance trong VPC và tất cả cá các instance này đều có thể giao tiếp với database. Khí đó tất cả các user đều truy cập vào một instance EC2 không bị quá tải và các instance này đều giao tiếp với database nên tất cả mọi người đều có thể đăng nhập tài khoản của mình để xem phim.
![](https://images.viblo.asia/76961083-e835-4e04-9e02-e7b8ae700aee.png)

Vậy là tính **Scalability** đã được thể hiện. Còn **Elasticity** thì sao? Giả sử đến 11h, 12h, 1h sáng, lượng user truy cập giảm xuống. Lúc này không còn ai sử dụng instance #4 và #5 nữa, khí đó AWS chỉ đơn giản là loại chúng ra khỏi VPC và account của Netflix, nghĩa là Netflix sẽ không phải trả phí cho các instance này nữa.

![](https://images.viblo.asia/e838aab2-b252-4804-8d50-86fe178333a9.png)

Ngoài ra, ví dụ trên cũng thể hiện các tính chất khác của cloud như là **High availability** - khi có thêm user truy cập, lượng instance sẽ tăng lên, nghĩa là Netflix luôn available.
<br>

Giả sử instance #3 vì một lí do nào đó mà bị "sập", lúc này tất cả các user truy cập instance này sẽ được chuyển hướng sang instance #2 (thường thì mỗi instance có thể handle gấp đôi lượng user bình thường nó handle) và AWS sẽ remove instance #3 rồi ngay lập tức khởi chạy một instance khác thay thế nó. Khi instance mới đã hoàn tất khởi chạy, AWS sẽ lại chuyển hướng các user về lại instance này. Đây chính là tính **Fault tolerant**.

![](https://images.viblo.asia/c57163be-057c-4635-9dfa-546e650d226b.png)



## 4. S3
TIếp tục với Netflix, ở phần này chúng ta sẽ tìm hiểu xem Netflix lưu trữ hàng chục, hàng trăm nghìn file video như thế nào. Thứ họ sử dụng chính là S3.
<br>

S3 là viết tắt của Simple Storage Service, là một nền tảng lưu trữ của AWS. Về cơ bản, nó là môt cái "thùng" chứa vô tận. Thực ra nói vô tận thì hơi khó tin, đương nhiên là nó cũng sẽ có giới hạn, tuy nhiên giới hạn của nó là quá cao và không một cá nhân hoặc doanh nghiệp nào sử dụng được đến gần cái ngưỡng giới hạn cho phép của S3 cả.
![](https://images.viblo.asia/b5422e3f-bb3f-4690-b3b0-67bfb7727615.png)

S3 là một thứ hoàn hảo để lữu trữ bất cứ tài liệu, phim, nhạc, ảnh hay ứng dụng nào mà bạn có. Khi bạn đưa chúng vào trong S3 thì nó sẽ được lưu trữ mãi ở đó cho tới khi nào bạn muốn. Không những thế, các file bạn đưa vào đó sẽ có rất nhiều bản sao lưu tức là độ khả dụng của các file mà bạn lưu trữ trong S3 là rất cao.
<br>

Chắc hẳn các bạn đã nghe đến dịch vụ DropBox hoặc thậm chí đã từng sử dụng nó. DropBox thực ra chỉ là một giao diện thân thiện với người dùng mà ở đằng sau nó chính là S3 storage. Khi bạn upload một file lên DropBox thực ra chính là bạn đã upload file của bạn vào một S3 bucket.
<br>

Một vài ứng dụng phổ biến của S3 là lưu trữ số lượng lớn và lưu trữ dài hạn. Ở phần trước về EC2, mình có nói rằng một instance EC2 tương đương với một chiếc máy tính thông thường và nó có ổ cứng để lưu trữ cục bộ.
<br>

Trong AWS thì việc lưu trữ cục bộ này không phải là dài hạn, hay nói chính xác hơn là bạn sẽ không muốn lưu trữ dài hạn trên ổ cứng của EC2 vì như ở phần trước mình có để cấp đến việc các instance sẽ được thường xuyên thêm bớt trong VPC, do đó các thông tin mà bạn lưu trên local storage có thể bị mất đi.
<br>

Sau này tìm hiểu sâu hơn về EC2 các bạn sẽ thấy được một số cách giải quyết vấn đề này. Tuy nhiên, để chắc chắn thì S3 là sự lựa chọn hoàn hảo khi bạn muốn lưu trữ dài hạn vì nó sẽ cho bạn rất nhiều sự backup cùng với khả năng lưu trữ gần như không giới hạn.

## 5. EC2 (Part 2)
Sau khi chúng ta ấn nút play một video nào đó trên Netflix thì điều gì sẽ xảy ra? Về cơ bản thì một lần nữa, EC2 lại đảm nhiệm ở bước này.
![](https://images.viblo.asia/e5ba59b1-9a39-47e5-a5dc-dd8097b172c5.png)

Như mình đã nói thì EC2 tương đương với chiếc máy tính thông thường, do đó nó sẽ có bộ xử lý và khả năng xử lý. Và đây cũng là công việc chính của EC2, nó sẽ được dùng cho bất cứ công việc này cần đến việc xử lý máy tính.
<br>

Khi một tập phim trên Netflix được ấn play thì các dòng code của Netflix sẽ tới S3 và tìm đúng tập phim đó và kéo file video về EC2 và EC2 sẽ mã hóa hoặc chuyển mã file hoặc data đó để có thể gửi nó đi qua Internet tới thiết bị của user và user có thể xem được nó. Việc mã hóa hoặc chuyển mã video là một quá trình rất nặng về xử lí do đó cần có một thứ như EC2 để thực hiện được công việc này.

# IV. Cơ sở hạ tầng toàn cầu của AWS
Đây là sơ đồ cơ sơ hạ tầng chính thức của AWS: https://aws.amazon.com/about-aws/global-infrastructure/

![](https://images.viblo.asia/fb8315c0-a9d7-4ea8-bf94-c63b3ff3d37a.png)

Bản đồ trên thể hiện vị trí của tất cả các AWS region. Vậy AWS region là gì? Mỗi region là một khu vực địa lý tập hợp các availability zone và data center của AWS. Bạn có thắc mắc là tại sao lại có nhiều region rải rác trên khắp thế giới như vậy không?
<br>

Ví dụ thế này, một doanh nghiệp tại Tokyo đang sử dụng AWS và họ muốn chạy một instance EC2 thì instance này sẽ cần được chạy trên một server vật lý ở trong một data center ở Tokyo, bởi vì họ sẽ muốn server vậy lý ở gần nhất để giảm tối đa độ trễ khi truyền tải dữ liệu thay vì chẳng hạn chạy một instance EC2 ở data center North Virginia, mọi dữ liệu truyền đi hay nhận lại khi đó sẽ phải di chuyển nửa vòng thế giới tới EC2 rồi lại di chuyển về. Do đó để có thể hộ trợ khách hàng trên toàn thế giới với hiệu năng tốt nhất, AWS đã dựng lên hàng loạt các region trên toàn cầu.
<br>

Giở thì hãy thử zoom vào một region:
![](https://images.viblo.asia/e0d00eea-cfcc-4cc0-b9d5-16af08c3ac11.png)

Chúng ta có thể thấy một region bao gồm các availability zone. Mỗi region có thể có số lượng các availability zone khác nhau. Vậy availability zone là gì?
<br>

Availability zone là một vị trí địa lý có chứa một data center. Các Availability zone được phân tách về mặt địa lý với nhau trong một region. Vậy tại sao lại có sự phân tách như thế này? Đây lại là một sự thể hiện tính **High availability** và **Fault tolerant** của AWS.
<br>

Giả sử có một thảm họa tự nhiên như động đất, bão... hoặc sự cố mất điện hoặc một điều gì đó đánh sập một availability zone thì vì giữa các availability zone với nhau trong một region đã có sự sao lưu dữ liệu nên miễn là toàn bộ region không gặp sự cố thì bạn vẫn có thể hoàn toàn truy cập các resource AWS và các dữ liệu mà bạn upload lên AWS. Do đó khi bạn tạo một S3 bucket hay chạy một EC2 instance, bạn luôn được yêu cầu chọn region và availability zone mà bạn muốn.
<br>

Giờ thì zoom vào một availability zone chúng ta sẽ thấy được một data center vật lý với các thiết bị, phần cứng vật lý mà chứa tất cả các resource hay các thông tin, dữ liệu được người dùng đưa vào AWS
![](https://images.viblo.asia/59b7248b-f186-4199-9ceb-9a1d30b853f1.png)

-----

*Hết*