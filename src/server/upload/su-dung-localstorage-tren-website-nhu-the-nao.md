### 1. Vì sao chúng ta cần localStorage
Nói đến HTTP, nó là dạng kết nối stateless, nghĩa là khi đóng một ứng dụng web, lần truy cập sau mọi thứ bị reset lại như ban đầu.

`localStorage` đơn giản là nó giúp dev chúng ta lưu lại một vài thông tin ở phía trình duyệt của user, để lần sau truy cập ta có thể truy xuất các thông tin này.

### 2. Cookie không đủ xài
Cookie là một dạng file text lưu trên máy tính của user, link đến từng domain. Một vài giới hạn của cookie

Tất cả request đến domain, đều sẽ nhét cái cookie này vào trên header

Tối đa có 4KB dung lượng

### 3. Sử dụng localStorage trên trình duyệt hỗ trợ HTML5
Cú pháp để set, get, delete giá trị của `localStorage`
```js
// set
localStorage.setItem(‘name’, ’truongnhi’);
```
```js
// get
Var tentui = localStorage.setItem(‘name’);
// -> truongnhi
```
```js
// delete
localStorage.removeItem(‘name’);
```
### 4.Làm việc trên object
Vì khi lưu chúng ta chỉ có thể đưa string vào trong localStorage, để đưa một object

Làm việc trên object
```js
Var user = {
	Name: ‘Nhi’,
	Age: ‘16’,
	Gender: ‘x’
}
localStorage.setItem(‘user’, JSON.stringify(user));
Console.log(JSON.parse(localStorage.getItem(‘user’));
```
### 4. Thông tin lưu xuống localStorage
Để cache những dữ liệu lớn, tốn thời gian để load.

Lưu lại trạng thái của giao diện user đã custom, có thể lưu cả một đoạn HTML xuống localStorage

Đọc thêm Lưu token ở đâu? để so sánh với sessionStorage và cookie

-----
source: https://www.smashingmagazine.com/2010/10/local-storage-and-how-to-use-it/