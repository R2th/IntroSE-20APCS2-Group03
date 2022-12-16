Để tối ưu ứng dụng web một cách hiệu quả, các bạn cần nắm được vòng đời của một ứng dụng, từ lúc request được gửi đi từ browser cho đến khi browser render ra ứng dụng hoàn chỉnh mà bạn có thể tương tác được.
Không có một công thức chung nào hoàn hảo nhất cho việc tối ưu, tuỳ thuộc vào tính chất của ứng dụng mà sẽ có những phương án tối ưu cho phù hợp. Giả sử như bạn đang build một trang landing page thì việc tối ưu tốc độ tải trang là điều ưu tiên nhất, một trang ứng dụng Todo thông thường thì sẽ nghiêng về optimize về mặt tính năng.
Trong bài viết này mình sẽ đi qua các giai đoạn từ lúc browser nhận được request cho đến khi browser work để render app của bạn ra như thế nào, vì tại mỗi giai đoạn sẽ có những chiến lược tối ưu khác nhau.
![codefun.dev optimize react app](https://codefun.dev/uploads/post-image-lythanhnhan27294-1567088752028.png)
Các giai đoạn trong vòng đời của một ứng dụng như sau:
* **Request** : khi bạn nhập một tên miền vào thanh địa chỉ của trình duyệt và bắt đầu gửi đi.
* **Server handle** :server nhận được request,  xử lý  và trả lại cho phía browser( thông thường đối với ứng dụng web thì nó sẽ là file html )
* **Download resource** : sau khi browser nhận được file html từ server trả về, nó sẽ phân tích file html này, tải các resource có trong file html này thông qua các tags như <script>  <link> 
* **Javascript processing** : xử lý javascript đã được tải xuống.

## Request
Khi bạn nhập một tên miền và enter, thì điều đầu tiên browser cần làm đó làm phân giải tên miền để lấy địa chỉ IP của của server đang host ứng dụng này. 
 ![codefun.dev optimize react app](https://codefun.dev/uploads/post-image-lythanhnhan27294-1567601332428.png)
Khi kiểm tra bằng [webpagetest](https://www.webpagetest.org), chúng ta phân tích bước 1 như sau:
1.  Phân giải tên miền DNS ( màu xanh đậm ): Browser sẽ kiểm tra bộ nhớ cache trên browser, nếu tên miền đã được request và cache lại thì browser sẽ đẩy request đi luôn nếu không sẽ đẩy xuống cho hệ thống.
2. Khi có đã được địa chỉ IP rồi thì browser sẽ gửi request này đến địa chỉ host ứng dụng này và bắt đầu quá trình kết nối ( màu cam )
3. SSL: quá trình handshake bắt tay 3 bước ( three-way handshake / màu hường)
4. Cuối cùng là tải file html về.

Chúng ta không có quá nhiều đất diễn ở bước này, việc phân giải tên miền và gửi request diễn ra rất nhanh, tốc độ mạng nhanh hoặc chậm sẽ không ảnh hưởng từ bước 1 đến bước 3  nhưng sẽ ảnh hưởng rất nhiều đến bước số 4.
### Tối ưu Request
Giảm size của request bằng cách giảm dung lượng cookies xuống. Mặc định với mọi request thực hiện từ phía browser thì sẽ mang theo cookies thuộc về domain đó, chỉ lưu những cookies cần thiết xuống browser thôi.

Sử dụng localStorage/sessionStorage.  Nếu như bạn làm ứng dụng React có Server-side-rendering, thì cookies chỉ lưu những thông tin tiên quyết để render ra ứng dụng, còn lại bạn sử dụng localStorage/sessionStorage để lưu trữ data. 

Prefetch DNS: là một kỹ thuật phân giải địa chỉ IP trước cho các tên miền web, được dùng để tăng tốc cho website. Nếu trong file html bạn tải tài nguyên từ nhiều nguồn khác thì Prefetch DNS sẽ giúp trang web của bạn tải về resource nhanh hơn. Lưu ý khi sử dụng Prefetch DNS là không nên Prefetch DNS có cùng domain với request, vì lúc bạn request thì tên miền đã được phân giải rồi.
## Server handle
Sau khi client phân giải được tên miền và gửi request đến server. Lúc này server chưa thực sự nhận được request từ client gửi lên. Server muốn nhận được request phải không qua một  HTTP Server ( nginx , Haproxy, Apache HTTP Server... ).
    ![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1567854476276.png)
HTTP Server giống như là một quầy tiếp tân của máy chủ  vậy, quầy tiếp tân sẽ nhận được một tập các chỉ thị xử lý khi có request vào. Khi có một request tới, quầy tiếp tân này sẽ xem trong tập chỉ thị, ứng với mỗi request đến từ client thì sẽ handle Theo tập các chỉ thị này. 

Trong trường hợp server của mình chạy ở port 3000, thì ở tập chỉ thị gửi cho tiếp tân, mình sẽ bảo với tiếp tân là những request đến từ tên miền codefun.dev thì sẽ gửi những request này vào port 3000 đang chạy ứng dụng web.
 Lúc này server nhận được request, xử lý request này và gửi kết quả xuống cho phía client. Có thể là request API, truy xuất database, render ra một trang html.
 ### Tối ưu Server handle
Cách mình hay áp dụng để tối ưu trong giai đoạn này là **caching**
* Cài đặt caching cho HTTP Server. Sau khi serve một request lần đầu, HTTP Server sẽ cache kết quả lại, lần sau khi client request vào khi hit HTTP Server, nếu có kết quả thì sẽ trả về luôn, không cần phải đẩy vào Server để xử lý nữa
* Cài đặt caching cho những function ở phía server: việc caching kết quả tính toán trên phía server rất phức tạp, bạn cần xác định input mà chỉ những input này thay đổi mới làm thay đổi kết quả của function.

 Sử dụng Redis Server để lưu trữ những data cần truy xuất nhanh và tần xuất sử dụng cao. Ví dụ như theo dõi số user online, offline trên ứng dụng, danh sách user đăng nhập quá số lần cho phép, những IP bị chặn vào ứng dụng vì spam
    
 Sử dụng GRPC để giao tiếp với những service trong cùng một hệ thống. Mình có 2 services Frontend và Backend, mọi function tính toán giao tiếp database thì Backend xử lý hết, service Frontend có nhiệm vụ chính là render thôi, nếu Frontend muốn sử dụng những function giao tiếp database thay vì cài đặt lại thì gọi những function của Backend thông qua GRPC thôi

Áp dụng kỹ thuật Server side rendering để cải thiện loadtime với những ứng dụng web (Single Page Application)

## Tải Resource
Tối với những ứng dụng web (SPA) thì bước này là quan trọng và tốn nhiều mồ hôi nước mắt nhất. Sau khi nhận được file html từ phía server, client sẽ phân tích file html, tải các resource có trong html qua các thẻ <link> <script>.

Đối với những ứng dụng web, việc render ra ứng dụng phụ thuộc rất nhiều vào javascript, nếu bước tải resource này chậm thì ứng dụng phải đợi rất lâu mới render ra được.
![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1567931720468.png)
 Khoảng 1,5s đầu browser mới bắt đầu render ra ứng dụng của mình, sau và phải đến giây thứ 3 mới tải xong ứng dụng ( ở step9). Nếu như Codefun không sử dụng server-side-rendering thì phải đến giây thứ 3 ứng dụng mới bắt đầu được render ra.
### Tối ưu thời gian tải resource
 Enable Gzip, Cache trên phía server.

 Uglify code và nén resource.  Nếu bạn đang xài webpack thì có thể sử dụng compression-webpack-plugin hoặc compression middleware của Nodejs. Kết quả dưới đây dung lượng file sẽ giảm đáng kể.
```javascript
    // bật chế độ mode='production' config webpack khi build + deploy production
{
  devtool: 'source-map',
  target: 'web',
  mode: 'production',
}
```
[Codesplit](https://reactjs.org/docs/code-splitting.html), tách script ra từng file chunk nhỏ, sau đó chỉ tải về những file chunk script, css có ý nghĩa về.
    
![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1568130149869.png)
    
Preload/Prefetch resource. Trước khi parse file html, browser sẽ Scan qua toàn bộ file html, sau đó sẽ preload trước script trong file html, sau đó đến quá trình parse html khi nào đụng những script trên thì chỉ lấy ra xử lý thôi.
![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1569063575190.png)

Sử dụng [React-Helmet](https://github.com/nfl/react-helmet) để tải scripts cần cho một component cụ thể. Lazyload những script  khi ứng dụng đã được render ra hoặc load script khi ứng dụng đã render ra.
 ```javascript
 const [loaded, error] = useScript('https://codefun.dev/assets/scripts.js');
 ```
 Async downloading.  Quá trình parse html và tải resource diễn ra đồng bộ, tức là khi tải  script xong => thực thi script => tiếp tục parse html và tải script khác xuống. Tuy nhiên nếu bạn thêm thuộc tính async/defer script, browser sẽ không block và tiếp tục quá trình parse html.
    ![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1568300078226.png)
    
   Script khi được tải async
    
  ![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1568300127466.png)
    
   ##  JavaScript Processing
Sau khi tải scripts về, browser sẽ bắt đầu quá trình parse => compile => execute, như vậy càng ít JavaScript được tải về thì browser sẽ xử lý JavaScript càng nhanh.
![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1569062781905.png)
    
  Đối với những ứng dụng React, Component sẽ được render ra sau khi file bundle được tải về, quá trình render chủ yếu dựa vào JavaScript. Việc optimize javascript với những ứng dụng web là điều quan trọng nhất.
 ### Tối ưu JavaScript Processing
  Đối với 1 Route (Page) chỉ tải những script cần thiết xuống, sử dụng [Webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer), [bundle-buddy](https://github.com/samccone/bundle-buddy) ... để phân tích resource, thay thế những script nặng và loại bỏ những script không sử dụng.
    
  ![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1569064865468.png)
   
  Lazy-load Component/Route khi có thể.
    ![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1569064748935.png)
    
   Sau khi lazy-load components
    ![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1569064771558.png)
    
   Code split, băm bundle thành nhiều file nhỏ, và chỉ tải về khi cần.
   ![](https://codefun.dev/uploads/post-image-lythanhnhan27294-1569065309768.png)
    
   Chỉ sử dụng React ở phía server đối với những page ít tương tác (Microsite, Landing Page )
    
   > Netflix chỉ sử dụng React cho phía server side với những trang landing page. Cải thiện TTI (Time To Interactive) lên 50%.
  
   ## Kết bài
  Optimize là một hành trình dài, không phải chúng ta optimize tại một thời điểm là xong. Những công nghệ mới được sinh ra, công nghệ cũ thì update, mọi thứ thay đổi từng ngày để tự optimize cho chính bản thân nó, kéo theo ứng dụng được build trên những công nghệ này cũng phải thay đổi để thích nghi, tận dụng tối đa sức mạnh công nghệ đó mang lại, vậy nên hãy luôn sẵn sàng để học hỏi, sẵn sàng để thay đổi.
  ## Nguồn
   https://codefun.dev/@lythanhnhan27294/nhung-nguyen-ly-dang-sau-viec-toi-uu-mot-ung-dung-react-1482174216?utm_source=viblo&utm_medium=organic&utm_campaign=traffics