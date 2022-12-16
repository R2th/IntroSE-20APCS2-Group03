## componentDidCatch(errorString, errorInfo)
Một bổ sung mới trong React 16 - life-cycle method này đặc biệt theo cách nó có thể phản ứng với các sự kiện xảy ra trong thành phần con, cụ thể cho bất kỳ lỗi vô hình nào xảy ra trong bất kỳ thành phần con nào.

Với phần bổ sung này, bạn có thể làm cho phần tử gốc của bạn xử lý lỗi bằng - ví dụ - thiết lập thông tin lỗi trong state và trả về message thích hợp trong render của nó hoặc ghi log vào reporting system, ví dụ:

```
componentDidCatch(errorString, errorInfo) {
  this.setState({
    error: errorString
  });
  ErrorLoggingTool.log(errorInfo);
}
render() {
  if(this.state.error) return <ShowErrorMessage error={this.state.error} />
  return (
    // render normal component output
  );
}
```
Khi một lỗi xảy ra, function sẽ được gọi với:

* errorString -  `.toString ()` message của lỗi
* errorInfo - một object với một trường `componentStack` đại diện cho stack (ngăn xếp) theo dõi lại nơi đã xảy ra lỗi, ví dụ:
```
in Thrower
    in div (created by App)
    in App
```

## componentDidMount
Function này sẽ chỉ được gọi một lần trong toàn bộ vòng đời của một component đã cho và nó được gọi là tín hiệu rằng component - và tất cả các components con của nó - đã được render đúng.

Vì function này được đảm bảo chỉ được gọi 1 lần khi nó là một ứng cử viên hoàn hảo để thực hiện bất kỳ side-effect nào gây ra các operations như AJAX requests.

**DO**
* gây ra bất kỳ side-effect (gọi AJAX v.v...)

**DON'T**
* gọi `this.setState` vì nó sẽ tạo ra một re-render

Ngoại lệ đối với quy tắc trên đang cập nhật state dựa trên một số thuộc tính DOM có thể chỉ được tính khi component đã được render lại (ví dụ: vị trí / kích thước của một số nodes DOM). Hãy cẩn thận hơn để ngăn chặn việc cập nhật nếu giá trị không thực sự thay đổi vì nó có thể dẫn đến vòng lặp render.

## componentWillUnmount
Sử dụng function này để "dọn sạch" sau components nếu nó tận dụng các timers (`setTimeout`, `setInterval`), mở sockets hoặc thực hiện bất kỳ thao tác nào chúng ta cần close/remove khi không cần nữa.

**DO**
* loại bỏ bất kỳ timer hoặc listener nào được tạo trong tuổi thọ của component

**DON'T**
* gọi `this.setState`, bắt đầu listeners hoặc timers mới

## Component cycles
Có nhiều lý do mà một component có thể re-render và trong mỗi chúng, các functions khác nhau được gọi là cho phép developer cập nhật các phần nhất định của Component.

**Tạo component**

Cycle đầu tiên là tạo component, thường xảy ra lần đầu tiên một component được gặp trong cây JSX được phân tích cú pháp:

![](https://images.viblo.asia/6f84843d-7134-40c9-89e1-f744e94fd158.png)

**Re-render lại component do re-render lại component cha**

![](https://images.viblo.asia/14bc2e90-d835-400a-ac05-39cc7072f089.png)

**Re-render lại component do thay đổi nội bộ (ví dụ: gọi `this.setState ()`)**

![](https://images.viblo.asia/01c830a0-4895-490a-a514-26afd9557952.png)

**Re-render lại component do gọi `this.forceUpdate`**

![](https://images.viblo.asia/7ac90e1b-3dd6-42a5-9ab2-f47805af2d2f.png)

**Re-render lại component do bắt lỗi**
Được giới thiệu trong React 16 là “ErrorBoundaries”. Một component có thể định nghĩa một lớp đặc biệt có thể bắt lỗi và cung cấp một life-cycle method mới - `componentDidCatch` - cho phép các developer cung cấp các hành động tự sửa chữa để phục hồi hoặc xử lý lỗi một cách mượt mà.

![](https://images.viblo.asia/76574333-bd50-4be7-9767-c8c3fce3dfa0.png)




-----

Như vậy là chúng ta đã cùng đi qua life-cycle của React. Mình hy vọng mọi người cùng nhau hiểu rõ hơn về chúng, qua đó dễ dàng và có cách xử lý các vấn đề khi xây dựng project một cách hiệu quả và tối ưu nhất.

Refer link: [Understand React](https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d)