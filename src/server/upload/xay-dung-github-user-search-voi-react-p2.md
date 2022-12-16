## 1. Mở đầu 
<hr>

Ở bài trước chúng ta đã cùng nhau mô tả qua về nội dung project cũng như liệt kê ra những gì mà chúng ta cần làm. Trong bài hôm này chúng ta sẽ tiếp tục với chức năng hiển thị kết quả mà chúng ta tìm kiếm được. Nếu bạn còn chưa đọc bài trước đó thì bạn có thể đọc tại [đây](https://viblo.asia/p/xay-dung-github-user-search-voi-react-p1-4P856LgGZY3), còn nếu bạn đã đọc rồi thì chúng ta cùng bắt tay vào code nào.

## 2. Chức năng hiển thị kết quả tìm kiếm
<hr>

Ở bài trước ta đã có thể nhập nội dung vào ô tìm kiếm sau đó bấm enter hoặc nút tìm kiếm thì sẽ lấy được danh sách người dùng tương ứng với từ khóa mà chúng ta nhập vào ở ô input. Sau khi lấy được kết quả này từ API của GitHub thì chúng ta đã tiến hành `console.log` nó ra, cụ thể phần code đó như sau:

```js
import { message } from 'antd';

import axios from 'utils/axios';

const useFetchDataHook = (keyword) => {

    async function handleSearch() {
        if (keyword.trim() === '') {
            message.warning('Please enter some keyword to search.', 10);
            return false;
        }
        const { data } = await axios.get(`/search/users?q=${keyword}`);
        console.log(data)
    }

    return [
        handleSearch,
    ];
}

export default useFetchDataHook;
```

Bây giờ để có thể hiển thị được kết quả đó thì ta sẽ cần lưu nó lại vào trong state của React bằng việc sử dụng `useState` như sau:

```js
import { useState } from 'react';
import { message } from 'antd';

import axios from 'utils/axios';

const useFetchDataHook = (keyword) => {

    const [data, setData] = useState([]);

    async function handleSearch() {
        if (keyword.trim() === '') {
            message.warning('Please enter some keyword to search.', 10);
            return false;
        }
        const { data } = await axios.get(`/search/users?q=${keyword}`);
        setData(data.items);
    }

    return [
        handleSearch,
        data
    ];
}

export default useFetchDataHook;
```

Ở đây key `item` trong kết quả mà chúng ta thu được chính là chưa danh sách người dùng tương ứng với  từ khóa mà ta nhập:

![](https://images.viblo.asia/cd80a387-7ec1-400d-b28c-d4bf8436a76d.png)

Sau khi đã lưu được lại danh sách này vào biến `data` thu được từ `useState` rồi thì ta cũng return nó lại cho component `HomePage` của chúng ta sử dụng. Bên component `HomePage` ta chỉ cần sử lại như sau:

```js
const [handleSearch, data] = useFetchDataHook(keyword);
```

Là ta đã có t hể dùng danh sách này phục vụ cho việc hiển thị kết quả. Tuy nhiên ở đây mỗi khi chúng ta cập nhật giao diện hay sửa code sẽ dẫn đến việc React sẽ tự động load lại trang cho chúng ta và việc này có thể dẫn tới chúng ta phải gọi API GitHub quá nhiều và bị band tạm thời thì tạm thời chúng ta sẽ lưu cả kết quả tìm kiếm từ GitHub vào `localStorage` như sau:

```js
async function handleSearch() {
    if (keyword.trim() === '') {
        message.warning('Please enter some keyword to search.', 10);
        return false;
    }
    const { data } = await axios.get(`/search/users?q=${keyword}`);
    setData(data.items);
    localStorage.setItem('users', JSON.stringify(data.items));
}
```

Bạn thử search lại một từ khóa bất kì và phần code chúng ta mới cập nhật sẽ lưu lại kết quả tạm thời vào `localStorage`. Tiếp đếm `useState` ở ngay phía trên ta cũng sửa lại giá trị mắc định thành như sau:

```js
const [data, setData] = useState(JSON.parse(localStorage.getItem('users')));
```

Sau đấy bạn chuyển lại qua component `HomePage` và thêm biến `data` mà chúng ta return từ cái hook vào danh sách dữ liệu chúng ta muốn lấy như sau:

```js
const [handleSearch, data] = useFetchDataHook(keyword);
```

Để kiểm tra xem chúng ta đã lấy được dữ liệu chưa và biến `data` đã có sẵn dữ liệu trong `localStorage` chưa thì chúng ta có thể sử dụng `React-dev-tool` để xem nội dung component `HomePage`. Nếu bạn có kết quả như dưới đây thì chúng ta đã sẵn sàng để tiếp tục:

![](https://images.viblo.asia/8053c3bd-2522-460c-b269-d01308440e22.png)

Bây giờ ta có thể sử dụng biến `data` đó để hiển thị giao diện kết quả. Ở đây tùy con mắt thẩm mỹ của từng người mà bạn có thể style cho giao diện của bạn khác nhau, cá nhận mình thì mình sẽ có đoạn code hiển  thị và kết quả như sau:

```html
return (
        <div className="container mx-auto pt-8 w-100 h-100 flex flex-col items-center">
            <div className="px-4 py-8 shadow-lg rounded flex items-center bg-white" style={{ width: 600 }}>
                <Input.Search
                    value={keyword}
                    onChange={handleInputChange}
                    onSearch={handleSearch}
                    placeholder="Search by username"
                    enterButton />
            </div>
            <div className="mt-4 px-4 py-8 shadow-lg rounded overflow-y-auto scroll bg-white"
                style={{ width: 600, height: 'calc(100vh - 170px)' }}
            >
                {
                    data.map((user, index) => (
                        <div key={user.id} className="flex items-center mb-6 pb-6 justify-between"
                            style={{ borderBottom: '1px solid #ccc' }}
                        >
                            <div className="flex items-center">
                                <p className="mr-8 mb-0">#{index + 1}</p>
                                <Avatar src={user.avatar_url} size={48} />
                                <div className="ml-4">
                                    <p className="font-bold text-base mb-0">
                                        {user.login}
                                    </p>
                                    <a href={user.html_url} target="__blank" className="text-sm underline">
                                        Github Link
                                        </a>
                                </div>
                            </div>
                            <Button type="primary">
                                <Link to={`/detail/${user.login}`}>
                                    Detail
                                    </Link>
                            </Button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
```

![](https://images.viblo.asia/4fbb660f-333e-4ac3-a6ff-c1e9b1aed899.png)

Vậy là dến đây ta đã có thể hiển thị ra được kết quả mà chúng ta đã thực hiện tìm kiếm. Tuy nhiên nếu dừng lại ở đây và coi như xong một tính năng thì với mình nó mới được 50% vì còn rất nhiều các trường hợp khác mà chúng ta chưa hề xử lý. Bây giờ, bạn có thể thử nhập nội dung khác bất kì và bấm tìm kiếm sẽ thu được kết quả có dạng như sau:

![](https://images.viblo.asia/38998254-9a45-4baa-a45d-61c21d0de25d.gif)

Như bạn có thể thấy khi nhập vào từ khóa mới và bấm tìm kiếm thì tùy vào tốc độ mạng sẽ có một khoảng thời giản delay để ta thực hiện việc gọi API để lấy kết quả về và hiển thị ra. Trên ứng dụng thực tế thì nếu ta để nguyên như trên thì có thể gây ra trải nghiệm xấu cho người dùng vì do khi người dùng ấn nút tìm kiếm không hề có dấu hiệu hay thông báo gì về việc tính năng này có đang chạy hay đã bị lỗi. Đồng thời việc đột ngột thay đổi giao diện như trên cũng không mang lại trải nghiệm  tốt cho lắm. Chính vì t hế để cải thiện điều này chúng ta sẽ tiến hành nâng cấp lại kết quả hiển thị của chúng ta như sau:

```js
const STATUS = {
    LOADING: 'loading',
    LOAD_SUCCESS: 'success',
    LOAD_ERROR: 'error',
}

const TYPE = {
    LOAD: 'LOAD',
    LOAD_SUCCESS: 'LOAD_SUCCESS',
    LOAD_ERROR: 'LOAD_ERROR',
}

const reducer = (state, action) => {
    switch (action.type) {
        case TYPE.LOAD:
            return {
                ...state,
                status: STATUS.LOADING
            };
        case TYPE.LOAD_SUCCESS:
            return {
                ...state,
                status: STATUS.LOAD_SUCCESS,
                data: action.payload.data,
                total: action.payload.total,
            }
        case TYPE.LOAD_ERROR:
            return {
                ...state,
                status: STATUS.LOAD_ERROR,
            }
        default:
            return state;
    }
}

const useFetchDataHook = (keyword) => {
    ...
}
```

Như các bạn có thể thấy thì mình đã tạo ra biến `STATUS` dùng để biển thị cho các trạng thái chúng ta có t hể gặp phải khi gọi API như: 
- `LOADING`: BIểu hiện cho việc chúng ta trong quá trình gọi API
- `LOAD_SUCCESS`: Dành cho trường hợp chúng ta đã gọi API thành công và đã có kết quả để sẵn sàng hiển thij
- `LOAD_ERROR`: Dành cho trường hợp vì 1 lý do bất kì nào đó mà quá trình goi API của chúng ta xảy ra lỗi

Tiếp đến ta cũng tạo ra biến `TYPE` tương ứng với các `STATUS` nói trên và một cái hàm `reducer` để sử dụng. Cái `reducer` này có mục đích là ứng với mỗi `TYPE` mà chúng ta truyền vào thì nó sẽ thực hiện trả về cho chúng ta một object mới tương ứng với `TYPE` đó. Tiếp đến trong hook của chúng ta sẽ thay thế phần `useState` bằng `useReducer` (trong trường hợp bạn chưa biết `useReducer` là gì thì bạn có thể đọc tại [đây](https://viblo.asia/p/tim-hieu-ve-hooks-trong-react-Ljy5VzGG5ra#_b-usereducer-3)) như sau:

```js
const useFetchDataHook = (keyword) => {

    const [state, dispatch] = useReducer(reducer, {
        status: STATUS.LOAD_SUCCESS,
        data: JSON.parse(localStorage.getItem('users')),
        total: 0
    });

    async function handleSearch() {
        if (keyword.trim() === '') {
            message.warning('Please enter some keyword to search.', 10);
            return false;
        }
        const { data } = await axios.get(`/search/users?q=${keyword}`);
        setData(data.items);
        localStorage.setItem('users', JSON.stringify(data.items));
    }

    return [
        handleSearch,
        data
    ];
}    
```

Ở đây state mẫu của chúng ta sẽ được thay đổi từ dạng ban đầu là một array đơn giản trong `useState` thì bây giờ nó sẽ là một object với nội dung như sau:
- `status`: Dùng để hiện thị trạng thái hiện tại của ứng dujng
- `data`: Dùng để chứ kết quả ta thu được từ API tìm kiếm (ở đây ta vẫn khởi tạo mặc định bằng dữ liệu từ `localStorage`)
- `total`: Dùng để chứa tổng số kết quả mà ta tìm kiếm được (lấy từ dữ liệu thu được từ API)

Tất nhiên với việc thay thế `useReducer` thì ta cũng cần cập nhật lại hàm `handleSearch` thành như sau:

```js
async function handleSearch() {
    try {
        if (keyword.trim() === '') {
            message.warning('Please enter some keyword to search.', 10);
            return false;
        }
        dispatch({ type: TYPE.LOAD });
        const { data } = await axios.get(`/search/users?q=${keyword}`);
        dispatch({
            type: TYPE.LOAD_SUCCESS,
            payload: {
                data: data.items,
                total: data.total_count
            }
        });
    } catch (error) {
        console.log(error);
        dispatch({ type: TYPE.LOAD_ERROR });
    }
}
```
Logic ở phần này sẽ là sau khi chúng ta đã nhập từ khóa tìm kiếm (đã chạy qua phần `if`) thì:
- Ta sẽ dispatch 1 sự kiện tên là `LOAD` dùng để cập nhật lại `status` trong `state` của chúng ta về `LOADING`
- Tiếp đến ta sẽ gọi API lấy kết quả và nếu thành công ta sẽ dispatch 1 sự kiện tên là `LOAD_SUCCESS` để cập nhật lại toàn bộ `state` của chúng ta với dữ liệu từ `API`.
- Trong trường hợp việc gọi API xảy ra exception thì ta sẽ dispatch 1 sự kiện là `LOAD_ERROR` để cập nhật lại trạng thái của `state` về `LOAD_ERROR`

Bạn có thể quan sát kỹ lại từng `TYPE` mà chúng ta dispatch với nội dung hàm `reducer` mà ta tạo ở trên để hiểu rõ hơn. Lúc này phần kết quả trả về tất nhiên chúng ta cũng cần thay thế thành như sau:

```js
return [
    handleSearch,
    state
];
```

Bây giờ ở bên component `HomePage` ta sẽ sửa lại 1 chút như sau để có thể hiển thị lại kết quả cũ:

```js
const [handleSearch, state] = useFetchDataHook(keyword);
```

và phần hiển thị

```html
state.data.map((user, index) => (
    <div key={user.id} className="flex items-center mb-6 pb-6 justify-between"
        style={{ borderBottom: '1px solid #ccc' }}
    >
        <div className="flex items-center">
            <p className="mr-8 mb-0">#{index + 1}</p>
            <Avatar src={user.avatar_url} size={48} />
            <div className="ml-4">
                <p className="font-bold text-base mb-0">
                    {user.login}
                </p>
                <a href={user.html_url} target="__blank" className="text-sm underline">
                    Github Link
                    </a>
            </div>
        </div>
        <Button type="primary">
            <Link to={`/detail/${user.login}`}>
                Detail
                </Link>
        </Button>
    </div>
))
```

Như vậy là ta lại nhận được kết quả ban đầu, tuy nhiên nếu bạn bật lại `React-dev-tool` lên và xem ở component `HomePage` sẽ thấy như sau:

![](https://images.viblo.asia/b384a7fb-5bcf-4055-bf42-f2e957961f39.gif)

Nếu bạn để ý kỹ thì khi mình nhập nội dung và bấm tìm kiếm thì `status` trong `reudcer` bên tay phải của chúng ta sẽ thay đổi trạng thái lần lượt từ `success -> loading -> success` và cả dữ liệu của chúng ta nữa. Bây giờ dựa vào cái `status` này mà ta có thể chọn hiển thị sao cho phù hợp với mỗi trạng thái. Ta sẽ cập nhật lại code như sau:

```html
<Spin size="large" tip="Loading" spinning={state.status === 'loading'} delay="200">
    <div className="mt-4 px-4 py-8 shadow-lg rounded overflow-y-auto scroll bg-white"
        style={{ width: 600, height: 'calc(100vh - 170px)' }}
    >
        {
            state.data.map((user, index) => (
                <div key={user.id} className="flex items-center mb-6 pb-6 justify-between"
                    style={{ borderBottom: '1px solid #ccc' }}
                >
                    <div className="flex items-center">
                        <p className="mr-8 mb-0">#{index + 1}</p>
                        <Avatar src={user.avatar_url} size={48} />
                        <div className="ml-4">
                            <p className="font-bold text-base mb-0">
                                {user.login}
                            </p>
                            <a href={user.html_url} target="__blank" className="text-sm underline">
                                Github Link
                                </a>
                        </div>
                    </div>
                    <Button type="primary">
                        <Link to={`/detail/${user.login}`}>
                            Detail
                            </Link>
                    </Button>
                </div>
            ))
        }
    </div>
</Spin>
```

Như mình đã nói ở trên thì tùy thuộc mắt thẩm mỹ mà các bạn có thể chọn hiển thị khác nhau nhưng ở đây mình sẽ dùng sẵn component `Spin` của `antd` luôn và bọc nó bên ngoài phần nội dung ban đầu của chúng ta. Và đây là kết quả chúng ta thu được:

![](https://images.viblo.asia/70c2d6a2-fb9a-4994-bb56-70e2b0b69e3a.gif)

Vậy là giờ đây ứng dụng của chúng ta đã mang lại trải nghiệm tốt hơn một chút đối với mỗi lần người dùng thực hiện thao tác tìm kiếm rồi :D. Tuy nhiên thì ta vẫn còn 2 trường hợp nữa phải quan tâm đó là nếu tìm kiếm bị lỗi hoặc không thu về được kết quả nào. Ta sẽ tiếp tục cập nhật code như sau:

```js
function render() {
    if (state.status === 'error') {
        return <Result status="500" title="500" subTitle="Sorry, something went wrong." />
    }
    if (state.status === 'success') {
        if (state.data.length === 0) {
            return <Result title="No user found" />
        } else {
            return state.data.map((user, index) => (
                <div key={user.id} className="flex items-center mb-6 pb-6 justify-between" style={{ borderBottom: '1px solid #ccc' }}>
                    <div className="flex items-center">
                        <p className="mr-8 mb-0">#{index + 1}</p>
                        <Avatar src={user.avatar_url} size={48} />
                        <div className="ml-4">
                            <p className="font-bold text-base mb-0">
                                {user.login}
                            </p>
                            <a href={user.html_url} target="__blank" className="text-sm underline">
                                Github Link
                            </a>
                        </div>
                    </div>
                    <Button type="primary">
                        <Link to={`/detail/${user.login}`}>
                            Detail
                        </Link>
                    </Button>
                </div>
            ));
        }
    }
}
```

Ta sẽ tạo ra một function có tên là `render` và ở đây ta sẽ thêm các trường hợp `if-else` tương ứng khi gọi API bị lỗi và dữ liệu trả về là mảng rỗng như trong code bạn thấy. Cuối cùng trong trường hợp gọi API thành công và có dữ liệu trả về thì ta sẽ chạy hàm `map` để render như bình thường. Cuối cùng ở hàm `return()` ta sẽ gọi lại hàm `render()` như sau:

```html
<Spin size="large" tip="Loading" spinning={state.status === 'loading'} delay="200">
    <div className="mt-4 px-4 py-8 shadow-lg rounded overflow-y-auto scroll bg-white"
        style={{ width: 600, height: 'calc(100vh - 170px)' }}
    >
        {render()}
    </div>
</Spin>
```

Và cuối cùng trong 2 trường hợp là gọi API bị lỗi hay không có kết quả trả về ta sẽ lần lượt thu được 2 giao diện như sau:

![](https://images.viblo.asia/bcad156f-fb8d-419c-acbc-cb7df39208aa.png)

![](https://images.viblo.asia/e15c6588-85bd-49be-af85-96e56f50a9c9.png)

Vậy là đến đây thì mọi thứ đã ngon lành hơn trước đó rất nhiều. Trên thực tế khi bạn làm việc với React hay bất cứ framework hay thư viện front-end nào khác thì bạn cũng nên chú ý cho việc hiển thị được hết các kết quả phù hợp với dữ liệu mà bạn thu được chứ đừng chỉ chăm chú vào việc hiển thị ra mỗi kết quả đúng mà quên đi các trường hợp không có kết quả, loading hay lỗi.

## 3. Kết bài
<hr>

Bài viết của mình xin được kết thúc tại đây. Nếu các bạn có bất cứ thắc mắc gì có thể comment ngay bên dưới để mình giải đáp. Cuối cùng nếu các bạn thấy bài viết hay thì hãy để lại một **Up vote** và cũng đừng quên **Chia sẻ** với mọi người để ủng hộ mình nhé :D