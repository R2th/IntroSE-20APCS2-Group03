##### Dưới đây là bản tin thời sự công nghệ framework FE ngày mùng 5 tháng 5 năm 2020, bản tin chính hôm nay sẽ về Vuejs sẽ ra mắt giới truyền thông phiên bản 3.0, được tường thuật trực tiếp tại Nga bởi phóng viên Đức An

----

Đến ngay bây giờ, có thể bạn đã nhận ra mình sắp đón nhận một phiên bản mới của Vue. Đội ngũ xây dựng Vue đã tung ra phiên bản Alpha cách đây vài tháng kèm với roadmap

Trong khi chờ phiên bản 3 được ra ra mắt, mình nghĩ chúng ta cần cập nhật thông tin sớm nhất với thế giới loài người để không tối cổ cũng như đi kịp thời đại. Vì vậy, đọc xong bài này là bạn đã up-to-date rồi đấy :)))

-----

TL;DR? Nhanh, nhẹ, dễ dùng

## Vậy, cái gì sẽ làm chúng ta thích thú vui sướng khi Vue 3 ra mắt?
Evan và Vue team đã nói vài ý rằng khi vue3 ra mắt, hứa hẹn một phiên bản sẽ
1. Nhanh hơn
2. Bundle size nhỏ hơn (đón chờ một bài test nhỏ của mình về phần này nhé 😍)
3. Maintain code sẽ bớt đau đớn hơn
4. Hướng tới giao diện điện thoại (giống react-native)
5. Cuộc đời sẽ tươi đẹp hơn (dù vẫn không thể xóa mờ hình ảnh ông hàng xóm mỗi thứ 7 hò hát inh ỏi)

Vâng, trên đó là những thứ cool ngầu mà chúng mình sẽ thấy ở chiếc áo mới của Vue, nghe thôi mình đã thấy kích thích rồi 😵giờ mình sẽ vào sâu từng phần để xem nó hay ho như thế nào nhé

### Vue3 sẽ nhanh hơn

Ở vue3 virtual dom([vdom là gì](https://github.com/vuejsdevelopers/blog/wiki/What's-The-Deal-With-Vue's-Virtual-DOM%3F)) sẽ được xóa và viết lại từ đầu, hiệu suất tăng thêm có thể lên tới 100% (so với v2) khi mounting (ban đầu) và patching (vá lại dom khi state update)
Cộng thêm những tính năng hứa hẹn sẽ đưa tới performance tốt hơn cho Vue như :
* Component fast path: hiện tại ở vue, compiler sẽ kiểm tra template có phải một component hay không, điều này khá mất thời gian để compile. Thay vì đó vue3 đã giả định 1 template viết hoa sẽ là một component, giúp quá trình render diễn ra nhanh hơn
* Monomorphic Calls: tối ưu nhỏ này giúp hỗ trợ javascript engine có thể optimize dễ dàng hơn
* Optimized Slots Generation: theo cơ chế hiện tại, mỗi khi parent và child component thay đổi thì cả 2 đều sẽ re-force rerender, việc này sẽ gây ra những lần render lãng phí. Vue3 đã xây dựng lại tầng compiler của slot giúp hạn chế việc lãng phí này
* Static Tree Hoisting: bỏ qua việc patching lại những static template không cần thiết, ở vue3 static node và props đã được compiler tách ra thành 1 biến riêng
* Proxy-based observation mechanism: bye Object.defineProperty, vue3 đã sử dụng tính năng Proxy của es6 với khả năng tin cậy cũng như peformance tốt hơn. Đã bao giờ bạn gặp vấn đề update property của array thì Component không rerender? Vue3 đã xử lý được nó

Ngoài ra Vue v3 còn hỗ trợ compiler hint giúp nhà phát triển có thể optimization lại code khi nhìn output, optimize Component initialize giúp khởi động app nhanh hơn

Giảm hơn một nửa memory sử dụng (quá ngầu)
![](https://images.viblo.asia/013018ce-13d3-498c-b779-228fd17c3b82.png)

### Vue3 sẽ nhẹ và nhẹ hơn

Đã bao giờ bạn vào website mà load trong cái chớp mắt hoặc thậm chí không nhận ra? Với dòng quảng cáo của Vue3 "Vue3 giúp trang web bạn load nhanh như cách người yêu cũ đá bạn vậy" thì mình tin điều đó hoàn toàn có thể xảy ra
Những thứ sẽ làm vue3 nhẹ hơn bao giờ hết là:
* Tree-shaking friendly: những thứ bạn không cần thì không nên có. Ở vue3 mọi module đã được tree-shakable, nó sẽ chỉ được gắn vào bundle nếu bạn sử dụng chúng
* New core: với phiên bản trùng tu runtime với bundle size chỉ có 10kb, hứa hẹn app của bạn sẽ làm app bạn nhanh như vũ bão 🤣

### Bản core vue3 sẽ dễ maintain hơn nữa

flow -> typescript: no more flow ever, facebook! Typescript sẽ giúp Vue tiếp cận với lượng developer nhiều hơn, suggestion ở IDE cũng tốt hơn

![](https://images.viblo.asia/5c0ee7f1-3859-4017-a13f-149db7c3a8b5.png)
thấy giống React chưa nào =)))))

Vue3 cũng đã chia ra thành nhiều package riêng, sử dụng mỗi khi bạn cần chúng. Cũng nhờ đó mà tăng tỉ lệ contributor vào vue nhiều hơn, tăng khả năng phát triển cộng đồng vue

![](https://images.viblo.asia/644c9f93-d0e4-4c53-b072-9a9186a98be3.png)

Bộ compiler ở Vue3 đã được rewrite lại giúp plugable, IDE support tốt hơn

### Vue3 hướng tới native

Ở vue3, renderer hiện tại đã có thể custom lại giúp tăng khả năng xây dựng native ở mobile lẫn desktop dễ dàng (cũng không dễ dàng lắm =))) ) bởi độ linh động của nó. Khi hướng tới native, Vue đã làm con đường của nó có thể so sánh với React Native hơn
Reactivity API, thứ nằm sâu thẳm bên trong vue hiện tại đã được exposed giúp chúng ta có thể làm được nhiều trò hơn với nó. Cũng trả lời câu hỏi mà đại đa số người sử dụng Vue: Khi nào thì cái component mình được render lại =)))), bằng cách sử dụng renderTriggered và debugger của chrome

## Một số thứ khác hay ho của vue3

- Better warning trace: trace props, functional component, thêm vài case cho warning dự báo niềm vui sắp tới =))
- Composition API: thứ mà gây ra rất nhiều cuộc tranh cãi trên Vue3, nó sẽ gần giống với hook ở React, bạn có thể google để chi tiết thêm. Tính năng này cũng đã được thử nghiệm trên vue2
- Khả năng tương thích với phiên bản cũ, code của bạn sẽ không cần sửa quá nhiều
- Time Slicing: tính năng thử nghiệm, giúp việc rerender đa tầng component nhanh hơn

## Kết luận

Vue3 hứa hẹn sẽ đưa tới trải nghiệm mới cho developer, giúp cuộc sống của dev đơn giản hơn khi mà Vue hướng tới những team lớn với khả năng dễ học, đơn giản, toàn diện, có khả năng phát triển (điều này thực sự quan trọng)

Đọc xong bài viết bạn có thể sẽ nghĩ "Thì sao, tao vẫn sử dụng Angular ở công ty và React cho dự án bản thân", đồng ý với bạn điều này vẫn sẽ đúng, React và Angular hiện tại vẫn là 2 framework phổ biến nhất cho Frontend. Nhưng dù sao khi Vue3 ra mắt, có một số thứ hay ho ở Vue mọi người sẽ phải nghĩ lại khi mà chúng có thể làm cho Vue có thể cạnh tranh với React và Angular trong nhiều năm tới


Tham khảo:
- https://learnvue.co/2019/12/what-does-vuejs-3-0-mean-for-web-development/
- https://docs.google.com/presentation/d/1yhPGyhQrJcpJI2ZFvBme3pGKaGNiLi709c37svivv0o/edit#slide=id.g46b2d60f5b_0_58
- https://medium.com/vue-mastery/evan-you-previews-vue-js-3-0-ab063dec3547