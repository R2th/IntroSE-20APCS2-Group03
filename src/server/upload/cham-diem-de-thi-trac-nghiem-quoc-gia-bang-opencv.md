# 1. Lời mở đầu
Xin chào các bạn, tiếp tục nối tiếp các bài viết về xử lý ảnh bằng OpenCV như [Nhận diện biển số xe Việt Nam](https://viblo.asia/p/nhan-dien-bien-so-xe-viet-nam-Do754P9L5M6),  [Corner Detection](https://viblo.asia/p/corner-detection-voi-opencv-eW65Gv6YlDO),  [Edge Detection](https://viblo.asia/p/part1-edge-detection-voi-opencv-L4x5xLVB5BM), .... Hôm nay mình xin tiếp tục giới thiệu cho các bạn phương pháp **chấm điểm bài thi trắc nghiệm bằng OpenCV**. Mẫu đề trắc nghiệm tương đối đa dạng nhưng trong bài viết lần này mình lấy mẫu chính là đề thi trung học phổ thông quốc gia năm 2020 gồm 120 câu:relieved:. Các bạn click trực tiếp và tải về ảnh bên dưới đây để cùng làm với mình nhé.
<p align="center">
    <img src="https://images.viblo.asia/8f8fa123-b8c8-4fa0-aa63-b8750279e028.jpg" >
    Ảnh 1: Đề thi trung học phổ thông quốc gia năm 2020

 </p>
 
 # 2. Các bước thực hiện
 Ở mẫu đề thi lần này chúng ta có 120 câu hỏi được chia thành **4 cột**. Mỗi cột có **6 ô**, mỗi ô có **5 câu hỏi**. Và ở mỗi câu hỏi ta có 4 đáp án: "A", "B", "C", "D" và một điều đặc biệt nữa là một câu hỏi có thể có nhiều hơn 1 đáp án. Sau khi nắm được tổng quát cấu trúc đầu vào, mình chia cách giải quyết bài toán gồm các bước sau: <br>
 
 *  Xử lý ảnh đầu vào tách ra **4 cột**  đáp án
 * Chia mỗi cột đáp án ra thành **6 box**, mỗi box lại chia  tiếp lấy ra 5 câu hỏi
 *  Xử lý từng câu hỏi để lấy ra các hình tròn chứa đáp án (bubble choice)
 *  Sử dụng model CNN tiến hành phân loại đáp án đó có được tô hay không ?
 
 ## 2.1 Xử lý ảnh đầu vào tách ra **4 cột**  đáp án
 Do mỗi cột đáp án có viền hồng liền nhau bao xung quang bốn cạnh nên ta có thể dùng hàm **cv2.findContour()** của OpenCV. Nhắc lại một chút về khái niệm , **Contour** chính là những nét  liền nhau bao quanh những khối, hình và hàm **cv2.findContour**  sẽ tìm và trả về cho ta  những nét như thế. Để áp dụng được hàm này, đầu tiên ta chuyển ảnh đọc vào thành dạng **GRAY**, sử dụng GaussianBlur để giảm bớt nhiễu, sau đó áp dụng sử dụng thuật  toán [Canny Edge Detection](https://viblo.asia/p/part-2-edge-detection-voi-opencv-eW65Gv4YlDO) để phát hiện ra các cạnh có trong ảnh đầu vào. Cuối cùng ta mới có thể dùng hàm **cv2.findContours** .
 ```python
     # convert image from BGR to GRAY to apply canny edge detection algorithm
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # remove noise by blur image
    blurred = cv2.GaussianBlur(gray_img, (5, 5), 0)

    # apply canny edge detection algorithm
    img_canny = cv2.Canny(blurred, 100, 200)

    # find contours
    cnts = cv2.findContours(img_canny.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
 ```
 Để chuẩn bị cho phần sau, ta xây dựng một hàm nhận đầu vào là một contour và trả về diện tích của hình chữ nhật bao quanh contour đó :
 ```python
  def get_x_ver1(s):
    s = cv2.boundingRect(s)
    return s[0] * s[1]
   ```
 Và một hàm nhận đầu vào list, mỗi phần tử trong list có dạng **[image, (x, y, w, h)]**  và trả về tọa độ x:
 ```python
 def get_x(s):
    return s[1][0]
 ```
   
Tiếp tục phần xử lý, nếu **cv2.findContours**  phát hiện được contour (len(cnts) > 0),  ta sử dụng hàm **cv2.boundingRect** để có thể lấy ra tọa độ (xmin, ymin) cũng như chiều dài và rộng của hình chữ nhật bao quanh contour. Vì chúng ta sẽ thu được vô số các contour do trong hình ta có vô số nét liền nhau chữ chữ, bảng, ..... Do đó để lấy ra 4 cột chúng ta mong muốn có diện tích lớn hơn hẳn so với các hình khối khác nên mình sử dụng điều kiện **diện tích của contour đó phải lớn hơn 100000** (con số này tùy thuộc vào bài toán các bạn điều chỉnh cho phù hợp ). 

**Chú ý**, đôi khi cv2.findCoutours()  sẽ trả về những contour trùng nhau một phần hoặc toàn bộ, chúng có thể cùng tọa độ (xmin, ymin) nhưng (xmax, ymax) khác nhau hoặc ngược lại. Mình đã sắp xếp list contours theo chiều giảm dần diện tích và kiểm tra trùng nhau (overlap) bằng hai biến check_xy_min và check_xy_max để đảm bảo thu được những contour tốt nhất diện tích lớn nhất và không trùng nhau.

Trước khi kết thúc bước này, ta sắp xếp lại một lần nữa **4 cột ta thu được theo chiều từ trái sang phải** đảm bảo thứ  tự để tiện xử lý ở các bước sau. 
 ```python
    ans_blocks = []
    x_old, y_old, w_old, h_old = 0, 0, 0, 0

    # ensure that at least one contour was found
    if len(cnts) > 0:
        # sort the contours according to their size in descending order
        cnts = sorted(cnts, key=get_x_ver1)

        # loop over the sorted contours
        for i, c in enumerate(cnts):
            x_curr, y_curr, w_curr, h_curr = cv2.boundingRect(c)
            if w_curr * h_curr > 100000:
                # check overlap contours
                check_xy_min = x_curr * y_curr - x_old * y_old
                check_xy_max = (x_curr + w_curr) * (y_curr + h_curr) - (x_old + w_old) * (y_old + h_old)

                # if list answer box is empty
                if len(ans_blocks) == 0:
                    ans_blocks.append(
                        (gray_img[y_curr:y_curr + h_curr, x_curr:x_curr + w_curr], [x_curr, y_curr, w_curr, h_curr]))
                    # update coordinates (x, y) and (height, width) of added contours
                    x_old = x_curr
                    y_old = y_curr
                    w_old = w_curr
                    h_old = h_curr
                elif check_xy_min > 20000 and check_xy_max > 20000:
                    ans_blocks.append(
                        (gray_img[y_curr:y_curr + h_curr, x_curr:x_curr + w_curr], [x_curr, y_curr, w_curr, h_curr]))
                    # update coordinates (x, y) and (height, width) of added contours
                    x_old = x_curr
                    y_old = y_curr
                    w_old = w_curr
                    h_old = h_curr
        # sort ans_blocks according to x coordinate
        sorted_ans_blocks = sorted(ans_blocks, key=get_x)
 ```
 Kết quả sau phần này ta sẽ thu được một list chứa 4 cột đáp án đã được sắp xếp theo chiều từ trái sang phải :
 ![](https://images.viblo.asia/2d923afb-9341-42c5-be06-557b0c6a3944.png)

 ## 2.2  Từ mỗi cột đáp án lấy ra các câu hỏi
 Sau khi thu được một list 4 cột đáp án ở bước trên, ở đây ta thực hiện một vòng lặp qua list 4 cột đáp án(ans_blocks)  để có thể xử lý từng cột.
Đối với mỗi cột để thu được danh sách câu hỏi cần được xử lý qua **2 bước**:<br>
 
 * **Bước 1: Chia cột ra 6 box nhỏ**: Do 6 box này có kích thước bằng nhau nên chỉ cần lấy chiều cao của cột chia 6 ta sẽ thu được chiều cao của từng box (offset1) và dễ dàng thu được từng box như mong muốn
 * **Bước 2: Chia mỗi box ra thành 5 câu hỏi**: Ở đây ta cần để ý một chút đó là khoảng cách các cạnh trên dưới của một box và 5 câu hỏi trong box đó không cách đều nhau do đó ta không thể chia ngay được. Trong bài toán này, để giải quyết vấn đề chênh lệch đó mình thu gọn kích thước hai đầu trên dưới của 1 box bằng câu lệnh **" box_img = box_img[14:height_box-14, :]"**. Sau đó ta chia chiều cao của box cho 5 (5 ở đây là 5 câu hỏi ) ra chiều cao của một câu hỏi, từ đó lấy được từng câu hỏi.
 ```python
def process_ans_blocks(ans_blocks):
    """
        this function process 2 block answer box and return a list answer has len of 200 bubble choices
        :param ans_blocks: a list which include 2 element, each element has the format of [image, [x, y, w, h]]
    """
    list_answers = []

    # Loop over each block ans in
    for ans_block in ans_blocks:
        ans_block_img = np.array(ans_block[0])

        offset1 = ceil(ans_block_img.shape[0] / 6)
        # Loop over each box in answer block
        for i in range(6):
            box_img = np.array(ans_block_img[i * offset1:(i + 1) * offset1, :])
            height_box = box_img.shape[0]

            box_img = box_img[14:height_box-14, :]
            offset2 = ceil(box_img.shape[0] / 5)

            # loop over each line in a box
            for j in range(5):
                list_answers.append(box_img[j * offset2:(j + 1) * offset2, :])

    return list_answers
```
Kết quả chúng ta sẽ thu được từng câu hỏi của mỗi box. Ví dụ  :
<p align="center">
    <img src="https://images.viblo.asia/66ea30e2-e2cc-4a53-b6e1-69b566bd7e89.png" >
 </p>

 ## 2.3 Xử lý từng câu hỏi để lấy ra các hình tròn chứa đáp án (bubble choice)
 Sau khi thu được kết quả ở bước trên là một list các câu hỏi đã được sắp xếp, ta thực hiện xử lý để lấy ra các ô đáp án.
 Để giải quyết vấn đề này, ta có hai giải pháp :
 
 1. **Sử dụng các thuật toán phát hiện ra đường tròn để lấy trực tiếp ra các ô đáp án.**
     <br>**Ưu điểm** : Cách này không phải dùng các biến cố định để chia ô như phương pháp 2 mình sẽ giới thiệu bên dưới, ổn định trong các trường hợp cần phải align lại do nghiêng,....
     <br>**Nhược điểm :** Nếu không may chúng ta bắt thiếu mất một ô hay ta bắt nhầm thêm một dị vật có kích thước như ô (thí sinh nghịch tô vài nét trong giấy thi....) thì sẽ dẫn đến sai toàn bộ phần chấm đáp án do mất thứ tự nên không biết câu nào với câu nào.<br>
  2. **Chia cố định lấy ra từng ô đáp án**
      <br>**Ưu điểm :** Bạn sẽ thoải mái không lo mất ô đáp án nào cả vì kiểu gì bạn cũng lấy được ô đó ra nhờ chia bằng những thông số cố định
      <br>**Nhược điểm :** Tuy nhiên để chọn được ra những tọa độ cố định bạn phải mất công thử sao cho phù hợp với bài toán đầu vào của mình và kém linh hoạt hơn khi bị nghiêng lệch....(có thể khắc phục bằng cách sử dụng align image xoay thẳng lại ảnh )
      
 Do bài toán của mình đầu vào là ảnh có được bằng cách scan file pdf trực tiếp không sợ bị nghiêng lệch nên mình chọn phương án thứ 2:smiley:. **Chú ý** do ở mỗi câu hỏi ngoài các ô đáp án còn chứa số thứ tự câu như 1, 2, 3... nên để có thể chia đều để lấy ra các ô đáp án giống như các bước phía trên thì ta sử dụng hai biến : **start** để loại bỏ phần đầu câu chứa số thứ tự câu và **offset** dùng để chia đều lấy ra các ô đáp án giống cách sử dụng offset ở các bước trước nhưng khác một chỗ ở bước này áp dụng cho chiều rộng không phải chiều cao do các ô đáp án trải đều theo chiều rộng.
 
 Chúng ta cần phải lấy ngưỡng bằng cách sử dụng threshold đưa ảnh về dạng đen trắng để chỉ tập trung vào những đặc trưng cần thiết và reshape chúng thành ảnh có kích thước (28, 28, 1) phù hợp mạng CNN dùng để phân loại ở bước sau ta sử dụng. 
 
 ```python
 def process_list_ans(list_answers):
    list_choices = []
    offset = 44
    start = 32

    for answer_img in list_answers:
        for i in range(4):
            bubble_choice = answer_img[:, start + i * offset:start + (i + 1) * offset]
            bubble_choice = cv2.threshold(bubble_choice, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]

            bubble_choice = cv2.resize(bubble_choice, (28, 28), cv2.INTER_AREA)
            bubble_choice = bubble_choice.reshape((28, 28, 1))
            list_choices.append(bubble_choice)

    if len(list_choices) != 480:
        raise ValueError("Length of list_choices must be 480")
    return list_choices
```
Sau khi thực hiện được bước này ta thu được một danh sách gồm 480 ô đáp án (120 câu hỏi * 4 ô ). Các ô thu được gồm hai loại : tô và chưa tô
<p align="center">
    <img src="https://images.viblo.asia/63af3caf-276e-49b6-9775-d101270e54d7.png" >
 </p>
 
 ## 2.4  Sử dụng model CNN tiến hành phân loại đáp án đó có được tô hay không ?
 Các bạn có thể tự cắt các ô ra train lại hoặc sử dụng trực tiếp pretrained weight với model ở trong [github của mình](https://github.com/buiquangmanhhp1999/Auto-Scores-National-Multiple-Choice-Test). Đầu tiên mình khởi tạo một dictonary result để lưu giữ kết quả. Với mỗi score hay confidence score trong list scores mà model predict, nếu confidence score mà lớn hơn 0.9 thì ô đã được tô và lấy ra kết quả "A", "B", "C", "D" tương ứng bằng cách truyền số thứ tự của ô đó trong list vào **map_answer()**. Hàm này tương đối đơn giản các bạn có thể vào xem trong [github của mình](https://github.com/buiquangmanhhp1999/Auto-Scores-National-Multiple-Choice-Test) nhé:hugs:
 
 Nhờ vào việc cứ confidence score lớn hơn 0.9 thì nó sẽ là đáp án đã được tô nên cho phép xử lý một câu có nhiều hơn một đáp án. Hơn nữa các đặc trưng của các ô được tô hay không tô rất rõ nét nên trường hợp nhận nhầm xác suất rất thấp, độ chính xác của model mình train có 2, 3 epoch batch size=32 nhưng đã đạt 100% trên cả tập train và val rồi
 ```python
def get_answers(list_ans):
    results = defaultdict(list)
    model = CNN_Model('weight.h5').build_model(rt=True)
    list_ans = np.array(list_ans)
    scores = model.predict_on_batch(list_ans / 255.0)
    for idx, score in enumerate(scores):
        question = idx // 4

        # score [unchoiced_cf, choiced_cf]
        if score[1] > 0.9:      # choiced confidence score > 0.9
            chosed_answer = map_answer(idx)
            results[question+1].append(chosed_answer)

    return results
 ```
 Và tèn tén ten, hàm này sẽ trả về cho 120 câu hỏi cùng đáp án của nó. Những câu hỏi không được bất cứ ô nào được tô sẽ không được có danh sách này nhé. 
 
 ```
 defaultdict(<class 'list'>, {1: ['B'], 2: ['D'], 3: ['B', 'C'], 4: ['A'], 5: ['C'], 6: ['B'], 7: ['A'], 
 8: ['D'],   9: ['C'], 10: ['B'], 11: ['A'], 12: ['C'], 13: ['D'], 14: ['B'], 15: ['A'], 16: ['C'], 17: ['B'], 
 18: ['A'], 19: ['C'], 20: ['B'], 21: ['D'], 23: ['B'], 24: ['C'], 26: ['C'], 27: ['B'], 28: ['A'], 29: ['B'], 
 30: ['D'], 32: ['B'], 34: ['B'], 36: ['D'], 38: ['D'], 39: ['A'], 41: ['A'], 46: ['D'], 47: ['B'], 51: ['B'], 
 53: ['A'], 56: ['A'], 58: ['B'], 66: ['A'], 70: ['D'], 73: ['D']})
```

# 3. Kết luận 
Bài toán chấm điểm phiếu trắc nghiệm tuy đơn giản nhưng là một bài toán thích hợp cho những bạn nào định tập tành với OpenCV. Với cách giải quyết bài toán như trên của mình, cho phép chấm được những câu hỏi có nhiều đáp án và không lo vấn đề bị thiếu câu hay đán án so với cách sử dụng findContours. Đồng thời nó cũng nhanh hơn nhiều so với các phương pháp bằng Deep Learning thuần.Hy vọng bài viết của mình có thể giúp ích cho các bạn. Ở trên đây mình mới chỉ giới thiệu các ý chính còn chi tiết hơn về cách code bạn có thể xem tại link github [tại đây](https://github.com/buiquangmanhhp1999/Auto-Scores-National-Multiple-Choice-Test) của mình. Nhớ like and subscribe để theo dõi tiếp những bài viết của mình nhé:wink: