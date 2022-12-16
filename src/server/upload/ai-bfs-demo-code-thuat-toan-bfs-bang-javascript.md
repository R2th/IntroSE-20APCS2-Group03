Hello mọi người nha, lâu nay mình vẫn xem chùa mà hôm nay rảnh quá nên muốn làm một **series** về các thuật toán **AI** cho mọi người. Hôm nay mình sẽ làm 1 demo về thuật toán **BFS** nha !
# **Tổng quan về thuật toán BFS**
Bây giờ mà nói về cái thuật toán này thì dài lắm, nên mình trích dẫn vài cái link cho những ai chưa rõ về lý thuyết thì tìm hiểu nha : 
[Wikipedia](https://vi.wikipedia.org/wiki/T%C3%ACm_ki%E1%BA%BFm_theo_chi%E1%BB%81u_r%E1%BB%99ng)
[Youtube](https://www.youtube.com/watch?v=i4fEZlVNwVs)
[lhchuong](https://lhchuong.wordpress.com/2013/11/08/thuat-toan-bfs-tim-kiem-theo-chieu-ro%CC%A3ng/)
<br>
### Thuật toán
```javascript
function BFS(start,end){
  var open = []; //chứa các đỉnh đang xét
  var close = []; //chứa các đỉnh đã xét
  var edge; //đỉnh được xét hiện tại
  var dependent = []; //tập các đỉnh kề với edge
  open.push(start); //cho start vào cuối danh sách open
  //lặp khi open không rỗng
  while(open.length > 0){
    edge = open[0]; //lấy đỉnh đầu của danh sách open
    open.shift(); //xóa phần tử edge khỏi danh sách open
    if(edge == end){
      return true; //đã tìm thấy
    }
    open.push(dependent(edge));//cho tập dependent vào cuối danh sách open
    close.push(edge);//cho edge vào cuối danh sách đóng
  }
}
```
# **Code example**
Đầu tiên thì mình cho các bạn xem cái **map** mình làm sẵn để minh họa, thuật toán **BFS** sẽ giúp chúng ta tìm ra **đường đi** giữa các vị trí trong map.
![map](https://images.viblo.asia/a6083a10-90b7-40db-bc64-497fd3179984.png)
<br>
Map dạng bàn cờ (4*4) , tọa độ các thứ :v
<br>
![tree_map](https://images.viblo.asia/c8136b33-7348-4454-a84f-f148fef05fb7.png)
<br>
Map dạng biểu đồ cây
<br>
### Map code
Mình sẽ trình bày các **map** trên dưới dạng code nha !
```javascript
//Hình 1
let map = {
  "a0" : ["b0","a1"],
  "a1" : ["a0","a2"],
  "a2" : ["a1","b2"],
  "a3" : "block",
  "b0" : ["a0","c0"],
  "b1" : "block",
  "b2" : ["a2","b3","c2"],
  "b3" : ["b2","c3"],
  "c0" : ["b0","c1"],
  "c1" : ["c0","d1","c2"],
  "c2" : ["c1","b2","c3"],
  "c3" : ["c2","b3","d3"],
  "d0" : "block",
  "d1" : ["c1"],
  "d2" : "block",
  "d3" : ["c3"]
}
```
```javascript
//Hình 2 (tree)
let map2 = {
  "A" : ["B","C","D"],
  "B" : ["M","N"],
  "C" : ["L"],
  "D" : ["O","P"],
  "M" : ["X","Y"],
  "N" : ["U","V"],
  "O" : ["I","J"],
  "Y" : ["R","S"],
  "X" : [],
  "L" : [],
  "P" : [],
  "U" : [],
  "V" : ["G","H"],
  "I" : [],
  "J" : [],
  "R" : [],
  "S" : [],
  "G" : [],
  "H" : [],
}
```
Như các bạn thấy thì code này là 1 **object**, trong đó mỗi **phần tử** tương đương với 1 **đỉnh**(edge) và **giá trị** của nó là 1 **array** chứa các **đỉnh kề** nó,  trong trường hợp 1 sẽ loại bỏ các **block**(tô đỏ - đóng vai trò là vật cản) ra nha !
### Code
Tham số đầu vào sẽ là điểm **start** và **end** mà bạn muốn tìm đường.
<br>
Đầu tiên ta khởi tạo 2 array **open** và **close** để,...
```javascript
let open = [];  //chứa các đỉnh đang xét
let close = []; //chứa các đỉnh đã xét
```
Đẩy điểm **start** vào cuối danh sách **open**
```javascript
open.push(start);
```
Tạo 1 **object** **List** để lưu trữ các thao tác **duyệt**, về sau muốn tìm được **đường** cũng phải nhờ thằng **List** này đấy =))
```javascript
let list = {};
```
Thêm phần tử đầu tiên vào **List** , cấu trúc của nó bao gồm **height** là **chiều cao** phần tử đưa vào **List** ở trong **cây**, bắt đầu từ 0, phần tử **start** là nơi ta muốn **bắt đầu** nên nó không có phần tử **cha** => **parent** = **null**
```javascript
list[start] = {
    height : 0,
    parent : null
};
```
Một function **dependent** để lấy ra danh sách các **đỉnh**(edge) kề của đỉnh muốn xét, **đồng thời** với đó nó sẽ đưa vào trong **List** danh sách **duyệt**.
```javascript
let dependent = function(e){
    let result = map[e];
    for(let i=0;i<result.length;i++){
      if(list[result[i]] == undefined){
        list[result[i]] = {
          height : list[e].height + 1,
          parent : e
        };
      }
    }
    return result;
 }
```
Một function **pushDependentToEndOfOpen** để đẩy các **dependent** vào danh sách open
```javascript
function pushDependentToEndOfOpen(dpd,openList){
    for(let i=0;i<dpd.length;i++){
      openList.push(dpd[i]);
    }
}
```
Một vòng lặp **while** để duyêt các **phần tử** trong danh sách **open**
```javascript
 while(open.length > 0){ //khi open không rỗng
    let edge = open[0];  //lấy ra phần tử muốn duyệt ở đầu danh sách open
    open.shift();     //lấy ra rồi thì phải xóa ở trong open đi để còn duyệt tiếp :v
    if(edge == end){  //khi tìm thấy rồi thì...
         return HandleWhenFound(); //function xử lí khi tìm thấy, xem sau nhé =))
    }
    pushDependentToEndOfOpen(dependent(edge),open); //đẩy dependent vào open
    close.push(edge);  //đẩy edge duyệt ok rồi vào close
 }
```
Function xử lý khi tìm thấy **end** nà :v , kèm luôn 1 function lấy **đường đi** nhá
```javascript
let way = function(list){
    let result = [];
    let edge = end;
    result.unshift(edge);
    while(list[edge].parent != null){
      edge = list[edge].parent;
      result.unshift(edge);
    }
    return result; 
}
function HandleWhenFound(){
    return {
       way : way(list),
       list : list
    }
}
```
How to chạy =))
```javascript
//map1
let result = BFS("a0","d3",map);
console.log(result.way);
console.log(result.list);
//map2
let result2 = BFS("A","U",map2);
console.log(result2.way);
console.log(result2.list);
```
# Kết
OK, vậy là phần 1 trong series demo AI về BFS kết thúc ở đây. Code ở trên nếu mọi người chưa hiểu có thể xem full source mình up lên trên github tại [Đây](https://github.com/zenlykoi/AI/tree/master/BFS).Mọi người xem nếu thích thì like follow các kiểu nha :v, lấy động lực mình lại ra tiếp các phần sau =)). Có gì sai sót mn có thể report cho mình tại  [issue](https://github.com/zenlykoi/AI/issues) nha.Thank all !