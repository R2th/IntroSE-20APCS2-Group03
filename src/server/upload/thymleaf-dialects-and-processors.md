# Tại sao nên sử dụng
Thymleaf là một thư viện với khả năng mở rộng cực kỳ tuyệt vời. Không phải là xây dựng tất cả các tính năng vào phần lõi của nó, mà chúng ta có thể hiểu như những pakage mà chúng ta đưa vào tập hợp các tính năng, và các feature này được gọi là dialects.
vậy tại sao chúng ta lại nên sử dụng tính năng này của thymleaf. Sau đây là một số ví dụ mà các tính năng mở rộng của thymleaf có thể giúp chúng ta.
Trường hợp một: bạn có một giao diện để hiển thị thông tin điểm của sinh viên trong một lớp. và ở cột điểm bạn sẽ hiển thị số màu tương ứng cho trường hợp sinh viên đó là học sinh xuất sắc, học sinh giỏi hay không qua môn ... Như vậy nếu bạn viết tất cả ở trên html thì sẽ có rất nhiều if else để có thể bao phủ tất cả các trường hợp và đương nhiên là trong trường hợp bạn phải hiển thị một cái thông tin tương tự ở một chỗ nào đó khác mà không thể dùng lại html đã viết trước đó thì bạn sẽ phải viết lại với nội dung tương tự. Rất mất thời gian và sẽ làm giảm đi độ chính xác phải không ạ. 
Trong khi đó với code java chúng ta cũng có thể thực hiện được công việc tương tự cho việc hiển thị màu tương ứng, và đương nhiên việc tính toán sẽ trở nên dễ dàng hơn, chưa kể trong trường hợp khi bạn phải so sánh giá trị với các trường cố định như Enum thì code java sẽ dễ nhìn hơn và thực hiện dễ dàng hơn.
Trường hợp 2: Trên trang web của bạn sẽ có hiển thị địa chỉ của từng sinh viên. bây giờ trong màn hình thêm thông tin sinh viên sẽ có các dropdown cho việc chọn tỉnh thành, quận huyện, xã ... để có thể có được địa chỉ chỗ ở chính xác của từng sinh viên. Như vậy bạn sẽ làm như thế nào?
- Cách thông thường: Khi load hiển thị màn hình thêm thông tin sinh viên bạn sẽ phải đưa lên cả danh sách tỉnh thành, quận huyện, phường xã ... Như vậy thì có một số lý do sau 
+ Thông tin tỉnh thành, quận huyện ... là riêng biệt so với thông tin sinh viên, nếu phải đưa chung trong form của sinh viên thì không hợp lý, vì nó ko có liên quan gì cả
+ Việc bỏ thêm quá nhiều thông tin không cần thiết sẽ làm cho việc giao tiếp client với server trở nên nặng nề hơn.
- Nếu sử dụng custom dialects bạn có thể giải quyết được vấn đề này thông qua việc tách riêng thông tin sinh viên với những thông tin như tỉnh thành, quận huyện, nội dụng trong thông tin sinh viên chỉ là địa chỉ cụ thể hoặc là relation tới các thông tin cần thiết thôi.
# Dialects
Nếu bạn từng làm việc qua với thymleaf thì sẽ thấy rằng những attribute th:x là những Standard Dialect mà thymleaf define sẵn, và đương nhiên là chúng ta cũng có thể tạo ra cho chính mình những dialects tương tự như vậy cho từng mục đích cụ thể.
Dialests là những đối tượng được implementing từ interface IDialect
```
public interface IDialect {

    public String getName();

}
```
Và để phân biệt được dialect cho từng định nghĩa riêng thì thymleaf yêu cầu phải có name cho từng dialect. 
Một số interface con mà Idialect cung cấp sẵn:
- IProcessorDialect
- IPreProcessorDialect
- IPostProcessorDialect
- IExpressionObjectDialect
- IExecutionAttributeDialect
# Processors
Processors là đối tượng được implement từ interface IProcessor, nó chứ logic thực sự để áp dụng cho từng phần cụ thể của template
```
public interface IProcessor {

    public TemplateMode getTemplateMode();
    public int getPrecedence();

}
```
Một số Processors được cung cấp:
- Element Processors
- Element Model Processors
- Template start/end Processors
- Other processors
Một số khác được định nghĩa cho từng trường hợp cụ thể như Text events: interface ITextProcessor, Comment events: interface ICommentProcessor, CDATA Section events: interface ICDATASectionProcessor, DOCTYPE Clause events: interface IDocTypeProcessor, XML Declaration events: interface IXMLDeclarationProcessor, Processing Instruction events: interface IProcessingInstructionProcessor
# Example
Bây giờ gỉa sử chúng ta có một trang hiển thị thông tin sinh viên bao gồm cột name, point và description nếu point là > 3.6 thì sẽ bôi màu hàng đó là màu đỏ, nếu > 3.2 thì bôi màu vàng, nếu > 2.5 thì bôi màu xanh, nếu < 2.5 thì bôi màu hồng.
Bây giờ chúng ta sẽ tạo ra dialect là student bao gồm các loại sau
- student:colorpoint để bôi màu cho từng trường hợp
- student:city để mô tả cho việc chọn nơi ở
html có nội dung như sau
```
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" xmlns:student="http://thymeleafexamples">

  <head>
    <title>extraThyme: Thymeland's Dialects And Processors </title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
    <div class="scoreboard">
      <table>
        <thead>
          <tr>
            <th th:text="#{student.name}">Team</th>
            <th th:text="#{team.point}"</th>
          </tr>
        </thead>
        <tbody>
         <th:block th:each="student, iStart : ${students}" >
          <tr sudent:colorpoint=${student.point}>
            <td th:text="${student.name}"></td>
            <td th:text="${student.point}"></td>
          </tr>
          </th:block>
        </tbody>
      </table>
    </div>
  </body>
</html>
```

Trong màn hình tạo sinh viên chúng ta có nội dung như sau:
```
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" xmlns:student="http://thymeleafexamples">

  <head>
    <title>extraThyme: Thymeland's Dialects And Processors </title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body>
    <div class="new-student">
      <input student:city>
      <input th:field=*{name}/>
    </div>
  </body>
</html>
```

## Attribute Processor
Theo như tên của processor thì chúng ta có thể thấy được phạm vi mà có thể tác động, attribute của element thì giúp chúng ta có thể thay đổi giá trị của attribute của element đó như class ...  và có thể thay đổi body bên trong của element tương tự như cách mà th:text làm 
Bây giờ chúng ta sẽ tạo ra class cho việc thực hiện bôi màu cho từng trường hợp student:colorpoint 
```
public class ColorPointAttributeTagProcessor extends AbstractAttributeTagProcessor {

    private static final String ATTR_NAME = "colorpoint";
    private static final int PRECEDENCE = 10000;


    public ClassForPositionAttributeTagProcessor(final String dialectPrefix) {
        super(
            TemplateMode.HTML, // This processor will apply only to HTML mode
            dialectPrefix,     // Prefix to be applied to name for matching
            null,              // No tag name: match any tag name
            false,             // No prefix to be applied to tag name
            ATTR_NAME,         // Name of the attribute that will be matched
            true,              // Apply dialect prefix to attribute name
            PRECEDENCE,        // Precedence (inside dialect's own precedence)
            true);             // Remove the matched attribute afterwards
    }


    @Override
    protected void doProcess(
            final ITemplateContext context, final IProcessableElementTag tag,
            final AttributeName attributeName, final String attributeValue,
            final IElementTagStructureHandler structureHandler) {
        final IEngineConfiguration configuration = context.getConfiguration();
        
        final IStandardExpressionParser parser =
                StandardExpressions.getExpressionParser(configuration);
        
        final IStandardExpression expression = parser.parseExpression(context, attributeValue);
        
        final Integer point = (Integer) expression.execute(context);
        
        final String cssClass;
        if (point >= 3.6) {
            cssClass = "red";
        } else if (point >= 3.2) {
            cssClass = "yellow";
        } else if (point >= 2.5) {
            cssClass = "green";
        } else {
            cssClass = pink;
        }

        if (cssClass != null) {
            String currentClass = tag.getAttribute("class").getValue();
            if (currentClass != null) {
                structureHandler.setAttribute("class", currentClass + " " + cssClass);
            } else {
                structureHandler.setAttribute("class", cssClass);
            }
        }
    }
}
```
như vậy là chúng ta có thể bôi màu theo từng thang điểm khác nhau bằng cách thêm class màu cho hàng tương ứng.

## Element Processor
### Ưu điểm
Theo như tên của Processor thì phạm vi của tác động có thể lên toàn element, chúng ta có thể thay đổi cả element đó thành một nội dung khác.
### Nhược điểm
Việc tùy chỉn element/tag không được hiểu bới trình duyệt, cho nên bạn phải chấp nhận hi sinh một tính năng thú vị của thymleaf là hiển thị template tĩnh như là một prototypes (natural templating)
Chúng ta sẽ tạo class cụ thể cho student:city để khi tạo sinh viên thì có thể chọn thành phố nơi sinh sống
```
public class HeadlinesElementTagProcessor extends AbstractElementTagProcessor {

    private static final String TAG_NAME = "headlines";
    private static final int PRECEDENCE = 1000;


    private final Random rand = new Random(System.currentTimeMillis());


    public HeadlinesElementTagProcessor(final String dialectPrefix) {
        super(
            TemplateMode.HTML, // This processor will apply only to HTML mode
            dialectPrefix,     // Prefix to be applied to name for matching
            TAG_NAME,          // Tag name: match specifically this tag
            true,              // Apply dialect prefix to tag name
            null,              // No attribute name: will match by tag name
            false,             // No prefix to be applied to attribute name
            PRECEDENCE);       // Precedence (inside dialect's own precedence)
    }


    @Override
    protected void doProcess(
            final ITemplateContext context, final IProcessableElementTag tag,
            final IElementTagStructureHandler structureHandler) {

        final ApplicationContext appCtx = SpringContextUtils.getApplicationContext(context);

        final CityRepository cityRepository = appCtx.getBean(CityRepository.class);
        final List<CityEntity> cityEntities = cityRepository.findAllByDeletedFlag(false);

        final String order = tag.getAttributeValue("order");

        String selectCity = "";
        cityEntities.forEach(cityEntity -> {
        selectCity += "<option value = " + cityEntity.getId + ">" + cityEntity.getName() + "</option>";
        });
 
        final IModelFactory modelFactory = context.getModelFactory();

        final IModel model = modelFactory.createModel();

        model.add(modelFactory.createOpenElementTag("select", "class", "city"));
        model.add(modelFactory.createText(selectCity);
        model.add(modelFactory.createCloseElementTag("select"));

        structureHandler.replaceWith(model, false);
       
    }
}
```
như vậy là chúng ta đã thay thế dialect với một select option với nội dung là danh sách city
# Tài liệu tham khảo
https://www.thymeleaf.org/doc/tutorials/3.0/extendingthymeleaf.html#creating-our-own-dialect