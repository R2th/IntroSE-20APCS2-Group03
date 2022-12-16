### 1. UseCallback() là gì?

Khái niệm: Là một react hooks giúp mình tạo ra một memoized callback và chỉ tạo ra callback mới khi
dependencies thay đổi.

*  Nhận vào 2 tham số: 1 là function, 2 là dependencies.
*  Return memoized callback.
*  Chỉ tạo ra function mới khi dependencies thay đổi.
*  Nếu dùng empty dependencies thì không bao giờ tạo ra function mới.

  ![](https://images.viblo.asia/c3b95c0c-d702-4c44-b720-64449a1b8378.png)

 
### 2. UseMemo() là gì?

Khái niệm: Là một react hooks giúp mình tạo ra một memoized value và chỉ tính toán ra value mới khi
dependencies thay đổi.

*   Nhận vào 2 tham số: 1 là function, 2 là dependencies.
*   Return memoized value
*   Chỉ tính toán value mới khi dependencies thay đổi.
*   Nếu dùng empty dependencies thì không bao giờ tính toán lại value mới.

![](https://images.viblo.asia/eef0197e-17d3-4bcd-a32c-5316a10ed77f.png)

### 3. So sánh useCallback() vs useMemo().

Giống nhau:
* Đều áp dụng kĩ thuật memoization.
* Đều nhận vào 2 tham số: function và dependencies.
* Đều là react hooks, dùng cho functional component.
* Dùng để hạn chế những lần re-render dư thừa (micro improvements).

- KHÁC NHAU

     ![](https://images.viblo.asia/31e5306a-ef94-408c-a6a7-9c685d930fa9.png)

### 4. Có nên sử dụng useCallback() vs useMemo() hay không?

+ Không nên dùng cho tất cả components.
+ Nên dùng cho: đồ thị, biểu đồ, animations, những component nặng phần render.
+ Chỉ là micro improvements.

    EX: https://codesandbox.io/s/bitter-platform-sklqi?file=/src/App.js

Nguồn tham khảo: https://www.ezfrontend.com/