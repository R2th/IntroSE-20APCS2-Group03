# Lời mở đầu phần 2
Chào mừng các bạn đến với phần 2 của series phân tích và so sánh giữa việc tạo chuyển động *Character controller* và *Rigid body* trong Unity 3D

Như đã giới thiệu trong phần trước, ở phần này tôi sẽ giới thiệu với các bạn về cách xử lý chuyển động bằng Rigid body và đưa ra kết luận về cả hai cách thực hiện.

Vậy không dài dòng nữa, chúng ta hãy ngay lập tức bắt đầu với...

# Rigid body
Chúng ta sẽ lại trải qua các bước như với cách thực hiện chuyển động bằng Character controller để có thể nhận thức rõ ràng nhất điểm khác biệt giữa hai phương thức này.

## Setup

Setup cho Scence của chúng ta vẫn gần như giống hệt với những gì chúng ta đã làm trong [phần 1.](https://viblo.asia/s/so-sanh-giua-charater-controller-va-rigid-body-trong-unity3d-phan-1-AyK8VmRelxX) 
Điểm khác biệt chính là chúng ta không có component character controller trong player của mình, mà thay vào đó *Capsule collider* và *Rigid body*

Trong thành phần Rigid body, hãy khóa chuyển động xoay của trục X và Z. Hãy để ý là tôi cũng đã thay đổi giá trị của Drag, tại sao tôi lại làm vậy, chúng ta sẽ tìm hiểu sau.  Những giá trị khác chúng ta có thể để ở giá trị mặc định. Với Capsule collider cũng vậy, chúng ta không cần thay đổi gì.

![](https://images.viblo.asia/c780ac86-c140-48cc-a70c-87167faf8049.png)

## Rigidbody Controller

Lần này, tôi sẽ không đi sâu vào chi tiết vì cơ bản nó rất giống với những gì chúng ta đã làm với *Character controller* ở phần trước. Thay vì đó, tôi sẽ tập trung vào điểm khác nhau giữa hai phương thức. Dưới đây là toàn bộ script để các bạn có thể có một cái nhìn khái quát nhất.
```
public class RigidbodyCharacter : MonoBehaviour
{

    public float Speed = 5f;
    public float JumpHeight = 2f;
    public float GroundDistance = 0.2f;
    public float DashDistance = 5f;
    public LayerMask Ground;

    private Rigidbody _body;
    private Vector3 _inputs = Vector3.zero;
    private bool _isGrounded = true;
    private Transform _groundChecker;

    void Start()
    {
        _body = GetComponent<Rigidbody>();
        _groundChecker = transform.GetChild(0);
    }

    void Update()
    {
        _isGrounded = Physics.CheckSphere(_groundChecker.position, GroundDistance, Ground, QueryTriggerInteraction.Ignore);


        _inputs = Vector3.zero;
        _inputs.x = Input.GetAxis("Horizontal");
        _inputs.z = Input.GetAxis("Vertical");
        if (_inputs != Vector3.zero)
            transform.forward = _inputs;

        if (Input.GetButtonDown("Jump") && _isGrounded)
        {
            _body.AddForce(Vector3.up * Mathf.Sqrt(JumpHeight * -2f * Physics.gravity.y), ForceMode.VelocityChange);
        }
        if (Input.GetButtonDown("Dash"))
        {
            Vector3 dashVelocity = Vector3.Scale(transform.forward, DashDistance * new Vector3((Mathf.Log(1f / (Time.deltaTime * _body.drag + 1)) / -Time.deltaTime), 0, (Mathf.Log(1f / (Time.deltaTime * _body.drag + 1)) / -Time.deltaTime)));
            _body.AddForce(dashVelocity, ForceMode.VelocityChange);
        }
    }


    void FixedUpdate()
    {
        _body.MovePosition(_body.position + _inputs * Speed * Time.fixedDeltaTime);
    }
}
```
## FixedUpdate

Điểm khác biệt đáng chú ý đầu tiên là ở hàm FixedUpdate. Đây là hàm được Unity gọi trước mỗi kỳ "Update vật lý". Trong Unity, update vật lý và update thường không đồng bộ với nhau. Để đạt được hiệu ứng di chuyển một cách chân thật, chúng ta cần phải tính toán nó thật cẩn thận. Vì thế Unity đã quyết định tách riêng nó ra khỏi kỳ update thông thường. Với cơ chế này, dù frame rate quá cao hay quá thấp thì cũng sẽ không ảnh hưởng đến game của chúng ta.

![](https://images.viblo.asia/181f2063-6604-4cd0-b40f-2a74a019f5b8.png)

Ý nghĩa của FixedUpdate là để thực hiện các hàm liên quan đến vật lý. Nhưng như các bạn có thể thấy là ở đây tôi vẫn sử dụng hàm Update truyền thống. Lý do là bởi vì hàm FixedUpdate trong Unity không đồng bộ với input từ User, thế nên chúng ta cần phải thu thập input của User từ hàm Update, lưu chúng vào một biến (như ở đây là inputs) thì mới sử dụng được chúng ở trong hàm FixedUpdate. Chúng ta cũng có thể thu thập input từ trong FixedUpdate nhưng tôi phải cảnh báo các bạn trước là kết quả sẽ không khả quan lắm đâu.

## Nhảy và lướt

```
if (Input.GetButtonDown("Jump") && _isGrounded)
{
_body.AddForce(Vector3.up * Mathf.Sqrt(JumpHeight * -2f * Physics.gravity.y), ForceMode.VelocityChange);
}
if (Input.GetButtonDown("Dash"))
{
Vector3 dashVelocity = Vector3.Scale(transform.forward, DashDistance * new Vector3((Mathf.Log(1f / (Time.deltaTime * _body.drag + 1)) / -Time.deltaTime), 0, (Mathf.Log(1f / (Time.deltaTime * _body.drag + 1)) / -Time.deltaTime)));
_body.AddForce(dashVelocity, ForceMode.VelocityChange);
}
```

Đây là đoạn code thực hiện việc nhảy và lướt của chúng ta. Sau phần giải thích về FixedUpdate ở trên, chắc sẽ có vài người thắc mắc về việc tôi không để phần này vào hàm FixedUpdate, nó có liên quan đến vật lý cơ mà.

Đúng là nó có liên quan đến vật lý, nhưng ở đâu tôi đã sử dụng những hàm này một cách gián tiếp hơn: tôi đã sử dụng những hàm AddForce. AddForce sẽ thực hiện ngay lập tức nên không phụ thuộc vào frame rate. AddForce là một trong bốn cách để tác dụng lực vào một RigidBody, bốn cách chi tiết như sau.

- **Force**: liên tục và phụ thuộc vào khối lượng
- **Acceleration**: liên tục và không phụ thuộc vào khối lượng
- **Impulse**: tức thời và phụ thuộc vào khối lượng
- **VelocityChange**: tức thời và không phụ thuộc vào khối lượng

Ở đây tôi sử dụng VelocityChange vì tôi muốn có một lực tác dụng tức thời vào player của mình, và tôi cũng không quan tâm đến khối lượng của player. 

```
void FixedUpdate()
{
_body.MovePosition(_body.position + _inputs * Speed * Time.fixedDeltaTime);
}
```

Để thực hiện chuyển động theo input của user, chúng ta sẽ sử dụng hàm MovePosition. Hàm này sẽ cố di chuyển player đến một vị trí được chỉ định trong khi vẫn giữ những luật va chạm. Nó cũng không tác động đến tốc độ của RigidBody. Bằng cách này, chúng ta sẽ tách biệt được chuyển động của player khỏi những tác động vật lý khác.

Các bạn có thể thấy ở đây chúng ta không cần động đến trọng lực hay lực cản, đó là bởi vì RigidBody đã xử lý nhũng phần đó cho chúng ta. Các bạn có thể điều chỉnh lực cản ở RigidBody và gravity trong ProjectSetting. 

*(Hãy cẩn thận với lực cản vì không giống như với Character Controller, lực cản của RigidBody không được chia làm ba trục, thế nên nó sẽ tác động lên cả ba trục đồng thời)*

![](https://images.viblo.asia/f7608789-29ca-4ac6-899c-2926f2fda235.png)

# Những điểm khác biệt chính

Mặc dù chúng ta có thể đạt được kết quả giống nhau với cả hai cách thực hiện, hành vi của chúng sẽ không giống nhau. 

## Va chạm
Cả hai cách đều sẽ phản ứng với va chạm nhưng cách chúng phản ứng sẽ có sự khác biệt. RigidBody sẽ phản ứng rất chính xác và thậm chí sử dụng những tính chất vật lý để tính toán chính xác nhất. Trong khi đó CharacterController sẽ ít chặt chẽ hơn, chúng ta có thể tự động leo qua những gờ dốc thấp (tùy theo tham số) mà không cần xử lý gì.

![](https://images.viblo.asia/22f2375c-ed20-46e1-b2fb-c108e849b622.png)

## Khả năng mở rộng

Trong ví dụ này chúng ta không có nhiều tính năng lắm nên cách xử lý tốt nhất là bằng *Character controller* nhưng nếu chúng ta có thêm nhiều tính năng thì có lẽ *Rigid Body* mới là cách tốt nhất. Nó cung cấp cho chúng ta rất nhiều tương tác vật lý mà Character Controller không có, vì vậy nếu dùng Character Controller thì chúng ta sẽ cần phải code nhiều hơn cho cùng một tính năng.

# Kết luận

Như các bạn thấy, chúng ta có thể đạt được mục đích bằng cả hai cách thực hiện nhưng cách thực hiện sẽ thay đổi tùy thuộc vào lựa chọn của chúng ta.

Đó là lý do trước khi chúng ta bắt đầu tôi đã khuyên các bạn cần cân nhắc thật cẩn thận xem game của chúng ta cần gì trước khi bắt tay vào thực hiện character controller.

Đến đây cũng là đã kết thúc của series này. Hi vọng series này đã có thể giúp các bạn có thêm những kiến thức mới về Character controller trong Unity3D. Xin cảm ơn các bạn đã theo dõi và hẹn gặp lại các bạn vào các bài viết sau!