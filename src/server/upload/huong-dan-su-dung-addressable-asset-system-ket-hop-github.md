Chào các bạn!

Đến hẹn lại có bài, nay mình sẽ hướng dẫn các bạn sử dụng 1 thứ rất thú vị trong Unity, cái này cũng khá là mới, hi vọng có thể mang lại giải pháp tốt nhất hay ít nhất là dễ dùng nhất tới các bạn :D

Như tiêu đề mình cũng có đề cập, hôm nay mình sẽ hướng dẫn các bạn sử dụng Addressable Asset System.

Vậy Addressable Asset System là gì?

Các bạn có thể tìm hiểu giúp mình tại [đây](https://docs.unity3d.com/Packages/com.unity.addressables@0.4/manual/index.html) nhé, vì mình trình bày ra đây thì sẽ dài dòng và ko đúng trọng tâm của bài viết!

Ok, vào việc thôi!

### Bước 1: Install package Addressables.

- Các bạn mở Window -> Package Manager

![](https://images.viblo.asia/7c8006b2-1445-46f8-8fb0-be2418946f98.png)

- Tiếp theo các bạn search từ khóa "Addressables"
- Sau đó các bạn chọn nó và ấn Install.

![](https://images.viblo.asia/6cb318d9-201a-456f-b321-b15d906066a8.png)

### Bước 2: Create Group Addressables.

- Các bạn chọn Window -> Asset Management -> Addressables -> Group

![](https://images.viblo.asia/4340b2f6-7f79-4347-855a-ef3f2fcc831b.png)

- Các bạn ấn vào nút "Create Addressables Settings"

![](https://images.viblo.asia/fb34a4fc-06eb-4da1-bbd8-92922e192bfe.png)

- Chúng ta sẽ sẽ có giao diện quản lý Addressable Groups như sau:

![](https://images.viblo.asia/e6fdda66-6d3a-4469-8e12-4c474013b5c5.png)

### Bước 3: Add Addressable To Object.

- Các bạn chọn vào 1 prefab đã tạo từ trước sau đó tích vào ô Addressable trong phần Inspector:

![](https://images.viblo.asia/3963ec1c-6bfe-46cc-923b-33530b25464d.png)

- Đồng thời các bạn đặt tên (có thể kèm đường dẫn tùy ý) cho nó như hình trên mình để tạm là ABC, bạn có thể đặt là Prefabs/LogoSunNews

### Bước 4: Setting Addressable.

- Các bạn ấn vào group mình sử dụng, có thể dùng luôn cái default của nó, hoặc đổi tên nó đi, hoặc tạo mới 1 group khác để làm việc, ở đây mình đổi tên nó thành RemoteGroup.
- Tiếp theo các bạn set cho Build Path thành "RemoteBuildPath", Load Path thành "RemoteLoadPath".

![](https://images.viblo.asia/0bbdd40a-fa25-4108-9100-92e624b047e7.png)

- Các bạn ấn vào System Settings ở góc phía trên, ấn vào Manager Profiles sau đó tạo ra 1 profile với biến RemoteLoadPath chính là địa chỉ host các bạn lưu asset của mình sau này game load/update về.

![](https://images.viblo.asia/426f3521-b074-4927-b29d-65772f908234.png)

- Quay lại System Settings các bạn đổi Profile In Use qua "Development", check vào Build Remote Catalog (bắt buộc check để có thể update được sau này), ở phía dưới cũng chọn Path của cả 2 phần là remote.

![](https://images.viblo.asia/c20834a2-bb8e-4f3c-acc6-49ad27ef3137.png)

### Bước 5: Build Asset And Load.

- Ở cửa sổ Addressables Group các bạn ấn vào Build -> New Build -> Default Build Script.

![](https://images.viblo.asia/970814fd-5d5b-4023-b961-bcda56274a4c.png)

- Đợi nó build  xong các bạn vào thư mục theo đường dẫn "Project\ServerData\StandaloneWindows" (StandaloneWindows là target build của các bạn, nó có thể là android, ios...) copy tất cả các file up lên store chính là địa chỉ bạn thêm vào ở trong Profiles phía trên.

- Các bạn tạo 1 gameobject empty trên scene, rồi add 1 script đặt tên là  "AssetManager" (tên gì tùy bạn thôi mình thích thì mình đặt vậy thôi :D ) sau đó thêm đoạn script sau:

```
using UnityEngine;
using UnityEngine.AddressableAssets;

public class AssetManager : MonoBehaviour
{

    public AssetReference logoSunNews;
    // Start is called before the first frame update
    void Start()
    {
        DisplayLogoSunNews();
    }

    private void DisplayLogoSunNews()
    {
        logoSunNews.InstantiateAsync(Vector3.zero, Quaternion.identity);
    }
}
```

- Quay lại Inspector chọn vào asset mà các bạn vừa đặt tên lúc trước.

![](https://images.viblo.asia/9a8d2fd1-2201-475b-8045-d4dae4aacd2f.png)

- Build thử project ra và chạy coi có lỗi gì ko!

- LƯU Ý: Mình từng gặp 1 lỗi báo "Unknown error in AsyncOperation" thật ra gặp mấy lỗi khác nhau nó vẫn báo thế này rồi, thì các bạn cứ thử quay lại cái gameobject trên scene kia, chọn lại asset là none, rồi chọn lại asset của các bạn coi còn lỗi ko nhé!

- Chuẩn ngon lành là sau khi build và run thì nó sẽ load cái prefabs của các bạn lên 1 cách vô cùng là ngon lành ^_^

### Bước 6: Update Asset.

- Các bạn muốn update asset sau này của mình, kiểu thêm level, cập nhật UI... thì thực hiện bước này,
- Các bạn sau khi đã cập nhật mọi thứ xong rồi thì mở lại cửa sổ Addressable Group, chọn Build, chọn Update a Previous Build, chọn tới đường dẫn sau "Project\Assets\AddressableAssetsData\Windows" (Windows là target các bạn muốn build) rồi chọn file bin trong đó để ghi đè.

![](https://images.viblo.asia/5fcae0b3-8969-4fef-9ce2-b720df9b428a.png)

- Tiếp theo các bạn copy những file mới build ra trong thư mục cũ là "Project\ServerData\StandaloneWindows" (StandaloneWindows là target build của các bạn, nó có thể là android, ios...)  và lại đẩy lên host như trước.
- Như vậy là xong, vào game là sẽ thấy nó tự động update mà ko cần build lại apk, download lại apk hay bla bla gì cả.

- LƯU Ý: Nếu có bạn nào cũng thử update asset lên github như mình (chơi đồ free vì nghèo) thì cần đợi khoảng 4-5p sau khi upload game mới tải về asset mới được nhé, vì vậy nếu vào game mà vẫn thấy asset cũ thì đừng hoảng nhé! khả năng do github cache để ko bị truy cập quá nhiều! hoặc lý do gì mình cũng ko biết chỉ biết trải nghiệm nó vậy thôi =)))

Chúc các bạn thành công nhé, nghiên cứu ra cái này mình cũng thấy hay, áp dụng được khá nhiều cho những dự án sắp tới của mình ^_^