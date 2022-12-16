# Ayyo, What's up man!!
Chào các bạn, chúng ta lại trở lại với chủ đề tiếp theo trong Series Next.js này đó là Routing. Routing chính là việc chúng ta tạo ra các đường dẫn đến các trang khác nhau trong website của chúng ta, hay là chuyển trang qua lại trong 1 trang web. Với Reactjs thì chúng ta sẽ cần cài thêm 1 package là react-router, còn với Next.js thì mọi thứ đơn giản hơn rất nhiều, Next.js đã làm hết cho chúng ta, và cứ bốc ra dùng thôi :v: 
## 1. Giới thiệu về Routing trong Next.js
Khi nhắc đến routing trong Next.js, người ta thường nhắc đến những điều sau:
- Cơ chế File-system base routing: hiểu đơn giản là tạo ra 1 file cũng là đã tạo ra đường dẫn đến trang web mà file đó thể hiện, tên file sẽ là đường dẫn.
- Khi mà 1 file được thêm vào folder `pages` ở trong project, thì nó sẽ tự động trở thành 1 đường dẫn ở trong dự án Next.js. Ví dụ, mình thêm 1 file `about.js` vào folder `pages` thì chúng ta có ngay 1 đường dẫn vào trang, ví dụ là: localhost:3000/about rồi.
- Bằng việc chúng ta tạo ra các file, folder ở trong folder `pages`, thì có thể tạo ra hầu hết các đường dẫn mà chúng ta cần cho 1 trang web rồi.

Trước khi vào việc, chúng ta sẽ mở project Next ở [phần trước ](https://viblo.asia/p/nextjs-2021-da-lo-yeu-react-roi-ngai-gi-yeu-them-next-1Je5EaL15nL) mình đã cùng các bạn tạo ra nhé ( nhớ chạy câu lệnh `yarn dev` để start project nhé) , mình sẽ vào folder `pages` và xoá đi folder `api` cùng với `index.js` để chúng ta làm từ đầu luôn.

![](https://media.giphy.com/media/qVHLYRv925kLAwUJBT/giphy.gif?cid=790b761159a5af545cdb748268d1b50e06d37dca00190e6e&rid=giphy.gif&ct=g)

Dưới đây mình sẽ đưa ra các trường hợp phổ biến nhất về các route mà khi làm 1 trang web mà các bạn có thể gặp.
## 2. Route với pages
- Với Next.js, mỗi page sẽ được tạo ra từ 1 React Component được export từ các file `.js, .jsx, .ts, .tsx` trong folder `pages`, mỗi trang sẽ có đường dẫn dựa trên tên file của nó. 

**Trường hợp 1**: Trang home như ảnh dưới đây: đơn giản chỉ là 1đường dẫn cơ bản ở local: `localhost:3000`.

![](https://images.viblo.asia/b5ff486b-fe22-42be-9641-2a00c278a388.png)

- Khi vào 1 trang web nào đó, bạn đều quan tâm đến trang chủ ( home) của trang web đó, vậy với Next.js, chúng ta có thể tạo trang home như thế nào? Rất đơn giản thôi, bạn chỉ cần tạo 1 file `index.js` ở trong folder `pages` và code giao diện của nó, Next.js đã lo việc làm thế nào để xử lý và biết đó là trang home rồi, đại khái bạn cứ đặt tên là index.js thì đường dẫn sẽ được match với tên folder chứa file index.js của folder đó.

**Ví dụ**:
- Mình tạo 1 file `index.js` trong `pages` và gõ đoạn code này vào: 

```
function Home() {
  return <h1>Home</h1>;
}

export default Home;
```

và save lại, sau đó vào trình duyệt truy cập `localhost:3000`

**Demo**: 

![](https://media.giphy.com/media/KLGHKGlTqpopxrOVXI/giphy.gif?cid=790b7611c66cb07eedb7b3a0dcbace268cded0cc6ab4a559&rid=giphy.gif&ct=g)

**Trường hợp 2: :** Có thêm các đường dẫn khác  ví dụ: `/about` hoặc `/profile`
![](https://images.viblo.asia/f2966417-ef70-4432-8bca-68821e6ee0de.png)

Và rồi bạn tự đặt ra câu hỏi: Thế tạo ra các trang khác thì sao? dừng lại 5s nào, nếu bạn đọc qua phần giới thiệu bên trên chắc hẳn bạn cũng đoán ra, đơn giản là bạn muốn đường dẫn đến trang đó như nào, tên gì thì đặt tên file cho giống đường dẫn là được.

Ví dụ: 
- Mình sẽ thêm file `about.js` và `profile.js` vào `pages`, và cũng thử trên localhost nhé.
- File `about.js`: 

```
function About() {
  return <h1>About page</h1>;
}

export default About;
```

- File `profile.js`

```
function Profile() {
  return <h1>Profile page</h1>;
}

export default Profile;
```
 Và cùng vào `localhost:3000/about` và `localhost:3000/profile` để thử nhé.
 
 **Demo:**
 
 ![](https://media.giphy.com/media/bZl8kEXGXZDL6hwhsW/giphy.gif?cid=790b7611f3c94e7ed7487c2cf6591c2caa76e0051e75bce6&rid=giphy.gif&ct=g)
## 3. Nested routes (các đường dẫn lồng nhau)
**Trường hợp 3:** Các đường dẫn lồng nhau
![](https://images.viblo.asia/0c48d4cf-3f39-42d5-a033-892a89964939.png)

Đến đây chắc các bạn sẽ có thêm các thắc mắc, là các đường dẫn đâu chỉ đơn thuần là các trang đơn lẻ, mà nó còn là đường dẫn lồng nhau, ví dụ như các đường dẫn ở trên ảnh trên: `localhost:3000/blog/first` và `localhost:3000/blog/second`.

Thì với Next.js thì cũng là cơ bản thui,  bạn chỉ cần tạo folder `blog` rồi tạo thêm file `first.js` và `second.js`

File `first.js`: 
```
function First() {
  return <h1>First blog page</h1>;
}

export default First;
```
File `second.js`:
```
function Second() {
  return <h1>Second blog page</h1>;
}

export default Second;
```

Cấu trúc file và đường dẫn tương ứng sẽ như này: 
- `pages/blog/first.js` → `/blog/first`
- `pages/blog/second.js` → `/blog/second`
- `pages/blog/index.js` → `/blog`

![](https://images.viblo.asia/590099e7-07b2-4be5-bb78-21ccbff8aafc.png)

Chúng ta hãy cùng vào thử `localhost:3000/blog/first` và `localhost:3000/blog/second` xem kết quả nhé

**Demo**: 

![](https://media.giphy.com/media/AyaA46TgEVZ9HLAVKk/giphy.gif?cid=790b7611faf48f688b69ed064aad20aa9f4131fcfb879de5&rid=giphy.gif&ct=g)

**Lưu ý**: Khi mà các bạn tạo file `blog.js` và folder `blog` và  có tạo file `index.js` trong đó thì khi đó truy cập vào `localhost:3000/blog` nó sẽ lấy nội dung của `blog.js` nhé!
## 4. Dynamic routes
**Trường hợp 4**: Có params là tuỳ ý mình (động)
![](https://images.viblo.asia/7fd498ef-9928-4828-a88c-1fd0b52a5c68.png)

- Đến đây chúng ta lại gặp 1 trường hợp phổ biến nữa. Ví dụ chúng ta có 1 danh sách sản phẩm và muốn xem chi tiết sản phẩm đó, thường đường dẫn sẽ là: `localhost:3000/product/id` với `id` có thể là các con số ứng với id sản phẩm và có thể dùng id đó để call API query ra chi tiết sản phẩm đó như `localhost:3000/product/1`,... với phần trước chúng ta có thể làm là tạo ra 1 folder `product` và thêm các file `1.js, 2.js, 3.js ` ứng với mỗi id của mỗi sản phẩm sẽ là 1 file. Hmmm... thế có khoản 100 sản phẩm thì ăn cám à. 
- Nhưng mà Next.js của chúng ta có thể thêm dấu ngoặc vuông vào các file để tạo ra đường dẫn động (`[param]`). Như trong trường hợp trên chúng ta có thể tạo ra các trang chi tiết sản phẩm như sau: `pages/product/[productId].js`

![](https://images.viblo.asia/1cda747c-227b-40d5-ab04-110d4535a5be.png)

- File `index.js` :

```
function ProductList() {
  return (
    <div>
      <h1>Product 1</h1>
      <h1>Product 2</h1>
      <h1>Product 3</h1>
    </div>
  );
}

export default ProductList;
```

- File `[productId].js`: 

```
import { useRouter } from "next/router";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;

  return <p>Product: {productId}</p>;
};

export default ProductDetail;
```
- Từ giờ, các đường dẫn có kiểu `product/1` hay `product/abc` sẽ đều thuộc `pages/product/[productId].js`, và ở trường hợp này, vậy thì các bạn có thể đặt ra câu hỏi là làm sao để lấy được những param sau `/product` kia, các bạn có thể thấy đoạn code bên trên kia có 1 đoạn này: 

```
const router = useRouter();
const { productId } = router.query;
```
`query` kia sẽ là 1 object chứa các param của bạn
- Ví dụ: đường dẫn `/product/abc` thì object`query` sẽ là: 

```
{ "productId": "abc" }
```

- Tương tự: đường dẫn `/product/abc?foo=bar` sẽ có object `query` là: 

```
{ "foo": "bar", "productId": "abc" }
```

**Lưu ý 1:**: Nếu các tham số ở đường dẫn trùng nhau: ví dụ: `/product/abc?productId=123`, ở đây chúng ta thấy đang đặt `productId=123` trùng tên với file `[productId].js`, tham số sẽ được override và chỉ là: 

```
{ "productId": "abc" }
```

**Lưu ý 2:** Nếu các bạn tạo 1 file với 1 cái tên nào đó: `pages/product/anyName.js`, thì Next.js sẽ ưu tiên vào file này chứ không vào `[productId].js`

Demo: 

![](https://media.giphy.com/media/VYisQm8Vy5yUnShF0I/giphy.gif?cid=790b761174150f2d10b88105aa11dc50be76979e69b03744&rid=giphy.gif&ct=g)

**Trường hợp 5:** 
![](https://images.viblo.asia/83a4585c-b710-498b-bad8-97e402bda4ff.png)

- Các bạn có thể thấy ở trường hợp này có các đường dẫn động lồng nhau kiểu như `localhost:3000/product/1/review/1`, khái quát lại thì chúng ta sẽ có dạng: `localhost:3000/product/productId/review/reviewId`.
- Như vâỵ mình sẽ có 1 folder như sau: `pages/product/[productId]/review/[reviewId].js`

![](https://images.viblo.asia/3f825f42-fdc2-4959-b746-e447299ecb14.png)

File `[reviewId].js`:

```
import { useRouter } from "next/router";

const ReviewDetail = () => {
  const router = useRouter();
  const { productId, reviewId } = router.query;

  return (
    <p>
      Review: {reviewId} Product: {productId}{" "}
    </p>
  );
};

export default ReviewDetail;

```

**Demo**: 

![](https://media.giphy.com/media/qTppc0d34NxoFAUzqj/giphy.gif?cid=790b761131b86d66f0ba0f394539d0bf2cb801aa9326704a&rid=giphy.gif&ct=g)

## 5. Catch-all routes
**Trường hợp 6**: 

![](https://images.viblo.asia/5ff3d427-7350-4e95-a48c-fbe1279d7c1a.png)

Có lẽ chúng ta cũng mệt nhoài với việc quá nhiều đường dẫn rồi, đến với trùm cuối thôi, 1 câu lệnh lấy tất cả các đường dẫn, chúng ta có thể dùng file với 3 dấu chấm (`...`) trước tên và bọc trong `[]`, ví dụ: `pages/docs/[...params].js`, bạn có thể thay `params` bằng bất cứ tên gì bạn muốn.
- `pages/docs/[...params].js`  sẽ match với đường dẫn `/docs/a`, hay `/docs/a/b`, `/docs/a/b/c`  bất cứ đường dẫn nào sau `/docs`.
- Với đường dẫn là: `/docs/a` thì object `query` lúc này sẽ là: `{ "params": ["a"] }`, hay đường dẫn `/docs/a/b` sẽ có `query` là: `{ "docs": ["a", "b"] }`
- File `[...params].js:`
```
import { useRouter } from "next/router";

function Doc() {
  const router = useRouter();
  const { params = [] } = router.query;
  console.log(params);

  if (params.length === 2) {
    return (
      <h1>
        Viewing docs for feature {params[0]} and concept {params[1]}
      </h1>
    );
  } else if (params.length === 1) {
    return <h1>Viewing docs for feature {params[0]}</h1>;
  }

  return <h1>Docs Home Page</h1>;
}

export default Doc;
```

**Demo**:

![](https://media.giphy.com/media/a4iaCg7lmjhA59rWCd/giphy.gif?cid=790b7611aa512db43d66b44a4a18fbbb13973331192ae0f7&rid=giphy.gif&ct=g)

## 6. Navigate from the UI: chuyển trang trên UI
- Từ tất cả các demo bên trên, các bạn đều thấy chúng ta đang dùng đường dẫn để chuyển trang, vậy để chuyển trang bằng cách click vào 1 đường link hay 1 item trên thanh menu thì chúng ta làm thế nào, chúng ta hãy quay lại file: `pages/product/index.js` mà chúng ta đã tạo ở bên trên và mình sẽ sửa lại 1 chút như này: 

```
import Link from "next/link";

function ProductList({ productId = 100 }) {
  return (
    <div>
      <h1>
        <Link href='/product/1'>
          <a>Product 1</a>
        </Link>
      </h1>
      <h1>
        <Link href='/product/2'>
          <a>Product 2</a>
        </Link>
      </h1>
      <h1>
        <Link href='/product/2'>
          <a>Product 3</a>
        </Link>
      </h1>
      <h1>
        <Link href={`/product/${productId}`}>
          <a>Product {productId}</a>
        </Link>
      </h1>
    </div>
  );
}

export default ProductList;
```
- Các bạn có thể thấy mình đã bao bên bên ngoài các item `Product 1`, `Product 2`, ... bằng thẻ `<Link />` của Next.js với thuộc tính `href` sẽ là nơi đặt đường dẫn các bạn muốn đi tới.

**Demo**: 

![](https://media.giphy.com/media/dUt9I5votBCtdUXIuW/giphy.gif?cid=790b76111034a0e8321295003586e76a07ccd3debcf5a243&rid=giphy.gif&ct=g)

## 7. Programatically navigate b/w Pages: Điều hướng có lập trình
- Ở đây sẽ có nhiều khi bạn không muốn dùng `Link` để điều hướng, mà bạn muốn click vào 1 button nào đó, xử lý gì đó xong rồi mới chuyển trang.

![](https://images.viblo.asia/4897397e-f8c2-4526-862d-279c97365b3f.png)

Ở file `pages/product/index.js` mình sẽ thêm 1 nút bấm và sử dụng `useRouter` của Next.js, khi gọi hàm `handleClick`, mình sẽ tiến hành gọi `router.push("/about");` để chuyển sang trang `/about`

```
import Link from "next/link";
import { useRouter } from "next/router";

function ProductList({ productId = 100 }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about");
  };

  return (
    <div>
      ...
      <button onClick={handleClick}>Go To About page</button>
    </div>
  );
}

export default ProductList;

```

**Demo**: 

![](https://media.giphy.com/media/UoIiXyunvpsXerHbVj/giphy.gif?cid=790b761189f8e8717057b5412b7211a2bad36d461f39e316&rid=giphy.gif&ct=g)
## 8. 404 Pages
Một trường hợp phổ biến khi người dùng thao tác với web là sẽ gõ sai đường dẫn, thì Next.js sẽ giúp chúng ta hiển thị 1 trang mặc định không tìm thấy.
![](https://images.viblo.asia/224ca71a-fc8e-4dc7-b1d1-62d1bd8d1172.png)

Và chúng ta hoàn toàn có thể custom lại trang 404 Not found này bằng cách tạo 1 file `404.js` ở trong folder `pages` và thoải mái custom cho trang not found.
Ví dụ: 
- Tạo 1 file 404.js với nội dung:
```
function PageNotFound() {
  return <h1>Page not found custom</h1>;
}

export default PageNotFound;
```
Save lại và cũng vào localhost gõ bừa 1 đường dẫn để thử.

Demo:

![](https://media.giphy.com/media/baSgGrixcXthZ9TlQI/giphy.gif?cid=790b7611c07149baf413e5e5b1042115dcb0a008e59a1274&rid=giphy.gif&ct=g)
## 9. Tổng kết
- Các file được tạo ra trong `pages` sẽ trở thành đường dẫn đến trang đó.
- Nested Routes: Các folder lồng nhau, các file sẽ trở tự động trở thành đường dẫn trên thanh url của website.
- Dynamic routes: có thể thêm `[]` vào tên file để tạo ra đường dẫn động.
- Catch All routes: Có thể thêm three dot (`...`) vào bên trong `[]` tên file để tạo ra đường dẫn match với tất cả.
- Sử dụng `Link` component để chuyển trang trên giao diện
- Hook `useRouter` có phương thức `.push` cũng giúp bạn chuyển trang mà không cần `Link`.

Mình có tham khảo ở website chính thức của [Next.js](https://nextjs.org/docs/routing/introduction) và kênh Youtube [Codevolution](https://www.youtube.com/channel/UC80PWRj_ZU8Zu0HSMNVwKWw)

Cảm ơn các bạn đã theo dõi, mong nhận được ý kiến đóng góp của các bạn để có những kiến thức và bài viết tốt hơn!