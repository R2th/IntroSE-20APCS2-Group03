# Giới thiệu
* Trong phần 1, chúng ta đã đi tìm hiểu cách tối ưu hóa hiệu suất React component với việc sử dụng **memo**. Ở phần này, chúng ta sẽ sử dụng một cách khác để tránh re-renders.
# Bước 2: Lưu trữ bộ nhớ đệm các tính toán phức tạp với useMemo
* Trong bước này, bạn sẽ lưu trữ kết quả của các phép tính dữ liệu chậm bằng **useMemo** Hook. Sau đó, bạn sẽ kết hợp **useMemo** Hook trong một thành phần hiện có và đặt các điều kiện để tính toán lại dữ liệu. Đến cuối bước này, bạn sẽ có thể lưu vào bộ nhớ cache các chức năng tốn tài nguyên để chúng chỉ chạy khi các phần dữ liệu cụ thể thay đổi.
* Trong bước trước, phần giải thích **toggled** của thành phần là một phần của phần cha. Tuy nhiên, thay vào đó bạn có thể thêm nó vào chính thành phần **CharacterMap**. Khi bạn làm vậy, **CharacterMap** sẽ có hai thuộc tính, **text** và **showExplanation**, và nó sẽ hiển thị **explanation** khi nào **showExplanation** là trung thực.
* Bắt đầu với **CharacterMap.js**, thêm một thuộc tính mới của **showExplanation**. Hiển thị văn bản giải thích khi giá trị của **showExplanation** là trung thực:
```
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function itemize(text){
  ...
}

function CharacterMap({ showExplanation, text }) {
  return(
    <div>
      {showExplanation &&
        <p>
          This display a list of the most common characters.
        </p>
      }
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
  showExplanation: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default memo(CharacterMap);
```
* Tiếp theo là **App.js**, chúng ta xóa đoạn giải thích và chuyển **showExplanation** là 1 prop vào **CharacterMap**:
```
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
      <CharacterMap showExplanation={showExplanation} text={text} />
    </div>
  )
}

export default App;
```
* Refresh lại trình duyệt. Khi bạn click button **Show Explanation**, bạn sẽ nhận thấy sự chậm trễ ở đây:
![](https://images.viblo.asia/f7cfbb62-1bf4-49c5-99a2-a1ae2d5c5eb4.gif)

* Nếu bạn nhìn vào **profiler**, bạn sẽ phát hiện ra rằng thành phần được hiển thị lại do prop **showExplanation** đã thay đổi:
![](https://images.viblo.asia/5a998fdd-af24-44db-8793-c55a520cad57.png)

* Hàm **memo** sẽ so sánh các props và ngăn re-renders nếu props không thay đổi, nhưng trong trường hợp này prop **showExplanation** đã thay đổi, vì vậy toàn bộ component sẽ re-render lại và component sẽ chạy lại function **itemize**
* Trong trường hợp này, bạn cần ghi nhớ các phần cụ thể của component, không phải toàn bộ component. React cung cấp một Hook đặc biệt có tên là Hook **useMemo** mà bạn có thể sử dụng để bảo vệ các phần của component của mình qua các lần **re-renders**. Hook có hai đối số. Đối số đầu tiên là một hàm sẽ trả về giá trị bạn muốn ghi nhớ. Đối số thứ hai là một mảng các phụ thuộc. Nếu một phần phụ thuộc thay đổi, **useMemo** sẽ chạy lại hàm và trả về một giá trị.
* Triển khai **useMemo** trong **CharacterMap.js**. Khai báo một biến mới được gọi **characters**. Sau đó, gọi **useMemo** và chuyển một hàm ẩn danh trả về giá trị **itemize(text)** là đối số đầu tiên và một mảng chứa **text** là đối số thứ hai. Khi **useMemo** chạy, nó sẽ trả về kết quả của **itemize(text)** cho biến **characters**.
```

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

function itemize(text){
  ...
}

function CharacterMap({ showExplanation, text }) {
  const characters = useMemo(() => itemize(text), [text]);
  return(
    <div>
      {showExplanation &&
        <p>
          This display a list of the most common characters.
        </p>
      }
      Character Map:
      {characters.map(character => (
        <div key={character[0]}>
          {character[0]}: {character[1]}
        </div>
      ))}
    </div>
  )
}

CharacterMap.propTypes = {
  showExplanation: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default memo(CharacterMap);
```
* Refresh lại trình duyệt và sẽ không có độ trễ khi bạn thay đổi **explanation**:
![](https://images.viblo.asia/155585cf-f045-4478-8ed5-7bd3ea660af1.gif)

* Nếu bạn để ý profile component, bạn sẽ thấy nó vẫn re-renders, nhưng thời gian cần để hiển thị sẽ ngắn hơn nhiều. Trong ví dụ này, nó mất **0,7 milliseconds** so với **916,4 milliseconds** nếu không có **useMemo** Hook. Đó là bởi vì React đang re-rendering lại thành phần, nhưng nó không chạy lại chức năng có trong **useMemo** Hook. Bạn có thể bảo toàn kết quả trong khi vẫn cho phép các phần khác của thành phần cập nhật:
![](https://images.viblo.asia/aea7a424-1708-4f34-980b-47e53d296a88.png)

* Nếu bạn thay đổi **text** trong textbox, sẽ vẫn có độ trễ vì phụ thuộc **text** đã thay đổi, vì vậy **useMemo** sẽ chạy lại hàm. Nếu nó không chạy lại, bạn sẽ có dữ liệu cũ. Điểm mấu chốt là nó chỉ chạy khi dữ liệu nó cần thay đổi.
* Trong bước này, bạn đã ghi nhớ các phần của component. Bạn đã cô lập một hàm tốn tài nguyên khỏi phần còn lại của thành phần và chỉ sử dụng **useMemo** Hook để chạy hàm khi các phụ thuộc nhất định thay đổi. Trong bước tiếp theo, bạn sẽ ghi nhớ các hàm để ngăn **shallow comparison** re-renders.

# Bước 3: Quản lý hàm check bằng nhau với useCallback
* Trong bước này, bạn sẽ xử lý các props khó để so sánh trong **JavaScript**. React sử dụng kiểm tra bình đẳng nghiêm ngặt khi prop thay đổi. Việc kiểm tra này xác định thời điểm chạy lại Hooks và thời điểm **re-render** components. Vì rất khó so sánh các hàm và đối tượng trong JavaScript, nên có những trường hợp nơi mà prop vẫn giống nhau triệt để nhưng vẫn kích hoạt re-render.
* Bạn có thể sử dụng **useCallback** Hook để bảo vệ một **function** qua các lần re-renders. Điều này sẽ ngăn các re-renders không cần thiết khi component cha tạo lại một hàm. Khi kết thúc bước này, bạn sẽ có thể ngăn re-render bằng **useCallback** Hook.
* Khi bạn xây dựng component **CharacterMap**, bạn có thể gặp phải tình huống mà bạn cần nó linh hoạt hơn. Trong hàm **itemize**, bạn luôn chuyển đổi ký tự thành chữ thường, nhưng một số người dùng **component** có thể không muốn chức năng đó. Họ có thể muốn so sánh các ký tự viết hoa và viết thường hoặc muốn chuyển đổi tất cả các ký tự thành chữ hoa.
* Để tạo điều kiện thuận lợi cho việc này, hãy thêm một prop mới là **transformer** mà sẽ làm thay đổi kí tự. Hàm **transformer** sẽ là bất cứ thứ gì lấy một kí tự như một đối số và trả về một chuỗi của một số loại. 
* Bên trong CharacterMap, thêm **transformer** vào như một prop. Cung cấp **PropType** mặc định là **null**:
```
import React, { memo, useMemo } from 'react';
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

function CharacterMap({ showExplanation, text, transformer }) {
  const characters = useMemo(() => itemize(text), [text]);
  return(
    <div>
      {showExplanation &&
        <p>
          This display a list of the most common characters.
        </p>
      }
      Character Map:
      {characters.map(character => (
        <div key={character[0]}>
          {character[0]}: {character[1]}
        </div>
      ))}
    </div>
  )
}

CharacterMap.propTypes = {
  showExplanation: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  transformer: PropTypes.func
}

CharacterMap.defaultProps = {
  transformer: null
}

export default memo(CharacterMap);
```
* Tiếp theo, cập nhật **itemize** để lấy **transformer** làm đối số. Thay thế phương thức **.toLowerCase** bằng **transformer**. Nếu **transformer** là true, gọi function với **item** làm đối số. Nếu không thì trả về **item**: 
```
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

function itemize(text, transformer){
  const letters = text.split('')
    .filter(l => l !== ' ')
    .reduce((collection, item) => {
      const letter = transformer ? transformer(item) : item;
      return {
        ...collection,
        [letter]: (collection[letter] || 0) + 1
      }
    }, {})
  return Object.entries(letters)
    .sort((a, b) => b[1] - a[1]);
}

function CharacterMap({ showExplanation, text, transformer }) {
    ...
}

CharacterMap.propTypes = {
  showExplanation: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  transformer: PropTypes.func
}

CharacterMap.defaultProps = {
  transformer: null
}

export default memo(CharacterMap);
```
* Cuối cùng, cập nhật **useMemo** Hook. Thêm **transformer** như một phụ thuộc và truyền nó vào function **itemize**. Bạn muốn chắc chắn rằng các phụ thuộc của bạn là đầy đủ. Điều đó có nghĩa là bạn cần thêm bất kỳ thứ gì có thể thay đổi dưới dạng phụ thuộc. Nếu người dùng thay đổi **transformer** bằng cách chuyển đổi giữa các tùy chọn khác nhau, bạn cần chạy lại chức năng để nhận được giá trị chính xác.
```
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

function itemize(text, transformer){
  ...
}

function CharacterMap({ showExplanation, text, transformer }) {
  const characters = useMemo(() => itemize(text, transformer), [text, transformer]);
  return(
    <div>
      {showExplanation &&
        <p>
          This display a list of the most common characters.
        </p>
      }
      Character Map:
      {characters.map(character => (
        <div key={character[0]}>
          {character[0]}: {character[1]}
        </div>
      ))}
    </div>
  )
}

CharacterMap.propTypes = {
  showExplanation: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  transformer: PropTypes.func
}

CharacterMap.defaultProps = {
  transformer: null
}

export default memo(CharacterMap);
```
* Trong ứng dụng này, bạn không muốn cung cấp cho người dùng khả năng chuyển đổi giữa các chức năng khác nhau. Nhưng bạn muốn các ký tự được viết thường. Xác định một **transformer** trong **App.js** đó sẽ chuyển đổi ký tự thành chữ thường. Hàm này sẽ không bao giờ thay đổi, nhưng bạn cần phải chuyển nó cho **CharacterMap**:
```
import React, { useReducer, useState } from 'react';
import './App.css';

import CharacterMap from '../CharacterMap/CharacterMap';

function App() {
  const [text, setText] = useState('');
  const [showExplanation, toggleExplanation] = useReducer(state => !state, false)
  const transformer = item => item.toLowerCase();

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
      <CharacterMap showExplanation={showExplanation} text={text} transformer={transformer} />
    </div>
  )
}

export default App;
```
* Lưu các tập tin. Khi bạn làm như vậy, bạn sẽ thấy rằng sự chậm trễ đã quay trở lại khi bạn thay đổi nút **Show Explanation**.
![](https://images.viblo.asia/3600bf40-7940-44d2-a593-d8434cf354b8.gif)

* Nhìn vào phần profile khi F12, bạn sẽ nhìn thấy component re-renders bởi vì các props thay đổi và Hooks đã thay đổi:
![](https://images.viblo.asia/63807ca5-97f8-47e8-97c7-f0f5a24d3380.png)

* Nếu bạn quan sát kỹ hơn, bạn sẽ thấy rằng prop **showExplanation** đã thay đổi, điều này dễ hiểu bởi vì bạn đã click button, nhưng tại sao prop **transformer** cũng thay đổi theo?
* Khi bạn thực hiện thay đổi trạng thái **App** bằng cách nhấp vào nút, component **App** được render lại và được khai báo lại **transformer**. Mặc dù hàm giống nhau, nhưng nó không giống với hàm trước đó về mặt tham chiếu. Điều đó có nghĩa là nó không hoàn toàn giống với chức năng trước đó.
* Nếu bạn test thử console trên trình duyệt và so sánh các chức năng giống hệt nhau, bạn sẽ thấy rằng so sánh bằng là sai:
```
const a = () = {};
const b = () = {};

a === a       // True

a === b       // False
```
* Sử dụng toán tử so sánh ===, đoạn mã này cho thấy rằng hai hàm không được coi là bằng nhau, ngay cả khi chúng có cùng giá trị.
* Để tránh vấn đề này, React cung cấp một Hook được gọi là **useCallback**. Hook tương tự như **useMemo**: nó nhận một hàm làm đối số đầu tiên và một mảng phụ thuộc làm đối số thứ hai. Sự khác biệt là **useCallback** trả về hàm chứ không phải kết quả của hàm. . Giống như Hook **useMemo**, nó sẽ không tạo lại hàm trừ khi một phần phụ thuộc thay đổi. Điều đó có nghĩa là **useMemo** Hook trong **CharacterMap.js** sẽ so sánh cùng một giá trị và Hook sẽ không chạy lại.
* Bên trong của **App.js**, nhập **useCallback** và chuyển hàm ẩn danh làm đối số đầu tiên và một mảng trống làm đối số thứ hai. Bạn không bao giờ muốn **App** tạo lại chức năng này:
```
import React, { useCallback, useReducer, useState } from 'react';
import './App.css';

import CharacterMap from '../CharacterMap/CharacterMap';

function App() {
  const [text, setText] = useState('');
  const [showExplanation, toggleExplanation] = useReducer(state => !state, false)
  const transformer = useCallback(item => item.toLowerCase(), []);

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
      <CharacterMap showExplanation={showExplanation} text={text} transformer={transformer} />
    </div>
  )
}

export default App;
```
* Khi bạn làm như vậy, bạn sẽ có thể chuyển đổi phần explanation mà không cần chạy lại function **toLowerCase()**:
![](https://images.viblo.asia/8be1da5e-ef23-4a52-995d-28e6230a172a.gif)
* Nhìn vào profile, bạn sẽ thấy rằng Hook không còn chạy nữa:
![](https://images.viblo.asia/7d0893e5-8555-4696-ab33-6f4b0abac271.png)
* Trong component cụ thể này, bạn không thực sự cần Hook **useCallback**. Bạn có thể khai báo hàm bên ngoài component và nó sẽ không bao giờ re-render. Bạn chỉ nên khai báo các hàm bên trong component nếu chúng yêu cầu một số loại prop hoặc data state. Nhưng đôi khi bạn cần tạo các chức năng dựa trên **internal state** hoặc các props và trong những trường hợp đó, bạn có thể sử dụng Hook useCallback để giảm thiểu re-renders.
* Trong bước này, bạn đã bảo toàn các chức năng qua các lần re-renders bằng cách sử dụng Hook **useCallback**. Bạn cũng đã học được cách các hàm đó sẽ giữ được sự bình đẳng khi được so sánh dưới dạng các **props** hoặc các **dependencies** trong Hook.
# Kết luận
* Bây giờ bạn có các công cụ để cải thiện hiệu suất trên các thành phần tốn tài nguyên. Bạn có thể sử dụng **memo**, **useMemo** và **useCallback** để tránh **re-renders**. Nhưng tất cả các chiến lược này đều bao gồm chi phí hiệu suất của riêng chúng. **Memo** sẽ mất thêm tài nguyên để so sánh các thuộc tính, và Hooks sẽ cần chạy các phép so sánh bổ sung trên mỗi lần **render**. Chỉ sử dụng các công cụ này khi có nhu cầu rõ ràng trong dự án của bạn, nếu không, bạn có nguy cơ thêm độ trễ của chính mình.
* Cuối cùng, không phải tất cả các vấn đề về hiệu suất đều yêu cầu sửa chữa kỹ thuật. Đôi khi, chi phí hiệu suất là không thể tránh khỏi — chẳng hạn như API chậm hoặc chuyển đổi dữ liệu lớn —  và trong những tình huống đó, bạn có thể giải quyết vấn đề bằng cách sử dụng thiết kế bằng cách hiển thị lại các component đang tải, hiển thị **placeholders** trong khi các chức năng không đồng bộ đang chạy hoặc các cải tiến khác.
* Phần này chúng ta đã cùng tìm hiểu thêm hai kĩ thuật khác là **useMemo** và **useCallback**. Hi vọng sẽ giúp bạn phân biệt được và áp dụng tốt trong các dự án. Chúc bạn thành công!
* Nguồn tham khảo: [https://www.digitalocean.com/community/tutorials/how-to-avoid-performance-pitfalls-in-react-with-memo-usememo-and-usecallback](https://www.digitalocean.com/community/tutorials/how-to-avoid-performance-pitfalls-in-react-with-memo-usememo-and-usecallback)