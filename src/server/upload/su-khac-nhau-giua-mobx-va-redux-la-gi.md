Xin chào mọi người, mình là Cody - Front end developer với main skill là tạo ra những bug khổng lồ còn soft skill thì là ReactJs =)).
Nguyên nhân mình quyết định viết series về Mobx này là vì mình vào hụt một dự án dùng Mobx :-s và công ty mình bắt viết report hàng tháng :-ssss.

Sau một khoảng thời gian tìm hiểu thì mình thấy Mobx cũng khá hay, sử dụng nhiều thứ fancy đằng sau mà mình muốn đào sâu hơn nên okay quất thôi.

## 1. Giới thiệu
Mobx là 1 thư viện Javascript dùng để quản lý state của ứng dụng. Mobx có thể sử dụng được với Javascript thuần và với cả các modern framework như Angular, Vue hay React. 
Đằng sau Mobx là cả 1 tư tưởng lớn về Reactive Programming nhưng ở trong khuôn khổ series này thì mình sẽ không đề cập đến, bạn có thể tham khảo RxJs - 1 thư viện đem Reactive Programming vào Javascript để có thể hiểu hơn về behind the scene của Mobx.

## 2. Concept hoạt động của Mobx

![](https://images.viblo.asia/1b83191e-84e5-49ce-92e9-6dff8f62ab07.png)

Flow hoạt động của Mobx sẽ gồm 4 bước chính như sau:

1. Các event từ UI sẽ gọi đến những actions trong store của Mobx.
2. Các actions này sẽ thay đổi trực tiếp (mutate) các observable state trong store.
3. Những observable state sau khi thay đổi sẽ được truyền đến các cập nhật lại những computed value (những giá trị được tính toàn và trả về bởi method getter).
4. Cuối cùng, các side-effect (như render component) sẽ được trigger để render component với state mới.

## 3. Sự khác nhau giữa Mobx và Redux.

### 3.1. Mutate và immutable

![](https://res.cloudinary.com/practicaldev/image/fetch/s--xJWQqOj3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://user-images.githubusercontent.com/26871154/72139658-d8499280-3397-11ea-87b7-f719bdc06222.png)

- Redux: Redux sử dụng chung lý tưởng với React về state - state của chúng là immutable. Khi bạn thay đổi state trong Redux, nó sẽ replace state cũ === 1 state mới. Do vậy, với những state có type === object, array, Maps hoặc Sets mà bạn không sử dụng 1 số phương pháp copy state như Objects.assign(), spread operator hay dùng 1 số thư viện hỗ trợ như Immer.Js, Immutable.Js, ... thì bạn sẽ dính chưởng ngay.
- Mobx: Mobx sử dụng tinh thần của Reactive programming cùng với 1 số pattern như observable nên bạn có thể thoải mái thay đổi, gán trực tiếp state cũ = state mới. Việc còn lại Mobx nói ông bà già Mobx lo hết =)). 

### 3.2. Store

- Redux: Mô hình của Redux là bạn sẽ chỉ có 1 store duy nhất dùng để quản lý state và các action (a single source of truth).
- Mobx: Ngược lại, Mobx lại có thể chia ứng dụng thành rất nhiều store nhỏ. Mỗi store sẽ tự quản lý state và action của riêng mình.

### 3.3. Coding paradigm

![](https://miro.medium.com/max/1470/1*gC-mtCSPHG1mRC1UcT_hVw.png)

- Redux: Redux sử dụng Function Programming trong toàn bộ quá trình code. Việc này khá tiện lợi nếu như bạn không quen với OOP.
- Mobx: Ngược lại, Mobx hỗ trợ đầy đủ các khái niệm của OOP như class-base, decorator, inheritance, ... Nếu bạn muốn sử dụng Mobx nhưng không quen thuộc với OOP  thì cũng không sao, bạn cũng hoàn toàn có thể sử dụng Mobx với Function Programming.

### 3.4. Boilerplate:

![](https://i0.wp.com/www.thecoderworld.com/wp-content/uploads/2020/01/Difference-between-Framework-and-Library-1.png?fit=1280%2C720&ssl=1)

- Redux: Với Redux, sẽ có rất nhiều thứ, rất nhiều thư viện đi kèm bạn cần phải học để có thể implement Redux 1 cách đầy đủ như defind các actions, reducer và sử dụng các middleware để xử lý side effect như Redux Thunk, Redux Saga, ...
- Mobx: Mobx là 1 thư viện quản lý state, khác với Redux là cả 1 framework với nhiều khái niệm trừu tượng, bạn không phải lo lắng config quá nhiều thứ để có thể bắt đầu 1 ứng dụng. Khối lượng code khi sử dụng Mobx cũng sẽ giảm đi rất nhiều so với Redux và bạn cũng hoàn toàn không phải học những khái niệm đâu đầu như trên.

## 4. Vậy có nên sử dụng Mobx không?

Sau khi khen quá trời khen Mobx, chúng ta sẽ bàn tới 1 số vấn đề nhức nhối còn tồn tại của Mobx, từ đó bạn có thể cân nhắc mình có nên sử dụng Mobx cho dự án sắp tới không.

### 4.1. Khá là khó để debug.

- Đằng sau Mobx còn khá nhiều vấn đề ví dụ như việc Mobx tự động detect sự thay đổi của state, tự động trigger việc render của component sẽ làm chúng ta khó khăn trong việc theo dõi cũng như quản lý những tác vụ chạy ngầm này.
- Hơn nữa, debug tool của Mobx hiện tại có thể nói là khá lởm, lởm hơn của Redux rất rất nhiều. Điều này càng làm việc debug trở nên khó khăn hơn.

### 4.2. Cộng đồng hỗ trợ.

- Còn gì khổ hơn việc khó debug mà chả biết tìm ai để hỏi. Yup, nếu bạn sử dụng Mobx thì rất có thể bạn sẽ rơi vào tình huống này vì cộng đồng developer sử dụng Mobx còn khá là ít nếu so với Redux.

### 4.3. Maintain and scalability

- Có rất nhiều bài so sánh đã đánh giá việc maintain và khả năng scale của Mobx không bằng so với Redux. Tuy nhiên, cá nhân mình thấy việc này cũng tuỳ thuộc vào nhiều yếu tố =)). Bằng chứng là Mobx sử dụng OOP, mình đã hỏi qua khá nhiều middle và senior developer và họ cho rằng việc sử dụng OOP sẽ dễ scale ứng dụng hơn.
- Tiếp nữa là việc apply Typescript vào 1 dự án React sử dụng Mobx cũng tương đối dễ hơn so với Redux. Nếu trong một dự án mà member thuộc nhiều level khác nhau thì cũng nên cân nhắc sử dụng công nghệ về vấn đề này nếu như dự án của bạn cần sử dụng Typescript.

## Tóm lại

Mobx là một thư viện quản lý state khá mạnh, dễ sử dụng, giúp bạn giảm phần nào thời gian phát triển sản phẩm.

Tuy nhiên, việc có nên sử dụng Mobx cho các dự án sắp tới của bạn không thì điều này hoàn toàn phụ thuộc vào sở thích cũng như nhận định của bạn về những điều mà Mobx có thể mang lại.

Nếu bạn muốn tìm hiểu thêm về Mobx thì hãy đón chờ những bài tiếp theo trong series này của mình nhé.

Happy coding!

## Tài liệu tham khảo

[https://mobx.js.org/README.html](https://mobx.js.org/README.html)

[https://github.com/mobxjs/mobx-devtools](https://github.com/mobxjs/mobx-devtools)

[https://redux.js.org/](https://redux.js.org/)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

[https://rxjs-dev.firebaseapp.com/](https://rxjs-dev.firebaseapp.com/)

[https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Object/assign](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

[https://github.com/immerjs/immer](https://github.com/immerjs/immer)