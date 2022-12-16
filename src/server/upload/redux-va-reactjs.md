Chao,
Ở loạt bài trước, mình đã chia sẽ với các bạn về những cài đặt nhập môn ReactJs cũng như cách chúng ta tạo ra được một demo đơn giản với ReactJs(có tương tác với cơ sở dữ liệu). Hôm nay, mình sẽ giới thiệu cho các bạn một thứ mới hơn-một thư viện làm việc cùng React giúp bạn quản lý ứng dụng, đó chính là Redux. Vậy cùng nhau tìm hiểu luôn nhé!

# Giới thiệu
Redux là một thư viện giúp bạn quản lú tráng thái của ứng dụng. Nó được thiết kế dựa trên Flux, nhưng lại giảm bớt nhưng rắc rối thường gặp khi phải viết một ứng dụng Flux

**Giải thích rõ hơn
## 1. Trạng thái (state) của ứng dụng

- Một ứng dụng web thông thường sẽ nhận dữ liệu từ phía máy chủ (backend), hay nhận những thao tác của người dùng (nhập, click,…), tất cả những thứ này chúng ta gọi đó là trạng thái của ứng dụng. Nếu biết được trạng thái của ứng dụng tại một thời điểm nào đó, chúng ta sẽ biết vào thời điểm đó ứng dụng đã nhận dữ liệu nào, những thao tác nào đã được người dùng truyền lên.

- Ví dụ cho trạng thái của ứng dụng : Khi chúng ta click vào nút Back / Forward trên trình duyệt vòng vòng, thì mỗi trang sẽ là một trạng thái của ứng dụng.

## 2. Tổng quan về Redux và cách vận hành

-  ReactJS là một thư viện Javascript giúp xây dựng giao diện người dùng, được xây dựng xung quanh các component (thành phần) nhỏ ghép lại với nhau, có hai kiểu dữ liệu trong React đó là state và props. State là trạng thái, mang tính private, chỉ có thể thay đổi ở trong chính component. Còn props mang tính external, không bị kiểm soát bởi component, được truyền từ component cao (cha) đến component thấp (con).

-  ReactJS xây dựng lên các single-page-app, tức là chỉ render ra 1 trang, và tất cả các thành phần của ứng dụng sẽ được lưu trữ trong đó. Vì thế, nếu ứng dụng phức tạp lên theo thời gian, việc quản lý state của chúng ta sẽ ngày một lớn dần.

-  Redux là một thư viện Javascript giúp chúng ta có thể quản lý trạng thái của ứng dụng. Redux có thể kết hợp với ReactJS một cách hoàn hảo, bởi vì nó dựa trên nền tảng tư tưởng của Flux – do Facebook giới thiệu một vài năm trước.

- Sự khác biệt với việc sử dụng Redux và không sử dụng Redux được miêu tả bằng hình vẽ dưới đây :

![](https://images.viblo.asia/b95cee8e-8ba5-45e6-b843-08b4426aeddb.png)

 - Với việc không sử dụng Redux, các component sẽ giao tiếp với nhau bằng props. Nếu chúng ta cần lấy state của một component cách nhau 3 tầng, chúng ta phải gọi 3 lần, điều đó sẽ khiến việc code và quản lý state rất phức tạp, và to dần lên theo thời gian.

- Với việc sử dụng Redux, chúng ta sẽ lưu state của các component vào 1 store chung ở bên ngoài. Sau đó nếu muốn dùng ở component nào chúng ta chỉ cần gọi nó và sử dụng.

=> Chốt lại: Redux giúp chúng ta xây dựng 1 STORE thay vì lưu trữ toàn bộ data tại 1 root component thì chúng ta sẽ lưu nó tại store của redux, và nếu có thay đổi, đơn giản là chúng ta sẽ thông qua redux và thay đổi dữ liệu trong strore.

![](https://images.viblo.asia/97bcbb47-d1de-415c-83c0-93f10b0795c7.png)

# 3. Các thành phần của Redux
## Redux gồm 3 thành phần chính: 

- Store(Object)

Nguồn dữ liệu duy nhất

- Action Creator(Function)

Mô tả của những hành động(event)

- Reducer(Function)

Là một function nhận đầu vào là instance state và các mô tả về event và chỉ dựa trên đó để trả về state tiếp theo

## Redux data follow

Ví dụ và giải thích về Redux data follow

- Kho có 1 sự kiện (event) thì sẽ phát sinh ra 1 action mô tả những gì đang xảy ra

- Action sẽ thực hiện điều phối Reducer xử lý event

- Reducer dự vào những mô tả của Action để biết cần thực hiện thay đổi gì trên State và thự hiện update

- Khi State được update thì tất nhiên rồi, các trigger đang chờ theo dõi state đó sẽ nhận được thông tin update

![](https://images.viblo.asia/f9a1bc28-6796-42e1-b418-50901550c048.png)

# 4. Áp dụng Redux vào React

Dưới đây là những câu trả lời của những người đã tạo ra React và Redux, mời đồng bào cùng tham khảo

- Pete Hunt (Cựu thành viên tạo ra React):
> You’ll know when you need Flux. If you aren’t sure if you need it, you don’t need it.
> 

Tạm dịch đại khái là nếu không biết chắc chắn có cần hay không thì đừng có dùng :D :D

- Dan Abramov (Tác giả Redux):

> I would like to amend this: don’t use Redux until you have problems with vanilla React.
> 

Tạm dịch đại khái là đừng sử dụng Redux nếu ta chưa gặp phải vấn đề với Vanilla React 

Nói tóm lại, lý thuyết là chỉ sử dụng Redux khi ta đang gặp phải vấn đề với React, tại thực ra Redux bổ trợ rất tốt cho những vấn đề mà React gặp phải. Nhưng thực ra trên thực tế, cũng tương đối khó khăn để mình nhận biết được những thứ gọi là vấn đề :D :D

Vậy nên với những vấn đề tiếp tục được đặt ra trên, đã có 2 khái niệm được đưa ra là **Presenttational Component** và **Container Component**

![](https://images.viblo.asia/127832d1-fc54-4fbc-8281-0e8617540ac0.png)


Việc này giúp chúng ta cấu trúc cho ứng dụng và không bị lặm dụng vào Redux.
Thuận lợi trong việc chia ứng dụng thành các feature nhỏ và tại mỗi feature sẽ bao gồm 1 **Container Components** và nhiều **Presentational Components**

![](https://images.viblo.asia/92769a01-8540-41b4-8662-fdde23245517.png)

Mở rộng: Với các RoR developer, việc sử dụng React hoặc Redux khá là đơn giản, các bạn có thể tham khảo link bên dưới mình gửi(Một link react là của mình, link Redux là mình tham khảo :D :D)

- ReactJs on Rails [(https://viblo.asia/p/khoi-dau-voi-reactjs-rails-3Q75w2velWb)]
- Redux on Rails: [(https://viblo.asia/p/lam-quen-voi-redux-trong-rails-app-Qbq5QqAw5D8)]

Trên là toàn bộ "sơ khai" về Redux với React, trong những bài tiếp theo, mình sẽ cố gắng tìm hiểu và chia sẽ với các bạn nhiều điểm thú vị hơn.
Bye bye