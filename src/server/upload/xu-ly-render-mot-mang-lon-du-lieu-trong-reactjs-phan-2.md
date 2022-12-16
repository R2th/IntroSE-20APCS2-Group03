## Giới thiệu:
Như đã đề cập ở bài trước về việc [xử lý 1 mảng lớn dữ liệu trong ReactJS - phần 1](https://viblo.asia/p/xu-ly-render-mot-mang-lon-du-lieu-trong-reactjs-phan-1-bJzKmydEK9N), bài lần này mình sẽ giới thiệu 1 thư viện cực kỳ hiệu quả để xử lý việc đó, hơn nữa giúp tăng performance của dự án bạn lên đáng kể đó là react-virtualized.

Trước tiên ta hiểu khái niệm virtualized là gì? 
Virtualized là  kỹ thuật được sử dụng trong 1 danh sách nhiều phần tử mà có thể scroll trong danh sách đó, nhưng chỉ show những phần tử được nhìn thấy trong cửa sổ scrollable. 
Hiểu nôm la là nó chỉ render những phần tử được nhìn thấy trên màn/ khung hình.

Vậy chúng ta đi vào ví dụ về việc xử lý mảng dữ liệu lớn trong ReactJS và cùng tìm hiểu xem, làm cách nào react-virtualized giải quyết vấn đề đó nhé.

## Cài đặt môi trường:
Lần này để đơn giản và tiết kiệm thời gian mình dùng **create-react-app** của facebook, các bạn tạo thư mục project mà bạn mong muốn rồi mở terminal trong đó và gõ lệnh `create-react-app react-virtualized-example`.
Nhớ chạy lệnh ***npm start*** để start app nhé.

Để bắt đầu, ta vẫn tiếp tục sử cài đặt **lorem-ipsum** và **react-virtualized**: `npm i lorem-ipsum react-virtualized`.

Trong file App.js bạn xoá những import và dòng code không dùng đến đi và khởi tạo mảng data lớn như sau: 
```
const initialList = Array(10000).fill().map((val, index) => {
      return {
        id: index,
        name: "Jhon Doe",
        image: "http://via.placeholder.com/40",
        text: loremIpsum({
          count: 1,
          units: 'sentences',
          sentenceLowerBound: 4,
          sentenceUpperBound: 8
        })
      }
    })
```
Sau đó ta lặp thủ công qua mảng với hàm map() và in ra tất cả các phần tử của mảng thành danh sách :
```
        <ul>
          {this.state.list.map(item => <li key={item.id}>
            <img alt="img" src={item.image} />
            <div>
              <h3>{item.name}</h3>
              <span>{item.text}</span>
            </div>
          </li>)}
        </ul>
```

Đây là file App.js hoàn chỉnh của bạn:

![](https://images.viblo.asia/4eb067ae-625a-4702-b9b2-812cc07a0305.png)

Sau khi React 	render ra danh sách hoàn chỉnh, ta inspect element lên để kiểm tra:

![](https://images.viblo.asia/7ae0f4ca-e118-41a5-b723-6af2b43ea58b.png)

ReactJS render toàn bộ 10000 phần tử của mảng khởi tạo.

Nào bắt đầu dùng react-virtualized xem sự khác biệt nhé
    `import { List } from "react-virtualized";`
    Giờ đây, thay vì hiển thị danh sách theo cách: 
     ```
        <ul>
          {this.state.list.map(item => <li key={item.id}>
            </li>)}
         </ul>
     ```
 ta dùng List từ react-virtualized:
 - Khởi tạo chiều cao của box chứa danh sách **listHeight**, chiều cao của từng row trong box **rowHeight**, và chiều rộng của box **rowWidth**.
   ```
         const listHeight = 600;
           const rowHeight = 50;
           const rowWidth = 800;
    ```
 Trong component List của react-virtualized :
```
<List
         width={rowWidth}
         style={{ border: "1px solid black"}}
         height={listHeight}
         rowHeight={rowHeight}
         rowRenderer={this.renderRow}
         rowCount={this.state.list.length} />

```
và hàm renderRow() để dựng lên từng row mà ta mong muốn :
```
renderRow = ({ index, key, style }) => {
   return (
     <div key={key}>
       <img alt="img" src={this.state.list[index].image} />
       <div>
         <h3>{this.state.list[index].name}</h3>
         <span>{this.state.list[index].text}</span>
       </div>
     </div>
   )
 }

```

Đây là phần bổ xung cho file App.js:

![](https://images.viblo.asia/837aa7f9-d35b-4915-8e20-63905578665c.png)

Quan sát ứng dụng sau khi chạy ở phần inspect element lên, ta chú ý thấy, thay vì hiển thị toàn bộ danh sách như trước đây, giờ danh sách của chúng ta chỉ hiển thị 14 phần tử trong danh sách.
Khi scroll, danh sách được cập nhật  nhưng không nhiều hơn 17 phần tử trong danh sách:

![](https://images.viblo.asia/c0f75a3a-083c-49b0-b49a-89170eaa1c59.png)

* Bắt đầu mổ xẻ :
    List component của react-virtualized tạo 2 class: 
    * **ReactVirtualizedGrid ReactVirtualizedList** có width và height tương ứng là 800px và 600px.
    * **ReactVirtualizedGridinnerScrollContainer**  có max-width 800px nhưng height là *500000px*, đây là kết quả của *10000* phần tử của mảng và 50px mỗi row. Nó không hiển thị 10000 phần tử mà chỉ từ 14-17 phần tử. Lý do của sự thay đổi này là do List render thêm các element để khi ta scroll sẽ cảm thấy smooth hơn trong khi vẫn chỉ hiển thị tối da 17 phần tử trong đó, awesome phải không, và đặc biệt sẽ rất tiết kiệm performance khi bạn phải render danh sách lớn.

## Những điểm cần chú ý:
* Ngoài  các List, react-virtualized còn hỗ trợ xây dựng bảng, grid, collection, masonry các bạn có thể tham khảo tại http://bvaughn.github.io/react-virtualized/#/components/Grid
## Tổng kết và tài liệu tham khảo:
   Hy vọng bài viết này sẽ giúp các bạn xử lý được rắc rối khi xây dựng danh sách lớn dữ liệu trong tương lai gần, hẹn gặp lại các bạn ở bài sau.

  **Tài liệu tham khảo: **
    
https://www.npmjs.com/package/react-virtualized     
https://css-tricks.com/rendering-lists-using-react-virtualized/    
https://blog.logrocket.com/rendering-large-lists-with-react-virtualized-82741907a6b3/