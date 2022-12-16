Sau khi có các kiến thức cơ bản về Redux như store, action, reducer, provider... Để tổng hợp các kiến thức đã học chúng ta cùng bắt tay vào làm ví dụ về Counter.<br/>
* Counter đơn giản chúng ta có hai nút bấm:<br/><br/>
                ![](https://images.viblo.asia/603c790e-b352-4dd4-a6e4-728dbd07e4ce.png)
    * Khi click vào nút (+) thì giá trị trong ô input sẽ tăng
    * Khi click vào nút (-) thì giá trị ô input sẽ giảm <br/>
* Trong bài viết này chúng ta cùng xây dựng Counter với
    * React<br/>
    * React + Redux
## 1. Counter với React<br/>
Chúng ta sẽ xây dựng ví dụ đơn giản thông qua React và từng bước thêm Redux vào để có thể dễ hiểu hơn Redux hoạt động như nào nhé.<br/>
Sau khi cài đặt, chúng ta tạo một file Counter.js với code như sau:<br/><br/>
    ![](https://images.viblo.asia/aa80e48a-980a-4ac4-a872-b5c5df1a6c84.png)<br/>
* Giải thích nhanh về đoạn code trên:
    * Biến count sẽ được khởi tạo và lưu trữ trong state ngay ở đầu Counter component
    * Khi người dùng click vào "+" thì sự kiện onClick() sẽ được gọi, cụ thể function increment() sẽ được thực thi. Increment() sẽ cập nhật state với một count mới. Tương tự  khi người dùng click vào "-".<br/>
    * Bởi vì state bị thay đổi nên React sẽ re-render lại Counter component và giá trị count mới sẽ được hiển thị.<br/>
* Mở file src/index.js và thay thế với đoạn code sau:<br/><br/>
![](https://images.viblo.asia/1017d166-477e-42e9-8efb-13b96530ba83.png)<br/><br/>
Giờ thì run project nào!!!<br/>
## 2. Counter với React + Redux <br/>
Ở phần 1, React lưu các state ở đầu các component. Hãy nghĩ tới việc bạn có 10 component lồng nhau và phải truyền data từ root component tới component thứ 10 để đọc dữ liệu. Thật kinh khủng. Redux sẽ giúp bạn giải quyết vấn đề đó. Redux sẽ giúp bạn giải quyết vấn đề đó. Nó lưu tất cả các state của app trong một global store và bất cứ component nào trong app cũng có thể gọi tới.<br/>
Quay trở lại ví dụ, chúng ta lần lượt xây dựng store, action, reducer...<br/>
* **Xác định Action**<br/>
    Như ta đã biết, Cách duy nhất để thay đổi State của ứng dụng là phát đi một Action(là một object mô tả những gì cần thực hiện). Trong ví dụ chúng ta có 2 Action chính đó là tăng và giảm count. Action có dạng như sau: <br/>
    ![](https://images.viblo.asia/52ea9413-039d-4298-82c2-19b5b862ce33.png)<br/>
    ![](https://images.viblo.asia/87ba7b19-d26f-425b-8ffb-395965d85351.png)<br/>
* **Xây dựng Reducer**<br/>
    Khác với action có chức năng là mô tả những thứ gì đã xảy ra, không chỉ rõ state nào của response thay đổi, mà việc này là do reducers đảm nhiệm, nó là nơi xác định state sẽ thay đổi như thế nào, sau đó trả ra một state mới.<br/>
    Tương ứng với mỗi action ta đã xác định ở trên, ta có reducer như sau:<br/><br/>
    ![](https://images.viblo.asia/0d41b14a-87b2-45b0-93e9-e95876892606.png)
* **Tạo Store**<br/>
    Chúng ta đã có reducer, giờ chỉ việc truyền reducer thông qua hàm createStore là xong:<br/><br/>
    ![](https://images.viblo.asia/d6eaf620-3c97-4b0d-adfc-1466d588003c.png)<br/>
* **Cung cấp Store cho toàn bộ App thông qua Provider**<br/>
    Redux bọc toàn bộ app với Provider component mà mọi component trong app có thể truy cập tới Redux store thông qua **connect** khi cần.<br/><br/>
    ![](https://images.viblo.asia/ad4a8494-277f-4b79-bbb3-c75a69b2cdfa.png)
*  **Counter component connect tới Store**<br/>
Chúng ta đã có Store rồi. Giờ làm sao để sử dụng được nó ???<br/>
**"connect"** sẽ giúp chúng ta thực hiện điều đó.<br/><br/>
![](https://images.viblo.asia/22382f66-12f6-448a-8206-b4f7383ef298.png)<br/><br/>
Hàm mapStateToProps() sử dụng để lấy count từ Store mà Counter component yêu cầu, count trả về sẽ là props của component. Nhưng chỉ mapStateToProps() thôi chưa đủ, chúng ta cần connect() để connect tới store của app. Và cuối cùng dispatch action để thực thi là xong!<br/>
Bạn có thể tham khảo source code tại đây [Github](https://github.com/dceddia/redux-intro)<br/>

### **Kết luận:**
* Trên đây là một chút kiến thức mà mình tìm hiểu được về Redux, rất mong được sự góp ý của mọi người. Cảm ơn mọi người đã theo dõi bài viết của mình.

**Tài liệu tham khảo:**
* https://daveceddia.com/how-does-redux-work/
* https://redux.js.org/