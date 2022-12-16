Trong một số trường hợp ta cần truyền data qua nhiều tầng và viết data cần truyền đó ở mọi tầng nhưng từ React 1.16.3 có Context API mới giúp giải quyết điều đó. Dưới đây là giải thích từng bước để sử dụng react context api.

### Tạo app demo
create app với lệnh
`create-react-app react-new-context-api`

start server
`npm start`

Sửa lại `App.js` như dưới

![](https://images.viblo.asia/b027fdf1-93c1-4941-a8d9-e9645ea1c689.png)

chúng ta sẽ có được

![](https://images.viblo.asia/a5a2ed52-16b0-4407-9841-e09d6891eb58.png)

Tạo một component `Person`

![](https://images.viblo.asia/4b638083-51d1-42f6-85fa-6cc51dec2d8e.png)
sau đó khi render sẽ ra

![](https://images.viblo.asia/2819ca22-7246-487a-aed0-bea83ff752a7.png)

Tiếp đến với mong muốn sẽ truyền state của `App.js` đến component `Person`

![](https://images.viblo.asia/38d94070-862f-4cb7-a513-7f8357f992b6.png)
Kết quả trả về

![](https://images.viblo.asia/de82fb1a-1799-4de5-ad06-3cf072acdc04.png)

Tạo một const `Family` mà chứa component `Person` với sửa lại component `App` nhưng nó lại không được như mong muốn

![](https://images.viblo.asia/62a56828-3728-4859-9761-dcc929441f90.png)

![](https://images.viblo.asia/bbf066cf-fe1f-4328-bf87-d43c91ad644f.png)

Để cho nó hoạt động ở const `Family` phải cho thuộc tính name cho component `Person`

![](https://images.viblo.asia/7ca73aa3-c384-49fa-9f49-a441276d4bfa.png)

Kết quả sẽ thu được như trước

![](https://images.viblo.asia/aa7c5a11-414c-4de6-9ba9-1a97432a4bf4.png)

Đến đây chỉ giải quyết với những state chuyền 2,3 cấp còn lớn 7 hoặc 8 cấp thì sao? Nhưng ở đây sẽ có cách đó là với `react context api` cho phép inject tại bất kỳ cấp mà minh muốn.

### Giải pháp của React Context

Đầu tiền chúng ta cần provider và consumer bằng tạo mới react context.

- `const MyContext = React.createContext();`

- Tạo provider component và di chuyển state của `App.js` vào trong provider, bao `return()` của `App.js` với provider vừa tạo

![](https://images.viblo.asia/4f913fcb-4722-4d26-abb4-dfe413602234.png)

- Sau Xóa thuộc tính name truyền qua `Family`, `Person` làm sao để truy cập được data bên trong `Person`

![](https://images.viblo.asia/5d9335c7-2168-468b-884c-90fd0ca3d19c.png)

-> `MyContext.Consumer`

![](https://images.viblo.asia/b6cd822e-f5e3-4d69-b780-63d67e3ca25b.png)

Khi đó chúng ta sẽ có

![](https://images.viblo.asia/ce76096f-7be9-424a-885f-cde143528e90.png)

Tiếp đến móng muốn là lấy được các data state

- Child của `Consumer` luôn là một `function` với tham số đầu vào là biến `context`

![](https://images.viblo.asia/f42d38c5-2a59-4f0e-a9d7-883b4eeb0072.png)

![](https://images.viblo.asia/8261d068-bca8-488e-a012-2256146583b4.png)

![](https://images.viblo.asia/f5e5e805-1824-46d1-8d18-95e948ee16f9.png)


- Không chỉ truyền data nó còn có hàm để xử lý với các event.

![](https://images.viblo.asia/d5d8cd88-34cf-4ef4-b617-4d392044d838.png)

![](https://images.viblo.asia/2d6a08b1-014f-4987-ac1e-2b90fbcc6713.png)

![](https://images.viblo.asia/bb3d2061-a357-4d86-874b-45a96cb7af1b.gif)

#### Tham khảo
- [react-context](https://wesbos.com/react-context/)
- [React v16.3.0](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)
- [Code Sample](https://github.com/limkimhuor/react-context-api-16.3)