# **1. What is eager loading ?**
![](https://images.viblo.asia/e3b7e0b2-6d78-4580-9736-e7066a662598.jpg)

**Laravel** là một trong những framework của php phổ biến hiện nay, được cộng đồng php developer yêu thích và sử dụng.

**Query Performance** là chủ đề mà nhiều bạn khi mới bắt đầu tiếp cận laravel có thể chưa quan tâm đến, nhưng nó lại là một vấn đề hết sức quan trọng trong hệ thống.

Khi chúng ta sử dụng Eloquent Relationships trong laravel, mặc định nó sẽ ở chế độ "**lazy**" khi load lên tất cả các model quan hệ (**relation**), vấn đề anh em hay gặp phải là N + 1 Query.

**Eager Loading** sẽ giúp rút ngắn các câu query trong thao tác với database để giải quyết vấn đề này, nhưng trong quá trình sử dụng cũng thường hay mắc phải những lỗi liên quan đến em nó, sô đây tui xin chia sẻ cho quý zị những lỗi thường gặp nhé:

* ID OMMISION
* WHITE SPACING

# **2. ID OMMISION**
Để giải quyết vấn đề lazy loading chúng ta hay sử dụng phương thức **with()** như sau:
```
protected $with = ['company'];
```
Khai báo trên sẽ load tất cả các cột của **relationship** được liên kết. Nhưng nếu bạn muốn Load mỗi cột name, thông thường theo thúa quen ta hay làm:
```
protected $with = ['company:name'];
```
Vấn đề gặp phải là nó sẽ không lấy được cột **name** của Company, để khắc phục điều nay thì bạn phải thêm id cho nó như sau:
```
protected $with = ['company:id,name'];
```
Để load các columns cụ thể trong **relationship**, thì bạn phải truyền thêm ID cho nó nhé !
# **3. WHITE SPACING**
```
protected $with = ['company:id,name'];

#This will cause an error
protected $with = ['company:id, name'];
```
Khi bạn thêm 1 khoảng trắng trước cột name sẽ được coi là một phần của name và do đó khi Laravel cố gắng tải truy vấn của bạn, nó sẽ trả về một lỗi cho bạn biết rằng cột đó không tồn tại.
Bạn sẽ rất khó để  ý chỗ này vì khoảng trắng rất có thể sẽ không xảy ra với bạn trong thông báo lỗi của bạn.
# **4. Conclude**
**Eager Loading** đã khiến việc xây dựng các ứng dụng web mạnh mẽ trở nên rất dễ dàng với Laravel. 

Nếu bạn chưa quen với nó hoặc muốn đọc thêm, hãy truy cập tài liệu chính thức ở đây [officail docs](https://laravel.com/docs/8.x/eloquent-relationships#eager-loading)

Tiện thể tôi chia sẻ với các bạn 1 **packages** rất hay về việc giúp giám sát các truy vấn của chúng ta trong khi phát triển ứng dụng, thông báo khi nào nên thêm Eager Loading (khi có N+1 query) đó là [Laravel Query Detector](https://beyondco.de/docs/laravel-query-detector/installation), anh em có thể install nó vồ project của mình nhé !

Thân ái, chồ tộm biệt , quyết thắng !