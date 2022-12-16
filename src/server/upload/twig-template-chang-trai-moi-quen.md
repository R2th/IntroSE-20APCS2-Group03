Thời gian gần đây thời tiết có phần nắng nóng, mình có làm quen với một anh chàng template engine mới cho PHP, có màu xanh lá mát mẻ đó là Twig, nên hôm nay mạo muội xin chia sẻ về anh ấy.
![](https://images.viblo.asia/7a462ae6-367f-4960-b2a3-cf4b389a8c58.jpg)
### 1. Tổng quan về Twig
Thông tin từ nhiều tài liệu cung cấp thì Twig là một template engine cho PHP với người đỡ đầu là lập trình viên Symfony. Anh ấy là một trong các anh chàng template engine với cú pháp và mã nguồn trong sáng nhất mà mình từng gặp. Twig được thiết kế và phát triển dựa trên các nguyên tắc cơ bản của PHP nhằm giải quyết 3 vấn đề:
* Fast: Được tối ưu hóa, đơn giản và rút gọn.
* Secure: Twig có chế độ sandbox để đánh giá xem mã trong template có đáng tin cậy hay không.
* Flexible: Cú pháp linh hoạt, dễ tùy chỉnh, bạn hoàn toàn có thể định nghĩa các thẻ và bộ lọc riêng.

Qua cái nhìn tổng quan thì đây là một anh chàng đơn giản, dễ tiếp cận nhưng lại rất thú vị. Đi thăm nhà [Twig](https://twig.symfony.com/) thì nhận thấy Twig sử dụng {{ }} để in nội dung bên trong, {% %} cho các xử lý logic như if-then-else, for... và {# #} để đưa comment vào đoạn mã.
Đầu tiên hãy đưa anh ấy về nhà bạn rồi chúng ta cùng tìm hiểu nhé!

### 2. Cài đặt 
Hiện tại Twig đã phát hành phiên bản 2.0 với yêu cầu máy chủ hỗ trợ PHP 7.0 trở lên, và bạn có thể cài đặt nó cho dự án của mình thông qua composer với đoạn lệnh sau:

`composer require "twig/twig:^2.0"`

Là một trong những template engine mạnh mẽ, không lạ gì khi Twig được đa số các IDE hỗ trợ mặc định hoặc qua các plugin đi kèm. Như hiện tại mình đang sử dụng Visual Studio Code nên cài  2 em này: [Twig Language 2](https://marketplace.visualstudio.com/items?itemName=mblode.twig-language-2) và [Twig](https://marketplace.visualstudio.com/items?itemName=whatwedo.twig) .

Còn cách đơn giản nữa là bạn có thể dùng IDE online [TwigFiddle](https://twigfiddle.com/) để test nhanh các đoạn code của mình. Các cách tiếp cận đơn giản này thì bạn có thể dễ dàng làm việc với anh chàng Twig này rồi đúng không? Bắt đầu tìm hiểu tính cách thôi nào, Let's go!!!

### 3. Các cú pháp Twig cơ bản 
Sẽ giống các template khác chứa bên trong gồm các biến và các biểu thức, khi template được xử lý qua template engine, các giá trị của biến và biểu thức sẽ được in ra vị trí phù hợp trong template trang web tạo thành các tài liệu hoàn chỉnh. Như đã nói ở phần tổng quan thì Twig có hai cú pháp cơ bản:
* {% %}
* {{ }}
```twig
<head>
    <title>Twig template</title>
</head>
<body>
    <ul id="navigation">
    {% for item in navigation %}
        <li><a href="{{ item.href }}">{{ item.caption }}</a></li>
    {% endfor %}
    </ul>

    <h1>Twig template</h1>
    {{ twig_variable }}
</body>
```

Đây là một ví dụ đơn giản về Twig, tiếp theo chúng ta cùng tìm hiểu chi tiết hơn.

##### Variables
Twig hỗ trợ get biến bằng cách đơn giản như sau:

```twig
{{ foo.bar }}
```

Điều quan trọng cần biết là các dấu ngoặc nhọn {{}} không phải là một phần của biến mà là câu lệnh in. Khi truy cập các biến, chúng ta không đặt các dấu ngoặc xung quanh chúng. Nếu một biến hoặc thuộc tính không tồn tại, bạn sẽ nhận được giá trị `null` khi `strict_variables` được đặt thành `false`; hoặc Twig sẽ đưa ra lỗi.

Với các variables có ký tự đặt biệt bạn phải sử dụng attribute function như sau:
```twig
{{ attribute(foo, 'data-foo') }}
```

Và gán giá trị cho biến như thế này để sử dụng nhé:
```twig
{% set foo = 'foo' %}
{% set foo = [1, 2] %}
{% set foo = {'foo': 'bar'} %}
```

##### Filters
Filters được áp dụng với kí tự |. Được sử dụng trong các trường hợp như đếm độ dài các từ, nối các phần tử mảng,...

```twig
<p> The array has {{words | length }} elements </p>
<p> Joined array elements: {{ words | join(',') }} </p>
<p>  {{ sentence | title }} </p>  
```

##### Comments
Comment được sử dụng trong cú pháp {# ... #}
```twig
{# note: disabled template because we no longer use this
    {% for user in users %}
        ...
    {% endfor %}
#}
```

##### Named Arguments
Sử dụng các Named Arguments làm cho các templates của bạn rõ ràng hơn về ý nghĩa:

```twig
{{ data|convert_encoding('UTF-8', 'iso-2022-jp') }}

{# versus #}

{{ data|convert_encoding(from='iso-2022-jp', to='UTF-8') }}
```

Các Named Arguments cũng cho phép bạn bỏ qua một số đối số mà bạn không muốn thay đổi giá trị mặc định:
```twig
{# the first argument is the date format, which defaults to the global date format if null is passed #}
{{ "now"|date(null, "Europe/Paris") }}

{# or skip the format value by using a named argument for the time zone #}
{{ "now"|date(timezone="Europe/Paris") }}
```

##### Functions
Functions được gọi bằng tên của chúng theo sau dấu ngoặc đơn (()) và có thể có đối số.
```twig
{% for i in range(0, 3) %}
    {{ i }},
{% endfor %}
```

Ví dụ date() function cho phép chúng ta so sánh ngày và twig hỗ trợ nhiều function khác nữa.
```twig
{% if date(user.created_at) < date('-5years') %}
    <p>{{ user.name }} is a senior user</p>
{% endif %} 
```

##### Control Structure
Câu điều kiện thì chúng ta cũng đã biết rồi nên mình đi thẳng vào ví dụ sử dụng như nào trong twig luôn nè.

Đây là câu điều kiện if-else mình sử dụng để tạo 2 loại button trong dự án:
```twig
{% if class == "btn--icon" %}
    <img src="{{ asset('assets/icon/ic_filter_white.svg') }}"/> Edit
{% else %}
    Submit
{% endif %}
```

Đây là khi mình sử dụng tạo danh sách HTML với for và bạn cũng có thể sử dụng slice() để lặp qua một phần của mảng.
```twig
<ul>
    {% for word in words %}
        <li>{{ word }}</li>
    {% endfor %}
</ul>

<ul>
    {% for word in words|slice(2, 4) %}
        <li>{{ word }}</li>
    {% endfor %}    
</ul>
```


Mình còn áp dụng vòng lặp như này để tạo nội dung, tái sử dụng các phần common trong dự án.
``` twig
{# common/formGroup.twig #}

{% for item in options %}
	<div class="form-group">
		<label for="{{item.id}}" class="label">{{item.label}}</label>
		<input type="{{item.type|default('text') }}" class="input" name="{{item.name}}" value="{{item.value}}" placeholder="{{item.placeholder}}" id="{{item.id}}">
	</div>
{% endfor %}
```

Sau đó include vào page hiện tại mỗi lần mình muốn sử dụng form-group:
```twig
{# page/register.twig #}

{% set formGroup = [{
    id: 'id',
    name: 'id',
    value: '',
    label: 'ID',
    placeholder: 'id'
},
{
    id: 'name',
    name: 'name',
    value: '',
    label: 'Name',
    placeholder: 'Twig'	
}]
%}

{% block main %}
    <div class="content">
        {% include 'common/formGroup.twig' with {"options" : [formGroup[0]]} %}
        {% include 'common/formGroup.twig' with {"options" : [formGroup[1]]} %}
	</div>
{% endblock %}
```

##### Macros
Macro được dùng để tái sử dụng các đoạn HTML và định nghĩa qua macro tag. Trong dự án mình đã sử dụng đơn giản như là tạo một breadcrumb:
```twig
{# common/breadcrumb.twig #}

{% macro breadcrumb(text1, text2) %}
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">{{text1}}</a></li>
        <li class="breadcrumb-item active">{{text2}}</li>
    </ol>
{% endmacro %}
```
Và import vào những page mình cần sử dụng:

```twig
{% import "common/breadcrumb.twig" as breadcrumb %}

<div>{{ breadcrumb.breadcrumb('home','about')}} </div>
```
Qua quá trình sử dụng thì mình thấy chỉ nên dùng macros trong các trường hợp ít đối số, vì nó không hổ trợ cho object nên dùng vòng lặp như phía trên vẫn tốt hơn.
### Tổng kết
Bài chia sẻ tạm thời dừng tại đây, cảm ơn bạn đã dành thời gian đọc bài viết! Mình chỉ chia sẻ những gì mình đã sử dụng, ngoài ra thì anh chàng Twig này còn nhiều tính cách khác nữa, hỗ trợ cho bạn rất nhiều, bạn hãy ghé thăm nhà anh ta để tìm hiểu thêm, theo địa chỉ [tại đây](https://twig.symfony.com/doc/3.x/).