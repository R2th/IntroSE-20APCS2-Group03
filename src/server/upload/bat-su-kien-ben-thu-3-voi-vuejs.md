# I. Giới thiệu.
Nay mình lại chia sẻ thêm với các bạn một số mẹo hay trong vuejs. Qua 2 bài chia sẻ trước thì có sự đối lập khá lớn khi một bài được đón nhận khá tốt còn ngược lại bài kia lại bị xa lánh khi đang bị (-1).

Bản thân mình đánh giá bài viết không được đánh giá tốt kia khá hữu ích  nhưng có vẻ như mọi người thấy code chạy ngon là OK rồi mà không quan tâm lắm đến sự tối ưu cho code của mình thì phải. Việc làm cho trang web được tăng tốc thêm vài giây có lẽ cũng không cần thiết lắm vì chắc gì mình đã dùng đến cái sản phẩm đấy. 

Mình sẽ để lại cái link bài đấy nếu các bạn thấy bài này hữu ích thì ngại gì không lướt qua bài viết [đấy](https://viblo.asia/p/improve-performance-on-large-lists-in-vuejs-63vKjGMVZ2R) xem nó có thật sự hữ ích hay không.
# II. VueDose
## 1. Vấn đề và VueDose
Đây là một mẹo rất hữu ích tôi đã học được một lần từ người bạn Damian Dulisz , thành viên nhóm nòng cốt Vue.js đã tạo ra bản tin Vue chính thức và vue-multiselect . Dĩ nhiên cái ông bạn của cái ông Damian Dulisz không phải là mình, mình chỉ là người tình cờ đọc được nó. Là chia sẻ của một pro như thế thì chắc cũng có gì hay ho đây.
Trong một số trường hợp tôi cần biết khi nào một thành phần đã được tạo, gắn hoặc cập nhật từ thành phần chính, đặc biệt khi xây dựng các thành phần cho các thư viện, module.

Bạn có thể đã có một cái gì đó tương tự như vậy trong các thành phần của riêng bạn, ví dụ, bằng cách phát ra một sự kiện từ thành phần con, như thế này:

```php
mounted() {
  this.$emit("mounted");
}
```
Và sau đó bạn có thể nghe nó từ thành phần cha mẹ như thế này <Child @mounted="doSomething"/>. Thế là thằng con có thể gọi thằng cha rồi.
Thế đối với bên thư viện bên thứ 3 thì sao?.

Một ngaỳ đẹp trời thằng thư viện bạn sử dụng nó không hỗ chợ một sự kiện nào đó mà bạn mong muốn thì sao đây. Nó vừa chạy abc... gì đó và bạn muốn bắt sự kiện khi nó chạy để làm cái xyz.

Hãy để tôi nói với bạn điều này:

không nhất thiết cần truyền cái thằng emit thế kia, và trên thực tế bạn sẽ không thể làm điều đó trên các thành phần của bên thứ ba.

Không thể làm điều đó với bên thứ 3, chắc chắn rồi trừ khi bạn lôi code bên thứ 3 về rồi sửa nó đi.

Thay vì mất công như thế, giải pháp đơn giản như nghe một sự kiện với tên hook vòng đời, có tiền tố là @hook được anh bạn Damian Dulisz người tạo ra bản tin cho Vue và vue-mutiselect chia sẻ.

Chẳng hạn, nếu bạn muốn làm gì đó khi mẫu template của thành phần bên thứ ba kết xuất lại, bạn có thể nghe updated hook để nghe sự kiện ở vòng đời của nó 

Còn chờ gì mà không thử ngay với dự án của bạn hay với code cơ bản thay vì $emit gọi ra thằng cha thì dùng thử thằng này xem bạn sẽ nhận được điều gì.
Mà có lẽ bạn cũng chưa hình dung ra được sự vi diệu của thằng hook này đâu.


## 2. Thực hành.
Một ví dụ mà anh bạn của anh bạn  Damian Dulisz  đã chia sẻ sẽ giúp bạn hiểu rõ hơn.
Hook vòng đời của Vue phát ra các sự kiện tùy chỉnh với tên của chính hook, có tiền tố là hook:.

Ví dụ, mounted hook sẽ phát ra một hook:mounted sự kiện.

Do đó, bạn có thể lắng nghe các hook con từ các thành phần cha mẹ, giống như bạn làm với bất kỳ event tùy chỉnh nào:

```php
<template>
  <Child @hook:mounted="childMounted"/>
</template>

<script>
import Child from "./Child";

export default {
  components: { Child },
  methods: {
    childMounted() {
      console.log("Child was mounted");
    }
  }
};
</script>
```

Điều đó cũng có thể hữu ích để phản ứng với các hook bổ trợ của bên thứ ba. Chẳng hạn, nếu bạn muốn thực hiện một hành động khi v-runtime-template kết thúc việc hiển thị mẫu, bạn có thể sử dụng @hook:updated :

```php
<template>
  <v-runtime-template @hook:updated="doSomething" :template="template"/>
</template>
```

Có vẻ như lợi hại thật? Có lẽ bạn đã gặp những trường hợp này và bạn đã tạo ra một sự kiện trên thành phần con chỉ để cho cha mẹ biết rằng cái event đó được gọi. Giờ thì biết là không cần thiết rồi phải không nào.

Cùng xem kết quả tại link [demo](https://codesandbox.io/s/18r05pkmn7) để thấy cái hay của hook nhe!

## 3. Đăng kí hook động.
Mặc dù không phổ biến, nhưng có thể đôi khi bạn cần đăng ký một hook một cách linh hoạt giống như cách bạn có thể tạo các sự kiện tùy chỉnh một cách linh hoạt. Bạn có thể làm điều đó bằng cách sử dụng $on, $once và $offmóc.

Lấy ví dụ sau, được lấy từ tweet của Damian , tạo ra một beforeDestroy cái hook động do thực tế là nó đang tạo ra một thành phần Vue bao bọc cho Pickaday : một thư viện chọn ngày của JavaScript.

Vì plugin phải được tạo trên hook đã gắn và nó không lưu trong biến trạng thái phản ứng, nên cách duy nhất để làm gì đó với nó là đăng ký beforeDestroyedhook ngay sau khi tạo cá thể Pickaday:

```php
export default {
  mounted() {
    const picker = new Pickaday({
      // ...
    });

    this.$once("hook:beforeDestroy", () => {
      picker.destroy();
    })
  }
};
```
# III. kết luận.
Bạn đã thấy mẹo sử dụng thằng hook để phản ứng với các cuộc gọi hook mà không cần phải phát ra bất kỳ sự kiện nào theo cách thủ công có hay không nào?. Tôi hy vọng đây là một mẹo hữu ích cho bạn!
Bài viết có vẻ ngắn nhưng là mẹo chia sẻ thì cũng không biết viết gì cho dài. thank!
link tham khảo : https://vuedose.tips/tips/listen-to-lifecycle-hooks-on-third-party-vue-js-components/