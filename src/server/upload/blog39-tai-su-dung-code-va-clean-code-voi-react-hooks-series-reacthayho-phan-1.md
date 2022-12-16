![image.png](https://images.viblo.asia/df3e8c63-150b-48dd-9091-beb974017eda.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Cải thiện khả năng tái sử dụng với `Custom Hooks`

Nếu bạn nhớ lại những ngày mà trước khi phiên bản React 16.8.0 ra đời. Cách **lifecycle** của component được xử lý trong `componentDidMount`, `componentDidUpdate` và `componentWillUnmount`. Mỗi hàm **lifecycle** thường chứa logic không liên quan trong khi các logic liên quan lẫn nhau lại được tách ra. Điều này thường dẫn đến các component trở nên phức tạp khó tái sử dụng, dễ bị lỗi và không nhất quán.

Sau đó, trong **React 16.8.0** hook đã được update mục đích để cải thiện những vấn đề hàng ngày mà rất nhiều **Dev React** đang gặp phải và vật lộn với nó.

> Hooks cho phép bạn chia một component thành các chức năng nhỏ hơn dựa trên những phần có liên quan (chẳng hạn như thiết lập đăng ký hoặc tìm nạp dữ liệu), thay vì buộc chúng phải được phân chia dựa trên các hàm `lifecycle`.

Điều này rất tuyệt vời để giữ sự phân tách tốt các mối quan tâm, nhưng cũng để giữ cho code của bạn `DRY`. Hooks cho phép bạn trích xuất các **logic state** để có thể kiểm tra độc lập và tái sử dụng trong các component khác. Điều này làm cho **logic state** ít bị lỗi hơn và cung cấp khả năng phân tách các mối quan tâm tốt hơn. **Views** cũng trở nên rõ ràng hơn và không bị lộn xộn với logic phức tạp.

> Các **hook** không chỉ dùng để thay thế các hàm `lifecycle` bằng cách sử dụng `useEffect`.

Hãy xem ví dụ sau nơi chúng ta đang tạo một `ArticlePreview` component, đại loại như thế này:

![React component — Article Preview](https://images.viblo.asia/be3dbbf7-d7ef-4157-a692-b7efa8f10b34.png)

Bạn có thể giễ dạng bị một thế lực nào đó cám dỗ và viết một cái gì đó như thế này: 

```javascript
import { useEffect, useState } from "react";
import {
  Card,
  Header,
  Title,
  Subtitle,
  Avatar,
  Actions,
  Image,
  Button
} from "./components";

export default function ArticlePreview({ id }) {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/articles/${id}`, { method: "POST" })
      .then(setArticle)
      .then(() => setLoading(false));
  }, [id]);

  const dislike = () => {
    fetch(`/articles/${id}/dislike`, { method: "POST" });
  };

  const like = () => {
    fetch(`/articles/${id}/like`, { method: "POST" });
  };

  return (
    <Card inProgress={loading}>
      <Header>
        <Title>{article?.title}</Title>
        <Subtitle>{article?.subtitle}</Subtitle>
        <Avatar src={article?.author?.image} />
      </Header>

      <Image src={article?.banner} />

      <Actions>
        <Button primary onClick={like}>
          Like
        </Button>
        <Button secondary onClick={dislike}>
          Dislike
        </Button>
      </Actions>
    </Card>
  );
}
```

Vấn đề với cách tiếp cận này là bạn có rất nhiều logic state được trộn lẫn bên trong component của mình. Điều này làm cho logic state khó kiểm tra độc lập và cũng không thể tái sử dụng trong các component khác, chẳng hạn như `ArticleFull` component bên dưới:

![image.png](https://images.viblo.asia/5378240e-2f6d-4f3a-919b-d1a313b1b606.png)

Có thể sử dụng một cách tiếp cận tốt hơn sẽ là tạo một Hooks tùy chỉnh `useArticle` xử lý logic state có thể tái sử dụng cho cả component `ArticlePreview` và `ArticleFull`. Một `useArticle` Hooks có thể trông giống như thế này:

```javascript
import { useEffect, useState } from "react";

export default function (id) {
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/articles/${id}`, { method: "POST" })
      .then(setArticle)
      .then(() => setLoading(false));
  }, [id]);

  const dislike = () => {
    fetch(`/articles/${id}/dislike`, { method: "POST" });
  };

  const like = () => {
    fetch(`/articles/${id}/like`, { method: "POST" });
  };

  return [like, dislike, loading, article];
};
```

Và với logic state được trích xuất vào Hooks tùy chỉnh của riêng nó, `view/component` có thể trông giống như thế này:

```javascript
import {
  Card,
  Header,
  Title,
  Subtitle,
  Avatar,
  Actions,
  Image,
  Button
} from "./components";
import { LikeIcon, DislikeIcon } from "./icons";
import useArticle from "./useArticle";

export default function ArticlePreview({ id }) {
  const [article, loading, like, dislike] = useArticle(id);

  return (
    <Card inProgress={loading}>
      <Header>
        <Title>{article?.title}</Title>
        <Subtitle>{article?.subtitle}</Subtitle>
        <Avatar src={article?.author?.image} />
      </Header>

      <Image src={article?.banner} />

      <Actions>
        <Button onClick={like}>
          <LikeIcon />
        </Button>
        <Button onClick={dislike}>
          <DislikeIcon />
        </Button>
      </Actions>
    </Card>
  );
}
```

Mặc dù đây chỉ là một ví dụ đơn giản, nhưng việc phân tách các mối quan tâm sẽ tốt hơn nhiều với logic state được chuyển sang _custom hook_ có thể giễ dàng tái sử dụng và với nó component này sạch hơn rất nhiều, dễ đọc và giễ maintenance.

Như bạn có thể thấy **custom hooks** là một cơ chế tuyệt vời `clean code` và có thể tái sử dụng!

Roundup
------
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
------
* https://tuan200tokyo.blogspot.com/2022/11/blog39-tai-su-dung-code-va-clean-code.html