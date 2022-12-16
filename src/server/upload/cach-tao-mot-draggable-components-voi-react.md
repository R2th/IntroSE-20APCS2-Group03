Hello anh em , lại là mình đây :sunglasses::sunglasses:

Đã bảo giờ khi làm một project , enh em gặp phải task là di chuyển các component trên màn hình không nhỉ ??? Hôm nay mình sẽ hướng dẫn anh em làm một **Draggable** đơn giản thôi nhé bằng cách sử dụng thư viện https://www.npmjs.com/package/react-draggable nhé 

Let's get it 

# Bước 1 : Cùng tạo app nào : 

```
npx create-react-app my-app
```
Sau đó chúng ta tiếp tục cái package :

```
npm install react-draggable
```

#  Bước 2 : Anh em tiếp tục import :

Khi cài xong rồi, trong **App.js**, anh em import cho mình như sau :
```
import Draggable from 'react-draggable';
```

Sau khi import xong chúng ta tiếp tục bao quanh div bằng thẻ **Draggable** của họ :

```
import React, {useState} from 'react';
import './App.css';
import Draggable from 'react-draggable';

function App() {
    return (
        <>
            <Draggable>
                <div className="box">
                    <div>Oh yeah Oh yeahhhhh !!!!!</div>
                </div>
            </Draggable>
        </>
    );
}
export default App;
```

Style nhẹ một tị nhờ :

```
.box {
    position: absolute;
    cursor: move;
    color: black;
    max-width: 215px;
    border-radius: 5px;
    padding: 1em;
    margin: auto;
    user-select: none;
    background-color: aliceblue;
}

.drag-here {
    background-color: aqua;
}

.myInput {
    margin: 0 auto;
    width: 21%;
    -webkit-user-select: none;
    user-select: none;
    position: absolute;
    top: 40%;
    left: 52%;
    transform: translate(-50%, -50%);
}

input {
    border-radius: 5px 0 0 5px;
    color: black;
    font-size: 1.3em;
    background-color: bisque;
    padding: .5em;
```

Nhanh, gọn, lẹ anh em sẽ được kết quả như sau : 

![](https://images.viblo.asia/26c4c201-7f2f-4414-a11a-30c1ea78c727.gif)

# 1.Nếu anh em muốn biết tọa độ của mình kéo :
- Đơn giản thôi chúng ta sử dụng **onDrag** :
```
import React, {useState} from 'react';
import './App.css';
import Draggable from 'react-draggable';

function App() {
    const [position, setPosition] = useState({x: 0, y: 0});
    const trackPos = (data) => {
        setPosition({x: data.x, y: data.y});
    };
    return (
        <>
            <Draggable onDrag={(e, data) => trackPos(data)}>
                <div className="box">
                    <div>Here's my position...</div>
                    <div>
                        x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
                    </div>
                </div>
            </Draggable>
        </>
    );
}
```
Ta sẽ được như sau :

![](https://images.viblo.asia/59fe594e-66e3-4e11-8b0c-e1cf1900162a.gif)

# 2. Nếu muốn qui định kéo theo chiều ngang hay dọc hoặc không kéo :

Ở đây họ cũng đã hộ trợ tận răng như sau :
- axis="x":   Component chỉ có thể kéo theo chiều ngang.
- axis="y": Component chỉ có thể kéo theo chiều dọc.
- axis="none": Component không thể kéo nữa.
Ví dụ trường hợp **axis="x"** nhé :

```
import React, {useState} from 'react';
import './App.css';
import Draggable from 'react-draggable';

function App() {
    // const [position, setPosition] = useState({x: 0, y: 0});
    // const trackPos = (data) => {
    //     setPosition({x: data.x, y: data.y});
    // };
    return (
        <>
            <Draggable axis="x">
                <div className="box">
                    <div>Oh yeah Oh yeahhhhh !!!!!</div>
                </div>
            </Draggable>
        </>
    );
}
export default App;
```

Kết quả như sau :
![](https://images.viblo.asia/80f4cac1-c248-4e2b-85ca-322764070ffc.gif)

# 3. Hay là chỉ muốn tác động vào phần nào thì phần đó mới được kéo ?
Ta làm như sau :

```
    <Draggable handle="#handle">
                <div className="box">
                    <span id="handle" className='drag-here'>Drag here</span>
                    <div style={{padding: "1em"}}>Cannot drag here</div>
                </div>
            </Draggable>
```

Kết quả :

![](https://images.viblo.asia/a4b4f3a7-7a18-4b0c-bffc-23cfdf835ad9.gif)


# Kết bài :
- Trên đây là những hướng dẫn cwo bản của mình về package này, nếu giúp ích được gì cho bạn trong việc code cũng như làm Task thì hãy ủng hộ mình nhiều hơn nữa bằng cách chia sẻ và **upvote** bài viết này nhé. Cảm ơn mọi người.

P/S : Mình cũng nghịch một cái demo nho nhỏ , mọi người có thể xem ảnh và tự nghĩ cách code nhé  =))

![](https://images.viblo.asia/560a2e40-271f-4743-bc08-7611ed86e79d.gif)

Nếu mọi người muốn tìm hiêủ thêm thì mình có để ở dưới link tài liệu đây :
https://www.npmjs.com/package/react-draggable