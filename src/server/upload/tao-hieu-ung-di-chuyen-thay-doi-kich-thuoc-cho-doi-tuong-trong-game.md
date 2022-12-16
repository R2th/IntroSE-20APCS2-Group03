Chào các bạn,

Như các bạn cũng thấy, trải nghiệm của 1 game dù lớn, dù nhỏ, yếu tố hỉnh ảnh, hiệu ứng luôn là yếu tố hết sức quan trọng.

Hình ảnh, thì mình không phải design vì vậy các bạn đi mua nhé, có nhiều designer làm freelancer ở nhà lắm ^_^

Hiệu ứng, chúng ta có thể lên asset store mua, download, đồ free cũng khá nhiều.

Tuy nhiên, như vậy thì cũng tiện nhưng không hay và thú vị, mình đã sử dụng plugin của người khác cũng khá lâu rồi, hôm nay tự nhiên lại muốn thử tự làm mấy cái hiệu ứng đó xem sao.

Các bạn nào có hứng thú như mình thì chúng ta cùng triển khai nhé ;)

Bài hôm nay mình sẽ làm 2 hiệu ứng:

+ Di chuyển.
+ Thay đổi kích thước.

1. Di Chuyển

 Di chuyển chúng ta có rất nhiều cách để di chuyển, như dùng Transform.Translate... nếu muốn di chuyển mềm mại 1 chút thì chúng ta dùng Vector3.Lerp sẽ giúp việc di chuyển mềm mại hơn.
 Tuy nhiên, việc sử dụng những cách di chuyển trên chúng ta sẽ chỉ có thể di chuyển 1 cách đơn thuần, không thể có nhiều cách di chuyển thú vị như tiến 2 lùi 1 tiến 3 lùi 2.... (ví dụ thôi) :p
 Vậy chúng ta sẽ cùng viết 1 hàm di chuyển theo cách chúng ta muốn nhé!
    
 - Tạo 1 hàm di chyển đối tượng:
    ```
    public Vector3 startPos;
    public Vector3 targetPos;
    
    private void Start()
    {
        startPos = transform.localPosition;
    }
    
    private void Update() {
        MoveObject(targetPos);
    }
    
    private void MoveObject( Vector3 targetPos) {
        transform.localPosition = Vector3.Lerp (startPos, targetPos, 0.1f);
    }
    ```
  - Với hàm di chuyển ở trên, chúng ta đã có thể di chuyển một đối tượng một cách mượt mà.
  - Thêm yếu tố thời gian vào để kiểm soát thời gian di chuyển của đối tượng như sau:
    ```
    public float duration = 1f;
    float rate = 0;
    float time = 0;
    
    private void MoveObject(Vector3 targetPos)
    {
        rate = 1 / duration;
        time += rate * Time.deltaTime;
        transform.localPosition = Vector3.Lerp(startPos, targetPos, time);
    }
    ```
  - Ở trên các bạn thấy duration là 1s, như vậy đối tượng sẽ di chuyển mất 1s để tới vị trí yêu cầu.
  - Bây giờ chúng ta sẽ tạo ra 1 AnimationCurve, với AnimationCurve chúng ta sẽ có 1 đồ thị có thể custom theo ý muốn của mình.
    ```
    public AnimationCurve moveCurve;
    ```
  - Thêm cái Header cho nó rõ ràng hơn nhé.
    ```
    [Header ("Draw Curve")]
    public AnimationCurve moveCurve;
    ```
    
  - Sau khi có AnimationCurve rồi, các bạn có thể tạo ra các đường cong tương ứng với hiệu ứng di chuyển của đối tượng của bạn.

    ![](https://images.viblo.asia/d2fc7d47-540f-47f7-b037-e7fc921bc7f7.PNG)

  - Tuy nhiên khi ấn play bạn vẫn thấy đối tượng di chuyển như cũ, do chúng ta chưa áp dụng AnimationCurve vào việc di chuyển của đối tượng.
  - Đưa AnimationCurve vào phương thức MoveObject như sau:
    ```
    private void MoveObject(Vector3 targetPos) {
        rate = 1 / duration;
        time += rate * Time.deltaTime;
        transform.localPosition = Vector3.Lerp(startPos, targetPos, moveCurve.Evaluate(time));
    }
    ```
  - Như vậy chúng ta đã hoàn thành việc di chuyển 1 đối tượng theo cách mà mình muốn, rất mượt mà và thú vị đúng không nào?
  - Nhưng có 1 điều bất tiện, hàm này hiện tại khó tái sử dụng, chúng ta cần chỉnh sửa 1 chút để nó có thể gọi chạy lại nhiều lần như sau:
    ```
    private void Start()
    {
        StartCoroutine(MoveObject(targetPos, 10f));
    }
    
    public IEnumerator MoveObject(Vector3 targetPos, float duration)
    {
        float time = 0;
        float rate = 1 / duration;
        Vector3 startPos = transform.localPosition;
        while (time < 1)
        {
            time += rate * Time.deltaTime;
            transform.localPosition = Vector3.Lerp(startPos, targetPos, moveCurve.Evaluate(time));
            yield return 0;
        }
    }
    ```
  - Như vậy, giờ đây các bạn đã có thể gọi hàm này lại nhiều lần, với tham số đưa vào đó là vị trí di chuyển tới, thời gian di chuyển, và có thể tạo ra cách thức di chuyển bất kì theo ý thích của mình! ;)
  
2. Thay đổi kích thước

  - Tương tự như cách viết hàm di chuyển ở trên, chúng ta sẽ xem có thể sử dụng lại và sửa những gì nhé!
  - Đầu tiên là việc chúng ta không cần dùng tới Vector3.Lerp bởi việc trả về giá trị từ AnimationCurve đã chính là giá trị cần dùng cho Scale rồi.
  - Tiếp đến thay vì dùng transform.localPosition thì ta dùng transform.localScale:
    ```
    public Vector3 targetScale;
    
    public IEnumerator ScaleObject(Vector3 targetPos, float duration)
    {
        float time = 0;
        float rate = 1 / duration;
        while (time < 1)
        {
            time += rate * Time.deltaTime;
            ttransform.localScale = targetScale*moveCurve.Evaluate(time);
            yield return 0;
        }
    }
    ```
  - Chạy thử các bạn sẽ thấy hiệu ứng scale đã có thể chỉnh tay theo ý muốn của chúng ta bằng cách chỉnh AnimationCurve rồi đúng không nào!

3. Tối ưu

  - Việc thay đổi vị trí hay thay đổi kích thước theo thời gian đôi khi kết thúc hiệu ứng nhưng nó vẫn chưa thật sự đi tới đúng vị trí hoặc đạt dúng tỉ lệ kích thước (ví dụ muốn đổi kích thước từ 1 thành 2, nhưng nó chỉ tới 1.999999 là kết thúc). Với việc cần sử dụng lại tọa độ, hoặc kích thước chuẩn để cho các thuật toán về sau, chúng ta sẽ thêm 1 bước nữa đó là set chuẩn vị trí và tỉ lệ cho đối tượng sau khi kết thúc hiệu ứng.
  - Vậy chúng ta sẽ có code cả chương trình như sau:
  ```
    [Header ("Draw Curve")]
    public AnimationCurve moveCurve;

    public Vector3 targetPos;
    public Vector3 targetScale;

    public float duration = 1f;
    

    private void Start()
    {
        StartCoroutine(ScaleObject(targetPos, 10f));
    }

    public IEnumerator MoveObject(Vector3 targetPos, float duration)
    {
        float time = 0;
        float rate = 1 / duration;
        Vector3 startPos = transform.localPosition;
        while (time < 1)
        {
            time += rate * Time.deltaTime;
            transform.localPosition = Vector3.Lerp(startPos, targetPos, moveCurve.Evaluate(time));
            yield return 0;
        }
        transform.localPosition = targetPos;
    }

    public IEnumerator ScaleObject(Vector3 targetPos, float duration)
    {
        float time = 0;
        float rate = 1 / duration;
        while (time < 1)
        {
            time += rate * Time.deltaTime;
            transform.localScale = targetScale* moveCurve.Evaluate(time);
            yield return 0;
        }
        transform.localScale = targetScale;
    }
  ```
  
  ![](https://images.viblo.asia/96a02202-8040-4010-a326-86762b2bcbfb.PNG)
  
4. Kết

    Qua bài viết này hi vọng các bạn cũng sẽ thấy hứng thú với việc tự tạo cho mình những hiệu ứng thay vì dùng những plugin có sẵn mà ta không thể hoặc rất khó khăn để custom theo ý muốn của mình!
    Chúc các bạn sẽ luôn có cảm hứng làm game và có thật nhiều sản phẩm thú vị từ Unity nhé ;)