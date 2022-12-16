# Lời mở đầu
![](https://images.viblo.asia/40f500cc-aea9-4fee-ad97-e7e4e43c94e7.png)

Custom hooks là một thuật nghữ rất hay được nhắc đến trong những buổi interview, hoặc qua cuộc thảo luận với anh leader. Chúng ta cùng xem lại một chút lịch sử của custom hooks nào.  🖥️


Trước đây từ thở hồng hoang những lập trình viên ReactJS và React Native đã viết các Component bằng class. Từ phiên bản 16.8 của React, những anh lập trình viên đã được tiếp cận và yêu hooks ngay từ cái nhìn đầu tiên. Vì sao vầy? Simple là yếu tố quan trọng nhất, chúng ta có thể gói gọn tất cả những lifecycle của nó mà k cần dùng đến những function khác nhau như class. 

Thông thường những Component đó nó sẽ trả về 1 UI để render lên màn hình. Đó chính là Component bình thường. Nếu bạn muốn một component trả về logic data nhưng vẫn muốn sử dụng lifecycle hay các hàm của hooks. Đó là CustomHooks.
# Vì sao lại sử dụng Custom Hooks ?
> Thế nào là một component dễ quản lý ?
 
 Chức năng counter nếu không sử dụng custom hooks sẽ như thế này :
 
![Screen Shot 2021-10-31 at 23.56.24.png](https://images.viblo.asia/01dc0bc1-0406-45f7-9e58-be5f003a77db.png) 
 
 Giờ anh leader bước xuống, tâm hự rằng cần thêm component logic nó sẽ giống như này nhưng UI em đổi lại tí nhé. Sau đó bác coder lụi cụi viết thêm component và cũng tạo state không khác gì cái cũ. Một nhân bản của component trên được tạo nên. Đột ngột, khách hàng muốn sửa nhẹ logic của thằng này,  thế là anh dev lại phải vọc vạch mò lại từng cái để sửa. Sau khi sửa xong, dev toát mồ hôi vì sửa nhiều component và cảm thấy rời rạc với nguy cơ gặp lỗi phát sinh. Sau khi đọc qua về custom hooks anh dev quyết định sửa lại component trên như thế này : 
 ![Screen Shot 2021-10-31 at 23.57.33.png](https://images.viblo.asia/2506f5c9-4da8-4a70-8f03-b4517b923b58.png)
 
 Đấy, bạn thấy linh hoạt chưa, sẽ tự tin hơn nếu vác cái `useCounter` đi rêu rao khắp nơi và k sợ phải viết lặp code. Nếu logic sai chỉ cần sửa trong `useCounter` là được.
 # Custom hooks có thể làm được gì ?
## useToggle [(Demo)](https://codesandbox.io/s/red-leaf-ficfg?file=/src/App.js)

Khi bạn dấn thân vào con đường coder nói chung và FE dev nói riêng. Bạn sẽ gặp một số trạng thái mà bạn nên sử dụng chức năng `toggle` . Ví dụ bạn có 1 cái menu với các action click vào để mở menu, click ngược lại để đóng. Thông thường bạn sẽ phải tạo 1 component như thế này.


![Screen Shot 2021-10-31 at 16.42.16.png](https://images.viblo.asia/5c22e695-e72d-4ba7-a92f-cbec8c705dd6.png)

Bây giờ, chúng ta muốn chuyển sang dùng custom hooks để cho tái sử dụng logic trên được hiệu quả bằng cách sau : 
* Đầu tiên ta tạo custom hooks như thế này: 

![Screen Shot 2021-10-31 at 16.44.26.png](https://images.viblo.asia/dae22af1-8cf5-4750-9164-ad1475f62e0f.png)

**Trong thân hàm ta có :** 

💠 Tạo 1 state để chứa giá trị của biến.

💠  Trong custom hook này tạo một hàm toggle để nhận event click tiếp theo sẽ gọi đến action này.

💠  Để khiến cho địa chỉ của hàm không bị thay đổi lại sau mỗi lần render. Ta gọi func useCallback để cache lại dữ liệu trong hàm.Tránh việc rerender không cần thiết trong các component sử dụng nó.

💠 Tiếp theo trong thân hàm ta gọi hàm để `setState` lại. Nhớ rằng bạn sẽ phải sử dụng hàm `setState` với tham số là 1 hàm Callback. Chức năng của hàm callback này với tham số là state, tham số này đảm bảo state của bạn luôn luôn là mới nhất. 

*Note*: Nếu trong trường hợp này bạn thay params của `setState` là `!isToggle` . Bạn sẽ thấy custom hooks này sẽ rerender lại chỉ lần đầu tiên khi gọi sự kiện `onClick`. Nếu bỏ `useCallback` thì lúc này trạng thái sẽ được rerender lại bình thường. Lí do vì sao vầy ? ở đây hàm useCallback sẽ gói hết tất cả các object bên ngoài lại. Trạng thái của nó sẽ dừng lại ở đây cho đến khi tham số thứ 2 bị thay đổi. Tham số thứ 2 ở đây là mảng rỗng. Nên biến `isToggle` khi ở trong hàm sẽ luôn luôn bằng `defaultValue`  

💠  Cuối cùng ta sẽ return về một mảng 2 tham số lần lượt là 
* Giá trị của trạng thái trên. Để các component sử dụng nó có thể hiển thị biến này lên trên màn hình.
* Hàm để thay đổi giá trị của biến state trên. Thông qua hàm này custom hooks sẽ được gọi và xử lí. Trong function này thường dùng để thay đổi giá trị của một state trong custom hooks.
## usePrevState [(Demo)](https://codesandbox.io/s/pensive-brook-7tp8q?file=/src/App.js)
![Screen Shot 2021-10-31 at 20.22.22.png](https://images.viblo.asia/22eea850-7228-4397-994e-63b5b2ae1216.png)
Như các bạn đã biết. Các tham số trong hàm của class component thường sẽ có tham số previousState, previousProps. Trong hooks bạn có nhiều các để implement nó. Nhưng cách có thể xem là clear và có thể tái sử dụng lại nhiều lần nhất là sử dụng usePrevState như trên vầy cách hoạt động của nó như thế nào ?

💠 Đầu tiên bạn sẽ chạy vào usePrevState với props là cái state của component.

💠  Khi vào hàm `usePrevState` nó sẽ tiến hành khởi tạo một ref ở đây. 

Vì sao lại là ref ? Đơn giản là khi ref thay đổi thì custom hooks không rerender lại thôi. 

Để chi vậy ? Khi custom hooks rerender thì parent component bắt buộc phải reRender và `prevState` lúc này nó k còn là previous của state nữa mà nó là current state.

💠  Tiếp theo ta đặt một useEffect với tham số thứ 2 là tham số props chứa state mới nhất của component được truyền vào, mục đích là sẽ cập nhật lại giá trị mới nhất của component cha cho hooks. 

💠 Tiếp theo là return lại giá trị trả về của state trước đó.

Note: Giá trị trả về là giá trị của state cũ, sau khi trả về xong nó sẽ gọi vào hàm useEffect để cập nhật lại giá trị current của state. Sau khi cập nhật xong giá trị thì lần thay đổi state tiếp theo nó sẽ trả về giá trị này.

Trên đây là những chia sẽ ngắn của mình khi làm việc với custom hooks. Nếu các bạn thấy thắc mắc về bài viết hay có những lỗi cấu trúc hoặc trình bày trong bài trên, đừng ngần ngại báo cho mình. mình sẽ có feedback sớm nhất có thể. Mọi người vote,tương tác để bài viết của mình hoàn thiện nhất có thể .
Hi vọng trong bài viết này mình mang lại một số kiến thức bổ ích cho mọi người. 😍

Phần trình bày tiếp theo của mình là sử dụng custom hooks để viết 1 common validate form. Mọi người follow mình nha <3