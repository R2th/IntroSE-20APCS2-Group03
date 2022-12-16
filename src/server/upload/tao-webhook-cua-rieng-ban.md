Chính xác thì webhook là gì?
Một webhook là một trong những cách tốt nhất để giao tiếp thời gian thực với ứng dụng của bạn. Không giống như các API thông thường, webhook cung cấp dữ liệu đến các ứng dụng, có nghĩa là bạn nhận được dữ liệu ngay lập tức khi nó xảy ra. Điều này làm cho nó hiệu quả hơn nhiều cho cả nhà cung cấp và người tiêu dùng. Trong webhook, bạn có thể đăng ký các URL mà nó sẽ nhắm mục tiêu khi thông tin đang được truyền trực tuyến. Một webhook thực hiện một yêu cầu HTTP đơn giản đến ứng dụng của bạn và bạn sẽ nhận được dữ liệu.

Để triển khai, Mình sử dụng khung Spring Boot và Mình lưu trữ webhook của mình trong cơ sở dữ liệu H2. H2 là DB trong bộ nhớ được tạo lại mỗi khi chúng ta khởi động ứng dụng. 

Cái đầu tiên là tên công ty. Các công ty sử dụng webhook được phân tách bằng trường này. Và trường thứ hai dành cho loại thông tin mà ứng dụng sẽ sử dụng. Mình đã thêm trường thứ hai vì một công ty có thể sử dụng các dịch vụ cụ thể do webhook cung cấp. Có một đối tượng dto đại diện cho bảng từ DB. Lớp dto chứa bốn trường:

1. ID
2. URL
3. company name
4. type.

Mã DTO:
```java
	package eu.yourproject.webhook.dto;
    import javax.persistence.Column;
    import javax.persistence.Entity;
    import javax.persistence.GeneratedValue;
    import javax.persistence.GenerationType;
    import javax.persistence.Id;
    import javax.persistence.Table;
    @Entity
    @Table(name = "webhook", schema="webhook")
    public class WebHook {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="url")
	private String url;
	
	@Column(name="companyname")
	private String companyName;
	
	@Column(name="type")
	private String type;
 
	public WebHook() {
		super();
		// TODO Auto-generated constructor stub
	}
 
	public WebHook(Long id, String url, String companyName, String type) {
		super();
		this.id = id;
		this.url = url;
		this.companyName = companyName;
		this.type = type;
	}
}
```
Repository của mình thì đơn giản thôi và nó extends từ Crud Repository. mình cũng đã thêm hai methods để lọc thông tin dễ dàng hơn:

Cái đầu tiên tìm thấy một webhook theo cả tên và loại dịch vụ mà nó đã được đăng ký;

Cái thứ hai chỉ dành cho tên công ty.

Repository Code:
```java
    import java.util.List;
    import org.springframework.data.repository.CrudRepository;
    import eu.yourproject.webhook.dto.WebHook;
            public interface WebhookRepository  extends CrudRepository<WebHook, Long>{
                public List<WebHook> findByCompanyNameAndType(String companyName, String type);
                public List<WebHook> findByCompanyName(String companyName);
    }
```
Trong lớp controller, mình đã tạo một phương pháp đơn giản để thêm một webhook. Đó là một POST đơn giản sử dụng webhook ở định dạng JSON.
mình cũng đã đính kèm các services để xóa đăng ký (cả theo công ty và theo loại) và để cập nhật webhook.

```java
	package eu.yourproject.webhook.controller;
    import java.util.ArrayList;
    import java.util.List;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.MediaType;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestMethod;
    import org.springframework.web.bind.annotation.RestController;
    import eu.yourproject.webhook.dto.WebHook;
    import eu.yourproject.webhook.repository.WebhookRepository;
    @RestController
    @RequestMapping("/webhooks")
    public class WebHookController {
            private final static Logger logger = LoggerFactory.getLogger(WebHookController.class);
            private WebhookRepository webHookRepository;
 
	@Autowired
	public WebHookController(WebhookRepository webHookRepository) {
		super();
		this.webHookRepository = webHookRepository;
	}
	
	@RequestMapping(method = RequestMethod.POST,
          consumes = MediaType.APPLICATION_JSON_VALUE, 
            produces=MediaType.TEXT_MARKDOWN_VALUE)
	public ResponseEntity<String> addWebHook(@RequestBody WebHook webHook){
		logger.info("New webhook for " + webHook.getCompanyName() + " is registered");
		List<WebHook> webhooks = webHookRepository.findByCompanyNameAndType(
                    webHook.getCompanyName(),
                    webHook.getType());
		if(webhooks != null && webhooks.contains(webHook)){
			return new ResponseEntity<>("Webhook already exists", HttpStatus.OK);
		}
		webHookRepository.save(webHook);
		return new ResponseEntity<>("Successfully", HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<WebHook>> getAllWebHooks(){
		List<WebHook> webhooks = new ArrayList<>();
		webHookRepository.findAll().iterator().forEachRemaining(webhooks::add);
		return new ResponseEntity<List<WebHook>>(webhooks, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, 
           value ="/comapnies/{companyName}/types/{type}", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<WebHook> getWebHooksByCompanyNameAndType(
                @PathVariable String companyName, 
                @PathVariable String type){
		List<WebHook> webhooks = webHookRepository.findByCompanyNameAndType(
                   companyName, type);
		return new ResponseEntity<WebHook>(webhooks.get(0), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.DELETE,
           value ="/comapnies/{companyName}/types/{type}", produces=MediaType.TEXT_MARKDOWN_VALUE)
	public ResponseEntity<String> removeWebHook(
               @PathVariable String companyName, 
               @PathVariable String type){
		List<WebHook> webhooks = webHookRepository.findByCompanyNameAndType(
                   companyName, type);
		if(!webhooks.isEmpty()){
			webHookRepository.delete(webhooks.get(0));
			return new ResponseEntity<>("WebHook was successfully deleted.", HttpStatus.OK);
		}
		return new ResponseEntity<>("Webhook doesn't exist.", HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.DELETE,value ="/ids/{id}", produces=MediaType.TEXT_MARKDOWN_VALUE)
	public ResponseEntity<String> removeWebHookById(@PathVariable Long id){
		WebHook webhook= webHookRepository.findOne(id);
		if(webhook != null){
			webHookRepository.delete(webhook);
			return new ResponseEntity<>("WebHook was successfully deleted.", HttpStatus.OK);
		}
		return new ResponseEntity<>("Webhook doesn't exist.", HttpStatus.OK);
        }
    }
```

Và bây giờ bạn đã có webhook của riêng mình, hãy suy nghĩ về vị trí thích hợp để sử dụng nó. Đây là những gợi ý của mình:
* Khi bạn muốn mở rộng sản phẩm cốt lõi của mình với các quy trình tùy chỉnh khác giao tiếp với logic kinh doanh của bạn trong thời gian thực.
* Khi bạn muốn cải thiện trải nghiệm người dùng và bạn có một ứng dụng có kiến trúc không đồng bộ.

Và cuối cùng một số điều bạn nên cân nhắc khi xây dựng webhook:
- Bảo mật ! Đó là một trong những điều quan trọng nhất mà bạn nên xem xét. Bạn có thể yêu cầu URL để sử dụng https.
- Cẩn thận xem xét dữ liệu mà bạn chia sẻ.
- Hãy nghĩ về cơ chế dự phòng trong trường hợp có sự cố với lưu lượng truy cập internet. Nếu bạn không có cơ chế dự phòng, webhook không thể được sử dụng trong các hoạt động kinh doanh quan trọng.