## Giới thiệu
Filter là 1 tính năng cơ bản trong reactjs, cách thông thường là để user nhập 1 form để dev lấy thông tin mang đi call API để BE filter hoặc tự filter trên local, đám thông tin đó sẽ được lưu vào state component hoặc store.
Đây là cách làm phổ biến và nhanh, đơn giản, không cần validate thông tin do cái form nhập là của mình code ra. Tuy nhiên cách này tồn tại nhược điểm là nếu user muốn gửi list data đã filter đó cho người khác hoặc lưu lại xem sau gì đó thì cách trên không đáp ứng được.

Chúng ta sẽ có cách khác là push params filter lên url, giống như phương thức GET của form mà BE hay làm đó.
Ví dụ `https://omg/members?name=abc&age=20` - như link này đồng nghĩa với việc filter members có name = abc và age = 20.

Ưu điểm là có thể lưu lại link này để dùng, tất nhiên ngắn thế kia thì chả có tác dụng mấy nhưng hãy hình dung nó có thêm chục cái params thì ko ai muốn phải điền hơn chục field vào form filter đâu. Nhưng nhược điểm là user có thể cố tình nhập sai param, ví dụ gender chỉ có 2 options là male và female nhưng user nhập `gender=3d` là dở rồi, lúc này ta phải thêm bước validate để báo lỗi hoặc trả về list rỗng tuỳ ý.

## Triển khai
Đầu tiên thì phải code ra cái form filter đã.

onChange ta sẽ update vào store. Nên là store redux để có thể dùng lại nhanh thay vì lưu vào state ở component.

Khi submit ta sẽ convert lại values, ví dụ `name='  abc '` thì ta sẽ trim lại thành 'abc' (thông thường là thế, tuỳ spec nữa). Sau đó cần convert đám params này thành history object để có thể dùng `history.push()` params lên url
```
import { useHistory } from 'react-router-dom'
const history = useHistory()
```
Ví dụ hàm generate:
```
import qs from 'qs';

function generate(pathname, meta) { // pathname ví dụ https://omg/members
    if (isEmpty(meta)) {
        return pathname
    }
    
    const { name, ...rest } = meta
    
    return {
        pathname,
        search: `?qs.string({
            ...{ search: trim(search)},
            ...(!isEmpty(rest) && rest)
        })`
    }
}

const queryString = generate(pathname, meta)
```
qs là *query-string*, mọi người tự xem docs nó là gì nhé, nhưng nhìn code thì cũng đoán được nó convert object sang string phù hợp cho params push lên url rồi.
sau khi đã generate thì push thôi `history.push(queryString)` và url sẽ được cập nhật thành dạng `https://omg/members?name=abc&age=20`

Khi location trên thay đổi thì ta cần cập nhật lại store để dùng cho filter
```
import { useLocation } from 'react-router-dom';

const location = useLocation();

useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true }) // khi mới vào trang hoặc khi location thay đổi ta sẽ parse params thành object để lưu vào store
    dispatch(setMeta(query)); // lưu vào store
    dispatch(dispatchFilter(query)); // dispatch filter
  }, [location.search]);
```

Ok, vậy là cơ bản đã xong. Trong thực tế sẽ cần validate params url nữa tránh user nhập linh tinh phá, push lại params cho hợp lý kiểu `page=10` trong khi chỉ có 9 thì push lại thành `page=9`..., hay dùng params store để làm tính năng back hoặc gì đó. Thử làm xem sao nhé :+1: