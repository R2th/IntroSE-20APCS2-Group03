[![](https://raw.githubusercontent.com/phpstan/phpstan/982866fde1af836b23e33504cc5009b4d4644902/build/phpstan.gif)](https://github.com/phpstan/phpstan "PHPStan")

### Static Code Analysis là gì
Static code analysis (SCA) là việc thực hiện phân tích mã nguồn để đảm bảo về convention của dự án một cách tự động, hay để đánh giá chất lượng mã nguồn, hoặc tìm ra các lỗi tiềm ẩn, các lỗi thường gặp mà không phải chạy mã nguồn đó, ngăn các lỗi xảy xa khi deploy sản phẩm. 
Nó cũng gần giống việc compile mã nguồn ra mã máy đối với các ngôn ngữ dạng biên dịch như C/C++, Java... Tuy nhiên PHP là ngôn ngữ thông dịch nên mặc định không có bước compile này.
Cách thức hoạt động của SCA là đọc và phân tích cấu trúc của bộ mã nguồn sau đó đối chiếu với các quy tắc đã được đề ra xem mã nguồn đó có vi phạm lỗi nào không. SCA thường được áp dụng vào quá trình test tự động hoặc tích hợp vào các hệ thống Continuous Integration trong quá trình build, merging code và deploy.
Sau đây mình sẽ giới thiệu một số công cụ SCA thường dùng.

----
### PHP Linter
Đây là tool đơn giản, được tích hợp sẵn trong  PHP CLI, chỉ dùng để kiểm tra các lỗi về cú pháp.
VD:
```php
<?php
// file.php
echo 'No semi;'
```
```bash
$ php -l file.php
```
Kết quả:
```
PHP Parse error:  syntax error, unexpected end of file, expecting ',' or ';' in t.php on line 3
Errors parsing t.php
```
Tool này thường được tích hợp vào các editor như [Sublime Text](https://packagecontrol.io/packages/SublimeLinter-php) hoặc [VSCode](https://code.visualstudio.com/docs/languages/php#_linting) để phát hiện lỗi cú pháp tự động.

Ngoài ra có tool [PHP-Parallel-Lint](https://github.com/JakubOnderka/PHP-Parallel-Lint) để tăng tốc quá trình lint nhiều file.

-----
### PHP_CodeSniffer
[PHP_CodeSniffer (PHPCS)](https://github.com/squizlabs/PHP_CodeSniffer) là công cụ thiết yếu để đảm bảo convention của dự án. Nó cung cấp 2 công cụ chính:
1. `phpcs`: được dùng để tìm ra những lỗi sai coding convention.
2. `phpcbf`: tự động fix các lỗi convention.

Tùy từng dự án mà có thể sử dụng các bộ quy tắc khác nhau, một số bộ quy tắc hay được dùng đó là: [PEAR](https://pear.php.net/manual/en/standards.php), [PSR1](http://www.php-fig.org/psr/psr-1/), [PSR2](http://www.php-fig.org/psr/psr-2/), [Wordpress](https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards)...

Cài đặt thông qua [composer](https://getcomposer.org):
```bash
$ composer global require "squizlabs/php_codesniffer=*"
```

> **Lưu ý**: 
> + Trước khi có thể chạy command `phpcs` chúng ta cần phải thêm đường dẫn đến thư mục composer bin vào `PATH` của hệ thống
> + `PATH` hiểu nôm na là nơi khai báo danh sách các folder có chưa command có thể chạy từ bất cứ đâu trên terminal
> 
> Để lấy đường dẫn đến thư mục composer bin:
> ```bash
> $ composer global config bin-dir --absolute
> Changed current directory to /home/ubuntu/.config/composer
> /home/ubuntu/.config/composer/vendor/bin
> ```
> => Thư mục composer bin sẽ là:
> ```
> /home/ubuntu/.config/composer/vendor/bin
> ```
> Tùy thuộc vào shell bạn đang dùng là bash hay zsh thì bạn có thể thêm đường dẫn vào `PATH` bằng cách sửa file `~/.bashrc` hoặc `~/.zshrc` tương ứng:
> ```bash
> $ export PATH="/home/ubuntu/.config/composer/vendor/bin:$PATH"
> ```
> Nhớ khởi động lại terminal hoặc update lại shell bằng lệnh
> ```bash
> $ source ~/.bashrc
> # Hoặc với zsh
> $ source ~/.zshrc
> ```
> Tham khảo thêm tại: https://viblo.asia/p/back-to-basic-linux-command-line-part-2-m68Z0MXNlkG

Mặc định, PHPCS sẽ tìm kiếm các bộ quy tắc trong thư mục [src/Standards](https://github.com/squizlabs/PHP_CodeSniffer/tree/master/src/Standards) (version > 3).
Để xem danh sách các bộ quy tắc đã có, chạy lệnh:
```bash
$ phpcs -i
```
Để thêm các bộ quy tắc khác chẳng hạn của [Framgia](https://github.com/wataridori/framgia-php-codesniffer) chúng ta thiết lập như sau:
```bash
$ cd ~
$ git clone https://github.com/wataridori/framgia-php-codesniffer
$ phpcs --config-set installed_paths ~/framgia-php-codesniffer
```
Để xem các quy tắc được sử dụng trong bộ quy tắc, dùng lệnh:
```bash
$ phpcs --standard=Framgia -e
```
Thực hiện analysis:
```bash
$ phpcs --standard=<bộ_quy_tắc> <đường_dẫn_file_hoặc_folder> [--report=<định_dạnh_output>]
```
+ Bộ quy tắc có thể là tên các bộ quy tắc đã được cài sẵn hoặc đường dẫn đến file [tự định nghĩa các quy tắc dạng xml](https://github.com/squizlabs/PHP_CodeSniffer/wiki/Annotated-ruleset.xml)
+ Định dạng output có thể là: _full_ (output dạng bảng,  mặc định), _xml_, _json_, _diff_...
+ Các tùy chọn khác các bạn xem thêm trên document hoặc trang help `phpcs -h`

VD ouput dạng bảng:
```
FILE: /tmp/test.php
---------------------------------------------------------------------------------------------------------
FOUND 1 ERROR AFFECTING 1 LINE
---------------------------------------------------------------------------------------------------------
 2 | ERROR | [x] Inline control structures are not allowed
---------------------------------------------------------------------------------------------------------
PHPCBF CAN FIX THE 1 MARKED SNIFF VIOLATIONS AUTOMATICALLY
---------------------------------------------------------------------------------------------------------

Time: 46ms; Memory: 6MB
```

Với tham số `-s` bạn sẽ biết được error là do vi phạm rule nào:
`phpcs --standard=FramgiaPHPCS -s /tmp/test.php`:
```
FILE: /tmp/test.php
---------------------------------------------------------------------------------------------------------
FOUND 2 ERRORS AFFECTING 1 LINE
---------------------------------------------------------------------------------------------------------
 2 | ERROR | [x] Expected 0 spaces after opening bracket; 1 found
   |       |     (PSR2.ControlStructures.ControlStructureSpacing.SpacingAfterOpenBrace)
 2 | ERROR | [x] Expected 0 spaces before closing bracket; 1 found
   |       |     (PSR2.ControlStructures.ControlStructureSpacing.SpaceBeforeCloseBrace)
---------------------------------------------------------------------------------------------------------
PHPCBF CAN FIX THE 2 MARKED SNIFF VIOLATIONS AUTOMATICALLY
---------------------------------------------------------------------------------------------------------

Time: 45ms; Memory: 6MB
```

VD Output json:
```json
{
   "totals" : {
      "fixable" : 1,
      "errors" : 1,
      "warnings" : 0
   },
   "files" : {
      app.php" : {
         "messages" : [
            {
               "fixable" : true,
               "column" : 1,
               "severity" : 5,
               "line" : 1,
               "message" : "End of line character is invalid; expected \"\\n\" but found \"\\r\\n\"",
               "type" : "ERROR",
               "source" : "Generic.Files.LineEndings.InvalidEOLChar"
            }
         ],
         "warnings" : 0,
         "errors" : 1
      }
   }
}
```
Bạn có thể thấy trường `"fixable" : true,` trong json, trường này chỉ ra cho chúng ta biết 1 lỗi có thể tự động fix bằng `phpcbf` hay không. Ngoài ra, có 1 tool khác để fix tự động đó là [php-cs-fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) ([example config với php-cs-fixer](https://gist.github.com/tuanpht/23fc53ee3c294431da2e87b91545dcb8)).

VD file tự định nghĩa các quy tắc, ngoài khai báo rule, chúng ta cũng có thể setting các tham số, config cho `phpcs`:
```xml
<!-- myrules.xml -->
<?xml version="1.0"?>
<ruleset name="MyCS">
    <description>Framgia Standard but force checking whitespace on blank lines.</description>
    <arg name="tab-width" value="4"/>
    <arg name="encoding" value="UTF-8"/>
    
    <!-- Do not return exit code != 0 if only have warnings, meaning ignore warnings -->
    <config name="ignore_warnings_on_exit" value="1"/>

    <!-- Check both app/ and config/ and resources/lang -->
    <file>./app</file>
    <file>./config</file>
    <file>./resources/lang</file>

    <!-- Extends Framgia standard -->
    <rule ref="Framgia"/>
    <rule ref="Squiz.WhiteSpace.SuperfluousWhitespace">
        <properties>
            <property name="ignoreBlankLines" value="false"/>
        </properties>
    </rule>
</ruleset>
```
=> Thực hiện kiểm tra:`phpcs --standard=myrules.xml file.php`

> **Lưu ý**: Nếu bạn đặt tên file là `phpcs.xml` thì chỉ cần chạy `phpcs file.php` phpcs sẽ tự động sử dụng file `phpcs.xml`. Xem thêm ở [đây](https://github.com/squizlabs/PHP_CodeSniffer/wiki/Advanced-Usage#using-a-default-configuration-file).

Ngoài ra, công cụ này cũng có thể được tích hợp vào Sublime Text thông qua plugin https://packagecontrol.io/packages/Phpcs hoặc  [PHPStorm](https://www.jetbrains.com/help/phpstorm/php-code-sniffer.html) hoặc [VSCode](https://marketplace.visualstudio.com/items?itemName=ikappas.phpcs).

-----
### PHP Mess Detector
[PHP Mess Detector (PHPMD)](https://phpmd.org/) có thể phát hiện ra rất nhiều bug tiềm tàng trong mã nguồn. Nó bao gồm các tính năng:
+ Phát hiện lỗi tiềm ẩn
+ Tối ưu code
+ Phát hiện các đoạn code quá phức tạp 
+ Phát hiện các tham số thừa, thuộc tính, phương thức không được sử dụng đến

Một số quy tắc hay được dùng nhất là [Cyclomatic Complexity](https://phpmd.org/rules/codesize.html#cyclomaticcomplexity) - [Độ phức tạp của function](https://viblo.asia/p/nhung-nguyen-tac-dam-bao-tinh-de-doc-cua-method-cyclomatic-complexity-danh-cho-nguoi-moi-lap-trinh-1l0rvm0VGyqA) và [độ dài tối đa của 1 function](https://phpmd.org/rules/codesize.html#excessivemethodlength).

Cài đặt:
```bash
$ wget -c http://static.phpmd.org/php/latest/phpmd.phar
```
Hoặc thông qua `composer`:
```bash
$ composer global require phpmd/phpmd
```

Cách sử dụng:
```
phpmd <tên_file_hoặc_thư_mục_src> <định_dạng_kết_qủa_trả_về> <ruleset1,ruleset2,...>
```
+ Định dạng kết quả trả về có thể là `xml`, `text` hoặc `html`
+ Có thể kết hợp nhiều ruleset cùng 1 lúc ngăn cách bởi dấu `,`. Các bộ ruleset mặc định gồm: _cleancode, codesize, controversial, design, naming, unusedcode_. 

Ngoài ra có thể [tự định nghĩa](https://phpmd.org/documentation/creating-a-ruleset.html) ruleset bằng file xml. VD: _my_rule.xml_
  ```bash
  $ phpmd code.php text unusedcode,my_rule.xml
  ```
  ```xml
  <!-- my_rule.xml -->
  <?xml version="1.0"?>
  <ruleset name="My first PHPMD rule set"
           xmlns="http://pmd.sf.net/ruleset/1.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://pmd.sf.net/ruleset/1.0.0
                       http://pmd.sf.net/ruleset_xml_schema.xsd"
           xsi:noNamespaceSchemaLocation="
                       http://pmd.sf.net/ruleset_xml_schema.xsd">
      <description>
          My custom rule set that checks my code...
      </description>
      
      <!-- Import rule -->
      <rule ref="rulesets/codesize.xml/CyclomaticComplexity">
          <priority>1</priority>
          <properties>
              <property name="reportLevel" value="10" />
          </properties>
      </rule>
      
      <!-- Import rule default -->
      <rule ref="rulesets/codesize.xml/ExcessiveMethodLength" />
  </ruleset>
  ```


  VD Output XML:
  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
<pmd version="@project.version@" timestamp="2017-06-28T18:20:37+00:00">
  <file name="app.php">
    <violation beginline="464" endline="515" rule="ExcessiveMethodLength" ruleset="Code Size Rules" package="test" externalInfoUrl="http://phpmd.org/rules/codesize.html#excessivemethodlength" function="longMethod" priority="3">
      The function longMethod() has 52 lines of code. Current threshold is set to 50. Avoid really long methods.
    </violation>
  </file>
</pmd>
  ```
Không phải lúc nào cũng có thể áp dụng được tất cả các rule, nhưng có thể đọc về các rule đó để biết tại sao ở đây mình làm thế mà họ lại không :D => http://phpmd.org/rules/index.html
  
 ---
 ### PHP Copy/Paste Detector
 [PHP Copy/Paste Detector (phpcpd)](https://github.com/sebastianbergmann/phpcpd) được dùng để phát hiện những đoạn code trùng lặp trong các file, nghi vấn là do copy / paste từ file này sang file khác, có thể vi phạm nguyên tắc DRY.
 Cách cài đặt đơn giản là download file PHAR:
 ```bash
$ wget https://phar.phpunit.de/phpcpd.phar
$ chmod +x phpcpd.phar
$ sudo mv phpcpd.phar /usr/local/bin/phpcpd
 ```
 Hoặc dùng composer:
 ```bash
$ composer require --dev sebastian/phpcpd
$ ./vendor/bin/phpcpd
 ```
Sử dụng:
```bash
$ phpcpd <files_or_folder>
```
Danh sách filse được ngăn cách bởi dấu cách.

Mặc định, `phpcpd` sẽ xác định trùng lặp bằng cách tìm ra 5 dòng và 70 tokens giống hệt nhau. Có thể thay đổi các giá trị này bằng các tham số:
```bash
$ phpcpd --min-lines=4 --min-tokens=40 src
```
Công cụ cũng có thể xuất ra ouput định dạng xml (xem thêm [PMD](https://pmd.github.io/)):
```bash
$ phpcpd --log-pmd=phpcpd-out.xml src
```
Để xem các tùy chọn khác xem: `phpcpd --help`.

---
### PHPStan
[PHPStan](https://github.com/phpstan/phpstan/) là công cụ khá nổi tiếng trong thời gian gần đây khi PHP 7 ra đời với tính năng strongly-typed được support đầy đủ hơn, cũng như khả năng mở rộng qua extensions support đầy đủ cho các framework như Laravel, Symfony...

- Với Laravel: https://github.com/nunomaduro/larastan
- Và Symfony: https://github.com/phpstan/phpstan-symfony

Chúng ta có thể thử xem cách hoạt động của PHPStan tại trang playground: https://phpstan.org/r/d24f932d-5b0b-4749-8a41-e43720f7c21f

Một số chức năng chính:
- Kiểm tra syntax
- Kiếm tra sự tồn tại của classes, methods, functions và constants
- Kiểm tra sự tồn tại của biến
- PHPDoc được viết chính xác parameter type và return type
- Kiểm tra tham số hoặc biến không được dùng đến
- Kiểm tra đúng kiểu dữ liệu (strict type)

Tool này mình có áp dụng vào 1 dự án Laravel và thấy nó hữu ích nhất là phát hiện những class chưa được import vào (thiếu `use`) :D

### Psalm
[psalm](https://psalm.dev/) được phát triển bởi Vimeo trong bối cảnh năm 2015 thì khối lượng codebase của Vimeo đã trở nên vô cùng lớn, phục vụ hàng triệu requests mỗi giờ.

Mặc dù codebase hiện tại vẫn hoạt động bình thường nhưng khi thay đổi code ở 1 file, để có thể biết được nó có ảnh hưởng đến các chức năng khác hay không thì chỉ có cách đẩy lên production và sẵn sàng rollback :cry: Refactor trở nên khó khăn và codebase vẫn tiếp tục trở nên phình to ra.

Và Psalm đã được ra đời với các chức năng:
- Hạn chế errors khi thực hiện nhiều refactor
- Đảm bảo chất lượng code trong một team lớn
- Đảm bảo không có lỗi nào liên quan đến kiểu dữ liệu khi chạy
- Cung cấp công cụ tự động fix một số lỗi thông thường

<div align="center">

![](https://images.viblo.asia/2c1d8538-dfa6-43e4-a282-f6d0935a7879.png)

</div>

Tool này mình chưa áp dụng, chỉ giới thiệu về độ nổi tiếng của nó và cũng để giới thiệu là một nền tảng lớn như Vimeo vẫn đang dùng PHP :D

---
### PHPQA
[PHPQA](https://edgedesigncz.github.io/phpqa/) là tool tích hợp các công cụ trên vào command duy nhất và format lại ouput, giúp bạn không phải cài riêng từng tool.

<div align="center">
    
![](https://images.viblo.asia/08618e29-1634-4a40-af17-dedb06601590.png)
    
</div>

 ---
### Online Tools
Ngoài các tool chạy ở local, còn có nhiều công cụ, dịch vụ online khác, tuy nhiên, khi sử dụng các công cụ này bạn cần lưu ý đến sự bảo mật của dự án.
+ [DevBug](http://www.devbug.co.uk/) là một công cụ online được viết chủ yếu JavaScript. Mục đích của công cụ này là tìm ra các lỗi tiềm tàng về bảo mật.
+ [Checkmarx](http://lp.checkmarx.com/php-code-analysis/) - Check các lỗi bảo mật.
+ [Insight](https://insight.sensiolabs.com/): một công cụ của SensioLabs, có chức năng tìm bugs. lỗi bảo mật, báo cáo thống kê.
+ [RIPS](https://www.ripstech.com/): tìm lỗi bảo mật, check performance.

 ---
### Tự tạo tool dựa trên PHP Parser
[PHP Parser](https://github.com/nikic/PHP-Parser) là một thư viện giúp phân tích mã nguồn PHP thành dạng cấu trúc [cây AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) và có điều đặc biệt đó là nó được viết chính bằng PHP. 
Sử dụng dữ liệu từ cây AST chúng ta có thể tự tạo các công cụ phục vụ cho một mục đích cụ thể nào đó, ví dụ: [PHP-Reaper](https://github.com/emanuil/php-reaper)...

---

Ngoài ra còn có rất nhiều công cụ khác như [phan](https://github.com/etsy/phan), [PHPMetrics](https://github.com/phpmetrics/PhpMetrics), [pdepend](https://github.com/pdepend/pdepend),... bạn có thể xem tại trang github
- [exakat/php-static-analysis-tools](https://github.com/exakat/php-static-analysis-tools).
- https://phpqa.io/
- https://github.com/jakzal/phpqa
- https://medium.com/vimeo-engineering-blog/fixing-code-that-aint-broken-a99e05998c24
- https://badootech.badoo.com/php-code-static-analysis-based-on-the-example-of-phpstan-phan-and-psalm-a20654c4011d

Thực tế thì công cụ mình dùng nhiều nhất là `phpcs`, `phpstan`, `phpunit` và kết hợp với editor (VSCode và [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)). Bạn nào dùng tool nào thấy hay thì chia sẻ thêm nhé, như `phan`, `phpstan`, `psalm`. Cảm ơn các bạn đã theo dõi.