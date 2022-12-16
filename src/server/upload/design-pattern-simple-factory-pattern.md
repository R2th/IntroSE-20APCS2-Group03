# Factory Design Pattern với ví dụ điển hình
Trong nội dung bài viết này, chúng ta sẽ tìm hiểu về **Factory Design Pattern** với một vài ví dụ trong dự án C#. Kiểu thiết kế Factory Design Pattern là một trong những kiểu thiết kết được sử dụng rất rất phổ biến trong các dự án. Kiểu thiết kế này là một loại của **Creational Design Pattern**. Trước hết mình sẽ tìm hiểu lý thuyết sau đó sẽ áp dụng vào 1 dự án để hiểu cách nó hoạt động nhé

![37F4413E-37CC-4F5A-8B13-24BA2D84994D_ee7c.png](https://images.viblo.asia/aec90de7-6bf6-4826-8ac8-0836af6ddcbd.png)

## Factory Design Pattern là gì?
Về lý thuyết Factory Design Pattern là một cách thiết kế tạo ra một thực thể (Object) để tạo ra nhiều thực thể khác. Có thể nói như vầy, Factory là một lớp (Class) có nhiều hàm (Method), mỗi hàm như vậy sẽ tạo ra các thực thể khác nhau dựa trên giá trị mà chúng ta truyền vào qua các input parameter. 

Trong Factory Design Pattern, chúng ta tạo ra các Object mà không để lộ ra  cách nó tạo ra sao đến phía người dùng. Nguyên lí kiểu thiết kết này đơn giản là như thế, người dùng chỉ cần gọi nó và nhận về Object mình mong muốn mà thôi không cần quan tâm nó tạo bằng cách nào vậy đó. 

## So sánh ví dụ giữa áp dụng và không áp dụng Factory Design Pattern
Để hiểu rõ hơn về kiểu thiết kế này, mình sẽ đưa ra ví dụ về một ứng dụng show ra thông tin chi tiết của thẻ credit cards. Nhìn hình minh họa, chúng ta có 3 lớp là MoneyBack, Titanium, and Platinum. Cả 3 lớp này đều là lớp con của lớp CreditCard. Lớp cha CreditCart có chứa 3 hàm GetCardType, GetCreditLimit, and GetAnnualCharge. Chúng ta yêu cầu khách hàng chọn 1 trong 3 thẻ credit trên, khi chọn xong sẽ in ra những thông tin về loại thẻ đó. Đầu tiên mình sẽ thử không áp dụng Factory Design Pattern để xem hạn chế của việc này nhen.
<img loading="lazy" class="alignnone wp-image-4892" title="Factory Pattern in C#" src="https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-106.png" alt="Factory Pattern in C#" width="715" height="345" srcset="https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-106.png 825w, https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-106-300x145.png 300w, https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-106-768x371.png 768w" sizes="(max-width: 715px) 100vw, 715px">
Đầu tiên, mình cần tạo ra một interface hay một lớp abstract. Vậy chúng ta sẽ tạo 1 interface với tên là CreditCard.cs như sau

```
namespace FactoryDesignPattern
{
    public interface CreditCard
    {
        string GetCardType();
        int GetCreditLimit();
        int GetAnnualCharge();
    }
}
```
Bây giờ sẽ tạo thêm 3 lớp để kế thừa lớp trên này.

```
namespace FactoryDesignPattern
{
    class MoneyBack : CreditCard
    {
        public string GetCardType()
        {
            return "MoneyBack";
        }

        public int GetCreditLimit()
        {
            return 15000;
        }

        public int GetAnnualCharge()
        {
            return 500;
        }
    }
}
```

Có thể thấy rằng lớp MoneyBack này đã cung cấp implementation của các hàm từ lớp interface. Chúng ta làm tương tự với 2 lớp còn lại

```
namespace FactoryDesignPattern
{
    public class Titanium : CreditCard
    {
        public string GetCardType()
        {
            return "Titanium Edge";
        }
        public int GetCreditLimit()
        {
            return 25000;
        }
        public int GetAnnualCharge()
        {
            return 1500;
        }
    }
}
```

```
namespace FactoryDesignPattern
{
    public class Platinum : CreditCard
    {
        public string GetCardType()
        {
            return "Platinum Plus";
        }
        public int GetCreditLimit()
        {
            return 35000;
        }
        public int GetAnnualCharge()
        {
            return 2000;
        }
    }
}
```

Về phía người dùng, chúng ta yêu cầu họ chọn 1 trong các loại thẻ credit cards. Và dựa theo kết quả đó mà chúng ta tạo ra thực thể cho loại credit card đó.

```
using System;
namespace FactoryDesignPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            //Generally we will get the Card Type from UI.
            //Here we are hardcoded the card type
            string cardType = "MoneyBack";

            CreditCard cardDetails = null;

            //Based of the CreditCard Type we are creating the
            //appropriate type instance using if else condition
            if (cardType == "MoneyBack")
            {
                cardDetails = new MoneyBack();
            }
            else if (cardType == "Titanium")
            {
                cardDetails = new Titanium();
            }
            else if (cardType == "Platinum")
            {
                cardDetails = new Platinum();
            }

            if (cardDetails != null)
            {
                Console.WriteLine("CardType : " + cardDetails.GetCardType());
                Console.WriteLine("CreditLimit : " + cardDetails.GetCreditLimit());
                Console.WriteLine("AnnualCharge :" + cardDetails.GetAnnualCharge());
            }
            else
            {
                Console.Write("Invalid Card Type");
            }

            Console.ReadLine();
        }
    }
}
```

Việc triển khai như trên rất đơn giản. Khi chúng ta nhận được giá trị Loại thẻ, thì bằng cách sử dụng điều kiện if-else, chúng ta đang tạo phiên bản Thẻ tín dụng thích hợp. Sau đó, chúng ta chỉ gọi ba phương thức để hiển thị thông tin thẻ tín dụng. Vì vậy, khi bạn chạy ứng dụng, bạn sẽ nhận được kết quả như mong đợi như hình dưới đây.
<img loading="lazy" class="alignnone wp-image-4893" title="Without using Factory Design Pattern in C#" src="https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-107.png" alt="Without using Factory Design Pattern in C#" width="202" height="65">
### Vấn đề cần giải quyết

Kiểu thực thi trên gây ra những vấn đề như sau:
1. Tính phụ thuộc giữa lớp Client (Program) với lớp Product (MoneyBack, Titanium và Platinum)
2. Khi thêm mới một loại thẻ khác, chúng ta phải chỉnh sửa phải Main, thêm 1 dòng điều kiện if-else này kia, điều này khá lãng phí và khó testing và quản lí sau này

### Áp dụng mô hình Factory Design Pattern
Như đã nói ở trên, kiểu thiết kế này tách riêng việc tạo thực thể ra khỏi phía client, do đó phía client không cần phải quan tâm thực thể nó cần tạo ra như thế nào. Nhìn vào phía dưới, lớp Factory đảm nhận việc tạo và trả lại thực thể cần thiết, nó có một hàm static nhận kiểu dữ liệu string, giá trị này dùng để cho nó biết thực thể nào cần được tạo ra và trả lại cho phía người dùng

<img src="https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-108.png" loading="lazy" class="alignnone wp-image-4894" title="Factory Design Pattern Implementation in C#" alt="Factory Design Pattern Implementation in C#" width="522" height="419" srcset="https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-108.png 599w, https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-108-300x241.png 300w" sizes="(max-width: 522px) 100vw, 522px">

Cho nên phía người dùng tạo ra các thực thể thông qua thằng Factory này. Ví dụ nếu người dùng muốn tạo ra thực thể Platinum Credit, thì chỉ cần truyền "Plantinum" vào hàm Static trong Factory như sau: 
<img src="https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-109.png" loading="lazy" class="alignnone wp-image-4895" title="C# Factory Pattern example" alt="C# Factory Pattern example" width="685" height="107" srcset="https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-109.png 723w, https://dotnettutorials.net/wp-content/uploads/2018/11/word-image-109-300x47.png 300w" sizes="(max-width: 685px) 100vw, 685px">

Đây là đoạn code cho Factory trên 
```
namespace FactoryDesignPattern
{
    class CreditCardFactory
    {
        public static CreditCard GetCreditCard(string cardType)
        {
            CreditCard cardDetails = null;

            if (cardType == "MoneyBack")
            {
                cardDetails = new MoneyBack();
            }
            else if (cardType == "Titanium")
            {
                cardDetails = new Titanium();
            }
            else if (cardType == "Platinum")
            {
                cardDetails = new Platinum();
            }

            return cardDetails;
        }
    }
}
```
và cách người dùng sử dụng nó
```
using System;
namespace FactoryDesignPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            CreditCard cardDetails = CreditCardFactory.GetCreditCard("Platinum");
            
            if (cardDetails != null)
            {
                Console.WriteLine("CardType : " + cardDetails.GetCardType());
                Console.WriteLine("CreditLimit : " + cardDetails.GetCreditLimit());
                Console.WriteLine("AnnualCharge :" + cardDetails.GetAnnualCharge());
            }
            else
            {
                Console.Write("Invalid Card Type");
            }

            Console.ReadLine();
        }
    }
}
```

Kết quả sẽ ra tương tự như đã từng làm, nhưng chúng ta đã áp dụng Factory Design Pattern vào. Những vấn đề trên đã được giải quyết nhưng mô hình này cũng phát sinh một vài vấn đề nữa đó là vẫn có sự phụ thuộc giữa Factory và các lớp Product (MoneyBack, Titanium, and Platinum) cũng như nếu thêm mới loại thẻ thì trong Factory cũng phải thay đổi vẫn thêm 1 điều if-else nữa. Cho nên bài tiếp theo mình sẽ nói đến Factory Method Design Pattern sẽ giải quyết tất cả nhưng vấn đề trên.