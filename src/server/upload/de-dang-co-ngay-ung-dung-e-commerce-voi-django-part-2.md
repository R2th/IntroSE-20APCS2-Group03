![](https://lh5.googleusercontent.com/D82Lf-7EcFm2FWgog8v7PDbsVT5JO9hhnulQ0EOw-SsayIM8GtVL1TkUStQ1GRpvUt_fUGjgjXGoBOCDPXththzpJUTkYHvv4I2HEXwUw8gKNyOsXJkMVI-QO67Y7EsMcBl8tac)

Xin chào tất cả mọi người. Tiếp nối [bài viết trước](https://viblo.asia/p/python-django-xay-dung-ung-dung-e-commerce-part-1-LzD5da4dKjY) về việc dùng Python Django để xây dựng 1 ứng dụng thương mại điện tử, sau đây mình xin phép được làm tiếp phần 2 để bổ sung thêm các chức năng, giúp ứng dụng trở nên hoàn thiện hơn.

Các chức năng mà mình sẽ làm trong bài viết này gồm các phần như sau:

- Các chức năng xoay quanh giỏ hàng
- Các chức năng xác thực người dùng
- Các chức năng thanh toán với Paypal

# Các chức năng xoay quanh giỏ hàng

## Phân trang cho danh sách sản phẩm

Django cung cấp các tác vụ liên quan đến việc phân trang rất tốt. Các trang được thể hiện thông qua các `urls` khác nhau, và mọi việc đều được kế thừa từ class `Paginator`

Mọi người hoàn toàn có thể tự xây dựng cho mình chức năng phân trang thông qua hướng dẫn chi tiết [này](https://docs.djangoproject.com/en/3.2/topics/pagination/) của Django

Trong phần trước, mình đang lấy tất cả các sản phẩm và hiển thị hết trên trang store với đường dẫn này `http://127.0.0.1:8000/store/`. Trong hàm `store` (GreatKart/store/views.py) chúng ta cần chỉnh sửa lại như sau:

- Lấy đối số page truyền lên từ client trong đường dẫn ví dụ `http://127.0.0.1:8000/store/?page=2` (đối số `page` ở đây có thể tùy chỉnh):

```
page = request.GET.get('page')
page = page or 1 # Trường hợp url là http://127.0.0.1:8000/store thì mặc định là trang số 1
```
- Tạo 1 đối tượng Paginator với 2 đối số, đối số đầu là danh sách tất cả phần tử chúng ta muốn phân trang, đối số thứ 2 là số phần tử trong 1 page là n:

```paginator = Paginator(products, 3) # n = 3```

- Lấy tất cả sản phẩm và đếm chúng:

```
paged_products = paginator.get_page(page)
product_count = products.count()
```

Ở template chúng ta cũng làm tương tự như hướng dẫn của Django, phần code template các bạn có thể tìm hiểu [ở đây](https://github.com/chungpv-1008/GreatKart/blob/master/templates/store/store.html)

Kết quả sau khi phân trang như sau:

![](https://images.viblo.asia/cb6b0420-ffbe-4a9d-9bef-ab6e7d3717c1.png)

![](https://images.viblo.asia/5a7a9ef8-c502-4f39-bf97-838d09eb357b.png)

## Tìm kiếm sản phẩm

Mình thêm 1 url cho `store/urls.py` như sau `path('search/', views.search, name='search'),`. Mình thêm 1 hàm `search` cho `store/views.py` lần lượt thực hiện như sau:
- Tìm kiếm đối số `q` trong request gửi lên server
- Lọc các sản phẩm theo đối số `q` dựa vào câu truy vấn mà Django hỗ trợ: `Product.objects.order_by('-created_date').filter(Q(product_name__icontains=q) | Q(description__icontains=q))`

Về code cụ thể cho hàm search mọi người có thể tham khảo [ở đây](https://github.com/chungpv-1008/GreatKart/blob/master/store/views.py) và template cho form search mọi người có thể xem [ở đây](https://github.com/chungpv-1008/GreatKart/blob/master/templates/includes/navbar.html)

Kết quả mình thu được như sau:

![](https://s6.gifyu.com/images/Peek-2021-06-19-01-29.gif)

## Thêm/xóa sản phẩm vào giỏ hàng

Trước khi nói đến việc thêm/xóa sản phẩm vào giỏ hàng, mình có thêm 1 model `Variation` nữa để mô tả cho sự đa dạng của sản phẩm. Code được thêm vào model.py của app store

```
class VariationManager(models.Manager):
    def colors(self):
        # Trả về tất các bản ghi có loại là color
        return super(VariationManager, self).filter(variation_category='color', is_active=True)

    def sizes(self):
        # Trả về tất các bản ghi có loại là size
        return super(VariationManager, self).filter(variation_category='size', is_active=True)

variation_category_choice = (
    ('color', 'color'),
    ('size', 'size'),
)

class Variation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE) # Khóa ngoài là product_id
    variation_category = models.CharField(max_length=100, choices=variation_category_choice) # Gồm 2 loại cố định là color và size
    variation_value = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)

    objects = VariationManager()

    def __str__(self):
        return self.variation_value
```

Mọi người đừng quên là phải thêm vào file admin.py để Admin có thể quản lý bảng này.

Các dòng code khá dễ hiểu, mọi người có thể đọc comment bên cạnh các dòng phức tạp để hiểu hơn. Tóm lại thì với mỗi sản phẩm, nó sẽ tồn tại 1 số loại size và color nhất định cho sản phẩm đó.

Xây dựng các urls mình có liệt kê các urls cần thiết [ở đây](https://github.com/chungpv-1008/GreatKart/blob/master/carts/views.py)

Về các hàm ở views tương ứng với thêm/xóa sản phẩm, mình có các hàm như sau:

- `_cart_id`: Tạo 1 id giỏ hàng trong `session_storage` nếu đây là lần đầu truy cập của máy local. Nếu tồn tại id trong `session_storage` rồi thì chỉ cần lấy ra.
- `add_cart`: Sau khi dùng hàm `_cart_id` để chắc chắn là tồn tại 1 Cart ở máy local. Hàm này tiến hành thêm mới 1 CartItem nếu chưa có CartItem trong Cart. Hoặc thêm 1 đơn vị số lượng vào CartItem đã tồn tại.
- `remove_cart`: Giảm 1 đơn vị số lượng trong CartItem
- `remove_cart_item`: Xóa hẳn 1 CartItem trong Cart.

Về template để thực hiện việc thêm/xóa sản phẩm, các bạn cũng có thể xem [ở đây](https://github.com/chungpv-1008/GreatKart/blob/master/templates/store/product_detail.html)

Kết quả sau khi thực hiện như sau:

![](https://s6.gifyu.com/images/Peek-2021-06-18-15-47.gif)

## Context Processor cho giỏ hàng

Sau khi có đủ các thao tác thêm/xóa sản phẩm, mình tiến hành update số lượng sản phẩm lên icon giỏ hàng ở góc trên bên phải.

Phần hiển thị này gần như xuất hiện ở tất cả các trang trong ứng dụng. Chúng ta không thể lấy dữ liệu rồi hiển thị chúng ở tất cả các hàm trong views.py được. Django hỗ trợ `context processor` để giúp ta chỉ cần lấy 1 lần và hiển thị ở tất cả các urls. Django hướng dẫn rất chi tiết `context processor` [ở đây](https://docs.djangoproject.com/en/3.2/ref/templates/api/)

Trước tiên, mình vào file settings.py, ở key `OPTIONS` trong biến `TEMPLATES`, mình thêm `'carts.context_processors.counter',` vào biến mảng trong đó. Nhận thấy, Django đã khai báo 1 số `context processor` cần thiết phía trên, và ta thêm 1 `context processor` nữa.

Tiếp theo, mình tạo 1 file mởi `context_processors.py` ở app carts, và thêm 1 hàm `counter` ở đây, luôn luôn phải trả về 1 dictionary.

Template mình sử dụng theo hướng dẫn của Django, code mình để [ở đây](https://github.com/chungpv-1008/GreatKart/blob/master/carts/context_processors.py) và được kết quả như sau:

![](https://s6.gifyu.com/images/Peek-2021-06-18-16-07.gif)

# Các chức năng xác thực người dùng

## Register

Mình tạo 1 url mới trong file `urls.py` trong app accounts. Sau đó khai báo 1 hàm ở views tương ứng.

Django hỗ trợ rất tốt việc tạo form, tài liệu chi tiết Django hướng dẫn [ở đây](https://docs.djangoproject.com/en/3.2/ref/forms/validation/). Mình tạo 1 file mới `forms.py` và tạo 1 class kế thừ từ lớp `ModelForm` trong đó. Trong hàm `register` ở views. mình tạo 1 đối tượng form đăng ký và hiển thị nó ở template. Code cho phần tạo form mọi người có thể xem [ở đây](https://github.com/chungpv-1008/GreatKart/blob/master/accounts/forms.py)

Template cho phần đăng ký mọi người cũng có thể xem [ở đây](https://github.com/chungpv-1008/GreatKart/blob/master/templates/accounts/register.html)

Trong thẻ form của template, mình đặt method `POST` cho nó lên action `register` luôn, tức là ở hàm `register` trong form mình sẽ kiểm tra request gửi lên có phương thức `GET` hay `POST`.

Nếu là `POST` mình sẽ tạo 1 user mới thông qua hàm `create_user` có trong models.py của app accounts

Để thân thiện hơn, mình cũng đặt các `messages` để thông báo cho người dùng khi đăng ký thành công hoặc thất bai. Django hỗ trợ rất tốt việc tạo `messages`.

Quay lại với settings.py, mình thêm 1 vài dòng code để khác so với [mặc định](https://docs.djangoproject.com/en/3.2/ref/contrib/messages/) của Django:

```
MESSAGE_TAGS = {
    messages.ERROR: 'danger',
    messages.WARNING: 'warning',
    messages.INFO: 'info',
    messages.SUCCESS: 'success',
    messages.DEBUG: 'secondary'
}
```
Trong `greatkart/static/js/script.js` mình cũng thêm `setTimeout` để message tự đóng sau vài giây

Trong hàm `register`, sau khi tạo người dùng, mình thêm 1 message nữa như sau
```
messages.success(request=request, message="Registration succesful!")
```
Template minh làm tương tự như  Django hướng dẫn và được kết quả như sau:

![](https://s6.gifyu.com/images/Peek-2021-06-18-16-23.gif)


## Login

Tương tự như đăng ký, mình cũng tạo 1 url và 1 hàm login cơ bản trong file views.py của app accounts.

Login mình cho nhập 2 trường là email và password, nên mình không tạo đối tượng form như đăng ký nữa.

Mình cũng để method `POST` với action `login` để 2 request `GET` và `POST` cùng dùng chung 1 hàm login.

Thêm `messages` cho 2 trường hợp đăng nhập thành công và đăng nhập thất bại.

Template mình để cùng cấp với template cho phần đăng ký. Đừng quên là sau khi đăng ký, mình đang để trường is_active là False, vì thế mình update thành True cho tài khoản đó trong trang Admin, rồi mới đăng nhập được. Sau đây là kết quả mình thực hiện:

![](https://s6.gifyu.com/images/Peek-2021-06-18-16-36.gif)

## Logout

Với logout mọi việc rất đơn giản, hàm logout trong views.py ta tùy chỉnh 1 chút:
```
from django.contrib.auth.decorators import login_required

@login_required(login_url="login") # Hàm Django hỗ trợ để chắc chắn phải login trước rồi mới logout được
def logout(request):
    auth.logout(request)
    messages.success(request=request, message="You are logged out!")
    return redirect('login')
```
 
 Kết quả ta thu được như sau:
 
 ![](https://s6.gifyu.com/images/Peek-2021-06-19-04-27.gif)

## Xác thực email sau khi đăng ký

Mình xác định email nguồn để gửi thư tới các email đăng ký bằng cách thêm các biến sau vào ifile settings.py, đừng quên là mở cấp quyền truy cập cho bên thứ 3 vào tài khoản google [ở đây](https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4NDBRTXTjtJrFiIxodZ_-zACPSvGc_qgRjKZZtciWdvUrVYLP8gc7Qe67kZRXQYPyZ0NHT1yfyxSCcPzL6UgJCPuEZI6Q), khi nào không dùng nữa ta có thể tắt nó đi:
```
# Đứng quên phải chuyển vào file env
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'youremail@gmail.com'
EMAIL_HOST_PASSWORD = 'yourpassword'
EMAIL_PORT = 587
```

Sau khi đăng ký, mình redirect lại về trang đăng ký và thông báo chờ kích hoạt email đăng ký. Mình gửi 1 đường dẫn trong mail có 2 đối số:
- Mã hóa id người dùng, được thực hiện bởi class http của Django
- Token (mã hóa tổ hợp: id người dùng, thời điểm tạo tài khoản và is_active), được tạo từ thư viện `six` và được lưu vào session của server

Sau khi người dùng nhận mail và click đường dẫn, hệ thống lấy đối số thứ nhất để giải mã thì thu được id người dùng. Sau đó, lấy đối số thứ 2 là token kiểm tra xem có tồn tại session đó ở server không. Nếu đảm bảo cả 2 điều kiện thì cập nhật trường is_active và quay về trang đăng nhập để thực hiện tiếp. Ngược lại thì báo lỗi

Phần code cũng như template mình để sẵn ở github. Kết quả như sau:

![](https://s6.gifyu.com/images/Peek-2021-06-19-03-52.gif)

## Thêm dashboard cho trang tài khoản

Mình thêm 1 đường dẫn `root/accounts/dashboard` nữa để quản lý tài khoản người dùng. Template mọi người cũng có thể tham khảo ở github

Kết quả mình được 1 trang dashboard như sau:
![](https://images.viblo.asia/742f389b-ac24-4b93-8dfe-6e064d43c2be.png)


## Forgot Password và Reset Password

Để hoàn thành chức năng khôi phục lại mật khẩu, mình sử dụng lại chức năng gửi email xác nhận trong Django tương tự như phần xác thực đăng ký

Mình tạo 1 đường dẫn `forgotPassword` để người dùng điền địa chỉ email của mình vào, sau đó kiểm tra địa chỉ email có khớp với tài khoản người dùng nào không, nếu tồn tại thì mình gửi email có chứa đường dẫn khác giống với chức năng đăng ký `reset_password_validate/<uidb64>/<token>`

Sau đó, mình tạo 1 url có tên `reset_password_validate` để kiểm tra đường dẫn xác nhận có tồn tại token hay không. Nếu đường dẫn hợp lệ, mình trả về 1 đường dẫn có tên `reset_password` để người dùng thay đổi mật khẩu, đồng thời phải gắn kèm `uid` vào `request` để đảm bảo phiên làm việc là đúng người dùng.

Với đường dẫn `reset_password`, mình kiểm tra `uid` trong request đồng thời dùng `user.set_password(password)` để cập nhật lại mật khẩu cho người dùng.

Code và template mọi người có thể tham khảo trong github của mình, kết quả thu được như sau:

![](https://s6.gifyu.com/images/Peek-2021-06-19-13-33.gif)

Đối với chức năng thay đổi mật khẩu sau khi đã đăng nhập, mọi người hoàn toàn có thể tự thực hiện giống như phần quên mật khẩu bên trên. Vì thế mình xin phép bỏ qua phần này :joy:

## Chỉnh sửa hoạt động của giỏ hàng khi xác thực người dùng

Với các hoạt động thêm, xóa sản phẩm ở giỏ hàng mà mình đã làm ở trên, mình đang thực hiện đối với khách vãng lai, tức là người dùng chưa thực hiện xác thực tài khoản và id của giỏ hàng chỉ lưu ở session store của máy local.

Chính vì giỏ hàng phải liên quan đến người dùng đăng nhập, nên ở bảng CartItem mình tạo thêm 1 trường là user_id, là khóa ngoài trỏ đến bảng Account.

Chúng ta hoàn toàn có thể kiểm tra người dùng đã đăng nhập hay chưa bằng `request.user.is_authenticated`, kết quả trả về là `True or False` tương ứng với đã hoặc chưa đăng nhập. Lấy đối tượng người dùng hiện tại bằng `request.user`

Ở file views.py của app Cart, mình đã thêm 1 số lệnh điều kiện `if else` để ứng với trường hợp người dùng đã đăng nhập hoặc chưa đăng nhập, chúng ta sẽ làm khác nhau 1 chút.

Lưu ý là khi người dùng thực hiện đăng ký, mình sẽ chuyển hết các bản ghi có cart_id được lưu ở session storage của máy local, từ `user_id` có giá trị null (do đang là khách vãng lai) thành `user_id = user` vừa đăng ký tài khoản. Điều này là khá bình thường đối với các ứng dụng thương mại điện tử như Shopee, Tiki, ...

Code chi tiết các bạn có thể tham khảo ở link github của mình, phần kết quả mình nhận được như sau:

![](https://s6.gifyu.com/images/Peek-2021-06-26-02-39.gif)
# Các chức năng thanh toán

## Trang checkout cho người dùng và các bảng cần thiết
Trước tiên, mình thiết kế 1 app mới là `orders` với 3 bảng như sau:

- Bảng Order, bản ghi được tạo khi mỗi lần user đặt đơn hàng. Bảng này chứa khóa ngoài đến Account và Payment. Các trường cần thiết đều ở trong form checkout
- Bảng OrderProduct, mỗi bản ghi tương ứng với 1 hàng trong giỏ hàng khi đã thanh toán xong. Bảng này chứa khóa ngoài đến Order và Payment
- Bảng Payment, bản ghi được tạo mỗi khi người dùng thanh toán xong, trường `payment_id` để lưu id giao dịch. Bảng này chỉ chứa khóa ngoài đến Account

Code chi tiết mình để [ở đây]()

Sau đó, mình có thêm 1 trang checkout cho người dùng, với 1 form gồm các thông tin liên quan đến vận chuyển đơn hàng.

Các công đoạn khá đơn giản gồm: Tạo 1 url trong app Cart, tạo 1 function checkout và 1 template. Trước khi chuyển đến trang checkout, mình đã đặt điều kiện phải đăng nhập trước.

Kết quả như sau:

![](https://images.viblo.asia/8bff51ce-ede0-431e-8eb5-24cde70e6a1a.png)

## Review orders

Sau khi người dùng submit form ở trang checkout, mình điều hướng đến 1 trang cho người dùng review những gì mà họ đã điền ở trang checkout.

Các công đoạn tạo trang cũng tương tự như trang checkout, và đây là kết quả mà mình đạt được:

![](https://s6.gifyu.com/images/Peek-2021-06-26-17-19.gif)

## Tích hợp Payment Gateway & Đặt hàng

Mình tạo 1 tài khoản paypal trước. Sau đó bạn truy cập và đăng nhập vào trang [https://developer.paypal.com/](https://developer.paypal.com/), vào tab này [https://developer.paypal.com/developer/accounts/](https://developer.paypal.com/developer/accounts/) để tạo 2 tài khoản sandbox giả định.
Mình tạo 1 tài khoản personal (người mua) và business (người bán) với thông tin sau:
- Personal: có email `my.app.personal@gmail.com`.
- Business: có email `my.app.business@gmail.com`

Cả 2 tài khoản mình đều để tiền là $9.999.999 và loại thẻ thanh toán là VISA. Sau khi mình tạo 2 tài khoản sandbox, mình có thể đăng nhập 2 tài khoản này vào trang [https://sandbox.paypal.com/](https://sandbox.paypal.com/) để kiểm tra số tiền hiện có.

Mình vào trang này [https://developer.paypal.com/developer/applications/](https://developer.paypal.com/developer/applications/) tạo 1 app mới có tên `My Greatkart` và tài khoản sandbox mình chọn là tài khoản sandbox business bên trên, `app type` mình giữ nguyên. Sau khi tạo xong, mình copy `Client ID` của app vừa tạo

Sau đó, mình tạo 1 nút thanh toán bằng paypal cho người dùng (có hướng dẫn chi tiết của trang chủ paypal [https://developer.paypal.com/docs/checkout/integrate/](https://developer.paypal.com/docs/checkout/integrate/)). Mọi người có thể xem demo ở đây [https://developer.paypal.com/demo/checkout/#/pattern/client](https://developer.paypal.com/demo/checkout/#/pattern/client)

Mình import script của paypal vào file base.html. Lưu ý: Đối số `client-id` trong đường dẫn chính là `Client ID` mình vừa copy bên trên
```
<script src="https://www.paypal.com/sdk/js?client-id=...&currency=USD"></script>
```
Thêm nút button và mã script vào file `orders/payments.html`:
```
<div id="paypal-button-container"></div>
<script>
        var amount = "{{ grand_total }}";
        // Render the PayPal button into #paypal-button-container
        paypal.Buttons({

            // Set up the transaction
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount,
                        }
                    }]
                });
            },

            // Finalize the transaction
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    // Show a success message to the buyer
                    alert('Transaction completed by ' + details.payer.name.given_name + '!');
                });
            },

            style: {
                color:  'blue',
                shape:  'pill',
                label:  'pay',
                height: 40
            }
        }).render('#paypal-button-container');
    </script>
```
Kết quả mình thu được như sau:

![](https://s6.gifyu.com/images/Peek-2021-06-26-21-49.gif)

## Cập nhật Database sau khi thanh toán

Trong sự kiện `onApprove` của Paypal, mình thêm 1 ajax để cập nhật lại cơ sở dữ liệu với data gửi lên như sau:
- `csrfmiddlewaretoken`: Tương tự như `csrf_token` trong form html
- `orderID`: Id của bản ghi order
- `transID`: Id của giao dịch vừa thực hiện
- `payment_method` = "PayPal"
- `status`: Trạng thái giao dịch vừa tạo

Phần views.py mình kiểm tra request gửi lên có phải kiểu ajax và POST hay không, sau đó thực hiện:
- Tạo mới 1 bản ghi Payment
- Cập nhật lại bản ghi Order
- Mỗi bản ghi CartItem sẽ tạo 1 bản ghi OrderProduct tương ứng. Cùng với đó cũng xóa luôn CartItem.
- Gửi email thông báo cho người dùng.

Kết quả sau khi thực hiện như sau:
![](https://s6.gifyu.com/images/Peek-2021-06-27-01-11.gif)

# Kết thúc

Đến đây, mình xin phép kết thúc phần 2 ở đây. Một số chức năng còn lại mình sẽ làm trong phần 3 bao gồm:
- Rating cho sản phẩm
- Deploy ứng dụng lên **AWS Elastic Beanstalk**
> Update: Mọi người có thể tham khảo phần cuối [ở đây](https://viblo.asia/p/hoan-thanh-ung-dung-e-commerce-voi-python-django-3Q75wExeZWb)

Cảm ơn mọi người đã theo dõi đến đây :smiley:. Đừng quên cho mình 1 upvote và 1 bookmark ạ :stuck_out_tongue_winking_eye: