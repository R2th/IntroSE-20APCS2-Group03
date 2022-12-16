Trong bài viết hôm nay, mình sẽ nói về vấn đề chia sẻ data giữa các Cucumber Step Definitions. Vấn đề này mình đã gặp trong quá trình làm dự án. Và hôm nay cũng muốn chia sẻ lại với các bạn đang gặp vấn đề giống mình.
### 1/ Tại sao lại phải chia sẻ data giữa các Cucumber Step Definitions?
Trong phát triển dự án, việc tách các Cucumber Step Definitions thành các Class riêng là một ý tưởng tốt, nhưng nó lại không cần thiết sớm trong một dự án. Tuy nhiên sau một thời gian phát triển, số lượng Steps của các Scenario ngày một nhiều, và bắt buộc bạn phải tách thành những Class riêng biệt.  Và trong một Scenario trong Cucumber là một loạt các Steps được thực hiện lần lượt từng bước một. Từng Step trong Scenario có thể có một số trạng thái hoặc data có thể được sử dụng lại bởi các Step khác trong Scenario. Theo cách khác, bạn cũng có thể nói rằng mỗi Step phụ thuộc vào các Step trước đó. Điều này có nghĩa là chúng ta phải tìm cách để có thể chia sẻ trạng thái hoặc data giữa các Step với nhau trong cùng một file Step Definition, hoặc là giữa các Step ở các file Step Definition khác nhau.

Và may mắn là Cucumber hỗ trợ ta một Dependency Injection (DI) Containers - có thể hiểu đơn giản DI là nơi để khởi tạo các lớp định nghĩa các Step của bạn và liên kết chúng chính xác. Một trong những container DI được hỗ trợ là PicoContainer.

### 2/ PicoContainer là gì?
PicoContainer là một thư viện nhỏ được phát triển Paul Hammant in 2003-2004.
Một số ưu điểm của PicoContainer:
+ Không đòi hỏi phải cấu hình
+ Không yêu cầu các Class của bạn sử dụng bất kỳ API nào, chẳng hạn như @Inject - chỉ cần sử dụng thông qua các Constructors
+ Chỉ có một nhiệm vụ duy nhất là khởi tạo các Object

Đơn giản chỉ cần đưa cho PicoContainer một số Class và PicoContainer sẽ chịu trách nhiệm khởi tạo từng Class, và liên kết chính xác với nhau thông qua các hàm tạo của chúng. Cucumber quét các Class của bạn với các định nghĩa Steps trong đó, chuyển chúng đến PicoContainer, sau đó yêu cầu nó tạo các instances mới cho mỗi Scenario.

### 3/ How to Sharing Scenario Context between Cucumber Step Definitions using PicoContainer
**1. Thêm thư viện PicoContainer  vào Maven Project:**

Điều này thực sự đơn giản, vì mình đã sử dụng Maven Project, tất cả những gì mình cần làm là thêm các dependencies vào file POM của dự án. Thông tin của dependencies có thể được lấy từ Kho lưu trữ của Maven - Cucumber PicoContainer.

Version hiện tại của PicoContainer đang là 1.2.5

![](https://images.viblo.asia/d56b826a-51f5-4a57-842c-099338eef246.PNG)


**2/ Tạo class Scenario Context:**

Tạo class Scenario Context, và nhiệm vụ của Class này là để lưu trữ data trong mỗi Scenario

```
public class ScenarioContext {
    private Map<String, Object> scenarioContext;

    public ScenarioContext() {
        scenarioContext = new HashMap<>();
    }

    public void setContext(String key, Object value) {
        scenarioContext.put(key, value);
    }

    public Object getContext(String key) {
        return scenarioContext.get(key);
    }

    public Boolean isContains(String key) {
        return scenarioContext.containsKey(key);
    }

}
```

Có 2 phương thức ta cần để ý đó là `setContext()` và `getContext()`
+ Phương thức  `setContext()`: dùng để lưu trữ data trong mỗi Scenario dưới dạng Key,Value.
+ Phương thức `getContext()`: dùng để truy xuất data theo Key chỉ định.

**3/ Viết Constructor cho Step Definition classes để chia sẻ ScenarioContext:**

Ở đây mình có một ví dụ:
```
Feature: Sharing Scenario Context between Cucumber Step Definitions

  Scenario Outline: Sharing Scenario Context between Cucumber Step Definitions
    Given Admin open application
    When Admin inputs "<name>" and "<category>"
    When Admin get value name
    When Admin get value category
    Then Admin get both value at other step file successfully
    Examples:
      | name | category |
      | VuDN | Mobile   |
```

Như ví dụ ở trên, mình sẽ có 2 file steps tương ứng để define tất cả các step ở ví dụ trên.

Ở file step ExampleStep01 sẽ define các step sau:
```
package stepDefinition.admin;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.When;
import utility.ScenarioContext;

public class ExampleStep01 {

    private ScenarioContext scenarioContext;

    public ExampleStep01(ScenarioContext context) {
        scenarioContext = context;
    }

    @Given("^Admin open application$")
    public void admin_open_application() {
        System.out.println("Admin open application successfully");

    }

    @When("^Admin inputs \"([^\"]*)\" and \"([^\"]*)\"$")
    public void admin_inputs_and(String name, String category) {
        System.out.println("Input Name value: " + name);
        scenarioContext.setContext("name", name);
        System.out.println("Input Category value: " + category);
        scenarioContext.setContext("category", category);

    }

    @When("^Admin get value name$")
    public void admin_get_value_name() {
        String a = scenarioContext.getContext("name").toString();
        System.out.println("Get name value at ExampleStep01: " + a);
    }

    @When("^Admin get value category$")
    public void admin_get_value_category() {
        String b = scenarioContext.getContext("category").toString();
        System.out.println("Get category value at ExampleStep01: " + b);

    }

}

```

Và ở file ExampleStep02 sẽ define step cuối cùng
```
public class ExampleStep02 {

    private ScenarioContext scenarioContext;

    public ExampleStep02(ScenarioContext context) {
        scenarioContext = context;
    }

    @Then("^Admin get both value at other step file successfully$")
    public void admin_get_both_value_at_other_step_file_successfully() {
        String name_out = scenarioContext.getContext("name").toString();
        System.out.println("Name value at ExampleStep02: " + name_out);
        String category_out = scenarioContext.getContext("category").toString();
        System.out.println("Category value at ExampleStep02: " + category_out);
    }
}
```

Như các bạn thấy ở file ExampleStep01, thì 2 biến `name` và `category` được set lại ở bước thứ 2 bằng sử dụng phương thức `setContext()` của Cass `ScenarioContext`

`scenarioContext.setContext("name", name);`

`scenarioContext.setContext("category", category);`

Và để có thể truy suất được giá trị của 2 biến  `name` và `category` ở các step khác thì ta sử dụng phương thức `getContext()` của Cass `ScenarioContext`

Như vậy là ta đã có thể chia sẻ data giữa các step với nhau trong cùng một file Step. Vậy còn trường hợp chia sẻ data giữa các Step với nhau và khác các file Step thì phải thực hiện như thế nào?

Bằng cách inject các đối tượng ScenarioContext vào các contructors của các class Step, thì PicoContainer có thể khởi tạo các đối tượng ScenarioContext tương ứng để có thể chia sẻ data giữa các file Step Definitions với nhau.

```
public ExampleStep01(ScenarioContext context) {
        scenarioContext = context;
    }
```
```
 public ExampleStep02(ScenarioContext context) {
        scenarioContext = context;
    }
```

Ở file ExampleStep02 sẽ lấy ra giá trị của 2 biến `name` và `category` đã được set tại file ExampleStep02, cùng xem là có thể get được data không nhé.

Output:
![](https://images.viblo.asia/43c61d47-491f-490f-bd11-a13e32a57308.PNG)

Như output, các bạn có thể thấy rằng chúng ta đã có thể chia sẻ data giữa các Step với nhau trong cùng một file Step, cũng như chia sẻ data giữa các Step với nhau và khác các file Step thành công.

Hy vọng qua bài viết này, các bạn có thể biết cách giải quyết vấn đề mà mình gặp phải trong dự án. Cảm ơn các bạn đã theo dõi bài viết của mình!

Tham khảo:

https://www.toolsqa.com/selenium-cucumber-framework/sharing-test-context-between-cucumber-step-definitions/