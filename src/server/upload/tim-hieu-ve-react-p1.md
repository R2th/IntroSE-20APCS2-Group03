Hi guys, rất vui được gặp lại mọi người trong bài viết lần này. Nếu ai theo dõi các bài viết của mình trước đây thì cũng biết là mình toàn viết về Ruby on Rails thôi, nhưng đợt này muốn kiếm gì đó mới mẻ cho bản thân cũng như sợ mọi người nói mình viết bài chỉ có một màu (màu đỏ của Ruby :yum: ) nên hôm nay mình sẽ cùng mọi người tìm hiểu một công nghệ mới đối với mình, đó là React.

***Aight, let's dive right in!***
## 1. React là gì

React là một thư viện JavaScript mở, được Facebook cho ra mắt vào năm 2013. React được tạo ra để giúp xây dựng các interfaces một cách dễ dàng và có thể sử dụng lại được. Ý tưởng của React là chia nhỏ giao diện người dùng thành các components riêng rẽ. Những components riêng rẽ và có thể sử dụng lại được là chức năng chính của React, kèm theo đó là các thành phần chính không kém phần quan trọng khác như JSX, State, và Props. Chúng ta sẽ cùng tìm hiểu các phần chính của React bên dưới.

Song song với các phần lý thuyết nhàm chán thì mình cũng kèm theo các demo minh họa để mọi người dễ hình dung hơn. Demo mà mình sử dụng đây chỉ đơn giản là một ứng dụng đếm số, Counter, số đếm bắt đầu từ 0, nhấn + thì cộng lên 1, nhấn - thì trừ đi một, và nút Reset sẽ reset bộ đếm về 0. Các phần như installation hay create project thì ở trang chủ của React đã có hướng dẫn rồi, mọi người có thể dễ dàng tìm được nên chúng ta sẽ nhảy thẳng vào các khái niệm cơ bản của React đi kèm với ví dụ minh họa luôn nhé.

![Demo](https://images.viblo.asia/fb4fc9af-d19c-4336-9807-05d83fd6d423.gif)


> Có một lưu ý đó là vì React là một thư viện của JavaScript như mình đề cập ở trên nên tất nhiên chúng ta sẽ phải biết cơ bản JS để có thể đọc hiểu và làm việc với React, nên nếu bạn chưa biết gì về JS cả thì mình suggest dừng đọc bài viết ở đây, và [tìm hiểu về JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript), sau đó hãy qua lại đọc bài viết này nhé. 
> 
> Have fun!

## 2. JSX

Để bắt đầu với React thì ta cần phải làm quen với JSX, thì JSX là một extension của JavaScript được sử dụng để giao tiếp với React về việc UI của chúng ta sẽ trông như thế nào. Mặc dù nó trông giống như HTML, JSX cho phép chúng ta tạo ra UI và các logic ở cùng một chỗ. Bằng cách sử dụng JSX, chúng ta có thể nhúng các logic JS vào ngay trong UI của mình. Nếu bạn đã từng làm việc với Ruby on Rails thì JSX cũng đóng vai trò tương tự như Ruby's ERB, chúng ta có sẽ sử dụng chúng để tạo một layout với các biến một cách linh động.

Thay vì tách riêng rẽ phần logic và markup với nhau thì React lại muốn tách các thành phần theo một đơn vị khác, gọi là các "components" chứa cả hai. Chúng ta sẽ quay lại component sau, tuy nhiên nếu các bạn cảm thấy khó khăn khi gộp chung markup và logic thì JSX cũng không phải là bắt buộc đối với React. Những có lẽ bạn sẽ bị thuyết phục sau khi xem buổi hội thào về React [này](https://www.youtube.com/watch?v=x7cQ3mrcKaY)

***Ví dụ JSX***

![JSX Example](https://images.viblo.asia/40a50a61-6f7b-4fc2-9fb0-4e44af75e3ac.png)


## 3. Components

Giờ thì chúng ta cùng xem các components là gì nhé. Nói chung, giao diện của React được hình thành nên từ những components nhỏ chứa cả logic và markup và có khả năng tái sử dụng. Những components này được biên dịch trở thành HTML và sau đó được thêm vào trong DOM để render ra cho người dùng. React components cũng có 2 loại, đó là class-based components, và functional components. 

Bên dưới đây là minh họa cho 2 loại components vừa nêu trên đã được mình tích hợp trong demo đề cập ở trên.

***Class-based component***

![Class-based component](https://images.viblo.asia/f3cf3553-ca22-4b69-8007-28f9888d7010.png)


***Function component***

![](https://images.viblo.asia/1bc36a98-5851-4669-afb7-31ae40d70baa.png)


Từ 2 components trên, chúng ta có thể thấy, sự khác nhau chính giữa 2 loại components trên đó là Class-based component có thể lưu trữ **state**. Chúng ta sẽ bàn về state bên dưới, hiện giờ có thể hiểu state như là một parameter. State cho phép các component của chúng ta trở thành các component động và linh động hơn. Còn đối với function components, nó không có khả năng lưu trữ các state, và nó cũng chỉ chưa mỗi một return method cùng với giá trị **props** (sẽ được giải thích ở phần bên dưới) và trả về cái cần render.



## 4. State

Có lẽ bạn vẫn thắc mắc, thực ra state là gì? Giờ chúng ta sẽ tìm hiểu về State nhé.

State là một đối tượng được đính kèm vào một Class component. Nó có thể được khởi tạo hoặc được thay đổi thông qua input của người dùng hoặc các API. State được giữ bởi một component cha và có thể được truyền xuống các component con của nó thông qua **props**. Đây được gọi là **Unidirectional Flow**, đây cũng là một key feature của React nhé.

Giải thích thêm một chút về  **unidirectional flow**, nó còn được biết đến với tên gọi one-way data flow, có nghĩa là data sẽ có một và chỉ một hướng để chuyển đến các phần các của ứng dụng. Cụ thể hơn, các component con sẽ không thể cập nhật data được gửi đến từ component cha. Lợi ích chính của flow này là để chắc chắc chúng ta đang đi theo một mô hình data flow rõ ràng và "sạch", giúp chúng ta có thể quản lý nó dễ hơn. Chúng ta sẽ tìm hiểu cụ thể hơn ở mục tiếp theo nói về Props nhé.

Tiếp tục với State, state của một component phải được lưu trữ ở một cấp đủ cao trong hệ thống các components để có thể truyền nó đến các component con mà không phải truyền nó qua các component không cần thiết. State chỉ có thể truyền xuống các component con và không thể dùng ở các component đồng cấp. Bất kể khi nào state của một component bị thay đổi, component đó và cũng như các component con của nó sẽ được cập nhật để hiển thị state mới.

*Define và sử dụng state trong component App ở ví dụ trên*

![State](https://images.viblo.asia/a0b1ddbe-8248-4fab-9165-95a39e3203c8.png)

Lưu ý thêm ở đây, mọi người để ý 2 hàm **handleCount** và **reset** của mình, thì mình đang dùng setState để cập nhật state, có lẽ nhiều người sẽ thắc mắc ở hàm **reset** sao không dùng `this.state.count = 0` cho dễ hiểu. Thì giải thích luôn cho mọi người là đây là một bad practice trong React, nếu mọi người update state theo kiểu này thì component sẽ không re-render để show ra state mới nhất nên dẫn đến việc bắt buộc nếu muốn udpate state thì phải dùng setState thôi.

Để mình thử demo thay setState ở hàm **reset** bằng `this.state.count = 0` xem chuyện gì sẽ xảy ra nhé, hàm **reset** mới của mình sẽ như dưới

![Update state bad pratice](https://images.viblo.asia/d54971e2-0d1b-4f64-b09a-722dc65e8d03.png)

Sau khi start server thì mình liền nhận ngay một gậy warning từ React

`
Compiled with warnings.
`

`
src/App.js
  Line 20:5:  Do not mutate state directly. Use setState()  react/no-direct-mutation-state
`

Và ngay cả chức năng reset của mình cũng không còn hoạt động đúng, vì giờ component không re-render nên có nhấn reset bao nhiều lần thì count cũng không trở về giá trị là 0 được.

![](https://images.viblo.asia/3b6439ae-10d2-4276-b44d-29d77482b68d.gif)

## 5. Props

Chúng ta đi đến phần cuối của bài viết hôm nay, Props. Props là các đối tượng được đứa đến các component bởi các component cha của chúng. Props được truyền để tạo ra các component động. Không phải lúc nào chúng ta cũng muốn render các data tĩnh, và đó là lúc props phát huy tác dụng của nó. Props được truyền đến các component khác nhau bởi vì mục tiêu chính của React là tạo ra các "small pure components". Sẽ thế nào nếu chúng ta muốn tạo ra một component lớn với state và cho nó render từng phần của UI? Cũng được thôi, nhưng nó sẽ gặp vấn đề với việt đọc hiểu và sử dụng lại các phần trong UI đó ở nơi khác. Thử hình dung, khi bạn cần một phần nhỏ trong component lớn vừa tạo, bạn sẽ cần phải render nguyên cả một component đó một lần nữa đấy.

Để ý vào function components mà mình đã đưa ở trên thì mọi người có thể thấy, function component Count của mình đang nhận vào props mà cụ thể ở đây là state count được truyền vào ở class component App bên trên.

Một lưu ý ở đây nữa là Props sẽ là read-only nhé mọi người, có nghĩa là prop mà component Count của mình nhận vào sẽ không thể thay đổi mà chỉ có thể đọc thôi. Ví dụ, mình thử ở function component Count sẽ gán cho props.count là props.count - 1 xem sao nhé.

![Bad Props Practice](https://images.viblo.asia/c37a495b-5f4c-42ba-b033-fd7617138bfc.png)

Thì ngay lập tức React sẽ báo lỗi `TypeError: Cannot assign to read only property 'count' of object '#<Object>'`

![](https://images.viblo.asia/623ccb8a-f72a-4a24-bf75-85c43ca4acde.png)

## 6. Tổng kết
Vừa rồi mình đã đi qua một vài thành phần chính của React, chúng ta vẫn còn rất nhiều thứ phải tìm hiểu chứ không chỉ dừng lại ở mức độ này thôi là đủ hiểu React. Kỳ tới mình sẽ cố gắng mang đến thêm các kiến thức cơ bản của React nữa, wait for it!

Cuối cùng nhưng không kém phần quan trọng, chúng ta nên nhớ, một thư viện chỉ là công cụ để giúp công cuộc coding của các developer trở nên dễ dàng hơn thôi. Nếu cảm thấy hứng thú với React, bạn có thể xem qua document của React ở đường  [link này](https://reactjs.org/docs/getting-started.html). Tất cả mọi thứ bạn làm trong React, đều có thể làm với  JavaScript bình thường. React và các thư viện JS khác như, Angular, Vue, và Ember không phải là các công cục bắt buộc phải có khi lập trình với JS. So... choose wisely!

**Link tham khảo:**

https://reactjs.org/tutorial/tutorial.html#what-is-react

https://www.geeksforgeeks.org/unidirectional-data-flow/

https://dev.to/talia/beginner-s-guide-to-react-3986