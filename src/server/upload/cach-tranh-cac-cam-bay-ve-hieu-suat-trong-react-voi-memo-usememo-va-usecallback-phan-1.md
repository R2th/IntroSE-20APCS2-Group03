# Giới thiệu
* Trong các ứng dụng [React](https://reactjs.org/) , các vấn đề về hiệu suất có thể đến từ độ trễ của mạng, API hoạt động quá mức, thư viện của bên thứ ba không hiệu quả và thậm chí mã có cấu trúc tốt hoạt động tốt cho đến khi nó phải tải lớn bất thường. Việc xác định nguyên nhân gốc của các vấn đề về hiệu suất có thể khó khăn, nhưng nhiều vấn đề trong số này bắt nguồn từ việc re-renders component. Component hiển thị nhiều hơn mong đợi hoặc component render quá nhiều dữ liệu có thể khiến mỗi lần hiển thị bị chậm. Do đó, việc học cách ngăn các kết xuất không cần thiết có thể giúp tối ưu hóa hiệu suất của ứng dụng React và tạo ra trải nghiệm tốt hơn cho người dùng của bạn.
* Trong hướng dẫn này, bạn sẽ tập trung vào việc tối ưu hóa hiệu suất trong các thành phần React. Để khám phá vấn đề, bạn sẽ xây dựng một thành phần để phân tích một khối văn bản. Bạn sẽ xem cách các actions khác nhau có thể kích hoạt re-renders và cách bạn có thể sử dụng [Hooks](https://reactjs.org/docs/hooks-intro.html) và [memorization](https://reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations) để giảm thiểu các phép tính dữ liệu tốn kém. Đến cuối hướng dẫn này, bạn sẽ làm quen với nhiều Hook nâng cao hiệu suất, chẳng hạn như **useMemo** và **useCallback** Hook, và các trường hợp sẽ yêu cầu chúng.

![](https://images.viblo.asia/db2688f1-261b-4f3e-97e5-3c2982422ded.PNG)

# Điều kiện tiên quyết
* Bạn sẽ cần một môi trường phát triển chạy [Node.js](https://nodejs.org/en/about/) ; hướng dẫn này đã được thử nghiệm trên Node.js phiên bản 10.22.0 và npm phiên bản 6.14.6. Để cài đặt phần mềm này trên macOS hoặc Ubuntu 18.04, hãy làm theo các bước trong [Cách cài đặt Node.js và Tạo Môi trường Phát triển Cục bộ trên macOS](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-macos) hoặc phần **Cài đặt Sử dụng PPA** của [Cách Cài đặt Node.js trên Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04).
* Môi trường phát triển React được thiết lập với [Create React App](https://github.com/facebook/create-react-app). Để thiết lập điều này, hãy làm theo Bước 1 - Tạo một dự án trống của hướng dẫn [Cách quản lý trạng thái trên React Class Components](https://www.digitalocean.com/community/tutorials/how-to-manage-state-on-react-class-components#step-1-%E2%80%94-creating-an-empty-project). Hướng dẫn này sẽ sử dụng **performance-tutorial** làm tên dự án.
* Nếu bạn chưa quen gỡ lỗi trong React, hãy xem hướng dẫn [Cách gỡ lỗi các thành phần trong React](https://www.digitalocean.com/community/tutorials/how-to-debug-react-components-using-react-developer-tools) bằng Công cụ dành cho nhà phát triển React và tự làm quen với các công cụ dành cho nhà phát triển trong trình duyệt bạn đang sử dụng, chẳng hạn như [Chrome DevTools](https://developer.chrome.com/docs/devtools/) và [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools).
* Bạn cũng sẽ cần kiến thức cơ bản về JavaScript, HTML và CSS, bạn có thể tìm thấy kiến thức này trong loạt bài [Cách tạo trang web bằng HTML](https://www.digitalocean.com/community/tutorial_series/how-to-build-a-website-with-html) , loạt bài [Cách tạo trang web bằng CSS](https://www.digitalocean.com/community/tutorial_series/how-to-build-a-website-with-css) và trong loạt bài [Viết code với JavaScript ](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript).
# Bước 1: Ngăn Re-renders với memo
* Trong bước này, bạn sẽ xây dựng một thành phần phân tích văn bản . Bạn sẽ tạo một đầu vào để lấy một khối văn bản và một thành phần sẽ tính toán tần suất của các chữ cái và ký hiệu. Sau đó, bạn sẽ tạo ra một tình huống trong đó trình phân tích văn bản hoạt động kém và bạn sẽ xác định được nguyên nhân gốc của vấn đề hiệu suất. Cuối cùng, bạn sẽ sử dụng hàm React **memo** để ngăn re-renders trên thành phần khi thành phần cha thay đổi, nhưng các **props** cho thành phần con không thay đổi.
* Đến cuối bước này, bạn sẽ có một thành phần hoạt động mà bạn sẽ sử dụng trong suốt phần còn lại của hướng dẫn và hiểu cách thành phần cha re-render có thể tạo ra các vấn đề về hiệu suất trong các thành phần con.
## Xây dựng một trình phân tích văn bản
* Để bắt đầu, hãy thêm một phần tử **<textarea>** vào **App.js**. Mở **App.js** trong trình soạn thảo văn bản mà bạn chọn:
```
nano src/components/App/App.js
```
* Sau đó, thêm **<textarea>** vào **<label>**. Đặt **label** bên trong một **<div>** với một **className** là **wrapper** như code sau:
```
## performance-tutorial/src/components/App/App.js    
    
import React from 'react';
import './App.css';

function App() {
  return(
    <div className="wrapper">
      <label htmlFor="text">
        <p>Add Your Text Here:</p>
        <textarea
          id="text"
          name="text"
          rows="10"
          cols="100"
        >
        </textarea>
      </label>
    </div>
  )
}

export default App;
```
* Thêm định dạng css của **wrapper** trong **App.css**:
```
## performance-tutorial/src/components/App/App.css 
    
.wrapper {
    padding: 20px;
}

.wrapper div {
    margin: 20px 0;
}
```
* Tiếp theo, tạo một thư mục cho component **CharacterMap**. Thành phần này sẽ phân tích văn bản, tính toán tần suất xuất hiện của từng chữ cái và ký hiệu, đồng thời hiển thị kết quả.
* Đầu tiên tạo thư mục:
```
mkdir src/components/CharacterMap
```    
* Sau đó, mở **CharacterMap.js** trong trình soạn thảo văn bản:
```
nano src/components/CharacterMap/CharacterMap.js
```
* Bên trong, tạo component được gọi là **CharacterMap** nhận **text** là 1 **props** và hiển thị **text** bên trong một **<div>**:
```
## performance-tutorial/src/components/CharacterMap/CharacterMap.js
    
import React from 'react';
import PropTypes from 'prop-types';

export default function CharacterMap({ text }) {
  return(
    <div>
      Character Map:
      {text}
    </div>
  )
}

CharacterMap.propTypes = {
  text: PropTypes.string.isRequired
}
```
* Lưu ý rằng bạn đang thêm một **PropTypes** cho **text prop** để khai báo dạng **prop** và **require prop**.
* Thêm một hàm để lặp lại văn bản và trích xuất thông tin ký tự. Đặt tên cho hàm **itemize** và truyền vào **text** làm đối số. Chức năng **itemize** sẽ lặp qua tất cả các kí tự nhiều lần và sẽ rất chậm nếu như kích thước văn bản tăng. Điều này sẽ làm cho nó trở thành một cách tốt để kiểm tra hiệu suất:
```
## performance-tutorial / src / components / CharacterMap / CharacterMap.js

import React from 'react';
import PropTypes from 'prop-types';

function itemize(text){
  const letters = text.split('')
    .filter(l => l !== ' ')
    .reduce((collection, item) => {
      const letter = item.toLowerCase();
      return {
        ...collection,
        [letter]: (collection[letter] || 0) + 1
      }
    }, {})
  return letters;
}

export default function CharacterMap({ text }) {
  return(
    <div>
      Character Map:
      {text}
    </div>
  )
}

CharacterMap.propTypes = {
  text: PropTypes.string.isRequired
}    
```
* Bên trong **itemize**, bạn chuyển đổi văn bản thành một mảng bằng cách sử dụng **.split** trên mọi ký tự. Sau đó, bạn loại bỏ các khoảng trắng bằng phương thức **.filter** và sử dụng phương thức **.reduce** để lặp lại từng chữ cái. **Reduce** truyền vào đối tượng **{}** làm giá trị ban đầu, sau đó chuẩn hóa ký tự bằng cách chuyển đổi nó thành chữ thường và thêm 1 vào tổng trước đó hoặc 0 nếu không có tổng trước đó.  Cập nhật đối tượng với giá trị mới trong khi vẫn giữ nguyên các giá trị trước đó bằng cách sử dụng [spread operator](https://www.digitalocean.com/community/tutorials/understanding-destructuring-rest-parameters-and-spread-syntax-in-javascript) cho **collection**.
* Bây giờ bạn đã tạo một đối tượng với số lượng cho mỗi ký tự, bạn cần sắp xếp nó theo ký tự cao nhất. Chuyển đổi đối tượng thành một mảng các cặp key value với **Object.entries**. Phần tử đầu tiên trong một mảng con là kí tự và phần tử thứ hai là số lượng kí tự đếm được. Sử dụng phương thức **.sort** để đặt các ký tự phổ biến nhất lên trên:
```
## performance-tutorial/src/components/CharacterMap/CharacterMap.js

import React from 'react';
import PropTypes from 'prop-types';

function itemize(text){
  const letters = text.split('')
    .filter(l => l !== ' ')
    .reduce((collection, item) => {
      const letter = item.toLowerCase();
      return {
        ...collection,
        [letter]: (collection[letter] || 0) + 1
      }
    }, {})
  return Object.entries(letters)
    .sort((a, b) => b[1] - a[1]);
}

export default function CharacterMap({ text }) {
  return(
    <div>
      Character Map:
      {text}
    </div>
  )
}

CharacterMap.propTypes = {
  text: PropTypes.string.isRequired
}    
```
* Cuối cùng, gọi hàm itemize để hiển thị kết quả:
```
## performance-tutorial / src / components / CharacterMap / CharacterMap.js
    
import React from 'react';
import PropTypes from 'prop-types';

function itemize(text){
  const letters = text.split('')
    .filter(l => l !== ' ')
    .reduce((collection, item) => {
      const letter = item.toLowerCase();
      return {
        ...collection,
        [letter]: (collection[letter] || 0) + 1
      }
    }, {})
  return Object.entries(letters)
    .sort((a, b) => b[1] - a[1]);
}

export default function CharacterMap({ text }) {
  return(
    <div>
      Character Map:
      {itemize(text).map(character => (
        <div key={character[0]}>
          {character[0]}: {character[1]}
        </div>
      ))}
    </div>
  )
}

CharacterMap.propTypes = {
  text: PropTypes.string.isRequired
}
```
* Trước khi bạn có thể sử dụng thành phần, bạn cần một cách để lưu trữ văn bản. Import **useState** sau đó gọi hàm và lưu trữ trên một biến gọi là **text** và một hàm cập nhật được gọi **setText**.
* Để cập nhật **text**, hãy thêm một hàm vào **onChange** đó sẽ chuyển **event.target.value** đến hàm **setText**:
```
## performance-tutorial / src / components / App / App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');

  return(
    <div className="wrapper">
      <label htmlFor="text">
        <p>Your Text</p>
        <textarea
          id="text"
          name="text"
          rows="10"
          cols="100"
          onChange={event => setText(event.target.value)}
        >
        </textarea>
      </label>
    </div>
  )
}

export default App; 
```
* Lưu ý rằng bạn đang khởi tạo **useState** với một chuỗi rỗng. Điều này sẽ đảm bảo rằng giá trị ban đầu bạn chuyển cho component **CharacterMap** luôn là một chuỗi rỗng.
* Import **CharacterMap** và **render** nó sau thẻ **<label>**. Truyền state **text** vào như 1 prop **text**:
```
## performance-tutorial/src/components/CharacterMap/CharacterMap.js

import React, { useState } from 'react';
import './App.css';

import CharacterMap from '../CharacterMap/CharacterMap';

function App() {
  const [text, setText] = useState('');

  return(
    <div className="wrapper">
      <label htmlFor="text">
        <p>Your Text</p>
        <textarea
          id="text"
          name="text"
          rows="10"
          cols="100"
          onChange={event => setText(event.target.value)}
        >
        </textarea>
      </label>
      <CharacterMap text={text} />
    </div>
  )
}

export default App; 
```
*  Cuối cùng, khi bạn gõ văn bản, bạn sẽ tìm thấy phân tích ký tự sau khi nhập:
    
![](https://images.viblo.asia/5b84bde0-3322-4d0a-b65f-a553d8836054.gif)

* Như được hiển thị trong ví dụ, component hoạt động khá tốt với một lượng nhỏ văn bản. Với mỗi lần gõ phím, React sẽ cập nhật dữ liệu mới vào **CharacterMap**. Nhưng hiệu suất cục bộ có thể gây nhầm lẫn vì không phải tất cả các thiết bị sẽ có cùng bộ nhớ giống môi trường phát triển của bạn.
## Test performance
* Có nhiều cách để kiểm tra hiệu suất ứng dụng của bạn. Bạn có thể thêm khối lượng lớn văn bản hoặc bạn có thể đặt trình duyệt của mình để sử dụng ít bộ nhớ hơn. Để đẩy thành phần đến mức tắc nghẽn hiệu suất, hãy sao chép [mục nhập Wikipedia cho GNU](https://en.wikipedia.org/wiki/GNU) và dán nó vào hộp văn bản.
* Sau khi dán mục nhập vào hộp văn bản của bạn, hãy thử nhập ký tự bổ sung **e** và lưu ý thời gian hiển thị. Sẽ có một khoảng thời gian tạm dừng đáng kể trước khi danh sách các **character** được **update**:

![](https://images.viblo.asia/7f9fdd19-ca48-4f6b-a86e-e608bb3d5c7b.gif)

* Nếu thành phần không đủ chậm và bạn đang sử dụng [Firefox](https://www.mozilla.org/en-US/firefox/) , [Edge](https://www.microsoft.com/en-us/edge) hoặc một số trình duyệt khác, hãy thêm văn bản cho đến khi bạn nhận thấy sự chậm lại.
* Nếu đang sử dụng [Chrome](https://www.google.com/chrome/) , bạn có thể điều chỉnh CPU bên trong tab hiệu suất. Đây là một cách tuyệt vời để mô phỏng điện thoại thông minh hoặc một phần cứng cũ hơn. Để biết thêm thông tin, hãy xem [tài liệu Chrome DevTools](https://developer.chrome.com/docs/devtools/network/#throttle).

![](https://images.viblo.asia/0ddef7fa-c6e6-4224-bdc8-4c5f6f1991f9.png)

* Nếu thành phần quá chậm với mục nhập Wikipedia, hãy xóa một số đoạn văn bản. Bạn muốn nhận được một sự chậm trễ đáng kể, nhưng bạn không muốn làm cho nó chậm không sử dụng được hoặc làm đơ trình duyệt của bạn.
## Ngăn chặn components con re-render
* Function **itemize** là nguyên nhân gốc của sự chậm trễ được xác định trong phần cuối. Hàm thực hiện nhiều công việc trên mỗi mục nhập bằng cách lặp lại nhiều lần các nội dung. Có những cách tối ưu hóa bạn có thể thực hiện trực tiếp trong chính hàm, nhưng trọng tâm của hướng dẫn này là cách xử lý component re-render khi **text** không thay đổi. Nói cách khác, bạn sẽ coi hàm **itemize** như một hàm mà bạn không có quyền truy cập để thay đổi. Mục tiêu sẽ là chỉ chạy nó khi cần thiết. Điều này sẽ hiển thị cách xử lý hiệu suất cho các APIs hoặc thư viện của bên thứ ba mà bạn không thể kiểm soát.
* Để bắt đầu, bạn sẽ khám phá một tình huống mà thành phần cha thay đổi, nhưng thành phần con không thay đổi. Bên trong **App.js**, hãy thêm một đoạn giải thích cách thành phần hoạt động và một nút để chuyển đổi thông tin:
```
## performance-tutorial / src / components / App / App.js

import React, { useReducer, useState } from 'react';
import './App.css';

import CharacterMap from '../CharacterMap/CharacterMap';

function App() {
  const [text, setText] = useState('');
  const [showExplanation, toggleExplanation] = useReducer(state => !state, false)

  return(
    <div className="wrapper">
      <label htmlFor="text">
        <p>Your Text</p>
        <textarea
          id="text"
          name="text"
          rows="10"
          cols="100"
          onChange={event => setText(event.target.value)}
        >
        </textarea>
      </label>
      <div>
        <button onClick={toggleExplanation}>Show Explanation</button>
      </div>
      {showExplanation &&
        <p>
          This displays a list of the most common characters.
        </p>
      }
      <CharacterMap text={text} />
    </div>
  )
}

export default App;
```
* Gọi **useReducer** Hook với reducer function để đảo ngược **state** hiện tại. Lưu đầu ra vào **showExplanation** và **toggleExplanation**. Sau thẻ **<label>**, hãy thêm một **<button>** để chuyển đổi **explanation** và một đoạn văn sẽ hiển thị khi nào **showExplanation** là **true**.
* Khi trình duyệt làm mới, hãy nhấp vào nút để chuyển đổi phần **showExplanation**. Chú ý làm thế nào có sự chậm trễ ở đây.

![](https://images.viblo.asia/596d0118-6cd5-4a2a-9642-5babad40bdb9.gif)

* Đây là một vấn đề. Người dùng của bạn sẽ không gặp phải sự chậm trễ khi họ chuyển đổi một lượng nhỏ [JSX](https://www.digitalocean.com/community/tutorials/how-to-create-react-elements-with-jsx). Sự chậm trễ xảy ra bởi vì khi thành phần cha thay đổi - **App.js** trong tình huống này - component **CharacterMap** re-render và tính toán lại toàn bộ dữ liệu ký tự. Phần **text** giống hệt nhau, nhưng thành phần vẫn hiển thị lại vì React sẽ hiển thị lại toàn bộ cây thành phần khi một thành phần cha thay đổi. 
* Nếu bạn cài đặt **Profiler** - 1 công cụ phát triển dành cho lập trình viên, bạn sẽ phát hiện ra rằng thành phần re-render do component cha thay đổi:

![](https://images.viblo.asia/b68a9f2d-aa59-40b0-826c-8bae5481ec99.png)

* Vì **CharacterMap** chứa một hàm xử lý rất nhiều, nó chỉ nên **re-render** khi **text** prop thay đổi. Tiếp theo, nhập **memo**, sau đó truyền **component** đến **memo** và **export** kết quả là 1 **default** tương tự như **component**:
```
## performance-tutorial / src / components / CharacterMap / CharacterMap.js

import React, { memo } from 'react';
import PropTypes from 'prop-types';

function itemize(text){
  ...
}

function CharacterMap({ text }) {
  return(
    <div>
      Character Map:
      {itemize(text).map(character => (
        <div key={character[0]}>
          {character[0]}: {character[1]}
        </div>
      ))}
    </div>
  )
}

CharacterMap.propTypes = {
  text: PropTypes.string.isRequired
}

export default memo(CharacterMap);
```
* Khi bạn làm như vậy, trình duyệt sẽ tải lại và không còn sự chậm trễ sau khi bạn nhấp vào **<button>** trước khi bạn nhận được kết quả:

![](https://images.viblo.asia/69ad24f0-27d7-4601-b161-ec3160e9b234.gif)

* Nếu bạn nhìn vào các công cụ dành cho nhà phát triển, bạn sẽ thấy rằng **component** không còn **re-render** nữa:

![](https://images.viblo.asia/01e995a4-0296-4155-8169-32e1f93b73ac.png)

* Function **memo** sẽ thực hiện một **shallow comparition** của **props** và sẽ **re-renders** component chỉ khi **props** thay đổi. Một phép **shallow comparition** sẽ sử dụng toán tử **===** để so sánh **previous prop** và **current prop**. Có tốn ít hiệu suất để kiểm tra **props**, nhưng khi bạn có tác động rõ ràng về hiệu suất, chẳng hạn như ở ví dụ này, thì điều đó đáng để ngăn chặn **re-renders**. Hơn nữa, vì React thực hiện một phép **shallow comparition**, component con sẽ vẫn **re-renders** khi prop là một đối tượng hoặc một hàm. Bạn sẽ đọc thêm về cách xử lý các **functions** được truyền là **props** trong phần 3.
* Ở phần này, bạn đã tạo một ứng dụng có tính toán chậm và dài (tính số lần xuất hiện của từng kí tự trong một đoạn văn bản). Bạn đã biết nguyên nhân gốc khiến thành phần con **re-renders** và cách ngăn **re-renders** bằng cách sử dụng **memo**. Trong **phần 2**, bạn sẽ ghi nhớ các **actions** trong một component để bạn chỉ thực hiện các **actions** này khi các thuộc tính cụ thể thay đổi.
* Bài viết tham khảo từ tutorial [How To Avoid Performance Pitfalls in React with memo, useMemo, and useCallback](https://www.digitalocean.com/community/tutorials/how-to-avoid-performance-pitfalls-in-react-with-memo-usememo-and-usecallback) của tác giả **Joe Morgan**