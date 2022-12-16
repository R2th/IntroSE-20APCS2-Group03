## Giới thiệu
Chắc chắn nhiều người đã gặp bài toán hiển thị list data dạng scroll xuống thì loadmore. Cách làm thì cũng không quá khó, các bạn có thể tự viết hoặc search infinite scroll react là ra khá nhiều code mẫu và lib. Nhưng cách làm trên gặp một vấn đề, khi list lớn, hàng nghìn records trở lên, việc hiển thị 1 lúc nhiều như vậy, mà mỗi record lại có những action, state thay đổi liên tục thì thiết bị sẽ *giật lag*, nhất là hiển thị trên tablet hoặc mobile yếu thì xác định nghỉ chơi luôn. Mình đã tìm hiểu và mò được lib này giải quyết được bài toán performance trên
https://github.com/bvaughn/react-virtualized

## About react virtualized
Lúc mình viết bài này nó có 22.3k star trên git, đảm bảo độ uy tín đầu tiên :v 
Trước tiên là xem qua ví dụ dạng List này
https://bvaughn.github.io/react-virtualized/#/components/List
Hãy tick chọn Show scrolling placeholder và scroll, kèm theo inspect để theo dõi list được render như thế nào

![](https://images.viblo.asia/690c1fb4-2cbf-4f1c-bd4d-86a4a3b7f34b.png)

Các bạn có thể thấy nếu để list height 500, row height 50 (10 records / tablet), overscan = 1 thì nó sẽ render ra 10 items và *phòng bị* thêm 1 item *trước* và *sau* 10 items đó.

Vậy là chưa cần dọc docs ta cũng hiểu cơ bản cách react virtulized hoạt động rồi. Thay vì hiển thị toàn bộ list, nó sẽ chỉ render ra số item nhất định, tuỳ thuộc max height của list và height của row, kèm số oversan tuỳ chọn.

Ưu điểm dễ thấy là hiển thị rất nhanh, thao tác mượt. Hãy tưởng tượng mỗi row của bạn có thêm nút để edit, ấn vào row thì mở modal gồm nhiều action trong đó, state thay đổi nhiều thì cái list sẽ render đi render lại đơ thế nào, nhất là khi bạn đã scroll xuống nhiều lần và đang hiển thị 2000 records, 1 số tablet, mobile sẽ đơ luôn. Điều này sẽ được giải quyết tối ưu với react virtulized khi nó chỉ thao tác 1 lúc với 1 số ít records nhất định. Ngoài ra thì cũng không cần làm tính năng scroll mới hiển thị tiếp luôn, nhưng ban đầu bạn sẽ phải fetch all list về, nghe thì có vẻ thốn ở thời điểm đầu nhưng mình đã test với 3000 docs, việc fetch vẫn khá nhanh, và những gì nó đem lại trong quá trình sử dụng chắc chắn là tốt hơn nhiều cách *infinite scroll*.

Đây là demo code cho dạng List
```
import React from 'react';
import ReactDOM from 'react-dom';
import {List} from 'react-virtualized';

// List data as an array of strings
const list = [
  'Brian Vaughn',
  // And so on...
];

function rowRenderer({
  key, // Unique key within array of rows
  index, // Index of row within collection
  isScrolling, // The List is currently being scrolled
  isVisible, // This row is visible within the List (eg it is not an overscanned row)
  style, // Style object to be applied to row (to position it)
}) {
  return (
    <div key={key} style={style}>
      {list[index]}
    </div>
  );
}

// Render your list
ReactDOM.render(
  <List
    width={300}
    height={300}
    rowCount={list.length}
    rowHeight={20}
    rowRenderer={rowRenderer}
  />,
  document.getElementById('example'),
);
```
Code cũng dễ hiểu, mình chỉ có lưu ý là prop `overscan` các bạn nên set nhỏ, set lớn thì ưu điểm là lúc scroll sự delay render các item mới sẽ ngắn hơn, thậm chí không có, vì các bạn đã render sẵn chúng để *dự phòng* rồi mà, tuy nhiên nó không thực sự cần thiết, set `overscan` nhỏ sẽ tạo hiệu ứng delay load khi scroll, thêm option *Show scrolling placeholder* vừa *ảo ma* làm người dùng tưởng đó là scroll mới load thêm data, vừa cải thiện performance.

## Kết luận
Mình mới lấy ví dụ dạng List để giới thiệu, reat virtulized vẫn còn nhiều thú vị khác, hãy đọc docs và làm thử nhé, các bạn sẽ thích nó đấy! :rofl: