# Giới thiệu
SOLID là một bộ nguyên tắc hết sức quan trọng trong lập trình hướng đối tượng. Và đối với Swift cũng không phải là một ngoại lệ. SOLID được giới thiệu năm 2000 bởi Robert C. Martin (Uncle Bob) trong bài báo Design Principles and Design Patterns. SOLID được kết hợp từ 5 chữ cái đầu của 5 quy tắc.

1. **S**ingle Responsibility: 

Nguyên tắc này phát biểu "Mỗi class chỉ nên có một chức năng duy nhất."

- Xem xét ví dụ sau 

![](https://images.viblo.asia/8b15b5c0-e3d6-4f48-aefb-16afb4b54f26.png)


Trong ví dụ trên class AirConditioner có 4 chức năng, bật, tắt, chuyển chế độ, chỉnh tốc độ. Trong thực tế một class như vậy sẽ chứa rất nhiều chức năng. Điều này làm cho class ngày càng phình to và khó quản lí. Vì vậy, nguyên tắc này ra đời nhằm mục đích giải quyết vấn đề trên.

Quay lại ví dụ ban đầu. Ta thấy các chức năng của máy điều hoà sẽ được chia thành các nhóm sau:

  - Bật / tắt
  - Đổi chế độ
  - Đổi tốc độ

Như vậy, ta có thể tạo 3 class với 3 nhóm chức năng như sau

![](https://images.viblo.asia/d650d005-cdbb-44d0-ac9c-c62cc16136f1.png)

- Trong ví dụ trên các chức năng đã được chia nhỏ theo đúng với nguyên tắc của SOLID.

Cuối cùng trong class AirConditioner ta tạo các thực thể để sử dụng từng chức năng như sau

![](https://images.viblo.asia/5ee86ab6-2420-47b0-9d1a-f3ce74ae3c8c.png)

Như vậy, sau này việc quản lí class sẽ trở nên dễ dàng hơn do các chức năng được chia nhỏ và mỗi class thực hiện một nhiệm vụ.

2. **O**pen / close principle:

Nguyên tắc này được hiểu là các class cần phải được thiết kế phải  đối với việc mở rộng nhưng đóng đối với các thay đổi.

- Quay trở lại ví dụ cũ. Giả sử chúng ta muốn thêm vào class AirConditioner một chức năng mới là hướng gió. Nếu ta sửa lại phần code trong class cũ điều này vi phạm nguyên tắc của SOLID vì vậy ta có giải pháp như sau

![](https://images.viblo.asia/ecae761e-4ca9-4bd5-b5b6-100eacf72c0a.png)

Trong ví dụ trên, ta hoàn toàn có thể thêm vào 1 property nhưng ko cần phải sữa lại class AirConditioner bằng việc sử dụng extension.

3. **L**islov substitution principle:

Nếu S là một kiểu dữ liệu con của T. Thì thực thể của T có thể được thay thế bằng thực thể của S.

Định nghĩa này có thể hiểu nôm na là. Ta có một class con có thì phải sở hữu hoàn toàn các thuộc tính và chức năng của class cha.


Quan sát ví dụ sau: 

```
class Post
{
    void CreatePost(Database db, string postMessage)
    {
        db.Add(postMessage);
    }
}

class TagPost : Post
{
    override void CreatePost(Database db, string postMessage)
    {
        db.AddAsTag(postMessage);
    }
}

class MentionPost : Post
{
    void CreateMentionPost(Database db, string postMessage)
    {
        string user = postMessage.parseUser();

        db.NotifyUser(user);
        db.OverrideExistingMention(user, postMessage);
        base.CreatePost(db, postMessage);
    }
}

class PostHandler
{
    private database = new Database();

    void HandleNewPosts() {
        List<string> newPosts = database.getUnhandledPostsMessages();

        foreach (string postMessage in newPosts)
        {
            Post post;

            if (postMessage.StartsWith("#"))
            {
                post = new TagPost();
            }
            else if (postMessage.StartsWith("@"))
            {
                post = new MentionPost();
            }
            else {
                post = new Post();
            }

            post.CreatePost(database, postMessage);
        }
    }
}
```

Trong ví dụ trên vi phạm quy tắc Liskov của SOLID vì class MentionPost không override func CreatePost của class post. Vì vậy class MentionPost không thể thay thế cho lớp cha của nó là Post.

Vì vậy để đảm bảo tuân thủ SOLID class MentionPost bắt buộc phải kế thừa toàn bộ thuộc tính và func của class cha.

```
class MentionPost : Post
{
    override void CreatePost(Database db, string postMessage)
    {
        string user = postMessage.parseUser();

        NotifyUser(user);
        OverrideExistingMention(user, postMessage)
        base.CreatePost(db, postMessage);
    }

    private void NotifyUser(string user)
    {
        db.NotifyUser(user);
    }

    private void OverrideExistingMention(string user, string postMessage)
    {
        db.OverrideExistingMention(_user, postMessage);
    }
}
```

Như vậy, class Post có thể được thay thế hoàn toàn bằng Memtion Post

4. **I**nterface Seregration:

Nguyên tắc này phát biểu: "một client không nên bị force phụ thuộc vào một method mà nó không sử dụng"

- Quay trở lại với ví dụ máy điều hoà
![](https://images.viblo.asia/2137e276-52b4-4ca5-a5ec-bbb109ce5ca1.png)

Ta thấy 2 class CentralizedAC và SplitAC đều conform protocol ACFeature, tuy nhiên class SplitAC lại không sử dụng method getCentralizedAirConditioner(). Để giải quyết vấn để này ta phải tách method getCentralized ra khỏi protocol NewFeature như sau. 
![](https://images.viblo.asia/8f7a1207-5bdf-425e-a6c9-746d624a0126.png)

Như vậy việc tách method getCentralizedAirConditioner() ra khỏi  protocol ACFeature đã giúp cho class SplitAC không bị phụ thuộc vào method này.

4. **D**ependency Inversion:

 Các module bậc cao không nên phụ thuộc vào module bậc thấp. chúng nên phụ thuộc vào 1 lớp trừu tường.
 
 Xem xét ví dụ sau
 
 ![](https://images.viblo.asia/a2e52ca5-3bf0-40a5-bc23-7088b1ab706f.png)

Trong ví dụ trên, class CoversationData là module bậc cao, CoreDataController là module bậc thấp. Ta thấy class ConverstionData đang chưa một thực thể CoreDataController. Có thể thấy module bậc cao đã bị phụ thuộc vào module bậc thấp vì vậy sẽ gây khó khăn nếu muốn thay module CoreDataController bằng module khác. Để giải quyết ta tạo thêm một class để trừu tượng để giảm sự phụ thuộc của 2 bên.

![](https://images.viblo.asia/48e45d72-47ff-486b-a64a-8ff14a8cdff7.png)

Như vậy, thay vì chứa một thực thể CoreDataController thì class ConverstionData chỉ chứa 1 thực thể trừu tượng DataBase. Do đó sự phụ thuộc của 2 module sẽ giảm đi đáng kể. Trong trường hợp muốn thay module CoreDataController ta chỉ việc tạo một module mới và conform protocol Database

# Kết luận

SOLID là 1 bộ quy tắc tối quan trọng trong lập trình OOP nói chung và iOs nói riêng. Việc áp dụng thuần thục và tuân thủ các quy tắc này giúp source code trở nên dễ hiểu, dễ maintain.