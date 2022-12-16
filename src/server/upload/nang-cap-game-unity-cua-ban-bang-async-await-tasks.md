### Lời mở đầu
### 
Đã bao giờ bạn cảm thấy game Unity của mình chưa được "ngon" như mong đợi, khi mà các đoạn xử lý tốn nhiều thời gian gây ra tình trạng giật, treo game? Hoặc tuy chưa tình gặp tình trạng đó nhưng bạn vẫn muốn tối ưu hóa game của mình hơn nữa để mang đến cho người chơi trải nghiệm tốt nhất có thể? Nếu bạn đã từng ở trong những hoàn cảnh như vậy, xử lý bất đồng bộ có thể là câu trả lời cho bạn. 

Bằng việc sử dụng async / await / Tasks, bạn có thể đơn giản hóa những đoạn code Unity bất đồng bộ của mình đi rất nhiều.
Trong bài viết này, tôi sẽ đưa ra một vài ví dụ cho các bạn. Các ví dụ sẽ nhấn mạnh vào cách lấy data từ 2 REST API end points (users và todos). Các API sử dụng trong bài viết được cung cấp bởi [JSONplaceholder](https://jsonplaceholder.typicode.com/) 

Tất cả các ví dụ đều sử dụng module đa dụng WWW của Unity để lấy dữ liệu JSON và JsonUtility, sau đó parse nó thành một chuỗi các class.

Một khi đã lấy được data từ các endpoint, tôi sẽ thử xử lý chuỗi class chúng ta nhận được, trong trường hợp này chỉ đơn giản là in data ra sử dụng Debug.Log.

Các ví dụ sẽ có sự khác nhau về cách mà code bất đồng bộ được tổ chức.

### Coroutine

Đầu tiên chúng ta hãy nhìn qua về cách lấy data của user và todos bằng phương thức quen thuộc và có thể nói là tiêu chuẩn trong Unity, Coroutine.

*Coroutine giống như một hàm có khả năng dừng thực thi và trả lại quyền điều khiển cho Unity, sau đó lại tiếp tục thực thi tiếp ở chỗ nó đang dừng lại ở khung hình kế đó. - Tài liệu Unity*

Và dưới đây là cách chúng ta lấy data bằng Coroutine.

```
using System.Collections;
using System.Linq;
using UnityEngine;
public class DataController : MonoBehaviour
{
    readonly string USERS_URL = "https://jsonplaceholder.typicode.com/users";
    readonly string TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
IEnumerator FetchData()
    {
        Todo[] todos;
        User[] users;
        // USERS
        var www = new WWW(USERS_URL);
        yield return www;
        if (!string.IsNullOrEmpty(www.error))
        {
            Debug.Log("An error occurred");
            yield break;
        }
        var json = www.text;
        try
        {
            var userRaws = JsonHelper.getJsonArray<UserRaw>(json);
            users = userRaws.Select(userRaw => new User(userRaw)).ToArray();
        }
        catch
        {
            Debug.Log("An error occurred");
            yield break;
        }
        // TODOS
        www = new WWW(TODOS_URL);
        yield return www;
        if (!string.IsNullOrEmpty(www.error))
        {
            Debug.Log("An error occurred");
            yield break;
        }
        json = www.text;
        try
        {
            var todoRaws = JsonHelper.getJsonArray<TodoRaw>(json);
            todos = todoRaws.Select(todoRaw => new Todo(todoRaw)).ToArray();
        }
        catch
        {
            Debug.Log("An error occurred");
            yield break;
        }
        // OUTPUT
        foreach (User user in users)
        {
            Debug.Log(user.Name);
        }
        foreach (Todo todo in todos)
        {
            Debug.Log(todo.Title);
        }
    }
    void Start()
    {
        StartCoroutine(FetchData());
    }
}
```

Điểm đáng chú ý:
- Sử dụng Coroutines (và yield) làm việc xử lý các đoạn code bất đồng bộ (dùng WWW) có flow giống như những đoạn code đồng bộ bình thường.
- Mặc dù vậy, vì không thể đặt câu lệnh yield vào trong try-catch, chúng ta đã phải tạo ra một hỗn hợp phức tạp của code bất đồng bộ (www.error) và code đồng bộ (try-catch).
- Ngoài ra, vì coroutines không thể trả lại giá trị, chúng ta phải tạo ra một khối xử lý coroutine rất phức tạp (FetchData)
- Chúng ta buộc phải chồng các request lên nhau. Ví dụ như sau khi lấy xong data của users thì mới lấy đến data của todos

![](https://images.viblo.asia/82f757c8-7b37-427c-9857-643fe4da113d.png)

### Async / Await / Tasks
### 

Cách xử lý này được khởi xướng từ bài viết [Async-Await instead of coroutines in Unity 2017 ](http://www.stevevermeulen.com/index.php/2017/09/using-async-await-in-unity3d-2017/).

Để áp dụng cách xử lý này, đầu tiên chúng ta cần thay đổi scripting runtime version của project từ Menu (với Unity 2018)

*Edit > Project Settings > Player > Configuration > Scripting Runtime Version > .NET 4.x Equivalent*

Ngoài ra còn cần cài thêm 1 plugin.

*Asset Store > Async Await Support*

Cũng giống như coroutine và câu lệnh yield, async và câu lệnh await statement cho phép các method tạm dừng, chờ kết quả từ hàm bất đồng bộ, sau đó chạy tiếp. Nhưng điểm khác biệt mấu chốt nằm ở việc các method async có thể trả lại data.

**Lưu ý**: Nếu các bạn đã có kinh nghiệm với JavaScript thì có thể hiểu các xử lý này giống như là async / await / Promises của JavaScript; với Tasks đóng vai trò của Promises.

```
using System;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;
public class DataAsyncController : MonoBehaviour
{
    readonly string USERS_URL = "https://jsonplaceholder.typicode.com/users";
    readonly string TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
    async Task<User[]> FetchUsers()
    {
        var www = await new WWW(USERS_URL);
        if (!string.IsNullOrEmpty(www.error))
        {
            throw new Exception();
        }
        var json = www.text;
        var userRaws = JsonHelper.getJsonArray<UserRaw>(json);
        return userRaws.Select(userRaw => new User(userRaw)).ToArray();
    }
    async Task<Todo[]> FetchTodos()
    {
        var www = await new WWW(TODOS_URL);
        if (!string.IsNullOrEmpty(www.error))
        {
            throw new Exception();
        }
        var json = www.text;
        var todosRaws = JsonHelper.getJsonArray<TodoRaw>(json);
        return todosRaws.Select(todoRaw => new Todo(todoRaw)).ToArray();
    }
    async void Start()
    {
        try
        {
            var users = await FetchUsers();
            var todos = await FetchTodos();
            foreach (User user in users)
            {
                Debug.Log(user.Name);
            }
            foreach (Todo todo in todos)
            {
                Debug.Log(todo.Title);
            }
        }
        catch
        {
            Debug.Log("An error occurred");
        }
    }
}
```
Điểm đáng chú ý:
- Vì method async có trả lại data, chúng ta chia nhỏ các đoạn code để lấy dữ liệu users và todos thành các hàm FetchUsers và FetchTodos.
- Ngoài việc trả lại data, method async còn trả lại error qua task được trả lại. Điều này cho phép chúng ta tập trung vào việc xử lý lỗi bằng một hàm try-catch.
- Giống như ví dụ trước, ví dụ này cũng stack những hàm lấy data.

### Task.WhenAll
### 

Class task có một vài method đa dụng để kiểm soát các Task, cụ thể là method WhenAll trả về một Task mới khi tất cả các task trong chuỗi task đã được hoàn thành.

Chỉ cần thay đổi một chút ở đoạn code phía trên là chúng ta đã có thể lấy data của users và todos một cách đồng thời.

![](https://images.viblo.asia/15a5256a-e68f-41eb-a03b-61b738915615.png)

```
...
try
{
    var usersTask = FetchUsers();
    var todosTask = FetchTodos();
    await Task.WhenAll(usersTask, todosTask);
    var users = await usersTask;
    var todos = await todosTask;
...
```

### Kết luận 

Sử dụng các tính năng async / await / Task của C# async / await / Task sẽ đơn giản hóa việc viết code bất đồng bộ trong Unity rất nhiều. Đặc biệt là cách xử lý này cũng có khá nhiều điểm tương đồng với JavaScript nên sẽ rất dễ tiếp cận, nhất là với những người đã có kinh nghiệm về JavaScript.

Hi vọng bài viết của tôi đã giúp các bạn hiểu rõ hơn một chút về những cách xử lý bất đồng bộ trong C# nói chung và Unity nói riêng. Xin cảm ơn các bạn đã theo dõi và hẹn gặp lại các bạn vào bài viết sau!