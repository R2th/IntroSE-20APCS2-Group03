Bài viết được dịch từ nguồn: https://hackernoon.com/whats-the-right-way-to-fetch-data-in-react-hooks-a-deep-dive-2jc13230

Các tài liệu React Hook có mục FAQ: Làm thế nào tôi có thể fetch dữ liệu với Hook? Tuy nhiên, có một thiếu sót trong cách tiếp cận đó ảnh hưởng đến tính chính xác là một số tình huống quan trọng.

Theo như tôi có thể nói, đó là một mô tả có sẵn rộng rãi về một giải pháp mạnh mẽ hơn. Có sắc thái trong việc làm cho nó hoàn toàn đúng vì vậy có vẻ đáng để lấp đầy khoảng trống này.

Bạn cần một cái gì đó như `getDerivingStateFromProps`   từ `class component`. Sử dụng `useDerivingState ()`  `hook` tùy chỉnh được cung cấp dưới đây.

## Data fetching means we probably need to keep state in sync with props.

Xem xét một thành phần fetch data từ máy chủ để hiển thị cho người dùng hoặc hành động tiếp theo. Bạn có thể muốn lưu trữ kết quả của việc tìm nạp dữ liệu vào state trong component và request đến server có thể phụ thuộc vào một số prop được truyền cho thành phần.

Điều này có nghĩa là khi prop thay đổi, chúng ta phải cập nhật state chính xác. Đó là, chúng ta cần giữ state đồng bộ với props.

Ví dụ: hãy xem xét một ứng dụng xã hội nơi người dùng có danh sách bạn bè. Bạn đang xây dựng một component  `friendList`  hiển thị tên người dùng cùng với danh sách bạn bè của anh ấy / cô ấy.

Component này được truyền vào người dùng hiện tại dưới dạng prop và phải tìm nạp danh sách bạn bè từ máy chủ, được lưu trữ ở state. Khi người dùng thay đổi, danh sách bạn bè cần được tìm nạp lại từ máy chủ.

`Keeping state in sync with props though useEffect() is problematic.`


Cách tiếp cận được thực hiện bởi `useEffect ()`  để đồng bộ hóa state với prop. Đây là một code thực hiện `friendList`  sử dụng phương pháp này.

```
type User = {name: String; id: string}
type State = {loading: true} | {loading: false; friends: User[]}

function FriendList(user: User) {
    const [state, setState] = React.useState<State>({loading: true})

    React.useEffect(() => {
        setState({loading: true})
        serverCallToGetFriendList(user, friends =>
            setState({loading: false, friends})
        )
    }, [user])

    return (
        <>
            <h1>{user.name}, your friends are:</h1>
            {state.loading ? (
                'Loading...'
            ) : (
                <ul> {state.friends.map(friend => ( <li> {friend.name} </li> ))} </ul>
            )}
        </>
    )
}
```

Khi người dùng thay đổi, `useEffect ()`  được kích hoạt, cập nhật trạng thái `{loading: true}`  và thực hiện request đến máy chủ. Khi  response máy chủ trả về state được cập nhật thành `{loading: false, friends}`

Cách tiếp cận này có một vấn đề. Các hiệu ứng chỉ được chạy sau khi kết xuất toàn bộ cây thành phần và sau khi trình duyệt hoàn thành render và sau khi các hiệu ứng của các thành phần con được chạy. Điều này có nghĩa là khi prop thay đổi, trạng thái không đồng bộ cho tất cả các hoạt động này.

Vấn đề nhỏ hơn ở đây, có thể được chấp nhận trong một số trường hợp, đó là trình duyệt sẽ thực sự hiển thị ngắn gọn dữ liệu đồng bộ hóa với người dùng. Trong ví dụ của chúng tôi, trình duyệt có thể hiển thị ngắn gọn những người bạn trước đó là bạn bè của người dùng trước khi thuộc về người dùng mới trước khi cập nhật.

Nhưng có một vấn đề lớn hơn. Cho rằng kết xuất được hoàn thành với dữ liệu đồng bộ, các thành phần con được truyền prop và trạng thái sẽ thấy hết dữ liệu đồng bộ. Họ có thể có các hiệu ứng theo lịch trình dựa trên dữ liệu xấu đó.

Những hiệu ứng này sẽ chạy trước khi state được sửa và có khả năng sẽ tạo ra bad issue.

Các thành phần con cũng có thể đã thiết lập các request lại sẽ giữ dữ liệu sai trong các lần đóng của chúng và nếu được kích hoạt trước khi hiệu ứng được chạy, có thể cũng sẽ làm điều gì đó.

Dữ liệu không đồng bộ sẽ không hiển thị với các thành phần con. Nó làm cho lý do về chương trình khó khăn hơn nhiều khi bạn có dữ liệu khác.

`useLayoutEffect() won’t solve the problem.`

Vì vấn đề với việc sử dụng `useEffect ()`   để đồng bộ hóa trạng thái là nó chạy quá muộn, chúng tôi có thể xem xét `useLayoutEffect ()`  mà chạy sớm hơn. `useLayoutEffect ()`  đảm bảo rằng hiệu ứng được chạy trước khi trình duyệt render. Điều này tốt hơn. Dữ liệu sai được truyền cho các thành phần con, nhưng sẽ được sửa trước khi render, do đó người dùng không nhìn thấy.

Nhưng những gì về hiệu ứng theo lịch trình của child dựa trên dữ liệu sai? Đây là một phần khó khăn trong ngữ nghĩa của `useLayoutEffect ()`. Hóa ra nếu bạn gọi `setState ()`  phía trong `useLayoutEffect ()`  nó buộc các hiệu ứng chạy trước khi trạng thái được cập nhật và trước khi render. (Lưu ý, đây là mặt trái của những gì xảy ra bình thường. Thông thường các hiệu ứng chạy sau khi render.)

Vì thế `useLayoutEffect ()`  không phải là một giải pháp thỏa đáng.

## Changing the key works, but it is a blunt tool.

Một giải pháp có lẽ không rõ ràng cho vấn đề giữ state đồng bộ với props là chỉ cần dùng React để xóa underlying íntance (và do đó là trạng thái) của thành phần và tạo state mới khi thay đổi prop. Chúng ta có thể làm điều này bằng cách thay đổi key của thành phần React bất cứ khi nào prop thay đổi. Trong ví dụ của chúng tôi, chúng tôi có thể đặt key của `friendList`  thành phần để tên người dùng. Điều này có hiệu quả làm cho prop không đổi trong suốt vòng đời của cá thể thành phần, vì vậy chúng ta không bao giờ phải lo lắng về việc nó thay đổi.

Những công việc này. Các thành phần con không bao giờ được kết xuất với dữ liệu sai. Nhưng nó là một công cụ không tốt lắm. Bạn sẽ mất tất state từ ví dụ.

## Call setState() directly during render.

Chúng ta hãy lùi lại và xem xét những gì chúng ta đang cố gắng làm. Chúng tôi đang cố gắng để giữ state đồng bộ với props. Có một method để làm điều này là `getDerivingStateFromProps`. Chúng ta phải thực hiện một cái gì đó tương tự trong hook. Có một mục FAQ giải quyết chính xác điều này. Gợi ý là gọi `setState ()`  trực tiếp trong khi kết xuất khi phát hiện thay đổi prop để giữ chúng đồng bộ. Call `setState ()`trong quá trình kết xuất có các ngữ nghĩa sau:

Bạn có thể cập nhật state ngay trong khi kết xuất. React sẽ chạy lại thành phần với state được cập nhật ngay lập tức sau khi thoát kết xuất đầu tiên để nó không tốn bộ nhớ.

Chìa khóa cho điều này là kết xuất sẽ chạy lại ngay lập tức. Đặc biệt, trước khi bất kỳ thành phần con nào kết xuất, vì vậy các thành phần con không bao giờ thấy trạng thái đồng bộ hóa. Áp dụng điều này cho `friendList`  chúng tôi có những điều sau đây:

```
type User = {name: String; id: string}
type State = {loading: true} | {loading: false; friends: User[]}

function FriendList(user: User) {
    const [state, setState] = React.useState<State>({loading: true})

    // Save a local copy of the prop so we know when it changes.
    const [localUser, setLocalUser] = React.useState(user)

    // When the prop changes, update the local copy and the state that needs.
    // to be in sync with the prop.
    if (user !== localUser) {
        setLocalUser(user)
        setState({loading: true})
    }

    React.useEffect(() => {
        if(!state.loading) return
        serverCallToGetFriendList(user, friends =>
            setState({loading: false, friends})
        )
    }, [user, state])

    return (
        <>
            <h1>{user.name}, your friends are:</h1>
            {state.loading ? (
                'Loading...'
            ) : (
                <ul> {state.friends.map(friend => ( <li> {friend.name} </li> ))} </ul>
            )}
        </>
    )
}
```

Chúng tôi giữ một bản sao của prop để kiểm tra các thay đổi. Khi phát hiện thay đổi, chúng tôi cập nhật bản sao và state để giữ cho nó đồng bộ với prop. Bây giờ khi prop thay đổi state được cập nhật ngay sau khi kết xuất hoàn thành và kết xuất lại chạy với state được cập nhật.
Các thành phần con không bao giờ nhìn thấy dữ liệu sai. Lưu ý rằng chúng ta vẫn có `useEffect ()` , nhưng nó chỉ được sử dụng để thực hiện request máy chủ và không cập nhật state thay đổi prop.

Tuy nhiên, lưu ý rằng kể từ khi `setState ()`  không đồng bộ, state chỉ được cố định sau khi hàm trả về. Điều này có nghĩa là bạn vẫn phải xử lý trạng thái không đồng bộ cho phần còn lại của chức năng. Điều gì nếu bạn lên lịch hiệu ứng cục bộ dựa trên dữ liệu sai? Chúng ta có phải cẩn thận về điều đó? Hóa ra chúng tôi không. 

Không có tài liệu chính thức, nhưng thử nghiệm cho thấy các hiệu ứng được lên lịch trong quá trình kết xuất sẽ bị loại bỏ nếu `setState ()`  được gọi trong quá trình kết xuất đó. Nó cũng không được tính là được chạy cho các tính toán thay đổi danh sách phụ thuộc.

Chúng tôi thực sự có thể làm tốt hơn nữa và không phải lo lắng về state đồng bộ hóa ngay cả bên trong chức năng kết xuất.

`useDerivedState()`

Đây là code cho một hook tùy chỉnh `useDerivingState()`:

```
export function useDerivedState<State>(
    onDepChange: () => State,
    depList: any[]
): [State, (newState: State | ((state: State) => State)) => void] {
    const [localState, setLocalState] = React.useState<
        | {init: false}
        | {
              init: true
              publicState: State
              depList: any[]
          }
    >({init: false})

    let currPublicState: State
    if (
        !localState.init ||
        depList.length !== localState.depList.length ||
        !localState.depList.every((x, i) => depList[i] === x)
    ) {
        currPublicState = onDepChange()
        setLocalState({
            init: true,
            publicState: currPublicState,
            depList
        })
    } else {
        currPublicState = localState.publicState
    }

    const publicSetState = React.useCallback(
        (newState: State | ((state: State) => State)) => {
            setLocalState(localState => {
                if (!localState.init) throw new Error()
                const publicState =
                    typeof newState === 'function'
                        ? (newState as any)(localState.publicState)
                        : newState
                return {...localState, publicState}
            })
        },
        []
    )
    return [currPublicState, publicSetState]
}
```

`useDerivingState ()`  được dự định sẽ được sử dụng tương tự như `useState ()`. Nó trả về một [state, setState]  tuple giống như `setState ()`. Sự khác biệt là thay vì lấy trạng thái ban đầu như `setState ()` , `useDerivingState ()`  có một chức năng để tạo trạng thái và một danh sách phụ thuộc. Bất cứ khi nào bất cứ điều gì trong danh sách phụ thuộc thay đổi `useDerivingState ()`  tính toán lại trạng thái từ hàm và trả về trạng thái mới một cách đồng bộ. `friendList`  bây giờ trở thành:

```
function FriendList(user: User) {
    const [state, setState] = useDerivedState<State>(() => {
        return {loading: true}
    }, [user])

    React.useEffect(() => {
        if(!state.loading) return
        serverCallToGetFriendList(user, friends =>
            setState({loading: false, friends})
        )
    }, [state, user])

    return (
        <>
            <h1>{user.name}, your friends are:</h1>
            {state.loading ? (
                'Loading...'
            ) : (
                <ul> {state.friends.map(friend => ( <li> {friend.name} </li> ))} </ul>
            )}
        </>
    )
}
```

Bất cứ khi nào người dùng  thay đổi prop, state được thiết lập lại `{loading: true}`.

Điều đó hy vọng mang đến cho bạn một cách thành ngữ mới để tìm nạp dữ liệu trong hook và nói chung hơn là giữ state đồng bộ với props. Thật không may là các tài liệu chính thức không cung cấp nhiều hỗ trợ hơn cho việc này và trên thực tế cho thấy sử dụng `useEffect ()` có thể dẫn đến các lỗi nghiêm trọng. Kỳ lạ thay, các tài liệu chủ động ngăn cản cách tiếp cận đúng bằng cách đi xa để nói về việc gọi `setState ()` trực tiếp trong khi kết xuất. Như chúng ta có thể thấy, cần có cách tiếp cận chính xác để tìm nạp dữ liệu, đây là trường hợp sử dụng khá phổ biến nếu có.

Cảm ơn và hi vọng bài viết có ích cho công việc của bạn.