Chắc bạn đang nghĩ: "Lại mấy bài về DRY, chưa chán à?

Có thể bạn đúng. Tuy nhiên tôi cũng thấy rất nhiều developer (cả junior và senior) áp dụng DRY rất máy móc, kiểu bất cứ lúc nào cũng áp dụng được ý.

Thực tế là chúng ta đã có rất nhiều bài viết về DRY trên internet, và nếu ai chưa biết thì DRY có nghĩa là "*Don't Repeat Yourselft*", được giới thiệu lần đầu tiên trong cuốn *The Pragmatic Programmer*.

Nguyên lý này thực ra đã được biết và áp dụng trước khi cuốn sách ra đời. Tuy nhiên *The Pragmatic Programmer* đã định nghĩa và đặt tên cho nó.

### Don’t repeat knowledge
Dù nghe đơn giản, nhưng *Don't Repeat Yourself* thực tế lại mang nghĩa khá rộng. Trong cuốn *The Pragmatic Programmer*, DRY được định nghĩa như sau:

>> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

Nghe hay đấy, nhưng đọc kỹ lại một chút, thì *piece of knowledge* có nghĩa là gì? Là *business domain* mà ứng dụng đang xây dựng, hay là một giải thuật.

Để đơn giản tôi sẽ dùng một ví dụ về *e-commerce*, một class *shipment* và nó hoạt động như một phần của *business domain* của ứng dụng. Một *shipment* là một cái gì đó mà thực tế được công ty sử dụng để gửi sản phẩm đến khách hàng. Nó là một phần trong mô hình kinh doanh của công ty.

Bởi vì thế nên logic của class *shipment* này chỉ nên xuất hiện một lần duy nhất trong ứng dụng.

Lý do rất rõ ràng: hãy tưởng tượng bạn cần gửi hàng về kho hàng, thì bạn sẽ cần *trigger* logic này rất nhiều lần, ở rất nhiều nơi trong ứng dụng, hay nói cách khác logic này đang được sử dụng lặp đi lặp lại nhiều lần, giả sử là 80 lần đi.

Rồi bỗng nhiên sếp đến và yêu cầu bạn thay đổi logic. Thay vì gửi hàng đến một kho hàng thì giờ bạn phải gửi đến 3.

Kết quả sẽ như nào? Bạn sẽ phải mất thời gian thay đổi logic, không phải 1 mà 80 lần. Nó cực kỳ lãng phí thời gian.

Giải pháp: như định nghĩa trên có nói, đó là *single representation of knowledge*, tức là đặt logic của *shipment* ở một nơi và sử dụng đại diện của nó ở bất cứ nơi nào bạn muốn. Trong OOP, gửi hàng có thể là một phương thức của class *Shipment* mà bạn có thể tái sử dụng ở tương lai.

Một ví dụ đơn giản khác là tưởng tượng bạn đang code một class A để duyệt cây nhị phân. Thì đây có thể xem như *knowledge* (kiến thức, hiểu biết): đó là một giải thuật, và nó chỉ nên được định nghĩa một lần thôi, còn đại diện của phần kiến thức này có thể dùng ở bất kỳ đâu (trong trường hợp này là class A).

### DRY and code duplication
Vậy túm lại DRY là về thông tin, về tri thức chứ không phải là *business logic*.

Hãy cùng làm rõ đoạn này:

```php
interface Product
{
    public function displayPrice();
}

class PlasticDuck implements Product
{
    /** @var int */
    private $price;

    public function __construct(int $price)
    {
        $this->price = $price;
    }

    public function displayPrice()
    {
        echo sprintf("The price of this plastic duck is %d euros!", $this->price);
    }
}

$plasticDuck = new PlasticDuck(2);
$plasticDuck->displayPrice();
```

Đoạn code này trông khá ổn đấy chứ? Nhưng một đồng nghiệp của bạn, tạm gọi là *Bảnh* đi, *Bảnh* không nghĩ vậy. *Bảnh* nhìn đoạn code rồi chạy lại chỗ bạn và hét lên:

1. Từ *price* lặp lại tận 6 lần kìa
2. Phương thức *displayPrice()* lặp lại ở cả interface, trong class và được gọi ở *runtime*

Nôm na *Bảnh* là thanh niên *expert beginner* nửa mùa, và đếch biết gì về OOP hết.

Tôi hiểu bạn, và bất kỳ developer ổn áp nào cũng có thể trả lời như sau:
1. *price* là một biến (thuộc tính), nó lặp lại trong code là lẽ đương nhiên, không thì xài kiểu gì
2. Logic của phương thức *displayPrice()* chỉ được viết một lần, tức là không có phần kiến thức hay giải thuật nào bị lặp cả.

Tức là không có việc vi phạm DRY ở đây. *Bảnh* chỉ biết câm nín lặng nhìn *aura* của bạn đang tỏa sáng khắp phòng.

*Bảnh* rất giận dữ vì bạn làm *Bảnh* mất mặt, bạn dám chê bai kiến thức của *Bảnh*. *Bảnh* bèn tra google về DRY, xem mấy đoạn code khác mà bạn viết rồi hùng hổ quay lại chỗ bạn:

```php
class CsvValidation
{
    public function validateProduct(array $product)
    {
        if (!isset($product['color'])) {
            throw new \Exception('Import fail: the product attribute color is missing');
        }

        if (!isset($product['size'])) {
            throw new \Exception('Import fail: the product attribute size is missing');
        }

        if (!isset($product['type'])) {
            throw new \Exception('Import fail: the product attribute type is missing');
        }
    }
}
```

*Bảnh* lấy hết sức bình sinh và hét lên: "Thằng ngu! Đây không phải là DRY". Còn bạn, đang đọc bài này, trả lời: "Nhưng *business logic*, tri thức, vẫn không bị lặp!".

Một lần nữa, bạn lại đúng. Phương thức *validate* CSV chỉ viết ở một chỗ (chính là function validateProduct()). Nó là tri thức, và nó không lặp.

*Bảnh* vẫn không đồng ý. "Vậy đống *if* kia thì sao? Rõ là vi phạm DRY còn gì nữa?"

Bạn vẫn bình tĩnh trả lời:

"Ừm, không. Không phải. Tôi có thể gọi đó là việc lặp code không cần thiết, nhưng nó không vi phạm nguyên lý DRY."

Và bất chợt bạn gõ đoạn code sau, nhanh như chớp:

```php
class CsvValidation
{
    private $productAttributes = [
        'color',
        'size',
        'type',
    ];

    public function validateProduct(array $product)
    {
        foreach ($this->productAttributes as $attribute) {
            if (!isset($product[$attribute])) {
                throw new \Exception(sprintf('Import fail: the product attribute %s is missing', $attribute));
            }
        }
    }
}
```

Trông ổn hơn nhỉ?

Tóm tắt:

1. Lặp tri thức tức là chắc chắn vi phạm DRY. 

2. Lặp code không có nghĩa là vi phạm DRY.

*Bảnh* vẫn chưa thỏa mãn. Và bạn chốt một câu cuối cùng:

"Hầu hết mọi người nghĩ như cậu, DRY tức là không lặp code. Nhưng thực tế mục đích của nó không phải như vậy. Ý tưởng đằng sau DRY còn tuyệt vời hơn thế rất nhiều."

Ai nói? Đọc *The Pragmatic Programmer* đi nhé.

### DRY mọi thứ: công thức thảm họa
#### Tính nguy hiểm của việc tổng quát hóa
Hãy xem thêm nhiều ví dụ thực tế khác.

Tôi đang xây dựng một ứng dụng cho các nhà làm phim. Họ có thể upload phim và metadata (tên phim, diễn viên, ...). Những thông tin này sẽ được hiển thị trên một trang phim trực tuyến.

Ứng dụng MVC trông như này:

![](https://images.viblo.asia/65385669-27a5-4f17-bcec-0975e548003a.png)

Một đội phát triển nội dung của công ty chúng tôi cũng muốn dùng ứng dụng này để tạo metadata cho phim vì nhà làm phim không muốn tự mình làm việc đó.

Nhà làm phim và đội phát triển nội dung có nhu cầu khác nhau. Team nội dung muốn dùng CMS, còn nhà làm phim thì không.

Bởi vậy chúng tôi quyết định tạo ra 2 giao diện:

1. Một cái không có hướng dẫn và giải thích, chủ yếu là nhập nội dung nhanh nhất có thể, dành cho team nội dung
2. Cái kia trình bày mọi thứ mọi cần làm với một cách tiếp cận thân thiện cho các nhà làm phim.

Như này:

![](https://images.viblo.asia/a6163520-d686-48fe-b338-b1196dcd3b02.png)

Chúng tôi giả sử các controller sẽ giống nhau ở cả 2 ứng dụng. Điều này có vẻ vi phạm nguyên tắc DRY khá rõ ràng: views và controller được lặp đi lặp lại ở nhiều nơi.

Liệu còn giải pháp khác không? Chúng ta có thể nhóm những logic chung bằng cách sử dụng các template, đặt vào trong một *abstract class*. Tuy nhiên điều này sẽ khiến các controller bị phụ thuộc. Thay đổi *abstract class* thì mọi controller cũng sẽ phải thay đổi theo.

Về cơ bản, nếu lạm dụng DRY sẽ dẫn đến 2 kết quả:

1. Tight coupling
2. Phức tạp hóa vấn đề

Mà rõ ràng bạn không muốn có những điều này trong ứng dụng.

#### Tối ưu hóa quá mức
Bạn không nên áp dụng DRY nếu *business logic* không có đoạn nào bị lặp cả. Tất nhiên là còn tùy trường hợp, tuy nhiên về cơ bản nếu cố áp dụng DRY cho những thứ mà chỉ dùng một lần có thể dẫn đến việc tối ưu hóa quá mức.

Bạn thường khái quát hóa như vậy với lý do là *có thể sau này sẽ có ích*, nhưng xin đừng làm như vậy. Tại sao? (Ở đây tôi có thể trả lời ngắn gọn bằng một quy tắc khác là [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it))

Bạn bỏ thời gian để tạo *abstract class* mà có thể chỉ dùng ở một chỗ. Trong khi business sẽ thay đổi rất nhanh, rất có thể bạn đang tự tạo thêm những sự phức tạp không đáng có, và *tight coupling* code một cách không cần thiết.

Lặp code và tái sử dụng code là 2 việc khác nhau. DRY nói rằng bạn không nên để lặp tri thức, chứ không nói rằng bạn nên viết theo kiểu tái sử dụng mọi thứ.

Code chi tiết, đừng thử tổng quát hóa vấn đề. Cho dù quản lý muốn 90% ứng dụng của bạn có thể *reusable* thì thực  tế điều này là không thể.

Hai chức năng lúc mới đầu có thể khá tương tự, nhưng có thể rất khác biệt trong tương lai. Code cho nó chạy đã, rồi xong áp dụng các nguyên tắc mà bạn biết (DRY, SOLID, ...) để refactor. Luôn nhớ thêm 2 quy tắc sau: KISS (Keep it simple, stupid) và YAGNI (You ain't gonna need it).

```php
class Shipment
{
     public $deliveryTime = 4; //in days

     public function calculateDeliveryDay(): DateTime
     {
         return new \DateTime("now +{$this->deliveryTime} day");
     }
}

/** Order return of a customer */
class OrderReturn
{
    public $returnLimit = 4; //in days

    public function calculateLastReturnDay(): DateTime
    {
         return new \DateTime("now +{$this->returnLimit} day");
    }
}
```

Bạn thử nhìn đoạn code trên xem, mới nhìn thì có vẻ như là lặp code rồi, vi phạm DRY rồi. Nhưng thực tế, *Shipment::calculateDeliveryDay()* và *Return::calculateLastReturnDay()* là 2 chức năng riêng biệt, chẳng liên quan gì nhau cả.

### Tổng kết
DRY không chỉ nói về code, bạn không nên lặp lại tri thức trong bất cứ khía cạnh nào của project.

Ý tưởng của DRY bắt nguồn từ lý thuyết đơn giản: bạn không nên phải cập nhật nhiều lần khi chỉ có một thay đổi xảy ra.

Và hãy nhớ, DRY cũng chỉ là một nguyên tắc. Và xài nó thì không free chút nào cả, cái gì cũng có giá của nó. 

Tham khảo:
[https://web-techno.net/dry-principle-explained/](https://web-techno.net/dry-principle-explained/)

[https://adamcod.es/2017/07/14/dry-is-a-fallacy.html](https://adamcod.es/2017/07/14/dry-is-a-fallacy.html)