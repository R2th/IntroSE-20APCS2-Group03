Hey yo, chào tất cả các bạn :)<br>
Lại là mình đây, Tấn đẹp trai từ bé hay chia sẻ công nghệ với mọi người vào mỗi tháng đây.<br>
Hôm nay thì mình sẽ chia sẻ với các bạn về một package đã làm đau đầu mình trong một thời gian rất là dài. <br>À mà hiện tại mình vẫn còn đau đầu vì nó. Vâng đó chính là **Draft js** - một con hàng đến từ ông lớn Facebook.
# Tổng quan
Draft.js là một framework để xây dựng các trình soạn thảo văn bản trong React, được cung cấp bởi một mô hình **immutable** và **abstracting** dựa trên sự khác biệt giữa các trình duyệt.

Draft.js cho phép bạn tạo bất kỳ kiểu nhập văn bản nào, cho dù bạn chỉ muốn hỗ trợ một vài kiểu văn bản trên dòng hay xây dựng một trình soạn thảo văn bản phức tạp để soạn các bài báo dạng dài.<br>
Draft.js đã được giới thiệu tại [React.js Conf](https://conf2016.reactjs.org/schedule#rich-text-editing-with-react)  vào tháng 2 năm 2016.
## Cài đặt
Để cài đặt Draft.js thì các bạn mạnh dạn thực hiện combo sau đây:
```bash
npm install draft-js
# hoặc dùng yarn
yarn add draft-js
```
## Sử dụng
Về cách sử dụng thì đang có 2 hướng tiếp cận là theo **class component** hoặc **function component**.
Trong bài viết này thì mình sẽ sử dụng cách **function component** nhé.<br>
Đơn giản chỉ là vì mình lười chơi với this.abc, this.xyz, this.blabla, ... thôi :) Và đây là cú pháp cơ bản để sử dụng nó:
```js
// file Editor.js
import React, { useRef, useState } from 'react';
import {Editor, EditorState} from 'draft-js';

function MyEditor() {
  const editorRef = useRef();
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const focus = () => {
    editorRef.current.focus();
  }

  return (
    <div className="custom-editor" onClick={focus}> // hàm focus ở đây có tác dụng khi chúng ta click 
      <Editor                                       // vào thẻ div chứa editor thì sẽ focus vào editor 
        ref={editorRef}                             // để chúng ta cào phím lun :)
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
  );
}

export default MyEditor;
```
Còn đây là code css mình chỉnh lại editor cho đẹp, ngoài ra các bạn có thể dùng thẳng css của draft.js bằng cách đưa thẳng file `draft-js/dist/Draft.css` của nó vào file js. 
```css
.custom-editor {
  padding: 24px 200px;
}

.DraftEditor-root {
  min-height: 200px;
  border: solid 1px #bbb;
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin-bottom: 2em;
  box-shadow: inset 0px 1px 8px -3px #ABABAB;
  background: #fefefe;
}
```
Và đây là kết quả nhé
![](https://images.viblo.asia/26b27a46-d1eb-4698-b9cf-b989b08a704a.png)
# Một vài tính năng cơ bản
##  RichUtils
RichUtils chứa thông tin về các lệnh chính có sẵn cho trình chỉnh sửa, chẳng hạn như Cmd + B (đậm), Cmd + I (nghiêng), ...<br>
Các bước dùng nó sẽ như thế này:
* import RichUtils
* Khi click vào inline style button thì sử dụng hàm toggleInlineStyle(editorState, style) để tạo mới một editorState.
* Cập nhật trạng thái editor mới nhất vào editorState.
```js
// Ví dụ với bold style
import { RichUtils } from 'draft-js';
const onBoldClick = (e) {
   e.preventDefault(); // Mình dùng preventDefault() để giữ con trỏ chuột vẫn còn ở trong editor nhé các bạn
   setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
}
// ở file render Editor
return (
    <div className="custom-editor" onClick={focus}>
      <span onMouseDown={onBoldClick}>
          Bold
      </span>
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
);
```
Hàng demo nè
![](https://images.viblo.asia/7491303b-2d6f-4637-805b-f05afa814f38.gif)
## AtomicBlockUtils
AtomicBlockUtils là một tập hợp tĩnh các chức năng tiện ích để chỉnh sửa khối **atomic**. Khối atomic này có thể là image, audio hay thậm chí là video.<br>
Trong mỗi trường hợp, các phương thức này chấp nhận các đối tượng EditorState với các tham số liên quan và trả về các đối tượng EditorState mới để cập nhật vào editor. <br>
Ví dụ về chèn hình ảnh sử dụng `AtomicBlockUtils.insertAtomicBlock`:
```js
// hàm addImage
const addImage = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      {src: imgUrl}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity}
    );
    setEditorState(AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '
    ));
  };
  
  // Tiến hành render Image component trong editor
  const Image = ({ contentState, block }) => {
  const entity = contentState.getEntity(
    block.getEntityAt(0)
  );
  const { src } = entity.getData();
  console.log(src)
  return <img src={src} />;
};

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Image,
      editable: false,
    };
  }

  return null;
}

// editor component
<Editor
    blockRendererFn={mediaBlockRenderer}
    ...
/>
```
Các bước thực hiện sẽ là:
* Lấy content hiện tại
* Tạo mới một Entity với type là `image` và mutability sẽ là `IMMUTABLE`
* Lấy entity key vừa tạo và dùng `AtomicBlockUtils.insertAtomicBlock` để update trạng thái mới của editor.
* Thêm `blockRendererFn` vào trong Editor component để tiến hành render Image.

Và đây là kết quả demo thử của mình:
![](https://images.viblo.asia/8fb7b741-bbfb-4bc6-9452-d334b82cda0a.gif)<br>
Như các bạn có thể thấy là rất i zì phải ko nào :) <br>Có một điểm trừ nhỏ là khi insert image bằng cách này thì sẽ xuất hiện 2 dòng trống ở trước và sau khi insert tạo cảm giác trống vắng cô đơn khi đêm về không gấu. <br>Hiện tại mình vẫn đang tìm cách xóa nó nên anh em nào biết solution có thể comment để mình test thử lun cho lẹ nhé :heart_eyes::heart_eyes::heart_eyes:
## Decorators
Khái niệm **decorator** dựa trên việc quét nội dung của một **ContentBlock** nhất định để tìm phạm vi văn bản phù hợp với **strategy** đã xác định, sau đó hiển thị chúng bằng một **React component** được chỉ định.

Các bạn có thể sử dụng lớp **CompositeDecorator** để xác định hành vi decorator mong muốn của mình.<br>
Sau đây là ví dụ tìm link ở trong editor của mình.
```js
// Định nghĩa hàm tìm kiếm link entity
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}
// Định nghĩa Link component sẽ được dùng nếu tìm thấy link
const Link = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={url}>
      {children}
    </a>
  );
};
// Khởi tạo decorator và thêm vào editorState
const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
]);
const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(decorator),
  );
  // Định nghĩa hàm addLink
  const addLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: imgUrl },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ));
  };
```
And here is my demo<br>
![](https://images.viblo.asia/e8d1fc8f-f82e-4711-932c-c778e534bdc0.gif)
# Tổng kết
Vậy là chúng ta đã cùng nhau tìm hiểu một vài thứ cơ bản của Draft Js rùi đấy. <br>
Trên đây mình đã giới thiệu sơ lược về Draft Js thông qua các việc sau:
* Cách cài đặt và sử dụng Draft js đơn giản.
* Sử dụng `RichUtils` cho các inline style như: đậm nghiêng, gạch chân, ...
* Sử dụng `AtomicBlockUtils` để chèn các khối atomic (image, audio, video) vào editor.
* Sử dụng `CompositeDecorator` để tìm và custom một vài nội dung nào đó.

Hy vọng qua bài viết này các bạn có thể dần dần tiếp cận và làm chủ con package này :grinning: Cùng nhau tìm hiểu để có thể khám phá thêm nhiều thứ hay ho mà mình chưa giới thiệu hết được trong bài viết :man_dancing::man_dancing::man_dancing: