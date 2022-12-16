# IV. So sánh useCallback() và useMemo().
 Hôm nay mình sẽ tìm hiểu về 2 cái hooks. Và cuối bài mình sẽ giúp các bạn là có nên sử dụng useCallback() và useMemo() không nhé.

## 1. useCallback() là gì?

Là một react hooks giúp mình tạo ra một memoized callback và chỉ tạo ra callback mới khi dêpndencies thay đổi .

*  Nhận vào 2 tham số : 1 function, 2 dependencies.
*  Return  memoized callback
*   tạo ra function mới khi dependencies thay đổi.
*   Nếu dùng empty dependencies thì không bao giờ tạo ra function mới ,

Ví dụ : 

```javascript
// Mỗi lần App re-render 
// --> Tạo ra một function mới 
// --> Chảt bị re-render 
function App() {
    const handleChartTypeChange = (type) => {}
    return <Chart onTypeChange={handleChartTypeChange} />;
}
```
 Ở vị dụ trên, ta có cái chart render rất là nặng . Bên trong có 1 cái hàm đó là onTypeChange nghĩa là người dùng chọn 1 cái loại chart khác thì chúng ta có thể tính toán, xử lý dử liệu để cập nhật lại nạp cho render.
 
 Mỗi lần cái App bị rerender thì nó sẽ chạy lại 2 dòng code trên và nếu nó chạy vào cái này `const handleChartTypeChange = (type) => {}` thì nó sẽ tạo 1 cái function mới handleChartTypeChange. Nó sẽ làm cho cái props của thằng Chart là 1 props mới , cho nên cái Chart này nó re-render. Vậy để khắc phục việc này chúng ta sử dụng 1 cái useCallback() để hạn chế việc re-render.
```javascript
// Mỗi lần App re-render
// --> nhờ có useCallback() nó chỉ tạo function một lần đầu
// --> Nên Chart ko bị re-render.
function App() {
    const handleChartTypeChange = useCallback((type) => {}, [])
    return <Chart onTypeChange={handleChartTypeChange} />;
}
```
 Vậy ý nghĩa của useCallback trong trường hợp này là gì ? Nó sẽ tạo ra function `(type) => {}` đúng 1 lần đầu tiên ,  nó luôn luôn trả về dúng 1 function củ. cho nên cái props nó không đổi và không bị re-render lại .
 
## 2. useMemo() là gì?
Là một react hooks giúp mình tạo ra một memoized value và chỉ tính toán ra value mới khi
dependencies thay đổi.
* Nhận vào 2 tham số: 1 là function, 2 là dependencies.
* Return memoized value
* Chỉ tính toán value mới khi dependencies thay đổi.
* Nếu dùng empty dependencies thì không bao giờ tính toán lại value mới.

```javascript
// Mỗi lần App re-render
// --> tạo ra một mảng mới
// --> Chart bị re-render do props thay đổi
function App() {
    const data = [{}, {}, {}];
    return <Chart data={data} />;
}
```


tương tự ở trên , mỗi lần re-render thì nó sẽ tạo 1 cái data mới, nhưng data mới và củ khi so sánh chắc chắn sẽ khác nhau, cho nên khi re-render thì cái Chart sẽ render lại. Và giải pháp là dùng useMemo()

Nó giống với useCallback nhưng ở đây , useMemo thì trả về value còn useCallback thì callback về function. 

```javascript
// Mỗi lần App re-render
// --> nhờ có useMemo() nó chỉ tạo ra cái mảng 1 lần đầu
// --> Nên Chart ko bị re-render.
function App() {
    const data = useMemo(() => [{}, {}, {}], [])
    return <Chart data={data} />;
}
```


## 3. So sánh useCallback() vs useMemo()

#### GIỐNG NHAU
Đều áp dụng kĩ thuật memoization.
Đều nhận vào 2 tham số: function và dependencies.
Đều là react hooks, dùng cho functional component.
Dùng để hạn chế những lần re-render dư thừa (micro improvements).

#### KHÁC NHAU
# useCallback() useMemo()



| # | useCallback() | useMemo() |
| -------- | -------- | -------- |
| return     | memoized callback     | memoized value     |
| code     | useCallback((type) => {}, [])     | useMemo(() => [{}, {}, {}], [])     |


## 4. Có nên sử dụng useCallback() vs useMemo() hay không? .

Không nên dùng cho tất cả components.
Nên dùng cho: đồ thị, biểu đồ, animations, những component nặng phần render.
Chỉ là micro improvements.

## 6. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍
Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc . Một số nguồn :

useCallback() hooks: https://reactjs.org/docs/hooks-reference.html#usecallback    
useMemo() hooks: https://reactjs.org/docs/hooks-reference.html#usememo   
Một bài blog rất hay về useMemo và useCallback: https://kentcdodds.com/blog/usememo-and-usecallback 
https://medium.com/@jan.hesters/usecallback-vs-usememo-c23ad1dc60   
https://dev.to/dinhhuyams/introduction-to-react-memo-usememo-and-usecallback-5ei3