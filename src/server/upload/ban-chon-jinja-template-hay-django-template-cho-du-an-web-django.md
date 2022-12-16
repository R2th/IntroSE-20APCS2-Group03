Nếu như bạn đã biết tới Django chắc bạn cũng đã biết, Django cho phép sử dụng các template engine khác thay cho Django template mặc định của framework.

Jinja template là một engine nổi bật để sử dụng với các framework web Python. Lý do là bởi Jinja tương thích rất tốt với framework web Python. Jinja2 là đời thứ 2 và nó kế thừa hầu hết sự tốt đẹp của Jinja1. Sự khác nhau giữa Jinja2 và Jinja1 bạn có thể tìm thấy [ở đây](http://jinja.pocoo.org/docs/2.10/switching/). Trong bài viết này, mình sẽ nói tới Jinja2 như là đại diện cho Jinja template engine.

Vậy, lý do nào bạn nên sử dụng Jinja2 thay cho Django template. Và các chuyển đổi từ Django template sang Jinja2 như thế nào? Dưới đây, mình sẽ chia sẽ một số hiểu biết của mình về vấn đề này.


# Introduction
Vốn so sánh một framework vs engine template nó chả có ý nghĩa gì cả =)). Việc so sánh này vốn chỉ để các bạn nhìn thấy tổng quan một chút về Django framework vs Jinja template.

|                           | Django                    | Jinja2                |
| -------------             |:-------------:            | :-----:               |
| Redit point               | 4.44K                     | 67                    |
| Stack Overflow questions  | 175K                      | 4.34K                 |
| GitHub Stats              | 35.1K                     | 5.3K                  |
| -------------             | -------------             |-----                  |
| Description               | Django là framework Python mạnh mẽ <br> để phát triển web| Jinja2 là template engine tương thích cực tốt với <br> web framework Python |
| Website                   | Instagram, Pinterest, Udemy, Coursera, MIT |  Sendwithus, RoyaltyShare, MetaBrite, Cobe Ltd, GRVTY |


*Dữ liệu updated: 16/07/2018.

# Compare Django Template with Jinja
## The same
Jinja2 lấy cảm hứng từ Django template. Do đó, rất nhiều syntax của 2 bên giống nhau. Điều đó thuận lợi cho việc switching template nếu cần thiết.


### Variable & Block
Dấu ngoặc nhọn: `{}` được sử dụng rộng rãi trong cả Django template và Jinja2.

- Với variable: {{ yourvariable }}.
- Với block: `{% block yourblock  %}` .... `{% endblock %}`.

Ngoài ra, Django template và Jinja2 đều giống nhau khi extend/include parent/child templates:

- `{% extends "yourtemplate.html" %}`.
- `{% include "yourtemplate.html" %}`.

### Conditional & Loop
Django template sử dụng syntax để tạo condition và loop giống với Jinja2:

- Với Condition: `{ if condition1 %}...{% elif condition2 %}...{% else %}...{% endif %}`.
- Với Loop: `{% for item in listofitems %}...{{item}}...{% endfor %}`.

### Comment
Cả Django template và Jinja2 đều sử dụng chung một syntax comment trong template.

Cụ thể: `{# This is a template comment that isn't rendered #}`.
### Spacing and special character
Jinja2 chịu ảnh hưởng mạnh mẽ từ Django template. Có lẽ vì lý do đó, Jinja xử lý với spacing (`center`, `wordwrap`, .. )  và xử lý các special character (filter: `safe`, `escape`) giống với Django template.

## The different
Tuy là lấy cảm hứng từ Django template, nhưng Jinja2 cũng không hoàn toàn bắt chước Django template. Nó có những sự khác biệt nhất định về syntax.

Một vài tags của Django template được Jinja thay thế bằng các tag với name khác hoặc sử dụng:

- Comment: Jinja2 sử dụng `{# #}` để comment single hoặc  multi-line comments. Tuy nhiên, để comment  multi-line trong Django template, bạn cần sử dụng block comment: {% comment %} youcomment {% endcomment %}.
- Load: Jinja2 chỉ sử dụng `load` để import một custom tags. Nhưng Django template, ngoài chức năng trên, nó còn hỗ trợ việc filters. Example, in Django template: `{% load foo bar from somelibrary %}`.
- Super: Để access contents của ` a parent template's block`, Django template sử dụng `{{ block.super }}`, nhưng Jinja2 sử dụng `{super()}}`.
- CSRF Token: Trong Django template, khi bạn tạo form POST action, bạn cần sử dụng {% csrf_token %} trong template. Tuy nhiên, với Jinja, bạn cần sử dụng `csrf_input` variable. Example, in Jinja2, khi sử dụng `{{csrf_input}}`, html genarates được sẽ như `<input type="hidden" name="csrfmiddlewaretoken" value="xxx">`.
- Loop: `{% for %}` được sử dụng trong Jinja2 cơ bản chỉ là lấy ra từng item trong list đó. Với Django template, nó còn giúp truy cập nhiều tới nhiều bến khác nữa (counter, first, last iteration).
- Empty: Django template sử dụng được `{% empty %}` trong loop nhưng trong Jinja2 thì không. Thay vào đó, Jinja sử dụng `{% else %}` khi xảy ra một vòng lặp trống.
- Groupby: Django template hỗ trợ sắp xếp lại dict hoặc object dựa trên các thuộc tính khác nhau. Jinja2, bạn bản sử dụng bộ lọc `groupby `.
- Lorem: Để generate random các ký tự Latin, Django sử dụng `{% lorem %}`. Với Jinja2, bạn phải sử dụng `lipsum` function.
- Other: Ngoài ra Django hỗ trợ một loạt các tag mà Jinja không hỗ trợ: `% static %}`, `{% trans %}`, `{% blocktrans %} `, ` {% url %} `.
## New features of Jinja
Dưới đây là một vài features chỉ được sử dụng với Jinja2.
### Flexible
Jinja2 rất flexible khi sử dụng các tag lồng nhau. For example, 
- `{% if user %}{% extends "base.html" %}{% else %}{% extends "signup_base.html" %}{% endif %}`.
- `{% extends template1 if template1 is defined else 'master.html' %}`.

(lol)??? Django template bó tay với kiểu viết này.

Ngoài ra, khi define variable, Jinja2 sử dụng `{% set %}` mạnh mẽ hơn `{% with %}` của Django template rất nhiều ở khoản restrictive scope. Cũng khá hay, nếu bạn không muốn dùng `{% set %}`, Jinja cũng hỗ trợ `{% with %}` như bình thường.

### Macros
Macros là một tính năng rất hay của Jinja2 mà Django template không có. Nó được sử dụng chủ yếu để define những đoạn code lặp đi lặp lại trong template. 

For example: ta define một function `test`:
```jinja2
{% macro test(name) %}
    <h1>{{ name }}</h1>
{% endmacro %}
```

Sau khi define xong, bạn có thể call nó ở bất cữ chỗ nào trong template:

```jinja2
<ul class="nav navbar-nav">
  {{ test('Minh') }}
  {{ test('Ngu') }}
  {{ test('Ngốc') }}
</ul>
```

:D
### Line statements
Bình thường, để thực hiện các tag cần phải đặt các tag trong `{%  %}` - `{% for %}`... Tuy nhiên, Jinja bạn thế viết # for...
For example:

```jinja2
<ul>
  # for item in items
    <li>{{ item }}</li>
  # endfor
</ul>
```

Hay trong Flask, bạn có thể config `#` thành `%` dễ dang. Source tham khảo: http://flask.pocoo.org/snippets/101/ .

### Global functions
Jinja2 hỗ trợ một loạt các global functions like Python. For example: `{% for number in range(1 - stores|count) %}`


## Performance
Theo như mình search được thì performace của Jinja2 khả quan hơn Django template. Mình chưa tự kiểm chứng. Tuy nhiên, mình dẫn link ra đây các bạn có thể tự tìm hiểu :D

http://blog.sendwithus.com/python-templating-performance-showdown-django-vs-jinja/

# Conclusion

Django template và Jinja2 đều là những template tốt và mạnh mẽ. Mỗi template lại có những ưu điểm riêng mà nhược điểm riêng mà tùy dự án ta có thể sử dụng. Tuy vậy, ta có thể thấy một điều, việc switching giữa 2 templatel này khá dễ dàng. Do đó, nếu bạn sẽ dễ dàng lựa chọn và thay đổi template phù hợp một cách nhanh chóng.