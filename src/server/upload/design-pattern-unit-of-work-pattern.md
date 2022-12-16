# Phần 2: Ví dụ Unit Of Work Pattern trong C# - Design Pattern: Data Access Layer Patterns
# 1. Giới thiệu chung
Đây là phần thứ 2 trong series áp dụng Design pattern vào trong dự án .NET. Như trong [phần 1](https://viblo.asia/p/design-pattern-repository-pattern-Do754OzWlM6), chúng ta đã tìm hiểu qua Repository pattern là gì và hoạt động ra sao. Trong phần này chúng ta sẽ mở rộng một chút từ Repository pattern và áp dụng mô hình Unit Of Work vào thử xem nó cải thiện được những gì nhé.
![](https://images.viblo.asia/c6b7a3ee-93c8-41ad-b3fd-8737058cc3c6.PNG)

# 2. Vấn đề
Trong mô hình Repository Pattern rất dễ để nhận ra chúng ta có nhiều hơn một repository, chắng hẳn như ví dụ trong phần 1 chúng ta có 3 repository (CustomerRepository, OrderRepository và ProductRepository). Nếu 3 thằng này hoạt động riêng biệt tức là chỉnh sửa dữ liệu mỗi thằng không ảnh hưởng đến thằng kia thì chúng ta không nói đến nhưng trong trường hợp này Order và Customer có quan hệ với nhau. Khi chúng ta thêm 1 Order thì trước tiên mình sẽ check danh sách Customer có hay không? nếu có thì chúng ta sẽ lấy Customer đó từ CustomerRepository còn không thì chúng ta sẽ phải tạo 1 instance mới.
```
        public IActionResult Create(CreateOrderModel model)
        {
            if (!model.LineItems.Any()) return BadRequest("Please submit line items");

            if (string.IsNullOrWhiteSpace(model.Customer.Name)) return BadRequest("Customer needs a name");

            var customer = CustomerRepository.Find(c => c.Name == model.Customer.Name).FirstOrDefault();

            if (customer != null)
            {
                customer.ShippingAddress = model.Customer.ShippingAddress;
                customer.PostalCode = model.Customer.PostalCode;
                customer.City = model.Customer.City;
                customer.Country = model.Customer.Country;

                customerRepository.Update(customer);
                customerRepository.SaveChanges();
            }
            else
            {
                customer = new Customer
                {
                    Name = model.Customer.Name,
                    ShippingAddress = model.Customer.ShippingAddress,
                    City = model.Customer.City,
                    PostalCode = model.Customer.PostalCode,
                    Country = model.Customer.Country
                };
            }
            var order = new Order
            {
                LineItems = model.LineItems
                    .Select(line => new LineItem { ProductId = line.ProductId, Quantity = line.Quantity })
                    .ToList(),

                Customer = customer
            };

            orderRepository.Add(order);

            orderRepository.SaveChanges();

            return Ok("Order Created");
        }
```
Như ví dụ trên trong cùng một hàm mà chúng ta phải gọi database đến tận 4 lận, thực chất cả 2 customerRepository và orderRepository đều là dbContext trong EntityFramework nhưng mà là 2 instance khác biệt nhau dẫn đến phải gọi database nhiều lần cho sự cập nhật của mỗi thằng. Do vậy để nâng cao hiểu quả thì tại sao không tạo 1 lớp chứa tất cả những thằng này khi thay đổi gì đó thì cập nhật 1 lần mà thôi 👍
# 3. Thiết kế
Đầu tiên chúng ta cần tạo 1 lớp UnitOfWork là nơi chứa tất cả repository chúng ta có. Lớp này mình viết trong tầng Infrastructure cùng với tụi repository

```
public interface IUnitOfWork
    {
        IRepository<Customer> CustomerRepository { get; }
        IRepository<Order> OrderRepository { get; }
        IRepository<Product> ProductRepository { get; }

        void SaveChanges();
    }

    public class UnitOfWork : IUnitOfWork
    {
        private ShoppingContext context;

        public UnitOfWork(ShoppingContext context)
        {
            this.context = context;
        }

        private IRepository<Customer> customerRepository;
        public IRepository<Customer> CustomerRepository
        {
            get
            {
                if (customerRepository == null)
                {
                    customerRepository = new CustomerRepository(context);
                }

                return customerRepository;
            }
        }

        private IRepository<Order> orderRepository;
        public IRepository<Order> OrderRepository
        {
            get
            {
                if(orderRepository == null)
                {
                    orderRepository = new OrderRepository(context);
                }

                return orderRepository;
            }
        }

        private IRepository<Product> productRepository;
        public IRepository<Product> ProductRepository
        {
            get
            {
                if (productRepository == null)
                {
                    productRepository = new ProductRepository(context);
                }

                return productRepository;
            }
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
```
Lớp IUnitOfWork là interface bao gồm các repository, bằng cách này thay vì phải inject từng repository vào nơi cần sử dụng thì chỉ cần inject lớp UnitOfWork này và mỗi khi cần được sử dụng thì nó mới khởi tạo instance cho repository đó. Như đã nói chỉ khi nào được gọi thì chúng ta mới tạo instance cho nó và có thêm 1 hàm SaveChange, khi gọi hàm này thì đồng loạt sẽ cập nhật tất cả Repository, hàm này được cung cấp bởi Enity Framework nha các bạn khỏi thắc mắc sao làm được 😉

Sau khi đã tạo lớp UnitOfWork chúng ta inject nó vào nơi cần sử dụng, ví dụ trong OrderController hay vì phải inject nhiều instance repository thì chỉ cần inject lớp này thôi là có thể sử sụng được tất cả repository rồi.

```
        //private readonly IRepository<Order> orderRepository;
        //private readonly IRepository<Product> productRepository;

        //public OrderController(IRepository<Order> orderRepository,
        //     IRepository<Product> productRepository)
        //{
        //    this.orderRepository = orderRepository;
        //    this.productRepository = productRepository;
        //}

        private readonly IUnitOfWork unitOfWork;

        public OrderController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }
```

Và sử dụng nó cũng rất đơn giản chỉ cần thêm tiền tố *unitOfWork* vào trước các hàm ban đầu và sử dụng thôi không cần chỉnh sửa gì thêm 😉 
```
 public IActionResult Index()
        {
            var orders = unitOfWork.OrderRepository.Find(order => order.OrderDate > DateTime.UtcNow.AddDays(-1));

            return View(orders);
        }

        public IActionResult Create()
        {
            var products = unitOfWork.ProductRepository.All();

            return View(products);
        }

        [HttpPost]
        public IActionResult Create(CreateOrderModel model)
        {
            if (!model.LineItems.Any()) return BadRequest("Please submit line items");

            if (string.IsNullOrWhiteSpace(model.Customer.Name)) return BadRequest("Customer needs a name");

            var customer = unitOfWork.CustomerRepository
                .Find(c => c.Name == model.Customer.Name)
                .FirstOrDefault();

            if(customer != null)
            {
                customer.ShippingAddress = model.Customer.ShippingAddress;
                customer.PostalCode = model.Customer.PostalCode;
                customer.City = model.Customer.City;
                customer.Country = model.Customer.Country;

                unitOfWork.CustomerRepository.Update(customer);
            }
            else
            {
                customer = new Customer
                {
                    Name = model.Customer.Name,
                    ShippingAddress = model.Customer.ShippingAddress,
                    City = model.Customer.City,
                    PostalCode = model.Customer.PostalCode,
                    Country = model.Customer.Country
                };
            }

            var order = new Order
            {
                LineItems = model.LineItems
                    .Select(line => new LineItem { ProductId = line.ProductId, Quantity = line.Quantity })
                    .ToList(),

                Customer = customer
            };

            unitOfWork.OrderRepository.Add(order);

            unitOfWork.SaveChanges();

            return Ok("Order Created");
        }
```

So sánh hàm Create trong OrderController bây giờ với ban đầu thì chúng ta thấy được số  lần gọi đến database giảm đi đáng kể, đây là lợi ích của việc áp dụng Unit Of Work Pattern trong dự án. Phần cuối cùng trong series này nói về Lazy Load Pattern, cảm ơn các bạn đã quan tâm 😘
# Link source code
* https://github.com/quocthinh861/DesignPattern-UnitOfWork