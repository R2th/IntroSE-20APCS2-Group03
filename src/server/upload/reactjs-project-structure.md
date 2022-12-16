ReactJs hiện nay là một thư viện javascript phổ biến được rất nhiều developer sử dụng, lý do thì chắc mọi người cũng đã thấy nhiều qua google. 


Bài viết này chia sẽ cấu trúc thư mục mà tự mình đua đòi tìm tòi để tạo trong thời gian gần đây.

*Lưu ý trong bài viết tôi sử dụng (reactjs + redux) trình bày cấu project mẫu.*

Reactjs  docs recommended cho chúng ta 2 kiểu cấu trúc files :

**Group by features or routes**

![](https://images.viblo.asia/1b623b1a-6cb6-4acc-8c30-58fca45c8a05.png)

**Group by file type**

![](https://images.viblo.asia/a63d547b-b625-4a37-896f-8574a468b84a.png)

Theo tôi thì cả hai kiểu đều rất hay, dể hiểu và thực sự là hiện nay hấu hết các dự án reactjs ở trên github mình thấy đa phần sử dụng cấu trúc thứ hai kiểu như thế này.

![](https://images.viblo.asia/8c1988ad-8c7f-4f82-8ebc-266af227d6ef.png)

Tuy nhiên theo tôi cấu trúc trên có 2 điểm mà tôi thực sư không ưng ý.

1 . Khi code 1 chức năng tôi và phải mở các files source liên quan ở mỗi folder constant, component, reducer, action, container… thực sự mất thời gian để tìm và mở chúng.

2 . Khi dự án của chúng ta phình to với rất nhiều chức năng, thì các thư mục này sẽ chưa rất nhiều files nhìn nó rất rối rắm, và dễ nhầm lẫn khi mở chọn file.
Cho nên mình quyết định sử dụng cấu trúc cũng như trên kết hợp chia ra theo từng module để khắc phục hai điểm trên. Như này

![](https://images.viblo.asia/33417118-4dfd-4d99-9031-559fa4567959.png)

Mình chia nhỏ ra từng chức năng là từng module nằm trong folder modules , trong mỗi module cũng có đầu đủ cấu trúc như một project con. 

Ví dụ: ở trên tôi có hai module App và Vote

App là module tổng quát, và Vote là một module với chức năng vote của App, sau này khi thêm những chức năng khác thì mình chỉ cần thêm mới module tương tự như Vote trong folder modules.

Cấu trúc chia ứng dụng theo hướng module này rất hay, phù hợp với các dự án mà chứng năng nhiều, yêu cầu mở rộng cao. Được rất nhiều cái Framework CMS nổi tiếng sử dụng ví dụ như Magento, Wordpress, Zend, Joomla… (Thanh niên từng code PHP vài lần :D (xD) (cwl)) hay như cấu trúc node-module của ReactJs.

Đó là tất cả những chia sẽ của tôi về cách cấu trúc thư mục cho 1 dự án reactjs.

Tôi đã sử dụng nó trong dự án gần đây nhất, và thực sự là nó đã giúp tôi tiết kiệm được rất nhiều thời gian khi phát triển, sự gọn gang, rỏ ràng là điều thấy rỏ.


Cuối cùng như Reactjs recommended thì dù là cấu trúc nào thì bạn cũng không nên tốn quá nhiều thời gian để suy nghĩ để lựa chọn 1 cấu trúc dự án tối ưu, chỉ nên mất tối đa 5 phút cho nó, và nên hạn chế lồng nhiều thư mục quá nhiều (theo tôi 4 – 5 nesting là đẹp). :D


Không có gì nhiều, chỉ là chia sẽ một chút kiên thức ngâm cứu được, không biết nó như nào nhưng hy vọng sẽ đồng quan điểm với vài người về “ReactJs files structure”. Thanks.

Tham khảo

https://reactjs.org/docs/faq-structure.html

https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1