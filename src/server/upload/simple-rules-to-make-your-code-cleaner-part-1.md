Những ngày cuối tháng 5 ..

Kéo theo đó là những nỗ lực cuối cùng trong việc hoàn thành nốt [Viblo May Fest Challenge](https://mayfest.viblo.asia/) :D

Trong bài viết này, mình sẽ đề cập đến một khía cạnh nhỏ thôi, trong một chủ đề cũng không có gì là mới mẻ cho lắm, nhưng vẫn luôn mang rất nhiều ý nghĩa và giá trị: Clean Code.

Viết code "sạch đẹp" bao giờ cũng là mong muốn và nguyện vọng của bất kỳ lập trình viên nào. Tuy nhiên để thực hiện được điều đó lại không phải là câu chuyện dễ dàng. Có rất nhiều vấn đề liên quan đến việc "làm thế nào để viết code sạch đẹp", cũng như có rất nhiều kiến thức mà bạn cần phải tìm hiểu, từ design principles, design patterns ... 

Nói là khó khăn như vậy thôi nhưng bạn cũng có thể bắt đầu từ những bước nhỏ và dễ dàng trước. Bên cạnh những vấn đề liên quan đến logic code, cách thức implement chức năng, thì cũng có những rules đơn giản mà bạn có thể áp dụng để cải thiện chất lượng code của mình. Và trong bài viết này, mình sẽ giới thiệu đến các bạn một số rules như vậy.

Các Rules được đề cập trong bài viết này được trích ra từ bộ rules của một công cụ static code analyzer có tên `phpmd` ([PHP Mess Detector](https://phpmd.org/)). Mặc dù nó là công cụ dành cho ngôn ngữ PHP, thế nhưng những nội dung, tư tưởng của các bộ quy tắc này thì đều rất hay, và có thể áp dụng ở các ngôn ngữ lập trình khác nữa. Thế nên các bạn cứ tham khảo xem sao nhé ;) 

## Một chút giới thiệu về `phpmd`

PHPMD hay **PHP Mess Detector** là một project được xây dựng trên nền tảng của một công cụ khác là [PHP Depend](https://pdepend.org/) với mong muốn xây dựng một công cụ cho cộng đồng PHP tương tự với công cụ [PMD](https://pmd.github.io/) nổi tiếng bên Java. 

PHPMD sẽ phân tích source code, để tìm ra những vấn đề có thể sẽ gây ảnh hưởng không tốt đến việc phát triển, maintain dự án sau này. Hay nói cách khác, PHPMD không phải lúc nào cũng có thể giúp bạn tìm ra bugs, mà nó tập trung giúp bạn tìm ra những đoạn code "có mùi" và đưa ra lời khuyên cho bạn về cách sửa chúng, để source code của dự án được "sạch đẹp" hơn. Những vấn đề mà PHPMD có thể giúp bạn:
- Possible bugs: Một số đoạn **có thể có lỗi xảy ra**. Do PHPMD chỉ phân tích static code, nên bạn cũng đừng kỳ vọng vào việc nó là công cụ vạn năng có thể tìm ra lỗi ... logic trong code của bạn 
- Suboptimal code: Những đoạn code chưa thực sự tối ưu
- Overcomplicated expressions: Những biểu thức, cách viết quá phức tạp
- Unused parameters, methods, properties: Những biến, hàm, thuộc tính được define nhưng không được sử dụng

Nếu đọc hết bài này và bạn có hứng thú, và muốn thử cài đặt cũng như sử dụng PHPMD trong project PHP của mình, thì bạn có thể tham khảo hướng dẫn tại [đây](https://phpmd.org/download/index.html). Hay nếu bạn muốn sử dụng PMD cho project Java hay Javascript của mình thì có thể tham khảo cách cài đặt tại [đây](https://pmd.github.io/)

Tiếp theo, chúng ta hãy cùng đi vào chi tiết nội dung các Rules nhé.

## Naming Rules
Naming rules là các quy tắc liên quan đến việc đặt tên biến, hàm sao cho hợp lý. Bạn có thể tưởng tượng đơn giản như nó là các bộ quy tắc bổ sung thêm cho các conventions đã được đề cập trong [PSR-1](https://viblo.asia/p/psr-1-chuan-viet-code-co-ban-1Je5EjJjKnL) và [PSR-2](https://viblo.asia/p/psr-2-huong-dan-mau-code-dep-aWj53OpG56m) 

### Tên biến quá ngắn
- Rule name trong PHPMD: `ShortVariable`
- Nội dung: Không khai báo một biến, một parameter có tên quá ngắn, ví dụ như < 3 ký tự chẳng hạn. Bởi với tên quá ngắn thì bạn sẽ không thể diễn tả được ý nghĩa của cái tên đó.

### Tên biến quá dài
- Rule name trong PHPMD: `LongVariable`
- Nội dung: Ngược lại với rule ở trên, bạn không nên khai báo một biến, hay một parameter có tên quá dài

### Tên hàm quá ngắn
- Rule name trong PHPMD: `ShortMethodName`
- Nội dung: Một rule khác liên quan đến độ dài, lần này thay vì biến thì ta có rule cho tên method. Tương tự như biến thì tên method của bạn cũng không nên để quá ngắn.

### Cách đặt tên cho hằng số
- Rule name trong PHPMD: `ConstantNamingConventions`
- Nội dung: Rule này đưa ra nội dung về việc các hằng số được khai báo qua từ khóa `const` cần phải được viết dưới dạng `UPPERCASE`
-  Ví dụ:
```php
class Foo {
    const MY_CONST = "GOOD"; // ok
    const myconst = "BAD"; // fail
}
```

### Cách đặt trên cho hàm mà trả về giá trị `boolean`
- Rule name trong PHPMD: `BooleanGetMethodName`
- Nội dung: Nếu một hàm của bạn trả về giá trị là `boolean` thì hàm đó không nên được đặt tên theo dạng `getX()`, mà cần phải được đặt theo dạng `isX()` hoặc `hasX()` 
- Ví dụ:
```php
class Foo {
    /**
     * @return boolean
     * Bad
     */
    public function getBar() {
    
    }
    /**
     * @return bool
     * Good
     */
    public function isBar() {
    
    }
}
```

## Unused Code Rules
**Unused Code Rules** là các quy tắc liên quan đến việc tìm ra những đoạn code thừa, không được sử dụng trong project.

### Private properties không được sử dụng
- Rule name trong PHPMD: `UnusedPrivateField`
- Nội dung: Bạn không nên khai báo hay gán giá trị cho một thuộc tính private, nhưng rồi lại không sử dụng nó ở nơi nào cả.
- Ví dụ:
```php
class Foo
{
    private static $BAR = 0; // Unused
    private $baz = 1; // Unused
    private $qux = 2;
    public function addOne()
    {
        return $this->qux++;
    }
}
```

### Biến local không được sử dụng
- Rule name trong PHPMD: `UnusedLocalVariable`
- Nội dung: Bạn không nên khai báo hay gán giá trị cho một biến local (được khai báo bên trong một hàm chẳng hạn), nhưng không sử dụng nó ở nơi nào khác.
- Ví dụ:
```php
class Foo {
    public function bar()
    {
        $baz = "Bad"; // Unused
    }
}
```

### Private Method không được sử dụng
- Tên rule trong PHPMD: `UnusedPrivateMethod`
- Nội dung: Bạn không nên khai báo một method private mà không dùng nó ở nơi nào khác

### Parameter không được sử dụng
- Tên rule trong PHPMD: `UnusedFormalParameter`
- Nội dung: Bạn không nên truyền parameters vào trong các methods hay cóntructors mà không sử dụng chúng ở đâu cả
- Ví dụ:
```php
class Foo
{
    private function bar($baz)
    {
        // $baz is not used
    }
}
```

## Controversial Rules
Đây là tập hợp các bộ quy tắc thường hay là chủ đề bàn luận của nhiều trường phái khác nhau :joy:  Nhưng những năm gần đây, với sự ra đời của chuẩn [PSR-1](https://viblo.asia/p/psr-1-chuan-viet-code-co-ban-1Je5EjJjKnL) và [PSR-2](https://viblo.asia/p/psr-2-huong-dan-mau-code-dep-aWj53OpG56m) thì sự tranh luận xung quanh một vài vấn đề về naming convention dưới đây cũng đã được giảm bớt :D 

### Sử dụng biến Super global
- Rule name trong PHPMD: `Superglobals`
- Nội dung: Superglobals là các biến built-in của PHP, và có thể được sử dụng ở bất cứ nơi đâu. Các biến Superglobals bao gồm `$GLOBALS`, `$_SERVER`, `$_REQUEST`,  `$_POST`, `$_GET`, `$_FILES`, `$_ENV`, `$_COOKIE`, và `$_SESSION`. Bạn không nên access trực tiếp vào các biến Superglobals này, và nếu cần lấy ra các giá trị trong đó, hãy sử dụng những hàm hay objects được cung cấp bởi framework.

### Class Name Convention
- Rule name trong PHPMD: `CamelCaseClassName`
- Nội dung: Khi đặt tên class, hãy dùng `UpperCamelCase`. Rule này cũng được đề cập trong [PSR-1](https://viblo.asia/p/psr-1-chuan-viet-code-co-ban-1Je5EjJjKnL)
- Ví dụ: 
```php
class FooClassName {
}
```
### Property Name Convention
- Rule name trong PHPMD: `CamelCasePropertyName`
- Nội dung: Khi đặt tên thuộc tính trong class, hãy dùng `lowerCamelCase`
- Ví dụ: 
```php
class FooClassName {
    public $barPropertyName;
}
```

### Method Name Convention 
- Rule name trong PHPMD: `CamelCaseMethodName`
- Nội dung: Khi đặt tên một hàm, hãy dùng `lowerCamelCase`
- Ví dụ:
```php
class FooClassName {
    public function barMethodName() {
    
    }
}
```
### Parameter Name Convention
- Rule name trong PHPMD: `CamelCaseParameterName`
- Nội dung: Khi đặt tên parameter truyền vào trong method, hãy dùng `lowerCamelCase`

### Variable Name Convention 
- Rule name trong PHPMD: `CamelCaseVariableName`
- Nội dung: Khi đặt tên một biến, hãy dùng `lowerCamelCase`

## Design Rules
**Design Rules** là các quy tắc liên quan đến việc thiết kế phần mềm 

### Về việc sử dụng `exit` 
- Rule name trong PHPMD: `ExitExpression`
- Nội dung: Sử dụng hàm `exit()` trong một đoạn code bình thường của project được coi là một bad practice và nên tránh. exit-expression chỉ nên được sử dụng trong những đoạn startup script nơi mà cần phải trả ra exit code cho môi trường. 
- Ví dụ:
```php
class Foo {
    public function bar($baz)  {
        if ($baz === false) {
            exit(1); // Bad
        }
    }
}
```

### Về việc sử dụng `eval`
- Rule name trong PHPMD: `EvalExpression`
- Nội dung: Việc sử dụng hàm `eval()` khiến cho code của bạn không thể viết test được, hơn nữa còn tiềm ẩn những vấn đề về bảo mật, thế nên nó được coi là một bad practice và cần phải tránh. Hãy tìm cách thay thế eval-expression bằng những đoạn code bình thường.
- Ví dụ:
```php
class Foo {
    public function bar($baz)  {
        if ($baz % 2 === 0) {
            eval('$baz += 1;'); // Bad
        }
    }
}
```

### Về việc sử dụng `goto` 
- Rule name trong PHPMD: `GotoStatement`
- Nội dung: Việc sử dụng `goto` sẽ khiến cho code của bạn trở nên khó đọc hơn, và cực kỳ khó để nắm được một flow xử lý. Do đó việc này cần phải tránh. Thay vì dùng `goto` , hãy dùng các câu lệnh rẽ nhánh thông thường, hay chia tách methods ra, lúc đó code sẽ dễ đọc và dễ kiểm soát hơn.

### Số lượng Class con
- Rule name trong PHPMD: `NumberOfChildren`
- Nội dung: Một class mà có số lượng class con quá lớn là một dấu hiện cho thấy hệ thống có sự thiết kế việc kế thừa không cần bằng. Bạn nên cân nhắc việc refactor lại phần kế thừa của các class này.

### Độ sâu của kế thừa 
- Rule name trong PHPMD: `DepthOfInheritance`
- Nội dung: Một class mà có quá nhiều parents, tức nó được kế thừa qua quá nhiều tầng lớp, là một dấu hiệu cho thấy sự mất cân bằng hoặc sai sót trong việc thiết kế kế thừa. Bạn nên cân nhắc việc refactor lại hệ thống kế thừa này. Ví dụ như một class kế thừa đến 7 tầng parents, thì có thể bạn nên bắt đầu xem xét lại :D

### Độ phụ thuộc giữa các Objects
- Rule name trong PHPMD: `CouplingBetweenObjects`
- Nội dung: Một class có quá nhiều dependencies, tức phụ thuộc vào quá nhiều class khác, sẽ gây ra rất nhiều ảnh hưởng xấu nên chính nó. Việc có quá nhiều dependencies sẽ gây ra những ảnh hưởng như khó hiểu được cấu trúc, thiếu sự ổn định, khó maintain sau này ... Bạn có thể xem thêm về khái niệm **Low Coupling** ở bài viết [này](https://viblo.asia/p/mot-so-design-principles-trong-lap-trinh-ma-ban-nen-biet-eW65GvJOlDO#_low-coupling-7). Ví dụ như nếu class của bạn mà có khoảng hơn 13 dependencies (tức có các method, hay properties nhận vào hơn 13 objects là các instant của các class khác) thì có thể bạn nên bắt đầu xem xét lại :D

### Về việc sử dụng các đoạn code dành cho việc debug
- Rule name trong PHPMD: `DevelopmentCodeFragment`
- Nội dung: Những functions như `var_dump()`, `print_r()` thường chỉ được sử dụng trong quá trình phát triển để debug, và nếu nó xuất hiện trên production thì gần như chỉ có lý do duy nhất là ... bạn đã quên không xóa đi những đoạn code debug của mình mà thôi :joy:

### Empty `catch` block 
- Rule name trong PHPMD: `EmptyCatchBlock`
- Nội dung: Việc sử dụng `try` - `catch` là thường thấy trong các project, nhưng sử dụng một hàm `catch` với nội dung trống rỗng là một việc mà bạn nên tránh trong hầu hết các trường hợp. Việc làm đó sẽ chỉ giúp bạn loại bỏ error/exception của hệ thống, coi như nó không xuất hiện, chứ không phải là cách tốt để giúp bạn tracking được các lỗi xảy ra, cũng như tìm cách khắc phục. Hãy cố gắng handle các exception mà mình catch được, chí ít cũng là log lại nội dung của nó để công việc debug sau này được dễ dàng hơn. 
- Ví dụ: 
```php
class Foo {
    public function bar()
    {
        try {
            // Logic code here
        } catch (Exception $e) {} // Bad
    }
}
```

### Sử dụng hàm count size trong loop expression 
- Rule name trong PHPMD: `CountInLoopExpression`
- Nội dung: Việc sử dụng các hàm như `count` hay `sizeof` để tính số phần tử của mảng bên trong loop expression (phần định nghĩa vòng lặp) được coi là một bad practice và có thể là nguyên nhân gây ra rất nhiều bugs, đặc biệt là khi trong vòng lặp, chúng ta tiến hành thao tác chỉnh sửa array đó, và ở vòng lặp tiếp theo, size của array được tính toán lại
- Ví dụ:
```php
class Foo {

  public function bar()
  {
    $arr = array();
    for ($i = 0; count($arr); $i++) { // Bad
      // manipulates array
    }
  }
}
```

## Tổng kết
Như vậy là ở phần 1 này, chúng ta đã điểm qua một số rule cơ bản mà phần lớn ta có thể nhận ra một cách dễ dàng khi review static code. 

Các rules được đề cập ở trên đều khá đơn giản, và hy vọng các bạn có thể nắm vững được nó, mặc dù phần giải thích nhiều chỗ cũng chỉ rất ngắn gọn :D 

Sự hiểu biết về nội dung, cũng như cách thức xử lý những vấn đề đó sẽ giúp bạn xây dựng một project với source code clear hơn, clean hơn, dễ dàng maintain cũng như mở rộng hơn. 

Sang phần 2, chúng ta sẽ đi tiếp về một số các rules phức tạp hơn, với nhiều khái niệm mới lạ hơn, chắc chắn là sẽ giúp ích được nhiều hơn cho bạn đấy.