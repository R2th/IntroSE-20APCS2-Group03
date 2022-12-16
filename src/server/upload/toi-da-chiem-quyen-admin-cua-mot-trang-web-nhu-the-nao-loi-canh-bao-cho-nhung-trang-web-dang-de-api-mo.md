## Lời giới thiệu đầy ngọt ngào

Một ngày đẹp trời, team của chúng tôi (Sun*$hell) được thách thức pentest cho một trang web chuẩn bị release, chính xác là còn 2 tiếng đồng hồ nữa là release. Chúng tôi đã không ngần ngại nhận lời thách thức này :D

Sau một thời gian cật lực tìm kiếm lỗ hổng nào là XSS, Sql injection,... (một danh sách lỗi hay gặp ở trên web) thì cũng thấy đội devs kiểm tra khá là tốt giá trị từ người dùng, và hầu như không gặp một lỗi cơ bản nào.

Vậy thì kịch hay ở đây là gì, các bạn hãy đọc tiếp để rõ hồi kết.

## Quá trình

OK, không có lỗi phía người dùng thì tôi tìm cách mò tới sâu hơn là admin, tôi có lục lọi tất cả mọi thứ và biết được web dùng reactjs để làm front-end. Đã thế tôi sẽ dùng `sources` trong f12 của trình duyệt để xem sources của nó xem thế nào. Vì web viết bằng reactjs và dùng webpack để build nên khi mở lên sẽ có như hình dưới.

![Sources](/https://manhnv.com/images/posts/chiem-quyen-admin/source-react.png "Source reactjs")

Tôi bắt đầu lục lọi, bới móc để tìm các endpoint, tôi tìm được một số endpoint khá thú vị

![Endpoint](https://manhnv.com/images/posts/chiem-quyen-admin/end-point.png "Endpoint")

Vậy là chúng ta có những endpoint api:

* GET: /api/users/list
* POST: /api/users/store
* DELETE: /api/users/delete/${id}
* GET: /api/users/get/${id}
* PATCH: /api/users/edit/${data.userId}

Và, điều quan trọng là trong quá trình đọc qua về code thì tôi không thấy có chỗ nào yêu cầu xác thực cho cái đống API trên. Cũng có vẻ nghi ngờ, tôi liền dùng postman để get thử 1 API `/api/users/list` để kiểm tra sự nghi ngờ của mình. Thật bất ngờ, API trả về danh sách users có role là    `admin` mà không cần một chút xác thực nào. VẬY LÀ LỘ THÔNG TIN MỘT CÁC TRẮNG TRỢN RỒI.

Nhưng chưa dừng ở đó, tôi bắt đầu thử với endpoint có tác động tới dữ liệu database như POST, PATCH, nhưng vì được khuyến cáo trước là không được chỉnh sửa dữ liệu nên tôi đành tạo mới vậy :v . Vậy là bắt tay vào chọc ngoáy endpoint `/api/users/store` chính xác là endpoint dùng để tạo mới user admin.

Tôi thử dùng postman bắn một request gồm các trường của user tôi đã biết khi xem `list` lên thử:

![Store test](https://manhnv.com/images/posts/chiem-quyen-admin/store-test.png "Store test")

Ouch! 419 ư, nhìn giao diện 419 quen quá trời, hóa ra là của `laravel`. Vậy xác định backend là laravel. Thì 419 chính là lỗi khi không có `CSRF` trong laravel. Ok, vậy tìm xem trong web thì họ để CSRF token vào đâu.

Đây là đoạn code để đặt `CSRF token` vào lúc gọi API.

![Axios headers](https://manhnv.com/images/posts/chiem-quyen-admin/acios-header.png "Axios headers")

Đây là phần `CSRF token` sinh ra trên trang.

![csrf-token.png](https://manhnv.com/images/posts/chiem-quyen-admin/csrf-token.png "csrf-token.png")

Vậy chúng ta biết là sẽ phải truyền `X-CSRF-TOKEN` và headers lúc call lên API. Nên tôi đã thử đặt vào headers trong postman trường `X-CSRF-TOKEN` và gọi lại API một lần nữa, nhưng kết quả thì vẫn là `419`.

Thôi được rồi, muốn chơi khó nhau thì mình sẽ chơi khó lại, mình tìm cách gọi trực tiếp ngay trên browser cho bõ tức. Nhưng vì không quen dùng `axios`, mà cũng không biết axios có dùng được trên browser hay không, nên mình quyết định dùng jquery.

![hr31.png](https://manhnv.com/images/posts/chiem-quyen-admin/hr31.png "hr31.png")

Sau đó là đặt headers CSRF cho nó.

![set-header-jquery.png](https://manhnv.com/images/posts/chiem-quyen-admin/422-1.png "set-header-jquery.png")

Rồi bắn request xem thì thấy đã pass qua được 419 nhưng lại bị dính lỗi `422 Uprocessable Entity`. Vậy là chúng ta đã đặt sai `data`.

![422-1.png](https://manhnv.com/images/posts/chiem-quyen-admin/func-error.png "422-1.png")

Nhưng sai data thì làm sao cho đúng bây giờ, vậy là sau một tý tầm 2phút vắt óc suy nghĩ, mình đã nghĩ ra ý tưởng viết thêm 1 hàm `error` và cho request ajax và sẽ hiển thị lên lỗi trả về. Và thật may mắn lỗi trả về tất cả các trường mình sai và thiếu trong data lúc nãy request lên.

![func-error.png](https://manhnv.com/images/posts/chiem-quyen-admin/func-error.png "func-error.png")

Đã biết được trường nào `required` khi tạo bản ghi mới rồi, nhưng sao lỗi lại là

```
data.email: ["Email is required"]
data.name: ["Name is required"]
data.password: ["Password is required"]
data.role: ["Role is required"]
```

Ồ, hóa ra là cần phải data bọc bên trong data đẩy lên nữa, cụ thể là

```js
data: {
    data: {
        password: "Manh@123456",
        user_name: "nguyenmanh",
        email: "nguyenmanh@xxx.com",
        role: "admin",
        name: "manh hacker"
    }
}
```

Bây giờ thì thử bắn lại phát đạn này xem sự lợi hại nào :v . 

Bing boong, tôi đã tạo được tài khoản admin.

![created-admin.png](https://manhnv.com/images/posts/chiem-quyen-admin/created-admin.png "created-admin.png")

Và trở về quá khứ (khoảng vài phút trước, trong lúc lục lọi sources front-end thì mình thấy có path `/login`), bây giờ mình thử dùng trình duyệt vào `/login` bằng tài khoản vừa tạo xem thế nào.

![Giao dien login](https://manhnv.com/images/posts/chiem-quyen-admin/login-ui2.png "Giao dien login")

Và kết quả là

![Giao dien admin](https://manhnv.com/images/posts/chiem-quyen-admin/admin-ui.png "Giao dien admin")

Đến đây thì còn gì để mà chọc ngoáy nữa, bây giờ toàn quyền là của mình :v . Bắt tay vào viết report và gửi cho đội dev thôi.

## Vấn đề

* Như các bạn để ý thấy, thì tất cả những API mà front-end reactjs gọi đều không được xác thực (tức là ở trạng thái mở, bất cứ ai biết endpoint đều vào được). Điều này sẽ dẫn đến việc sẽ lộ dữ liệu khi dùng để lấy thông tin user, hoặc là mất toàn vẹn dữ liệu khi sử dụng các API đó để sửa đổi dữ liệu database nếu như gặp một kẻ tấn công thực sự khi sản phẩm đã release.

## Bài học

* Hãy xác thực cho bất kỳ API nào liên quan đến dữ liệu nhạy cảm và những dữ liệu không muốn public.
* Đừng bao giờ nghĩ API gọi ngầm phía dưới lớp front-end ảo lòi kia thì không ai có thể nhìn thấy được, một khi đã gặp phải một kẻ chọc ngoáy thực sự (ý tôi là một kẻ tấn công nào đó) thì điều này rất là dễ dàng hơn bao giờ hết.

Cuối cùng, cảm ơn các bạn đã đọc hết bài của mình. Mình cũng chỉ là một người mới tập tững vào nghề, còn trẻ người non dạ, nếu có gì chém gió quá đà mong các cao thủ bỏ qua :D .

Học hỏi là chính chứ ganh nhau làm gì!

Cảm ơn team `SUN*$hell` gồm:

* Nguyễn Anh Tiến (captain)
* Đoàn Đình Linh
* Ngụy Minh Tuấn
* Ngô Văn Nghĩa
* Me

Bài viết trên blog của mình: https://manhnv.com/2019/06/toi-da-chiem-quyen-admin-cua-mot-trang-web-nhu-the-nao-loi-canh-bao-cho-nhung-trang-web-dang-de-api-mo/