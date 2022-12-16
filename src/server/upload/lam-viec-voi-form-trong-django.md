Form là một phần cơ bản và cần thiết trong hoạt động của hầu hết các trang web. Vì vậy là một lập trình viên mọi người cần hiểu và biết sử dụng Form. Django cung cấp một loạt các công cụ và thư viện để giúp bạn xây dựng các form để chấp nhận đầu vào từ user truy cập trang web, sau đó xử lý và phản hồi đầu vào.

### Django form handling process

Chức năng form của Django có thể đơn giản hóa và tự động hóa các phần lớn của công việc cần thiết để xử lý một form, đồng thời cũng có thể thực hiện nó một cách an toàn hơn hầu hết các lập trình viên có thể làm trong mã do họ tự viết.

Django xử lý ba phần của công việc riêng biệt liên quan đến các biểu mẫu:

- Chuẩn bị và cơ cấu lại dữ liệu để sẵn sàng hiển thị
- Tạo các form HTML cho dữ liệu
- Tiếp nhận và xử lý các biểu mẫu và dữ liệu đã gửi từ user 

Bạn hoàn toàn có thể viết mã thực hiện tất cả những điều này theo cách thủ công, nhưng Django có thể lo tất cả cho bạn và có thể tránh được những lỗi cơ bản trong quá trình validate dữ liệu thì tội gì mà không dùng đúng không ^^.

Hình dưới đây mô tả cơ bản quá trình xử lý form của Django:

![](https://images.viblo.asia/882fbc41-f89c-4dec-b80c-c22d5d37ade9.png)

```bash
1. User tạo request 
2. Server lắng nghe và trả về form + dữ liệu tương ứng
3. User nhập, thay đổi dữ liệu trong form
4. User request gửi dữ liệu
5. Server thực hiện validate dữ liệu trong form
6. Nếu form hợp lệ: server chuẩn bị form với dữ liệu được lưu
7. Form thành công trả về success url được chỉ định
8. Nếu form không hợp lệ: server sẽ chuẩn bị 1 form trống + trả về lỗi để yêu cầu user nhập lại dữ liệu
```


### Class Django Form

Hệ thống trung tâm các thành phần này là class Form của Django. Giống như cách mà model Django mô tả cấu trúc logic của một object, về các hành vi của nó và cách các bộ phận của nó được biểu diễn cho chúng ta, một lớp Form mô tả một biểu mẫu và xác định cách nó hoạt động và xuất hiện.

Theo cách tương tự mà các trường của lớp mô hình ánh xạ tới các trường cơ sở dữ liệu, các trường của lớp biểu mẫu ánh xạ tới các phần tử <input> của biểu mẫu HTML. (ModelForm ánh xạ các trường của lớp Model với các phần tử <input> của biểu mẫu HTML thông qua Form.)

Bản thân các trường của Form là các lớp; chúng quản lý dữ liệu form và thực hiện validate khi form được gửi. Ví dụ một DateField và một FileField xử lý các loại dữ liệu khác nhau và phải thực hiện những việc khác nhau.

Trường Form được đại diện cho người dùng trong trình duyệt dưới dạng một “widget” HTML - một phần của giao diện người dùng. Mỗi loại trường có một lớp Widget mặc định thích hợp, nhưng những lớp này có thể được ghi đè.
        
    
#### Xây dựng biểu mẫu

Giả sử bạn muốn tạo một biểu mẫu đơn giản trên trang web của mình, để lấy tên của người dùng. Bạn cần viết form như này:

```html
<form action = "/ your-name /" method = "post">
    <label for = "your_name"> Your name: </ label>
    <input id = "your_name" type = "text" name = "your_name" value = "{{current_name}}">
    <input type = "submit" value = "OK">
</ form>
```

- Bạn sẽ cần một View để hiển thị mẫu chứa biểu mẫu HTML và có thể cung cấp trường current_name nếu có.

- Khi biểu mẫu được gửi, yêu cầu POST được gửi đến máy chủ sẽ chứa dữ liệu biểu mẫu.

- Bây giờ bạn cũng sẽ cần một view tương ứng với / your-name / URL.

Đây là một ví dụ về biểu mẫu rất đơn giản. Nhưng trên thực tế, một biểu mẫu có thể chứa hàng chục hoặc hàng trăm trường, nhiều trường trong số đó có thể cần được điền trước dữ liệu.

Tôi có thể yêu cầu một số xác thực xảy ra trong trình duyệt, ngay cả trước khi biểu mẫu được gửi, ... Lúc này, sẽ dễ dàng hơn nhiều để Django thực hiện hầu hết công việc này cho chúng ta.
    
#### Xây dựng biểu mẫu trong Django
**Class Form**

Chúng ta đã biết mình cần biểu mẫu HTML trông như thế nào. Đầu tiên chúng ta khai báo các trường trong biểu mẫu này trong Django như sau:

```form.py
from django import forms

class NameForm (form.Form):
    your_name = form.CharField (label = 'Your name', max_length = 100, required=True)
```

Class NameForm xác định một lớp Form với một trường duy nhất (your_name). Bạn có thể thay đổi nhãn được hiển thị một các thận thiện với người dùng , nhãn này sẽ xuất hiện trong <label> khi nó được hiển thị.

max_length cho phép của trường được xác định bởi max_length. Điều này thực hiện hai nhiệm vụ. 
    - Nó đặt maxlength = "100" trên HTML <input> (vì vậy trình duyệt sẽ ngăn người dùng nhập nhiều hơn số ký tự đó ngay từ đầu). 
    - Khi Django nhận lại biểu mẫu từ trình duyệt, nó sẽ xác nhận độ dài của dữ liệu, nếu chiều dài >100 thì sẽ hiển thị lỗi.

Mỗi instance của Form có một phương thức `is_valid()`, phương thức này chạy các quy trình validate cho tất cả các trường của form. Khi phương thức này được gọi, nếu tất cả các trường đều chứa dữ liệu hợp lệ, nó sẽ: `return True` và đặt dữ liệu của biểu mẫu trong thuộc tính `clean_data` của nó.
    
Toàn bộ biểu mẫu, khi được hiển thị lần đầu tiên, sẽ giống như sau:

```html
<label for = "your_name"> Your name: </ label>
<input id = "your_name" type = "text" name = "your_name" maxlength = "100"  required >
```
    
**Lưu ý** rằng nó không bao gồm các thẻ <form> hoặc <button>,  chúng ta sẽ phải tự phải viết.
    
**view**
Dữ liệu biểu mẫu được gửi trở lại trang web Django được xử lý bởi một view, nói chung là cùng một view đã xuất bản biểu mẫu. Điều này cho phép chúng ta sử dụng lại một số logic tương tự.

```views.py    
from django.http nhập HttpResponseRedirect
from django.shortcuts import render
from .forms import NameForm

def get_name (request):
    if request.method == 'POST':
    
        form = NameForm (request.POST) # tạo một thể hiện biểu mẫu và điền nó với dữ liệu từ yêu cầu:
    
        ìf form.is_valid (): # kiểm tra xem nó có hợp lệ không
    
            # xử lý dữ liệu trong form.cleaned_data theo yêu cầu
    
            return HttpResponseRedirect ('/ thanks /')

    #if a GET (hoặc bất kỳ phương thức nào khác), chúng ta sẽ tạo một biểu mẫu trống
    else: 
    
        form = NameForm()
    
    return render (request, 'name.html', {'form': form})
```
Nếu chúng ta đến view này với một yêu cầu GET, nó sẽ tạo một thể hiện biểu mẫu trống.

Nếu biểu mẫu được gửi bằng cách sử dụng yêu cầu POST, view sẽ một lần nữa tạo một phiên bản biểu mẫu và điền vào nó với dữ liệu từ yêu cầu:` form = NameForm (request.POST)` Đây được gọi là "liên kết dữ liệu với biểu mẫu".

Khi gọi phương thức` is_valid ()` của form; nếu nó  là False, chúng ta quay lại template với form. Lần này biểu mẫu không còn trống (không liên kết) nên biểu mẫu HTML sẽ được điền với dữ liệu đã được gửi trước đó, và user có thể được chỉnh sửa dữ liệu và gửi lại request

**Template**
    
Bạn không cần phải làm gì nhiều trong template name.html  của mình:
```html
<form action = "/ your-name /" method = "post">
    {% csrf_token%}
    {{form}}
    <input type = "submit" value = "Gửi">
</ form>
```
    
Tất cả các trường của biểu mẫu và thuộc tính của chúng sẽ được giải nén thành HTML từ {{form}} đó bằng ngôn ngữ mẫu của Django.
    
**NOTE:**
    
Forms and Cross Site Request Forgery protection

*Django cung cấp một biện pháp bảo vệ dễ sử dụng Cross Site Request Forgery protection trên nhiều trang web. Khi gửi form qua POST với tính năng bảo vệ CSRF được bật, bạn phải sử dụng thẻ mẫu csrftoken như trong ví dụ trên.*

Các type đầu vào HTML5 và xác thực trình duyệt

*Nếu form của bạn bao gồm URLField, EmailField hoặc bất kỳ loại trường number nào, Django sẽ sử dụng các type đầu vào là url, email và number trong HTML5. Theo mặc định, các trình duyệt có thể áp dụng xác thực riêng của họ trên các trường này, có thể nghiêm ngặt hơn xác thực của Django, muốn tắt action này, bạn có thể đặt thuộc tính novalidate trên thẻ input hoặc chỉ định một type khác trên trường, như TextInput.*

Bây giờ chúng ta có một biểu mẫu web đang hoạt động, được mô tả bởi Biểu mẫu Django, được xử lý bởi một dạng xem và được hiển thị dưới dạng HTML <form>.

Ví dụ trên mô tả cơ bản những gì bạn cần làm khi sử dụng form của Django. Khi bạn hiểu những điều cơ bản về quy trình được mô tả ở trên, bạn nên chuẩn bị để hiểu các tính năng khác của hệ thống Form và sẵn sàng tìm hiểu thêm một chút về hệ thống máy móc hạ tầng.
    
  
### **Một vài điều về các lớp Django Form**
    
Tất cả các class form được tạo dưới dạng lớp con của django.forms.Form hoặc django.forms.ModelForm. Bạn có thể coi ModelForm như một lớp con của Form. Form và ModelForm thực sự kế thừa chức năng chung từ một lớp BaseForm (riêng), nhưng cách triển khai này chi tiết hiếm khi quan trọng.

#### Model và Form

Trên thực tế, nếu form của bạn sẽ được sử dụng để thêm hoặc chỉnh sửa trực tiếp một model Django, thì ModelForm có thể giúp bạn tiết kiệm rất nhiều thời gian, công sức và mã, bởi vì nó sẽ tạo một biểu mẫu, cùng với các trường thích hợp và các thuộc tính của chúng , từ một class Model.

####  Các trường trong form
    
Hãy xem xét một biểu mẫu với nhiều trường hơn, mà ta có thể sử dụng để triển khai chức năng “Contact Me” trên trang web cá nhân:

```form.py
from django import forms

Class ContactForm (form.Form):
    subject = form.CharField (max_length = 100)
    message = form.CharField (widget = form.Textarea(attrs={'placeholder': 'This is message',
                                                            'class': 'form-control account__input-text'}))
    sender = form.EmailField ()
    cc_myself = form.BooleanField (required = False)
```

Form trong ví dụ trước đó của chúng ta chỉ sử dụng một trường duy nhất, your_name, một CharField. Trong trường hợp này, biểu mẫu của chúng ta có bốn trường: subject, message, sender và cc_myself. CharField, EmailField và BooleanField chỉ là ba trong số nhiều loại trường có sẵn.
    
Ví dụ một số trường hay được sử dụng 
| Name | Class | HTML Input |
| -------- | -------- | -------- |
|   BooleanField   |  class BooleanField(**kwargs)    |   CheckboxInput   |
|  CharField    |   CharField(**kwargs   |   TextInput   |
|  ChoiceField    |   class ChoiceField(**kwargs)   |   Select   |
|   DateField   | class DateField(**kwargs)     |  DateInput    |
|   EmailField   | 	class EmailField(**kwargs)     |  EmailInput    |    
|   FileField   |   class FileField(**kwargs)   |  FileInput    |    
|    IntegerField  |   class IntegerField(**kwargs)   |  NumberInput when Field.localize is False, else TextInput    |       
|    MultipleChoiceField  |  class MultipleChoiceField(**kwargs)    |   SelectMultiple   |         
|    SlugField  |  class SlugField(**kwargs)    |  TextInput    | 
|    URLField  |  class URLField(**kwargs)    |  URLInput    | 

    
    
####  Widgets
    
Mỗi trường trong form có một lớp Widget tương ứng, lớp này tương ứng với một widget biểu mẫu HTML chẳng hạn như 
    `<input type = "text">`.

Trong hầu hết các trường hợp, trường sẽ có một tiện ích con mặc định hợp lý. Ví dụ: theo mặc định, CharField sẽ có một tiện ích TextInput, tạo ra một `<input type = "text">` trong HTML. Thay vào đó, nếu bạn cần <textarea>, bạn sẽ chỉ định tiện ích con thích hợp khi xác định trường biểu mẫu của mình, như ví dụ trên đã làm với trường mesage (widget = form.Textarea).

####  Trường dữ liệu
    
Dù dữ liệu được gửi với form là gì, khi nó đã được validate thành công bằng cách gọi is_valid () (và is_valid () đã trả về True), thì dữ liệu biểu mẫu đã được xác thực sẽ ở dạng dictionary form.cleaned_data. Dữ liệu này sẽ được chuyển đổi thành các loại dữ liệu trong Python cho bạn. 
    
Trong ví dụ về biểu mẫu liên hệ ở trên, cc_myself sẽ là một giá trị boolean. Tương tự như vậy, các trường như IntegerField và FloatField chuyển đổi các giá trị thành Python int và float tương ứng.

Dưới đây mô tả cách xử lý dữ liệu form có thể được thực hiện:

```views.py
from django.core.mail import send_mail

if form.is_valid():
    subject = form.cleaned_data['subject']
    message = form.cleaned_data['message']
    sender = form.cleaned_data['sender']
    cc_myself = form.cleaned_data['cc_myself']

    recipients = ['info@example.com']
    if cc_myself:
        recipients.append(sender)

    send_mail(subject, message, sender, recipients)
    return HttpResponseRedirect('/thanks/')
```
Một số trường cần xử lý theo cách khác ví dụ:
    
- Muốn truy cập một file được gửi lên chúng ta cần dùng request.FILES, thay vì request.POST
- Muốn truy cập một list được gửi lên chúng ta cần dùng request.POST.get_list()
    
### Làm việc với các template form
    
Nếu form của bạn được gọi trong ngữ cảnh thì {{form} sẽ được biểu thị thành các <label> và thẻ <input> của mỗi phần tử.
    
Có nhiều tùy chọn đầu ra khác cho các cặp <label> / <input>:
    
```html
{{ form.as_table }} will render them as table cells wrapped in <tr> tags
{{ form.as_p }} will render them wrapped in <p> tags
{{ form.as_ul }} will render them wrapped in <li> tags
```
    
**Lưu ý** rằng bạn sẽ phải tự cung cấp các phần tử <table> hoặc <ul> xung quanh.
    
Nếu chúng ta sử dụng {{form.as_p}} cho ContactForm thì đầu ra ta nhận được sẽ là:

```html
<p><label for="id_subject">Subject:</label>
    <input id="id_subject" type="text" name="subject" maxlength="100" required></p>
<p><label for="id_message">Message:</label>
    <textarea name="message" id="id_message" required></textarea></p>
<p><label for="id_sender">Sender:</label>
    <input type="email" name="sender" id="id_sender" required></p>
<p><label for="id_cc_myself">Cc myself:</label>
    <input type="checkbox" name="cc_myself" id="id_cc_myself"></p>
```
**Lưu ý**  mỗi trường biểu mẫu có một thuộc tính id được đặt thành id_ <field-name>, được tham chiếu bởi thẻ nhãn đi kèm for=id_ <field-name>. Bạn cũng có thể tùy chỉnh cách tạo nhãn và id.
    
####  Hiển thị các trường theo cách thủ công
    
Chúng ta không phải chỉ có thể để Django giải nén các trường của form; mà có thể làm điều này theo cách thủ công nếu muốn. Mỗi trường có sẵn dưới dạng một thuộc tính của biểu mẫu bằng cách sử dụng {{form.name_of_field} } và trong một mẫu Django, sẽ được hiển thị một cách thích hợp. Ví dụ:
    
```html
<div class="fieldWrapper">
    <label for="{{ form.subject.id_for_label }}">Email subject:</label>
    {{ form.subject }}
    {{ form.subject.errors }}
</div>
<div class="fieldWrapper">
    <label for="{{ form.message.id_for_label }}">Your message:</label>
    {{ form.message }}
    {{ form.message.errors }}
</div>
<div class="fieldWrapper">
    <label for="{{ form.sender.id_for_label }}">Your email address:</label>
    {{ form.sender }}
    {{ form.sender.errors }}
</div>
<div class="fieldWrapper">
    <label for="{{ form.cc_myself.id_for_label }}">CC yourself?</label>
    {{ form.cc_myself }}
    {{ form.cc_myself.errors }}
</div>
```
    
NOTE: 
    
Bạn cũng có thể render ra label của ccs trường bằng các sử dụng label_tag():
    
VD: `{{ form.subject.label_tag }}`
    
Để hiển thị ra lỗi của trường chúng ta sử dụng
    
VD: `{{ form.subject.errors }}`
    
Bạn có thể custom được ol show ra tất cả lỗi trong trường
```html
{% if form.subject.errors %}
    <ol>
    {% for error in form.subject.errors %}
        <li><strong>{{ error|escape }}</strong></li>
    {% endfor %}
    </ol>
{% endif %}
```
Còn rất nhiều thứ bạn có thể tùy chỉnh với form.
    
Khoảng tầm một tháng trước mình thường không sử dụng sẵn Form trong django mà thường tự viết chúng trong HTML rồi gửi lên server qua ajax. Vì lúc ấy mình cảm thấy việc custom bằng form trong django rất khó và có vẻ không được linh hoạt. Nhưng sau khi mắc kha khá lỗi về việc validate và chịu khó tìm hiểu một chút về form trong django thì quả thực chúng hữu ích.
    
Bài viết được tham khảo từ [Django document](https://docs.djangoproject.com/en/3.2/topics/forms/)