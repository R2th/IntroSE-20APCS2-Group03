# Lời mở đầu:
Xin chào mọi người, là một người mới làm quen với Vuejs như mình thì việc đọc document tại chính trang chủ vuejs.org (Có hẳn Vietsub khá dễ đọc :v) chính là lựa chọn tối ưu nhất rồi. Tuy nhiên, có thực mới vực được đạo, đến khi bắt tay vào thực hành thì mới thực sự vực được ra khá nhiều điều, nhất là 3 khái niệm rất hay mà ở đây mình gọi là 3 anh em nhà Methods, Computed property và Watcher. Và ở bài viết này mình xin phép được chia sẻ những gì mà mình đã tìm hiểu được cơ bản về 3 anh em nó, khỏi dài dòng nữa, mình cùng bắt đầu nhé!!!

# Nội dung

## 1. Anh cả Methods
Việc sử dụng các method trong Vue.js giúp tạo ra các function Javascript (trong Javascript thì hàm và thủ tục là một và là function). Trong Vue instance có thể khai báo nhiều các phương thức trong thuộc tính methods. Cú pháp {{ }} cho phép đưa một biểu thức Javascript bên trong nhưng chỉ được duy nhất một câu lệnh đơn và nếu có quá nhiều logic nằm dải rác khắp ứng dụng sẽ khiến cho việc phát triển và maintenance là rất khó khăn. Phương thức trong thuộc tính methods của Vue instance có thể đưa vào các logic hoặc những công việc như lấy dữ liệu từ chính data của Vue instance. Cùng quan sát ví dụ dưới đây nhé:

```
<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
		<p>{{ message }}</p>
		<button @click="showMessage">Click me</button>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			message: 'Cảm ơn bạn đã theo dõi bài viết này!',
		}
	},
	methods: {
		showMessage() {
			alert(this.message);
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
```

![](https://images.viblo.asia/e5be89a5-3f91-43ca-b7a9-45de82f3e25c.gif)


Giải thích cho các bạn đó là @click là sự kiện khi người dùng click vào element thì sẽ làm một điều gì đó. Ngoài cách viết kia (gọi là short-hand) thì cách viết đầy đủ của nó là `v-on:click`, các bạn có thể dùng cách nào cũng được nhưng mình thường dùng short-hand.

Quan sát ví dụ trên, các bạn có thể thấy phương thức `showMessage` sẽ log ra message mà chúng ta đã khai báo trong data, nhìn lên button các bạn có thể thấy `@click="showMessage"` chắc các bạn sẽ đoán ngay ra là khi click thì phương thức `showMessage` sẽ được gọi rồi.

Sau đây chúng ta sẽ thử thay đổi message mỗi khi click vào button xem sao nhé, sửa lại phương thức showMessage như sau:

```
showMessage() {
    this.message = "Message đã thay đổi!";
	console.log(this.message);
}
```

Và đây là kết quả thu được:

![](https://images.viblo.asia/986dbb59-6d2c-4071-8e86-d5727553049e.gif)

Bây giờ, khi ta click button sẽ gọi đến `showMessage`, trong đó sẽ thay đổi message ở trong data(), và để truy cập vào message chúng ta cần phải viết là this.message, từ khoá this mục đích tham chiếu đến component hiện tại. hãy F5 và thử click vào button, các bạn có thể thấy dòng text hiển thị trên màn hình đã bị thay đổi.

Tiếp theo chúng ta sẽ thử thay đổi `showMessage` chút, để nó nhận 1 tham số, các bạn hãy thử làm và xem kết quả thu được:

```
<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
		<p>{{ showMessage(message) }}</p>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			message: 'Cảm ơn bạn đã theo dõi bài viết này!',
		}
	},
	methods: {
		showMessage(text) {
			return text.toUpperCase();
		}
	}
}
</script>
```

Còn 1 vấn đề nữa ở đây đó là, methods sẽ được gọi mỗi khi component được render, hãy thử quan sát ví dụ hơi mặn nồng sau =))

```
<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
		<p>Anh yêu {{ addAnh() }}</p>
        <p>Em yêu {{ addEm() }}</p>
        <button @click="anh+=3000">Yêu em thêm 3000 nữa</button>
        <button @click="em+=3000">Yêu anh thêm 3000 nữa</button>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			anh: 0,
            em: 0,
		}
	},
	methods: {
        addAnh() {
            console.log('Anh yêu em 3000!');
            return this.anh;
        },
        addEm() {
            console.log('Em yêu anh 3000!');
            return this.em;
        }
    }
}
</script>
```

Cùng xem kết quả:

![](https://images.viblo.asia/41ccb9d5-89cb-416d-8733-6ff59c8a462a.gif)

Trong ví dụ này, phương thức `addAnh()` và `addEm()` rõ ràng là không liên quan gì đến nhau, nhưng khi click vào bất cứ button nào thì chúng ta lại thấy nó gọi đến cả phương thức còn lại luôn.

Hai phương thức `addAnh()` và `addEm()` là độc lập với nhau, tuy nhiên trong chúng đều có sử dụng đến dữ liệu được khai báo trong thuộc tính data của Vue instance, như vậy bất kể một thuộc tính nào của data thay đổi, có thể là a hoặc b, các phương thức có sử dụng anh hoặc em mà có liên quan đến render đều được gọi.

**Như vậy chúng ta cần chốt lại như sau: việc phân chia nơi lưu trữ data và methods giúp cho chương trình sáng hơn, quản lý code dễ hơn. Một methods có thể trả về một giá trị hoặc cũng có thể không, methods có thể nhận tham số đầu vào và xử lý chúng nữa. Tuy nhiên khi sử dụng methods thì phải tính toán lại mỗi khi render lại trang (với bất kì thay đổi nào). Và người em Computed được sinh ra để giải quyết vấn đề đó.**
## 2. Anh thứ Computed
Khả năng của **Computed** làm được chính là giá trị của nó được lưu lại vào bộ nhớ đệm (cache), nếu bạn chỉ render lại trang mà thành phần phụ thuộc không thay đổi (ở ví dụ trên là message) thì nó sẽ lấy luôn giá trị trong bộ nhớ cache mà không cần tính toán lại lần nào nữa. Về cách sử dụng thì computed được sử dụng gần giống như methods. Chúng ta cùng sửa ví dụ phía trên một chút như sau:

```
<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
		<p>{{ showMessage }}</p>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			message: 'Cảm ơn bạn đã theo dõi bài viết này!',
		}
	},
	computed: {
		showMessage() {
			return this.message.toUpperCase();
		}
	}
}
</script>
```

Khi chạy thì các bạn sẽ thu được kết quả chả khác gì so với khi dùng methods cả, nhưng hãy thử truyền 1 tham số vào cho showMessage như với ví dụ methods ở phía trên mà xem: 

```
computed: {
	showMessage(text) {
		return text.toUpperCase();
	}
}
```

Khi này sẽ chả thu được kết quả gì cả, hãy thử F12 và qua tab console xem nhé:

![](https://images.viblo.asia/238c8570-50ee-4003-a2a7-f09f38a7a83a.png)

Từ ví dụ trên, ta rút được kết luận như sau, mặc dù các phương thức trong **Computed** là hàm, nhưng chúng ta lại không thể truyền tham số vào vì **Computed** nó chỉ làm việc với data có sẵn mà thôi. Điều đó tương đương với việc khi gọi computed thì ta không được thêm cặp dấu () đằng sau.

Tiếp theo sẽ nói đến sự nổi bật hơn hẳn so với ông anh cả methods kia, cùng sửa lại ví dụ mặn nồng phía trên 1 chút để thấy rõ sự nổi bật này nhé:

```
computed: {
    addAnh() {
        console.log('Anh yêu em 3000!');
        return this.anh;
    },
    addEm() {
        console.log('Em yêu anh 3000!');
        return this.em;
    } 
}
```

Hãy nhớ là bỏ cặp dấu ngoặc () khi gọi đến 2 phương thức này khi chuyển sang dùng computed nếu không muốn bị lỗi nhé =)), kết quả thu được như sau:

![](https://images.viblo.asia/8ea9f884-ec14-4942-bf7e-ace95c205b8b.gif)

Lúc này các giá trị cần hiển thị chỉ được gọi tính toán khi sử dụng các biến có sự phụ thuộc (dependency). Như vậy mới đúng chứ nhỉ :), chứ nếu mà cứ gọi tất cả các phương thức như lúc đầu thì sẽ phải tính toán dư thừa không cần thiết, làm giảm performance đi đáng kể đấy.

**Dựa vào những khác biệt trên, ta sẽ phân biệt được computed và methods chỉ nên dùng khi:**
* **Chỉ dùng đến phương thức được khai báo trong methods khi cần đến một hàm thuần túy hoặc khi cần có tham số cần truyền vào.**
* **Với computed property, sử dụng chúng khi bạn muốn thao tác với dữ liệu có trong Vue instance, ví dụ như khi bạn muốn lọc một mảng dữ liệu, chuyển đổi dạng dữ liệu...**
## 3. Em út Watcher
Ở trên mình có trình bày khá kỹ về **Methods** và **Computed properties**, cơ bản **Watcher** có thể được dùng để tính toán như 2 ông anh của nó. Tuy nhiên, điểm mạnh của **Watcher** là việc nó có thể giám sát và lắng nghe được sự thay đổi của các đối tượng, điều mà 2 ông anh nó chưa làm được. Chính vì vậy Vue đã tạo ra **Watcher** để ta có thể phản ứng với các thay đổi dữ liệu.

Chúng ta sẽ đi luôn vào ví dụ để thấy được khả năng của ông em này nhé, dùng luôn ví dụ về message ở phần 1 phía trên kia, chúng ta sẽ thêm watcher cho message để mỗi lần giá trị của nó thay đổi thì ta sẽ in ra cửa sổ console một thông báo nhé. Ta sẽ thêm đoạn code như sau:

```
watch: {
    message() {
        console.log('Đã lắng nghe được message thay đổi!');
    }
}
```
Hãy thử chạy lại và click và button rồi bật console lên xem kết quả, như vậy là ông ẻm **watcher** đã quan sát và lắng nghe được sự thay đổi của message rồi. Mà chúng ta cũng biết là computed sử dụng giống như những property trong data nên chúng ta cũng có thể watch được computed:

```
<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
		<p>{{ upperMessage }}</p>
		<button @click="showMessage">Click me</button>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			message: 'Cảm ơn bạn đã theo dõi bài viết này!',
		}
	},
	methods: {
		showMessage() {
			this.message = "Message đã thay đổi!";
		}
	},
	computed: {
		upperMessage() {
			return this.message.toUpperCase();
		}
	},
	watch: {
        upperMessage() {
            console.log('Đã lắng nghe được message thay đổi!');
        }
    }
}
</script>
```

Kết quả thu được như sau:

![](https://images.viblo.asia/efe16366-7fba-4d49-900b-5c2a1e8633a7.gif)

Chưa dừng ở đó, watch không dừng lại ở việc quan sát những những phương thức hay data cơ bản mà còn có thể watch khi có sự thay đổi của các thuộc tính bên trong một object. Ngay cả khi đối tượng trong thành phần data của Vue instance có thể rất phức tạp với các thuộc tính được lồng ở cấp sâu hơn. Thử quan sát ví dụ sau đây để thấy rõ hơn nhé:

```
<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png">
		<h1>{{ message.title }}</h1>
		<p>{{ message.content }}</p>
		<button @click="changeMessage">Click me</button>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			message: {
				title:  'Cảm ơn bạn đã theo dõi bài viết này!',
				content: 'Mong là bài viết sẽ có ích với mọi người!'
			}
		}
	},
	methods: {
		changeMessage() {
			this.message.content = "Hãy follow để đón đọc những bài viết tiếp theo của mình nhé!";
		}
	},
	watch: {
        message: {
            handler: function () {
				console.log('Đã lắng nghe được message thay đổi!');
			},
			deep: true
        }
    }
}
</script>
```

Cùng xem kết quả thu được nào :)

![](https://images.viblo.asia/9a4cc59e-c894-4783-ab2e-d2ecc8bdcd1e.gif)

Chúng ta có object message với các thuộc tính và giá trị tương ứng. Khi muốn watch sự thay đổi của bất kì dữ liệu nào bên trong message thì chúng ta cần sử dụng đến deep watch. 

Tuy nhiên khi bạn chỉ muốn watch sự thay đổi của một thuộc tính cụ thể trong object đó thôi thì làm thế nào??? Thì gợi ý ở đây là chúng ta hãy tạo ra computed với giá trị trả về là properties mong muốn watch của object. Sau đó ở watch chúng ta áp dụng lên các computed tương ứng đó. Vì bài viết đã khá dài nên hãy coi như đây là một bài tập nho nhỏ cho những bạn quan tâm đến trường hợp này =))

## 4. So sánh
Qua những gì mình vừa trình bày ở trên, hãy cùng tổng hợp lại để nhận ra sự khác biệt giữa 3 anh em nhà này nhé =))


| |  Methods | Computed |Watcher |
| -------- | -------- | -------- | -------- |
|Cho phép có tham số | Có    | Không     |Có     |
|Khả năng Cached | không    | Có     |N/A     |
|Phạm vi thực hiện | Local cho tới component    | Local cho tới component, nhưng có thể lấy / thực hiện tính toán với các biến từ props, stores, v.v.     |Có thể xem các biến local hoặc store variables và react với các thay đổi    |
|Thực hiện khi | Bất kì thay đổi nào (re-render)    | Thành phần phụ thuộc thay đổi     |Thuộc tính, đối tượng được giám sát bị thay đổi|
|Nên sử dụng khi |Cần đến một hàm thuần túy hoặc cần truyền tham số vào| Khi muốn thao tác với dữ liệu trong instance hay tham chiếu giá trị từ template, hạn chế tính toán lại, lắng nghe thay đổi của nhiều thuộc tính dữ liệu     |Xử lí khi muốn lắng nghe dữ liệu thay đổi nhiều, liên tục, hay lắng nghe một thuộc tính cụ thể của object, hoặc là bạn muốn xem một thuộc tính dữ liệu cho đến khi nó đạt đến một giá trị cụ thể nào đó rồi thao tác với nó|

# Lời kết
Trong bài viết này mình đã giới thiệu và tiến hành một số ví dụ để làm rõ được 3 khái niệm cơ bản trong VueJs mà mình gọi tếu ở đây là 3 anh em nhà **Methods, Computed và Watcher** :v, tất cả chỉ là những kiến thức khá cơ bản mà mình mới tìm hiểu được trong vài ngày qua nên có thể vẫn còn thiếu sót và nhầm lẫn. 

Hi vọng những nội dung mình đưa ra sẽ giúp ích thật nhiều cho các bạn. Hãy góp ý cho mình thật nhiều để mình rút kinh nghiệm và có động lực viết thêm những bài viết ngày càng chất lượng nhé. Hẹn gặp lại các bạn trong các bài viết tiếp theo. Xin cảm ơn vì đã giành thời gian để đọc bài viết khá dài của mình :D !!!

# Tài liệu tham khảo 
https://vuejs.org/v2/guide/computed.html

https://viblo.asia/p/tim-hieu-ve-computed-properties-va-watchers-RnB5p0WG5PG

https://viblo.asia/p/bai-5-su-dung-computed-trong-vuejs-su-khac-nhau-giua-computed-va-methods-Do754MMQKM6