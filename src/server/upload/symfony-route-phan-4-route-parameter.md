# Giới Thiệu
Khi viết web app, chắc hẳn các bạn ai cũng từng phải nhận và xử lí request. Hôm nay chúng ta sẽ cùng tìm hiểu về cách lấy và xử lí Route Parameter trong request.
# Symfony Route Parameter
Lấy ví dụ về một web blog. Khi chúng ta muốn truy cập vào một bài post với id nhất định thì route sẽ trông như thế này `http://localhost/posts/1`. Phần số 1 là parameter của route, để chỉ chính xác là cần lấy post với id nào, đây là phần sẽ thay đổi, có thể là 2, 3, .... Để khai báo route này, chúng ta làm như sau:
## Cách khai báo: 
### Dùng routes.yaml:
```
post_get:
    path: /posts/{id}
    controller: App\Controller\PostController::get
```
### Dùng PHP Annotation:
```
// PostController.php
 /**
 * @Route("/post/{id}", name="post_get")
 */
...
```
### Dùng PHP Attribute:
```
// PostController.php
#[Route('/post/{id}', name: 'post_get')]
...
```
## Cách dùng route parameter:
Có hai cách để dùng parameter trong route: 
- Inject request vào controller và lấy những parameter cần thiết
- Dùng route parameter như là tham số trong controller
### Cách 1: Inject request
Lấy ví dụ route như sau `http://localhost/post/1`, để lấy được số 1 tức là id của post chúng ta sẽ gọi hàm get và tên tham số cần lấy vào:
```
// PostController.php

use Symfony\Component\HttpFoundation\Request;

#[Route('/post/{id}', name: 'post_get')]
public function get(Request $request) 
{
    dd($request->get('id'));
}
```
Lưu ý là trong phần `{}` bạn đặt tên gì, thì khi truyền tham số vào phương thức get, bạn phải dùng tên đó thì mới lấy được kết quả mong muốn. Lấy ví dụ `/post/{randomName}`, thì trong code, để lấy được giá trị của randomName, bạn cần `$request->get('randomName')`.

Mình xin phép nói thêm là để có thể lấy được query, ví dụ như `http://localhost/post/1?sortBy=name`, chúng ta muốn lấy được giá trị name từ query sortBy thì chúng ta sẽ gọi property query, sau đó gọi hàm get và truyền tham số chúng ta muốn lấy vào:
```
// PostController.php

use Symfony\Component\HttpFoundation\Request;

#[Route('/post/{id}', name: 'post_get')]
public function get(Request $request) 
{
    dd($request->query->get('sortBy');
}
```
### Cách 2: Dùng route parameter như là tham số
Với cách này, chúng ta làm như sau:
```
// PostController.php

use Symfony\Component\HttpFoundation\Request;

#[Route('/post/{id}', name: 'post_get')]
public function get(string $id) 
{
    dd($id);
}
```
Lưu ý là trong phần `{}` bạn đặt tên gì, thì dùng tham số, bạn phải dùng tên biến giống với route parameter. Lấy ví dụ `/posts/{randomName}`, để lấy được giá trị của randomName, bạn cần `public function get(string $randomName)`.

Đơn giản phải không?
## Vậy nên dùng cách nào?
Với cách inject request, chúng ta có cái lợi là có request object trong tay thì hầu như có thể lấy được tất cả những gì chúng ta muốn từ request. Tuy nhiên, điều này sẽ làm cho class đó phụ thuộc vào request của symfony, như vậy sau này muốn thay đổi dùng request khác tốt hơn thì sẽ khá là cực vì sẽ cần thay đổi mọi chỗ sử dụng request của Symfony và thay nó thành request mà mình mong muốn. Bản thân mình thì thấy đây cũng không phải là big deal lắm vì request của Symfony cũng khá là hoàn chỉnh và ok rồi.

Đối với việc dùng route paramter như là tham số thì chúng ta sẽ không phụ thuộc vào request của Symfony, tuy nhiên có một số hạn chế như chúng ta sẽ khó lòng lấy được một vài thông tin từ Request như query chẳng hạn.

Túm lại, theo mình cả hai cách đều tốt, quan trọng là dùng trong trường hợp nào. Nếu trong trường hợp bạn chỉ cần lấy parameter từ route, theo mình chọn cách 2 dùng route parameter như là tham số là ok nhất. Còn nếu bạn muốn lấy nhiều thông tin hơn từ Request như là query, thì nên chọn cách Inject Request.
# Kết luận
Qua bài viết này chúng ta đã biết được cách: 
- Cách khai báo route parameter dùng php annotation, php attribute và routes.yaml
- Cách dùng Route Parameter
- Bàn luận về hai cách dùng Route Parameter

Nếu có gặp lỗi, khó khăn hay bất kì thắc mắc gì, các bạn hãy tham gia cộng đồng [Symfony Vietnam](https://www.facebook.com/groups/532036037329901) để trao đổi thêm cũng như là giải quyết những vấn đề bạn đang gặp phải. Chúc các bạn thành công.