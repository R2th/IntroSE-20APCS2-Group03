Giả sử bạn cần giải một bài toán [**35. Search Insert Position**](https://leetcode.com/problems/search-insert-position/), tìm giá trị index của target trong một mảng được sắp xếp theo thứ tự tăng dần, nếu không có thì trả về giá trị index cần chèn target vào.

Sau khi tìm hiểu về binary search, bạn đưa ra một đoạn mã sau:

```js
function searchInsert(nums, target) {
    let l = 0, r = nums.length - 1;
    while(l < r) {
        let m = l + (r - l) % 2;
        if (nums[m] == target) {
            return m;
        }
        if (nums[m] < target) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return l  
};
```

Giả sử mảng được truyền vào là `[1,3,5,6]` và target là `5`, gọi `searchInsert([1,3,5,6], 5)` trả về kết quả là `2` , là giá trị index đúng của `5`

Tuy nhiên, cũng với mảng trên, target là `2` , tức gọi `searchInsert([1,3,5,6], 2)`, trả về `0` là sai. Kết quả mong đợi là `1`.

**Vậy làm sao để debug đoạn mã trên?**

Giới thiệu đến bạn một công cụ Visualize Code Running có tên là [pythontutor.com](http://pythontutor.com/) giúp bạn xem được từng bước được mô tả một cách trực quan. Dù là pythontutor nhưng công cụ này hỗ trợ nhiều loại ngôn ngữ như Python, JavaScript, C, C++, and Java.

Bạn vào trang [pythontutor.com](http://pythontutor.com/) sau đó chọn **Start writing** and **visualizing code now** và chọn ngôn ngữ muốn viết.

Ở đây mình chọn **JavaScript** và copy/paste đoạn mã trên vào. Lưu ý là nhớ gọi `searchInsert([1,3,5,6], 2)` để hàm có thể thực thi nhé.

Tiếp theo nhấn nút **Visualize Execution** để bắt đầu xem code thực thi ra sao. Bấm **Next** để di chuyển đến bước tiếp theo.

Hình minh họa:

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/08/visual-1.png)

Nửa màn hình bên trái chứa code, các nút bấm để di chuyển đến bước tiếp theo **Next**, bước trước đó **Prev**, bước cuối cùng **Last** và bước đầu tiên **First**

– Mũi tên xanh lá câu nhạt chỉ dòng vừa mới thực thi

– Mũi tên đỏ chỉ dòng sẽ thực thi tiếp theo

Nửa màn hình bên phải là visualize code thực thi

– `Global Frame` chứa hàm `searchInsert`

– Khung màu xanh nhạt chứa các thông tin khi gọi hàm`searchInsert` như `nums, target, l, r, m`

– Từ nums có mũi tên trỏ xuống mảng màu vàng chính là giá trị của danh sách `nums`

Sau khi quan sát từng bước thì mình phát hiện bước này có giá trị `l` và `r` đều là `0` dẫn đến thoát khỏi vòng lặp

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/08/visual-2.png)

Và giá trị trả về là `l`, tức `0`

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/08/visual-3.png)

Vậy vấn đề ở đây là nếu `l` và `r` đều có giá trị bằng nhau thì vẫn cần nằm trong vòng lặp `while` để có thể xác định vị trí của `l` là `m+1` nếu giá trị này nhỏ hơn target.

Cập nhật điều kiện `while (l <= r)` và thử lại ta thấy `l` ở dòng 9 sẽ bằng `m+1` tức 0+1 là 1

![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/08/visual-4.png)

Khi đó `l` là `1` không nhỏ hơn `r` là `0` nên thoát ra khỏi vòng lặp và trả về `1` là kết quả đúng.

---

Trên đây là một ví dụ cụ thể về cách bạn có thể sử dụng pythontutor để debug một đoạn logic và xem từng bước chạy như thế nào.

Thay vì đi `console.log` mọi nơi thì cách này xịn xò hơn hẳn phải không?

Lại chúc mọi người debug vui vẻ và giải thêm được nhiều bài toán thú vị nhé.

[Bài viết gốc](https://beautyoncode.com/truc-quan-hoa-khi-chay-ma-chuong-trinh/) nằm ở blog cá nhân của mình, mời bạn ghé chơi.

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!