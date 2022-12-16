Tất nhiên, việc xây dựng một UI hoàn hảo với React luôn chưa bao giờ là đủ, chúng ta cần phải hoàn thiện hơn nữa, khiến nó trở nên trơn tru, mượt mà, và chức năng phải tốt hơn đáng kể so với các đối thủ app khác.
Và bài viết này chính xác sẽ là những gì tác giả sẽ giúp người đọc, mô tả một số phương pháp để giúp tối ưu và cải tiến performance (hiệu năng) của các ứng dụng React.

### 1. Sử dụng tốt Định danh (Identities)

Khi xây dựng một ứng dụng với React, có thể sử dụng React.useMemo để bọc các function (hàm) và variable (biến) . Khi đó, một hàm memoized (memoized function) khi được thực thi lại với input không đổi thì kết quả vẫn sẽ được trả về như vậy. Điều này tăng khả năng ghi nhớ lại để kết quả vẫn giống nhau sau khi render. Tuy nhiên, khi các hàm và biến không được ghi nhớ (memoized), mọi tham chiếu đến chúng có thể biến mất sau lần render tới. Memoizing giúp loại bỏ các quy trình và hoạt động thừa thãi trong mọi tình huống khi sử dụng các hàm và biến.

Ví dụ:
Chúng ta sẽ chuẩn bị một Custom Hook với một list các url làm đối số. Sử dụng hook, ở đây có thể biểu diễn bằng một mảng các promise cần thực hiện, và kết quả trả về sẽ thông qua Promise.all. Kết quả sẽ được ghi nhận trong state và hiển thị lên app mỗi lần update. List các promise hiện tại đang được map tới mảng urls đã được fetch.

```
import React from 'react'
import axios from 'axios'

export const useApp = ({ urls }) => {
  const [results, setResults] = React.useState(null)

  const promises = urls.map(axios.get)

  React.useEffect(() => {
    Promise.all(promises).then(setResults)
  }, [])

  return { results }
}

const App = () => {
  const urls = [
    'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?terms=a',
    'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?terms=b',
    'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?terms=c',
  ]

  useApp({ urls })

  return null
}

export default App
```

Vì chỉ muốn get dữ liệu từ 3 url khai báo trên, nên lẽ ra chỉ có 3 request được gửi đi tương ứng với mỗi một url. Tuy nhiên khi kiểm tra trên Google Chrome, sẽ thấy có 6 request đang được gửi đi thay vì là 3.
Điều này xảy ra bởi vì các đối số url đã không được lưu định danh trước đó. Khi app render lại, nó sẽ khởi tạo lại một mảng mới, và như vậy React sẽ coi đó là một giá trị mới khác hoàn toàn.

![](https://images.viblo.asia/e5684b45-3524-4166-a075-4aca7b08c511.png)

Để giải quyết vấn đề này, có thể sử dụng useMemo đã được đề cập đến ở trên. Khi sử dụng useMemo, mảng các promise trên sẽ không tính toán lại sau mỗi lần render trừ khi list url có thay đổi. Đây là kết quả sau khi áp dụng useMemo:

```
const useApp = ({ urls }) => {
  const [results, setResults] = React.useState(null)

  const promises = urls.map((url) => axios.get(url))

  React.useEffect(() => {
    Promise.all(promises).then(setResults)
  }, [])

  return { results }
}

const App = () => {
  const urls = React.useMemo(() => {
    return [
      'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?terms=a',
      'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?terms=b',
    ]
  }, [])

  const { results } = useApp({ urls })

  return null
}
```

Nó vẫn sẽ gửi đi 6 request vì chúng ta chỉ ghi nhớ mảng url. Các biến promise cũng sẽ thực thể hóa khi chạy hook. Vậy để chỉ gửi đi 3 request, chúng ta cũng phải ghi nhớ cả các biến promises.

```
const promises = React.useMemo(() => {
  return urls.map((url) => axios.get(url))
}, [urls])
```

Và ta có kết quả sau:

![](https://images.viblo.asia/220a3637-cae6-438e-a7a7-4a6f2bd5c0dd.jpg)


### 2. Merging Props to Children

Đôi khi sẽ rơi vào tình huống mon muốn merge prop với children trước khi render. Để tạo điều kiện tương tự, React cho phép view các props cho tất cả các react elements. Vì vậy có thể chọn cách bọc các phần tử chidren bằng một phần tử mới hơn, và insert props mới tại đó hoặc có thể đơn giản hơn là merge các props với React.
Giả sử có một component sử dụng useModal và cung cấp các chức năng thuộc modal như open, close, và active. Trước khi merge props to children, chúng ta có thể pass chúng vào một component VisibilityControl, cung cấp một số function bổ sung.

```
import React from 'react'

const UserContext = React.createContext({
  user: {
    firstName: 'Kelly',
    email: 'frogLover123@gmail.com',
  },
  activated: true,
})

const VisibilityControl = ({ children, opened, close }) => {
  const ctx = React.useContext(UserContext)
  return React.cloneElement(children, {
    opened: ctx.activated ? opened : false,
    onClick: close,
  })
}

export const useModal = ({ urls } = {}) => {
  const [opened, setOpened] = React.useState(false)
  const open = () => setOpened(true)
  const close = () => setOpened(false)

  return {
    opened,
    open,
    close,
  }
}

const App = ({ children }) => {
  const modal = useModal()

  return (
    <div>
      <button type="button" onClick={modal.opened ? modal.close : modal.open}>
        {modal.opened ? 'Close' : 'Open'} the Modal
      </button>
      <VisibilityControl {...modal}>{children}</VisibilityControl>
    </div>
  )
}

const Window = ({ opened }) => {
  if (!opened) return null
  return (
    <div style={{ border: '1px solid teal', padding: 12 }}>
      <h2>I am a window</h2>
    </div>
  )
}

export default () => (
  <App>
    <Window />
  </App>
)
```

Việc sử dụng component VisibilityControl để check xem việc đã active trước khi open chưa. Trong trường hợp VisibilityControl chỉ được hiển thị cho một vài tình huống nhất định, thì sẽ có options để ngăn người dùng không truy cập được nội dung.

### 3. Mở rộng reducer

Có thể combine nhiều reducer lại với nhau lại thành một reducer duy nhất, điều này có thể giúp cải tiến hiệu suất cho ứng dụng.
Giả sử nếu xây một ứng dụng lớn và cung cấp quyền truy cập vào nhiều dịch vụ nhỏ khác nhau, làm thế nào để phát triển một ứng dụng như vậy? Chúng ta có hai lựa chọn:

- Có thể cung cấp cho mỗi microservice trong app một phần riêng biệt, để quản lý trực tiếp state và context của nó.
- Hoặc có thể kết hợp tất cả các state thành một state duy nhất và quản lý tất cả chúng trong cùng một môi trường.

> Cách tiếp cận đầu tiên có vẻ rất tẻ nhạt, vậy thật rõ ràng, cách thứ hai chính là hướng cần tới.

Giờ chúng ta có 3 reducer combine lại với nhau như sau: frogsreducer.js, authreducer.js và ownersreducer.js.

Đầu tiên là authReducer.js

```
const authReducer = (state, action) => {
  switch (action.type) {
    case 'set-authenticated':
      return { ...state, authenticated: action.authenticated }
    default:
      return state
  }
}

export default authReducer

ownersReducer.js
```

Tiếp đó, ownersReducer.js

```
const ownersReducer = (state, action) => {
  switch (action.type) {
    case 'add-owner':
      return {
        ...state,
        profiles: [...state.profiles, action.owner],
      }
    case 'add-owner-id':
      return { ...state, ids: [...state.ids, action.id] }
    default:
      return state
  }
}

export default ownersReducer
```

Và cuối cùng, frogsReducer.js

```
const frogsReducer = (state, action) => {
  switch (action.type) {
    case 'add-frog':
      return {
        ...state,
        profiles: [...state.profiles, action.frog],
      }
    case 'add-frog-id':
      return { ...state, ids: [...state.ids, action.id] }
    default:
      return state
  }
}

export default frogsReducer
```

> Giờ hãy gọi cả ba trong file App.js và định nghĩa state:

App.js

```
import React from 'react'
import authReducer from './authReducer'
import ownersReducer from './ownersReducer'
import frogsReducer from './frogsReducer'

const initialState = {
  auth: {
    authenticated: false,
  },
  owners: {
    profiles: [],
    ids: [],
  },
  frogs: {
    profiles: [],
    ids: [],
  },
}

function rootReducer(state, action) {
  return {
    auth: authReducer(state.auth, action),
    owners: ownersReducer(state.owners, action),
    frogs: frogsReducer(state.frogs, action),
  }
}

const useApp = () => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState)

  const addFrog = (frog) => {
    dispatch({ type: 'add-frog', frog })
    dispatch({ type: 'add-frog-id', id: frog.id })
  }

  const addOwner = (owner) => {
    dispatch({ type: 'add-owner', owner })
    dispatch({ type: 'add-owner-id', id: owner.id })
  }

  React.useEffect(() => {
    console.log(state)
  }, [state])

  return {
    ...state,
    addFrog,
    addOwner,
  }
}

const App = () => {
  const { addFrog, addOwner } = useApp()

  const onAddFrog = () => {
    addFrog({
      name: 'giant_frog123',
      id: 'jakn39eaz01',
    })
  }

  const onAddOwner = () => {
    addOwner({
      name: 'bob_the_frog_lover',
      id: 'oaopskd2103z',
    })
  }

  return (
    <>
      <div>
        <button type="button" onClick={onAddFrog}>
          add frog
        </button>
        <button type="button" onClick={onAddOwner}>
          add owner
        </button>
      </div>
    </>
  )
}
export default () => <App />

// Combine lại thành một reducer là rootReducer

function rootReducer(state, action) {
  return {
    auth: authReducer(state.auth, action),
    owners: ownersReducer(state.owners, action),
    frogs: frogsReducer(state.frogs, action),
  }
```

### 4. Sử dụng Sentry để phân tích lỗi

![](https://images.viblo.asia/85fa85ea-c790-4cbe-be72-ed1178ef8aef.png)

Bất kì dự án phát triển App nào cũng đều có thể hưởng lợi rất nhiều từ Sentry. Nó cung cấp mọi thứ mà một developer cần để xử lý các error và exception khi build app với React. Sentry sẽ xác định lỗi và hiển thị để có thể truy cập và phân tích cùng một lúc.
Chỉ cần cài đặt lệnh *npm install @sentry/browser* và setup. Sau khi cài đặt xong, developer có thể đăng nhập tại sentry.io và phân tích các báo cáo lỗi trên một dashboard duy nhất.
Sentry báo lỗi rất chi tiết. Ở đây cung cấp tất cả các thông tin quan trọng bao gồm về thông tin thiết bị, trình duyệt, url, stack, cách xử lý lỗi, source code, địa chỉ IP, tên hàm lỗi và còn nhiều hơn thế nữa.

### 5. Kết luận

Các phương pháp được đề cập ở trên có thể giúp cải thiện performance cho ứng dụng React. Nó giúp các developer, các doanh nghiệp và tất nhiên sẽ đem lại trải nghiệm tốt đẹp cho người dùng. Nhưng dù sao thì sự thành công của một React App vẫn phải phụ thuộc vào người viết ra chúng. 

Là một người dùng, sẽ luôn mong muốn có một trải nghiệm performace hoàn hảo trên ứng dụng. Là một developer, các phương pháp này có thể là chìa khóa hoặc một sự hữu dụng sẽ có lúc cần để cải tiến performance cho App. Hy vọng bài viết này sẽ giúp người đọc tìm hiểu thêm được vài điều mới mẻ và tạo ra được một React App hoàn hảo.

Link bài viết tham khảo [tại đây](https://www.freecodecamp.org/news/tips-to-enhance-the-performance-of-your-react-app/)