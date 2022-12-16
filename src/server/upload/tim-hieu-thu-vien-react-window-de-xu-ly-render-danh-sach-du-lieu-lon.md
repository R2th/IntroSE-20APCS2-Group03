## Vấn đề:
- Chắc hẳn ai khi code dự án với `React.js` việc lấy dữ liệu từ server để hiển thị dưới dạng danh sách như list, bảng là không hiếm. Những sẽ có lúc bạn nhận dữ liệu trả về rất lớn, khiến cho việc React render ra list/table trở nên nặng nề và tốn nhiều thời gian. Đặc biệt là dữ liệu cần render là các image, pdf số lượng trang lớn,... nó làm ảnh hưởng đến porfermance và cũng ngốn không ít bộ nhớ. Đây chính là lúc bạn bắt đầu nghĩ đến việc trải nghiệm người dùng của người dùng cuối. Để giải quyết vấn đề đó sẽ có phương cách, tuy nhiên hôm nay mình sẽ đề cập đề react-window một thư viện gọn nhẹ, nhưng vô cùng hiệu quả, được tinh gọn lại từ thư viện react-virtualized bởi chính tác giả.
## Thực hiện : 
### Cài đặt project:
- Dùng lệnh `create-react-app` để khởi tạo project 

- Tiếp theo cài thư viện `react-window` bằng câu lệnh `yarn add react-window` hoặc `npm i react-window`

- Đây code sau khi setup:

![](https://images.viblo.asia/0491fbd4-42f4-40c0-b153-157c488e5304.png)

- Trong hình là hai cách render thông thường và dùng `FixedSizeList` của `react-window`
- Với cách thông thường nó sẽ render ra 20000 `Row` vào DOM điều này dẫn đến thời gian render các `element` sẽ lâu hơn.
- Tuy nhiên với `FixedSizeList` nó chỉ render ra tầm trên dưới 10 `element` hiển thị trên màn hình, khi bạn scroll đến đâu nó sẽ tự render tới đó

![](https://images.viblo.asia/31156bef-b6f2-4142-877f-c973c4fd19fe.gif)

- Hãy thử tưởng tượng bạn muốn render một file PDF vài trăm trang, việc render ra tất cả các trang đó cùng lúc là không thật sự tối ưu, thay vì vậy chúng ta chỉ render ra những file chúng ta cần xem như vậy sẽ giảm thời gian và bộ nhớ đi khá nhiều.

### Cách hoạt động của thư viện:
- Một số tham số truyền vào props như `height`, `width` chỉ thông số chiều cao và rộng của container `List` đó, `itemSize` là chiều cao của mỗi Item bên trong, `itemCount` tổng số lượng Item bên trong. Để truyền tham số vào trong chirldren của `List` ta chỉ cần truyền qua `itemData` là  mỗi `Item` sẽ nhận như truyền qua props của `Item`, `innerRef`, `outerRef` tạo ra Element bên trong, bên ngoài của nó (thường là "div"). `onScroll` đây là props type function mà nó sẽ trả về thông tin vị trí offset khi chúng ta scroll


- Về cách hoạt động của thư viện, nó sử dụng `virtualized list` chỉ render những `Item` trên màn hình khác so với cách render tất cả thông thường. Từ `height` và `width` nó xác định kích thước của `List`, dựa vào `itemSize` và `itemCount` nó xác định chiều dài của List đó, ví dụ `itemSize`: `200` và `itemCount`: `1000` thì height tổng thể của `List` là 200 000. Những `Item` trong `List` sẽ được render dựa vào vị trí offsetScroll với `position`: `absolute`, và số lượng `Item` render trước cũng được tính toán từ `height` và `itemSize` để scroll vẫn mượt mà và tối ưu.
![](https://images.viblo.asia/36cde432-2531-44c1-a5e8-c311cbee432f.jpg)