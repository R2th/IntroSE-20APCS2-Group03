Bài viết được dịch từ nguồn: https://hackernoon.com/concurrent-react-using-suspense-and-usetransition-to-build-better-ux-cman2cdd

Nhóm nhà phát triển `React JS` đã công bố một số thay đổi thú vị vài tháng trước - React sẽ nhận được `Concurrent Mode`. Về cơ bản, điều này sẽ cho phép `React` thực hiện đồng thời nhiều giao diện người dùng. Tất nhiên, `JavaScript` là một luồng đơn và đồng thời thực sự là một `illusion`, nhưng các tính năng mới sẽ cho phép các ứng dụng web (và Ứng dụng gốc một khi các tính năng này dùng React Native) phản ứng nhanh và linh hoạt hơn so với hiện tại đỡ mất công hơn và mã tùy chỉnh từ nhà phát triển để thực hiện điều này.

`Concurrent Mode` hiện có sẵn trong bản dựng thử nghiệm của `React`, vì vậy hãy tìm hiểu và xem cách sử dụng API mới.

Trong bài viết này tôi sẽ chỉ cho bạn cách sử dụng `Suspense API` với `useTransition` `hook`. Một dạng `hook` khác, `useDeferredValue`, phục vụ một mục đích hơi khác, nhưng không kém phần quan trọng.

## But what about the existing Suspense feature?

Bạn sẽ nhận thấy rằng `API Suspense` đã có mặt trong `React` kể từ phiên bản `16.6`. Trên thực tế, đây là cùng một `API` đang được mở rộng để làm nhiều hơn trong bản dựng thử nghiệm `React`. Trong `React 16.6`, `Suspense` chỉ có thể được sử dụng cho một mục đích: chia tách `code` và tải các thành phần một cách `lazy loading` bằng cách sử dụng `React.lazy ()`.

## The New Way - Render as you fetch

Điều này đã được thảo luận rất nhiều thông qua các cuộc nói chuyện và blog và trong tài liệu chính thức, vì vậy tôi sẽ nói ngắn gọn - `Concurrent React` cho phép chúng tôi triển khai mẫu `render as you fetch`, mà `renders component` như dữ liệu cần thiết để điền chúng được tìm nạp đồng thời. `React renders` càng nhiều càng tốt mà không cần dữ liệu có sẵn và `renders component` yêu cầu dữ liệu được tìm nạp ngay khi dữ liệu có sẵn. Trong thời gian này, các thành phần này được cho là `suspended`.

## The Setup

Đối với điều này, tôi đang sử dụng `React app` cơ bản mà tôi đã định cấu hình thủ công với `Webpack` và `Babel`, với sự khác biệt duy nhất đang chạy:

```
npm i react@experimental react-dom@experimental --save
```

Để có được các phiên bản thử nghiệm thay vì cài đặt `release versions` của `react` và `react-dom`.

## Opting in to Concurrent Mode

Vì `Concurrent Mode` thay đổi cách `React` xử lý các thành phần một cách cơ bản, bạn sẽ cần thay đổi dòng `ReactDOM.render()` trong `index.js` của bạn thành:

```
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

Điều này cho phép chế độ đồng thời trong ứng dụng của bạn.

Tôi cũng đã thiết lập `App.js` để hiển thị một thành phần có tên là `Data`.

```
import React from 'react';
import Data from './Data';

const App = () => {
    return (
        <div>
            <p>React Concurrent Mode testing</p>
            <Data />
        </div>
    );
}

export default App;
```

## The Demo

Bây giờ tạo `Data.js`

```
import React, { useState, useTransition, Suspense } from 'react';
import DataDisplay from './DataDisplay';
import { dataFetcher } from './api';

const initialData = { read: () => { return { foo: "initial" } } };

const Data = () => {
    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(0);
    const [startDataTransition, isDataPending] = useTransition({ timeoutMs: 2000 });

    const fetchNewData = () => {
        startDataTransition(() => {
            setData(dataFetcher())
        })
    }

    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <DataDisplay data={data} />
                <button disabled={isDataPending} onClick={() => fetchNewData()}>Click me to begin data fetch</button>
            </Suspense>
            <p>Counter: {count}</p>
            <button onClick={() => { setCount(count + 1); }}> Click me to check if the app is still responsive</button>
        </div>

    )
}

export default Data;
```

`dataFetcher` là một hàm trả về `object` đặc biệt cho phép `React` biết `states` vì `object` này có thể được `fetched` khi `components` phụ thuộc vào `state` này `rendered`. Các `components` này `suspends` nếu dữ liệu chưa được tìm nạp xong. Chúng ta sẽ xem xét cách tạo `object` đặc biệt.

`initData` hiển thị định dạng của `object` được dataFetcher trả về khi dữ liệu đã tải xong. Nó có chức năng đọc trả về đối tượng với dữ liệu chúng ta cần. Lý tưởng nhất là `initData` nên triển khai một số loại chức năng lưu trữ cho dữ liệu được tải lần cuối, nhưng ở đây chúng tôi chỉ sử dụng `{foo: initial}`.

Một `state` mà trong khi `update/fetched` khiến một thành phần bị treo, phải được cập nhật bằng `hook useTransition`. `Hook` này trả về một cặp giá trị - một hàm có chức năng gọi lại trong đó bạn đặt trạng thái và `boolean` cho chúng tôi biết khi nào quá trình chuyển đổi đang diễn ra.

Đối số được truyền cho `useTransition` là một đối tượng cho `React` biết phải đợi bao lâu trước khi tạm dừng thành phần. Để hiểu nó, hãy nghĩ về nó theo cách này: Chúng tôi có một số dữ liệu trên màn hình và chúng tôi đang tìm nạp một số dữ liệu mới để thay thế nó. Chúng tôi muốn hiển thị `spinner` trong khi dữ liệu mới đang được tìm nạp, nhưng người dùng có thể thấy dữ liệu cũ trong một giây hoặc có thể là nửa giây trước khi `spinner`được hiển thị. Sự chậm trễ này được đề cập trong đối tượng này.

Điều này rất hữu ích trong các trường hợp khi hiển thị dữ liệu cũ cho đến khi dữ liệu mới được tải là mong muốn và cũng để ngăn `spinner` hiển thị trong một phần giây (gây ra lỗi như jitter) trong các hoạt động tìm nạp dữ liệu nhanh.

Chúng ta hãy xem xét kỹ hơn về `Suspense`:

```
<Suspense fallback={<p>Loading...</p>}>
    <DataDisplay data={data} />
    <button disabled={isDataPending} onClick={() => fetchNewData()}>Click me to begin data fetch</button>
</Suspense>
```

Bất kỳ thành phần nào sẽ bị treo đều được bọc bên trong `Suspense component`. Bên trong `fallback props`, chúng tôi chuyển `component` sẽ được hiển thị thay vào đó trong khi `component` bên trong đang chờ dữ liệu. Đây thường là một `spinner` hoặc `loading indicator` của một số loại để chỉ ra trực quan cho người dùng một cái gì đó đang xảy ra, vì vậy nó không xuất hiện như thể trang không phản hồi với nhấp chuột.

Ở đây tôi đã sử dụng `boolean isDataPending` để vô hiệu hóa nút trong khi dữ liệu đang được tìm nạp, ngăn người dùng nhấn nút nhiều lần và gửi nhiều yêu cầu.

Tất cả thành phần `JavaScript` trong trang tiếp tục hoạt động trong khi thành phần bị treo và dữ liệu đang được tìm nạp. Bộ đếm để tăng nó có thể được sử dụng để xác nhận điều này.

`DataDisplay` là một thành phần đơn giản lấy dữ liệu và gọi chức năng đọc của nó và hiển thị kết quả.

```
import React, { memo } from 'react';

const DataDisplay = ({ data }) => {
    return (
        <h3>{data.read().foo}</h3>
    )
}

export default memo(DataDisplay);
```

Cuối cùng, chúng tôi xem xét `DataFetcher` và những thứ khác bên trong `api.js`

```
export const dataFetcher = (params) => {
    return wrapPromise(fetchData(params))
}

const wrapPromise = (promise) => {
    let status = "pending";
    let result;
    let suspender = promise.then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

const fetchData = (params) => {
    // In a real situation, use params to fetch the data required.
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                foo: 'bar'
            })
        }, 3000);
    });
}
```

`wrapPromise` chịu trách nhiệm cho mọi thứ được tích hợp với `React` và nên đơn giản nếu bạn đã sử dụng `Promise` trước đó. Nó trả về kết quả nếu quá trình tìm nạp thành công, `raise` lỗi nếu có và ném `Promise` với trạng thái "đang chờ xử lý" nếu thao tác chưa hoàn thành.
    
Cảm ơn và hi vọng bài viết có ích trong công việc của bạn