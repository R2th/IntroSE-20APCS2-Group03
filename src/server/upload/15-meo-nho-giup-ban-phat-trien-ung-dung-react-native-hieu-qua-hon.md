Điểm chính của bài viết này là cung cấp cho bạn những lời khuyên sẽ hỗ trợ bạn và nhóm của bạn trong các dự án React Native của bạn. Đa số các lời khuyên tôi đưa ra trong bài viết này đều có liên quan đến React Native, một số lời khuyên thường thiên về hướng phát triển di động - tức là các mindset cần có khi phát triển di động. Vì vậy, hãy đọc ngay để hấp thụ nhé!

### 1. Đừng sử dụng, đừng bận tâm tới Expo
Không bao giờ nên sử dụng Expo trên một dự án thật, tôi sẽ nêu ra một vài lý do cho quan điểm này.

Thứ nhất, quá trình build ứng dụng không được chạy dưới local mà chạy trên máy chủ của Expo, đồng nghĩa với việc sẽ có ít hoặc nhiều rủi ro trong khi building và phát triển ứng dụng do các sự cố phát sinh của máy chủ expoExpo. 

Thứ hai, bạn đang thêm một layer phức tạp khác vào dự án của mình, điều này giảm đi hiệu năng và tăng kích thước của ứng dụng rất nhiều.

Quan trọng nhất, các Native module (iOS hoặc Android), mà bạn chắc chắn sẽ cần tại một thời điểm nào đó trong phát triển ứng dụng, chúng không được hỗ trợ. Các module duy nhất có sẵn cho bạn là các module được cung cấp bởi Expo SDK.

Sớm hay muộn, bạn sẽ phải tới thời điểm đưa ra quyết định eject Expo trở thành một ứng dụng React Native thông thường, vì vậy đừng lãng phí thời gian của mình vào việc bắt đầu sai cách.
### 2. Sử dụng Lint
Sử dụng linter trong bất kỳ dự án phát triển phần mềm nào đều là BẮT BUỘC, với dự án React Native không ngoại lệ. Hãy chắc chắn đưa nó vào ngay lúc bạn khởi tại project nhé. Bạn có thể sử dụng linter tùy thuộc vào ngôn ngữ bạn sử dụng trong dự án React Native, có thể là ES6, có thể là TypeScript. Lint sẽ giúp bạn rất nhiều các bạn về chât lượng mã nguồn, giúp chúng trông sạch đẹp, gọn gàng, nhiều trường hợp linter còn hỗ trợ tránh những bug không đáng có nữa.
### 3. Sử dụng Flexbox
Thực sự việc sử dụng flexbox là rất dễ, nhưng không hiểu sao tôi thấy rất nhiều dự án sử dụng absolute element positioning element thay vì sử dụng FlexBox, điều này sẽ làm phá vỡ bố cục layout, giảm khả năng sử dụng lại component và tương thích đa màn hình.Đối với những developer đã có hiểu biết về lập trình web: Flexbox trong React Native hoạt động gần như chính xác như trong CSS vậy, sự khác biệt quan trọng là flexDirection mặc định thành column  thay vì row  trong React Native.
### 4. Xóa tất cả các logger ở phiên bản release
Chắc chắn khi phát triển dự án sẽ có rất nhiều log mà các lập trình viên chúng ta đặt vào để debug. Hãy chắc chắn xóa chúng đi nhé. Nếu bạn sử dụng redux-logger, đảm bảo nó chỉ được inject vào middle ware của redux trên phiên bản dev thôi nhé. Các log khác có thể tận dụng [babel-plugin-transform-remove-console](https://babeljs.io/docs/en/babel-plugin-transform-remove-console)
### 5. Smart and Dumb components
Điều này cực kỳ quan trọng đối với bất kỳ dự án React Native nào vì phân loại components của bạn là smart hoặc dumb sẽ giúp bạn tổ chức dự án của bạn một cách hợp lý và cũng sử dụng lại các components của bạn tốt hơn.

Các smart components, còn được gọi là các components dựa trên Class hoặc container có liên quan đến cách mọi thứ hoạt động. Có thể hiểu là chúng giữ trạng thái, tìm nạp dữ liệu từ API, thực hiện hầu hết các tính toán, theo dõi các lifecycles nếu cần, cung cấp dữ liệu cho các components  khác và không bao gồm UI.

Các dumb components, còn được gọi là các components chức năng hoặc về UI. Chúng chỉ cần nhận props thông qua các components cha và hiển thị nó cho người dùng. Chúng thường không có state và rất ít logic, đa phần chúng đều chứa các style liên quan đến giao diện của chúng. Chúng có khả năng tái sử dụng cao vì chúng cung cấp một chức năng đơn giản dựa trên dữ liệu đầu vào.
### 6. Sử dụng toán tử ternary chính xác 
Viết `color = error ? ‘red’: ‘gray’` là rất tuyệt vời phải ko

Viết `color = error ? (id === myID) ? ‘red’ : ‘black’ : ‘gray’` thì không. 

Toán tử ternary có thể giúp giảm số lượng dòng trong mã của bạn nhưng đừng bao giờ lồng chúng vì logic trở nên khó đọc.
### 7. Đừng lạm dụng zIndex
Chỉ sử dụng z Index khi bạn không còn lựa chọn nào khác. Ví dụ: nếu bạn muốn overlay  <Text> trên <Image>, sử dụng z Index là cách làm sai. Bạn nên sử dụng component <ImageBackground> thay thế. Một nguyên tắc nhỏ là nếu bạn nghĩ rằng bạn đang làm phức tạp mã của mình với rất nhiều thuộc tính zIndex, thì có lẽ bạn đã đúng. Hãy suy nghĩ lại về bố cục của bạn.
    
### 8. setState() không đồng bộ
Đây là một trong những lỗi phổ biến nhất cho người mới bắt đầu trong React Native. Mặc dù việc thay đổi state của một component gây ra render laij, nhưng nếu bạn viết một cái gì đó như `setState ({username: 'somevalue'})`, và sau đó thử đọc `this.state.username `trong dòng tiếp theo, bạn sẽ không đọc được giá trị chính xác, vì setState () là một hoạt động không đồng bộ. Sử dụng await setState ({username}) để tránh sự cố này.
### 9. Redux - Bạn có thể dispatch actions từ actions khác
Một action không  chỉ được giới hạn trong một request API hoặc một loại thao tác dữ liệu. Bất kỳ action nào cũng có thể được gửi từ một action khác, từ cùng một tệp hoặc một tệp khác. Nghe có vẻ rõ ràng nhưng có thể bị bỏ qua.
### 10. Đừng để lại dữ liệu nhạy cảm trong ứng dụng của bạn
Điều này bao gồm các key API, secret API, ID dự án, info khách hàng, tên miền hoặc bất kỳ dữ liệu nào quá nhạy cảm để giữ bên trong ứng dụng. Giữ tất cả những thứ này trên server, không phải trong dự án của bạn.
### 11. Manage your image resources properly
Sử dụng descriptive image names, ví dụ tên` login_button_disables.png` rõ ràng và dễ sử dụng hơn nhiều so với `login_button_gray.png`. Luôn luôn cung cấp kích thước @ 1x, @ 2x và @ 3x để có thể xử lý các màn hình khác nhau trên cả iOS và Android. Nếu kích thước hình ảnh của bạn quá nhỏ hoặc không được gắn chính xác, chúng sẽ có khả năng hiển thị không đúng chất lượng như mong muốn (mờ), hậu quả là làm cho ứng dụng của bạn trông rất thiếu chuyên nghiệp. Mặt khác, nếu bạn muốn giảm kích thước tệp của tất cả các hình ảnh của mình một cách dễ dàng mà không làm giảm chất lượng, hãy sử dụng các ứng dụng như [ImageOptim](https://imageoptim.com/).
### 12. DRY everywhere
Nếu tôi phải nhắc đến cho một nguyên tắc lập trình làm cơ sở cho mọi thứ khác trong phát triển phần mềm, thì đó sẽ là nguyên tắc **Don’t Repeat Yourself**. Bất cứ khi nào bạn viết cùng một đoạn code hai lần, hãy cấu trúc lại nó thành một cái gì đó có thể tái sử dụng. Ngay cả khi nó không hoàn toàn giống nhau nhưng tương tự, nó cũng đáng để xem xét trừu tượng hóa nó. Tạo các components tái sử dụng của riêng bạn và các utility methods. Bạn sẽ cực kỳ thích thú với các công việc sau này, vì nó sẽ tăng vọt hiệu quả của bạn và làm cho dự án của bạn trở thành mô-đun. Nếu tất cả các button của bạn trông giống nhau, với kích thước phông chữ, màu sắc và bán kính đường viền cụ thể, thì việc tạo wrapper components là một ý tưởng tốt. Nhưng đừng dừng lại ở đó. Hãy tạo các  wrapper components cho bất cứ components bạn sử dụng nhiều lần trong ứng dụng của bạn. Bạn có text buttons? Tạo một components có thể sử dụng lại <TextButton> với mục đích duy nhất là wraps  <TouchableOpacity> và <Text>. Bạn có nhiều image buttons? Tạo một components <ImageButton> wraps <TouchableOpacity> và <Image>. Bạn sẽ thành công !!!
    
### 13. Việc sử dụng library ngoài
Nếu có một thư viện ngoài kia đáp ứng nhu cầu của bạn và nó không bị bỏ rơi (không còn được maintain/upgrade từ cộng đồng), thì tốt hơn là sử dụng nó thay vì phát minh lại bánh xe (Tôi đã nói câu này hàng tỷ lần với các member của tôi). Chúng giúp bạn tiết kiệm rất nhiều thời gian phát triển quý giá của bạn cho một cái gì đó khác. Tuy nhiên, bạn cần thực hiện một số nghiên cứu về các thư viện bạn dự định sử dụng. Có hoạt động và duy trì thường xuyên? Liệu nó có được đánh giá tốt? Được thử nghiệm tốt? Nó có rất nhiều vấn đề? Nó có hỗ trợ cả iOS và Android không? Theo quy tắc thông thường mà tôi hay đề ra, nếu học cách sử dụng thư viện bên ngoài sẽ tốn nhiều thời gian hơn là so với việc tự mình làm mọi thứ, tốt nhất bạn tự viết cho nó lẹ.
    
Đôi khi bạn sẽ muốn thay đổi một cái gì đó trong một thư viện ngoài. Đừng có dại mà chỉnh sửa nó trực tiếp trong node_modules/. Thư mục đó thường sẽ đặt vào gitignore, vì vậy nếu bạn thay đổi mã trực tiếp ở trỏng, team bạn của bạn sẽ không thấy các thay đổi của bạn. Ngoài ra,  npm install sẽ ghi đè lên các thay đổi của bạn. Giải pháp là fork repo lưu trữ ban đầu và liên kết dự án của bạn với repo của riêng bạn, nơi bạn sẽ thực hiện các thay đổi (và thậm chí thực hiện PR cho tác giả ban đầu nếu bạn muốn giúp đỡ!) Hoặc nếu thư viện rất nhỏ (một tệp ), bạn có thể copy/paste nó như một thành phần trong dự án của riêng bạn và sau đó chỉnh sửa nó như thế nào tùy ý.

### 14. Sử dụng Live Reloading, Hot Reloading, và Inspector
Mỗi một trong số các tính năng React Native này đều cực kỳ hữu ích, vì vậy hãy chắc chắn sử dụng cả ba. Live Reloading giúp bạn tiết kiệm thời gian bạn sẽ refresh lại ứng dụng một cách thủ công, Hot Reloading giúp bạn tiết kiệm thời gian để thiết kế lại màn hình mà không dễ để navigate tới trong ứng dụng của bạn và Inspector giúp bạn tiết kiệm hàng tấn câu lệnh console.log.

### 15. Sử dụng async/await syntax, nhưng đừng mù quáng
Nếu bạn là developer React Native, có lẽ bạn đã sử dụng async/await. Nó trông sạch sẽ và tránh được callback hell. Tuy nhiên, hãy cẩn thận rằng cú pháp này vô tình làm cho code đáng lẽ ra không đồng bộ của bạn lại trở thành đồng bộ hóa, vì vậy trước khi sử dụng, hãy tự hỏi: Bạn có thực sự cần điều này không? Có điều gì bạn cần làm song song với mã trước đó của bạn không? Nếu vậy, bạn có thể cần phải suy nghĩ lại về cách tiếp cận của bạn. Nếu bạn có một số request API mà không phụ thuộc vào nhau, điều tốt nhất bạn có thể làm là tạo một Promise cho mỗi lần call không đồng bộ đó, đặt tất cả chúng trong một mảng và chạy Promise.all trên đó. Kết quả này, Promise của nhóm này sẽ kết thúc ngay khi tất cả các Promise bên trong được thực hiện, điều này chắc chắn nhanh hơn nhiều so với việc chạy từng yêu cầu lần lượt.

Happy coding!