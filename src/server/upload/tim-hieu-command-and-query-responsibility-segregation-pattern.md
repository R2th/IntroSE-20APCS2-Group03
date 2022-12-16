Command and Query Responsibility Segregation (CQRS) pattern chia tách việc đọc và ghi dữ liệu. Việc triển khai CQRS trong ứng dụng của bạn có thể làm tối ưu hóa hiệu suất, khả năng mở rộng và bảo mật. Tính linh hoạt của CQRS cho phép hệ thống phát triển tốt hơn theo thời gian và ngăn chặn các lệnh cập nhật gây ra xung đột ở cấp độ domain.

# Vấn đề

Trong kiến trúc truyền thống, cùng một data model được sử dụng cho cả việc đọc và ghi trong cơ sở dữ liệu. Điều đó là đơn giản và làm việc tốt cho các xử lý thêm, sửa, xóa thôngng thường (CRUD). Tuy nhiên, trong các ứng dụng phức tạp hơn, cách tiếp cận này có thể làm ứng dụng ngày càng thêm nặng nề. Cho ví dụ, bên đọc dữ liệu có thể thực hiện nhiều query khác nhau, việc trả về data transfer objects (DTOs) với nhiều dạng khác nhau. Ánh xạ đối tượng (object mapping) có thể trở nên phức tạp. Bên ghi dữ liệu, model có thể triển khai việc validation và business logic một cách phức tạp. Như một kết quả, bạn có thể nhận được một model phức tạp và làm quá nhiều thứ khác nhau.

Khối lượng công việc của đọc và ghi  thường là không tương ứng với nhau, với rất nhiều khác biệt về hiệu suất và yêu cầu mở rộng.

![](https://images.viblo.asia/3957b179-ac87-4b35-9bd1-6f81c2021a92.png)

- Thường có sự không khớp về mặt dữ liệu giữa việc đọc và ghi, chẳng hạn như việc bổ sung các cột và thuộc tính phải được cập nhật mặc dù chúng không được yêu cầu trong xử lý.
- Sự tranh chấp dữ liệu có thể xảy ra khi các hoạt động được thực hiện song song trên cùng một tập dữ liệu.
- Cách tiếp cận truyền thống có thể có một ảnh hưởng tiêu cực về hiệu suất do tải trên tầng data store và data access, các câu truy vấn để nhận dữ liệu trở nên phức tạp.
- Việc quản lý bảo mật và quyền hạn (permission) có thể khó khắn và phức tạp, bởi vì mỗi entity đều có cả hoạt động đọc và ghi, điều này có thể phơi bày dữ liệu trong những bối cảnh không đúng.

# Giải pháp
CQRS chia tách việc đọc và ghi thành các model khác nhau, sử dụng command để cập nhật và query để đọc dữ liệu.

- Command nên được dựa trên task thay vì tập trung vào dữ liệu. ("Đặt phòng khách sạn", không thiết lập "ReservationStatus thành Reserved")
- Command có thể đặt trong một queue cho xử lý bất đồng bộ (asynchronous) thay vì được xử lý đồng bộ (synchronous).
- Query không bao giờ sửa đổi dữ liệu của cơ sở dữ liệu. Một query trả về một DTO mà không gói gọn trong bất kì hiểu biết của domain nào.

Các models có thể được tách biệt, cô lập với nhau, như thể hiện ở sơ đồ bên dưới, mặc dù đây không phải là yêu cầu tuyệt đối.

![](https://images.viblo.asia/f178f768-cf87-4974-9096-5f228c3f22c7.png)

Các models được tách biệt đọc và ghi giúp quá trình thiết kế và triển khai trở nên đơn giản hơn. Tuy nhiên, một nhược điểm của CQRS là code không thể tự động sản sinh ra từ schema của cơ sở dữ liệu sử dụng cơ chế scaffolding giống như công cụ ORM.

Để cô lập tốt hơn, bạn có thể chia tách dữ liệu đọc và dữ liệu ghi. Cơ sở dữ liệu đọc có thể sử dụng schema dữ liệu của riêng nó để tối ưu cho việc query. Cho ví dụ, nó có thể lưu trữ dạng [Materialized View](https://docs.microsoft.com/en-us/azure/architecture/patterns/materialized-view) của dữ liệu, ngoài ra để tránh join và mapping phức tạp. Nó thậm chí còn có thể sử dụng một kiểu lưu trữ dữ liệu khác. Ví dụ, cơ sở dữ liệu ghi có thể là cơ sở dữ liệu quan hệ, trong khi cơ sở dữ liệu đọc là một cơ sở dữ liệu document. Nói tóm lại, cơ sở dữ liệu của đọc và ghi là tách biệt và hoàn toàn có thể sử dụng hai loại khác nhau.

Nếu việc chia tác cơ sở dữ liệu đọc và ghi được thực hiện, chúng phải giữ đồng bộ với nhau. Thông thường điều này được hoàn thành bởi việc model ghi xuất ra một event bất kì lúc nào có cập nhật trong cơ sở dữ liệu. Việc cập nhật và xuất event phải xảy ra trong một transaction.

![](https://images.viblo.asia/63f303b2-ea6e-4656-9d37-516ba818be4d.png)

Cơ sở dữ liệu đọc có thể là một bản sao dạng read-only của cơ sở dữ liệu ghi hoặc chúng có một cấu trúc khác nhau hoàn toàn. Việc sử dụng nhiều bản sao read-only có thể tăng hiệu suất, đặc biệt trong các kịch bản được phân tán nơi mà bản sao read-only được đặt gần các thể hiện của ứng dụng.

Việc chia tách cơ sở dữ liệu đọc và ghi cũng cho phép mỗi cái có hướng mở rộng phù hợp để đáp ứng khả năng chịu tải. Cho ví dụ, cơ sở dữ liệu đọc thông thường tải cao hơn cơ sở dữ liệu ghi rất nhiều.

Một số triển khai của CQRS sử dụng [Event Sourcing](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) pattern. Với pattern này, trạng thái ứng dụng được lưu trữ dưới dạng các event. Mỗi event thể hiện một tập các thay đổi của dữ liệu. Trạng thái hiện tại được xây dựng bằng việc chạy lại các event đó. Trong một bối cảnh CQRS, lợi ích của **Event Sourcing** là các event tương tự có thể được sử dụng để thông báo đến các thành phần khác - cụ thể, thông báo tới model đọc. Model đọc sử dụng các event để tạo một snapshot của trạng thái hiện tại, nó hiệu quả hơn cho các query. Tuy nhiên, **Event Sourcing** mang đến sự phức tạp cho thiết kế của ứng dụng.

Lợi ích của CQRS bao gồm:
- **Độc lập mở rộng**. CQRS cho khống lượng công việc đọc và ghi mở rộng một cách độc lập và có thể dẫn kết quả tranh chấp sẽ ít hơn.
- **Tối ưu hóa schema của dữ liệu**. Bên đọc có thể sử dụng schema được tối ưu cho query, trong khi bên ghi sử dụng schema tối ưu cho việc cập nhật.
- **Bảo mật**. Nó dễ dàng hơn để đảm bảo rằng chỉ các domain entities có quyền hạn mới đang thực hiện việc ghi dữ liệu.
- **Chia tách các mối quan tâm**. Việc chia bên đọc và ghi có thể làm cho model dễ bảo trì và mềm dẻo hơn.
- **Các query đơn giản hơn**. Bằng việc lưu trữ một materialized view trong cơ sở dữ liệu để đọc, ứng dụng có thể tránh việc join phức tạp khi query.

# Những điểm cần cân nhắc sử dụng
Một số thử thách của việc triển khai pattern này bao gồm:

- **Phức tạp**. Ý tưởng cơ bản của CQRS là đơn giản. Nhưng nó có thể dẫn đến một thiết kế ứng dụng phức tạp, đặc biệt khi chúng sử dụng cùng pattern **Event Sourcing**.
- **Messaging**. Mặc dù CQRS không yêu cầu messaging, tuy nhiên nó thường phổ biến sử dụng messaging để xử lý command và phát hành các cập nhật event. Trong trường hợp này, ứng dụng phải xử lý message thất bại hoặc trùng lặp.
- **Sự thống nhất cuối cùng**. Nếu bạn chia tách cơ sở dữ liệu đọc và ghi, dữ liệu đọc có thể là cũ. Lưu trữ model bên đọc phải được cập nhật để phản ánh các thay đổi của lưu trữ model bên ghi và nó có thể khó khăn để phát hiện khi nào một người dùng thành lập một request dựa trên dữ liệu đọc đã cũ.

# Khi nào sử dụng pattern này
Xem xét CQRS cho những kịch bản bên dưới:

- Các domain hợp tác nơi có nhiều người dùng truy cập song song vào cùng dữ liệu. CQRS cho phép bạn định nghĩa command với đủ chi tiết để giảm thiểu xung đột tại cấp domain và xung đột phát sinh được hợp nhất bởi command.
- Giao diện người dùng dựa trên task nơi mà người dùng được hướng dẫn thông qua các xử lý phức tạp như một tập hợp các bước hoặc với các model domain phức tạp. Model ghi có một ngăn xếp command-processing đầy đủ với business logic, input validation và business validation. Model ghi có thể hành xử một tập các object được liên kết như một model unit cho dữ liệu thay đổi (một aggregate, trong thuật ngữ DDD) và đảm bảo rằng những object này luôn luôn thống nhất trạng thái. Model đọc không có business logic hoặc validation, chỉ trả về một DTO trong một view model. Model read là thống nhất với model ghi.
- Kịch bản nơi mà hiệu suất của đọc dữ liệu phải được tinh chỉnh riêng biệt với hiệu suất của ghi dữ liệu, đặc biệt khi số lượng của việc đọc lớn hơn rất nhiều so với số lượng của việc ghi. Trong kịch bản này, bạn có thể mở rộng model đọc nhưng chạy model ghi chỉ trong một vài thể hiện. Một số nhỏ thể hiện của model ghi cũng hỗ trợ để tối thiểu hóa xung đột hợp nhất (merge conflict).
- Kịch bản nơi mà một team của lập trình viên có thể tập trung domain model phức tạp của phần model ghi, team khác có thể tập trung với model đọc và giao diện người dùng.
- Kịch bản nơi hệ thống được mong đợi sẽ phát triển dần theo thời gian và có thể chứa nhiều phiên bản của model hoặc nơi business rule thay đổi theo thời gian.
- Việc tích hợp với hệ thống khác, đặc biệt trong việc phối hợp với event sourcing, trong đó sự thất bại tạm thời của hệ thống con không ảnh hưởng đến hoạt động của hệ thống khác.

###
Pattern này không khuyến khích khi:
- Domain của business rule đơn giản.
- Một giao diện người dùng thêm, sửa, xóa đơn giản và hoạt động truy cập dữ liệu vừa đủ.

Xem xét việc áp dụng CQRS đến một số phần giới hạn trong hệ thống của bạn nơi nó có giá trị nhất.

# Event Sourcing và CQRS

Pattern CQRS thường được sử dụng cùng với pattern **Event Sourcing**. Hệ thống dựa trên CQRS sử dụng chia việc đọc và ghi model dữ liệu, mỗi cái được điều chỉnh theo các task liên quan và thường được đặt ở các kho lưu trữ riêng biệt. Khi được sử dụng với **Event Sourcing**, cơ sở dữ liệu của các event là model ghi và là nguồn chính thức của thông tin. Model đọc của hệ thống dựa trên CQRS cung cấp materialized view của dữ liệu, điển hình như các views không được chuẩn hóa. Những view này được điều chỉnh tới giao diện và hiển thị những yêu cầu của ứng dụng, hộ trợ tối đa hiệu xuất của cả hiển thị và query.

Sử dụng stream của event là cơ sở dữ liệu ghi, thay vì dữ liệu thực tế tại một thời điểm, tránh cập nhật những xung đột trong một aggrefate đơn, tối đa hóa hiệu suất và khả năng mở rộng. Các event có thể được sử dụng bất đồng bộ để sản sinh ra marterialized view của dữ liệu cái mà được sử dụng để sinh cơ sở dữ liệu đọc.

Bởi vì event store là nguồn chính thức của thông tin, nó có thể xóa các materialized view và chạy lại tất các các event trong quá khứ để tạo ra trạng thái hiện tại của dữ liệu khi hệ thống phát triển hoặc khi model đọc phải thay đổi.

Khi nào sử dụng CQRS kết hợp với **Event Sourcing**, xem xét các trường hợp bên dưới:

- Với bất kì hệ thống nơi mà cơ sở dữ liệu đọc và ghi được chia tách, hệ thống dựa trên pattern này chỉ là sự thống nhất cuối cùng. Đó sẽ là một số chậm chễ giữa event được sản sinh và cơ sở dữ liệu được cập nhật.
- Pattern thêm sự phức tạp bởi vì code phải được sinh để khởi tạo và xử lý các event và lắp ráp hoặc cập nhật các view thích hợp, các object đã yêu câu bởi query hoặc một model đọc. Sự phức tạp của pattern CQRS khi đã sử dụng với **Event Sourcing** có thể làm việc triển khai thành công khó khăn hơn và yêu cầu một cách tiếp cận khác để thiết kế hệ thống. Tuy nhiên, event sourcing có thể làm dễ dàng hơn để model domain và làm nó dễ dàng hơn để xây dựng lại view hoặc tạo cái mới bởi vì lịch sử các thay đổi dữ liệu được bảo tồn.
- Việc sinh materialized view cho sử dụng trong model đọc hoặc lịch sử của dữ liệu bởi việc cache lại và xử lý các event cho entities hoặc bộ sưu tập của các entities có thể yêu cầu thời gian xử lý và tài nguyên sử dụng đáng kể. Điều này đặc biệt đúng nếu nó yêu cầu việc tổng hợp hoặc phân tích các giá trị với thời hạn dài, bởi vì tất cả các event được liên kết có thể cần được kiểm tra. Giải quyết vấn đề này bằng việc triển khai snapshots của dữ liệu tại khoảng thời gian đã được lên lịch trình, giống như đếm tổng số các hành động (action) đã xảy ra hoặc trạng hái hiện tại của một entity.

# Ví dụ
Code bên dưới là một ví dụ triển khai pattern CQRS mà sử dụng các định nghĩa khác nhau cho đọc và ghi model. Các model interface không ra lệnh bất kì tính năng nào của cơ sở dữ liệu nền tảng và chúng có thể phát triển và tùy chỉnh độc lập bởi vì những interface này được chia tách.

Code sau thể hiện định nghĩa của model đọc:

```csharp
// Query interface
namespace ReadModel
{
  public interface ProductsDao
  {
    ProductDisplay FindById(int productId);
    ICollection<ProductDisplay> FindByName(string name);
    ICollection<ProductInventory> FindOutOfStockProducts();
    ICollection<ProductDisplay> FindRelatedProducts(int productId);
  }

  public class ProductDisplay
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal UnitPrice { get; set; }
    public bool IsOutOfStock { get; set; }
    public double UserRating { get; set; }
  }

  public class ProductInventory
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int CurrentStock { get; set; }
  }
}
```

Hệ thống cho phép người sử dụng đánh gia sản phẩm. Code ứng dụng làm điều này bằng việc sử dụng ```RateProduct``` command chỉ ra ở code bên dưới.

```csharp
public interface ICommand
{
  Guid Id { get; }
}

public class RateProduct : ICommand
{
  public RateProduct()
  {
    this.Id = Guid.NewGuid();
  }
  public Guid Id { get; set; }
  public int ProductId { get; set; }
  public int Rating { get; set; }
  public int UserId {get; set; }
}
```

Hệ thống sử dụng class ```ProductsCommandHandler``` để xử lý commands đã gửi bởi ứng dụng. Client thông thường gửi commands đến domain thông qua hệ thống messaging giống như queue. Command handler chấp nhận những commands và triệu gọi các phương thức của domain interface. Độ chi tiết của mỗi command được thiết kế để giảm bớt cơ hội của các request xung đột. Code bên dưới thể hiện một phác thảo của class ```ProductsCommandHandler```

```csharp
public class ProductsCommandHandler :
    ICommandHandler<AddNewProduct>,
    ICommandHandler<RateProduct>,
    ICommandHandler<AddToInventory>,
    ICommandHandler<ConfirmItemShipped>,
    ICommandHandler<UpdateStockFromInventoryRecount>
{
  private readonly IRepository<Product> repository;

  public ProductsCommandHandler (IRepository<Product> repository)
  {
    this.repository = repository;
  }

  void Handle (AddNewProduct command)
  {
    ...
  }

  void Handle (RateProduct command)
  {
    var product = repository.Find(command.ProductId);
    if (product != null)
    {
      product.RateProduct(command.UserId, command.Rating);
      repository.Save(product);
    }
  }

  void Handle (AddToInventory command)
  {
    ...
  }

  void Handle (ConfirmItemsShipped command)
  {
    ...
  }

  void Handle (UpdateStockFromInventoryRecount command)
  {
    ...
  }
}
```

# Kết 
Command and Query Responsibility Segregation là một pattern khá thú vị và mới lạ với nhiều người. Điểm mạnh của nó là hiệu suất, khả năng mở rộng và bảo mật. Nó thích hợp với cá hệ thống lớn và phức tạp hơn là các hệ thống đơn giản.
Hy vọng bài viết sẽ đem đến cho các bạn một cái nhìn cơ bản về pattern này đồng thời có thể áp dụng trong hệ thống của mình. Cảm ơn các bạn đã theo dõi.

**Bài viết được dịch từ nguồn:**

[Command and Query Responsibility Segregation (CQRS) pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs)