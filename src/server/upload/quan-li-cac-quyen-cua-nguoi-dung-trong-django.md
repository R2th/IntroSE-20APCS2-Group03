Quản lý người dùng trong quản trị viên Django là một chủ đề khó. Nếu bạn giám sát quá nhiều quyền, thì bạn có thể gây cản trở vào các hoạt động thường ngày. Nếu bạn cho phép cấp quyền một cách tự do mà không cần giám sát, hệ thống của bạn sẽ gặp nhiều rủi ro.
Django cung cấp một khung xác thực tốt, tích hợp chặt chẽ với Django admin. Tuy nhiên, Django admin không thực thi các hạn chế đặc biệt đối với quản trị viên là người dùng. Điều này có thể dẫn đến các tình huống nguy hiểm có thể làm tổn hại hệ thống của bạn.
Bạn có biết các staff user quản lý user khác trong trang admin có thể chỉnh sửa quyền của chính họ không? Bạn có biết họ cũng có thể tự biến mình thành superuser không? Không có gì trong hệ thống admin của Django ngăn chặn điều đó, vì vậy, nó tùy thuộc vào bạn!
Cuối bài viết này, bạn sẽ biết làm thế nào để bảo vệ hệ thống của bạn khỏi các rủi ro sau:
* Bảo vệ chống lại sự leo thang quyền bằng cách ngăn người dùng chỉnh sửa quyền của chính họ
* Giữ các quyền gọn gàng và có thể quản lí bằng cách đưa các user vào các group
* Ngăn chặn quyền rò rỉ thông qua các hành động tùy chỉnh bằng cách chỉ định nghĩa rõ ràng các quyền cần thiết
###     Phân quyền trên Model (Model Permissions)
Phân quyền khá là khó. Nếu bạn không đặt quyền, thì bạn đặt hệ thống của mình có nguy cơ bị xâm nhập, rò rỉ dữ liệu và lỗi do sơ sẩy của con người. Nếu bạn lạm dụng quyền hoặc sử dụng chúng quá nhiều, thì bạn có thể vô tình cản trở vào các hoạt động thông thường của hệ thống.
Django đi kèm với một hệ thống xác thực tích hợp (built-in authentication system). Hệ thống này bao gồm users, groups và permissions. Khi một model được tạo ra, Django sẽ tự động tạo ra 4 quyền mặc định cho các thao tác sau:
1. add : user có quyền này có thể tạo ra 1 đối tượng của model.
2. delete : user có quyền này có thể xóa 1 đối tượng của model.
3. change : user có quyền này có thể thay đổi thông tin của 1 đối tượng của model. 
4. views : user có quyền này có thể xem thông tin chi tiết của 1 đối tượng của model.
Tên của permisson được đặt theo quy tắc rất cụ thể như sau:
```cpp
<app>.<action>_<modelname>
``` 
Trong đó:
* <app> là tên của app. Ví dụ, model User được import từ app ‘auth’ (django.contrib.auth)
* <action> là một trong các thao tác ở trên (add, delete, change, view)
* <modelname> là tên của model, viết thường
Biết quy tắc đặt tên có thể giúp bạn quản lí các quyền dễ dàng hơn. Ví dụ, quyền thay đổi 1 user được đặt như sau: 
  `auth.change_user`  
### Làm thế nào để check permissons?
Các quyền trên model được giao cho các user hoặc các group. Để kiểm tra một user có các quyền cụ thể nào, bạn có thể làm theo cách sau:
```python
>>> from django.contrib.auth.models import User
>>> u = User.objects.create_user(username='haki')
>>> u.has_perm('auth.change_user')
False
```
Có một lưu ý là phương thức has_perm() sẽ luôn luôn trả về True đối với superuser, bất kể permisson có tồn tại hay không.
```python
>>> from django.contrib.auth.models import User
>>> superuser = User.objects.create_superuser(
...     username='superhaki',
...     email='me@hakibenita.com',
...     password='secret',
)
>>> superuser.has_perm('does.not.exist')
True
```
Như bạn có thể thấy, khi bạn kiểm tra quyền cho superuser, các quyền đó không thực sự được kiểm tra.
### Cách giám sát quyền
Model trong Django không thực sự giám sát quyền. Theo mặc định, nơi duy nhất giám sát quyền là Django Admin.
Lý do model không cho phép giám sát quyền là thông thường, model không biết user thực hiện hành động. Trong các ứng dụng Django, user thường được lấy từ request. Đây là lý do tại sao, hầu hết thời gian, các quyền được giám sát ở lớp view.
Ví dụ: để ngăn user không có quyền view trên model ‘user ‘ truy cập vào view hiển thị thông tin user, hãy làm như sau:
```python
from django.core.exceptions import PermissionDenied

def users_list_view(request):
    if not request.user.has_perm('auth.view_user'):
        raise PermissionDenied()
```
Nếu user thực hiện yêu cầu đăng nhập và được xác thực, thì request.user sẽ lưu thông tin một đối tượng của User. Nếu user không đăng nhập, thì request.user sẽ là một đối tượng của AnonymousUser. Đây là một đối tượng đặc biệt được Django sử dụng để chỉ người dùng chưa được xác thực.
Nếu người dùng thực hiện request không có quyền view_user, thì bạn đưa ra một exception PermissionDenied và phản hồi với trạng thái 403 được trả về cho client.
Để giúp kiểm tra các quyền trong view dễ dàng hơn, Django cung cấp một shortcut decorator được gọi là permisson_required, thực hiện điều tương tự:
```python
from django.contrib.auth.decorators import permission_required

@permission_required('auth.view_user')
def users_list_view(request):
    pass
```
Đối với template, bạn có thể truy cập các quyền của người dùng hiện tại thông qua một biến template đặc biệt gọi là ‘perms’. Ví dụ: nếu bạn chỉ muốn hiển thị nút xóa cho người dùng có quyền xóa, thì hãy làm như sau:
```html
{% if perms.auth.delete_user %}
<button>Delete user!</button>
{% endif %}
```
Một số ứng dụng bên thứ ba phổ biến như Django rest framework cũng cung cấp tích hợp hữu ích với các quyền trên model của Django.
### Django Admin và Model Permissions:
Django Admin có sự tích hợp rất chặt chẽ với hệ thống xác thực có sẵn, cụ thể là các quyền trên model. 
* Nếu user không có quyền trên một model, thì họ không thể nhìn thấy nó hoặc truy cập nó trong trang admin.
* Nếu user có quyền xem và thay đổi trên một model, thì họ sẽ có thể xem và cập nhật các đối tượng của model, nhưng họ không thể thêm các đối tượng mới hoặc xóa các đối tượng hiện có.
Với các quyền thích hợp tại chỗ, user là admin ít có khả năng mắc lỗi và những kẻ xâm nhập sẽ gặp khó khăn hơn trong việc gây hại.
### Triển khai custom business role trong Django Admin
Một trong những nơi dễ bị tổn thương nhất trong mọi ứng dụng là hệ thống xác thực. Trong các ứng dụng Django, đó là model User. Vì vậy, để bảo vệ ứng dụng của bạn tốt hơn, bạn sẽ bắt đầu với model User.
Trước tiên, bạn cần kiểm soát trang admin đối với model User. Django đã đi kèm với một trang admin rất đẹp để quản lý user. Để tận dụng sự tuyệt vời đó, bạn sẽ mở rộng model ‘admin’ có sẵn.
### Thiết lập Trang Admin tùy chỉnh 
Để cung cấp 1 trang admin tùy chỉnh cho model User, bạn cần hủy đăng ký model admin hiện có do Django cung cấp và đăng ký một user admin của riêng bạn:
```python
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Unregister the provided model admin
admin.site.unregister(User)

# Register out own model admin, based on the default UserAdmin
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    pass
```
CustomUserAdmin của bạn đang kế thừa UserAdmin của Django. Nhờ đó để bạn có thể tận dụng tất cả các chức năng đã được tạo ra bởi các nhà phát triển Django.
Tại thời điểm này, nếu bạn đăng nhập vào trang Admin của mình tại http://127.0.0.1:8000/admin/auth/user, bạn sẽ thấy trang admin dành cho user vẫn không thay đổi:
![](https://images.viblo.asia/49f82a6d-8367-41bf-bb0d-00201cd48a49.png)

Bằng cách kế thừa UserAdmin, bạn có thể sử dụng tất cả tính năng đã được tích hợp của Django Admin.
### Ngăn chặn việc tự ý update các Field:
Các hình thức quản lí không giám sát là một nguyên nhân chính cho những sai lầm khủng khiếp. Một staff user có thể dễ dàng cập nhật thông tin của một object thông qua trang admin theo cách mà ứng dụng không mong đợi. Hầu hết thời gian, người dùng không hề hay biết điều gì bất thường đang xảy ra. Những sai lầm như vậy thường rất khó theo dõi và sửa chữa.
Để ngăn những lỗi đó xảy ra, bạn có thể ngăn người dùng trang admin sửa đổi các trường nhất định trong model. Nếu bạn muốn ngăn bất kỳ người dùng nào, kể cả superuser, cập nhật một trường, bạn có thể đánh dấu trường là chỉ đọc. Ví dụ: trường date_joined được đặt khi người dùng đăng ký tài khoản mới. Thông tin này không bao giờ nên được thay đổi bởi bất kỳ người dùng nào, vì vậy bạn đánh dấu nó là chỉ đọc:
```python
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    readonly_fields = [
        'date_joined',
    ]
```
Khi một trường được thêm vào readonly_fields, nó sẽ không thể chỉnh sửa được trong form mặc định của quản trị viên. Khi một trường được đánh dấu là chỉ đọc, Django sẽ hiển thị input field của nó dưới dạng ‘disabled’.
Nhưng, điều gì sẽ xảy ra nếu bạn muốn chỉ ngăn một số người dùng cập nhật một trường?
### Ngăn chặn tự ý update Field có điều kiện:
Đôi khi, rất hữu ích để cập nhật các field trực tiếp trong trang admin. Nhưng bạn không muốn cho phép bất kỳ người dùng nào làm điều đó: bạn muốn chỉ cho phép các superuser làm điều đó.
Giả sử bạn muốn ngăn những người không phải là superuser thay đổi username của user. Để làm điều đó, bạn cần sửa đổi form nhập thông tin do Django tạo và vô hiệu hóa trường  username dựa trên user hiện tại:
```python
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        is_superuser = request.user.is_superuser

        if not is_superuser:
            form.base_fields['username'].disabled = True

        return form
```
Trong đó:
* Để chỉnh sửa một form, bạn override phương thức get_form(). Hàm này được dùng bởi Django để sinh ra form cập nhật mặc định cho model.
* Để vô hiệu hóa trường một cách có điều kiện, trước tiên bạn hãy tìm nạp form mặc định do Django tạo và sau đó nếu người dùng không phải là superuser, hãy tắt trường username.
Bây giờ, khi một người không phải superuser cố gắng chỉnh sửa user, trường username sẽ bị tắt. Mọi nỗ lực sửa đổi username thông qua Django Admin sẽ thất bại. Khi một superuser muốn chỉnh sửa user, trường tên người dùng lại được bật lên và hoạt động như mong đợi.
### Ngăn chặn những user không phải superuser cấp quyền superuser:
Superuser là một sự cho phép rất mạnh mẽ không nên được cấp tùy tiện. Tuy nhiên, bất kỳ người dùng nào có quyền thay đổi trên model user đều có thể biến bất kỳ user nào thành superuser, bao gồm cả chính họ. Điều này đi ngược lại toàn bộ mục đích của hệ thống cấp phép, vì vậy bạn phải đóng lỗ hổng này lại.
Dựa trên ví dụ trước, để ngăn những người không phải superuser tự biến mình thành superuser, bạn cần thêm các hạn chế sau:
```python
from typing import Set

from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        is_superuser = request.user.is_superuser
        disabled_fields = set()  # type: Set[str]

        if not is_superuser:
            disabled_fields |= {
                'username',
                'is_superuser',
            }

        for f in disabled_fields:
            if f in form.base_fields:
                form.base_fields[f].disabled = True

        return form
```
Trong đó:
* Bạn đã khởi tạo một set trống các disabled_fields để lưu các trường sẽ disable.
* Tiếp theo, nếu người dùng không phải superuser, bạn thêm hai trường vào tập hợp (tên username từ ví dụ trước và is_superuser). Điều này sẽ ngăn những người không phải superuser biến mình thành superuser.
* Sau cùng, bạn duyệt qua các phần tử của set, đánh dấu tất cả chúng là disabled, rồi trả về form.
### Ghi đè Permission
Đôi khi có thể hữu ích để ghi đè hoàn toàn các quyền trong quản trị viên Django. Một tình huống phổ biến là khi bạn sử dụng quyền ở những nơi khác và bạn không muốn staff user thực hiện các thay đổi khi dùng trang admin.
Django sử dụng hook cho bốn quyền mặc định. Trong nội bộ, các hook sử dụng các quyền của user hiện tại để đưa ra quyết định. Bạn có thể ghi đè các hook này và đưa ra quyết định khác nhau.
Để ngăn staff user xóa một object, bất kể quyền của họ là gì, bạn có thể làm như sau:
```python
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    def has_delete_permission(self, request, obj=None):
        return False
```
Giống như với get_form (), obj là object mà bạn đang thao tác:
Khi obj là None, người dùng chỉ yêu cầu danh sách các object.
Khi obj không phải là None, người dùng đã yêu cầu update một object cụ thể.
### Từ chối truy cập đối với các hành động chỉnh sửa
Các hành động chỉnh sửa cần được cấp phép thận trọng. Django lại mặc định không thể hạn chế quyền truy cập với các hành động này. Một hành động chỉnh sửa sẽ có thể truy cập được đối với bất kỳ người dùng trang admin nào với bất kỳ sự cho phép nào trên model.
Để minh họa, hãy thêm một hành động quản lí tiện dụng là đánh dấu nhiều người dùng là ‘active’:
```python
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    actions = [
        'activate_users',
    ]

    def activate_users(self, request, queryset):
        cnt = queryset.filter(is_active=False).update(is_active=True)
        self.message_user(request, 'Activated {} users.'.format(cnt))
    activate_users.short_description = 'Activate Users'  # type: ignore
```
Sử dụng hành động này, một staff user có thể đánh dấu một hoặc nhiều người dùng và kích hoạt tất cả họ cùng một lúc. Điều này hữu ích trong một số trường hợp, chẳng hạn như nếu bạn gặp lỗi trong quá trình đăng ký và cần phải kích hoạt hàng loạt người dùng.
Hành động này cập nhật thông tin người dùng, vì vậy bạn chỉ muốn người dùng có quyền change mới có thể thực hiện được.
Django Adminsử dụng một chức năng nội bộ để lấy được action. Để ẩn active_users () khỏi người dùng mà không có quyền change, hãy ghi đè get_actions():
```python
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    actions = [
        'activate_users',
    ]

    def activate_users(self, request, queryset):
        assert request.user.has_perm('auth.change_user')
        cnt = queryset.filter(is_active=False).update(is_active=True)
        self.message_user(request, 'Activated {} users.'.format(cnt))
    activate_users.short_description = 'Activate Users'  # type: ignore

    def get_actions(self, request):
        actions = super().get_actions(request)
        if not request.user.has_perm('auth.change_user'):
            del actions['activate_users']
        return actions
```
get_actions () trả về một OrderedDict. Với key là tên của action và value là hàm của action. Để điều chỉnh giá trị trả về, bạn ghi đè hàm, tìm nạp giá trị ban đầu, sau đó tùy vào vào quyền của người dùng mà có thể xóa đi hành động active_users.
Đối với staff user không có quyền change_user(), active_users sẽ không xuất hiện trong danh sách action.
### Kết luận
Django admin là một công cụ tuyệt vời để quản lý một dự án Django. Nhiều team dựa vào nó để duy trì hiệu quả trong việc quản lý các hoạt động hàng ngày. Nếu bạn sử dụng Django admin để thực hiện các thao tác trên các model, thì điều quan trọng là phải biết các quyền. Các kỹ thuật được mô tả trong bài viết này hữu ích cho bất kỳ model admin nào, không chỉ model User.
Bây giờ hệ thống của bạn đã an toàn hơn lúc bắt đầu nhiều rồi đấy.