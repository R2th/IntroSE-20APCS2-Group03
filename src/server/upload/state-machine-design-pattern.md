## Introduction
Mô hình State Machine là một trong những mô hình truyền thống trong khoa học máy tính. Nó là một trong những mô hình ảnh hưởng tới cuộc sống hàng ngày của chúng ta thông qua các phần mềm khác nhau. Nó không phải là một quá trình xây dựng mã nguồn hướng theo mô hình thiết kế(design pattern), nhưng nó là hệ thống hướng, hầu hết sử dụng model xoay quanh các trường hợp nghiệp vụ.

<div align="center"><img src="https://images.viblo.asia/0c7d2151-190a-4dea-8c77-40824b791012.png" /></div><br />

## What is a State Machine in laymen terms
Hãy xem xét một tình huống đời thường rất cơ bản về việc đặt một chiếc taxi thông qua Uber:

1. Đầu tiên bạn mở App, Home screen xuất hiện, bạn đưa vào điểm đến trong thanh tìm kiếm.
2. Một khi điểm đến chính xác được tìm thấy, Uber đưa ra đề xuất về hành trình cho bạn lựa chọn giống như Pool, Primier, UberGo, Uber XL,... cùng với một giá nếu có thể.
3. Một khi bạn chọn phương thức thanh toán và nhấn vào "**Confirm**" button với đề xuất về thời gian cho hành trình nếu yêu cầu, chuyến đi được xác nhận, lái xe nhận yêu cầu.
4. Uber bây giờ đưa ra cho bạn một bản đồ, nơi bạn có thể theo dõi lái xe của mình.

Trong trường hợp này, screen 1 là độc lập, nó là màn hình đầu tiên được đưa ra cho tất cả các users. Screen thứ 2 phụ thuộc vào screen 1, nếu không được cung cấp dữ liệu có hiệu lực từ screen 1, bạn không thể di chuyển tới screen 2. Hơn nữa, screen 3 phụ thuộc vào screen 2 và screen 4 phụ thuộc vào screen 3. Một khi hành trình của bạn được xác nhận và không có việc bạn hay lái xe hủy hành trình, bạn duy trì screen 4, bạn không thể đặt bất cứ hành trình mới nào cho đến khi hành trình hiện tại kết thúc.

Bây giờ, giải sử mưa nặng hạt, và không có bất cứ lái xe nào chấp nhận hành trình của bạn, hoặc không có lái xe được tìm thấy trong khu vực của bạn nhằm thỏa mãn hành trình của bạn, như vậy một thông điệp lỗi thông báo cho bạn biết là không có lái xe, và bạn vẫn được giữ lại ở screen 3. Cho đến khi bạn có thể di truyển về screen 2 rồi screen 1, bạn có thể trở về màn hình đầu tiên bằng bất cứ các thức nào.

Nếu bạn chú ý một cách cẩn thận ở đây, bạn đang di chuyển thông qua các trạng thái khác nhau của một quá trình đặt xe taxi, bạn có thể di chuyển tới các trạng thái tiếp theo chỉ khi một hành động đã chắc chắn thành công ở trạng thái hiện tại. Ví dụ: Khi bạn đang ở screen 1, bạn không thể di chuyển tới screen 2 nếu bạn cung cấp một điểm đến sai, tương tự bạn không thể di chuyển tới screen 3 mà không chọn một hành trình ở screen 2, trừ khi hành trình của bạn đã được đặt, bạn luôn có thể di chuyển lại trạng thái trước đó.
Chúng ta đã phá vỡ quá trình đặt xe taxi thông qua một loạt các hành động bên trên ví dụ nơi hành động là có thể hoặc không thể có khả năng gọi tới một hành động khác phụ thuộc vào trạng thái hiện tại của quá trình đặt xe. Điều này cái mà state machine được sử dụng cho mô hình.
Về ý tưởng, tất cả các trạng thái là các tình huống độc lập, một trangjt hái có thể gọi tới trạng thái khác chỉ khi cái hiện tại được hoàn thành thông qua cả success và failure.

## State Machine in Technical Terms
State Machine mang đến cho chúng ta sự tự do phân tách một công việc lớn, phức tạp thành một chuỗi các công việc nhỏ, độc lập khác giống như ví dụ ở bên trên - Quá trình chia nhỏ các hành động đặt xe thành nhiều trạng thái nhỏ hơn. Các công việc nhỏ hơn được liên kết với mỗi cái khác thông qua các events, sự chuyển đổi từ trạng thái này sang một cái khác, thông thường chúng ta thực hiện một vài hành động cái thực hiện một số công việc như ví dụ bên trên --- Quá trình đặt xe thực tế ở back-end, quá trình sinh ra một hóa đơn, lưu trữ dữ liệu phân tích người dùng, ghi lại dữ liệu quá trình đặt xe trong kho lưu trữ, kích hoạt quá trình thanh toán khi hành trình kết thúc và rất nhiều cái khác nữa. Một hình thức thông thường cho một state machine là:

<br /><div align="center"><b>Current Sate + Some Action/Event = Another State</b></div>

## Why & When do we need State Machine
Nếu bạn có khả năng phân tách công việc lớn, phức tạp thành một số thành phần độc lập, nhỏ hơn, một state machine có thể giúp chúng ta hình dung và quản lý các đơn vị đó một cách trừu tượng hơn nơi chúng ta chỉ cần cấu hình khi nào một state có thể di chuyển qua một sate khác và chúng ta tập trung vào quá trình định nghĩa cái gì sẽ xảy ra khi một quá trình chuyển đổi xảy ra. Sau quá trình cấu hình, chúng ta không cần quan tâm tới làm thế nào quá trình chuyển đổi đó xảy ra. Chúng ta chỉ tập trung vào **khi nào** và **cái gì** mà không phải là **làm như thế nào**.
Cũng như State Machine giúp chúng ta hình dung về toàn bộ quy trình của các states một các dễ dàng dự đoán, một khi quá trình chuyển đổi được cấu hình chúng ta không cần qua tâm một cách hoàn toàn tới việc quản lý sai hoặc chuyển đổi sai giữa các states, sự chuyển đổi states sai chỉ có thể xảy ra nếu chúng ta cấu hình state machine sai cách.

Chúng ta có một cái nhìn trọn vẹn về states, transitions(quá trình chuyển đổi) trong một state machine. Nếu chúng ta không sử dụng bất cứ state machine nào, cũng như chúng ta không thể hình dùng về hệ thống của mình thông qua các states có thể khác nhau hoặc biết hay không biết về sự dàng buộc chặt chẽ của các components của mình với những cái khác, hoặc chúng ta đang viết rất nhiêu điều kiện if-else nhằm tương thích với các trạng thái chuyển đổi cái lần lượt làm cho kiểm thử đơn vị(unit tests) và kiểm thử tích hợp(integration tests) trở nên khó hơn bởi vì chúng ta phải đảm bảo việc viết tất cả các test cases nhằm kiểm tra khả năng của tất cả các điều kiện và nhánh được sử dụng.

## Benefits of State Machine
1. Bạn thoát khỏi việc các điều kiện cứng nhắc trong mà nguồn của mình. State Machine trừu tượng hóa tất cả logic liên quan đến states và transitions thay cho bạn. Trong phần tiếp theo, chúng ta sẽ khám phá một vài các thức khác ngoài State Machine nhằm tạo ra state hướng hệ thống, bạn sẽ thấy các vấn đề trong các hệ thống đó.
2. Trong thực tế, sate machines thường có một số lượng giới hạn các states và các transitions rõ ràng được định nghĩa trong các states đó, do đó nó dễ dàng trong việc theo dõi cái transition/data/event gây ra điều kiện hiện tại từ một request.
3. Các nhà phát triển có thể tập hợp một cách chính xác dưa trên quá trình định nghĩa các actions và điều kiện tiền đề sau khi một state machine được cấu hình. Với quá trình kiểm tra điều kiện và các điều kiện tiền đề một cách chính xác, sate machine tránh khỏi các hoạt động không thể xảy ra. Như trong ví dụ về Uber, một lái xe không thể nhận được khoản thanh toán trừ khi hành trình kết thúc.
4. State machines có khả năng matain cao. các hành động logic được thực hiện trong khi mỗi transition là độc lập so với cái khác. Do đó các mảnh code tương ứng có thể là độc lập.
5. Thông thường, state machines là ổn định và ít tập trung vào sự thay đổi. Do đó các trường hợp sử dụng ở hiện tại và tương lai là rất rõ ràng, nó trở nên dễ dàng để maintain đối với toàn bộ hệ thống.

## Disadvantages with State Machines
1. Thông thường, state machines được đồng bộ trong tự nhiên. Do đó nếu bạn cần các quá trình thực thi bất đồng bộ của việc thực thi gọi APIs ngầm, bạn có thể cần xem xét nhằm lựa chọn chính xác cái tốt nhất.
2. Mã nguồn có thể dễ dàng trở nên cồng kềnh. Bởi vì state machines là hướng dữ liệu, phụ thuộc vào sự khác nhau của dữ liệu và các tham số đầu vào, đội xây dựng sản phẩm của bạn có thể yêu cầu bạn thực hiện các transitions khác nhau từ cùng một trạng thái. Do đó, với những yêu cầu loại này có thể gây ra việc có vài transitions với một vài điều kiện kiểm tra ban đầu không rõ ràng. Nó hoàn toàn phụ thuộc vào sản phẩm và quá trình triển khai của state machine.
3. Nếu có đòi hỏi đối với các thể hiện cân bằng tải của state machine, chọn cái có khả năng lưu trữ lâu dài(database - persistence data), ngoài ra bạn có thể cần thêm vào lớp này cùng với các đơn vị kiểm tra sự chính xác của dữ liệu đầu vào do đó rất nhiều đòi hỏi hướng tới sự khác nhau của các thể hiện state machine có thể nhận được một kết quả thích hợp.
4. Không có nhiều tài nguyên hoặc cộng đồng sẵn sàng cho việc triển khai các state machine khác nhau, do đó sự hỗ trợ có thể không được tốt một khi bạn lựa chọn một thư viện riêng biệt.

## Things to take care when using State Mahines
Về mặt ý tưởng, nếu bạn đang sử dụng state machine hoặc workflow system, bạn nên có hai thành phần logic trong hệ thống của mình.
1. Cái thứ nhất chính là State machine/workflow system.
2. Cái thứ hai là business logic của bạn được đóng gói trong một hoặc nhiều service.
State machines/Workflow system có thể được hình dung như cơ sở hạ tầng cái hướng tới sự dịch chuyển của các trạng thái(State transition), nó xác thực tính hiệu lực của sự thay đổi từ một trạng thái sang một trạng thái khác, nó đòi hỏi hành động cấu hình trước/trong/sau một quá trình dịch chuyển(transition), nhưng nó không nên biết chính xác business logic được thực hiện trong các hành động đó, nó là trách nhiệm của các services của bạn.
Do đó về cơ bản nó là một kế hoạch thực hiện tốt nhằm tách rời state machine khỏi các business logics nền tảng bằng cách tạo sự trừu tượng phù hợp nếu không chúng sẽ tiến vào địa ngục của việc quản lý mã nguồn.
Chúng ta có thể sử dụng **if else** thay cho việc sử dụng một state machine nhằm di chuyển từ trạng thái này tới trạng thái khác khi trạng thái hiện tại đã kết thúc. Nhưng quá trình xử lý này là rất khó cho việc quản lý và một thiết kế tồi có thể kết hợp chặt chẽ vào hệ thống và có thể cung cấp ít nhất sự linh hoạt.

## Real Life User Cases
Trong thế giới thực, rất nhiều vấn đề có thể được mô hình hóa xoay quanh state machine hoặc workflow system. Một số ví dụ:
1. Quá trình đặt hàng từ một trang thương mại điện tử: Khi bạn đặt một số mặt hàng, quá trình đặt hàng đi qua các trạng thái khác nhau như: Đặt hàng, đóng gói, vận chuyển, hủy bỏ, nhận hàng, thanh toán, hoàn trả,.... Quá trình chuyển đổi xảy ra một các tự động khi mặt hàng dịch chuyển qua kho chứa hoặc các quá trình sắp xếp hậu cần và quét qua các trạng thái khác nhau khi người dùng hủy bỏ hoặc yêu cầu trả lại,....
2. Quá trình đặt thực phẩm cũng trải qua các vòng lặp tương tự.
3. Trip booking(đặt xe) cũng có luồng tương tự.
4. Mobile UI nhưng Android UI Activities, iOS Swift Activities cũng có thể xem xét xoay quanh các states và transitions. Giống như ví dụ Uber, state machine có thể xác định screen nào được shown và show khi nào phụ thuộc vào tương tác và những dữ liệu đầu vào từ người dùng. Bạn có thể trừu tượng hóa các screen activities của mình nhằm ẩn đi một số dữ liệu, hoặc kéo qua dữ liệu logic, vv,... trong một màn hình riêng biệt và state machine có thể điều hướng luồng đó.
5. React cũng cung cấp khả năng sử dụng state machine.
6. Micro-service deployment cũng có thể được mô hình hóa xoay quanh các workflow và states.

## Real Life State Machine / Workflow systems
Nếu bạn đã xác định sử dụng khái niệm về state machine, bạn được tự do lựa chọn cả đống các quá trình triển khai sẵn có. Dưới đây là một số khác biệt giữa State Machine và Workflow:
1. **Spring State Machine**: Nếu bạn không được thoải mái sử dụng một workflow system phụ hợp do lý do này nọ, bạn có thể sử dụng [Spring State Machine](https://projects.spring.io/spring-statemachine/) để mô hình hóa các use cases.
Nó tốt cho dự án nhằm bắt đầu thu về những khả năng của một State Machine. Cụ thể hơn, các khả năng đó có thể được tìm thấy ở [đây](https://docs.spring.io/spring-statemachine/docs/2.0.3.RELEASE/reference/htmlsingle/). Thông thường các start-up với những luồng nghiệp vụ không quá phức tạp có thể tiến tới sử dụng project này. Bạn phải cấu hình state, transitions, actions,... trong chính mã nguồn, hơn nữa, không có UI sẵn có nhằm tạo ra một workflow cho UI.
2. **Activiti**: **[Activiti](https://www.activiti.org/)** là một Business Process Management Engine(BPMN) mã nguồn mở cái được ưu thích sử dụng cho các workflow phức tạp liên quan đến các trường hợp sử dụng trong các hệ thống doanh nghiệp. Nó cung cấp rất nhiều khả năng nâng cao nhưng querying service, monitoring, cloud ready service, vv,.... Nó lưu lại các workflow metadata trong chính database của mình. nếu bạn có các workflow phức tạp hoặc một vài doanh nghiệp cần tự động hóa các nghiệp vụ phức tạp, activiti có thể được xem xét như là một lựa chọn. Alfresco cấp phép cho người dùng các công cụ xây dựng một cách thân thiện trên cùng của nền tảng activiti cái có thể dễ dàng được sử dụng để tạo và quản lý các workflows.
3. **Apache Airflow**: Airflow(Ban đầu là một Airbnb project) là một hệ thống workflow mã nguồn mở hướng Python. Nó có khả năng mở rộng, đóng gói module và thông điệp hướng hệ thông cao. Nó tạo ra sự dễ dàng trong việc định nghĩa các task và các phần phụ thuộc dựa vào nó. Nếu bạn có các hệ thống viết bằng python hoặc bạn có thể có đủ khẳ năng viết một dedicated workflow management system/micro service với Python, bạn chắc chắn có thể sẽ để ý đến Apache Airflow. Nó là một hệ thống được sử dụng rất rộng rãi. Tôi có thấy các công ty ETL(Công ty thu thập và tích hợp dữ liệu) sử dụng hệ thống này để mô hình hóa các công việc xoay quanh quá trình xử lý bigdata.

## Expectations from a Real life State Machine oriented system
Tôi đã sử dụng state machine trong một vài hệ thống. Do đó tôi có thể nói về một vài kịch bản trong thế giới thực cái chúng ta kì vọng được xử lý một các phù hợp khi sử dụng state machine trong hệ thống của mình:
1. State Machine không chỉ là về states, transitions, và actions. Nó cũng có khả năng nhằm định nghĩa một ranh giới giữa một state transition(sự dịch chuyển trạng thái). Giống như trong một số trường hợp, một quá trình chuyển đổi có thể thành công chỉ khi nó được kích hoạt bởi một hệ thống xác thực hoặc người dùng. Có thể có một số điều kiện như vậy. Do đó chúng ta nên có khả năng định nghĩa các logic nhằm bảo vệ một cách chính xác việc enable/disable một quá trình chuyển đổi trạng thái(state transition).
2. Trong rất nhiều trường hợp, chúng ta có rất nhiều luồng công việc được kết thúc liên quan tới cùng một thực thể nghiệp vụ cái có thể được thực hiện song song. Trong những trường hợp này, một workflow không khóa các workflows khác, chúng có thể hoặc không thể được kích hoạt cùng nhau nhưng chúng có thể làm việc cùng lúc với nhau, workflow thứ hai nhận được thông điệp kích hoạt từ một trong các states được chọn và làm việc một cách độc lập. Điều này giảm bớt trường hợp bị bắt buộc hoàn toàn bởi nghiệp vụ, rất nhiều nghiệp vụ có thể được giảm bớt các use cases.
3. Về mặt lý thuyết, workflow systems là độc lập với vùng nghiệp vụ. Do đó nhiều workflows hoàn toàn không liên quan tới các thực thể nghiệp vụ có thể được cấu hình một các tương tự trong workflow system, nó cung cấp một cái nhìn toàn cảnh về tất cả các quá trình xử lý logic nghiệp vụ thông qua các thực thể nghiệp vụ khác nhau trong hệ thống. Điều này cũng phụ thuộc vào các trường hợp nghiệp vụ cụ thể, các workflows có thể sử dụng các trạng thái chia sẻ chung.

## Problem Statement
Hãy xem xét một phiên bản đơn giản của ví dụ về vòng đời đặt xe của Uber. Vòng đời này tồn tại các states và transitions bên dưới được mô tả bằng một image. Hãy tìm hiểu các cách thức khác nhau để xây dựng hệ thống hướng trạng thái này(state oriented system).

<div align="center"><img src="https://images.viblo.asia/ce299b17-182b-4f2a-8673-9f89904e31dd.jpeg" /></div><br />

## The basic Approach
Một cách tiếp cận trực quan xuất phát đầu tiên trong tâm trí là xử lý các states và transitions thông qua những khối điều kiện **if... else...** đơn giản. Nhưng cách thức này khó mở rộng, với mỗi state/transitions eddition/deletion mới, bạn cần phải thay đổi một lượng tương đối lớn các khối **if... else .../ switch** cái điều hướng toàn bộ logic. Tham khảo mã nguồn bên dưới để thấy mã nguồn trông rối rắm như thế nào và chỉ cần hình dung về cái gì xảy ra thôi đã thấy mệt mỏi rồi. Cách thức này có thể làm việc với các states, transitions rất ít thay đổi(tĩnh), những thay đổi là rất hiếm.
Bạn nên tránh cách thức này bởi vì nó sẽ tốn một chi phí bảo trì khổng lồ. Ví dụ:

```
void manageStatesAndTransitions(Event event, InputData data) {
  State nextState = getNextState(event, data);
  
  switch(nextState) {
   case State.TRIP_REQUESTED:
    handleTripRequest(event, data);
    break;
    
   case State.PAYMENT:
    handlePayment(event, data);
    break;
    
   case State.DRIVER_ASSIGNED:
    handleDriverAllocation(event, data);
    break;
    
   case State.DRIVER_CANCELLED:
    handleTripCancellationByDriver(event, data);
    break;
    
   case State.CUSTOMER_CANCELLED:
    handleTripCancellationByCustomer(event, data);
    break;
  }
 }
 
 void handleTripRequest(Event event, InputData data) {
  
  if(event == Event.trip_requested) {
   // Check pre-conditions
   // do some work if needed...
   
   manageStatesAndTransitions(Event.payment_requested, data);
  } else if(event == Event.payment_failed) {
   showBookingError();
  }
 }
 
 void handlePayment(Event event, InputData data) {
  if(event == Event.payment_requested) {
   Payment payment = doPayment(data);
   
   if(payment.isSuccess()) {
    manageStatesAndTransitions(Event.payment_success, data);
   } else {
    manageStatesAndTransitions(Event.payment_failed, data);
   }
  } else if(event == Event.payment_failed) {
   manageStatesAndTransitions(Event.payment_failed, data);
  } else if(event == Event.payment_success) {
   manageStatesAndTransitions(Event.driver_assigned, data);
  }
 }
```

## State Pattern Approach
State patterm là một trong những mô hình thiết kế hành vi được đề xuất bởi Gang of Four. Trong partem này, đối tượng liên quan giữ các trạng thái cục bộ cái có thể thay đổi  và các hành vi của đối tượng cũng thay đổi theo một cách tương ứng.

**Charactoristics(Đặc trưng)**:
1. State chỉ ra các hành vi được định nghĩa trong các lớp khác nhau và đối tượng ban đầu ủy nhiệm quá trình thực thi của hành vi cho quá trình triển khai đối tượng của state.
2. Các States gây ra sự chuyển đổi state từ một cái qua một cái khác.
3. Tất cả các state triển khai cùng một interface cái định nghĩa tất cả behaviours/actions có thể.

Hãy mô hình hóa tất cả các states của quá trình đặt xe Uber bên trên thông qua mô hình bên dưới:

1. Chúng ta định nghĩa một interface, cái đại diện cho các hiệp ước của state. Tất cả các states sẽ triển khai những phương thức này, cái tuân theo hành vi của đối tượng ở một trạng thái cụ thể. Nếu một phương thức không được áp dụng cho một state cụ thể, state sẽ bỏ qua quá trình định nghĩa bất cứ hoạt động trong phương thức này.

```
interface State
{
    void handleTripRequest();
    void handlePaymentRequest();
    void handleDriverCancellation();
    void handleCustomerCancellation();
    void completeTrip(); // Driver completes trip, Unassign the driver.
    void endTrip(); // After driver is unassigned, do driver & customer rating, take feedback etc. 
}
```

2. Chúng ta sẽ thực hiện việc triển khai cụ thể cho các states khác nhau.
**TripRequested state**:
Đây là state ban đầu khi customer yêu cầu cho một chuyến đi. Nó thực hiện phương thức **handleTripRequest** và sau khi hoàn thành quá trình khởi tạo ban đầu, nó thiết lập trạng thái thành **Payment**. Do đó state này gọi trực tiếp tới **Payment state**.

```
class TripRequested implements State {
 
 UberTrip context;
 
  public TripRequested(UberTrip ctx) {
   this.context = ctx;
  }
  
 @Override
 void handleTripRequest() {
   if(!context.tripStarted()) {
    context.setState(context.getPaymentRequestedState());
  }
 }
 
   @Override
    void handlePaymentRequest() {
     System.out.println("This state just handles initiation of trip request, it does not handle payment");
    }
    
    @Override
    void handleDriverCancellation() {
     System.out.println("This state just handles initiation of trip request, it does not handle cancellation");
    }
    
    @Override
    void handleCustomerCancellation() {
     System.out.println("This state just handles initiation of trip request, it does not handle cancellation");
    }
    
    @Override
    void completeTrip() {
     System.out.println("This state just handles initiation of trip request, it does not handle trip completion");
    }
    
     @Override
    void endTrip() {
     System.out.println("This state just handles initiation of trip request, it does not handle ending trip.");
    }
}
```

**Payment state**:
Nó xử lý yêu cầu thành toán, các trạng thái failure hoặc success. Với trường hợp success, nó thiết lập trạng thái hành trình thành **DriverAssigned**, nếu failure, nó thiết lập trạng thái hành trình thành **TripRequested**.

```
class Payment implements State {
 
 UberTrip context;
  
 public PaymentRequested(UberTrip ctx) {
  this.context = ctx;
 }
 
   @Override
   void handleTripRequest() {
  System.out.println("Payment state does not handle trip initiation request.");
   }
  
 @Override
 void handlePaymentRequest() {
   Payment payment = doPayment();
  
   if(payment.isSuccess()) {
    context.setState(context.getDriverAssignedState()); // Call driver assigned state.
   } else {
    context.setState(context.getTripRequestedState()); // Call trip requested state
   }
    }
    
    @Override
    void handleDriverCancellation() {
     System.out.println("Payment state just handles payment, it does not handle cancellation");
    }
    
    @Override
    void handleCustomerCancellation() {
     System.out.println("Payment state just handles payment, it does not handle cancellation");
    }
    
    @Override
    void completeTrip() {
     System.out.println("Payment state just handles payment, it does not handle trip completion");
    }
    
    @Override
    void endTrip() {
     System.out.println("Payment state just handles payment, it does not handle ending trip.");
    }
}
```

**DriverAssigned state**:
Khi người lái xe đã được giao cho một hành trình hủy hành trình đó, trạng thái của hành trình được thiết lập thành **TripRequested** do đó một trip request mới được bắt đầu một cách tự động. Khi driver hoàn thành hành trình, trạng thái của hành trình được thiết lập thành **DriverUnAssigned**.

```
class DriverAssigned implements State {
 
    UberTrip context;
 
    public DriverAssigned(UberTrip ctx) {
      this.context = ctx;
    }
 
    @Override
    void handleTripRequest() {
     System.out.println("Driver Assigned state does not handle trip initiation request.");
    }
 
    @Override
    void handlePaymentRequest() {
     System.out.println("Driver Assigned state does not handle payment request.");
    }
    
    @Override
    void handleDriverCancellation() {
     context.setState(context.getTripRequestedState()); // If driver cancels, go back to trip requested state & try again.
    }
    
    @Override
    void handleCustomerCancellation() {
      System.out.println("Driver Assigned state does not handle customer cancellation.");
    }
    
    @Override
    void completeTrip() {
     context.setState(context.getDriverUnAssignedState()); // Call driver unassigned state
    }
    
    @Override
    void endTrip() {
     System.out.println("Driver Assigned state does not handle ending trip.");
    }
}
```

**CustomerCancelled state**:
Khi khách hàng hủy bỏ hành trình, một hành trình mới không được đặt một cách tự động, thay vào đó, trạng thái được thiết lập thành **DriverUnAssigned**.

```
class CustomerCancelled implements State {
 
    UberTrip context;
 
    public CustomerCancelled(UberTrip ctx) {
      this.context = ctx;
    }
 
    @Override
    void handleTripRequest() {
     System.out.println("Customer Cancelled state does not handle trip initiation request.");
    }
 
    @Override
    void handlePaymentRequest() {
     System.out.println("Customer Cancelled state does not handle payment request.");
    }
    
    @Override
    void handleDriverCancellation() {
     System.out.println("Customer Cancelled state does not handle driver cancellation.");
    }
    
    @Override
    void handleCustomerCancellation() {
      context.setState(context.getDriverUnassignedState()); // If customer cancels, umassign the driver & related stuffs.
    }
    
    @Override
    void completeTrip() {
     System.out.println("Customer Cancelled state does not handle trip completion.");
    }
    
    @Override
    void endTrip() {
     System.out.println("Customer Cancelled state does not handle ending trip.");
    }
}
```

Ngoài ra, trạng thái **DriverUnAssigned** có thể được xử lý theo quá trình đánh giá, phản hồi về customer/driver và di chuyển tới trạng thái **TripEnd**. Nó không được trình bày trong mã nguồn ở đây.

**UbserTripClass**:
Lớp này mô tả tất cả các hành động có thể về một hành trình. Nó quản lý một internal state(trạng thái nộ bộ) cái được thiết lập là trạng thái độc lập của đối tượng. **UberTrip** ủy nhiệm các hành vi cho các đối tượng trạng thái độc lập.

```
class UberTrip {
 State tripRequestedState;
 State paymentState;
 State driverAssignedState;
 State driverUnassignedState;
 State customerCancelledState;
 
 // CurrentState
 State state;
 
 public UberTrip() {
  tripRequestedState = new TripRequested(this);
  paymentState = new Payment(this);
  driverAssignedState = new DriverAssigned(this);
  driverUnassignedState = new DriverUnAssigned(this);
  customerCancelledState = new CustomerCancelled(this);
 }
 
 public setState(State st) {
  this.state = st;
 }
 
 public getState() {
  return this.state;
 } 
 
 public void requestTrip() {
  state.handleTripRequest();
 }
 
 public void doPayment() {
  state.handlePaymentRequest();
 }
 
 public void driverCancelled() {
  state.handleDriverCancellation();
 }
 
 public void customerCancelled() {
  state.handleCustomerCancellation();
 }
 
 public void completeTrip() {
  state.completeTrip();
 }
}
```

## Pros & Cons of State Patern
Không có transition được định nghĩa rõ ràng trong hệ thống này. Transition được xử lý bởi chính state của nó. Các states định nghĩa các kiểm soát dựa trên một số tham số nhằm xác nhận cái có thể được gọi cho state tiếp theo hay không.
Đây là một cách thức khá là xấu, mã nguồn khá rối nhằm xây dựng một hệ thống hướng trạng thái, quá trình transitions vẫn bị xiết chặt, ràng buộc khá chặt vào các states, và các states chịu trách nhiệm gọi tới các state tiếp theo bằng cách thiết lập trạng thái tiếp theo trong context object(ở đây là UberTrip object).
Do đó về mặt logic một đối tượng state xử lý cả những hành vi của nó lẫn các transitions có thể => Đóng rất nhiều vai trò, với nhiều trách nhiệm khác nhau. Với nhiều states và transitons mới thêm nữa sẽ làm cho mã nguồn trở nên phức tạp và khó kiểm soát. Cũng như tất cả các đối tượng state phải implement các hành vi chung thông qua một interface cái được xem là không cần thiết và làm mở rộng công việc trong thế giới thực của quá trình phát triển phần mềm.
Mô hình này là tốt hơn cách thức cơ bản dựa trên **if... else.../ switch** cái bạn nghĩ đến ở đây về việc  phân tích quá trình xử lý các states của mình và phân tách các hành vi thành nhiều các states, nhưng bởi vì transitions được xử lý bởi chính states nên phương thức này khá khó mở rộng và trong thế giới thực bạn có thể vi phạm nguyên tắc **Open Closed — Open for extension & closed for Modification **

## Source
https://medium.com/datadriveninvestor/state-machine-design-pattern-why-how-example-through-spring-state-machine-part-1-f13872d68c2d
https://medium.com/datadriveninvestor/state-machine-design-pattern-part-2-state-pattern-vs-state-machine-3010dd0fcf28

## Reference
https://projects.spring.io/spring-statemachine/
https://docs.spring.io/spring-statemachine/docs/2.0.3.RELEASE/reference/htmlsingle/
https://www.activiti.org/

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))