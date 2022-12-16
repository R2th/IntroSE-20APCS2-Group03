Ghi vào vùng đệm là cách khá phổ biến được sử dụng để cải thiện hiệu năng của dự án, và điều này làm cho thư viện ghi đệm trở thành tính năng phổ biến của bất kỳ thư viện hay framework nào. Điều này dẫn tới việc mỗi thư viện/framework đều có 1 cách ghi đệm riêng với nhiều cấp độ chức năng khác nhau. Và kéo theo đó, người lập trình phải học rất nhiều các hệ thống khác nhau mà không thể biết nổi hệ thống ấy có hỗ trợ chức năng mình cần hay không. Về phía ngược lại, người phát triển các thư viện ghi đệm ấy phải lựa chọn: chỉ hỗ trợ 1 vài framework cố định hay tạo 1 số lượng lớn các lớp adapter.

<br>Và 1 giao diện chung cho các thư viện ghi đệm sẽ giải quyết vấn đề trên. Người phát triển các thư viện/framework có thể trông cậy vào hệ thống ghi đệm sẽ làm việc như họ mong muốn, trong khi người viết thư viện vùng đệm chỉ phải viết 1 lớp giao diện chứ không phải là cả 1 núi code.
# Mục tiêu
Mục tiêu của quy tắc PSR này là hướng dẫn tạo ra các thư viện xử lý vùng nhớ đệm mà có thể được tích hợp thẳng vào các framework và thư viện có sẵn mà không phải cài đặt thêm.
# Một số định nghĩa
- **Thư Viện Gọi** - Thư viện hoặc phần code thực sự cần tới phần bộ nhớ đệm. Các thư viện này sẽ sử dụng các thư viện ghi đệm theo chuẩn này, nhưng sẽ không can thiệp sâu về cách cài đặt các thư viện này
- **Thư Viện Cài Đặt**- Đây là thư viện chịu trách nhiệm cài đặt theo chuẩn này và cung cấp chức năng đệm cho Thư Viện Gọi. Thư Viện Cài Đặt PHẢI gồm các lớp cài đặt `Cache\CacheItemPoolInterface` và `Cache\CacheItemInterface`. Thư Viện Cài Đặt sẽ phải hỗ trợ tối thiểu các chức năng TTL sẽ được mô tả dưới đây với độ chính xác tới từng giây
- **TTL(The Time to Live)** thời gian sống của 1 dữ liệu là thời gian kể từ lúc dữ liệu đó bắt đầu được lưu cho đến khi nó được coi là cũ. TTL thường được biểu diễn bằng 1 số nguyên đại diện cho thời gian tính bằng giây hoặc 1 đối tượng `DateInterval` 
- **Thời Gian Hết Hạn** Thời gian chính xác dữ liệu được đánh dấu là cũ. Được tính bằng cách cộng TTL với thời điểm dữ liệu được lưu, hoặc là đặt rõ ràng trong 1 đối tượng `DateTime`. Dữ liệu với 300 giây TTL được lưu lúc 1:30:00 sẽ hết hạn lúc 1:35:00. Thư Viện Cài Đặt CÓ THỂ cho dữ liệu hết hạn trước khi đến đúng Thời Gian Hết Hạn, nhưng PHẢI coi dữ liệu đó khi hết hạn ngay khi Thời Gian Hết Hạn điểm. Nếu Thư Viện Gọi muốn lưu 1 dữ liệu nhưng không chỉ ra thời gian hết hạn, hoặc đặt 1 thời gian hết hạn hay TTL rỗng, Thư Viện Cài Đặt có thể đặt thời gian hết hạn mặc định. Nếu không có thời gian mặc định, Thư Viện Cài Đặt PHẢI biên dịch điều đó thành 1 yêu cầu được lưu đệm mãi mãi hoặc cho đến khi được hỗ trợ.
- **Khóa** Là 1 chuỗi kí tự độc nhất đại diện cho dữ liệu được lưu ở vùng đệm. Thư Viện Cài Đặt PHẢI hỗ trợ các kí tự `A-Z`, `a-z`, `0-9`, `_`, và `.` theo bất kì thứ tự nào của chuẩn mã hóa UTF-8 và độ dài lên tới 64 kí tự. Thư Viện Cài Đặt CÓ THỂ hỗ trợ thêm các ký tự khác, nhưng PHẢI hỗ trợ phần cơ bẩn đã được nêu ra. Các thư viện hoàn toàn tùy ý về các chuỗi ký tự nhưng PHẢI có khả năng quay trở lại chuỗi không được mã hóa. Các kí tự sau được dùng cho nâng cấp trong tương lai nên KHÔNG ĐƯỢC phép đưa vào `{}()/\@:`.
- **Hit** 1 hit và vùng nhớ đệm là khi Thư Viện Gọi gọi tới 1 dữ liệu theo Khóa và 1 dữ liệu tương thích với khóa đã được tìm ra, dữ liệu vẫn chưa hết hạn nhưng vẫn không sử dụng được do 1 số lý do khác. Thư Viện Gọi nên chắc chắn xác nhận `isHit()` khi gọi hàm `get()`.
- **Lỡ** Dữ liệu bị lỡ hoàn toàn ngược lại dữ liệu bị hit. Đó là khi Thư Viện Gọi gọi tới 1 dữ liệu theo Khóa và nhưng không có dữ liệu tương thích với khóa đã được tìm ra, hoặc có dữ liệu nhưng hết hạn, hoặc không sử dụng được do 1 số lý do khác. 1 dữ liệu hết hạn PHẢI luôn luôn được coi là 1 lỡ vùng đệm.
- **Trì hoãn** Việc lưu bộ nhớ đệm hoãn cho viết dữ liệu đệm có thể không được lưu ngay lập tức. 1 đối tượng `Pool` có thể hoãn lại việc lưu bộ nhớ đệm nhằm tận dụng các hoạt động thiết lập hàng loạt hỗ trợ bởi các công cụ lưu trữ. 1 `Pool` PHẢI đảm bảo rằng bất kỳ dữ liệu bị trì hõan nào đều được duy trì sự tồn tại và không bị mất mát, và CÓ THỂ hỗ trợ dữ liệu ấy trước khi Thư Viện Gọi được sử dụng và yêu cầu trì hoãn. Khi Thư Viện Gọi dùng phương thức `commit()`, tất cả các dữ liệu bị trì hoãn đều phải được gọi ra. Thư Viện Cài Đặt CÓ THỂ dùng bất cứ xử lý logic thích hợp nào để xác định sự tồn tại của các dữ liệu bị trì hoãn, ví dụ như xóa toàn bộ, lưu toàn bộ bằng `save()`, hết thời gian hoặc số lượng lớn nhất,... Yêu cầu cho một mục nhớ đệm đã được hoãn lại PHẢI trả về dữ liệu bị trì hoãn nhưng chưa được duy trì.
# Dữ liệu
Thư Viện Cài Đặt PHẢI hỗ trợ tất cả các kiểu dữ liệu của PHP: 
- **Strings** - Chuỗi ký tự có kích thước tùy ý trong bất kỳ mã hóa nào tương thích với PHP.
- **Integers** - Tất cả các số nguyên của bất kỳ kích thước nào được PHP hỗ trợ, lên tới 64-bit.
- **Floats** - Tất cả các số thực.
- **Boolean** - `True` và `False`.
- **Null** - Gía trị `null`.
- **Arrays** - Các mảng được lập chỉ mục, liên kết và đa chiều có chiều sâu tùy ý.
- **Object** - Bất kỳ đối tượng nào hỗ trợ tuần tự hóa và bất tuần tự hóa như là `$o == unserialize(serialize($o))`. Các đối tượng CÓ THỂ sử dụng giao diện Serializable của PHP, các phương thức diệu kỳ `__sleep()` hoặc `__wakeup()` , hoặc các hàm của các ngôn ngữ khác nếu phù hợp.
Tất cả các dữ liệu qua tay Thư Viện Cài Đặt PHẢI trở lại đúng dữ liệu nhập vào, bao gồm cả kiểu dữ liệu. Ví dụ như có dữ liệu là 5 kiểu int được lưu vào mà trả về là dữ liệu kiểu string 5 là không hợp lệ. Thư Viện Cài Đặt CÓ THỂ dùng các hàm `serialize()/unserialize()` của PHP nhưng đây là điều không bắt buộc. Tương thích với chúng chỉ đơn giản được sử dụng như một cơ sở cho các giá trị đối tượng được chấp nhận.

<br> Nếu như không có khả năng lưu lại giá trị của dữ liệu 1 cách chính xác, Thư Viện Cài Đặt PHẢI phản hồi là 1 dữ liệu lỡ, chứ không phải dữ liệu hỏng.
# Khái niệm chính
## Pool
Pool đại diện cho một tập hợp các mục trong một hệ thống bộ nhớ đệm. Pool là 1 kho lưu trữ sắp xếp hợp lý của các mục nó chứa. Tất cả các mục lưu ở bộ nhớ đệm đều được lấy ra từ Pool như 1 đối tượng Item, và tất cả các tương tác giữa các mục lưu ở bộ nhớ đệm đều được diễn ra trong Pool.
## Mục
Một Mục đại diện cho một cặp khóa/giá trị trong một Pool. Khóa là mã định danh duy nhất chính cho một Item và PHẢI là bất biến. Giá trị CÓ THỂ được thay đổi bất cứ lúc nào.
# Xử lý lỗi
Mặc dù ghi bộ nhớ đệm là 1 phần rất quan trọng khi biểu diễn hiệu suất ứng dụng, nó không phải là 1 phần của các chức năng trong ứng dụng. Vì vậy, lỗi ở vùng đệm KHÔNG ĐƯỢC tính vào lỗi của ứng dụng. Kéo theo đó, Thư Viện Cài Đặt KHÔNG ĐƯỢC đưa ra các ngoại lệ ngoài sự cài đặt của các lớp giao diện, và NÊN ném các ngoại lệ và lỗi phát sinh vào 1 kho dữ liệu cơ bản và không cho phép chúng nổi lên
 
 <br> Thư Viện Cài Đặt NÊN ghi log lại những lỗi này hoặc thông báo tới người quản trị hệ thống 1 cách thích hợp.
 
<br> Nếu Thư Viện Gọi yêu cầu 1 hay nhiều mục bị xóa, hoặc pool bị dọn dẹp, KHÔNG ĐƯỢC coi nó là lỗi điều kiện nếu khóa đặc biệt không tồn tại. Điều kiện xảy ra sau là như nhau(khóa không tồn tại hoặc pool trống) nên không có lỗi
# Lớp giao diện
## CacheItemInterface
```
<?php

namespace Psr\Cache;

/**
 * CacheItemInterface defines an interface for interacting with objects inside a cache.
 */
interface CacheItemInterface
{
    /**
     * Returns the key for the current cache item.
     *
     * The key is loaded by the Implementing Library, but should be available to
     * the higher level callers when needed.
     *
     * @return string
     *   The key string for this cache item.
     */
    public function getKey();

    /**
     * Retrieves the value of the item from the cache associated with this object's key.
     *
     * The value returned must be identical to the value originally stored by set().
     *
     * If isHit() returns false, this method MUST return null. Note that null
     * is a legitimate cached value, so the isHit() method SHOULD be used to
     * differentiate between "null value was found" and "no value was found."
     *
     * @return mixed
     *   The value corresponding to this cache item's key, or null if not found.
     */
    public function get();

    /**
     * Confirms if the cache item lookup resulted in a cache hit.
     *
     * Note: This method MUST NOT have a race condition between calling isHit()
     * and calling get().
     *
     * @return bool
     *   True if the request resulted in a cache hit. False otherwise.
     */
    public function isHit();

    /**
     * Sets the value represented by this cache item.
     *
     * The $value argument may be any item that can be serialized by PHP,
     * although the method of serialization is left up to the Implementing
     * Library.
     *
     * @param mixed $value
     *   The serializable value to be stored.
     *
     * @return static
     *   The invoked object.
     */
    public function set($value);

    /**
     * Sets the expiration time for this cache item.
     *
     * @param \DateTimeInterface|null $expiration
     *   The point in time after which the item MUST be considered expired.
     *   If null is passed explicitly, a default value MAY be used. If none is set,
     *   the value should be stored permanently or for as long as the
     *   implementation allows.
     *
     * @return static
     *   The called object.
     */
    public function expiresAt($expiration);

    /**
     * Sets the expiration time for this cache item.
     *
     * @param int|\DateInterval|null $time
     *   The period of time from the present after which the item MUST be considered
     *   expired. An integer parameter is understood to be the time in seconds until
     *   expiration. If null is passed explicitly, a default value MAY be used.
     *   If none is set, the value should be stored permanently or for as long as the
     *   implementation allows.
     *
     * @return static
     *   The called object.
     */
    public function expiresAfter($time);

}
```
## CacheItemPoolInterface
```
<?php

namespace Psr\Cache;

/**
 * CacheItemPoolInterface generates CacheItemInterface objects.
 */
interface CacheItemPoolInterface
{
    /**
     * Returns a Cache Item representing the specified key.
     *
     * This method must always return a CacheItemInterface object, even in case of
     * a cache miss. It MUST NOT return null.
     *
     * @param string $key
     *   The key for which to return the corresponding Cache Item.
     *
     * @throws InvalidArgumentException
     *   If the $key string is not a legal value a \Psr\Cache\InvalidArgumentException
     *   MUST be thrown.
     *
     * @return CacheItemInterface
     *   The corresponding Cache Item.
     */
    public function getItem($key);

    /**
     * Returns a traversable set of cache items.
     *
     * @param string[] $keys
     *   An indexed array of keys of items to retrieve.
     *
     * @throws InvalidArgumentException
     *   If any of the keys in $keys are not a legal value a \Psr\Cache\InvalidArgumentException
     *   MUST be thrown.
     *
     * @return array|\Traversable
     *   A traversable collection of Cache Items keyed by the cache keys of
     *   each item. A Cache item will be returned for each key, even if that
     *   key is not found. However, if no keys are specified then an empty
     *   traversable MUST be returned instead.
     */
    public function getItems(array $keys = array());

    /**
     * Confirms if the cache contains specified cache item.
     *
     * Note: This method MAY avoid retrieving the cached value for performance reasons.
     * This could result in a race condition with CacheItemInterface::get(). To avoid
     * such situation use CacheItemInterface::isHit() instead.
     *
     * @param string $key
     *   The key for which to check existence.
     *
     * @throws InvalidArgumentException
     *   If the $key string is not a legal value a \Psr\Cache\InvalidArgumentException
     *   MUST be thrown.
     *
     * @return bool
     *   True if item exists in the cache, false otherwise.
     */
    public function hasItem($key);

    /**
     * Deletes all items in the pool.
     *
     * @return bool
     *   True if the pool was successfully cleared. False if there was an error.
     */
    public function clear();

    /**
     * Removes the item from the pool.
     *
     * @param string $key
     *   The key to delete.
     *
     * @throws InvalidArgumentException
     *   If the $key string is not a legal value a \Psr\Cache\InvalidArgumentException
     *   MUST be thrown.
     *
     * @return bool
     *   True if the item was successfully removed. False if there was an error.
     */
    public function deleteItem($key);

    /**
     * Removes multiple items from the pool.
     *
     * @param string[] $keys
     *   An array of keys that should be removed from the pool.

     * @throws InvalidArgumentException
     *   If any of the keys in $keys are not a legal value a \Psr\Cache\InvalidArgumentException
     *   MUST be thrown.
     *
     * @return bool
     *   True if the items were successfully removed. False if there was an error.
     */
    public function deleteItems(array $keys);

    /**
     * Persists a cache item immediately.
     *
     * @param CacheItemInterface $item
     *   The cache item to save.
     *
     * @return bool
     *   True if the item was successfully persisted. False if there was an error.
     */
    public function save(CacheItemInterface $item);

    /**
     * Sets a cache item to be persisted later.
     *
     * @param CacheItemInterface $item
     *   The cache item to save.
     *
     * @return bool
     *   False if the item could not be queued or if a commit was attempted and failed. True otherwise.
     */
    public function saveDeferred(CacheItemInterface $item);

    /**
     * Persists any deferred cache items.
     *
     * @return bool
     *   True if all not-yet-saved items were successfully saved or there were none. False otherwise.
     */
    public function commit();
}
```
## CacheException
```
<?php

namespace Psr\Cache;

/**
 * Exception interface for all exceptions thrown by an Implementing Library.
 */
interface CacheException
{
}
```
## InvalidArgumentException
```
<?php

namespace Psr\Cache;

/**
 * Exception interface for invalid cache arguments.
 *
 * Any time an invalid argument is passed into a method it must throw an
 * exception class which implements Psr\Cache\InvalidArgumentException.
 */
interface InvalidArgumentException extends CacheException
{
}
```
# Tài liệu tham khảo
https://www.php-fig.org/psr/psr-6/