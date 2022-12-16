## 1. Mở đầu
<hr>

Sau một thời gian làm việc với bên front-end thì hôm nay, mình xin chia sẻ với các bạn một tips cá nhân mà mình đúc kết được trong qua trình làm việc của mình đối với các dự án dạng **Single page application**. Chia sẻ dành cho các bạn mới làm việc với front-end nhằm giúp các bạn tạo ra được những sản phẩm tốt hơn và trải nghiệm tốt hơn. Nào chúng ta cùng bắt đầu.

## 2. Các trạng thái của UI
<hr>

### a.  Trạng thái loading

Khi chúng ta bắt đầu tham gia code giao diện cho một sản phẩm dù là cho công ty hay sản phẩm cho cá nhân thì thông thường chúng ta sẽ nhận được  một bản design các màn hình cho sản phẩm đó đối với sản phẩm có design riêng hoặc cũng có thể ta sẽ đi "học lỏm" lại các giao diện đã có sẵn của các sản phẩm khác mà chúng ta cho là đẹp ở trên mạng trong trường hợp không có design. Giả sử chúng ta sẽ có một bản design như sau:

![](https://images.viblo.asia/42cf4866-3951-4abc-8bae-0149523c3718.png)

Khi bạn sử dụng React, Vue, ... cho project SPA thì ngoài việc bạn đưa giao diện từ bản design sang code thì chúng ta sẽ cần phải kết nối màn hình (giao diện) đó với việc gọi API ở phía back-end để lấy dữ liệu về và hiển thị ra. Như đối với design nói trên thì mỗi lần ta chuyển trang vào màn hình quản lý user này thì ta sẽ cần gọi API để lấy danh sách user đó về. Ngoài ra mỗi khi chúng ta thay đổi trang, ví dụ chuyển từ trang 1 sang trang 2 thì cũng sẽ phải gọi lại API lấy giữ liệu trang thứ 2 về. Đối với các ứng dụng trước kia, thì mỗi khi ta chuyển trang mới thì toàn bộ trang web của chúng ta sẽ được load lại bằng cả 1 file html đầy đủ giao diện từ phía server nhưng đối với các ứng dụng hiện đại bây giờ thì khác, ta sẽ chỉ cập nhật lại dữ liệu cho khu vực cần thiết thôi như ở đây là chỉ nội dung cái bảng ở trên chứ không phải toàn bộ trang. Tuy nhiên vì chúng ta làm đúng theo design là chỉ có giao diện trên nên có thể bạn sẽ quên mất một điều là mỗi thành phần trong giao diện của chúng ta cũng có các trạng thái khác nhau.

![](https://images.viblo.asia/9172309d-505c-4606-afb9-0ea79191d71e.png)

Nếu ta chỉ dừng lại ở việc gọi API và trả về dữ liệu đơn thuần thì ta đang làm cho duy nhất trạng thái gọi API xong và thành công với dữ liệu thu được hoàn hảo mà quên đi mất rằng ta sẽ có cả trạng thái loading hay error. Điều này sẽ đem lại trại nghiệm không tốt cho ứng dụng của bạn. Giả sử bây giờ ta bấm nút để chuyển qua trang thứ 2:

![](https://images.viblo.asia/131b74ae-c20f-4cfb-81fa-c00f7e0ecdb5.gif)

Trên môi trường dev của bạn thì tất nhiên mạng rất nhanh nên bạn chỉ cần bấm chuyển trang là lập tức sẽ có dữ liệu mới hiện ra ngay. Tuy nhiên trên thực tế thì điều này không phải lúc nào cũng đúng vì sẽ có 1 khoảng delay trong qúa trình gọi ứng dụng của bạn gọi API để lấy giữ liệu. Khoảng delay này sẽ với mỗi người sẽ khác nhau vì vấn đề network nhanh hay chậm. Trường hợp API của bạn mất khoảng 1-2s để phản hồi nhưng bạn lại không hiển thị ra bất cứ thông tin nào về việc thao tác của người dùng đã thanh công và hệ thống đang chạy có thể dẫn đến người dùng không biết được rằng liệu nó có đang chạy hay đang bị lỗi.

![](https://images.viblo.asia/aac683a5-8b06-4fda-bc46-a335a5dff780.gif)

Như trong bức ảnh ở trên người dùng thông thường click vào họ không thấy có bất cứ điều gì xảy ra cả và phải đợi sau một lúc mới có kết quả. Với trường hợp phân trang như nói trên, có thể người dùng sẽ tạm chấp nhận nhưng giả sử chúng ta có một form đăng kí tài khoản chẳng hạn và khi người dùng bấm nút để xác nhận đăng ký sau khi điền thông tin nhưng bạn lại không hiển thị bất cứ thông tin gì cho người dùng biết được rằng hệ thống đang xử lý thông tin đăng ký của người dùng có thể sẽ làm người dùng lầm tưởng bị lỗi hoặc chưa được và click lại nhiều lần:

![](https://images.viblo.asia/7eaacc4e-07b6-423a-88a0-d6c8ce3e0579.gif)

Thay vào đó những gì chúng ta cần và nên làm đó là thêm trạng thái loading vào giao diện của chúng ta như dưới đây:

![](https://images.viblo.asia/793afa12-a3a7-4a1c-96a1-4f951462ee85.gif)

![](https://images.viblo.asia/d6c28aa2-10a0-4ea4-b0dc-a70f5efe2764.gif)

Bằng cách này sẽ giúp cho ứng dụng của chúng ta có trải nghiệm tốt hơn và đồng thời người dùng cũng có thể nhận ra rằng thao tác của họ đã được ghi nhận và hệ thống đang chạy chứ không phải bị lỗi.

### b. Trạng thái không có dữ liệu

Một trạng thái nữa của dữ liệu mà bạn cũng nên thêm vào đó là trường hợp không có dữ liệu nào để hiển thị. Điển hình ở đây là trong trường hợp bảng dữ liệu của bạn cho phép người dùng có thể tìm kiếm, nếu từ khóa mà người dùng tìm kiếm có trả về kết quả thì mọi thứ đều ổn và không có vấn đề gì cả như trường hợp dưới đây:

![](https://images.viblo.asia/f2810871-c0bf-4820-a78c-3fbc66e7b592.gif)

Tuy nhiên nếu không có kết quả nào được tìm thấy thì sao ? Nếu bạn không chủ động xử lý trường hợp này thì mọi thứ sẽ diễn ra như sau:

![](https://images.viblo.asia/98293e11-6d5b-4a8f-9539-17a971b77ecd.gif)

Việc không có kết quả hiện thị và cũng không hiển thị ra gì khác có thể khiến cho người dùng tưởng rằng việc tìm kiếm bị lỗi và sẽ không biết phải làm thế nào. Thay vào đó, chúng ta nên thêm một dòng text hay bất cứ gì đó để báo cho người dùng biết rằng không có kết quả nào cho từ khóa mà người dùng tìm kiếm để người dùng có thể biết được điều đó và thử lại với từ khóa khác chứ không bấm nút search liên tục trong bức tức.

![](https://images.viblo.asia/5f57f55a-a78c-4e59-a1e2-31a676157bb2.gif)

### c. Trạng thái lỗi

Đôi khi việc tìm kiếm và hiển thị dữ liệu hoặc đơn giản là việc chuyển trang có thể bị lỗi ở đâu đó trong code front-end của bạn hoặc do server có sự cố ở phần đó. Vì thế nên bạn cũng cần try-catch trong các trường hợp gọi API lấy dữ liệu hoặc gọi API thực hiện một thao tác nào đó và nếu nó rơi vào trường hợp catch bạn cần xử lý sao cho hiển thị ra bên ngoài để người dùng biết được đang có lỗi tránh để người dùng cứ chờ hoặc bấm đi bấm lạ mà không biết được tại sao không có gì hiển thị ra cả:

![](https://images.viblo.asia/1f135006-a4bb-4bb4-a77c-19ebda601914.gif)

Như bạn thấy qua phần này, điều chúng ta nên chú ý hơn đó là UI không phải chỉ có một trạng thái duy nhất giống như trong design thiết kế mà khi người dùng tương tác với UI của chúng ta thì ta cần làm gì đó để phản hồi lại rằng tương tác của người dùng đã thành công và hệ thống đang thực hiện.


## 3. Kết bài
<hr>

Bài viết của mình đến đây là kết, mong rằng qua bài viết của mình có thể giúp bạn làm việc tốt hơn với tư cách là front-end developer. Cảm ơn các bạn đã đọc bài viết của mình và đừng quên đển lại một upvote nhé :D