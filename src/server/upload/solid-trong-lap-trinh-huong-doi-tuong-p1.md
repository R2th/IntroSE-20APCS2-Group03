SOLID là tập hợp những nguyên tắc mà mỗi lập trình viên cần tuân theo khi thiết kế cấu trúc 1 class trong lập trình hướng đối tượng. SOLID bao gồm 5 tính chất, 5 tính chất này giúp chúng ta phần nào hiểu được sự cần thiết nhất định của design patterns và software architecture trong lập trình nói chung. 

Bài viết này sẽ giới thiệu đến các bạn tất vả những gì mình hiểu về SOLID và cách áp dụng SOLID vào trong projects.

Chúng ta sẽ bắt đầu với việc nhìn lại lịch sử ra đời của thuật ngữ này. Sau đó chúng ta sẽ đi vào chi tiết từng tính chất trong SOLID bằng cách tạo ra 1 class và cải thiện nó từng bước.

# I. Background
Nguyên lý SOLID lần đầu được giới thiệu rộng rãi bởi nhà khoa học máy tính Robert J.Martin (người mà chúng ta thường biết đến với tên gọi Uncle Bob) trong bài báo của ông xuất bản năm 2000. Nhưng tên viết tắt SOLID thì ra đời muộn hơn và được giới thiệu bới Michael Feathers.

Uncle Bob là tác giả của rất nhiều cuốn bestselling như Clean Code và Clean Architecture và là một trong những người tham gia ["Agile Alliance"](https://agilemanifesto.org/history.html)

Vì vậy, không quá ngạc nhiên khi tất cả những khái niệm của clean coding, object-oriented architecture, và design patterns có sự kết nối và hoàn thiện lẫn nhau.

Tất cả đều phục vụ chung 1 mục đích:
*Tạo ra những đoạn code dễ hiểu, dễ đọc, và dễ dàng kiểm thử giúp cho nhiều lập trình viên có thể làm việc, đóng góp trên đoạn code đó.*

Các tính chất trong SOLID bao gồm
* The Single Responsibility Principle
* The Open-Closed Principle
* The Liskov Substitution Principle
* The Interface Segregation Principle
* The Dependency Inversion Principle
# II. The Single Responsibility Principle
Tính chất này chỉ ra mỗi class chỉ nên làm 1 công việc và vì thế chỉ nên thay đổi class vì một lý do duy nhất như là thay đổi database logic, logging logic, ... Điều này có nghĩa là nếu class chứa dữ liệu bên trong, như class Book mà mình sắp lấy ví dụ bên dưới và có một vài trường liên quan đến thực thể đó, nó sẽ chỉ thay đổi khi chúng ta thay đổi mô hình dữ liệu. Tuân theo tính chất này là rất quan trọng trong lập trình hướng đối tượng, vì có thể có rất nhiều team khác nhau cùng làm việc trong 1 project và chỉnh sửa cùng 1 class bỏi những lý do khác nhau, điều này có thể dẫn đến các module không tương thích. Ngoài ra, trong trường hợp chúng ta có 1 persistance class kiểm soát hoạt động của database, và chúng ta thấy nó bị change trong 1 commit trên github . Nếu tuân theo SRP chúng ta có thể biết được nguyên nhân class bị thay đổi có thể liên quan đến storage hoặc database.

Merge conflicts là 1 ví dụ khác. Conflicts xuất hiện khi có nhiều người sửa cùng 1 vị trí dòng code trên cùng file. Nếu chúng ta tuân theo SRP khi code sẽ xuất hiện ít conflicts hơn, file sẽ chỉ bị thay đổi bởi 1 lý do duy nhất, và conflicts tồn tại trong pull request sẽ dễ dàng để resolve hơn.

## Những lỗi thường gặp và anti-patterns
Trong mục này chúng ta sẽ cùng nhau xem xét một vài lỗi vi phạm SRP và sau đó chúng ta sẽ bàn bạc về cách giải quyết. Lấy ví dụ bài toán chúng ta cần giải quyết là xây dựng hóa đơn cho 1 cửa hàng sách, bắt đầu bằng việc xây dựng class Book để sử dụng trong hóa đơn của chúng ta.

```Java
class Book {
	String name;
	String authorName;
	int year;
	int price;
	String isbn;

	public Book(String name, String authorName, int year, int price, String isbn) {
		this.name = name;
		this.authorName = authorName;
		this.year = year;
        this.price = price;
		this.isbn = isbn;
	}
}
```

Đây là 1 class đơn giản, không có gì đặc biệt. Mình không để các trường private nên chúng ta không cần bàn đến việc viết các hàm getter setter và chỉ tập trung vào logic bên trong. Giờ thì tạo class Invoice bao gồm logic tạo hóa đơn và tính toán tổng giá. 

```Java
public class Invoice {

	private Book book;
	private int quantity;
	private double discountRate;
	private double taxRate;
	private double total;

	public Invoice(Book book, int quantity, double discountRate, double taxRate) {
		this.book = book;
		this.quantity = quantity;
		this.discountRate = discountRate;
		this.taxRate = taxRate;
		this.total = this.calculateTotal();
	}

	public double calculateTotal() {
	        double price = ((book.price - book.price * discountRate) * this.quantity);

		double priceWithTaxes = price * (1 + taxRate);

		return priceWithTaxes;
	}

	public void printInvoice() {
            System.out.println(quantity + "x " + book.name + " " +          book.price + "$");
            System.out.println("Discount Rate: " + discountRate);
            System.out.println("Tax Rate: " + taxRate);
            System.out.println("Total: " + total);
	}

        public void saveToFile(String filename) {
	// Creates a file with given name and writes the invoice
	}

}
```

Đây là class Invoice, chứa 1 vài trường và 3 methods:
* **calculateTotal**: Hàm tính toán tổng giá tiền.
* **printInvoice**: Hàm in hóa đơn lên console.
* **saveToFile**: Hàm này chịu trách nhiệm ghi hóa đơn ra file.

Bạn nên tự suy nghĩ về điều không đúng khi thiết kế class như trên trước khi đọc tiếp.

Ok, vậy có vấn đề gì với cách code như trên nhỉ ? Class của chúng ta đã vi phạm rất nhiều tiêu chí trong nguyên tắc SRP 

Vi phạm đầu tiên là method **printInvoice** chứa logic in hóa đơn. SRP đã mô tả rằng class của chúng ta chỉ nên thay đổi bởi 1 lý do duy nhất, và lý do đó nên là thay đổi công thức tính toán hóa đơn cho class. Nhưng với thiết kế trên, nếu chúng ta muốn thay đổi định dạng kết quả in ra, chúng ta cần phải thay đổi class. Đây là lý do tại sao chúng ta không nên viết logic in hóa đơn với business logic trong cùng 1 class. 

Còn 1 method khác vi phạm SRP đó chính là **saveToFile**. Method này cũng vi phạm lỗi viết chung persistence logic với business logic trong cùng 1 class. Đừng nghĩ là sai lầm chỉ xảy ra khi chúng ta ghi file, mà nó còn có thể là lưu trữ vào database, gọi đến API, hoặc bất cứ công việc nào khác liên quan đến persistance. Vậy câu hỏi đặt ra là làm thế nào để sửa những lỗi trên ? Chúng ta có thể tạo class mới cho việc in hóa đơn và save file mà không cần sửa đổi class Invoice cho 2 mục đích trên nữa. 

Tạo 2 class mới và đặt tên là InvoicePrinter, InvoicePersistence và di chuyển các method

```Java
public class InvoicePrinter {
    private Invoice invoice;

    public InvoicePrinter(Invoice invoice) {
        this.invoice = invoice;
    }

    public void print() {
        System.out.println(invoice.quantity + "x " + invoice.book.name + " " + invoice.book.price + " $");
        System.out.println("Discount Rate: " + invoice.discountRate);
        System.out.println("Tax Rate: " + invoice.taxRate);
        System.out.println("Total: " + invoice.total + " $");
    }
}
```

```Java
public class InvoicePersistence {
    Invoice invoice;

    public InvoicePersistence(Invoice invoice) {
        this.invoice = invoice;
    }

    public void saveToFile(String filename) {
        // Creates a file with given name and writes the invoice
    }
}
```

Giờ thì cấu trúc class đã tuân theo SRP và tất cả class sẽ chịu trách nhiệm cho 1 chức năng trong ứng dụng, thật tuyệt phải không ?

# II. Open-Closed Principle
Open-Closed Principle yêu cầu mỗi class chỉ nên mở khi muốn mở rộng và đóng với việc sửa đổi. Sửa đổi mình đề cập đến ở đây có nghĩa là thay đổi code của 1 class có sẵn và mở rộng có nghĩa là thêm các hàm mới vào bên trong class. Nguyên tắc này muốn hướng đến việc chúng ta nên thêm các function mới và không chạm vào code đã có trước đó bên trong class. Vì mỗi khi chúng ta sửa đổi những đoạn code đã có, rất có thể sẽ gây ra nguy cơ tạo ra bug. Vì vậy chúng ta nên tránh việc động chạm vào những đoạn code đã được test và đáng tin cậy nếu có thể.

Tuy nhiên 1 câu hỏi được đặt ra là làm thế nào để thêm các hàm mới mà không động chạm đến class, thường thì chúng ta sẽ sử dụng abstract class hoặc interface. Giờ thì áp dụng nguyên tắc này vào ứng dụng in hóa đơn của chúng ta xem sao nhé.

1 ngày đẹp trời, sếp của chúng ta bước đến và nói khách hàng muốn hóa đơn sẽ được lưu trong databases để chúng ta có thể tìm kiếm lại hóa đơn 1 cách dễ dàng. Ồ, có vẻ là 1 yêu cầu đơn giản, cho em vài giây để quẩy chức năng này. Đầu tiên tạo database, sau đó thì kết nối ứng dụng với database bằng cách thêm method save vào class **InvoicePersistence**:

```Java
public class InvoicePersistence {
    Invoice invoice;

    public InvoicePersistence(Invoice invoice) {
        this.invoice = invoice;
    }

    public void saveToFile(String filename) {
        // Creates a file with given name and writes the invoice
    }

    public void saveToDatabase() {
        // Saves the invoice to database
    }
}
```

Những lập trình viên lười biếng thường không có thiết kế class tốt để kế thừa và mở rộng trong tương lai. Vậy nên để thêm tính năng trên, chúng ta phải thay đổi class **InvoicePersistence**. Nếu thiết kế của chúng ta tuân thủ theo tư tưởng Open-Closed principle chúng ta sẽ không cần phải thay đổi class này. Chúng ta đã nhìn ra sai lầm trong thiết kế và giờ thì đưa ra quyết định thay đổi lại code theo tiêu chuẩn Open-Closed thôi nhỉ.

```Java
interface InvoicePersistence {

    public void save(Invoice invoice);
}
```

Thay đổi kiểu của InvoicePersistence thành interface và thêm method save. Mỗi persistance class sẽ implement method này.

```Java
public class DatabasePersistence implements InvoicePersistence {

    @Override
    public void save(Invoice invoice) {
        // Save to DB
    }
}
```

```Java
public class FilePersistence implements InvoicePersistence {

    @Override
    public void save(Invoice invoice) {
        // Save to file
    }
}
```

Tổ chức class của chúng ta nhìn sẽ giống thế này:

![](https://images.viblo.asia/057d0add-821d-4c7d-996a-4ee4767c15fc.jpeg)

Giờ thì những persistance logic sẽ dễ dàng để mở rộng. Nếu sếp của chúng ta muốn lưu dữ liệu vào thêm nhiều loại database (ví dụ như MySQL và MongoDB chẳng hạn) chúng ta sẽ dễ dàng làm việc đó. Có thể bạn sẽ nghĩ chúng ta nên tạo nhiều class mà không cần sử dụng đến interface và thêm method save vào interface đó. Nhưng giả sử chúng ta muốn mở rộng ứng dụng của mình và có rất nhiều persistance class như  **InvoicePersistence, BookPersistence** và tạo 1 class **PersistenceManager** để quản lý tất cả persistence class

```Java
public class PersistenceManager {
    InvoicePersistence invoicePersistence;
    BookPersistence bookPersistence;
    
    public PersistenceManager(InvoicePersistence invoicePersistence,
                              BookPersistence bookPersistence) {
        this.invoicePersistence = invoicePersistence;
        this.bookPersistence = bookPersistence;
    }
}
```
Bây giờ chúng ta có thể chuyển bất kỳ lớp nào implement InvoicePersistence cho lớp này với sự trợ giúp của tính đa hình. Đây là tính linh hoạt mà interface cung cấp.

Mình xin kết thúc phần 1 tại đây, phần 2 mình sẽ ra mắt các bạn trong thời gian sớm nhất để nói về 3 principle còn lại. Cảm ơn mọi người đã đọc bài viết này 

**Tài liệu tham khảo**: https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/