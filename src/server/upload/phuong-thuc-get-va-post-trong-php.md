Khi các bạn truy cập sử dụng website thì bạn chính là một Client. Khi các bạn đăng nhập hay đăng ký tài khoản, hoặc là các bạn đăng comment thì dữ liệu sẽ được gửi từ client lên Server, vậy làm sao để Server nhận được những thông tin của bạn? Server sẽ nhận được thông qua hai phương thức POST và GET.

Có 2 cách gửi dữ liệu từ Client lên Server đó là dùng phương thức GET hoặc phương thức POST, cả 2 cách này bản chất lập trình viên mới biết chứ người dùng họ không quan tâm đến nó là cái gì, trừ khi là hacker :D. Để không mất thời gian nữa ta sẽ đi vào tìm hiểu từng cách, so sánh chúng với nhau và bàn luận xem khi nào ta dùng POST và khi nào ta dùng GET nhé.

**Nội dung bài học của chúng ta như sau:**

* **Phương thức GET trong PHP**
* **Phương thức POST trong PHP**
* **So sánh giữa POST và GET**

## 1. Phương thức GET trong PHP

Phương thức GET rất dễ nhận thấy đó là trên URL sẽ kèm theo dữ liệu mà chúng ta muốn gửi

**Client gửi lên**

Phương thức GET là phương thức gửi dữ liệu thông qua đường dẫn URL nằm trên thanh địa chỉ của Browser. Server sẽ nhận đường dẫn đó và phân tích trả về kết quả cho bạn. Server sẽ phân tích tất cả những thông tin đằng sau dấu hỏi (?) chính là phần dữ liệu mà Client gửi lên.

Ví dụ:  Với URL `freetuts.net?id=12`thì Server sẽ nhận được giá trị `id = 12`

Để truyền nhiều dữ liệu lên Server ta dùng dấu & để phân cách giữa các cặp giá trị. Giả sử tôi muốn truyền` id = 12`và` title = ‘method_get’` thì URL sẽ có dạng `freetuts.net?id=12&title=method_get`. Lưu ý với các bạn là vị trí các cặp giá trị không quan trọng, nghĩa là cặp title có thể nằm trước cặp id cũng được.

**Server nhận dữ liệu**

Tất cả các dữ liệu mà Client gửi lên bằng phương thức GET đều được lưu trong một biến toàn cục mà PHP tự tạo ra đó là biến **$_GET**, biến này là kiểu **mảng kết hợp** lưu trữ danh sách dữ liệu từ client gửi lên theo quy luật `key => value`. Ví du với URL `freetuts.net?id=12&title=method_get` thì dữ liệu sẽ được lưu trong biến $_GET dưới dạng:


>`$_GET = array(
    'id' => '12',
    'title' => 'method_get'
);`

Vì thế để lấy dữ liệu thì ta chỉ cần làm như sau:
```
// Lấy ID
$id = $_GET['id'];
echo $id; // kết quả là 12
  
// Lấy title
$title = $_GET['title'];
echo $title; // kết quả là method_get
```
## Thực hành:

Bạn hãy tạo một file get.php nằm trong thư mục WWW của Vertrigo Server hoặc thư mục htdocs của Xampp, sau đó bạn copy đoạn code này vào:

```

echo 'Dữ Liệu Chúng Tôi Nhận Được Là <br/>';
foreach ($_GET as $key => $val)
{
    echo '<strong>' . $key . ' => ' . $val . '</strong><br/>';
}
```
 

Sau đó bạn ra trình duyệt gõ đường dẫn sau: localhost/get.php?id=12&title=method_get và ngắm nhìn thành quả nhé. Bạn hãy thử thay đổi hoặc thêm các giá trị xem có gì khác không.

Lưu ý quan trọng:
Trước khi lấy một dữ liệu nào đó bạn phải kiểm tra tồn tại không không mới lấy nhé, vì nếu bạn không kiểm tra thì giả sử người dùng không truyền dữ liệu qua mà bạn lại nhận thì sẽ bị báo lỗi ngay. Để kiểm tra ta dùng hàm isset($tenbien) trong php.

**Ví dụ:**


```
if (isset($_GET['id'])){
    $id = $_GET['id'];
}<br><br>
```
 

## 2. Phương thức POST trong PHP
Phương thức POST có tính bảo mật hơn vì dữ liệu gửi phải thông qua một form HTML nên nó bị ẩn, nghĩa là chúng ta không thể thấy các giá trị đó được.

**Client Gửi Lên**

Với phương thức GET thì dữ liệu được thấy trên URL thì phương thức POST thì hoàn toàn ngược lại, POST sẽ gửi dữ liệu qua một cái form HTML và các giá trị sẽ được định nghĩa trong các input gồm các kiểu (textbox, radio, checkbox, password, textarea, hidden) và được nhận dang thông qua tên (name) của các input đó.

Server nhận dữ liệu
Tất cả các dữ liệu gửi bằng phương thức POST đều được lưu trong một biến toàn cục $_POST do PHP tự tạo ra, vì thế để lấy dữ liệu thì bạn chỉ cần lấy trong biến này là được. Cũng như lưu ý với các bạn là trước khi lấy phải dùng hàm isset($bien) để kiểm tra có hay không nhé.

 
```
if (isset($_POST['id'])){
    $id = $_POST['id'];
}
```
 

**Thực hành**

Bước 1: Bạn tạo một file post.php nằm trong thư mục WWW của Vertrigo Server hoặc thư mục htdocs của Xampp, sau đó nhập đoạn code tạo form này vào:

```

<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
        <form method="POST">
            Username: <input type="text" name="username" value=""/> <br/>
            password: <input type="password" name="password" value=""/><br/>
            <input type="submit" name="form_click" value="Gửi Dữ Liệu"/>
        </form>
    </body>
</html>
```
 

Bước 2: Bạn mở trình duyệt gõ đường dẫn localhost/post.php và ngắm nghía cái form mình vừa tạo ra nhé.

Bước 3: Bạn sửa lại đoạn mã HTML đó bằng cách thêm vào một đoạn mã PHP như sau:
 

```
<!DOCTYPE html>
<html>
    <head>
        <title></title>
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
        <form method="POST">
            Username: <input type="text" name="username" value=""/> <br/>
            password: <input type="password" name="password" value=""/><br/>
            <input type="submit" name="form_click" value="Gửi Dữ Liệu"/><br/>
            <?php
                // Nếu người dùng click vào button Gửi Dữ Liệu
                // Vì button đó tên là form_click nên đó cũng là
                // tên của key nằm trong biến $_POST
                if (isset($_POST['form_click'])){
                    echo 'Tên đăng nhập là: ' . $_POST['username'];
                    echo '<br/>';
                    echo 'Mật khẩu là: ' . $_POST['password'];
                }
           ?>
        </form>
    </body>
</html>
 
```

Bước 4: Bạn refresh lại trình duyệt rồi nhập tên đăng nhập và mật khẩu vào, sau đó nhấn vào button "***Gửi Dữ Liệu***" và nhìn thành quả của mình nhé.

![](https://images.viblo.asia/f0d852fc-537f-4dcb-9577-479ffe6281b0.PNG)


## 3. So sánh giữa POST và GET
Để các bạn hiểu rõ hơn về hai phương thức POST và GET thì chúng ta cùng so sánh một chút xíu.

**Giống nhau:**

* Đều gửi dữ liệu lên Server

**Khác nhau:**

* Phương thức POST bảo mật hơn GET vì dữ liệu được gửi ngầm bằng mắt thường không thể nhìn thấy được.
* Phương thức GET dữ liệu được gửi tường minh, chúng ta có thể thấy trên URL nên nó không bảo mật.
* Phương thức GET luôn luôn nhanh hơn POST vì dữ liệu gửi đi được Browser giữ lại trong cache. Khi thực thi với POST thì Server luôn thực thi lệnh rồi trả về cho Client, còn với GET thì Browser sẽ kiểm tra trong cache có chưa, nếu có thì trả về ngay chứ không cần gửi lên Server.

**Khi nào dùng GET - POST**

* Khi dữ liệu bạn muốn SEO thì phải sử dụng phương thức GET.
* Khi dữ liệu bạn không cần bảo mật thì dùng phương thức GET, ngược lại dữ liệu bảo mật thì dùng phương thức POST.

Ví dụ khi đăng nhập, Comment, đăng tin dùng phương thức POST. Còn khi lấy tin ra thì dùng phương thức GET…

Khi request sử dụng câu lệnh select thì dùng GET, khi request có sử dụng lệnh insert update, delete thì nên dùng POST.