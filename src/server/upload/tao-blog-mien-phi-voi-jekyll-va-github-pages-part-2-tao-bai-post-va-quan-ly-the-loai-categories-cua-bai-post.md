Tiếp theo seri tạo blog miễn phí với jekyll và github page hôm trước. Hôm nay mình tiếp tục chia sẻ với các bạn làm cách nào để tạo 1 bài viêt và phân loại bài viết theo thể loại.
# 1: Viết Blog
Việc viết blog trên này sẽ thông qua việc upload file có định dạng .md vào thư mục tên là _posts. Mỗi file tương đương một bài blog.
![](https://images.viblo.asia/4bc71606-2bb5-418a-b6ab-ef9a460299a2.png)

Cách upload rất đơn giản, bạn đi thẳng vào repo rồi nhấn Upload files. Hoặc soạn thảo trực tiếp trên github cũng được bằng cách nhấn Create new file

![](https://images.viblo.asia/b7d52676-ec73-4ba4-8338-d836e0148f5f.png)

Có thể lần đầu tiên sẽ hơi bối rối xíu với định dạng văn bản .md. Đừng quá lo sợ.

# 2: Cách tạo file .md

Cách tạo file .md đó là tạo một file bất kì rồi lưu nó dưới đuôi .md 

File này được viết bằng trình soạn thảo văn bản, có thể là Notepad, với các cú pháp như sau. Bạn nào quen đăng bài lên diễn đàn ngày xưa chắc sẽ thấy hoài niệm đó.

* dấu thăng # ở đầu câu để tạo tiêu đề. Có 6 mức tiêu đề từ lớn đến nhỏ. Một dấu thăng là tiêu đề lớn nhất. 6 dấu thăng là tiêu đề nhỏ nhất
* dấu hoa thị * bao quanh chữ để tạo chữ nghiêng
* hai dấu hoa thị bao quanh chữ để tạo chữ đậm
* `[chữ hiển thị](địa chỉ link)`
* `![](link ảnh)`
* dấu gạch ngửa để hiển thị kí tự đặc biệt

![](https://images.viblo.asia/4cee1687-1d90-43a0-bf46-3cbc64139260.png)

# 3: Tạo một bài post hoàn chỉnh
Bài post dạng file .md vậy là gần hoàn chỉnh rồi đó. Chỉ thiếu một chút thông tin phụ như sau, copy paste vào đầu mỗi file .md

```
---
layout: post
title: Tên bài post
---
```

Lưu ý là 3 dấu gạch là 3 dấu gạch chứ không phải 2, không phải 4 nha. Dòng 1 và dòng 2 mà dính vào nhau là cũng hỏng. Đằng sau dấu hai chấm phải có dấu cách nữa. Tóm lại đừng thay đổi gì ngoài cái tên bài post.

Và đặt tên file như sau, cũng copy paste luôn, thay ngày tháng và tên bài post của bạn vào. chú ý tháng trước ngày sau, ghi lộn là post không hiện ra được nha.

```
2019-06-19-ten-bai-post.md
```
Upload lên là ta xong rồi!. Đợi một chút sẽ có thay đổi trên trang blog của bạn. Rất nhanh thôi.

# 4: CÁCH PHÂN LOẠI BÀI VIẾT THEO THỂ LOẠI

## 4.1: Chuẩn bị
### 4.1.1: Một vài tên thể loại
Thật ra trong quá trình viết blog dần dần thì chia thể loại sau cũng chẳng sao nhưng tốt nhất nên rào ngay từ đầu là về cơ bản có những thể loại gì, để sau này không phải quay lại từng bài viết một để thêm thể loại con cho nó.

### 4.1.2: Khi viết bài post thì bài post phải có categories

Các bài post với đuôi file .md của bạn, chêm tí phân loại vào đầu file như thế này.
```
---
layout: post
title: bai viet 1
categories: baiviet1 baiviet2
---
```

Một bài có nhiều thể loại cũng được. Các thể loại cách nhau bằng dấu cách. Chữ categories là số nhiều mới được nhé.
## 4.2: Tiến hành
### 4.2.1: Tạo layout
Tạo file **theloai.html** trong thư mục gốc của repositories
![](https://images.viblo.asia/5c85429b-9ab0-437c-99d3-2bc8f513875d.png)
Có nội dung như sau:
![](https://images.viblo.asia/998c8e85-2bff-4ca9-9daf-b3dc073d23ad.png)

```
---
layout: page
title: Categories
---

<div class="col-sm-3 col-xs-6">
    <ul class="nav nav-tabs-vertical">
      {% assign categories_list = site.categories %}
      {% if categories_list.first[0] == null %}
        {% for category in categories_list %}
            <li>
                <a href="{{ site.BASE_PATH }}/{{ site.categories_path }}#{{ category | replace:' ','-' }}-ref" data-toggle="tab">
                  {{ category | capitalize }} <span class="badge pull-right">({{ site.categories[category].size }} post)</span>
               </a>
            </li>
        {% endfor %}
      {% else %}
        {% for category in categories_list %}
            <li>
                <a href="{{ site.BASE_PATH }}/{{ site.categories_path }}#{{ category[0] | replace:' ','-' }}-ref" data-toggle="tab">
                    {{ category[0] | capitalize }} <span class="badge pull-right">({{ category[1].size }} post)</span>
                </a>
            </li>
        {% endfor %}
      {% endif %}
      {% assign categories_list = nil %}
    </ul>
</div>


<div class="clearfix"></div>
```

Save lại đợi vài phút, và truy cập vào url ***https://{repositoriesname}/theloai/*** tại đây nó sẽ hiển thị ra tất cả thể loại (categories) của bạn và số lượng bài viết của mỗi thể loại. Như các bạn thấy, việc tạo bài viết và quản lý bài viết theo thể loại nó cũng không phải khó lắm

# Kết
Trên đây mình vừa hướng dẫn các bạn làm thế nào để tạo 1 bài viết và quản lý thể loại của bài viết.

Ở bài viết sau thì mình sẽ hướng dẫn các bạn tạo và chỉnh sửa giao diện cho blog.
Cảm ơn các bạn đã theo dõi bài viết.