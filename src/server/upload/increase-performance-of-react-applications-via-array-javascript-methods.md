Bài viết được dịch từ nguồn: https://hackernoon.com/increase-performance-of-react-applications-via-array-javascript-methods-uo3h3tqs

Chúng ta biết các phương thức `array` của javascript. Hôm nay chúng ta sẽ xem cách sử dụng dạng `real time`.

Tạo một ứng dụng quản lý sự kiện đơn giản bằng `React` để thêm, cập nhật và xóa một sự kiện. Tôi đã tạo một ứng dụng. Các bạn chỉ cần sao chép nó và chạy nó sau đó chúng ta sẽ xem cách tăng hiệu suất của nó bằng cách triển khai các phương thức mảng trong đó.

Sao chép kho lưu trữ sau thì bạn sẽ có một ứng dụng quản lý sự kiện đơn giản. Sau đó, từng bước, chúng tôi sẽ thêm mã vào đó để xem các phương thức mảng sẽ giúp tăng hiệu suất như thế nào.

**Github repository**:  https://github.com/mvcman/event-app

**To install all the packages**:

```
$ npm install
```

**To run the project:**

```
$ npm start
```

Khi bạn sao chép và chạy ứng dụng, bạn sẽ nhận được kết quả sau.

![](https://images.viblo.asia/78d19cb7-e2f7-4c44-9a1a-07ed1f8dc596.gif)

Trong ảnh GIF ở trên, bạn có thể thấy rằng người dùng đang thêm một sự kiện mới. Khi người dùng thêm các giá trị và nhấp vào gửi thì sự kiện này sẽ được save ở backend nhưng không được phản ánh trong giao diện người dùng của chúng tôi. Thậm chí, bạn có thể thấy rằng người dùng thực hiện thao tác xóa và chỉnh sửa.

Sự kiện được chỉnh sửa và xóa nhưng không được phản ánh trong giao diện người dùng. các bạn nghĩ sao? Đây có phải là một trải nghiệm người dùng tốt không? Không. Điều này sẽ gây ra sự cố về hiệu suất. Để có được các giá trị cập nhật, chúng tôi phải làm mới trang mỗi lần. Vậy làm cách nào để chúng ta có thể tránh được sự cố này hoặc tăng hiệu suất bằng cách sử dụng các phương thức mảng của javascript trong ứng dụng quản lý sự kiện của mình? Hãy xem nào.

Bạn đã clone responsitory. Bây giờ, chúng tôi sẽ thêm một vài dòng code vào tệp App.js và xem nó sẽ giải quyết các vấn đề của chúng tôi như thế nào.

Bây giờ hãy cập nhật hàm `newEvent()` hoặc thay thế hàm `newEvent()` bằng đoạn mã sau.

```
const newEvent = () => {
  const event = {
    name: name,
    date: date,
    time: time
 }
  axios.post('http://localhost:3001/events/', event)
    .then((res) => res)
    .then((data) => {
    console.log(data);
    setEvents((prev) => {
       const newEvent = [
        ...prev,
        data.data
        ];
        return newEvent;
      });
      reset();
      setOpenA(false);
    })
    .catch(err => console.log(err));
};
```

Điều gì xảy ra trong đoạn code trên? Sau khi thực hiện thao tác với cơ sở dữ liệu, chúng ta sẽ nhận được phản hồi thành công. Nếu phản hồi thành công thì chúng tôi sẽ thêm đối tượng vào event state. Vì vậy, nó sẽ được phản ánh trong giao diện người dùng ngay lập tức. Chúng tôi không phải làm mới mọi lúc. Xem kết quả bên dưới.

![](https://images.viblo.asia/655c0d2f-0bb3-4d1f-a492-066ba0703af2.gif)

Bạn có thể thấy rằng trước đó khi chúng tôi thêm một sự kiện mới vào thời điểm đó, chúng tôi phải làm mới trang mỗi lần. Nhưng bây giờ trong GIF ở trên, bạn có thể thấy rằng chúng tôi không phải làm mới trang. Khi chúng tôi thêm dữ liệu và nhấp vào nút gửi, dữ liệu của chúng tôi sẽ được phản ánh ngay lập tức. Đó là cách chúng tôi cập nhật trạng thái bằng cách sử dụng state và mảng hiện tại. Bây giờ chúng ta sẽ xem cách thực hiện thao tác chỉnh sửa và xóa sự kiện.

Thay thế các dòng mã sau bằng hàm `editEvent()`.

```
const editEvent = () => {
  const event = {
    name: name,
    date: date,
    time: time
  }
  axios.put(`http://localhost:3001/events/${selected}`, event)
    .then((res) => res)
    .then((data) => {
    console.log(data);
    setEvents((prev) => {
      const updatedEvent = prev.map((event) => {
        if(event.id === data.data.id) {
          return {
            ...data.data
          }
        }
        return event;
      });
      return updatedEvent;
    });
    reset();
    setOpenB(false);
    })
    .catch(err => console.log(err));
};
```

Nhìn vào đoạn code trên, chính xác thì chúng ta đang làm gì. Sau khi thực hiện thao tác ở backend nếu kết quả thành công thì chúng ta sẽ cập nhật trạng thái của mình bằng phương thức mảng. Chúng tôi add map state trước đó và kiểm tra id của trạng thái được cập nhật. Nếu nó khớp với id mà chúng tôi nhận được trong phản hồi từ chương trình phụ trợ thì đối tượng đó cũng sẽ được cập nhật ở state. Bằng cách đó, chúng tôi sẽ nhận được các giá trị cập nhật ngay lập tức.

Thay thế các dòng mã sau bằng hàm `deleteEvent()`.

```
const deleteEvent = (id) => {
  console.log(id);
  axios.delete(`http://localhost:3001/events/${id}`)
    .then(data => {
      console.log(data);
      setEvents((prev) => prev.filter(event => event.id !== id));
    })
    .catch(err => err);
};
```

Nhìn vào đoạn code trên, chúng tôi đang sử dụng phương thức lọc của một mảng và sau khi hoạt động ở backend thành công, chúng tôi sẽ cập nhật state. Chúng tôi sẽ lọc các prev state và lặp lại nó và trả về tất cả các đối tượng không khớp với id hiện tại của chúng tôi.

Bây giờ, chúng tôi đã thêm code để chỉnh sửa và xóa sự kiện. Lưu tệp và chạy code đã cập nhật. Bây giờ chúng tôi có thể cập nhật và xóa sự kiện và nhận dữ liệu cập nhật ngay lập tức, không cần phải làm mới trang.

Xem kết quả bên dưới.

![](https://images.viblo.asia/7eb52db3-a123-44ac-ab34-2610f6df5715.gif)

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn