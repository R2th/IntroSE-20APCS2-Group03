Tài liệu này mô tả một interface đơn giản nhưng có thể mở rộng cho một mục nhớ cache và một trình điều khiển bộ nhớ đệm.

Việc triển khai cuối cùng CÓ THỂ trang trí các đối tượng có nhiều chức năng hơn so với đề xuất nhưng chúng phải thực hiện các interface/chức năng được chỉ định trước.(lời bình: tuân theo SOLID đó)
# 1.1 Giới thiệu
Caching là một cách phổ biến để cải thiện hiệu năng của bất kỳ dự án nào, làm cho các thư viện lưu trữ một trong những tính năng phổ biến nhất của nhiều framework và thư viện. Khả năng tương tác ở cấp độ này có nghĩa là các thư viện có thể thả các triển khai bộ nhớ đệm của riêng chúng và dễ dàng dựa vào một framework được cung cấp cho chúng bởi framework hoặc một thư viện bộ nhớ đệm chuyên dụng khác.

PSR-6 giải quyết vấn đề này, nhưng theo một cách khá chính thức và tiết tú cho những trường hợp sử dụng đơn giản nhất cần sử dụng. Cách tiếp cận đơn giản này nhằm mục đích xây dựng một giao diện được sắp xếp hợp lý cho các trường hợp phổ biến. Nó độc lập với PSR-6 nhưng đã được thiết kế để làm cho khả năng tương thích với PSR-6 càng đơn giản càng tốt.
# 1.2 Định nghĩa
Định nghĩa cho Thư viện gọi, Thư viện triển khai, TTL, Hết hạn và Khóa được sao chép từ PSR-6 như các giả định tương tự là đúng.

- **Thư viện gọi** - Thư viện hoặc mã thực sự cần các dịch vụ bộ nhớ cache. Thư viện này sẽ sử dụng các dịch vụ lưu bộ nhớ đệm thực hiện các giao diện của tiêu chuẩn này, nhưng nếu không sẽ không có kiến thức về việc triển khai các dịch vụ bộ nhớ đệm đó.
- **Thư viện triển khai** - Thư viện này chịu trách nhiệm triển khai tiêu chuẩn này để cung cấp các dịch vụ lưu trữ vào bất kỳ Thư viện gọi điện nào. Thư viện triển khai PHẢI cung cấp một lớp thực hiện giao diện `Psr\SimpleCache\CacheInterface`. Thư viện triển khai PHẢI hỗ trợ chức năng TTL tối thiểu như được mô tả dưới đây với độ chi tiết toàn phần hai.
- **TTL** - Thời gian sống (Time To Live) của một item là khoảng thời gian giữa khi mục đó được lưu trữ và nó được coi là cũ. TTL thường được định nghĩa bởi một số nguyên đại diện cho thời gian tính bằng giây, hoặc một đối tượng `DateInterval`.
- **Hết hạn** - Thời gian thực tế khi một mục được đặt thành cũ. Điều này được tính bằng cách thêm TTL vào thời điểm khi một đối tượng được lưu trữ.

Một mục có TTL thứ ba 300 giây được lưu trữ lúc 1:30:00 sẽ hết hạn 1:35:00.

Thư viện triển khai CÓ THỂ hết hạn một mục trước Thời hạn Hết hạn yêu cầu của nó, nhưng PHẢI xử lý một mục khi hết hạn sau khi đã hết thời gian hết hạn. Nếu một thư viện gọi yêu cầu một mục được lưu nhưng không chỉ định thời gian hết hạn hoặc chỉ định thời gian hết hạn rỗng hoặc TTL, Thư viện triển khai CÓ THỂ sử dụng thời lượng mặc định được định cấu hình. Nếu không có thời gian mặc định đã được thiết lập, Thư viện triển khai PHẢI giải thích rằng yêu cầu lưu trữ vĩnh viễn mục đó hoặc miễn là triển khai cơ bản hỗ trợ.

Nếu một TTL âm hoặc không được cung cấp, mục PHẢI bị xóa khỏi bộ nhớ cache nếu nó tồn tại, vì nó đã hết hạn.
- **Khóa** - Là 1 chuỗi kí tự độc nhất đại diện cho dữ liệu được lưu ở vùng đệm. Thư Viện Cài Đặt PHẢI hỗ trợ các kí tự `A-Z`, `a-z`, `0-9`, `_`, và `.` theo bất kì thứ tự nào của chuẩn mã hóa UTF-8 và độ dài lên tới 64 kí tự. Thư Viện Cài Đặt CÓ THỂ hỗ trợ thêm các ký tự khác, nhưng PHẢI hỗ trợ phần cơ bẩn đã được nêu ra. Các thư viện hoàn toàn tùy ý về các chuỗi ký tự nhưng PHẢI có khả năng quay trở lại chuỗi không được mã hóa. Các kí tự sau được dùng cho nâng cấp trong tương lai nên KHÔNG ĐƯỢC phép đưa vào `{}()/\@:`.
- **Cache** - Đối tượng triển khai `Psr\SimpleCache\CacheInterface`.
- **Lỗi cache** - Một lỗi cache sẽ trả về null và do đó phát hiện nếu một trong những lưu trữ null là không thể. Đây là độ lệch chính so với giả định của PSR-6.
# 1.3 Cache
Việc triển khai CÓ THỂ cung cấp một cơ chế để người dùng chỉ định TTL mặc định nếu một không được chỉ định cho một mục bộ nhớ cache cụ thể. Nếu không có mặc định do người dùng chỉ định được cung cấp, việc triển khai PHẢI mặc định cho giá trị hợp lệ tối đa được phép thực hiện ngầm. Nếu việc triển khai ngầm không hỗ trợ TTL, TTL được người dùng chỉ định phải được bỏ qua kín đáo.
# 1.4 Data
Thư Viện Cài Đặt PHẢI hỗ trợ tất cả các kiểu dữ liệu của PHP: 
- **Strings** - Chuỗi ký tự có kích thước tùy ý trong bất kỳ mã hóa nào tương thích với PHP.
- **Integers** - Tất cả các số nguyên của bất kỳ kích thước nào được PHP hỗ trợ, lên tới 64-bit.
- **Floats** - Tất cả các số thực.
- **Boolean** - `True` và `False`.
- **Null** - Gía trị `null`.
- **Arrays** - Các mảng được lập chỉ mục, liên kết và đa chiều có chiều sâu tùy ý.
- **Object** - Bất kỳ đối tượng nào hỗ trợ tuần tự hóa và bất tuần tự hóa như là `$o == unserialize(serialize($o))`. Các đối tượng CÓ THỂ sử dụng giao diện Serializable của PHP, các phương thức diệu kỳ `__sleep()` hoặc `__wakeup()` , hoặc các hàm của các ngôn ngữ khác nếu phù hợp.
Tất cả các dữ liệu qua tay Thư Viện Cài Đặt PHẢI trở lại đúng dữ liệu nhập vào, bao gồm cả kiểu dữ liệu. Ví dụ như có dữ liệu là 5 kiểu int được lưu vào mà trả về là dữ liệu kiểu string 5 là không hợp lệ. Thư Viện Cài Đặt CÓ THỂ dùng các hàm `serialize()/unserialize()` của PHP nhưng đây là điều không bắt buộc. Tương thích với chúng chỉ đơn giản được sử dụng như một cơ sở cho các giá trị đối tượng được chấp nhận.

Tất cả dữ liệu được chuyển vào Thư viện triển khai PHẢI được trả về chính xác như được thông qua. Điều đó bao gồm các kiểu biến. Đó là, nó là một lỗi để trả về `string` 5 nếu `int` 5 là giá trị được lưu. Thư viện thực hiện CÓ THỂ sử dụng các hàm `serialize()`/`unserialize()` của PHP trong nội bộ nhưng không bắt buộc phải làm như vậy. Khả năng tương thích với chúng chỉ đơn giản được sử dụng như một đường cơ sở cho các giá trị đối tượng được chấp nhận.

<br> Nếu như không có khả năng lưu lại giá trị của dữ liệu 1 cách chính xác, Thư Viện Cài Đặt PHẢI phản hồi là 1 dữ liệu lỡ, chứ không phải dữ liệu hỏng.
# 2.1 CacheInterface
Interface bộ nhớ đệm xác định các hoạt động cơ bản nhất trên một tập hợp các mục nhập bộ nhớ đệm, đòi hỏi phải đọc, viết và xóa các mục cache riêng lẻ.

Ngoài ra, nó còn có các phương thức để xử lý nhiều mục cache như ghi, đọc hoặc xóa nhiều mục trong bộ nhớ đệm cùng một lúc. Điều này rất hữu ích khi bạn có rất nhiều vùng đọc/ghi để thực hiện, và cho phép bạn thực hiện các hoạt động của bạn trong một lời gọi duy nhất tới máy chủ bộ nhớ đệm mà cắt giảm thời gian trễ đáng kể.

Một instance của `CacheInterface` tương ứng với một collection các mục cache với một vùng tên khóa duy nhất, và tương đương với một "Pool" trong PSR-6. Các instance `CacheInterface` khác nhau CÓ THỂ được hỗ trợ bởi cùng một kho dữ liệu, nhưng PHẢI là độc lập về mặt logic.
```php
<?php

namespace Psr\SimpleCache;

interface CacheInterface
{
    /**
     * Fetches a value from the cache.
     *
     * @param string $key     The unique key of this item in the cache.
     * @param mixed  $default Default value to return if the key does not exist.
     *
     * @return mixed The value of the item from the cache, or $default in case of cache miss.
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     *   MUST be thrown if the $key string is not a legal value.
     */
    public function get($key, $default = null);

    /**
     * Persists data in the cache, uniquely referenced by a key with an optional expiration TTL time.
     *
     * @param string                 $key   The key of the item to store.
     * @param mixed                  $value The value of the item to store, must be serializable.
     * @param null|int|\DateInterval $ttl   Optional. The TTL value of this item. If no value is sent and
     *                                      the driver supports TTL then the library may set a default value
     *                                      for it or let the driver take care of that.
     *
     * @return bool True on success and false on failure.
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     *   MUST be thrown if the $key string is not a legal value.
     */
    public function set($key, $value, $ttl = null);

    /**
     * Delete an item from the cache by its unique key.
     *
     * @param string $key The unique cache key of the item to delete.
     *
     * @return bool True if the item was successfully removed. False if there was an error.
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     *   MUST be thrown if the $key string is not a legal value.
     */
    public function delete($key);

    /**
     * Wipes clean the entire cache's keys.
     *
     * @return bool True on success and false on failure.
     */
    public function clear();

    /**
     * Obtains multiple cache items by their unique keys.
     *
     * @param iterable $keys    A list of keys that can obtained in a single operation.
     * @param mixed    $default Default value to return for keys that do not exist.
     *
     * @return iterable A list of key => value pairs. Cache keys that do not exist or are stale will have $default as value.
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     *   MUST be thrown if $keys is neither an array nor a Traversable,
     *   or if any of the $keys are not a legal value.
     */
    public function getMultiple($keys, $default = null);

    /**
     * Persists a set of key => value pairs in the cache, with an optional TTL.
     *
     * @param iterable               $values A list of key => value pairs for a multiple-set operation.
     * @param null|int|\DateInterval $ttl    Optional. The TTL value of this item. If no value is sent and
     *                                       the driver supports TTL then the library may set a default value
     *                                       for it or let the driver take care of that.
     *
     * @return bool True on success and false on failure.
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     *   MUST be thrown if $values is neither an array nor a Traversable,
     *   or if any of the $values are not a legal value.
     */
    public function setMultiple($values, $ttl = null);

    /**
     * Deletes multiple cache items in a single operation.
     *
     * @param iterable $keys A list of string-based keys to be deleted.
     *
     * @return bool True if the items were successfully removed. False if there was an error.
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     *   MUST be thrown if $keys is neither an array nor a Traversable,
     *   or if any of the $keys are not a legal value.
     */
    public function deleteMultiple($keys);

    /**
     * Determines whether an item is present in the cache.
     *
     * NOTE: It is recommended that has() is only to be used for cache warming type purposes
     * and not to be used within your live applications operations for get/set, as this method
     * is subject to a race condition where your has() will return true and immediately after,
     * another script can remove it making the state of your app out of date.
     *
     * @param string $key The cache item key.
     *
     * @return bool
     *
     * @throws \Psr\SimpleCache\InvalidArgumentException
     *   MUST be thrown if the $key string is not a legal value.
     */
    public function has($key);
}
```
# 2.2 CacheException
```php
<?php

namespace Psr\SimpleCache;

/**
 * Interface used for all types of exceptions thrown by the implementing library.
 */
interface CacheException
{
}
```
# 2.3 InvalidArgumentException
```php
<?php

namespace Psr\SimpleCache;

/**
 * Exception interface for invalid cache arguments.
 *
 * When an invalid argument is passed it must throw an exception which implements
 * this interface
 */
interface InvalidArgumentException extends CacheException
{
}
```
# Tham khảo
https://www.php-fig.org/psr/psr-16/