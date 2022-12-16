# # Blade Templating trong Laravel

Những ai đã từng sử dụng PHP chắc hẳn đều thấy nhức đầu khi dùng php để render ra view chúng ta phải `<?php` khá nhiều, và đôi khi còn cần phải dùng `htmlentities` để escape kí tự html. Thật là khổ sở phải không nào. May mắn thay, Laravel là một framework hỗ trợ khá tốt cho việc render ra view, với việc buit-in một templating engine khá tốt gọi là Blade (chắc là do Blade sử dụng `{{` và `}}` để đóng mở tag  - Giống như con dao cạo vậy). Thật ra Blade khá giống với Razor templating của MVC framework (Microsoft .NET), giúp tăng tính dễ đọc của code - tính chính xác - dễ học + cực kì mạnh mẽ với cấu trúc kế thừa view dễ hiểu và dễ dàng mở rộng. 

Ví dụ :

```php
// Kiểm tra xem User login hay chưa
@if (Auth::check())
	//Hiển thị đoạn Hello {tên user}, link sang profile page
	Hello {{Auth::user()->name}},<a href='/profile'> Profile </a>
@else
	//Hiển thị link login
	<a href='/login'>Login</a>
```

Bài viết này sẽ đưa bạn đến các vấn đề
* Giới thiệu về blade
* Các cấu trúc của Blade
	* Điều kiện
	* Vòng lặp
* Kế thừa blade
* View composer và Inject service vào trong view 
* Tuỳ biến / Tạo mới chỉ lệnh (directive) trong blade.

**Note:** Bạn quen với Symfony và Twig templating hơn Blade, bạn có thể enable Twig templating thay vì Blade theo hướng dẫn như bên dưới : https://github.com/rcrowe/TwigBridge

## Giới thiệu về Blade Templating - Cách xuất data ra view
`{{` và `}}` dùng để wrap những phần mà bạn muốn PHP xuất ra view. ví dụ `{{ $variable }}`  thì tương đương với `<?= $variable ?>` . Nhưng cũng có điểm khác biệt khi sử dụng blade là, Blade tự động escape cho chúng ta. Có nghĩa `{{ $variable }}` chính xác hơn là giống với `<?= htmlentities($variable) ?>` Nếu chúng ta muốn echo mà không escape thì có thể gọi `{{!! $variable !!}`  và blade sẽ không escape.

> **Note**: Chúng ta có thể hỏi làm sao phân biệt giữa front-end frameworks (handlebars chẳng hạn) và blade, chúng ta có thể thêm `@` vào trước để phân biệt giữa blade và handlebars như bên dưới   
>   
```php
// Blade templating
{{ $variable }}
// thêm @ vào đầu, blade sẽ bỏ qua và output toàn bộ "{{ $variable }}"
@{{ $variable }}
```


## Các cấu trúc để điều khiển luồng (Control Structures)
Các cấu trúc điều khiển luồng của blade cũng tương tự như khi chúng ta dùng PHP thuần cũng bao gồm, `if, else` , `foreach` , `while` …

### Điều kiện (Conditionals)

Blade cung cấp cho ta các cấu trúc điều kiện như bên dứoi 

#### @if :
`@if` sẽ được compile thành `<?php if ($condition) : ?>` . Các bạn có thể xác nhận lại thông qua việc kiểm tra view tương ứng trong `app\storage\views\{view_hash_id}.php` 

```php
@if count($tasks) == 1
	ban con lai 1 task
@elseif count($tasks) == 0
	khong con task nao trong he thong
@else
	Co tat ca {{ count($tasks) }} tasks con lai
@endif
```

#### @unless 
`@unless` tương tự như `@if` , và nó `@unless ($condition)` sẽ tương đương với `@if (!$condition)`

```php
@unless (Auth::check())
	Please register before proceed.
@endunless
```

### Vòng lặp (Loops)

#### @for, @foreach, và @while:
Tương đương với  PHP thuần là `for, foreach , while` tuy nhiên có 1 lưu ý ở bên dưới 

> **Lưu ý:** Khi sử dụng `@foreach` thì Laravel sẽ tự động tạo một `stdClass` object là `$loop` . Chúng ta có thể dùng biến `$loop` để tham chiếu đến các thuộc tính như: `first`, `last`, `depth` …   
> Tham khảo về biến loop ở đây:  [Blade Templates - Laravel - The PHP Framework For Web Artisans](https://laravel.com/docs/5.6/blade#loops)  

## Kế thừa
Blade cung cấp cho ta một cấu trúc để có thể kế thừa, chỉnh sửa hoặc include các view khác nhau.

### Định nghĩa thành phần trong view bằng @section, @show và @yield
Bên dưới là đoạn code mẫu của `resources/views/layouts/master.blade.php`

```html
<html>
	<head>
		<title> My site | yield('title', 'Home Page') </title>
	</head>
	<body>
		<div class="container">
			@yield('content')
		</div>
		@section('footerScripts')
			<script src='app.js'></script>
		@show
	</body>
</html>
```

Chúng ta sử dụng hàm `yield` ở 2 chỗ, và `@section` ở một chỗ.  
Tất cả đều có điểm chung là chúng sẽ có thể được mở rộng bởi các view con. 
Vậy thì có gì khác ở đây.
* `@yield(‘content’)` : không có gía trị default, có nghĩa là nếu lớp con không thực hiện extend phần `content` thì sẽ không có gì hiển thị cả
* `yield(‘title’, ‘Home page’)`: ở đây chúng ta thiết lập giá trị mặc định cho `title` là `Home page`, tuy nhiên lớp con có thể overwrite, và giá trị `Home page` chỉ xuất hiện khi lớp con không thực hiện extends phần `title`
* `@section` … `@show` thì định nghĩa cả giá trị default và cho phép lớp con extends giá trị đó. Chúng ta có thể cho `footerScripts` include file `app.js` bằng chỉ lệnh `@parent` . 

Bên dưới là ví dụ một views con extend view `master.blade.php`

```php
// resources/views/dashboard.blade.php
@extends('layouts.master')

@section('title', 'Dashboard') // overwrite `Home Page`

@section('content')
Welcome to your Dashboard
@endsection

@section('footerScripts')
	@parent
	<script src='dashboard.js'></script>
@endsection

```

* `@extends('layouts.master’)`: định nghĩa views này sẽ được kế thừa từ views `layouts.master`
* `@section('title', 'Dashboard')`: Page này sẽ có title là `Dashboard` thay vì là `Home page` , default của views `layouts.master` đã bị overwrite.
* @section : định nghĩa từng section của views con. Nếu ta có sử dụng chỉ lệnh `@parent` thì nội dung của section từ view cha sẽ được insert vào view con và chúng ta có thể tuỳ biến thêm nội dung. Ví dụ ở trên chúng ta mở rộng view cha, sau đó thêm thư viện `dashboard.js`


### Các chỉ lệnh (directives) dùng để định nghĩa cấu trúc view

#### @extends
Với chỉ lệnh `@extends` chúng ta định nghĩa, views `dashboard` sẽ được kế thừa từ views `layouts.master`.  Mỗi một views chỉ được kế thừa duy nhất một views cha khác.

#### @sections và @endsections
Chúng ta định nghĩa một section bằng từ khoá `@section` và `@endsection`  tuy nhiên ở lớp cha, (ví dụ ở trên là `layouts.master` chúng ta kết thúc định nghĩa section không phải bằng chỉ lệnh `@endsection` mà bằng chỉ lệnh `@show`. 

#### @parent
Khi một view con mở rộng một view cha, chúng ta sẽ có 2 lựa chọn 
* Overwrite: ghi đè lên định nghĩa của view cha. Chúng ta sẽ define nội dung của view con trong khung section
* Extends : mở rộng, add thêm thông tin vào view cha, bằng cách sử dụng chỉ  lệnh `@parent` để lấy nội dung ở view cha. Ví dụ ở trên chúng ta muốn include file javascript `app.js` mà views cha đã include rồi nên ta thêm chỉ lệnh `@parent` .

#### @include
Ta có thể include một view khác vào đồng thời truyền thêm parameters cho chúng thông qua chỉ lệnh `include`. Những biến số nằm trong parent view cũng có thể được access ở included view.

```php
// View cha
<div class="content" data-page-name="{{ $pageName }}"
	You should sign up for our beautiful app!!!
	@include('sign-up', ['text' => 'Check it out']);
</div>
// sign-up views
<div class='button' data-page-name="{{ $pageName }}"> // pageName là biến số của View cha
	{{ $text }} //$text là biến số được view cha truyền vào
</div>
```

#### @each
Đôi khi chúng ta cần thực hiện lặp với từng models sẽ được truyền 1 partials view, chúng ta có thể thực hiện điều này thông qua chỉ lệnh `@each`

```php
@each('view.name', $jobs, 'job', 'view.empty')
```

> **Lưu ý** : khi sử dụng `@each` thì chúng ta không truy cập được biến của view cha nữa. Nếu cần phải truy cập chúng ta có thể dùng `@foreach` rồi `@include` để truy cập.  
### View Composer và inject Service component vào trong Views

#### Binding thông qua View composers
**View composers**: view composer sẽ cho phép chúng ta định nghĩa _Khi có bất kì view nào được load thì phải có data tương ứng được truyền cho chúng_. Giả sử chúng ta có một partial view gọi là `sidebars` và trong sidebars luôn luôn có 7 bài post gần nhất hiển thị. Chúng ta có thể dùng view composer để share 7 bài post gần nhất đó. Và chúng ta có đến 3 cách để thực hiện điều này
* Chia sẻ một biến global (bất kì view nào cũng access được biến này
* Chia sẻ thông qua closure
* Chia sẻ thông qua class


#### Chia sẻ một biến global
Cách nhanh nhất và đơn giản nhất. Tuy nhiên có nhược điểm là không phải view nào cũng cần đến 7 bài post gần nhất

```php
//Service provider
public function boot(){
	view()->share('posts', Post::recent());
}
```

Chúng ta sử dụng `view()->share()` để thực hiện điều này. Chúng ta có thể code đoạn settings trên bên trong `App\Providers\ServiceProviders`  hàm `boot`


#### Closure based

Sử dụng closure để chia sẻ một biến với một view như bên dưới 
```php
view()->composer('partials.sidebar', function($view){
	$view->with('posts, Post::recent());
});
```

Chúng ta dùng `view()->composer()` để thực hiện chia sẻ, tham số đầu tiên là tên của views mà chúng ta muốn chia sẻ, ở đây là `partials.sidebar` chúng ta hoàn toàn có thể chia sẻ với 1 mảng tên các views. như bên dưới :
```php
view()->composer([
'partials.sidebar',
'partials.footer',
'partials.header',
], function($view){
	$view->with('posts, Post::recent());
});
```

Chúng ta có thể chia sẻ biến `posts` với rất nhiều views thông qua phương pháp trên. Tất nhiên là mỗi lần chúng ta lại phải đi cập nhật cái list view được chia sẻ này…

#### Class based (ViewComposer class)
Cách mạnh nhất và cũng đưa ta đến khả năng tuỳ biến cao nhất là sử dụng ViewComposer. Ở đây thay vì dùng closure thì chúng ta sẽ tạo hẳn một class mới và viết logic chia sẻ biến bên trong method `composer` của class đó.  Các step để thực hiện bao gồm
* Viết một class `RecentPostsComposer` chẳng hạn 
* Viết logic chia sẻ biến bên trong method `composer` của class vừa tạo 
* Binding composer vừa tạo vào Service Provider. Mình lười thì mình hay binding thẳng vào trong `AppServiceProvider` tuy nhiên các bạn nên cấu trúc một Service Provider chuyên về ViewComposer, và chúng ta sẽ binding trong Service Provider đó như trong bài này https://viblo.asia/p/huong-dan-su-dung-view-composer-trong-laravel-53-3P0lPONbZox

**Code tham khảo**

```php
namespace App\Http\ViewComposers;

use App\Post;
use Illuminate\Contracts\View\View;

class RecentPostComposer{
	//Constructor
	public function __construct(Post $post){
		$this->post = $post;
	}
	// Compose view, thêm những biến chúng ta muốn chia sẻ vào đây.
	public function compose(View $view){
		$view->with('posts', $this->posts->recent());
	}
}

//Binding bên trong App service Provider
public function boot(){
	...
	view()->composer(
	'partials.sidebar',
	\App\Http\ViewComposers\RecentPostsComposer::class);
}
``` 

Chúng ta có thể thấy việc binding tương tự như khi chúng ta dùng closure, chúng ta truyền tên class và Laravel sẽ tự động chạy hàm `compose` trong class được chỉ định và trả về 7 bài viết gần nhất.

#### Inject Service component vào trong blade
Chúng ta có 2 cách để inject một service vào trong blade. 
Cách thứ nhất là thông qua route definition như bên dưới 
```php
Route::get('backend/sales', function(SalesService $salesSvc){
	return view('sales.graph')
	->with('salesSvc', $salesSvc);
}
```

và phía blade có thể sử dụng biến `$salesSvc` thoải mái. 
Cách thứ hai là chúng ta có thể inject service vào trong trong blade view như bên dưới :

```php
// sales/graph.blade.php
@inject('salesSvc', 'App\Services\SalesService');
Total sales is: {{ $salesSvc->total() }}
```

Ta thấy việc inject Services thông qua `@inject` giúp chúng ta dễ dàng gọi được các hàm của Services mà không cần phải chỉnh sửa `Controllers` hay định nghĩa `Routes`.

### Tuỳ biến chỉ lệnh của blade (Blade Directives)
Cuối cùng, các bạn có thể tự hỏi, chúng ta có thể tự viết chỉ lệnh của riêng mình như khi chúng ta custom JSTL không?, câu trả lời tất nhiên là “CÓ” .
Giả sử chúng ta thường gặp phải nhất là check quyền chẳng hạn 
```php
@if (Auth::check() ) //đoạn này chúng ta thấy lặp đi lặp lại cực nhiều 
You are logging in
@else
Please login
@endif
```

Mình muốn rút gọn lại thành:
```php
@ifLoggedIn
	You are logging in
@else
	Please login
@endif
```

Điều này là hoàn toàn có thể nếu chúng ta như bên dưới 
```php
//AppServiceProvider
public function boot(){
	Blade::directive('ifLoggedIn', function(){
		return "<?php if (auth()->check()): ?>";
	});
}
```

Ở đoạn code trên chúng ta trả về một string và sẽ được thực thi bởi PHP.  Điều này có nghĩa gì? Chúng ta sẽ giấu tất cả những logic phức tạp `isHuman() && age() > 18` … vâng vâng phía sau những chỉ lệnh như `@ifAdult` chẳng hạn. Chúng ta sẽ không cần phải lặp đi lặp lại chúng và khi logic `ifAdult` thay đổi, chúng ta chỉ việc update lại logic của chỉ lệnh.


## Kết luận
Blade là một công cụ dùng để render view cực kì hiệu quả của Laravel với mục tiêu trong sáng - chính xác - và mang tính biểu hiện. Chúng ta đơn giản hoá việc sử dụng `<?php echo ?>` với blade. Ngoài ra blade cũng hỗ trợ cực tốt cho việc cấu trúc kế thưà cũng như mở rộng view thông qua `yield()` `section` hay `@parent` để thực hiện kế thừa lớp cha. 
ViewComposer cung cấp cho ta một công cụ để chia sẻ thông tin / data giữa các view rất hiệu quả. Chúng ta cũng có thể inject một service class trực tiếp vào trong blade thông qua `@inject`

#technology