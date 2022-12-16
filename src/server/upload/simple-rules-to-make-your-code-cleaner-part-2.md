Tiếp tục phong trào hưởng ứng [Viblo May Fest](https://mayfest.viblo.asia), và cũng để tiếp nối [phần 1](https://viblo.asia/p/simple-rules-to-make-your-code-cleaner-part-1-OeVKBWkEZkW) của bài viết "Simple Rules to make your code Cleaner", trong bài này, mình sẽ tiếp tục giới thiệu về các rules còn lại trong bộ ruleset của PHPMD, những quy tắc mà nếu bạn có thể ghi nhớ trong đầu cũng như luôn giữ trong mình ý thức làm theo, thì có thể sẽ giúp bạn rất nhiều trong việc nâng cao năng lực coding của bản thân, cũng như nâng cao chất lượng code của dự án.

Cũng như phần 1, thì **những rules được đề cập đến trong phần 2 này được sử dụng chính là trong các project PHP, thế nhưng những nội dung, tư tưởng của chúng thì đều rất hay, và có thể áp dụng ở các ngôn ngữ lập trình khác nữa**. Thế nên các bạn cứ tham khảo xem sao nhé 😉

Trong phần 1, chúng ta đã lướt qua về các quy tắc đơn giản và dễ hiểu, còn trong phần 2 này, sẽ có nhiều khái niệm cũng như quy tắc phức tạp hơn. Mình sẽ cố gắng đi sâu vào giải thích những phần như vậy. Nếu có thắc mắc hay điều gì cần trao đổi thì mọi người cứ để lại comment ở phía dưới bài viết nhé. Nào chúng ta cùng bắt đầu thôi:

## Clean Code Rules
**Clean Code Rules** là tập hợp một số quy tắc liên quan đến việc viết code clean, chủ yếu là dựa trên việc tuân thủ [SOLID Principles](https://viblo.asia/tags/solid)

### Boolean Argument Flag
- Rule name trong PHPMD: `BooleanArgumentFlag`
- Nội dung: **Flag argument** là một đố số được truyền vào trong hàm và quyết định xem hàm sẽ thực hiện xử lý logic gì, phụ thuộc vào giá trị của nó. Hiểu một cách đơn giản thì `BooleanArgumentFlag` là việc truyền vào hàm một đối số có giá trị `boolean`, và bên trong tùy thuộc vào giá trị đó là `true` hay `false` mà sẽ có những xử lý khác nhau. Đây được coi là một Bad Practice, bởi nó vi phạm nguyên lý "đơn trách nhiệm" (Single Responsibility Principle) trong SOLID. Thay vì sử dụng `if - else` với boolean flag ở bên trong hàm, ta nên tách nó ra thành các hàm xử lý khác nhau thì hơn. Bạn có thể tìm hiểu thêm về flag argument qua [bài viết cùng tên của Martin Fowler](https://martinfowler.com/bliki/FlagArgument.html)
- Ví dụ:
```php
class Staff {
    // Using argument flag. Bad
    public function registerDayOff($paidLeave = true) {
        if ($paidLeave) {
            // request for a paid-leave
        }
        // request for an unpaid leave
    }
    
    // Define separate method. Good
    public function registerPaidLeave() {
    }
    public function registerUnpaidLeave() {
    }
}
```

### Sử dụng `else`
- Rule name trong PHPMD:  `ElseExpression`
- Nội dung: Đây là một rule liên quan đến việc sử dụng hàm `else` trong source code. Mới đầu nghe qua thì các bạn có thể thấy nó hơi "điên" :joy:, nhưng hãy cố gắng đọc đến cuối nhé :D Nội dung của quy tắc này rất đơn giản: **không dùng `else`**! Về cơ bản thì bạn không cần phải có một câu rẽ nhánh `else` đi kèm theo một câu lệnh `if`, và khi nào bạn thấy mình đang dùng `else` thì chứng tỏ bạn đang có nguy cơ vi phạm Single Responsibility Principle. Đọc đến đây có thể bạn sẽ ngẫm lại những đoạn code mà mình đã viết và tự hỏi nhiều chỗ nếu không dùng `else` thì viết code kiểu gì nhỉ. Có khá nhiều cách để giúp bạn giải quyết vấn đề **không dùng `else`** này:
  - Sử dụng toán tử 3 ngôi (ternary operations), đây là cách giải quyết đơn giản cho những trường hợp không có nhiều logic bên trong mỗi phần rẽ nhánh
  - Sử dụng **early return**, tức dùng `return` bên trong câu lệnh `if`, khi đó phần xử lý rẽ nhánh vốn nằm trong `else` giờ sẽ không cần đến `else` nữa
  - Nếu phần code của bạn không thể refactor lại được bằng cách sử dụng 2 phương pháp trên, thì hãy nghĩ đến việc phân tách những đoạn xử lý logic rẽ nhánh đó vào các methods nhỏ hơn

Việc code mà không có `else` sẽ giúp logic của bạn trở nên dễ đọc, và dễ hiểu hơn. Nó cũng làm giảm độ phức tạp của hàm, khái niệm mà chúng ta sẽ tìm hiểu thêm ở phần dưới.
- Ví dụ:
```php
class Foo
{
    public function bar($baz)
    {
        if ($baz % 2 === 0) {
            // one branch
        } else {
            // another branch
        }
    }
    
    // refactor to remove else branch
    public function bar($baz)
    {
        // ternary operations
        $result = $baz % 2 ? $baz * 3 : $baz * 5; 
        if ($result % 2 === 0) {
            // one branch
            // use early return
            return;
        }
        // another logic
    }
}
```

### Static Access 
- Rule name trong PHPMD: `StaticAccess`
- Nội dung: Việc gọi trực tiếp hàm static từ class bên trong method hiện tại khiến cho code trở nên phức tạp, khó hiểu, và khó để nhận biết dependencies của hàm/class đó. Đồng thời, bạn cũng sẽ rất khó để fake được kết quả trả về từ hàm static, dẫn đến việc viết Unit Test trở nên rất khó khăn. Thay vì gọi hàm static, hãy sử dụng dependencies injection nếu có thể. Trường hợp duy nhất mà việc gọi hàm static được chấp nhận có lẽ là khi sử dụng design pattern **Factory Method** mà thôi.
- Ví dụ: 
```php
class Foo
{
    public function bar()
    {
        // invoke static call
        Baz::staticMethod();
    }
    
    // refactor to dependencies injection
    public function bar(Baz $baz) {
         $baz->normalMethod();
    }
}
```

### Thực hiện phép gán bên trong câu điều kiện `if`
- Rule name trong PHPMD: `IfStatementAssignment`
- Nội dung: Việc thực hiện phép gán bên trong câu điều kiện `if` thường được coi là một xử lý có vấn đề, và nên được refactor lại. Bởi trong PHP (cũng như một vài ngôn ngữ khác), thì phép gán sẽ trả về giá trị của số ở bên phải. Tức `if ($a = 1)` thì sẽ luôn tương đương với `if (1)` và luôn nhảy vào bên trong nhánh `if`, ngược lại `if ($b = '')` sẽ tương đương với `if ('')` và sẽ không bao giờ nhảy vào bên trong. Chính vì thế phép gán giá trị bên trong câu điều kiện `if` có thể sẽ đem đến những xử lý không mong muốn, và sẽ rất khó để debug, nhất là khi số ở bên phải dấu `=` có thể nhận các giá trị tương đương với `false` như là `0`, `null`, `[]` (mảng rỗng) hay `''` (xâu rỗng). Do đó, tốt nhất là không nên thực hiện việc gán giá trị như thế này. 

### Duplicate Array Key
- Rule name trong PHPMD: `DuplicateArrayKey`
- Nội dung: Khi khai báo một array, PHP cho phép bạn sử dụng một key nhiều lần, và đương nhiên, ở giá trị của cùng của array đó thì chỉ có cặp key-value cuối cùng được ghi nhận, và các value khác của cùng một key đó sẽ bị ghi đè. Nhìn chung việc define giá trị của một key nhiều lần là một việc làm rất ... vỗ nghĩa :joy: chẳng có lý do gì để bạn define key có giá là 1, sau đó lại thêm phần define key có giá trị là 2 vào để ghi đè lên giá trị cũ cả. Nếu review đến đoạn code mà có kiểu define như vậy, thì cách giải thích hợp lý nhất là người viết code đã ... ghi nhầm tên key mà thôi :joy: 
- Ví dụ:
```php 
$array = [
    "key1" => 1,
    "key2" => 2,
    "key2" => 3, // Duplicate array key. If it's known from the beginning that the key will have different value, there is usually no point in defining first one. 
];
```

### Sử dụng `import`
- Rule name trong PHPMD: `MissingImport`
- Nội dung: Rule này có nội dung rất đơn giản: khi cần sử dụng class với namespace khác, hãy import nó ở đầu file, thay vì viết full namespace. Việc sử dụng `import` sẽ giúp bạn theo dõi và quản lý các class bên ngoài mà mình cần sử dụng ở class hiện tại được dễ dàng hơn. 

### Undefined Variable
- Rule name trong PHPMD: `UndefinedVariable`
- Nội dung: PHP không bắt buộc bạn phải khai báo biến trước khi sử dụng. Tuy nhiên, nếu thấy có một biến mà đột nhiên lôi ra dùng mà không có khai báo, hay gán giá trị từ trước thì chắc chỉ có một lý thôi, nó ... bị viết sai :joy: 
```php
function printX() {
    echo $x; // where does $x come from???
}
```

### Error Control Operator 
- Rule name trong PHPMD: `ErrorControlOperator`
- Nội dung: Trong PHP có một tính năng là **Error Control Operator**, với việc sử dụng ký tự `@` đặt trước một xử lý. Khi đó, mọi lỗi có thể được tạo ra từ xử lý ấy sẽ đều bị bỏ qua. Đây là một cách để giúp bạn chạy một đoạn logic mà không cần bận tâm đến việc nó có bắn ra lỗi không, bởi dù xử lý đó có lỗi thì nó cũng không làm gián đoạn chương trình. Tuy nhiên, thực tế đó là một cách xử lý không tốt và bạn nên tránh dùng nếu không có lý do gì thực sự đặc biệt, bởi nó không chỉ bỏ qua lỗi mà bạn đang muốn bỏ qua, nó còn bỏ qua cả những lỗi mà bạn không tính trước, hay nghĩ đến được rằng nó sẽ xảy ra nữa. Việc không kiểm soát được các lỗi phát sinh mà cứ thế ignore hết có thể sẽ dẫn đến những vấn đề khó nắm bắt được xử lý code, cũng như khó debug khi có lỗi phát sinh sau này. Hãy cố gắng dùng error handler hay dùng `error_reporting()` để giải quyết vấn đề. Bạn có thể xem thêm về Error Control Operator tại document của PHP tại [đây](https://www.php.net/manual/en/language.operators.errorcontrol.php)

## Code Size Rules
**Code Size Rules** là tập hợp các quy tắc liên quan đến những vấn đề về kích thước, độ phức tạp của hàm, của class ...

### Cyclomatic Complexity
- Rule name trong PHPMD: `CyclomaticComplexity`
- Nội dung: Cyclomatic Complexity là một thước đo để tính toán **độ phức tạp của một chương trình phần mềm**. Độ phức tạp **Cyclomatic** được tính toán bằng cách sử dụng [Control Flow Graph](https://en.wikipedia.org/wiki/Control-flow_graph) của một chương trình. Chỉ số **độ phức tạp cyclomatic** có thể dùng cho hàm, class, module ... Cách để tính độ phức tạp cyclomatic một cách đơn giản đó là số lượng **decision points** cộng thêm với 1 (là bản thân chương trình đó). Decision points hay điểm quyết định ở đây có thể hiểu là một trường hợp rẽ nhánh (`if`, `case`, `catch`, `throw`), vòng lặp (`where`, `for`, `break`, `continue` ...), toán tử 3 ngôi (`?:`) hay boolean operator (`&&`, `||`), và **không** bao gồm `else`, `finally` hay `default`. Thông thường, chỉ số độ phức tạp cyclomatic càng cao thì càng không tốt, bởi nó kéo theo việc bạn phải chuẩn bị nhiều test cases để kiểm soát được hết các trường hợp, và việc kiểm soát các logic rẽ nhánh, vòng lặp sẽ càng ngày càng khó hơn, việc mở rộng, cũng như viết test vì thế cũng sẽ ngày càng khó hơn. Theo suggestion của PHPMD thì từ 1 ~ 4 được gọi là độ phức tạp thấp, 5 ~ 7 được coi là độ phức tạp trung bình, 8 ~ 10 là độ phức tạp cao, và từ 11 trở lên là rất cao.  
- Ví dụ: Hàm `foo` dưới đây có độ phức tạp cyclomatic là 11, và được đánh giá là không tốt. Bạn nên cân nhắc phân tách nó ra thành những hàm nhỏ hơn
```php
// Cyclomatic Complexity = 11
class Foo {
   public function example() { // Cyclomatic Complexity = 1
       if ($a == $b) { // if clause. Cyclomatic Complexity = 2
           if ($a1 == $b1) { // if clause. Cyclomatic Complexity = 3
                fiddle();
           } elseif ($a2 == $b2) { // if clause. Cyclomatic Complexity = 4
                fiddle();
            } else {
                fiddle();
            }
       } elseif ($c == $d) { // if clause. Cyclomatic Complexity = 5
           while ($c == $d) { // while clause. Cyclomatic Complexity = 6
                fiddle();
            }
        } elseif ($e == $f) { // if clause. Cyclomatic Complexity = 7
           for ($n = 0; $n < $h; $n++) { // for clause. Cyclomatic Complexity = 8
                fiddle();
            }
        } else {
            switch ($z) {
               case 1: // case clause. Cyclomatic Complexity = 9
                    fiddle();
                    break;
              case 2: // case clause. Cyclomatic Complexity = 10
                    fiddle();
                    break;
              case 3: // case clause. Cyclomatic Complexity = 11
                    fiddle();
                    break;
                default:
                    fiddle();
                    break;
            }
        }
    }
}
```

 
### NPath Complexity
- Rule name trong PHPMD: `NPathComplexity`
- Nội dung: **NPath Complexity** hay độ phức tạp NPath là cũng là một khái niệm để đo độ phức tạp của chương trình, có nội dung gần tương tự, và hay bị nhầm lẫn với `Cyclomatic Complexity`. Chỉ số độ phức tạp NPath của một method được tính bằng số cách mà hàm có thể được execute, hay số lượng execute path có thể có của hàm. Khác với độ phức tạp Cyclomatic là đơn thuần đếm số decision points, thì độ phức tạp NPath đếm số cách chạy từ đầu đến cuối chương trình.  Với cách tính độ phức tạp NPath sẽ tăng lên theo cấp số nhân với các câu lệnh rẽ nhánh `if - else` đặt tuần tự nhau. PHPMD đề xuất lấy threshold cho độ phức tạp NPath của một hàm là 200, và bạn nên cân nhắc refactor code để giảm chỉ số này khi nó quá cao.
- Ví dụ:
```php
function foo($a, $b, $c)
{
    if ($a > 1) {
        echo 1;
    } else {
        echo 2;
    }
    if ($b > 1) {
        echo 3;
    } else {
        echo 4;
    }
    if ($c > 1) {
        echo 5;
    } else {
        echo 6;
    }
}
```


Ở ví dụ trên, nếu tính độ phức tạp Cyclomatic, thì ta sẽ được con số cuối cùng là 4 (do dùng 3 câu lệnh `if`). Tuy nhiên, nếu tính độ phức tạp NPath, thì ta sẽ được kết quả là $2 * 2 * 2 = 8$, tức bạn sẽ cần tổng cộng 8 bộ input `$a`, `$b`, `$c` để test được hết các kết quả của hàm. Và con số này sẽ tiếp tục tăng nhanh nếu bạn ... có thêm các câu lệnh rẽ nhánh khác (^^;)

Ngoài `if - else` thì `switch - case` hay toán tử 3 ngôi `?:`, hay `try - catch` ... cũng có thể làm tăng độ phức tạp NPath lên.

Nhìn chung thì **simple code** luôn tốt hơn **complex code**. Simple code giúp cho code của bạn dễ đọc, dễ hiểu, dễ maintain, và dễ viết test hơn. Chính vì thế hãy cố gắng cân nhắc để các chỉ số độ phức tạp Cyclomatic hay độ phức tạp NPath ở một con số phù hợp, không quá cao.

### Method quá dài
- Rule name trong PHPMD: `ExcessiveMethodLength`
- Nội dung: Quy tắc này khá đơn giản và dễ hiểu: **không để hàm của bạn quá dài**. Việc viết method với cả trăm dòng code là một dấu hiệu cho thấy bạn đang "nhồi nhét" quá nhiều thứ vào trong hàm. Hãy cố gắng giảm độ lớn của hàm bằng cách phân chia thành các method nhỏ, tạo các helper method, hay loại bỏ những đoạn code copy/paste. PHPMD đưa ra suggestion cho giới hạn của 1 hàm là 100 dòng, tuy nhiên mình nghĩ bạn có thể tự đặt ra các quy tắc chặt chẽ hơn, 100 dòng có vẻ vẫn là nhiều :joy: Với những ngôn ngữ viết code ngắn gọn hơn như Ruby, Python thì giới hạn này nên được đặt ngắn hơn nữa :D 

### Class quá dài
- Rule name trong PHPMD: `ExcessiveClassLength`
- Nội dung: Tương tự với quy tắc về độ dài của method, ta cũng có quy tắc về độ dài của class: **không để class của bạn quá dài**, đừng để class của bạn làm quá nhiều việc. Hãy nghĩ đến việc đưa bớt logic ra những class khác nữa, để tạo thành những component riêng. PHPMD đưa ra suggestion cho giới hạn của 1 class là 1000 dòng, tuy nhiên bạn cũng có thể đưa ra những giới hạn nhỏ hơn nữa :D

### Số lượng tham số truyền vào quá lớn
- Rule name trong PHPMD: `ExcessiveParameterList`
- Nội dung: Việc một hàm cần phải nhận vào quá nhiều tham số có thể dẫn đến việc đôi lúc để sử dụng được hàm đó, bạn sẽ phải ... tạo mới nhiều objects để "truyền tạm" vào (mặc dù không quan tâm mấy đến chúng). Đây là một cách thiết kế tồi, và bạn nên tránh ngay từ đầu bằng cách đừng để cho method của mình có số lượng parameters quá lớn như vậy. PHPMD đưa ra suggestion là ... 10, tuy nhiên mình thấy con số này là quá cao rồi, chắc nên tự mình config giảm xuống tầm 6, 7 thì hơn =))
- Ví dụ: 
```php
class Foo {
    public function bar(
        $p0, $p1, $p2, $p3, $p4, $p5,
        $p5, $p6, $p7, $p8, $p9, $p10) { // Excessive Parameter List
    }
}
```

### Số lượng hàm/thuộc tính public quá lớn
- Rule name trong PHPMD: `ExcessivePublicCount`
- Nội dung: Một class không nên có quá nhiều public methods hoặc public attributes. Hay nói một cách đơn giản thì nó đếm số lần từ khóa `public` được xuất hiện trong class :joy: Điều này sẽ khiến cho class rất khó kiểm soát, hay có thể test được hết nó. Do đó class đó nên được chia nhỏ ra, hoặc bạn nên xem xét kỹ lại tính visibility của từng thuộc tính/hàm. Chỉ nên để public những gì cần phải public thôi, và hãy private lại những thứ không cần thiết :D PHPMD suggest một con số threshold là 45, tức không nên có quá 45 hàm/thuộc tính public trong một class.
- Ví dụ: 
```php
public class Foo {
    public $value;
    public $something;
    public $var;
    // [... more more public attributes ...]

    public function doWork() {}
    public function doMoreWork() {}
    public function doWorkAgain() {}
    // [... more more public methods ...]
}
```

### Class có quá nhiều trường
- Rule name trong PHPMD: `TooManyFields`
- Nội dung: Khi class của bán có quá nhiều trường, tính cả public/protected/private, thì bạn nên xem xét lại về việc thiết kế properties của class cho hợp lý. Có những chỗ bạn chỉ cần một biến tạm trong hàm chẳng hạn, thì không cần thiết phải define property của class làm gì cả. PHPMD suggest con số properties tối đa của một class là 15.

### Class có quá nhiều methods
- Rule name trong PHPMD: `TooManyMethods`
- Nội dung: Khi mà class của bạn có quá nhiều methods thì đó là dấu hiện cho thấy bạn nên nghĩ đến việc refactor lại để giảm thiểu độ phức tạp của class. Có điểm đặc biệt là rule này không tính đến những hàm `getter` và `setter` (tức những hàm bắt đầu bởi `get` và `set`). PHPMD suggest con số threshold cho quy tắc này là 25, tức bạn không nên có quá 25 non-setter/non-getter methods (tính cả public/protected/private) trong 1 class.

### Class có quá nhiều public methods
- Rule name trong PHPMD: `TooManyPublicMethods`
- Nội dung: Tương tự với quy tắc ở trên, chỉ khác ở chỗ rule này chỉ tính với public methods chứ không tính với private/protected methods. Ngoài ra, nó cũng không count các setter/getter methods nữa. PHPMD suggest con số threshold cho quy tắc này là 10, tức bạn không nên có quá 10 non-setter/non-getter methods (tính cả public/protected/private) trong 1 class 

### Độ phức tạp của class
- Rule name trong PHPMD: `ExcessiveClassComplexity`
- Nội dung: PHPMD, hay một số công cụ khác như PHP Depend, hay PMD sử dụng một khái niệm gọi là Weighted Method Count (WMC) của một class để đánh giá độ phức tạp của class đó, cũng như thời gian và effort cần phải bỏ ra để chỉnh sửa, maintain hay test class. Chỉ số WMC mà PHPMD sử dụng được định nghĩa là tổng độ phức tạp Cyclomatic của tất cả các methods được định nghĩa bên trong class đó. Như vậy thì một class mà có số lượng methods lớn thì kể cả độ phức tạp trung bình của class là nhỏ, thì WMC của cả class vẫn có thể sẽ lớn. PHPMD suggest con số tốt đa cho độ phức tạp của một class tốt là không quá 50.

## Tổng kết
Như vậy là thông qua 2 phần của loạt bài viết Simple Rules to make your code Cleaner, mình đã điểm qua các rules của công cụ PHP Mess Detector, một công cụ khá mạnh mẽ trong việc phân tích static code để giúp bạn có thể tìm ra những vấn đề với source code của mình từ sớm. Tư tưởng của các bộ quy tắc này nhìn chung khá hữu ích, và có thể được áp dụng cho các ngôn ngữ lập trình hướng đối tượng khác nữa. 

Đặc biệt trong phần 2 này của bài viết, mình cũng đã giới thiệu qua về 2 khái niệm đo độ phức tạp của hàm, là **Cyclomatic Complexity** và **NPath Complexity** , mình thấy khá là hay và có thể sẽ có hiệu quả cao khi đem phổ biến và chia sẻ với các thành viên trong nhóm để cùng đưa vào convention chung của project :thinking: Mọi người cũng thử áp dụng xem sao, có gì thì cùng chia sẻ lại trải nghiệm và kết quả nhé :D

Vậy là với bài viết này thì mình cũng đã chính thức hoàn thành [Viblo May Fest Challenge](https://mayfest.viblo.asia/), viết đủ 4 bài trong tháng 5 :joy: Tuy nhiên, sẽ cố gắng tiếp tục giữ được cảm xúc viết bài này, để có thể có những bài chia sẻ mới trong thời gian tới. Cảm ơn mọi người đã theo dõi, và hẹn gặp lại ở những bài viết tiếp theo nhé ;)