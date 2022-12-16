> Bài viết gốc: https://manhhomienbienthuy.github.io/2018/03/26/hieu-va-lam-chu-django-inline-formset.html (Đã xin phép tác giả :D)

Django đã cung cấp cho chúng ta [model form](https://docs.djangoproject.com/en/2.0/topics/forms/modelforms/#modelform) và [model formset](https://docs.djangoproject.com/en/2.0/topics/forms/modelforms/#model-formsets) giúp chúng ta làm việc với form của các model, cả số ít lẫn số nhiều.

Trong bài viết này, chúng ta sẽ tìm hiểu một vấn đề có phần phức tạp hơn một chút, đó là inline formset.  Inline formset có thể giúp chúng ta thao tác với nhiều đối tượng (có phụ thuộc vào nhau) trong cùng một form.

Thực ra, Django cũng có hướng dẫn về việc sử dụng [inline formset](https://docs.djangoproject.com/en/2.0/topics/forms/modelforms/#inline-formsets), nhưng đây là hướng dẫn cho trường hợp edit.  Bài viết này sẽ trình bày chủ yếu cho trường hợp create.  Trường hợp edit cũng tương tự.

# Model trong bài toán

Trước hết hãy xem các model trong bài toán của chúng ta như sau

```python3
# models.py
class Parent(models.Model):
    name = models.CharField(_('name'), max_length=255)


class Child(models.Model):
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE)
    name = models.CharField(_('name'), max_length=255)
```

# Sử dụng inline formset để tạo dữ liệu cho hai bảng cùng lúc

Bây giờ, giả sử chúng ta cần sử dụng một form để thao tác cùng lúc với các bản ghi lưu thông tin của cả bố mẹ và con cái, chúng ta cần làm thế nào?  Inline formset sẽ giúp chúng ta trong trường hợp này.

```python3
# forms.py
from django.forms import ModelForm, inlineformset_factory

from .models import Child, Parent


ChildrenFormset = inlineformset_factory(Parent, Child, fields=('name',))
```

Inline formset sẽ giúp chúng ta tạo form với rất ít code.  Nếu muốn, chúng ta có thể thay đổi logic của những formset này, ví dụ validation chẳng hạn.  Tuy nhiên, cài đặt mặc định của formset cũng đủ tốt rồi nên chúng ta cũng không cần phải thay đổi quá nhiều.

Dưới đây là view để hiển thị form này:

```python3
# views.py
class ParentList(ListView):
    model = Parent


class ParentCreate(CreateView):
    model = Parent
    fields = ['name']
    success_url = reverse_lazy('formset:parents-list')

    def get_context_data(self):
        context = super().get_context_data()
        if self.request.POST:
            context['children'] = ChildrenFormset(self.request.POST)
        else:
            context['children'] = ChildrenFormset()
        return context
```

Ở đây, chúng ta cần một chút xử lý.  Django có thể cho chúng ta một view create rất đơn giản mà không cần phải chỉnh sửa gì nhiều.  Ở đây, chúng ta chỉ đơn giản là thêm một đối tượng là inline formset vào context data mà thôi.  Cuối cùng là hiển thị trên trình duyệt form mà chúng ta đã tạo ra.  Hiển thị mặc định của Django cho inline form không được hay lắm, nên ở đây chúng ta phải customize lại một chút.

```htmldjango
{# parent_form.html #}
<div>
    <form action="" method="post">
        {% csrf_token %}
        {{ form.as_p }}

        <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Delete</th>
              </tr>
          </thead>

            {{ children.management_form }}
            {% for child_form in children.forms %}
                {% for hidden in child_form.hidden_fields %}
                    {{ hidden }}
                {% endfor %}
                <tr>
                    {% for field in child_form.visible_fields %}
                        <td>
                            {{ field.errors.as_ul }}
                            {{ field }}
                        </td>
                    {% endfor %}
                </tr>
            {% endfor %}
        </table>

        <p>
            <input type="submit" value="Save">
            <a href="{% url 'formset:parents-list' %}">back to the list</a>
        </p>
    </form>
</div>
```

File template này đã customize hầu như toàn bộ form để có thể hiển thị form theo đúng định dạng mà chúng ta muốn.  Có lẽ các bạn cũng biết rồi, chúng ta cần phải sử dụng `management_form` cũng các "hidden fields" trong template thì form mới có thể hoạt động đúng được.

Vậy là tương đối đầy đủ để chúng ta có một form lồng nhau cho phép chúng ta có thể tạo cùng lúc cả parent và child.  Việc bây giờ chúng ta cần làm làm lưu những gì người dùng submit lại.  Mặc định thì Django CreateView không giúp chúng ta xử lý inline form, vì vậy chúng ta sẽ làm việc này bằng tay.  Việc đó không phải là khó lắm, nó sẽ được thực hiện ở views bằng cách override hàm `form_valid` như sau:

```python3
# views.py
class ParentCreate(CreateView):
    ...
    def form_valid(self, form):
        context = self.get_context_data()
        children = context['children']
        with transaction.atomic():
            self.object = form.save()
            if children.is_valid():
                children.instance = self.object
                children.save()
        return super().form_valid(form)
```

Mọi việc đã hoàn thành, form của chúng ta đã hoạt động hoàn hảo.  Mời các bạn xem demo dưới đây.

{@youtube: By6uPwWPRdE}

Tuy nhiên, form ở đây của chúng ta là form tĩnh, tức là inline form hoàn toàn cố định, mà mặc định nó có 3 form con.  Tất nhiên chúng ta có thể chỉnh sửa con số này nhưng nó vẫn cứ là cố định.  Rất may là có người đã giúp chúng làm việc đó.  Có một plugin cho jQuery là [django-dynamic-formset](https://github.com/elo80ka/django-dynamic-formset) cực kỳ hữu ích trong trường hợp này.

Sử dụng plugin rất đơn giản, chỉ cầm thêm vào trang html một chút code nữa là được

```htmldjango
{% load static %}
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="{% static 'jquery.formset.js' %}"></script>
<script type="text/javascript">
    $('.formset_row').formset({
        addText: 'add child',
        deleteText: 'remove',
        prefix: 'child_set'
    });
</script>
```

Chỉ đơn giản vậy thôi là trang web của chúng ta trông đã "cool" hơn rất nhiều

{@youtube: 3SbXyuzzmZY}

Lưu ý rằng, sử dụng plugin này, chúng ta cần thêm class cho `tr` cho đúng, đồng thời phải cấu hình plugin một chút, đặc biệt là prefix (ở đây tôi sử dụng prefix mặc định Django đã tạo ra).  Điều này rất quan trọng, nếu không khi submit form sẽ có một số lỗi.

# Sử dụng inline form tạo dữ liệu cho 3 model cùng một lúc

Giả sử bài toán của chúng ta mở rộng thêm một chút với model như sau:

```python3
class Address(models.Model):
    child = models.ForeignKey(Child, on_delete=models.CASCADE)
    address = models.CharField(_('address'), max_length=255)
```

Bây giờ, tôi muốn trong form vừa rồi, có thể điền trực tiếp luôn address cho các con mà không cần phải mở một trang khác.  Tất nhiên rồi, mở một trang khác thì quá đơn giản, chúng ta chỉ cần dùng inline form một lần nữa tương tự như trên

```python3
AddressFormset = inlineformset_factory(Child, Address,
                                       fields=('address',), extra=1)
```

Tuy nhiên, như vậy thì quá bất tiện.  Tôi muốn một form có thể làm được tất cả mọi việc.  Việc này hoàn toàn có thể làm được, thậm chí đã được Django support rất tốt.

## Định nghĩa một BaseFormset để dễ dàng customize

Như chúng ta đã biết, để dễ dàng customize inline formset, chúng ta có thể định nghĩa một class gọi là "base" kế thừa từ `BaseInlineFormSet` sau đó override phương thức nào mà chúng ta muốn.

Trong bài toán của chúng ta, khi tình hình có thể phức tạp, chúng ta nên sử dụng phương pháp này.

```python3
class BaseChildrenFormset(BaseInlineFormSet):
    pass


ChildrenFormset = inlineformset_factory(Parent, Child, fields=('name',),
                                        formset=BaseChildrenFormset, extra=1)
```

## Customize BaseFormset để thêm form lồng nhau

Chúng ta cần override phương thức `add_fields` của `BaseInlineFormSet`, điều này sẽ giúp chúng ta thêm form lồng nhau cho một form inline sẵn có.

```python3
class BaseChildrenFormset(BaseInlineFormSet):
    def add_fields(self, form, index):
        super().add_fields(form, index)
        form.nested = AddressFormset(
            instance=form.instance,
            data = form.data if form.is_bound else None,
            prefix='address-%s-%s' % (
                form.prefix,
                AddressFormset.get_default_prefix()
            )
        )
```

Ở đây, chúng ta định nghĩa thêm một thuộc tính `nested` cho inline form.  Nhờ vậy mà chúng ta có thể gọi form này trên template rất dễ dàng, đồng thời không cần thay đổi views vì không cần thêm object nào trên views cả.

## Hiển thị form lồng nhau trên template

Views không cần thay đổi gì cả, chúng ta chỉ cần thay đổi template để hiển thị thêm form lồng nhau là được

```htmldjango
{% if child_form.nested %}
    {{ child_form.nested.management_form }}
    {% for hidden in nested_form.hidden_fields %}
        {{ hidden }}
    {% endfor %}
    {% for nested_form in child_form.nested %}
        {% for field in nested_form.visible_fields %}
            <td>
                {{ field.errors.as_ul }}
                {{ field }}
            </td>
        {% endfor %}
    {% endfor %}
{% endif %}
```

## Xử lý dữ liệu form được submit

Toàn bộ phần hiển thị đã xong, việc cuối cùng chúng ta cần làm là xử lý những dữ liệu form được người dùng submit.  Ở đây chúng ta cần quan tâm 2 việc: validate và lưu dữ liệu.

Để validate, chúng ta cần override hàm `is_valid` của BaseFormset

```python3
class BaseChildrenFormset(BaseInlineFormSet):
    ...
    def is_valid(self):
        result = super().is_valid()
        if self.is_bound:
            for form in self.forms:
                if hasattr(form, 'nested'):
                    result = result and form.nested.is_valid()
        return result
```

Sau khi validate xong, chúng ta cần lưu những dữ liệu valid lại. Chúng ta sẽ override hàm `save` để làm việc này.  Lưu ý một chút là khi lưu chúng ta cần lưu dử liệu của cả form inline mà form con lồng ở trong nó.

```python3
class BaseChildrenFormset(BaseInlineFormSet):
    ...
    def save(self, commit=True):
    result = super().save(commit=commit)
    for form in self.forms:
        if hasattr(form, 'nested'):
            if not self._should_delete_form(form):
                form.nested.save(commit=commit)
    return result
```

Vậy là xong, giờ là chúng ta tận hưởng thành quả của quá trình lao động miệt mài.

{@youtube: AWH981yb96E}

Hơi đáng tiếc là plugin chúng ta dùng trong phần trước không dùng được trong trường hợp phức tạp này.  Để có tính năng "cool" đó, có lẽ chúng ta sẽ phải code JS để xử lý thêm thôi.  Việc này xin dành cho bạn đọc, vì nó cũng không phải nội dung chính của bài viết này.

# Kết luận

Django inline formset thực sự là một công cụ rất khủng của Django. Biết vận dụng nó một cách linh hoạt sẽ giúp ích rất nhiều cho chúng ta trong công việc.  Hy vọng bài viết phần nào giúp các bạn hiểu hơn về inline formset và cách sử dụng của nó trong thực tế.