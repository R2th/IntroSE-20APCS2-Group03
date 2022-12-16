<div align="center">
    
# Lời mở đầu
    
</div>

Xin chào các bạn, mình đã quay trở lại sau một thời gian khá dài "mai danh ẩn tích" rồi đây, Và đúng như tiêu đề của bài viết, lần này mình sẽ chia sẻ đến các bạn một công cụ để deploy một trang web tĩnh cực kì nhanh gọn và đơn giản. 
- Nếu bạn còn thắc mắc web tĩnh/động khác nhau như thế nào thì có thể tham khảo [**bài viết này**](https://viblo.asia/p/xay-dung-co-so-du-lieu-m68Z08O9ZkG)
- Còn nếu bạn thắc mắc tại sao chỉ deploy được web tĩnh thì đơn giản là vì nó được tạo ra cho các trang web tĩnh, vậy thôi :rofl::rofl::rofl::rofl: 

Và công cụ mình muốn giới thiệu ở đây là **Github pages**.

<div align="center">
    
# Nội dung
    
</div>

<div align="center">
    
## Giới thiệu về github.io
    
</div>

> GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website.

Theo như trang chủ định nghĩa thì **Github Pages** là một dịch vụ hosting dành cho những trang web tĩnh (bao gồm HTML, CSS và JavaSript), và nó sẽ build trực tiếp từ repository trên Github của bạn. Tức là bạn chỉ cần đẩy code lên repository trên github là trang web của bạn đã có thể public trên internet với domain là ***your-github-username.github.io***.

Trên đời này không có gì là miễn phí cả, và **Github pages** cũng vậy. Người dùng sẽ được phân thành 2 nhóm như sau:
- **Github Free for Personal/Organizations**: đây là nhóm người dùng **miễn phí** (như mình hiện tại và có thể là đa số các bạn đang đọc bài viết này). Nhóm người dùng này muốn sử dụng được **Github Pages** thì bắt buộc phải public repository (coi như là bạn trả phí bằng việc chia sẻ opensource cho cộng đồng) 
- **GitHub Pro/GitHub Team/GitHub Enterprise Cloud/GitHub Enterprise Server**: đối với nhóm người dùng này thì có thể sử dụng **Github pages** với các repository private.

Để tìm hiểu thông tin chi tiết về các loại tài khoản github trên thì bạn có thể xem thêm [**tại đây**](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/githubs-products).

<div align="center">
    
## Một số thao tác cơ bản với Github Pages
    
</div>

### 1. Tạo một trang github pages cho riêng mình
- **B1:** Tạo 1 repository với tên là ***your-github-username.github.io*** (nếu bạn thích đặt tên repository khác format trên thì cũng được thôi nhưng nó sẽ không chạy đâu :laughing::laughing::laughing:)
- **B2:** Clone repository đó về máy local của bạn (nếu bạn chưa biết các câu lệnh git cơ bản, có thể tham khảo thêm [**bài viết này**](https://viblo.asia/p/bat-dau-voi-github-4dbZNogvlYM) )
- **B3:** Bắt tay vào code website của bạn rồi tiến hành đẩy code lên repository mà bạn vừa tạo.
- **B4:** Lên github.com, vào phần **Settings** trong repository của bạn, kéo xuống dưới phần Github Pages, ở đây bạn sẽ có thể lựa chọn nhánh (branch), thư mục chứa code mà bạn muốn đưa lên rồi chọn **Save**.

![](https://images.viblo.asia/ccca40dc-2c49-40c2-b1c5-7b5fa865c191.jpg)
 <div align="center"> Ở đây mình sẽ deploy code thuộc nhánh master và thư mục /root lên site của mình. </div>
 <br>
 Có một số lưu ý với các bạn như sau:
 - Nếu như các bạn gặp phải warning giống như ảnh trên của mình và không build được, cách đơn giản nhất là hãy tạo ra một thư mục /docs trong repository của bạn  rồi push lại lên repository nhé.
 - Do là hàng free nên là bạn không thể đòi hỏi push code cái là site lên luôn được, quá trình này sẽ mất tầm vài phút (đối với mình thì lần lâu nhất là ~5') để site của bạn build lại theo code mới. Tuy nhiên, Github cũng khuyến cáo là quá trình này có thể kéo dài tới 20' (mình nghĩ có thể là phụ thuộc vào kích thước site của bạn, số lượng thư viện, file ảnh, audio, blah...blah...)

> Note: It can take up to 20 minutes for changes to your site to publish after you push the changes to GitHub.

### 2. Tuỳ chỉnh domain cho trang của bạn

### 3. Thiết lập https
- Nếu các bạn chưa biết http hay https là gì thì mình xin được giới thiệu qua như sau: 
    - **http (HyperText Transfer Protocol - Giao thức truyền tải siêu văn bản)** đơn giản là một trong các giao thức chuẩn về mạng Internet, được dùng để cung cấp dịch vụ web
    - **https (http-secure)** cũng là **http** nhưng được bảo mật hơn. Để so sánh giữa 2 giao thức này thì các bạn có thể xem thêm ở [bài viết này](https://viblo.asia/p/lam-the-nao-thiet-lap-https-cho-localhost-6J3Zgj0xKmB#_http-va-https-2).

- Và để cho website của bạn "trông-có-vẻ" chuyên nghiệp và an toàn hơn thì Github cung cấp cho bạn lựa chọn có sử dụng http hay không?
![](https://images.viblo.asia/e3b3f5cd-c33b-4ef0-b4fa-7e06bc1d4daa.jpg)

- Tuy nhiên, nếu bạn lựa chọn thay đổi option này thì có thể sẽ phải chờ tới 24h để thay đổi này được áp dụng.
> Optionally, to enforce HTTPS encryption for your site, select Enforce HTTPS. It can take up to **24 hours** before this option is available.


### 4. Off site để tiến hành "bảo trì"
- Để có thể tạm ngừng public website của bạn lên internet, bạn có thể vào phần **Settings** của repository, kéo xuống phần Github pages gần giống như ở mục 1. Ở phần chọn nhánh (branch) thì bạn có thể chọn option **None** ở dưới cùng rồi **Save** lại để off website.
 ![](https://images.viblo.asia/7270c92c-ab90-4ac6-8fe4-d2e09920f75b.jpg)


### 5. Ngoài ra còn khá nhiều chức năng hay ho nữa, các bạn hãy dành thêm thời gian tìm hiểu nhé

<div align="center">
    
# Tổng kết
    
</div>

Hi vọng bài viết này đã mang lại một công cụ hữu ích cho các bạn muốn "show off" những website của mình cho bạn bè, người thân chiêm ngưỡng. Hay đơn giản là bạn đang vắt óc suy nghĩ 1 món quà đặc biệt (mang đậm chất IT), không đụng hàng dành tặng cho những người thân yêu thì đây cũng là một lựa chọn không tồi.

Lời cuối cùng, cũng sắp đến ngày **"Quốc tế hiến chương các nhà giáo 20/11"**, xin được gửi tới tất cả những **"người-lái-đò"** những lời chúc tốt đẹp nhất, luôn luôn giữ được ngọn lửa tâm huyết với sự nghiệp trồng người.

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- Github Docs: https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages