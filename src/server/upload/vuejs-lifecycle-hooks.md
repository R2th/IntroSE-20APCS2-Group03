Bài viết này chúng ta sẽ cùng tim hiểu về một từ khóa phổ khá phổ biến về Vue đó là Vuejs Lifecycle Hooks hay còn gọi là vòng đời của Vuejs. Nói là phổ biến vì bất kì component chúng ta cũng cần sủ dụng đến các phương thức trong đó. Giờ chúng ta cùng tìm hiểu về vòng đời của Vue nhé.
## 1. Khái niệm
Về khái niệm thì vòng đời đơn giản chúng ta hiểu là từ khi sinh ra đến khi chết đi.
Lifecycle hooks là thành phần quan trọng của bất kì component nào, nó cho biết khi nào thành phần được tạo, thêm vào DOM, cập nhật hoặc hủy. 

Chúng ta sẽ thấy rõ hơn trong bức hình dưới đây
![](https://images.viblo.asia/ce9194ce-534b-4996-b6df-3ddc41f5b917.png)

## 2. Các phương thức trong Lifecycle Hooks
### beforeCreate 
**beforeCreate** chạy ở phần khởi tạo của component khi mà dữ liệu chưa được thực hiện và các sự kiện chưa được thiết lập. Tức là chạy trước khi khai báo data và các sự kiện.
```js
<script>
    export default {
    	beforeCreate() {
    		console.log('hello')
    	}
    }
</script>
```

Nếu chúng ta làm như sau:
```js
<script>
    export default {
    	data() {
    		return {
    			message: 'this is data'
    		}
    	},
    	beforeCreate() {
    		console.log(this.message)
    	}
    }
</script>
```
Như này thì **this. message** sẽ bị undefine

### created
Trong **created**, bạn sẽ có thể truy cập dữ liệu và các sự kiện đang hoạt động, các template  và virtual DOM chưa được mounted hoặc rendered.
```js
<script>
export default {
  data() {
    return {
      property: 'first value'
    }
  },
  computed: {
    propertyComputed() {
      // update khi this.property thay đổi
      return this.property
    }
  },
  created() {
    this.property = 'second value'
    // propertyComputed sẽ update vì this.property đã thay đổi
  }
}
</script>
```
### Mounting (DOM Insertion)

Mounting được sử dụng nhiều nhất, tốt hơn hoặc xấu hơn. Chúng cho phép truy cập vào components ngay lập tức trước và sau lần render đầu tiên, tất nhiên nó sẽ không chạy lúc server render
Không nên sử dụng trong trường hợp muốn fetch dữ liệu cho component lúc khởi tạo. Thay vào đó dùng created ( hoặc created + activated cho component keep-alive ).
### beforeMount

Nó sẽ thực hiện sau khi render function hoàn tất và trước khi render chính thức phần tử DOM của lớp Vue. Thường thì rất đụng đến hook này.
```js
<script>
export default {
  beforeMount() {
    console.log(`vẫn chưa thể truy cập đến $el ở đây`)
  }
}
</script>
```
### mounted
Trong mounted hook, chúng ta có thể hoàn toàn truy cập vào component, templates and rendered DOM (qua this.$el).
Đây cũng là hook được sử dụng nhiều nhất. 
```js
<template>
  <p>đây là text bên trong component</p>
</template>

<script>
export default {
  mounted() {
    console.log(this.$el.textContent) 
    // đây là text bên trong component.
  }
}
</script>
```
### Updating (Diff & Re-render)
Updating hook sẽ được sử dụng khi có sự thay đổi ở component. Các hook sẽ được gọi khi component được re-render.

Không nên sử dụng các hook này nếu muốn biết các reactive property nào trên component đã thay đổi. Thay vào đó hãy sử dụng computed và watch.
### beforeUpdate
```js
export default {
	data() {
		return {
			counter: 0
		}
	},
	beforeUpdate() {
		console.log(this.counter);
        // Logs counter mỗi giây, trước khi DOM updates
  },
  created() {
    setInterval( () => {
      this.counter++;
    }, 1000)
  }
}
```
### updated
Updated hook chạy sau khi data thay đổi trong component và DOM re-renders. Nếu muốn truy cập DOM sau khi property thay đổi, đây sẽ là nơi an toàn nhất.
```js
<template>
	<p ref="dom-element">{{ counter }}</p>
</template>
<script>
export default {
	data() {
		return {
			counter: 0
  }
  },
  updated() {
    // gọi mỗi giây
    console.log(+this.$refs['dom-element'].textContent === this.counter)
  },
  created() {
    setInterval( () => {
      this.counter++;
    }, 1000)
  }
}
</script>
```
### Destruction (Teardown)
Destruction Hook dùng thực hiện các hành động khi component bị huỷ bỏ. Chúng kích hoạt khi component của bạn bị hủy và xóa khỏi DOM.
### beforeDestroy
beforeDestroy được gọi trước khi component bị hủy bỏ. Đây là thời điểm thích hợp để xóa bỏ các dữ liệu, sự kiện đã được đăng kí.
```js
export default {
  data() {
    return {
      someLeakyProperty: 'Em sẽ sử dụng hết bộ nhớ luôn!'
    }
  },
  beforeDestroy() {
    this.someLeakyProperty = null
    delete this.someLeakyProperty
  }
}
```
### destroyed
destroyed hook được gọi khi component đã bị hủy.
```js
export default {
  destroyed() {
    console.log(this) // không còn gì ở đây
    MyCreepyAnalyticsService.informService('Component destroyed!')
  }
}
```

Trên đây là các phương thức của Lifecycle Hooks

**Tài liệu tham khảo**:

https://alligator.io/vuejs/component-lifecycle/

https://viblo.asia/p/vuejs-life-cycle-hooks-OeVKBRXYKkW

http://vuilaptrinh.com/2018-11-07-gioi-thieu-lifecycle-method-vuejs/