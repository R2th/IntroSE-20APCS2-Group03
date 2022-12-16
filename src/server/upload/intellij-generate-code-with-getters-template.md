## 1. Introduction

Giả sử bạn có class `MyClass` với một collection field là `myStrings` và accessor của nó trông như thế này:
```
@Data
public class MyClass {
	private List<String> myStrings;
    
    public List<String> getMyStrings() {
		return myStrings;
	}
}
```

Đây là một class (Java Bean) với thiết kế rất cơ bản nhưng bởi vì `myStrings` là một collection nên việc encapsulate collection thông qua phương thức getter `MyClass#getMyStrings()` như trên là chưa đủ tốt. Còn tại sao thì các bạn có thể tham khảo bài viết [này](https://viblo.asia/p/fine-grain-refactoring-deep-dive-2-encapsulate-collection-jvElaNz45kw) để biết thêm thông tin.

Dù có nhiều cách encapsulate một collection field tùy vào bài toán cần giải quyết, nhưng về cơ bản thì chúng ta thường encapsulate theo thiên hướng dùng để tránh `NPE (Null Pointer Exception)` khi dùng dot (`.`) chaining operator là chính. Đơn cử như sau:
```
A.getMyStrings().B().C();

public List<String> getMyStrings() {
    if (this.myStrings == null)
        return Collections.emptyList();
    return myStrings;
}
```

Có thể bạn sẽ nghĩ rằng có cần làm phức tạp bài toán lên không, khi chỉ cần làm đơn giản như thế này là xong:
```
private List<String> myStrings = new ArrayList<>();
    
public List<String> getMyStrings() {
    return myStrings;
}
```
😂😂 Đồng ý là đơn giản nhưng chưa đúng tinh thần OOP và chưa đủ tốt. Mời bạn tham khảo bài viết mình đã dẫn link ở phía trên nha.

## 2. Collection field getter

Câu chuyện bây giờ là mỗi lần tạo getter cho collection field thì Intellij mặc định sẽ chỉ có một câu lệnh duy nhất là return field, và câu hỏi đặt ra bây giờ là có cách nào để generate code tự động không nhỉ?
Câu trả lời là có. Thật may mắn là với sức mạnh của IDEA Utimate, chúng ta sẽ giải quyết bài toán này như sau:

Select Getter:
![image.png](https://images.viblo.asia/94fee48d-631d-4625-b83c-59a07e8efd8c.png)

Click on ellipsis icon (three dot):
![image.png](https://images.viblo.asia/104e4fba-b974-402f-bf41-1dfcf146b5e6.png)

Make a copy:
![image.png](https://images.viblo.asia/80d22e8d-ca1c-4286-b2d9-dd6e2f9b43cd.png)

![image.png](https://images.viblo.asia/bb0cb1d9-20a5-43df-82df-ee8125e34bd6.png)

Sau đó sử dụng đoạn custom code getter template sau:
```
#if($field.modifierStatic)
static ##
#end
$field.type ##
#if($field.recordComponent)
  ${field.name}##
#else
#set($name = $StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($helper.getPropertyName($field, $project))))
#if ($field.boolean && $field.primitive)
  is##
#else
  get##
#end
${name}##
#end
() {
    if (this.$field.name == null)
      return Collections.emptyList();	
  return $field.name;
}
```

Demo: 
![](https://images.viblo.asia/19b23d89-1aeb-4b99-85aa-ee6ad1bedc75.gif)

All done. 
Tuy nhiên bạn sẽ thấy có điều gì đó chưa được hoàn thiện ở đây là nếu sử dụng customer getter như trên cho các field kiểu String, Integer cũng sẽ được add thêm đoạn code `if` logic vào, làm như thế là không đúng.
Chúng ta chỉ thêm đoạn code logic đó vào khi và chỉ khi một field có type là collection hay cụ thể hơn là ArrayList .

Hiện tại thì trên documentation của IDEA về [customize template](https://www.jetbrains.com/help/idea/generating-code.html#customize-templates) không có hướng dẫn gì về ngôn ngữ viết và cách viết template cả, nên khả năng cao là chúng ta phải tạo ra nhiều template khác nhau chứ khó có thể tạo ra một template one-size-fits-all được.

Mặc dù thế nhưng không phải không có hy vọng, các bạn có thể tìm thêm manh mối ở **[idea-community](https://github.com/JetBrains/intellij-community/blob/master/platform/util/src/com/intellij/openapi/util/text/StringUtil.java)** repository hoặc theo dõi câu hỏi [Intellij custom getter template: How to encapsulate collection field](https://stackoverflow.com/questions/73405741/intellij-custom-getter-template-how-to-encapsulate-collection-field) trên Stackoverflow.

##  3. Optional getter
```
#if($field.modifierStatic)
static ##
#end
Optional<$field.type> ##
#if($field.recordComponent)
  ${field.name}##
#else
#set($name = $StringUtil.capitalizeWithJavaBeanConvention($StringUtil.sanitizeJavaIdentifier($helper.getPropertyName($field, $project))))
#if ($field.boolean && $field.primitive)
  is##
#else
  get##
#end
${name}##
#end
() {
  return Optional.ofNullable($field.name);
}
```

## 4. Use case

Việc sử dụng optional getter và collection field getter sẽ đem lại một lợi thế lớn trong trường hợp cần tái cấu trúc code để giảm cognitive complexity của một phương thức nhất định. Cùng xem ví dụ sau:

### Before
```
Rounds rounds = standingResponse.getRounds();
if (rounds == null) return null;

List<RoundItem> roundItems = rounds.getRound();
if (CollectionUtils.isEmpty(roundItems)) return null;

for (RoundItem roundItem : roundItems) {
    Groups groups = roundItem.getGroups();
    if (groups == null) continue;

    List<GroupItem> groupItems = groups.getGroup();
    if (!CollectionUtils.isEmpty(groupItems)) {
        for (GroupItem groupItem : groupItems) {
            List<RankingsTypeItem> rankingsTypeItems = groupItem.getRankingsType();
            if (!CollectionUtils.isEmpty(rankingsTypeItems)) {
                for (RankingsTypeItem rankingsTypeItem : rankingsTypeItems) {
                    List<RankingItem> rankingItems = rankingsTypeItem.getRanking();
                    if (!CollectionUtils.isEmpty(rankingItems)) {
                        for (RankingItem rankingItem : rankingItems) {
                            String id = rankingItem.getContestantId();
                            String name = rankingItem.getContestantName();
                        }
                    }
                }
            }
        }
    }
}
```

### After
```
standingResponse.getRounds()
        .flatMap(Rounds::getRound)
        .ifPresent(roundItems -> roundItems
                .forEach(roundItem -> roundItem.getGroups().flatMap(Groups::getGroup).ifPresent(groupItems ->
                    groupItems.stream()
                        .map(GroupItem::getRankingsType)
                        .flatMap(Collection::stream)
                        .map(RankingsTypeItem::getRanking)
                        .flatMap(Collection::stream)
                        .forEach(rankingItem -> {
                            String id = rankingItem.getContestantId();
                            String name = rankingItem.getContestantName();
                        }))));
```

## 5. References
- https://www.jetbrains.com/help/idea/generating-code.html#customize-templates

```
 ____________________
< Thanks for reading >
 --------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     |
```