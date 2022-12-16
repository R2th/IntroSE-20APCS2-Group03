# Mở đầu
Trong hai bài viết trước, tôi đã cùng các bạn điểm qua những vấn đề nan giải trong quá trình quản lý thư viện mã nguồn mở PHP cũng như cách mà Composer đã giúp chúng ta đơn giản hóa công việc hơn bao giờ hết. Tôi cảm thấy khó khăn khi đặt ra tiêu đề của bài viết này vì tôi cảm thấy những điều tôi chia sẻ dưới đây có thể đơn giản nhưng lại phức tạp, cơ bản nhưng lại nâng cao... Sở dĩ tôi phải nói như vậy là vì để hiểu được cách làm việc của Composer (hay cả Dependency Manager khác), các bạn phải tìm hiểu thêm rất nhiều thứ liên quan khác như version constraints, version control system, respository host, autoload file (với php),... Có vẻ hơi nhiều nhỉ? Tạm bỏ qua những thứ "linh tinh" này, chúng ta bắt đầu tìm hiểu nhé.

# Giới thiệu
Cùng nhìn lại chủ đề của series này, các bạn sẽ thấy rằng tôi đề cập đến một từ khóa. Đó là "Dependency Manager" hay "Dependency Management Tool". Vậy thì "Dependency Manager" thực sự là gì? Tại sao Composer là một "Dependency Manager"?

Trước đây, tôi thường cho rằng hai cụm từ "Package Manager" và "Dependency Manager" có cùng ý nghĩa. Và như lẽ tự nhiên, nhiều lúc tôi dùng chúng khá "tùy tiện". Tôi chỉ thực sự đặt ra câu hỏi cho bản thân khi nghiêm túc đọc được một câu giải thích ngắn gọn trên trang [Composer Introduction](https://getcomposer.org/doc/00-intro.md).
> Composer is not a package manager in the same sense as Yum or Apt are...

Tôi tạm dịch là "Composer không phải là một Package Manager tương tự như YUM hoặc APT". Vâng, Composer không phải là một Package Manager mà là một Dependency Manager. Trong đầu tôi tự đặt ra hàng tá các câu hỏi thắc mắc tại sao?, như thế nào?...

Thực tế, tôi tự thấy mình vẫn chưa đọc hay nghiền nghẫm đủ tài liệu để phân biệt hai khái niệm Tiếng Anh này. Cho nên, tôi sẽ chỉ nói ra một vài gạch đầu dòng suy nghĩ chủ quan của mình và rất mong nhận được sự đóng góp thông tin từ tất cả các bạn. Trước hết, hãy cùng tôi làm rõ một số từ "nguyên tố":

- "Package" hoặc "Software Package" là một tập hợp các tệp với nhiều loại hay chức năng khác nhau. Tập hợp này có thể bao gồm mã nguồn, tệp thực thi, (ví dụ như tệp .exe cho windows), tệp nhị phân, tệp cấu hình, hình ảnh, videos,... Chúng được đóng gói lại thành một nhóm có mối liên hệ chặt chẽ, thường là một phần mềm hoàn chỉnh hay tập hợp mã nguồn dùng cho lập trình. Ví dụ như trình duyệt google chrome, hay trình soạn thảo vscode mà tôi đang dùng chẳng hạn. Một tiện ích mở rộng (extension) của chrome cũng có thể coi là một package.

- "Dependency" là sự phụ thuộc. Trong phát triển phần mềm, "sự phụ thuộc" nghĩa là một package có thể yêu cầu hệ thống phải cài đặt nhiều packages khác để nó có thể hoạt động được hoặc chính bản thân package đó cũng sẽ được yêu cầu bởi rất nhiều packages khác. Ví dụ, trước đây, khi sử dụng windows, tôi thường cài đặt AppServ mà nó thì yêu cầu phải có một số môi trường như c++ redistributable. Như vậy, c++ redistributable là một dependency của AppServ, c++ redistributable phải được cài đặt thì AppServ mới có thể hoạt động được.

Theo đó, tôi sẽ có khai khái niệm trọng tâm sau:

- Package Manager là công cụ dùng để cấu hình một hệ thống (thường là hệ điều hành). Nó sẽ giúp ta thiết lập môi trường để chạy hay xây dựng nhiều phần mềm khác nhau. Nó có phạm vi toàn cục và ảnh hưởng đến toàn bộ hệ thống. Ví dụ, tôi sử dụng Ubuntu HĐH 16.04 và cài đặt phần mềm - package A; sau khi cài đặt, phần mềm A có thể được sử dụng toàn cục, thực thi ở bất cứ đâu và bởi bất kì tài khoản người dùng nào.

- Dependency Manager thì gắn liền với từng phần mềm hay dự án cụ thể. Nó có phạm vi cục bộ, chỉ quản lý packages cho từng dự án riêng lẻ. Theo đó, nó cài đặt những packages cần thiết vào trong một thư mục của dự án chẳng hạn và tất nhiên chỉ sử dụng cho dự án đó mà thôi. Khi chuyển sang dự án khác, chúng phải cài đặt và quản lý những packages hoàn toàn khác.

Mặc dù so sánh là vậy, nhưng với vốn hiểu biết ít ỏi hiện tại, tôi vẫn cảm thật khó khăn để hiểu "đúng" hơn về ngữ nghĩa của Package và Dependency (Manager). Thôi thì hãy đặt chúng vào một hoàn cảnh cụ thể như trong trường hợp này để tạm chấp nhận là chúng khác biệt. Tóm lại, Composer là Dependency Manager đúng như lời giải thích từ trang chủ, nó chỉ mặc định quản lý dependencies cho từng dự án riêng lẻ trên phạm vi cục bộ của dự án đó.

(Tôi sẽ tiếp tục tìm hiểu và phân tích những điều này, hy vọng gặp lại các bạn vào một bài viết khác để làm nó trở lên sáng tỏ hơn)

# Sử dụng
Nếu các bạn đã đọc bài viết trước trong series của tôi thì chắc hẳn đã cài đặt Composer cho máy tính cá nhân của mình. Còn nếu không, các bạn hãy tự tìm hiểu cách cài đặt trên Internet nhé. Composer chạy đa nền tảng, đặc biệt với 3 loại phổ biến là Windows, Unix, Linux. Trang chủ của Composer đã hướng dẫn khá chi tiết việc cài đặt hoặc các bạn có thể thoải mái tham khảo những bài hướng dẫn khác.

Để sử dụng Composer nhằm mục đích quản lý dependencies cho một dự án, chúng ta phải tạo ra một tệp với tên composer.json trong thư mục gốc của dự án đó. Tệp này được dùng để khai báo những dependencies cần thiết cũng như nhiều thông tin quan trọng khác.

## Tên gói và phiên bản (Package Name and Version Constraints)
Nhiệm vụ chính của Composer là quản lý dependencies, do vậy dễ hiểu rằng việc quan trọng nhất chính là khai báo những dependencies mà dự án cần sử dụng trong phần có khóa "require".

```json
{
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

Dễ dàng nhận thấy "monolog/monolog" chính là tên gói (package name), "1.0.*" ràng buộc về phiên bản (version constraints). Cụ thể thì ví dụ trên đây yêu cầu monolog/monolog với phiên bản phù hợp 1.0.0, 1.0.1,... Chúng ta sẽ cùng tìm hiểu từng từ khóa tương tứng.

- "package name" là tên gói theo đúng nghĩa đen :D. Các bạn chú ý rằng với Composer, mọi tên gói đều chứa một dấu gạch chéo "/" (slash). Ví dụ, một số gói phổ biến mà tôi có thể kể tên là symfony/http-foundation, symfony/console, symfony/var-dumper,..., Vậy nó thực sự có ý nghĩa gì? Đầu tiên, cái tên trước dấu gạch chéo có thể hiểu là một một nhóm các gói cùng chủ sở hữu (packages' owner, packages' group) hoặc cùng một mục đính cụ thể. Đây thường là tên riêng, có thể là nhãn hiệu hay tên của tác giả chẳng hạn. Tiếp theo, cái tên phía sau là "tên chính" - thể hiện bản chất hoặc chức năng mà package đó thực hiện. Nhìn lại ví dụ trên, symfony/http-foundation là một gói định nghĩa những chức năng xử lý liên quan đến tầng HTTP, nó giúp chúng ta xử lý HTTP Request và tạo ra HTTP Response. Ở đây, "symfony" chính là tên chủ sở hữu, http-foundation là chức năng mà package cung cấp. Chúng ta đã biết được ý nghĩa của package name nhưng có vẻ Composer quy định hơi phức tạp nhỉ? Không hề, đối với một dự án, Composer mặc định cài đặt các gói vào trong một thư mục tên là "vendor". Để thuận tiện cho việc quản lý, trong vendor, trước hết, nó sẽ tạo ra các thư mục là tên "packages' group"; sau đó, nó sẽ tạo ra nhiều thư mục con bên trong để chứa các tệp cần thiết. Cuối cùng, package "monolog/monolog" sẽ được cài đặt với đường dẫn /path/to/project/vendor/monolog/monolog. Hãy xem cấu trúc thư mục bên dưới:

```
/project
    /app
    /vendor
        /monolog
            /monolog <- Package monolog/monolog
        /symfony
            /console <- symfony/console
            /http-founcation <- symfony/http-foundation
            /var-dumper <- symfony/var-dumper
```

- "version constraints" cũng là ràng buộc phiên bản theo đúng nghĩa đen. Với đa phần các sản phẩm nói chung và phần mềm nói riêng, phiên bản là thứ gì đó quá quen thuộc. Ví dụ như ô tô A phiên bản 2.0G, 3.5Q hay cái gì đó tương tự, còn phần mềm thì khỏi nói, gói phần mềm B có phiên bản 4.0, 5.0, 1.0.0-alpha, 2.0.1-alpha... vân vân và mây mây. Tuy quen thuộc là vậy nhưng tôi nghĩ rằng để một lập trình viên thực sự hiểu và biết cách dùng phiên bản phù hợp khi phát triển phần mềm không phải là một điều dễ dàng và càng không thể hiểu hết trong một sớm một chiều. Với giới hạn của chủ đề bài viết này, tôi sẽ không giải thích chi tiết về cách sử dụng phiên bản phần mềm. Tuy nhiên, tôi nghĩ rằng có vài thông tin hữu ích mà các bạn cần biết. Một quy tắc đánh phiên bản phần mềm đang được sử dụng phổ biến hiện nay chính là [Semantic Versioning](https://semver.org/). Hãy ghé qua trang chủ của nó để tìm hiểu thêm thông tin nhé.

## Cách hoạt động (In Background)
Vâng, bấy lâu nay từ newbie đến "older newbie" tôi đều hằng ngày chăm chỉ chạy lệnh "composer install" hay "composer update",... và chờ đợi điều kỳ diệu xảy ra. Thật khó khăn và phải mất rất nhiều thời gian tôi mới có thể hiểu một điều gì đó được cho là "hay ho" một chút về cái thứ mà cả Thế Giới đang sử dụng - Composer. Các bạn xem lại phần "require" thì sẽ hiểu mọi sự không hề đơn giản chút nào. Nói là cài đặt các packages thì dễ dàng quá, cài đặt như thế nào? lấy tài nguyên ở đâu? tại sao lấy ở đó?... Để có thể hoạt động một cách "ảo diệu" như chúng ta vẫn thường thấy, không phải cứ cài tệp thực thi vào máy tính của mình là có thể sử dụng Composer một cách trơn tru. Ẩn đằng sau nó là một hệ thống với tên gọi kho chứa gói - repository hay package repository, mặc định đặt tại là [packagist.org](https://packagist.org). Hãy tưởng tượng rằng bạn đang ở trong một dự án php cần sử dụng composer, dự án yêu cầu "monolog/monolog:1.0.*" thế thôi. Khi tôi chạy "composer install", điều gì đã thực sự xảy ra:

1. Tìm kiếm.
- Cùng với tên gói và ràng buộc phiên bản được yêu cầu, Composer sẽ phải phân tích và truy cập đến package repository của nó, tìm kiếm xem có gói nào tên là monolog/monolog không? khi đã xác định được gói này có tồn tại, nó phải tiếp tục xử lý xem có phiên bản nào phù hợp với yêu cầu không? Nếu đã tìm được "hàng", nó sẽ chuyển sang thực hiện bước sau, còn không, nó sẽ báo lỗi đại loại như "Could not find the required package".

2. Tải về.
- Có một điều mà tôi nghĩ rằng các bạn mới sẽ rất khó tưởng tượng được tổng quan. Đó là Composer tải các gói về như thế nào? Packagist là kho chứa gói mặc định của Composer có thể khiến ai đó khi mới sử dụng có thể hiểu lầm rằng mã nguồn được tải về từ đây. Sự thật không phải như vậy, packagist chỉ là nơi đăng ký sự tồn tại của một gói, nó cũng giống như việc bố mẹ làm giấy khai sinh cho con cái vậy. Vâng, tôi nhấn mạnh lại rằng, packagist chỉ là nơi chứa "giấy khai sinh" của một gói nào đó để giúp Composer xác minh rằng gói đó thực sự tồn tại. Khi đăng ký thông tin cho một gói, một thứ bắt buộc mà bạn phải cung cấp đó là Repository URL (Git/Svn/Hg) - Các bạn hãy tự tìm hiểu những từ khóa này nhé. :D Repository URL ở đây chính là Repository Host - nơi đích thị lưu trữ tài nguyên của một package. Như vậy, sau khi tìm kiếm được gói phù hợp, Composer phải truy cập đến Repository URL của gói đó (với monolog/monolog, Composer sẽ tải về từ đây https://github.com/Seldaek/monolog)

- Lệnh "composer install" hay "composer require" có một option là "--prefer-dist" có thể nhiều người chưa biết, nếu tôi không lầm thì nó là mặc định trong phiên bản composer hiện tại và đã như vậy trong nhiều phiên bản trước đó. "--prefer-dist" được cung cấp trong command line nghĩa là Composer sẽ tải về một tệp nén .zip hay .tar.gz thay vì sử dụng vcs (Version System Control) để clone trực tiếp. Nghĩa là sau khi bước tải về được hoàn thành, chúng ta sẽ có một file nén bên trong dự án của mình. Thật phức tạp đúng không nào? Trường hợp này, tôi sẽ chỉ giải thích sơ qua về cách cài đặt "--prefer-dist". Nếu các bạn muốn tìm hiểu sâu hơn, hãy tìm kiếm với "composer install --prefer-source".

3. Giải nén.
- Khi đã có được tệp nén chứa nguồn của một gói, công việc tiếp theo mà Composer phải thực hiện đó là giải nén vào đúng thư mục mà nó quy định. Với ví dụ trên, nguồn của gói monolog/monolog sẽ được lưu lại trong /path/to/project/vendor/monolog/monolog. Sau đó, Composer xóa tệp nén đó đi.

4. Đăng ký "Autoload Files".
- Chưa dừng lại ở đó, sau khi đã giải nén các gói vào vị trí phù hợp kiểu như "Cha mẹ đặt đâu, con ngồi đó", Composer sẽ phải làm một việc vô cùng quan trọng. Đó là đăng ký "Autoload Files". Việc này giúp loại bỏ gần như hoàn toàn thao tác "require" hay "include" trong các dự án PHP hiện đại. Lưu ý rằng, Composer chỉ là công cụ được viết bằng PHP và dĩ nhiên nó yêu cầu HĐH cài đặt PHP để có thể hoạt động, nó giúp việc đăng ký autoload files trở nên dễ dàng hơn chứ không hề xử lý được việc này. Cụ thể, nó sẽ sử dụng một feature php built-in sẵn có [spl_autoload_register](http://php.net/manual/en/function.spl-autoload-register.php) với cơ chế lazyload mà tôi đã nói đến trong bài viết trước. Đó là lý do các bạn có thể thoải mái gọi tên các classs, interfaces, traits, user defined functions,... trong các framework như Laravel, Symfony,... mà không cần phải quan tâm đến việc require hay include.

...

Vậy đó, còn nhiều tác vụ khác như "optimize", "sort defined packages",... có thể được thực hiện sau đó nhưng tôi sẽ không đề cập chi tiết hơn nữa ở bài viết này. Sau khi hiểu ra được vài bước "đơn giản" như thế này, tôi đã lại phải thốt lên một câu nói cửa miệng quen thuộc của mình "Cuộc sống thật khó khăn!". (bow)

# Tổng kết
Tuy bài viết có nội dung ngắn gọn, toàn chữ là chữ và mang tính chất lý thuyết "đặc" nhưng tôi hy vọng có thể cung cấp cho các bạn những hiểu biết vô cùng quan trọng về Composer cũng như một số thông tin liên quan hữu ích khác. Bên cạnh đó, đây cũng là tiền đề để chúng ta có thể hiểu rõ hơn về Composer và xa hơn nữa là biết sử dụng "tốt hơn", làm chủ thao tác với Composer. Thế mới biết, ẩn chứa bên trong sự đơn giản, tiện lợi là một tập hợp những thứ loằn ngoằn, phức tạp, cả một bầu trời kiến thức mà chúng ta cần tìm hiểu.

Chúc các bạn học tập và làm việc vui vẻ!