Trong khi phát triển phần mềm, việc hiểu được quy trình nghiệp vụ của dự án đang làm là rất quan trọng. Bởi vì có hiểu được mình đang làm cái gì, làm cho ai, việc mình đang "phần mềm hóa" thay thế cho các bước nào ngoài thực tế thì mới có thể đi đúng hướng, sáng tạo theo một cách đúng đắn. 

Tuy nhiên, việc mô tả một quy trình thông qua những đoạn text thông thường sẽ cực kỳ khó hiểu, nhất là với các quy trình phức tạp. Vậy nên, để hiểu được một quy trình, ta cần phải mô hình hóa nó lên bằng những hình vẽ theo tiêu chuẩn, từ đó tạo nên những hiểu biết chung một cách đồng nhất giữa các thành viên trong team, cũng như giữa team với khách hàng. Và Business process modeling & notation (BPMN) là một dạng sơ đồ áp dụng những tiêu chuẩn nhất định để giúp chúng ta mô tả quy trình nghiệp vụ.

# 1. Khái niệm
BPMN là một phương pháp biểu đồ luồng (Flow chart), **tập hợp các ký hiệu chuẩn** dùng để **mô hình hóa quy trình của doanh nghiệp**. Thông qua BPMN, các bên liên quan sẽ đồng nhất hơn với nhau trong việc thiết kế và triển khai quy trình nghiệp vụ.

BPMN được phát triển bởi tổ chức Business Process Management Initiative (BPMI) từ 2005 và ngày càng được ứng dụng rộng rãi trong phát triển quy trình nghiệp vụ của nhiều tổ chức khác nhau.

Business Process Model and Notation (BPMN) là tiêu chuẩn toàn cầu cho mô hình hóa quy trình nghiệp vụ, là một trong những cầu nối quan trọng nhất giữa mô hình kinh doanh và công nghệ thông tin (CNTT).

Ngoài tác dụng mô hình hóa để các bên liên quan có thể hiểu được quy trình nghiệp vụ, thì ta có thể dựa vào BPMN để tìm ra những phần chưa tối ưu trong quy trình hiện đang vận hành, để từ đó có thể cải tiến các quy trình đó sao cho tốt hơn.

# 2. Các ký hiệu trong BPMN

## Pool và Lane 

Nhắc đến pool và lane, các bạn hãy hình dung theo hình ảnh này:
![](https://images.viblo.asia/3e179e4f-09c0-46be-a30d-c5a25bc00ec3.jpg)

Đúng vậy, pool và lane trong bpmn được lấy ý tưởng từ hình ảnh của bể bơi ngoài thực tế.

1 pool đại diện cho 1 tổ chức, phòng ban.

1 lane đại diện cho 1 cá thể trong tổ chức, phòng ban mà pool đại diện.

1 pool sẽ có nhiều lane.

![](https://images.viblo.asia/e95da3ec-71a4-436c-82b1-6af606f180d4.png)

## Activity

Activity thể hiện một hoạt động của một cá thể (được thể hiện bởi lane). Hoạt động này có thể đơn giản (chỉ 1 hành động duy nhất) hoặc phức tạp (tách được ra thành 1 tập các hành động khác nhau).

1 hành động đơn giản được gọi là 1 **Task**. Có rất nhiều loại task khác nhau, chúng ta có thể thấy qua hình dưới đây:
![](https://images.viblo.asia/1298ebd9-c275-46d0-954d-437768a51f6a.png)

1 tập hành động phức tạp được tách ra thành 1 **Sub-process**. Các sub-process được phân biệt với task bằng 1 giấu "+" có hình vuông bao quanh ở phía dưới của ô vuông lớn.
![](https://images.viblo.asia/6d5db3b5-79be-4bef-b096-b0e508fb1787.png)

Ngoài ra, các activity này còn có các thuộc tính, các cách đánh dấu nhằm thể hiện rõ hơn cách sử dụng activity đó.
![](https://images.viblo.asia/8a03604a-3466-44ed-bb21-48a2d32d6aac.png)

Để giải thích chi tiết từng loại một thì cần có 1 bài viết riêng, vậy nên các bạn tham khảo ở [link](https://www.visual-paradigm.com/guide/bpmn/bpmn-activity-types-explained/) này nhé.

## Flow

Flow là các mũi tên thể hiện đường đi của quy trình. Trong BPMN cũng có khá nhiều loại flow:
![](https://images.viblo.asia/11282c14-944c-4bdc-8c1f-96e02fea830f.png)

Tuy nhiên trong bài viết này, mình sẽ chỉ đề cập về ý nghĩa của 4 loại flow phổ biến:

* Sequence flow: Đây đơn giản chỉ là đường đi của quy trình, bắt đầu từ task/sub-process này đến task/sub-process kia.
* Default flow: Luồng đi mặc định của hệ thống, nếu không có gì khác thường xảy ra, hệ thống luôn đi theo đường này.
* Message flow: Thể hiện luồng thông tin được trao đổi giữa các lane hoặc pool với nhau.
* Conditional flow: flow này đi kèm với một điều kiện cụ thể, khi đạt điều kiện thì quy trình mới đi theo luồng này.

Sau đây là một ví dụ:
![](https://images.viblo.asia/41f185a5-569b-46cf-b9b1-c8051f4b2bb9.png)

## Gateway

Trong BPMN thì mỗi loại ký hiệu lại có nhiều loại con khác nhau (như activity hay flow ở trên) và gateway cũng không phải ngoại lệ:
![](https://images.viblo.asia/e0ea26b9-c39a-48ae-850b-0bedf58f21d0.png)

Tuy nhiên ta cần lưu ý đến các loại gateway sau:

### Exclusive

Đây là gateway hay được sử dụng nhất. Khi flow đi qua gateway này, nó chỉ được phép đi tiếp theo 1 trong những nhánh tiếp theo.
![](https://images.viblo.asia/83977389-0e46-4cb5-ac4a-6e03793d9c9a.png)

### Inclusive 

Tương tự như Exclusive, tuy nhiên nó được phép đi theo nhiều nhánh tiếp theo chứ không phải duy nhất 1 nhánh như exclusive. Và các nhánh sau khi xảy ra thì cần merge lại.
![](https://images.viblo.asia/6dd31097-91a5-4204-95d2-c86c8177763c.png)

### Parallel

Khi đi qua gateway này, các nhánh phải đồng thời xảy ra. Và các nhánh đều phải hoàn tất rồi mới merge lại và tiếp tục luồng.
![](https://images.viblo.asia/ef9ae0ab-19f0-481f-9979-a9d9de0fbad5.png)

### Event based

Giống hệ như Exclusive, tuy nhiên Event based gateway dựa vào sự kiện xảy ra trước đó.
![](https://images.viblo.asia/1d6c41c2-aea6-4dec-a46c-8877daec0b96.png)

## Event

Event diễn tả các sự kiện đã xảy ra, đang xảy ra hoặc sắp xảy ra trong khi thực hiện quy trình. 
Có 4 loại event, và mỗi loại event lại bao gồm rất nhiều loại con:

* Start: Xảy ra lúc bắt đầu một quy trình
* Intermediate: Xảy ra ở giữa của quy trình
* End: Xảy ra khi kết thúc quy trình
* Boundary: Event loại này được vẽ liền với hình chữ nhật của task và xảy ra gắn liền với task

Ngoài ra thì đây là các loại con của các event kể trên:
![](https://images.viblo.asia/b1a595bf-62e7-46ad-922f-4aeef0e8934d.png)

Để hiểu rõ hơn về từng loại, mọi người hãy xem ở [link](https://www.visual-paradigm.com/guide/bpmn/bpmn-events/) này.

## Artifact

Aritifact cho phép chúng ta thể hiện các đối tượng bên ngoài của quy trình hiện tại. Nhờ có artifcat, chúng ta có thể thể hiện được các dữ liệu hoặc ghi chú nhằm mô tả quy trình, hoặc sử dụng luôn các dữ liệu đó khi thực hiện task hiện tại. Artifact có 3 loại: đối tượng dữ liệu (data object), ghi chú (annotation) và nhóm (group).

Mình xin phép được trích dẫn ảnh dưới từ một blog khác:
![](https://images.viblo.asia/7b39c973-fc50-4993-ba1c-7c631484fdc7.png)

Ảnh trên đã thể hiện các đối tượng dữ liệu trong artifact. Ngoài ra ta còn có chú thích
![](https://images.viblo.asia/d1569363-bc41-4831-b12d-3154509b9970.png)

Và nhóm
![](https://images.viblo.asia/badc7cce-e5a0-4d2c-8461-477639087785.png)

# 3. Tổng kết

Vậy là qua bài viết này, chúng ta đã làm quen được với BPMN và các ký hiệu thường dùng trong nó. Hy vọng bài viết sẽ giúp các bạn hiểu rõ hơn BPMN và có thể áp dụng nó trong công việc !

## Nguồn trích dẫn:
1. https://www.orbussoftware.com/media/1100/bpmn-by-example-an-introduction-to-bpmn.pdf
2. https://www.facebook.com/bacsvn/posts/2635374053242421/
3. https://www.visual-paradigm.com/guide/bpmn/bpmn-events/
4. https://www.visual-paradigm.com/guide/bpmn/bpmn-artifact-types-explained/
5. https://thinhnotes.com/chuyen-nghe-ba/giai-ngo-cac-ky-hieu-bpmn/
6. http://tynerblain.com/blog/2006/08/01/bpmn-tasks/