Với việc phát triển của thế giới internet hiện nay, các thành phần trong trang web đang trở nên càng ngày càng phức tạp.

Ở các ứng dụng web xây dựng bằng ReactJS, việc rerender lại nhiều lần các component phức tạp sẽ ảnh hưởng lớn đến hiệu năng của ứng dụng web, từ đó ảnh hưởng tới trải nghiệm của người sử dụng. 

Người dùng thích các trang web có UI nhanh và nhạy. Độ trễ phản hồi thấp dưới 100 mili giây tạo sẽ tạo cảm giác tức thì. Nếu độ trễ từ 100 – 300 mili giây sẽ làm người dùng cảm nhận rõ rệt về sự chậm chạp trang web.

Để cải thiện hiệu suất của web app, ở bản release React v16.6, React cung cấp một HOC là React.memo().  Khi React.memo() bao quanh một component, React sẽ ghi nhớ kết quả render và bỏ qua các quá trình render không cần thiết, nhằm tối ưu hóa việc hiệu năng của quá trình render các functional component.

Vậy React.memo() là gì ? Dùng nó như thế nào ? Những trường hợp nào nên dùng và không nên dùng nó ? Chúng ta hãy cùng bắt đầu tìm hiểu nhé !

# 1. React.memo() là gì ?
Như các bạn đã biết, Functional Component, hoặc Class Component return false trong shouldComponentUpdate, component đó sẽ không bị re-render khi tree thay đổi, nó chỉ thay đổi khi prop truyền vào thay đổi.

React.memo() hoạt động y chang như React.PureComponent(), nhưng nó là function component thay vì class như PureComponent. React.memo là một higher order component, được sử dụng để bọc các component. Bằng việc sử dụng React.memo(), React sẽ bỏ qua việc render lại component và sử dụng kết đã render lần cuối cùng nếu component của bạn render cùng kết quả với cùng props.

Lấy 1 ví dụ cụ thể như sau: Background của component sẽ thay đổi thành đỏ nếu người dùng nhập vào một số chẵn, là xanh nếu người dùng nhập vào số lẻ.

![](https://images.viblo.asia/0a8a74c4-685c-4254-8a8e-537b35822c26.png)

Component ColoredSquare sẽ luôn được render lại mỗi khi người dùng đổi giá ở input, bất kể nó là giá trị gì. Để nâng cao hiệu năng của ứng dụng thì ta cần xử lý chỉ cho component render lại nếu giá trị đổi từ số chẵn sang lẻ hoặc lẻ sang chẵn. Ta có thể sử dụng React.memo như sau:

![](https://images.viblo.asia/776df95f-fff3-4a56-8997-02ed7ac9af8c.png)

Đối số thứ hai truyền vào React.memo sẽ là hàm dùng để React xác định có render lại hay không dựa trên sự thay đổi của props. Nếu giá trị trả về của hàm là true thì có nghĩa là React sẽ không render lại component này mà dùng lại kết quả đã render trước đó và ngược lại nếu trả về giá trị false thì React sẽ render lại component này.

>  **Một chút so sánh nhỏ của mình giữa React.memo() vs shouldComponentUpdate()**
>  
>    Giống nhau:  
>    
>        Đều được sử dụng để cải thiện hiệu năng của ứng dụng React bằng việc cân nhắc qúa trình rerender của các component.
> 
>    Khác nhau:
>    
>       1. Điều đầu tiên dễ thấy React.memo là một higher order component (HOC) được sinh ra nhằm sử dụng cho các functional component trong việc tối ưu hiệu suất render. Trong khi đó, shouldComponentUpdate là một method của class based component.
>        2.  Thứ hai, React.memo chỉ có thể xác định việc rerender dựa trên sự thay đổi của props trong khi shouldComponentUpdate có thể xác định việc rerender dựa trên sự thay đổi của cả props và state.

# 2. Khi nào nên dùng React.memo()
![](https://images.viblo.asia/da3bb3be-8229-4a27-ab2f-aa3bafc6504a.jpg)

1. Trước hết thì component của bạn phải là functional component đã nhé.
2. Component của bạn thường xuyên bị re-render.
3. Nếu component của bạn luôn luôn bị re-render mặc dù prop không thay đổi.
4. Component của bạn chứa một lượng lớn tính toán logic và UI như Chart, Canvas, 3D library….

**Component re-render thường xuyên với cùng prop giống nhau**
Một trường hợp cực kì phổ biến khi code React như sau. MovieViewsRealtime hiển thị số views của một bộ phim, với dữ liệu cập nhật realtime.

![](https://images.viblo.asia/eedfe479-f85b-4bb6-9b42-56ae166b58b9.png)

App sẽ kết nối với server và cập nhật prop views

![](https://images.viblo.asia/3d7116f4-a499-4bb0-a815-f9c6ce5a3344.png)

Mỗi lần prop views được cập nhật với một con số mới, MovieViewsRealtime sẽ re-render. Điều này làm cho Movie cũng re-reder theo mặc dù title và releaseDate không thay đổi.

Trường hợp này chúng ta sẽ áp dụng React.memo() để hạn chế việc re-render trên Movie component

![](https://images.viblo.asia/2de8c952-573a-438b-8ae8-f9b1947c96c1.png)

Miễn là title và releaseDate không thay đổi, React sẽ bỏ qua quá trình re-render MemoizedMovie. Việc này sẽ giúp cải thiện hiệu suất của MovieViewsRealtime component.

# 3. Khi nào tránh sử dụng React.memo()
1. Nếu component của bạn không bị re-render mặc dù prop không thay đổi, rất có thể bạn không cần React.memo ().

> Sử dụng quy tắc ngón tay cái sau: không sử dụng ghi nhớ (memoization) nếu bạn không thể định lượng hiệu suất (performance) đạt được.

2. Các thay đổi liên quan đến hiệu suất được áp dụng không chính xác thậm chí có thể gây hại cho hiệu suất. Sử dụng React.memo () một cách khôn ngoan.

> Có thể, class-based components trên React.memo() là không mong muốn. Hãy Extend PureComponent class hoặc khai báo một triển khai tùy chỉnh của phương thức shouldComponentUpdate () nếu bạn cần ghi nhớ (memoization) cho class-based components.

3. Component của bạn là class component

4. Component của bạn đã được memo bởi một HOC khác, ví dụ connect() của Redux.

Có một số người cho rằng props component của họ thay đổi thường xuyên, nên họ không cần dùng React.memo(). Cũng đúng, nhưng theo ý kiến cá nhân của mình khi một code trong một  app React lớn, thì việc re-render component của bạn còn bị ảnh hưởng bởi các state của component cha, không chỉ là mỗi props các prop mà component con nhận vào. Nên chắc chắn sẽ có những lần re-render vô ích, không ít thì nhiều. Nên mình sẽ dùng React.memo() luôn cho đảm bảo.

# 4. useMemo()
Tên có vẻ giống, nhưng không giống nhau, nếu React.memo là một HOC để ghi nhớ một function component, useMemo là hàm giống như helper cho phép chỉ định: lưu lại kết quả của hàm nào và những giá trị nào sẽ làm thay đổi kết quả đó.

useMemo tập trung vào việc tránh lặp đi lặp lại các logic tính toán nặng nề.

Cụ thể, nó trả về một giá trị (là kết quả trả về từ việc thực thi, chạy hàm fn mà bạn pass vào ứng với tham số thứ nhất).

Nếu một trong số các dependencies thay đổi, thì hàm tính toán sẽ được thực thi lại, từ đó trả ra giá trị mới. Ngược lại, nếu nhận thấy giá trị của các dependencies kia không đổi, thì ngay lập tức useMemo trả ra kết quả trước đó mà không hề tính toán lại, từ đó tránh được một khối lượng lớn công việc, giúp ích cho performance.

Ngoài ra, lợi dụng tính năng trả ra giá trị trước đó khi dependencies không thay đổi, ta cũng sẽ tránh được việc tạo mới các object không cần thiết (object cũ sẽ được trả ra), giúp tránh re-render không cần thiết.

## 4. 1 Tránh tính toán nặng
**Khi không dùng useMemo()**

![](https://images.viblo.asia/f84be45f-5c4c-48b9-a4f6-bd2cc159780f.png)

Viết như thế này, mỗi lần bấm nút tăng biến count, componentA sẽ re-render, và hàm getArray sẽ bị chạy lại, tốn 2s để có kết quả và render ra màn hình.

**Khi dùng useMemo()**

![](https://images.viblo.asia/085aebc8-7e0c-4c3d-843c-74c295fcf2c8.png)

Giờ đây, mặc cho bạn bấm nút và tăng biến count, hàm getArray ngay lập tức trả ra giá trị result trước đó mà không cần tốn 2s tính toán. Để ý getArray lúc này không còn dấu gọi hàm nữa, vì bản thân useMemo đã chạy hàm ta pass vào, việc của dev chúng ta là nhận ra một memoized value mà thôi.

## 4.2 Tránh re-render
**Khi không dùng useMemo()**

![](https://images.viblo.asia/8e2ec27a-1dd1-4763-8f31-9a73dca190c8.png)

Viết như thế này, mỗi lần ComponentA re-render, hàm getStyle sẽ tạo ra một object mới và pass xuống ComponentB, khiến cho ComponentB bị re-render (mặc dù đã sử dụng React.memo)

**Khi dùng useMemo()**

![](https://images.viblo.asia/b7fab55a-0b52-4fbb-aa7c-c8adea6bb84f.png)

Giờ đây, khi dùng useMemo cho hàm getStyle, (để ý getStyle không còn dấu gọi hàm, useMemo đã thực thi hàm mà chúng ta pass vào rồi, ta chỉ nhận ra kết quả - một memoized value mà thôi) ở các lần re-render sau của ComponentA, object style cũ sẽ được trả ra thay vì tạo mới -> React.memo ở ComponentB nhận thấy prop nhận vào không có sự thay đổi -> không re-render.

# 5. useCallback()
useCallback thì tập trung giải quyết vấn đề về performance, khi mà các callback function được tạo ở functional component cha pass xuống component con luôn bị tạo mới, khiến cho con luôn bị re-render.

useCallback trả về một function (chính là function bạn pass vào ứng với tham số thứ nhất), callback function này sẽ được tạo lại khi một trong số các dependencies thay đổi. Nếu dependencies không đổi, function trả về sẽ là function trước đó -> tức là function pass xuống component con không bị tạo mới, tương đương không có object được tạo mới -> component con không bị re-render.

## 5.1 Tránh re-render ở component con
**Khi không dùng useCallback**

![](https://images.viblo.asia/2a1faae8-fe4b-4a55-9e9e-381130b2416b.png)

Viết thế này, mỗi lần component Parent re-render, callback onChangeHandler sẽ được tạo mới và pass xuống component con Pure. Mặc cho component có sử dụng React.memo, nó vẫn bị re-rendered.

**Khi dùng useCallback**

![](https://images.viblo.asia/fd192675-d76f-4984-a398-86f934f0cc66.png)

Nhờ sử dụng useCallback, giờ đây ở mỗi lần component Parent re-render, hàm onChangeHanlder sẽ không còn luôn luôn bị tạo mới nữa, mà sẽ chỉ được tạo mới khi depencency của nó là biến a thay đổi. Function không bị tạo mới -> object không bị tạo mới -> component con nhận vào cũng không bị re-render. Tuyệt vời!
# 6. React.memo() với useCallback()
Bây giờ chúng ta với ví dụ sau nào: Component Logout nhận một callback prop là onLogout, và được bao gói bởi React.memo()

![](https://images.viblo.asia/8ed79e02-a255-4a35-b6fb-eeea75e5f9d3.png)

Một component nhận một callback nên được xử lý với kĩ thuật memo. Mỗi lần component cha re-render nó sẽ tạo ra một instance callback mới.

![](https://images.viblo.asia/ea68a2fc-ab8f-47d5-aa09-89f4e5994fef.png)

Lúc này mặc dù username không thay đổi, MemoizedLogout vẫn render lại vì nó nhận một instance mới của onLogout callback.

React.memo() lúc này không có tác dụng nữa rồi.

Để fix điều này, ta dùng một hook của React đó là useCallback() để ngăn việc tạo instance callback mới giữa mỗi lần render.

![](https://images.viblo.asia/d9ff6313-e912-4167-b03c-6d4f247daa88.png)

useCallback(() => cookies.clear('session'), [cookies]) luôn luôn return một instance function, miễn là cookies không thay đổi. Lúc này chúng ta đã fix được vấn đề trên.

# 6. useCallback() <==> useMemo()
Như đã nói phía trên, useMemo sẽ thực thi hàm được pass vào và trả ra kết quả. Nếu khéo léo, return ra function như là một kết quả, thì lúc này useMemo sẽ có vai trò và tác dụng giống hệt useCallback.

![](https://images.viblo.asia/7678197d-dc2e-47ca-b3da-62f6ecd73c20.png)

# Tổng kết
React.memo() là một công cụ tuyệt vời để ghi nhớ functional component. Khi dùng chính xác nó sẽ giúp bạn tăng performance và UX lên đáng kể đấy. Hãy cảnh giác với callback function nữa nhé, luôn luôn đảm bảo rằng instance của callback luôn giống nhau giữa các lần re-render.

Bài viết của mình đến đây là kết thúc. Hy vọng nó sẽ giúp các bạn giải mã hai hooks khá khó hiểu trong React là useCallback và useMemo, đồng thời giúp chúng ta hiểu được các vấn đề về re-render trong thế giới functional component và phần nào đó cho các bạn trong quá trình học tập cũng như làm việc. Mình cũng chỉ mới tìm hiểu về React nên bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.