Hello anh em :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:, lại là mình đây 

Hôm nay, mình lại ngoi lên để chia sẻ với mọi người một số thứ, lần này là một số kinh nghiệm của mình khi code trong project React. Rât mong là bài viết sẽ có ích cho mọi người .

Không biết là trong lúc làm việc , đã bao giờ mọi người đã gặp phải những tình huống sau chưa nhỉ ??

# Too many props:
Khi chúng ta truyền quá nhiều props vào một component duy nhất có thể là một dấu hiệu cho thấy component đó nên được tách ra.

Vậy thì có thêm một câu hỏi nữa được đặt ra: Vậy thì bao nhiêu là quá nhiều ??? uh thì câu trả lời của mình là " Tùy ". Chúng ta có thể gặp tình huống một Component được truyền vào 20 props hoặc hơn :scream: , khi mà bạn gặp phải tình huống như vậy mà task lại yêu cầu chúng ta thêm một props nữa vào , thì chúng ta sẽ lại phải đặt thêm ra những câu hỏi 

**Liệu Component này có đang làm quá nhiều việc không ???**

Theo mình giống như một **function** vậy, một component chỉ nên làm tốt nhất một nhiệm vụ, vì vậy để làm được điều này, chúng ta nên  kiểm tra xem có thể chia component đó thành nhiều componetn con hay không ? Ví dụ như component đó có props không tương thích hoặc nó trả về JSX từ các function. 

**Có nên chỉ sử dụng một Component ???**

Chỉ sử dụng một Component rất tốt nhưng điều chúng ta thường hay bỏ qua đó là xử lí logic tất cả trong component đó mà không tách ra. Mình có một ví dụ như sau :

```javascript
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

Nhìn vào component trên, chúng ta có thể thấy là tất cả các chức năng đều đã được xử lí trong Component đó, nhưng chúng ta vẫn có thể cải thiện điều rối mắt này bằng cách chia nhỏ các thành phần xử lí trong component này ra :

```javascript
<ApplicationForm onSubmit={handleSubmit} onCancel={handleCancel}>
  <ApplicationUserForm user={userData} />
  <ApplicationOrganizationForm organization={organizationData} />
  <ApplicationCategoryForm categories={categoriesData} />
  <ApplicationLocationsForm locations={locationsData} />
</ApplicationForm>
```

Okk sau khi xử lí xong thì bây giờ mình đã đảm bảo rằng ApplicationForm chỉ có một công việc duy nhất của nó đó là gửi và hủy các trường dữ liệu trong form. Các component con có thể xử lý mọi thứ liên quan đến phần của chúng trong form. Đây cũng là một cơ hội tuyệt vời để chúng ta thực hành sử dụng React Context cho việc giao tiếp giữa các component cha và con.

**Chúng ta có đang truyền quá nhiều 'configuration'-props?**

Trong một số trường hợp, chúng ta nên nhóm các props lại với nhau thành một đối tượng tùy chọn, đề phòng khi muốn thay đổi một option nào đó. Ví dụ:

```javascript
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

Mình nghĩ là nên làm như sau :

```javascript
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

# Incompatible props
Chúng ta nên tránh chuyền các props không thích hợp  : 


Chẳng hạn, chúng khi chúng ta tạo ra một common <Input /> với nhiệm vụ chuyên xử lí text trong form, nhưng sau đó , có thể lại muốn xử xử lí thêm cả phần nhập vào là number :sweat_smile:

```javascript
function Input({ value, isPhoneNumberInput, autoCapitalize }) {
  if (autoCapitalize) capitalize(value)

  return <input value={value} type={isPhoneNumberInput ? 'tel' : 'text'} />
}
```

Như chúng ta đã thấy, vấn đề với common này là props truyền vào **isPhoneNumberInput** và **autoCapitalize** không được hợp lý cho lắm . Chúng ta không thể viết hoa được số điện thoại đúng không :joy:.

Trong trường hợp này, giải pháp duy nhất có lẽ là chia ra thành nhiều phần nhỏ hơn. Nếu như vẫn còn có một số logic muốn chia sẻ , chúng ta có thể chuyển nó thành một custom hook:

```javascript
function TextInput({ value, autoCapitalize }) {
  if (autoCapitalize) capitalize(value)
  useSharedInputLogic()

  return <input value={value} type="text" />
}

function PhoneNumberInput({ value }) {
  useSharedInputLogic()

  return <input value={value} type="tel" />
}
```

# Copying props into state
Chúng ta cùng xem ví dụ sau :

```javascript
function Button({ text }) {
  const [buttonText] = useState(text)

  return <button>{buttonText}</button>
}
```
 Với việc truyền vào props text này thì đồng nghĩa với việc chúng ta đã từ bỏ việc giá trị của text được cập nhật bởi vì nếu nó được cập nhật thì component sẽ vẫn tiệp tục render ra initial value của state, điều này sẽ làm chúng ta dễ gặp bug hơn.
 
 Một ví dụ thực tế hơn về điều này xảy ra là khi chúng ta muốn lấy một số giá trị mới từ một prop và đặc biệt nếu điều này đòi hỏi một số tính toán chậm. Trong ví dụ dưới đây, mình sẽ chạy hàm slowFormatText để format prop text, điều này sẽ làm mất rất nhiều thời gian để thực thi.
 
```javascript
function Button({ text }) {
  const [formattedText] = useState(() => slowlyFormatText(text))

  return <button>{formattedText}</button>
}
```

Một cách tốt hơn để giải quyết vấn đề này là sử dụng hook useMemo để ghi nhớ kết quả:

```javascript
function Button({ text }) {
  const formattedText = useMemo(() => slowlyFormatText(text), [text])

  return <button>{formattedText}</button>
}
```

# Returning JSX from functions
Chúng ta không nên trả về một JSX từ functions bên trong một component.

Ví dụ :

```javascript
function Component() {
  const topSection = () => {
    return (
      <header>
        <h1>Component header</h1>
      </header>
    )
  }

  const middleSection = () => {
    return (
      <main>
        <p>Some text</p>
      </main>
    )
  }

  const bottomSection = () => {
    return (
      <footer>
        <p>Some footer text</p>
      </footer>
    )
  }

  return (
    <div>
      {topSection()}
      {middleSection()}
      {bottomSection()}
    </div>
  )
}
```

Mặc dù đoạn code này nhìn cũng khá là okk đấy nhưng nó lại khiến mình khó suy luận về code và không khuyến khích mọi người nên viết theo cách này. Để giải quyết trường hợp này, chúng ta nên chia nhỏ ra thành cách component riêng biệt.

Nên nhớ rằng, không phải mỗi lần bạn tạo ra một component mới thì bạn lại move nó sang một file mới. Đôi khi, nên giữ các component trong cùng một file nếu chúng kết hợp chặt chẽ với nhau.

# Multiple booleans for state

Chúng ta nên tránh việc sử dụng nhiều boolean để biểu diện trạng thái.

Khi viết code, thỉnh thoảng chúng ta sẽ gặp trường hợp cần check trạng thái của component đó để xem nó đang ở trạng thái nào để thực hiện chức năng :

```javascript
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

Trong đoạn code trên, khi button được clicked, thì chúng ta sẽ change state isLoading thành true và thực hiện việc fetch request. Nếu fetch success thì chúng ta sẽ change state isLoading thành false, isFinish thành true và ngược lại, đặt hasError thành true nếu trong quá trình fetch xảy ra lỗi.

Mặc dù về logic đoạn code trên có thể chạy tốt nhưng nó lại rất dễ khiến mình nhầm lẫn, cũng có thể rơi vào trường hợp 'impossible state', nghĩa là vôt tình isFinish và isLoading đều mang gái trị true cùng một lúc.

Một cách tốt hơn để giải quyết vấn đề này là sử dụng **enum** :

```javascript
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

Bằng việc làm theo cách này, chúng ta đã loại bỏ được trường hợp không thể xảy ra và làm cho logic trở nên dễ dàng hơn rất nhiều. Nếu như sử dụng TypeScript thì có thể tốt hơn như sau :

```javascript
const [state, setState] = useState<'idle' | 'loading' | 'error' | 'finished'>('idle')
```

# Too many useState
Chúng ta nên tránh việc sử dụng quá nhiều useState trong một component.

```javascript
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
Chúng ta có function reset để đặt lại tất cả state và selecItem để update một số state. Cả hai đều sử dụng khá nhiều state đến từ vị trí useState để thực hiện nhiệm vụ của chúng. Thử tưởng tượng xem, nếu bây giờ chúng ta có thêm nhiều  hành động khác để cập nhật các state thì điều này sẽ dễ gây ra lỗi và khó kiểm soát được tất cả các state. Và để giải quyết vấn đề trên, mình khuyên các bạn nên sử dụng hook useReducer :

```javascript
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
    dispatch({ type: 'reset', payload: item })
  }

  ...
}
```

# Large useEffect

Nên tránh viết quá nhiều thành phần trong useEffect. Điều này sẽ làm cho code của chúng ta dễ bị lỗi :

```javascript
function Post({ id, unlisted }) {
  ...

  useEffect(() => {
    fetch(`/posts/${id}`).then(/* viet code gi do o day */)

    setVisibility(unlisted)
  }, [id, unlisted])

  ...
}
```
Trong useEffect chúng ta đang thực hiện hai việc, điều này sẽ dẫn đến việc nếu id không thay đổi thì vẫn setVisibility. Thay vào đó, nên chia thành hai useEffect :

```javascript
  useEffect(() => { // khi id thay đổi thì fetch bài post
    fetch(`/posts/${id}`).then(/* ... */)
  }, [id])
    
    useEffect(() => { // khi unlisted thay đổi thì update visibility
    setVisibility(unlisted)
  }, [unlisted])
```

Ok, vậy là 7 điều bốc mùi cũng đã kết thúc. Hi vọng bài viết này sẽ giúp mọi người nhiều hơn trong việc viết code sao cho hợp lí và đỡ bị bug.

Nếu thấy bài viết có ích thì hãy đừng ngại ngần mà **like**, **chia sẻ** và **upvote** cho mình nhé.

Many thankssss