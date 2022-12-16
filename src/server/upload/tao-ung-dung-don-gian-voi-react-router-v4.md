**React Router v4** được viết lại từ một package nổi tiếng bằng React. Ở phiên bản trước, **React Router** sử dụng cấu hình ngụy trang như một pseudo-component, làm cho chúng ta khó để hiểu được chúng.Với **v4**, mọi thứ bây giờ chỉ là **components**.

Trong bài viết này, chúng ta sẽ xây dựng website đơn giản qua các bước:


1.  Chọn loại router
2.  Tạo routes.
3.  Điều hướng giữa các routes.

Khởi tạo project mới bằng lệnh `$ create-react-app my-app`

## Cài đặt React Router
**React Router** được chia nhỏ thành ba package: `react-router`, `react-router-dom`, và `react-router-native`. Vì chúng ta xây dựng một website cho nên chúng ta sẽ cài `react-router-dom`.
```
npm install --save react-router-dom
```
## Chọn Router
Khi bắt đầu project mới, bạn cần phân tích xem nên sử dụng loại router nào. Với project chạy trên trình duyệt, bạn nên sử dụng `<BrowserRouter>` và `<HashRouter>` component. `BrowserRouter` nên được sử dụng khi server của bạn xử lý các dynamic request, trong khi `<HashRouter>` nên được sử dụng cho các static website.

Với project trong bài viết, chúng ta chọn router component là `<BrowserRouter>`.

## History trong React Router
Mỗi router tạo ra một `history` object riêng dùng để giữ các lịch sử điều hướng, `location` hiện tại và re-render website khi có bất kỳ thay đổi nào. Bạn có thể xem [bài viết](https://viblo.asia/p/co-ban-ve-history-trong-react-router-vyDZOzwPKwj) này để hiểu về `history`.
## Rendering a Router
**Router** component chỉ nhận một element con. Để làm việc trong giới hạn này, cách tốt nhất là tạo `<App>` component để render ứng dụng.

``` javascript
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
```

Bây giờ sau khi chúng ta đã chọn được router, chúng ta có thể tiến hành render ứng dụng.

## <App>
Ứng dụng của chúng ta được định nghĩa bên trong `<App>`  component. Để đơn giản hóa, chúng ta chia ứng dụng thành hai phần là `<Header>` component chứa các link để điều hướng website, `<Main>` component là phần nội dung cần render.
``` javascript
// this component will be rendered by our <___Router>
const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)
```
    
## <Main>
 Trong component `<Main>` , chúng ta sẽ render component `<Switch>` và `<Route>`, chúng ta cần đặt HTML cần generate tương ứng với route bên trong tag `<main>`.
``` javascript
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Roster from './Roster'
import Schedule from './Schedule'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/members' component={Roster}/>
            <Route path='/schedule' component={Schedule}/>
        </Switch>
    </main>
)

export default Main

```

## <Roster>
Bên trong `<Roster>` component chúng ta sẽ render routes cho 2 đường dẫn:


1. `/members`: Đường dẫn này tương ứng với chính xác `pathname` `/members` nên chúng ta bổ sung element `exact` cho nó
2. `/members/:number`: Đường dẫn này sử dụng path param.

``` javascript
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FullRoster from './FullRoster'
import Member from './Member'

const Roster = () => (
    <Switch>
        <Route exact path='/members' component={FullRoster}/>
        <Route path='/members/:number' component={Member}/>
    </Switch>
)

export default Roster
```
## Path Params
Đôi khi bạn cần lấy ra các tham số được truyền trong `pathname`. Ví dụ với route của member, bạn muốn lấy ra **member number**. Việc bạn cần làm là thêm `path param` vào chuỗi route `path` .

Trong path `/members/:number`, `:number` là phần bạn cần lấy ra, nó được lưu như `match.params.number`. Ví dụ với pathname là: `/members/6` sẽ tạo ra một object là:
``` javascript
{ number: '6' } // Giá trị bạn nhận được sẽ là một string
```
`<Member>` component sẽ sử dụng object `props.match.params ` để nhận ra, member nào cần được render.
``` javascript
import React from 'react'
import MemberAPI from '../api'
import { Link } from 'react-router-dom'

const Member = (props) => {
    const member = MemberAPI.get(
        parseInt(props.match.params.number, 10)
    )
    if (!member) {
        return <div>Sorry, but the player was not found</div>
    }
    return (
        <div>
            <h1>{member.name} (#{member.number})</h1>
            <h2>Position: {member.position}</h2>
            <Link to='/members'>Back</Link>
        </div>
    )
}

export default Member

```

Bên cạnh `<Member>` component, còn có thêm `<FullRoster>`, `<Schedule>` và `<Home>` components.

- `<FullRoster>`

``` javascript
import React from 'react'
import MemberAPI from '../api'
import { Link } from 'react-router-dom'

const FullRoster = () => (
    <div>
        <ul>
            {
                MemberAPI.all().map(p => (
                    <li key={p.number}>
                        <Link to={`/members/${p.number}`}>{p.name}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
)

export default FullRoster
```
- `<Schedule>` 

``` javascript
import React from 'react'

const Schedule = () => (
    <div>
        <ul>
            <li>13/03 @ Evergreens</li>
            <li>14/03 vs Kickers</li>
            <li>15/03 @ United</li>
        </ul>
    </div>
)

export default Schedule
``` 
- `<Home>`

``` javascript
import React from 'react'

const Home = () => (
    <div>
        <h1>Welcome to the my Website!</h1>
    </div>
)

export default Home
```

## Links
Cuối cùng, website cần điều hướng giữa các trang. Nếu bạn tạo các link sử dụng `anchor elements`, khi click, toàn bộ trang sẽ phải reload lại. **React Router** cung cấp `<Link>` component để tránh điều này xảy ra. Khi click vào `<Link>`, **URL** sẽ cập nhật và render nội dung cần thiết mà không phải reload lại toàn bộ trang.

- `<Header> component`

``` javascript
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/members'>Members</Link></li>
                <li><Link to='/schedule'>Schedule</Link></li>
            </ul>
        </nav>
    </header>
)

export default Header
```

`<Link>` sử dụng prop `to` để mô tả `location` mà chúng điều hướng tới. Nó có thể là *string* hoặc *location object* (bao gồm `pathname `, `search`, `hash`, và `state`). Khi bạn truyền vào là 1 *string*, nó sẽ được convert sang *location object*.
``` javascript
<Link to={{ pathname: '/members/7' }}>Member #7</Link>
```

# Kết luận
Như vậy chúng ta đã tạo ra một SPA đơn giản với **React Router v4**, các bạn có thể tham khảo source code tại [đây](https://github.com/daothaison/react-router-app-example).