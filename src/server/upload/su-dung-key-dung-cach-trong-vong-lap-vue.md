# 1. v-for & key
Một ví dụ nhỏ về vòng lặp trong vue
```
<template>
  <div id="app">
    <p v-for="(item, index) in items" :id="index">{{ item }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3],
    }
  },
};
</script>
```
kết quả

![](https://images.viblo.asia/40cee5a9-1c7f-44b3-a16d-6a24374e1234.png)

Giờ mình sẽ bổ sung thêm 1 chức năng để đảo ngược lại mảng `items`
```
<template>
  <div id="app">
    <p v-for="(item, index) in items" :id="index">{{ item }}</p>
    <button @click="reserve">reserve</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3],
    }
  },
  methods: {
    reserve() {
      this.items = [3, 2, 1];
    }
  }
};
</script>
```
Sau khi click vào button `reserve` thì mảng đã được đảo ngược và hiển thị chính xác
![](https://images.viblo.asia/35d04375-f288-47b5-a8ff-f214938dbb2a.png)

Nhưng nếu bạn mở inspect lên và nhìn vào `id` của thẻ `<p>` thì thấy vị trí của  các thẻ ko hề bị đảo lại mà chỉ có giá trị thay đổi 

![](https://images.viblo.asia/e965dbb9-ea04-4d2c-bfdf-8df8ad85c708.png)

Lý do tại sao thì chúng ta có thể dễ dàng tìm thấy trên docs của Vue
>  When Vue is updating a list of elements rendered with v-for, by default it uses an “in-place patch” strategy. If the order of the data items has changed, instead of moving the DOM elements to match the order of the items, Vue will patch each element in-place and make sure it reflects what should be rendered at that particular index. This is similar to the behavior of track-by="$index" in Vue 1.x.

Hiểu đơn giản là khi list được cập nhật thì Vue mặc định sẽ sử dụng phương thức “in-place patch”. Nếu thứ tự của các phần tử trong mảng bị thay đổi thì Vue sẽ cập nhập lại giá trị trên các DOM elements để đảm bảo nó hiện thị đúng chứ ko dịch chuyển chúng theo thứ tự mới.

Việc ko dịch chuyển DOM có thể gây ra các lỗi ko mong muốn ví dụ như khi bạn làm việc với một form. Để dễ hình dung hơn thì mình sẽ làm 1 ví dụ khác. Đầu tiên mình sẽ tạo mới 1 component `CustomInput`
```
<template>
  <div>
    <span>{{ title }} </span>
    <input type="text">
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>
```
Sau đó mình sẽ sửa lại file lúc đầu mình ví dụ về vòng lặp
```
<template>
  <div id="app">
    <p v-for="(item, index) in items" :id="index">
      <custom-input :title="item"/>
    </p>
    <button @click="reserve">reserve</button>
  </div>
</template>

<script>
import CustomInput from './components/CustomInput';

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      items: ['name', 'sex', 'age'],
    }
  },
  methods: {
    reserve() {
      this.items = ['age', 'sex', 'name'];
    }
  }
};

</script>
```
Giờ bạn hãy thử nhập 1 số thông tin vào rồi ấn nút `reserve`. Đây là kết quả trước và sau khi ấn nút.
![](https://images.viblo.asia/655911b3-c2a2-4f3e-91ce-5358dc240d6d.png)
![](https://images.viblo.asia/685089c3-577a-4f39-924d-0d330e47c22f.png)

Tiêu đề của input đã thay đổi nhưng giá trị lại ko khớp, bởi vì các component ko hề được sắp xếp lại mà chỉ có giá trị truyền vào được cập nhật lại thôi.

Để các component có thể thể được sắp xếp lại theo thứ tự mới thì chúng ta hãy thêm `key` vào vòng lặp. Sửa lại code 1 chút
```
<p v-for="(item, index) in items" :id="index" :key="index">
```
Rất tiếc là index vô dụng trong trường hợp này, vì khi bạn đảo vị trí của phần tử trong mảng thì index vẫn dc render theo thứ tự => key bị thay đổi => ko phải unique. Cái chúng ta cần ở `key` là nó phải là unique và primitive. Trong hầu hết trường hợp thì dùng index làm key đều vô dụng nên theo ý kiến cá nhân của mình là nên chú ý khi dùng index làm key.

# 2. Giải pháp sử dụng key cho mảng đơn giản
Với trường hợp mảng đơn giản như ví dụ ở trên thì bạn hãy dùng luôn giá trị cúa phần tử làm key(đảm bảo ko có phần tử nào duplidate). Nếu là 1 mảng các object thì dùng lib `object-hash` + computed để tạo key cho các phần tử. Còn trong trường hợp các phần tử duplicate thì hãy tạo key cho mỗi phần tử bằng thuật toán random.