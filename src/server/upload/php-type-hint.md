## Giới thiệu. 
- PHP là một ngôn ngữ lập trình rất phổ biến và rất nhiều người sử dụng. Tuy nhiên một tính năng rất hay ho của PHP, được phát triển, và được coi như là một sức mạnh thể hiện tính linh động của ngôn ngữ này. chúng ta hãy đến một số ví dụ, để thể hiện sự "ảo diệu" của nó. 
```php
$a = '1';
$b = $a*2;
echo $b; //2
echo gettype($a) // string
echo gettype($b) // integer
```
- Sự chuyển hóa kiểu giữa kiểu string và integer là điều dễ gặp, và hay gặp nhất, nó thể hiện sự linh hoạt trong việc sử dụng kiểu dữ liệu, và tùy theo hoàn cảnh, thì kiểu của biến sẽ được chuyển đổi một cách linh hoạt. Tuy nhiên, cũng là do "sự chuyển đổi linh hoạt kiểu" này, khiến cho nhiều người viết code php càng ẩu tả, tạo ra sự "nhập nhằng" và không có cái gì là code sạch, và code thơm cả, tất cả như một đống vậy. 

- Nếu bắt đầu học, và làm lập trình với ngôn ngữ php, thì anh em đã quá quen với kiểu chuyển đổi linh hoạt của nó rồi, nên ông nào cẩn thận thì dùng  *gettype*, *instanceof*, *is_string*, *is_int*..etc, các hàm như vậy để kiểm tra dữ liệu truyền vào. xem có đúng kiểu dữ liệu mà mình cẩn xử lý hay không.
Còn ông nào khác, thì **đây là hàm mình viết ra, và mình biết rõ phải truyền cái gì vào, và dùng nó để làm gì, còn ai mà sử dụng lại thì tự mà viết vào, hay là viết một hàm khác**.

Vậy có cách nào đó, mà code php nhìn ngon lành cành đào hơn không? 

## Nội dung 
- PHP type hint được giới thiệu bắt đầu ở phiên bản php5. Nó còn được biết đến là parameters declare type. VÌ nó, hầu như chỉ giành để khai báo kiểu của tham số truyền vào, và còn nhiều hạn chế. type hint ở php7 đã hoàn thiện hơn, và nhìn có vẻ như là đã tương đối so sánh được với các ngôn ngữ khác r.

Chúng ta hãy bắt đầu tìm hiểu, vậy, chúng ta có thể sử dụng type hint trong php như nào. 

### Mức độ đơn giản, sử dụng comment. 
- Ở php, các function thường được đề nghị viết document cho chúng, ví dụ cụ thể như sau: 
    ```php
    /**
    * Sum of 2 numbers
    * @param int $a
    * @param int $b
    * @return int
    public function sum($a, $b)
    {
        return $a + $b;
    }
    ```
- Ở mức đơn giản, thì một khối comment block của php, sẽ như ví dụ trên, ngoài ra có thể còn có các keyword khác, như @throws, @package, @sumary...etc 
- Ưu điểm của phương án này là gì? Chúng ta thấy ngay, khi viết comment vào trong function, thì ít ra chúng ta có thể dựa vào comment này mà xử lý như đầu vào của function là gì, function thực hiện chức năng gì, và function trả về giá trị như thế nào.  Về cơ bản thì khi có comment, chúng ta có thể không cần thiết phải đọc nội dung logic viết trong hàm, mà chúng ta chỉ cần đọc comment xem chức năng của hàm thực hiện có giống mong muốn của chúng ta không, và các tham số đầu vào như thế nào, chúng ta có được đầu ra như mong muốn không? Nói chung, khi có comment, chức năng có hàm tương đối rõ ràng hơn. 
- Vậy nhược điểm là gì. Gọi là nhược điểm thì hoàn toàn là không đúng. Nhưng trong ngôn ngữ lập trình ruby, có một tư tưởng rất hay: **CHỈ CODE LỞM, MỚI CẦN CÓ COMMENT,VÌ CODE HỊN, CHÍNH BẢN THÂN NÓ ĐÃ THỂ HIỆN NÓ LÀM GÌ RỒI**. Nếu áp dụng sang php, thì tư tưởng ấy chắc vẫn đungs nhỉ? Ở những đoạn logic phức tạp, chúng ta có thể có một vài ghi chú, nhưng nếu cái gì cũng comment, thì có lẽ sẽ vẫn ổn với những lập trình php thôi, vì cái gì nó cũng thành quen rồi. :). 
- Điều hạn chế thứ 2, ở phương pháp này, là bản chất nó hoàn toàn không biết chính xác kiểu truyền vào $a, $b nó có đúng là int như khai báo không, và nếu không , thì nó vẫn thực hiện logic như thường. Ví dụ với hàm sum như định nghĩa ở trên, chúng ta gọi
```php
$c = sum(3.0, 2.1); // 5.1
```
Kết quả vẫn được trả về, mặc dù các biến không có kiểu như mong muốn. Ngạc nhiên chưa? 
[Tìm hiểu thêm về phpDoc ](https://en.wikipedia.org/wiki/PHPDoc)

### Mức độ 2, Khai báo kiểu của tham số truyền vào
- MÌnh thì mình gọi vậy thôi, chứ tiếng anh của nó là Type Declarations
- Được giới thiệu đến cộng đồng ở phiên bản php 5.  Có thể khai báo kiểu của tham số đầu vào như các interfaces, array (bắt đầu từ bản 5.1),  hoặc callable (ở bản php 5.4). Tuy nhiên, nếu giá trị null được sử dụng như là giá trị mặc định của tham số đầu vào, thì function sẽ luôn cho phép gọi tham số ấy là kiểu bất kỳ sau đó. Mặt khác, nếu param có kiểu là một interface, hoặc là một class, thì các class con của nó cũng đươc cho phép như là một kiểu hợp lệ trong tham số truyền vào. 
Ngoài ra, khai báo kiểu của tham số truyền vào (Type Declarations) không được sử dụng với các kiểu cơ bản (scalar) như strinng, integer, các trait cũng không được sử dụng.

Tuy còn nhiều hạn chế, nhưng khai báo kiểu của tham số truyền vào, đã phần nào giúp việc viết code rõ ràng hơn, tuy nhiên, nó (type declarations) chưa thấy được sử dụng nhiều ở php 5.

### Mức độ 3, Khai báo kiểu của tham số truyền vào (Type Declaration), Kiểu của giá trị trả về (Return Type)
- Ở phiên bản php7, việc type hint đã hoàn thiện hơn nhiều, đó là theo mình đánh giá, và trải nghiệm. Tuy việc type hint không chặt chẽ như ở khi sử dụng typesript version 2.0 trở lên, nhưng type hint ở bản này, đã sử dụng được ở mức cơ bản rồi.

- Có gì cải tiến hơn, để php7 được coi là hoàn thiện hơn php5, thì đó phải là **Return Type**, một bổ sung tuyệt vời, cùng với **Type Declaration**, giúp type hint của php trở lên rõ ràng và dễ sử dụng hơn.
- VIệc khai báo kiểu của tham số truyền vào, và kiểu của giá trị trả về, nó không hẳn đã chặt chẽ đến mức gây khó chịu, mà thay vào đó, sử dụng nó, chúng ta tiết kiệm rất nhiều thời gian viết comment. Nó khá đơn giản để sử dụng (ở hầu hết các trường hơp). Có thể khai báo dữ liệu (cả ở tham số và giá trị trả về) với các kiểu cơ bản như string, int, void, bool...etc.
- Giờ đây, thay vì viết comment ở mức độ một như đề cập ở trên, chúng ta hãy thử phong cách code mới với logic lấy tổng 2 số int 
```php
public function sum(int  $a, int $b): int 
{
    return $a + $b;
}
sum(2, 4); // 6
sum(2, '4'); // 6
sum(2.0, 4); // 6
sum(2.1, 4.2); // 6
sum(2.1, 4.8); // 6
```
Qua ví dụ trên, ta thấy gì. 
1. với phép tính 2 với khả chuyển số kiểu string (ở đây là '4' kiểu chuỗi), thì php vẫn chuyển đổi giá trị của string ('4') thành số (4), để thực hiện phép tính. Điều này ở một số ngôn ngữ chặt chẽ về kiểu, thì sẽ không được, mà sẽ báo lỗi sai kiểu của tham số truyền vào. 
2. Với số thực 2.0 thì sẽ được mạnh mẽ chuyển về kiểu của khai báo, ví dụ 2.1 -> (int) 2.1 = 2 và được tính toán như bình thường. Do vậy kết quả của sum(2.1, 4.2) mới bằng 6. 
3. Về mặt bản chất thì việc khai báo tham số đầu vào, và tham số đầu ra, tương tự như việc ép kiểu của tham số truyền vào, và kiểu của tham số đầu ra thôi. Nếu biên dịch code, mà trình biên dịch không thể ép kiểu sang được, trình biên dịch sẽ báo lỗi sai kiểu của tham số truyền vào, hoặc kiểu của giá trị trả về không đúng.

:notebook: 
Khi để giá trị default của param là null, thì giá trị truyền vào phải là kiểu của tham số truyền vào hoặc null.
Ví dụ:
```php
function fu(Foo $a = null): void 
{
    // TODO: code
}
```
Thì tham số truyền vào, phải là một thể hiện của class Foo, hoặc giá trị null. 

:question:  Câu hỏi 
- Vậy với php type hint, giá trị mặc định của tham số phải làm như thế nào ? 
- Nếu muốn truyền một tham số như là một tham số tùy chọn thì như nào?

[ Tài liệu tham khảo](https://mlocati.github.io/articles/php-type-hinting.html)