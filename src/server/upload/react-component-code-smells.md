Bài viết gốc: https://antongunnarsson.com/react-component-code-smells/


> **Code Smell là gì?** code smell là thứ có thể chỉ ra vấn đề sâu hơn bên trong code nhưng không nhất thiết là lỗi. Đọc thêm trên [Wikipedia](https://en.wikipedia.org/wiki/Code_smell)

## 1. Too many props
Một component có quá nhiều props là dấu hiệu nên chia nhỏ component đó ra.

Vậy bao nhiêu thì coi là nhiều? **Cái đấy còn tùy**. 

Bạn có thể thấy một component có 20 props và  hài lòng nó vẫn đang làm việc ngon, giờ bạn muốn thêm một cái nữa vào danh sách props vốn đã dài, có một số điều cần xem xét:

**Component này có làm nhiều thứ không?**

Giống như functions, component chỉ nên làm tốt một việc, vì vậy luôn kiểm tra xem có thể chia component đó thành nhiều component con hay không?

**Tôi có nên dùng composition?**

Một mô hình tốt nhưng thường bị bỏ qua là tạo các compose components thay vì xử lý tất cả logic bên trong nó. Giả sử chúng ta có một component như sau:

```jsx
<ApplicationForm
  user={userData}
  organization={organizationData}
  categories={categoriesData}
  locations={locationsData}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  ...
/>
```

Nhìn vào các props của component này, chúng ta có thể thấy rằng tất cả chúng đều liên quan đến chức năng của component, nhưng vẫn còn chỗ để cải thiện điều này bằng cách chuyển thành một số component con thay thế:

```jsx
<ApplicationForm onSubmit={handleSubmit} onCancel={handleCancel}>
  <UserField user={userData} />
  <OrganizationField organization={organizationData} />
  <CategoryField categories={categoriesData} />
  <LocationsField locations={locationsData} />
</ApplicationForm>
```

Giờ đây, chúng ta đã đảm bảo rằng `ApplicationForm` chỉ xử lý việc `onSubmit` và `onCancel`. Các component con có thể xử lý mọi thứ liên quan đến phần của chúng trong bức tranh lớn hơn. Đây cũng là một cơ hội tuyệt vời để sử dụng [React Context](https://reactjs.org/docs/context.html) cho việc giao tiếp giữa component cha và con.

> Đọc thêm về [compound components in React](https://antongunnarsson.com/compound-components-in-react/).


<br />


**Tôi có đang gửi quá nhiều props config không?**

Trong một số trường hợp, bạn nên nhóm các props lại với nhau thành một object, chẳng hạn như để hoán đổi cấu hình này dễ dàng hơn.

```jsx
<Grid
  data={gridData}
  pagination={false}
  autoSize={true}
  enableSort={true}
  sortOrder="desc"
  disableSelection={true}
  infiniteScroll={true}
  ...
/>
```

Tất cả các props ngoại trừ  `data` có thể được coi là config. Trong những trường hợp này, bạn nên thay đổi component Grid để nó nhận một `options` gom các config ở trên.
```jsx
const options = {
  pagination: false,
  autoSize: true,
  enableSort: true,
  sortOrder: 'desc',
  disableSelection: true,
  infiniteScroll: true,
  ...
}

<Grid
  data={gridData}
  options={options}
/>
```

## 2. Incompatible props

Tránh gửi các props không tương thích với nhau.

Ví dụ chúng ta tạo một component `<Input />` chung chung nhằm mục đích xử lý `type=text`, nhưng sau một thời gian chúng ta lại thêm chức năng cho nó với `type=tel`. Việc triển khai có thể như sau:

```jsx
function Input({ value, isPhoneNumberInput, autoCapitalize }) {
  if (autoCapitalize) capitalize(value)

  return <input value={value} type={isPhoneNumberInput ? 'tel' : 'text'} />
}
```

Vấn đề xảy ra  là `isPhoneNumberInput` và `autoCapitalize` không hợp cạ với nhau. Chúng ta đâu thể viết hoa số điện thoại.


Trong trường hợp này, giải pháp có lẽ là chia thành nhiều component nhỏ hơn. Nếu chúng ta có một số logic muốn chia sẻ, hãy chuyển nó sang [custom hook](https://reactjs.org/docs/hooks-custom.html):

```jsx
function TextInput({ value, autoCapitalize }) {
  if (autoCapitalize) capitalize(value)
  useSharedInputLogic()

  return <input value={value} type='text' />
}

function PhoneNumberInput({ value }) {
  useSharedInputLogic()

  return <input value={value} type='tel' />
}
```
Mặc dù ví dụ này hơi phức tạp, nhưng việc tìm kiếm các props không tương thích với nhau thường là một dấu hiệu tốt cho thấy bạn nên kiểm tra xem component có cần được chia nhỏ hay không.

## 3. Copying props into state

Đừng chặn dòng chảy của data bằng cách copy props vào state.

```jsx
function Button({ text }) {
  const [buttonText] = useState(text)

  return <button>{buttonText}</button>
}
```

Bằng việc đặt props `text` vào initialValue của useState khiến cho component này bỏ qua các update của props `text`. Nếu props thay đổi thì component vẫn render với giá trị đầu tiên, đối với hầu hết các props, đây là hành vi không mong muốn, có thể làm cho component dễ bị lỗi hơn.

Một ví dụ thực tế hơn về điều này là khi chúng ta muốn lấy một giá trị mới nào đó từ một giá trị và đặc biệt nếu điều này đòi hỏi một số tính toán chậm. Ở ví dụ dưới đây, chúng ta chạy hàm `slowFormatText` để định dạng props `text`, điều này mất rất nhiều thời gian để thực thi.

```jsx
function Button({ text }) {
  const [formattedText] = useState(() => slowlyFormatText(text))

  return <button>{formattedText}</button>
}
```
Một cách tốt hơn để giải quyết vấn đề này là sử dụng hook useMemo để ghi nhớ kết quả:
```jsx
function Button({ text }) {
  const formattedText = useMemo(() => slowlyFormatText(text), [text])

  return <button>{formattedText}</button>
}
```

Bây giờ thì `slowlyFormatText` chỉ chạy khi `text` thay đổi và chúng ta không chặn update component.

 
> Đôi khi chúng ta vẫn cần prop trong đó các thay đổi bị bỏ qua, ví dụ bộ chọn màu có các option cho sẵn, nhưng khi người dùng thay đổi thì chúng ta chưa muốn thay đổi ngay chỉ lưu tạm. Trong trường hợp này, việc sao chép prop vào state là hoàn toàn ổn, nhưng để biểu thị hành vi này của người dùng, chúng ta có thể phân tách ra thành initialColor hoặc defaultColor

Further reading: [Writing resilient components by Dan Abramov](https://overreacted.io/writing-resilient-components/).

## 4. Returning JSX from functions

Đừng trả về JSX từ các functions bên trong component.

Đây là một pattern phần lớn đã biến mất khi các function components trở nên phổ biến hơn, nhưng tôi vẫn thỉnh thoảng bắt gặp nó.

```jsx
function Component() {
  const topSection = () => (
    <header>
      <h1>Component header</h1>
    </header>
  )

  const middleSection = () => (
    <main>
      <p>Some text</p>
    </main>
  )

  const bottomSection = () => (
    <footer>
      <p>Some footer text</p>
    </footer>
  )

  return (
    <div>
      {topSection()}
      {middleSection()}
      {bottomSection()}
    </div>
  )
}
```
Mặc dù điều này ban đầu có thể ổn, nhưng nó khiến bạn khó suy luận về code, không khuyến khích và nên tránh. Để giải quyết vấn đề này bạn nên chia các phần này thành các component con thay thế.


> Hãy nhớ rằng khi bạn tạo một component mới, bạn không cần phải tách ra file mới. Đôi khi bạn nên giữ nhiều components trong cùng một file nếu chúng được kết hợp chặt chẽ với nhau.

## 5. Multiple booleans for state

Tránh sử dụng nhiều state boolean để thể hiện trạng thái của component

Khi viết một component và mở rộng chức năng cho nó, bạn có nhiều state để cho biết component đang ở trạng thái nào. Ví dụ:

```jsx
function Component() {
  const [isLoading, setIsLoading] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [hasError, setHasError] = useState(false)

  const fetchSomething = () => {
    setIsLoading(true)

    fetch(url)
      .then(() => {
        setIsLoading(false)
        setIsFinished(true)
      })
      .catch(() => {
        setHasError(true)
      })
  }

  if (isLoading) return <Loader />
  if (hasError) return <Error />
  if (isFinished) return <Success />

  return <button onClick={fetchSomething} />
}
```
Mặc dù về mặt kỹ thuật thì nó hoạt động tốt nhưng thật khó để lý giải về trạng thái của component, nó có thể xảy ra lỗi. Chúng ta có thể rơi vào trạng thái **impossible state** nếu chúng ta vô tình đặt cả `isLoading` và `isFinished` thành true cùng một lúc.

Cách tốt hơn để quản lý trạng thái đó là dùng `enum`. Ở các ngôn ngữ khác thì enum là cách để khai báo một tập hợp các giá trị không đổi, vì enum không tồn tại trong javascript nên chúng ta có thế sử dụng string thay thế.

```jsx
function Component() {
  const [state, setState] = useState('idle')

  const fetchSomething = () => {
    setState('loading')

    fetch(url)
      .then(() => {
        setState('finished')
      })
      .catch(() => {
        setState('error')
      })
  }

  if (state === 'loading') return <Loader />
  if (state === 'error') return <Error />
  if (state === 'finished') return <Success />

  return <button onClick={fetchSomething} />
}
```

Làm theo cách này chúng ta đã gỡ bỏ trạng thái `impossible state` và khiến cho component trở nên dễ hiểu hơn. Nếu bạn sử dụng TypeScript thì có thể khai báo như sau:

```jsx
const [state, setState] = useState<'idle' | 'loading' | 'error' | 'finished'>('idle')
```

## 6. Too many useState

Tránh sử dụng quá nhiều `useState` trong component.

Một component có quá nhiều `useState` giống như làm quá nhiều thứ trong đó, tốt hơn là tách ra làm nhiều component, tuy nhiên sẽ có những component phức tạp cần nhiều state. 

```jsx
function AutocompleteInput() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeIndex, setActiveIndex] = useState(-1)

  const reset = () => {
    setIsOpen(false)
    setInputValue('')
    setItems([])
    setSelectedItem(null)
    setActiveIndex(-1)
  }

  const selectItem = (item) => {
    setIsOpen(false)
    setInputValue(item.name)
    setSelectedItem(item)
  }

  ...
}
```
Chúng ta có function `reset` để reset các state, function `selectItem` để cập nhật một số state. Cả hai hàm này đều sử dụng khá nhiều `setState` để thực hiện nhiệm vụ. Bây giờ, nếu chúng ta có thêm nhiều hành động khác phải cập nhật state, điều này trở nên khó để giữ cho không có lỗi trong thời gian dài. Trong những trường hợp này, sẽ có lợi khi quản lý state bằng một `useReducer`

```jsx
const initialState = {
  isOpen: false,
  inputValue: "",
  items: [],
  selectedItem: null,
  activeIndex: -1
}
function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return {
        ...initialState
      }
    case "selectItem":
      return {
        ...state,
        isOpen: false,
        inputValue: action.payload.name,
        selectedItem: action.payload
      }
    default:
      throw Error()
  }
}

function AutocompleteInput() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const reset = () => {
    dispatch({ type: 'reset' })
  }

  const selectItem = (item) => {
    dispatch({ type: 'selectItem', payload: item })
  }

  ...
}
```
Với việc sử dụng `useReducer` chúng ta đã đóng gói logic quản lý state và chuyển sự phức tạp ra khỏi component. Điều này làm cho việc hiểu những gì đang diễn ra dễ dàng hơn, chúng ta đã tách UI và logic riêng biệt.

> Cả useState và useReducer đều có ưu nhược điểm với các use case khác nhau, một trong các mục yêu thích của tôi với reducers đó là [state reducer pattern của Kent C. Dodds.](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks)

## 7. Large useEffect

Tránh sử dụng các `useEffect` lớn và làm nhiều việc. Nó khiến code khó tìm lỗi, cứ lòng vòng update.

Một sai lầm mà tôi đã mắc phải là đặt quá nhiều thứ vào một `useEffect`.
```jsx
function Post({ id, unlisted }) {
  ...

  useEffect(() => {
    fetch(`/posts/${id}`)
      .then(/* do something */)

    setVisibility(unlisted)
  }, [id, unlisted])

  ...
}
```

`useEffect` này không lớn lắm nhưng lại làm nhiều việc. Nếu `id` thay đổi thì fetch bài viết, nếu `unlisted` thay đổi thì setVisibility, tuy nhiên chỉ cần một trong hai dependencies thay đổi thì cả hai việc đều thực hiện.

Để dễ theo dõi chúng ta nên tách ra làm hai `useEffect` với từng dependencies riêng biệt
```jsx
function Post({ id, unlisted }) {
  ...

  useEffect(() => { // when id changes fetch the post
    fetch(`/posts/${id}`)
      .then(/* do something */)
  }, [id])

  useEffect(() => { // when unlisted changes update visibility
    setVisibility(unlisted)
  }, [unlisted])

  ...
}
```
Làm cách này chúng ta đã giảm độ phức tạp của component xuống, dễ dàng suy đoán logic, giảm nguy cơ lỗi.

## 8. Wrapping up

Được rồi, tạm thế nhé! Hãy nhớ rằng những điều nêu trên không phải là quy tắc mà là dấu hiệu cho thấy điều gì đó có thể "sai". Bạn chắc chắn sẽ gặp phải những tình huống trên và muốn thực hiện chỉnh sửa lại.

Bạn muốn feedback hay suggest về `code smells` khác? Tìm tôi trên [Twitter!](https://twitter.com/awnton)