## Giới thiệu
Đầu tiên thì ứng dụng emoji search là một trong các ví dụ cơ bản của reactjs, bạn có thể xem ở đây
https://github.com/ahfarmer/emoji-search

Bài viết này mình đã viết lại ứng dụng này, cùng với áp dụng Recoiljs trong việc quản lý state

## Ứng dụng Emoji Search
Đầu tiên để quản lý state với Recoil, mình sẽ phải tạo các atoms

src/Atoms/searchInput.js
```jsx
import { atom } from "recoil";

export default atom({
  key: "searchInputState",
  default: ""
});

```

src/Atoms/emojiList.js
```jsx
import { selector } from "recoil";
import { getEmojiList } from "../common";

export default selector({
  key: "emojiListSelector",
  get: async ({ get }) => {
    const emojiList = await getEmojiList();

    return emojiList;
  }
});
```

Ứng dụng này mình chỉ cần 2 atoms cơ bản, `searchInput` dùng khi tìm kiếm emoji, `emojiList` để lưu data. Với `emojiList` mình muốn dùng hàm `atomFamily`, nhưng không hiểu sao lại không dùng được :|

Sau khi có atom, bạn có thể dùng selector để "chế biến" ra dữ liệu mình cần.

src/Selectors/filteredEmojiList.js
```jsx
import { selector } from "recoil";
import searchInputAtom from "../Atoms/searchInput";
import emojiListAtom from "../Atoms/emojiList";

import { filterEmoji } from "../common";

export default selector({
  key: "filteredEmojiListSelector",
  get: async ({ get }) => {
    const searchText = get(searchInputAtom);
    const emojiList = get(emojiListAtom);

    return filterEmoji(emojiList, searchText);
  }
});

```

src/common.js
```js
export async function getEmojiList() {
  const response = await fetch("/emojiList.json");
  return response.json();
}

export function filterEmoji(emojiList, text, maxResult = 100) {
  return emojiList
    .filter(emoji => {
      if (emoji.title.toLowerCase().includes(text.toLowerCase())) {
        return true;
      }
      if (emoji.keywords.includes(text.toLowerCase())) {
        return true;
      }
      return false;
    })
    .slice(0, maxResult);
}

```

Giờ mình chỉ cần render dữ liệu ra UI nữa thôi.

src/App.js
```jsx
import React from "react";
import { RecoilRoot } from "recoil";
import Emoji from "./Components/Emoji";
import "./styles.css";

export default function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Emoji />
      </React.Suspense>
    </RecoilRoot>
  );
}
```

`RecoilRoot` sẽ tạo một context để chúng ta có thể sử dụng các hàm khác của `Recoil`. Bạn nên đặt nó bao ngoài App. `React.Suspense` đây là một tính năng vẫn đang phát triển của React, nhưng khi bạn sử dụng Recoil thì nó sẽ yêu cầu bạn sử dụng tính năng này, khi mà bạn fetch dữ liệu có thể hiển thị ra component thay thế.

Bên dưới là component Emoji, để dễ theo dõi, nên mình viết cả các components khác trong cùng một file này.

src/Components/Emoji.js
```jsx
import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import filteredEmojiList from "../Selectors/filteredEmojiList";
import searchInput from "../Atoms/searchInput";

const Header = () => {
  const [text, set] = useRecoilState(searchInput);

  const handleChange = e => {
    set(e.target.value);
  };

  return (
    <div className="Header">
      <input
        type="text"
        placeholder="smile, angry,..."
        value={text}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
};

const EmojiCard = ({ title, symbol }) => {
  const codePointHex = symbol.codePointAt(0).toString(16);
  const src = `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;

  return (
    <div className="EmojiCard">
      <img alt={title} src={src} />
      <span className="title">{title}</span>
    </div>
  );
};

const EmojiList = ({ emojiList }) => {
  const nodes = emojiList.map((emoji, index) => {
    return <EmojiCard {...emoji} key={index} />;
  });

  return <div className="EmojiList">{nodes}</div>;
};

const Emoji = () => {
  const emojiList = useRecoilValue(filteredEmojiList);

  return (
    <div className="Emoji">
      <Header />
      <EmojiList emojiList={emojiList} />
    </div>
  );
};

export default Emoji;
```

Các bạn có thể thấy các hooks của Recoil: `useRecoilValue` và `useRecoilState`. Đây đều là các hooks cơ bản, bạn có thể tham khảo thêm tại đây.

https://recoiljs.org/docs/api-reference/core/useRecoilState

## Kết quả
Bạn có thể xem bản demo và mã hoàn chỉnh của ứng dụng ở đây:
https://codesandbox.io/s/admiring-albattani-wm1f9

Mình khá là thích thư viện này vì việc dễ dàng chia sẻ state, cú pháp cũng rất ngắn gọn dễ hiểu.
Có thể mình sẽ sử dụng nó từ giờ để thay thế cho việc sử dụng React Context.