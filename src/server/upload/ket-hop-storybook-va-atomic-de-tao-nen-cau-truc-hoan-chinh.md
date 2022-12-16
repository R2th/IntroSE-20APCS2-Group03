Trong [bài viết trước](https://viblo.asia/p/ap-dung-atomic-design-cho-du-an-react-Eb85oLWjK2G) mình đã giới thiệu cách áp dụng **Atomic design** vào React, sau một khoảng thời gian làm việc thì mình nhận ra một tool khá hay là **Storybook**. Và mình đã áp dụng nó với **Atomic design** để cấu trúc thư mục, để test, và giải quyết một vấn đề khi trong dự án có thành viên mới, hoặc đơn giản bạn muốn refactor lại UI nhưng không biết hiện tại các component của mình nó đang như thế nào?

## Storybook là gì?
> "Storybook is an open source tool for developing UI components in isolation for React, Vue, Angular, and more. It makes building stunning UIs organized and efficient." - https://storybook.js.org/

**Storybook** là một open source tool giúp dễ dàng build các UI components, hổ trợ rất nhiều khi xây dựng UI cho các dự án React. Và với sự hổ trợ tool các bạn có thể dễ dàng xem các component của dự án đang như thế nào?
Trong phạm vi bài viết này mình sẽ không đi sâu vào cách dùng **Storybook**, các bạn có thể vào trực tiếp https://storybook.js.org/ để tìm hiểu về cách sử dụng và cách config của nó.

## Kết hợp Atomic và Storybook như thế nào?
Mình nhắc lại một chút, **Atomic** sẽ giúp cho chúng ta cấu trúc thư mục, components một cách rõ ràng, dễ maintain hơn.

Vậy mình sẽ kết hợp giữa chúng như thế nào? - Kết hợp cũng thực sự không có gì đặc biệt bạn chỉ cần define file storybook cho từng bậc thì các bạn đã có thể dễ dàng define ra cấu trúc cho Storybook của bạn.

Với việc cấu trúc components như **Atomic**, thì các component được phân bậc một cách rõ ràng. Vì component đã được phân cấp rõ ràng thì bạn chỉ cần sử dụng **Storybook** vào từng bậc  thì bạn đã có thể dễ dàng khi bạn có thể biết được hình dáng của component đó như thế nào? 

*Nếu bạn phân chia cấp bậc tốt cho với Atomic thì cấu trúc của Storybook cũng sẽ rõ ràng*

Qua 2 bài viết về Atomic và Storybook của mình thì có thể giúp các bạn có một cấu trúc tốt cho dự án của mình.
 
 [https://viblo.asia/p/ap-dung-atomic-design-cho-du-an-react-Eb85oLWjK2G](https://viblo.asia/p/ap-dung-atomic-design-cho-du-an-react-Eb85oLWjK2G)
 
Với kinh nghiệm ít ỏi của mình thì nếu có sai sót hay cấu trúc nào tốt hơn, mọi người có thể lại comment cho mình. 
Cảm ơn mọi người!