Chào các bạn, ở bài viết này mình sẽ bắt đầu đi vào design pattern đầu tiên, đó là Builder Pattern. Builder pattern là một pattern nằm trong nhóm khởi tạo (Creational Pattern). Tuy nhiên, mình sẽ cố gắng giữ cho các ví dụ đơn giản và dễ tiếp cận nhất có thể, ưu tiên các triển khai thực tế hơn các ví dụ khó hiểu
 
##  **Vấn đề**
Đối với ví dụ này, chúng ta sẽ giả vờ rằng chúng ta là một phần của nhóm Java đang làm việc trên một phần mềm cho một ngân hàng. Chúng ta sẽ cần một cách để đại diện cho tài khoản ngân hàng. Đây sẽ là class của chúng ta
```
public class BankAccount {

    private long accountNumber;
    private String owner;
    private double balance;

    public BankAccount(long accountNumber, String owner, double balance) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = balance;
    }

    //Getters and setters omitted for brevity.
}
```

Ta có thể khởi tạo nó đơn giản như sau:

```
BankAccount account = new BankAccount(123L, "Bart", 100.00);
```

Thật không may, các giải pháp hiếm khi đơn giản. Một yêu cầu mới xuất hiện nói rằng chúng ta theo dõi lãi suất hàng tháng áp dụng cho từng tài khoản, ngày tài khoản được mở và, tùy chọn, chi nhánh mà nó được mở. Vì vậy chúng ta đưa ra phiên bản 2.0 của lớp BankAccount.

```
public class BankAccount {

    private long accountNumber;
    private String owner;
    private String branch;
    private double balance;
    private double interestRate;

    public BankAccount(long accountNumber, String owner, String branch, double balance, double interestRate) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.branch = branch;
        this.balance = balance;
        this.interestRate = interestRate;
   }

    //Getters and setters omitted for brevity.
}
```

Nhờ quy trình xử lý tài khoản mới và được cải tiến, chúng ta có được một số khách hàng mới.

```
BankAccount account = new BankAccount(456L, "User", "Springfield", 100.00, 2.5);
BankAccount anotherAccount = new BankAccount(789L, "Homer", null, 2.5, 100.00);  //Oops!
```

Nếu chúng ta có 10 tham số khác nhau, sẽ rất khó để xác định những gì trong hàm tạo trong nháy mắt. Để làm cho nó tồi tệ hơn, một số giá trị trong số đó có thể là tùy chọn, có nghĩa là chúng ta sẽ cần tạo một loạt các hàm tạo quá tải để đối phó với tất cả các kết hợp có thể có hoặc chúng ta sẽ phải chuyển null cho hàm tạo của chúng ta (xấu quá!).

Bạn có thể nghĩ rằng chúng ta có thể giảm thiểu sự cố bằng cách gọi một hàm tạo no-arg và sau đó thiết lập tài khoản thông qua các phương thức setter. Tuy nhiên, điều đó khiến chúng ta mở ra một vấn đề khác - điều gì sẽ xảy ra nếu một nhà phát triển quên gọi một phương thức setter cụ thể? Chúng ta có thể kết thúc với một đối tượng chỉ được khởi tạo một phần và một lần nữa, trình biên dịch sẽ không gặp bất kỳ vấn đề nào với nó.

Do đó, có hai vấn đề cụ thể mà chúng ta cần giải quyết:<br >
      1.Quá nhiều đối số của hàm tạo.<br >
      2.Trạng thái đối tượng không chính xác.<br >
=> Đây là lúc mà Builder pattern phát huy tác dụng.

## **The Pattern**

Builder pattern cho phép chúng ta viết mã dễ đọc, dễ hiểu để thiết lập các đối tượng phức tạp. Nó thường được triển khai với một giao diện dễ nhìn, mà bạn có thể đã thấy trong các công cụ như Apache Camel hoặc Hamcrest. Class builder sẽ chứa tất cả các trường tồn tại trên chính lớp BankAccount. Chúng ta sẽ định cấu hình tất cả các trường mà chúng ta muốn trên class builder và sau đó chúng ta sẽ sử dụng class builder để tạo tài khoản. Đồng thời, chúng ta sẽ xóa phương thức khởi tạo public constructor khỏi lớp BankAccount và thay thế nó bằng một phương thức khởi tạo riêng để chỉ có thể tạo tài khoản thông qua class builder.

 Nó trông như thế này.
 
```
public class BankAccount {

    public static class Builder {

        private long accountNumber; //This is important, so we'll pass it to the constructor.
        private String owner;
        private String branch;
        private double balance;
        private double interestRate;

        public Builder(long accountNumber) {
            this.accountNumber = accountNumber;
        }

        public Builder withOwner(String owner){
            this.owner = owner;

            return this;  //By returning the builder each time, we can create a fluent interface.
        }

        public Builder atBranch(String branch){
            this.branch = branch;

            return this;
        }

        public Builder openingBalance(double balance){
            this.balance = balance;

            return this;
        }

        public Builder atRate(double interestRate){
            this.interestRate = interestRate;

            return this;
        }

        public BankAccount build(){
            //Here we create the actual bank account object, which is always in a fully initialised state when it's returned.
            BankAccount account = new BankAccount();  //Since the builder is in the BankAccount class, we can invoke its private constructor.
            account.accountNumber = this.accountNumber;
            account.owner = this.owner;
            account.branch = this.branch;
            account.balance = this.balance;
            account.interestRate = this.interestRate;

            return account;
        }
    }

    //Fields omitted for brevity.
    private BankAccount() {
        //Constructor is now private.
    }

    //Getters and setters omitted for brevity.

}
```

Bây giờ chúng ta có thể tạo tài khoản mới như sau.

```
BankAccount account = new BankAccount.Builder(1234L)
            .withOwner("Marge")
            .atBranch("Springfield")
            .openingBalance(100)
            .atRate(2.5)
            .build();

BankAccount anotherAccount = new BankAccount.Builder(4567L)
            .withOwner("Homer")
            .atBranch("Springfield")
            .openingBalance(100)
            .atRate(2.5)
            .build();
```

Mã này có dài dòng hơn không? Đúng. Nó rõ ràng hơn? Đúng. Nó có tốt hơn không? Vì một phần lớn thời gian của chúng ta dành để đọc mã hơn là viết nó nên tôi khá chắc chắn là có.

## **Tổng kết**
Chúng ta đã làm việc thông qua một ví dụ mà mã bắt đầu đơn giản, và sau đó trở nên phức tạp hơn. Sau đó, chúng ta sử dụng mẫu Builder để giải quyết các vấn đề mà chúng ta đã phát hiện ra.

Nếu bạn thấy mình trong tình huống tiếp tục thêm các tham số mới vào một constructor, dẫn đến mã trở nên dễ bị lỗi và khó đọc, có lẽ đây là thời điểm tốt để lùi lại một bước và xem xét việc cấu trúc lại mã của bạn để sử dụng builder pattern  .

Tham khảo : https://dzone.com/articles/design-patterns-the-builder-pattern