Tài liệu này mô tả một interface chung cho các container chứa phụ thuộc.

Mục tiêu này được thiết lập bởi `ContainerInterface` nhằm chuẩn hóa các framework và thư viện sử dụng container để chứa các đối tượng và tham số(sẽ được gọi là các entry trong suốt doc này)

`implementor` trong doc này ám chỉ người triển khai thực hiện `ContainerInterface` trong thư viện hoặc framework liên quan tới dependency injection.

Người sử dụng container chứa phụ thuộc(DIC) được gọi là `user`.
# 1. Đặc tả
## 1.1. Căn bản
### 1.1.1. Các Entry Indentifier
Mã nhận diện mục nhập là bất kỳ chuỗi hợp pháp nào của PHP có ít nhất một ký tự xác định duy nhất một mục trong vùng chứa. Mã nhận dạng mục nhập là một chuỗi mờ, vì vậy người gọi KHÔNG NÊN giả định rằng cấu trúc của chuỗi mang bất kỳ ý nghĩa ngữ nghĩa nào.
### 1.1.2. Đọc từ 1 container
* `Psr\Container\ContainerInterface` có 2 phương thức: `get` và `has`
* `get` lấy một tham số bắt buộc: một mã định danh nhập, PHẢI là một chuỗi. `get` có thể trả về bất cứ thứ gì (một giá trị hỗn hợp), hoặc trả một ` NotFoundExceptionInterface` nếu định danh không được biết đến trong container. Hai lời gọi liên tiếp tới `get` với cùng một định danh NÊN trả về cùng một giá trị. Tuy nhiên, tùy thuộc vào thiết kế của `implementor` và/hoặc cấu hình của `user`, các giá trị khác nhau có thể được trả về, do đó, `user` KHÔNG NÊN dựa vào việc nhận cùng giá trị trên 2 lời gọi liên tiếp.
* `has` có một tham số duy nhất: một mã định danh nhập, PHẢI là một chuỗi. `has` PHẢI trả về` true` nếu một mã định danh mục nhập được biết đến trong thùng chứa và `false` nếu nó không phải.

Nếu `has($id)` trả về `false`,`get($id)` PHẢI trả một `NotFoundExceptionInterface`.
## 1.2. Ngoại lệ
Ngoại lệ được trả về trực tiếp từ container NÊN triển khai từ `Psr\Container\ContainerExceptionInterface`.

Một lời gọi tới phương thức `get` với id không tồn tại PHẢI đưa ra `Psr\Container\NotFoundExceptionInterface`.
## 1.3. Mức sử dụng được đề xuất
Các `user` KHÔNG NÊN chuyển một container vào một đối tượng để đối tượng có thể sử dụng các phụ thuộc của riêng nó.

Điều này có nghĩa là container được sử dụng như một [Service Locator](https://en.wikipedia.org/wiki/Service_locator_pattern), một pattern thường không được khuyến khích.
# 2. Các gói
Các class và interface được mô tả cũng như các ngoại lệ có liên quan được cung cấp như là một phần của gói [psr/container](https://packagist.org/packages/psr/container).

Các gói cung cấp việc triển khai PSR container nên thông báo rằng các gói cung cấp `psr/container-implementation 1.0.0`.

Các dự án yêu cầu triển khai nên yêu cầu `psr/container-implementation 1.0.0`.
# 3. Các interface
## 3.1. Psr\Container\ContainerInterface
```php
<?php
namespace Psr\Container;

/**
 * Describes the interface of a container that exposes methods to read its entries.
 */
interface ContainerInterface
{
    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @param string $id Identifier of the entry to look for.
     *
     * @throws NotFoundExceptionInterface  No entry was found for **this** identifier.
     * @throws ContainerExceptionInterface Error while retrieving the entry.
     *
     * @return mixed Entry.
     */
    public function get($id);

    /**
     * Returns true if the container can return an entry for the given identifier.
     * Returns false otherwise.
     *
     * `has($id)` returning true does not mean that `get($id)` will not throw an exception.
     * It does however mean that `get($id)` will not throw a `NotFoundExceptionInterface`.
     *
     * @param string $id Identifier of the entry to look for.
     *
     * @return bool
     */
    public function has($id);
}
```
## 3.2. Psr\Container\ContainerExceptionInterface
```php
<?php
namespace Psr\Container;

/**
 * Base interface representing a generic exception in a container.
 */
interface ContainerExceptionInterface
{
}
```
## 3.3. Psr\Container\NotFoundExceptionInterface
```php
<?php
namespace Psr\Container;

/**
 * No entry was found in the container.
 */
interface NotFoundExceptionInterface extends ContainerExceptionInterface
{
}
```