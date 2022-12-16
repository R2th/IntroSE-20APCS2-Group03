Trong quá trình code bất kỳ dự án nào trong React, chúng ta thường xử lý các điều kiện hoặc truyền các giá trị, function đến các component con,.. Những nếu có bất kỳ điều gì không mong muốn xảy ra với giá trị, function hoặc runtime error, hầu hết bạn sẽ thấy màn hình trắng của Death! 

Lỗi runtime error hoặc màn hình lỗi trắng nên được xử lý một cách khéo léo và React Error Boundary trở nên hữu ích trong những trường hợp này. React đã thêm error boundaries để catch các javascript error và xử lý chúng một cách hiệu quả. Theo tài liệu react, Error boundaries là các React components bắt lỗi javascript ở bất kỳ đâu trong child component, log lại các lỗi đó và hiển thị giao diện người dùng dự phòng thay vì hiện component bị lỗi đó. Hiện tại, react boundaries chỉ support cho các class components, do đó, trong khi sử dụng React với Hook, đây có thể là class component duy nhất bạn cần.

Bây giờ ta sẽ thực hành luôn nha :D
Trước tiên, hãy tạo một class component và sử dụng nó làm error boundary. Như sau:

```
class ErrorBoundary extends Component {
    state = {
        error: null,
    };
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        const { error } = this.state;

        if (error) {
            return (
                <div>
                    <p>Seems like an error occured!</p>
                    <p>{error.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
```

Ở đoạn code trên, bạn sẽ thấy phương thức static `getDerivedStateFromError(error)`. 
Phương thức này sẽ biến class component `ErrorBoundary` thành một component thực sự xử lý lỗi.

Ở đây, chúng ta đang bắt lỗi trong phương thức `getDerivedStateFromError` và setting nó dạng state. Nếu lỗi xuất hienj, ta in nó ra còn nếu không có lỗi gì thì return về element ban đầu.

Bây giờ, hãy xem chúng ta có thể sử dụng error boundary ở đâu nhé!
Ví dụ, ta lấy list danh sách users được fetched từ API. Trông như sau:

```
const Users = ({ userData, handleMoreDetails }) => {
    return (
        <div>
            <h1>Users List: </h1>

            <ul>
                {userData.map((user) => (
                    <div key={user.id}>
                        <p>Name: {user.name}</p>
                        <p>Company: {user.company}</p>
                        <button onClick={() => handleMoreDetails(user.id)}>
                            More details
                        </button>
                    </div>
                ))}
            </ul>
        </div>
    );
};
```

User component trên sẽ hoạt động hoàn toàn tốt cho đến khi nó nhận được userData. Nhưng nếu vì một lý do nào đó, userData không được xác định: undefined hoặc null, ứng dụng của chúng ta sẽ "toang"! :D Vì vậy, bây giờ, hãy thêm error boundary vào component. Do đó, code sẽ được cập nhật trông như thế này -

```
const Users = ({ userData, handleMoreDetails }) => {
    return (
        <div>
            <h1>Users List: </h1>
            <ErrorBoundary>
                <ul>
                    {userData.map((user) => (
                        <div key={user.id}>
                            <p>Name: {user.name}</p>
                            <p>Company: {user.company}</p>
                            <button onClick={() => handleMoreDetails(user.id)}>
                                More details
                            </button>
                        </div>
                    ))}
                </ul>
            </ErrorBoundary>
        </div>
    );
};
```

Ở đây, khi lỗi xảy ra, ErrorBoundary component của chúng ta sẽ bắt được điều đó và thông báo lỗi sẽ được in ra màn hình. Điều này sẽ cứu ứng dụng khỏi bị "toang" và người dùng cũng sẽ hiểu được hệ thống đang bị lỗi gì.

Điểm quan trọng cần xem xét ở đây là nơi chúng ta đã sử dụng error boundary. Error boundary sẽ hiển thị lỗi thay vì component. Vì vậy, chúng ta luôn cần chắc chắn rằng chúng ta muốn đặt lỗi đó ở đâu. Trong ví dụ trên, ta chắc chắn muốn hiển thị tiêu đề của trang và các chi tiết khác. Bạn chỉ muốn thay thế thành phần xảy ra lỗi và trong trường hợp này, nó chỉ là phần tử ul. Do đó, bạn chỉ gói phần tử ul bên trong error boundary chứ không phải toàn bộ component.

Đến đây, bạn đã hiểu error boundar là gì và cách sử dụng nó. Nhưng hiển thị dự phòng của error boundaries (nơi lỗi được hiển thị) không thể sử dụng được và có thể được cải thiện. Cách ta hiển thị lỗi và các components dự phòng sẽ khác nhau đối với các trường hợp khác nhau trong một ứng dụng. Vì vậy, ta sẽ cần làm cho Error Boundary component chung chung hơn để tất cả các giao diện dự phòng này có thể được sử dụng.

Đối với điều này, ta sẽ tạo một ErrorComponent hỗ trợ trong error boundary và trả về element được chuyển đến prop này bất cứ khi nào lỗi xảy ra. Đây là ví dụ tổng kết của cả hai components: ErrorBoundary và User

```
// User Component 

const Users = ({ userData, handleMoreDetails }) => {
    const ErrorMsg = (error) => {
        return (
            <div>
                {/* You can use your own styling and methods of handling error */}
                <p>Something went wrong!</p>
                <p>{error.message}</p>
            </div>
        );
    };

    return (
        <div>
            <h1>Users List: </h1>
            <ErrorBoundary ErrorComponent={ErrorMsg}>
                <ul>
                    {userData.map((user) => (
                        <div key={user.id}>
                            <p>Name: {user.name}</p>
                            <p>Company: {user.company}</p>
                            <button onClick={() => handleMoreDetails(user.id)}>
                                More details
                            </button>
                        </div>
                    ))}
                </ul>
            </ErrorBoundary>
        </div>
    );
};
```

```
// ErrorBoundary Component
class ErrorBoundary extends Component {
    state = {
        error: null,
    };
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        const { error } = this.state;

        if (error) {
            return <this.props.ErrorComponent error={error} />;
        }
        return this.props.children;
    }
}
```

Bạn có thể pass key props đến error boundary của bạn, nếu bạn cần sử dụng nó nhiều lần trong một component duy nhất. Thao tác này sẽ  loại bỏ trạng thái lỗi trước đó khỏi error boundary và sẽ hiển thị element chính xác trong mọi render.

Error boundary là một trong những tính năng thực sự hay mà React có và mình thấy nó tương đối ít được sử dụng hơn. Nhưng sử dụng điều này trong code của bạn chắc chắn sẽ giúp bạn thoát khỏi những pha khó xử với một lỗi không mong muốn. Và ai mà không muốn xử lý lỗi tốt hơn :D.

Trong trường hợp bạn không muốn viết error boundary component, thì có một pakage hỗ trợ việc này :v. Đó là [react-error-boundary](https://github.com/bvaughn/react-error-boundary#readme)
  
  
Trên đây là bài chia sẻ về cách handle error không mong muốn trong React, hy vọng sẽ giúp ích bạn trong quá trình code. Bài viết được mình tham khảo từ [bài](https://dev.to/ms_yogii/handle-errors-gracefully-with-react-error-boundary-25mb) của tác giả Yogini Bende.