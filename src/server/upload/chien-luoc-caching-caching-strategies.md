Ngày nay, công nghệ ngày càng phổ biến, khách hàng có quá nhiều sự lựa chọn. Nếu hệ thống của bạn chậm sẽ ảnh hưởng lớn tới độ hài lòng của khách hàng, tệ hơn là có thể mất khách hàng. Các hệ thống có tập khách hàng đủ lớn, lượng dữ liệu đủ nhiều thì việc tối ưu performance, đảm bảo hệ thống ổn định là điều mai ai cũng phải giải quyết. Vâng, bạn không cô đơn đâu. Để giải quyết vấn đề này, không thể không nhắc tới một kĩ thuật đó chính là caching.
# Dẫn nhập:
Trước khi bắt đầu tìm hiểu về caching và caching strategies, chúng ta sẽ cùng phân tích một ví dụ về nhân viên trong một quán tạp hóa siêu to khổng lồ để hiểu hơn về caching nhé.

Ở đâu đó trên trái đất này có một quán tạp hóa, trong quán thường xuyên xảy ra tình trạng khách hàng vào xem hàng rồi lấy trộm đồ bỏ vào túi, vậy nên chủ quán quyết định bày trí lại quán. Ngay trước quán sẽ là tủ kính thấp để bày trí các mặt hàng bắt mắt trong tủ, cũng như chắn lối ra vào, không cho khách hàng vào trong quán. Khi khách hàng muốn mua thứ gì đó, họ sẽ nói với nhân viên, nhân viên sẽ vào kho tìm kiếm món hàng và mang ra. Có những món hàng nằm ở chỗ dễ lấy nên nhân viên sẽ xử lí khá nhanh, nhưng có những món hàng đặt trên cao, trong ngóc ngách của kho nên sẽ hơi mất thời gian để nhân viên mang ra cho khách. Vào giờ cao điểm, có rất nhiều khách tới mua hàng. Với mỗi khách hàng, nhân viên sẽ phải chạy vào kho kiếm món hàng mang ra một lần, trong lúc đó những người khách khác phải đứng đợi(đây chính là **response chậm**). Để tối ưu việc này, nhân viên có thể hỏi 2,3 khách một lúc xem họ mua món gì rồi vào kho lấy ra 2, 3 món hàng cùng 1 lúc(đây là  **batch process**). Có những người khách thấy lâu quá, không đủ kiên nhẫn nên họ bỏ đi quán khác(a.k.a **connection time out**). Thấy vậy, nhân viên quán quyết định sẽ mang các mặt hàng phổ biến, thường được mua nhất để để sẵn trên bàn, hoặc gần chỗ ngồi. Khi khách hàng tới hỏi mua là mình có thể bán ngay, vừa đỡ tốn sức lại vừa nhanh, không cần phải chạy vào kho tìm kiếm. Trong ví dụ này, chúng ta có thể hình dung các món hàng chính là các data, nhà kho chính là database, việc nhân viên đi lấy hàng trong kho chính là backend gửi request tới database để lấy dữ liệu đưa cho khách hàng. Còn việc nhân viên chuẩn bị sẵn các món hàng để trên bàn, gần chỗ ngồi, đợi khách tới mua là đưa cho khách ngay chính làaaaaa: **Caching**. Vâng, chính là caching.

*Mình nghĩ, các bạn hầu như đã biết, hiểu về caching và caching strategies. Tuy nhiên mình thấy mọi người đôi lúc chưa gọi đúng tên, hoặc không biết caching strategy mà mình đang sử dụng là gì. Vậy nên hôm nay mình sẽ giúp mọi người nhìn lại, hiểu và gọi đúng tên nó nhé.*

# 1. Caching là gì?
Nói theo một cách văn vở: Cache là kĩ thuật dùng để lưu trữ dữ liệu thường xuyên được truy xuất vào bộ nhớ cache, giúp tăng tốc độ truy xuất xử liệu và giảm tải cho hệ thống. Bộ nhớ cache thông thường là memory của server hoặc redis. Với trường hợp sử dụng các bộ nhớ cache này, thông thường độ phức tạp chỉ khoảng O(1), dữ liệu được tổ chức theo dạng key-value.

Có một số chiến lượt caching(Caching strategies), việc chọn đúng chiến lược sẽ mang lại sự khác biệt lớn. Việc lựa chọn chiến lượt phụ thuộc vào mô hình của bạn: ví dụ như write-heavy workloads, read-heavy workloads... Ở phần dưới, mình sẽ mô tả và nêu hoàn cảnh khi nào nên dùng chiến lược nào nhé.

**Important**: Để chúng ta có thể đi tới phần 2. caching strategies dễ dàng hơn, mình muốn giới thiệu hai thuật ngữ sau:
- Cache miss: khi truy vấn và không tìm thấy dữ liệu nằm trong cache
- Cache hit: truy vấn và tìm thấy dữ liệu trong cache
# 2. Caching Strategies
## 2.1 Cache aside:
Hầu hết, mọi người thường hay sử dụng cache aside a.k.a `lazy loading`. Vùng nhớ cache thường đặt một bên, application sẽ giao tiếp trực tiếp với cache và database. 

![image.png](https://images.viblo.asia/80c2d26f-a71b-4d20-849d-3399ab6da420.png)

Cách hoạt động:
- 1. Application sẽ kiểm tra trong cache có dữ liệu mình cần hay không, nếu trong cache có dữ liệu application cần, quá trình sẽ kết thúc. Nếu cache không có dữ liệu, chúng ta sẽ tới bước 2
- 2. Khi cache không chứa dữ liệu mà application cần, application sẽ xuống database để lấy dữ liệu
- 3. Application sẽ lưu dữ liệu lấy được từ database để lưu vào cache, sau đó nó làm tiếp công việc của mình.  

**Lợi ích**
- Với cache aside, khi cache server bị chết, bị lỗi connection, hoặc cache miss(dữ liệu mà application cần không nằm trong cache) thì application vẫn có thể lấy dữ liệu từ database để sử dụng
- Dữ liệu lưu trữ trong cache là dữ liệu thật sự cần dùng. Chúng ta không cần load toàn bộ dữ liệu vào trong cache. Tiết kiệm chi phí, resource của cache server.
- Có thể kết hợp nhiều loại dữ liệu từ nhiều nguồn vào trong cache. Ví dụ như thông tin profile của người cần được lấy từ nhiều service, nhiều câu query khác nhau vào database, điều này sẽ tốn nhiều time và tạo áp lực lên database vì có nhiều câu query, và áp lực lên server vì phải xử lí quá nhiều. Chúng ta có thể tính toán một lần rồi đưa thông tin đó vào cache. Lúc đó, khi cần lấy profile, hệ thống chỉ tốn chi phí truy vấn cache.

**Bất lợi**
- Hay xảy ra trường hợp cache miss khi truy vấn dữ liệu lần đầu tiên hoặc khi dữ liệu trong cache bị hết hạn. Để giảm thiểu vấn đề này, chúng ta có thể load dữ liệu thủ công vào cache.
- Với trường hợp cache miss thì thời gian xử lí sẽ bị lâu, ảnh hưởng tới trải nghiệm người dùng cho tới khi hết cache miss. Từ đây, sẽ phát sinh thêm vấn đề **Cache stampede**, mình sẽ mô tả về cache stampede và cách giải quyết trong bài sau
- Khó quản lí, hoặc có độ trễ khi dữ liệu invalid. Dữ liệu invalid là dữ liệu không còn đúng ở thời điểm hiện tại. Ví dụ như: lúc 4h chiều, mình update profile với tên là `Cao`, sau đó mình refresh app, lúc đó application sẽ vào database lấy profile của mình có tên là `Cao` để lưu vào cache vào show lên app. Sau đó, 4h5p mình update profile lại với tên là `Ryan`, khi mình refresh lại app thì app vẫn lấy dữ liệu trong cache là `Cao` => dữ liệu hiển thị không đúng với cái mình update, lúc đó mình phải chờ tới khi nào dữ liệu trong cache bị hết hạn thì lúc đó mới có dữ liệu đúng. Nếu ban đầu chúng ta lưu dữ liệu vào cache với ttl là vô hạn thì "đi bụi" luôn. Để giải quyết vấn đề này, thông thường khi chúng ta nhận biết được dữ liệu trong cache cần thay đổi, không đồng nhất với database nữa thì chúng ta phải update hoặc clear cache.

**Khi nào dùng cache aside?**

Cache aside thường được dùng trong trường hợp read-heavy workloads. Khi chúng ta thấy dữ liệu sử dụng nhiều, dữ liệu lặp lại... thì nên dùng cache aside.
Lưu ý: Với cache aside, chúng ta thường chỉ lưu trữ dữ liệu nào tốn thời gian/resource để tính toán, xử lí, và dữ liệu đó dùng lại nhiều.
## 2.2 Read through cache
Chiến lược này khá giống với cache-aside. Nhưng thay vì application phải kết nối với cache và database, giờ đây application chỉ cần giao tiếp với cache. Còn cache sẽ tự lấy dữ liệu ở chính nó hoặc xuống database lấy dữ liệu. Với trường hợp này, cache chính là database chính của ứng dụng, nó đóng vai trò rất rất quan trọng. Với cache-aside, việc cache bị chết thì ứng dụng vẫn chạy được, nhưng với read through cache, nếu cache chết thì ứng dụng chết.

![image.png](https://images.viblo.asia/dcbaf140-6443-464c-b15c-b75bb4a2055e.png)

Cách hoạt động:
- 1. Application sẽ gửi request tới cache để lấy dữ liệu.
- 2. Nếu cache có dữ liệu, nó sẽ trả dữ liệu ngay cho application. Nếu cache không có dữ liệu, nó sẽ xuống bước 3
- 3. Khi cache không chứa dữ liệu mà application cần, cache server sẽ tự động lấy dữ liệu từ database để update cho chính bản thân mình và trả về cho application.
- 4. Trả dữ liệu về application.

**Lợi ích**
- Application không cần quan tâm tới trường hợp cache miss. Mọi thứ cứ để cache server lo hết.

**Bất lợi**
- Phải tìm được ứng dụng, platform... đóng vai trò cache phù hợp. Bởi vì một vài trường hợp, dữ liệu mà chúng ta muốn lấy trong database từ một/nhiều câu query phức tạp, lúc đó chúng ta phải tìm được platform thích hợp đóng vai trò cache.
- Khó control thời gian hết hạn của cache. Khi dùng ứng dụng, có những trường hợp dữ liệu chỉ dùng 1 lần duy nhất(không nên/cần cache), nhưng có những dữ liệu được dùng rất thường xuyên. Có những dữ liệu chúng ta chỉ muốn cache 1 ngày, nhưng có những dữ liệu chúng ta muốn cache 1 tiếng. Với mô hình này, chúng ta không có quyền lựa chọn không cache dữ liệu. Mà bắt buộc phải cache hết tùy thuộc vào platform sử dụng.
- Có nhiều dữ liệu cũ, dữ liệu không đồng nhất với database trong cache.

**Khi nào dùng Read through cache?**

Read through cache thường được hay dùng trong trường hợp read-heavy workloads. Mặc dù trong cache chứa nhiều dữ liệu cũ, dữ liệu không dùng tới nữa, nhưng nhìn chung, nó đáp ứng khá tốt cho các trường hợp đọc dữ liệu nhiều.

## 2.3 Write through cache:
Với chiến lược này, data sẽ được lưu xuống cache, cache sẽ lưu dữ liệu vào database.

![image.png](https://images.viblo.asia/00c13587-bfb3-45de-86f5-a037e0da1cc7.png)


Khi một request write tới:
- 1. Dữ liệu sẽ được lưu vào cache
- 2. Cache sẽ gửi yêu cầu lưu dữ liệu vào database ngay lập tức.

**Lợi ích**
- Không bao giờ xảy ra trường hợp cache miss, bởi vì dữ liệu luôn được lưu vào cache trước khi lưu vào database.
- Không xảy ra trường hợp dữ liệu không khớp với database
- Dữ liệu luôn đồng nhất nếu chúng ta kết hợp `Write through cache` và `Read through cache`. Đây sẽ là một đôi song kiếm hợp bích

**Bất lợi**
- Hầu hết các dữ liệu trên cache đều là dữ liệu đọc một lần, vậy nên việc ghi qua cache sẽ dẫn tới rất nhiều dữ liệu tồn tại trên cache không cần thiết.
- Dữ liệu lưu trên cache nhiều ngang ngữa database, dẫn tới tốn nhiều resource không cần thiết
- Quá trình lưu dữ liệu thường sẽ lâu vì phải chờ lưu xuống cache và database.
**Khi nào dùng Write through cache?**
Với cái tên write through cache thì chúng ta cũng có thể đoán được rằng chiến lược này dùng cho trường hợp write-heavy workloads

*DynamoDB* đang áp dụng chiến lược write through + read through. DynamoDB Accelerator (DAX) nằm trong DynamoDB đóng vai trò như cache, khi dữ liệu được gửi tới DynamoDB, nó sẽ được lưu vào DAX-cache. Tương tự với read
## 2.4 Write back a.k.a Write behind
Write back nhìn sơ khá giống với write through cache. Tuy nhiên, ở write back, cache không lưu dữ liệu xuống database ngay khi nhận request từ application. Cache sẽ đồng bộ dữ liệu xuống database định kì theo thời gian, hoặc theo số lượng dữ liệu được insert/update. 
Chúng ta có thể hiểu đơn giản write back việc write batch process
Để hiểu đơn giản hơn, chúng ta có thể đơn giản hóa sự khác biệt của write through cache và write back đó là:
- Write through cache: lưu dữ liệu từ cache xuống database một cách **đồng bộ**
- Write back: lưu dữ liệu từ cache xuống database **bất đồng bộ**


![image.png](https://images.viblo.asia/e438b544-f7c2-4d84-bcf7-03cb193a5694.png)

Khi một request write tới:
- 1. Dữ liệu sẽ được lưu vào cache
- 2. *Sau một khoảng thời gian*, cache sẽ gửi yêu cầu lưu dữ liệu vào database.

**Lợi ích**
- Giảm tải áp lực write xuống database, từ đó sẽ giảm được chi phí và các vấn đề liên quan tới database
- Nếu kết hợp giữa `Write back` và `Read through cache`, chúng ta có một hệ thống tốt cho cả read heavy workloads và write heavy workloads.
**Bất lợi**
- Dữ liệu có thể không đồng nhất giữa cache và database nếu như cache chưa kịp đồng bộ dữ liệu về database.
- Nếu cache server bị chết, hệ thống sẽ bị chết, chúng ta có thể bị mất vĩnh viễn dữ liệu mà cache chưa kịp đồng bộ vào database.

**Khi nào dùng Write back?**
Chiến lược này phù hợp cho hệ thống write-heavy workloads.
## 2.5 Write around:
Write around là quá trình lưu trực tiếp dữ liệu từ application vào database và đọc dữ liệu theo một trong hai chiến lược: cache aside hoặc read through cache.

![image.png](https://images.viblo.asia/c2aaf1d5-48d9-4608-8df1-fa3c5c01abb8.png)

# 3. Tổng kết:
Tùy thuộc vào ngữ cảnh, mức độ read/write dữ liệu vào hệ thống, dữ liệu có được dùng lại nhiều hay không? Ứng dụng có chấp nhận cho dữ liệu có độ trễ hay không mà chọn cache strategies phù hợp. 
# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé