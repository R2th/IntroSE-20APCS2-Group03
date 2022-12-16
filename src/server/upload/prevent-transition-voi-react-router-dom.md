Hi mọi người. Tình hình là mình vừa mới làm xong task "hiển thị thông báo cho người dùng lúc chuyển trang" nên ở bài viết này mình sẽ chia sẻ hai cách mà mình tìm hiểu được nhé. OK go go :dog:  :dog: 

## Cách 1: Sử dụng `Prompt`

```jsx
<Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>
```
Nguồn: https://reactrouter.com/core/api/Prompt

Trong đó message có thể là `string` hoặc `function`
```ts
export interface PromptProps {
    message: string | ((location: H.Location, action: H.Action) => string | boolean);
    when?: boolean;
}
```
Ví dụ:
```jsx
function BlockingForm() {
  let [isBlocking, setIsBlocking] = useState(false);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        event.target.reset();
        setIsBlocking(false);
      }}
    >
      <Prompt
        when={isBlocking}
        message={location =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />

      <p>
        Blocking?{" "}
        {isBlocking ? "Yes, click a link or the back button" : "Nope"}
      </p>

      <p>
        <input
          size="50"
          placeholder="type something to block transitions"
          onChange={event => {
            setIsBlocking(event.target.value.length > 0);
          }}
        />
      </p>

      <p>
        <button>Submit to stop blocking</button>
      </p>
    </form>
  );
}
```
Nguồn: https://reactrouter.com/web/example/preventing-transitions

Để customize `Prompt`, mọi người có thể tham khảo ví dụ này nhé: https://codesandbox.io/s/myw173jyq8

## Cách 2: Sử dụng `history.block`
Cú pháp của nó kiểu như sau:

```js
// Register a simple prompt message that will be shown the
// user before they navigate away from the current page.
const unblock = history.block('Are you sure you want to leave this page?');

// Or use a function that returns the message when it's needed.
history.block((location, action) => {
  // The location and action arguments indicate the location
  // we're transitioning to and how we're getting there.

  // A common use case is to prevent the user from leaving the
  // page if there's a form they haven't submitted yet.
  if (input.value !== '') return 'Are you sure you want to leave this page?';
});

// To stop blocking transitions, call the function returned from block().
unblock();
```
Nguồn: https://github.com/ReactTraining/history/blob/v4/docs/Blocking.md

Lưu ý: ở đây mình sử dụng `history v4` mọi người nhé, `v5` sẽ ko hoạt động đúng, đều cũng tương tự, mọi người tự tìm hiểu thêm nhé ^^

Mình sẽ sửa lại code ở cách trên như sau:
```jsx
function BlockingForm() {
  const history = useHistory()
  let [isBlocking, setIsBlocking] = useState(false);
  
  useEffect(() => {
    let unblock;
    
    if (isBlocking) {
      unblock = history.block((location) => {
        if (window.confirm(`Are you sure you want to go to ${location.pathname}`)) {
          unblock();
          return true; 
        }
        return false;
      });
    } else {
      if (unblock) unblock();
    }

    return unblock;
  }, [isBlocking])

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        event.target.reset();
        setIsBlocking(false);
      }}
    >
      <p>
        Blocking?{" "}
        {isBlocking ? "Yes, click a link or the back button" : "Nope"}
      </p>

      <p>
        <input
          size="50"
          placeholder="type something to block transitions"
          onChange={event => {
            setIsBlocking(event.target.value.length > 0);
          }}
        />
      </p>

      <p>
        <button>Submit to stop blocking</button>
      </p>
    </form>
  );
}

```
## Kết
Bài viết hôm nay đến đây thôi, hy vọng sẽ giúp ích được cho mọi người trong những dự án sắp tới. Chúc mọi người thành công <3