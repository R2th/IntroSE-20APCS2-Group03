# 1. Giới thiệu Serenity

Serenity BDD là một thư viện mã nguồn mở nhằm mục đích biến ý tưởng về [living document ](https://en.wikipedia.org/wiki/Specification_by_example)trở thành hiện thực.

Serenity BDD giúp bạn viết automation acceptance test và regression test một cách rõ ràng, dễ hiểu và dễ bảo trì hơn. Serenity sử dụng test result của bạn để tạo ra các báo cáo tường thuật, minh họa, tài liệu và mô tả ứng dụng của bạn hoạt động như thế nào một cách rất chi tiết và dễ hiểu. Serenity không chỉ cho bạn biết những test case, test scenario nào đã được thực hiện, mà quan trọng hơn là những requirement nào đã được test và cover.

Ưu điểm chính của việc sử dụng Serenity BDD là bạn không phải đầu tư quá nhiều thời gian vào việc xây dựng và maintain automation framework của mình.

Serenity BDD hỗ trợ mạnh mẽ cho automation web test sử dụng Selenium 2 , nó cũng hoạt động rất hiệu quả đối với web-service và API.

# 2. Các khái niệm cơ bản
Để tận dụng tối đa hiệu quả của Serenity BDD, bạn sẽ phải có một số kiến thức nhất định về Behavior-Driven-Development (BDD) và Automation Acceptance Testing. Serenity BDD thường được sử dụng cho cả Automation Acceptance Testing và Regression Test, để có thể thấy rõ Serenity hoạt động trên 2 loại test trên như thế nào, chúng ta sẽ tìm hiểu qua những ví dụ ở dưới

Hãy xem một ví dụ. Giả sử chúng ta đang xây dựng thành phần giỏ hàng của một trang bán hàng thủ công trực tuyến. Theo thuật ngữ của Agile, user story tương ứng có thể như sau:

```
In order to make the most appropriate purchase decisions
As a buyer
I want to be able to place items I want to buy in a virtual cart before placing my order
```

Nếu chúng ta đang triển khai user story này, chúng ta thường sẽ xác định một bộ acceptance criteria để xác định rõ và hiểu các yêu cầu. Ví dụ: chúng ta có thể có các tiêu chí sau trong danh sách acceptance criteria:

* Show total price for all items
* Show line item prices
* Show shipping costs
* …

Theo BDD thì chúng ta có thể có một scenario như sau :

```
Scenario: Show shipping cost for an item in the shopping cart
Given I have searched for 'docking station'
And I have selected a matching item
When I add it to the cart
Then the shipping cost should be included in the total price
```

Report của Serenity về scenario này sẽ giống như hình dưới
![](https://images.viblo.asia/a5919563-94c0-4bde-9457-290972786e92.png)

Khi tester hoặc automation tester thực hiện kịch bản này, hoặc một BA xem xét kết quả, họ thường sẽ muốn xem chi tiết hơn một chút. Ví dụ: tester sẽ muốn xem các màn hình diễn ra như thế nào (nếu đó là thử nghiệm trên web), dữ liệu test nào đã được sử dụng, v.v. Và BA có thể muốn xem các màn hình trông như thế nào cho mỗi bước.

Dựa trên những yêu cầu này, Serenity sẽ giúp bạn làm các việc sau:

* Làm cho automation framework của bạn dễ viết hơn, dễ thực thi và báo cáo về automation acceptance test theo các thuật ngữ mà BA và tester cũng như developer có thể dễ dàng hiểu ở một mức độ như nhau.

* Cấu trúc acceptance test của bạn thành các bước và bước phụ giống như các bước được minh họa ở trên. Điều này có xu hướng làm cho các scenarios trở nên rõ ràng hơn, linh hoạt hơn và dễ bảo trì hơn.

* Khi tests được execute, Serenity tạo ra các báo cáo theo phong cách tường thuật, minh họa như sau:

![](https://images.viblo.asia/b710692d-fd4a-457e-a3b0-7ccbe5beff73.png)

Serenity BDD cung cấp cho bạn một bức tranh toàn cảnh hơn, giúp bạn xem các scenario riêng lẻ phù hợp với yêu cầu sản phẩm tổng thể ở đâu. Nó giúp bạn không chỉ xem trạng thái hiện tại của các scenarios mà còn cả những requirement đã được (và chưa được) test.

# 3. Các bước đầu tiên với Serenity BDD
Trong phần này, chúng ta sẽ bắt đầu với Serenity BDD bằng một dự án đơn giản sử dụng JUnit và Gradle .

Các dự án Serenity BDD có thể được build bằng Gradle, Maven hoặc Ant . Chúng ta có thể dùng Groovy hoặc Java để code

Ví dụ: một bản build Gradle đơn giản cho một dự án Serenity BDD có thể trông như thế này:

```
repositories {
    mavenLocal()
    jcenter()
}

buildscript {
    repositories {
        mavenLocal()
        jcenter()
    }
    dependencies {
        classpath("net.serenity-bdd:serenity-gradle-plugin:1.1.1")       (1)
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'idea'
apply plugin: 'net.serenity-bdd.aggregator'                             (2)

dependencies {
    testCompile 'net.serenity-bdd:serenity-core:1.1.1'                  (3)
    testCompile 'net.serenity-bdd:serenity-junit:1.1.1'                (4)
    testCompile('junit:junit:4.12')
    testCompile('org.assertj:assertj-core:1.7.0')
    testCompile('org.slf4j:slf4j-simple:1.7.7')
}
```

**(1)** Thêm plugin Serenity vào đường dẫn xây dựng Gradle

**(2)** Thêm tổng hợp và kiểm tra các nhiệm vụ vào bản dựng Gradle

**(3)** Các lớp BDD chính của Serenity

**(4)** Tích hợp Serenity BDD JUnit

Tiếp theo, bạn sẽ viết một đoạn test JUnit để thể hiện các acceptance criteria mà bạn muốn automated. Giả sử bạn đang làm việc trên trang web Khách hàng thường xuyên cho một hãng hàng không. Bạn đang triển khai tính năng cho phép các thành viên Khách hàng thường xuyên kiếm được điểm khi họ đi du lịch. Acceptance criteria đầu tiên bạn cần đáp ứng là: 
- Thành viên Khách hàng thường xuyên kiếm được 100 điểm cho mỗi 1000 km đã đi.

Sử dụng Serenity BDD, bạn có thể viết một unit test như sau:

```
@RunWith(SerenityRunner.class)                                                         (1) 
public class WhenCalculatingFrequentFlyerPoints {

    @Steps                                                                               (2)
    TravellerSteps travellerSteps;

    @Test
    public void shouldCalculatePointsBasedOnDistance() {
        // GIVEN
        travellerSteps.a_traveller_has_a_frequent_flyer_account_with_balance(10000);           (3)

        // WHEN
        travellerSteps.the_traveller_flies(1000);                                              (3)

        // THEN
        travellerSteps.traveller_should_have_a_balance_of(10100);                              (3)

    }
}
```

**(1)** Bạn chạy unit test bằng JUnit trên Serenity test runner

**(2)** Các `@Steps` annotation thể hiện nó sẽ đọc các step trong Serenity step library

**(3)** Unit test trên bao gồm các logic steps của scenario giả định phía trên, và mỗi step này đều sẽ xuất hiện trong report một cách rõ ràng

Khi bạn viết acceptance tests theo cách này, file step definition của Serenity sẽ giống ví dụ dưới đây

```
public class TravellerSteps {

    FrequentFlyer frequentFlyer;                                                                (1) 

    @Step("Given a traveller has a frequent flyer account with {0} points")                     (2) 
    public void a_traveller_has_a_frequent_flyer_account_with_balance(int initialBalance) {     
        frequentFlyer = FrequentFlyer.withInitialBalanceOf(initialBalance);                       (3)
    }

    @Step("When the traveller flies {0} km")
    public void the_traveller_flies(int distance) {
        frequentFlyer.flies(distance).kilometers();                                               (4)

    }

    @Step("Then the traveller should have a balance of {0} points")
    public void traveller_should_have_a_balance_of(int expectedBalance ) {
        assertThat(frequentFlyer.getBalance()).isEqualTo(expectedBalance);                        (5)
    }

    @Step
    public void a_traveller_joins_the_frequent_flyer_program() {
        frequentFlyer = FrequentFlyer.withInitialBalanceOf(0);
    }

    @Step
    public void traveller_should_have_a_status_of(Status expectedStatus) {
        assertThat(frequentFlyer.getStatus()).isEqualTo(expectedStatus);
    }
}
```

**(1)** Đây là đối tượng đang được test.

**(2)** Các @Step annotation này như một phương pháp mà sẽ được ghi lại và sẽ xuất hiện trong test report

**(3)** Chuẩn bị test data

**(4)** Execute test

**(5)** Check result

Lưu ý rằng, tại thời điểm này, class `FrequentFlyer` và method `flies()`  có thể không tồn tại: bạn đang sử dụng BDD mà đúng không :D. Nhưng khi bạn đã triển khai đúng phương pháp này và mọi thứ đã xong xuôi, bạn có thể execute unit test này và generate report bằng lệnh như sau:

`$ gradle clean test aggregate`

Nó sẽ tạo ra một report như dưới đây trong thư mục target/site/serenity.

![](https://images.viblo.asia/61fab7a2-813a-47bf-acf9-4e0d44a911b6.png)

Như vậy là đã xong một ví dụ nhỏ để các bạn có thể hình dung Serenity sẽ hoạt động như thế nào rồi đúng không ? Hẹn gặp lại các bạn ở các bài về Serentiny tiếp theo

Nguồn tham khảo : https://serenity-bdd.github.io/theserenitybook/latest/