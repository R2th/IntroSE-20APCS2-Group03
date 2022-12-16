Trong thời gian gần đây, reactjs liên tục có những cải tiến đáng kể. Kiến trúc của reactjs ngày càng được hoàn thiện và tối ưu hóa, mà cụ thể nhất là hook cho phép render các pure component nhằm giảm tải lưu lượng tăng năng suất và hiệu năng của wed. Ở phiên bản này, reactjs tiếp tục được cải tiến bằng cách loại bỏ các function quan thuộc nhưng kém hữu dụng nhất của nó, khiến các dev cần phải cân nhắc lại kiến trúc trước khi code ở bản này. Trước hết, ta cần điểm qua lifecycle của nó.
![](https://images.viblo.asia/9621cc8e-3814-4832-ad37-83bd23e812b7.jpeg)https://images.viblo.asia/9621cc8e-3814-4832-ad37-83bd23e812b7.jpg

Ở phiên bản nhỏ hơn 16.3, react js chia quá trình render trang wed thành 3 phần:

1. Lần đầu tiên render: 
- contructor: khởi tạo các state và nhận props từ cha hay từ middleWare.
- componentWillMount sẽ có thể call request, hoặc setState hay khởi tạo các giá trị khác. Nó chỉ gọi một lần duy nhất.
- render: vẽ wed lần đầu tiên.
- componenDidMount : sau khi render , function này có nhiệm vụ thay đổi cái gì đó .
-
2. Sau render lần đầu gọi là updating.
-trước hết, tại sao lại có render lần đầu tiên ?
- nếu bạn nào có từng code qua Unity sẽ có một function là void Awake() để khởi tạo giống như cwm(componentWillMount) và một void Update() dùng để render lại wed liên tục theo thời gian. Về cơ bản, nó kha khá giống kiến trúc của reactjs. Reactjs sẽ liên tục render lại wed với các state và props của nó do vậy nó giống như một vòng lặp vô hạn mà các giá trị sau chịu ảnh hưởng bới giá trị trước.Vì thế , pha thứ 2 của reactjs chủ yếu tập trung đến việc xử lí props và state có trong nó mà không tái khởi tạo nữa là mục đích của reactjs.
- componentWillReceiverProps: lắng nghe sự thay đổi props từ đó đưa ra lệnh
- shouldComponentUpdate() sau khi lắng nghe thay đổi, nó quyết định xem có cần thiết phải thay đổi render hay không.
- render()
- componentDidUpdate() sau khi render wed, lắng nghe các sự kiện.
- componentWillUnmount() xử lí 

Vậy lifecycle này có điều gì khiến reactjs cần phải thay đổi kiến trúc.

1. Về mặc bản chất, props đã được khởi tạo trước khi render component(cpn) con tạo ra, nên khi cpn cha thay đổi, nó cũng truyền tương tự đến cpn con, mà thông thường , nó thương được dev viết bằng một state từ cpn cha nên việc thay đổi này có thể xem xét là lắng nghe thay đổi state .
2. Kiến trúc kiểu như redux, hay middleware luôn contructor cho props trước, nên sự thay đổi này cũng đáng lẽ được áp dụng ở cpn con. Nghĩa là componentWillMount và componentWillReceiverProps(cwrp) đang bị chồng chéo vai trò lên nhau, sự phân định không rõ ràng này có thể tăng lên nếu như cpn con chỉ là tĩnh và nó không cần thiết render các giá trị bên trong lại sau componentWillReceiverProps.
3. componentWillMount có thể dùng cả async function dùng để request, điều này dẫn đến trong một số trường hợp , nếu request trả về quá chậm so với render, nó sẽ phải cần trả về pha 2 ngay lập tức.
4. componentDidMount(cdm) gần như vô dụng, vì bất cứ thay đổi nào của nó ở pha thứ nhất có thể xử lí trước ở pha thứ 2 vì render ->  cdm ->componentWillReceiverProps......(xử lí tại đây ) -> render 😢

Như vậy, nếu không đồng bộ rõ ràng kiến trúc trước cũng như không thể nắm được thời gian phản hồi của web thì kiến trúc này chưa tối ưu hóa được.

Vì thấy reactjs đã thay đổi kiến trúc mới, gọn gàng và sạch đẹp hơn
![](https://images.viblo.asia/a2325959-a53c-4ac8-977a-559adbacf1ce.jpeg)

Như ta thấy, kiến trúc này có những thay đổi sau : loại bỏ pha cwm và cwrp , thêm vào getSnapShotBeforeUpdate(), Điều đó làm thay đổi những gì.
1. Giờ đây, vai trò của cwm và cwrp sẽ không bị chồng chéo. Nó là là một quá trình liên tục duy nhất. Điều nó này càng hữu ích hơn vì trang wed được render lại liên tục, hơn  nữa reactjs muốn loại bỏ việc call api thông qua cwm và nó sẽ làm chậm render đi rất nhiều nếu như data đổ về lớn. Đồng thời cũng đồng bộ hóa quá trình trước render làm cho thời gian render  lại wed đồng đều hơn. Điều này tưởng chừng như đơn giản nhưng nếu các trang wed đòi hỏi chuyển động cũng như render video thì nó ảnh hưởng khá lớn đến trực quan người dùng.👏
2. getSnapShotBeforeUpdate() ? cái này để làm gì.
- đơn giản là vì reactjs có thể dùng function trong lúc render, nghĩa là có thể thay đổi state trong  luc đó. Điều này là cần thiết vì coder có thể theo dõi sự thay đổi sau khi render của các state một cách rõ ràng nhằm xử lí tốt hơn trong quá trình componnentDidUpdate().

Nhờ thay đổi lifeCycle cũng như sự ra đời của Hook reactjs ngày càng trở nên nhanh gọn và mạnh mẽ hơn trong việc xử lí giao diện wed . Qua đó đặt một vị trị vững của nó trong quá trình hoàn thiện của library này.
( Cảm ơn vì đã đọc bài :v. Bài viết dựa chủ yếu vào ý hiểu của mình nên còn hơi lủng cùng)