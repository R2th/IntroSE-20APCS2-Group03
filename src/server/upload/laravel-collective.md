# Giới thiệu
Khi sử dụng Laravel, bạn sẽ thấy có khá nhiều thứ dùng "khác khác" so với PHP thuần thông thường. Laravel hỗ trợ khá nhiều thứ, 1 trong số đó là Laravel Collective, hỗ trợ viết html trong Blade. Nếu bạn từng ở Education Framgia ngôn ngữ PHP, bạn chắc đã từng bực mình và cảm thấy khó chịu khi bị bắt sử dụng Collective thay cho Html thông thường. Mình cũng thế :). Đó là bởi vì mình mất thời gian tìm hiểu cách viết tương tự cho thứ mình đã biết rồi, giờ phải đổi sang cách khác. Rồi đến lúc truyền biến ra ngoài cũng lằng nhằng, Doc lại nói ko rõ về các tham số và các cách truyền biến, mỗi lần sử dụng lại phải đi search, lượm lặt từ nhiều nguồn khác nhau về để dùng được cho mục đích của bản thân, chứ Doc chỉ có cơ bản thôi. Nên mình viết bài này, tổng hợp cả mấy thứ mà mình lúng túng khi dùng mà Doc nói không cụ thể, cho các bạn dễ tra cứu và sử dụng :D
# Cài đặt
Trước hết là tải Laravel collective đã. Tải bằng composer luôn cho tiện nhé:
```bash
composer require "laravelcollective/html":"^5.4.0"
```
![](https://images.viblo.asia/37c0b710-4d38-4c5f-9b28-c9f5a3cf4e74.png)

Sau khi thấy đã tải về thành công như trên, thì giờ có thể khai báo vào Project để sử dụng rồi nhé.

Chúng ta sẽ thêm khai báo provider mới trong file `config/app`, khai báo vảo mảng `providers` như sau:
```php
'providers' => [
    // ... some other providers
    Collective\Html\HtmlServiceProvider::class, //add this line
    // ... and other providers
  ],
```
Ngoài ra cũng phải khai báo `aliases` nữa, cũng trong cùng thư mục trên, trong mảng `aliases`:
```php
'aliases' => [
    // ... some other aliases
      'Form' => Collective\Html\FormFacade::class, //add this line
      'Html' => Collective\Html\HtmlFacade::class, //and this line
    // ... and other providers
  ],
```
Việc khai báo `Alias` này sẽ giúp các bạn gọi các lớp một cách ngắn gọn hơn, là `Html` - chỉ gọi tên thay vì gọi đầy đủ 'cả họ cả tên' của lớp ra: `Collective\Html\HtmlFacade` dài dòng văn tự

Vậy là xong, sẵn sàng sử dụng :D
# Sử dụng
## 1, Thay thế HTML Form
### Thẻ form
Để thay thế cho thẻ mở form, sử dụng như này nhé:
```php
{{ Form::open() }}
//đóng form
{{ Form::close() }}
```
Bình thường khi sử dụng Form trong Blade Laravel, nếu mọi người không khai báo `csrf` thì sẽ bị báo lỗi ngay. Nhưng khi sử dụng Collective là đã mặc định bao gồm cả `csrf` rồi, nên cũng đỡ được 1 việc :D. Ngoài ra cũng có sẵn luôn cái `accept-charset="UTF-8"` luôn nhé!
> `csrf` của Laravel là 1 input ẩn, phục vụ việc tạo 'token' trong mỗi phiên làm việc của bạn và được quản lý bởi ứng dụng, nhằm phòng chống tấn công csrf. [Xem thêm](https://viblo.asia/p/csrf-va-csrf-protection-trong-laravel-57rVRqg5G4bP)

Vậy là cái dòng ngắn ngủi trên kia đã thay thế cho dòng này của Blade Laravel
```html
<form method="POST" action="http://localhost:8000/form" accept-charset="UTF-8">
@csrf
```
Nếu render thử ra html, các bạn sẽ thấy kết quả render ra khá dài thế này:
![](https://images.viblo.asia/b956e0d0-f1e8-4e14-b007-456cb9f14651.png)

Vậy nên mới nói Laravel colletive giúp viết ngắn hơn HTML thông thường :)

Trong phần `()` của Form open trên kia, các bạn sẽ điển mảng các thông tin mà bình thường vẫn viết trong thẻ `<form>`, như là `method`, `action`, `style`, ...

Lấy ví dụ bình thường chúng ta viết như sau:
```html
    <form action="/submit" name="test_form" method="get" style="border: 1px solid green; color: coral"> 
    </form>
```
thì để viết collective, chúng ta sẽ bỏ hết mấy cái đó vào mảng như sau:
```php
{{ Form::open([
    'url' => '/submit',
    'name' => 'test_form',
    'method' => 'get',
    'style' => 'border: 1px solid green; color: coral',
]) }}
{{ Form::close() }}
```

**File**

Để cho phép tải file, với html thông thường sẽ là:
```html
<form method="POST" accept-charset="UTF-8"
  enctype="multipart/form-data">
```

Và chuyển sang Collective sẽ như sau:
```php
{{ Form::open(['files' => true]) }}
```

### Thẻ Select
Bản đầy đủ:
```php
{{ Form::select(<name của thẻ select>, <tập giá trị hiển thị cho các option>, <tập giá trị của các option tương ứng>, <giá trị được selected>, <các attribute của thẻ select, option khác>)
```

Đối với thẻ select, bởi vì nó cũng là 1 phần tử của form, nên sẽ sử dụng Form collective nhé!. Cú pháp cơ bản như sau:
```php
{{ Form::select('city', ['Ha Noi', 'Da Nang', 'HCM']) }}
```
Đoạn collective như trên tương đương với html:
```html
<select name="city">
    <option value="0">Ha noi</option>
    <option value="1">Da Nang</option>
    <option value="2">HCM</option>
</select>
```
Như vậy, có thể thấy, tham số đầu tiên chính là `name` của bộ select - option đó. Tham số thứ 2 đưa vào, nếu chỉ đưa vào 1 mảng 1 chiều các giá trị, khi render ra html chúng sẽ được hiểu là các giá trị hiển thị cho mỗi option, và các `value` của option đó sẽ được đánh số tự động kiểu mảng - đánh từ 0, 1, 2, 3,...

Đây là kiểu select tối giản nhất. Nhưng mà thực tế thì mình cần nhiều thứ cho bộ select - option của mình hơn. Nên là 'Next level' này:
```php
{{ Form::select('city', [
     'hn' => 'Ha Noi',
     'dn' => 'Da Nang',
     'hcm' => 'HCM']
) }}
```
Nhìn qua chắc mọi người cũng đoán được là cái gì được thêm vào rồi nhỉ. Lần này thì các `value` của từng option đã được thêm vào tương ứng, không còn là đánh số mặc định nữa
```html
<select name="city">
    <option value="hn">Ha noi</option>
    <option value="dn">Da Nang</option>
    <option value="hcm">HCM</option>
</select>
```
* Ờmmm, nhưng mà mình muốn giá trị HCM được select sẵn như thế này thì làm sao?
```html
<select name="city">
    <option value="hn">Ha noi</option>
    <option value="dn">Da Nang</option>
    <option value="hcm" selected>HCM</option>
</select>
```
Đây nhé, điền value được select vào tham số sau tham số mảng truyền vào nhé:
```php
{{ Form::select('city', ['hn' => 'Ha Noi', 'dn' => 'Da Nang', 'hcm' => 'HCM'], 'hcm') }}
```
* Nhưng mà mình thích đẹp, mình phải gán `id`, `class` các kiểu vào để css cho form của mình nó đẹp nữa, mà nhỡ muốn thêm các attribute của select khác nữa thì sao? `style` chẳng hạn?

Vậy thì những attribute khác của select, nhét hết vào 1 mảng attribute như sau nhé:
```php
{{ Form::select('number', [1, 2, 3], null, ['class' => 'field', 'style' => 'color: red, border: 1px solid blue']) }}
```
Giờ đã có kết quả như bạn muốn rồi :D
```html
<select name="number" class="field" style="color: red, border: 1px solid blue" >
    <option value="0">1</option>
    <option value="1">2</option>
    <option value="2">3</option>
</select>
```
* Vậy giờ bạn có 1 mảng giá trị đang lưu trong 1 biến $city, muốn ném cả cái mảng đó vào select - option thì sao?

Nhiều bạn gặp cái vấn đề này, loay hoay ngại tìm hiểu, bởi vì trong html thông thường thì mọi thứ dễ lắm, cứ foreach là ra thôi:
```html
<select name="city">
    @foreach ($city as $option)
        <option value="{{ $option->value }}> {{ $option->display }}</option>
    @endforeach
</select>
```
Mọi thứ rất là đơn giản, ko cần nghĩ gì cả. Nhưng mà trong docs Laravel collective lại không đề cập trực tiếp vấn đề xử lý cái này, nên mới lười thôi. Chứ thực ra không khó khăn đâu:

Nếu tập giá trị của bạn đang có dạng
```php
$city[cityValue] = $cityName
```
thì sẽ làm như sau nhé
```php
{{ Form::select('city', $city, null) }}
```
Đó, biết được thứ tự tham số thì cũng đơn giản mà :D
## 2, HTML thông thường khác
### HTML entities decode - Ký tự thực thể HTML
Vì html cũng được viết thông qua tập hợp các ký tự cơ bản (như trên bàn phím của chúng ta), nên đôi khi, bạn muốn viết các ký tự đấy dưới dạng văn bản thuần, mà vô tình trình duyệt của chúng ta lại hiểu nhầm bạn muốn viết ký tự đặc biệt (ví dụ như `<` là tag mở thẻ chẳng hạn. Khi đó, chúng ta sẽ sử dụng ký tự thực thể để thay thế, đảm bảo trình duyệt không hiểu nhầm ý của chúng ta.

> Ví dụ, bạn muốn hiển thị ký tự thuần: `<h2>Framgia </h2>` chứ không muốn hiển thị thành thẻ `<h1>` chẳng hạn

Có 2 kiểu ký thực thể bạn có thể dùng là thực thể số và thực thể chữ, cụ thể thay thế ra sao mọi người xem thêm tại đây nhé: https://www.w3schools.com/html/html_entities.asp

Với Collective, bạn sẽ decode đám ký tự thực thể như sau:
```php
{!! Html::decode('&amp;lt;h1&amp;gt;Hello&amp;lt;/h1&amp;gt;') !!}
```
Lưu ý chút, trong đoạn khai báo aliases ở phần cài đặt, nếu bạn khai báo là `Html` - kiểu Capital thì khi sử dụng cũng viết kiểu Capital là `Html` nhé, viết UPPERCASE (`HTML`) hay viết thường đều báo lỗi đấy. Khai báo như nào dùng như vậy :)

Kết quả in ra màn hình: 
![](https://images.viblo.asia/54d05724-fa7b-4a98-b336-d1dba99d205a.png)
### Khai báo JS
Bình thường thì để khai báo sử dụng file js, chúng ta viết như sau:
```html
<script src="js/main.js"></script>
```
Về với Collective thì chỉ như này:
```php
{{ HTML::script('js/main.js') }}
```
Lưu ý: đối với HTML 5 thì phần `type` trong thẻ `<script>` có thể không viết, nhưng nếu bạn đang dùng HTML 4.01 thì nhớ viết thêm `"type" => "text/javascript"`  vào nhé!
### Khai báo CSS
```html
<link media="all" type="text/css" rel="stylesheet" href="http://localhost:8000/css/style.css">
```
Với Collective thì chỉ còn
```php
{{ HTML::style('css/style.css') }}
```
Giống như phần khai báo form ở trên, với script và style, các bạn có thể gom các attribute khác vào 1 mảng và đặt mảng đó như tham số thứ 2 của Collective
### Thẻ Image
```html
<img src="http://localhost:8000/img/picture.jpg" class="thumb" alt="picture 1">
```
Trong Collective sẽ như sau:
```php
{{ HTML::image('img/picture.jpg', 'a picture', ['class' => 'thumb']) }}
```
Theo thứ tự các tham số: link ảnh, alt của ảnh, tập các attribute khác (như tập các attribbute ở trên đã nói nhé).
### Link
Để sử dụng liên kết đường dẫn, trong Html thông thường sẽ sử dụng thẻ `<a></a>`, vậy còn Collective?
```php
{{ HTML::link('http://viblo.asia.com', null, ['id' => 'link']) }}
```
Thứ tự các tham số như sau: Link đường dẫn, nội dung thẻ `<a>` (nếu để nguyên nội dung thẻ là đường dẫn thì để null), tập các attribute khác.

Ví dụ như dòng trên sẽ tương đương với 
```html
<a href="http://viblo.asia.com" id="link">http://viblo.asia.com</a>
```
Còn nếu bạn muốn thay đổi nội dung hiển thị của thẻ `<a>` thì chỉ cần thay `null` bằng nội dung bạn muốn thôi :D.
### Link route
Trong Laravel, ngoài việc truy cập tới trang con của bạn bằng thẻ `<a>` - URL thông thường, chúng ta còn có thể đặt tên cho route trong file Routes và gọi tới route name để truy cập tới route đó nữa. Trong Collective, các bạn có thể gọi như sau:
```php
{{ HTML::linkRoute('login', 'Sign In', [], ['class' => 'btn']) }}
```
Hiển thị ra sẽ như thẻ `<a>` nhé, với lần lượt các tham số như sau:
* Tham số đầu tiên là route name
* Tiếp đến là nội dung hiển thị của thẻ `<a>`
* Tham số tiếp là tham số truyền vào route (ví dụ như Id chẳng hạn - nếu có, còn không thì để `null`)
* Tham số cuối cùng là tập các attribute khác dưới dạng mảng (lại là 'như trên')