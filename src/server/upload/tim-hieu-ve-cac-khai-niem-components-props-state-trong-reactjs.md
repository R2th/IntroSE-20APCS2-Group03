### **1. Component**

Component cho phép chúng ta chia nhỏ các thành phần UI độc lập mục đích để dễ quản lý và tái sử dụng nó

Chú ý: nếu chúng ta chia càng nhỏ thì khả năng tái sử dụng của component đó càng cao.

### **2. Props**

Props ở đây chính là properties của một component, chúng ta có thể thay đổi props của component bằng cách truyền dữ liệu từ bên ngoài vào. Props có thể là 1 object, funtion, string, number.....

Chú ý: Khi một props được truyền vào component thì nó là bất biến tức là dữ liệu của nó không được thay đổi.

### **3.State**

![](https://images.viblo.asia/830e3011-6595-4174-aa17-2d5c7d50a12c.png)

Giống như props, sate cũng giữ thông tin về component. Tuy nhiên, loại thông tin và cách xử lý nó khác nhau. State hoạt động khác với Props. 
State là thành phần của component, trong khi các props lại được truyền giá trị từ bên ngoài vào component.
Có một lưu ý nhỏ là chúng ta không nên cập nhật state bằng cách sử dụng trực tiếp this.state mà luôn sử dụng setState để cập nhật state của các đối tượng.
Sử dụng setState để re-renders một component và tất cả các component con. Điều này thật tuyệt, bởi vì bạn không phải lo lắng về việc viết các xử lý sự kiện (event handler) như các ngôn ngữ khác.

Khi nào thì sử dụng State:

Bất cứ khi nào dữ liệu thay đổi trong một component, State có thể được sử dụng.
Ví dụ như khi bạn có một form nhập input type text mỗi trường trong Form sẽ giữ lại trạng thái của nó dựa trên dữ liệu đầu vào của người dùng (user input). Nếu đầu vào của người dùng thay đổi, trạng thái của các text input sẽ thay đổi, đây là nguyên nhân cần re-rendering của component và tất cả các component con của nó. Và khi này chúng ta sẽ sử dụng state.

Sử dụng state trong component:

Trong đoạn code trên, bạn có thể thấy một lớp Form với một state input. Nó hiển thị một text input chấp nhận đầu vào của người dùng. Mỗi khi người dùng nhập văn bản, onChange được kích hoạt, lần lượt gọi setState trên input.
SetState kích hoạt re-rendering lại component, và giao diện người dùng (UI) bây giờ được cập nhật với thông tin mới nhất được nhập từ người dùng. Ví dụ đơn giản này minh họa state trong một component có thể được cập nhật như thế nào và cách sử dụng nó.