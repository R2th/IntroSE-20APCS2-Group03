### Tại sao nên sử dụng SWR?

SWR là một thư viện React Hooks dùng trong việc fetch data.

Cái tên SWR vốn có nguồn gốc từ *stale-while-revalidate*, tức là một chiến lược vô hiệu hoá cache được phổ biến bởi HTTP RFC 5861. 
Đầu tiên, SWR trả về một data từ cache (tức data cũ). Tiếp đó, gửi yêu cầu để fetch (xác nhận lại data) và cuối cùng là cập nhập lại data một lần nữa.
Vậy hãy xem SWR sẽ giải quyết được vấn đề gì.

### Auto Revalidation

Giả sử với todo app, hiện tại đang mở app todo trên hai tab. Thông thường, nếu đang add thêm todo ở tab này thì hành động này sẽ không thể nhìn thấy được ở tab còn lại. SWR thực sự sẽ giải quyết được việc này bằng cách *auto re-validating* (tự động xác nhận lại). Khi focus từ tab này và thực hiện lại hành động focus thêm lần nữa, SWR sẽ đảm bảo rằng lúc đó data đã được update lại. Hành động này được thực hiện thông qua việc gửi một request khác tới API.

### Data Mutation
Có thể yêu cầu SWR xác nhận lại data với mutation (tức sự biến đổi). Hãy xem ví dụ dưới đây, được trích từ tài liệu SWR. Nó sẽ giúp hình dung ra các nó tự động refetch lại thông tin đăng nhập khi user click vào button "Logout".

```
import useSWR, { mutate } from 'swr'

function App () {
  return (
    <div>
      <Profile />
      <button onClick={() => {
        // set the cookie as expired
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

        // tell all SWRs with this key to revalidate
        mutate('/api/user')
      }}>
        Logout
      </button>
    </div>
  )
}
```

### Real time experience (Trải nghiệm thời gian thực)

Ví dụ đưa ra là muốn tạo một app todo để add thêm các new todo. Nhưng mỗi lần add thêm một item mới, cần phải refresh lại page để cập nhập các thay đổi. Nhưng với SWR mutation, có thể cập nhập thay đổi request. Nghĩa là khi thêm một dữ liệu mới, nó sẽ tự động fetch lại các request khác rồi sau đó update trên UI.

### Request deduplication (Yêu cầu loại bỏ lặp)

Hãy xem ví dụ dưới đây:

```
function useUser() {
    return useSWR('/api/user', fetcher)
}

function Avatar() {
    const { data, error } = useUser()

    if (error) return <Error />
    if (!data) return <Spinner />

    return <img src={data.avatar_url} />
}

function App() {
    return (
        <>
            <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />
            <Avatar />
        </>
    )
}
```

Thông thường, sẽ gửi ba request giống nhau tới API. Nhưng như này lại hoàn toàn không cần thiết. Làm vậy sẽ gây tốn data đồng thời sẽ gây ra nhiều vấn đề liên quan đến rendering. SWR sẽ giải quyết vấn đề yếu cầu bị lặp này. Do gửi đồng thời nhiều request cùng lúc nên nó sẽ hiểu là chỉ gửi duy nhất một request. Khoảng thời gian mặt định bị lặp là hai giây. Nhưng ở đây có thể config lại được, do đó sẽ không bị gặp các vấn đề về rendering hay gây tốn data. Hành động này sẽ giúp trải nghiệm UX tốt hơn, đặc biệt là trên các thiết bị di động.

Hành động này có thể được áp dụng cả với Rest API và GraphQL do lúc này SWR sẽ không fetch lại data. 

### Built-in caching support 

Khi lần đầu fetch data từ API, nó sẽ lưu vào response data. Nếu gửi một request tới cùng một API thì trước tiên nó sẽ cung cấp phần dữ liệu đã lưu từ trước ngay trong khi đang cập nhập lại data.  Vì thế sẽ không cần phải hiển thị lại trạng thái loading cho phía user.

### Reusable code (tái sử dụng code)

Bản thân SWR là một hook. Do đó có thể tuỳ ý custom hook từ hooks. Nó cho phép viết code không bị lặp. Giả sử khi fetch data từ API */users* chẳng hạn, mỗi lần muốn fetch data thì cần phải truyền qua truyền lại giữa các functions. Nhưng nếu custom hook thì sẽ không cần phải truyền qua truyền lại nhiều như vậy nữa.

```
function App() {
    const { data, error, isValidating } = useSWR('/users', fetcher)
    return <>.... </>
}

// instead
function useUser() {
    return useSWR('/users', fetcher)
}

function App() {
    const { data, error, isValidating } = useUser()
    return <>.... </>
}
```

### Super flexible (Vô cùng linh hoạt)

Có thể config cài đặt SWR như nào theo mong muốn hoặc sử dụng cấu hình chung. Vấn đề này có thể tìm hiểu qua tài liệu về SWR.