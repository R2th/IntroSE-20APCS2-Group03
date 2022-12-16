Hi anh em,

Hôm nay mình sẽ giới thiệu về 1 số lớp thuộc Collection trong C# như **ArrayList, Hashtable, SortedList, Stack, Queue, List**,... Các thuộc tính và phương thức phổ biến và ví dụ về cách sử dụng chúng.


### 1. ArrayList

Là một lớp thuộc collection dùng để lưu trữ một mảng, truy xuất phần tử qua index giống như mảng,tuy nhiên tiện lợi hơn mảng do có hỗ trợ các phương thức thêm, xóa, sửa phần tử... và thay đổi kích thước mảng.


1 số thuộc tính và phương thức của ArrayList
- **Count**: Trả về số phần tử hiện có của ArrayList
- **Add(Object):** Thêm một phần tử vào cuối ArrayList
- **AddRange(ICollection)**: Thêm danh sách phần tử vào cuối ArrayList
-   **Clone()**: tạo bản sao cho ArrayList
-   **Insert(int Index, object Value)**: Thêm một phần tử vào vị trí index
-   **Remove(object Value)**: Xóa phần tử  đầu tiên xuất hiện trong ArrayList


Ngoài ra còn rất nhiều phương thức khác, các bạn có thể tham khảo ở:
https://docs.microsoft.com/en-us/dotnet/api/system.collections.arraylist?view=net-6.0

Ví dụ:
```js
            ArrayList arrayList1 = new ArrayList();
            ArrayList arrayList2 = new ArrayList();

            arrayList1.Add("Item 1");
            arrayList1.Add("Item 2");
            arrayList1.Add("Item 3");
            arrayList1.Add("Item 4"); //Item 1, Item 2, Item 3, Item 4
            arrayList2.Add("Item ArrayList 2"); //Item ArrayList 2
            arrayList1.AddRange(arrayList2); // Item 1, Item 2, Item 3, Item 4, Item ArrayList 2
            arrayList1.Insert(2, "New Item"); // Item 1, Item 2, "New Item" ,Item 3, Item 4, Item ArrayList 2
            for (var i = 0; i < arrayList1.Count; i++)
            {
                Console.WriteLine(arrayList1[i]);
            }
```

### 2. HashTable

Là một lớp thuộc collection trong c#, lưu trữ tập dữ liệu với mỗi phần tử là một cặp key-value. Có thể truy xuất các phần tử qua key. HashTable hỗ trợ tìm kiếm phần tử qua key rất nhanh, có thể ứng dụng để lưu trữ dữ liệu từ điển...

**Lưu ý:** Mỗi phần tử trong Hashtable có kiểu là DictionaryEntry,
Khi thêm mới một phần tử vào Hastable thì danh sách sẽ tự sắp xếp theo thuật toán Hashtable để tìm kiếm nhanh hơn, chứ không thêm vào cuối như ArrayList.

Một số thuộc tính và phương thức phổ biến trong HashTable:

- **Count**: Số lượng phần tử hiện có trong Hashtable.
- **Keys**: Danh sách các key của phần tử trong Hashtable.
- **Values**: Danh sách các value của phần tử trong Hashtable.
- **Add(Object, Object)**: Thêm một phần tử với cặp key-value vào Hashtable.
- **Remove(Object)**: Xóa một phần tử có key xuất hiện đầu tiên.
-  **Clone()**: Tạo một bản sao từ Hashtable
-  **ContainsKey(Object)**: Kiểm tra key có tồn tại trong danh sách key của Hashtable hay không.
-  **ContainsValue(Object)**: Kiểm tra value có tồn tại trong danh sách value của Hashtable hay không.

Ngoài ra còn rất nhiều phương thức khác, các bạn có thể tham khảo ở:
https://docs.microsoft.com/en-us/dotnet/api/system.collections.hashtable?view=net-6.0

Ví dụ:
```js
            Hashtable hashtable = new Hashtable();
            hashtable.Add("Key1", "Value1");
            hashtable.Add("Key2", "Value2");

            Console.WriteLine(hashtable["Key1"]);

            foreach(DictionaryEntry item in hashtable)
            {
                Console.WriteLine("Key: {0} - Value: {1}", item.Key, item.Value);
            }

            foreach (var key in hashtable.Keys)
            {
                Console.WriteLine("Key: {0} ", key);
            }
```

### 3. SortedList

Là một collection lưu trữ dữ liệu dưới dạng key-value. SortedList là sự kết hợp giữa ArrayList và Hashtable. Các phần tử được sắp xếp theo key. Có thể truy xuất phần tử qua key giống Hashtable và qua index giống ArrayList.

Một số thuộc tính và phương thức:
- **Count**: Trả về số phần tử hiện có trong SortedList.
- **Keys**: Trả về danh sách key trong SortedList.
- **Values**: Trả về danh sách value trong SortedList.
- **Add(Object, Object)**: Thêm một phần tử với key-value vào SortedList.
- **GetByIndex(Int32)**: Trả về giá trị phần tử tại vị trí index.
- **SetByIndex(Int32, Object)**: Thay thế giá trị cho phần tử tại vị trí index.
- **ContainsKey(Object)**: Kiểm tra key có tồn tại trong SortedList hay không.
- **ContainsValue(Object)**: Kiểm tra value có tồn tại trong SortedList hay không.
- **Clone()**: Tạo ra một bản sao của SortedList.

Ngoài ra còn rất nhiều phương thức khác, các bạn có thể tham khảo ở:
https://docs.microsoft.com/en-us/dotnet/api/system.collections.sortedlist?view=net-6.0

Ví dụ:
```js
            SortedList mySL = new SortedList();
            mySL.Add("Third", "!");
            mySL.Add("Second", "World");
            mySL.Add("First", "Hello");

            // Displays the properties and values of the SortedList.
            Console.WriteLine("mySL");
            Console.WriteLine("  Count:    {0}", mySL.Count);
            Console.WriteLine("  Capacity: {0}", mySL.Capacity);
            Console.WriteLine("  Keys and Values:");

            Console.WriteLine("\t-KEY-\t-VALUE-");
            for (int i = 0; i < mySL.Count; i++)
            {
                Console.WriteLine("\t{0}:\t{1}", mySL.GetKey(i), mySL.GetByIndex(i));
            }
```

Như ở ví dụ trên mình lấy ở trang document của Microsoft thì khi ta insert 3 phần tử với Key lần lược là Third, Second và First thì SortedList sẽ tự động sắp xếp lại theo key và kết quả sau sắp xếp với thứ tự là:
First, Second, Third.

### 4. Stack - Ngăn xếp

Stack hay còn gọi là ngăn xếp là một cấu trúc dữ liệu hoạt động theo nguyên lý **LIFO** (Last in first out). Nghĩa là phần tử vào sau cũng sẽ được sắp lên trên, khi lấy ra sẽ lấy phần tử trên cùng ra.

![image.png](https://images.viblo.asia/36dfe7bb-293e-4fba-9dc8-a7ca6add4005.png)

**Lưu ý:** Không giống như Array, ArrayList hay SortedList ta không thể truy cập phần tử qua vị trí index. Ta dùng phương thức **Push** để thêm phần tử vào stack, dùng phương thức **Pop** để lấy phần tử được thêm vào cuối cùng ra khỏi stack.

Một số thuộc tính và phương thức:
- **Count:** Số phần tử hiện có trong stack.
- **Push(Object)**: Thêm một phần tử vào trí trên cùng của stack.
- **Pop()**: trả về phần tử được thêm vào cuối cùng và xóa phân tử đó khỏi stack.
- **Peek()**: trả về phần tử được thêm vào cuối cùng nhưng không xóa phần tử đó khỏi stack.
- **Contains(Object)**: Kiểm tra đối tượng có tồn tại trong stack không.

Ngoài ra còn rất nhiều phương thức khác, các bạn có thể tham khảo ở:
https://docs.microsoft.com/en-us/dotnet/api/system.collections.stack?view=net-6.0

Ví dụ:

```js
            // Creates and initializes a new Stack.
            Stack myStack = new Stack();
            myStack.Push("Hello");
            myStack.Push("World");
            myStack.Push("!");

            // Displays the properties and values of the Stack.
            Console.WriteLine("myStack");
            Console.WriteLine("\tCount:    {0}", myStack.Count);
            Console.Write("\tValues:");
            foreach (Object obj in myStack)
                Console.Write("    {0}", obj);

            //Count: 3
            //Values: !World    Hello
```

### 5. Queue - Hàng đợi

Là cấu trúc dữ liệu hoạt động theo nguyên lý **FIFO** (First In First Out). Nghĩa là phần tử được thêm vào đầu tiên sẽ được lấy ra đầu tiên. Queue được gọi là hàng đợi vì cách hoạt động của nó giống việc đợi xếp hàng, ai đến trước thì được ưu tiên ra trước.

![image.png](https://images.viblo.asia/cc2b6d09-1b49-443a-9729-05db0690ad26.png)

Một số thuộc tính và phương thức:
- **Count:** Số phần tử hiện có trong Queue.
- **Enqueue(Object)**: Thêm một phần tử vào cuối Queue.
- **Dequeue()**: trả về phần tử đầu tiên và xóa phân tử đó khỏi Queue.
- **Peek()**: trả về phần tử đầu tiên nhưng không xóa phần tử đó khỏi Queue.
- **Contains(Object)**: Kiểm tra đối tượng có tồn tại trong Queue không.

Ngoài ra còn rất nhiều phương thức khác, các bạn có thể tham khảo ở:
https://docs.microsoft.com/en-us/dotnet/api/system.collections.queue?view=net-6.0

Ví dụ:
```js
            // Creates and initializes a new Queue.
            Queue myQ = new Queue();
            myQ.Enqueue("Hello");
            myQ.Enqueue("World");
            myQ.Enqueue("!");

            // Displays the properties and values of the Queue.
            Console.WriteLine("myQ");
            Console.WriteLine("\tCount:    {0}", myQ.Count);
            Console.Write("\tValues:");
            foreach (Object obj in myQ)
                Console.Write("    {0}", obj);

            /*
            This code produces the following output.

            myQ
                Count:    3
                Values:    Hello    World    !
            */
```


### 6. List

- List là một Generic collection giúp lưu trữ và quản lý mảng. Có thể truy xuất các phần tử của mảng qua vị trí index. List tương tự như ArrayList nhưng cải tiến hơn và Micrsoft khuyến khích sử dụng List hơn ArrayList.

- Các phương thức và thuộc tính của List:
https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-6.0


- Sử dụng List an toàn hơn ArrayList bởi vì List lưu trữ một danh sách các phần tử với kiểu cố định, không như ArrayList lưu trữ danh sách object đôi khi biên dịch không xảy ra lỗi nhưng lúc thực thi sẽ xảy ra lỗi nếu các phần tử có nhiều kiểu dữ liệu khác nhau.

Ví dụ: Nếu sử dụng ArrayList trường hợp dưới sẽ không gặp lỗi khi biên dịch nhưng lúc thực thi thì sẽ xảy ra lỗi. Không an toàn khi sử dụng.

Tham khảo: https://stackoverflow.com/questions/2309694/arraylist-vs-list-in-c-sharp
```js 
ArrayList array1 = new ArrayList();
array1.Add(1);
array1.Add("Pony"); //No error at compile process
int total = 0;
foreach (int num in array1)
{
 total += num; //-->Runtime Error
}
```
```js
List<int> list1 = new List<int>();
list1.Add(1);
//list1.Add("Pony"); //<-- Error at compile process
int total = 0;
foreach (int num in list1 )
{
 total += num;
}
```

- Một số so sánh về ArrayList và List:


| ArrayList  | List | 
| -------- | -------- |
| ArrayList không phải là Generic collection     | List là Generic collection     | 
| Có thể lưu trữ bất kỳ kiểu dữ liệu nào trong nó     | List chỉ lưu trữ kiểu dữ liệu cụ thể T     | 
| Boxing và unboxing xảy ra     | Không xảy ra boxing và unboxing     | 
| Không phải kiểu dữ liệu an toàn     | Kiểu dữ liệu an toàn hơn     | 



**Tham khảo:**

https://vietjack.com/cau-truc-du-lieu-va-giai-thuat/cau-truc-du-lieu-ngan-xep.jsp

https://docs.microsoft.com/en-us/dotnet/api/system.collections.arraylist?view=net-6.0

https://docs.microsoft.com/en-us/dotnet/api/system.collections.sortedlist?view=net-6.0

https://stackoverflow.com/questions/2309694/arraylist-vs-list-in-c-sharp


https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-6.0