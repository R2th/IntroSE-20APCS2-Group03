Hi All.

Ở bài trước mình đã có hướng dẫn các bạn tạo Project và config DBContext rồi, coi như phần connect với DB đã hoàn thành, bây giờ chúng ta sẽ tiếp tục với việc tạo ra Repository nhé,

Phần 1: [.Net Core API Project With EF6 code first, Responsitory Design Partern](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-GrLZDw0BKk0)

# Repository Pattern là gì?
Mình xin trích dẫn 1 đoạn trong 1 bài viblo khác.
- Repository Pattern là lớp trung gian giữa tầng Business Logic và Data Access, giúp cho việc truy cập dữ liệu chặt chẽ và bảo mật hơn.
- Repository đóng vai trò là một lớp kết nối giữa tầng Business và Model của ứng dụng.
- Thông thường thì các phần truy xuất, giao tiếp với database năm rải rác ở trong code, khi bạn muốn thực hiện một thao tác lên database thì phải tìm trong code cũng như tìm các thuộc tính trong bảng để xử lý. Điều này gây lãng phí thời gian và công sức rất nhiều.
- Với Repository design pattern, thì việc thay đổi ở code sẽ không ảnh hưởng quá nhiều công sức chúng ra chỉnh sửa.
- Một số lý do chung ta nên sử dụng Repository Pattern:
    - Một nơi duy nhất để thay đổi quyền truy cập dữ liệu cũng như xử lý dữ liệu.
    - Một nơi duy nhất chịu trách nhiệm cho việc mapping các bảng vào object.
    - Tăng tính bảo mật và rõ ràng cho code.
    - Rất dễ dàng để thay thế một Repository với một implementation giả cho việc testing, vì vậy bạn không cần chuẩn bị một cơ sở dữ liệu có sẵn.

[Link tham khảo về Repository Design Parten](https://viblo.asia/p/the-repository-design-pattern-AeJ1vONQGkby)

# Design Repository 
Đầu tiên chúng ta cần 1 BaseEntity, nó sẽ là class đại diện cho Model, giúp Repository nhận ra và chấp nhận các Model

```
   public class BaseEntity
    {
        public int Id { get; set; }
        public bool Active { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public DateTime? CreatedTime { get; set; }
    }
}
```

Base Entity là Class chứa các thông tin cơ bản mà hầu như table nào cũng sẽ có và ở đây mình define 4 property đại diện cho 4 column common.

Sau khi có được BaseEntity chúng ta tiến hành Apply cho các model có sẵn của chúng ta

```
 public class Blog : BaseEntity
    {
        public string Name { get; set; }

        public virtual List<Post> Posts { get; set; }
    }
```

```
public class Post : BaseEntity
    {
        [MaxLength(200)]
        public string Title { get; set; }
        public string Content { get; set; }

        public int BlogId { get; set; }
        public Blog Blog { get; set; }
    }
```
Và Project DataAccess sẽ là như sau:

![](https://images.viblo.asia/1a80ddc2-7ecc-4409-84b0-144071080934.PNG)

Phần Model đã config xong, bây giờ chúng ta quay trở lại với Repository.

Repository sẽ được đặt ở trong BusinessAccess Project, bởi vì các Service của chúng ta sẽ query thông qua Repository

Đầu tiên chúng ta sẽ tạo Interface cho Repository

```
  public interface IRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetAll();
        T Get(int id, bool isActive = true);
        void Insert(T entity, bool saveChange = true);
        void Update(T entity, bool saveChange = true);
        void Delete(T entity, bool saveChange = true);
    }

```

Ở đây chúng ta dùng T class để việc tạo Repository cho các model được động.

Tiếp tục chúng ta sẽ tạo phần implement cho IRepository

```
 public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly SampleNetCoreAPIContext context;
        private DbSet<T> entities;
        string errorMessage = string.Empty;

        public Repository(SampleNetCoreAPIContext context)
        {
            this.context = context;
            entities = context.Set<T>();
        }
        public IQueryable<T> GetAll()
        {
            return entities.AsQueryable();
        }

        public T Get(int id, bool isActive = true)
        {
            return entities.FirstOrDefault(s => s.Id == id && (s.Active || !isActive));
        }

        public IEnumerable<T> Filter(Expression<Func<T, bool>> filter)
        {
            return entities.Where(filter);
        }

        public void Insert(T entity, bool saveChange = true)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }

            entity.CreatedTime = DateTime.Now;
            entity.UpdatedTime = DateTime.Now;

            entities.Add(entity);

            if (saveChange)
                context.SaveChanges();

        }

        public void Update(T entity, bool saveChange = true)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entity.UpdatedTime = DateTime.Now;
            if (saveChange)
                context.SaveChanges();
        }

        public void Delete(T entity, bool saveChange = true)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
            if (saveChange)
                context.SaveChanges();
        }
    }
```

Nguyên Lý hoạt động như sau:
- Khi chúng ta khởi tạo 1 Reponsitory cho 1 Model, EX : IRepository<Blog> Blog
- Constructor sẽ get DBContext từ Dependency injection
- Constructor sẽ map Model với Table đã được quy định trong DBContext
- Các function còn lại sẽ đc thao tác trên Model cũng chính là thao tác trên Table dưới DB

### Các Function cở bản của 1 Repository
Chính vì nó là 1 object dùng chung nên các function được define cho nó thì mang tính chất tất cả đều phải có và giống nhau
Chẳng hạn như ở đây mình define 4 loại funtion CRUD
- Get
- GetAll
- Insert
- Update
- Delete

### Công việc chính của Repository
- Thao tác với DB thông qua các Function CRUD
- Thực hiện các công việc lặp đi lặp lại ở các thao tác CRUD
- Control việc savechange sao cho đồng bộ.

## Đăng ký Dependency Injection
Để sử dụng Repository chúng ta ko thể nào đi new mới từng Repository ở từng nơi được. Vậy chúng ta làm thế nào?

Chúng ta sẽ đăng ký nó vào Dependency Injection và sẽ lôi nó ra sử dụng ở các constructor.

Đầu tiên chúng ta đăng ký nó ở Class Startup của API

```
  #region Add Repository

services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

#endregion
```

có nghĩa cứ interface IRepository sẽ được implement ở Repository
## Sử dụng ở Repository
Như đã nói ở trên thì bây giờ muốn sử dụng Repository thì chúng ta chỉ việc khai báo ở constructor.


```
 public class BlogService: IBlogService
    {
        private readonly IRepository<Blog> _blogRepository;
        private readonly IMapper _mapper;
        private readonly ILog _logger;

        public BlogService(IRepository<Blog> blogRepository, IMapper mapper)
        {
            _blogRepository = blogRepository;
            _logger = LogManager.GetLogger(typeof(BlogService));
        }

        public List<BlogContract> GetAllBlogs()
        {
            var result = _blogRepository.GetAll().ToList();
            return _mapper.Map<List<Blog>, List<BlogContract>>(result);
        }
    }
```


Ok vậy là chúng ta đã có được Repository và bây giờ ở BusinessAccess Project chúng ta đã có thể thao tác với DataAccess để code logic rồi.

Bài sau mình sẽ hướng dẫn cách tạo Configuration được nạp từ Database nhé.