# Lời nói đầu
Có lẽ không cần nói nhiều về tầm quan trọng của Collections trong Java nữa. Nó là thứ cơ bản cần phải nắm vững nhất và cũng là thứ cơ bản nhất để phân biệt một Java Dev có kinh nghiệm hay không.

Hầu hết newbie đều sẽ gặp rắc rối khi làm việc với Collections: từ việc lựa chọn sử dụng Collections nào cho đến các thao tác với Collections đó. Mình cũng gặp không ít khó khăn khi làm việc với Collections trên con đường trở thành một Dev tốt hơn. Bởi vậy mình viết ra bài này ở mức basic nhất với hi vọng giúp các bạn newbie một phần nào đó.

Bài viết này sẽ tạm bỏ qua các vấn đề như khái niệm về Java Collections, phân loại hay tại sao phải dùng Collections mà sẽ tập trung về những điều bạn nên làm khi quyết định làm việc với Collections. Nếu bạn chưa biết rõ về Java Collections thì hãy tham khảo ở [đây](https://viblo.asia/p/tong-quan-ve-collections-trong-java-maGK7E0Dlj2)

Không dài dòng nữa, chúng ta bắt đầu nào.

# Lựa chọn đúng Collection
Đây là bước đầu tiên cũng là bước quan trong nhất khi làm việc với Collections. Mọi giải thuật đều phải dựa trên cấu trúc dữ liệu. Việc chọn đúng Collection sẽ giúp bạn giải quyết bài toán một cách dễ dàng hơn. Bạn vẫn có thể lựa chọn những cách khác và chương trình của bạn vẫn chạy đúng nhưng nếu xét về các khía cạnh mang tính quyết định như độ hiệu quả, tốc độ xử lý, ... thì bạn sẽ thấy những lựa chọn đó còn những hạn chế gì.

Việc lựa chọn phải dựa vào vấn đề mà bạn đang giải quyết. Vấn đề đó là gì, có yêu cầu gì. Chẳng hạn tốc độ xử lý phải nhanh, hay không chứa dữ liệu trùng lặp... Để xác định rõ các đặc điểm này, bạn cần phải trả lời các câu hỏi như:
* Có chấp nhận null không?
* Có chấp nhận các phần tử trùng lặp không?
* Có cho phép truy cập phần tử theo chỉ mục không?
* Thao tác thêm, xóa có yêu cầu đặc biệt về thứ tự không?
* Việc sắp xếp, tìm kiếm có được xử lý đơn giản và nhanh chóng không?
* V.vv

Sau khi biết được các đặc điểm của vấn đề, thì sẽ tới lúc chọn Collection cho phù hợp. Đây là bước khó hơn. Bạn sẽ phải tìm hiểu về đặc điểm của từng Collection Interface, tìm ra điểm chung và sự khác biệt giữa chúng. Sau đó bạn lại tiếp tục so sánh các Implementations (Class thực thi) từ Interface đó để quyết định mình cần phải dùng cái nào. Hãy chắn chắn bạn không bỏ sót từng điểm khác biệt nào giữa các Implementations cũng như của Interface. Nó sẽ cho bạn sự lựa chọn chính xác nhất. 

# Tối ưu khi khai báo một Collection 
Bước khó nhất đã làm xong, đến bước tiếp là dùng như thế nào? Mà muốn dùng thì đầu tiên là phải khai báo. Vậy khai báo như thế nào cho hiệu quả?

Giả sử ở ví dụ sau khai báo một mảng String:

```
ArrayList<String> listNames = new ArrayList<String>();  // (1)

List<String> listNames = new ArrayList<String>();  // (2)

List<String> listNames = new ArrayList<>(); // 3
```

Bạn có biết rõ sự khác nhau giữa ba cách khai báo trên và cách khai báo nào là tốt nhất? Có thể nhận ra rằng điểm khác nhau giữa (1) và (2) là kiểu của object cần khai báo; và sự khác nhau giữa (2) và (3) có thêm khai báo String ở phía bên phải. 

Sự khác biệt ở (1) và (2)  rất rõ ràng. Việc khai báo biến ở (1) là dùng Implementations và khai báo ở (2) là dùng Interface. Về đánh giá cái nào tốt hơn thì còn tùy vào từng trường hợp. Tuy nhiên mình có thể nói khai báo ở (2) là tốt hơn. Điểm khác biệt chính là sự linh hoạt. Việc khai báo bằng Interface giúp bạn có thể đối phó với những thay đổi trong lương lai. Chẳng hạn bạn có thể gán dữ liệu từ một Object LinkedList cho listNames mà không xảy ra vấn đề gì. Mình sẽ cho một ví dụ tốt hơn, giả sử có 2 listNames:

```
ArrayList<String> listNames1 = new ArrayList<String>();
LinkedList<String> listNames2 = new LinkedList<String>();
```

Và bây giờ cần xử lý việc hiển thị Name từ 2 listNames trên thì bạn sẽ viết

```
public void showArrayList(ArrayList<String> listNames) {
	//print Name from listNames
}

public void showLinkedList(LinkedList<String> listNames) {
	//print Name from listNames
}
```

Hay chỉ cần viết

```
public void showList(List<String> listNames) {
	//print Name from listNames
}
```

Với (2) và (3) bạn nghĩ nên dùng (2) hay (3) sẽ tốt hơn? Từ Java 7, trình biên dịch đã có thể suy diễn kiểu dữ liệu ở bên trái sang kiểu dữ liệu ở bên phải. Nó tạo ra một khái niệm mới trong Java là Diamond Operator (tức là dấu <> trong khai báo). Điều này nghĩa là ở (2) và (3) không có sự khác biệt về ý nghĩa. Tuy nhiên dùng (3) sẽ giúp bạn rút ngắn lại câu lệnh nhiều, tăng tốc độ code và code trông dễ đọc hơn rất nhiều. Ví dụ trên khá đơn giản có thể không thấy khác biệt nhiều, hãy xem ví dụ bên dưới:

```
Map<String, List<Map<String, Map<String, Integer>>>> list2 = new HashMap<String, List<Map<String, Map<String, Integer>>>>();
Map<String, List<Map<String, Map<String, Integer>>>> list2 = new HashMap<>();
```

Bạn thấy đó, code trông tốt hơn hẳn có đúng không? Còn về khai báo 

```
var list2 = new HashMap<String, List<Map<String, Map<String, Integer>>>>();
```

Đó là việc của Java 10. Chúng ta thì vẫn đang dùng Java 8 là chủ yếu. Và hơn nữa thì từ khóa var chỉ có thể dùng cho biến cục bộ. Nên bạn cũng không phải lăn tăn gì nhiều với việc sử dụng Diamond Operator trong khai báo Collection nhé.

# Tối ưu khi sử dụng Collection
Thao tác với Collection thì có rất nhiều trường hợp và mình không thể viết hết ra đây được. Nào là duyệt các phần tử, xem, xóa, so sánh 2 đối tượng với nhau... Mình sẽ triển khai ở các topic khác nếu chưa có ai nói về cái này. Nhưng thực tế thì những vấn đề này thì đã có quá nhiều hướng dẫn rồi. Nên mình chỉ viết về những điều gần gũi nhất thôi :D

Khi thao tác với Collection thì thao tác hay dùng nhiều nhất đó là duyệt các phần tử (nhỉ ? :D). Và trước khi duyệt phần tử thì bắt buộc phải có thao tác kiểm tra xem là nó phần tử hay không. Về kiểm tra phần tử thì mình hay thấy các bạn dùng điều kiện sau:

`if (collection.size() > 0) { ... }`

Điều kiện này không sai. Nhưng bạn có biết một điệu kiện khác dùng để kiểm tra Collection có phần từ hay không mà hầu hết các lập trình viên chuyên nghiệp đều dùng là gì ko. Đó là: 

`if (!collection.isEmpty()) { ... }`

Với cách viết này, nó dễ dàng trong việc review code và maintain. Một số bài viết cho rằng  isEmpty() có tốc độ xử lý nhỉnh hơn size() trong một số trường hợp. Bởi vậy bạn cần thay đổi thói quen dùng size() > 0 sang isEmpty() nhé. Nó giúp bạn trở nên tốt hơn đấy.

Thêm một vấn đề nữa là trước khi check Collection có phần tử hay không thì cũng cần thêm thao tác check Collection có null hay không. Nếu biến Collection null thì bạn chẳng thể dùng size() hay isEmpty() được. Bởi vậy một trong các điều giúp bạn làm việc với Collection hiệu quả là việc kiểm soát giá trị cho Collection, không bao giờ để nó bị null. Việc kiểm soát từ khâu khởi tạo cho tới khâu gán giá trị. Việc khởi tạo với từ khóa new phải là bắt buộc và việc gán giá trị cho Collection cũng phải gán một giá trị khác null. Nếu bạn có một method xử lý khởi tạo giá trị cho Collection thì hãy chắc chắn rằng nó không được return null cho mọi trường hợp.  Hãy làm quen với các method như emptyList(),emptySet().. khi tạo method return collection

```
public void getListNamesFromPost() {
	if (something) {
		//return a list with have element
	} else {
		return Collections.emptyList()
	}
}
```

Và khi chắc chắn Collection không null và có phần tử, thì bạn nên có cho mình một vòng lặp để duyệt qua các phần tử một cách hiệu quả. Ví dụ có một List sau:

```
List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7);
```

Đa số các bạn sẽ viết lệnh duyệt các phần từ như sau:

```
for (int i = 0; i < list.size(); i++) {
    // do something
}
```

Đây là cách cơ bản và cũng là cách tệ nhất. Bởi vì nó có sử dụng biến đếm  và nếu trong vòng lặp có sự thay đổi giá trị của biến đếm thì nó dẫn tới bug không đáng có. Với những người có kỹ năng tốt hơn, họ sẽ viết như sau:

```
for (Integer n: list) { 
	// do something
}
```

Cách viết này tốt hơn rất nhiều. Nó tránh khỏi những sai sót khi làm việc với biến đếm. Tuy nhiên, hiện tại là thời của Java 8. Nếu bạn chỉ thao tác đơn giản với các phần tử chẳng hạn như in giá trị thì bạn nên nghĩ đến việc dùng forEach và Lambda Expresions để duyệt Collection. Lambda Expressions là chức năng rất tuyệt vời ở Java 8 và không có lý do gì mà bạn không dùng nó cả.

`list.forEach(n -> // do some simple thing;);`

Một dòng code và hơn thế nữa là tăng tốc độ xử lý cũng như tốc độ code. 

# Lời kết
Bài viết ở mức độ basic trên phương diện hiểu biết cá nhân trong quá trình học và làm cũng như vọc vạch đọc thêm các kiểu nên vẫn còn nhiều sai sót. Hi vọng bài viết này sẽ giúp ích cho các bạn khi làm việc với Collections. Rất mong các bạn có thể góp ý thêm.
# Tham khảo
* http://www.javapractices.com/topic/TopicAction.do?Id=65
* https://dzone.com/articles/reasons-call-isempty
* https://www.quora.com/In-Java-should-I-use-interface-as-variable-type-instead-of-class-and-why
* https://www.baeldung.com/java-diamond-operator