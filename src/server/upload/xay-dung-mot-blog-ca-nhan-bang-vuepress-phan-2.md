# Tổng quan về cấu trúc VuePress
## Directory Structure

![](https://images.viblo.asia/f2598e65-dc0a-4886-9eb4-6ffc0ae628e2.png)

* ***.vuepress***: Đây là thư mục chính sẽ lưu trữ toàn bộ các component, config, các static resources,...
* ***.vuepress/components:*** Thư mục sẽ lưu trữ toàn bộ Vue component. Tất cả component ở đây sẽ được lưu trữ dưới dạng global
* ***.vuepress/theme***: Lưu trữ toàn bộ theme
* ***.vuepress/styles***: Lưu trữ toàn bộ file style
* ***.vuepress/styles/index.styl***: Khởi tạo các style dưới dạng global, sẽ ghi đè style mặc định.
* ***.vuepress/styles/palette.styl***: Ghi đè các tham số màu mặc đinh.
* ***.vuepress/public***: Nơi lưu trữ các static resource.
* ***.vuepress/templates***: Nơi lưu trữ các file HTML template.
* ***.vuepress/templates/dev.html***: Nơi lưu trữ các file HTML template khi phát triển
* ***.vuepress/templates/ssr.html***: Vue SSR dựa trên HTML template file khi built.
* ***.vuepress/config.js***: File config, có thể là file yml hoặc toml.
* ***.vuepress/enhanceApp.js***: Mở rộng ở tầng App ( Do bản thân VuePress cũng là Vue App nên bạn có thể mở rộng thêm cho ứng dụng mình ở đây)

> Note: Toàn bộ thư mục và file trong .vuepress là tuỳ chọn, giúp bạn có thể mở rộng tuỳ theo ý thích của mình.

## Router

VuePress sẽ dựa theo cấu trúc thư mục mà tự động khởi tạo các router tương ứng.


| Đường dẫn thư mục | Đường dẫn trên trình duyệt|
| -------- | -------- |
| /README.md     | /     |
| me/README.md     | /me/     |
| /config.md   | /config.html    |

## Configuration

Nếu không có file config, ứng dụng VuePress của bạn sẽ tương đối tối giản, chúng ta không thể điều hướng tới các trang con khác. Để có thể tuỷ biến trang của mình, hãy tạo một file ***config.js*** trong thư mục ***.vuepress***.
> Note: File config của VuePress phải là một JavaScript object được export

```javascript:.vuepress/config.js
module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around'
}
```

Để biết thêm về các tuỳ chọn trong config, bạn có thể thao khảo tại đây : [https://vuepress.vuejs.org/config/](https://vuepress.vuejs.org/config/)

# Xây dựng Blog bằng VuePress
Như phần trước mình đã nói, **VuePress** cho phép bạn tự tạo **Vue Component** và thêm vào trong file Markdown. Như ở đây mình sẽ tạo 1 component chó thể hiển thị danh sách bài blog.

Để bắt đầu, chúng ta hãy tạo một thư mục tên là components trong thư mực .vuepress. Đây sẽ là nơi chúng ta thêm các component. Tất cả component sẽ được khởi tạo global, nên ta không cần import khi sử dụng.

Ta hãy tạo một Vue Component tên là **BlogIndex.vue**
```html:.vuepress/components/BlogIndex.vue
<template>
<div>
    <div v-for="post in posts">
        <h2>
            <router-link :to="post.path">{{ post.frontmatter.title }}</router-link>
        </h2>
        
        <p>{{ post.frontmatter.description }}</p>

        <p><router-link :to="post.path">Read more</router-link></p>
    </div>
</div>
</template>

<script>
export default {
    computed: {
        posts() {
            return this.$site.pages
                .filter(x => x.path.startsWith('/blog/') && !x.frontmatter.blog_index)
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
        }
    }
}
</script>
```
Như bạn có thể thấy ở trong computed mình có sử dụng ***this.$site.pages***. Đây là thuộc tính giúp ta có được metadata và từ đó ta có thể biết được đường dẫn tới các trang.

Bên cạnh ta có thể sử dụng ***this.$page*** để thông tin đường dẫn tới trang hiện tại.

Bên cạnh việc lấy được đường dẫn, hai giái trị this.$page và this.$site còn có một số thuộc tính bên cạnh mà ta có thể tham khảo thêm tại đây: [https://vuepress.vuejs.org/theme/writing-a-theme.html#site-and-page-metadata](https://vuepress.vuejs.org/theme/writing-a-theme.html#site-and-page-metadata)

Đây là một component có logic tương đối đơn gian. Ta sẽ duyệt tất cả bài viết và hiển thị ra. Bên cạnh đó, ta sự dựng **router-link** để định tuyến do bạn thân VuePress đã được tích hợp sẵn **vue-router**.

Cùng với đó, mình sử dụng một computed có tên là post để nhận biết được danh sách bài viết, nó sẽ giúp VuePress render lại danh sách bài viết khi bất cứ bài viết nào được tạo mới.

Ta tạo một thư mục tên là blog ở thư mục gốc. Trong thư mục này, tạo một file **README.md** Đây sẽ là blog index, và ở đây ta sẽ thêm component BlogIndex.
```markdown:blog/README.md
---
blog_index: true
---
# Blog

Welcome on My Blog

<BlogIndex />
```
**blog_index** được khai báo đầu để chắc chắn rằng blog index sẽ không được list vào danh sách bài post như ta đã filter ở trên ở computed.

Bước tiếp theo là tạo blog đầu tiên. Trong thư mục blog, tạo một file tên là **first-post.md**

```markdown:blog/first-post.md 
---
title: Mỗi ngày tôi chọn một niềm vui
date: 2018-07-28
description:
    Kielbasa tenderloin boudin bacon cupim, pastrami strip steak rump picanha meatloaf venison meatball ribeye. Burgdoggen t-bone jowl venison biltong andouille. Turducken shankle tongue landjaeger drumstick, pancetta porchetta. Brisket ham turkey andouille picanha. Pancetta chuck shank ham.
---

# First post

/* Your awesome content goes here */
```

Vậy là đã xong rùi đó. Bạn bắt đầu chạy 
> yarn dev 

Tuỳ theo đường dẫn ở localhost của bạn. ví dụ của mình sẽ là [http://localhost:8081/blog/](http://localhost:8081/blog/).

Nhưng thế này có vẻ hơi bất tiện nhỉ, đừng lo VuePress sẽ giúp bạn tạo điều hướng trên thanh navigation chỉ bằng vài ba dòng.

Quay lại file **config.js**, ta chỉ cần thêm như sau:

```javascript:.vuepress/config.js
module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/blog/' },
        ]
    }
};

```
Refresh lại trang và ta click vào Blog trên thanh Navigation

![](https://images.viblo.asia/1731d686-db9d-4e38-9620-17b1b875cb92.png)

# Tổng kết


> Link repo Github: https://github.com/quanKM/vuepress-demo
> 
Vậy là chúng ta đã có thể tự tạo một trang Blog bằng VuePress cho riêng mình. Trong phần tới mình sẽ hướng dẫn mọi người deploy một trang blog lên Github.