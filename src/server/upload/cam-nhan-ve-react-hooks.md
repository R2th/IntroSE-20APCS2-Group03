# Lời mở đầu
Mình biết đến React và cũng tập tành code React được 1 thời gian. Tuy nhiên, câu chuyện đó đã cách đây gần 2 năm :joy:, khi mình còn là thực tập sinh và đó là dự án đầu tiên được làm theo quy trình. Hồi đó mình đi phỏng vấn và trong CV có đề cập đến React. Còn nhớ đợt đi phỏng vấn, sau các câu hỏi về ruby & rails, các anh phỏng vấn hỏi mình thêm về React. Mình cũng trả lời được 1 số câu kiến thức cơ bản về props, state, one-way binding, nhưng sau đó được hỏi sâu hơi về class component và functional component thì mình trả lời vòng vo, sau đó về hỏi người bạn (bạn ấy khá giỏi về react :+1::laughing:) thì mình cảm thấy những kiến thức React mình có lúc đó tương đối ít.  

Bẵng đi một thời gian không đụng đến React, đợt này mình có quay trở lại, mình dự định bắt đầu với các kiến thức còn sót lại về React và vẫn là người bạn mình nhắc ở trên nói với mình bây giờ Hooks đỉnh lắm, những gì Class Component làm được thì giờ Functional Component cũng làm được. Sau đó thì mình có tìm hiểu và train Hooks (thời gian chưa nhiều nên mình chỉ kịp nắm các kiến thức basic). Cảm nhận được Hooks đã làm cho Functional Component trở nên Powerful. Càng làm thì mình càng thấy thích sử dụng Functional Component qua Hooks hơn. Và đó là cảm nhận đầu tiên của mình về React Hooks.

# 1. Hooks là gì?
*Câu hỏi đầu tiên trong đầu sau khi thằng bạn nhắc đến React Hooks :joy::joy:* 

Hooks là feature mới được add vào từ version 16.8 của React.

Để hiểu Hooks, chúng ta cần lùi lại một bước và suy nghĩ về việc sử dụng lại code.

Hiện tại, có rất nhiều cách để sử dụng lại logic trong các ứng dụng React. Chúng ta có thể viết các hàm đơn giản và gọi chúng để tính toán một cái gì đó. 

Chúng ta cũng có thể viết các component (bản thân chúng có thể là các function hoặc class). Component ngày càng trở nên powerful, nhưng chúng phải hiển thị cả một số UI interface. Điều này làm cho Component trở nên bất tiện trong việc chia sẻ logic. 

Functional Component là một cơ chế để sử dụng lại code chứa logic trong React. Tuy nhiên, các chúng lại không có **state local** bên trong cấu trúc. Khi không có "state" chúng ta không thể render các action và cập nhập lại **state** tương ứng. Phải kết hợp cả Class Component (nơi chứa state local) và Functional Component (nơi có logic cập nhập action) và cách tiếp cận này mặc dù là basic nhưng ở góc nhìn của nhiều người nó có thể làm cho code React trở nên không đơn giản và rắc rối hơn khi scale component.

Hooks được tạo ra để giải quyết chính xác vấn đề đó. Làm cho Functional Component trở nên powerful và đã có thể sánh ngang với Class Component. 

Hooks cho phép bạn sử dụng các tính năng React (như state) từ một hàm bằng cách thực hiện một lệnh gọi hàm duy nhất. React cung cấp một vài Hooks tích hợp sẵn để tương ứng các chức năng đặc trưng của Class Component như là **state, lifecycle, context**

Vì Hooks là các hàm JavaScript thông thường, vì vậy có thể tạo ra được các Custom Hooks mà bạn thích, phục vụ cho việc tái sử dụng logic ở nhiều Component khác nhau. Khi đó, có thể coi như Custom Hooks là một Hooks có sẵn và sử dụng nó như cách bạn dùng useState, useEffect hay useRef.

Nhưng lưu ý rằng, Custom Hooks không phải là một chức năng có sẵn của React mà nó đơn giản là cách bạn viết các logic có thể tái sử dụng ở nhiều component khác trong React :v.

# 2. Điều ấn tượng ở Hooks
*Cảm nhận về những điều ấn tượng của Hooks so với class component đã làm mình thấy thích Hooks hơn rất nhiều :joy::joy:*

### Không phải cấu trúc lại một Functional Component thành Class Component khi nó phát triển

Thông thường, một component React bắt đầu với một thành ```functional component```,component này chỉ phụ thuộc vào các ```props``` và sau đó phát triển thành một Class Component có ```state```. 

Việc thay đổi từ một ```functional component``` sang một ```class component``` đòi hỏi một chút cấu trúc lại, tùy thuộc vào mức độ phức tạp của component đó.

Với React Hooks, vì các ```functional component``` có khả năng sử dụng state thì việc tái cấu trúc sẽ là tối thiểu.

Ví dụ cấu trúc Class Component
```javascript
export class ShowCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    this.setState({
      count: this.props.count
    })
  }

  render() {
    return (
      <div> 
        <h1> Count : {this.state.count} </h1>
      </div>
    );
  }
  
}
```

Trong khi đó, hooks sẽ như sau:
```javascript
export function ShowCount(props) {
  const [count, setCount] = useState();

  useEffect(() => {
    setCount(props.count);
  }, [props.count]);

  return (
    <div>
      <h1> Count : {count} </h1>
    </div>
  );
}
```

### Không cần lo lắng về "this"
```this``` vẫn là điều gì đó mà ngày trước làm React với Class component mình hay mắc lỗi và phải sử dụng rất cẩn thận. Tuy nhiên, với Hooks sẽ không còn phải lo lắng về "this". Bởi vì với Hooks sẽ có riêng một hàm để thay đổi ```state```. Có một lưu ý với các bạn mới bắt đầu là thay đổi trong class component với câu lệnh "this.setState" sử dụng cơ chế **merging**, còn hàm update state của useState trong Hooks sử dụng cơ chế **replacing**.

### Không còn phụ thuộc vào method bindings
Không còn ```this``` thì cũng ko phải lo lắng về việc binding ví dụ như ```this.handleClickEvent = this.handleClickEvent.bind(this)``` đã được thay thế trong Hooks bằng cách gọi trực tiếp hàm như sau ```onClick={ handleClickEvent }```

### Dễ dàng hơn để tách logic khỏi UI interface, giúp việc tái sử dụng nhiều hơn và dễ hơn
Sử dụng hooks, logic và UI dễ dàng tách biệt hơn. Không cần HOC (component higher) hoặc render props. Trong hooks chứa cả UI và render lại UI đó khi state thay đổi.

### Giữ logic liên quan ở cùng một nơi
Class Component sẽ sử dụng các hàm quản lý vòng đời component và ví dụ bạn muốn dùng componentDidMount để mounn component cho trường hợp đăng kí và componentWillUnmount cho trường hợp hủy đăng kí thì có thể bạn phải viết 2 method này ở 2 component khác nhau. Nhưng sử dụng useEffect của Hooks có thể giúp bạn viết cùng lúc logic tương ứng với 2 method trên trong cùng component như sau

```javascript
import { getCounts } from "./reactive-service";

export function ShowCount(props) {
  const [count, setCount] = useState();
  const [secondCount, setSecondCount] = useState(0);

  useEffect(() => {
    const countServiceSubject = getCounts();
    countServiceSubject.subscribe((count) => {
      setCount(count);
    });
    return () => {
      countServiceSubject.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setSecondCount(secondCount + 1);
  }, []);

  return (
    <div>
      <h1> Count : {count} </h1>
      <h1> Second Count: {secondCount} </h1>
    </div>
  );
}
```

### Chia sẻ logic giữa các component bằng Custom Hooks
Sử dụng custom hook như đã nói ở phần 1 sẽ là phương pháp chia sẻ logic giữa các component một cách thuận tiện.
**Ví dụ về Custom Hooks**
```javascript
import { useState, useEffect } from 'react';

function formatDate(date) {
  if (!date) return '';

  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

function useClock() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      const newTimeString = formatDate(now);

      setTimeString(newTimeString);
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  return { timeString };
}

export default useClock;
```

Ở đây, sử dụng useEffect tương ứng như cách Class component gọi hàm componentDidMount để render một lần duy nhất. Và với một custom hook với mục đích là tạo ra một clock chạy liên tục thì sau mỗi lần unmount component này khỏi DOM mình cần sử dụng thêm clean up để clear dữ liệu, chính xác là dừng việc đồng hồ này chạy ngầm. Sử dụng thêm empty dependency để Component này chỉ render 1 lần duy nhất.

Sau đó mình sẽ thêm custom Hooks này vào trong 1 component render view, và note thêm là các Custom Hooks chỉ trả về object và ko thể viết render trong đó mà phải thông qua component khác.

```javascript
import React from 'react';
import useClock from '../hooks/useClock'

Clock.propTypes = {};

function Clock() {
  const { timeString } = useClock();

  return (
    <p style={{ fontSize: '42px' }}>{timeString}</p>
  );
}

export default Clock;
```

Custom Hooks là phần hấp dẫn nhất của Hooks. Dựa vào chính các hooks có sẵn để tạo ra 1 hooks theo ý thích của bạn. Hooks có thể bao gồm tất cả các trường hợp sử dụng cho Class component đồng thời cung cấp sự linh hoạt hơn trong việc render, testing và sử dụng lại code. Và mình cảm nhận được Hooks sẽ trở thành cách xây dựng component React trong tương lai.

# 3. Một số ví dụ đơn giản
*Chắc chắn là nói không thì sẽ khó hình dung cho mọi người khi bắt đầu. Mình xin phép được show một số ví dụ để mọi người nhìn thấy sự tương ứng của Functional Component khi sử dụng Hooks so với Class Component. :joy::joy:*

```javascript
import React, {useState} from 'react';
import PropTypes from 'prop-types';

function FormSubmit(props) {
  const {pagination} = props
  const [value, setValue] = useState('');

  function savePost(){
    const formValue = value
    const originUrl = window.location.origin + '/'
    const url = window.location.href

    function convertUrl(){
      if(originUrl == url){
        return originUrl + 'posts';
      } else {
        return window.location.href;
      }
    }

    fetch(`${convertUrl()}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: {"body": formValue},
        page: pagination.page,
        limit: pagination.limit
      })
    })

    if(pagination.page !== 1){location.href = window.location.href};
  }

  function handleSubmit(e){
    e.preventDefault();
    savePost();
    setValue('');
  }

  function handleValueChange(e){
    const formValue = e.target.value;
    setValue(formValue);
  }

  return (
    <div>
      <form className="form-group" onSubmit={(e) => {handleSubmit(e)}}>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Enter your blab"
          onChange={(e) => handleValueChange(e)}
          value={value}
          style={{color: 'black'}}
        />
        <button
          className="action my-4 btn btn-primary"
          type="submit"
        >Create Post</button>
      </form>
    </div>
  );
}

export default FormSubmit;
```

![](https://images.viblo.asia/2b505616-e302-4fdc-9d3f-e0efe8bc7976.gif)

 
Đây là một ví dụ đơn giản về một submit form trong React. Mình có sử dụng chỉ Functional Component có useState (1 hooks của React) để tạo ra state local thay vì sử dụng Class Component để tạo ra state và dụng Functional component để thay đổi logic.

Đầu tiên tạo state "value" và 1 function setValue để cập nhập lại state "value" đó bằng cách sử dụng useState ```const [value, setValue] = useState('');``` thì đã xong bước setup Hooks

Phân tích 1 chút: Ở đây mình có 1 đối tượng là form submit, nó có event là **onSubmit** nhận vào 1 callback function là **handleSubmit**. Trong form có phần input bằng textarea, input này có 1 sự kiện là onChange, để điều chỉnh thay đổi của state "value" trong sự kiện này mình sử dụng callback funtion **handleValueChange**.

Vậy là Hooks đã giúp Functional Component vừa render được view lại vừa có thể thay đổi view đó dựa vào logic cập nhập state.

# Lời kết
Trên đây là một số cảm nhận của mình trong quá trình tìm hiểu và sử dụng Hooks. Niềm cảm hứng khi mình học lại React. Mọi người nếu cảm thấy không thích sử dụng Hooks và Functional Component thì cũng không có gì lạ cả. Bởi vì Class Component và Functional Component (sử dụng Hooks) tương đương nhau, như 2 trường phái song song, và khi build một project lớn rồi thì chẳng cần gì phải thay thế Class Component bằng Hooks. :satisfied::joy:

**Cảm ơn mọi người đã dành thời gian cho bài viết. Hi vọng mọi người có thêm 1 góc nhìn về React Hooks mặc dù bài viết khá sơ xài ^^! Thanks ALL** :kissing_heart:

Một số kiến thức trong bài mình tham khảo tại https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889
https://blog.bitsrc.io/6-reasons-to-use-react-hooks-instead-of-classes-7e3ee745fe04