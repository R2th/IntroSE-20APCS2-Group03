Trước đây, mình từng có thời gian làm việc với Redux trong việc quản lý state, sau đó thì có cơ hội được biết đến mobx. Nhưng đến bây giờ mới có cơ hội trải nghiệm để sử dụng nó vào trong dự án. Từ kinh nghiệm của bản thân và đọc được 1 số bài viết, mình cũng xin phép được so sánh 1 chút về MobX và Redux trong việc quản lý state trong những dự án React.

**1) Một Store và Nhiều Store**

Store được định nghĩa đơn giản là 1 nơi bạn sẽ sử dụng để lưu trữ toàn bộ dữ liệu của app.

Đối với Redux, đó là 1 store lớn dùng để lưu trữ toàn bộ state, tuy nhiên ở 1 số app có quy lớn, bạn có thể thấy store lớn sẽ được chia ra nhiều reducer nhỏ hơn để dễ quản lý hơn, nhưng dù vậy, nó vẫn được sử dụng với tinh thần là chỉ có 1 store duy nhất.

Còn trong MobX, bạn có thể sử dụng nhiều store để lưu trữ và quản lý state của mình sao cho bản thân thấy hiệu quả nhất.

**2) Dữ liệu đơn thuần và dữ liệu Observable**

Redux chỉ đơn giản là lưu trữ dữ liệu và nếu bạn mong muốn app sẽ re-render khi dữ liệu thay đổi thì hầu như bạn phải làm việc đó.

Khác với Redux, Mobx sử dụng observable để lưu trữ dữ liệu, điều đó có nghĩa nếu bạn thay đổi dữ liệu được lưu trữ bởi observable, bạn thay đổi nó, nó sẽ re-render mà không cần phải phải đụng chạm nhiều ( nghe tiện quá nhỉ ), ví dụ: 
````
class DemoStore {
  @observable demo = ['mobx', 'redux'];
}

const demoStore = new DemoStore();
demoStore.demo.push('mobdux');
````
 
 App của bạn sẽ được re-render lại với dữ liệu mới sau khi demo đã thay đổi
 
 **3) Dữ liệu bất biến và dữ liệu tùy biến**
 
 Trong Redux, state sẽ luôn là dữ liệu bất biến, khi store nhận vào 1 state nó sẽ trả lại 1 state mới tương ứng, và không làm thay đổi state nhận vào, ví dụ:
 
 ````
 const initialState = {
  demo = ['mobx', 'redux'];

// reducer
function demo(state = initialState, action) {
  switch (action.type) {
  case 'ADD_DEMO':
    return { ...state, demo: [ ...state.demo, action.newDemo ] };
  default:
    return state;
  }
}
 ````
 
Như ví dự trên, bạn có thể thấy được Redux sẽ trả lại cho ta 1 state mới, và không làm thay đổi state cũ, vì thế chúng ta có thể coi Redux hoạt động như  1 pure function. Còn ở ví dụ trước đó với MobX, ta có thể thay đổi trực tiếp dữ liệu của state.

**4) Khả năng tiếp cận**

Qua những so sánh trên, bạn có thể mơ hồ nhận ra là MobX có thể sử dụng 1 cách nhẹ nhàng hơn , ít phải code hơn, và việc re-render app đã được MobX xử lý giúp bạn. Trong khi đó với Redux, đó có thể là cả 1 câu chuyện dài (đương nhiên là code cũng dài nữa). Vậy là MobX dễ tiếp cận hơn hẳn rồi, nhưng cũng không phải ngẫu nhiên Redux vẫn là 1 công cụ phổ biến để quản lý state. Chúng ta tìm hiểu nó ở lý do tiếp theo nhé

**5) Debug**

Trong Redux, muốn thay đổi 1 state, thay thông qua việc dispatch 1 action tương ứng, sau đó với state mới nhận về, ta cũng phải xử lý xem nó có ảnh hưởng tới việc render lại app hay không. Mặc dù lằng nhằng nhiều bước như vậy nhưng khi debug, bạn có thể 'đục' vào từng bước để xem bug ở đâu và xử lý gọn tại đó. Hơn nữa, dù làm dự án khác, nếu dự án đó dùng Redux, thì quy trình này vẫn không thay đổi điều cốt lõi của nó.
Còn với MobX, thật sự mà nói, bạn vẫn có thể thông qua action để thay đổi state trong mobx, nhưng không ai bắt bạn làm vậy. Bạn có thể tự tạo ra quy trình cho mỗi dự án của mình. Thậm chí trong một dự án có thể có nhiều quy trình khác nhau nữa. Một điều quan trọng nữa, vì MobX tự động kiểm tra việc render, nên nếu có bug, trong việc re-render, bạn sẽ không thể điều tra từng tầng như redux được.

**6) Dự án vừa và lớn**

Với dự án vừa và nhỏ, bạn có thể tùy biến, sử dụng nhiều cách quản lý state và không lo mất nhiều thời gian để bảo trì mà fix bug => MobX phù hợp với dự án vừa và nhỏ.
Nhưng với dự án lớn thì sao? Nó không được dùng à? Tất nhiên là được rồi. Tuy nhiên, trong dự án lớn, việc thống nhất quy trình, bảo dưỡng, quản lý được nâng lên 1 tầm cao mới, nó đòi hỏi việc nhất quán, thống nhất, chặt chẽ => Về mặt này thì Redux ăn chặt MobX (như cái cách venom bán hành cho TA vậy)

Sau bài viết này, chắc hẳn bạn cũng được có 1 cái nhìn tổng quan hơn về MobX và Redux, nếu mình có gì sai sót, mong các bạn có thể góp ý bổ sung bên dưới, cảm ơn các bạn đã đọc bài viết của mình.

Bài viết có tham khảo link: https://codeburst.io/mobx-vs-redux-with-react-a-noobs-comparison-and-questions-382ba340be09