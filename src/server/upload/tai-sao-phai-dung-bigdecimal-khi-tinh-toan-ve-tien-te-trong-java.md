Nếu bạn là 1 Java dev, ắt hẳn bạn đã từng làm 1 task về những tính toán liên quan đến tiền bạc, lương thưởng, các loại tài chính...
Nếu bạn dùng float/double cho việc này thì pull request của bạn sẽ ăn max comment thôi, và tất nhiên là bạn sẽ được force về dùng BigDecimal. Nhưng bạn đã tự hỏi tại sao người ta không bao giờ dùng float/double cho những tính toán tài chính mà bắt buộc phải là BigDecimal.

Hãy cùng khám phá vấn đề này với một ví dụ:

Tất cả các giá trị dấu phẩy động (floating-point) có thể đại diện cho một số tiền (bằng đô la và xu) không thể được lưu trữ chính xác như trong bộ nhớ. Vì vậy, nếu chúng ta muốn lưu trữ 0,1 đô la (10 xu), float/double không thể lưu trữ nó như nó được.
Thay vào đó, nhị phân chỉ có thể lưu trữ một giá trị xấp xỉ gần hơn (0,100000001490116119384765625 theo số thập phân). Tầm quan trọng của vấn đề này trở nên đáng kể khi chúng ta lặp đi lặp lại các phép tính số học (nhân hoặc chia) bằng hai kiểu dữ liệu này. Dưới đây, chúng ta sẽ chứng minh điều này có thể trông như thế nào.

Đây là một ví dụ về sự mất chính xác khi sử dụng double:

```
public class TestDoubleDataType {
    public static void main(String[] args) {
        double total = 0.2;
        for (int i = 0; i < 100; i++) {
            total += 0.2;
        }
        System.out.println("total = " + total);
    }
}
```

Output:
```
total = 20.19999999999996

```

Đầu ra phải là 20,20 (20 đô la và 20 xu), nhưng tính toán dấu phẩy động đã làm cho nó 20.19999999999996. Đây là sự mất chính xác (hoặc mất ý nghĩa).

# Nguyên nhân

## Floating-Point (Dấu phẩy động)

Trong tính toán, số học dấu chấm động (floatting-point) là một số học sử dụng một biểu diễn công thức của các số thực như là một xấp xỉ để hỗ trợ một sự cân bằng giữa phạm vi và độ chính xác.

Theo Wikipedia:

> "Whether or not a rational number has a terminating expansion depends on the base. For example, in base-10, the number 1/2 has a terminating expansion (0.5) while the number 1/3 does not (0.333…). In base-2 only rationals with denominators that are powers of 2 (such as 1/2 or 3/16) are terminating. Any rational with a denominator that has a prime factor other than 2 will have an infinite binary expansion. This means that numbers which appear to be short and exact when written in decimal format may need to be approximated when converted to binary floating-point. For example, the decimal number 0.1 is not representable in binary floating-point of any finite precision; the exact binary representation would have a "1100" sequence continuing endlessly:

> e = −4; s = 1100110011001100110011001100110011…, where, as previously, s is the significand and e is the exponent.

> When rounded to 24 bits this becomes

> e = −4; s = 110011001100110011001101, which is actually 0.100000001490116119384765625 in decimal."

Viet-sub:

Có hay không một số hợp lý có phần kết thúc(phần biểu diễn sau cùng) có thể mở rộng được phụ thuộc vào số base(hệ cơ số). Ví dụ, trong hệ cơ số 10, số 1/2 có phần mở rộng kết thúc (0.5) trong khi số 1/3 không có phần mở rộng kết thúc (0.333 ...). Trong khi hệ cơ số 2 chỉ những số với mẫu số là luỹ thừa (power) của 2 (như 1/2 hoặc 3/16) thì mới có phần mở rộng kết thúc. Bất kỳ phân số nào với mẫu số có một thừa số nguyên tố khác 2 sẽ có phần mở rộng nhị phân vô hạn.
Điều này có nghĩa là các con số sẽ được biễn diễn ngắn và chính xác khi được viết theo định dạng thập phân có thể cần phải được ước tính gần đúng khi được chuyển đổi thành dấu phẩy động nhị phân.
Ví dụ, số thập phân 0,1 không thể biểu diễn trong dấu phẩy động nhị phân của bất kỳ độ chính xác hữu hạn nào; biểu diễn nhị phân chính xác sẽ có chuỗi "1100" liên tục không ngừng:

e = −4; s = 1100110011001100110011001100110011…, trong đó, như trước đây, s là phần biểu diễn và e là số mũ.

Khi được làm tròn đến 24 bit, điều này sẽ trở thành e = −4; s = 110011001100110011001101, thực tế là 0,100000001490116119384765625 theo thập phân.

# BigDecimal giải cứu :)))

BigDecimal đại diện cho một số thập phân có chữ ký của độ chính xác tùy ý với một quy mô liên quan. BigDecimal cung cấp toàn quyền kiểm soát độ chính xác và làm tròn của giá trị số. Thật ra, có thể tính toán giá trị của số PI đến 2 tỉ chữ số thập phân bằng cách sử dụng BigDecimal, chỉ có điều có bộ nhớ vật lý nào đáp ứng được hay không thôi =)).

Đó là lý do tại sao chúng ta nên luôn luôn thích BigDecimal cho các tính toán liên quan tới tài chính.

## Độ chính xác và scale trong BigDecimal

Độ chính xác là tổng số chữ số (hoặc chữ số có nghĩa) của một số thực.

Scale xác định số chữ số sau dấu thập phân. Ví dụ: 12.345 có độ chính xác là 5 (tổng số) và scale là 3 (số chữ số bên phải của số thập phân).

## BigDecimal đã giải cứu như thế nào?

Làm thế nào chúng ta có thể định dạng giá trị BigDecimal mà không nhận được số mũ trong kết quả và dải số không?

Chúng ta có thể nhận được số mũ trong kết quả tính toán nếu chúng ta không thực hiện theo một số best practice trong khi sử dụng BigDecimal. Dưới đây là đoạn code hiển thị ví dụ sử dụng hữu ích trong việc xử lý kết quả tính toán với BigDecimal.

BigDecimal Rounding:
```
import java.math.BigDecimal;
public class BigDecimalForCurrency {
    public static void main(String[] args) {
        int scale = 4;
        double value = 0.11111;
        BigDecimal tempBig = new BigDecimal(Double.toString(value));
        tempBig = tempBig.setScale(scale, BigDecimal.ROUND_HALF_EVEN);
        String strValue = tempBig.stripTrailingZeros().toPlainString();
        System.out.println("tempBig = " + strValue);
    }
}
```

Output
```
tempBig = 0.1111
```

Làm cách nào để in một giá trị tiền tệ nhất định? Class NumberFormat được thiết kế đặc biệt cho mục đích này. Ký hiệu tiền tệ & rounding mode được đặt tự động dựa trên ngôn ngữ sử dụng NumberFormat.
Cho phép xem điều này trong hành động Ví dụ NumberFormat

```
class TestBigDecimal {
    public static String formatCurrency(double value) {
        NumberFormat format = NumberFormat.getCurrencyInstance(new Locale("en", "US"));
        format.setMinimumFractionDigits(2);
        format.setMaximumFractionDigits(5);
        format.setRoundingMode(RoundingMode.HALF_EVEN);
        return format.format(value);
    }
    public static void main(String[] args) {
        BigDecimal bigDecimal = new BigDecimal(22.121455);
        System.out.println("bigDecimal = " + formatCurrency(bigDecimal.doubleValue()));
    }
}
```

Output:
```
bigDecimal = $22.12146
```

Đó là tất cả, tất cả mọi thứ được thực hiện bởi NumberFormat.

## Vài điểm lưu ý
* Kiểu nguyên thủy: int và long cũng rất hữu ích cho các phép tính tiền tệ nếu không yêu cầu độ chính xác thập phân :D.
* Chúng ta thực sự nên tránh sử dụng constructor BigDecimal(Double), và thay vào đó, chúng ta thực sự nên sử dụng BigDecimal(String), vì kết quả của BigDecimal(0.1) sẽ là (0,1000000000000000055511151231257827021181583404541015625) đang được lưu trữ. Ngược lại, BigDecimal ("0,1") lưu trữ chính xác 0,1.
* Constructor BigDecimal(String) nên luôn luôn được ưa thích hơn BigDecimal(Double) bởi vì sử dụng BigDecimal(Double) là không thể đoán trước do không có khả năng biểu diễn cho 0,1 là chính xác 0,1.
* Nếu double phải được sử dụng để khởi tạo BigDecimal, sử dụng BigDecimal.valueOf (double), nó chuyển đổi giá trị Double thành String bằng phương thức Double.toString (double)
* Chế độ làm tròn phải được cung cấp trong khi set scale
* StripTrailingZeros tắt tất cả các số 0
* toString() có thể sử dụng ký kiệu toán học nhưng toPlainString() sẽ không bao giờ trả về lũy thừa trong kết quả của nó