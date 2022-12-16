Hello anh em , lại là mình đây :+1::+1::+1:

Good conditionals là một phần thiết yếu của bất kỳ ứng dụng React nào. Chúng ta thường sử dụng các điều kiện để hiển thị hoặc ẩn các elements hoặc các components trong code.

Chính vì vậy , chúng ta cần phải viết các điều kiện này một cách dễ hiểu, ngắn gọn, rõ ràng và tối ưu nhất, cùng mình điểm qua một số ví dụ nhé :

# 1. Sử dụng if là chủ yếu và không cần phải sử dụng else hay else-if.
Hãy bắt đầu với trường hợp cơ bản nhất mà chúng ta  hay gặp. Nếu có dữ liệu, chúng ta hiển thị nó ra và ngược lại, chúng ta sẽ không hiển thị gì cả.

Đơn giản đúng không ? vậy thì mọi người thử nghĩ xem chúng ta sẽ viết đoạn code đó như thế nào ?

Giả sử chúng ta có một mảng các bài posts được trả về API. Khi đang fetching dât thì posts của chúng ta sẽ có giá trị là undefined.

Chúng ta có thể kiểm tra giá trị đó bằng câu lệnh if đơn giản :

```javascript
export default function App() {
  const { posts } = usePosts(); // posts === undefined at first

  if (!posts) return null;

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}
```

Rất là ok đúng không ? nếu nó đáp ứng điều kiện (!posts có giá trị boolean là true ), thì chúng ta không hiển thị gì trong component cả bằng cách trả về null.

Nó cũng vẫn sẽ hoạt động trong trường hợp chúng ta có multiple conditions, ví dụ chúng ta muốn check khi có loading và error states trước khi chúng ta hiển thị ra dữ liệu của posts :

```javascript
export default function App() {
  const { isLoading, isError, posts } = usePosts();
   
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}
```

Lưu ý rằng chúng ta có thể reuse lại câu lệnh if và không cần phải viết if-else hoặc if-else-if, điều này sẽ giúp chúng ta cắt giảm code và dễ đợc hơn rất nhiều.

# 2. Sử dụng toán tử ba ngôi để viết các điều kiện hiển thị.
Việc sử dụng câu lệnh if rất hợp lí khi chúng ta muốn không hiển thị gì hoặc hiện thị một component hoàn toàn khác.

Tuy nhiên, nếu chúng ta muốn viết một điệu kiện mà trả về những JSX khác nhau, đó là khi chúng ta sử dụng đến toán tử ba ngôi :

```javascript
function App() {
  const isMobile = useWindowSize()

  return (
    <main>
      <Header />
      <Sidebar />
      {isMobile ? <MobileChat /> : <Chat />}
    </main>
  )
}
```
Ngoài ra chúng ta còn có thể gán cho nó thành một biến :

```javascript
function App() {
  const isMobile = useWindowSize();
    
  const ChatComponent = isMobile ? <MobileChat /> : <Chat />;

  return (
    <main>
      <Header />
      <Sidebar />
      {ChatComponent}
    </main>
  )
}
```
# 
# 3. Không sử dụng else mà thay vào đó là dùng && (and).
Trong nhiều trường hợp, chúng ta muốn sử dụng một toán tử bậc ba để check điều kiện hiển thị trong JSX của mình, nhưng trong một số trường hợp thì bạn không muốn hiển thị bất cứ điều gì

Nó sẽ tương ứng với đoạn check code điều kiện như sau :

```javascript
condition ? <Component /> : null
```

Nếu không muốn sử dụng else thì chúng ta có thể sử dụng dấu **&&** :

```javascript
export default function PostFeed() {
  const { posts, hasFinished } = usePosts()

  return (
    <>
      <PostList posts={posts} />
      {hasFinished && (
        <p>You have reached the end!</p>
      )}
    </>
  )
}
```

# 4. Sử dụng Switch cho việc check nhiều điều kiện.

Điều gì sẽ xảy ra nếu chúng ta ở trong một tình huống có nhiều điều kiện khác nhau, hai hoặc là hơn nữa ?

Chúng ta có thể viết một lúc một đống câu lệnh if, nhưng với việc sử dụng tất cả các câu lệnh if này, nó sẽ làm cho đoạn code của chúng ta trở nên lộn xộn hơn, khó quản lí hơn

Vậy thì đến lúc chúng ta cần phải ngâm cứu đến việc sử dụng switch, ví dụ nhé chúng ta có một component Menu, khi click vào thì nó sẽ xổ ra rất nhiều tabs, chúng ta có các tabs có thể hiện thị dữ liệu người dùng :

```javascript
export default function Menu() {
  const [menu, setMenu] = React.useState(1);

  function toggleMenu() {
    setMenu((m) => {
      if (m === 3) return 1;
      return m + 1;
    });
  }

  return (
    <>
      <MenuItem menu={menu} />
      <button onClick={toggleMenu}>Toggle Menu</button>
    </>
  );
}

function MenuItem({ menu }) {
  switch (menu) {
    case 1:
      return <Users />;
    case 2:
      return <Chats />;
    case 3:
      return <Rooms />;
    default:
      return null;
  }
}
```

Với việc sử dụng switch mỗi một MenuItem Component của chúng ta đã được sắp xếp rất logic và chỉ hiện thị khi gặp đúng điêu kiện, chúng ta có thể dễ dàng xem được thành phần nào sẽ được hiển thị.

# 5. Gợi ý.

Mình muốn giới thiệu với các bạn một plugin Barbel giúp mọi người có thể check các điều kiện một cách dễ dàng hơn

Chúng ta có thể cài đặt bằng cách chạy câu lệnh sau :

```javascript
npm install --save-dev babel-plugin-jsx-control-statements
```

Trong file .barbelrc thì thêm dòng này :

```javascript
"plugins": ["jsx-control-statements"]
```

Đây là một plugin Babel cho phép bạn sử dụng các  React component trực tiếp trong JSX của mình để viết các điều kiện rất dễ hiểu, ví dụ nè :

```javascript
export default function App() {
  const { isLoading, isError, posts } = usePosts();

  return (
    <Choose>
      <When condition={isLoading}>
        <div>Loading...</div>
      </When>
      <When condition={isError}>
        <div>Error!</div>
      </When>
      <Otherwise>
        <PostList posts={posts} />
      </Otherwise>
    </Choose>
  );
}
```

# Kết bài.

Vậy là bài viết của mình đã kết thúc rồi 

Nếu thấy hay hãy like, share và upvote cho bài viết của mình nhé

Cảm ơn mọi người :heart_eyes::heart_eyes::heart_eyes: