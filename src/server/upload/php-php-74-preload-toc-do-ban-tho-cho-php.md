**PHP Preload** - what the hell, man? 🤔🤔

# [Share from Chung Nguyễn Blog](https://chungnguyen.xyz/posts/php-7-4-preload-toc-do-ban-tho-cho-php)

## PHP Lifecycle - PHP opcode

Trước khi nói về **PHP Preload** cho Chung được phép nói một chút về quá trình mà một file PHP khởi chạy. Khi chúng ta chạy một đoạn code PHP, có rất nhiều thứ xảy ra sâu bên dưới mà ta không nhìn thấy. Một cách khái quát, bộ thông dịch PHP trải qua 4 giai đoạn khi nó thực thi 1 đoạn code (Xem thêm về 4 giai đoạn này [tại đây](https://techmaster.vn/posts/34207/php-chay-nhu-nao-tu-source-code-den-render):

*   Lexing
*   Parsing
*   Biên dịch (compilation)
*   Thông dịch (intepretation)

![](https://chungnguyen.xyz/image/posts/php/php-life-circle.png?t=201811151911)

Nhìn vào tấm hình trình bạn sẽ thấy khi một file PHP được gọi để thực thi nó sẽ trải qua 4 bước đầu tiên đến cuối cùng trả về kết quả cho người dùng. Quá trình này là cần thiết cho việc thực thi lệnh lần đầu, nhưng thực sự không cần thiết cho những lần gọi sau đó, vì quá trình vẫn thực hiện đầy đủ 4 bước trong khi **chỉ cần bước thứ 4 (chạy opcode) là đủ**, dù file PHP không hề có sự thay đổi. Điều này chính là nguyên nhân chính dẫn tới sự trì trệ chậm chạp của PHP!!!

Đọc đến đây, người bình thường cũng sẽ thốt lên: "đậu xanh rau má sao có cách nào bỏ 3 bước đầu tiên đi cho đỡ khổ, mà còn nhanh hơn không 😡😡❓❗❗"

----- ĐÚNG ----

Chính từ đó mới nảy sinh một thứ gọi là OPCODE CACHE. Opcode cache chính là quá trình cache lại 3 bước đầu tiên, từ đây khi PHP được gọi nó sẽ kiểm tra xem file php đã được cache opcode hay chưa, nếu có rồi nó sẽ chạy luôn opcode mà không cần phải trả qua 3 bước lãng phí kia.

![](https://chungnguyen.xyz/image/posts/php/php-life-circle-after-cache.png)

Câu chuyện đi đến đây coi như kết thúc rồi nha. Bạn nào còn lăn tăn opcode là gì thì nó viết tắt của từ **operation code**, nó gần tương đương với file .java sau khi biên dịch là .class và .dll trong .NET

Đến thời điểm này, **opcode cache** đã trải qua mấy đời từ APC ⇒ Turck MMCache ⇒ Zend OpCache mang lại cho PHP một tốc độ tương đối tốt và dành được sự trân trọng đến bây giờ. 

## PHP Preload là gì? Tìm hiểu về PHP Preload

Như đã trình bày ở trên, với bộ nhớ cache opcode, các tệp được biên dịch một lần (trong request đầu tiên), và sau đó được lưu trữ trong bộ nhớ dùng chung. Tất cả các yêu cầu HTTP sau đó sẽ được sử dụng trong bộ nhớ chia sẻ.

![](https://chungnguyen.xyz/image/posts/php/opcache-gui.png?_t=1542278625)

Trong khi lưu trữ các tập tin trong một bộ nhớ cache opcode loại bỏ đã loại bỏ được thời gian tiêu tốn cho biên dịch - **NHƯNG** vẫn còn thời gian tiêu tốn liên quan đến việc **lấy một tập tin từ bộ nhớ cache** 😴. **Chúng tôi (PHP)** vẫn phải **kiểm tra xem tập tin nguồn đã được sửa đổi chưa**, sao chép một số phần nhất định của class và function từ bộ nhớ đệm chia sẻ sang bộ nhớ process, ... Đáng chú ý, vì mỗi tệp PHP được biên dịch và lưu trữ hoàn toàn độc lập với bất kỳ tệp nào khác, chúng ta **có thể không giải quyết được** sự phụ thuộc giữa các lớp được lưu trữ trong các tệp khác nhau khi chúng tôi lưu trữ các tệp trong bộ nhớ cache opcode và phải liên kết lại các phụ thuộc lớp vào thời gian chạy trên mỗi yêu cầu (request).

Đề xuất lần này (Preload) được lấy cảm hứng từ công nghệ "**Chia sẻ dữ liệu lớp (**<span style="color: #333333; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 1rem;">**Class Data Sharing)**"</span><span style="font-size: 1rem;"> được thiết kế cho Java HotSpot VM. Nó nhằm mục đích cung cấp cho người dùng khả năng trao đổi linh hoạt mà mô hình PHP thông thường cung cấp để tăng hiệu suất.</span>

Khi khởi động máy chủ - trước khi bất kỳ mã ứng dụng nào được chạy - chúng tôi có thể tải một tập hợp các tệp PHP nhất định vào bộ nhớ - và làm cho nội dung của chúng "có sẵn vĩnh viễn" cho tất cả các yêu cầu tiếp theo sẽ được máy chủ đó phục vụ.

Tất cả các hàm và lớp được xác định trong các tệp này sẽ sẵn sàng được lấy ra, giống hệt như các thực thể nội bộ ( internal entities) ví dụ như: `strlen()` hoặc `Exception`. Bằng cách này, chúng tôi có thể  **PRELOAD - tải trước** toàn bộ hoặc một phần frameworks và thậm chí toàn bộ thư viện lớp ứng dụng (application class library).

Nó cũng sẽ cho phép giới thiệu các hàm "tích hợp sẵn" sẽ được viết bằng PHP (tương tự như HHVM sytemlib). Tính trao đổi linh hoạt sẽ bao gồm việc không thể cập nhật các tệp này khi máy chủ đã được khởi động (việc cập nhật các tệp này trên hệ thống tệp sẽ không làm bất kỳ điều gì; Khởi động lại máy chủ sẽ được yêu cầu áp dụng các thay đổi); Ngoài ra, cách tiếp cận này sẽ **không tương thích với các máy chủ lưu trữ nhiều ứng dụng hoặc nhiều phiên bản ứng dụng** - vì sẽ có **các lớp nhất định có cùng tên** - nếu các lớp đó được tải trước từ mã của một ứng dụng, các ứng dụng sau đó sẽ có khả năng xung đột.

** Chung nghĩ tương lai sẽ có cách giải quyết đừng quá hoang mang - vì server của mình cũng đang đặt nhiều application trên này (website) **

## PHP Preload hoạt động như thế nào

Ô kê, tính năng preload này sẽ được điều khiển bởi một directive có tên là **opcache.preload** ở trong file php.ini.

Ví dụ dưới đây sẽ giới thiệu một helper function và sử dụng nó để **preload** toàn bộ Zend framework.
```php
    <?php
    function _preload($preload, string $pattern = "/\.php$/", array $ignore = []) {
      // nếu preload là một mảng
      if (is_array($preload)) {
        // đệ quy để preload từng path
        foreach ($preload as $path) {
          _preload($path, $pattern, $ignore);
        }
      } else if (is_string($preload)) {
        $path = $preload;
        // nếu $path không nằm trong danh sách từ chối thì preload
        if (!in_array($path, $ignore)) {
          // nếu nó là 1 thư mục
          if (is_dir($path)) {
            // đệ quy đọc hết file .php (chính là $pattern) trong thư mục đó và preload
            if ($dh = opendir($path)) {
              while (($file = readdir($dh)) !== false) {
                if ($file !== "." && $file !== "..") {
                  _preload($path . "/" . $file, $pattern, $ignore);
                }
              }
              closedir($dh);
            }
          // preload file .php
          } else if (is_file($path) && preg_match($pattern, $path)) {
            if (!opcache_compile_file($path)) {
              trigger_error("Preloading Failed", E_USER_ERROR);
            }
          }
        }
      }
    }

    set_include_path(get_include_path() . PATH_SEPARATOR . realpath("/var/www/ZendFramework/library"));
    // preload hết code của Zend framework
    _preload(["/var/www/ZendFramework/library"]);
```
Như đã đề cập ở trên, các tệp được tải sẵn sẽ được lưu trữ trong bộ nhớ opcache mãi mãi. Việc sửa đổi các tệp nguồn tương ứng của chúng sẽ không có bất kỳ ảnh hưởng nào mà không cần khởi động lại máy chủ.

Tất cả các hàm và hầu hết các lớp được định nghĩa trong các tệp này sẽ được tải vĩnh viễn vào các hàm và các lớp của PHP và trở nên vĩnh viễn có sẵn trong ngữ cảnh của bất kỳ yêu cầu nào trong tương lai. (Có sẵn giống như các hàm core của PHP)

Trong quá trình tải trước - preload, PHP cũng giải quyết các phụ thuộc lớp (class dependencies) và các liên kết với cha mẹ như các interfaces và traits. Nó cũng loại bỏ những bao gồm (include) không cần thiết và thực hiện một số tối ưu hóa khác.

Có 2 hàm cần quan tâm trong preload đó là:

*   `opcache_reset()`: hàm này vốn sẽ reset toàn bộ opcode cache lưu trong opcache, NHƯNG nó sẽ không reset các file preload (Nguyên nhân là reset sẽ dẫn đến crash cho vài process khác đang sử dụng preload)
*   `opcache_get_status()`: Hàm này trả về thông tin trạng thái về cache instance, thì bây giờ nó sẽ được mở rộng để cung cấp thông tin về các hàm, lớp và tập lệnh được preload - (sẽ được bật bởi một index "_preload_statistics_" nào đó)

## Sự hạn chế trong Preloading

Chỉ các lớp chưa được giải quyết (unresolved ) mà không có cha mẹ,  interfaces, traits và constant values mới có thể được tải trước. Nếu một lớp không thỏa mãn điều kiện này, nó được lưu trữ trong opcache SHM như là một phần của tập lệnh PHP tương ứng giống như cách mà lúc chưa có preloading. Ngoài ra, chỉ các thực thể cấp cao nhất không được lồng trong cấu trúc điều khiển (ví dụ: if() ...) mới có thể được tải trước.

Trên Windows, bạn cũng không thể tải trước các lớp được kế thừa từ các lớp bên trong.

## Các thay đổi không tương thích ngược (Backward Incompatible)

**Preload** không ảnh hưởng đến bất kỳ chức năng nào trừ khi nó được sử dụng một cách rõ ràng. Tuy nhiên, nếu được sử dụng, nó có thể phá vỡ một số hành vi ứng dụng, bởi vì các lớp và hàm được **preload** luôn có sẵn và khi được kiểm tra bằng `function_exists()` hoặc `class_exists()` nó sẽ luôn trả về **TRUE**, và có thể dẫn đến ngăn chặn thực thi đoạn code dự kiến. ⚠️⚠️

Như đã đề cập ở trên, việc sử dụng không đúng trên máy chủ có nhiều ứng dụng cũng có thể dẫn đến lỗi. Vì các ứng dụng khác nhau (hoặc các phiên bản khác nhau của cùng một ứng dụng) có thể có cùng tên class/function trong các file khác nhau, nếu một phiên bản của lớp được preload - nó sẽ ngăn tải bất kỳ phiên bản nào khác của lớp đó được định nghĩa trong một file khác. ⚠️⚠️

## Phiên bản PHP nào sẽ sử dụng Preload

7.4

## Có thực sự sẽ đạt tốc độ bàn thờ như lời đồn?

Sử dụng preload mà không có bất kỳ chỉnh sửa nào với code, khi test ZF1_HelloWorld sẽ đạt 3620 request trên 1 giây so với 2650 khi chưa có preload. (3620 req/sec vs 2650 req/sec) Như vậy hiệu suất đã gia tăng khoảng 30%

Tương tự với ZF2Test thu được (1300 req/sec vs 670 req/sec) ⇒ công lực tăng 50%

Tuy nhiên, tốc độ thực tế sẽ phụ thuộc vào tỷ lệ giữa chi phí khởi động của code và thời gian chạy của code, và có thể sẽ thấp hơn (**tức là sẽ hơn con số 30 50% kia nhé**). Điều này có thể sẽ mang lại những lợi ích đáng chú ý nhất với các yêu cầu với thời gian rất ngắn, chẳng hạn như các microservices (Lumen, ...).

## Những vấn đề được xét tới trong tương lai

*   Việc nạp trước có thể được sử dụng như HHVM systemlib để định nghĩa các hàm / lớp "chuẩn" trong PHP
*   Có thể biên dịch trước preload script và sử dụng biểu mẫu nhị phân (perfect như là .so hoặc .dll luôn 😱) để tăng tốc máy chủ khởi động.
*   Cùng với ext/FFI (phần mở rộng nguy hiểm), chúng tôi chỉ có thể cho phép chức năng FFI trong các tệp PHP được preload, nhưng không cho phép trong các tệp thông thường
*   Có thể thực hiện tối ưu hóa tích cực hơn và tạo mã JIT tốt hơn cho các hàm và lớp được tải sẵn (tương tự như HHVM Repo Authoritative mode trong HHVM)
*   Nó sẽ là tuyệt vời (hẳn là tuyệt vời rồi ahihi 😂😂), để mở rộng một số loại cơ chế triển khai, cập nhật các gói được preload mà không cần khởi động lại máy chủ.

## Kết quả của đề xuất Preload

48/48 phiếu bầu tán thành đề xuất này nói lên tất cả, PHP linh hoạt, mạnh mẽ và giờ đây nó được gia tăng thêm một phần công lực nữa đó là

**⚡⚡⚡ SPEEDDDDDDDDD ⚡⚡⚡**

Bài viết được đăng tải trên website [https://chungnguyen.xyz](https://chungnguyen.xyz) dựa trên [https://wiki.php.net/rfc/preload](https://wiki.php.net/rfc/preload). Với tràn đầy tình yêu và tuổi thơ xem phim kiếm hiệp.  
Nếu bạn yêu thích Chung hãy dành một like cho bài viết này và [Page Chung Nguyễn Blog](https://www.facebook.com/2187277441590132)