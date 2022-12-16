Loop with async await. Đây là một trường hợp sai lầm phổ biến và đi đâu tôi cũng bắt gặp những câu hỏi như vậy? Tại sao dùng foreach với async lại không cho kết quả đúng. Và có nhiều câu trả lời cho câu hỏi này, nhưng hầu như là đưa ra giải pháp khác chứ chưa giải thích được vì sao async await không nên sử dụng trong foreach.


Nếu bạn đang đi tìm câu hỏi này thì bài viết này dành cho bạn. Và chúc mừng bạn, bởi vì bạn là người đam mê lập trình, luôn tìm tòi. Chính vì vậy, bài viết này dành cho bạn. Tôi ngưỡng mộ với câu hỏi "Tại sao foreach không support async await". 


Điều đầu tiên tôi muốn nói là, sử dụng async/await một cách hiệu quả chính là bạn đã nâng tầm của bạn lên một level mới. Trong khi đó, đâu đó vẫn còn một số dev vẫn chưa hiểu "async await là gì? " hay "promise là gì?". Trong blog javascript này đã nói rất nhiều về vấn đề đó, bạn có thể click vào những câu hỏi để đi đến bài viết rõ ràng nhất. Còn bây giờ, tôi muốn bạn hãy tập trung cho bài viết này để hiểu rõ vì sao  "Những sai lầm thường gặp khi sử dụng async await".



Không khó để bắt gặp những câu hỏi tương tự như vậy, chỉ khác là các tình huống sử dụng khác nhau mà thôi

loop async await in javascript

Hoặc tương tự là :

foreach async await in javascript

### Async await trong foreach

Hãy xem xét một ví dụ dưới đây khi chúng ta đang sử dụng forEach và async await.

```
et count = 0;
hello = async (items)=>{
  	items.forEach(async()=>{
     	await someAPICall();
     	count++;
  	})
  	console.log("count = " + count);
}
someAPICall = ()=>{
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
		resolve("done")
		},100);
	})
}
hello(['1','2','3','4']);
```
Đến đây bạn vui lòng chú ý đến dòng code này, đó là ở await someAPICall() . Nếu như tôi comment lại như dưới đây.

```
let count = 0;
hello = async (items)=>{
  	items.forEach(async()=>{
     	//await someAPICall();
     	count++;
  	})
  	console.log("count = " + count);
}
```

Thì kết quả sẽ là count = 4 , nhưng nếu ta không comment thì kết quả sẽ là count = 0 . WTF? Vì sao lại thế? Câu hỏi không quá bất ngờ vì bạn đã biết điều này nên mới tìm đến đây. Ok, để tôi giải thích vì sao sai lầm khi sử dụng async await với forEach.



### Sai lầm khi sử dụng Async await trong foreach


Tiếp theo ta hãy xem JavaScript triển khai function forEach như thế nào ? forEach được giải thích rất rõ trong bài viết của developer.mozilla.org, và từ đây chúng ta sẽ phân tích nó, đây rồi, hãy chú ý tới dòng code này.

```
if (k in O) {
	// i. Let kValue be the result of calling the Get internal
	// method of O with argument Pk.
	kValue = O[k];
	// ii. Call the Call internal method of callback with T as
	// the this value and argument list containing kValue, k, and O.
	callback.call(T, kValue, k, O);
}
```
Click vào link đó xem code Polyfill của forEach nha mấy má. ở đây chúng ta chú ý về 3 elements được trả về trong callback đó chính là elements, index, và array truyền vô. Theo cú pháp sau

```
const letters = ['a', 'b', 'c'];
letters.forEach((letter, index, arr) => {
  console.log(letter,index, arr);
});
// 3 elements được trả về lần lượt là elements, index, và array ban đầu
// 'a', 0, ['a', 'b', 'c']
// 'b', 1, ['a', 'b', 'c']
// 'c', 2, ['a', 'b', 'c']
```
Nếu bạn nhìn kỹ thì 3 elements được trả về lần lượt là elements, index, và array ban đầu như vậy chứng tỏ rằng forEach không chờ asynchronous process trong callback. Điều đó có nghĩa là, forEach mà bạn sử dụng không xây dựng trong quá trình asynchronous.



### Loop with async await


Giờ đây bạn đã hiểu vì sao forEach không làm việc với async await rồi. Câu hỏi vậy làm cách nào thay thế forEach khi mỗi này tôi đều sử dụng "Loop with async await". Tất nhiên là có và nó còn hay hơn nhiều. 

Bạn có thể follow fanpage tips javascript, để theo dõi bài viết tiếp theo về cách sử dụng Loop with async await. Ở đó tôi sẽ viết chi tiết về cách sử dụng loop trong xử lý đồng bộ.