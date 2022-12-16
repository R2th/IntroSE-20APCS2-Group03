# Giới thiệu
Tôi thường gặp các câu hỏi về việc triển khai CQRS (**Command Query Responsibility Segregation**) pattern. Thậm chí thường xuyên hơn, tôi thấy các cuộc thảo luận về việc truy cập cơ sở dữ liệu ORM hoặc thuần SQL cái nào là tốt hơn.

Trong bài viết này tôi muốn giới thiệu với các bạn làm thế nào có thể nhanh chóng triển khai ứng dụng REST API với CQRS pattern sử dụng .**NET Core**. Tôi ngay lập tức chỉ ra rằng đây là phiên bản CQRS đơn giản nhất. Việc cập nhật **Write Model** ngay lập tức cập nhật **Read Model**, vì vậy chúng ta sẽ không có sự thống nhất cuối cùng ở đây. Tuy nhiên, nhiều ứng dụng không cần sự thống nhất cuối cùng, trong khi đó việc chia logic của việc ghi và đọc sử dụng chia làm 2 model là được khuyến khích và hiệu quả hơn trong hầu hết các giải pháp.

Đặc biệt trong bài viết này tôi đã chuẩn bị demo, ứng dụng hoạt động đầy đủ, xem source code trên [Github](https://github.com/kgrzybek/sample-dotnet-core-cqrs-api).

# Mục đích của tôi
Dưới đây là cái đích mà tôi muốn đạt được trong ứng dụng demo:
1. Rõ ràng việc chia tách và cô lập **Write Model** và **Read Model**.
2. Nhận dữ liệu sử dụng **Read Model** nên nhanh nhất có thể.
3. Write Model nên được triển khai với các tiếp cận DDD (**Domain Driven Design**). Cấp độ của việc triển khai DDD nên phụ thuộc trên mức độ phức tạp của domain.
4. Logic ứng dụng nên được tách biệt với giao diện người dùng (GUI) .
5. Chọn các thư viện (libraries) cẩn thận, nổi tiếng và được hỗ trợ.

# Thiết kế
Flow giữa các thành phần trông giống như thế này:

![](https://images.viblo.asia/7bec80a9-66fb-4900-a5d3-e45329a2007d.png)


Như bạn có thể thấy xử lý cho việc đọc là khá đơn giản bởi vì chúng ta nên làm query dữ liệu nhanh nhất có thể. Chúng ta không cần ở đây các tầng abstractions và các tiếp cận rắc rối. Nhận các đối số từ query object, thực thi câu lệnh thuần SQL đối với cơ sở dữ liệu và trả về dữ liệu. Đó là tất cả những điều phải làm.

Nó là khác việt với trường hợp ghi. Việc ghi thường yêu cầu nhiều hơn các công nghệ nâng cáo bởi vì chúng ta cần thực thi một số logic, làm một vài tính toán hoặc đơn giản là kiểm tra các điều kiện (đặc biệt là những thứ không thay đổi). Với công cụ **ORM** với theo dõi các thay đổi (change tracking) và sử dụng **Repository Pattern** chúng ta có thể giữ để **Domain Model** nguyên vẹn.

# Giải pháp
### Read model
Biểu đồ bên dưới biểu diễn flow giữa các thành phần được sử dụng để xử lý các hoạt động yêu cầu đọc dữ liệu:

![](https://images.viblo.asia/34c17839-2b91-4861-a550-13e4d9ac64c1.png)

Giao diện người dùng có trách nhiệm cho việc tạo ra Query object:

```csharp
/// Get customer order details.
/// </summary>
/// <param name="orderId">Order ID.</param>
[Route("{customerId}/orders/{orderId}")]
[HttpGet]
[ProducesResponseType(typeof(OrderDetailsDto), (int)HttpStatusCode.OK)]
public async Task<IActionResult> GetCustomerOrderDetails(
    [FromRoute]Guid orderId)
{
    var orderDetails = await _mediator.Send(new GetCustomerOrderDetailsQuery(orderId));
 
    return Ok(orderDetails);
}
```

```csharp
internal class GetCustomerOrderDetailsQuery : IRequest<OrderDetailsDto>
{
    public Guid OrderId { get; }
 
    public GetCustomerOrderDetailsQuery(Guid orderId)
    {
        this.OrderId = orderId;
    }
}
```

Tiếp theo, query handler xử lý query:

```csharp
internal class GetCustomerOrderDetialsQueryHandler : IRequestHandler<GetCustomerOrderDetailsQuery, OrderDetailsDto>
{
    private readonly ISqlConnectionFactory _sqlConnectionFactory;
 
    public GetCustomerOrderDetialsQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
    {
        this._sqlConnectionFactory = sqlConnectionFactory;
    }
 
    public async Task<OrderDetailsDto> Handle(GetCustomerOrderDetailsQuery request, CancellationToken cancellationToken)
    {
        using (var connection = this._sqlConnectionFactory.GetOpenConnection())
        {
            const string sql = "SELECT " +
                               "[Order].[Id], " +
                               "[Order].[IsRemoved], " +
                               "[Order].[Value] " +
                               "FROM orders.v_Orders AS [Order] " +
                               "WHERE [Order].Id = @OrderId";
            var order = await connection.QuerySingleOrDefaultAsync<OrderDetailsDto>(sql, new {request.OrderId});
 
            const string sqlProducts = "SELECT " +
                               "[Order].[ProductId] AS [Id], " +
                               "[Order].[Quantity], " +
                               "[Order].[Name] " +
                               "FROM orders.v_OrderProducts AS [Order] " +
                               "WHERE [Order].OrderId = @OrderId";
            var products = await connection.QueryAsync<ProductDto>(sqlProducts, new { request.OrderId });
 
            order.Products = products.AsList();
 
            return order;
        }
    }
}
```

```csharp
public class SqlConnectionFactory : ISqlConnectionFactory, IDisposable
{
    private readonly string _connectionString;
    private IDbConnection _connection;
 
    public SqlConnectionFactory(string connectionString)
    {
        this._connectionString = connectionString;
    }
 
    public IDbConnection GetOpenConnection()
    {
        if (this._connection == null || this._connection.State != ConnectionState.Open)
        {
            this._connection = new SqlConnection(_connectionString);
            this._connection.Open();
        }
 
        return this._connection;
    }
 
    public void Dispose()
    {
        if (this._connection != null && this._connection.State == ConnectionState.Open)
        {
            this._connection.Dispose();
        }
    }
}
```

Điều trước tiên là mở kết nối cơ sở dữ liệu và để đạt được điều đó chúng ta sử dụng class ```SqlConnectionFactory```. Đây là class được resolve bởi ```IoCContainer``` với **HTTP request lifetime scope** như vậy chúng ta chắc chắc rằng, chúng ta chỉ sử dụng một kết nối cơ sở dữ liệu trong khi xử ý request.

Điều thứ hai là chuẩn bị và thực thi các câu lệnh thuần SQL đối với cơ sở dữ liệu. Tôi cố gắng không tham chiếu các bảng trực tiếp và thay vào đó tham chiếu đến các view của cơ sở dữ liệu. Đây là một cách tốt để tạo ra abstraction và tách ứng dụng của chúng ta ra khỏi cấu trúc cơ sở dữ liệu (database schema) bởi vì tôi muốn ẩn đi bên trong cơ sở dữ liệu nhiều nhất có thể.

Về việc thực thi SQL tôi sử dụng thư viện nhỏ ORM [Dapper](https://stackexchange.github.io/Dapper/) bởi vì hầu hết nó nhanh như native **ADO.NET** và không có sẵn các API. Tóm lại, nó làm cái gì cần làm và nó làm rất tốt.

### Write model
Biểu đồ bên dưới biểu diễn flow xử lý hoạt động ghi:

![](https://images.viblo.asia/342ad09e-e1b6-4b14-b5f7-5b089aa47e2c.png)

Việc xử lý yêu cầu ghi bắt đầu tương tự với với việc đọc nhưng chúng ta tạo **Command** object thay vì **query object**:

```csharp
/// <summary>
/// Add customer order.
/// </summary>
/// <param name="customerId">Customer ID.</param>
/// <param name="request">Products list.</param>
[Route("{customerId}/orders")]
[HttpPost]
[ProducesResponseType((int)HttpStatusCode.Created)]
public async Task<IActionResult> AddCustomerOrder(
    [FromRoute]Guid customerId, 
    [FromBody]CustomerOrderRequest request)
{
   await _mediator.Send(new AddCustomerOrderCommand(customerId, request.Products));
 
   return Created(string.Empty, null);
}
```

Tiếp theo, ```CommandHandler``` được triệu gọi:

```csharp
public class AddCustomerOrderCommandHandler : IRequestHandler<AddCustomerOrderCommand>
{
    private readonly ICustomerRepository _customerRepository;
    private readonly IProductRepository _productRepository;
 
    public AddCustomerOrderCommandHandler(
        ICustomerRepository customerRepository, 
        IProductRepository productRepository)
    {
        this._customerRepository = customerRepository;
        this._productRepository = productRepository;
    }
 
    public async Task<Unit> Handle(AddCustomerOrderCommand request, CancellationToken cancellationToken)
    {
        var customer = await this._customerRepository.GetByIdAsync(request.CustomerId);
 
        var selectedProducts = request.Products.Select(x => new OrderProduct(x.Id, x.Quantity)).ToList();
        var allProducts = await this._productRepository.GetAllAsync();
 
        var order = new Order(selectedProducts, allProducts);
        
        customer.AddOrder(order);
 
        await this._customerRepository.UnitOfWork.CommitAsync(cancellationToken);
 
        return Unit.Value;
    }
}
```

**Command handler** trông khác với **Query handler**. Ở đây, chúng ta sử dụng cấp độ cao hơn của abstraction, sử dụng cách tiếp cận DDD với **Aggregates** và **Entities**. Chúng ta cần nó là bởi vì trường hợp này những vấn đề cần giải quyết thường phức tạp hơn phía đọc dữ liệu. **Command handler** gọi phương thức tổng hợp, lưu các thay đổi vào cơ sở dữ liệu.

**Customer aggregate** được định nghĩa như sau:

```csharp
public class Customer : Entity
{
    public Guid Id { get; private set; }
 
    private readonly List<Order> _orders;
 
    private Customer()
    {
        this._orders = new List<Order>();
    }
 
    public void AddOrder(Order order)
    {
        this._orders.Add(order);
 
        this.AddDomainEvent(new OrderAddedEvent(order));
    }
 
    public void ChangeOrder(Guid orderId, List<OrderProduct> products, IReadOnlyCollection<Product> allProducts)
    {
        var order = this._orders.Single(x => x.Id == orderId);
        order.Change(products, allProducts);
 
        this.AddDomainEvent(new OrderChangedEvent(order));
    }
 
    public void RemoveOrder(Guid orderId)
    {
        var order = this._orders.Single(x => x.Id == orderId);
        order.Remove();
 
        this.AddDomainEvent(new OrderRemovedEvent(order));
    }
```

```csharp
public class Order : Entity
{
    public Guid Id { get; private set; }
    private bool _isRemoved;
    private decimal _value;
    private List<OrderProduct> _orderProducts;
 
    private Order()
    {
        this._orderProducts = new List<OrderProduct>();
        this._isRemoved = false;
    }
 
    public Order(List<OrderProduct> orderProducts, IReadOnlyCollection<Product> allProducts)
    {
        this.Id = Guid.NewGuid();
        this._orderProducts = orderProducts;
 
        this.CalculateOrderValue(allProducts);
    }
 
    internal void Change(List<OrderProduct> products, IReadOnlyCollection<Product> allProducts)
    {
        foreach (var product in products)
        {
            var orderProduct = this._orderProducts.SingleOrDefault(x => x.ProductId == product.ProductId);
            if (orderProduct != null)
            {
                orderProduct.ChangeQuantity(product.Quantity);
            }
            else
            {
                this._orderProducts.Add(product);
            }
        }
 
        var existingProducts = this._orderProducts.ToList();
        foreach (var existingProduct in existingProducts)
        {
            var product = products.SingleOrDefault(x => x.ProductId == existingProduct.ProductId);
            if (product == null)
            {
                this._orderProducts.Remove(existingProduct);
            }
        }
 
        this.CalculateOrderValue(allProducts);
    }
 
    internal void Remove()
    {
        this._isRemoved = true;
    }
 
    private void CalculateOrderValue(IReadOnlyCollection<Product> allProducts)
    {
        this._value = this._orderProducts.Sum(x => x.Quantity * allProducts.Single(y => y.Id == x.ProductId).Price);
    }
}
```

### Kiến trúc

Cấu trúc **Solution** được thiết kế dựa trên [Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/) nổi tiếp như hình bên dưới:

![](https://images.viblo.asia/32420e68-917a-4baa-acb9-805d29a5d28d.png)

Có 3 projects được định nghĩa:

- API project với API endpoints và logic ứng dụng (command và query handlers) sử dụng cách tiếp cận [Feature Folders](http://www.kamilgrzybek.com/design/feature-folders/)
- Domain project với **Domain Model**
- Infrastructure project - tích hợp với cơ sở dữ liệu.

![](https://images.viblo.asia/de02a48f-ff79-4c33-9071-509a81abf050.png)

# Tổng kết
Trong bài viết này tôi đã cố gắng trình bày cách đơn giản nhất để triển khai CQRS pattern sử dụng thuần SQL để xử lý bên Read model và cách tiếp cận DDD cho việc triển khai phía **Write Model**. Làm như vậy chúng ta có thể đạt được nhiều hơn việc chia tách của các mối quan tâm mà không làm mất đi tốc độ của việc phát triển. Chi phí cho giải pháp này là rất thấp và nó trả lại kết quả rất nhanh chóng.

Tôi không miêu tả triển khai DDD một cách chi tiết, như vậy tôi khuyên các bạn một lần nữa xem lại source code ứng dụng demo và có thể sử dụng nó như một phần khởi đầu ứng dụng của bạn.

Cảm ơn các bạn đã chú ý theo dõi.

**Bài viết được dịch từ nguồn:**

http://www.kamilgrzybek.com/design/simple-cqrs-implementation-with-raw-sql-and-ddd/