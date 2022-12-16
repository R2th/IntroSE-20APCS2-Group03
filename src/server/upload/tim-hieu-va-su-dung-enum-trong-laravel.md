# Giới thiệu
Chào mọi người, sau một tháng thì mình đã trở lại đây (hehe).

Nếu như các bạn đã từng làm việc với các ngôn ngữ như Java, C#, C++,... thì hẳn là các bạn không còn xa lại gì với `Enum`. Còn đối với các bạn chưa từng nghe qua `Enum` thì không sao bởi vì trong bài viết này chúng ta sẽ cùng tìm hiểu về `Enum` và cách sử dụng `Enum` trong `Laravel` với pagake `Laravel Enum`.
# Enum là gì?
`Enum` là một kiểu dữ liệu đặc biệt,  thường sử dụng cho việc định nghĩa một tập hợp cho các hằng số có giá trị cố định. Ví dụ như:
* Các ngày trong tuần (Monday, Tuesday, ... Sunday)
* Giới tính (Man, Woman, Other)
* Các mùa trong năm (Spring, Summer, Autumn, Winter)
* .....

Lợi ích của `Enum`:
* Giảm các lỗi gây ra bởi chuyển đổi số hoặc nhập sai số.
* Thuận lợi cho việc quản lý, dễ dàng thay đổi các giá trị trong tương lai.
* Làm cho code tường minh hơn, dễ đọc hơn, giảm việc xuất hiện bug. :D
* .....

Tuy nhiên `PHP` nói chung và `Laravel` nói riêng lại không hỗ trợ trực tiếp `Enum`, nhưng dù vậy chúng ta vẫn có thể sử dụng `Enum`  gián tiếp bằng các hằng số (const) trong các class. 

Trong `Laravel`có một package vô cùng hữu ích hỗ trợ việc tạo và sử dụng `Enum` đó là `Laravel Enum`. Chúng ta cùng tìm hiểu package hữu ích này nhé. 
# Laravel Enum
### Cài đặt
**Yêu cầu:** Laravel >= 5.4 và PHP >= 7.1

Bạn hãy mở terminal lên và chạy lệnh sau để cài đặt package:
```
composer require bensampo/laravel-enum
```
Nếu bạn sử dụng Laravel < 5.5, thì bạn cần copy dòng sau đây và thêm vào `providers` trong file `config/app.php`:
```
BenSampo\Enum\EnumServiceProvider
```
### Tạo Enum và sử dụng
Ví dụ đặt ra: Giả sử trong hệ thống của mình, User có 3 quyền (role) với các giá trị tương ứng lưu trong DB là :
* Administrator = 0
* Moderator = 1
* Member = 2

Thông thường các bạn sẽ dùng file `config` để quản lý các giá trị này để nhằm mục đích dễ dàng thay đổi khi cần thiết. `Enum` cũng có tác dụng tương tự, ngoài ra nó còn làm cho code trờ nên tường mình hơn. Ở ví dụ này mình sẽ sử dụng `Enum` nhé:

Mình sẽ tạo một `Enum` tên là `UserRole` để lưu các quyền của User trong hệ thống và các giá trị tương ứng của nó bằng lệnh sau:
```
php artisan make:enum UserRole
```
Một Enum `UserRole` sẽ được tạo ra ở trong folder `App\Enums`, bạn cần thêm các giá trị role của User vào file này như sau:
```
<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class UserRole extends Enum
{
    const Administrator = 1;
    const Moderator = 2;
    const Member = 3;
}

```
Vậy là chúng ta đã có một Enum đơn giản, và sử dụng nó cũng vô cùng đơn giản như sau:
```
UserRole::Administrator  // return 0
```
Các bạn có thể sử dụng `Enum` này ở bất cứ chỗ nào mà bạn muốn. Lưu ý rằng bạn cần phải `Use` Enum `UserRole` ở đầu mỗi file nhé:
```
use App\Enums\UserRole;
```
Một số ví dụ về sử dụng Enum đơn giản:
* Dùng trong `migration` để tạo giá trị mặc định cho các cột:
    ```
    $table->tinyInteger('role')->unsigned()->default(UserRole::Member);
    ```
    
* Dùng trong các `Model` hay các `Policy` để kiểm tra quyền admin của hệ thống:
    ```
    public function isAdmin()
    {
        return $this->role === UserRole::Administrator;
    }
    ```

* Dùng trong các biểu thức, phương thức, ... ở `Controller`:
    ```
    if (Auth::user()->role === UserRole::Administrator) {
        User::create([
            'name' => 'Peter Paker',
            'nickname' => 'Spider Man',
            'role' => UserRole::Moderator,
        ]);
    }
    ```
* ........

### Các phương thức hỗ trợ
* **getKeys()**: trả về một mảng chứa các key của Enum
    ```
    UserRole::getKeys()   // return ['Administrator', 'Moderator', 'Member']
    ```

* **getValues()**: trả về một mảng chứa các giá trị của Enum
    ```
    UserRole::getValues()   // return [1, 2, 3]
    ```
* **getKey(string|int $value)**: trả về key của `Enum $value`
    ```
    UserRole::getKey(2); // Returns 'Moderator'
    UserRole::getKey(UserRole::Moderator); // Returns 'Moderator'
    ```
* **getValue(string $key)**: trả về giá trị của `Enum $key`
    ```
    UserRole::getValue('Administrator'); // Returns 1
    ```
* **hasKey(string $key)**: kiểm tra các key trong Enum có chứa `$key` hay không
    ```
    UserRole::hasKey('Member'); // Returns true
    ```
* **hasValue(string|int $value, bool $strict = true)**: kiểm tra các giá trị trong Enum có chứa `$value` hay không. Tham số `$strict` dùng để bật/tắt chế độ so sánh tuyệt đối (===), giá trị mặc định của `$strict` là false.
    ```
    UserRole::hasValue(1); // Returns true

    // It's possible to disable the strict type checking:
    UserRole::hasValue('1'); // Returns false
    UserRole::hasValue('1', false); // Returns true
    ```
* **getDescription(string|int $value)** : trả về mô tả của `Enum $value` (giá trị trả về mặc định là key).
    ```
    UserRole::getDescription(3); // Returns 'Member'
    UserRole::getDescription(UserRole::Member); // Returns 'Member'
    ```
    Bạn cũng có thể `override` phương thức này để custom giá trị trả về:
    ```
    public static function getDescription($value): string
    {
        if ($value === self::Member) {
            return 'This is normal user of system';
        }

        return parent::getDescription($value);
    }
    ```
    ```
    UserRole::getDescription(UserRole::Member); // Returns 'This is normal user of system'
    ```
 * **getRandomKey()**: trả về một key ngẫu nhiên trong Enum. Phương thức này cực kì hữu dụng khi dùng trong việc `Seed data`.
    ```
    UserRole::getRandomKey(); // Returns 'Administrator', 'Moderator' or 'Member'
    ```
 * **getRandomValue()**: trả về một giá trị ngẫu nhiên trong Enum. Phương thức này cực kì hữu dụng khi dùng trong việc `Seed data`.
     ```
     UserRole::getRandomValue(); // Returns 1, 2 or 3
     ```
 
 * **toArray()**: Enum được trả về dưới dạng một mảng với key và value tương ứng
     ```
     UserRole::toArray(); // Returns ['Administrator' => 1, 'Moderator' => 2, 'Member' => 3]
     ```
  * **toSelectArray()**: trả về một mảng có dạng [value => description]. 
    ```
    UserRole::toSelectArray(); // Returns [1 => 'Administrator', 2 => 'Moderator', 3 => 'This is normal user of system']
    ```
    Phương thức này cực kì hữu ích khi bạn muốn đổ các giá trị role này kèm với đa ngôn ngữ tương ứng ra một `Select box` để hiển thị. Đầu tiên bạn `override` phương thức `getDescription()` và custom các giá trị trả về với đa ngôn ngữ, sau đó bạn có thể sử dụng phương thức `toSelectArray()` này để lấy và đổ ra Select box.
 * **getInstance(string|int $enumValue)**: trả về một thể hiện của Enum
     ```
     UserRole::getInstance(UserRole::Administrator);
     ```
### Khởi tạo và sử dụng thể hiện của Enum
Điều này thật sự hữu ích vì bạn có thể tạo các thể hiện của Enum và sử dụng chúng như là các tham số cho các phương thức. 

Có nhiều cách để khởi tạo một thể hiện của Enum:
```
// Standard new PHP class, passing the desired enum value as a parameter
$enumInstance = new UserRole(UserRole::Member);

// Static getInstance method, again passing the desired enum value as a parameter
$enumInstance = UserRole::getInstance(UserRole::Member);

// Statically calling the key name as a method
$enumInstance = UserRole::Member();
```
Với thể hiện của Enum thì bạn có thể truy cập trực tiếp đến các thuộc tính của Enum:
```
$enumInstance->key; // Member
$enumInstance->value; // 3
$enumInstance->description; // 'This is normal user of system'
```
Sử dụng  thể hiện của Enum làm tham số cho các phương thức:
```
function canManageSystem(UserRole $userRole)
{
    if ($userRole->is(UserRole::Administrator)) {
        return true;
    }

    return false;
}

$userRole1 = UserRole::getInstance(UserRole::Administrator);
$userRole2 = UserRole::Member()

canManageSystem($userRole1);  // Returns true
canManageSystem($userRole2);  // Returns false
```
Trong đó phương thức `is()` dùng để kiểm tra thể hiện Enum có bằng với các giá trị Enum hợp lệ không.
```
$enumInstance = UserRole::getInstance(UserRole::Administrator);

$enumInstance->is(UserRole::Administrator);  // Returns true
$enumInstance->is(UserRole::Moderator);      // Returns false
$enumInstance->is(UserRole::InvalidKey);     // Throws InvalidEnumMemberException exception
```
### Validation Enum
Bạn có thể validate `Enum Value` và `Enum Key` bằng cách sử dụng các `Enum Rule`:
* Bằng Rule: 
    ```
    [
        'user_role' => 'required|enum_value:' . UserRole::class,
        'user_role' => 'required|enum_key:' . UserRole::class,
    ]
    ```
    Đối với `Enum Value Rule` thì mặc định chế độ so sánh tuyệt đối (===) sẽ được bật  (`enum_value:enum_class,[strict = true]`). Bạn có thể tắt nó đi như sau:
    ```
    'user_role' => 'required|enum_value:' . UserRole::class . ',false',
    ```
* Bằng Rule Object:
    ```
    [
        'user_role' => ['required', new EnumValue(UserRole::class)],
        'user_role' => ['required', new EnumKey(UserRole::class)],
    ]
    ```
    Tương tự, bạn có thể tắt chế độ so sánh tuyệt đối của `Enum Value Rule Object`:
    ```
    'user_role' => ['required', new EnumValue(UserRole::class, false)],
    ```
    Lưu ý rằng, nếu bạn dùng `Rule Object` thì  bạn cần phải `Use` `EnumValue Rule` và `EnumKey Rule` tương ứng ở đầu mỗi file:
    ```
    use BenSampo\Enum\Rules\EnumValue;
    use BenSampo\Enum\Rules\EnumKey;
    ```
    
### Đa ngôn ngữ (Localization)
Ngoài việc sử dụng đa ngôn ngữ với phương thức `trans()` trong phương thức `getDescription()` ở trên, bạn còn có thể sử dụng tính năng đa ngôn ngữ của `Laravel Enum`.
    
Đầu tiên bạn cần tạo file `enums.php` trong các thư mục ngôn ngữ `resources/lang/{language_folder}` như sau:
*    `resources/lang/en/enums.php`:
        ```
        <?php

        use App\Enums\UserRole;

        return [

            UserRole::class => [
                UserRole::Administrator => 'Administrator',
                UserRole::Moderator => 'Moderator',
                UserRole::Member => 'Member',
            ],

        ];
        ```
*    `resources/lang/vn/enums.php`
        ```
        <?php

        use App\Enums\UserRole;

        return [

            UserRole::class => [
                UserRole::Administrator => 'Quản trị viên',
                UserRole::Moderator => 'Điều hành viên',
                UserRole::Member => 'Thành viên',
            ],

        ];
       ```
Sau đó bạn chỉ cần`implements` interface `LocalizedEnum` trong Enum `UserRole` là xong:
```
<?php

namespace App\Enums;

use BenSampo\Enum\Enum;
use BenSampo\Enum\Contracts\LocalizedEnum;

final class UserRole extends Enum implements LocalizedEnum
{
    // ....
}
```
Các mô tả (description) của `Enum` sẽ tự động thay đổi giá trị tùy theo ngôn ngữ của hệ thống đang dùng. 
# Kết luận
Qua bài viết trên mình đã giới thiệu cho các bạn `Enum` cũng như cách sử dụng `Enum` trong `Laravel` với package `Laravel Enum`. Hy vọng bài viết này sẽ có ích đối với các bạn :D
# Tham khảo
https://github.com/BenSampo/laravel-enum