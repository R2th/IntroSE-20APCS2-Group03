Có thể bạn đã nghe từ **Optimistic UI Update** ở đâu đó rồi. Vậy nó là cái gì? Tại sao ta lại cần nó và cách mà nó được thực hiên.

# **Optimistic UI Update** là cái gì?
Ví dụ bạn đang làm một trang web mạng xã hội, và bạn có thể like mỗi bài viết ở đó. Tưởng tượng rằng nếu người dùng bấm vào nút like và nó mất 2s để server trả về kết quả like của người dùng. Thật sự nó không đem lại cho người dùng cảm giác **nhanh** mà người dùng **mong chờ**. Để giải quyết vấn đề đó, chúng ta dùng **Optimistic UI Update**.

> An optimistic UI update is an update in the user interface showing the final result even before the change requested to the server has returned a success. In other words, the UI changes to the result even before receiving a response from the server.


Một **optimistic UI Update** là update mà nó hiện sự thay đổi trước khi nhận được kết quả từ server. Nói cách khác là UI sẽ hiện ra kết quả đó trước khi nhận được trả lời từ server.

Nghe khó hiểu nhỉ?

Tiếp tục ví dụ ở trên, khi người dùng like một bài viết, trước khi server trả về kết quả, ta sẽ hiện trên UI rằng người dùng đã like bài viết này.

Nó chỉ đơn giản vậy thôi! Optimistic UI Update sẽ làm app cảm giác nhanh hơn rất nhiều,từ đó tăng trải nghiệm người dùng lên đáng kể.

Nghe tuyệt thật đấy! Nhưng...

## Nếu như server trả về lỗi?

Lúc này, bạn có thể sử dụng một toast hay notification để thông báo cho người dùng rằng hành động trên không được thực hiện vì một lỗi từ server (Như trên facebook, nếu bình luận được gửi bị lỗi sẽ hiện một border màu đỏ, và đưa ra lựa chọn cho người dùng)

Vậy nó được thực hiện như nào?

### Demo

Chúng ta sẽ làm một demo đơn giản được viết bằng React

Đầu tiên ta có một component App, bên trong nó chứa một button và một state để hiện trạng thái like.

```js
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [isLiked, setIsLiked] = React.useState(false)

  return (
    <div>
      <button>
        {isLiked ? 'Liked' : 'Like'}
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
```

Sau đó ta tạo một file tên là `api.js` để chứa các API. Vì demo nên mình sẽ chỉ cho nó sleep 2s rồi trả về kết quả:

```js
export const likeApi = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    success: true
  };
};
```

Sau đó sửa component App, viết một function để lắng nghe sự kiện click của button

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { likeApi } from "./api";

function App() {
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLike = async () => {
    const response = await likeApi();

    if (response.success) {
      setIsLiked(true);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>{isLiked ? "Liked" : "Like"}</button>
    </div>
  );
}
```

Lúc này app đã hoạt động đúng như mong đợi, tuy nhiên khi bấm vào nút like, ta phải đợi server trả về kết quả (2s) thì mới hiện được trạng thái đã like.

Chính vì thế, ta có thể sửa thành như sau:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { likeApi } from "./api";

function App() {
  const [isLiked, setIsLiked] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLike = async () => {
    setIsLiked(true);

    const response = await likeApi();

    if (!response.success) {
      setIsLiked(false);
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <p>{error}</p>

      <button onClick={handleLike}>{isLiked ? "Liked" : "Like"}</button>
    </div>
  );
}
```

Ở function `handleLike`, thay vì đợi server trả về kết quả, ta sẽ set liked thành true. Và nếu server trả về lỗi, ta sễ set liked thành false và hiện lỗi cho người dùng biết.

Demo app ở đây: https://codesandbox.io/s/pedantic-surf-hplvn4

## Kết 

Optimistic UI Update là một trong những cách làm cho app chạy nhanh và mượt, tuy nhiên không phải lúc nào ta cũng nên dùng cách này, đôi khi ta cũng phải tạo cho người dụng cảm giác chậm trễ một chút. Vì thế hãy cân nhắc!

Cảm ơn mọi người vì đã đọc bài viết, đây là bài viết thứ hai của mình nên vẫn còn rất lủng củng.