***class*** **RelatedManager**
Một "related manager" là một trình quản lý được sử dụng trong liên kết một nhiều hoặc liên kết nhiều nhiều. Điều này xảy ra trong 2 trường hợp:
* Đối với trường hợp là liên kết một nhiều. Sử dụng ForeignKey.
    ```
    from django.db import models

    class Reporter(models.Model):
        # ...
        pass

    class Article(models.Model):
        reporter = models.ForeignKey(Reporter, on_delete=models.CASCADE)
    ```
    Trong trường hợp này thì những method ở bên dưới đây sẽ có ở trong trình quản lý **reporter.article_set**.
* Trường hợp liên kết nhiều nhiều.

     ```
     class Topping(models.Model):
        # ...
        pass

    class Pizza(models.Model):
        toppings = models.ManyToManyField(Topping)
     ```
     Trong những trường hợp này thì những phương thức ở bên dưới đây sẽ tồn tại trong **topping.pizza_set** và  **pizza.toppings**.
     
**Những phương thức được đề cập ở trên**:
1. add(*objs, bulk=True, through_defaults=None)

    Thêm các đối tượng chỉ định vào đối tương liên quan.
    ví dụ: 
    ```
    >>> b = Blog.objects.get(id=1)
    >>> e = Entry.objects.get(id=234)
    >>> b.entry_set.add(e) 
   ```
   Trong ví dụ trên, đối với trường hợp liên kết một nhiều (ForeignKey), QuerySet.update() được sử dụng để update đối tượng `b`. Điều này phải yêu cầu các đối tượng đã tồn tại (đã tồn tại trong db).
   
   Có thể sử dụng **bulk=False** để update bằng cách gọi e.save()
   
   Nếu sử dụng **add()** với trường hợp liên kết nhiều nhiều, nó sẽ không gọi phương thức **save()**(đối số bulk không tồn tại ) thay vào đó nó tạo các quan hệ sử dụng QuerySet.bulk_create(). Nếu muốn tùy chỉnh logic khi một quan hệ được tạo, lắng nghe sự kiện m2m_changed, cái mà trigger hành động pre_add and post_add.
   
   Nếu sử dụng add trên một quan hệ đã tồn tại nó sẽ không nhân đôi nhưng nó vẫn trigger sự kiện.
   
   add() cũng cho phép các trường các trường trỏ đến mối quan hệ như một đối số.
   
   Ví dụ trên có thể viết lại:
   ```
   b.entry_set.add(234)
   ```
   
   Đối số `through_defaults` được dùng để chỉ rõ model trung gian nếu cần custom. Còn mặc định thì django sẽ tự sinh ra một bảng trung gian chỉ gồm có ForeignKey của 2 bảng trong quan hệ nhiều nhiều.
2. create(through_defaults=None, **kwargs)

    Tạo ra một đối tượng mới, lưu nó vào db rồi đặt đối tượng đó vào đối tượng liên quan.
    ```
    b = Blog.objects.get(id=1)
    e = b.entry_set.create(blog=b, headline='Hello', body_text='Hi', pub_date=datetime.date(2005, 1, 1))
    ```
    Trong trường hợp này chúng ta không cần gọi e.save() vì hàm create sẽ lưu vào db mà không cần gọi hàm save().
    
    Nếu muốn dùng hàm save() thì có thể viết như sau:
    ```
    >>> b = Blog.objects.get(id=1)
    >>> e = Entry(
    ...     blog=b,
    ...     headline='Hello',
    ...     body_text='Hi',
    ...     pub_date=datetime.date(2005, 1, 1)
    ... )
    >>> e.save(force_insert=True)
    ```
    
    Chúng ta không cần chỉ định rõ đối số đại diện cho mối liên kết (ở đây là blog_id) mà chúng ta có thể dùng thằng đối tượng như trong ví dụ trên.
    
    Đối số `through_defaults` thì cũng giống như giải thích ở phàn trên.
3. remove(*objs, bulk=True)

    ```
    >>> b = Blog.objects.get(id=1)
    >>> e = Entry.objects.get(id=234)
    >>> b.entry_set.remove(e)
    ```
    Giống như **add()**. Phương thức e.save() sẽ được gọi ở ví dụ trên để thực hiện việc update.
    
    VIệc sử dụng **remove** với trường hợp quan hệ nhiều nhiều thì sẽ dùng  **QuerySet.delete()** điều này có nghĩ không có phương thức **save()** nào được gọi. Lắng nghe sự kiện **m2m_change** để có thẻ custom quan hệ khi nó bị xóa.
    
    Cũng giống như **add()** thì không cần phải truyền đối số là cả object như ở ví dụ trên mà có thể truyền vào id của nó.
4. clear(bulk=True)

    Xóa bỏ tất cả object khỏi đối tượng liên quan.
    ```
    >>> b = Blog.objects.get(id=1)
    >>> b.entry_set.clear()
    ```
    Điều này không có nghĩa là chúng ta sẽ xóa cứng cacs đối tượng liên quan, mà chỉ là tách biệt chúng.
    
    GIống như **remove()** thì **clear()** chỉ tồn tại khi chúng ta định nghĩa `ForeignKey` với null=True và nó cũng cho phép sử dụng đối số `bulk`.
    
    Trong quan hệ nhiều nhiều thì đối số `bulk` không tồn tại.
5. set(objs, bulk=True, clear=False, through_defaults=None)

    Thay thế các tập đối tượng
    ```
    >>> new_list = [obj1, obj2, obj3]
    >>> e.related_set.set(new_list)
    ```
    Ở đây châps nhận đối số **clear=False** hoặc **clear=True**. Nếu là  **True** thì sẽ sử dụng method `clear()` như ở phần 4 để xóa hết các phần tử trong đối tượng liên quan và thay thế nó. Nếu là **False** thì sẽ sử dụng hàm **remove()** như trong phần 3 và chỉ thay thế những phần tử bị thiếu.
    
    Trong trường hợp quan hệ là 1 nhiều thì đối số `bulk` chỉ được thông qua với phương thức là **add()**, và **remove()**.
    
    Trương trường hợp nhiều nhiều thì đối số `bulk` không tồn tại.
    
    **Chú ý:**

   Khi sử dụng **prefetch_related()** thì các phương thức **add(), remove(), clear(), và set()** sẽ xóa bộ nhớ đệm của `prefetched`
   
   
   
Bài viết được dịch từ:

https://docs.djangoproject.com/en/2.2/ref/models/relations/