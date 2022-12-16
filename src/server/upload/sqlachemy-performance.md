### 1. Đặt vấn đề
Mình có hàng trăm nghìn tới hàng triệu bản ghi cần insert/update vào MySql một cách nhanh nhất. Việc đầu tiên ta nghĩ tới đó chính là Insert/Update theo bulk. Tại sao lại theo bulk mà không insert từng bản ghi? Vì nếu ta có 1 triệu bản ghi, nếu insert từng bản ghi sẽ cần 1 triệu lần gửi requests lên server để insert/update, còn nếu ta chia theo bulk 1000 bản ghi thì ta chỉ gửi lên server 1000 lần thôi, hiệu suất sẽ hiệu quả hơn rất nhiều. Vậy làm thế nào để Update/Insert theo bulk khi dùng SqlAlchemy?

### 2. Các phương thức để insert/update theo bulk
#### a, Phương thức *add_all(instances)*
Phương thức này có thể dùng để insert hoặc update đều được, trong danh sách instance có thể chứa những bản ghi đã tồn tại và những bản ghi mới
Insert:
```
users = [User(name="user " + str(i)) for i in range(1000)]
session.add_all(users)
session.flush()
session.commit()
```

Update:
```
# get list users for update
users = ...
# change info 
users = ...
session.add_all(users)
session.flush()
session.commit()
````

#### b, Phương thức *bulk_save_objects(instances, return_defaults=False, update_changed_only=True)*
Ngoài chức năng tương tự như add_all, phương thức này có thêm option update lại giá trị cho instances khi set `return_defaults=True`, phù hợp cho việc muốn lấy lại danh sách id khi insert instances mới (Nhưng sẽ làm giảm hiệu suất)
```
session.bulk_save_objects(instances, return_defaults=True)
for instance in instances:
    print instance.id
```

#### c, Phương thức *bulk_insert_mappings(instance_name, mapping, return_defaults=False, render_nulls=False)*
Chỉ dành riêng cho insert bản ghi mới với đầu vào là list dict. `Return` của phương thức này là `None` nghĩa là nó sẽ không trả về danh sách các bản ghi đã insert. Đây là phương thức cho hiệu suất insert cao nhất
```
mapping = [{"name": "user " + str(i)} for i in range(1000)]
session.bulk_insert_mappings(User, mapping)
```

#### d, Phương thức *bulk_update_mappings(mapper, mappings)*
Tương tự như `bulk_insert_mappings`, phương thức này trả về `None` và hiệu suất của nó cũng là cao nhất cho update theo bulk
```
mapping = [{"id": i, "name": "user " + str(i)} for i in range(1000)]
session.bulk_update_mappings(User, mapping)
```

### 3. Tổng kết
Vậy để insert/update với hiệu suất cao nhất và không quan tâm tới giá trị trả về thì ta sẽ dùng *bulk_insert_mappings/bulk_update_mappings*. Còn nếu cần lấy lại những thông tin sau insert/update ta sẽ dùng *bulk_save_objects*, riêng *add_all* mình thấy chắc chỉ làm màu thôi. :D