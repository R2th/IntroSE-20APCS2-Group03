# React Hook API (useEffect vs useLayoutEffect)
Cả 2 có cách viết tương tự nhau và được sử dụng để xử lý effect. Vậy điểm khác nhau ở đây là gì ?
Điểm khác nhau ở đây là cách mà chúng hoạt động.

```js
    useEffect(() => {
        // làm gì đó
        return () => {
            // clean up
        }
    }, [])
    
    useLayoutEffect(() => {
        // làm gì đó
        return () => {
            // clean up
        }
    }, [])
```

Đa phần chúng ta dùng useEffect mình cũng vậy. Và 1 hôm đẹp trời mình nhận thấy khi dùng useEffect để set data ban đầu thay cho `componentDidMount` trong `class component` thì thấy hiện tượng nhấp nháy nhẹ khá khó chịu.

[Bạn có thể xem demo ở đây](https://gk1gd.csb.app/)

## useEffect
Khi chuyển từ `class component` sang `function component` thì sẽ phải đụng đến React Hook. `useEffect` thay thế cho `componentDidMount`, `componentWillUpdate`, `componentWillUnMount`, và thường được dùng để `fetching data` kết quả sẽ không thay đổi ngay lập tức.

`useEffect` sẽ được chạy sau khi **render component**. Ở ví dụ trên khi ta click vào `button` để thay đổi giá trị thì component sẽ render lại, trả về UI, sau đó mới chạy useEffect, trong useEffect ta lại thay đổi giá trị của `state` nên `react` sẽ render lại lần nữa để vẽ lại UI.

Trình tự thực hiện như sau:
1. Bạn sẽ gây ra 1 event (thay đổi state/props, re-render từ component cha,...)
2. Render component.
3. Màn hình UI được cập nhật.
4. Chạy useEffect.

Trong trường hợp này ta nên dùng `useLayoutEffect`

## useLayoutEffect
Nếu bạn thấy hiện tượng giật, sử dụng để đo vị trí trong DOM (đo vị trí của element,...) hãy thử dùng `useLayoutEffect`. Nó cũng giống useEffect nhưng khác cách chạy. `useLayoutEffect` sẽ chạy trước khi cập nhật lại UI.

Trình tự thực hiện như sau:
1. Bạn sẽ gây ra 1 event (thay đổi state/props, re-render từ component cha,...)
2. Render component.
3. Chạy useLayoutEffect, và react sẽ đợi đến khi nào nó hoàn thành.
4. Màn hình UI được cập nhật.

Sửa lại dùng `useLayoutEffect` sẽ có kết quả như sau:

[Đây là kết quả ta mong chờ.](https://jry5n.csb.app/)

## Tổng kết
- **useEffect**: Sẽ là lựa chọn đúng, giúp việc tối ưu tốc độ chạy khỏi phải chờ đợi gì thường được dùng để `fetching data`. 

- **useLayoutEffect**: Nhưng nếu bạn muốn xử lý đồng bộ với UI thì hãy dùng `useLayoutEffect`

Tài liệu tham khảo:

https://kentcdodds.com/blog/useeffect-vs-uselayouteffect

https://kentcdodds.com/blog/useeffect-vs-uselayouteffect