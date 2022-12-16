React là một thư viện và không phải là một framework, vì vậy nó không đưa ra bất kỳ cấu trúc nào khi xây dựng một app. Điều này giúp các dev có thể tự do tạo ra cấu trúc dự án theo ý muốn của mình. Tuy nhiên, với những junior dev thì việc này rất khó khăn để tìm được một cấu trúc phù hợp với dự án của mình.
## Quan điểm cá nhân
Mỗi dự án, sẽ giải quyết một bài toán cụ thể và do đó cần một cấu trúc và các quy tắc cụ thể. Có những cấu trúc rất tốt cho dự án này nhưng với dự án khác thì nó lại là cách tiếp cận tồi. Vì vậy, cách tiếp cận trong phạm vi của bài viết này chưa chắc đã giải quyết được nhu cầu của dự án của bạn. Tuy nhiên, nó có thể giúp ích bạn thay đổi mindset để cấu trúc lại dự án của mình một cách tối ưu hơn.

Cấu trúc trong bài viết này sẽ cho phép dự án của bạn có thể scale và dễ dàng maintenance.

Nếu chúng ta tìm được một cấu trúc phù hợp với dự án của mình để tiến hành tái cấu trúc thì nó sẽ giúp cải thiện năng suất làm việc của bạn.

**OK, Let's go...**

# 1. Global Structure
Thư mục root sẽ có cấu trúc tương tự với các dự án khác, vì nó chứa config của dự án nên chúng ta sẽ chỉ tập trung vào cấu trúc của thư mục `./src`.

Dưới đây là cấu trúc của thư mục `./src`

![](https://images.viblo.asia/43d049b8-403f-485e-ab91-7cb084b623ce.png)

## 1.1. Root
* `./index.js`: là file endpoint của dự án. Trong file này, bạn sẽ khởi tạo các thư viện mà dự án sẽ sử dụng, ví dụ như theme provider ([styled-components](https://styled-components.com/), store([Redux](http://redux.js.org), [Apollo](https://www.apollographql.com/docs/react/) hoặc các thư viện khác) [@material-ui](https://material-ui.com/)), router ([React Router](https://reactrouter.com/)) và component `<App />`.
* `./App.js`: chứa các containers của toàn bộ dự án và `<Router />`.
* `./router.js`: bao gồm `<Switch />` và các `<Route />` của dự án.

## 1.2. `./assets`
Thư mục này sẽ bao gồm các ảnh, icons, fonts và các file media khác. Nhưng để thư mục này không trở thành một *"thùng rác"*  khi dự án ngày càng phát triển, thì thư mục này sẽ được sắp xếp theo ngữ cảnh.

![](https://images.viblo.asia/8ecfb7a6-9576-4607-bf0c-9c44fa2ef507.png)

> Một file asset nếu chỉ dược sử dụng trong một container cụ thể thì nó sẽ được đặt trong thư mục là tên của container đó.

Ví dụ, file `logo.svg` sẽ được sử dụng ở bất kỳ đâu trong ứng dụng nên chúng ta sẽ đặt nó ở root của thư mục `./assets`. Nhưng file `avt-default.png` chỉ được sử dụng trong container profile vì vậy nó sẽ được đặt trong thư mục `./assets/profile`.

Bằng cách này, chúng ta có thể tìm kiếm dễ dàng các file asset và các file asset bị duplicate hoặc không dùng nữa.

## 1.3. `./components`
Theo [tài liệu của React](https://reactjs.org/docs/faq-structure.html), để nhóm các components chúng ta có thể sử dụng hai cách:'
* Nhóm theo tính năng hoặc route
* Nhóm theo kiểu (CSS, components, tests,...)

Tuy nhiên, với cách thứ 2 thì khi số lượng component nhiều, chúng ta có thể gặp rất nhiều rủi ro, các file chống chéo lên nhau, việc thay đổi có thể ảnh hưởng đến file khác hoặc fix bug không triệt để.

Để một component đúng nghĩa thì cần thỏa mãn hai quy tắc sau:
* Nó phải là một *Presentational component*, có nghĩa là nó không kết nối trực tiếp với state của ứng dụng và chắc chắn không fetch hoặc post dữ liệu. Nó có thể tương tác với container cha bằng cách trigger các hàm được pass trong **props**.
* Nó phải được sử dụng trên container hoặc các components khác.

Tùy thuộc vào mục đích của dự án mà component có thể là một trang hoặc là module của một trang.

## 1.4. `./containers`
Các file trong thư mục này có thể:
* Subsribe store.
* Trigger side effects, tương tác với store, fetch hoặc post dữ liệu,...
* Gửi các sự kiện phân tích.
* Cung cấp state, data và actions cho component thông qua props.

Với cách chia này thì chúng ta có thể phân tách được thành phần logic và thành phần presentational của ứng dụng.

## 1.5. `./core`
Thư mục này cũng có thể đặt tên là `commons` hoặc `shared`. Nó chứa mọi thứ được tái sử dụng trong ứng dụng.

![](https://images.viblo.asia/b8ae81cc-9ae2-4f36-9f9a-8f6349ea173f.png)

Thư mục `./store` chứa các config của store và các middlewares. Nó cũng chứa tất cả **reducers**, **actions**, **actionTypes**, [**selectors**](https://medium.com/@matthew.holman/what-is-a-redux-selector-a517acee1fe8#:~:text=A%20selector%20is%20a%20function,encapsulate%20your%20global%20state%20tree.).

Có hai cách để tổ chức **reducer** :
*  nằm bên cạnh **container** mà nó được sử dụng chủ yếu.
*  gộp tất cả các **reducers** vào một thư mục.
Vì các state và actions sẽ được tái sử dụng nhiều trong dự án nên chúng ta nên tổ chức **reducer** theo cách đầu tiên. Điều này sẽ giúp tìm kiếm dễ dàng hơn.

Thư mục `./themes` chứa các **styles global** và các **animations**. Các biến dùng chung sẽ được lưu ở file `index.js`. [(Tài liệu)](https://styled-components.com/docs/advanced#function-themes).

# 2. Container Structure
![](https://images.viblo.asia/9b2cc7ed-7549-41a9-916a-bd783b13f240.png)
## 2.1. Root
* `./index.js`: định nghĩa và giá trị trả về của container.
* `./styled.js`: chứa style của component (sử dụng với styled-compent), các components trong file này sẽ có cấu trúc `<StyledAaa />`.
* `index.test.js`: for testing.

## 2.2. `./components`
Một **container** sẽ sử dụng những **component** riêng của nó. Thư mục này được sử dụng để gộp những sub-components tạo ra một component cha mà nó chỉ được sử dụng riêng ở chính container này. Ở đây, `<SubComponentB />` có thể là con của `<SubComponentA/>`.

## 2.3. `./service`
**service** sẽ thực hiện nhiệm vụ gọi API của **container** cụ thể. Không phải tất cả **container** đều cần `./service` vì có thể nó đã có sẵn trong thư mục `./core`.

Để cho container nhẹ nhất có thể nên `./service` được đặt ngay trong container sử dụng chính service này. Bạn hoàn toàn có thể gộp tất cả các services vào một thư mục. Tuy nhiên, việc này có thể sẽ khiến những dev khác cảm thấy khó chịu khi không biết chính xác **container** đã sử dụng những service nào.

# 3. Structure of the React Component
Dưới đây là một ví dụ về cách chúng ta có thể sử dụng để viết một **component**.

![](https://images.viblo.asia/35c4ff1c-3790-4438-9e69-e582bba60c4d.png)

Khi bạn mở một **component** lên thì bạn sẽ biết được ngay các **props** mà **component** sẽ nhận từ cha. Tiếp theo chúng ta sẽ khởi tạo các **hook** mà **component** cần sử dụng. Ngay sau khi biết được các **props** của **component** thì chúng ta cần chú ý đến các globle state và local state mà **component** này nhận được và sử dụng.
 
Theo thứ tự quan trọng thì **effect** là phần chúng ta muốn xem tiếp theo sau state để có thể biết được **component** này hoạt động như thế nào. Cuối cùng là logic. Với cách trình bày code như này chúng ta sẽ rất nhanh nắm bắt được mục đích của component này để làm gì?

# 4. Chú ý
Để đảm bảo tính nhất quán của dự án, bạn cần nhớ rõ các rules sau:
* Một file asset nếu chỉ dược sử dụng trong một container cụ thể thì nó sẽ được đặt trong thư mục là tên của container đó.
* Component phải là một *Presentational component*, có nghĩa là nó không kết nối trực tiếp với state của ứng dụng và chắc chắn không fetch hoặc post dữ liệu. Nó có thể tương tác với container cha bằng cách trigger các hàm được pass trong **props**.
* Component phải được sử dụng trên container hoặc các components khác.
* **service** sẽ thực hiện nhiệm vụ gọi API của **container** cụ thể. Không phải tất cả **container** đều cần `./service` vì có thể nó đã có sẵn trong thư mục `./core`.

# 5. Tổng kết
Có rất nhiều các cách tiếp cận khi tạo cấu trúc cho một dự án React. Vơi cách tiếp cận này, chúng ta giúp cho dự án scale nhanh hơn, hoạt động một cách hiệu quả, cho phép maintenance nhanh chóng mà không ảnh hưởng đến chất lượng của codebase. 

Vậy quay trở lại với câu hỏi chính của bài viết này *"Với tốc độ scale nhanh thì các dự án ReactJS nên cấu trúc như thế nào?"*, mỗi dự án sẽ có một cách cấu trúc khác nhau. Tuy nhiên, điều quan trọng nhất chính là duy trì được sự nhất quán trong toàn bộ dự án và các thành viên cần tuân thủ chính xác theo rules mà cấu trúc đưa ra. 

Ngoài ra, để tái cấu trúc với dự án sử dụng React - Redux thì chúng ta nên làm như thế nào? Mời các bạn đón đọc vào phần tiếp theo.

Thanks for reading!

## Tài liệu tham khảo
- [How You Should Structure Your React Applications](https://medium.com/better-programming/how-you-should-structure-your-react-applications-e7dd32375a98)