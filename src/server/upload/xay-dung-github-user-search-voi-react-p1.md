## 1. Mở đầu
<hr>

Trong các bài viết trước liên quan đến ReactJS mình đã chia sẻ với các bạn rất nhiều các kiến thức cơ bản cũng như một số tips khi làm việc với React. Tuy nhiên để nâng cao kỹ năng khi làm việc với React cũng như hiểu hơn về những gì mà bạn đã học thì cách tốt nhất chúng ta có thể làm là thực hành. Chính vì thế trong bài viết ngày hôm nay chúng ta sẽ cùng nhau đi xây dựng một project siêu nho vận dụng một số kiến thức mà chúng ta đã học trước đây. Bài viết yêu cầu bạn có các kiến thức cơ bản liên quan đến React và biết được về các hook cơ bản trong React. Trong trường hợp bạn chưa biết gì về React thì bạn hãy đi tìm hiểu về nó trước khi đọc bài này, còn nếu bạn đã biết cơ bản về React nhưng chưa biết gì về Hook thì các bạn có thể đọc lại một số bài viết của mình dưới đây:
- https://viblo.asia/p/tim-hieu-ve-hooks-trong-react-Ljy5VzGG5ra
- https://viblo.asia/p/tim-hieu-ve-hooks-trong-react-p2-GrLZDkyEKk0
- https://viblo.asia/p/tim-hieu-ve-hooks-trong-react-p3-m68Z07g2KkG

## 2. Github user search
<hr>

### a. Mô tả

Trước khi bắt tay vào làm thì trước hết chúng ta sẽ cùng đi qua về mô tả project của chúng ta. Project của chúng ta sẽ chỉ gồm 2 page như sau:

![](https://images.viblo.asia/4cbe8c1c-1119-4cae-ba7f-ebbccbe0c05f.png)

Trang đầu tiên sẽ cho phép bạn nhậm tên bất kì mà bạn mong muốn sau sau đó sẽ tiến hành tìm kiếm username mà bạn nhập trên github và hiển thị ra như trong hình. Sau đó nếu bạn bấm vào nút `Detail` thì chúng ta sẽ di chuyển sang trang thứ hai có nội dung như sau:

![](https://images.viblo.asia/795730d0-7f0f-4967-967d-73d40b2afd3d.png)

Nó sẽ bao gồm thông tin cơ bản về user mà tìm thấy như tên hiển thị, ngày tạo tài khoản và vị trị địa lý (nếu có) và danh sách các public repo của người dùng đó như bạn thấy trong hình. 

- Link demo sản phẩm cuối cho các bạn: https://dqhuy78.github.io/github-search/#/

### b. Cài đặt

Để bắt đầu project này thì mình đã dựng sẵn một cái base project bào gồm `create-react-app` và một số package khác cài sẵn cho các bạn. Các bạn có thể clone về từ repo [này](https://github.com/dqhuy78/github-search). 

Mô tả qua về những gì đã có trong repo của chúng ta ngoài những gì `create-react-app` đã cài đặt sẵn:

- `Ant Design`: Thư viện UI mà chúng ta sẽ sử dụng 1 vài component nhưng mình vẫn cài vì mình không muốn chúng ta phải code lại từng component.
- `TailwindCSS`: Một CSS utility framework sẽ hỗ trợ chúng ta trong việc style như nào để ra được kết quả mà bạn thấy như trên mà  hầu như không phải code CSS nữa.
- `axios`: Dùng để gọi API lấy dữ liệu từ Github về cho chúng ta sử dụng
- `react-router-dom`: Dùng cho mục đích chuyển page

Sau khi clone repo nói trên về thì các bạn tiến hành cài đặt các package cân thiết bằng cách chạy lệnh:
```bash
yarn install
```
Tiếp đó chúng ta bắt đầu chạy project lên bằng lệnh:
```bash
yarn start
```
Và đây là kết quả mà chúng ta thu được:

![](https://images.viblo.asia/c091c28d-faea-4507-8dbc-8648c5cdf8aa.png)

Ngoài việc cài đặt project nói trên thì các bạn cũng sẽ cần tham khảo một số API mà Github cung cấp cho chúng ta gồm:

- API tìm kiếm user: https://developer.github.com/v3/search/#search-users
- API lấy thông tin user: https://developer.github.com/v3/users/#get-a-single-user
- API lấy danh sách repo user: https://developer.github.com/v3/repos/#list-repositories-for-a-user

### c. Phân tích project

Trước khi bắt tay vào việc coding thì chúng ta sẽ cần phải phân tích qua về những tính năng chúng ta cần có trong project này

**Tìm kiếm user:** Để thực hiện tính năng này chúng ta sẽ cần làm 2 việc đó là:
- Giao diện bao gồm 1 ô input cho phép chúng ta tìm kiếm user và một button để tiến hành việc tìm kiếm
- Một function để tiến hành việc tìm kiếm user qua Github API

**Hiển thị kết quả tìm kiếm:** Để thực hiện tính năng này ta cũng sẽ cần làm 2 công việc sau:
- Giao diện hiển thị danh sách user mà chúng ta tìm thấy
- Button cho phép chúng ta ta lấy thêm kết quả nếu có nhiều user được tìm thấy
- Một function để gọi API lấy thêm danh sách user

**Hiển thị thông tin user:** tính năng này sẽ bao gồm các việc sau:
- Giao diện hiển thị thông tin cá nhân của user
- Một function để gọi API lấy thông tin user
- Giao diện hiển thị danh sách repository của user
- Một function để gọi API lấy danh sách public repository của user
- Button cho phép chúng ta lấy thêm kết quả nếu user có nhiều repo
- Một function cho phép lấy thêm danh sách public repository

## 3. Chức năng tìm kiếm user
<hr>

Như mình đã đề cập ở trên, chức năng này của chúng ta sẽ có nội dung như sau:
- Giao diện bao gồm 1 ô input cho phép chúng ta tìm kiếm user và một button để tiến hành việc tìm kiếm
- Một function để tiến hành việc tìm kiếm user qua Github API

Đầu tiên chúng ta sẽ thêm mới một ô input và một button dùng để nhập nội dung tìm kiếm của chúng ta. Vì ở đây chúng ta đã cài sẵn `Ant Design` rồi nên chúng ta chỉ cần đơn giản import vào một componnet  input để phục vụ cho việc nhập nội dung tìm kiếm và một button để xác nhận việc tìm kiếm. May thay, `Atnd` đã cung cấp cho chúng ta sẵn một component có cả 2 phần này rồi nên bạn chỉ cần dùng thôi, chi tiết bạn có thể xem ở [đây](https://ant.design/components/input/#components-input-demo-search-input). Bạn có thể mở file `src/pages/HomePage.js` lên và sửa lại nội dung như sau:
```js
import React from 'react';
import { Input } from 'antd';

const HomePage = () => {

    return (
        <Input.Search placeholder="Search by username" enterButton />
    );
}

export default HomePage
```
Mở trình duyệt lên bạn sẽ thấy chúng ta đã có ngay một ô input đẹp đẽ cùng với một button cho việc tìm kiếm luôn rồi mà không cần phải làm gì nhiều:

![](https://images.viblo.asia/0784f92b-a3b6-41c6-a38b-301bc15d032e.png)

Tiếp theo để có thể gọi API để tìm kiếm user thì chúng ta sẽ cần lấy được nội dung mà mình nhập trong ô input nói trên và có rất nhiều cách để làm điều đó nhưng trong bài này mình sẽ chỉ sử dụng `Hook` của React nên dĩ nhiên chúng ta sẽ dùng tới `useState`:

```js
import React, { useState } from 'react';
import { Input } from 'antd';

const HomePage = () => {
    const [keyword, setKeyword] = useState('');

    return (
        <Input.Search
            value={keyword}
            placeholder="Search by username"
            enterButton />
    );
}

export default HomePage
```
Như bạn thấy ở đây ta sử dụng `useState` để tạo ra một biến dùng để lưu giá trị cho ô input của chúng ta và gán giá trị đó và thuộc tính value của component `Input.Search`. Tuy nhiên nếu bạn thử nhập giá trị vào ô input đó ngay bây giờ thì bạn sẽ thấy không nhập được gì cả. Điều này xảy ra vì chúng ta vừa chuyển một `Uncontrolled Component` về `Controlled Component` chi tiết hơn về phần này bạn có  thể đọc ở [đây](https://reactjs.org/docs/forms.html#controlled-components). Vì vậy để có thể nhập được nội dung như ban đầu thì ta sẽ cần bổ sung thêm một function dùng để thay đổi state `keyword` mà chúng ta tạo ra như sau:
```js
const HomePage = () => {
    const [keyword, setKeyword] = useState('');
    
    function handleInputChange(e) {
        setKeyword(e.target.value)
    }

    return (
        <Input.Search
            value={keyword}
            onChange={handleInputChange}
            placeholder="Search by username"
            enterButton />
    );
}
```
Bây giờ thì ta có thể nhập input như bình thường rồi. Tiếp theo là đến phần gọi API của Github để tìm kiếm user. Đầu tiên ta sẽ mở API mà Github cung cấp lên xem sử dụng chúng như thế nào. Bạn có thể truy cập vào [đây](https://developer.github.com/v3/search/#search-users):

![](https://images.viblo.asia/207c473d-55e2-42a4-bb60-e0fafa90a5a1.png)

Theo như tài liệu của Github cung cấp thì ta cần sẽ cần 2 thư sau:
- API dùng để tìm kiếm sẽ có dạng `GET https://api.github.com/search/users`
- Tham số truyền vào dưới dạng query params: `?q={keyword}`

Khi đã lấy được cái chúng ta cần thì bây giờ ta sẽ tạo một function cho việc tìm kiếm có dạng như sau:
```js
import axios from 'utils/axios';

const HomePage = () => {
    const [keyword, setKeyword] = useState('');

    function handleInputChange(e) {
        setKeyword(e.target.value)
    }

    async function handleSearch() {
        const { data } = await axios.get(`/search/users?q=${keyword}`);
        console.log(data);
    }

    return (
        <Input.Search
            value={keyword}
            onChange={handleInputChange}
            onSearch={handleSearch}
            placeholder="Search by username"
            enterButton />
    );
}
```
Ở đây vì chúng ta sử dụng `Input.Search` component của `Antd` nên component này sẽ cung cấp cho chúng ta một thuộc tính là `onSearch` để có thể gọi đến function mà chúng ta mong muốn khi chúng ta bấm vào button có icon `search` và đồng thời ở đây ta cũng dùng đến thuộc tính khác là `enterButton` cũng cho phép chúng ta gọi đến function mà ta gán ở `onSearch` mỗi khi chúng ta bấm vào phím enter trên bàn phím. Vì chúng ta chưa có chỗ nào để hiển thị kết quả tìm kiếm cả nên ở đây ta sẽ `console.log` kết quả đó ra. Bạn bật `Chrome Devtool` (F12) lên và chọn vào tab `Console`, sau đó bạn gõ thử nội dung bất kì vào ô input và bấm enter sẽ thu được kết quả như sau:

![](https://images.viblo.asia/d9d52ebc-cb67-4279-b174-10515307e202.png)

Đến bước này là chúng ta đã tạm "chạy" được chúng năng tìm kiếm mà chúng ta đặt ra ban đầu. Tuy nhiên mình muốn tiến hành "nâng cấp" thêm một chút nữa cho chức năng của chúng ta. Nếu bạn đã đọc một số bài viết trước của mình thì mình từng nhắc đến việc sử dụng `custom hook` trong React để chia các feature thành các module nhỏ hơn thay vì code hết trong 1 file. Còn nếu bạn chưa đọc thì có thể xem lại tại [đây](https://viblo.asia/p/tim-hieu-ve-hooks-trong-react-p3-m68Z07g2KkG#_f-custom-hook-2). Chính vì thế với chức năng tìm kiếm này ta sẽ tách ra thành một custom hook riêng. Đầu tiên bạn tạo thêm một file có tên bất kì theo ý bạn nhưng nên bắt đầu bằng từ khóa `use`. Mình sẽ đặt tên nó là `useFetchDataHook.js`, cấu trúc thư mục của chúng ta lúc này sẽ như này:

![](https://images.viblo.asia/71dbb8fe-05f3-4269-86e4-45dd169e98b7.png)

Tiếp đến ta sẽ tiến hành copy hàm `handleSearch` và các nội dung import cần thiết khác từ bên file `index.js` sang file mới này như sau:
```js
import axios from 'utils/axios';

const useFetchDataHook = () => {

    async function handleSearch() {
        const { data } = await axios.get(`/search/users?q=${keyword}`);
        console.log(data);
    }

    return [
        handleSearch
    ];
}

export default useFetchDataHook;
```
Tiếp đến ta sẽ import hook của chúng ta ngược lại vào file `index.js` đồng thời xóa hàm cũ và các nội dung không cần thiết khác đi như sau:
```js
import React, { useState } from 'react';
import { Input } from 'antd';

import useFetchDataHook from './useFetchDataHook'

const HomePage = () => {
    const [keyword, setKeyword] = useState('');
    const [handleSearch] = useFetchDataHook();

    function handleInputChange(e) {
        setKeyword(e.target.value)
    }

    return (
        <Input.Search
            value={keyword}
            onChange={handleInputChange}
            onSearch={handleSearch}
            placeholder="Search by username"
            enterButton />
    );
}

export default HomePage
```
Nếu bạn save file và mở lại browser lên thì sẽ thấy xuất hiện lỗi như sau:

![](https://images.viblo.asia/bd6f1ce7-3dcd-4b7c-96a5-0c78227e1e10.png)

Lỗi trên nói rằng chúng ta đang sử dụng một biết chưa được định nghĩa trong file `useFetchDataHook.js` ở dòng 6. Mở lại file `useFetchDataHook` lên và nhìn vào dòng 6 ta sẽ thấy ta đang dùng là:
```js
const { data } = await axios.get(`/search/users?q=${keyword}`);
```
Biến `keyword` mà chúng ta đang sử dụng nói trên thực ra là ta đang dùng state ở bên trang `HomePage`, vì vậy để có thể dùng được ở trong hook mà chúng ta vừa tạo ta sẽ cần truyền biến `keyword` đó sang hook của chúng ta như sau:
```useFetchDataHook.js
const useFetchDataHook = (keyword) => {
    ...
}
```
```HomePage/index.js
const [handleSearch] = useFetchDataHook(keyword);
```
Đến đây thì mọi thứ lại chạy lại như bình thường và đồng thời từ giờ trở đi toàn bộ logic liên quan đến việc tìm kiếm khác ta sẽ chỉ viết ở bên hook của chúng ta còn file `HomePage/index.js` sẽ chủ yếu chứa 1 tí ti logic về input và giao diện mà thôi. Tiếp theo bạn hãy thử không nhập bất cứ nội dung gì cả và ấn enter để tìm kiếm xem ta sẽ thu được kết quả gì:

![](https://images.viblo.asia/875f2ffa-8a15-4748-aabc-47c1fc22a6a9.png)

Tất nhiên là chúng ta sẽ nhận được lỗi 422 từ Github do ta không nhập bất cứ kí tự nào để tìm kiếm cả. Vậy nên ở đây chúng ta sẽ cần xử lý trường hợp không nhập gì cả mà bấm tìm kiếm luôn. Ý tưởng ở đây sẽ là nếu người dùng không nhập gì cả và bấm tìm kiếm thì thay vì gọi API ta sẽ thông báo với người dùng rằng họ cần nhập nội dung trước khi tìm kiếm. Chúng ta sẽ quay lại hook của chúng ta mới tạo và bổ sung thêm phần kiểm tra xem người dùng có nhập giữ liệu không trước khi gọi API như sau:
```js
async function handleSearch() {
    if (keyword.trim() === '') {
        return false;
    }
    const { data } = await axios.get(`/search/users?q=${keyword}`);
    console.log(data);
}
```
Với cách làm trên nếu ta kiểm tra nội dung mà người dùng nhập vào là chuỗi rỗng thì ta sẽ return false ngay mà không chạy tiếp đến phần gọi API. Bây giờ ta sẽ cần bổ sung thêm một thông báo lỗi cho người dùng trong trường hợp này nữa. Một trong những điểm mà mình thấy hay khi dùng `Antd` là nó cung cấp cho chúng ta sẵn một số function vô cùng đơn giản để phục vụ cho việc hiển thị thông báo hay confirm như này:

![](https://images.viblo.asia/772ed7be-f586-4f08-be7d-077123f52fd2.png)

Và tất nhiên ở đây ta sẽ sử dụng luôn đến nó như sau (chi tiết function bạn có thể xem tại [đây](https://ant.design/components/message/)):
```js
...
import { message } from 'antd';
...
async function handleSearch() {
    if (keyword.trim() === '') {
        message.warning('Please enter some keyword to search.');
        return false;
    }
    const { data } = await axios.get(`/search/users?q=${keyword}`);
    console.log(data);
}
```
Bây giờ bạn mở lại browser lên và test lại sẽ thấy thu được kết quả như sau:

![](https://images.viblo.asia/06ff8520-05dd-445a-8007-90b721f8f175.png)

Bây giờ thì chức năng của chúng ta đã chạy khá là ổn rồi nên chúng ta sẽ tiến hành sửa lại giao diện một chút cho đẹp. Ngay từ đầu chúng ta đã cài sẵn `Tailwindcss` để phục vụ cho việc style rồi nên ở  bước này ta cũng sẽ không mất công viết css nữa mà chỉ đơn giản thêm một vài class có sẵn vào thôi. Vì nội dung bài viết của chúng ta sẽ tập chung nhiều vào React hơn là css nên ở đây bạn có thể copy luôn phần code mình đã thêm sẵn class của `Tailwinds` để dùng cho tiện hoặc nếu không bạn cũng có thể tự style lại theo ý của mình:

```js
return (
    <div className="container mx-auto pt-8 w-100 h-100 flex flex-col items-center">
        <div className="px-4 py-8 shadow-lg rounded flex items-center bg-white" 
            style={{ width: 600 }}
         >
            <Input.Search
                value={keyword}
                onChange={handleInputChange}
                onSearch={handleSearch}
                placeholder="Search by username"
                enterButton />
        </div>
    </div>
);
```

Còn đây là kết quả cuối cúng chúng ta thu được:

![](https://images.viblo.asia/43c5f539-8f23-4001-85d1-c492ee25eed4.png)

## 4. Kết bài
<hr>

Đến đây thì part 1 của bài viết **Xây  dựng Github user search với React** của mình sẽ tạm kết thúc tại đây, hẹn gặp lại các bạn vào part tiếp theo. Các bạn đừng quên để lại 1 upvote để ủng hộ mình nhé.