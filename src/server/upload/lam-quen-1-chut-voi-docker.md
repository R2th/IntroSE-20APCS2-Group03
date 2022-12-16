## Một chút lời nói đầu
Cảm ơn các bạn đã ủng hộ mình trong post [Tập tành CI/CD với React Native](https://viblo.asia/p/tap-tanh-cicd-voi-react-native-gAm5yjWVKdb)
Mình xin phép đừng dừng Series này vì mình hiện tại không có đủ khả năng để mua tài khoản Apple Developer. Nếu bạn nào có tâm ủng hộ mình hay cần mình giúp đỡ gì có thể contact với mình qua [mail](mailto:nghminh163@outlook.com). Hôm nay, mình sẽ qua 1 chủ đề mới đó là Docker

## Docker là gì?
Docker chắc cũng phải khái niệm gì đó quá xa lạ với chúng ta, nhất là những bạn lập trình viên kinh nghiệm. Nhưng, có khá nhiều người thì khái niệm này vẫn xa lạ, nhất là ở Việt Nam. Vậy ta hãy cùng làm quen với Docker ở bài viết lần này nhé.
![Docker là gì](https://www.businesscard.vn/blog/wp-content/uploads/2015/12/what_is_docker.png)
> **Định nghĩa**: Docker là một công cụ được thiết kế để giúp dễ dàng hơn trong việc tạo, triển khai và chạy ứng dụng bằng cách sử dụng các container. Mỗi container cho phép developers đóng gọi một ứng dụng với tất cả các gói họ cần 

Hmmm, nói có vẻ mơ hồ nhỉ. Bạn cứ tưởng tượng như này đi. Muốn vận chuyển gì đó ta cần 1 vật chứa. Laptop thì cần thùng, hoa quả thì cần hộp xốp,...
![logistics complex](https://devopsz.com/content/images/2018/08/03-logistics-complex.png)
Ví dụ ở đây ta có 6 mặt hàng và phải vận chuyển bằng 7 phương tiện, mỗi phương tiện đều phải có cách đóng gói khác nhau => Ta sẽ phải cần **6x7=42** (có thể gọi là axb với a là mặt hàng và b là phương tiện) cách đóng gói khác nhau. Vì vậy, người ta đã nghĩ ra 1 cách là quăng hết đống đồ này vào 1 cái container để tiện di chuyển. 
![Container](https://devopsz.com/content/images/2018/08/05-logistics-solution.png)
#### Với container ta có những gì?
Có thể nói khi container sinh ra nó là 1 cuộc cách mạng vì:
* Mỗi container tiêu chuẩn đều có thể đóng gói, vận chuyển mọi loại mặt hàng từ điểm bắt đầu đến đích
* Các container có thể đặt tại các phương tiện khác nhau, có thể được xếp chồng lên nhau. Điều này dẫn tới có thể di chuyển 1 khoảng cách dài và nhanh chóng

Điều này cơ bản có thể thấy được tiết kiệm khá nhiều chi phí và thời gian

#### Vậy, nó có ý nghĩa gì?
Trong công nghiệp phần mềm nó cũng tương tự như vậy, việc phát triển ra container cũng như cuộc cách mạng vậy.
![Docker container](https://devopsz.com/content/images/2018/08/07-software-deploy-solution.png)
Với một container duy nhất có thể gói được Static web, user db,v.v.
Nếu như trước là axb cách để triển khai (a là stacks và b là số thiết bị) thì bây giờ có thể sử dụng container để rút gọn xuống **a**.
Ở bài viết tiếp theo, mình sẽ giới thiệu các khái niệm cơ bản về Docker. Nếu bạn thích Series này cũng mình có thể Upvote và comment, mình sẽ cố gắng trả lời nếu mình biết :D Cảm ơn các bạn