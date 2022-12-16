### React Server Component là gì?
Trong bài viết này, mình xin chia sẻ lại thông tin ít ỏi mà mình tìm hiểu được trên mạng về **Server Components**, một khái niệm hoàn toàn mới vẫn đang trong quá trình thử nghiệm và phát triển. Vậy **Server Components** là gì ?  
Đầu tiên phải chắc chắn là chúng ta đều nắm rõ khái niệm về **components** trong **Reactjs** đã nhé. Hiểu đơn giản thì **components** là một **function**, nhận vào một loạt các tham số đầu vào (các **props**) và trả về một **React element**, chỉ định những gì sẽ hiển thị ra màn hình. **Components** cho phép chúng ta chia nhỏ giao diện thành các phần độc lập, dễ dàng tái sử dụng và tuỳ biến. Chúng ta tạm gọi **components** mà chúng ta biết hiện nay là **Client Component**.  
**Server Component** có thể coi là một loại **component** mới, sẽ **render** ở phía **server** trước khi được gửi về phía **client** (trình duyệt).  
Khi nghe qua như vậy thì mình thấy khá giống với cách thức mà **Nextjs**, **frameworks** giúp xây dựng ứng dụng **react** theo hướng **server render** đã khá là phổ biến và mạnh mẽ. Thực tế thì mặc dù không hoàn toàn giống nhau nhưng **Server Component** cũng  mang lại rất nhiều ưu điểm tương tự với **Nextjs** như là:  
* Dễ dàng hơn trong quá trình phát triển khi ta có thể kết nối trực tiếp với các nguồn phía **server** như là cơ sở dữ liệu (**database**) hay các **service** nội bộ.  
* Mang lại hiệu năng tốt hơn nhờ giảm độ trễ khi giao tiếp giữa **client** và **server**.  
* Giảm nhẹ kích cỡ của mã nguồn. Các thư viện chỉ sử dụng ở phía **server** sẽ không cần phải truyền tải về **client**.  

Ngoài ra **Server Component** còn một ưu điểm khác đó là tự động chia mã nguồn thành các phần nhỏ, sau đó **clients** chỉ cần **load** những phần cần thiết giúp tối ưu hiệu năng hơn. Nghĩa là chúng ta sẽ không cần phải viết **code** như thế này nữa
```js
const AppComponent = React.lazy(() => import('./app'))
```
Mà cứ **import** trực tiếp **component** chúng ta cần mà thôi:
```js
import AppComponent from './app'
```
### React Server Component và React Component.  
Như mình đã nói thì tư tưởng của **Server Component** nghe qua khá là giống với cách làm **Server Render (SSR)** bằng một số công cụ như **Nextjs** hiện nay.  
Trong **SSR**, khi trình duyệt yêu cầu một trang (**page**), **component** sẽ được **render thành HTML** bởi công cụ **react-dom/server**, sau đó được gửi về **client**. Quá trình **render** này chỉ diễn ra một lần tương ứng mỗi lần chúng ta truy cập tới trang đó. Trong quá trình này, chúng ta hiển là **react-dom/server** đã làm một việc là đọc hiểu toàn bộ cấu trúc **React Element** của trang đó và chuyển thành **HTML** tĩnh. Sau lần **render** lần đầu tiên này, trang của chúng ta sẽ không khác gì một ứng dụng **React** thông thường. Khi cần cập nhật dữ liệu, **Client** sẽ phải gửi **request** tới **API Server**, tương tự như cách mà ứng dụng **SPA** thực hiện, hoặc là chúng ta **refresh** lại trang để quá trình **render** phía **server** được thực hiện lại. Cả hai quá trình sẽ đòi hỏi **component** phải **render** lại từ đầu.  
Đối với **Server Component**, **component** cũng được **render** từ phía **server**, sau đó gửi kết quả về **client** qua một giao thức tuỳ biến. **React** nhận dữ liệu đó và tiến hành hợp nhất (**merge**) giao diện mới với cấu trúc hiện tại mà không làm ảnh hưởng tới trạng thái của **client**. Quá trình này có thể diễn ra bao nhiêu lần cũng được. Hơi trừu tượng phải không, có thể hiểu là **Server Component** là **component** được **render** hoàn toàn từ phía **server** chứ không phải chỉ một lần như cách làm **SSR** hiện nay.  
Có thể hiểu là, đối với **client**, **React Server Component (RSC)** không hoàn toàn giống như **components** hiện nay nữa. Trước hết **RSC** có thể cập nhật chỉ một phần nhỏ giao diện, khác với **SSR**, **RSC** sẽ không bao giờ gửi về cả một trang **HTML** hoàn chỉnh trong lần tải trang đầu tiên. Mà lần tải này sẽ có phần tương tự như đối với cách làm **SPA**, nhận về một trang **HTML** gần như chưa có nội dung.  

Để dễ hình dung hơn, chúng ta cùng xem xét một ví dụ sau, giả sửa ta có một ứng dụng nhỏ hiển thị một danh sách các bộ phim và một ô **input** với chức năng tìm kiếm. Mỗi khi ta thực hiện tìm kiếm thì trên giao diện sẽ cập nhật kết quả danh sách mới tương ứng. Đối với cách xây dựng bằng **components** thông thường, quá trình có thể được mô tả khái quát như sau:  
1. Mỗi khi bạn thực hiện tìm kiếm, một **request** sẽ được thực hiện tới một **Server API**, nhận về một kết quả dạng **JSON**.  
2. Khi nhận được kết quả, chúng ta thực hiện đưa tới **components** (thông qua việc thay đổi **state** hay **props** tương ứng).  
3. **React Component** nhận thấy sự thay đổi và tiến hành **render** lại và hiển thị kết quả mới ra màn hình.  

Đối với **React Server Component**, quá trình thực hiện sẽ hơi khác một chút như sau:  
1. Một yêu cầu mạng (**network request**) được gửi tới **server backend**, **server** này có khả năng cung cấp **RSC**.  
2. **Component** sẽ tự mình thực hiện **render** ở phía **server** (bước 2 và 3 ở trên) và trả về cho **client** kết quả là một dạng **static markup** không phải **HTML** hay **JSON**.  
3. Phía **Client** sẽ thực hiện đọc phần kết quả nhận được và **render** ra giao diện tĩnh. Phía **client** không cần thực hiện **request** dữ liệu tới **server** và **render** kết quả đó. Mà chỉ thực hiện chuyển hoá kết quả **render** từ phía **server** thành **HTML** tĩnh.

##### Một số lưu ý ở thời điểm hiện tại
1. **Server Component** không thể có những tương tác (không thể sử dụng được các **api** như **useState** hay **useEffect**) bởi vì chúng chỉ đảm nhận việc cập nhật giao diện.  
2. **Server Component** vẫn có thể chứa ***Client Component***, và những **component** này vẫn sẽ hoạt động đầy đủ tính năng như bình thường.  
3. **Props** truyền vào **RSC** phải ở dạng **serializable**, nghĩa là **props** có thể ở dạng **strings** hay **JSON**, nhưng không thể ở dạng **jsx**.  

**React Server Component** hiện nay vẫn đang trong quá trình phát triển và thử nghiệm, hứa hẹn sẽ là một bước phát triển tiếp theo của **reactjs** giúp hỗ trợ tốt hơn cho **SSR** cũng như tối ưu ứng dụng **react** tốt hơn. Chúng ta hay cùng chờ đợi thêm một khoảng thời gian nữa để được trải nghiệm thực tế thay đổi này nhé.  

Nguồn tham khảo:  
[React Server Components Explained](https://www.freecodecamp.org/news/react-server-components/)  
[Introducing Zero-Bundle-Size React Server Components](https://reactjs.org/blog/2020/12/21/data-fetching-with-react-server-components.html)