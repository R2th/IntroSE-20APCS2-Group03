# Thế nào là lazy loading ?
> Lazy loading (also called on-demand loading) is an optimization technique for the online content, be it a website or a web app.
Instead of loading the entire web page and rendering it to the user in one go as in bulk loading, the concept of lazy loading assists in loading only the required section and delays the remaining, until it is needed by the user.

Tạm dịch: Lazy loading là 1 kĩ thuật tối ưu các nội dung online trên web hoặc ứng dụng web. Thay vì tải toàn bộ trang web và hiển thị cho người dùng trong 1 lần tải các tài nguyên, khái niệm lazy loading chỉ hỗ trợ load các phần cần thiết và trì hoãn delay các phần tài nguyên còn lại cho đến khi người dùng cần.

Ví dụ: Giả sử người dùng tìm kiếm hình ảnh **logo of viblo**. Nếu toàn bộ trang web, nội dung yêu cầu đều được load thì bây giờ có một người hài lòng với logo đầu tiên thì phần còn lại của trang web (những logo phía sau người dùng không thấy được) rất lãng phí tài nguyên.
![](https://images.viblo.asia/72fc3ced-b7e1-4826-adc2-8aaf3074c8d2.png)

Ở hình ảnh trên là một ví dụ **infinity scroll**, những logo phía sau sẽ được tải khi người dùng cuộn xuống trang, kĩ thuật này rất phổ biến hiện tại từ React đến Vue đều có.

## Ưu điểm của lazy loading

* Load theo yêu cầu làm giảm mức tiêu thụ thời gian và sử dụng bộ nhớ của trình duyệt do đó tối ưu hóa việc phân phối nội dung trên trang web. Vì chỉ là một phần nhỏ của trang web được yêu cầu nên được load trước tiên, do đó thời gian thực hiện sẽ ít hơn và việc load phần còn lại sẽ được trì hoãn. Tất cả điều này nâng cao trải nghiệm của người dùng vì nội dung được yêu cầu được cung cấp nhanh chóng.
* Thực thi mã không cần thiết được tránh.
* Sử dụng tối ưu tài nguyên thời gian và không gian làm cho nó trở thành một cách tiếp cận hiệu quả về mặt chi phí theo quan điểm của người kinh doanh. (Chủ sở hữu trang web)

## Nhược điểm

* Để sửa đổi code, bổ sung tính năng này sẽ làm cho mã nguồn phức tạp.
* Đôi khi chức năng này sẽ ảnh hưởng đến thứ hạng web trên công cụ tìm kiếm, lập chỉ mục không đúng (vấn đề này có cách khắc phục bằng sử dụng các đoạn mã dữ liệu có cấu trúc như JSON-LD, microData...)

# Code Spliting

Chia tách mã là một trong những tính năng hấp dẫn nhất của webpack. Tính năng này cho phép bạn chia mã của mình thành nhiều gói khác nhau, sau đó có thể được tải theo yêu cầu hoặc song song. Nó có thể được sử dụng để đạt được các gói nhỏ hơn và kiểm soát mức độ ưu tiên tải tài nguyên, nếu được sử dụng đúng cách, có thể có tác động lớn đến thời gian tải.

Chúng ta đều dùng **dynamic imports**, **webpack supports**

## Vue

vue-router

Không dùng code spliting
```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
```
sau khi áp dụng kĩ thuật code spliting
```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Home')
    },
    {
      path: '/about',
      name: 'about',
      component: loadView('About')
    }
  ]
})
```

## React

react-router

Không dùng code spliting
```javascript
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import AdminPageSettings from "./pages/admin/AdminPageSettings";
export default function routes(fromServer) {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={HomePage}/>
      <Route path="/admin" component={AdminPage}/>
      <Route path="/admin/settings" component={AdminSettingsPage}/>
    <Router/>
  )
}
```

Sau khi dùng code spliting
```javascript
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import AdminPageSettings from "./pages/admin/AdminPageSettings";
const isReactComponent = (obj) => Boolean(obj && obj.prototype && Boolean(obj.prototype.isReactComponent));
const component = (component) => {
  return isReactComponent(component)
    ? {component}
    : {getComponent: (loc, cb)=> component(
         comp=> cb(null, comp.default || comp))}
};
export default function routes(fromServer) {
  return (
    <Router history={browserHistory}>
      <Route path="/" {...component(HomePage)}/>
      <Route path="/admin" {...component(AdminPage)}/>
      <Route path="/admin/settings"      
                  {...component(AdminSettingsPage)}/>
    <Router/>
  )
}
```

# Kết luận
Bài viết mang tính chất giới thiệu các kĩ thuật để tăng hiệu suất performance trang web, cải thiện trải nghiệm người dùng dưới đây là các đường dẫn bài viết khác có liên quan.

[Performance Optimization Vuejs](https://itnext.io/vue-js-app-performance-optimization-part-1-introduction-to-performance-optimization-and-lazy-29e4ff101019)

[Lazy Loading React Components (with react.lazy and suspense)](https://blog.bitsrc.io/lazy-loading-react-components-with-react-lazy-and-suspense-f05c4cfde10c)

[Dữ liệu có cấu trúc mà Google khuyên dùng](https://developers.google.com/search/docs/guides/intro-structured-data)

facebook: https://www.facebook.com/quanghung997