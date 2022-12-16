# `Page lazy loading for VueJS and Webpack`
Code splitting luôn là một vấn đề quan trọng nên được các developer quan tâm và chú ý nếu muốn project có thể scalable và easy to maintain, easy for việc follow and control. Ngoài nhưng công dụng trên, chia tác các container cha lớn thành nhiều component và container nhỏ hơn còn để phục vụ cho việc lazy loading. 1 Single Page App có thể rất lớn và nặng đến vài trăm đến vài mb. User nào lại muốn phải nhìn thanh loading chạy vòng vòng cả tiếng mới load được xong. user first approach bao gồm việc cho phép user có thể tương tác ngay khi có thể, mang lại trải nghiệm tốt nhất. Với cách tiệm cận như vậy là cũng là cơ chế để Google mong muốn và tăng thứ hạng SEO cho những website như vậy.
Với Vue thì packing module thường là Webpack - đã hỗ trợ rất tốt cho việc async load và bundle file hiệu quả. Ở bài này t sẽ tiếp cận cách chia container theo hướng qua page và qua page fold.
![](https://images.viblo.asia/767c0e7d-6736-4159-bb12-d4489775960e.png)

## Page
Điều này là dẽ dàng khi project đã áp dụng với vue router trong việc phân chia route tương ứng với các page. Khi user vào các route này thì bundle tương ứng của nó mới được gửi request và load. Như vậy không lần loading lần đầu tiên sẽ nhẹ hơn chứ không phải load tất cả các page về nữa.
```js
const Home = () => import(/* webpackChunkName: "home" */ './Home.vue')
const About = () => import(/* webpackChunkName: "about" */ './About.vue')
const Contact = () => import(/* webpackChunkName: "contact" */ './Contact.vue')
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/contact', name: 'contact', component: Contact }
]
```
Thử kiêm tra bảng network và thấy các page được lazy load thành công.
![](https://images.viblo.asia/e42bd98e-b53b-4b1e-9f62-457b86b45ab7.png)

## Below The Fold
Khái niệm bắt nguồn từ hình ảnh chiếc laptop. Below the fold hay là tất cả những gì mà user không thể nhìn thấy được, bên dưới góc gập từ laptop. Như vậy cần trú trọng vào việc loading thành phần up the fold nhanh nhất có thể, nhưng thành phần dưới không quan trọng bằng vì user không thể nhìn thấy, có thể sử lý lazy loading ở đây.
```js
<template>
  <div>
    <div class="jumbotron">
        <h1>Jumbotron heading</h1>
        ...
    </div>
    <below-fold></below-fold>
  </div>
</template>
<script>
const BelowFold = () => import(/* webpackChunkName: "below-fold" */ './BelowFold.vue')
</script>
```
![](https://images.viblo.asia/8d233d2c-3897-4517-bde0-f4eaf2c17d9d.png)

## Conclusion
Trên đây là những bước cơ bản để thực hiện lazy loading trên vue. Trên React có thể sử dụng Loadable cũng rất dễ dàng tiếp cận với cách này. Trên đây mới chỉ là những cách đơn giản nhất thực hiện lazy loading qua việc xử lý với các page lớn, ngoài ra còn nhiểu pattern và các method thú vị khác nữa hy vọng tôi có thể được chia sẻ trong các bài tiếp theo.

### `References`
1. https://medium.com/js-dojo/3-code-splitting-patterns-for-vuejs-and-webpack-b8fff1ea0ba4
2. https://brolik.com/blog/above-the-fold-vs-below-the-fold-everyone-scrolls/