## Giới thiệu
- Khi bạn đang đọc bài viết này có lẽ bạn đang đã và đang hay thậm chí là mới bắt đầu tò mò với ReactJs. Trong bài viết này chúng ta sẽ cùng nhau tham khảo đôi chút về React Hooks. Cụ thể hơn hôm này mình muốn chia sẽ về cách dùng UseState trong React. Chúng ta sẽ tìm hiểu từ những thứ đơn giản như khai báo local state, cập nhật giá trị local state và nhiều nhiều hơn chút.
## Sử dụng useState.
- `useState` cho phép chúng ta khai báo local state trong Function Component cách mà trước để chỉ dùng cho Class Component.
```ruby
const [state, setState] = useState(initialStateValue)
```
Như trên chúng ta có thể hiểu:
* state: định nghĩa tên của state nó có thể là đơn giá trị hoặc object,.. (là thamg số của useState)
* setState: định nghĩa tên function dùng cho việc update state (là thamg số của useState)
* initialStateValue: là giá trị ban đầu của state.
Ví dụ:
```ruby
() => {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(age + 1)

  return (
    <div>
      Current count {count}.
      <div>
        <button onClick={handleClick}>Increment Count!</button>
      </div>
    </div>
  )
}
```
- Như ví dụ thì bạn thấy ban đầu bạn khởi tạo state có tên là `count` với giá trị ban đầu là `0`. Thì  `count` ở đây là state name và là tham số đầu tiên của hàm `useState` và tham số thứ 2 sẽ hàm function `setCount` hàm xử lý khi mỗi lần ta nhấn click thì giá trị của state sẽ được tăng lên một. Công việc xử lý tăng lên 1 nó tương đương với hàm `setState` trong Class Components.
- Vậy đó là cách khai báo cũng như cách update một state trong Function Component vậy nếu 1 Function Component có nhiều state thì sao? Ta sẽ đi tiếp nha.
### Khai bao nhiều state cho Function Components
- Thực ra khá đơn giản ta chỉ cần thêm N hàm useSate thôi.
```
const [state, setState] = useState(initialStateValue)
const [state, setState] = useState(initialStateValue)
.....
```
- Ví dụ:
```ruby
() => {
  const [count, setCount] = useState(0)
  const [salary, setSalary] = useState(1000)
  
  const handleClick = () => setCount(count + 1)
  const handleClick = () => setCount(salary + 500)
  return (
    <div>
      Current count {count}.
      Current salary {salary}.
      <div>
        <button onClick={handleClick}>Increment Count!</button>
        <button onClick={handleClick}>Increment Salary!</button>
      </div>
    </div>
  )
}
```
Ụ nhìn củ chuối thật giả sử sau này mà hơn 10 cái State thôi chắc nhìn mà nản. Vậy những trường hợp như vậy chúng ta nên sử dụng Object để khai báo giá trị của State như vậy nó sẽ đỡ rối hơn. Ta áp dụng luôn với ví dụ trên:
```ruby
() => {
  const [state, setState] = useState({ count: 0, salary: 1000 })
  const handleClick = val =>
  var valIncrement = val == 'count' ? 1 : 500
    setState({
      ...state,
      [val]: state[val] + valIncrement
    })
  const { count, salary } = state

  return (
    <div>
      Current count {count}.
      Current salary {salary}.
      <div>
        <button onClick={handleClick.bind(null, 'count')}>Increment count!</button>
        <button onClick={handleClick.bind(null, 'salary')}>Increment Salary!</button>
      </div>
    </div>
  )
}
```
Có vẻ ổn hơn rồi và với cách như trên làm cho chúng ta liên tưởng tới cách mà Class Component khai báo state. Ukm thì giống thôi chứ không giống hoàn toàn. Với Class Component thì hàm setState sẽ merged giá trị vào State còn Function Component thì không nó sẽ Replace. Ví dụ:
```ruby
//Ban đầu ta có state như sau: defaultState = {count: 1}
//Khi dùng setState của Class Component:
setState({salary: 1000}) 
// Kết qủa khi này defaultState sẽ trả về là : {count: 1, salary: 1000}
//Khi dùng Function Component:
setState({salary: 1000})
// Kết quả khi này sẽ của defaultState sẽ là: {salary: 1000}
```
## Kết luận
Vâng trên đây là những gì cơ bản về useState trong Hooks của React. Cảm ơn các bạn đã đọc đến đây!