## 1. Mở đầu
<hr>

Chắc hẳn đối với mỗi bạn front-end engineer thì cụm từ **state management** không có gì là xa lạ nữa. Hiểu đơn giản thì nó sẽ là phương pháp mà bạn sử dụng để **quản lý state** trong ứng dụng front-end của bạn. Trong bài viết ngày hôm nay mình sẽ chia sẻ với các bạn về những gì mình đã trải nghiệm cũng như những bài học mà mình rút ra sau một thời gian làm việc với `ReactJS` và `VueJS`. Nào chúng ta cùng bắt đầu.

## 2. State là gì?
<hr>

**State** hay dịch ra tiếng Việt là trạng thái theo mình hiểu đó là trạng thái của ứng dụng trong một thời điểm nhất định. Trong một số trường hợp thì trạng thái này có thể là hiện diện cho những gì mà người dùng thấy trên màn hình hay đôi khi cũng là ẩn đi đối với người dùng. Giả sử ngay trên Viblo khi bạn click vào avatar của mình ở góc trên bên phải màn hình thì bạn sẽ thấy hiển thị ra một cái dạng dropdown. Và ngược lại khi nó đang hiển thị và bạn click lại thì nó sẽ mất đi:

![](https://images.viblo.asia/df51eeb1-4d92-4270-8aaf-a51e566a4bb3.gif)

Việc ẩn hay hiện cái dropdown đó là do sự thay đổi của state trong ứng dụng của bạn. Hay nếu bạn đã từng viết bài trên Viblo thì sẽ thấy Viblo luôn tự động lưu bài viết của chúng ta mà ta không cần phải click nút Save liên tục. Tuy nhiên ta không thấy được điều này hiển thị rõ ràng nếu bạn viết trong chế độ `Fullscreen` hoặc `Side by side`. Thực tế ở sâu trong đó chắc chắn cũng phải có một state nào đó bị thay đổi đơn giản nhất đó là nội dung liên quan đến thời điểm gần nhất bài viết được tự động lưu.

![](https://images.viblo.asia/e04099e2-9ce7-4256-8737-ae15f1972903.png)

Bên trong code của chúng ta các state này sẽ được biểu diễn dưới các dạng các giá trị có kiểu dữ liệu như Number, Boolean, Object, Array, ... . Với ví dụ đầu tiên như ta thấy ở trên thì việc ẩn và hiện phần dropdown có thể được quyết định bởi một biến kiểu boolean như:
```json
{
    isDropdownVisible: false
}
```

Và việc thay đổi giá trị của nó từ `true` sang `false` hay ngược lại sẽ dẫn tới cáo dropdown của chúng ta ẩn hay hiện. Đối với `ReactJS` thì state của chúng ta có thể được tìm thấy trong dạng object có tên là state của class component:
```js
this.state = {
    isDropdownVisible: false
}
```
Hay với functional component thì nó sẽ là kiểu dữ liệu bất kì mà bạn muốn:
```js
const [isDropdownVisible, setDropdownVisible] = useState(false);
```
Còn với `VueJS` thì nó sẽ nằm trong một object có tên là data:
```js
data() {
    return {
        isDropdownVisible: false
    }
}
```

Nếu đến đây bạn vẫn chưa hình dung ra được **state** là gì thì hãy comment ngay ở bên dưới để mình giải thích lại cho bạn :stuck_out_tongue::stuck_out_tongue::stuck_out_tongue:.

## 3. State management
<hr>

### a. State management là gì?

Vì **state** trong ứng dụng của bạn có thể được biểu diễn ở bất cứ kiểu dữ liệu nào cũng như nó có thể nằm rải rác ở khắp các component nhỏ (hoặc không :grin:) nên tất nhiên chúng ta cũng cần phải quản lý nó. Những gì mà bạn cần quản lý ở đây sẽ bao gồm đặt state A này ở component nào, truyền state B từ component B đến component C như thế nào hay làm sao để thay đổi state X ở component Y, ... toàn bộ những việc này là những thứ liên quan đến việc mà bạn quản lý state trong ứng dụng của bạn vì đôi khi nếu bạn không có các rule cơ bản hoặc suy nghĩ về những gì mà bạn định làm trước khi bắt tay vào code thì nó có thể dẫn đến nhiều hậu quả khôn lường mà mãi sau này bạn mới biết hoặc người khác biết khi họ maintain code của bạn.

![](https://images.viblo.asia/f64deca4-5658-444f-a7c8-692c457cabbc.png)

### b.  ReactJS & VueJS state 101

Khi bắt đầu làm quen với ReactJS hay VueJS thì chúng ta đều biết được rằng khối dữ liệu mang tên state có thể được tạo ra cho bất cứ component nào mà chúng ta mong muốn. State này có thể sẽ chỉ tồn tại và hoạt động bên trong component đó hay thậm chí được đưa xuống các component phía bên dưới nó nếu các component con cần sử dụng đến nó. Còn về cách tạo state nếu bạn chưa biết thì có lẽ hãy đọc lại document của ReactJS hoặc VueJS tùy thuộc vào bạn đang code món nào còn nhanh hơn thì ở ngay ví dụ trên đã có. Một ứng dụng web của chúng ta thông thường sẽ được chia  thành rất nhiều các component khác nhau để tiện cho việc tái sử dụng hay dễ quản lý các thành phần UI hơn. Ví dụ như dưới đây trang web của bạn sẽ được chia thành nhiều component nhỏ và nó tạo thành hình dạng một cái cây:

![](https://images.viblo.asia/3fb8ec4b-504a-4ac5-b5b9-cc32e6921c27.png)

Mỗi ô màu xanh lá cây bạn thấy có thể coi nó chính là một component trong ứng dụng của bạn và component ở phía dưới sẽ là component con của thằng ở trên. Như mình nói lúc đầu thì ở bất cứ component nào trong hình nói trên (ô màu xanh lá cây) ta đều có thể định nghĩa state cho nó. Đồng thời ta có thể truyền state này xuống các component bên dưới nó. Giả sử ta có một ứng dụng đơn giản đó là tạo ra một ứng dụng to-do list với chỉ hai tính năng như sau:
- Tạo một công việc cần làm
- Hiển thị danh sách công việc cần làm

Đầu tiên để tiện lợi cho việc tạo thì ta sẽ cần 1 component dạng modal gọi là `<TodoItemModal />`. Tiếp đến ta cũng cẩn hiển thị ra danh sách nói trên nên thông thường ta sẽ có thêm 2 component nữa là `<TodoList />` và `<TodoItem />`. Bạn có thể hình dung nó đơn giản như sau:

![](https://images.viblo.asia/7b793125-8d44-4e46-85b7-ca67cee44428.png)

State của chúng ta cho ứng dụng này sẽ phải bao gồm một phần chứa danh sách to-do của chúng ta và một phần dùng cho việc nhập nội dung cho công việc mới mà chúng ta cần làm và cả việc ẩn hay hiện `<TodoModal />`. Từ đó ta sẽ có cái cây mới như sau:

![](https://images.viblo.asia/4198036b-50c4-4d46-a809-5b03501beac4.png)

Tuy nhiên khi bắt đầu code bạn sẽ nhận ra ngay một vấn đề đó là mỗi khi chúng ta cập nhật nội dung một công việc trong `<TodoModal />` thì  ta sẽ cần lấy `name` tương ứng của task mà ta muốn cập nhật và hiển thị ở `name` trong `App` để `<TodoModal />` của chúng ta hiển thị được giá trị này cho chúng ta cập nhật. Chính xác hơn ở đây ta sẽ cần làm cách nào đó để hai component `<TodoList />` và `<TodoModal />` có thể tương tác được với nhau. Tất nhiên nếu bạn còn nhớ những gì mình đã nói ở tên đó là **Sate này có thể sẽ chỉ tồn tại và hoạt động bên trong component đó hay thậm chí được đưa xuống các component phía bên dưới nó**, dựa vào câu này thì cách đơn giản nhất mà ta có thể làm đó là đưa `todoList` từ component `<TodoList />` lên `App`:

![](https://images.viblo.asia/01621899-d377-47c4-8248-92163dbe6f8f.png)

Từ giờ mỗi khi ta cần cập nhật một công việc nào thì ta chỉ cần lấy `name` tương ứng của nó và cập nhật cái `name` của `App` và truyền xuống cho `<TodoModal />` hiện ra. Đồng thời ta cũng sẽ cần truyền `todoList` xuống cho component `<TodoList />` để hiển thị. Việc mà chúng ta vừa làm ở trên còn có thể được gọi là:
- [Lifing state up](https://reactjs.org/docs/lifting-state-up.html) trong ReactJS
- Còn trong VueJS thì mình chưa tìm thấy tên gọi tương tự

Về cơ bản bạn có thể hiểu đây là một phương pháp dùng trong trường hợp 2 hay nhiều component của bạn muốn dùng chung một phần state thì cách làm truyền thống là ta sẽ đưa state đó lên cho thằng component cha chung gần nhất của chúng. Ở đây `<TodoList />` và `<TodoModal />` đều cần sử dụng đến state `todoList` nên ta sẽ đưa nó lên thằng cha chung cần nhất là `App`.  Với các ứng dụng nho nhỏ thì việc này không hề có vấn đề gì hết tuy nhiên nếu bạn vẫn áp dụng phương pháp này cho tất cả các ứng dụng vừa hay to thì đó là thảm hỏa:

![](https://images.viblo.asia/af820bc7-c8b1-4c2e-b0e6-bca321671d1a.png)

Ví dụ 3 component màu đỏ của chúng ta đề cần dùng chung một mảnh dữ liệu thì ta sẽ cần đặt mảnh state đó ở Component 1 và truyền qua nhiều component khác thì mới đến được nơi ta cần và nó làm việc quản lý mọi thứ trở nên phức tạp hơn rất nhiều nhất là khi bạn refactor một component nào đó trên quãng đường này. Chính vì vấn đề này mà mình đã tìm đến với `Redux` với ReactJS hay `VueX` với VueJS

### c. Redux và Vuex

Tuy nó là 2 thư viện của ReactJS và VueJS nhưng trên thực tế thì nó hoạt động khá giống nhau, đều sinh ra để giải quyết bài toán ở phần trên mà chúng ta đề cập đến. Khi bạn đã thêm nó vào ứng dụng của mình thì ta sẽ được một cái cây khác như sau:

![](https://images.viblo.asia/dc01940f-cd87-4a8d-8086-5b6daee21a4d.png)

Khi sử dụng 2 thư viện này thì ta sẽ tạo ra một nơi gọi là **Store** để chứa dữ liệu dùng chung ở nhiều chô trên ứng dụng của chúng ta ví dụ như thông tin của xem user đã đăng nhập hay chưa hoặc access token để gọi API chẳng hạn, ... . Lúc này phần dữ liệu mà ba component đỏ của chúng ta đang dùng chung có thể đưa vào store và lấy ra bất cứ khi nào cần mà không cần phải đi qua nhiều component khác nữa. Thực tế thì bạn có thể hiểu đây vẫn là cách làm đưa dữ liệu lên một thằng cha chung nhưng ở đây thay vì là một component thì nó lại là store. Về cách hoạt động hay sử dụng hai thư viện này ra sao thì mình sẽ không nói đến ở đây vì nó không phải nội dung của bài này. Tuy nhiên nếu bạn nghĩ với sự hỗ trợ của 2 thư viện này đã là happy ending cho mình thì hoàn toàn không phải nhé theo quan điểm cá nhân của mình thì cái gì nó cũng có hai mặt nên khi đem hai thư viện này vào dùng đồng nghĩa với việc chúng ta cũng phải đánh đổi một thứ gì đó. Còn cụ thể đó là gì thì mình sẽ tiết lộ cho các bạn ở bài viết sau :joy:

## 3. Kết bài
<hr>

Cuối cùng cảm ơn các bạn đã đọc bài viết của mình và nếu các bạn có bất cứ câu hỏi hay góp ý gì hãy comment ngay bên dưới đồng thời đừng quên để lại 1 upvote ủng hộ mình nhé.