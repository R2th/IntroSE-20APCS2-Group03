## Introduction
Điều hướng trong ứng dụng có tính chất như là một con vật nuôi. Nó có vẻ vô hại và bị xem thường, tuy nhiên nếu bạn không cô lập nó một cách đúng đắn, nó sẽ sớm để lại những điểm xấu xí của mình trong toàn bộ mã nguồn.
Thời điểm đầu năm, tôi tham gia vào một dự án cho một ứng dụng giao thức ăn.  Tôi đã không tham gia vào việc thiết kế cũng như phát triển của ứng dụng, nhưng đã tham gia vào việc hỗ trợ công việc. Điều đó có nghĩa là tôi đã có thể xem xét codebase với lợi thế ở cả việc suy xét lại và những góc nhìn từ bên ngoài, mang lại cho tôi một lợi thế gấp đôi trong việc trở lên thực sự thấu hiểu về nó. Và điều hướng dưới quan điểm của tôi là một mớ hỗ độn.

Để rõ ràng hơn, tôi không cố gắng nhạo báng bất cứ đồng nghiệp nào của mình, React Navtive đã trải qua rất nhiều thay đổi trong quá trình phát triển củamình, và mọi người vẫn tìm ra những vấn đề; một khái niệm điều hướng thống nhất có vẻ là vấn đề cuối cùng trong suy nghĩ của mọi người. Tuy nhiên, luôn có những giá trị khi nhìn lại làm thế nào một công việc nhất định có thể được xử lý một cách tốt hơn.

Do đó, hãy xem xét việc bạn vượt qua điều này như thế nào. Cũng như chú ý rằng mô hình này là không bị giới hạn ý nghĩa đối với React Native; Nó là một mô hình thông thường cái có thể được áp dụng cho bất cứ ứng dụng cái sử dụng việc điều hướng dựa trên các màn hình.

## The Problem
Các trường hợp của ứng dụng của chúng ta tồn tại một vài luồng màn hình được định nghĩa tốt. Khi người dùng cần đặt hàng, họ sẽ bắt đầu với màn hình lựa chọn người bán, rồi di chuyển tới màn hình danh sách người bán, màn hình xác nhận đặt hàng, và cuối cùng là một màn hình xác nhận kết quả đặt hàng thành công. Quá trình login hay sign up cũng có luồng của riêng nó nhằm thực hiện chính xác quá trình chỉnh sửa các chức năng.

<div align="center"><img src="https://images.viblo.asia/8d9f9802-5afc-431b-92b3-a77c84921019.png" /></div><br />

Bộ phận đầu tiên là các màn hình có thể là một phần của rất nhiều luồng khác nhau. Ví dụ, người dùng có thể lưu lại một địa chỉ giao hàng mới từ cả màn hình settings lẫn màn hình xác nhận đặt hàng. Ứng dụng cũng có một danh sách các chén đĩa mà người dùng đã đặt hàng hiện tại, cùng với một button cái đưa họ với menu của nhà cung cấp một cách trực tiếp, với những chén đĩa đã nằm trong giỏ hàng, chúng có thể được loại bỏ một cách dễ dàng ở giữa luồng đặt hàng.

<div align="center"><img src="https://images.viblo.asia/d39cfe7a-aed0-44b9-9f27-094351f3f971.png" /></div><br />

Điển hình là, tất cả điều này được xử lý bởi chinshc ác màn hình của chúng. nếu một màn hình là một phần của nhiều luồng khác nhau, hoặc nếu bạn cần start nó ở giữa một luồng bất kì, bạn phải thêm nó vào tất cả các nhánh và chuẩn bị dữ liệu ở trước và sau đó. Bạn có thể phân tách mã nguồn thành một lớp view và một lớp logic, nhưng cuối cùng thì nó vẫn là mã nguồn của màn hình.

Rồi có cả quá trình duy trì dữ liệu, bởi vì trong suốt quá trình thực thi luồng, mỗi màn hình đóng góp một điều kiện chi tiết cái là cần được lưu lại để tái sử dụng. Trong luồng đặt hàng, người dùng trước tiên sẽ chọn nhà cung cấp, rồi chén đĩa, rồi địa chỉ giao hàng, cho đến khi tất cả các thông tin được đóng gói lại và gửi tới server thông qua một API. Cho đến thời điểm đó, những mảnh nhỏ này cần được thu thập ở một nơi nào đó.

<div align="center"><img src="(https://images.viblo.asia/eb995287-7537-4f43-b592-6125772a5f83.png" /></div><br />
Bạn có thể thử truyền vòng tròn một đối tượng duy nhất từ màn hình đầu tiên  tới cái tiếp theo(Giữ trong tâm trí rằng các luồng khác nhau sẽ thu thập dữ liệu khác nhau, do đó, hay hình dung một cách vui vẻ về công việc đó trong bản thảo); hoặc nếu ứng dụng sử dụng Redux, bạn có thể push mọi thứ vào một trung tâm lưu trữ và làm cho nó có thể được truy cập từ tất cả các màn hình(Tạo ra các biến toàn cụ là một việc làm cần thiết).

Cuối cùng, bạn đã lấy được tất cả những thứ được tính toán, và đây là một vụ nổ cuối cùng: Tạo một phiên bản của ứng dụng cái có thể được cấp phép cho một nhà cung cấp duy nhất. Khi người dùng bắt đầu một quá trình đặt hàng, màn hình lựa chọn nhà cung cấp được bỏ qua, và chúng được thay thế trực tiếp bằng màn hình lựa chọn chén đĩa. Như vậy, về cơ bản, bạn cần thay đổi hành vi theo mỗi tương tác cái bắt đầu một luồng đặt hàng mới. Có một cái trên màn hình home, một cái trong danh mục hamburger, cộng thêm việc bắt đầu một quá trình đặt hàng tự động khi người dùng đăng kí, và... nó là tất cả. Có thể là như vậy. Nó sẽ đến trong quá trình kiểm thử.

Hãy thử một cái gì đó khác.

## The Concept
Theo định nghĩa, một state machine là:

***một thiết bị cái có thể là một số lượng thiết lập của các điều kiện ổn định phụ thuộc vào điều kiện trước đó và các giá trị hiện tại của các giá trị đầu vào.***

Trong điều kiện cụ thể, điều này có nghĩa là một đối tượng cái phản hồi với quá trình gọi bất cứ phương thức nào được quản lý bởi một biến cục bộ(Gọi là state), giá trị của cái này bị giới hạn bởi một thiết lập được định nghĩa rõ ràng. Một ví dụ thông thường có thể là đối tượng media playback, các trạng thái của nó có thể được ánh xạ với một flowchat giống như bên dưới:

<div align="center"><img src="https://images.viblo.asia/a43dc54e-c03a-461d-a933-9aac0e26b028.png" /></div><br />

Phương thức cụ thể được gọi như là một đối tượng chỉ có hiệu lực trong các states(trạng thái) cụ thể.
Quá trình gọi **play()** trong bất cứ sate khác **Stopped**, hoặc **setSource()** trong bất cứ cái nào khác **Created**, có thể hoặc lỗi một cách thầm lặng, hoặc phát ra một exception. Phương thức có hiệu lực được gọi thường sẽ thay đổi trạng thái của đối tượng.

Cụ thể, các phương thức của một đối tượng state machine sẽ tuân theo mô hình bên dưới:

1. **Validation**: Xác định nếu phương thưc được gọi là có hiệu lực trong trạng thái hiện tại cảu đối tượng, nếu không, return hoặc phát ra một exception.
2. **Execution**: Thực hiện bất cứ tác động phụ cần thiết.
3. **Transition**: Thay đổi trạng thái(state) của đối tượng.
4. **Result(tuỳ chọn)**: Trả về kết quả của một hoạt động bất kì.

State machines có thể được triển khai dưới nhiều hình thức khác nhau. Giải pháp cơ bản nhất là định nghĩa một enum với các states có thể của đối tượng, và sử dụng một phần tử của loại enum đó:

```
enum State = {
  Created,
  Loading,
  Stopped,
  Playing,
  Discarded,
};

class MediaPlayer {
  private state = State.Created;

  play(): boolean {
    // Validation
    if (this.state !== State.Stopped) {
      console.warn('play() called in invalid state');
      return false;
    }

    // Execution
    this.startPlayback();

    // Transition
    this.state = State.Playing;

    // Result
    return true;
  }
}
```

Điều này phụ thuộc vào ngôn ngữ mà bạn đang sử dụng, bạn cũng có thể có khả năng sử dụng con trỏ hàm(function pointers) hoặc một lớp cục bộ nhằm gói gọn các trạng thái hành vị một các cụ thể hơn. Hiện tại quá trình triển khai thực sự là không quan trọng.

## The Application
Ý tưởng cơ bản là thêm vào một lớp điều kiện giữa các screens và các đối tượng điều hướng, với mục đích là gói gọn tất cả logic cho luồng hiện tại. Thay vì mỗi màn hình xác định một cái sẽ được hiển thị tiếp theo một cách độc lập, chúng chỉ ra tín hiệu với đối tượng luồng, truyền một vài dữ liệu một các tùy chọn như là kết quả của chúng, như là thu thập dữ liệu đầu vào từ người dùng. Nó là flow object(đối tượng luồng) cái sẽ kiểm tra dữ liệu này, xác định cái gì là cần thiết để thực hiện tiếp theo, và di chuyển tới một màn hình phù hợp.

<div align="center"><img src="https://images.viblo.asia/2b2affdd-761c-44a0-b623-07447dceca03.png" /></div><br />

State machines thích hợp với chúng ta nhằm dễ dàng xử lý vấn đề này, machine ở đây là flow object, và state hiện tại của nó là màn hình hiện tại. Khi một screen mới được hiển thị, flow object truyền cho nó một callback; screen có thể sử dụng callback này khi mục đích của nó đã được thực hiện xong. Bên trong, phương thức callback sẽ theo sát mô hỉnh cơ bản tương tự với những gì nêu trên:

1. Validation: kiểm tra dữ liệu nhận được từ màn hình.
2. Execution: đảm bảo dữ liệu liên quan cho quá trình lưu trữ cục bộ của flow object, hoặc thực hiện một vài hoạt động không trực tiếp cái dàng buộc chính màn hình của nó.
3. Transition: Di chuyển tới màn hình mới, truyền các callback functions và bất cứ điều kiện dữ liệu có thể được đòi hỏi trong quá trình khởi tạo của chính nó.

Ví dụ, ở đây trình bày bạn có thể viết các callback functions nhằm xử lý các lựa chọn của người dùng từ danh sách nhà cung cấp như thế nào(công thêm một số functions hỗ trợ điều kiện) trong luồng đặt hàng:

```
interface IScreen {
  setCallback(callback: Function);
  display(data: any);
}

class BasicOrderFlow {
  private screen: IScreen;

  private orderDetails = {
    vendorId: null,
    dishes: [],
    address: null,
    paymentType: null,
  };

  showScreen(newScreen: IScreen, callback: Function, data: any) {
    this.screen = newScreen;
    this.screen.setCallback(callback);
    this.screen.display(data);
  }

  /** Callback function passed to the vendor selection screen */
  selectVendorCb(vendorId: string) {
    // Validation
    if (!this.isValidVendorId(vendorId)) {
      console.warn('Invalid vendor ID:', vendorId);
      return;
    }
    
    // Execution
    this.orderDetails.vendorId = vendorId;
    
    // Transition
    this.showScreen(
      new SelectDishScreen(),
      dishes => this.selectDishCb(dishes),
      { vendorId },
    );
  }
  
  /** Callback function passed to the dish selection screen */
  selectDishCb(dishes: string[]) {
    // Etc...
  }
}
```

Một khi các screens bị dàng buộc với nhau trong các flows, sự trừu tượng về logic có thể đi tới một cấp độ cao hơn. Như kiểu làm thế nào để các screens có thể ra hiệu cho flow rằng một màn hình mới nên được nạp, các flows cũng có thể ra hiệu cho ứng dụng rằng một flow khác nên được bắt đầu. Cụ thể hơn, các flows của chính ứng dụng cũng có thể được tổ chức trong một state machine như thế:

<div align="center"><img src="https://images.viblo.asia/d0bda2d5-adb1-424f-990e-3d2642c05a03.png" /></div><br />
Khi ứng dụng được khởi chạy, nó load luồng authentication(xác thực) nếu user chưa login thành công, và luồng mặc định(Cái chỉ tồn tainj home screen) nếu có. Khi user nhấn vào "New Order" button trên màn hình home, luồng mặc định(default flow) có thể ra hiệu cho ứng dụng start luồng đặt hàng(order flow), và cứ thế.

## The Pros and Cons

Lợi thế tuyệt vời nhất đó là business logic cho ứng dụng là chính xác và hoàn toàn tách biệt. Mã nguồn của nó có thể trở nên phức tạp hơn, nhưng logic của ứng dụng thì rất đơn giản. Nếu bạn muốn hiểu cái màn hình nào sẽ đến sau đó, và với điều kiện gì, bạn chỉ cần nhìn vào một nơi duy nhất này.

Việc tập trung logic này cũng tạo cho nó khả năng thích nghi với các thay đổi. Như trong ví dụ của chúng ta, nếu bạn cần tạo một nhánh con của ứng dụng nới mà luồng đặt hàng(order flow) bắt đầu ở một màn hình khác, bạn chỉ cần thay đổi một vài dòng trong mã nguồn của luồng order, và không một nơi nào khác nữa. Quá trình tạo các luồng mới cũng có thể được thực hiện mà không cần phải thay đổi bất cứ các thành phần nào của màn hình.

Có một đối tượng duy nhất(single object) cái tồn tại trong suốt vòng đời của flow cũng tạo cho nó trở thành một ứng viên lý tưởng cho việc bảo tồn dữ liệu. Mỗi lần một màn hình trả về một kết quả, flow có thể lựa chọn lưu trữ nó, rồi nó có thể truyền tất cả hoặc một phần dữ liệu đã được lưu trữ đó tới một màn hình mới hoặc một flow mới.

Về mặt nhược điểm, quá trình thêm vào một lớp(layer) mới cho bất cứ kiến trúc nào chắc chắn sẽ mang đến cả đống chi phí, cũng như làm cho mã nguồn trở nên phức tạp hơn trong việc nắm bắt tổng thể. Tuy nhiên, chúng tôi thấy rằng các thức sử dụng state machine nhằm điều hướng mang tới nhiều lợi thế hơn là việc tăng thêm độ phức tạp.

## Source
https://itnext.io/better-navigation-with-state-machines-6c917866f351
## References
[The Rise Of The State Machines](https://www.smashingmagazine.com/2018/01/rise-state-machines/)
[Architecture Components: Easy Mapping of Actions and UI State](https://android.jlelse.eu/architecture-components-easy-mapping-of-actions-and-ui-state-207663e3fdd)
[Discovering Event-Driven Architecture for Android](https://proandroiddev.com/discovering-event-driven-architecture-for-android-717e6332065e)
[A View State Machine for Network Calls on Android](https://thoughtbot.com/blog/android-networking-view-state)
[Finite State Machines + Android + Kotlin = Good Times](https://thoughtbot.com/blog/finite-state-machines-android-kotlin-good-times)

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))