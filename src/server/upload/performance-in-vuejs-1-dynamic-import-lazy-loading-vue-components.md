## 1. Mở đầu
Đầu tiên trong Series này, các bạn cần hiểu được đó là các web code theo kiểu SPA (Single page application) chúng ta thường có rất nhiều các phần liên kết với nhau. Module này với module kia, module này dùng thư viện kia, file này dùng thư viện khác, ….v.v. Và như vậy nếu app của chúng ta càng to thì nó lại càng lằng nhằng (Mình đang nói trên góc độ là dùng lại các phần nhé) mặc dù chúng ta vẫn hiểu là chúng ta đang code theo kiểu phân tách module theo từng chức năng. Nhưng hãy cùng nhìn vào hình minh họa dưới đây nhé các bạn và hãy tự hiểu là nếu như app càng to thì nó lại càng khổng lồ.

![](https://images.viblo.asia/c2bfee07-a517-458a-926e-25086202bff8.png)


Để đi được hết các phần trong loạt series này các bạn cần hiểu 2 khái niệm hết sức quan trọng, đó là Bundle và Lazy load.

Bundle
Ở đây các bạn hãy để ý giúp mình là nếu như các bạn có build các Project dự án bằng Angular cli, React cli hay Vue cli thì các file trong code của các bạn sẽ được những trình bên trong này gom code lại thành file bundle để chạy. File này có đặc điểm thường là chỉ có một dòng code, các thư viện được import trong app cũng chỉ được lấy ra theo các function…..v.v. Nói tóm lại là các bạn sẽ không thể đọc được code ở trong này đâu ^^. Vì nó đã được Optimize rồi, Optimize ở đây được hiểu là nó đang làm cho code gọn lại để tăng Performance thôi nhé.

Tiếp tục, thế có bạn lại hỏi mình thế nó đã Optimize rồi thì Chamdev giới thiệu thêm series này làm cái gì @@? Để mình giải thích thêm nhé ^^

Khi cái app của các bạn đủ lớn, các file là rất nhiều nếu như cứ để trình băm code tự động của các Framework này làm việc thì các bạn cũng phải thừa nhận với mình một điều là cái file bundle kia nó sẽ rất to đúng không. Hoặc giả sử là nó có bundle ra nhiều file đi nữa, thì mỗi lần user tải app về nó sẽ phải tải hết về đúng không? Nó sẽ làm ảnh hưởng nghiêm trọng đến UX người dùng vì time tải app là quá lâu, ở đây mình sẽ tính bằng giây nhé, 3 -5 giây là đã gọi là lâu rồi đó @@. (Ở đây bạn hãy liên tưởng ngay đến khi load facebook mà các bạn phải chờ 3s xem có ức chế không). 😀

Như vậy, công việc develop để làm tăng Performance app là rất quan trọng, nó sẽ làm cho user của chúng ta cảm thấy thỏa mái hơn khi dùng app bằng cách là làm giảm cái time tải app ban đầu xuống.

Cách làm tăng Performance này thì có rất nhiều cách làm như là config server (cache, CDN, zip file, ….), phần cứng thì làm tăng độ mạnh mẽ của server, bên phía Front-end thì sẽ dùng Lazy load. ^^. Ok, phần tiếp ta sẽ tìm hiểu qua xem lazy load là gì nhé các bạn. (Toàn khái niệm quan trọng đó – nếu không hiểu thì bạn có thể comment xuống bên dưới nhé – mình luôn đợi comment của các bạn :D).

Lazy load
Như phần trên mình có nói đó là khi mà tải app về thì user sẽ mất rất nhiều time để download app về, vì đơn giản là nó đang download hết cả app. Và như vậy sẽ làm ảnh hưởng rất nhiều đến UX (Trải nhiệm người dùng), vậy thì ở đây ta sẽ phải làm cho User tải nhanh hơn là được đúng không – nhưng nhắc lại một lần cuối là mình chỉ đang nói các kĩ thuật bên phía Front-end thôi nhé, tạm thời chưa nói kĩ đến bên server nó có thể làm gì. ^^

Nói đến bên FE thì sẽ có rất nhiều kĩ thuật để Lazy load, ví dụ như là: Lazy loading image (mình sẽ nói đến ở một bài khác vì nó không liên quan nhiều đến lazy load trong Vue), Router lazy load, Lazy loading Vue components, Lazy load over third-party libraries, Lazy Loading Individual Vue Components and Prefetching.

Các phần này mình sẽ chia sẻ ở phần bên dưới và trong series này nhé ^^.

## 2. Chi tiết
### **Setup**

Trước khi vào phần hướng dẫn ở dưới bạn hãy checkout git của mình về nhé (Tiện thể hãy cho mình 1 sao để động viên tinh thần mình nhé ^^). https://github.com/Nguyen-Xuan-Son/performance-vuejs.

Ở đây mình đã chia component các thứ và có một ít phần router rồi nhé, mục đích là để làm cả các phần về sau trong series này nữa đó.

Các bạn lấy code về chạy yarn install rồi tiếp theo chạy yarn serve nhé, như vậy ta đã có thể thực hành làm được rồi. ^^

### **Lazy loading Vue components là gì?**

Lazy load component ở đây nghĩa là không phải khi load app về ta sẽ load toàn bộ các Component về mà chỉ là khi cần mới load thôi.

Ở đây các bạn có thể tưởng tượng nếu như app của chúng ta là rất lớn việc lòa hết về có thể làm cho time tải trang lâu hơn và như vậy thì sẽ ảnh hưởng nghiêm trọng đến UX của người dùng. Và như vậy, nếu như người dùng không dùng đến component đó thì khồn cần load về nữa, như vậy sẽ làm cho time tải app là nhanh hơn rất nhiều.

Ví dụ như: Khách thì không cần các component của phần admin, editor thì không cần các phần component của admin, …

### **Cùng làm và xem nó hoạt động**

Đầu tiền các bạn hãy tạo ra cho mình thêm khoảng 3 component nhé, còn bạn muốn nhiều hơn thì cứ làm thôi.

Component-A, Component-B nằm ở ngoài cùng với root nhé, Component-C nằm ở bên trong và được import vào categories.vue nhé. Thư mục của chúng ta sau khi tạo sẽ trông như thế này.

![](https://images.viblo.asia/f4ed9459-c21d-4577-a578-7215e1019563.gif)


Tạo các component A, B, C với format như sau (Để test thôi nhé nên rất đơn giản ^^)

```
<template>
    <div class="row">
        ComponentA
    </div>
</template>

<script>

export default {
    name: 'ComponentA',
}
</script>

<style scoped>
</style>
```

Tiếp theo các bạn hãy import các component cho nó chạy bình thường nhé, và hãy bật network lên và kiêm tra xem có phải là nó load hết về cho chúng ta không. Hãy chỉnh file App.vue thành như sau:

```
<template>
    <div id="app">
        <router-link to="/">
            <img alt="Vue logo" src="./assets/logo.png">
        </router-link>
        <div class="container">
            <router-view />
        </div>
        <div class="container">
            <ComponentA />
            <ComponentB />
        </div>
    </div>
</template>

<script>
import ComponentA from './component-A';
import ComponentB from './component-B';

export default {
    name: 'App',
    components: {ComponentA, ComponentB},
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
```

Chỉnh file categories.vue thành như sau:

```
<template>
    <div class="row">
        <ComponentC />
    </div>
</template>

<script>

import ComponentC from './component-C';

export default {
    name: 'Categories',
    components: {ComponentC}
}
</script>
```

Như vậy khi load lên hãy quan sát network, không có chuyện gì xảy ra nó download hết về, và đây chính là vần đề, rất lớn nếu app to như facebook (^^ haha :D).

![](https://images.viblo.asia/88c80e07-6224-4748-b7ed-ca80c7039576.gif)


Và tiếp theo chúng ta hãy cùng Optimize bằng cách chỉnh lạ cách import component nhé. Chú ý ở đây mình dùng /* webpackChunkName: "component-C" */ để đặt tên cho file bundle nhé. ^^

```
// import ComponentC from './component-C';
const ComponentC = () => import(/* webpackChunkName: "component-C" */ './component-C');
```

Ok, bây giờ các bạn hãy chỉnh lại phần import của cả 3 component A, B, C nhé rồi load lại bật network lên kiểm tra nhé.

![](https://images.viblo.asia/9823b7ff-3aed-4ab5-85f4-2ff54741a387.gif)


Các ban hãy để ý phần network nhé, bây giờ các component của chúng ta đã được lazy load. Các bạn cũng có thể check code cuối cùng của mình ở nhánh này nhé. https://github.com/Nguyen-Xuan-Son/performance-vuejs/tree/performance_%231_Lazy_loading_Vue_Components

Để kiểm tra xem lazy loading hay chưa bạn cũng có thể chạy lệnh build nhé các ban sẽ thấy các file component của chúng ta được bundle ra. Các bạn hãy chú ý đó là phần trước và sau mình áp dụng cách này nhé. (Hay chưa nào ^^)

![](https://images.viblo.asia/b66de7f4-f3e2-4732-b19b-40559243fdf2.gif)

## 3. Kết luận
Như vậy ở phần này các bạn chắc cũng hiểu qua được như thế nào là lazy loading và Lazy loading Vue components là như thế nào. Mình sẽ còn tiếp tục ra thêm bài trong series này nhé, mong các bạn có thể ghé qua blogs.

Cám ơn bạn đã đọc bài viết, chúc bạn ngày càng thành công hơn trên con đường trở thành developer của mình nhé. ^^

Personal blogs: https://chamdev.com/

## 4. Tham khảo
[Lazy loading and code splitting in Vue.js](https://vueschool.io/articles/vuejs-tutorials/lazy-loading-and-code-splitting-in-vue-js/)

[Lazy load in Vue components](https://alexjover.com/blog/lazy-load-in-vue-using-webpack-s-code-splitting/)

[Dynamic Imports in Vue.js for better performance](https://vuedose.tips/tips/dynamic-imports-in-vue-js-for-better-performance/)