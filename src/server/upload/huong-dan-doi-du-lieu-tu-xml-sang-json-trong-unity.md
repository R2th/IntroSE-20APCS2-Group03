![](https://images.viblo.asia/7c24888b-ffac-4d2a-b8a5-7c88891fc1e6.png)

Chào các bạn!

Như tiêu đề, mình sẽ hướng dẫn các bạn convert dữ liệu từ XML sang JSON nhé! Bài toán liên quan tới dữ liệu đầu vào khách hàng cấp cho mình, tuy nhiên việc quản lý và lưu trữ xml gặp nhiều khó khăn, do đó chúng ta sẽ convert nó qua json cho dễ chơi nhé! ;)

Ok! vào việc thôi!

### Bước 1: Import XML.
- Các bạn kiếm 1 file XML bất kì trên mạng, kiếm cái nào cơ bản hoặc cái nào ít data chút cho dễ thực hành nhé, thuần thục rồi thì gì cũng chơi được :v.
- Các bạn kéo nó vào trong dự án Unity của mình, dự án mới tạo cũng được cho dễ nhìn.
- Các bạn đặt nó trong thư mục "Assets/Resources/XML/data.txt" (đuôi txt hay đuôi xml không quan trọng, mình để txt để open nó đỡ mở ra cái brower thôi)

XML mẫu các bạn có thể dùng tạm trong bài này:

```
<?xml version=”1.0″ encoding=”UTF-8″ standalone=”yes”?>

<chapter_1 xmlns:xsi=”http://www.w3.org/2001/XMLSchema-instance”>

<page number = “1”>

<name>Mark</name>

<dialogue>This is a test!</dialogue>

</page>

<page number = “2”>

<name>Tony</name>

<dialogue>This is a second test.</dialogue>

</page>

<page number = “3”>

<name>Carol</name>

<dialogue>This is a third test.</dialogue>

</page>

<page number = “4”>

<name>Kristie</name>

<dialogue>This is a fourth test.</dialogue>

</page>

<page number = “5”>

<name>Jeff</name>

<dialogue>This is a fifth test.</dialogue>

</page>

<page number = “6”>

<name>Frank</name>

<dialogue>This is a sixth test.</dialogue>

</page> </chapter_1>

```

### Bước 2: Create Script DataGame.cs
- Các bạn tạo 1 file có tên là DataGame.cs trong Unity.
- Nhiệm vụ của file này là sẽ đọc dữ liệu từ file XML bên trên, sau đó lưu giá trị của nó lại dạng object, rồi chúng ta convert từ object qua json, cuối cùng là lưu nó xuống thành file.

### Bước 3: Add Component.
- Các bạn Add cái DataGame.cs bên trên vào 1 object trên scene bất kì, ví dụ như Camera, việc này giúp cho nó được chạy khi chúng ta ấn play game.
- Nếu script này không được chạy quá trình convert sẽ không thể thực hiện.

### Bước 4: Read XML.
- Các bạn mở file DataGame.cs sau đó viết code như sau:

```

XDocument xmlDoc;
IEnumerable<XElement> items;
void LoadXML()
    {
        xmlDoc = XDocument.Load("Assets/Resources/XML/data.txt");
        // Chúng ta sẽ lấy ra những phần tử con bên trong của chapter_1.
        items = xmlDoc.Descendants("chapter_1").Elements();
        //Debug.Log(items.Count());
    }
```
- Như vậy là ta đã có được dữ liệu ta cần, tuy nhiên nó vẫn đang ở dạng xml.

### Bước 5: Define Object.
- Như các bạn cũng thấy ở trên, chúng  ta có dữ liệu bên trong chapter là các page, bên trong page có number, có name, có dialogue.
- Vậy chúng ta sẽ khai báo 2 class để định nghĩa object như sau:

```
[Serializable]
public class ChapterData
{
    public List<PageData> pages = new List<PageData>();
}

[Serializable]
public class PageData
{
    public int number
    public string name;
    public string dialogue;
}
```

- Sau đó các bạn khai báo ChapterData bên trong DataGame như sau:
```
ChapterData chapterData = new ChapterData();
```

### Bước 6: Convert XML to Object.
- Bước này các bạn sẽ chuyển đổi dữ liệu từ XML vào trong Object.
- Các bạn viết code như sau:

```
void ConvertXMLToObject() 
{

foreach(var pageXml in items) // Đọc từng page trong dữ liệu xml bên trên.
{
    PageData page = new PageData() //Tạo ra 1 object page chưa có giá trị.
    page.number = int.Parse(pageXml.Attribute("number").Value);
    page.name = pageXml.Element("name").Value;
    page.dialogue = pageXml.Element("dialogue").Value;
    chapterData.pages.add(page);
}

}
```

### Bước 7: Convert Object to Json and save to file.
- Các bạn viết code như sau:

```
void ConvertObjectToJsonAndSave() 
{
    string chapterDataJson = JsonUtility.ToJson(chapterData);
    System.IO.File.WriteAllText(Application.persistentDataPath + "/ChapterDataJson.json", chapterDataJson);
}
```

Như vậy là các bạn đã convert thành công từ file XML qua file Json, ngoài ra các bạn cũng đã khai báo thành công object trong Unity, việc còn lại sau này là gọi file json lên và sử dụng bình thường mà không cần tới file XML nữa!

Chúc các bạn thành công nhé! ^_^