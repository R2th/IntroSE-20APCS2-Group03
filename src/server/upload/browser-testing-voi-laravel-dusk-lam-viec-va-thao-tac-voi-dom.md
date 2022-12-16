# 1.Các Selectors trong Laravel Dusk
Trong automation test, một trong những khía cạnh quang trong nhất là cách mà bạn thao tác với các thành phần có trên trang web. Các thành phần đó có thể là các element trong form, các thẻ div, các table,... bất kỳ một thành phần hay thẻ html nào. và tất nhiên ki viết test với Laravel Dusk, ít nhiều ta sẽ cần tham chiếu đến các thành phần này. Laravel dusk cung cấp một số công cụ giúp chúng ta thực hiện điều này. Chúng được gọi là các selector

Ở bài viết này chúng ta sẽ tìm hiểu qua một số selector được cung cấp bởi Laravel Dusk

## 1.1 Tìm bằng ID

Cách phổ biến nhất là tìm các element bằng ID, Ví dụ: ta muốn kiểm tra xem có phần tử nào có ID là 'home-wrapper' trong trang chủ:

```
$this->browse(function ($browser) {
    $browser->visit('/')
        ->assertPresent('#home-wrapper');
});
```

## 1.2 Tìm bằng Name
Hoặc ta có thể tìm các phần tử bằng thuộc tính `name`. Đây là cách phổ biến nhất để thao tác với các phần tử trong form như các thẻ input,  select option, textarea hoặc button. 
 

```html
<input type="text" name="firstname" required />
```

Ví dụ: Kiểm tra xem có tồn tại một trường input có thuộc tính name là ‘firstname’ hay không

```php
$this->browse(function ($browser) {
     $browser->visit('/')
        ->assertPresent('firstname');
});
```

## 1.3 Tìm bằng CSS selector
Nếu bạn sử dụng bất kỳ công cụ automation nào như Selenium, bạn phải biết về CSS selector. CSS Selector đóng vai trò rất quan trọng khi các bạn code layout cho website, tuy nhiên về các loại selector thì hơi nhiều nên bạn có thể tham khảo ở đây [CSS selector](https://freetuts.net/selector-la-gi-tim-hieu-css-selector-can-ban-345.html), nói nôm na nó là tập hợp một đường dẫn trỏ đến element bạn cần tìm dựa vào các Id, name, tên thẻ...

Example: Let’s say you want to target the first row of table and in that a particular column which has a class grade.
Ví dụ: Tìm đến cột có class 'grade' trong hàng đầu tiên của một table

```html
<table>
 <tbody>
    <tr>
       <td class="name">John Doe</td>
       <td class="grade">A+</td>
    </tr>
    <tr>
       <td class="name">Jeff Pittard</td>
       <td class="grade">C</td>
    </tr> 
 </tbody>
</table>
```

Và kiểm tra xem nó có giá trị là 'A+' hay không

```php
$browser->assertSeeIn('table > tbody > tr:nth-child(1) > td.grade', 'A+');
```

Về cách tìm css selector thì bạn chỉ cần F12 nhấp chuột phải vào element bạn muốn chọn và chọn copy>copy selector như sau

![](https://images.viblo.asia/6f4d488f-cf54-4f36-860b-1177a98b59fb.png)

##  1.4 Tìm bằng DUSK Selector
This is a very special feature in Laravel Dusk. With the changing HTML structure it’s now always a good idea to go with CSS selectors. Since once your HTML structure is changed you need to go back to your tests and modify the path again and it becomes a tedious process.
Đây là một tính năng đặt biệt của Laravel dusk, tính năng này hữu ích trong trường hợp khi cấu trúc HTML thường xuyên thay đổi, nếu dùng CSS selector thì bạn phải cập nhật lại CSS selector khi có bất kỳ sự thay đổi nào trong cấu trúc của các thành phần có trong selector như name, id, thêm thẻ. Tuy nhiên với Dusk selector bạn có thể set thuộc tính 'dusk' và dù bạn có thay đổi cấu trúc thì Laravel Dusk vẫn dễ dàng tìm thấy element dựa vào thuộc tính dusk

```html
<button dusk="login-button">Login</button>
```
Trong test ta có thể chỉ định phần tử cần chọn bằng cách thêm '@'  váo trước thuộc tính dusk

```php
$browser->click('@login-button');
```
Tuy nhiên ta chỉ có thể sử dụng tính năng này khi có quyền chỉnh sửa nội dung code của web (để thêm thuộc tính dusk)

## 1.5 Tìm bằng XPath
Mặc định xPath không được hỗ trợ bởi Laravel Dusk. Điều này có nghĩa là ta không thể sử dụng xpath trong các phương thức của dusk. Thường thì chúng ta sẽ ít dùng tới xpath mà thay vào đó là CSS selector hoặc Dusk selector. Tuy nhiên trong một số trường hợp ngoại lệ, ta vẫn phải dùng tới.

Các function để tương tác với các element mà Laravel Dusk cung cấp hoạt động dựa trên facebook Webdriver API nhưng hiện tại trong các function này không có function nào giúp tương tác với element thông qua xpath cả, vì vậy để tương tác với xpath ta phải gọi trực tiếp instance của facebook Webdriver

Ví duj: Kiểm tra xem element với xpath '//*[@id="home-wrapper"]' có tồn tại hay không
```php
use Facebook\WebDriver\WebDriverBy;
```

```php
$this->assertTrue(count($browser->driver->findElements(WebDriverBy::xpath('//*[@id="home-wrapper"]'))) > 0);
```

# 2.Tương tác với Form Data trong Laravel Dusk
Dusk cung cấp nhiều phương thức sử dụng webdriver để tương tác với các phần tử HTML.
## 2.1 Nhập dữ liệu vào Text Fields
Để điền thông tin vào textfield, ta có thể sử dụng phương thức 'type'.

```php
$browser->type('firstname' , 'John');
```

Phương thức này sẽ mô phỏng lại hành động nhập giá trị 'Mayor' vào textfield 'firstname' của người dùng, lưu ý rằng giá trị cũ của textfield sẽ bị ghi đè lên

Trong trường hợp bạn không muốn giá trị cũ bị ghi đè có thể sử dụng phương thức 'append' để nhập tiếp nối giá trị cũ

```php
$browser->append('firstname' , 'Mayor');
```

Nếu bạn muốn xóa dữ liệu của textfield, có thể sử dụng phương thức 'clear'

```php
$browser->clear('email');
```

## 2.2 Chọn Dropdowns
Dusk cung cấp phương thức 'select' để làm việc với dropdown, phương thức này sẽ chọn ngẫu nhiên một giá trị của dropdown 'state', trong trường hợp bạn muốn chọn một giá trị cụ thể, hãy truyền nó vào tham số thứ 2 của phương thức select

```php
$browser->select('state');
// or
$browser->select('state', 'Viet Nam');
```

## 2.3 Chọn Checkboxes
Để tick một checkbox có tên 'terms', sử dụng phương thức check với tham số là thuộc tính name

```php
$browser->check('terms');

$browser->uncheck('terms');
```
## 2.4 Thao tác với Radio Buttons

To select the radio button you can make use of radio method, radio method does not give you can option to select radm radio button from a group.
Để chon một radio button, ta có thể sử dụng phương thức radio. Tuy nhiên với radio button dạng group, phương thức radio sẽ không biết chọn cái nào nên ta phải truyền giá trị của button tương ứng vào tham số thứ 2

```html
<input type="radio" id="male" name="gender" value="Male">
<input type="radio" id="female" name="gender" value="Female">
```

```php
$browser->radio('gender', 'Male);
```

Ví dụ tổng quát:

```php
<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class registrationTest extends DuskTestCase
{


    /** @test */
    public function dusk_fill_form_fields(){

        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                ->assertSee('Register')
                ->type('firstname', 'Taylor')
                ->type('lastname', 'Otwell')
                ->type('email', 'taylor.otwell@laravel.com')
                ->type('password', 'secret')
                ->type('address1', 'Dreamland')
                ->type('address2', 'House Number 42')
                ->type('city', 'Chicago')
                ->select('state')
                ->type('zip', '34423')
                ->radio('gender', 'male')
                ->check('terms')
                ->pause(2000)
                ->press('Sign Up')
                ->pause(1000)
                ->assertSee('You are now registered');
        });
    }
}
```

# 3.Kết
Trên đây là phần giới thiệu tổng quan về các phương pháp làm việc với các DOM element trong laravel dusk. Cảm ơn các bạn đã quan tâm theo dõi 😄