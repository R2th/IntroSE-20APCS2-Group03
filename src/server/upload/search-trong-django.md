# Search trong Django

Search dường như là một trong những tác vụ được sử dụng rất nhiều cho các ứng dụng web/app. Django là một trong những web framework mạnh nhất của Python. Do đó, trong engine của mình, Django hỗ trợ search rất tốt. Tài liệu dưới đây sẽ giới thiệu một số trường hợp sử dụng có thể và các công cụ bạn có thể sử dụng.

![](https://images.viblo.asia/f12341e3-254e-4424-a905-3e70c3a3a4d5.png)

## Standard textual queries

Với các case chỉ cần giải pháp đơn giản, Django có 2 hàm sử dụng `contains` và `icontains` để hỗ trợ tìm kiếm. Anh em developer hay gọi là kiểu search `LIKE`.

**contains**

Khi sử dụng Django ORM thì syntax sẽ như thế này:

```py
Blog.objects.get(title__contains='Viblo')
```

SQL query với kết quả tương đương:

```SQL
SELECT ... WHERE title LIKE '%Viblo%';
```

Sử dụng `contains` có một nhược điểm cần chú ý. Như ví dụ trên, nếu search title là `viblo`, bạn sẽ không nhận được record nào cả :D. Đó là lý do `icontains` xuất hiện.

**icontains**

Syntax ORM cũng khá giống với lúc sử dụng `contains`:

```py
Blog.objects.get(title__icontains='Viblo')
```

SQL tương ứng:

```SQL
SELECT ... WHERE headline ILIKE '%Viblo%';
```

## A database’s more advanced comparison functions

Cái này nó phụ thuộc nhiều vào database engine. Nếu bạn đang sử dụng PostgreSQL, Django hỗ trợ `a selection of database specific tools` cho phép bạn thực hiện các truy vấn phức tạp hơn. Nếu bạn sử dụng database khác, bạn có thể kết hợp với thirth-party plugin/extension hỗ trợ. Tại thời thời điểm này, Django không hỗ trợ được cho tất cả các database engine khác nhau. 

Ta sẽ làm vài ví dụ truy vấn phức tạp với PostgreSQL. 

Như ví dụ trên, từ `Viblo` là một từ tiếng Anh. It's okay. Nhưng nếu title là non-English, ta sẽ cần thêm `unaccent`. `unaccent` được sử dụng cho `CharField` and `TextField`:

```py
>>> Blog.objects.get(title__unaccent__icontains='Mexico')
['<Blog: Mexico>', '<Blog: Mexico City>', '<Blog: México City>']
```

Nhưng nếu ta thử một case khác:

```py
>>> Blog.objects.get(title__unaccent__icontains='México')
['<Blog: México City>']
```

Trong trường hợp này, nếu bạn muốn search `México` mà mong muốn ra cả `Mexico`, bạn cần phải dùng thêm `trigram_similar `:

```py
>>> Blog.objects.get(title__unaccent__lower__trigram_similar='México')
['<Blog: Mexico>', '<Blog: Mexico City>', '<Blog: México City>']
```

Các ví dụ trên sẽ làm các developer phải cân nhắc sử dụng. Bởi vì, mỗi bài toán mà mình sẽ cần sử dụng `comparison functions` khác nhau. 

## Document-based search

Ok. Như các phần trên, ta chỉ search trên một số lượng text ở mức độ khá `nhỏ`. Nhưng nếu ta cần search ở mức độ lớn hơn như toàn bộ nội dung của một new. Khi đó, ta sẽ cần có một vài giải pháp:

- Ignoring “stop words”: such as “a”, “the”, “and”.
- Stemming words: các từ như country hay countries sẽ được coi là tương tự nhau.
- Weighting words được base trên các tiêu chí như tần xuất xuất hiện, tầm quan trọng, 

Nếu bạn muốn sử dụng searching engine thay thế, một vài cái tên nổi bật như ElasticSearch and Solr.  Sử dụng Django kết hợp với ElasticSearch mình sẽ giới thiệu vào một bài viết khác.

### PostgreSQL support 

PostgreSQL support sẵn full text search vào trong engine của mình. Mặc dù, nó khó có thể powerful so với ES (ElasticSearch), nhưng nó cũng có ưu điểm riêng. Tính năng này nằm sẵn trong database. Do đó, có thể kết hợp nó với các query phức tạp khác. Nó rất tiện ở chỗ đó. 

Module `django.contrib.postgres` cung cấp một số trợ giúp để thực hiện các truy vấn này. Để sử dụng module này, developer cần thêm `django.contrib.postgres` vào trong `INSTALLED_APPS`. 

Dưới đây là ví dụ:

```py
>>> Entry.objects.filter(body_text__search='cheese')
[<Entry: Cheese on Toast recipes>, <Entry: Pizza recipes>]
```

Khi kết hợp với nhiều query khác:

```py
>>> Entry.objects.annotate(
...     search=SearchVector('blog__tagline', 'body_text'),
... ).filter(search='cheese')
[
    <Entry: Cheese on Toast recipes>,
    <Entry: Pizza Recipes>,
    <Entry: Dairy farming in Argentina>,
]
```

Bạn có thể tham khảo nhiều hơn về PostgreSQL full text search tại đây: https://docs.djangoproject.com/en/3.0/ref/contrib/postgres/search/

### MySQL support

Nếu bạn đang dùng Django bản cũ, cụ thể  là <= 1.9, Django có hỗ trợ full text search cho Mysql. 

```py
Entry.objects.filter(headline__search="+Django -jazz Python")
```

SQL equivalent:

```py
SELECT ... WHERE MATCH(tablename, headline) AGAINST (+Django -jazz Python IN BOOLEAN MODE);
```

Mặc định Django sử dụng `BOOLEAN MODE` for full text searches. Nếu bạn muốn sử dụng tính năng này, hãy tham khảo[ tại đây](https://stackoverflow.com/a/35376921)

Trên đây là một số case search phổ biến mà Django support rất tốt. Hi vọng, qua bài viết này, anh em Django developer sẽ có những lựa chọn phù hợp khi làm tính năng search cho web/app của mình.