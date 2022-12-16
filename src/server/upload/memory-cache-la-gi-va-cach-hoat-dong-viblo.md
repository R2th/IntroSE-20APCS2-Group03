Xin chào mọi người!

Hôm nay mình sẽ giới thiệu cơ bản về memory cache trong lập trình nói chung và C#(.net) nói riêng. Bài viết chỉ mang tính chất giới thiệu các khái niệm căn bản.

Hy vọng sẽ được thảo luận cùng anh em. Không để chờ lâu bắt đầu luôn nào.

### 1. Memory cache là gì: 
In-memory cache sử dụng bộ nhớ của máy server để lưu trữ data. Những data nào thường được lưu cache thỏa mãn 2 yếu tố: data được truy cập thường xuyên và ít thay đổi.
Mục đích của sử dụng memory cache hay bất kỳ loại cache nào là đều muốn cải thiện hiệu suất chương trình.

**Ví dụ:** lấy ra danh sách 100 sản phẩm bán chạy mỗi tháng. (dữ liệu này thỏa mãn tiêu chí ít thay đổi (1 tháng thay đổi 1 lần) + truy cập thường xuyên khi người dùng filter danh sách sản phẩm bán chạy). Ta có thể lưu cache cho data này để giảm thời gian truy cập xuống database để lấy dữ liệu.

![image.png](https://images.viblo.asia/b18d906b-a1d5-4f93-ac48-fe3e210a6199.png)

**Lưu ý:** In-memory cache phù hợp cho 1 server duy nhất hoặc nhiều server có sử dụng sticky sessions.

### 2. Sticky sessions

![image.png](https://images.viblo.asia/62a11612-bc29-4824-a7ec-c67276d00ca6.png)

Chỗ này mình sẽ giải thích sơ qua sticky session là gì?
(Phần này liên quan đến kiến thức về load balancing) 

**Sticky session** là một trong những tính năng cơ bản của load balancing cho phép định tuyến một máy chủ đơn lẻ cho một người dùng cụ thể, dựa trên HTTP session hoặc IP của họ.

Tại sao mình phải lưu ý vấn đề ở trên:
- Nếu chỉ có 1 máy server thì khi ta lưu cache chỉ lưu trên bộ nhớ của máy server duy nhất đó => không xảy ra vấn đề gì.
- Trong trường hợp có nhiều máy server (thông thường các hệ thống lớn đều xài multiple servers). Server A, B, C, D… Khi ta lưu cache thì ta sẽ chỉ lưu ở một máy server A. Vậy khi lấy cache ra làm sao biết được ta sẽ lấy ở máy server nào trong nhiều servers. Sticky session sẽ giúp ta làm việc đó.


Thêm 1 lưu ý khi sử dụng nếu ta lưu quá nhiều memory cache thì sẽ tốn dung lượng lưu trữ dẫn đến server bị chậm.

### 3. Types of cache memory
![image.png](https://images.viblo.asia/90b5171a-75d5-4bf4-b724-8f60c0bfdba1.png)

- **Level 1:** Mức đầu tiền hay còn gọi là primary cache. Với loại cache này sẽ được lưu vào chính bản thân cpu nên có tốc độ tưởng đương tốc độ cpu. Ví dụ như cpu có 4 core thì mỗi core sẽ có 1 bộ đệm riêng. Kích thước bộ nhớ nằm khoảng 2KB đến 64KB

- **Level 2:** mức thứ hai hay còn gọi là Secondary Cache. Bộ nhớ cấp 2 này có thể nằm bên trong cpu hoặc ngoài cpu. Tất cả các core của cpu có thể có bộ nhớ đệm cấp 2 riêng biệt hoặc chia sẻ bộ nhớ đệm cấp 2 với nhau. Trong trường hợp nằm ngoài cpu thì nó được kết nối với cpu qua 1 bus có tốc độ rất cao.
Kích thước bộ nhớ đệm này khoảng 256KB đến 512KB. Về tốc độ chúng chậm hơn bộ nhớ đệm L1

- **Level 3:** main cache. Không phải tất cả bộ xử lý đều có bộ nhớ đệm này. Một số high processor có thể có loại này để năng cao hiệu suất bộ nhớ đệm cấp 1 và cấp 2. Nằm ngoài cpu và chia sẻ giữa các core của cpu. Dung lượng từ 1MB tới 8MB. Mặc dù chậm hơn L1 và L2 nhưng nó nhanh hơn bộ nhớ RAM

### 4. Cách CPU tìm dữ liệu trong cache
![image.png](https://images.viblo.asia/39e01ad6-af53-4310-9215-68b18f79a59e.png)

Khi CPU cần dữ liệu, trước hết, nó tìm bên trong bộ đệm L1. Nếu nó không tìm thấy gì trong L1, nó sẽ tìm bên trong bộ đệm L2. 

Nếu một lần nữa, nó không tìm thấy dữ liệu trong bộ đệm L2, nó sẽ tìm trong bộ đệm L3. 

Nếu dữ liệu được tìm thấy trong bộ nhớ đệm, thì nó được gọi là lần truy cập bộ nhớ cache. 

Ngược lại, nếu dữ liệu không được tìm thấy bên trong bộ nhớ cache, nó được gọi là lỗi bộ nhớ cache.
Nếu dữ liệu không có sẵn trong bất kỳ bộ nhớ đệm nào, nó sẽ nằm trong Bộ nhớ truy cập ngẫu nhiên (RAM). 

Nếu RAM cũng không có dữ liệu, thì nó sẽ lấy dữ liệu đó từ Ổ đĩa cứng.

### 5. Sử dụng memory cache trong .net core
Trong .net core có hỗ trợ sẵn memory cache(IMemoryCache) vậy nên ta không cần phải xài third party.

•	Cấu hình service memory cache để sử dụng:
![image.png](https://images.viblo.asia/9ea399e8-324c-4708-a468-ca73aa1bb9ff.png)

•	Sử dụng dependence injection để inject IMemoryCache
![image.png](https://images.viblo.asia/a721001b-bae3-46ce-9d9f-150501ba36bc.png)

•	Set data cho cache bao gồm key và value(value có thể là kiểu int, string, double, object…)

Tham số đầu tiền là key, tham số thứ 2 là value.

![image.png](https://images.viblo.asia/1d70b722-6748-46ec-a517-10610e8280f8.png)

![image.png](https://images.viblo.asia/8aa7a778-fe4a-4fd6-8711-965953c9f4bb.png)

•	Lấy dữ liệu từ cache ta dùng phương thức get

![image.png](https://images.viblo.asia/7f8d88aa-e829-4455-a945-d5aac3bf6c7a.png)

•	Sử dụng GetOrCreate để tạo 1 cache mới nếu chưa tồn tại

GetOrCreate giúp lấy ra dữ liệu của cache, nếu cache đó Không tồn tại thì thêm mới vào. Code rất ngắn gọn và tiện lợi.

![image.png](https://images.viblo.asia/ee6e4104-4db3-47f6-9555-ea68f14f33b5.png)

•	Sử dụng tryGet để kiểm tra sự tồn tại của key

Sử dụng hàm tryGet để lấy ra giá trị của cache item sẽ trả về Boolean. True nghĩa là key đã tồn tại, ngược lại trả về failse. Đồng thời nếu trả về true thì sẽ có một tham số out để lấy value ra sử dụng.
![image.png](https://images.viblo.asia/9093d619-5477-4d63-b127-487c70300e12.png)

•	Xóa cache

![image.png](https://images.viblo.asia/9631b833-bac7-4540-a075-593dc2c83dfd.png)

•	AbsoluteExpiration và SlidingExpiration

Ngoài cách dùng phương thức Remove để xóa cache ta có thể thiết lập thời gian hết hạn của cache.

**MemoryCacheEntryOptions** cho phép thiết lập các lựa chọn của cache.

**AbsoluteExpiration**: Cache sẽ được gỡ bỏ tại một thời điểm xác định.

![image.png](https://images.viblo.asia/3e6dce72-15ac-4935-b042-6ec8817b37be.png)

**SlidingExpiration**: cache sẽ hết hạn sau 1 khoảng thời gian không truy cập, kể cả nó còn thời hạn AbsoluteExpiration

![image.png](https://images.viblo.asia/fd37184d-3170-4348-b51c-8bc514cf2d7f.png)

•	Độ ưu tiên của các item trong cache
MemoryCacheEntryOptions cho phép thiết lập độ ưu tiền của các item trong cache: có 4 độ ưu tiên: 

![image.png](https://images.viblo.asia/901f28e5-fb20-474d-84ed-bf88332247b9.png)

Đối với trường hợp bộ nhớ lưu trữ bị đầy thì sẽ ưu tiền xóa cache có độ ưu tiền từ thấp đến cao. Riêng NeverRemove sẽ không bao giờ bị xóa.

![image.png](https://images.viblo.asia/5a479478-705b-4e70-a9c5-f9d21a5a6dc0.png)

•	Calback khi item trong cache bị gỡ bỏ

Ta có thể gỡ bỏ cache bằng phương thức remove,  thiết lập option SlidingExpiration hoặc AbsoluteExpiration. 
Trong trường hợp item bị gỡ bỏ và bạn muốn thông báo thông tin về item trong cache bị gỡ bỏ ta dùng **RegisterPostEvictionCallback** để đăng ký callback function

![image.png](https://images.viblo.asia/d1de9d4f-4c32-4439-9bfa-9c880203cdd1.png)

2 tham số đầu tiền là key và value, thêm số thứ 2 là lý do bị gỡ bỏ.

EvictionReason là 1 enum bao gồm các lý do:

![image.png](https://images.viblo.asia/9e5b0bbd-b5b9-469d-937a-26e0f07d6ebf.png)

**Demo:**
![image.png](https://images.viblo.asia/0a17d159-3bea-43c8-867b-b356b250d07b.png)

Source demo: https://github.com/TechMarDay/Cache

Tham khảo: 
https://docs.microsoft.com/en-us/aspnet/core/performance/caching/memory?view=aspnetcore-5.0
https://fullstack.edu.vn/blog/co-ban-memory-cache-la-gi.html