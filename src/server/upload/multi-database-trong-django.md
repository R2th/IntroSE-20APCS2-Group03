> Đôi khi, một project yêu cầu kết nối 2 hoặc nhiều database cùng một lúc. Cái này ít khi xảy ra, mà thực chất cũng không nên xảy ra. Cơ bản là khách thích, nên ta làm...
> 

### Model nào thuộc về database nào?
Để giúp cho Django phân biệt được model và database tương ứng, ta cần 1 cách đánh dấu model để phân biệt chúng.
Cách đơn giản nhất là nhét model vào 1 app con con, để nó được đánh dấu bằng tên của app đó, cụ thể là trường `your_model._meta.app_label`
```
# Ở đây, ta muốn admin dùng 1 database riêng và cars dùng 1 database khác
src/
    apps/
        admin/
        cars/
```

### Ai đảm nhiệm việc lọc model?
Sau khi đã đánh dấu model xong, ta cần một thứ để lọc chúng ra mỗi lần ta tương tác với model đó, tụi tây nó gọi là "database router". Xui ở chỗ là thằng này ko có sẵn.

Bước 1: code cái thằng router này, có 4 hàm tất cả, override bao nhiêu là tùy mình, cái nào ko override thì mặc định trả về None và nó sẽ sử dụng database 'default':
```
# whatever_database_router.py
class WhateverDatabaseRouter: # tên tuổi méo quan trọng, dễ hiểu là được
    # với request đọc
    def db_for_read(self, model, **hint):
        # nếu nó được gắn mác 'cars', thì gọi đến database 'cars'
        if model._meta.app_label == 'cars':
            return 'cars'
    
        # nếu nó được gắn mác 'admin', thì gọi đến database 'admin'
        if model._meta.app_label == 'admin':
            return 'admin'
            
        # nếu nó méo có mác, gọi đến database 'default'
        return None
     
    # với request ghi
    def db_for_write(self, model, **hint):
        ...
        
    # với request migrate
    def allow_migrate...
    
    # với request check quan hệ
    def allow_relation...
```
> (?) 'default' là thằng nào? Tên khác được không?
> Các database trong settings đều được thiết lập theo kiểu sau:
> 'key': {
>    'NAME': 'your_db_name',
>    'USER': 'root',
>    'PASSWORD': '1',
>    'PORT': '3306',
>    'HOST': 'localhost'
>    ...
>   thì 'default' là cái 'key' chứ không phải là database name ('NAME') nhé
>   

Bước 2: gắn nó vào settings để Django sử dụng nó
```
# ngay trong file settings.py
# thiết lập cho các database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'my_cars_default',
        'USER': 'root',
        'PASSWORD': '1',
        'PORT': '3306',
        'HOST': 'localhost',
    },
    'cars': {
        ...
        'NAME': 'my_cars',
        ...
    },
    'admin': {
        ...
        'NAME': 'my_admins',
        ...
}

# dẫn link tới thằng database router đã code ở trên
DATABASE_ROUTERS = (
    'my_project.whatever_database_router.WhateverDatabaseRoute',
)
```
### Khi nào thì phải rắn:
Đôi khi, từ chối sử dụng phương án này là cách tốt nhất để phòng tránh thảm họa về sau.
Ở những trường hợp sau thì ta không nên chơi multi database:
1. Các bảng quan hệ many-to-many nhưng lại ở 2 database khác nhau, sẽ khó để Django kiểm tra PK của các bảng, sẽ phải đục khoét vào source code để custom lại các kiểu, mà thiên hạ chưa mấy ai làm.
2. Sử dụng một số app built-in chỉ việc ăn xổi của Django:
* `flatpages` và `redirects` phụ thuộc vào `sites` nên 3 thằng này phải nằm chung 1 database
* `User`, `Group` và `Permission` của `auth` đều gắn với `ContentType`, nên đám này cũng phải chung 1 database.
* `admin` yêu cầu `auth` nên, 1 lần nữa, cũng phải chung database nốt.