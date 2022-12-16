Trong quá trình đi làm, nhất là nếu làm frontend thì chắc chắn sẽ có một lúc nào đó các bạn bị Chrome (trình duyệt nói chung) chửi vô mặt những thứ đại loại liên quan đến cái của nợ Access-Control-Allow-Origin header.

Tôi đã từng nghĩ đại đa số các bạn làm Web developer đều hiểu cái này rồi nhưng sự thật không hẳn là như vậy. Sau khi tổ chức một cuộc điều tra nho nhỏ, thì có vẻ như các bạn backend hiểu về CORS nhiều hơn là frontend. Và có kha khá bạn không hiểu, hay hiểu một cách mơ hồ, không thể giải thích được về CORS.

Và vì thế, tada, tôi viết bài viết này để lỡ chẳng may có bạn nào chưa hiểu thì cũng có thể vớt vát được chút xíu sau khi đọc xong!

## Sinh ra CORS chi cho phức tạp vậy?
Mọi việc trên đời này xảy ra đều có nguồn cơn của nó và cái của nợ CORS cũng không ngoại lệ.

Đầu tiên phải nói đến same origin policy, đây là một security concept quan trọng được hiện thực trên các thể loại trình duyệt nhằm ngăn chặn JavaScript code có thể tạo ra những request đến những nguồn khác với nguồn mà nó được trả về (ví dụ đơn giản như request tới những domain khác), và cách để so sánh same origin được mô tả ở đây, tuy nhiên để nói một cách đơn giản thì domain sẽ phải giống nhau từ đầu tới cuối từ protocol đến host, port.

Tại sao việc này nguy hiểm, thì các bạn cứ nghĩ đơn giản, nếu các bạn vô Facebook, trong khi đó ở một tab khác các bạn mở một trang web chứa mã độc. Tab Facebook sử dụng JavaScript để request lên server, nếu không có same origin policy, JavaScript ở web chứa mã độc kia cũng có thể tạo request lên server của Facebook với resource của tab Facebook, vì thế trình duyệt phải có cơ chế để phân biệt JavaScript của nguồn nào thì được access vào resource của nguồn nào.

Okay, đó là cách để bảo vệ người dùng, tuy nhiên thì nó gây ra không ít hạn chế cho việc giao tiếp giữa client và server mặc dù chúng đều là những nguồn có thể tin tưởng được (ví dụ client là portal.codeaholicguy.com và server là api.codeaholicguy.com, hai domain này chắc chắn là không same origin rồi).

CORS (hay nói một cách giông dài là Cross-Origin Resource Sharing) là một kĩ thuật được sinh ra để làm cho việc tương tác giữa client và server được dễ dàng hơn, nó cho phép JavaScript ở một trang web có thể tạo request lên một REST API được host ở một domain khác.

## Cơ chế hoạt động của CORS như thế nào?
Trong trường hợp đơn giản nhất, phía client (tức là cái web app chạy ở browser đó) sẽ tạo request GET, POST, PUT, HEAD, etc để yêu cầu server làm một việc gì đó. Những request này sẽ được đính kèm một header tên là Origin để chỉ định origin của client code (giá trị của header này chính là domain của trang web).

Server sẽ xem xét Origin để biết được nguồn này có phải là nguồn hợp lệ hay không. Nếu hợp lệ, server sẽ trả về response kèm với header Access-Control-Allow-Origin. Header này sẽ cho biết xem client có phải là nguồn hợp lệ để browser tiếp tục thực hiện quá trình request.

Trong trường hợp thông thường, Access-Control-Allow-Origin sẽ có giá trị giống như Origin, một số trường hợp giá trị của Access-Control-Allow-Origin sẽ nhìn giống giống như Regex hay chỉ đơn giản là *, tuy nhiên thì cách dùng * thường được coi là không an toàn, ngoại trừ trường hợp API của bạn được public hoàn toàn và ai cũng có thể truy cập được.

Và như thế, nếu không có header Access-Control-Allow-Origin hoặc giá trị của nó không hợp lệ thì browser sẽ chửi vào mặt chúng ta.

## Vẫn chưa hết đâu, các bạn phải biết về Pre-flight requests nữa!
Khi bạn thực hiện những request ảnh hưởng tới data như POST, PUT, DELETE, etc thì browser sẽ tự động thưc hiện một request gọi là preflight request trước khi thực sự thực hiện request để kiểm tra xem phía server đã thực hiện CORS hay chưa, cũng như để biết được rằng request này có hợp lệ hay không. Ngoài ra thì nếu bạn có thêm những custom header vào trong request thì việc gửi một preflight request cũng là cần thiết.

Preflight request được gửi lên server với dạng là OPTIONS (đây là lý do tại sao khi bạn debug ở client bạn thường thấy có hai request giống nhau nhưng khác request method, một cái là OPTIONS một cái là method thật sự bạn muốn gửi).

Ví dụ bạn muốn gửi request DELETE lên server. Browser sẽ tự tạo một request OPTIONS sẽ hỏi xem server có cho phép việc gửi request DELETE hay không. Nếu server cho phép, nó sẽ gửi về response đính kèm những header như Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Max-Age, etc.

Access-Control-Allow-Methods: mô tả những method nào client có thể gửi đi.
Access-Control-Max-Age: mô tả thời gian hợp lệ của preflight request, nếu quá hạn, browser sẽ tự tạo một preflight request mới.
Sau đó browser sẽ có thể gửi request DELETE và nhận response như bình thường. Và ngược lại, browser sẽ chửi vào mặt bạn.

## Kết luận
Và đó là tất cả những gì tôi biết về CORS, hy vọng nó sẽ giúp ích được cho các bạn, cũng như lý giải được thắc mắc của một số bạn về CORS từ trước đến giờ.

Một số nguồn các bạn có thể tham khảo thêm:
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS