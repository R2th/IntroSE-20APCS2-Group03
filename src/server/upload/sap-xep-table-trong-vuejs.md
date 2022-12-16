# I. Giới thiệu.

Trong quá trình làm việc với table trong vue.js mình đã gặp khá nhiều vấn đề về sắp xếp mớ dữ liệu trong bảng. Sau khi lục lọi google thì mình tìm được bài viết có thể giải quyết khá tốt vấn đề này nên áp dụng luôn. Ai ngờ hiệu quả lại ngoài sức mong đợi nên nay chia sẻ với anh em biết đâu lại có ích khi gặp phải trường hợp như mìn.


# II. Demo

## 1. Hiển thị table.

 Đầu tiên mình chỉ lấy dữ liệu về và hiển thị nên màn hình mà chưa hề có sắp xếp hay phân trang gì cả. 

```php
<div id="app">
  
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Breed</th>
        <th>Gender</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cat in cats">
        <td>{{cat.name}}</td>
        <td>{{cat.age}}</td>
        <td>{{cat.breed}}</td>
        <td>{{cat.gender}}</td>
      </tr>
    </tbody>
  </table>
  
</div>
```

Mình có 4 hàng và 4 cột Name, Age, Breed, Gender và dùng vòng for để lặp lại các hàng để hiển thị ra dữ liệu.

Code đơn giản chỉ có thế này :

```php
const app = new Vue({
  el:'#app',
  data:{
    cats:[
        {name: 'Lo Vi Song', age: 12, breed: 'people', gender: 'women'},
		{name: 'Dinh Van Duy', age: 16, breed: 'nome', gender: 'men'},
		{name: 'Phung Van Thuc', age: 9, breed: 'python', gender: 'data'},
		{name: 'Cao Dinh Cuong', age: 22, breed: 'mongo', gender: 'mama'}
    ]
  }
})
```

Bạn có thể thấy một table có dữ liệu đã được tạo ra.
![](https://images.viblo.asia/d5439bd6-15e7-42d2-bfe6-16251df1a7a8.png)



## 2. Sắp xếp.

Bây giờ thêm sắp xếp vào xem sao nào. Mình cần thực hiện một số thay đổi như sau.
Đầu tiên thêm sự kiện khi click vào tiêu đề để có thể thực hiện sắp xếp, sau đó chuyển vòng lặp sang sử dụng sortedCats để sử lý dữ liệu trước khi hiển thị ra.

Đây là HTML mới :

```php
<div id="app">
  
  <table>
    <thead>
      <tr>
        <th @click="sort('name')">Name</th>
        <th @click="sort('age')">Age</th>
        <th @click="sort('breed')">Breed</th>
        <th @click="sort('gender')">Gender</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cat in sortedCats">
        <td>{{cat.name}}</td>
        <td>{{cat.age}}</td>
        <td>{{cat.breed}}</td>
        <td>{{cat.gender}}</td>
      </tr>
    </tbody>
  </table>
  
  debug: sort={{currentSort}}, dir={{currentSortDir}}
</div>
```

Tiếp theo ở data cần khởi tạo các biến để theo dõi những gì cần thiết khi sắp xếp như sắp xếp theo kiểu nào, đang sắp xếp theo cột nào.

```php
data:{
  cats:[],
  currentSort:'name',
  currentSortDir:'asc'
}
```

Tiếp theo nữa mình tạo ra một phương thức sort để nhận biết mình đang chọn vào title nào để sắp xếp vào đảo lại kiểu sắp xếp khi mình chọn tiếp vào title đã chọn trước đó.

```php
methods:{
  sort:function(s) {
    //if s == current sort, reverse
    if(s === this.currentSort) {
      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = s;
  }
}
```

Tiếp theo là sử lý cho hàm sortedCats đã được gọi ở trên html.

```php
computed:{
  sortedCats:function() {
    return this.cats.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    });
  }
}
```

Bạn có thể nhận thấy các modifier mình chỉ dùng để đảo ngược lại các số dựa trên hướng sắp xếp trước đó.
Nếu các bạn có dùng Vue DevTools thì thấy có một vài cảnh báo nhưng cũng không quan trọng vì mình đang cần theo dõi một số biến xem có hiển thị đúng như mình muốn nên chưa xóa đi cho dễ theo dõi.

## 3. Phân trang.

Để phân trang thì bạn cần thêm 2 nút phân trang vào html:

```php
<p>
<button @click="prevPage">Previous</button> 
<button @click="nextPage">Next</button>
</p>
```

Trong data bạn cần thêm 2 biến để lưu tổng số trang và trang hiện tại

```php
data:{
  cats:[],
  currentSort:'name',
  currentSortDir:'asc',
  pageSize:3,
  currentPage:1
},
```

Tiếp theo thêm 2 phương thức prevPage và nextPage đơn giản để sử lý phân trang:

```php
nextPage:function() {
  if((this.currentPage*this.pageSize) < this.cats.length) this.currentPage++;
},
prevPage:function() {
  if(this.currentPage > 1) this.currentPage--;
}
```

Cuối cùng là sửa đổi thuộc tính được tính toán của mình để kiểm tra kích thước trang và giá trị trang hiện tại khi trả lại dữ liệu. MÌnh dùng filter để làm được điều này:

```php
sortedCats:function() {
	return this.cats.sort((a,b) => {
		let modifier = 1;
		if(this.currentSortDir === 'desc') modifier = -1;
		if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
		if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
		return 0;
	}).filter((row, index) => {
		let start = (this.currentPage-1)*this.pageSize;
		let end = this.currentPage*this.pageSize;
		if(index >= start && index < end) return true;
	});
}
```

## 4. Kết quả.

Full code html:

```php
    <div id="app">

      <table>
        <thead>
          <tr>
            <th @click="sort('name')">Name</th>
            <th @click="sort('age')">Age</th>
            <th @click="sort('breed')">Breed</th>
            <th @click="sort('gender')">Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in sortedCats">
            <td>{{cat.name}}</td>
            <td>{{cat.age}}</td>
            <td>{{cat.breed}}</td>
            <td>{{cat.gender}}</td>
          </tr>
        </tbody>
      </table>
      <p>
      <button @click="prevPage">Previous</button> 
      <button @click="nextPage">Next</button>
      </p>

      debug: sort={{currentSort}}, dir={{currentSortDir}}, page={{currentPage}}
    </div>
```

Full code Vue

```php
  const app = new Vue({
  el:'#app',
  data:{
    cats:[
			{name: 'Lo Vi Song', age: 12, breed: 'people', gender: 'women'},
			{name: 'Dinh Van Duy', age: 16, breed: 'nome', gender: 'men'},
			{name: 'Phung Van Thuc', age: 9, breed: 'python', gender: 'data'},
			{name: 'Cao Dinh Cuong', age: 22, breed: 'mongo', gender: 'mama'}
		],
    currentSort:'name',
    currentSortDir:'asc',
    pageSize:3,
    currentPage:1
  },
  created:function() {
    fetch('https://api.myjson.com/bins/s9lux')
    .then(res => res.json())
    .then(res => {
      this.cats = res;
    })
  },
  methods:{
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.cats.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }

  },
  computed:{
    sortedCats:function() {
      return this.cats.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    }
  }
})
```
Và đâu là những gì bạn nhận được. Đừng quên click vào title để sắp xếp và next trang thửu xem mọi thứ đã hoạt động trơn tru chưa nhé.
![](https://images.viblo.asia/8e30c4f3-013e-4629-8d77-7cc6c3277fa2.png)



# III. Kết luận.

Thế là đã hoàn thành code cho sắp xếp và phân trang cho dữ liệu trong table rồi. các bạn có thể sử dụng code để áp dụng  cho trường hợp mình gặp phải và tùy biến sao cho hợp lý hơn. thank!

link tham khảo: https://www.raymondcamden.com/2018/02/08/building-table-sorting-and-pagination-in-vuejs