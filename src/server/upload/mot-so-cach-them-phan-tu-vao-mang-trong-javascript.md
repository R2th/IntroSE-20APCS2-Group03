**Trong bài viết này, mình sẽ trình bày một số cách thêm phần tử vào mảng trong Javascript. Sẽ có một số cách thay đổi mảng gốc, và có một số cách sẽ tạo ra một mảng mới và giữ nguyên mảng gốc. Mỗi cách sẽ phù hợp với từng trường hợp cụ thể. Bắt đầu thôi (go)**

**1. Một số cách thay đổi mảng gốc.**

* **Phương thức push**: Thêm một hay nhiều phần tử vào cuối mảng.
    
    * Thêm một phần tử:
   
   ![](https://images.viblo.asia/9b8947ed-cd2f-41c2-9f3e-337292e52531.png)

    * Thêm nhiều phần tử:

    ![](https://images.viblo.asia/5fbea96f-e93b-4b98-8d81-7433be5c1bd7.png)

    * Sử dụng `spread` trong `ES6`:

    ![](https://images.viblo.asia/464b7afb-834c-4526-b585-3280124c42d0.png)

* **Phương thức splice**: Thay đổi phần tử của mảng, dùng để thêm hoặc xóa phần tử.

    * Cú pháp:
  ```
  array.splice(startIndex, deleteCount, items).
  startIndex: Vị trí bắt đầu để thay đổi mảng. 
  deleteCount: tổng số phần tử muốn xóa.
  items: phần tử thêm vào mảng.
  ```
  
![](https://images.viblo.asia/e3ffe044-5ce9-4aef-af86-0fe88eead355.png)

* **Thuộc tính length**: Ở trong Javascript, hay các ngôn ngữ khác, index của mảng sẽ bắt đầu từ `0`. Có thể dùng index để lấy giá trị phần tử hoặc ghi đè giá trị phần tử đó. Và `array.length` sẽ trả về số lượng của phần tử trong mảng.

![](https://images.viblo.asia/6c495492-770f-4dbc-a02d-8f22d2839aff.png)

   *  Và để thêm một phần tử vào cuối mảng, chúng ta có thể làm như sau:
 
 ![](https://images.viblo.asia/6cc0feb5-0f67-407e-aff9-70d9c50ead19.png)
 
**2. Một số cách không thay đổi mảng gốc**

* **Sử dụng phương thức concat:** Dùng để kết nối 2 hay nhiều mảng với nhau. Phương thức sẽ không làm thay đổi mảng gốc, mà sẽ tạo ra một mảng mới.
    
    ![](https://images.viblo.asia/43161881-04a3-4b59-97ef-9780450aee0f.png)
    * Concat không chỉ chấp nhận tham số là một mảng, mà còn chấp nhận cả một giá trị, hoặc nhiều giá trị.

![](https://images.viblo.asia/a5435bc6-0d97-4974-a0c0-5d1ac370ba21.png)

* **Sử dụng spread operator:** `spread operator` cho phép biến đổi một mảng thành nhiều phần tử. Ví dụ:

    ![](https://images.viblo.asia/8beaec1a-feb4-4f0b-8507-5eb0467bb2f8.png)

    * Với ví dụ trên, có thể thấy được rằng khi sử dụng `spread operator` mảng `foods` được biến đổi thành 3 phần tử là: 🥭 🍎 🍑.
    * Sử dụng `spread operator` để thêm các phần tử của mảng này vào mảng khác như sau:

    ![](https://images.viblo.asia/6f69578b-5b35-4a12-b6f3-c98108cefd11.png)

    * Ở trong ví dụ này, có thể thấy được 2 mảng `foods` và `fruits` không bị thay đổi khi sử dụng `spread operator`.
    * Sử dụng `spread operator` thêm một phần tử vào mảng như sau:

    ![](https://images.viblo.asia/6ad6211e-dd61-4ee5-be80-f036206e6520.png)

**3. Lời kết**
* Trên đây là một số cách thêm phần tử vào mảng trong Javascript, hy vọng sẽ có ích với các bạn khi làm việc với mảng trong Javascript.

**Tài liệu tham khảo**

* Phương thức push(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
* Phương thức splice(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
* Thuộc tính length: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length 
*  Phương thức concat(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat
*  Spread Operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
*  5 Way to Append Item to Array in JavaScript: https://medium.com/dailyjs/5-way-to-append-item-to-array-in-javascript-a1eeeabf8f95
*  Icon sử dụng trong bài viết: https://emojipedia.org/food-drink/