Bài gốc: https://thanhle.blog/blog/optimize-tti-v%C3%A0-fid-cho-nextjs-mot-cach-super-don-gian

## Tại sao nên đọc bài này?

- Như tít: “Optimize TTI và FID cho Nextjs một cách super đơn giản”
- Islands Architectures cho Nextjs

## Kết quả

### Before

![Untitled.png](https://images.viblo.asia/b9fe8e67-d611-4232-918b-e581a79ce21e.png)

[https://next-lazy-hydrate-origin.vercel.app/](https://next-lazy-hydrate-origin.vercel.app/)

[Live check PageSpeed](https://pagespeed.web.dev/report?url=https%3A%2F%2Fnext-lazy-hydrate-origin.vercel.app%2F&form_factor=mobile)

### After

![Untitled 1.png](https://images.viblo.asia/6c276970-0a78-4231-afcd-7b61c40bb235.png)

[https://next-lazy-hydrate-optimized.vercel.app/](https://next-lazy-hydrate-optimized.vercel.app/)

[Live check PageSpeed](https://pagespeed.web.dev/report?url=https%3A%2F%2Fnext-lazy-hydrate-optimized.vercel.app%2F&form_factor=mobile)

## Hydration là quá trình lãng phí tài nguyên

[Server side rendering với Hydration lãng phí tài nguyên như thế nào?](https://thanhle.blog/blog/server-side-rendering-voi-hydration-lang-phi-tai-nguyen-nhu-the-nao)

Như bài viết trên, `Hydration` là quá trình khá LÃNG PHÍ TÀI NGUYÊN vì nó cần load code của component và render tới hai lần.

Tương tượng chúng ta có một trang landing page khá là dài viết bằng Nextjs, hầu hết các component đều là tĩnh (Nghĩa là chỉ render ra HTML mà không có quá nhiều Interactive). Khi chúng ta “đập” vào phím `Enter` trên thanh URL thì:

1. Đống HTML của landing page được gửi xuống Browser (Là kết quả của quá trình SSR)
2. JavaScript được download xuống Browser, phân tích, rồi thực thi (Đa số tụi nó sẽ bao gồm text và khá giống như HTML ở bước 1)
3. Sau khi JavaScript được download, và chạy xong, nó sẽ gắn đống event cần handle vào cây DOM hiện tại. Bây giờ thì cái web của mình với có thể gọi là… load đầy đủ 

Trong các bước trên, bước 2 và 3 khiến cho hai chỉ số TTI (Time To Interactive) và FID (First Input Delay) rất cao

## Progressive Hydration

*Xin không dịch từ trên quá tiếng Việt vì dịch ra sẽ rất chuối 🍌*

Ok bây giờ thử optimize cái trang landing page dài ngoằng của chúng ta nhé. Bởi vì cái trang landing page đó hầu hết là Static Component nên hầu hết thời gian cho quá trình `Hydrate` Component là khá vô ích (bởi vì nó chỉ cần HTML, CSS là chạy được, méo cần JS nào ở đây cả). Vậy thì chỉ cần tắt hydrate cho những Component kiểu như vậy, hoặc là chỉ `Hydrate` khi nào có component nhảy vào màn hình (Viewport) của user. 

![Untitled 2.png](https://images.viblo.asia/edbd5fde-9c67-4b72-b674-5b128b7e6fe8.png)

Cái này khá dễ để làm, cùng package `react-hydration-on-demand` là được

```jsx
import withHydrationOnDemand from "react-hydration-on-demand";
import Card from "../Card";

// Hydrate when the component enters the viewport
const CardWithHydrationOnDemand = withHydrationOnDemand({ on: ["visible"] })(
    Card
);

export default class App extends React.Component {
    render() {
        return (
            <CardWithHydrationOnDemand
                title="my card"
                wrapperProps={{
                    className: "customClassName",
                    style: { display: "contents" },
                }}
            />
        );
    }
}
```

Vậy là bây giờ, cái gạch đầu dòng thứ 3 đã được optimize - giảm thời gian JS phải chạy để hydrate cái landing page yếu dấu của chúng ta 🥰 

## Lazy load component rồi hydrate khi cần thiết

Ở bước trên, ta có thể optimize executed time sử dụng `react-hydration-on-demand` nhưng nếu nhìn vào đống JS được gửi xuống bạn sẽ nhận ra

> JS cho các component vẫn phải được download và parsed, nó chỉ đơn giản là không hoặc chưa execute thôi.
💡 Có cách nào mà mình vẫn render được full HTML nhưng chỉ load JS và Hydrate Component đó khi cần thiết không?
> 

Trong quá trình tìm kiếm câu trả lời, thì đây là giải pháp mình thấy ưng ý nhất: [https://www.patterns.dev/posts/islands-architecture/](https://www.patterns.dev/posts/islands-architecture/)

![Untitled 3.png](https://images.viblo.asia/8f624aac-b424-446f-9900-51bf581260ae.png)

Ý tưởng thì khá đơn giản:

- Render full trang ở quá trình SSR
- Load tối thiểu JS, chỉ để listen trên cây DOM xem có event nào không
- Nếu mà có event, thì load JS tương ứng rồi chạy nó thôi

Giải pháp này thực sự optimize performance rất rất nhiều, bằng cách hy sinh một chút thời gian mỗi khi user có interactive gì đó. Với mình cái trade-off này là cực kì “lời” 🌟

![Nếu thử disable JS thì  TTI giảm hơn 7 lần. Sẽ làm sao nếu chúng ta chỉ cần giảm một nửa trong số đó?](https://images.viblo.asia/de504780-cbdc-444f-8c0d-000ba740c41b.png)

Nếu thử disable JS thì  TTI giảm hơn 7 lần. Sẽ làm sao nếu chúng ta chỉ cần giảm một nửa trong số đó?

Đỉnh của chóp! Giải pháp khá dễ hiểu tuy nhiên ở thời điểm hiện tại thì khá khó để làm. Tại sao?

- Ở thời điểm hiện tại, React chỉ support hydrate full một app chứ không phải riêng từng component (Nếu v18 được hoàn thiện thì sẽ giải quyết được cái này). Thực ra cái package `react-hydration-on-demand` nó có một số trick để bỏ qua quá trình Hydrate
- Với Nextjs, nếu component được define là `dynamic` mà nếu nó được render ở quá trình SSR, thì đống JS của nó cũng được gửi xuống Browser ngay khi page load luôn, chả có gì gọi là `lazy` ở đây cả

Đọc thêm

[Why Progressive Hydration is Harder than You Think](https://www.builder.io/blog/why-progressive-hydration-is-harder-than-you-think)

Vậy là mình quyết định viết một cái package có thể:

- Bỏ qua quá trình Hydrate. Hầu hết là dựa theo thằng `react-hydration-on-demand` thôi 😃
- Loại bỏ JS khi load page và khiến mình có thể tùy chỉnh khi nào thì load JS tương ứng

Làm sao mình làm được á hả? [Xem thử ở đây nè (khá ngắn)](https://github.com/thanhlmm/next-lazy-hydrate/blob/main/src/index.tsx)

Còn đây là kết quả

[https://user-images.githubusercontent.com/9281080/172079813-a49db8c0-c64d-4589-941d-bf027b22433a.mov](https://user-images.githubusercontent.com/9281080/172079813-a49db8c0-c64d-4589-941d-bf027b22433a.mov)

### Cách dùng

**Install**

```bash
npm install next-lazy-hydrate
yarn add next-lazy-hydrate
```

**Usage**

```jsx
import lazyHydrate from 'next-lazy-hydrate';

// Static component
const WhyUs = lazyHydrate(() => import('../components/whyus'));

// Lazy hydrate when users hover the component
const Footer = lazyHydrate(
  () => import('../components/footer', { on: ['hover'] })
);

const HomePage = () => {
  return (
    <div>
      <AboveTheFoldComponent />
      {/* ----The Fold---- */}
      <WhyUs />
      <Footer />
    </div>
  );
};
```

**Document**

[https://github.com/thanhlmm/next-lazy-hydrate](https://github.com/thanhlmm/next-lazy-hydrate)

API khi sử dụng package khá đơn giản, hy vọng nó giúp các đồng-coder khác **Optimize TTI và FID cho Nextjs một cách super đơn giản**

Nhớ Star ⭐ cho tui nha!

Bài gốc: https://thanhle.blog/blog/optimize-tti-v%C3%A0-fid-cho-nextjs-mot-cach-super-don-gian