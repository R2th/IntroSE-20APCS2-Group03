### 1. Không nên sử dụng Expo
Không nên sử dụng Expo trong dự án lớn ít nhất là thời điểm mình viết bài này, vì sao ư? Hãy xem một vài lý do sau đây. 
Thứ nhất, toàn bộ quá trình build không được hoàn thành ở local, mà ở cloud Expo, điều đó nghĩa rằng khó để kiểm soát và khắc phục những lỗi tiềm tàng trong dự án. Thứ hai, bạn đang thêm 1 layer phức tạp khác vào trong project của bạn, nó khiến cho ứng dụng chậm dần và tăng kích thước của app. Và điều quan trọng nhất là với 1 số modules iOS/Android khi bạn cần sử dụng có thể sẽ không được hỗ trợ :(. Bạn chỉ được dùng những module có sẵn được cung cấp bởi Expo SDK mà thôi.

### 2. Sử dụng ESLint
Sử dụng 1 linter trong bất kỳ dự án nào là điều nên làm, đặc biệt cho JavaScript. ESLint là 1 extension khá thú vị và nó thực sự dễ dàng để cài đặt và sử dụng nên hãy tập thói quen sử dụng ESLint ngay khi bắt đầu dự án của mình nhé. Nếu bạn không thích 1 vài rules trong ESLint, bạn có thể disable chúng đi bất cứ lúc nào trong file configuration **.eslintrc.** 

### 3. Remove tất cả các log trước khi build bản release
Một vài câu lệnh **console.log** trong app có thể khiến ứng dụng của bạn chậm đi trông thấy đấy, đặc biệt nếu bạn sử dụng thư viện logging như là **redux-logger**. Vậy nên hãy chắc chắn rằng bạn đã disable các logs trước khi build bản release nhé.

### 4. Sử dụng Flexbox
Đôi khi bạn thường nhìn thấy đoạn code React Native sử dụng vị trí tuyệt đối của phần tử thay vì sử dụng flexbox, điều đó làm chó giao diện đôi lúc bị vỡ và không có tính tái sử dụng. Không quan trọng yêu cầu thiết kế của bạn như thế nào, việc sử dụng flexbox luôn được khuyến nghị. Cho những bạn chuyển sang code React Native từ 1 web developer, Flexbox trong React Native cũng tương tự như việc sử dụng **CSS**. Sự khác biệt duy nhất là **flexDirection** mặc định là **column** thay vì là **row** như trong React Native.

### 5. Đặt tên đối tượng style nhất quán

### 6. Smart và dumb component
Điều này thực sự quan trọng cho project React Native bởi vì các component này sẽ giúp bạn tổ chức ứng dụng 1 cách logic và để tái sử dụng các component sau này tốt hơn.

**Smart Components** cũng được biết đến là class-based hoặc components container, nó quan tâm đến việc mọi thứ làm việc như thế nào. Điều đó có nghĩa là chúng có nhiệm vụ giữ state, fetch dữ liệu từ API, thực hiện các phép tính toán, quan tâm đến các phương thức vòng đời, cung cấp dữ liệu cho các components khác, và không chứa các đối tượng style. 

**Dumb components** hay còn gọi là components functional hoặc presentational, nó quan tâm đến việc mọi thứ trông ra sao. Các components này đơn giản là nhận dữ liệu (props) từ các components cha và hiển thị nó tới user. Chúng thường không có state và chứa ít logic và chứa tất cả style. Chúng có khả năng tái sử dụng cao bởi vì chúng cung cấp các chức năng đơn giản dựa trên dữ liệu đầu vào.

### 7. Sử dụng toán tử ternary
Viết `color = error ?  'red' : 'gray'` thay vì viết `color = error ? (id === myID) ? ‘red’ : ‘black’ : ‘gray’`. Ternary operators có thể giúp bạn cắt giảm số lượng dòng code nhưng hãy cẩn thận vì logic khó để đọc hiểu.

### 8. Không lạm dụng zIndex
Sử dụng zIndex khi thật sự cần thiết. Ví dụ, nếu bạn muốn ghi đè 1 **<Text>** lên bên trên **<Image>**, sử dụng zIndex là cách sai để làm điều này. Bạn nên sử dụng component **<ImageBackground>** thay thế. 
    
### 9. setState() không đồng bộ
    
Đây là 1 trong những lỗi thường gặp nhất với những bạn mới tìm hiểu React Native. Mặc dù việc thay đổi state của 1 component có thể dẫn đến việc re-render, nếu bạn viết 1 vài thứ như `setState({username: 'somevalue'})`, và sau đó gọi đến `this.state.username` trong dòng code tiếp theo, bạn sẽ không lấy được giá trị đúng, bởi vì **setState()** là không đồng bộ. Sử dụng `await setState({username})` để tránh vấn đề này nhé.
    
### 10. Bạn có thể dispatch redux action từ action khác
Một action không phải bị giới hạn tới 1 API request duy nhất. Bất kỳ action nào có thể dispatch từ 1 action khác, từ cùng hoặc file khác.
    
### 11. Không lưu trữ dữ liệu nhạy cảm trong ứng dụng của bạn
Nó bao gồm API keys, API secrets, project IDs, client secrets, domains và bất kỳ dữ liệu khác nhạy cảm. Hãy giữ nó ở trên server, không nên giữ trong project.
    
### 12. Quản lý nguồn ảnh
Đặt tên ảnh rõ ràng. Ví dụ đặt tên là **login_button_disabled.png** thay vì **login_button_gray.png** để nó clear hơn. Sử dụng **@1x**, **@2x**, **@3x** dimensions để xử lý các độ phân giải màn hình khác nhau cho cả iOS và Android. Nếu dimensions của ảnh quá nhỏ, bạn có thể blurred ảnh, nhưng hãy cân nhắc vì điều đó sẽ khiến cho ứng dụng của bạn trông sẽ thiếu chuyên nghiệp đấy. Khía cạnh khác, nếu bạn muốn giảm kích thước của ảnh mà không làm giảm chất lượng, hãy sử dụng 1 vài gợi ý như: [ImageOptim](https://imageoptim.com/)
    
### 13. Sử dụng đối tượng destructuring
Chắc rằng không ai muốn thấy `this.props.navigation.state.params.username` tại mọi nơi. Vì vậy nên sử dụng đối tượng destrcucturing. 

Nó làm cho code dễ đọc và dễ hiểu hơn. Bạn có thể sử dụng nó như là parameters trong hàm, thay vì sử dụng `const MyComponent = (props) => {` bạn có thể viết là `const MyComponent = ({ username, userID}) => { `
Bạn cũng cần phải xem xét khi nào nên sử dụng destructuring và khi nào không, nhưng hầu hết việc sử dụng nó là 1 ý tưởng tốt. Việc sử dụng nó không tốt nếu nó khiến cho 1 function nhỏ trở nên phình to ra, hoặc nếu sử dụng nó tạo tên biến conflicts.
Ví dụ, nếu bạn có 1 biến là this.props.id và this.state.id việc sử dụng destructuring sẽ cắt giảm cả các biến với cùng tên id, và điều đó không tốt chút nào.
    
### 14. DRY mọi nơi
Nếu tôi phải đặt tên 1 quy tắc cho mọi thứ hoặc trong công việc phát triển phần mềm, nên theo quy tắc **Don't Repeat Yourself** (dịch nôm na ra là đừng lặp lại thứ bạn đã làm). Bất cứ khi nào bạn biết 1 đoạn code lần thứ 2, hãy refactor nó để có thể tái sử dụng. Ngay cả khi nó không giống hoàn toàn nhưng tương tự. Tạo riêng cho bản thân các components có thể tái sử dụng và các phương thức hỗ trợ.
Bạn sẽ cảm thấy rất vui sau này vì nó sẽ rất hữu hiệu cho các dự án của bạn. Nếu tất cả các button trông như nhau, với font size, color, border radius, hãy tạo 1 component chung, đó là 1 ý tưởng tốt đó. Không dừng ở đó, các thành phần này sẽ được bạn sử dụng lặp đi lặp lại trong ứng dụng của bạn nhiều lần. 
    
### 15. Sử dụng thư viện ngoài
Nếu có 1 thư viện hay ho bạn cần dùng, nó thật là tốt để sử dụng thay vì tốn thời gian tạo lại 1 cái tương tự. Tuy nhiên, bạn cần phải tìm hiểu về thư viện mà bạn sẽ sử dụng. Nó có đang còn được sử dụng hay không, và có được maintain thường xuyên hay không? Có được rating tốt không? Có được test kỹ hay không? Có issue nào không? Có hỗ trợ cho cả iOS và Android hay không? Thi thoảng, nếu bạn muốn thay đổi đôi chút trong thư viện ngoài, không được edit trực tiếp folder **node_module/**. Folder này giả định ignored bất kỳ các version nào, nên nếu bạn thay đổi code trực tiếp, đồng đội của bạn sẽ không thấy các thay đổi đó. Giải pháp là bạn có thể fork original repository và có thể tạo pull request tới tác giả hoặc nếu thư viện nhỏ, bạn có thể copy/paste từng component vào project của bạn sau đó thay đổi nó ở local.
    
### 16. Sử dụng Live Reloading, Hot Reloading, và Inspector
Mỗi tính năng của React Native đều hữu ích, ít nhất là với 3 thứ sau đây. Live Reloading tiết kiệm thời gian bạn sử dụng để refreshing app của bạn. Hot Reloading giúp bạn tiết kiệm thời gian thiết kế lại màn hình và Inspector giúp bạn tiết kiệm cả đống console.log đấy.
    
### 17. Sử dụng cấu trúc async/await 
Nếu bạn là 1 React Native developer, bạn có thể đã từng sử dụng **async/await**. Nó trông gọn gàng và giúp bạn tránh khỏi callback hell. Tuy nhiên, hãy lưu ý rằng cấu trúc này làm cho code bất đồng bộ chạy đồng bộ, nên trước khi sử dụng nó, hãy tự hỏi rằng: bạn thực sự cần gì? Có vài thứ bạn cần thực hiện song song? Nếu có, hãy nghĩ lại cách tiếp cận. Nếu bạn có call 1 số API mà không phụ thuộc vào các API khác, thứ tốt nhất bạn có thể làm là tạo 1 promise cho mỗi API, đặt tất cả trong 1 array và chạy **Promise.all()**. Kết quả sẽ nhận được ngay khi tất cả các promises bên trong hoàn thành. Cách này sẽ nhanh hơn so với việc chạy từng request.
    
### 18. Sửa đổi nội dung của 1 state array/map sẽ không re-render.
Nếu bạn có 1 biến state là 1 hashmap, sửa đổi nội dung của nó sẽ không thay đổi chính nó, nên là **render()** sẽ không được gọi. Để tránh điều này, bạn cần tạo 1 bản copy của biến đó, ví dụ sử dụng hàm **_.cloneDeep()** trong thư viện **lodash**.
    
### 19. Ghi đè style
Nếu bạn cần ghi đè 1 style đã tồn tại hoặc sửa đổi style động, bạn có thể làm điều này dễ dàng bằng cách:
`<View style ={[ containerStyle, myStyle]} > …</View>`, với **myStyle** là style ghi đè từ **containerStyle** 
    
### 20. Quan tâm tới iOS Safe Area
Để ứng dụng của bạn trở nên “ngon” hơn trên mọi thiết bị iOS, bạn cần bọc các màn hình vào trong 1 safe area view để tránh sự “rối loạn” view. Bạn có thể gói vào trong React Native component **<SafeAreaView>**, tại đây bạn có thể thêm mọi thứ bạn cần vào màn hình ứng dụng.
    
### 21. Không sử dụng TouchableWithoutFeedback khi không có 1 lý do chính đáng
Như trong tài liệu chính thống của React Native đã đề cập, tất cả các phần tử có thể nhấn được nên có 1 trạng thái hiển thị khi nhấn chạm. Hãy sử dụng **<TouchableWithoutFeedback>** 1 cách thận trọng khi tạo UI.
    
### 22. Test component mới cho các case bên lề
Nếu component mới của bạn có 1 Text username, hãy chắc chắn rằng bạn muốn sử dụng nó trong mọi trường hợp như với 1 username dài và hãy trông nó wrap như thế nào và cách nó biến mất khỏi layout ra sao. Từ đó có thể xem xét việc sử dụng **sllipsizeMode** và **numberOfLines** cho **<Text>** nếu cần thiết. 

### 23. Sử dụng cơ chế report crash và use case log failed
Bạn nên quan tâm đến cơ chế report crash ví dụ như **Crashlytic**. Bên cạnh đó, thật là tuyệt vời để log mọi use case failed. Bạn có thể sử dụng dịch vụ như **Amplitude** mà bạn làm chủ backend và kiểm soát mọi thứ. Người dùng của bạn có thường xuyên nhập tên thay vì email trong màn hình login? Hoặc họ có thể report lỗi login trong ứng dụng của bạn nhưng không biết phải làm sao? Mọi thứ đều có thể xảy ra. Log tốt sẽ không những giúp bạn tiết kiệm thời gian mà còn biết được user thường hay mắc lỗi gì và sử dụng thông tin đó để cải thiện ứng dụng của bạn.
    
### 24. Call API trong componentDidMount()
**componentDidMount**() là nơi lý tưởng để thực hiện việc call API. Nó sẽ không ngăn chặn việc gọi render(), nên sẽ không cần lo lắng đến hiệu năng ứng dụng. Bên cạnh đó, nó cho phép bạn xử lý state mặc định để render component với giá trị state rỗng. 
    
### 25. Quan tâm về tương thích với các phiên bản trước
Thi thoảng 1 số tính năng bị removed, hoặc 1 vài sự thay đổi được giới thiệu như là thay đổi dữ liệu JSON trả về trên 1 API nào đó. Luôn luôn chú ý rằng người dùng có thể sẽ không update app của bạn tới phiên bản mới nhất, và do đó những phiên bản cũ có thể sẽ bị crashed theo 1 cách nào đó. Từ đó để tìm ra các phương án xử lý ví dụ như force update...
    
 Bạn đọc phần 2 tiếp theo tại đây nhé [React Native Tips(P2)](https://viblo.asia/p/react-native-tipsp2-gGJ59eM15X2)
    
:point_right:Bài viết đến đây là hết rồi, nếu cảm thấy bài viết hữu ích :ok_hand:, có thể đăng nhập và like cho mình nhé :+1:. Nhớ folow để xem các các bài viết sắp tới của mình nhé. Thanks! :handshake:
### Tham khảo
[50 React Native Tips — Part 1/2
](https://medium.com/mop-developers/50-react-native-tips-part-1-2-5cb12803228b)