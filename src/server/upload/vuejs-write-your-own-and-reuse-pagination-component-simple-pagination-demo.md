![](https://images.viblo.asia/dd7becf3-bd6c-4e1c-b58a-153962880a22.gif)

Demo: https://telosma.github.io/vue-simple-pagination/
Lưu ý: Để xem việc di chuyển giữa các trang của mình có đúng hay không bạn có thể inspect trình duyệt và xem console log mà mình đã in ra.

Pagination là một thành phần mà chúng ta sử dụng khá nhiều khi làm việc với các website và khi làm việc với Vue cũng vậy. Chúng ta sẽ thường nãy ra một ý nghĩ ngay trong đầu đó là sử dụng một gói hỗ trợ sẵn pagination (phân trang) nào đó đúng không?
Khi bắt đầu làm việc với vue.js và sử dụng phân trang thì lúc đầu mình có sử dụng [Bootstrap Vue Pagination](https://bootstrap-vue.js.org/docs/components/pagination/) nhưng rồi một hôm trời không nắng cũng không mưa mình nhận được yêu cầu là không sử dụng boostrap-vue. Thực ra cũng có khá nhiều third-party hỗ trợ pagianation nhưng do chút khác biệt nên mình quyết định tự viết và sau này tự sử dụng và thay đổi lại luôn.

Trước tiên mình sẽ đi xây dựng Pagination component.
Tạo `src/components/Pagination.vue`
## Xác định các poperties sẽ được truyền vào:
- `current-page`: Lưu số thứ tự của trang hiện tại.
- `total-count`: Tổng sổ bản ghi dữ liệu nhận được
- `per-page`: Số bản ghi dữ liệu xuất hiện trong một trang
- `limit`: Số lượng trang của một `chunk`(một tập hợp gồm `limit` trang kế nhau), ví dụ tổng số trang của mình là 21 và `limit = 10` thì khi đó tổng số chunk mà mình có là 2 và mỗi chunk tương ứng với limit(10) pages, trừ chunk cuối chỉ có 1 page.

    ![](https://images.viblo.asia/bc399942-6f44-47a9-8015-7a917fbb896b.png)

    Ví dụ theo như hình trên thì 10 pages đầu mình coi là 1 chunk tương ứng đó là "limit=10"
```
props: {
  currentPage: {
    type: Number,
    default: 1,
    required: true,
  },
  totalCount: {
    type: Number,
    default: 0,
    required: true,
  },
  perPage: {
    type: Number,
    default: 1,
    required: true,
  },
  limit: {
    type: Number,
    default: 0,
    required: true,
  },
}
```

## Tính toán các computed property
- `totalPage`: Tổng số trang
- `isShowPrev`: Trả về giá trị Boolean xác định xem button `back` về trang trước có được enable hay không
- `isShowNext`: Trả về giá trị Boolean xác định xem button `next` về trang trước có được enable hay không
- `firstPageOfPrevChunk`: Số thứ tự của trang đầu tiên trong `chunk`(tập các trang) phía trước
- `firstPageOfNextChunk`: Số thứ tự của trang đầu tiên trong `chunk`(tập các trang) phía sau
- `pages`: Mảng giá trị số thự tự của các trang
```
computed: {
  totalPage () {
    return Math.floor(this.totalCount / this.perPage) +
      (this.totalCount % this.perPage > 0 ? 1 : 0)
  },

  isShowPrev () {
    return this.currentPage > 1
  },

  isShowNext () {
    return this.totalPage > 1 && this.currentPage < this.totalPage
  },

  // @return Number value of last page previous chunk
  firstPageOfPrevChunk () {
    const currentChunk = Math.floor((this.currentPage - 1) / this.limit)
    let prevChunkPage = 0
    if (currentChunk > 0) {
      const prevChunk = currentChunk - 1
      prevChunkPage = (prevChunk * this.limit) + this.limit
    }

    return prevChunkPage
  },

  // @return Number value of first page number next chunk
  firstPageOfNextChunk () {
    const currentChunk = Math.floor((this.currentPage - 1) / this.limit)
    const nextChunk = currentChunk + 1
    const nextChunkPage = (nextChunk * this.limit) + 1
    if (nextChunkPage <= this.totalPage) {
      return nextChunkPage
    } else {
      return 0
    }
  },

   // @return Array number of page value
  pages () {
    let pageLists = []
    const arrayRangePage = range(1, this.totalPage + 1)
    if (this.totalPage <= this.limit || this.limit === 0) {
      pageLists = arrayRangePage
    } else {
      const chunkPages = chunk(arrayRangePage, this.limit)
      const currentChunk = Math.floor((this.currentPage - 1) / this.limit)
      pageLists = chunkPages[currentChunk]
    }

    return pageLists
  }
}
```
1.  Trước tiên mình cần tìm ra tổng số page mà sẽ được phân trang dựa vào kết quả của property `totalPage` chính bằng tổng số bản ghi dữ liệu (totalCount) và số bản ghi sẽ được trình bày trên mỗi page (perPage).
2. Chia các pages vào từng *chunk*   tương ứng. Tưởng tượng 20 pages của mình là *20 cuốn sách được đánh thứ tự*, mỗi *chunk* tương ứng *một ô trong giá sách*, và mình cần sắp xếp các cuốn sách vào các ô theo thứ tự lần lượt. Để lấy ra các chunk có các pages ở trong thì mình dụng property `pages`.

    Ví dụ 21 pages, mỗi chunk chứa được 10 pages (limit) mình sẽ có `pages = [ [1,2,3,4,...,10], [11,12,....20], [21] ]`
3. Tính toán xem trang hiện tại có next hay back được sang trang tiếp theo hay không:  `isShowNext, isShowPrev`
4. Quay trở lại với *giá sách* nếu bạn không chỉ muốn tìm lần lượt từng cuốn sách mà muốn tìm ngay sang ô giá sách tiếp theo thì cần biết số thứ tự của cuốn đầu tiên trong ô đó nếu ô sách hiện tại được đi tiếp từ ô trước hay số thứ tự của cuốn cuối cùng trong ô đó nếu được back lại từ ô phía sau. Ở đây mình sẽ tính toán trong 2 props đó là `firstPageOfNextChunk' và f'irstPageOfPrevChunk'
## Add sự kiện xử lý khi click các button prev hay next
Khi đã tính toán được các giá trị số trang, số chunk, ẩn hiện các button điều khiển thì giờ mình cần add các methods để xử lý hành động khi mà click và các button đó.
```
methods: {
  // @eventHandler
  handleClickPage (page) {
    this.$emit('change', page)
  },

  // @eventHandler
  handleClickPrev () {
    const prev = this.currentPage - 1
    prev > 0 ? this.$emit('change', prev) : this.$emit('change', 1)
  },

  // @eventHandler
  handleClickNext () {
    const next = this.currentPage + 1
    next <= this.totalPage ? this.$emit('change', next) : this.$emit('change', this.totalPage)
  },

  /**
   * @ventHandler
   * @description: Trigger custom event `change` on parent component
   * @param: value of next page
  **/
  handleClickDoubleNext (next) {
    if (!next) { return }
    this.$emit('change', next)
  },

  /**
   * @ventHandler
   * @description: Trigger custom event `change` on parent component
   * @param: value of previous page
   **/
  handleClickDoublePrev (prev) {
    if (!prev) { return }
    this.$emit('change', prev)
  }
}
```
Ở đây hình hai hàm `doubleClickNext ` và `doubleClickPrev` được gọi khi mà bạn click vào button chuyển tiếp *page chunk*

## Sử dụng pagination component vừa tạo
Giờ mình chỉ cần import Pagination component vào component mà mình muốn sử dụng phân trang thôi ^^, nhớ là truyền vào các props như `current-page, total-count, per-page, limit`

```
  <pagination
    :current-page="currentPage"
    :total-count="totalCount"
    :per-page="perPage"
    v-model="currentPage"
    :limit="limit"
    @change="handleChangePagination($event)"
  >
  </pagination>
```

Tại đây thì component mà sử dụng Pagination bạn cần thêm method `handleChangePagination` để xử lý thực hiện khi mà bạn chuyển sang một page khác trong phân trang.Khi đó mình sẽ cập nhật lại giá trị `currentPage` và gọi tới hàm thay đổi dữ liệu tương ứng với page đó.
```
// @eventHandler
handleChangePagination (event) {
  this.currentPage = event
  this.loadResults(event)
}
```

### Available props

| Prop                  | Type            | Default     | Description                              |
|-----------------------|-----------------|-------------|------------------------------------------|
| currentPage                 | Number    |      1     | Current page             |
| totalCount                  | Number          |   0        | Total number of records will be paginated                 |
| perPage                  | Number          |    1         | Number of records in one page                      |
| limit                  | Number          |    10         | Number of pages will be show every chunk pages               |
| type                  | String          |    df         | Type of pagination (`df or simple`)                 |

### Events

| Event | Params | Description |
|-------|--------|-------------|
|change| value of new page | Go to new page |

### Usage

```
// template
<pagination
  :current-page="currentPage"
  :total-count="totalCount"
  :per-page="perPage"
  v-model="currentPage"
  @change="handleChangePagination($event)"
>
</pagination>
```

```
// script
handleChangePagination (event) {
  this.currentPage = event
  console.log(`Go to page ${event}`)
  // Load new data
}
```

## Kết luận
- Trên đây mình đã giới thiệu về viết một Pagination component đơn giản trong Vue.js, bạn có thể truyền thêm nhiều tùy chọn để khiến cho Pagination component của bạn có tính dễ dàng mở rộng cao hơn cũng như dễ dàng tái sử dụng trong project hơn ví dụ như việc truyền vào props bao gồm cả **css class**,  **nội dung của các button thay đổi phân trang**, hay bất cứ thứ gì mà bạn nghĩ là mình sẽ thay đổi khi sử dụng phân trang ở các trang khác nhau.
- Bài viết sau mình sẽ đi vào tìm hiểu việc viết Pagination tái sử dụng không chỉ trong một project mà nhiều project, nói cách khác tương tự việc bạn đóng gói *awesome component* của mình và publish lên npm vậy.
- Cảm ơn bạn đã dành thời gian để đọc hết bài chia sẻ của mình!