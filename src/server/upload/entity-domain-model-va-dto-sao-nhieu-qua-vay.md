Bài viết hôm nay khá hay và cũng là chủ đề quan trọng trong Spring Boot. Cụ thể chúng ta cùng tìm hiểu xem data sẽ biến đổi như thế nào khi đi qua các layer khác nhau. Và những khái niệm Entity, Domain model và DTO là gì nhé.

## 1. Kiến trúc tổng quan Spring Boot

### 1.1. Kiến trúc source code và kiến trúc dữ liệu

Trong các phần trước, chúng ta đã biết được mọi ứng dụng Spring Boot đều tuân theo 2 mô hình cơ bản:

* Mô hình MVC
* Mô hình 3 lớp (3 tier)

Và do đó, chúng ta kết hợp lại được ứng dụng hoàn chỉnh có cấu trúc như sau.

![](https://images.viblo.asia/fdbe3b44-aa91-4a88-9202-814c56ef9178.png)

Sơ đồ trên dùng để tổ chức source code trong chương trình. Nhờ đó chúng ta chia thành các Controller, Service, Repository tương ứng với các layer. Tuy nhiên, nếu xét về mặt tổ chức data, thì sơ đồ sẽ trở thành như sau.

![](https://images.viblo.asia/0b2971bd-7098-4652-a677-c61aea36e032.png)

Mô hình này cũng gồm có 3 lớp, trong đó tên các layer được đổi thành các thành phần tương ứng trong Spring Boot.

Theo đó, tương ứng với từng layer thì data sẽ có dạng khác nhau. Nói cách khác, mỗi layer chỉ nên xử lý một số loại data nhất định. Mỗi dạng data sẽ có nhiệm vụ, mục đích khác nhau. Tất nhiên trong code cũng được chia ra tương ứng.

Ví dụ trong sơ đồ thì **Controller** không nên đụng tới data dạng **domain model** hoặc **entity**, chỉ được phép nhận và trả về **DTO**.

### 1.2. Tại sao phải chia nhiều dạng data

Do tuân theo nguyên tắc SoC - separation of concerns - chia tách các mối quan tâm trong thiết kế phần mềm. Cụ thể, chúng ta đã chia nhỏ ứng dụng Spring Boot ra như sau.

> Spring Boot = Presentation layer + Service layer + Data access layer

Đó là việc chia nhỏ source code theo SoC. Tuy nhiên, ở mức thấp hơn thì SoC thể hiện qua nguyên lý đầu tiên của SOLID (Single responsibility - nguyên lý đơn nhiệm), nghĩa là mỗi class chỉ nên thực hiện một nhiệm vụ duy nhất.

Do đó, trước đây data chỉ có 1 dạng, nhưng có nhiều layer, mỗi layer hành xử khác nhau với data nên data đã thực hiện nhiều nhiệm vụ. Điều này vi phạm vào Single responsibility, nên chúng ta cần chia nhỏ thành nhiều dạng data.

Một nguyên nhân nữa là nếu data chỉ có một dạng thì sẽ bị leak (lộ) các dữ liệu nhạy cảm. Lấy ví dụ chức năng tìm kiếm bạn bè của Facebook, đúng ra chỉ trên trả về data chỉ có các info cơ bản (avatar, tên,...). Nếu chỉ có một dạng data thì toàn bộ thông tin sẽ được trả về. Mặc dù client chỉ hiển thị những info cần thiết, nhưng việc trả về toàn bộ thì kẻ xấu có thể lợi dụng để chôm các info nhạy cảm.

Vì thế, phân tách data thành các dạng riêng biệt cũng là một cách để tăng cường bảo mật cho ứng dụng.

## 2. Các dạng data

### 2.1. Hai loại data

Theo sơ đồ trên, data trong ứng dụng Spring Boot chia thành 2 loại chính:

* **Public:** nghĩa là để trao đổi, chia sẻ với bên ngoài qua REST API hoặc giao tiếp với các service khác trong microservice. Data lúc này ở dạng DTO.
* **Private:** các data dùng trong nội bộ ứng dụng, bên ngoài không nên biết. Data lúc này nằm trong các Domain model hoặc Entity.

Các dạng data có thể có nhiều tên gọi khác nhau, nhưng chung quy lại vẫn thuộc 2 phần như trên. Do đó, khi áp dụng vào kiến trúc Spring Boot thì chúng ta sẽ cân nhắc xem loại data nào phù hợp với layer nào (phần 2.2).

Từ 2 loại public và private trên, chúng ta có 3 dạng data:

* **DTO (Data transfer object):** là các class đóng gói data để chuyển giữa client - server hoặc giữa các service trong microservice. Mục đích tạo ra DTO là để giảm bớt lượng info không cần thiết phải chuyển đi, và cũng tăng cường độ bảo mật.
* **Domain model:** là các class đại diện cho các domain, hiểu là các đối tượng thuộc business như Client, Report, Department,... chẳng hạn. Trong ứng dụng thực, các class đại diện cho kết quả tính toán, các class làm tham số đầu vào cho service tính toán,... được coi là **domain model**.
* **Entity:** cũng là **domain model** nhưng tương ứng với table trong DB, có thể map vào DB được. Lưu ý chỉ có entity mới có thể đại diện cho data trong DB.

Các dạng data có hậu tố tương ứng, trừ entity. Ví dụ entity `User` không có hậu tố, nếu là domain model thì là `UserModel`, hoặc với DTO thì là `UserDto`,... cũng vậy.

### 2.2. Nguyên tắc chọn data tương ứng với layer

Well mình cũng không biết gọi nó như thế nào nữa. Nói tóm lại, từng layer trong mô hình 3 lớp sẽ thực hiện xử lý, nhận, trả về dữ liệu thuộc các loại xác định.

Áp dụng vào mô hình 3 lớp trong sơ đồ, thì chúng ta rút ra được nguyên tắc thiết kế chung:

* **Web layer:** chỉ nên xử lý **DTO**, đồng nghĩa với việc các **Controller** chỉ nên nhận và trả về dữ liệu là **DTO**.
* **Service layer:**  nhận vào **DTO** (từ controller gửi qua) hoặc **Domain model** (từ các service nội bộ khác). Dữ liệu được xử lý (có thể tương tác với DB), cuối cùng được **Service** trả về Web layer dưới dạng **DTO**.
* **Repository layer:** chỉ thao tác trên **Entity**, vì đó là đối tượng thích hợp, có thể mapping vào DB.

Đối với các thành phần khác của Spring Boot mà không thuộc layer nào, thì:

* **Custom Repository:** đây là layer không thông qua repository mà thao tác trực tiếp với database. Do đó, lớp này được hành xử như **Service**.

### 2.3. Model mapping

Khi data đi qua các layer khác nhau, nó biến đổi thành các dạng khác nhau. Ví dụ DTO từ controller đi vào service, thì nó sẽ được map thành domain model hoặc entity, rồi khi vào Repository bắt buộc phải trở thành Entity. Và ngược lại cũng đúng.

Việc convert giữa các dạng data, ví dụ DTO thành Entity, DTO thành domain model, domain model thành entity hoặc ngược lại, được gọi là model mapping.

Thực hiện model mapping thường là dùng thư viện như ModelMapper (cách dùng sẽ có trong bài tiếp theo). Tuy nhiên, đơn giản nhất thì có thể viết code copy thuần như sau.

```java:UserDto.java
@Getter
public class UserDto {
    String name;
    String age;

    public void loadFromEntity(User entity) {
        this.name = entity.getName();
        this.age = entity.getAge();
    }
}
```

```java:User.java
@Getter
public class User {
    String name;
    String age;
    String crush;

    public void loadFromDto(UserDto dto) {
        this.name = dto.getName();
        this.age = dto.getAge();
    }
}
```

Code như trên khi sử dụng sẽ trông như này.

```java
// Trong controller, convert từ DTO > entity
User user = new User();
user.loadFromDto(userDto);

// Hoặc trả về cũng tương tự, từ Entity > DTO
User user = userService.getUser(username);
userDto userDto = new UserDto();
userDto.loadFromEntity(user);
return userDto;
```

Cách khác đơn giản hơn là thay vì viết method copy thì copy trong constructor luôn. Do đó, code convert sẽ ngắn hơn.

```java
User user = new User(userDto);  // DTO > entity
UserDto userDto = new UserDto(user);  // Entity > DTO
```

## 3. Thực tế như thế nào?

Khi áp dụng vào thực tế, có muôn hình vạn trạng trường hợp xảy ra. Không chỉ đơn thuần theo mẫu sau.

> Controller nhận DTO > Service chuyển DTO thành model hoặc entity, rồi xử lý > Repository nhận Entity đưa vào DB
>
> Repository lấy từ DB ra Entity > Service xử lý sao đó rồi thành DTO > Controller và trả về DTO

Mà còn có các trường hợp khác như:

* Controller không nhận DTO mà nhận vào tham số primitive như int, float,...
* Nhận vào một List DTO
* Trả về một List DTO
* ...

Do đó, trong thực tế người ta có thể thay đổi cho phù hợp với dự án.

Ví dụ chuẩn là Service sẽ thực hiện mapping sang DTO và ngược lại, controller chỉ nhận DTO. Nhưng đôi lúc để giảm tải cho service thì việc mapping này sẽ do controller đảm nhiệm (tuy vậy controller có thể bị phình to, trong khi đúng ra phải giữ controller mỏng - ít code nhất có thể).

Nhưng dù cách nào đi nữa, thì nguyên tắc chung là việc mapping luôn được thực hiện ở rìa của code (edge). Nghĩa là nếu mapping trong service thì việc chuyển đổi phải luôn nằm ở đầu, hoặc ở cuối cùng method khi chúng được xử lý.

Ngoài ra, để giảm boilerplate code, chúng ta thường giảm sự chặt chẽ xuống một chút nếu không cần thiết. Ví dụ như:

* Đôi khi không cần **domain model**, **Service** có thể chuyển thẳng **DTO** thành **entity**.
* **Service** cũng có thể trả về **Entity** hoặc **Model**, nếu chúng quá đơn giản và không chứa info nhạy cảm. Lúc này không cần DTO mà controller trả về Entity hoặc Model luôn để đỡ rối (mặc dù vì phạm nguyên tắc khi public hai thằng này, nhưng cũng nên cân nhắc).

Có nhiều ý kiến tranh cãi về việc sử dụng DTO, coi đó như là một anti pattern. Cá nhân mình không thấy vậy, nhiều lúc DTO vẫn khá hữu dụng, và có thể tùy biến để phù hợp và hiệu quả hơn.

---

Bài viết đến đây cũng dài rồi. Nói thật đây là bài mình tốn công nhất, do phải đụng tới khá nhiều về architecture. Mới hôm qua mình còn lôi cả project cũ ra để refactor lại cho đúng chuẩn, để nắm rõ hơn về kiến trúc mình sắp trình bày và các side effect có thể xảy ra.

Bài viết có tham khảo ở nguồn https://www.petrikainulainen.net/software-development/design/understanding-spring-web-application-architecture-the-classic-way/ mà mình cảm thấy hay nhất. Trong link trên còn có phần kết và bình luận, các bạn có thể đọc thêm.

À quên nếu bạn cảm thấy bài viết hay và hữu ích, hãy upvote và clip để tiếp thêm động lực cho mình nhé. Bye bye :heart_eyes: