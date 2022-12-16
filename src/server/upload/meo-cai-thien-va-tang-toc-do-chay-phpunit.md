Tiết kiệm từ 50% - 70% thời gian chạy PHPUnit test cho dự án của bạn chỉ với vài mẹo đơn giản thật không ngờ.

## Sử dụng --filter

Mình đã thấy rất nhiều bạn newbie trong quá trình phát triển, mỗi lần chạy test đều check toàn bộ các test. Nếu bạn chưa biết, khi thêm khi flag `--filter <Callable>` vào command line nó sẽ giúp bạn chỉ chạy các test có tên trùng khớp với `Callable` như tên `class`, `testcase (method)` hoặc thậm chí chỉ một `namespace`. Điều này sẽ giúp bạn tiết kiệm rất nhiều thời gian khi không phải chạy toàn bộ các test.

```bash
./vendor/bin/phpunit --filter AccountControllerTest
./vendor/bin/phpunit --filter test_it_can_create_new_account
./vendor/bin/phpunit --filter 'Tests\\Integrations\\Controllers\\Accounts'
```

## PHPUnit Caching

Đây là một feature của PHPUnit cho phép chúng ta có thể thực hiện cache lại kết quả test của lần chạy trước đó ra một file có tên là `.phpunit.result.cache`. File này sẽ chỉ chứa toàn bộ các assertions bị fail. Và sẽ chỉ chạy lại các assertion bị fail trước đó trong lần kế tiếp. Điều này rất hữu ích trong quá trình phát triển flow theo TDD (Test-Driven Development), khi chúng ta phải chạy đi chạy lại testcase sau mỗi lần sửa code, rõ ràng trường hợp này, chúng ta chỉ mong muốn chạy lại nhưng assertion bị fail.

Để enable, bạn chỉ cần thêm thuộc tính `cacheResult="true"` cho `<phpunit>` trong file cấu hình `phpunit.xml`, với mẫu như dưới đây:

```xml:phpunit.xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit 
    cacheResult="true"
    backupGlobals="false"
    backupStaticAttributes="false"
    bootstrap="vendor/autoload.php"
    ...>
    // ....
</phpunit>
``` 

Đồng thời nhớ bổ sung tên file `.phpunit.result.cache` vào trong `.gitignore` nhé bạn! :laughing: Để chạy lại test mà không sử dụng cache result nữa, hãy thêm optional `--do-not-cache-result` vào command nhé!

```bash
./vendor/bin/phpunit --filter=test_it_can_create_new_account --do-not-cache-result
```

## Tắt XDebug

Nếu bạn đang bật X-Debug trong quá trình chạy test thì đây là một trong số nguyên nhân lớn khiến tốc độ chạy các test rất chậm. Nhất là khi bạn phải thực hiện chạy test thường xuyên trong quá trình phát triển khi tuân thủ theo TDD. Dưới đây là ví dụ khi chạy PHPUnit với XDebug.

```bash
Time: 12.02 minutes, Memory: 166.00 MB
OK (906 tests, 6102 assertions)
Generating code coverage report in Clover XML format ... done
Generating code coverage report in HTML format ... done
```

Bạn có thể thấy, thời gian chạy test khi bật XDebug của mình lên tới 12.02 phút trong trường hợp này nhé! :laughing:

Vậy câu hỏi đặt ra là, sẽ ra sao nếu bạn cần sử dụng XDebug. Một ví dụ đơn giản nhất là khi sử dụng PHPUnit, bạn muốn generate code coverage report thì đồng nghĩa bạn sẽ cần phải đảm bảo là đã enable XDebug. Hãy sang phần tiếp theo, mình sẽ bật mí! :wink:

## Dùng PHPDBG thay XDebug

Một giải pháp thay thế dù cũng chưa phải là hoàn hảo đó là sử dụng PHPDBG thay thế cho XDebug. Đặc biệt, ngoài việc bạn có thể generate code coverage report bằng PHPDBG thì tốc độ thực hiện test sẽ được cải thiện đáng kể. Thời gian chạy test sẽ giảm từ 50% - 70% theo mình đã thử áp dụng. Dưới đây là ví dụ mà mình đã áp dụng, vẫn là bộ testcase 12.02 phút ở trên khi chạy với PHPDBG sẽ cho ra kết quả:

```bash
Time: 3.74 minutes, Memory: 994.00 MB
OK (906 tests, 6102 assertions)
Generating code coverage report in Clover XML format ... done
Generating code coverage report in HTML format ... done
```

Đúng, nó là 3.74 phút. Thật vậy, khi chạy với PHPDBG thì thời gian chạy test đã giảm:

$$\frac{T1 - T2}{T1} = \frac{12.02 - 3.74}{12.02} * 100 = 68.89\%$$

Chúng ta sẽ tiết kiệm được 70% thời gian chạy test khi sử dụng PHPDBG thay thế cho XDebug; xong đánh đổi lại, lượng memory mà chúng ta cần để thực hiện sẽ tăng lên đáng kể. :cry: Do đó bạn cũng nên cân nhắc sử dụng PHPDBG sao cho hợp lý. Trong trường hợp của cá nhân mình, giảm 70% thời gian chạy test lại là một sự lựa chọn tuyệt vời hơn cả! :wink:


## "Nhóm" các testcase bị chậm

PHPUnit cho phép chúng ta gom nhóm các testcase bị chậm ở nhiều file khác nhau lại thông qua anotation  [`@group`](https://phpunit.de/manual/6.5/en/appendixes.annotations.html#appendixes.annotations.group). Cho ví dụ:

```php:AccountsTest.php
/**
 * @group slowtests
 */
public function test_it_can_create_new_account()
{
    // ...
}
```

```php:StudentTest.php
/**
 * @group slowtests
 */
public function test_it_can_update_student_information()
{
    // ...
}
```

Khi chạy test, chúng ta có thể `exclude` các testcase trong nhóm `slowtests` ở trên thông qua:

```bash
./vendor/bin/phpunit --exclude-group slowtests
```

Việc không chạy các `slowtests` sẽ giúp việc chạy test diễn ra nhanh hơn, ngoài ra nếu bạn đang sử dụng CI/CD có hỗ trợ chạy đồng thời nhiều `job` cùng một lúc, chúng ta có thể setup CI/CD để tách phần `slowtests` để chạy riêng biệt. Một lợi ích nữa đó là chúng ta đang document các testcase bị chậm, điều này cũng giúp chúng ta đọc code sẽ biết luôn cái nào chậm và sẽ cải tiến nó sau này.

Ngoài ra, PHPUnit có support sẵn các alias cho group mà bạn có thể dùng ngắn gọn hơn như sau:
- `@large` <=> `@group large`
- `@medium` <=> `@group medium`

## Fix các testcase bị chậm

Đúng vậy, khi bộ testcase trong dự án của bạn bị chậm, hãy luôn nhớ trong đầu rằng phải cải tiến để chúng làm nhanh hơn. Chúng ta sẽ đi tìm các testcase bị chậm và tìm hiểu xem tại sao chúng chậm rồi tiến hành sửa lại chúng. Ngoài việc đọc document của testcase và bạn nhìn thấy các anotation `@group` ở trên, bạn có thể tìm chúng qua PHPUnit D3 Report.

![](https://github.com/marmelab/phpunit-d3-report/raw/gh-pages/screenshot.png)

- PHPUnit D3 Report: https://github.com/marmelab/phpunit-d3-report
- Demo page: https://marmelab.com/phpunit-d3-report/

D3 Report sẽ giúp chúng ta visualize report thành graph như hình trên, vòng tròng các to tức cái test đấy càng chạy mất nhiều thời gian. Việc của chúng ta bây giờ là đi tìm thằng to mà diệt :D

## Tài liệu tham khảo

- https://github.com/krakjoe/phpdbg
- https://www.php.net/manual/en/book.phpdbg.php
- https://laravel-news.com/tips-to-speed-up-phpunit-tests
- https://phpunit.de/manual/6.5/en/appendixes.annotations.html#appendixes.annotations.group
- https://github.com/marmelab/phpunit-d3-report

:coffee::coffee: *Nếu thấy nội dung này bổ ích, hãy mời tôi một tách cà phê nha! **https://kimyvgy.webee.asia***