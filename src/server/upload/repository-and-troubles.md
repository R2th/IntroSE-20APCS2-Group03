## Repository pattern là gì

Repository partern là pattern design để ẩn persistence, cũng hơi giống với pattern DAO(DataAccessObject) nhưng ở mức trừu tượng cao hơn, ẩn hoàn toàn storage persistence của hiện thực từ thao tác của entity.

Ví dụ như path của connection và storage bị ẩn từ interface của Reposiotory, user của Repository có thể thao tác lưu và tìm kiếm chứ không phải hiểu xem storage persistence là gì (ví dụ như MySQL hay Redis etc.).

Do đó logic sử dụng Repository có thể cho phép tập trung vào thao tác nghiệp vụ, ngoài ra cũng giúp tránh được những ảnh hưởng khi có phát sinh thay đổi ở tầng persistence như là di chuyển data base.

```java
// Ex) Repository để thực hiện tham chiếu, persistence của user
public interface UserRepository {
  User findBy(Long userId);
  User store(User user);
}

// Class sử dụng cho Repository
public class FooService {
  private UserRepository userRepository;

  public FooService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public void registerUser(String userName) {
    // Dùng Repository để lưu User nhưng sẽ không bị chi phối bởi phương pháp persistence
    User user = new User(userName);
    userRepository.store(user);
  }
}
```

Đây là một kiểu rất tiện dụng và dễ dùng nhưng khi đi vào thực tế với nhiều cách được dùng khác nhau mà có khi có những bug phát sinh, nên bài viết này tôi tổng hợp những anti pattern (những kiểu nên tránh) giới thiệu đến các bạn.

## Những anti pattern thownfg có khi thực hiện Repository

### Chia Repository theo function và role

Đây là pattern tạo ra nhiề Repository ứng với chức năng và vai trò cho 1 entity

Ví dụ như xét trong hệ thống cho phép đăng các bài viết, thì sẽ chia theo đơn vị chức năng như là: thao tác cập nhật, tham chiếu bài viết của các user thông thường sẽ là PostRepository; thao tác liên quan đến thẩm tra và public bài viết sẽ là PostScreeningRepository, etc.


![qiita_pu_—_未設定__ワークスペース_.png](https://qiita-image-store.s3.amazonaws.com/0/19254/2d8c7b18-d66e-d723-c638-2a1905e3899b.png)


#### Issues
Ở pattern này, nếu thoạt nhìn qua sẽ thấy rối rắm ko biết nên dùng Repository nào, bừa bộn nhiều repository về các logic liên quan đến business, khó để mà chỉnh hợp lại data và logic

Ví dụ với hệ thống mà nó định nghĩa nếu ban thẩm tra không OKthif ko thể public nó ra, thì dù đã thực hiện xử lý thay đổi trạng thái khi thẩm tra bài viết OK/NG vào PostScreeningRepository rồi nhưng vô tình có người khác đã ko thông qua PostScreeningRepository mà cưỡng chees thay đổi trạng thái sang public khiến nó lưu bằng PostRepository, trường hợp này vô hình chung đã phát sinh ra data không đúng với yêu cầu business.

#### Giải pháp
Các thao tác liên quân đến update trạng thái thì thực hiện trong Entity và Service.
Ngoài ra, kiểm soát không cho thay đổi cưỡng chế đối với các xử lý liên quan đến thao tác trạng thái.
Repository đơn giản được sử dụng như phuonwg thức access đến storagenên chúng ta cố gắng đừng đặt nhiều logic business phức tạp vào.

Với case như tôi vừa nêu trên, giả sử nếu ta chỉ public PostScreeningService vào package, làm cho chỉ có thể thay đổi status public bằng method, chuẩn bị method public cho Post entity, những lúc muốn public khi thẩm tra NG thì cho upload ngoại lệ etc, thì có thể kiểm soát an toàn được.

### Tạp nhiều Repository trong bảng con

Đây là trường hợp khá là thường gặp.
Ví dụ trong entiry User có các yếu tố *Address* , *Contact* coi là bảng con của User, và trong đó bị tạo ra nhiều repo như là UserRepository, ContactRepository, AddressRepository.

![qiita2.png](https://qiita-image-store.s3.amazonaws.com/0/19254/50a48a67-9335-fc5c-4131-2e7e1b9d15e7.png)

#### Issues
Giả sử với trường hợp yêu cầu business như sau:

* Trong các loại *Contact* có *Nhà riêng* *Di động*, thì User cần có ít nhất 1 trong các cái đó

Nếu tạo ContactRepository thì check logic theo yêu cầu business cũng cần có Repo, sẽ là nguyên nhân tạo ra bug có thể thực hiện lưu/xóa các contact mà đã bỏ qua việc xử lý check.

#### Giải pháp

Để phòng tránh việc này thì technique gọi là hợp nhất DDD rất hữu ích.
Việc hợp nhất này sẽ coi object liên quan với Entity là 1 ranh giới, việc update hợp nhất này bắt  buộc phải thông qua route hợp nhất, là technique có thể đảm bảo được tính chỉnh hợp data trong hợp nhất.

Ví dụ ta có Entity *Car* và *tire*, TH bắt buộc trong Car phải có 4 Tire, thì sẽ coi Car là route hợp nhất và tổng hợp những cái này lại.

khi muốn hoán đổi tire bằng việc sử dụng method changeWheel của Car mà là route hợp nhất, sẽ đảm bảo chắc chắn có 4 tire trong Car.
Ta sẽ không thể trực tiếp update object bên trong route hợp nhất, bên người dùng buộc phải lấy hợp nhất của Car thông qua repo của Car, sử dụng changeWheel để thực hiện hoán đổi  tire, rồi một lần nữa sử dụng repository lưu hợp nhất của Car đã update vafp storage persistence.

![qiita_2_pu_—_未設定__ワークスペース_.png](https://qiita-image-store.s3.amazonaws.com/0/19254/cf52eea4-1b42-fc51-a72e-85d76d6a77e7.png)

Với trường hợp nêu trong issue trên, coi User là route hợp nhất, định nghĩa hopwjnhaast bao gồm *Contact* *Address*, thông qua User để thực hiện updatee Contact ta sẽ có thể đảm bảo được tính chỉnh hợp của data.
Ví dụ, dù trong trường hợp chỉ cần Address thôi, kiểu gì cũng phải thông qua hợp nhất để lấy data, nhưng khi đó sẽ gặp những sự cố như câu query quá phức tạp hay lượng data xử lý quá nhiều, cụ thể hãy tham khảo pattern sau.

### Cố gắng phát hành các query phức tạp bằng Repository

Đây cũng là một trường hợp hay gặp.
Dù áp dụng nó với bất cứ ORM nào nó cũng là điều không nên.

#### Issues
Ở đây tôi sẽ nêu ra trường hợp điển hình dễ nhận thấy nhất từ yêu cầu business như sau.

* Status hội viên không phải *Đã rời hội*, mà là các user đã mua 10 sản phẩm trong vòng 3 tháng trước và 1 tháng gần đây nhất

Chắc hẳn bình thường ta sẽ tạo ID user làm key, tạo bảng lịch sử mua hàng, rồi cố gắng thực hiện query count số lượng theo ngày mua hàng bẳng ORM nhỉ.
Những query này về mặt lập trình cũng khó để maintenance, hơn nữa nếu thực hiện nhiều lệnh ở các màn như là màn list user thì dễ dẫn đến các vấn đề về performance.

#### Giải pháp
Tùy vào tình huống và performance mà có các phương án giải quyết khác nhau.

1) Chia các repo ra, chạy nhiều lần query và các số chẵn
Không cố đấm ăn xôi ở 1 repo mà ta lấy thông tin user ở trường *Ngoài những người đã ra khỏi hội* *Người đăng kí mới trong 3 tháng gần đây* từ repository User, lưu các ID đó vào key, lấy số lần mua *Trong vòng 1 tháng gần đây* từ repo Lịch sử mua hàng, rồi merge các thông tin này ở tầng Application.

2) Vận dụng CQS(Command Query Separation) ngắt các query
Nếu ở đây tôi đề cập đến CQRS thì hơi khó hiểu nên tôi sẽ tách ra thành Command và Query để giải thích.

CQS là nguyên tắc do Bertrand Meyer đề xuất nên, nó cho phép tất cả các method có thể phân loại ra 「Command」 gây tác dụng phụ hoặc 「Query」 trả về giá trị.

Lúc trên tôi cũng có nói là để thao tác hợp nhất được thì bắt buộc phải thông qua Repository, thì đây là câu chuyện nguyên tắc khi thực hiện thao tác thay đổi (Command).

Ngược lại với những lúc cần query phực tạp thì chỉ cần dùng truy vấn (Query) nhưng chủ yếu sẽ phát sinh ra các yêu cầu cố hữu của Application (cụ thể cho trường hợp này là 「Khi muốn hiển thị số sản phẩm đã mua gần đây lên màn hình list của user」 etc).

Cho nên những query như thế này sẽ ko thực hiện vào Repository, mà sẽ phát hành query trực tiếp thông qua query builder từ service của tầng Application.
Ngoài ra có thể dùng query builder mang tính an toàn như là jOOQ và ScalikeJDBC cũng được, hay dùng ORM mà có thể viết được SQL như kiểu MyBatis sử dụng jdbc trưc tiếp.

![qiita_3_pu_—_未設定__ワークスペース_.png](https://qiita-image-store.s3.amazonaws.com/0/19254/2eecead6-eb8e-4bc6-5b14-127354037fa2.png)

Các xử lý phức tạp của app cố hữu là QueryService, việc persistence và get của entity sẽ phân bổ nhiệm vụ cho Repository, bằng cách này có thể tránh đươc Repository bị phức tạp hóa một cách không cần thiết.


### Kết luận

Repository là một khái niệm rất là tiện ích với tính trừu tượng ở tầng persistence nhưng chỉ nhỡ nhầm xíu thôi là sẽ làm logic bi phức tạp lên.
Nhưng qua giới thiệu ở trên đây về technique hợp nhất của DDD và CQS phần nào sẽ rất hữu ích trong việc tránh các sự cố đã nêu. Mong là sẽ giúp các bạn vận dụng được khi sử dụng các pattern của Repository.