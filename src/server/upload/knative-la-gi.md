# Knative

(Bài sau sẽ có demo sử dụng Knative trong 5 phút).

Knative là một extension cho k8s, giúp chạy các service dưới dạng serverless. 
Hiểu đơn giản là thế nhưng thực sự nó rất mạnh. nhiều tính năng hay ho. mà mình đã sử dụng nó trong vài năm qua

Trước khi bắt đầu giới thiệu đến cách thành phần cũng như khả năng của `knative` thì mình giới thiệu sơ qua một số `keyword` các bạn search google hiểu rõ hơn về các `keyword` này nhé.(Cái này cho mấy bạn chưa biết chưa nghe bao h dễ hiểu hơn thôi)

- Kubernetes `k8s` : đơn giản nó quản lý, phân phổi ... các container của Docker. Hiện này hầu hết các ông lớn Google, Facebook, Neflix,..... đều deploy hệ thống của mình lên K8s
- `Serverless`: nôm là nó là kiểu "Không máy chủ" như tên gọi của nó, nó giúp nhà phát triển ko quan tâm đến vận hành, quản lý server.

Thông thường khi chạy một or nhiều service trên `k8s` bạn setting khá nhiều thứ domain-mapping, scale,.....
những vấn đề này thường do `infra` đảm nhiệm. mà đi tìm hiểu nó thì lại ko tập trung vô code được. đó chính là vấn đề để `Serverless` là đời

Hoang mang chưa hiểu rõ đi tiếp đến 2 thành phần chính của Knative nhé

**Bài viết được viết dưới góc độ không phải quả kỹ thuật or chính xác như sách =]]. Nhưng nó giúp các bạn dễ tiếp cận để hiểu sau đó tự `mần mò sau`**

## Serving

Khi bạn deploy một service nên k8s qua `Knative` thì service đó sẽ được gọi là `Knative service`.
Bạn có thể dụng lệnh `kubectl get ksvc -n $namespace` để kiểm tra các service có hoạt động hay không ?

Sau đây là các thành phần chính của nó 

- `Configuration`:  xác định và duy trì trạng thái của một dịch vụ. Nó cũng cung cấp tính năng quản lý phiên bản: Mỗi sửa đổi đối với cấu hình sẽ tạo ra một phiên bản mới của dịch vụ và các phiên bản trước đó sẽ được lưu lại. (copy)
   Có thể ví dụ dễ hiểu hơn qua 1 số trường hợp như sau:
       - Hiện bạn đang chạy một ver 1. và sau khi thêm tính năng, fixbug version mới là 2. thì khi deploy nên bằng một cách nào đó 2 không chạy mặc dù đã test. thì với `Knative` chỉ khi nào v2 thực sự chạy lên được nó mới chuyển hướng người dùng từ v 1 sang v2 -> điểu đó có nghĩa dịch vụ bạn không bị sập.
       - Hoặc khi v2 lên có vấn đề nào đó. và Sếp muốn switch lại v1. thì với Knative chỉ trọng một nốt nhạc.

- `Intelligent service routing`: Trên là thiệt lập dưới đây là sử dụng thiết lập đó để điều khiển
    Ví dụ một số case nhé
    - A/B testing: thằng bạn nó bảo mình code lởm, mình cũng bảo nó code lởm. thế với `Knative` deploy được cả 2 phiễn bản của mỗi thằng cả `thằng mình nữa =]]` mỗi bạn có thể sài ngôn ngữ khác nhau  ....
      Sau đó chi lượng truy cập người dùng đều sang cả hai phiên bản, sau đó dựa trên log, monitor xem code thằng nào chạy nhanh hơn, ít tốn `CPU` `GPU` hơn ...
      => Đây cách facebook hay làm để mang các bản thử nghiệm đến một nhóm người cụ thể sau đó mới quyết định phát hành chính thức
    - Hoặc chung ta code được modul mới. nhưng chưa tự tin hoặc chưa chắc chắn như service thanh toán chẳng hạn. chúng ta sẽ chia lượng truy cập vào service này 10% thôi. khi mọi thứ ổn định thì sẽ release chính thức.

- `Autoscaling`: **Mình phải nói WOW nó cũng là lý do mình đến với Knative**
    - Đây cũng chính đặc trưng chung của `serverless` nó giúp scale service từ `0` đến `vô cực` "trong mức cloud hỗ trợ nhé". và cũng scale `vô cực` về `0`
    Ví dụ dễ hiểu hơn nhé
    - Với các hệ thống thi tín chỉ ở trường đại học là cái case điển hình. lúc éo có ma nào vào. như đêm, lệ hội .... lúc thì chen lấn sô đẩy. f5 liên tục. thế Knative giúp đc gì ?
        Hiện mặc định mỗi service khi deploy lên sẽ đảm nhận 100 kết nối cùng lúc và khi đạt 70% tức 70 kết nối cùng lúc nó sẽ tự nhân bản nó để đám ứng lên 200 lượt truy cập cùng lúc ...... và cứ thế khi nào max giới hạn của cloud
        Nhưng khi ko có ai sử dụng trong vòng 1 phút. thì các nhân bản đó sẽ lăn ra chết....chết đến cả thằng chính. lúc này service scale về 0 đó. khi không có ma nào vô.
        Lúc này nghĩ mình chỉ trả tiền hệ thống khi có người sử dụng và ngược lại. quá tiết kiệm -> search `Serverless` hiểu chính xác nhé
    - Một ví dụ khác về background job như xử lý phim, ai ... thì thanh vì scale theo lượng truy cập thì sẽ theo CPU và GPU hay Ram chẳng hạn.

## Eventing

Thật sự bây giờ là `awesome` kiểu như tất cả trong một ý =]]
Chắc sẽ kể một số case thay vì nó làm việc như nào, để các bạn tự research vì những điều đó thường được viết nhiều

- Xử lý image khi sau khi upload thành công lên S3/Object stored
    1. Sẽ đăng ký một event source từ `S3/Object stored` khi có file mới gửi sự kiến đến Knative. từ đây đăng ký Trigger có thể filter đc theo dữ liệu đầu vào như file gì, dung lượng ra sao để chạy đến một service xử lý data phù hợp. VD với image sẽ resize lại ảnh. với video encode lại....
    2. Gửi email chúc mừng sinh nhật -> đăng ký event định kì hàng ngày. truy vấn vô db xem ai sắp sinh nhật rồi trả lại danh sách đó. sau đó gửi danh sách đó đến một service gửi email.
    3. Case thanh toán: khi user nhập thẻ Visa xong sẽ gửi đi 3 event chẳng hạn: 1. check thẻ hợp lệ. 2. check tồn kho, 3. check thông tin vận chuyển. sau đó kết hợp 3 dữ liệu đó lại.

Và điều đặc biệt từ các ví dụ trên là các subscription nhận sự kiện để xử lý đều là `Knative service` -> điều đó có nghĩa khi ko có sự kiện thì service đó ko chạy. và có sự kiện thì mới chạy
Nhiếu sự kiện cùng một lúc thì scale-up các service đó lên. đó cách các sàn thương mại điện tự làm để chống quá tải trong các dịp flash-sale, or hourly-sale.

## Other

Trên là những thành phần chính. dưới đây những thành phần quan trọng không kém

#### Domain mapping

Mặc định khi deploy một service mới. knative tự động gán cho nó một domain với format

`service-name`.`namespace`.`root-domain`

Ví dụ mình có domain gốc là `sun.dev` namespace là `staging` khi deploy một service tên là `api` thì full uri sẽ là 

`api.staging.sun.dev`

**Custom domain**: Knative cũng hỗ trợ điều này. thay vì gán domain tự động như trên


#### Auto HTTPS

Phải gọi trên cả tuyệt vời. bạn có thể tự add cert vào or để knative lấy cert free trên letsencrypt cho bạn

như trên là sẽ có `https://api.staging.sun.dev`

#### Private Service

Giả dụ mình có 3 service. nhưng chỉ có 1 service cung cấp ra ngoài. các service trong chỉ là function cho service public kia
Thự tế: user có thể truy cập api /order nhưng ko thể truy cập vào api xử lý giao dịch,... mặc dù các service này cũng cung cấp giao tiếp rest

#### Support

Hỗ trợ các kết nối `gRPC` `websocket` `http2`

Trên sơ lược hiểu nhanh `Knative` bạn có thể nghiên cứu sâu hơn tại https://knative.dev/docs/
và chờ phần hai sẽ xem demo và các case thự tế nhé