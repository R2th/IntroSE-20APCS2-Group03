Nói về Google Cloud Platform, thì trên internet có rất nhiều bài viết giới thiệu tổng quan cũng như chi tiết về GCP. Nên ở bài viết này, mình sẽ chỉ chia sẻ về các kiến thức mà bản thân đánh giá là quan trọng, cần nắm được khi thực hiện develop trên GCP. Tổng quan về GCP, và các chức năng của nó có thể tóm gón trong image bên dưới

![](https://images.viblo.asia/5cadeba9-652e-40e9-9b39-704b1bd32b50.png)

# Về FileStore

## Cấu trúc data

Hình dung về cấu trúc data của FileStore đơn giản như bên dưới

![](https://images.viblo.asia/0256582f-7265-4bf5-991a-59900ff2d115.png)

Cụ thể hơn 1 chút, sẽ là như thế này

![](https://images.viblo.asia/25999e80-4587-4044-9168-1b0150f266bf.png)

Data bên trong Document sẽ lưu kiểu tương tự như JSON

![](https://images.viblo.asia/12c9f7f9-c9ad-4cb0-a55a-4561086546b5.png)

Ở version trước của FileStore (RealtimeDatabase) thì vẫn chưa có khái niệm SubCollection. Nhưng ở Cloud FileStore thì đã có thể setup được SubCollection, giúp cho cấu trúc data có thể đối ứng được với những yêu cầu phức tạp hơn rất nhiều

SubCollection : bên trong database của Cloud Firestore thì có nhiều Collection, và bên trong các Collection đó ta cũng có thể cấu trúc cho bao gồm các Document mà có SubCollection bên trong Document đó được

![](https://images.viblo.asia/8af15dd1-edf2-4392-ac0e-a042ac55b93f.jpg)

Firebase Console thực tế

![](https://images.viblo.asia/7ff89b11-43ee-41a9-86f4-da7a14b62755.png)

Cách tham chiếu data

![](https://images.viblo.asia/2d71180a-437f-48be-9dfa-a03039678ce0.png)

Point quan trọng khi thiết kế cấu trúc database cần phải chú ý là : 

* Hướng đến mục tiêu code simple
* Việc Phẳng hóa thực chất không quan trọng, không phải là mục tiêu nên hướng tới
* Mục tiêu nên hướng tới là nên làm theo hướng "Giống như với cách mà user nhìn thấy"

## Cách get data

Về phương pháp get data từ Filestore thì có 2 pattern :

1. Đọc và get data 1 lần
1. Listen theo realtime update (set của observer)

Flow get data từ Filestore :

1. Tạo tham chiếu tới data.
1. Get snapshot từ tham chiếu
1. Get data từ snapshot (sử dụng method .data(), hoặc method .get(<field name>))
    
### Trường hợp đọc và get data 1 lần --> sử dụng method .get()
    
![](https://images.viblo.asia/e4b890bc-d0f8-45e9-ac47-11f8d811a157.jpg)
    
* Get document : 

    ${documentRef}.get() => DocumentSnapshot
    
    Nếu là document ở layer tầng trên thì sẽ không get subcollection, mà chỉ get document thôi
    
* Get collection (get nhiều document) :

    ${collectionRef}.get() => QuerySnapshot
    
    Bên trong properties docs của QuerySnapshot, thì các array của DocumentSnapshot được lưu trong đó. Nếu muốn get document thì sẽ viết kiểu như thế này
    
    record = querySnapshot[0].data()

* Get list subcollection của document : 

    ${documentRef}.getCollections() => CollectionReference
    
    ※Không thể sử dụng ở library của mobile, web client, nhưng có thể sử dụng ở Cloud function
    
    
### Trường hợp listen theo realtime update --> sử dụng method .onSnapshot()

(To be continued)