### Đôi nét.
ContentState là một Immutable Record, một kiểu cấu trúc dữ liệu của immutable-js, một record tương tự như một JS object, nhưng nó bị ép để follow theo rule là key của object đó phải thuộc về nhóm key đã được xác định sẵn và có giá trị mặc định, theo mình hiểu giống như một bộ khung cho object để xác định chặt chẽ về mặt dữ liệu.

![](https://images.viblo.asia/48750bc6-0888-42d4-8de7-f35a99b8e6ff.jpg)

### Chức năng.
Trong draftjs ContentState bao gồm 2 yếu tố:
- Toàn bộ nội dung của editor: text, block, inline styles, entity ranges.
- 2 lại selection: trước và sau khi render nội dung này.

Cách dùng phổ biến để có được nội dung của contentState là  EditorState.getCurrentContent(), nó sẽ show cho chúng ta ContentState hiện hành đang được dùng bởi editor.
Trên ContentState là EditorState object dùng để duy trì các stack của ContentState objects, phục vụ cho việc undo redo.

Mình sẽ recomment 1 số method quan trọng :

```
getEntityMap()
```
Nó sẽ trả về object chứa tất cả DraftEntity records đã được tạo, loại ordered map
Việc này giúp ích cho việc xác định thông tin của entity như các thuộc tính src, style, file, ...

```
getBlockMap(): BlockMap
```

Trả về ordered map of ContentBlock objects, mô tả cho state của toàn bộ tài liệu, ContentBlock giống như 1 line trong văn bản, chứa các từ (CharacterMetaData), styleRanges, ...
![](https://images.viblo.asia/b331647e-c844-401b-b9a9-e54a048457d8.png)


```
getSelectionBefore(): SelectionState
```

Trả về SelectionState (1 trạng thái của việc selection), trước khi render blockMap.
Khi thực hiện undo action selectionBefore của current ContentState sẽ được dùng xác định vị trí của selection.

```
getSelectionAfter(): SelectionState
```
Trả về SelectionState được show sau khi editor render blockMap.
Khị thực hiện bất cứ action nào tạo ra blockMap mới, thì selection range hiện tại sẽ được đặt dựa trên selectionAfter position.
```
getBlockForKey(key: string): ContentBlock
```
Trong mảng BlockMap của ContentState, mỗi ContentBlock sẽ được assign 1 key, hàm này sẽ trả về block có key tương ứng.
```
mergeEntityData(
  key: string,
  toMerge: {[key: string]: any}
): ContentState
```
Như đã nói ở đầu, entity cũng có key của riêng nó , điển hình là các con số tăng dần, trong entity có entityData, chúng ta muốn thay đổi data của entity thì dựa vào hàm này, dùng key của entity + các thuộc tính cần merge.

Ngoài ra còn rất nhiều function hữu ích cho việc làm quên với ContentState, mọi người có thể check qua: