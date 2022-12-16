# Giới thiệu
Xin chào mọi người,
Trong bài viết này mình sẽ giới thiệu cách làm việc với MongoDB trong ASP.NET Core thông qua Repository Pattern. Nếu các bạn đang định làm theo những thứ bên dưới thì bài viết này dành cho bạn.

ASP.NET Core: https://docs.microsoft.com/en-us/aspnet/core/getting-started/?view=aspnetcore-2.2&tabs=windows

MongoDB: https://www.mongodb.com/

Repository Pattern: https://dev.to/kylegalbraith/getting-familiar-with-the-awesome-repository-pattern--1ao3

# Các công cụ cài đặt
## MongoDB
Để kết nối được vào MongoDB thì đương nhiên trước tiên phải cài đặt MongoDB. Chúng ta sẽ thực hiện implement trên Windows nên cũng sẽ cài đặt MongoDB trên windows, hãy follow theo những step ở đây
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
## MongoDB UI viewer
Để xem dữ liệu ở MongoDB một cách tường minh trên UI, thì bạn nên cài đặt MongoDB Compass hoặc là Robo3T, nói chung thì xài cái nào cũng được.
Cài đặt MongoDB Compass ở đây: https://www.mongodb.com/products/compass
Cài đặt Robo3T ở đây: https://robomongo.org/
# Triển khai
Ở đây mình sẽ triển khai 1 project CRUD đơn giản, với entity là Lesson. 
## Cấu trúc solution
Solution chia ra làm 4 project nhỏ tương ứng với các chức năng
- **Common**: dùng để thực hiện những task common, lưu các biến và enum common.
- **Data**: chính là tầng để thực hiện kết nối đến database, CRUD ở tầng thấp nhất. Chứa các repository tương ứng với mỗi entity
- **Service**: Sử dụng lại các Repository ở tầng Data để xử lý dữ liệu
- **Web**: chính là tầng trên cùng, gồm các controller để gọi đến tầng service.

![](https://images.viblo.asia/653a5dc2-a533-44dd-9e9b-17a9cb91833f.png)

## Tầng Repository
Đây chính là tầng để giao tiếp trực tiếp với MongoDB. Nên để có thể kết nối được với MongoDB thì chúng ta phải cài đặt package **MongoDB.Driver** Hãy tìm kiếm package này trên nuget và tiến hành install nó ở tầng Data.

![](https://images.viblo.asia/c38ad0b2-2de4-4df7-b07e-7eccf711c266.png)

### Base Entity
```CSharp
public class BaseEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
```
Base Entity là class base cho các entity được lưu ở MongoDB.
BsonId -> chỉ rõ trường Id chính là key trong table 
BsonRepresentation(BsonType.ObjectId) -> chỉ rõ Id có kiểu dữ liệu ObjectId trong MongoDB

### Entity Lesson
```CSharp
public class Lesson:BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }     
    }
```
Class này chỉ chứa một số field cần thiết của Lesson bao gồm Title, Description, Image

### Generic Repository
```CSharp
public interface IRepository<TEntity> : IDisposable where TEntity : class
    {
        Task<TEntity> Add(TEntity obj);
        Task<TEntity> GetById(string id);
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> Update(string id, TEntity obj);
        Task<bool> Remove(string id);
    }
```
Interface  này chứa các hàm cơ bản cho 1 repository

### MongoDbSetting
```CSharp
public class MongoDbSettings : IMongoDbSettings
    {
        public string CollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IMongoDbSettings
    {
        string CollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
```
Chứa các property cần thiết để kết nối đến MongoDB bao gồm collectionName, connectionString và DatabaseName. Những property này nằm trong connectionString được lưu ở appSettings.json

### MongoDB context
```CSharp
public interface IMongoContext
    {
        IMongoDatabase Database { get; }
    }

public abstract class MongoContext : IMongoContext
    {
        protected MongoContext(IMongoDbSettings connectionSetting)
        {
            var client = new MongoClient(connectionSetting.ConnectionString);
            Database = client.GetDatabase(connectionSetting.DatabaseName);
        }

        public IMongoDatabase Database { get; }
    }
```
Class MongoContext sử dụng MongoDbSetting để kết nối đến database, trả về 1 object Database để repository lấy đi thao tác với các entity.

### Base Repository
```CSharp
public abstract class MongoRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly IMongoDatabase Database;
        protected readonly IMongoCollection<TEntity> DbSet;

        protected MongoRepository(IMongoContext context)
        {
            Database = context.Database;
            DbSet = Database.GetCollection<TEntity>(typeof(TEntity).Name);
        }

        public virtual async Task<TEntity> Add(TEntity obj)
        {
            await DbSet.InsertOneAsync(obj);
            return obj;
        }

        public virtual async Task<TEntity> GetById(string id)
        {
            var data = await DbSet.Find(FilterId(id)).SingleOrDefaultAsync();
            return data;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            var all = await DbSet.FindAsync(Builders<TEntity>.Filter.Empty);
            return all.ToList();
        }

        public async virtual Task<TEntity> Update(string id, TEntity obj)
        {
            await DbSet.ReplaceOneAsync(FilterId(id), obj);
            return obj;
        }

        public async virtual Task<bool> Remove(string id)
        {
            var result = await DbSet.DeleteOneAsync(FilterId(id));
            return result.IsAcknowledged;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
        private static FilterDefinition<TEntity> FilterId(string key)
        {
            return Builders<TEntity>.Filter.Eq("Id", key);
        }
    }
```
Đây chính là class repository base để thực hiện CRUD, sử dụng MongoDbContext. Các repository cụ thể cho các entity sẽ chỉ cần kế thừa class này mà không cần phải đi viết lại các hàm cơ bản CRUD. Có vẻ là đã khá rút gọn code :D

### Lesson Repository
Đến đây thì chỉ cần tạo thêm repository cho lesson. Bạn có thể thấy code nó không có gì, vì toàn bộ các phương thức implement đã được viết ở class base rồi.
```CSharp
public interface ILessonRepository : IRepository<Lesson>
    {

    }
```
```CSharp
public class LessonRepository : MongoRepository<Lesson>, ILessonRepository
    {
        public LessonRepository(IMongoContext context) : base(context)
        {
        }
    }
```
## Tầng Service
Implement ở tầng service khá đơn giản, chỉ cần gọi code ở repository. Thực ra vì đây là 1 ứng dụng đơn giản CRUD nên tầng service khá đơn giản, chỉ bao gồm 1 repository tương ứng, với những ứng dụng lớn hơn thì 1 service có thể cần sử dụng nhiều repository để thao tác dữ liệu.
```CSharp
public interface ILessonService
    {
        Task<Lesson> AddLessonAsync(Lesson obj);
        Task<Lesson> UpdateLessonAsync(string id, Lesson obj);
        Task<bool> RemoveLessonAsync(string id);
        Task<Lesson> GetByIdAsync(string id);
        Task<IEnumerable<Lesson>> GetAll();
    }
```

```CSharp
public class LessonService : ILessonService
    {
        private ILessonRepository _lessonRepository;
        public LessonService(ILessonRepository lessonRepository)
        {
            _lessonRepository = lessonRepository;
        }

        public async Task<Lesson> AddLessonAsync(Lesson obj)
        {
            return await _lessonRepository.Add(obj);
        }

        public async Task<IEnumerable<Lesson>> GetAll()
        {
            return await _lessonRepository.GetAll();
        }

        public async Task<Lesson> GetByIdAsync(string id)
        {
            return await _lessonRepository.GetById(id);
        }

        public async Task<bool> RemoveLessonAsync(string id)
        {
            return await _lessonRepository.Remove(id);
        }

        public async Task<Lesson> UpdateLessonAsync(string id, Lesson obj)
        {
            return await _lessonRepository.Update(id, obj);
        }
    }
```

## Controller
Ở đây mình sẽ tạo LessonController và sử dụng LessonService để handle dữ liệu. Có thể thấy là follow code của chúng ta khá rõ ràng. Ở trên web không cần quan tâm đến việc xử lý bên trong (gọi đến database, thao tác các bảng), mọi thứ đã được tầng service ở dưới handle.
```CSharp
[Area("Admin")]
    public class LessonController : Controller
    {

        private readonly ILessonService _lessonService;
        public LessonController(ILessonService wordService)
        {
            _lessonService = wordService;
        }

        public async Task<IActionResult> Index()
        {
            var vm = await _lessonService.GetAll();
            return View(vm);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            await Task.CompletedTask;
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Update(string id)
        {
            var lesson = await _lessonService.GetByIdAsync(id);
            return View(lesson);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {
            var word = await _lessonService.GetByIdAsync(id);

            if (word != null)
            {
                await _lessonService.RemoveLessonAsync(id);
            }

            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm]Lesson newLesson)
        {
            await _lessonService.AddLessonAsync(newLesson);
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public async Task<IActionResult> Update([FromForm]Lesson updatedLesson)
        {
            await _lessonService.UpdateLessonAsync(updatedLesson.Id, updatedLesson);
            return RedirectToAction(nameof(Index));
        }
    }
```

## Cấu hình DI
Ở trong toàn bộ project thì các bạn thấy là các class chỉ gọi đến và làm việc với các interface chứ không gọi trực tiếp class khác. Điều này làm giảm sự phụ thuộc giữa các class với nhau. Và nó đúng với nguyên lý D trong SOLID. (các bạn có thể đọc nó ở [đây])
(https://toidicodedao.com/2016/06/14/series-solid-cho-thanh-nien-code-cung-dependency-inversion-principle/) 

Vì vậy cuối cùng chúng ta phải cấu hình DI để khi gọi interface thì nó sẽ tìm class tương ứng cho chúng ta. 

```CSharp
 services.Configure<MongoDbSettings>(
                Configuration.GetSection("WordDatabaseSetting"));

            services.AddSingleton<IMongoDbSettings>(sp =>
                sp.GetRequiredService<IOptions<MongoDbSettings>>().Value);

            services.AddScoped<IMongoContext, CardDatabaseContext>();
            services.AddScoped<IWordRepository, WordRepository>();
            services.AddScoped<IWordService, WordService>();
            services.AddScoped<ILessonRepository, LessonRepository>();
            services.AddScoped<ILessonService, LessonService>();
```

## Thêm connection string trong appSetting.json
```
 "WordDatabaseSetting": {
    "WordCollectionName": "Lesson",
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "test"
  }
```
Đây chính là đoạn cấu hình chỉ rõ connection đến database test ở localhost, với collection chỉ định là Lesson.

# Kết luận
Các bạn hãy thử áp dụng và show kết quả xem nhé.
Trên đây là hướng dẫn của mình để hướng dẫn bạn cách làm việc với MongoDB ở ASP.NET Core áp dụng Repository Pattern. Hi vọng bài viết có ích. Rất mong góp ý từ mọi người.

Một số bài viết mình đã tham khảo:
https://www.brunobrito.net.br/aspnet-core-mongodb-unit-of-work/
https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mongo-app?view=aspnetcore-2.2&tabs=visual-studio
https://deviq.com/repository-pattern/