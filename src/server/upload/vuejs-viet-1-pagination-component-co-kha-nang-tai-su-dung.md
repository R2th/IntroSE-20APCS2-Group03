Khi muốn tạo ra một list views có khả năng liệt kê ra toàn bộ dữ liệu của bạn, mà dữ liệu đó của bạn lại lớn, điều quan trọng nhất là phải tạo ra chức năng phân trang, giúp người dùng chia nhỏ dữ liệu giúp chúng ta dễ quan sát hơn. Với [VueJS](https://vuejs.org/), ta có thể viết 1 **components** phân trang giúp cho ta chỉ cần viết 1 lần mà có thể sử dụng ở mọi nơi trong app. 
# Kiến trúc cơ bản
Chức năng phân trang giúp chúng ta di chuyển qua lại giữa các trang, có thể đi đến trang đầu hoặc trang cuối hay có thể di chuyển đến trang theo số mà mình mong muốn. 

Phần lớn các ứng dụng sẽ tạo ra một API được gọi đến mỗi lần thay đổi trang. Nhưng ta không muốn tạo các request này trong component để đảm bảo nó được tái sử dụng. Ta sẽ đảm bảo nó bằng việc kích hoạt event với số trang khi người dùng click vào nó. 

Ta cần API có khả năng chỉ ra số kết quả mỗi trang, tổng số trang, số của trang hiện tại. 
Chúng ta cũng muốn tạo ra những nút bấm trở về trang đầu hoặc trang cuối, trang trước đó, trang sau đó:

**`[first] [next] [1] [2] [3] [previous] [last]`**

Chúng ta cũng muốn hiện ra một số lượng page cụ thể chứ không phải là tất cả các page. 

Bây giờ chúng ta đã có toàn bộ yêu cầu, chúng ta có thể cấu hình cấu trúc *HTML* và những thành phần cần thiết:

> **Pagination.vue**

```js
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  }
};
</script>
<template>
  <ul>
    <li>
      <button type="button">
        First
      </button>
    </li>
    <li>
      <button type="button">
        Previous
      </button>
    </li>
    <!-- Range of pages -->
    <li>
      <button type="button">
        Next
      </button>
    </li>
    <li>
      <button type="button">
        Last
      </button>
    </li>
  </ul>
</template>
```

Để lấy ra số lượng visible pages chúng ta sử dụng vòng lặp **for**.

Ta cần đảm bảo rằng :

* Khi đang ở trang đầu tiên, thanh paginate sẽ ở trang số 1 và chỉ có nút next khả dụng.
* Khi đang ở trang cuối cùng, thanh paginate sẽ ở trang cuối cùng và chỉ có nút previous khả dụng.
* Với những trang ở giữa có thể show ra cả nút next và previos.

Chúng ta sẽ tính toán một chút cho trang cuối cùng. Cụ thể số trang nhỏ nhất giữa tổng số trang và vị trí ta muốn dừng. Để tính toán vị trí ta muốn dừng, ta sẽ tính tổng giữa vị trí ta muốn bắt đầu cộng với số lượng nút được phép hiện ra. Bởi vì ta muốn hiện 1 nút ở trước đó nên ta sẽ trừ 1 ở nút hiện tại. 

Ta sẽ sử dụng computed để tính toán trả về 1 mảng các object kèm theo khoảng của các trang có thể hiện. Mỗi object bao gồm trang hiện tại và những cái còn lại có thể thể hiện nhưng button nào được active hay disabled. Và cuối cùng là người dùng không thể click vào page mà họ đang ở. 

Ta sẽ sử dụng ***v-for*** cho trường hợp này. Với kiến trúc phức tạp hơn ta có thể đánh thêm **key** ( hay là **index**) để biết chỗ nào có thể cập nhật.

> **Paginate.vue**

```js
<script>
export default {
  ...
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }
      // When in between
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (let i = this.startPage;
        i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
  }
};
</script>
<template>
  <ul>
    ...
    <li v-for="page in pages" :key="page.name">
      <button type="button" :disabled="page.isDisabled">
        {{ page.name }}
      </button>
    </li>
    ...
  </ul>
</template>
```

# Event Listeners
Bây giờ ta cần thông báo với component cha về sự thay đổi khi user click hay không click.

Ta sẽ viết sự kiện lắng nghe trên mỗi nút bằng ***v-on directive***. Để thông báo với component cha ta sẽ sử dụng *$ emit* để phát ra sự kiện lắng nghe. 

> **Paginate.vue**

```js
<script>
export default {
  ...
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    }
  }
}
</script>
<template>
  <ul>
    <li>
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        First
      </button>
    </li>

    <li>
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
        Previous
      </button>
    </li>

    <li v-for="page in pages">
      <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled">
        {{ page.name }}
      </button>
    </li>

    <li>
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        Next
      </button>
    </li>

    <li>
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        Last
      </button>
    </li>
  </ul>
</template>
```

# Tạo style css
Ta sẽ viết vài dòng **css** để làm cho **component paginate** của chúng ta đẹp hơn. 

Ta sẽ thay đổi màu của page đang được trỏ đến 

```js
<script>
export default {
  ...
  methods: {
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
}
</script>
<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        First
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
        Previous
      </button>
    </li>

    <li v-for="page in pages" class="pagination-item">
      <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled" :class="{ active: isPageActive(page.name) }">
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        Last
      </button>
    </li>
  </ul>
</template>

<style>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>
```

Trên đây ta đã hoàn thành xong 1  **paginate component** của riêng mình có khả năng tái sử dụng. Source code bạn có thể xem ở : https://codepen.io/alligatorio/pen/zWvpRp

# Tài liệu tham khảo
### **https://alligator.io/vuejs/vue-pagination-component/**