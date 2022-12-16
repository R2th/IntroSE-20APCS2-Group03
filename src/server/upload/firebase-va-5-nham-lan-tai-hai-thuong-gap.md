![](https://images.viblo.asia/180e65da-add5-461f-badc-b82b58010e0b.png)

Gần đây tôi đã đọc được khá nhiều lời bình luận online về Firebase. Đa phần chúng đều từ những developer vốn dĩ ghét Firebase.

Cũng không có gì là khó hiểu bởi đó đều là những vấn đề bế tắc mà họ gặp phải khi dùng Firebase. Tuy nhiên, đôi khi chúng xuất phát từ việc họ hiểu sai về Firebase cũng như chức năng của nó.

## Sai lầm 1: Firebase chỉ về client-side thôi

Chỉ mới gần đây thôi, Firebase vẫn còn là `công nghệ client-side`. Tuy vậy nó vẫn cho phép lưu trữ và querying. Tuy vậy đa phần mọi thứ đều được thực hiện tại phần client. Đối với các developers thì đây thật sự là điều quá khó nuốt bởi có web application nào mà lại không cần đến back-end?

Firebase team sau đó đã lắng nghe phản ánh từ cộng đồng người dùng. Vào tháng 3 2017, nhóm đã giới thiệu [Cloud Functions](https://firebase.googleblog.com/2017/03/introducing-cloud-functions-for-firebase.html) dành cho Firebase. Với cloud functions, bạn có thể save các đoạn mã code lên Google Cloud. Những code này sẽ chạy khi có một Firebase events hay HTTP requests xuất hiện. Ví dụ như bạn muốn thực hiện data processing khi đang lưu dữ liệu trong database thì giờ [bạn đã có thể làm được với Firebase](https://firebase.google.com/docs/functions/use-cases#perform_database_sanitization_and_maintenance).

Nếu bạn muốn biết thêm thì tôi khuyên bạn hãy vào đọc bài viết sau [Cloud Function for Firebase docs](https://firebase.google.com/docs/functions/).

## Sai lầm 2: Firebase là nguyên nhân cho các đoạn code dài lê thê

Có một câu ngạn ngữ rằng “Người dở luôn đổ lỗi”, với kinh nghiệm dùng Firebase của tôi thì nó không hề khiến bạn viết ra những “cọng” code dài ngoằng. Bởi Firebase phần lớn thuộc về bên client, thế nên backend logic của bạn cũng sẽ nhắm tới cho client. Do đó nếu bạn không cẩn thận thì rất dễ cho ra code xấu và rối rắm.
;
Trong giai đoạn đầu phát triển dự án tôi quyết định tạo ra một connector để kết nối với Firebase. Nó có toàn bộ code dành cho CRUD operations cũng như tương tác với Firebase. Ngoài ra, tôi còn tập hợp list các class để xử lí dữ liệu của object dựa theo cấu trúc của Firebase database. Nhờ đó mà mọi thứ luôn rõ ràng và giúp cho code dễ bảo trì và fix hơn.

## Sai lầm 3: data modelling dở / có quá nhiều duplication

Như chính thành viên của Firebase đã nói, Firebase database chỉ là một [JSON tree khổng lồ](https://firebase.google.com/docs/database/web/structure-data#how_data_is_structured_its_a_json_tree). Data được lưu trữ như các cặp key-value và có thể có giá trị tùy theo ý bạn. Có rất nhiều cách để lưu trữ chúng vì thế nên bạn phải rất cẩn thận nếu không muốn bị gặp nhiều rắc rối.

Giả dụ như bạn muốn tạo ra một project management application đơn giản. Bạn có users và tasks. Tasks có thể được chỉ định Users. Bạn sẽ muốn lưu trữ tất cả thông tin của task trong một database của tasks node:

```
tasks : {
    "001" : {
        name         : "Development Round 1"
        description  : "Lorem ipsum dolor sit amet elit..."
        startDate    : "20170101"
        endDate      : "20170201"
        loggedHours  : {
            "20170101" : "1.66"
            "20170102" : "7"
            "20170103" : "5.5"
        }
        assignedStaff : "Cathryn"
    }
    "002" : {
        name : "Development Round 2"
        description : "Mauris quis turpis ut ante..."
        startDate   : "20170206"
        endDate     : "20170228"
        loggedHours  : {
            "20170206" : "3"
            "20170207" : "1"
            "20170208" : "4.75"
        }
        assignedStaff : "Sam"
    }
    "003" : {
        name : "Browser Testing"
        description : "Vivamus nec ligula et nulla blandit..."
        startDate   : "20170301"
        endDate     : "20170303"
        loggedHours  : {
            "20170301" : "1"
            "20170301" : "3"
        }
        assignedStaff : "Cathryn"
    }
}
```

Giờ nếu bạn muốn hiện tên của tất cả các task của Cathryn. Để làm được điều đó, bạn có thể query database để trả về các tasks “assignedStaff” có giá trị là “Cathryn”.

```
firebase
.database().ref(“tasks/”)
.orderByValue(“assignedStaff”).equalTo(“Cathryn”).once(“value”);
```

Vấn đề là nó sẽ trả tất cả mọi task được chỉ định với Cathryn, chứ không chỉ là task name. Nói cách khác có quá nhiều data thừa thãi.

Để khắc phục tình trạng trên, Firebase khuyến khích bạn [denormalize](https://firebase.googleblog.com/2013/04/denormalizing-your-data-is-normal.html) data. Denormalization là thuật ngữ ám chỉ lưu trữ các phiên bản copy của dữ liệu trong database, nhằm cải thiện quá trình xử lí và đọc.

```
tasksByUser : {
    "Cathryn" : {
        "001" : "Development Round 1"
        "003" : "Browser Testing"
    }
    "Sam" : {
        "002" : "Development Round 2"
    }
}
```

Giờ nếu chúng ta lấy tên các task được chỉ định tới Cathryn, chúng ta sẽ chỉ đơn giản đọc từ một vị trí trong database:

```
firebase
.database().ref(“/tasksByUser/Cathryn”)
.once(“value”);
```

So với query ở trên thì nó sẽ xử lí nhanh hơn rất nhiều.

Denormalization nghe có vẻ như hack. Nhưng nó bắc buộc phải có để thiết kế một Firebase database cho web application với qui mô lớn và phức tạp. Đòi hỏi bạn phải rất am hiểu về data mà bạn muốn lưu trữ cũng như cách dùng chúng.

Trước khi nhảy vào tạo Firebase database, hãy bỏ thời gian học về [denormalization](https://www.youtube.com/watch?v=vKqXSZLLnHA), [cách tạo cấu trúc cho data](https://firebase.google.com/docs/database/web/structure-data),  [cũng như cách bảo trì chúng](https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html).

## Sai lầm 4: Firebase có thể dẫn tới tình trạng dữ liệu không nhất quán

Nếu bạn thiết kế Firebase database đúng cách thì rất có thể data từ khắp database của bạn đã được denormalized. Và nếu dữ liệu của bạn được lưu trữ ở nhiều vị trí khác nhau thì hẳn bạn sẽ tự hỏi rằng “Làm cách nào để giữ cho data được nhất quán?”.

Bình thường, khi gửi data đến Firebase, bạn chỉ định một database path cũng như là loại data mà bạn muốn lưu trữ. Trở về với ví dụ, để update một task name (trước khi dùng denormalization), tôi sẽ làm như sau:

```
firebase
.database().ref(“tasks/001/name”)
.set(“Here’s the new name”);
```

Giờ với denormalization, tôi có thể update một task’s name bằng hai operations:

```
firebase
.database().ref(“tasks/001/name”)
.set(“Here’s the new name”);
firebase
.database().ref(“tasksByUser/Cathryn/001”)
.set(“Here’s the new name”);
```

Tuy vậy nó sẽ dễ bị dữ liệu không được nhất quán. Lỡ đâu một operation bị fail trong khi cái còn lại thành công thì sao? Vì thế mà ta cần một write operation tự động để cho phép tạo ra các database paths cùng lúc. Do đó, Firebase đã cung cấp [multipath updates](https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html) nhằm giải quyết vấn đề trên. Bạn có thể xem cách dùng chúng tại [đây](https://www.youtube.com/watch?v=i1n9Kw3AORw&index=7&list=PLl-K7zZEsYLlP-k-RKFa7RyNPa9_wCH2s). Giờ thì update một task name sẽ chỉ cần làm như sau:

```
firebase
.database().ref()
.update({
    “tasks/001/name” : “Here’s the new name”,
    “tasksByUser/Cathryn/001” : “Here’s the new name”
});
```

## Sai lầm 5: Khả năng querying rất hạn chế

Firebase thật sự rất hạn chế khi nói về query. Bạn có thể sắp xếp data theo keys hoặc giá trị và filter data.

Dựa theo ví dụ trên, ta có thể tạo một query để lấy tasks bắt đầu từ, trước hoặc sau 20170601. Tuy vậy, ta sẽ không thể lọc ra bằng nhiều giá trị và keys. Nói cách khác, việc query để thu hồi tasks được chỉ định tới Cathryn và bắt đầu sau 20170601 là điều không thể.

Dĩ nhiên là việc như vầy luôn là chủ đề phàn nàn của nhiều developer. Tuy vậy, mọi thứ đều có nguyên do của nó, Firebase là một real-time database và được thiết kế với mục tiêu xử lí thật nhanh. Vì thể để có được một query phức tạp thì sẽ đòi hỏi việc bạn thiết kế database của mình cho đúng.

Ví dụ như bạn muốn làm một query thu hồi các tasks được chỉ định tới Cathryn và bắt đầu từ 20170201. Tôi có thể thêm một “staff_startDate” property vào tasks của mình:

```
tasks : {
    "001" : {
        ...
        startDate       : "20170101"
        assignedStaff   : "Cathryn"
        staff_startDate : “Cathryn_20170101”
        ...
    }
    ...
}
```

Như vậy, khi cần ta sẽ chỉ phải query như sau:

```
firebase
.database().ref(“/tasks/”)
.orderByChild(“staff_startDate”)
.equalTo(“Cathryn_20170101”);
```

Tôi khuyến khích bạn xem qua [Common SQL Queries converted for the Firebase Database](https://www.youtube.com/watch?v=sKFLI5FOOHs) và [Firebase Database Querying 101](https://www.youtube.com/watch?v=3WTQZV5-roY). Khi bạn đã hiểu rõ về cấu trúc cũng như query data thì bạn sẽ có khả năng làm được nhiều queries phức tạp hơn.

Cảm ơn các bạn đã đọc. Nguồn: [freecodecamp](https://www.freecodecamp.org/news/firebase-5-way-too-common-misconceptions-93b843ee1b93/)