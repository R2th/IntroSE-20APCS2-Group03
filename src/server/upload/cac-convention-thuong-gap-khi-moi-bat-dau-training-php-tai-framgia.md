# Thanh minh cho Coding convention
Chào mọi người, coding convention chắc chẳng xa lạ gì với các bạn nữa, nhất là các bạn đã đi làm, mà hơn thế nó là một cái vấn đề khá là 'mệt mỏi' và 'khó chịu' đối với chúng ta hồi đầu đi làm phải không?

Khi còn mới bắt đầu học, mọi người thì chỉ nghĩ code chạy được cái đã, còn viết xấu, viết linh tinh thì... cứ để sau tính :D. Tuy nhiên, kiểu gì thì thỉnh thoảng bạn sẽ cần tìm lại code project trước, để tìm lại 1 cái hàm nào đó mà bạn đã viết rồi, đem ra xem xào lại đúng không? Bạn đã lần nào đi tìm trong dự án cũ, xong đọc đọc một hồi suy luận mãi mới biết hồi đấy mình viết cái gì chưa? Kiểu như là đặt tên biến `$var1`, `$var2` xong đi lục tìm xem cái này để làm gì, vì tên nó chung chung không có ý nghĩa gì cả @@.
Hoặc khi làm nhóm, đọc code của team mate đưa, và thấy nó viết code theo kiểu 'lồi lõm' bừa bãi, tìm cái thẻ đóng của thẻ này mà phải check từng dòng 1 tìm, chỉ vì nó tab theo cảm hứng chưa?

Mấy cái vấn đề rồi nghe thì thấy nhỏ, nhưng mà đáng lẽ chúng ta không phải mất công mất thời gian vào cái việc 'vớ vẩn' ấy nếu chịu viết cẩn thận xíu, có quy tắc rõ ràng để cho dễ nhìn rồi.

Đó, convention sinh ra không phải để làm khó các bạn, để người khác bắt lỗi hay để 'cho vui', mà nó để bạn có thể nhìn được code của bản thân, code của nguời khác, nhìn mà không bị 'ngứa mắt'.

Convention trong code giống như khi viết bài luận, viết quyển đồ án vậy. Nhiều thầy giáo sẽ có tiêu chuẩn yêu cầu riêng mà bạn phải đáp ứng: như viết các đoạn văn xuống dòng thì phải lùi đầu dòng này (nhưng mà thầy mình thì bảo lùi xấu, ko cần lùi vào, để nguyên đấy), font chữ phải là times new roman này, có thầy thì bảo font chữ 12 và line height = 1.5, có thấy thích line height chỉ 1.2 thôi chẳng hạn,... Nếu bạn viết không đúng như thế, chỗ thì font có chân, chỗ thì font không chân, trang thì margin narrow, trang thì margin custom, đến lúc in xong nhìn quyển đồ án của bạn sẽ trông như 1 tập các trang từ các quyển sách khác nhau ghép vào vậy, chẳng thống nhất, nhìn còn 'ngứa mắt' nữa. Tương tự như vậy, các công ty sẽ có những tiêu chuẩn có thể khác nhau cho nhân viên của mình để cho mọi người có thể nhìn được code của bạn dễ dàng, đọc được và không bị 'ngứa mắt'.
Thanh minh một chút cho convention như vậy, giờ mình sẽ đi vào vấn đề chính nhé!
# PHP coding convention thường gặp tại Framgia
Mình hiện tại đang làm việc tại bộ phận đào tạo của Framgia, vì vậy lúc nào cũng là làm việc với các bạn mới vào Framgia thôi, mà mới vào nên chưa quen convention, các bạn bị nhắc nhiều phải sửa đến chậm cả tiến độ dự án, kêu mệt mỏi nhiều lắm :D

Lúc trước mình cũng từng là thực tập sinh, mới vào Framgia chưa quen convention, và được đưa cho cái link tài liệu bằng tiếng anh mà mình cũng chả muốn đọc đâu :D. Cho nên là mình viết cái này, tổng hợp các convention thường mắc cho các bạn dễ tìm và tra cứu nhé.
## 1. Cách đặt tên
### 1.1 Chuẩn cơ bản
**Tên Classes và Namespaces**: 
Namespaces và tên classes phải tuân theo quy chuẩn "autoloading" của PSR: [[PSR-0](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md) , [PSR-4](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-4-autoloader.md)] (Khá là lằng nhằng, nhưng bài này mình chỉ nếu các convention thường mắc phải một cách dễ hiểu nên sẽ không nói kỹ, các bạn có thể tự tìm hiểu thêm nhé)

Tên class phải được viết dưới dạng StudlyCaps, tức là các chữ cái đầu từ viết hoa, viết liền.

**Tên Method:** Tên Method phải được viết dưới dạng camelCase, tức là  từ đầu tiên viết thường, các từ tiếp theo viết hoa chữ cái đầu.

**Tên biến:** Tên biến phải có nghĩa, không đặt kiểu `$p`, `$num1`, `$num2`,...

**Hằng số const:** Constants của class phải được viết hoa toàn bộ và sử dụng gạch dưới ngăn cách giữa các từ. Ví dụ:
```php
const DATE_APPROVED = '2014-03-04';
```
**Keywords:** Những keywords của PHP phải được viết thường. (không viết hoa); constants của PHP là `true`, `false`, và `null` cũng cần phải viết thường.

### 1.2 Đặt tên trong Laravel
Dựa trên chuẩn [PSR standards](https://www.php-fig.org/psr/psr-2/)

**Ghi chú:**

* *singular:* Số ít
* *plural:* Số nhiều
* *snake_case:* Sử dụng dấu gạch dưới giữa các từ, tất cả các từ viết thường.
* *camelCase:* Từ đầu tiên viết thường, các từ tiếp theo viết hoa chữ cái đầu
* *dot notation*: Sử dụng dấu `.` phân cách
* *singular model names in alphabetical order:* Tên model số ít và thứ tự theo bảng chữ cái
* *snakecase without model name:* snake_case không bao gồm tên Model
* *descriptive:* Định nghĩa
* *adjective:* Tính từ
* *noun:* Danh từ

| Đối tượng | Chuẩn đặt tên | Tốt | Chưa tốt |
| --------  | -------- | -------- |--------|
| Controller| Singular | ProductController| ~~ProductsController~~|
| Route| Plural | products/1| ~~product/1~~|
| Tên route| snake_case + dot notation | products.write_review| ~~products.write-review~~, ~~write-review-products~~|
| Model| Singular + UpperCase | Product| ~~Products~~|
| hasOne or belongsTo relationship | Singular + camelCase | productComment | ~~productComments~~, ~~product_comment~~
|Các quan hệ khác | Plural + camelCase | productComments | ~~productComment~~, ~~article_comments~~ |
|Tên bảng | Plural + snake_case | product_comments | ~~product_comment~~, ~~productComments~~|
| Tên bảng trung gian | singular model names in alphabetical order | article_user | ~~user_article~~, ~~articles_users~~ |
| Tên cột trong bảng | snake_case without model name | meta_title | ~~MetaTitle~~, ~~article_meta_title~~ |
|Thành phần trong Model|snake_case|`$model->created_at`|~~`$model->createdAt`~~|
|Khóa ngoại|singular model name + _id suffix|article_id|~~ArticleId~~, ~~id_article~~, ~~articles_id~~|
|Khóa chính|	-|	id |	~~custom_id~~|
|Migration|	-	|2017_01_01_000000_create_articles_table|~~2017_01_01_000000_articles~~|
|Tên phương thức|camelCase|getAll|~~get_all~~|
|Phương thức trong resource controller|tên bảng|store|~~saveArticle~~|
|Phương thức trong test class|camelCase|testGuestCannotSeeArticle| ~~test_guest_cannot_see_article~~|
|Tên biến|camelCase|`$articlesWithAuthor`|~~`$articles_with_author`~~|
|Collection|descriptive, plural|`$activeUsers = User::active()->get()`|	~~`$active`~~, ~~`$data`~~|
|Object|descriptive, singular|`$activeUser = User::active()->first()`|	~~`$users`~~, ~~`$obj`~~ |
|Config and language files index|snake_case|articles_enabled| ~~ArticlesEnabled~~; ~~articles-enabled~~|
|Tên file View|snake_case|show_filtered.blade.php|~~showFiltered.blade.php~~, ~~show-filtered.blade.php~~|
|Tên file config|snake_case|google_calendar.php|~~googleCalendar.php~~, ~~google-calendar.php~~|
|Contract (interface)|adjective or noun|Authenticatable	|~~AuthenticationInterface~~, ~~IAuthentication~~|
|Trait|adjective|Notifiable|~~NotificationTrait~~|

## 2. Chuẩn về bố cục file code
### 2.1 Tab - indent

Code không dùng tab, mà phải sử dụng 4 dấu cách làm indent.

### 2.2 Độ dài dòng 

Không có hard limit về độ dài của một dòng; soft limit phải là 120 chữ. Một dòng nên có không quá 80 chữ.

### 2.3 Dòng trống 
* Cần phải có một dòng trống ở sau phần khai báo namespace. Ngoài ra cũng cần có một dòng trống phía sau phần khai báo use.
* Mọi file phải kết thúc bằng một dòng trống.
* Một dòng không trống không được phép có trailing whitespace (dấu cách ở cuối dòng)
* Dòng trống có thể được thêm vào để code có thể được dễ đọc hơn và để phân cách những đoạn code.
* Không được có quá 1 dòng trống liền nhau
* Nếu trước return có logic code thì phải có dòng trống phía trước nó, còn nếu không có logic code thì không có dòng trống phía trước.

### 2.4 Khoảng trắng (whitespace) 
* Cần phải có một dấu cách phía sau những từ khoá Control structure (như if, else, for ...). 
* Không được có dấu cách phía sau tên của method khi gọi hàm.
* Một dòng không trống không được phép có trailing whitespace (dấu cách ở cuối dòng)
* Ngoài các indent tab thì không được có quá 1 khoảng trắng liền nhau
* Cần có 1 space trước và sau các toán tử như +, -, *, /, ., >, <, == ...
* Không được có khoảng trắng dư ở cuối các dòng.
* Khi gọi một method hay một function, không được phép có khoảng trắng giữa tên của method hay function và dấu mở ngoặc tròn. Không được phép có khoảng trắng sau dấu mở ngoặc tròn. Và không được phép có khoảng trắng trước dấu đóng ngoặc tròn. 
* Trong danh sách argument, không được phép có khoảng trắng trước mỗi dấu phẩy, và phải có một khoảng trắng sau mỗi dấu phẩy.
* Danh sách argument có thể được tách ra thành nhiều dòng, trong đó mỗi dòng theo sau được indent một lần. Khi làm như vậy thì argument đầu tiên phải được đặt trên một dòng mới, và mỗi dòng chỉ được phép chứa một argument.

### 2.5 Khối lệnh
* **Khai báo Class:** Dấu mở ngặc nhọn dùng khi khai báo class phải được viết ở dòng mới (không viết cùng dòng với phần khai báo tên class), và dấu đóng ngoặc nhọn của một class phải được viết ở dòng mới sau khi kết thúc body của class.
* **Khai báo Method:** Dấu mở ngặc nhọn dùng khi khai báo method phải được viết ở dòng mới (không viết cùng dòng với phần khai báo tên method), và dấu đóng ngoặc nhọn của một method phải được viết ở dòng mới sau khi kết thúc body của method.
* **Khai báo use:** 
    * Những phần khai báo use phải được đặt phía sau phần khai báo namespace
    * Phải dùng một từ `use` cho mỗi khai báo.
    * Phải có một dòng trắng phía sau đoạn code use.
* **Control structures:** 
     * Dấu mở ngoặc nhọn cho control structures (như if, else, for ...) phải được viết cùng dòng, trong khi đó đấu đóng ngoặc phải được viết ở dòng mới.
     * Cần phải có một dấu cách phía sau những từ khoá Control structure (như if, else, for ...). Không được có dấu cách phía sau tên của method khi gọi hàm.
     * Không được có một khoảng trắng sau dấu mở ngoặc tròn hoặc trước dấu đóng ngoặc tròn
     * Phải có một khoảng trắng sau đấu đóng ngoặc tròn và trước dấu mở ngoặc nhọn
     * Phần thân của structure phải được indent một lần
     * Từ khoá `elseif` nên được dùng thay cho `else if`, để mọi control keywords chỉ là một từ đơn.
     * Phần `case` phải được indent một lần so với `switch`, và `break` keyword (hay các keyword ngắt khác) phải được indent giống với phần thân của `case`. Phải có một comment kiểu như `// no break` nếu phần thân của `case` không trống, và được cố tình cho qua (không có break)

* Phải luôn khai báo tính visibility (`public`, `protected` hay là `private`) của properties cũng như `methods`, `abstract` và `final` phải được khai báo phía trước tính visibility và `static` phải được khai báo sau tính visibility.
* Nếu trước return có logic code thì phải có dòng trống phía trước nó, còn nếu không có logic code thì không có dòng trống phía trước.
### 2.6 File
* Trong một file chỉ bao gồm code PHP thì không được viết tag đóng ?>.
* Mọi files phải kết thúc bằng một dòng trống.
* Không được phép có quá một statement trên một dòng.
* Từ khoá `extends` và `implements` phải được viết cùng dòng với tên class.
* Sử dụng config và file ngôn ngữ, hằng số thay vì đoạn chữ trong code.
Ví dụ:

Không nên:
```php
public function isNormal()
{
    return $article->type === 'normal';
}

return back()->with('message', 'Your article has been added!');
```
Nên sử dụng:
```php
public function isNormal()
{
    return $article->type === Article::TYPE_NORMAL;
}

return back()->with('message', __('app.article_added'));
```
* Với Laravel: 
    * Không viết JS, CSS trong file Blade, không viết code Html trong PHP class
    * Hạn chế tối đa xử lý code PHP trong View
    * Không bao giờ viết logic code trong route 

### 2.7 Mảng và chuỗi
**2.7.1 Chuỗi:**

Sử dụng dấu `'` đối với một string bình thường. Chỉ dùng `"` khi bên trong có khai triển biến PHP. Ví dụ:
```php
$normalString = 'A String';
$specialString = "This is {$normalString}";
```
**2.7.2 Mảng:**
* Với phiên bản PHP >= 5.4, hãy sử dụng [] để khai báo array, thay vì dùng array()
* Khi khai báo mảng, các phần tử của mảng có thể được tách thành nhiều dòng
* Phần từ đầu tiên của mảng phải được đặt trên một dòng mới.
* Mỗi dòng chỉ được phép có một phần tử, các phần tử được indent một lần.
* Cần phải có dấu phẩy ở cuối phần tử cuối cùng.
* Dấu kết thúc khai báo mảng (] đối với [] hay ) đối với array()) phải được đặt trên một dòng mới.

Ví dụ:
```php
//Bad way:
$array = [$foo,
    $bar
]; // Bad

$array = [
    $foo, $bar,
    $baz,
]; // Bad

$array = [
    $foo,
    $bar
]; // Bad

$array = [
    $foo,
    $bar,]; // Bad

$array = [$foo, $bar,]; // Bad

//This is good
$array = [
    $foo,
    $bar,
]; // Good

$array = [$foo, $bar]; // Good
```

# Tạm kết
Trên đây là liệt kê các convention dễ thấy mà các bạn chưa quen convention của Framgia hay mắc phải, tất nhiên còn nhiều quy tắc khác về trình bày và cách xử lý code nữa, nhưng mà nhiều quá nên mình không đưa vào đây, cứ để comment đến đâu fix đến đấy, vài lần là quen tay thôi nhé các bạn :). Các bạn có thể tham khảo nguồn convention của Laravel tại [Laravel Best Practice](https://github.com/alexeymezenin/laravel-best-practices)
và của PHP trong Framgia tại [Framgia coding convention](https://github.com/framgia/coding-standards/blob/master/vn/README.md)

Chúc mọi người sớm quen tay với convention, bài viết này mong là giúp được các bạn biết được mình mắc convention tại đâu, đỡ phải đi hỏi sai đâu, sửa như thế nào nhé :)

Ngoài ra, cũng có rất nhiều công cụ để check convention cho bạn, ví dụ như Framgia CI tool chẳng hạn, bạn có thể tham khảo cách cài CI tại [bài viết này](https://viblo.asia/p/su-dung-framgia-ci-check-convention-project-php-tren-local-V3m5W1zgZO7).

Một số công cụ tham khảo cho các bạn:

CI tool & config:

https://github.com/framgia/ci-report-tool/

https://github.com/framgia/ci-service-document/tree/master/php

https://github.com/framgia-education/ci-config/

Check coding standard with PHPCS:

https://git.io/v1E3Q

https://github.com/wataridori/framgia-php-codesniffer

https://eslint.org/docs/rules/