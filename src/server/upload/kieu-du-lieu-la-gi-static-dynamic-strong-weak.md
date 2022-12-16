![image.png](https://images.viblo.asia/cf87eff8-07b1-46bb-a8cc-fc51cb293d5b.png)

Bài viết này sẽ giải thích cho bạn hiểu về kiểu dữ liệu. Những thuật ngữ như là “static”, “dynamic”, “strong” , “weak” thì liên quan gì đến kiểu dữ liệu và tại sao chúng ta lại cần quan tâm đến chúng. Không dài dòng nữa chúng ta cùng khám phá thôi!

## 1. Kiểu dữ liệu là gì?

Nếu bạn từng tiếp xúc với bất kỳ ngôn ngữ lập trình nào rồi thì chắc hẳn bạn sẽ không lạ gì với những thuật ngữ như là biến (variables), tham số(parameter) hoặc những giá trị trả về từ hàm. Chúng có ở khắp nơi trong thế giới lập trình. Nhưng nhiều lập trình viên sử dụng những thuật ngữ đó theo thói quen mà không thực sự hiểu chúng đang chỉ định điều gì cho máy tính.

Khi định nghĩa các giá trị , một lập trình viên đang chỉ định cho máy tính biết một biến sẽ được đặt tên là gì đồng thời cũng cho máy tính biết kiểu của dữ liệu đó. Nó có phải là một số nguyên? hay là một string? Kiểu dữ liệu đơn giản chỉ là kiểu của dữ liệu mà bạn đang xử lý.

Nếu bạn đã từng tìm kiếm thông tin trên internet về kiểu dữ liệu thì đôi khi bạn sẽ bị rối bởi các định nghĩa như kiểu dữ liệu "static" vs "dynamic", kiểu dữ liệu "strong" vs "weak". Chúng là những thứ khác nhau và chúng ta sẽ tìm hiểu những thuật ngữ đó trong bài viết này.

Hãy nhớ rằng một ngôn ngữ có thể bao gồm sự kết hợp của cả kiểu dữ liệu static/dynamic và strong/weak. Nhưng trước khi tìm hiểu sâu về những thuật ngữ này thì tại sao chúng ta lại cần quan tâm đến chúng?

## 2. Tại sao cần quan tâm đến kiểu dữ liệu?

Mỗi ngôn ngữ lập trình đều có một hệ thống kiểu dữ liệu. Nếu không có điều đó, máy tính sẽ không biết cách thể hiện dữ liệu trong chương trình của chúng ta. Nó sẽ không biết cách làm sao để lấy kiểu dữ liệu này hay thêm vào kiểu dữ liệu khác, thậm chí nó cũng không biết cách chứa những dữ liệu ở đâu. Bằng cách định nghĩa một biến là số nguyên chẳng hạn, máy tính sẽ biết cần bao nhiêu byte để đại diện cho giá trị này và quan trọng hơn là biết được cách thực hiện những phương thức trên dữ liệu đó. Việc cộng hai số nguyên sẽ thực hiện phương thức khác với việc thêm hai số nguyên đó vào một chuỗi. Cách duy nhất để máy tính biết cách xử lý dữ liệu đó là cho chúng biết kiểu của dữ liệu mà chúng phải xử lý.

Bạn có thể bắt đầu lập trình mà không cần quan tâm nhiều đến hệ thống dữ liệu của ngôn ngữ. Vì đó là một phần vẻ đẹp của những ngôn ngữ  cao cấp. Tuy nhiên việc hiểu được kiểu của dữ liệu và biết cách thể hiện chúng sẽ mang lại cho bạn những lới ích to lớn như danh sách được liệt kê dưới đây.

* Bạn sẽ có những chương trình hiệu quả hơn nhờ tối ưu được bộ nhớ và nơi lưu trữ. Bằng cách biết rằng một mảng của số nguyên sẽ ít tốn không gian hơn một mảng của số lẻ thì cũng đã giúp bạn tiết kiệm hàng kilobytes thậm chí megabyte khi xử lý những mảng lớn trong bộ nhớ hay ổ cứng.
* Việc hiểu được kiểu dữ liệu sẽ giúp bạn giải mã được những "con bug" và hiểu hơn những vấn đề liên quan đến kiểu dữ liệu. Ví dụ như khi chương trình báo lỗi không thể công được hai số vì một trong hai số là kiểu chuỗi thì bạn cũng hiểu được lý do tại sao. Hiểu được điều này giúp bạn tránh mắc những lỗi tương tự.
* Khi bạn hiểu về cách kiểu hoạt động, bạn giống như Neo trong bộ phim "The Matrix" biết cách bẻ cong những quy tắc. Nghe khá là ngầu ha!!!

## 3. Hệ thống kiểu dữ liệu static vs dynamic

![image.png](https://images.viblo.asia/a8492b05-b10f-4ecc-8d18-bdf2dc862398.png)

Kiểu dữ liệu là cách mà chúng ta bảo máy tính kiểu của dữ liệu mà chúng phải xử lý. Tuy nhiên khi một lập trình viên nói về hệ thống kiểu của một ngôn ngữ lập trình thì họ đang đề cập đến đến điều gì?

Những ngôn ngữ kiểu dữ liệu static là những ngôn ngữ yêu cầu lập trình viên phải định nghĩa rõ ràng một kiểu dữ liệu khi họ tạo ra nó (có thể là một biến, tham số, giá trị trả về,...) . Thông thường, những kiểu này cố định trong vòng đời của chương trình và chúng sẽ không thay đổi. Hãy xem qua ví dụ dưới đây:

```
int myNumber = 42;              // integer data type
string name = "Rocky Balboa";   // string data type
final double PI = 3.141592;     // double data type

// Function takes two integer data types, returns an integer data type
public int add(int a, int b) {
    return a + b;
}
```

Trong ví dụ trên chúng ta có một vài biến được định nghĩa và một ví dụ về một hàm cộng hai số lại với nhau. Như các bạn có thể thấy, chúng ta phải nói rõ ràng cách xử lý với số nguyên, chuỗi và số lẻ. Nếu không có những gợi ý đó, trình biên dịch sẽ không biết phải làm gì với `myNumber`. Nó chỉ là cái tên có thể có nghĩa với chúng ta nhưng với máy tính thì không.

Hãy đối chiếu điều này với một ngôn ngữ kiểu dữ liệu dynamic với ví dụ bên dưới:

```
$myNumber = 42;           // integer data type
$name = "Rocky Balboa";   // string data type
$PI = 3.141592;           // float data type

// Function takes two integer data types, returns an integer data type
function add($a, $b) {
    return $a + $b;
}
```

Trong ví dụ bên trên, chúng ta thấy biến của PHP không được nói rõ ràng kiểu của dữ liệu của chúng là gì. Vậy làm sao nó biết được? Trình biên dịch tự suy luận dựa trên giá trị mà nó được gán. Nó có thể đoán chính xác rằng `$myNumber` là một số nguyên bởi vì giá trị 42 là một số nguyên.

Còn về hàm thì sao? Nó cũng tự suy dựa trên giá trị được chuyền qua nó. Điều này có nghĩa là `add()` có thể lấy 2 số nguyên và trả về một số nguyên hay lấy hai floats trả về một foat. Kiểu được tự suy và thậm chí có thể thay đổi trong thời gian chạy. Trong cùng một chương trình, chúng ta có thể nói rằng `$myNumber` bằng với `Tom` và có thể chuyển đổi biến đó thành string.

## 4. Nên chọn static hay dynamic?

Trong trường hợp của kiểu dữ liệu static, bằng cách nói rõ với trình biên dịch từ đầu kiểu của dữ liệu mà chúng ta xử lý, nó có thể bắt được những lỗi phổ biến và sai sót của chương trình rất sớm trước khi chương trình được phát hành. Nếu bạn cộng một số nguyên với một chuỗi thì trình biên dịch sẽ phát hiện lỗi đó ngay thời gian biên dịch và sẽ không cho bạn kết thúc chương trình. Càng phát hiện ra lỗi sớm thì càng tốt cho code của bạn cũng như giảm được chi phí để fix bug sau khi chương trình được phát hành.

Vậy thì static sẽ tốt hơn đúng không? Cũng chưa chắc bởi vì bạn phải đánh đổi bằng việc phải định nghĩa tất cả mọi thứ trước khi bạn sử dụng nó. Bạn sẽ phải viết code nhiều hơn, bạn phải biết kiểu của dữ liệu trước khi xử lý chúng và bạn cũng phải biết điều gì sẽ xảy ra với những phương thức. `1/3` bạn sẽ nhận được `0` chứ không phải là `.33333`

Ngôn ngữ dynamic thì cho bạn nhiều sự linh hoạt hơn. Chúng thường được miêu tả là ngôn ngữ "đa sầu đa cảm". Ví dụ trong PHP, `1/3` bạn sẽ nhận được `.33333` như mong đợi. Vấn đề ở đây là nếu trình thông dịch đoán sai về kiểu dữ liệu, bạn phải tự biết điều đó. Vì không cần định nghĩa mọi thứ nên code của ngôn ngữ dynamic có xu hướng nhiều lỗi hơn. Kiểu dữ liệu thông thường được xác định tại thời gian chạy. Điều này khiến cho việc bắt lỗi khó hơn. Cho đến khi chương trình tới giai đoạn production environment (môi trường mà ứng dụng chạy thật với người dùng và dữ liệu thật) thì chúng ta mới phát hiện được lỗi. Chương trình có thể chạy tốt trên local environment (Môi trường local nằm trong máy của một developer) nhưng đến production environment thì có khá nhiều khác biệt dẫn đến trình thông dich sẽ tự suy nhiều hướng khác nhau.

Tóm lại, các kiểu dữ liệu static cung cấp cho bạn một môi trường nghiêm ngặt do đó code  của bạn ít lỗi hơn. Các ngôn ngữ dynamic cung cấp cho bạn sự linh hoạt và khả năng viết code nhanh hơn, nhưng có thể dẫn đến nhiều lỗi hơn nếu bạn không cẩn thận trong việc kiểm tra các kiểu của mình.

## 5. Hệ thống kiểu Strong vs Weak

![image.png](https://images.viblo.asia/6f17a195-5a27-445a-8ee5-1a87e93b5f44.png)

Như đã đề cập ở trên, kiểu dữ liệu strong và weak thường bị nhầm lẫn với static và dynamic. Mọi người có xu hướng nhầm static đồng nghĩa với strong và dynamic đồng nghĩa với weak. Nhưng điều đó thì không đúng.

Kiểu dữ liệu strong/weak là cách mà ngôn ngữ xử lý giá trị dựa trên những phương thức của nó. Liệu ngôn ngữ sẽ ngầm giả định khi bạn làm việc với kiểu dữ liệu và giúp bạn xử lý hay nó sẽ dừng lại và không biết làm gì hết? Chúng ta hãy xem một ví dụ bên dưới nhé!

```
int main() {
    int a = 5;
    std::string b = "5";

    // Houston, we have a problem!
    std::cout << (a + b);
    return 0;
}
```

Trong ví dụ bên trên, chúng ta đang cố gắng cộng một số nguyên và chuỗi với nhau. Ngôn ngữ sẽ không thực hiện việc ép kiểu biến `b` thành số nguyên và cộng hai số lại với nhau mà nó đơn giản chỉ gắn cờ báo lỗi rồi thoát ra ngay. Việc kiểm tra này được thực hiện khi chúng ta cố gắng biên dịch chương trình. Đây là ví dụ của kiểu strong.

Một ngôn ngữ kiểu weak sẽ cố gắng hiểu ý đồ của lập trình viên và tự động ép kiểu để thực hiện các phương thức. Hãy xem thử ví dụ giống như trên nhưng được viết trong JavaScript - một ngôn ngữ kiểu weak xem sao nhé!

```
const a = 5;
const b = "5";

console.log((a + b));
```

Nếu bạn hiểu về JavaScript và những tính kỳ quặc của nó thì bạn sẽ biết là đoạn code bên trên sẽ hoạt động bình thường mà không gặp vấn đề gì. Nó vẫn chạy mà không cảnh báo bạn cũng không cho ra output là 10 như bạn mong đợi. :)))) Javascript sẽ thực hiện việc ép kiểu, chuyển kiểu này sang kiểu kia để phương thức bên dưới được thực hiện. Trong trường hợp này nó chuyển `a` thành kiểu string và output sẽ là `55` (kiểu string).

Hiểu được những thuật ngữ này thì bạn có thể thấy được là mặc dù python là một kiểu dynamic nhưng đồng thời nó  cũng là kiểu strong. Chúng ta không cần phải định nghĩa rõ ràng kiểu khi chúng ta tạo một giá trị nhưng nếu bạn cố gắng thực hiện việc ép kiểu thì nó sẽ tự động gắn cờ và thoát ra ngay.

## 6. Nên chọn kiểu strong hay weak?

Ngôn ngữ strong là những ngôn ngữ nghiêm ngặt. Nó đảm bảo thực hiện đúng những gì lập trình viên mong muốn. Điều này giúp code của bạn mạnh hơn cũng như ít bị lỗi hơn trong production environment bù lại sẽ tốn nhiều thời gian hơn trong việc viết code.

Ngôn ngữ weak mang lại nhiều sự linh hoạt hơn cho lập trình viên. Tuy nhiên đôi khi nó khiến máy tính thực hiện những giả định không giống với ý định của lập trình viên.

## 7. Chọn kiểu phù hợp với dự án của bạn

Có nhiều yếu tố ảnh hưởng đến việc lựa chọn một ngôn ngữ lập trình cho dự án. Và yếu tố về hệ thống kiểu có vẻ như không được nhiều sự ưu tiên từ mọi người. Chúng ta thường cân nhắc về những thứ quan trọng hơn như là:

* Ngôn ngữ mà những lập trình viên thành thạo hơn
* Ngôn ngữ cung cấp nhiều tính năng phù hợp với dự án của bạn
* Ngôn ngữ có nhiều công cụ có sẵn hỗ trợ cho việc phát triển nhanh hơn

Tuy vậy, hãy nhớ rằng nếu bạn đang thực hiện một dự án quan trọng cần sự nghiêm ngặt, sử dụng hiệu quả bộ nhớ cao và những lỗi phải được phát hiện sớm thì bạn có thể xem xét qua kiểu static. Nếu ngôn ngữ của bạn không nên đưa ra những giả định và yêu cầu sự hướng dẫn chính xác để giúp những thuật toán quan trọng bạn cũng có thể xem xét kiểu strong.

Tuy nhiên, nếu bạn đang tìm kiếm sự nhanh chóng và linh hoạt thì ngôn ngữ kiểu dynamic hoặc weak có thể phù hợp với ban.

Hoặc bạn có thể chọn một ngôn ngữ kết hợp được cả hai. Đây là lý do tại sao Python lại được chọn nhiều như vậy,

Hy vọng bài viết trên sẽ giúp bạn hiểu rõ hơn về kiểu dữ liệu và có thêm nhiều thông tin trong việc đưa ra lựa chọn ngôn ngữ thuộc kiểu nào trong dự án kế tiếp. Cảm ơn bạn đã dành thời gian để đọc bài viết này, nếu thấy hữu ích thì hay share cho nhiều người biết hơn nữa nhé!

> Xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/kieu-du-lieu-la-gi/)