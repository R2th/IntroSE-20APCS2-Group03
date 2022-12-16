## **Sử dụng bộ nhớ cache để lưu dữ liệu tạm thời**
Cache thường có 2 loại, In-Memory Cache và Distributed Cache
In-Memory Cache là cache sẽ được lưu trực tiếp trên máy mình, còn DistributedCache là cache đc lưu ở bên máy chủ thứ 3 như Redis,...
Trong phạm vi bài viết này ta sẽ cùng tìm hiểu về **In-MemoryCache**, mình sẽ lấy ví dụ bằng **.NET Core WebAPI**

Bộ nhớ cache được dùng để lưu dữ liệu được sử dụng nhiều lần

Trong lập trình, chúng ta thường xuyên phải thao tác với dữ liệu, việc đọc dữ liệu từ cơ sở dữ liệu sau đó hiển thị lên web là thường xuyên như cơm bữa, Giả sử bạn đọc dữ liệu trực tiếp từ **database lên web**, mất **100s**
Khi sử dụng bộ nhớ cache, bạn sẽ ko đọc thẳng như thế, mà sẽ lấy bộ nhớ cache làm trung gian, nghĩa là bạn sẽ đọc từ **database vào cache** và đọc từ **cache lên web**, giả sử quá trình đọc từ database vào cache là **100s**, và từ cache lên web là **5s**, vậy bạn sẽ tốn **105s** để đọc. Nhiều người sẽ tự hỏi sao phải thông qua trung gian cho tốn thời gian như thế?

Đấy là khi bạn chỉ đọc 1 lần thôi, nếu bạn đọc 10 lần thì sao, đọc theo cách thông thường thì mất **10x100s=1000s**. Nếu sử dụng cache, dữ liệu sẽ đc lưu ở cache rồi, lần sau bạn sẽ không phải đọc từ database ra cache nữa, chỉ phải đọc từ cache ra web thôi, như vậy thời gian sẽ là **10x5s=50s** nhanh gấp **20** lần như cách trên.

Vậy thì có trường hợp là lỡ **dữ liệu trong database thay đổi** thì sao? lúc đó dữ liệu trong database và cache sẽ khác nhau, có nhiều cách khác nhau để làm mới bộ nhớ cache và cũng có thể đặt thời gian hết hạn của bộ nhớ cache. Ví dụ 1 cách như là là khi bạn sửa đổi dữ liệu thì bộ nhớ cache sẽ được làm mới hoặc sau 1 khoảng thời gian nhất định thì bộ nhớ cache sẽ tự động được làm mới
## **Ưu và nhược điểm của caching**
### **Ưu điểm:**
Nhanh hơn nhiều so với các hình thức lưu vào bộ nhớ đệm phân tán khác vì nó tránh giao tiếp qua mạng.

Rất đáng tin cậy.

Phù hợp nhất cho các ứng dụng quy mô nhỏ đến trung bình.

### **Nhược điểm**
Nếu  cấu hình không chính xác, nó có thể tiêu tốn tài nguyên của máy chủ của bạn.

Với việc mở rộng ứng dụng và thời gian lưu vào bộ nhớ đệm lâu hơn, việc duy trì máy chủ có thể tốn kém.

Nếu được triển khai trên đám mây, việc duy trì bộ nhớ đệm nhất quán có thể khó
## **Triển khai**
Tạo dự án ASP.NET Core Web API, thêm dòng này vào ConfigureService trong file Startup.cs

```
services.AddMemoryCache();
```

Tiếp theo ta sẽ triển khai 1 End-point API để test
## **Endpoint To Get / Set Cache In Memory**
Trong thư mục Controller, thêm Empty API Controller mới và đặt tên là CacheController. Ở đây ta sẽ chỉ định nghĩa 2 endpoint bằng cách sử dụng các phương thức GET và POST.

Phương thức POST sẽ chịu trách nhiệm thiết lập bộ nhớ cache. Bây giờ cách thức hoạt động của bộ nhớ cache khá giống với **Dictionary** trong C#. Điều đó có nghĩa là bạn sẽ cần 2 tham số, một **key** và một **value**. Ta sẽ sử dụng **key** để xác định **value** (dữ liệu).

Bộ nhớ cache mà chúng tôi đã đặt trước đó có thể được xem bằng GET Endpoint. Nhưng điều này phụ thuộc vào việc Cache có sẵn / hết hạn / tồn tại hay không.

CacheController
```
[Route("api/[controller]")]
[ApiController]
public class CacheController : ControllerBase
{
    private readonly IMemoryCache memoryCache;
    public CacheController(IMemoryCache memoryCache)
    {
        this.memoryCache = memoryCache;
    }
    [HttpGet("{key}")]
    public IActionResult GetCache(string key)
    {
        string value = string.Empty;
        memoryCache.TryGetValue(key, out value);
        return Ok(value);
    }
    [HttpPost]
    public IActionResult SetCache(CacheRequest data)
    {
        var cacheExpiryOptions = new MemoryCacheEntryOptions
        {
            AbsoluteExpiration = DateTime.Now.AddMinutes(5),
            Priority = CacheItemPriority.High,
            SlidingExpiration = TimeSpan.FromMinutes(2),
            Size = 1024,
        };
        memoryCache.Set(data.key, data.value, cacheExpiryOptions);
        return Ok();
    }
    public class CacheRequest
    {
        public string key { get; set; }
        public string value { get; set; }
    }
}
```
Dòng 5 - Định nghĩa IMemoryCache để truy cập triển khai bộ nhớ đệm trong bộ nhớ.
Dòng 6 - Đưa IMemoryCache vào hàm tạo.

## **Setting the Cache.**
**MemoryCacheEntryOptions** - Lớp này được sử dụng để xác định các thuộc tính quan trọng của kỹ thuật bộ nhớ đệm có liên quan. Chúng ta sẽ tạo một thể hiện của lớp này và chuyển nó đến đối tượng memoryCache sau này. Nhưng trước đó, chúng ta hãy hiểu các thuộc tính của **MemoryCacheEntryOptions**

**Priority**: Thể hiện mức độ ưu tiên của Cache, mặc định là Normal.

**Size**: Cho phép set kích thước tối đa của cache để nó không chiếm dụng quá nhiều tài nguyên của máy tính

**SlidingExpiration**: Định nghĩa thời gian bộ nhớ cache sẽ hết hiệu lực, như bài viết, mình set nó là 2 phút. Nếu trong 2 phút, người dùng ko tương tác thì cache sẽ hết hiệu lực

**AbsoluteExpiration**: Thời gian cache hết hiệu lực bất kể người dùng có tương tác thường xuyên. Lưu ý rằng **thời gian của AbsoluteExpiration không được nhỏ hơn thời gian SlidingExpiration**

## **Retrieving the Cached Entry.**
Hãy tưởng tượng rằng chúng ta đã sử dụng Phương thức POST để set giá trị cho Cache. Giả sử các giá trị là, Key = “Name”, Value = “Mukesh”. Sau đó,cũng sẽ cần một phương thức để truy xuất nó.
GetCache sẽ là phương thức để lấy giá trị của cache, nó sẽ có parameter là {key}

## **THỬ NGHIỆM**
Đầu tiền hãy set cho cache giá trị bằng phương thức POST

![](https://images.viblo.asia/bbf2040d-e454-413f-b0d2-35a908cef230.png)

Khi Cache được set giá trị, hãy sử dụng phương thức Get để lấy ra. Các bạn hãy chú kỹ kỹ phần thời gian nhé
![](https://images.viblo.asia/a9d3f8b9-ddb7-45c0-bbcf-ebed0ceb5429.png)

## **Practical Cache Implementation**
Cùng thử nghiệm với 1 chức năng nhỏ giống với thực tế: là quản lý Khách hàng

Tất nhiên mình cũng sẽ add vài nghìn bản ghi để theo dõi tốc độ chạy của cache

Mình sẽ gợi ý các bạn đọc bài này trước để biết cách CRUD với ASP.NET Core sử dụng Entity Framework Core để viết API

Link bài viết: [Entity Framework Core in ASP.NET Core 3.1 – Getting Started](https://codewithmukesh.com/blog/entity-framework-core-in-aspnet-core/)

Đầu tiên, hãy xem CustomerController
```
[Route("api/[controller]")]
[ApiController]
public class CustomerController : ControllerBase
{
	private readonly IMemoryCache memoryCache;
	private readonly ApplicationDbContext context;
	public CustomerController(IMemoryCache memoryCache, ApplicationDbContext context)
	{
		this.memoryCache = memoryCache;
		this.context = context;
	}
	[HttpGet]
	public async Task GetAll()
	{
		var cacheKey = "customerList";
		if(!memoryCache.TryGetValue(cacheKey, out List customerList))
		{
			customerList = await context.Customers.ToListAsync();
			var cacheExpiryOptions = new MemoryCacheEntryOptions
			{
				AbsoluteExpiration = DateTime.Now.AddMinutes(5),
				Priority = CacheItemPriority.High,
				SlidingExpiration = TimeSpan.FromMinutes(2)
			};
			memoryCache.Set(cacheKey, customerList, cacheExpiryOptions);
		}
		return Ok(customerList);
	}
}
```
Hãy thử lấy tất cả Customer xem hết bao nhiêu lâu nhé:
![](https://images.viblo.asia/12c037aa-138b-46de-93ed-0a529d2a150b.png)

8.85 giây, rất lâu đúng không :> Về mặt lý thuyết nó sẽ phải truy vẫn từ Database ra, nên thời gian sẽ mất rất nhiều

Nếu mà không dùng Cache thì lần thứ 2 thời gian cũng sẽ xấp xỉ lần đầu, và các lần sau cũng vậy. Vậy hãy cùng thử xem sau khi dùng cache sẽ mất bao lâu nhé

Rồi giờ thử lấy lần nữa xem
![](https://images.viblo.asia/cdd6c64b-5d77-4491-8367-191e00a1c622.png)

55ms, rất nhanh so với lần đầu phải không. Đó là do ta đã không cần phải truy cập vào database để lấy dữ liệu, vì dữ liệu đã được lưu vào bộ nhớ Cache, ta chỉ cần lấy ra từ Cache là đc

Trong bài viết tiếp theo, ta sẽ tim hiểu về Distributed Cache, cụ thể là Redis

Bài viết được dịch từ: [In-Memory Caching in ASP.NET Core – Detailed Guide](https://codewithmukesh.com/blog/in-memory-caching-in-aspnet-core/)