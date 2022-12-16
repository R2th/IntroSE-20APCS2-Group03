## Giới thiệu

Chúng ta hãy xem một app đơn giản như sau.
App hiển thị kết quả của 1 trận bóng rổ. 

App có các Button để người dùng chỉnh sửa kết quả.
Tuy nhiên, nếu người dùng xoay điện thoại, điểm số hiện tại sẽ biến mất 1 cách khó hiểu.

![](https://images.viblo.asia/2946b9e1-c3a3-4f00-8774-5e97448de652.gif)

Điều gì đang xảy ra?  
Xoay thiết bị là một trong một số thay đổi về cấu hình mà ứng dụng có thể thực hiện trong suốt thời gian tồn tại, bao gồm cả tính khả dụng của bàn phím và thay đổi ngôn ngữ của thiết bị. 
Tất cả những thay đổi cấu hình này khiến Activity bị hủy và tạo lại.

Hành vi này cho phép chúng ta thực hiện những việc như sử dụng bố cục cụ thể theo hướng ngang khi xoay thiết bị. 
Thật không may, nó có thể là một vấn đề đau đầu đối với các lập trình viên mới (và đôi khi không quá mới).

Tại Google I / O 2017, nhóm Android Framework đã giới thiệu một bộ Thành phần kiến trúc mới, một trong số đó giải quyết vấn đề xoay vòng chính xác này.

Lớp ViewModel được thiết kế để lưu giữ và quản lý dữ liệu liên quan đến giao diện người dùng theo cách có ý thức trong vòng đời. 
Điều này cho phép dữ liệu tồn tại qua các thay đổi cấu hình như xoay màn hình.

## Ví dụ đơn giản

Có ba bước để thiết lập và sử dụng ViewModel:

- Tách dữ liệu của bạn khỏi bộ điều khiển UI bằng cách tạo một lớp kế thừa từ ViewModel.
- Thiết lập giao tiếp giữa ViewModel và bộ điều khiển UI của bạn.
- Sử dụng ViewModel trong bộ điều khiển UI của bạn.

### Bước 1: Tạo lớp ViewModel

Lưu ý: Để tạo ViewModel, trước tiên bạn sẽ cần thêm phần phụ thuộc vòng đời chính xác. 

Nói chung, bạn sẽ tạo một lớp ViewModel cho mỗi màn hình trong ứng dụng của mình. 
Lớp ViewModel này sẽ giữ tất cả dữ liệu được liên kết với màn hình và có các hàm getter và setter để lưu trữ dữ liệu.

Việc làm này tách code để hiển thị UI, được triển khai trong Activity và Fragment của bạn, khỏi dữ liệu của bạn, hiện nằm trong ViewModel. 
Vì vậy, hãy tạo lớp ViewModel cho một màn hình trong ứng dụng mà chúng ta đang nhắc đến:

```
public class ScoreViewModel extends ViewModel {
   // Tracks the score for Team A
   public int scoreTeamA = 0;

   // Tracks the score for Team B
   public int scoreTeamB = 0;
}
```

### Bước 2: Liên kết UI và ViewModel

UI của bạn (Activity hoặc Fragment) cần biết về ViewModel của bạn. 
Điều này để UI của bạn có thể hiển thị dữ liệu và cập nhật dữ liệu khi các tương tác với UI xảy ra, chẳng hạn như nhấn nút để tăng điểm của một nhóm trong Ứng dụng ghi điểm bóng rổ nói trên.

Tuy nhiên, ViewModels không nên có tham chiếu đến Activity, Fragment hoặc Context.
Hơn nữa, ViewModels không được chứa các phần tử chứa tham chiếu đến UI, chẳng hạn như View, vì điều này sẽ tạo tham chiếu gián tiếp đến Context.

Lý do bạn không nên lưu trữ các đối tượng này là ViewModels tồn tại lâu hơn các UI cụ thể của bạn. 
Nếu bạn xoay một Activity ba lần, bạn vừa tạo ba phiên bản Activity khác nhau, nhưng bạn chỉ có một ViewModel.

Với phân tích trên, hãy tạo một liên kết UI/ViewModel. 
Bạn sẽ muốn tạo một biến thành viên cho ViewModel của mình trong UI. 

Vì vậy, trong onCreate, bạn nên gọi:

```
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   setContentView(R.layout.activity_main);
   mViewModel = ViewModelProviders.of(this).get(ScoreViewModel.class);
   // Other setup code below...
}
```

### Bước 3: Sử dụng ViewModel trong Bộ điều khiển giao diện người dùng của bạn

Để truy cập hoặc thay đổi dữ liệu của UI, bây giờ bạn có thể sử dụng dữ liệu trong ViewModel của mình. 
Dưới đây là một ví dụ về hàm onCreate mới và phương pháp cập nhật điểm số bằng cách thêm một điểm cho đội A trong Ứng dụng cập nhật điểm bóng rổ:

```
// The finished onCreate method
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   setContentView(R.layout.activity_main);
   mViewModel = ViewModelProviders.of(this).get(ScoreViewModel.class);
   displayForTeamA(mViewModel.scoreTeamA);
   displayForTeamB(mViewModel.scoreTeamB);
}

// An example of both reading and writing to the ViewModel
public void addOneForTeamA(View v) {
   mViewModel.scoreTeamA = mViewModel.scoreTeamA + 1;
   displayForTeamA(mViewModel.scoreTeamA);
}
```

### ViewModelsProviders.of

Lần đầu tiên phương thức ViewModelProviders.of được MainActivity gọi, nó sẽ tạo một instance ViewModel mới. 
Khi phương thức này được gọi lại, điều này xảy ra bất cứ khi nào onCreate được gọi, nó sẽ trả về ViewModel đã có từ trước được liên kết với MainActivity. 
Đây là chính là cách bảo tồn dữ liệu.

Điều này chỉ hoạt động nếu bạn truyền đúng UI làm đối số đầu tiên. 
Mặc dù bạn không bao giờ nên lưu trữ UI bên trong ViewModel, nhưng lớp ViewModel vẫn theo dõi các mối liên kết giữa ViewModel và UI đằng sau hậu trường, sử dụng UI mà bạn truyền vào làm đối số đầu tiên.

```
ViewModelProviders.of(<THIS ARGUMENT>).get(ScoreViewModel.class);
```

Điều này cho phép bạn có một ứng dụng mở ra nhiều phiên bản khác nhau của cùng một Activity hoặc Fragment, nhưng với thông tin ViewModel khác nhau. 

Hãy tưởng tượng nếu chúng ta mở rộng ví dụ này để có điểm số cho nhiều trận bóng rổ. 
Các trận đấu được trình bày trong một danh sách, sau đó nhấp vào một trận đấu trong danh sách sẽ mở ra một màn hình trông giống như MainActivity hiện tại, sẽ gọi là GameScoreActivity.

Đối với mỗi màn chơi khác nhau mà bạn mở, nếu bạn kết hợp ViewModel và GameScoreActivity trong onCreate, nó sẽ tạo ra một phiên bản ViewModel khác. 
Nếu bạn xoay một trong những màn hình này, kết nối với cùng một ViewModel sẽ được duy trì.

![](https://images.viblo.asia/5f53664d-0aa1-43a8-99ee-fa222ec70d33.png)

## Kết luận

Trong bài đăng này, chúng ta đã khám phá những kiến thức cơ bản về lớp ViewModel mới. Những điều chính cần rút ra là:

- Lớp ViewModel được thiết kế để lưu giữ và quản lý dữ liệu liên quan đến UI theo cách có ý thức trong vòng đời. 
Điều này cho phép dữ liệu tồn tại qua các thay đổi cấu hình như xoay màn hình.

- ViewModels tách biệt việc triển khai UI với dữ liệu ứng dụng của bạn.

- Nói chung, nếu màn hình trong ứng dụng của bạn có dữ liệu tạm thời, bạn nên tạo một ViewModel riêng cho dữ liệu của màn hình đó.

- Vòng đời của ViewModel kéo dài từ khi UI được liên kết được tạo lần đầu tiên cho đến khi nó bị phá hủy hoàn toàn.

- Không bao giờ lưu trữ UI hoặc Context trong ViewModel. 
Điều này bao gồm việc lưu trữ một View trong ViewModel. 
Các tham chiếu trực tiếp hoặc gián tiếp đến UI sẽ làm hỏng mục đích tách giao diện người dùng khỏi dữ liệu và có thể dẫn đến rò rỉ bộ nhớ.