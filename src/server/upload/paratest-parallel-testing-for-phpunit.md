## Giới thiệu
**Unit Test**, thứ mà hầu như các lập trình viên cần phải biết. Nói một cách đơn giản, **Unit Test** là kỹ thuật kiểm nghiệm các hoạt động của mọi chi tiết trong code với một quy trình tách biệt với quy trình phát triển phần mềm, giúp phát hiện sai sót kịp thời. UT còn có thể giúp phát hiện các vấn đề tiềm ẩn và các lỗi thời gian thực ngay cả trước khi chuyên viên kiểm định chất lượng (QA - Quality Assurance) tìm ra, thậm chí có thể sửa lỗi ngay từ ý tưởng thiết kế.

Đối với lập trình viên php thì công cụ mà chúng ta thường xuyên sử dụng là **PHPUnit**. Đây là một công cụ để chạy unit test trong php được phát triển bởi **Sebastian Bergmann**. Nó cung cấp một bộ các tính năng vượt trội để giúp việc kiểm thử trở nên dễ dàng. Tuy nhiên, mặc định chúng ta chỉ có thể chạy **PHPUnit** tuần tự từng **test**, lần lượt. Đối với các project viết ít test thì việc chạy PHPUnit không phải vấn đề. Tuy nhiên khi số lượng test tăng lên, thì việc chạy PHPUnit sẽ tốn rất nhiều thời gian của chúng ta.

Vậy nên, trong bài viết này mình sẽ giới thiệu tới các bạn một **package** giúp cho chúng ta chạy PHPUnit `đa luồng`, giúp giảm thời gian chờ đợi và sử dụng tối đa hiệu suất của cpu. Mặc dù nó chạy song song các testcase, tuy nhiên nó vẫn sẽ tạo ra 1 file reports duy nhất tương tự như phpunit.

## Cài đặt
Trước tiên, chúng ta thêm package này vào project bằng cách sử dụng `composer`:
```bash
composer require --dev brianium/paratest
```

Vậy là xong, chúng ta có thể sử dụng nó ngay bây giờ bằng cách chạy lệnh:
```sh
vendor/bin/paratest
```

<div align="center">

![](https://i1.wp.com/wp.laravel-news.com/wp-content/uploads/2019/01/paratest-1.png?w=1050)
    
*Chạy phpunit thường*
    
</div>

<div align="center">

![](https://i1.wp.com/wp.laravel-news.com/wp-content/uploads/2019/01/paratest-1.png?w=1050)
    
*Chạy phpunit cùng paratest*
    
</div>

*Note*: trong quá trình cài đặt package này, phpunit sẽ được cài tự động nên các bạn không nhất thiết phải cài đặt phpunit riêng

ParaTest có khá nhiều tùy chọn cho các bạn, tùy vào dự án mà bạn chọn cho phù hợp

|  Option | Description  |
|---|---|
|--processes (-p)            | The number of test processes to run. (Default: auto)<br>Possible values:<br><br>- Integer (>= 1): Number of processes to run.<br>- auto (default): Number of processes is automatically set to the number of logical CPU cores.<br>- half: Number of processes is automatically set to half the number of logical CPU cores.|
|--functional (-f)           | Run test methods instead of classes in separate processes. |
|--no-test-tokens            | Disable TEST_TOKEN environment variables. (Default: Variable is set) |
|--help (-h)                 | Display this help message. |
|--coverage-clover           | Generate code coverage report in Clover XML format. |
|--coverage-html             | Generate code coverage report in HTML format. |
|--coverage-php              | Serialize PHP_CodeCoverage object to file. |
|--coverage-text             | Generate code coverage report in text format. |
|--coverage-xml              | Generate code coverage report in PHPUnit XML format. |
|--max-batch-size (-m)       | Max batch size (only for functional mode). (Default: 0) |
|--filter                    | Filter (only for functional mode). |
|--phpunit                   | The PHPUnit binary to execute. (Default: vendor/bin/phpunit) |
|--runner                    | Runner, WrapperRunner or SqliteRunner. (Default: Runner) |
|--bootstrap                 | The bootstrap file to be used by PHPUnit. |
|--configuration (-c)        | The PHPUnit configuration file to use. |
|--group (-g)                | Only runs tests from the specified group(s). |
|--exclude-group             | Don't run tests from the specified group(s). |
|--stop-on-failure           | Don't start any more processes after a failure. |
|--log-junit                 | Log test execution in JUnit XML format to file. |
|--colors                    | Displays a colored bar as a test result. |
|--testsuite                 | Filter which testsuite to run. Run multiple suits by separating them with ",". Example:  --testsuite suite1,suite2 |
|--path                      | An alias for the path argument. |
|--parallel-suite            | Run testsuites in parallel as opposed to running test classes / test functions in parallel. |
|--passthru=PASSTHRU         | Pass the given arguments verbatim to the underlying test framework. Example: --passthru="'--prepend' 'xdebug-filter.php'" |
|--passthru-php=PASSTHRU-PHP | Pass the given arguments verbatim to the underlying php process. Example: --passthru-php="'-d' 'zend_extension=xdebug.so'" |
|-v, --verbose=VERBOSE      | If given, debug output is printed. Example: --verbose=1  |

### Tinh chỉnh
Trong quá trình sử dụng paratest, các bạn nên đặc biệt chú ý tới các tham số sau:

#### 1. Adjust the number of processes with -p

Để sử dụng tối đa các lõi của chp, bạn nên để ít nhất 1 lõi 1 process. Nhiều process sẽ giúp bạn sử dụng tối đa tài nguyên của máy, tuy nhiên nhiều quá có thể làm chậm máy tính của bạn. Bạn có thể thử với 2 processes / 1 nhân cpu. Ví dụ máy bạn có 8 nhân, bạn có thể chạy vớ số process là 16.

#### 2. Choose between per-testcase- and per-testmethod-parallelization with -f

Giả sử bạn có một vài testcase (class) với nhiều phương thức, bạn cần sử dụng tham số `f` để chạy chế độ `functional mode` để cho phép nhiều phương thức trên cùng 1 class có thể chạy song song. Hầu hết các project chạy với option `-f` sẽ chậm hơn khi mỗi testcase cần được khởi động riêng rẽ.

#### 3. Use the WrapperRunner or SqliteRunner if possible

Trình chạy mặc định cho PHPUnit tạo ra một process mới cho mỗi testcase (hoặc phương thức trong v). Điều này cung cấp khả năng tương thích cao nhất nhưng đi kèm với tiêu tốn hiệu năng của việc nhiều quy trình được sinh ra và cần chuẩn bị cho mỗi quy trình. Đặc biệt, khi bạn có testcase chậm (như thiết lập cơ sở dữ liệu), bạn nên thử **WrapperRunner** với `--runner WrapperRunner` hoặc **SqliteRunner** với `--slner SqliteRunner`. Nó sinh ra một quy trình "worker" cho mỗi tiến trình song song (-p), thực hiện bootstrapping một lần và sử dụng lại các quy trình này cho mỗi test được thực thi.

Để hiểu rõ hơn về ParaTest các bạn có thể truy cập vào github của nó tại [đây](https://github.com/paratestphp/paratest)