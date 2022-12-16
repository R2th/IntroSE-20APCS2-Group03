Dự án dùng `React boilerplate` thì các bạn đã quá quen thuộc với `action`, `reducer`, `saga`, `container`, `component`. Và việc dùng các lifecycel `componentWillMount` hoặc `componentDidUpdate` để `fetch` dữ liệu từ server không quá mới lạ, hầu như bất container nào cũng đều sử dụng cách phổ thông này.

Bạn hình dung trong dự án dùng `React boilerplate` mà khách hàng không cho dùng `lifecycel` để `fetch` dự liệu thì  người nông dân phải làm sao?

Cái khó nó ló cái khôn, mình sẽ bày cho các bạn 2 cách rất đơn giản

Cách 1: dùng 1 một flag mình tạm gọi là `init` cái gì đó giả sử là `initRoom` chả hạn để lưu trạng trái của việc `fetch` dữ  liệu mặc định là `false`

Trong container ta sẽ check `initRoom` nếu mà là false thì fetch dữ liệu 

```
 if (!initRoom) {
   getRooms();
 }
```

Khi get room thành công ta chỉ việc gán lại `initRoom = true` để đánh giấu `Rooms` đã được load. 

Bằng việc tạo ra 1 flag đánh dấu `initRoom` mà chúng ta đã có thể không cần dùng đến lifecycel của `React` là `componentWillMount` or `componentDidUpdate` vẫn `fetch` được dữ liệu từ server.

Đơn giản quá phải không các chế, nhưng chớ vội mừng sớm có vấn đề ở đây. Vấn đề là gì thì chúng ta tiếp tục phân tích tiếp.

Một single page gọi là single page thực chất vẫn có nhiều nội dung các menu khác nhau, và khi chuyển `route` sang một nội dung khác thì cái `initRoom` vẫn nằm đó và đã là `true`. Và một điều đáng buồn là khi ta vào `route` đó nội dung không được load lại :scream: wtf, đấy vấn đề đấy.

Vấn đề này to đùng phải không? để giải quyết bài toán này không phải là không có cách trong `react boilerplate` mỗi khi change `route` đều dispatch một action `LOCATION_CHANGE`  và nó chính là chìa khóa giải quyết vấn đề. 

Rất đơn giản là bất kỳ khi nào `LOCATION_CHANGE` trong `reducer` ta sẽ reset lại `state` và ban đầu dạng `initialState`

```
 case LOCATION_CHANGE: {
      draftState = initialState;
      break;
    }
```

Cũng đơn giản phải không các bạn :heart_eyes::heart_eyes::heart_eyes:

Cách 2: Đây là cách perfect hơn đó là không cần đền một `flag` nào, nghe có vẻ huyền bí nhỉ? không có `flag` khi nào biết load được dữ liệu đây ta. 

Để làm được điều này, chúng ta cần sử dụng thêm kiến thức của thằng `redux-saga` là `fork` or `call`.

Bây giờ làm sao để fetch dữ liệ khi bắt đầu load trang thực chất là `redux-saga` sẽ `fork` lắng nghe các `action` nếu nó được assign ta xét 1 ví dụ sau

```
export function* getRooms(): Saga<void> {
  // do something here
}

export function* getRoomsWatcher(): Saga<void> {
  yield takeLatest(
    GET_ROOMS,
    getRooms,
  );
}

// All sagas to be loaded
export default function* root(): Saga<void> {
  yield all([fork(getRoomsWatcher)]);
}
```

`redux-saga` sẽ lắng nghe `action` là `GET_ROOMS` được dispatch thì sẽ gọi `getRoom`.

Đó là khi chúng ta assign `action` còn khi không assign `action` nào thì mặc định nó sẽ được gọi mỗi khi page loaded.

Đơn giản chúng ta sẽ sửa lại như sau 

```
export function* getRooms(): Saga<void> {
  // do something here
}

// All sagas to be loaded
export default function* root(): Saga<void> {
  yield all([fork(getRooms)]);
}
```

Vấn đề đã được giải quyết trong một nốt nhạc các bạn nhỉ. Nhìn chả có cái gì sai sai ở đây, thế nhưng vấn đề ở đây nằm ở chỗ khi chúng ta vào lần đầu thì dữ liệu `fetch` từ server về rất chi là đúng và chính xác.

Vấn đề chúng ta chuyển `route` khác và lúc sau ta lại vào chính `route` đó dự liệu lại không được load lại, nó lại là vấn đề lớn.

Rất may vẫn có anh `LOCATION_CHANGE` cứu vãn cuộc đời huệ, bài toán lại trở nên rất đơn giản.

Trong `Redux-saga` ta sẽ assign `action` `LOCATION_CHANGE` mỗi khi location change chúng ta sẽ check xem `route` hiện tại là gì, nếu là chính là `route` của page đó thì chỉ đơn giản gọi lại `getRoom` là xong.

Cùng xem đoạn code handle location change 

```
export function* getRooms(): Saga<void> {
  // do something here
}

export function* handleLocationChange(): Saga<void> {
  if (route === 'xyz') 
      yiel call(getRooms());
}

export function* handleLocationChangeWatcher(): Saga<void> {
 yield takeLatest(
    LOCATION_CHANGE,
    handleLocationChange,
  );
}

// All sagas to be loaded
export default function* root(): Saga<void> {
  yield all([fork(getRooms), fork(handleLocationChangeWatcher)]);
}
```


Như vậy chúng ta đã giải quyết được vấn vào page load được dữ liệu, và bài toán ra khỏi page đó rồi vào lại, cũng load lại được dữ liệu

Kết luận với 2 cách trên chúng ta có thể không cần dùng đến lifecycle của `React` mà vẫn load được dữ liệu từ trên server. Hi vọng bài viết sẽ bổ ích cho các bạn đang muốn hiểu sâu về kiến trúc của `React boilerplate` cũng như `redux-saga`. Thêm 1 solution hay cho việc không cần dùng tới `lifecylce` mà vân đảm bảo được yêu cầu bài toán là `fetch` data từ trên server.