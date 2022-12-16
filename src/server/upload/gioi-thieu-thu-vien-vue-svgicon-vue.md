- Xin chào các bạn, mọi người chúng ta đã trải quá rất nhiều dự án về Frontend, Markup, chắc hẳn rất quen thuộc với các thư viện icon như Font awesome, Material Design, Fontello... Tuy nhiên, vào một ngày mà designer uống quá nhiều milo, đầu óc khá bay bổng thì họ quyết định vẽ toàn bộ icons trong dự án mà không follow theo một bộ thư viện font icons nào. 
- Vậy các Frontend Dev sẽ apply vào dự án mình như thế nào? Sau đây mình xin giới thiệu cho các bạn một thư viện khá mới được mình sử dụng trong dự án `Vuejs`, đó là `vue-svgicon`

# 1. Cài đặt
```
// install with npm
npm install vue-svgicon --save-dev

// install with yarn
yarn add vue-svgicon --save-dev
```
Cách cài đặt khá đơn giản, tương tự những packages khác :D.

# 2. Generate icons
```
{
    "scripts": {
        "svg": "vsvg -s /path/to/svg/source -t /path/to/icon/components
    }
}
```
Tiếp đến chúng ta sẽ sử dụng script npm để generate từ icon svg -> icon component, thao tác bằng lệnh:
```
// use npm
npm run svg
```
![](https://images.viblo.asia/1ee84cf0-d914-40bd-8575-03bd1cd2671e.PNG)

Kết quả sau khi chạy lệnh, để ý thấy **folder svg** là nơi chứa các image ban đầu, và **folder icons** vừa được tạo ra, trong đó chứa gì chúng ta cũng đã thấy trên hình.

# 3. Import vào dự án
Ở main.js, chúng ta tiến hành import thư viện theo cú pháp Vue:
![](https://images.viblo.asia/cbe9168d-991d-48ca-a837-8733dc944184.PNG)

Để ý thấy tagName là component name cho icon svg, ở đây default sẽ là `svgicon`, và chúng ta hoàn toàn custom được tagName.

# 4. Sử dụng trong component
Sau khi đã import rồi, muốn sử dụng nó cho một component ra sao? Cũng không khó lắm, theo cú pháp Vue ta có:
![](https://images.viblo.asia/24e617c9-6cd6-4386-a37d-7e1518c45809.PNG)

Import xong thì thử gọi một icon ra xem thế nào nhé: 
![](https://images.viblo.asia/c2a9e078-11bf-45fd-a119-4a509a8e818b.PNG)

Các props cần phải truyền vào là gì, đó là tên, kích thước, màu sắc...Ở đây mình gọi icon facebook, kích thước 200x200, có màu đỏ, kết quả là:
![](https://images.viblo.asia/314ea08a-dc44-4759-8c46-8ee2c0644bfe.PNG)

# 5. Support IE ?
Cái này rất hay gặp khi một Frontend tìm kiếm thư viện, đó là có support trên IE hay không :D
Câu trả lời là **KHÔNG**. Tuy nhiên bạn có thể sử dụng `innersvg-polyfill` để biến câu trả lời **KHÔNG** thành **CÓ** nhé =))
```
// in main.js first line
import 'vue-svgicon/dist/polyfill'
```

# 6. Tổng kết
- Thư viện này mình được suggest để apply vào dự án, nên vẫn chưa có thời gian tìm hiểu xem có thử viện nào tốt hơn hay không. 
-  Trên đây là những gì mình vừa tìm hiểu vừa làm và muốn chia sẻ luôn cho các bạn, còn những tính năng hay nữa mình chưa nắm được hết, mong nhận được góp ý ạ :D
-  Tham khảo: https://mmf-fe.github.io/vue-svgicon/