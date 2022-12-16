# **1.Giới thiệu:**

ReactJS là một thư viện tuyệt vời dành cho việc xây dựng một single page application (Client side rendering). Tuy nhiên có một vài vấn đề liên quan đến việc hiển thị tất cả nội dung ở phía client.
Đầu tiên,  việc sử dụng React để render thì sẽ mất nhiều thời gian hơn để hiển thị cho người dùng. Điều này là do trước khi tải nội dung, tất cả JavaScript phải tải và ứng dụng của bạn cần chạy để xác định nội dung sẽ hiển thị trên trang.
Thứ hai, nếu  như bạn muốn xây dựng một trang web phổ biến thì bạn lại vấn đề về SEO nội dung. Các công cụ tìm kiếm ngày nay đang dần tốt hơn trong việc Crawling, Rendering và Indexing  cho các ứng dụng được phát triển dựa trên JavaScript nói chung và React nói riêng. Sẽ là tốt hơn nếu như chúng ta xây dựng một ứng dụng Client-side nhưng việc render dữ liệu lại giống như một ứng dụng render ở phía server nghĩa là sẽ biên dịch tất cả mọi thứ ở phía server và trả về nội dung cho phía client. Điều này sẽ giúp trang web của bạn SEO tốt hơn và thời gian render cũng nhanh hơn.
Để có thể render ở phía server cho ứng dụng React thì chúng ta có thể sử dụng Next.js, một framework SSR dành cho ứng dụng React.

# **2.Tính năng chính:**

Dưới đây là một vài tính năng chính của Next.js:
1. Hot Code Reloading : Next.js sẽ tải lại trang khi phát hiện bất kỳ thay đổi nào được lưu vào bộ nhớ.
2. Automatic Routing : Bất kỳ url nào mà mapped đến các các file được đặt trong thư mục pages của ứng dụng thì bạn sẽ không cần phải cấu hình cho nó.
3. Server Rendering: Bạn có thể render các components của ứng dụng React ở phía máy chủ trước khi gửi HTML đến client.
4. Ecosystem Compatibility : Next.js hoạt động tốt với hệ sinh thái của JavaScript như Nodejs và React.
5. Automatic Code Splitting: Các trang sẽ được render với những thư viện và JavaScript mà chúng cần, sẽ không sử dụng những thư viện không cần thiết, từ đó tối ưu việc tải trang.
6. Prefetching: Link component sẽ được sử dụng để liên kết các trang khác nhau với nhau, hỗ trợ phương thức tìm và nạp trước tài nguyên trang trước khi trả về cho client.
7. Dynamic Components: Bạn có thể import các JavaScript module và các React Components tại đây.
8. Static Exports: Next.js cho phép export một trang web tĩnh từ ứng dụng React.

## **Cài đặt:**

Next.js hỗ trợ đa nền tảng nên bạn có thể dễ dàng cài đặt nó thông qua npm: 
```
npm install --save next react react-dom
```
Hoặc với Yarn :
```
yarn add next react react-dom
```
## **Bắt đầu**

Tạo tệp package.json với nội dung sau:
```
{  "scripts": {    "dev": "next"  }}
```
Nếu như bạn chạy câu lệnh dưới đây :
```
npm run dev
```
thì hệ thống sẽ xuất hiện lỗi  về việc không tìm thấy `pages `folder. Đây là thứ duy nhất mà Next.js yêu cầu để chạy.
Bạn sẽ phải tạo một thư mục các trang trống và chạy lại lệnh. Sau đó Next.js sẽ khởi động một máy chủ trên `localhost: 3000.`
Nếu như bạn truy cập URL đó ngay bây giờ, bạn sẽ được chào đón bởi một trang 404 thân thiện, với thiết kế sạch đẹp.

![](https://images.viblo.asia/975f61cd-654c-41e6-bf39-92bebd3f6b7f.png)

Next.js cũng xử lý các loại lỗi khác, chẳng hạn như lỗi 500.

## **Tạo trang trong Next.js**

Trong **pages** folder tạo một file `index.js` đơn giản như sau: 
```
export default () => (  
    <div>    
        <p>Hello World!</p>  
    </div>
)
```

Nếu như bạn truy cập vào `locallhost:3000` một lần nữa, component sẽ tự động được render lại.

Tại sao việc này lại đơn giản như vậy ?

Đó là bởi vì Next.js sử dụng cấu trúc `pages `dựa trên cấu trúc `filesystem`.
Nói một cách đơn giản và dễ hiểu thì các trang nằm trong một `pages` folder và URL của các trang sẽ dựa vào tên của các trang đó. Filesystem chính là các trang API.

## **Tạo thêm một trang khác**

Chúng ta sẽ tạo thêm một trang nữa với tên là contact.js và trang contact sẽ nằm trong `pages` folder:
```
export default () => (  
    <div>    
        <p>      
            <a href="my@email.com">Contact us!</a>    
        </p>  
    </div>
)
```
Nếu bạn truy cập vào đường dẫn `locallhost:3000/contac`t thì trang contact sẽ được hiển thị trên trình duyệt và trang nãy cũng là server-rendered.
Với **Hot Reloading** bạn sẽ không cần phải restart lại npm process để có thể tải trang contact. Next.js sẽ thực hiện điều này cho bạn.

## **Client Rendering**

Server-rendering rất thuận tiện trong việc tải trang đầu tiên. Tuy nhiên một khi nhắc đến việc điều hướng trong trang web thì client-rendering lại chính là chìa khóa quan trọng trong việc tăng tốc tải trang và tăng trải nghiệm người dùng.
Thật may là Next.js cũng quan tâm đến vấn đề này, Next.js cung cấp cho người dùng một Link component, bạn có thể sử dụng Link component để xây dựng liên kết. 
Chúng ta hãy thử liên kết 2 trang mà chúng ta đã tạo ở trên :
Đầu tiên chúng ta sẽ thay đổi trong file `index.js` :
```
import Link from "next/link"
export default () => (  
<div>    
    <p>Hello World!</p>    
    <Link href="/contact">      
        <a>Contact me!</a>    
    </Link>  
</div>)
```
Bây giờ hãy thử quay lại trình duyệt và thử truy cập đến trang Contact. Bạn có thể thấy rằng trang Contact sẽ được tải ngay lập tức mà không cần phải reload lại trình duyệt.Bạn có thể quay lại trang trước một cách bình thường như những trang web khác sử dụng SSR.

## **Dynamic pages**
Một ví dụ điển hình về việc sử dụng Next.js là xây dựng một trang Blog. Đây là một ví dụ tốt vì các Developers đều biết cách thức nó hoạt động và nó rất phù hợp để làm ví dụ đơn giản về cách xử lý `Dynamic pages`. Dynamic pages là trang không có nội dung cố định mà thay vào đó hiển thị một số dữ liệu dựa trên một số tham số.

Thay đổi trang `index.js` như sau :
```
import Link from 'next/link'
const Post = (props) => (  
<li>    
    <Link href={`/post?title=${props.title}`}>      
        <a>{props.title}</a>    
    </Link>  
</li>)

export default () => (  
    <div>   
    <h2>My blog</h2>   
        <ul>     
            <li>       
                <Post title="Yet another post" />        
                <Post title="Second post" />       
                <Post title="Hello, world!" />      
            </li>    
        </ul>  
    </div>
)
```

Khi bạn thực hiện thao tác này thì sẽ tạo ra một loạt các bài đăng và sẽ điền thông số truy vấn tiêu đề vào tiêu đề bài đăng:

![](https://images.viblo.asia/546a5092-a243-457d-ba80-0f3a5b8249fd.png)

Tiếp theo chúng ta sẽ tạo một file post.js bên trong pages folder. 
```
export default (props) => (  
    <h1>{props.url.query.title}</h1>
)
```

Bây giờ, khi bạn nhấp vào một bài đăng sẽ hiển thị tiêu đề bài đăng trong thẻ `h1`:

![](https://images.viblo.asia/3ac30ae6-a352-452a-99e5-2170167ff5c8.png)

Bạn có thể sử dụng URLs mà không có tham số truyền vào. Next.js Link component cung cấp một attribute `as` , bạn có thể sử dụng attribute này để truyền vào một slug.

```
import Link from 'next/link'
const Post = (props) => (  
    <li>    
        <Link as={`/${props.slug}`} href={`/post?title=${props.title}`}>      
            <a>{props.title}</a>    
        </Link>  
    </li>
)

export default () => (  
    <div>    
    <h2>My blog</h2>    
    <ul>      
        <li>        
            <Post slug="yet-another-post" title="Yet another post" />        
            <Post slug="second-post" title="Second post" />        
            <Post slug="hello-world" title="Hello, world!" />      
        </li>    
    </ul>  
    </div>
)
```

## **Css-in-JS**

Mặc định thì Next.js hỗ trợ styles-jsx, là một giải pháp cho những ai thích việc style css in Js. Tuy nhiên nếu như bạn thích thì vẫn có thể sử dụng các thư viện bên ngoài hỗ trợ cho việc này, chẳng hạn thư viện Styled Components

## **Exporting a static site**

Các ứng dụng Next.js có thể dễ dàng được xuất dưới dạng một trang web tĩnh. Sau đó, trang web tĩnh này có thể được triển khai trên một trong những máy chủ lưu trữ trang web tĩnh như Netlify hoặc Firebase Hosting, mà không cần thiết lập môi trường Node.

Quy trình này yêu cầu bạn khai báo các URL tạo nên trang web, nhưng đừng lo lắng vì đây chỉ là một quy trình rất đơn giản mà bất kỳ Developer nào cũng có thể dễ dàng thực hiện.

## **Deploying**

Thật dễ dàng để tạo một production-ready mà không cần đến soure maps hoặc các công cụ phát triển khác không cần thiết cho sản phẩm cuối cùng.
Ở phần trên chúng ta đã tạo một file `package.json`  
```
{  "scripts": {    "dev": "next"  }}
```
Đây là đoạn script dùng để start ứng dụng next.js bằng cách sử dụng câu lệnh `npm run dev`
Và bây giờ chúng ta cần thêm đoạn script dưới đây vào trong file `package.json`
```
{  "scripts": 
    {    
        "dev": "next",    
        "build": "next build",    
        "start": "next start"  
    }
}
```
và chuẩn bị ứng dụng của bạn bằng cách chạy `npm run build` và `npm run start`.

Công ty đứng sau Next.js cung cấp một dịch vụ lưu trữ tuyệt vời cho các ứng dụng Node.js, được gọi là **Now**. Tất nhiên họ tích hợp cả hai sản phẩm của mình để bạn có thể triển khai ứng dụng Next.js một cách liền mạch, sau khi bạn đã cài đặt **Now**, bằng cách chạy lệnh `now` trong thư mục ứng dụng. **Now** sẽ thiết lập một máy chủ cho bạn và bạn không cần phải lo lắng về bất cứ điều gì - chỉ cần đợi URL ứng dụng của bạn sẵn sàng.

# **3.Kết luận**
Đến đây thì bài viết của mình cũng khá là dài rồi, không thể trong một bài viết có thể nói hết được những tính năng tuyệt vời của Next.js , nên mình sẽ dừng tại đây. Các bạn có thể tìm hiểu thêm về Next.js tại trang chủ của Next.js

Nguồn tham khảo : 
https://www.freecodecamp.org/news/discover-next-js-and-write-server-side-react-apps-the-easy-way-cc920dea2d9d/  **Flavio Copes**