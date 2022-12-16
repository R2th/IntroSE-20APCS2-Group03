### Performance and useCallback
useCallback là một hàm hook được sử dụng để tăng performance cho component

Nếu bạn có một component mà được render lại rất thường xuyên, useCallback giúp ngăn ngừa các *callback function* bên trong component bị khởi tạo lại mỗi khi component đó được render lại.(nghĩa là *function component* bị chạy lại).

useCallback chạy lại chỉ khi một trong các *dependencies* thay đổi

```
// in Timer, we are calculating the date and putting it in state a lot
// this results in a re-render for every state update

// we had a function handleIncrementCount to increment the state 'count'...
function Timer() {
  const [time, setTime] = React.useState();
  const [count, setCount] = React.useState(0);

  // ... but unless we wrap it in useCallback, the function is
  // recreated for every single re-render (bad performance hit)
  // useCallback hook returns a callback that isn't recreated every time
  const inc = React.useCallback(
    function handleIncrementCount() {
      setCount(prevCount => prevCount + 1);
    },
    // useCallback accepts a second arg of a dependencies array like useEffect
    // useCallback will only run if any dependency changes (here it's 'setCount')
    [setCount]
  );

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const currentTime = JSON.stringify(new Date(Date.now()));
      setTime(currentTime);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  return (
    <div>
      <p>The current time is: {time}</p>
      <p>Count: {count}</p>
      <button onClick={inc}>+</button>
    </div>
  );
}
```

### Memoization and useMemo

useMemo is very similar to useCallback and is for improving performance. But instead of being for callbacks, it is for storing the results of expensive calculations.

useMemo thì khá là giống với useCallback và cũng giúp cải thiện performance. Nhưng thay vì là các hàm callback, nó dùng để lưu các kết quả của các tính toán phức tạp, tốn nhiều phép tính (giúp tránh tính toán lại các phép tính không cần thiết)

useMemo cho phép chúng ta 'hồi ức'(memoize), hoặc nhớ kết quả của các xử lý phức tạp khi mà chúng đã được thực thi trước đó mà không có sự thay đổi nào của các tham số đầu vào.

useMemo trả về một giá trị từ tính toán, nó không phải là một hàm callback (nhưng có thể là một hàm)

```
// useMemo is useful when we need a lot of computing resources
// to perform an operation, but don't want to repeat it on each re-render

function App() {
  // state to select a word in 'words' array below
  const [wordIndex, setWordIndex] = useState(0);
  // state for counter
  const [count, setCount] = useState(0);

  // words we'll use to calculate letter count
  const words = ["i", "am", "learning", "react"];
  const word = words[wordIndex];

  function getLetterCount(word) {
    // we mimic expensive calculation with a very long (unnecessary) loop
    let i = 0;
    while (i < 1000000) i++;
    return word.length;
  }

  // Memoize expensive function to return previous value if input was the same
  // only perform calculation if new word without a cached value
  const letterCount = React.useMemo(() => getLetterCount(word), [word]);

  // if calculation was done without useMemo, like so:

  // const letterCount = getLetterCount(word);

  // there would be a delay in updating the counter
  // we would have to wait for the expensive function to finish

  function handleChangeIndex() {
    // flip from one word in the array to the next
    const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
    setWordIndex(next);
  }

  return (
    <div>
      <p>
        {word} has {letterCount} letters
      </p>
      <button onClick={handleChangeIndex}>Next word</button>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### Refs and useRef

Refs là các thuộc tính đặc biệt mà có sẵn trong các *React component* khi nó được khởi tạo. Chúng cho phép tạo ra một quan hệ (reference) tới một *element/ component* khi component được gắn vào.

useRef cho phép chúng ta dễ dàng sử dụng React refs api. Chúng ta gọi *useRef*(ở trên đầu của component) và đính kèm giá trị trả về tới thuộc tính ref của element để refer tới nó.

Khi chúng ta tạo ra một reference, chúng ta sử dụng thuộc tính hiện tại để thay đổi các thuộc tính của element. Hoặc chúng ta có thể gọi bất cứ method có sẵn nào trong element đó (như .focus() để trỏ vào một input)
```
function App() {
  const [query, setQuery] = React.useState("react hooks");
  // we can pass useRef a default value
  // we don't need it here, so we pass in null to ref an empty object
  const searchInput = useRef(null);

  function handleClearSearch() {
    // current references the text input once App mounts
    searchInput.current.value = "";
    // useRef can store basically any value in its .current property
    searchInput.current.focus();
  }

  return (
    <form>
      <input
        type="text"
        onChange={event => setQuery(event.target.value)}
        ref={searchInput}
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClearSearch}>
        Clear
      </button>
    </form>
  );
}
```

### Context and useContext

Trong React, chúng ta muốn tránh việc tạo ra các props và pass data xuống nhiều cấp từ một component cha: 

```
// Context helps us avoid creating multiple duplicate props
// This pattern is also called props drilling:
function App() {
  // we want to pass user data down to Header
  const [user] = React.useState({ name: "Fred" });

  return (
   {/* first 'user' prop */}
    <Main user={user} />
  );
}

const Main = ({ user }) => (
  <>
    {/* second 'user' prop */}
    <Header user={user} />
    <div>Main app content...</div>
  </>
);

const Header = ({ user }) => <header>Welcome, {user.name}!</header>;
```

Context rất hữu ích trong việc truyền các props xuống nhiều cấp component con từ một component cha

```
// Here is the previous example rewritten with Context
// First we create context, where we can pass in default values
const UserContext = React.createContext();
// we call this 'UserContext' because that's what data we're passing down

function App() {
  // we want to pass user data down to Header
  const [user] = React.useState({ name: "Fred" });

  return (
    {/* we wrap the parent component with the provider property */}
    {/* we pass data down the computer tree w/ value prop */}
    <UserContext.Provider value={user}>
      <Main />
    </UserContext.Provider>
  );
}

const Main = () => (
  <>
    <Header />
    <div>Main app content...</div>
  </>
);

// we can remove the two 'user' props, we can just use consumer
// to consume the data where we need it
const Header = () => (
  {/* we use this pattern called render props to get access to the data*/}
  <UserContext.Consumer>
    {user => <header>Welcome, {user.name}!</header>}
  </UserContext.Consumer>
);
```

useContext hook có thể giúp giảm tải việc truyền props như trên, tuy nhiên, để có thể sử dụng context trong các function component mà chúng ta muốn thì phải khai báo như sau: 

```
const Header = () => {
  // we pass in the entire context object to consume it
  const user = React.useContext(UserContext);
  // and we can remove the Consumer tags
  return <header>Welcome, {user.name}!</header>;
};
```