React cung cấp cho developers nhiều methods hoặc "móc nối" được gọi trong suốt vòng đời của một component, cho phép chúng ta cập nhật UI và trạng thái ứng dụng. Biết khi nào nên sử dụng cái nào trong số chúng là điều cốt yếu để hiểu đúng cách làm việc với React.

-----

## Constructor
Constructor là cơ bản trong OOP - đây là một function đặc biệt mà sẽ được gọi bất cứ khi nào một đối tượng mới được tạo ra. Điều rất quan trọng là phải gọi một function đặc biệt *`super`*  trong trường hợp class của chúng ta extends bất kỳ class nào khác mà cũng có một constructor xác định. Gọi function đặc biệt này sẽ gọi constructor của class cha mẹ của chúng ta và cho phép nó tự khởi tạo. Đây là lý do tại sao chúng ta có quyền truy cập `this.props` chỉ sau khi chúng ta gọi `super`.

Như đã đề cập, các constructor là hoàn hảo cho việc thiết lập các components của chúng ta - tạo bất kỳ trường nào (các biến bắt đầu với `this.`) hoặc khởi tạo state dựa trên các props nhận được.

Đây cũng là nơi duy nhất mà bạn dự kiến sẽ thay đổi/thiết lập trạng thái bằng cách trực tiếp ghi đè lên các trường `this.state`. Trong tất cả các trường hợp khác nhớ sử dụng `this.setState`.

**DO**

* thiết lập state (trạng thái) ban đầu
* nếu không sử dụng cú pháp thuộc tính class - chuẩn bị tất cả các fields class và ràng buộc các function sẽ được pass như callbacks

**DON’T**

* gây ra bất kỳ side-effects (hiệu ứng lề) (gọi AJAX v.v..)

## componentWillMount
Đây là một trường hợp đặc biệt nào đó - `componentWillMount` không khác nhiều so với constructor - nó cũng được gọi chỉ một lần tạo gắn kết ban đầu trong vòng đời (life-cycle). Về mặt lịch sử, có một số lý do để sử dụng `componentWillMount` qua constructor [xem vấn đề react-redux này](https://github.com/reactjs/react-redux/issues/129) nhưng hãy nhớ rằng thực hành được mô tả trong đó không được chấp nhận.

Nhiều người sẽ bị cám dỗ sử dụng function này để gửi một yêu cầu tìm fetch data và mong đợi data có sẵn trước khi initial render đã sẵn sàng. Đây không phải là trường hợp - trong khi yêu cầu sẽ được khởi tạo trước khi render, nó sẽ không thể hoàn thành trước khi render được gọi.

Ngoài ra, với những thay đổi đối với React Fiber (phát hành sau React 16 phiên bản beta), function này có thể kết thúc được gọi nhiều lần trước khi initial `render` được gọi, vì vậy có thể gây ra nhiều **side-effects (hiệu ứng lề)**. Do thực tế này, **không** nên sử dụng function này cho bất kỳ side-effect gây ra các hoạt động.

Điều quan trọng cần lưu ý là function này được gọi khi sử dụng server-side-rendering trong khi tương ứng -`componentDidMount` sẽ không được gọi trên server nhưng trên client trong trường hợp đó. Vì vậy, nếu một số side-effect được yêu cầu trên phần server, function này nên được sử dụng như một ngoại lệ (exception).

Một `setState` được sử dụng trong function này là "miễn phí" và sẽ không kích hoạt render lại.

**DO**

* cập nhật state qua `this.setState`
* thực hiện tối ưu hóa phút cuối
* gây ra các side-effect (các lời gọi AJAX v.v...) **chỉ trong trường hợp server-side-rendering**

**DON'T**

* gây ra bất kỳ side-effects (gọi AJAX v.v...) trên phía client

## componentWillReceiveProps(nextProps)
Function này sẽ được gọi trong mỗi lần update vòng đời do các thay đổi đối với props (component cha mẹ thực hiện re-rendering) và sẽ được pass một object map của tất cả các props được thông qua, không có vấn đề nếu giá trị prop đã thay đổi hay không kể từ trước khi re-render.

Function này là lý tưởng nếu bạn có một component mà các phần của state phụ thuộc vào props được truyền từ component cha mẹ như việc gọi `this.setState` ở đây sẽ không gây ra thêm một lời gọi render.

Hãy nhớ rằng do thực tế là các function được gọi với tất cả các props, ngay cả những function đó đã không thay đổi nó được mong đợi các developer thực hiện một kiểm tra để xác định xem giá trị thực tế đã thay đổi, ví dụ:

```
componentWillReceiveProps(nextProps) {
  if(nextProps.myProp !== this.props.myProps) {
    // nextProps.myProp có giá trị khác với current prop của chúng ta
    // nên chúng ta có thể thực hiện các phép tính trên giá trị mới
  }
}
```

Do thực tế là với React Fiber (16 beta), function này có thể được gọi nhiều lần trước khi render function thực sự được gọi, nó không được khuyến cáo sử dụng bất kỳ side-effect gây ra hoạt động ở đây.

**DO**

* đồng bộ hóa state với props

**DON'T**

* gây ra bất kỳ side-effect (gọi AJAX v.v...)

## shouldComponentUpdate(nextProps, nextState, nextContext)
Mặc định, tất cả các components dựa trên class sẽ tự render lại bất cứ khi nào các props họ nhận, state hoặc context của chúng thay đổi. Nếu re-rendering lại component được tính toán nặng (ví dụ như tạo ra một biểu đồ) hoặc không được đề nghị vì một số lý do hiệu suất, developers được cấp quyền truy cập vào một function đặc biệt sẽ được gọi trong chu kỳ update.

Function này sẽ được gọi nội bộ với các giá trị props, state và object tiếp theo. Developers có thể sử dụng các công cụ này để xác minh rằng thay đổi này yêu cầu render lại hoặc không và trả về `false` để ngăn việc hiển thị lại xảy ra. Trong trường hợp khác, bạn được kỳ vọng sẽ return `true`. 

**DO**

* sử dụng để tăng hiệu suất của các components hoạt động kém

**DON'T**

* gây ra bất kỳ side-effect (gọi AJAX v.v...)
* gọi `this.setState `

## componentWillUpdate(nextProps, nextState)
Nếu function `shouldComponentUpdate` không được thực hiện, hoặc nó quyết định rằng các components nên cập nhật trong chu kỳ render, một life-cycle function khác sẽ được gọi. Function này thường được sử dụng để thực hiện đồng bộ hóa state và props cho khi các thành phần state của bạn dựa trên props.

Trong trường hợp nơi `shouldComponentUpdate` được implement, function này có thể được sử dụng thay vì `componentWillReceiveProps` vì nó sẽ chỉ được gọi khi component này thực sự được render lại.

Tương tự như tất cả các function `componentWill *` khác, function này có thể kết thúc được gọi nhiều lần trước khi render nên nó không nên thực hiện các side-effect gây ra hoạt động ở đây.

**DO**

* đồng bộ state đến props

**DON'T**

* gây ra bất kỳ side-effect (gọi AJAX v.v...)

## componentDidUpdate(prevProps, prevState, prevContext)
Function này sẽ được gọi sau khi render hoàn thành trong mỗi chu kỳ re-render lại. Điều này có nghĩa là bạn có thể chắc chắn rằng component và tất cả các component con của nó đã được render đúng chính nó.

Do thực tế rằng đây là function duy nhất mà được đảm bảo để được gọi chỉ một lần trong mỗi chu kỳ re-render, lời khuyên sử dụng function này cho bất kỳ side-effect gây ra hoạt động. Tương tự như `componentWillUpdate` và `componentWillReceiveProps`, hàm này được gọi với các object-maps của các props, state và context **trước đây**, ngay cả khi không có thay đổi thực sự xảy ra với các giá trị đó. Bởi vì đó, các developers được yêu cầu kiểm tra thủ công nếu giá trị đã cho thay đổi và chỉ sau đó thực hiện các thao tác cập nhật khác nhau:

```
componentDidUpdate(prevProps) {
  if(prevProps.myProps !== this.props.myProp) {
    // this.props.myProp có một giá trị khác
    // chúng ta có thể thực thi các operations mà sẽ cần
    // giá trị mới và/hoặc gây ra side-effects 
    // như gọi AJAX với giá trị mới - this.props.myProp
  }
}
```
**DO**

* gây ra các side-effects (gọi AJAX v.v...)

**DON'T**

* gọi `this.setState` vì nó sẽ tạo ra một re-render

Một ngoại lệ đối với quy tắc trên là update state dựa trên một số thuộc tính DOM chỉ có thể tính khi một component đã được hiển thị lại (ví dụ: vị trí / kích thước của một số nút DOM). Hãy cẩn thận hơn để tránh update nếu giá trị không thực sự thay đổi vì nó có thể dẫn đến một vòng lặp render.

> Refer link: [Understanding React](https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d)