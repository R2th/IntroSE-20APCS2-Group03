Nếu bạn đang xây dựng một ứng dụng với Django, có thể bạn sẽ muốn kiểm soát quyền truy cập ứng với từng loại user. 
Ví dụ: Bạn có thể muốn tạo ra sự khác biệt trong thông tin mà người dùng premium và người dùng thông thường trên các trang web dành cho thành viên. 
Những tính năng này sẽ phổ biến trên các trang web có quy mô lớn hơn một chút.

Có nhiều cách để kiểm soát quyền truy cập với Django. Một số trong số chúng được tích hợp sẵn vào Django hoặc được cung cấp dưới dạng application. Trong bài viết này, tôi sẽ so sánh chúng để xem chúng có thể được sử dụng như thế nào và chúng phù hợp với những trường hợp nào.

Cấu trúc của bài viết này là như sau.

* Permission trong Django
* Django-guardian
* Django-role-permissions
* Django-rules

# Permission trong Django
Permission trong Django chính là permission của level model được nhóm vào các Group.  Trường hợp trong INSTALLED_APPS có django.contrib.auth thì khi thời điểm run migrate thì tất các các model sẽ được tạo thêm quyền View, add, change, delete.  Ghi gán những quyền này với các Group và User thì sẽ có thể giới hạn được các thao tác theo các quyền được gán . 

Lấy một ví dụ như , Trong một Application có tên là app, có model tên là Post, vậy khi run migrate thì sẽ có 3 permission như sau được tạo ra. 

* app.add_post
* app.change_post
* app.delete_post
* app.view_post
Để xác nhận rằng các quyền này dã được cho user hay chưa chúng ta dùng method has_perm được cung cấp bởi model User : 

```
>>> user.has_perm('app.add_post')
True
```

Việc xoá và gán quyền có thể thực hiện được từ 「User permissions」 của màn quản lý . 

![](https://images.viblo.asia/b2356bb9-a574-4b78-b584-8b560818afe3.png)

Từ template nếu muốn tham chiếu tới quyền chúng ta có thể sửa dụng biến perms được thêm vào tự động trong content. 

```
{% if perms.app.view_post %}
    This content will be shown users with view_post permission.
{% endif %}
```


Đến đây chúng ta đã hình dung được về quyền mà nó được tự động thêm vào, vậy làm thế nào để customize lại theo ý thích của bản thân ?  Bằng việc đinh nghĩa Customize permission chúng ta có thể làm dược việc này. Và chúng ta sẽ sử dụng tuộc tín permissions của Model . 

```
class Post(models.Model):                                                                                                                                
    content = models.TextField()                                                                                                                         
    author = models.ForeignKey(User, on_delete=models.CASCADE)                                                                                           
                                                                                                                                                         
    class Meta:                                                                                                                                          
        permissions = (                                                                                                                                  
            ('view_content', 'View content'),                                                                                                            
        )  
```


Đến đây khi run migrate, tự động các quyền sẽ được tạo ra. 
![](https://images.viblo.asia/ee113981-302c-4b85-9a9f-f284ecfa4b64.png)


Để nắm bắt được chi tiết hơn hãy tham khảo : 
https://docs.djangoproject.com/en/dev/topics/auth/default/#permissions-and-authorization

# Django-guardian

Django-guardianlà app có thể implement permission của level Object. Đối với permission của Django thì sẽ handle được việc access tới toàn bộ Object trong model thì django-guardian có thể handle access tới instance của các model riêng biệt . 

Hãy cùng lấy ví dụ để hiểu rõ hơn, ví dụ User A đã tạo 100Post, User B tạo 200Post. Trong trường hợp này khi sử dụng  django-guardian thì có thể handle được việc User không thể access vào 200Post. 

```
>>> from django.contrib.auth.models import User
>>> from guardian.shortcuts import assign_perm
>>> from app.models import Post
>>> 
>>> john = User.objects.create(username='john')
>>> post = Post.objects.create(content='This is the content.', author=john)
>>> john.has_perm('view_content', post)
False
>>> assign_perm('view_content', john, post)
>>> john.has_perm('view_content', post)
True
```


Việc định nghĩa của Permission không chỉ với User mà có thể ứng với cho cả Group. 
```
>>> from django.contrib.auth.models import Group
>>> group = Group.objects.create(name='editors')
>>> assign_perm('view_content', group, post)
>>> bob = User.objects.create(username='bob')
>>> bob.groups.add(group)
>>> bob.has_perm('view_content', post)
True
```


Tham khảo chi tiết hơn tại 
https://django-guardian.readthedocs.io/en/stable/

# Django-role-permissions

Là Application để quản lý permission bởi base role. Chúng ta sẽ không setting riêng biệt việc User nào có tể access vào Object nào, mà sẽ tiến hành định nghĩa Role và quản lý base theo định nghĩa này . 

```
from rolepermissions.roles import AbstractUserRole

class Writer(AbstractUserRole):
    available_permissions = {
        'create_content': True,
        'view_content': True,
    }

class Reader(AbstractUserRole):
    available_permissions = {
        'create_content': False,
        'view_content': True,
    }
```


User được phân bổ các role, có thể check được về các role của user đó và permission . 

```
>>> from rolepermissions.checkers import has_permission, has_role
>>> from rolepermissions.roles import assign_role
>>> has_role(john, Writer)
False
>>> assign_role(john, Writer)
<class 'Writer'>
>>> has_role(john, Writer)
True
>>> has_permission(john, 'create_content')
True
```


Check quyền của Object level : 
```
from rolepermissions.permissions import register_object_checker

@register_object_checker()
def edit_content(role, user, obj):
    if role == Writer:
        return True
    if obj.author == user:
        return True
    return False
```

Khi cần gọi thì sẽ làm như sau : 

```
>>> from rolepermissions.checkers import register_object_checker
>>> has_object_permission('edit_content', john, post)
```


Tham khảo link sau để biết thêm chi tiết : 
https://django-role-permissions.readthedocs.io/en/stable/

# Django-rules
Cũng implement permission của object level. Đặt biết điểm nổi bật đó là không sửa dụng database model trong quản lý permission . 


Trước tiên cần đinh nghĩa biến số trả vè giá trị luận lý. Khi có cần gán thêm @rules.predicate. 

```
@rules.predicate
def is_post_writter(user, obj):
    return obj.author == user
```


Tiếp đến gán permission với biến đã định nghĩa. 
`rules.add_rule('can_edit_post', is_post_writer)`


Sau đó sử dụn Object và tiến ảnh test permission . 
```
>>> rules.test_rule('can_edit_post', john, post)
True
```