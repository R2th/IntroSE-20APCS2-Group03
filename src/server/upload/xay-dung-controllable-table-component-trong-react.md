# Introduction
Hôm nay mình xin giới thiệu một bài toán mà mình nghĩ các bạn cũng sẽ gặp trong các dự án thực tế, hoặc đơn giản là discuss về cách phân tích một bài toán, cách sử dụng `react` custom hook, cách viết unit test cho custom hook, ... và có thể nhiều thứ khác :D

**Đó là build một controllable table bằng `react hook` gồm những chức năng sau:**
* Search data theo tất cả column trong table
* Sort data tăng dần/giảm dần theo từng column bằng cách click vào header
* Phân trang
* Thay đổi số rows hiển thị trên mỗi trang

**Chủ đề này hơi nhiều nên mình tách ra 3 phần:**
* Phần 1: Đặt vấn đề và viết các util functions `javascript` thuần (**search**, **sort**, **paging**)
* Phần 2: Sử dụng `react hook` để build một table hoàn chỉnh với các util functions ở phần 1
* Phần 3: Sử dụng `jest` để viết Unit Test

**Sau khi hoàn thành 3 phần trên thì kết quả sẽ như sau:**

![](https://images.viblo.asia/67cf503d-7bf1-42bd-83d0-388465c16328.png)

# Bắt đầu phần 1
### Đặt vấn đề:
Hầu hết các app quản lý dùng cho admin đều có phần display data sử dụng `table`, trong  table đó có sử dụng một số chức năng như tìm kiếm 1 row nào đó trong table, sort data tăng dần, giảm dần theo 1 column bằng cách click vào header của column đó, phân trang, thay đổi số rows hiển thi trên table, ...

Và với bài toán trên nếu triển khai theo *Single Page Application* sử dụng `React` với yêu cầu là:
khi load page lần đầu thì phía server sẽ trả về 1000(tuỳ limit) records trong database, sau đó phía client sẽ tự search, sort, paging dựa vào list data đó mà không cần phải request lên server thêm 1 lần nào nữa.

Với yêu cầu như vậy thì phía client sẽ implement component `Table` như sau:
* Props cần truyền vào Table: *headers* - danh sách data header; *dataSource* - danh sách 1000 records data từ server
* Table component sẽ render: input search, paging, button sort trên column header, list các rows sau khi đã thực hiện search/sort/paging

Trong phần này mình chỉ nêu lên vấn đề cho bài toán và viết các util functions liên quan đến xử lý **search, sort, paging** bằng javascript mà chưa dùng đến `react` nhé.

### Util functions trong Table:
Giả sử data đầu vào của Table như sau:
```js
const data = [
  {
    first_name: 'harry',
    last_name: 'kane',
  },
  {
    first_name: 'macus',
    last_name: 'rashford',
  },
]
```
#### Search
**Description**: Sau khi user nhập vào textbox search và nhấn enter thì sẽ thực hiện việc tìm kiếm các items của list data match với text search. Như vậy đầu vào của function search gồm có array của các objects và text search, kết qủa trả về là array list data sau khi đã searched.

**Implement:**
```js
const search = (rows = [], searchValue = '') =>
  rows.filter(row => // Lọc các rows match với searchValue
    Object.values(row).some(value => // Check nếu ít nhất 1 column match với searchValue
      String(value)
        .toLowerCase()
        .includes(String(searchValue).toLowerCase()) // Check nếu data chứa searchValue
    )
  )
```

#### Sort
**Description**: User click vào header của column nào thì sort theo value của column đó, mỗi lần click thì sẽ toggle thứ tự tăng(ASC)/giảm(DESC) và default là tăng dần. Như vậy đầu vào của function sort gồm có array của các objects, key(sort theo column nào) và thứ tự sort, kết quả trả về array list data sau khi đã sorted.

**Implement:**
```js
const sort = (rows = [], key = '', order = ORDER_ASC) => {
    return rows.sort((a, b) => {
      if (a[key] > b[key]) {
        return order === ORDER_ASC ? 1 : -1 // Nếu thứ tự tăng dần thì xếp a trước b và ngược lại
      }
      if (a[key] < b[key]) {
        return order === ORDER_ASC ? -1 : 1 // Nếu thứ tự tăng dần thì xếp b trước a và ngược lại
      }
      return 0
    })
  }
```

#### Paging
##### 1. Get total page: 
Hàm get total page dùng để biết được khi nào sẽ enable/disable prev/next button ở UI. Truyền vào length của array tổng và số lượng(limit) rows sẽ display trên mỗi page; kết quả trả về là số total page.

```js
const getTotalPage = (length = 0, limit = 10) => Math.ceil(length / limit)
```

##### 1. Get page items: 
Hàm get page items dùng để limit số lượng items hiển thị trên table của trang hiện tại. Truyền vào array tổng, số trang hiện tại và số lượng(limit) rows sẽ display trên mỗi page; kết quả trả về là số lượng item cần hiển thị của page hiện tại.

```js
const getPageItems = (allItems = [], currentPage = 1, limit = 10) =>
  allItems.slice((currentPage - 1) * limit, currentPage * limit)
```

# Kết luận
Đó là tất cả các hàm utils dùng cho control việc display data trên Table, mình xin kết thúc phần 1 ở đây, ở phần tiếp theo mình sẽ `init react app` và tạo một Table component hoàn chỉnh dựa vào những utils function ở trên.

Xin cám ơn các bạn đã đọc bài viết!