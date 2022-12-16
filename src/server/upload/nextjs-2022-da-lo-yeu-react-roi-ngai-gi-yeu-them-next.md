## Hi Guys
Có lẽ đây là bài viết đầu tiên của mình trên Viblo, mình cũng suy nghĩ khá nhiều không biết nên chọn chủ đề gì để viết vừa mới mẻ mà vừa để bản thân mình cũng có thể học được cái mới, và mình cũng có thể dễ tiếp cận từ base sẵn có ( mình là FE và sử dụng React), và mình đã chọn Next.js, thấy bạn này cũng đang hot, anh em đang biết Reactjs rồi có thể dễ dàng tiếp cận,... thế nên là chiến thôi :clap:.

Mình viết bài này với tâm thế là người đang trong quá trình tìm hiểu một kiến thức mới nên cũng không tránh khỏi sai sót, mong các cao nhân đi qua có thể để lại "còm men" góp ý và chúng ta cũng sẽ cùng trao đổi nhé :innocent:

À, và trước khi đọc bài này, mình hi vọng các bạn đã có kiến thức về web, lập trình web và ReactJs nhé!!!
## 1. Next.js là gì?
> The React Framework
for Production

Ngay như câu giới thiệu khi bạn mới vào trang chủ của [Next.js](https://nextjs.org/) thì họ đã nói rằng: Next.js là 1 framework của Reactjs và nó sẵn sàng để bạn deploy trang web của bạn lên luôn, và nếu bạn đã biết về React rồi thì việc tiếp cận với Next.js sẽ dễ dàng hơn rất nhiều.

Khi mà nhắc đến Next.js thì người ta thường nhắc đến cụm từ là pre-rendering: pre-rendering là quá trình chuyển đổi từ React component sang HTML trước khi HTML được trình chiều lên trình duyệt.

Có 2 loại pre-render trong Next.js
1. Server-side rendering ( SSR): Quá trình chuyển đổi từ React component sang HTML sẽ diễn ra ở phía server, và nó sẽ chỉ tạo ra file HTML khi mà chúng ta yêu cầu hoặc gửi request. 
2. Static site generator ( SSG):  Toàn bộ website sẽ được render ra HTML trong quá trình build, và lúc nào cũng sẵn sàng để bạn lấy ra HTML mỗi lần request.
## 2. Tại sao lại là Next.js?
Trên trang chủ của Next.js cũng đã nói khá nhiều về các tính năng 
1. Zero config: đó là bạn sẽ không cần phải cấu hình gì thêm, tất cả những gì bạn cần để xây dựng 1 trang web đều đã được config rồi.
2. Hybrid: SSR and SSG: web của bạn có thể đồng thời sử dụng cả SSR và SSG
3. Hỗ trợ TypeScript: giúp chúng ta xây dựng ứng dụng chặt chẽ hơn.
4. Fast refresh: bạn cứ sửa code rồi save là trang web cập nhật rất nhanh, thật tuyệt khi phát triển phải không
5. File-system routing: bạn không cần quan tâm gì đến router nữa, vì tất cả những gì các bạn viết trong 1 thư mục tên là `/pages` sẽ trở thành đường dẫn rồi.
6. API Routes: Chúng ta hoàn toàn có thể code Back-end ở đấy, viết các API ở trong project Next.js
7. Image Optimization: Tối ưu hoá hình ảnh
8. Và đối với những bạn đã học và làm với Reactjs thì Next.js trở nên rất quen thuộc vì cú pháp vẫn gần như là của Reactjs, thêm vào nữa là những yếu điểm của Reactjs như SEO kém thì Next.js đã khắc phục điều đó, bạn vừa có thể SSR, SSG, hay CSR trong project Next.js.
## 3. Lộ trình của Series tìm hiểu Next.js mà mình sẽ xây dựng
Đây là 1 lộ trình mà mình đã xem được ở 1 kênh youtube [Codevolution](https://youtu.be/TbLD0fr1b4I) và mình thấy khá hợp lý mình sẽ định xây dựng Series Next.js 2021 theo sơ đồ này

![](https://images.viblo.asia/9de536ec-0d6e-4b26-bc6a-ee64d51d6e1b.png) 

Chúng ta sẽ lần lượt đi theo các phần: 

* Routing
* Pre-rendering and Data Fetching
* API routes
* Styling
* Một số vấn đề khác 
## 4. Hướng dẫn cài đặt Next.js và chương trình đầu tiên
### 4.1 Trước khi cài đặt
- Nếu bạn chưa cài Nodejs hãy [cài ở đây](https://nodejs.org/en/). Node version 10.13 trở lên nhé.
- Một editor xịn xò để code như VS Code hoặc notepad (:sweat_smile:)

và ở đây mình sẽ cài đặt phiên bản Next.js mới nhất ở thời điểm mình viết bài đó là Next.js 11.1 nhé!
### 4.2 Nào cùng bắt tay vào cài đặt Next.js
Đầu tiên, các bạn có thể tạo 1 folder ở bất cứ đâu trên máy tính của bạn, mình sẽ đặt tên folder này là **next-first-project** nhé.

Mình sẽ mở project này trong VS Code, cùng với đó mở terminal trong VS Code lên và gõ câu lệnh `npm react-next-app .`, dấu `.` ở đây có nghĩa là mình sẽ cài đặt next app trong folder **next-first-project** luôn, còn nếu không bạn hoàn toàn có thể gõ `npm react-next-app [tên project của bạn]`( ví dụ: `npm react-next-app next-first-project`), lúc này project mới sẽ được tạo với tên mà bạn đặt.

![](https://images.viblo.asia/63ad30a2-d309-4a98-9fce-a91697ec2cf9.png)

 Đây là project sau khi chúng ta tiến hành cài đặt đó. 
###  4.3. Chạy thử project Next.js đầu tiên
 Và để chạy thử project đầu tiên, chúng ta sẽ tiến hành sử dụng câu lệnh `npm run dev`, đợi project compile xong chúng ta sẽ vào `http://localhost:3000/` là đường dẫn mặc định của ứng dụng next, bạn có thể thấy đường dẫn này trên terminal sau khi chạy câu lệnh `npm run dev`, và chúng ta sẽ thấy 1 giao diện như này: 
 
 ![](https://images.viblo.asia/64358023-be9e-43ba-bdc9-5eba1f96898a.png)
### 4.4 Thử sửa gì đó theo ý chúng ta
Chúng ta hãy cùng thử vào `pages/index.js` và sửa gì đó trong này và ấn save xem sao nhé. Ở trong file `index.js` mình sẽ sửa lại xoá bớt đi và còn như thế này: 

```
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to the new world in Next.js!</h1>
      </main>
    </div>
  );
}
```
Sau đó Crtl+S ( save) thì gần như ngay lập tức đã nhận được kết quả trên trình duyệt, đúng là fast refresh.
![](https://images.viblo.asia/530e8c99-8de8-495a-b7ec-b9e5e9744fce.png)


## 5. Cấu trúc thư mục project Next.js
![](https://images.viblo.asia/ceea6791-bc55-40cc-be62-49081fe70e88.png)
Ở đây có lẽ chúng ta quan tâm chính đến các folder pages và styles là chính
- `pages`: toàn bộ các page trong website của chúng ta đều sẽ được viết ở trong này, và có 1 điều rất hay là các chúng ta đặt tên cho file hay folder ở trong folder `pages` này thì cũng chính là đường dẫn `url` dẫn đến trang đó. Ví dụ nhé: bạn muốn truy cập vào `abc.com/about` thì mình sẽ tạo 1 file `about.js` trong folder `pages` là được.
- `styles`: chắc các bạn cũng đoán được rồi phải không, đây là nơi chứa file css cho project của chúng ta.
- `public`: chứa các hình ảnh của dự án.
- Và 1 số file khác như `package.json` chứa những lib cài vào dự án, `next.config.js` chứa những cấu hình dự án,...
## Tổng kết
Tóm tại, trong bài viết ngày hôm nay, mình đã giới thiệu với các bạn Next.js là gì, tại sao chúng ta nên sử dụng Next.js để phát triển frontend, cùng với đó là tạo 1 project Next.js đầu tiên, cấu trúc 1 project Next.js. 
Trong bài tới mình sẽ đi sâu hơn vào một trong những concept chính của Next.js đó là Routing.
Và như mình nói ở trên, mình viết bài này trong tâm thế đang tìm hiểu về Next.js nên sẽ có những điều mà mình chưa truyền đạt được rõ ràng nhất, hi vọng các bạn có thể để lại những comment góp ý để mình có thể cải thiện cách viết và chia sẻ với mọi người nhé!!!