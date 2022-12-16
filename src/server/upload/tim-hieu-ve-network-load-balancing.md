![](https://images.viblo.asia/2bdc8463-75f1-49c6-aa5c-d9e7ca7f0d1a.png)

# Vấn đề của các website lớn
Nếu bạn đang có 1 vài website nhỏ, ví dụ như blog cá nhân chẳng hạn, hoặc là bất cứ website nào không có quá nhiều lượt truy cập thì việc web tải chậm hay server down không phải vấn đề thường gặp phải. Mỗi ngày có tầm 100 request, không vấn đề; 1000 request, thật tốt khi được nhiều người biết đến, nhưng mình sẽ hơi lo lắng liệu 1 lúc nào đấy server quá tải rồi ngưng dịch vụ; 10000 request, một con số khá to, lúc này server tự nhiên lăn đùng ra chết thì rắc rối to.

Vấn đề nằm ở đó. Các website phải nhận rất nhiều request trong 1 khoảng thời gian ngắn rất dễ sập do quá tải, không xử lý được request, làm gián đoạn dịch vụ. Các bạn từng phải đăng ký tín chỉ đại học chắc cũng quen với việc cứ mỗi dịp đăng ký tín chỉ thì sẽ có rất nhiều bài đăng trên Facebook kêu ca: *"Không tải được trang", "Màn hình trắng tinh",  "Vừa ấn lưu thì web lại quay" "Web code như sh!t" "@!$&%&$"*... Nếu đó là 1 trang web bán hàng chẳng hạn, khi dịch vụ web bị ngừng 1 - 2 tiếng cũng là tổn thất tài chính lớn. Để giải quyết vấn đề quá tải server, chúng ta có thể sử dụng Network Load Balancer.

Vậy Network Load Balancer, hay cân bằng tải web là gì?

# Cân bằng tải web (NLB)
Cân bằng tải web là công nghệ cho phép phân phối lưu lượng truy cập đến các web server (được gọi là server pool hoặc server farm). Bằng cách này, dịch vụ web của chúng ta sẽ tránh được việc quá tải, dẫn đến ngưng hoạt động. Trước khi giải thích cách hoạt động của NLB, hãy cùng xem lại cách 1 HTTP Request hoạt động

![](https://images.viblo.asia/53318d97-6e35-4757-a48e-f88fa4fd6d59.png)

Với các website bình thường, đa số chỉ có 1 server backend. Client - trình duyệt gửi request đến Web Server -> trên Server sẽ chạy code backend, xử lý thông tin trong request, truy vấn các dữ liệu cần thiết -> gửi respond lại cho Client. Chính vì thế khi có 1 số lượng lớn request gửi tới Server trong 1 khoảng thời gian ngắn, trong đó còn có nhiều request yêu cầu Server phải xử lý nhiều thì việc phản hồi chậm, thậm chí quá tải, ngưng dịch vụ có khả năng xảy ra.

Khi sử dụng NLB thì chúng ta cần có nhiều Web Server chứa chung source code, chung tài nguyên. Các Server này sẽ tham gia chung một nhóm gọi là Cluster. Cluster này sẽ được đại diện bằng 1 IP ảo để giao tiếp với bên ngoài. 

![](https://images.viblo.asia/ee56b7cd-fd04-49c3-a50c-54c902c82468.png)

Mỗi khi có request thì NLB sẽ điều hướng request này về cho 1 server nào đó trong Cluster xử lý. Nhờ thế, khi một server chẳng may bị ngưng hoạt động thì request tiếp theo sẽ được đẩy ngay đến server khác, đảm bảo dịch vụ tiếp tục hoạt động.

NLB cũng được cài đặt nhiều thuật toán khác nhau giúp Network Load Balancer quyết định được nên chuyển tiếp request sang server nào. Sau đây là một số thuật toán phổ biến.

# Một số thuật toán cân bằng tải
## Thuật toán Round Robin

Round Robin là thuật toán NLB cơ bản nhất, chỉ chuyển tiếp dựa trên thứ tự ưu tiên của các server. Khi thêm một Server vào Cluster (mình sẽ gọi là 1 node), chúng ta sẽ phải chỉ ra thứ tự ưu tiên của server đó.

![](https://images.viblo.asia/52f1e2df-aebf-4858-b8c2-6c94ed616f55.png)

Khi có một request được gửi đến, NLB sẽ kiểm tra theo thứ tự ưu tiên từ trên xuống, server nào đang có ít kết nối hơn thì sẽ đẩy request sang server đó. Nếu tất cả các node đều có cùng số lượng kết nối thì NLB sẽ chuyển request cho node có độ ưu tiên cao nhất. 

VD: hiện tại các request đang được chuyển tiếp như sau:
- Request từ Client 1 - 3 được chuyển sang Server 1 - 3 xử lý.
- Do các Node đang có cùng số lượng kết nối, request từ Client 4 được chuyển sang Server 1 xử lý.

![](https://images.viblo.asia/99e7ea67-8617-4155-97c0-6f9d244ffa16.png)

Lúc này, request từ Client 5 sẽ được đẩy tiếp cho Server 2 xử lý.

![](https://images.viblo.asia/1f0a4074-33b7-401c-ba64-038c129471ac.png)

Nhược điểm: do chỉ phân phối theo thứ tự ưu tiên, nên có khả năng 1 server có thứ tự cao được đẩy nhiều request quá => server đó ngưng hoạt động.

### Thuật toán Weighted Round Robin
Weighted Round Robin khắc phục vấn đề của thuật toán Round Robin bằng cách đánh thứ tự ưu tiên dựa trên khả năng chịu tải của server. Khả năng chịu tải này sẽ được đánh dựa trên các thông số CPU, RAM,... của server. VD chúng ta có 3 server:
- S1: 10.10.0.11 khả năng chịu tải là 1
- S2: 10.10.0.12 khả năng chịu tải là 3
- S3: 10.10.0.13 khả năng chịu tải là 2

Khi đó thứ tự ưu tiên được xếp như sau: **S2-S2-S2-S3-S3-S1**. Có thứ tự ưu tiên rồi thì sẽ thực hiện như Round Robin bình thường.

![](https://images.viblo.asia/1e35b9c3-a167-4ae9-8058-3f960a3f8301.png)

## Thuật toán Least Connection
Least Connection hoạt động dựa trên việc tính toán số lượng kết nối **đang hoạt động** tại mỗi node mạng, và chọn ra node mạng đang có ít kết nối hoạt động nhất. Trong trường hợp số lượng kết nối của các node mạng bằng nhau thì Cluster sẽ thực hiện thuật toán Round Robin.

Thuật toán hoạt động như sau, giả sử ta có mô hình cân bằng tải với 3 node mạng:

![](https://images.viblo.asia/21641a5c-8417-4f27-84c1-34f4280ec4dd.PNG)

Lúc này, khi có lượt truy cập mới, Network Load Balancing Cluster sẽ kiểm tra thấy Node 2 đang có ít kết nối hoạt động nhất. Vì thế kết nối sẽ được đẩy sang cho Node 2:

![](https://images.viblo.asia/5c40f8f7-9647-4377-9b5a-68574a0ac639.PNG)

Giờ thì số lượng kết nối hoạt động tại Node 2 tăng lên thành 6, ngang với Node 1. Nếu tại thời điểm này tiếp tục có kết nối thì Network Load Balancing Cluster sẽ thực hiện thuật toán Round Robin. Theo đó kết nối sẽ được đẩy sang Node 1:

![](https://images.viblo.asia/e533fef5-8bcf-4301-a208-5b4043d24c3c.PNG)

Nhược điểm: do chỉ xét đến số lượng kết nối trong khi dung lượng kết nối của các node có thể khác nhau, nên vẫn có thể xảy ra trường hợp phân phối không đồng đều, 1 số Server bị quá tải.

### Thuật toán Weighted Least Connection
Weighted Least Connection khắc phục nhược điểm của Least Connection. Bản chất thuật toán vẫn là lựa chọn node mạng có lượng kết nối hoạt động ít nhất, nhưng thay vì dựa trên số lượng thì Weighted Least Connection sẽ lựa chọn dựa trên tỉ lệ phần trăm:

![](https://images.viblo.asia/48ca19eb-ebdf-4776-b494-90dd5e7cd796.PNG)

Khi có kết nối, do Node 3 mới chỉ có 5% số lượng kết nối hoạt động, nên kết nối sẽ được đẩy sang Node 3:

![](https://images.viblo.asia/1b020ee3-ddfe-4ae4-a7d9-2eef0e54800e.PNG)

## Thuật toán Resource Based
Các thuật toán như Round Robin, Least Connection chỉ khác ở cách điều hướng, còn thực tế mỗi request sẽ cần server phải xử lý và trả về thông tin khác nhau. Ví dụ: máy A request 1 lượng thông tin cực lớn (VD toàn bộ thông tin sản phẩm) trong khi máy B chỉ request thông tin về 1 sản phẩm. Cả 2 đều là 1 request, nhưng cần server tốn thời gian và tài nguyên để xử lý chênh nhau rất nhiều, như vậy thì việc chia ra các server dựa trên số lượng kết nối cũng không hoàn toàn ổn.

Resource Base sẽ giải quyết vấn đề này. Resource Based điều hướng request từ Client dựa trên tình trạng hiện tại của Server. Network Load Balancer thu thập thông tin về CPU, RAM, số lượng session đang hoạt động tại mỗi node mạng để quyết định chuyển hướng request cho Server nào xử lý. Tuy hoạt động tốt hơn, nhưng chi phí cài đặt và vận hành hệ thống Network Load Balancing cũng tốn kém hơn.

-----

*Kiến thức tham khảo từ nhiều nguồn trên mạng, được viết lại dựa trên hiểu biết. Rất mong nhận được sự đóng góp của cộng đồng nếu có chỗ nào chưa hợp lí.*