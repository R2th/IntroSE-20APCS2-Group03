Khi bạn học đến ES6 thì việc sử dụng **Filter** và **Find** thường xuyên hơn, nhưng khi nào nên sử dụng filter và khi nào nên sử dụng Find thì trong bài viết này, chúng ta sẽ xem xét một số ví dụ, hy vọng qua những ví dụ này chúng ta sẽ hiểu hơn và có thể cải thiện được performance code của chính bạn.

Khi bạn đang tìm hiểu về Filter và find thì bạn cũng nên hiểu qua map, filter, reduce trong javascript. Đó cũng là một trong những method mà hầu như bất của developer nào cũng phải hiểu, vì nó giúp và xuất hiện rất nhiều trong mỗi ứng dụng của chúng ta.

Có nhiều bạn ở đây khi nghe tiêu đề là bĩu môi các kiểu, nào là "Ôi dời, cái này có lâu rồi mà", hoặc "Oạch, cái này dễ mà...". Ha ha, bạn không sai, nhưng có thể bạn lướt xem trong những ví dụ dưới đây, có trường hợp nào bạn đang sử dụng sai cách không? Khi mà đáng ra phải sử dụng Find trong javascript và bạn lại sử dụng Filter???
## Find trong javascript
Ví dụ 1
```
const trees = [ 
  "birch", 
  "maple", 
  "oak", 
  "poplar" 
];

const resultFind = trees.find(tree => tree.startsWith("m"));
```
Output:
```
// "maple"
```
## Filter trong javascript
Ví dụ 2
```
const trees = [ 
  "birch", 
  "maple", 
  "oak", 
  "poplar" 
];

const resultFind = trees.filter(tree => tree.startsWith("m"));
```
Output:
```
// ["maple"]
```
Trong hai ví dụ trên cùng một data nhưng cách return của filter và find lại khác nhau. Xem kỹ lại đó là ["maple"] và "maple". Từ từ, chúng ta đi tiếp một ví dụ khác
## Sự khác nhau giữa Find và Filter trong javascript
Ví dụ 3: Sử dụng Filter
```
var jsonarr = [ 
    { 
        id: 1, 
        name: "joe"
    }, 
    { 
        id: -19, 
        name: "john"
    }, 
    { 
        id: 20, 
        name: "james"
    }, 
    { 
        id: 25, 
        name: "jack"
    }, 
    { 
        id: -10, 
        name: "joseph"
    }, 
    { 
        id: "not a number", 
        name: "jimmy"
    }, 
    { 
        id: null, 
        name: "jeff"
    }, 
] 
const resultFilter = jsonarr.filter(el => el.id > 0);
console.log('Filter trong javascript',resultFilter)
```
Ouput:
```
Filter trong javascript:  [ {id: 1, name: "joe"}, {id: 20, name: "james"},{id: 25, name: "jack"}]
```
Sử dụng Find
```
const resultFind = jsonarr.find(el => el.id > 0);
console.log('Find trong javascript', resultFind)
```
Output:
```
Find trong javascript {id: 1, name: "joe"}
```
Hai kết quả cho chúng ta thấy, Find sẽ return về một element ngay khi đúng điều kiện (el > 0). Ngược lại, khi sử dụng filter trong ES6 thì sẽ return về một Array mà thoả mãn điểu kiện. Nghĩa là filter sẽ loop hết những elements trong const jsonarr, và return một array chứa tất cả những elements thoả mãn điều kiên (el > 0);

Từ ví dụ 3 chúng ta có thể biết khi nào nên sử dụng Find và khi nào nên sử dụng Filter, đừng nhầm lẫn để rồi làm chậm code của chính mình.
## Sử dụng filter trong javascript
Ở đây, chúng ta sẽ nói thêm về filter trong ES6, bởi vì sao. Bởi vò filter sẽ được sử dụng nhiều hơn trong lập trình javascript, chính vì thế filter được các devjs nói nhiều hơn so với find .

Cú pháp filter trong javascript
```
let newArray = array.filter(callback(element, index, array));

   or

let newArray = array.filter((element, index, array) => {
        //filter 'em elements
})
```
Trong đó:
**newArray** là một array được return

**array** chính là array gốc dùng để filter

**callback** để sử lý từng elements của array

Trong callback có

**element** là current element đang được xử lý

**index** không nói nhiều về index

**array** chính là array gốc

Ví dụ :
```
const deciduous = [
  { name: "birch", count: 4 },
  { name: "maple", count: 5 },
  { name: "oak", count: 2 }
];

 let newArray = deciduous.filter((element, index, array) => {
        console.log(element, index, array)
 })
```