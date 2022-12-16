![](https://images.viblo.asia/49e99885-9ab8-4e96-8e8e-2cbc02624f03.png)

Chào mọi người, tiếp tục với series's về các dạng layout hôm nay mình sẽ chia sẻ thêm một trick thú vị nữa về layout table.

Đợt này mình ôm 2 project nên hơi sấp mặt, cũng là mấy con admin nhưng design có vẻ hứng thú và bắt mắt hơn mấy cái dashboard trước đây. Trong bài hát "Đường đến ngày vinh quang" của cố nhạc sĩ Trần Lập có câu *"chặng đường nào trải bước trên hoa hồng bàn chân cũng thấm đau vì những mũi gai"*... đi liền với cái đẹp thường là sự phức tạp, tuy nhiên làm việc với design đẹp và *những cái đẹp* là điều làm mình hứng thú.

Đâu đó cũng 3 tuần rồi, đang vật lộn với việc estimate task bên dự án khác thì lại bị vỗ vai nhờ support. Lần này không phải em gái xinh xắn bàn bên mà là một em trai cao to da trắng tưởng tới rủ mình đi chơi nhưng lại nhờ fix giúp cái table. Mình không còn sợ chị designer buồn dẫn đến trầm cảm nữa mà mình sợ anh em Backend sấp mặt với đội QA vì dự án sắp release nên mình đã ra tay giúp đỡ.

Bây giờ mình sẽ tái hiện lại chiếc table mình làm hôm trước. Anh em review phát xem có gọn gàng không nhé.

## 1. Sync scroll for table has a space
Thông thường, với kiểu `table` có khoảng trống ngăn giữa các `row` mọi người sẽ nghĩ ngay đến việc dùng `margin` để tạo khoảng cách. Đúng như vậy nhưng nhiều khi cuộc sống đâu như những giấc mơ, việc coding để đẹp như design cũng không phải đơn giản.

![](https://images.viblo.asia/87624d67-6832-44d1-9d92-603fbbce5fc0.png)

> **Mô tả**:
> - Table xuất hiện scroll khi có nhiều cột
> - Cột đầu tiên được cố định khi scroll
> - Row cuối cùng cách các row trên 1 khoảng và table có bo tròn để tăng tính thẩm mĩ.

#### Ý tưởng thực hiện
- Giống như [bài trước](https://viblo.asia/p/mot-vai-thu-thuat-lam-viec-voi-cac-dang-layout-phan-2-RnB5pma2KPG) table lần này vẫn có bo tròn, có đường line đẹp đẹp.
- Tạo 2 table giống nhau, có `margin` để tạo khoảng cách
- Viết 1 đoạn `js` nhỏ để get `width` của từng `cell` và set  vào `table` bên dưới để đồng bộ size.

```
.wrap
  .container
    table
      thead
        tr
          th Cột title
          th Hích đờ
          th Hích đờ
          th Hích đờ
          th Hích đờ
          th Hích đờ
          th Hích đờ
          th Hích đờ
      tbody
          each row in [1, 2, 3, 4]
            tr
              td Row title
              td cell content
              td cell content
              td cell content
              td cell content
              td cell content
              td cell content
              td cell content
        tr.table-row-last
          td.text-nowrap Row title long text...	
          td cell content
          td cell content
          td cell content
          td cell content
          td cell content
          td cell content
          td cell content

//- table (row cuối)
.wrap
  .container
    table.table-footer
      tbody
        tr
          td Sum sum sum
          td cell content
          td cell content
          td cell content
          td cell content
          td cell content
          td cell content
          td cell content
```

```scss
.wrap {
  flex: 1;
  width: 100%;
  margin: auto;
  margin-bottom: 5px;
  border: 1px solid #36304a;
  border-radius: 5px;
  overflow: hidden;
}

// Chỗ này để chứa table scroll
.container {
  display: block;
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 1000px;
  
  tr {
    &:not(:last-child) {
      td {
        border-bottom: 1px solid gray;
      }
    }
    
    &:nth-child(even) {
      td {
        background: #ffc7f8;
      }
    }
  }
  
  td {
    padding: 10px 20px;
    background: #ffedfd;
  }
  
  th {
    padding: 20px;
    color: white;
    background: #36304a;
    white-space: nowrap;
    text-align: center;
  }
  
  td, th {
    // Fixed cột đầu tiên của table
    &:first-child {
      position: sticky;
      left: 0;
      z-index: 9;
    }
    
    &:not(:last-child) {
      border-right: 1px dotted gray;
    }
  }
}

// customize scroll cho đẹp
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: white;
}

::-webkit-scrollbar-thumb {
  background: #36304a;
}
```
```js
// Đoạn này dùng để get/set width cho table
var firstTableWidth = [];

// selector đến th của table trên và get width th
$('table th').each(function(i, item) {
  firstTableWidth.push($(this).width());
});

// set width vào từng td của table còn lại
$('.table-footer td').each(function(i, item) {
  $(this).width(firstTableWidth[i]);
});

// Đồng bộ scroll cho 2 table
$('.container').on('scroll', function() {
  $('.container:not(this)').scrollLeft($(this).scrollLeft());
});
```
{@embed:https://jsfiddle.net/KhuyenNH/xzwe4ymq/embed/result,html,css,js/dark}
#### Ngoài cách trên:
- **Để tạo phân cách:** mình cũng nghĩ việc dùng `:before` hoặc `:after` set cùng màu background để tạo line phân cách. Tuy nhiên cách này sẽ không linh hoạt nếu bên số lượng `row` nhiều và theo design thì ở đây có `border-radius` cho 2 table nên cách này là không dùng được.
- **Không cần đồng bộ scroll bằng JS**: có thể dùng 1 wrapper bọc cả 2 table khi đó cũng scroll đồng bộ được, tuy nhiên mình cũng đã thử nhưng không giữ được `border-radius` nên dùng js có vẻ hợp lý.


## 2. Table responsive
Table có 2 dạng responsive đó là dạng có scroll và dạng từng list theo hàng.
Tuy nhiên đối với table responsive có scroll ngang chỉ nên áp dụng với trường hợp table quá nhiều cột, dù ở PC / laptop không đủ kích thước mới nên xuất hiện.
Đối với mobile, table chuyển thành từng hàng như design bên dưới (mình chưa biết thuật ngữ gọi là gì) sẽ phù hợp hơn vì nhìn rõ ràng, không phải scroll ngang gây cảm giác khó chịu.

Table scroll trên màn hình PC (trường hợp quá nhiều cột sẽ xuất hiện scroll)

![](https://images.viblo.asia/f63d3a32-97fa-4238-996b-8009ee1c82b4.png)

Table responsive trên màn hình Mobile (chia theo từng hàng, không còn hiển thị theo từng cột nữa)
![](https://images.viblo.asia/70737220-56b3-48ed-bc12-afc56af20ffe.png)

#### Ý tưởng thực hiện
- Dựng table cho PC như bình thường
- **Responsive**
- Ẩn row header của table
- Tạo label của header bằng cách dùng before hoặc after thông qua content

```pug
.wrap
  .container
    table
      thead
        tr
          th Ticket
          th Tracker
          th Status
          th Priority
          th Assignee
          th Target version
          th Due date
          th Estimated time
      tbody
        each item in [1, 2, 3, 4]
          tr
            //- data-label là attr dùng để hiển thị label khi về mobile
            td(data-label='Ticket') #0001
            td(data-label='Tracker') Task
            td(data-label='Status') Resolved
            td(data-label='Priority') Hight
            td(data-label='Assignee') Nguyen Huu Khuyen
            td(data-label='Target version') Sprint 3
            td(data-label='Due date') 06/21/2020
            td(data-label='Estimated time') 1616
```
```scss
//-- Những phần tương tự của table trên mình không lặp lại ở đây --

// Chỉ scroll table cho màn hình từ tablet
@media screen and (min-width: 640px) {
  td, th {
    &:first-child {
      position: sticky;
      left: 0;
      z-index: 9;
    }

    &:not(:last-child) {
      border-right: 1px dotted gray;
    }
  }
}

@media screen and (max-width: 640px) {
  table {
    min-width: auto;

    // Ẩn header table
    thead {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }

    tr {
      display: block;

      // tạo đường line kết thúc mỗi khối data
      &:not(:last-child) {
        border-bottom: 2px solid #8e3c78;
      }

      &:nth-child(even) {
        td {
          background: #fff;
        }
      }

      td {
        display: block;
        font-size: 14px;
        text-align: right;
        border-bottom: 1px solid #ddd;

        &:before {
          // get value từ attribute 'data-label' để hiển thị
          content: attr(data-label);
          float: left;
          font-weight: bold;
          text-transform: uppercase;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
```
{@embed:https://jsfiddle.net/KhuyenNH/qpmovu8k/embed/result,html,css/dark}

## 3. Tổng kết
Trên đây là 2 dạng table tiếp theo sau một loạt bài về table mình vừa gặp, cũng được anh em trong dự án trầm trồ. Hi vọng những tricks trên sẽ giúp mọi người có thể tận dụng được `ctrl + c` và `ctrl + v` từ code của mình.