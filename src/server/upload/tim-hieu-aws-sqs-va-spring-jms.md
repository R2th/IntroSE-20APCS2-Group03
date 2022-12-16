java Message Service(JMS) là API của Java, giúp nhận và gửi message. Spring là một trong những framework mạnh mẽ nhất của Java, đồng thời đi kèm với AWS service của Amazon, một trong những nhà Serivice hàng đầu , vậy thông qua số lượng document lớn, ví dụ nhiều, thì đây là một cách/môi trường dễ dàng để tiếp cận với JMS.

![](https://images.viblo.asia/bb68a690-d401-4fdb-8426-0eec4ec5ffe6.png)

![](https://images.viblo.asia/eacfad2f-dcf5-4f1f-82b8-0525e56bc861.png)
Về cơ bản, SpringJMS dựa vào JMS để custom một môi trường mà ta sẽ gửi và nhận message thông qua một server trung gian/JMS Broker/ MOM(Mesaging Server) . Còn hệ thống chúng ta sử dụng Spring thì vừa có thể nhận và gửi message đến Mesaging Server, tương tác với một hệ thống khác. AWS SQS chỉ là một server provider trong rất nhiều provider khác, tương tự có thể kể ra như ActiveMQ,  JBoss (Wildfly), GlassFish, RabbitMQ,...

Tất cả thao tác message trên MOM sẽ được định danh bằng **Queue**, hiểu đơn giản giống như là một repository/một cổng giao tiếp/một phương thức riêng mà một nhóm Client có thể cùng giao tiếp với nhau mà ko bị ảnh hưởng bởi các Client ko liên quan(Giống như bucket khi upload ảnh.

Cách tạo queue thì mn có thể tham khảo thông qua link sau, mục **Create the queue in the AWS Management Console**
>https://pragmaticintegrator.wordpress.com/2015/04/21/using-aws-sqs-as-jms-provider-with-spring/

Đồng thời để có thể connect được với Amazon AWS, cần phải config khóa điện tử(digital signing/credentials) để xác thực. Mọi người có thể tìm cách register bằng AWS console trên mạng với keyword như trên nhé.
Sau khi register xong, cách nhanh nhất để config aws này là đặt chúng vào thư mục /home/user/.aws trên ubuntu, hoặc (C:\Users\USER_NAME\.aws\credentials for Windows users) nhé.
> https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html

![](https://images.viblo.asia/793001a0-bffe-4d1e-914f-09ebeb2b0352.png)

Đầu tiên cần config JMS, trong đó :
- @EnableJms:  enables detection of {@link JmsListener} annotations on any Spring-managed bean in the container. Sau này tương ứng với mỗi hàm được gắn annotation @JmsListener thì sẽ được hiểu là nơi xử lý nhận message từ queue, sẽ nêu kỹ ở ví dụ sau.
- SQSConnectionFactory : SQSConnectionFactory that uses the provided AmazonSQSClientBuilder for creating AmazonSQS client connections. Nói chung là manager kết nối trung gian giữa Amazon AWS và client. Như code `AmazonSQSClientBuilder.standard();` bên dưới thì sẽ hiểu là default set, gắn liền với thông tin digital siginning trong thư mục aws mà mình đã nhắc ở phần đầu.
- DefaultJmsListenerContainerFactory : Message listener container, bộ quản lý listener
- JmsTemplate : Helper class that simplifies synchronous JMS access code. Class do Spring JMS cung cấp để qua đó thao tác gửi và nhận message
- MessageConverter : Strategy interface that specifies a converter between Java objects and JMS messages.
Tham khảo : `https://viblo.asia/p/tich-hop-spring-voi-activemq-su-dung-spring-jms-3P0lPmq85ox`

```
@Configuration
@EnableJms
public class JmsConfig {

    public static final String TYPE_ID_PROPERTY_NAME = "_type";
    private static final String CONCURRENCY_RANGE = "3-10";

    private final SQSConnectionFactory connectionFactory;
    private final ObjectMapper objectMapper;

    public JmsConfig(ObjectMapper objectMapper) {
        AmazonSQSClientBuilder amazonSQSClientBuilder = AmazonSQSClientBuilder.standard();
        connectionFactory = new SQSConnectionFactory(new ProviderConfiguration(), amazonSQSClientBuilder);
        this.objectMapper = objectMapper;
    }

    @Bean
    public DefaultJmsListenerContainerFactory jmsListenerContainerFactory() {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(this.connectionFactory);
        factory.setDestinationResolver(new DynamicDestinationResolver());
        factory.setConcurrency(CONCURRENCY_RANGE);
        factory.setSessionAcknowledgeMode(Session.CLIENT_ACKNOWLEDGE);
        factory.setMessageConverter(messageConverter());
        return factory;
    }

    @Bean
    public JmsTemplate jmsTemplate() {
        JmsTemplate jmsTemplate = new JmsTemplate(this.connectionFactory);
        jmsTemplate.setMessageConverter(messageConverter());
        return jmsTemplate;
    }

    @Bean
    public MessageConverter messageConverter() {
        MappingJackson2MessageConverter mappingJackson2MessageConverter = new MappingJackson2MessageConverter();
        mappingJackson2MessageConverter.setObjectMapper(this.objectMapper);
        mappingJackson2MessageConverter.setTargetType(MessageType.TEXT);
        mappingJackson2MessageConverter.setTypeIdPropertyName(TYPE_ID_PROPERTY_NAME);
        return mappingJackson2MessageConverter;
    }
```

Nếu thích, các bạn cũng có thể tham khảo XML configuration ở link trên : `https://pragmaticintegrator.wordpress.com/2015/04/21/using-aws-sqs-as-jms-provider-with-spring/`
Sau khi config thành công, ta cần define 2 class để xử lý việc **publish/push message lên queue(Producer)** và **listener message nhận từ queue(Consumer)** :
```
@Component
public class CustomProducer implements Producer<Message> {

    private static final Logger LOG = LoggerFactory.getLogger(CustomProducer.class);

    private final String sqsQueue;
    private final JmsTemplate jmsTemplate;
    private ObjectMapper objectMapper;

    // JmsTemplate : Helper class that simplifies synchronous JMS access code.
    public CustomProducer(@Value("${registerd.queue.in.mom}") String sqsQueue, JmsTemplate jmsTemplate) {
        Assert.hasText(sqsQueue, "sqsQueue cannot be null, empty or blank");
        Assert.notNull(jmsTemplate, "jmsTemplate cannot be null");
        this.sqsQueue = sqsQueue;
        this.jmsTemplate = jmsTemplate;
    }

    @Override
    public void publish(String message) {
        // send new custom message to destination queue
        jmsTemplate.send(sqsQueue, new MessageCreator() {

            public javax.jms.Message createMessage(Session session) {
                try {
                    javax.jms.Message message = session.createTextMessage(message);
                } catch (Throwable t) {
                
                }
            }
        });
    }

    @Autowired
    public void setObjectMapper(ObjectMapper objectMapper) {
        Assert.notNull(objectMapper, "objectMapper cannot be null");
        this.objectMapper = objectMapper;
    }
}
```
Sau này chỉ việc getBean và gọi hàm publish thì có thể send message lên queue được rồi. Tương tự cùng xem qua Consumer :

```
@Component
public class CustomConsumer {

    @Resource
    private JmsTemplate jmsTemplate;

    // queue
    @JmsListener(destination = "${registerd.queue.in.mom}")
    @Override
    public void onMessage(Message message) {
        System.out.println("Nhận tin nhắn: " + message);
    }
```
Khi nào có message từ queue trên nó bắn về thì filter/container nó trỏ vào hàm rồi ta xử lý tiếp thôi.

Các ví dụ khá là giống nhau, bởi cũng 1 phần cũng vì...lười, bởi cũng 1 phần SpringJMS cũng tối giản công việc xử lý JMS rồi. Thông qua ví dụ này, hi vọng mọi người có thể có thêm 1 cái nhìn/một ví dụ để dễ dàng tường tận/tiếp cận dễ dàng hơn với AWS SQS và Spring JMS. Thanks