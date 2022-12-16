Các liên kết Hypermedia đang trở thành một phần ngày càng quan trọng của web, trong cả hai ngữ cảnh HTML và các bối cảnh định dạng API khác nhau. Tuy nhiên, không có định dạng hypermedia phổ biến duy nhất, cũng không có một cách phổ biến để đại diện cho các liên kết giữa các định dạng.

Chuẩn này nhằm mục đích cung cấp cho các nhà phát triển PHP một cách đơn giản, phổ biến để biểu diễn một liên kết hypermedia độc lập với định dạng tuần tự hóa được sử dụng. Điều đó lần lượt cho phép một hệ thống tuần tự hóa phản hồi với các liên kết hypermedia vào một hoặc nhiều định dạng dây độc lập với quá trình quyết định những liên kết đó nên là gì.
# 1. Đặc tả
## 1.1. Các liên kết cơ bản
1 liên kết hyperlink gồm ít nhất 2 thành phần:
* URI đại diện cho tài nguyên đích đang được tham chiếu.
* Mối quan hệ xác định cách tài nguyên đích liên quan đến nguồn.

Các thuộc tính khác của Liên kết có thể tồn tại, tùy thuộc vào định dạng được sử dụng. Vì các thuộc tính bổ sung không được chuẩn hóa hay phổ biến, đặc tả này không tìm cách tiêu chuẩn hóa chúng.

Với mục đích của đặc điểm kỹ thuật này, các định nghĩa sau được áp dụng.
- **Implementing Object** - Một đối tượng thực hiện một trong các interface được xác định bởi đặc tả này.
- **Serializer** - Thư viện hoặc hệ thống khác có một hoặc nhiều đối tượng Liên kết và tạo ra một đại diện được tuần tự hóa của nó trong một số định dạng được xác định.
## 1.2. Các thuộc tính
Tất cả các liên kết CÓ THỂ bao gồm không hoặc nhiều thuộc tính bổ sung ngoài URI và mối quan hệ. Không có đăng ký chính thức của các giá trị được cho phép ở đây, và giá trị của các giá trị phụ thuộc vào ngữ cảnh và thường là trên một định dạng tuần tự cụ thể. Các giá trị thường được hỗ trợ bao gồm ‘hreflang’, ‘title’ và ‘type’.

Các serializer CÓ THỂ bỏ qua các thuộc tính trên một đối tượng liên kết nếu được yêu cầu làm như vậy theo định dạng tuần tự hóa. Tuy nhiên, các serializer NÊN mã hóa tất cả các thuộc tính được cung cấp có thể để cho phép mở rộng người dùng, trừ khi bị ngăn chặn bởi định nghĩa của định dạng tuần tự hóa.

Có 1 số thuộc tính (thường là  `hreflang`) có thể xuất hiện nhiều hơn 1 lần trong ngữ cảnh. Do đó, một giá trị thuộc tính CÓ THỂ là một mảng các giá trị chứ không phải là một giá trị đơn giản. Các serializer CÓ THỂ mã hóa mảng đó ở bất kỳ định dạng nào thích hợp cho định dạng được tuần tự hóa (chẳng hạn như danh sách được phân cách bằng dấu cách, danh sách được phân cách bằng dấu phẩy, v.v.). Nếu một thuộc tính đã cho không được phép có nhiều giá trị trong một ngữ cảnh cụ thể, thì serializer PHẢI sử dụng giá trị đầu tiên được cung cấp và bỏ qua tất cả các giá trị tiếp theo.

Nếu một giá trị thuộc tính là boolean `true`, các serializer CÓ THỂ sử dụng các dạng viết tắt nếu thích hợp và được hỗ trợ bởi một định dạng tuần tự hóa. Ví dụ: HTML cho phép các thuộc tính không có giá trị khi sự hiện diện của thuộc tính có ý nghĩa boolean. Quy tắc này áp dụng nếu và chỉ khi thuộc tính là boolean `true`, không cho bất kỳ giá trị “đúng” nào khác trong PHP, chẳng hạn như số nguyên 1.

Nếu một giá trị thuộc tính là boolean `false`, các serializer NÊN bỏ qua toàn bộ thuộc tính trừ khi làm như vậy thay đổi ý nghĩa ngữ nghĩa của kết quả. Quy tắc này áp dụng nếu và chỉ khi thuộc tính là boolean `false`, không cho bất kỳ giá trị "sai" nào khác trong PHP, chẳng hạn như số nguyên 0.
## 1.3. Các quan hệ
Mối quan hệ của liên kết được định nghĩa là chuỗi và là từ khóa đơn giản trong trường hợp mối quan hệ được xác định công khai hoặc URI tuyệt đối trong trường hợp của một mối quan hệ private.

Trong trường hợp một từ khóa đơn giản được sử dụng, nó NÊN khớp với một từ khóa đăng ký IANA tại:

http://www.iana.org/assignments/link-relations/link-relations.xhtml

Tùy chọn đăng ký microformats.org CÓ THỂ được sử dụng, nhưng điều này có thể không hợp lệ trong mọi ngữ cảnh:

http://microformats.org/wiki/existing-rel-values

Mối quan hệ không được xác định trong một trong các cơ quan đăng ký ở trên hoặc một đăng ký công khai tương tự được coi là "private", nghĩa là, cụ thể đối với một ứng dụng hoặc trường hợp sử dụng cụ thể. Các mối quan hệ như vậy PHẢI sử dụng một URI tuyệt đối.
## 1.4. Mẫu liên kết
[RFC 6570](https://tools.ietf.org/html/rfc6570) định nghĩa một định dạng cho các mẫu URI, đó là, một mẫu cho một URI được dự kiến sẽ được điền vào với các giá trị được cung cấp bởi một công cụ máy khách. Một số định dạng hypermedia hỗ trợ các liên kết được tạo khuôn mẫu trong khi các định dạng khác không có, và có thể có một cách đặc biệt để biểu thị rằng một liên kết là một khuôn mẫu. Trình nối tiếp cho một định dạng không hỗ trợ các mẫu URI PHẢI bỏ qua bất kỳ Liên kết mẫu nào mà nó gặp phải.
## 1.5. Các evolvable provider
Trong một số trường hợp, nhà cung cấp liên kết có thể cần khả năng thêm liên kết bổ sung vào nó. Ở những người khác, một nhà cung cấp liên kết nhất thiết là chỉ đọc, với các liên kết bắt nguồn từ thời gian chạy từ một số nguồn dữ liệu khác. Vì lý do đó, các nhà cung cấp có thể sửa đổi là một interface phụ có thể được triển khai tùy chọn.
Ngoài ra, một số đối tượng Nhà cung cấp liên kết, chẳng hạn như đối tượng phản hồi PSR-7, là do thiết kế không thay đổi. Điều đó có nghĩa là phương pháp thêm liên kết đến chúng tại chỗ sẽ không tương thích. Do đó, phương thức đơn của `EvolvableLinkProviderInterface` yêu cầu một đối tượng mới được trả về, giống với đối tượng gốc nhưng với một đối tượng liên kết bổ sung được bao gồm.
## 1.6. Các đối tượng evolvable link
Các đối tượng liên kết trong hầu hết các trường hợp là các đối tượng giá trị. Như vậy, cho phép chúng phát triển theo cùng kiểu với các đối tượng giá trị PSR-7 là một lựa chọn hữu ích. Vì lý do đó, một `EvolvableLinkInterface` bổ sung được bao gồm cung cấp các phương thức để tạo ra các cá thể đối tượng mới với một thay đổi duy nhất. Cùng một mô hình được sử dụng bởi PSR-7 và, nhờ vào hành vi sao chép trên ghi của PHP, vẫn là CPU và bộ nhớ hiệu quả.

Tuy nhiên, không có phương thức evolvable cho các mẫu, vì giá trị mẫu của một liên kết chỉ dựa trên giá trị href. Nó KHÔNG ĐƯỢC PHÉP được thiết lập độc lập, nhưng bắt nguồn từ việc có hay không giá trị href là một mẫu liên kết RFC 6570.
# 2. Các gói
Các giao diện và các lớp được mô tả được cung cấp như một phần của gói [psr/link](https://packagist.org/packages/psr/link).
# 3. Các interface
## 3.1. Psr\Link\LinkInterface
```php
<?php

namespace Psr\Link;

/**
 * A readable link object.
 */
interface LinkInterface
{
    /**
     * Returns the target of the link.
     *
     * The target link must be one of:
     * - An absolute URI, as defined by RFC 5988.
     * - A relative URI, as defined by RFC 5988. The base of the relative link
     *     is assumed to be known based on context by the client.
     * - A URI template as defined by RFC 6570.
     *
     * If a URI template is returned, isTemplated() MUST return True.
     *
     * @return string
     */
    public function getHref();

    /**
     * Returns whether or not this is a templated link.
     *
     * @return bool
     *   True if this link object is templated, False otherwise.
     */
    public function isTemplated();

    /**
     * Returns the relationship type(s) of the link.
     *
     * This method returns 0 or more relationship types for a link, expressed
     * as an array of strings.
     *
     * @return string[]
     */
    public function getRels();

    /**
     * Returns a list of attributes that describe the target URI.
     *
     * @return array
     *   A key-value list of attributes, where the key is a string and the value
     *  is either a PHP primitive or an array of PHP strings. If no values are
     *  found an empty array MUST be returned.
     */
    public function getAttributes();
}
```
## 3.2. Psr\Link\EvolvableLinkInterface
```php
<?php

namespace Psr\Link;

/**
 * An evolvable link value object.
 */
interface EvolvableLinkInterface extends LinkInterface
{
    /**
     * Returns an instance with the specified href.
     *
     * @param string $href
     *   The href value to include.  It must be one of:
     *     - An absolute URI, as defined by RFC 5988.
     *     - A relative URI, as defined by RFC 5988. The base of the relative link
     *       is assumed to be known based on context by the client.
     *     - A URI template as defined by RFC 6570.
     *     - An object implementing __toString() that produces one of the above
     *       values.
     *
     * An implementing library SHOULD evaluate a passed object to a string
     * immediately rather than waiting for it to be returned later.
     *
     * @return static
     */
    public function withHref($href);

    /**
     * Returns an instance with the specified relationship included.
     *
     * If the specified rel is already present, this method MUST return
     * normally without errors, but without adding the rel a second time.
     *
     * @param string $rel
     *   The relationship value to add.
     * @return static
     */
    public function withRel($rel);

    /**
     * Returns an instance with the specified relationship excluded.
     *
     * If the specified rel is already not present, this method MUST return
     * normally without errors.
     *
     * @param string $rel
     *   The relationship value to exclude.
     * @return static
     */
    public function withoutRel($rel);

    /**
     * Returns an instance with the specified attribute added.
     *
     * If the specified attribute is already present, it will be overwritten
     * with the new value.
     *
     * @param string $attribute
     *   The attribute to include.
     * @param string $value
     *   The value of the attribute to set.
     * @return static
     */
    public function withAttribute($attribute, $value);

    /**
     * Returns an instance with the specified attribute excluded.
     *
     * If the specified attribute is not present, this method MUST return
     * normally without errors.
     *
     * @param string $attribute
     *   The attribute to remove.
     * @return static
     */
    public function withoutAttribute($attribute);
}
```
## 3.3. Psr\Link\LinkProviderInterface
```php
<?php

namespace Psr\Link;

/**
 * A link provider object.
 */
interface LinkProviderInterface
{
    /**
     * Returns an iterable of LinkInterface objects.
     *
     * The iterable may be an array or any PHP \Traversable object. If no links
     * are available, an empty array or \Traversable MUST be returned.
     *
     * @return LinkInterface[]|\Traversable
     */
    public function getLinks();

    /**
     * Returns an iterable of LinkInterface objects that have a specific relationship.
     *
     * The iterable may be an array or any PHP \Traversable object. If no links
     * with that relationship are available, an empty array or \Traversable MUST be returned.
     *
     * @return LinkInterface[]|\Traversable
     */
    public function getLinksByRel($rel);
}
```
## 3.4. Psr\Link\EvolvableLinkProviderInterface
```php
<?php

namespace Psr\Link;

/**
 * An evolvable link provider value object.
 */
interface EvolvableLinkProviderInterface extends LinkProviderInterface
{
    /**
     * Returns an instance with the specified link included.
     *
     * If the specified link is already present, this method MUST return normally
     * without errors. The link is present if $link is === identical to a link
     * object already in the collection.
     *
     * @param LinkInterface $link
     *   A link object that should be included in this collection.
     * @return static
     */
    public function withLink(LinkInterface $link);

    /**
     * Returns an instance with the specifed link removed.
     *
     * If the specified link is not present, this method MUST return normally
     * without errors. The link is present if $link is === identical to a link
     * object already in the collection.
     *
     * @param LinkInterface $link
     *   The link to remove.
     * @return static
     */
    public function withoutLink(LinkInterface $link);
}
```
# Tham khảo
https://www.php-fig.org/psr/psr-13/