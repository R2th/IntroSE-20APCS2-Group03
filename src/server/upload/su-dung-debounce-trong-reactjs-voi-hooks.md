Đối với một trang web thì trải nghiệm người dùng là một trong những điều quan trọng nhất. Để trải nghiệm của người dùng được tốt thì performance của trang web là điều mà chúng ta cần quan tâm. Trong bài viết này thì mình giới thiệu với các bạn về `debounce` và áp dụng vào để cải thiện một số tính năng tăng trải nghiệm người dùng. Bắt đầu nào :D
# Debounce là gì?
- Debounce là một phương pháp hay kỹ thuật giúp chúng ta cải thiện performance, khi sử dụng Debounce chúng ta sẽ giảm thiểu số lần ứng dụng phải xử lý những sự kiện liên tục
- Debounce function buộc một hàm phải đợi một khoảng thời gian nhất định trước khi nó được chạy lại. Hàm được xây dựng để giới hạn số lần một hàm được gọi.
# Ý tưởng của Debounce
Debounce tạo ra một hàm `closed over` biến `timeout`. Biến `timeout` có thể được truy cập trong mỗi lần gọi của hàm được tạo ngay cả sau khi nó `debounce` chính nó và được return và có thể thay đổi qua các lần gọi khác nhau.
1. Bắt đầu không có timeout
2. Nếu hàm tạo ra được gọi thì xóa và reset lại timeout
3. Nếu đến thời điểm hết timeout thì gọi hàm ban đầu để thực thi

# Áp dụng debounce trong React với hooks
## Tìm kiếm trên ô input và hiển thị dropdown
Ở ví dụ này chúng ta có bài toán như sau:
- Chúng ta cần làm một tính năng là có một ô input và khi người dùng nhập trên ô input đó thì search và hiển thị một dropdown kết quả phía dưới

Đây là đoạn code khi chúng ta chưa sử dụng `debounce`:
```javascript
function App() {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);

  function openDropdown() {
    setVisible(true);
  }

  function fetchDropdownOptions(key) {
    Axios.get(`http://localhost:8000/users?name=${key}`)
    .then(res => setDropdownOptions(res.data));
  }

  function handleInputOnchange(e) {
    const { value } = e.target;

    setKeyword(value);
    fetchDropdownOptions(value);
  }

  return (
    <div>
      <input value={keyword} placeholder='Enter string' onClick={openDropdown} onChange={handleInputOnchange} />
      <div>
        {
          visible ?
          dropdownOptions.map(value => {
          return <div key={value}>{value}</div>
          }) : null
        }
      </div>
    </div>
  );
}
```

Sau khi chạy code trên, để tìm kiếm user có tên có họ bắt đầu là `phan` thì chúng ta thấy 4 API được gọi. 

![](https://images.viblo.asia/5e117bff-b9d5-4022-a86a-23e1478694f6.png)

Để xử lý vấn đề này chúng ta sẽ sử dụng `debounce`, chúng ta chỉ kích hoạt 1 API khi có thời gian delay do người dùng cung cấp khi nhập. Nếu chúng ta set độ trễ là 1000 mili giây và người dùng mất khoảng thời gian tương tự hoặc hơn để nhập chữ cái hoặc từ tiếp theo, chúng ta sẽ kích hoạt một API.

### Sử dụng useCallback

```javascript
function App() {
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);

  function openDropdown() {
    setVisible(true);
  }

  function fetchDropdownOptions(key) {
    Axios.get(`http://localhost:8000/users?name=${key}`)
    .then(res => setDropdownOptions(res.data));
  }

  const debounceDropDown = useCallback(debounce((nextValue) => fetchDropdownOptions(nextValue), 1000), [])

  function handleInputOnchange(e) {
    const { value } = e.target;
    console.log(value, 123);
    setKeyword(value);
    debounceDropDown(value);
  }

  return (
    <div>
      <input value={keyword} placeholder='Enter string' onClick={openDropdown} onChange={handleInputOnchange} />
      <div>
        {
          visible ?
          dropdownOptions.map(value => {
          return <div key={value}>{value}</div>
          }) : null
        }
      </div>
    </div>
  );
}
```

Ở đoạn code trên thì mình sử dụng `debounce` của `lodash` và useCallback

`useCallback` thường được sử dụng để tối ưu hóa performance khi truyền các callback đến component con. Nhưng chúng ta cũng có thể sử dụng nó để memoizing một callback function để đảm bảo `debounceDropDown` tham chiếu đến cùng một hàm `debounced` khi renders

### Sử dụng useRef
Ngoài sử dụng useCallback chúng ta cũng có thể sử dụng useRef

Chúng ta chỉ cần sửa lại hàm `debounceDropDown` như sau:
```
const debounceDropDown = useRef(debounce((nextValue) => fetchDropdownOptions(nextValue), 1000)).current;
```

`useRef` cung cấp cho chúng ta một đối tượng có thể thay đổi có thuộc tính `current` tham chiếu đến giá trị ban đầu được truyền. Nếu chúng ta không thay đổi nó theo cách thủ công, giá trị sẽ tồn tại theo component

# Kết luận
Trong bài viết này mình đã giới thiệu với các bạn về `debounce` cũng như cách sử dụng nó với react hooks. Ngoài ví dụ mình nêu ở trên thì còn nhiều trường hợp nữa chúng ta có thể áp dụng `debounce` như chúng ta lưu bài viết của người dùng sau khi người dùng ngừng nhập,...
Cảm ơn các bạn đã theo dõi bài viết <3