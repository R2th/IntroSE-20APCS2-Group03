# Tại sao useEffect lại được gọi 2 lần trong ReactJS
## Đây là câu hỏi tôi đã tìm kiếm một thời gian không thấy thông tin hôm nay tình cờ đọc được thông tin nên tôi chia sẻ cho ace nào cũng tìm kiếm giống tôi
### 1. Trường hợp sử dụng
- Chúng ta nếu đã quen thuộc với ReactJS thì gọi API trong useEffect như sau:
```
useEffect(()=>{
  api.post("/view",{})
},[])
```
- Nhưng khi kiểm tra trong trong network thì bạn sẽ thấy API này được gọi 2 lần. Vậy nguyên nhân ở đâu?
### 2. Giải thích
- Nguyên nhân chính xác là do Strict mode trong  **Development mode** còn khi đã build bạn sẽ không gặp phải lỗi này nữa.
```
  ReactDOM.render(
     <React.StrictMode>
       {app}
     </React.StrictMode>,
    document.getElementById('root')
  );
```
### 3. Lý do
- Trong DEV mode thì đây chỉ là quá trình giúp bạn kiểm tra các lỗi có thể phát sinh trong quá trình gọi API kịp thời đưa ra các cảnh báo nếu có thể.
- Khi ở product mode bạn sẽ ko gặp phải vấn đề này nữa🤚👋
### 4. Cách khắc phục
- Tắt StrictMode

![](https://images.viblo.asia/d9e7d87d-46e6-430b-96b9-264572c37d74.png)

- Sử dụng hook useRef custom lại useEffect như sau. Bạn sẽ có 1 hook usEffectOnce trong DEV mode.
```
export default function useEffectOnce(fn: () => void) {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) {
      fn();
    }
    return () => {
      ref.current = true;
    };
  }, [fn]);
}
```
#### 5. Phương án khác khi gọi API
- Như các bạn đã biết, useEffect sẽ được chạy khi toàn bộ trang hoặc commponent được render hoàn toàn. Vì vậy khi chúng ta đặt API bên trong nó, API sẽ phải chờ 1 khoảng thời gian trước khi được chạy. Điều này không tối ưu.
Phương án: bạn có thể sử dụng **useQuery** hook để chạy song song 2 phần này.
Ví dụ:
```
const { status, data, error, isFetching } = useQuery(
  ['data'],
  async () => {
    const data = await (
      await fetch(`${API_BASE_URL}/data`)
    ).json()
    return data
  }
)
```