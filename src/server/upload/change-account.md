> Tài khoản cũ của mình có chút vấn đề nên sau bài viết này mình sẽ không viết bài trên tài khoản này nữa, mình sẽ chuyển sang dùng tài khoản mới để viết bài. <br>
> Mọi người hãy follow tài khoản mới [TheLight](https://viblo.asia/u/DuongVanTien) và các bài viết gốc tại [thenewstack](https://thenewstack.wordpress.com/).<br>
> Bài viết này nhằm mục đích thông báo là chính. 
> Nội dung bên dưới sẽ được move sang một bài viết trên tài khoản mới: [TheLight](https://viblo.asia/u/DuongVanTien)
> Xin cảm ơn mọi người!



-----

Phát triển một ứng dụng microservice có thể rất thú vị. Nhưng xử lý nghiệp vụ giao dịch phân tán (business transaction) qua nhiều microservices thì với nhiều người chắc hẳn không thú vị chút nào, vì việc xử lý transaction này không hề dễ dàng. Trong kiến trúc Microservice, mỗi microservice có những trách nhiệm cụ thể. Để hoàn thành một tác vụ, đôi khi nhiều microservices có thể phải làm việc cùng nhau. Trong bài viết này chúng ta cùng xem việc xử lý các giao dịch, tính nhất quán dữ liệu nó khó khăn như thế nào trong  trong các hệ thống phân tán.

### Thách thức
Giả sử rằng nghiệp vụ của chúng ta là khi người dùng đặt hàng, đơn đặt hàng sẽ được thực hiện nếu giá của sản phẩm nằm trong giới hạn số dư tín dụng của người dùng và sản phẩm phải có sẵn. Nếu không, nó sẽ không được thực hiện. Điều này rất dễ thực hiện trong một ứng dụng nguyên khối. Toàn bộ quy trình làm việc có thể được coi là một transaction duy nhất, dễ dàng commit/rollback khi mọi thứ nằm trong một DB duy nhất. Trong các hệ thống phân tán với nhiều cơ sở dữ liệu, nó sẽ rất phức tạp.

![](https://images.viblo.asia/d5d04095-d554-48d3-8248-f7173852e4fa.png)

Chúng ta có các microservices dưới đây với DB của riêng nó.
- **order-service**
- **payment-service**
- **inventory-service**

Khi dịch vụ đặt hàng (order-service) nhận được yêu cầu cho đơn đặt hàng mới, Nó phải kiểm tra với dịch vụ thanh toán (payment-service) & dịch vụ kiểm kê (inventory-service). Chúng ta sẽ trừ tiền tài khoản người dùng, trừ số lượng sản phẩm trong kho hàng và hoàn thành đơn đặt hàng. Điều gì sẽ xảy ra nếu chúng ta trừ tiền tài khoản người dùng nhưng nếu sản phẩm trong kho không có sẵn? Làm thế nào để rollback số tiền đã trừ trong tài khoản người dùng?

![](https://images.viblo.asia/03e6117d-23f3-4281-9a34-dd787659abaa.png)

### Saga pattern
Giải pháp cho thách thức trên là **Saga design pattern**. Mỗi nghiệp vụ mà phải đi qua nhiều microservice được chia thành các giao dịch cục bộ (local transaction) trên mỗi microservice và chúng được thực hiện theo một trình tự để hoàn thành luồng nghiệp vụ hoàn chỉnh. Có 2 implementation của Saga pattern.
- **Choreogrphy** 
- **Orchestration**

Trong phạm vi bài viết này, chúng ta sẽ tìm hiểu về cách tiếp cận theo mô hình `Orchestration`.

### Orchestration
Trong mô hình này, chúng ta sẽ có một thành phần đóng vai trò là người điều phối (hay điều phối viên), đây là một dịch vụ riêng biệt sẽ điều phối tất cả các giao dịch giữa tất cả các microservice. Nếu các bước không xảy ra lỗi, yêu cầu đặt hàng sẽ hoàn tất (complete), nếu không điều phối viên sẽ đánh dấu yêu cầu đó là đã bị hủy (cancelled). Hãy xem cách chúng ta có thể thực hiện điều này như thế nào.
- Trong ví dụ này, giao tiếp giữa điều phối viên và các dịch vụ khác sẽ là một HTTP theo cách không đồng bộ. 
- Chúng ta cũng có thể sử dụng các Kafka topic để giao tiếp.

![](https://images.viblo.asia/113537a5-216f-472f-a074-55361c8b8f5a.png)

### Inventory Service
Cung cấp 2 endpoint. Một là trừ số lượng hàng trong kho và một là rollback lại số lượng hàng trong kho. Ví dụ. nếu chúng ta trừ hàng trong kho trước và sau đó chúng ta biết rằng tài khoản người dùng không đủ số dư từ hệ thống thanh toán, chúng ta cần phải thêm số lượng hàng trở lại kho hàng.

**Service**
```java
@Service
public class InventoryService {

    private Map<Integer, Integer> productInventoryMap;

    @PostConstruct
    private void init(){
        this.productInventoryMap = new HashMap<>();
        this.productInventoryMap.put(1, 5);
        this.productInventoryMap.put(2, 5);
        this.productInventoryMap.put(3, 5);
    }

    public InventoryResponseDTO deductInventory(final InventoryRequestDTO requestDTO){
        int quantity = this.productInventoryMap.getOrDefault(requestDTO.getProductId(), 0);
        InventoryResponseDTO responseDTO = new InventoryResponseDTO();
        responseDTO.setOrderId(requestDTO.getOrderId());
        responseDTO.setUserId(requestDTO.getUserId());
        responseDTO.setProductId(requestDTO.getProductId());
        responseDTO.setStatus(InventoryStatus.UNAVAILABLE);
        if(quantity > 0){
            responseDTO.setStatus(InventoryStatus.AVAILABLE);
            this.productInventoryMap.put(requestDTO.getProductId(), quantity - 1);
        }
        return responseDTO;
    }

    public void addInventory(final InventoryRequestDTO requestDTO){
        this.productInventoryMap
                .computeIfPresent(requestDTO.getProductId(), (k, v) -> v + 1);
    }

}
```

**Controller**
```java
@RestController
@RequestMapping("inventory")
public class InventoryController {

    @Autowired
    private InventoryService service;

    @PostMapping("/deduct")
    public InventoryResponseDTO deduct(@RequestBody final InventoryRequestDTO requestDTO){
        return this.service.deductInventory(requestDTO);
    }

    @PostMapping("/add")
    public void add(@RequestBody final InventoryRequestDTO requestDTO){
        this.service.addInventory(requestDTO);
    }

}
```

### Payment Service
Nó cũng cung cấp 2 endpoint. Một là trừ tiền trong tài khoản người dùng, một là rollback số tiền bị trừ trong tài khoản người dùng nếu số lượng hàng tồn kho không có sẵn.

**Service**
```java
@Service
public class PaymentService {

    private Map<Integer, Double> userBalanceMap;

    @PostConstruct
    private void init(){
        this.userBalanceMap = new HashMap<>();
        this.userBalanceMap.put(1, 1000d);
        this.userBalanceMap.put(2, 1000d);
        this.userBalanceMap.put(3, 1000d);
    }

    public PaymentResponseDTO debit(final PaymentRequestDTO requestDTO){
        double balance = this.userBalanceMap.getOrDefault(requestDTO.getUserId(), 0d);
        PaymentResponseDTO responseDTO = new PaymentResponseDTO();
        responseDTO.setAmount(requestDTO.getAmount());
        responseDTO.setUserId(requestDTO.getUserId());
        responseDTO.setOrderId(requestDTO.getOrderId());
        responseDTO.setStatus(PaymentStatus.PAYMENT_REJECTED);
        if(balance >= requestDTO.getAmount()){
            responseDTO.setStatus(PaymentStatus.PAYMENT_APPROVED);
            this.userBalanceMap.put(requestDTO.getUserId(), balance - requestDTO.getAmount());
        }
        return responseDTO;
    }

    public void credit(final PaymentRequestDTO requestDTO){
        this.userBalanceMap.computeIfPresent(requestDTO.getUserId(), (k, v) -> v + requestDTO.getAmount());
    }

}
```

**Controller**
```java
@RestController
@RequestMapping("payment")
public class PaymentController {

    @Autowired
    private PaymentService service;

    @PostMapping("/debit")
    public PaymentResponseDTO debit(@RequestBody PaymentRequestDTO requestDTO){
        return this.service.debit(requestDTO);
    }

    @PostMapping("/credit")
    public void credit(@RequestBody PaymentRequestDTO requestDTO){
        this.service.credit(requestDTO);
    }

}
```

### Order Service
Order-service nhận yêu cầu tạo đơn hàng và gửi thông báo này đến kafka topic **order-created**. Nó cũng lắng trên topic **order-updated** và cập nhật trạng thái đơn hàng.
**Service**
```java
@Service
public class OrderService {

    // product price map
    private static final Map<Integer, Double> PRODUCT_PRICE =  Map.of(
            1, 100d,
            2, 200d,
            3, 300d
    );

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private FluxSink<OrchestratorRequestDTO> sink;

    public PurchaseOrder createOrder(OrderRequestDTO orderRequestDTO){
        PurchaseOrder purchaseOrder = this.purchaseOrderRepository.save(this.dtoToEntity(orderRequestDTO));
        this.sink.next(this.getOrchestratorRequestDTO(orderRequestDTO));
        return purchaseOrder;
    }

    public List<OrderResponseDTO> getAll() {
        return this.purchaseOrderRepository.findAll()
                .stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    private PurchaseOrder dtoToEntity(final OrderRequestDTO dto){
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setId(dto.getOrderId());
        purchaseOrder.setProductId(dto.getProductId());
        purchaseOrder.setUserId(dto.getUserId());
        purchaseOrder.setStatus(OrderStatus.ORDER_CREATED);
        purchaseOrder.setPrice(PRODUCT_PRICE.get(purchaseOrder.getProductId()));
        return purchaseOrder;
    }

    private OrderResponseDTO entityToDto(final PurchaseOrder purchaseOrder){
        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderId(purchaseOrder.getId());
        dto.setProductId(purchaseOrder.getProductId());
        dto.setUserId(purchaseOrder.getUserId());
        dto.setStatus(purchaseOrder.getStatus());
        dto.setAmount(purchaseOrder.getPrice());
        return dto;
    }

    public OrchestratorRequestDTO getOrchestratorRequestDTO(OrderRequestDTO orderRequestDTO){
        OrchestratorRequestDTO requestDTO = new OrchestratorRequestDTO();
        requestDTO.setUserId(orderRequestDTO.getUserId());
        requestDTO.setAmount(PRODUCT_PRICE.get(orderRequestDTO.getProductId()));
        requestDTO.setOrderId(orderRequestDTO.getOrderId());
        requestDTO.setProductId(orderRequestDTO.getProductId());
        return requestDTO;
    }

}
```

**Controller**
```java
@RestController
@RequestMapping("order")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping("/create")
    public PurchaseOrder createOrder(@RequestBody OrderRequestDTO requestDTO){
        requestDTO.setOrderId(UUID.randomUUID());
        return this.service.createOrder(requestDTO);
    }

    @GetMapping("/all")
    public List<OrderResponseDTO> getOrders(){
        return this.service.getAll();
    }

}
```

### Order Orchestrator
Đây là một microservice chịu trách nhiệm điều phối tất cả các tác vụ trong một nghiệp vụ (bussiness transaction) mà phải đi qua nhiều microservice. Nó lắng nghe trên topic **order-created**. Khi một đơn đặt hàng mới được tạo, nó ngay lập tức xây dựng yêu cầu riêng biệt cho từng dịch vụ như payment-service, inventory-service.... và nhận các phản hồi. Nếu tất cả các tác vụ trong order-orchestrator không xảy ra lỗi, đơn hàng sẽ được tạo thành công. Nếu một trong số các tác vụ xảy ra lỗi, đơn hàng sẽ bị hủy. Nó cũng cố gắng rollback lại bất kỳ giao dịch cục bộ (`local transaction`) nào đã xảy ra trong bất kỳ microservice nào. Chúng ta coi mỗi giao dịch cục bộ là 1 quy trình làm việc (**workflow**). Một quy trình làm việc sẽ bao gồm nhiều bước (**workflow step**).

**Workflow**
```
public interface Workflow {

    List<WorkflowStep> getSteps();

}
```

**Workflow step**
```java
public interface WorkflowStep {

    WorkflowStepStatus getStatus();
    Mono<Boolean> process();
    Mono<Boolean> revert();

}
```

**InventoryStep**
```java
public class InventoryStep implements WorkflowStep {

    private final WebClient webClient;
    private final InventoryRequestDTO requestDTO;
    private WorkflowStepStatus stepStatus = WorkflowStepStatus.PENDING;

    public InventoryStep(WebClient webClient, InventoryRequestDTO requestDTO) {
        this.webClient = webClient;
        this.requestDTO = requestDTO;
    }

    @Override
    public WorkflowStepStatus getStatus() {
        return this.stepStatus;
    }

    @Override
    public Mono<Boolean> process() {
        return this.webClient
                .post()
                .uri("/inventory/deduct")
                .body(BodyInserters.fromValue(this.requestDTO))
                .retrieve()
                .bodyToMono(InventoryResponseDTO.class)
                .map(r -> r.getStatus().equals(InventoryStatus.AVAILABLE))
                .doOnNext(b -> this.stepStatus = b ? WorkflowStepStatus.COMPLETE : WorkflowStepStatus.FAILED);
    }

    @Override
    public Mono<Boolean> revert() {
        return this.webClient
                    .post()
                    .uri("/inventory/add")
                    .body(BodyInserters.fromValue(this.requestDTO))
                    .retrieve()
                    .bodyToMono(Void.class)
                    .map(r ->true)
                    .onErrorReturn(false);
    }
}
```

**PaymentStep**
```java
public class InventoryStep implements WorkflowStep {

    private final WebClient webClient;
    private final InventoryRequestDTO requestDTO;
    private WorkflowStepStatus stepStatus = WorkflowStepStatus.PENDING;

    public InventoryStep(WebClient webClient, InventoryRequestDTO requestDTO) {
        this.webClient = webClient;
        this.requestDTO = requestDTO;
    }

    @Override
    public WorkflowStepStatus getStatus() {
        return this.stepStatus;
    }

    @Override
    public Mono<Boolean> process() {
        return this.webClient
                .post()
                .uri("/inventory/deduct")
                .body(BodyInserters.fromValue(this.requestDTO))
                .retrieve()
                .bodyToMono(InventoryResponseDTO.class)
                .map(r -> r.getStatus().equals(InventoryStatus.AVAILABLE))
                .doOnNext(b -> this.stepStatus = b ? WorkflowStepStatus.COMPLETE : WorkflowStepStatus.FAILED);
    }

    @Override
    public Mono<Boolean> revert() {
        return this.webClient
                    .post()
                    .uri("/inventory/add")
                    .body(BodyInserters.fromValue(this.requestDTO))
                    .retrieve()
                    .bodyToMono(Void.class)
                    .map(r ->true)
                    .onErrorReturn(false);
    }
}
```

**OrchestratorService**
```java
@Service
public class OrchestratorService {

    @Autowired
    @Qualifier("payment")
    private WebClient paymentClient;

    @Autowired
    @Qualifier("inventory")
    private WebClient inventoryClient;

    public Mono<OrchestratorResponseDTO> orderProduct(final OrchestratorRequestDTO requestDTO){
        Workflow orderWorkflow = this.getOrderWorkflow(requestDTO);
        return Flux.fromStream(() -> orderWorkflow.getSteps().stream())
                .flatMap(WorkflowStep::process)
                .handle(((aBoolean, synchronousSink) -> {
                    if(aBoolean)
                        synchronousSink.next(true);
                    else
                        synchronousSink.error(new WorkflowException("create order failed!"));
                }))
                .then(Mono.fromCallable(() -> getResponseDTO(requestDTO, OrderStatus.ORDER_COMPLETED)))
                .onErrorResume(ex -> this.revertOrder(orderWorkflow, requestDTO));

    }

    private Mono<OrchestratorResponseDTO> revertOrder(final Workflow workflow, final OrchestratorRequestDTO requestDTO){
        return Flux.fromStream(() -> workflow.getSteps().stream())
                .filter(wf -> wf.getStatus().equals(WorkflowStepStatus.COMPLETE))
                .flatMap(WorkflowStep::revert)
                .retry(3)
                .then(Mono.just(this.getResponseDTO(requestDTO, OrderStatus.ORDER_CANCELLED)));
    }

    private Workflow getOrderWorkflow(OrchestratorRequestDTO requestDTO){
        WorkflowStep paymentStep = new PaymentStep(this.paymentClient, this.getPaymentRequestDTO(requestDTO));
        WorkflowStep inventoryStep = new InventoryStep(this.inventoryClient, this.getInventoryRequestDTO(requestDTO));
        return new OrderWorkflow(List.of(paymentStep, inventoryStep));
    }

    private OrchestratorResponseDTO getResponseDTO(OrchestratorRequestDTO requestDTO, OrderStatus status){
        OrchestratorResponseDTO responseDTO = new OrchestratorResponseDTO();
        responseDTO.setOrderId(requestDTO.getOrderId());
        responseDTO.setAmount(requestDTO.getAmount());
        responseDTO.setProductId(requestDTO.getProductId());
        responseDTO.setUserId(requestDTO.getUserId());
        responseDTO.setStatus(status);
        return responseDTO;
    }

    private PaymentRequestDTO getPaymentRequestDTO(OrchestratorRequestDTO requestDTO){
        PaymentRequestDTO paymentRequestDTO = new PaymentRequestDTO();
        paymentRequestDTO.setUserId(requestDTO.getUserId());
        paymentRequestDTO.setAmount(requestDTO.getAmount());
        paymentRequestDTO.setOrderId(requestDTO.getOrderId());
        return paymentRequestDTO;
    }

    private InventoryRequestDTO getInventoryRequestDTO(OrchestratorRequestDTO requestDTO){
        InventoryRequestDTO inventoryRequestDTO = new InventoryRequestDTO();
        inventoryRequestDTO.setUserId(requestDTO.getUserId());
        inventoryRequestDTO.setProductId(requestDTO.getProductId());
        inventoryRequestDTO.setOrderId(requestDTO.getOrderId());
        return inventoryRequestDTO;
    }

}
```

**OrchestratorService**
```java
@Service
public class OrchestratorService {

    @Autowired
    @Qualifier("payment")
    private WebClient paymentClient;

    @Autowired
    @Qualifier("inventory")
    private WebClient inventoryClient;

    public Mono<OrchestratorResponseDTO> orderProduct(final OrchestratorRequestDTO requestDTO){
        Workflow orderWorkflow = this.getOrderWorkflow(requestDTO);
        return Flux.fromStream(() -> orderWorkflow.getSteps().stream())
                .flatMap(WorkflowStep::process)
                .handle(((aBoolean, synchronousSink) -> {
                    if(aBoolean)
                        synchronousSink.next(true);
                    else
                        synchronousSink.error(new WorkflowException("create order failed!"));
                }))
                .then(Mono.fromCallable(() -> getResponseDTO(requestDTO, OrderStatus.ORDER_COMPLETED)))
                .onErrorResume(ex -> this.revertOrder(orderWorkflow, requestDTO));

    }

    private Mono<OrchestratorResponseDTO> revertOrder(final Workflow workflow, final OrchestratorRequestDTO requestDTO){
        return Flux.fromStream(() -> workflow.getSteps().stream())
                .filter(wf -> wf.getStatus().equals(WorkflowStepStatus.COMPLETE))
                .flatMap(WorkflowStep::revert)
                .retry(3)
                .then(Mono.just(this.getResponseDTO(requestDTO, OrderStatus.ORDER_CANCELLED)));
    }

    private Workflow getOrderWorkflow(OrchestratorRequestDTO requestDTO){
        WorkflowStep paymentStep = new PaymentStep(this.paymentClient, this.getPaymentRequestDTO(requestDTO));
        WorkflowStep inventoryStep = new InventoryStep(this.inventoryClient, this.getInventoryRequestDTO(requestDTO));
        return new OrderWorkflow(List.of(paymentStep, inventoryStep));
    }

    private OrchestratorResponseDTO getResponseDTO(OrchestratorRequestDTO requestDTO, OrderStatus status){
        OrchestratorResponseDTO responseDTO = new OrchestratorResponseDTO();
        responseDTO.setOrderId(requestDTO.getOrderId());
        responseDTO.setAmount(requestDTO.getAmount());
        responseDTO.setProductId(requestDTO.getProductId());
        responseDTO.setUserId(requestDTO.getUserId());
        responseDTO.setStatus(status);
        return responseDTO;
    }

    private PaymentRequestDTO getPaymentRequestDTO(OrchestratorRequestDTO requestDTO){
        PaymentRequestDTO paymentRequestDTO = new PaymentRequestDTO();
        paymentRequestDTO.setUserId(requestDTO.getUserId());
        paymentRequestDTO.setAmount(requestDTO.getAmount());
        paymentRequestDTO.setOrderId(requestDTO.getOrderId());
        return paymentRequestDTO;
    }

    private InventoryRequestDTO getInventoryRequestDTO(OrchestratorRequestDTO requestDTO){
        InventoryRequestDTO inventoryRequestDTO = new InventoryRequestDTO();
        inventoryRequestDTO.setUserId(requestDTO.getUserId());
        inventoryRequestDTO.setProductId(requestDTO.getProductId());
        inventoryRequestDTO.setOrderId(requestDTO.getOrderId());
        return inventoryRequestDTO;
    }

}
```

### Demo
Start tất cả các dịch vụ lên và chúng ta sẽ gửi một yêu cầu để tạo đơn hàng. Chúng ta nhận được trạng thái đơn hàng đã tạo. Giả sử rằng người dùng cố gắng đặt hàng với sản phẩm có giá 300$. Giới hạn tín dụng của người dùng là 1000$. Thì khi send 3 request đầu tiên, kết quả sẽ thành công. Kết quả thứ 4 sẽ thất bại. Vì 3 sản phẩm đầu tiên đã trừ đi 300$ x 3 = 900$, còn 100$ sẽ không mua tiếp được sản phẩm thứ 4 nên nếu tiếp tục gửi request thứ 4 sẽ thất bại.

### Tổng kết
Nhìn chung, việc xử lý các giao dịch và duy trì tính nhất quán dữ liệu giữa tất cả các microservice là rất khó khăn. Khi nhiều dịch vụ có liên quan như thanh toán, kiểm kê, kiểm tra gian lận, kiểm tra vận chuyển… sẽ rất khó để quản lý một quy trình công việc phức tạp với nhiều bước như vậy mà không có người điều phối. Qua đó order-service được giải phóng khỏi những trách nhiệm phức tạp. Chúng ta cũng không giới thiệu bất kỳ sự phụ thuộc theo chu kỳ nào. Kiểm tra mã nguồn của dự án tại đây.