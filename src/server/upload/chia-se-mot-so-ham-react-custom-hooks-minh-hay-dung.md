Trong bài viết này, mình sẽ chia sẻ một số hàm custom-hook trong **reactjs** mình tự viết/tham khảo và thường áp dụng vào các dự án mình làm, **hook** thì chắc đã quá quen thuộc với các bạn làm **reactjs** rồi nhỉ, mình không cần giới thiệu thêm nữa, **custom hook** là một khái niệm **mở rộng** từ **hook**, giúp chúng ta tái sử dụng **logic** giữa các **component** tương tự nhưng **HOC**(higher order component) hay **render props**, nhưng bằng một cách đơn giản hơn nhiều, hãy cùng bắt đầu nhé. 
### I. useInputText  
như mình có nói ở phần giới thiệu
> **custom hook** là một khái niệm **mở rộng** từ **hook**, giúp chúng ta tái sử dụng **logic** giữa các **component**.

Bạn sẽ đặt ra câu hỏi, vậy cụ thể là khi nào **logic** trong **component** có thể tái sử dụng, mình ví dụ nhé, mình có một **component** sau:  
```js
import React from 'react'
import 'styles/input.css'

function Input({ value, onChange, title }) {
    return (
        <label>
            <span>{title}</span>
            <input value={value} onChange={onChange} />
        </label>
    )
}
```
Ở trên chúng ta viết một **component input** với mục đích dùng chung, đầu tiên là trang **HomePage**:
```js
import React, { useState } from 'react'
import Input from 'components/Input'

function HomePage() {
    const [inputValue, setInputValue] = useState('')
    
    function onChange(e) {
      setInputValue(e.target.value)
    }
    
    return (
    // ...
        <Input value={inputValue} onChange={onChange} />
    // ...
    )
    
}
```
Mọi thứ khá là ổn phải không, tiếp theo trang **AboutPage** cũng cần dùng **Input**  
```js
import React, { useState } from 'react'
import Input from 'components/Input'

function About() {
    const [inputValue, setInputValue] = useState('')
    
    function onChange(e) {
      setInputValue(e.target.value)
    }
    
    return (
    // ...
        <Input value={inputValue} onChange={onChange} />
    // ...
    )
    
}
```
Không ổn rồi, chúng ta sẽ mất hơi nhiều dòng **code** lặp lại nếu như **Input** này được sử dụng ở nhiều nơi khác phải không, vậy khi nào cần đến **custom hook**, theo cá nhân mình tự định nghĩa thì:
> **Component** sử dụng chung logic, và phần logic đấy có sử dụng **hook**  

Không biết có dễ hiểu không nhỉ, rồi giờ ở bài toán trên mình sẽ sử dụng **custom hook** như sau:  
Viết một **custom hook** - ở đây sẽ là một **function**, có thể **return** một giá trị nào đó, hoặc không và bưng phần logic bị lặp vào trong **function** đó: 
```js
import { useState } from 'react'

function useInputText(defaultValue) {
    const [value, setValue] = useState(defaultValue)
    
    function onChange(e) {
      setValue(e.target.value)
    }
    
    return { value, onChange  }
}

export default useInputText
```
Sau đó thay thế **logic** bị lặp ở **HomePage** và **AboutPage** bằng **useInputText**
```js
import React, { useState } from 'react'
import Input from 'components/Input'
import useInputText from 'hooks/useInputText'

function HomePage() {
    const inputText = useInputText('')
    
    return (
    // ...
        <Input {...inputText} />
    // ...
    )
}
```
Dễ hiểu phải không nào, đây là trường hợp kinh điển nhất ứng dụng **custom hook** rồi, có thể dựa vào đây để áp dụng khá nhiều trường hợp khác đấy nhé.  
### II. useQueryString && usePushQueryString
Hai **custom hook** tiếp theo mình hay dùng, do dự án mình làm có nhiều màn **list** với các chức năng **kinh điển** đó là: phân trang, lọc, sắp xếp, tìm kiếm =))  
Nghe to tát và nhiều tính năng vậy thôi chứ cũng đơn giản lắm, mình thường không tạo **state** để lưu những biến cho những chức năng trên mà sẽ đẩy hết lên **url**, để không cần xử lý gì khi người dùng **reload**, kiểu như **/users?page=1&search=deptrai&filter=male**. Có một khó khăn là **React Router** không hỗ trợ **query string** nên phải tự viết **logic** để cắt.  
```js
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

function useQueryString() {
  const location = useLocation();
  const queryString = useMemo(() => qs.parse(location.search), [location.search]);

  return queryString; // { page: 1, search: 'deptrai', filter: 'male' }
}

export default useQueryString;
```
Sau đó sử dụng trong trang **user list.**, tương tự với các trang list khác :D.
```js
import React, { useEffect } from 'react'
import useQueryString from 'hooks/useQueryString'

function UserList() {
    const { page, search, filter } = useQueryString()
    
    useEffect(() => {
        fetchUserList()
    }, [page, search, filter])
    
    ...
}
```
Ở trên là **hook** dùng để nhận dữ liệu từ **url**, để **update** thì mình sử dụng **hook** tiếp theo là **usePushQueryString**. Nghĩ một chút nhé, mỗi một **action** (search, filter, set page...) sẽ chỉ thay đổi 1 hoặc nhiều giá trị của **location.search**, giả sử **url** đang là **/users?page=1&search=deptrai&filter=male**, người dùng chuyển sang trang 2 chẳng hạn thì **url** mới sẽ là **/users?page=2&search=deptrai&filter=male**, tương tự với các **params** khác. Hướng xử lý sẽ là viết một **function**, truyền vào một **object** với thay đổi **url**.  
```jsx
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';

function usePushQueryString() {
  const location = useLocation();
  const history = useHistory();

  function handlePushLocationSearch(data) {
    const locationSearch = qs.parse(location.search);

    history.push({ search: `?${qs.stringify({ ...locationSearch, ...data })}` });
  }

  return handlePushLocationSearch;
}

export default usePushQueryString;
```
Lưu ý là **usePushQueryString** sẽ trả về một **function**, nhận vào tham số là một **object**, sau đây là cách sử dụng cho phần phân trang.  
```js
import React from 'react'
import usePushQueryString from 'hooks/usePushQueryString'

function Pagination() {
    const pushQueryString = usePushQueryString()
    
    handleChangePage(page) {
      pushQueryString({ page })
    }
    
    ...
}
```
### III. useScrollToTop
một **hook** khá giản dị, nếu mỗi lần người dùng truy cập trang thì đảm bảo là cuộn lên trên đầu, khá là hữu dụng khi cần dùng ở nhiều trang.
 ```js
 import React, { useLayoutEffect } from 'react'
 
 function useScrollToTop() {
     useLayoutEffect(() => {
        window.scrollTo( 0,0)
     }, [])
 }
 
 export default useScrollToTop
 ```
 **Hook** này được tạo ra bằng 2 nốt nhạc, và chỉ cần thêm một nốt nữa là sẽ sử dụng được, hihi.
 ```js
 import React from 'react'
import useScrollToTop from 'hooks/useScrollToTop'

function HomePage() {
    useScrollToTop() // done
    ...
}
 ```
 ### IV. Kết bài
 Trong quá trình làm dự án thì có khá nhiều trường hợp cần sử dụng **custom hook**, tuỳ vào yêu cầu bài toán, trên đây mình chỉ giới thiệu một số **hook** cơ bản có thể hay gặp hàng ngày, chỉ cần thấy logic giữa các **component** có sử dụng bất kì một **hook** nào đó (cả **hook** mặc định của **react** cũng như **hook** của các thư viện, **hook** do chính chúng ta tạo ra) là bạn có thể nghĩ tới việc viết một **custom hook** để có thể dùng lại, giúp hạn chế việc lặp **code**, Hi vọng bài viết này sẽ hữu ích.