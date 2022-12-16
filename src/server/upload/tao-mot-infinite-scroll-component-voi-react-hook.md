Chắc hẳn những bạn đã từng sử dụng Facebook, Instagram hay Reddit trước đây đều biết đến tính năng cuộn (kéo)  nội dung vô cực.

Tiếp tục series React, chúng ta sẽ đi sâu hơn vào việc phát triển một ứng dụng React của bạn với việc làm như thế nào để xây dựng một ứng dụng **Infinite Scroll** sử dụng **React Hook**. (Nếu bạn chưa hiểu về `React Hook` hãy tìm hiểu [tại đây](https://vi.reactjs.org/docs/hooks-overview.html)). Thay vì người dùng liên tục phải nhấp vào `Next Page` thì nội dung mới sẽ tự động được tải liên tục khi người dùng đến cuối trang.

Có rất nhiều thư viện tích hợp sẵn ứng dụng này nhưng nếu bạn muốn thử thách bản thân cùng tôi tìm hiểu và thực hiện xây dựng nó từ đầu thì hãy theo dõi bài này nhé.

## Build InfiniteList
Đầu tiên, tạo nhanh một Component đơn giản. Chúng ta sẽ khởi tạo một state trống và tham chiếu đến `state` và `setState` như một InfiniteList Component như sau:
```JS
export default function App() {
  
  const [state, setState] = useState([]);
    return (
        <div className='App'>
          <InfiniteList 
            state={state}
            setState={setState}
          />
        </div>
      );
};
```
**InfiniteList** component này sẽ trả về một danh sách dữ liệu được cung cấp sẵn từ API.

Khi request API thành công, chúng ta sẽ đẩy dữ liệu về các **parent's state**. Chúng ta phải đảm bảo được rằng dữ liệu sẽ không ghi đè lên các dữ liệu đã lấy ra trước đó bằng cách sử dụng một hàm **`getData()`** để nạp dữ liệu tránh trùng lặp.

Trong ứng dựng này chúng ta sẽ sử dụng tạm API fetch data từ [DOG CEO](https://dog.ceo/): `https://dog.ceo/api/breeds/image/random/<records_number>`
Example:
```JS
function InfiniteList(props) {
    useEffect(() => {
        getData();
      }, []);
      
    const getData = () => {
        fetch('https://dog.ceo/api/breeds/image/random/15')
          .then(res => {
            return !res.ok 
            ? res.json().then(e => Promise.reject(e))
            : return res.json()
          }
          .then(res => props.setState([...props.state, ...res.message]))
          .catch(console.log);
    }
    
    return (
        <ul id='list'>
          { props.state.map((img, i) => (
              <li key={i} style={{backgroundImage: `url(${img})`}}/>)}
        </ul>
      );
```
Chúng ta sẽ cho hiển thị 15 hình ảnh đầu tiên. Sau đó cần một sự kiện để  luôn lắng nghe khi người dùng cuộn xuống cuối trang và thực hiện lấy thêm dữ liệu bằng các gọi lại hàm **`getData()`**.
## Xác định vị và bắt sự kiện Scroll
Chúng ta cùng phân tích việc bắt sự kiện này nhé. Tôi hy vọng phần dưới các bạn sẽ giúp bạn hiểu.
![](https://images.viblo.asia/b0557b45-1430-4aed-a7f5-04ce13dd479f.png)
1. `window.innerHeight` — cố định (static), chiều cao của cửa sổ trình duyệt
2. `window.scrollY` — di chuyển (dynamic), vị trí hiện tại của thanh scroll.
3. `list.clientHeight` — cố định (static), chiều cao của phần từ `<ul>  <ul/>`.
4. `list.offsetTop`  — cố định (static) khoảng cách từ đầu trang tới phần tử `<ul>`.

Nếu (1) + (2) === (3) + (4), chúng hiểu rằng người dùng đã cuộn đến cuối trang và cần nạp thêm dữ liệu.

Trong trường hợp phần tử `ul` được fix cứng chiều cao. Chúng ta cần lấy các thuộc tính của phần từ này.
1. `element.scrollHeight` — tổng chiều cao có thể cuộn trang.
2. `element.scrollTop` — vị trí hiện tại của thanh scroll.
3. `element.clientHeight` — chiều cao hiện tại của phần từ (đã bao gồm overflow).

Vậy thì khi (1) === (2) + (3) người dùng sẽ chạm đến cuối trang. 

Chúng ta sẽ bắt những trường hợp này lại với nhau bằng việc sử dụng `userEffect` trong Hook. Để liên tục lắng nghe sự kiện cuộn từ trình duyệt chúng ta sẽ sự kiện `addEventListener`. Nhưng để tránh các lỗi tiềm ẩn, chúng ta cần remove đối tượng này khỏi `useEffect` khi việc thực thi component này kết thúc như sau:
```JS
useEffect(() => {
  widnow.addEventListener('event', function);
    return () => {
        window.removeEventListener('event', function);
    }
}, [])
```
## Xây dựng ứng dụng đơn giản
Trước đó, chúng ta đã cùng nhau phân tích cách xác định vị trí và bắt sự kiện scroll như thế nào. Dưới đây sẽ là đoạn code nhỏ mô tả lại toàn bộ ứng dụng như sau:
###
##### `App.js`
```JS
import React, { useState } from 'react';
import InfiniteList from './InfiniteList';

export default function App() {
  
  const [state, setState] = useState([]);

  return (
    <div className='App'>
      <InfiniteList state={state} setState={setState}/>
    </div>
  );
};
```
###
##### `InfiniteList.js`
```JS
import React, { useState, useEffect } from 'react';

export default function InfiniteList(props) {

  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementById('list')
    if(props.scrollable) {   
      // list has fixed height
      list.addEventListener('scroll', (e) => {
        const el = e.target;
        if(el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });  
    } else {  
      // list has auto height  
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const list = document.getElementById('list');

    if(list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);


  const getData = (load) => {
    if (load) {
      fetch('https://dog.ceo/api/breeds/image/random/15')
        .then(res => {
          return !res.ok 
          ? res.json().then(e => Promise.reject(e)) 
          : res.json();
        })
        .then(res => {
          props.setState([...props.state, ...res.message]);
        });
    }
  };

  return (
    <ul id='list'>
      { props.state.map((img, i) => <li style={{backgroundImage: `url(${img})`}} key={i}/>) }
    </ul>
  );
};
```
Chúng ta có thể demo tại đây. **[DEMO](https://infinite-scroll.olegakan5326.now.sh)**

**Như vậy,** một ứng dụng cơ bản về Infinite Scroll sử dụng React Hooks đã được xây dựng. Tuy nhiên còn hơi cơ bản và sơ sài, hy vọng sau bài viết này sẽ có nhiều đóng góp để có thể hoàn thiện hơn cho các bài viết về sau.

Cảm ơn các bạn đã đọc bài viết này.