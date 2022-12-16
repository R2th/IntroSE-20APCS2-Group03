Chào các bạn,

Tối ưu code luôn là yêu cầu của bất cứ game hay ứng dụng nào, và đặc biệt khi phát triển game cho mobile thì lại càng cần tối ưu hơn cả, bởi cấu hình của mobile là hạn chế hơn rất nhiều so với các nền tảng khác.

Chúng ta sẽ cùng tìm hiểu xem chúng ta có thể tối ưu code để giúp game chạy nhanh hơn được không nhé!

Trong bài viết này, chúng ta sẽ tìm hiểu làm sao để làm game chạy nhanh hơn bằng cách hiểu về Array, List, Dictionary nhé ;)

Sở dĩ chúng ta tìm hiểu về 3 kiểu dữ liệu này vì nó rất phổ biến trong việc quản lý một nhóm đối tượng trong game của mỗi chúng ta. Thông thường để quản lý một nhóm đối tượng chúng ta sẽ có 2 cách:
 + Tạo 1 mảng của đối tượng.
 + Tạo danh sách đối tượng nằm trong 1 list/Dictionary.

Mỗi cách dùng đều có ưu nhược điểm của nó, và cách sử dụng tùy thuộc vào cách chúng ta dùng chúng.

Bây giờ chúng ta sẽ cùng đi vào chi tiết xem trong các thử nghiệm và kết quả thì nó thế nào nhé!

Bước 1: Tạo 1 Scene mới trong Unity
 Việc này đảm bảo không có bất cứ thứ gì hoạt động khác ảnh hưởng tới kết quả bài test của chúng ta.
 
 Bước 2: Tạo tập lệnh và đặt tên là GenericCollectionsTest với nội dung như sau:
 
 - Chú ý: các bạn tạo xong cần add scripts này vào 1 object trên scene, ví dụ như Main Camera.
 
 ```
    public class GenericCollectionsTest : MonoBehaviour
    {
        #region PUBLIC_DECLARATIONS
        public int numberOfIterations = 10000000;
        #endregion
        #region PRIVATE_DECLARATIONS
        private Stopwatch stopWatch;

        private List<int> intList;
        private Dictionary<int,int> intDictionary;
        private int[] intArray;
        #endregion
        #region UNITY_CALLBACKS
        void Start()
        {
            stopWatch = new Stopwatch();
            intArray = new int[numberOfIterations];
            intList = new List<int>();
            intDictionary = new Dictionary<int, int>();
            AddFakeValuesInArray(numberOfIterations);
            AddFakeValuesInList(numberOfIterations);
            AddFakeValuesInDictionay(numberOfIterations);
        }
        void Update()
        {
            
        }
        #endregion
        #region PRIVATE_METHODS
        private void AddFakeValuesInArray(int iterations)
        {
            for (int i = 0; i < iterations; i++)
            {
                intArray[i] = Random.Range(0, 100);
            }
        }
        private void AddFakeValuesInList(int iterations)
        {
            for (int i = 0; i < iterations; i++)
            {
                intList.Add(Random.Range(0, 100));
            }
            intList[iterations - 1] = 111;
        }
        private void AddFakeValuesInDictionay(int iterations)
        {
            for (int i = 0; i < iterations; i++)
            {
                intDictionary.Add(i, Random.Range(0, 100));
            }
            intDictionary[iterations - 1] = 111;
        }
        private void SearchInList(int value)
        {
            #region FIND_IN_LIST
            stopWatch.Start();
            int index = intList.FindIndex(item => item == value);
            stopWatch.Stop();
            UnityEngine.Debug.Log("Index " + index);
            UnityEngine.Debug.Log(“Time Taken to Find in List  ”+stopWatch.ElapsedMilliseconds+” ms”);
            stopWatch.Reset();
            #endregion
            #region CHECK_IF_CONTAINS_VALUE_IN_LIST
            stopWatch.Start();
            bool containsValue = intList.Contains(value);
            stopWatch.Stop();
            UnityEngine.Debug.Log(containsValue);
            UnityEngine.Debug.Log(“Time Taken To Check in List ”+stopWatch.ElapsedMilliseconds+” ms”);
            stopWatch.Reset();
            #endregion
        }
        private void SearchInDictionary(int key)
        {
            #region FIND_IN_DICTIONARY_USING_REQUIRED_KEY
            stopWatch.Start();
            int value = intDictionary[key];
            stopWatch.Stop();
            UnityEngine.Debug.Log(“Time Taken to Find in Dictionary   ”+stopWatch.ElapsedMilliseconds+” ms”);
            stopWatch.Reset();
            #endregion
            #region CHECK_IF_DICTIONARY_CONTAINS_VALUE
            stopWatch.Start();
            bool containsKey = intDictionary.ContainsKey(key);
            stopWatch.Stop();
            UnityEngine.Debug.Log(containsKey);
            UnityEngine.Debug.Log("Time taken to check if it contains key in Dictionary" + stopWatch.ElapsedMilliseconds+ “ ms”);
            stopWatch.Reset();
            #endregion
        }
        private void PerformTest()
        {

            #region ARRAY_ITERATION
            stopWatch.Start();
            for (int i = 0; i < intArray.Length; i++)
            {
            }
            stopWatch.Stop();
            UnityEngine.Debug.Log(“Time Taken By Array ”+stopWatch.ElapsedMilliseconds+ ”ms”);
            stopWatch.Reset();
            #endregion
            #region LIST_ITERATION
            stopWatch.Start();
            for (int i = 0; i < intList.Count; i++)
            {
            }
            stopWatch.Stop();
            UnityEngine.Debug.Log(“Time Taken By List ”+stopWatch.ElapsedMilliseconds+ ”ms”);
            stopWatch.Reset();
            #endregion
            #region LIST_ITERATION_BY_FOREACH_LOOP
            stopWatch.Start();
            foreach (var item in intList)
            {

            }
            stopWatch.Stop();
            UnityEngine.Debug.Log(“Time Taken By List Using foreach  ”+stopWatch.ElapsedMilliseconds+ ”ms”);
            stopWatch.Reset();
            #endregion
            #region DICTIONARY_ITERATIOn_LOOP
            stopWatch.Start();
            foreach (var key in intDictionary.Keys)
            {
            }
            stopWatch.Stop();
            UnityEngine.Debug.Log(“Time Taken By Dictionary ”+stopWatch.ElapsedMilliseconds+ ”ms”);
            stopWatch.Reset();
            #endregion
        }
        #endregion
    }
```

Bước 3: Chạy thử nghiệm và xem kết quả hiển thị.

- Các bạn để ý khi chúng ta play thì không thấy console in ra cái gì, bởi chúng ta thực tế mới chỉ tạo ra các list chứ chưa có bất cứ hàm test nào được chạy. để có thể bắt đầu test các bạn hãy sửa Start() như sau nhé:

```
    void Start()
        {
            stopWatch = new Stopwatch();
            intArray = new int[numberOfIterations];
            intList = new List<int>();
            intDictionary = new Dictionary<int, int>();
            AddFakeValuesInArray(numberOfIterations);
            AddFakeValuesInList(numberOfIterations);
            AddFakeValuesInDictionay(numberOfIterations);
            PerformTest();
        }
```

- Bây giờ các bạn ấn play trên Unity để chương trình bắt đầu chạy.
- Kết quả hiện ra như sau:

![](https://images.viblo.asia/08b585d1-0707-40d2-b153-bfb691c4731d.PNG)

=> Kết quả trên cho chúng ta thấy rằng:

- Tốc độ duyệt qua các phần tử của Array là nhanh nhất, tiếp đó là List, và Dictionary là mất nhiều thời gian nhất (gấp hơn 12 lần Array).
- Tốc độ duyệt các phần tử bằng hàm for sẽ nhanh hơn sử dụng foreach (gấp gần 3 lần for).
- Việc sử dụng Array trong những hoàn cảnh cần duyệt qua tất cả các phần tử sẽ là giải pháp nhanh nhất.

Bước 4: Phân tích.

- Như kết quả ở bước 3, cơ bản chúng ta có thể thấy việc dùng Dictionary sẽ khiến chúng ta mất nhiều thời gian hơn Array tới 12 lần.
 => Vậy câu hỏi đặt ra là: Chúng ta sẽ luôn sử dụng Array và không sử dụng List/Dictionary nữa? Không, cái gì sinh ra cũng có lý do của nó, vậy chúng ta hãy cùng phân tích thêm 1 vài trường hợp sau nhé.
 
 - Trường hợp 1: Khi số đối tượng trong trò chơi không có sự thay đổi suốt từ khi bắt đầu tới khi kết thúc trò chơi:
 + Trường hợp này quả nhiên việc sử dụng Array không hề gặp trở ngại gì, điều đó tái khẳng định Array là số 1 và không cần tới List và Dictionary nữa ;)
 + Array được khai báo số lượng bộ nhớ cố định vì vậy sẽ không chiếm bộ nhớ nhiều như List và Dictionary (có khả năng mở rộng không giới hạn)

- Trường hợp 2: Khi số lượng đối tượng trong trò chơi liên tục thay đổi từ khi bắt đầu tới khi kết thúc trò chơi:
+ Với trường hợp này nếu số lượng đối tượng nhỏ hơn việc khai báo Array ngay từ đầu thì không sao, nhưng nếu chúng ta lạm dụng việc khai báo thì khi khai báo số lượng lớn mà không dùng hết sẽ hao tổn tài nguyên bộ nhớ hơn List và Dictionary rất nhiều.
+ Việc sử dụng List hay Dictionary trong trường hợp này sẽ giúp chúng ta linh động được số lượng đối tượng cần quản lý một cách nhanh nhất.

=> Vậy với trường hợp 2 việc sử dụng Array sẽ vô cùng khó khăn và bất tiện, việc tối ưu chưa hẳn là đạt hiệu quả, trường hợp này chúng ta sử dụng List và Dictionary sẽ nhanh và hiệu quả hơn. Thế nhưng trong kết quả test ở trên thì List lại nhanh hơn Dictionary tới 6 lần. Vậy nếu ko dùng Array thì trường hợp còn lại ta dùng List, thì Dictionary sinh ra để làm cảnh ? Chúng ta hãy đến với bước chạy thử tiếp theo nhé ;)

Bước 5: Chạy thử nghiệm khả năng tìm kiếm của List và Dictionary và xem kết quả:

- Các bạn hãy sửa lại hàm Start() như sau:

```
    void Start()
        {
            stopWatch = new Stopwatch();
            intArray = new int[numberOfIterations];
            intList = new List<int>();
            intDictionary = new Dictionary<int, int>();
            AddFakeValuesInArray(numberOfIterations);
            AddFakeValuesInList(numberOfIterations);
            AddFakeValuesInDictionay(numberOfIterations);
            SearchInList(111);
            SearchInDictionary(numberOfIterations - 1);
        }
```

- Bây giờ các bạn ấn play trên Unity để chương trình bắt đầu chạy.
- Kết quả hiện ra như sau:

![](https://images.viblo.asia/9866a234-e952-41ae-826e-c425376f37c2.PNG)

=> Kết quả trên cho chúng ta thấy rằng:

- WTH? List mất tới 121 ms cho việc tìm kiếm và 170 ms cho việc kiểm tra sự tồn tại của đối tượng cần tìm trong khi Dictionary chỉ mất tới 0 ms :open_mouth: 
- Dictionary dường như sinh ra là để tìm kiếm, nó thật sự là 0 ms :open_mouth: 

Bước 6: Kết luận.
Qua các kết luận trên thì Array cũng cần dùng, List cũng cần dùng, Dictionary cũng cần dùng, vậy thì cần gì bài viết này nữa??? =))))

Không nhé, chúng ta cần cả 3, vì nó sinh ra để dùng mà, nhưng hãy sử dụng khôn ngoan để có thể tối ưu game nhanh hơn (tối đa 12 lần :v:) và dựa vào bài viết này chúng ta sẽ rút ra 3 trường hợp sử dụng tối ưu nhất cho chúng như sau:

- Chỉ sử dụng Array khi chúng ta có số lượng đối tượng giữ nguyên và không có hành động tìm kiếm nào diễn ra nhiều lần. (giúp game nhanh gấp 12 lần nha =)) )
- Nếu danh sách đối tượng có sự thay đổi nhiều và việc tìm kiếm chỉ là phụ không diễn ra nhiều thì tối ưu nhất trong trường hợp này là sử dụng List, nó sẽ giúp các bạn có tốc độ game nhanh hơn khi dùng Dictionary tối đa 6 lần ;)
- Lấy ra ngay lập tức đối tượng, ít có sự thay đổi trong các đối tượng thì Dictionary sẽ là lựa chọn số 1 vì nó nhanh hơn tốc độ anh sáng so với dùng các cách khác nhé :wow:

Qua bài viết này thật sự chính mình cũng rút ra được những kinh nghiệm và bài học để tối ưu game sau này, hi vọng các bạn cũng vậy! ^_^

Bài viết có sự tham khảo từ [theappguruz](http://www.theappguruz.com/blog)