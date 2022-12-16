![](https://images.viblo.asia/3094ca06-993f-4e93-b3a5-71e27f7f902c.png)

## 1. Giới thiệu
* Composite là một mẫu thiết kế thuộc nhóm cấu trúc (Structural Pattern). Composite Pattern là một sự tổng hợp những thành phần có quan hệ với nhau để tạo ra thành phần lớn hơn. Nó cho phép thực hiện các tương tác với tất cả đối tượng trong mẫu tương tự nhau.
* Tần suất sử dụng: khá cao
## 2. Mục đích ra đời
Composite Pattern được sử dụng khi chúng ta cần xử lý một nhóm đối tượng tương tự theo cách xử lý 1 object. Composite pattern sắp xếp các object theo cấu trúc cây để diễn giải 1 phần cũng như toàn bộ hệ thống phân cấp. Pattern này tạo một lớp chứa nhóm đối tượng của riêng nó. Lớp này cung cấp các cách để sửa đổi nhóm của cùng 1 object. Pattern này cho phép Client có thể viết code giống nhau để tương tác với composite object này, bất kể đó là một đối tượng riêng lẻ hay tập hợp các đối tượng.

Ví dụ: bạn có hai loại đối tượng: Sản phẩm và Hộp. Một Hộp có thể chứa nhiều Sản phẩm cũng như một số Hộp nhỏ hơn. Những chiếc Hộp nhỏ này có thể cũng giữ một số Sản phẩm hoặc thậm chí các Hộp nhỏ hơn, v.v.
![](https://images.viblo.asia/79ef6968-27a6-49c7-a6cb-78bcd37e5804.png)

Giả sử bạn quyết định tạo một hệ thống đặt hàng. Làm thế nào bạn sẽ xác định tổng giá của một đơn đặt hàng như vậy? Bạn có thể mở tất cả các hộp, xem qua tất cả các sản phẩm và sau đó tính tổng. Nhưng cách tiếp cận này khi thực thi chương trình đòi hỏi mức độ lồng ghép và cấu trúc phức tạp.

Giải pháp: Mẫu Composite cho phép làm việc với Sản phẩm và Hộp thông qua một giao diện chung khai báo một phương pháp tính tổng giá. Đối với một hộp, nó sẽ đi qua từng mục trong hộp chứa, hỏi giá của nó và sau đó trả lại tổng giá cho hộp này. Lợi ích lớn nhất của phương pháp này là không cần phải quan tâm đến các lớp cụ thể của các đối tượng tạo ra và xử lý chúng với cùng một phương thức.
![](https://images.viblo.asia/33426952-6848-43d6-9b07-88d9ee9436d7.png)

## 3. Kiến trúc
![](https://images.viblo.asia/66bc9740-e58b-4b36-9299-90a5fe674718.png)

Các thành phần trong mô hình:
* *Component:* là một interface hoặc abstract class quy định các method chung cần phải có cho tất cả các thành phần tham gia vào mẫu này
* *Leaf:* là lớp hiện thực (implements) các phương thức của Component - các object không có con.
* *Composite*: lưu trữ tập hợp các Leaf và cài đặt các phương thức của Component. Composite cài đặt các phương thức được định nghĩa trong interface Component bằng cách ủy nhiệm cho các thành phần con xử lý.
* *Client:* sử dụng Component để làm việc với các đối tượng trong Composite.
## 4. Ưu & nhược điểm
#### Ưu điểm
* Bạn có thể làm việc với các cấu trúc cây phức tạp thuận tiện hơn.
* Nguyên tắc mở/ đóng: có thể khởi tạo các loại phần tử mới vào ứng dụng mà không phá vỡ code hiện có đang hoạt động với đối tượng cây.
#### Nhược điểm
* Code có thể trở nên phức tạp hơn mức bình thường, vì có rất nhiều interfaces và classes được khởi tạo cùng với mẫu.
## 5. Khi nào thì sử dụng 
* Khi bạn muốn tạo ra các đối tượng trong các cấu trúc cây để biểu diễn hệ thống phân lớp.
* Có thể khó cung cấp một interface chung cho các lớp có chức năng khác nhau quá nhiều. Trong một số trường hợp nhất định, bạn cần tổng quát hóa quá mức interface thành phần khiến nó khó hiểu hơn.
## 6. Source code minh họa với C#
Bài toán: Chúng ta cần tính tổng giá của một món quà mà chúng ta đang bán trong cửa hàng của mình. Món quà có thể là một món đơn lẻ (đồ chơi) hoặc nó có thể là một món quà phức hợp bao gồm một hộp có hai đồ chơi và một hộp khác có thể có một đồ chơi và hộp có một đồ chơi bên trong. Như chúng ta thấy, chúng ta có một cấu trúc cây đại diện cho món quà phức tạp của chúng ta, vì vậy, việc thực hiện mẫu thiết kế Composite sẽ là giải pháp phù hợp cho chúng ta.
#### Tạo Component
```
    public abstract class GiftBase
    {
        protected string name;
        protected int price;

        public GiftBase(string name, int price)
        {
            this.name = name;
            this.price = price;
        }

        public abstract int CalculateTotalPrice();
    }
    public interface IGiftOperations
    {
        void Add(GiftBase gift);
        void Remove(GiftBase gift);
    }   
```
#### Tạo Composite
```
    public class CompositeGift : GiftBase, IGiftOperations
    {
        private List<GiftBase> _gifts;

        public CompositeGift(string name, int price)
            : base(name, price)
        {
            _gifts = new List<GiftBase>();
        }

        public void Add(GiftBase gift)
        {
            _gifts.Add(gift);
        }

        public void Remove(GiftBase gift)
        {
            _gifts.Remove(gift);
        }

        public override int CalculateTotalPrice()
        {
            int total = 0;

            Console.WriteLine($"{name} contains the following products with prices:");

            foreach (var gift in _gifts)
            {
                total += gift.CalculateTotalPrice();
            }

            return total;
        }
    }   
```
#### Tạo Leaf
```
     public class SingleGift : GiftBase
    {
        public SingleGift(string name, int price)
            : base(name, price)
        {
        }

        public override int CalculateTotalPrice()
        {
            Console.WriteLine($"{name} with the price {price}");

            return price;
        }
    }  
```
#### Tạo Client
```
    class Program
    {
        static void Main(string[] args)
        {
            var phone = new SingleGift("Phone", 256);
            phone.CalculateTotalPrice();

            //composite gift
            var rootBox = new CompositeGift("RootBox", 0);
            var truckToy = new SingleGift("TruckToy", 289);
            var plainToy = new SingleGift("PlainToy", 587);
            rootBox.Add(truckToy);
            rootBox.Add(plainToy);
            var childBox = new CompositeGift("ChildBox", 0);
            var soldierToy = new SingleGift("SoldierToy", 200);
            childBox.Add(soldierToy);
            rootBox.Add(childBox);
            Console.WriteLine($"Total price of this composite present is: {rootBox.CalculateTotalPrice()}");
        }
    }
```
## 7. Design Pattern liên quan
* *Builder:* Có thể sử dụng Builder khi tạo các cây Composite phức tạp vì bạn có thể lập trình các bước xây dựng của nó để hoạt động một cách đệ quy.
* *CoR:* Thường được sử dụng cùng với Composite. Trong trường hợp này, khi một thành phần lá nhận được một yêu cầu, nó có thể chuyển nó qua chuỗi của tất cả các thành phần mẹ xuống gốc của cây đối tượng.
* *Iterator:* có thể sử dụng Iterators để duyệt qua các cây Composite.
* *Visitor:* Bạn có thể sử dụng Visitor truy cập để thực hiện một thao tác trên toàn bộ cây Composite.
* *Flyweights:* Bạn có thể triển khai các nút lá được chia sẻ của Composite cây dưới dạng Flyweights để tiết kiệm RAM.
* *Decorator:* Decorator giống như Composite nhưng chỉ có một thành phần con. Có một sự khác biệt đáng kể khác: Decorator thêm các trách nhiệm bổ sung cho đối tượng được bao bọc, trong khi Composite chỉ tổng hợp các kết quả con của nó. Tuy nhiên các mẫu cũng có thể hợp tác. Bạn có thể sử dụng Decorator để mở rộng hành vi của một đối tượng cụ thể trong cây Composite.
* *Prototype:* Các thiết kế sử dụng nhiều Composite và Decorator thường có thể được hưởng lợi từ việc sử dụng Prototype. Áp dụng mẫu cho phép bạn sao chép các cấu trúc phức tạp thay vì xây dựng lại chúng từ đầu.

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi. Nếu các bạn thấy có ích có thể khám phá thêm [Series Design Patterns - Trợ thủ đắc lực của Developers](https://viblo.asia/s/design-patterns-tro-thu-dac-luc-cua-developers-Q75wqJ67ZWb) của mình!!
## Tài liệu tham khảo
[1] Refactoring.Guru. https://refactoring.guru/design-patterns

[2] Design Patterns for Dummies, Steve Holzner, PhD

[3] Head First, Eric Freeman

[4] Gang of Four Design Patterns 4.0

[5] Dive into Design Pattern