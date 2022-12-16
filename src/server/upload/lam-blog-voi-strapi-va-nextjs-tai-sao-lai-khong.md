Ngày trước nếu làm một blog, người ta nghĩ ngay đến huyền thoại là [WordPress](https://wordpress.com/) và đến thời điểm bây giờ wordpress vẫn là một sự lựa chọn đáng để cân nhắc. Khi không rành về kỹ thuật muốn setup một bog, đơn giản chỉ để chia sẽ thông tin thì wordpress vẫn là sự lựa chọn tốt.

Những ai yêu thích công nghệ thích, thích khám phá, thử thách bản thân, muốn làm một blog cá nhân không phải là wordpress cũ rích thì hôm nay mình giới thiệu cho các bạn một open source [Strapi](https://strapi.io/), 

Strapi là gì, nó open source, một framework NodeJS giúp bạn quản lí nội dung CMS một cách dẽ dàng và xây dựng sẵn các Rest full API cũng như khả năng custom API. Giúp chúng ta tiết kiệm hàng tuần hàng tháng phát triển. Nếu chúng ta cần custom theo những ứng dụng đặc thì `Strapi` cung cấp giải pháp viết plugin để cài cắm vào hệ thống. 

Ngoài ra, strapi còn tích hợp nhiều framework JS giúp việc build `Front-end` trở nên dễ dàng hơn rất nhiều

Cùng xem danh sách các framework có thể tích hợp được nhé
1. Gatsby CMS
1. React CMS
1. Next.js CMS
1. Vue.js CMS
1. Nuxt.js CMS
1. Angular CMS

Nó rất đa dạng, tuỳ thuộc vào thế mạnh của mình mà bạn sẽ lựa chọn cho mình những framework phù hợp với mình để bạn phát triển.

Trong bài viết này mình sẽ sử dụng NextJS để làm `Fontend` cho blog của mình. Vì sao mình lại chọn NextJS vì đơn giản là mình đang nghiên cứu NextJS. Một công đôi việc phải không? 

NextJS là ReactJS nhưng hỗ trợ server render nên sẽ tối ưu hoá cho vấn đề `SEO` . Blog mà ngoài load nhanh,`SEO`
là một yếu tố quan trọng.  Không `SEO` được thì ai xem được những gì bạn chia sẻ phải không?

Nói dông dài quá, bây giờ hãy bắt đầu cài đặt `Strapi` .  Strapi yêu cầu NODE version 10.xx và NPM version 6.xx

Để kiểm tra trên máy đã cài NODE và NPM chưa bạn hay dùng 2 lệnh dưới, nếu thông tin hiển thị như hai hình dưới là bạn đã cài thành công NODE rồi, còn chưa cài bạn có thể lên  trang chủ [NODE](https://nodejs.org/)  để cài đặt

1.  `NODE` version 10.xx

![](https://images.viblo.asia/67b16abf-34c1-41d1-b7d3-4866c95c7354.png)

2.  `npm` version 6.xx

![](https://images.viblo.asia/03889ce8-97be-43b4-934a-d678a58e309d.png)

Trong loạt bài hướng dẫn này mình sử dụng Strapi và NextJS, cơ sở dữ liệu là graphQL nên các bạn cũng nên tìm hiểu thêm những công nghệ mình còn thiếu để củng cố thêm kiến thức cho mình nhé 

Đầu tiên chúng ta clone strapi đã tích hợp sẵn NextJS về 

```
git clone https://github.com/strapi/strapi-starter-next-blog.git
cd strapi-starter-next-blog
```

khi clone về xong bạn sẽ nhìn thấy 2 thưc mục chính là front-end và back-end. Backend build bằng NODEJS có một plugin `admin`
 mà strapi làm sẵn cho ta, chúng làm gì thì chúng ta sẽ tìm hiểu ở các bài tiếp theo. Frontend ở đây chính là NextJS.
 
 **Features**
* 2 Content types: Article, Category
* 2 Created articles
* 3 Created categories
* Permissions set to true for article and category
* Responsive design using UIkit

**Pages**
* "/" display every articles
* "/article/:id" display one article
* "/category/:id" display articles depending on the category

 
 Bước tiếp theo là chúng ta mở terminal của mình lên vào run comamline code sau. Tuỳ bác nào dùng `yarn`
 hay `npm` thì dùng lệnh tương ứng nhé
 
```
# Using yarn
yarn setup:yarn

# Using npm
npm run setup:npm
```

Cái này là strapi sẽ download các `dependencies` về và cài đặt cho chúng ta,  xong xuôi ta chuyển sang start xem chúng hoạt động thế nào

Nếu bạn muốn start 1 lúc cả frontend và backend bạn dùng lệnh 1 trong 2 lệnh sau:

```
# Using yarn
yarn build:yarn
yarn develop:yarn

# Using npm
npm run build:npm
npm run develop:npm
```

còn nếu bạn muốn start riêng từng thằng cũng không sao

Với backend bạn dùng lệnh 1 trong 2 lệnh sau:

```
cd backend

# Using yarn
yarn build
yarn seed
yarn develop

# Using npm
npm run build
npm run seed
npm run develop
```

 Frontend cũng tương tự thế:
 
```
cd frontend

# Using yarn
yarn develop

# Using npm
npm run develop
```

Và lúc này bạn sẽ nhận được kết quả như sau:

Next server is running here => http://localhost:3000 Strapi server is running here => http://localhost:1337

Và trên trình duyệt bạn sẽ nhìn thấy kết quả như hình dưới, thì xin chúc mừng bạn đã setup thành công một blog Strapi và NEXTJS

![](https://images.viblo.asia/32244017-7b20-4916-8b22-483941c865fb.png)

Mình setup xong thấy ảnh đang bị lỗi, chắc liên quan đến role permission. Mình sẽ cùng nghiên cứu tiếp trong phần 2 của seri này nhé 

Hi vọng những chia sẻ của mình giúp bạn có thêm kiến thức cũng như làm một blog cá nhân chuyên nghiệp