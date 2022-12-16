# Mở đầu
Khi phát triển một ứng dụng website thì có rất nhiều thứ chúng ta cần quan tâm tới như ngôn ngữ, công nghệ, logic, performance, .... rất dễ bị cuốn vào các thứ đó mà lại quên đi một vài thứ nhỏ nhặt nhưng cũng quan trọng không kém là viết Guide thứ mà giúp cho người dùng biết cách sử dụng ứng dụng. Cách thường thấy để viết hướng dẫn sự dụng phần mềm là dùng file doc, pdf,  hoặc đến tận nơi cầm tay chỉ chuột.

Nay mình sẽ giới thiệu một super-simple library có thể thực hiện điều đó một cách đơn giản với vue-tour

![](https://raw.githubusercontent.com/pulsardev/vue-tour/master/screenshot.gif)

# Dependencies
Vì là library của vue nên nếu chưa có project vue thì bạn có thể dùng vue-cli để init project vue nhanh chóng với lệnh: 
```
$ vue create my-new-project
```

Sau đó có thể install vue-tour băng cách sử sụng npm hoặc yarn
```
$ npm install vue-tour

# or with Yarn:
$ yarn add vue-tour
```
# Set Up
Thêm plugin và load css ở file main.js
```main.js
import Vue from 'vue'
import App from './App.vue'
import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

Cuối cùng thì chúng ta có thể dùng component `<vue-tour :steps="steps" />` ở bất kỳ đâu trong ứng dụng với prop của nó là một mảng các bước hướng dẫn step by step
# Usage
Có bốn bước để sử dụng vue-tour

**Đầu tiên**: Thêm unique class hoặc thuộc tính properties vào element mà bạn muốn target tới để hướng dẫn.

**Bước hai**: Khai báo các bước dùng mà bạn muốn hướng dẫn ngưới dùng thông qua một array các object mỗi object là một bước, và bao gồm: 

|  Thuộc tính | Mô tả |
| -------- | -------- |
| target     | là một CSS selector cho element mà đã khai báo ở bước đầu   |
| content | Nội dung mô tả cho element đó
|params | có thể khai báo 1 số thông tin config khác


**Bước 3**. Thêm component `<vue-tour name="whateverMyTourNameIs" :steps="mySteps"></vue-tour>`  vào dự án

**Cuối cùng**: Thêm lệnh `this.$tours['whateverMyTourNameIs'].start()` vào mounted hook hoặc thêm vào sự kiện nào đó khi bạn muốn bắt đầu tour hướng dẫn

```js
<template>
  <div class="container mx-auto my-5 flex justify-between">
    <div id="v-step-0" class="bg-green-500 p-5">Step 1</div>
    <div class="v-step-1 bg-blue-500 p-5">Step 2</div>
    <div data-v-step="2" class="bg-indigo-500 p-5">Step 3</div>

    <v-tour name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
  export default {
    name: 'my-tour',
    data () {
      return {
        steps: [
          {
            target: '#v-step-0',  // We're using document.querySelector() under the hood
            header: {
              title: 'Get Started',
            },
            content: `Discover <strong>Vue Tour</strong>!`
          },
          {
            target: '.v-step-1',
            content: 'An awesome plugin made with Vue.js!'
          },
          {
            target: '[data-v-step="2"]',
            content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
            params: {
              placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            }
          }
        ]
      }
    },
    mounted: function () {
      this.$tours['myTour'].start()
    }
  }
</script>

```
   
   
# Demo
![](https://images.viblo.asia/008baec0-e65f-4c15-a26c-0fe2a6549676.gif)

# Kết luận
Hy vọng qua bài viết này các bạn có thêm 1 lựa chọn để làm website của mình trở lên awesome hơn.
Cảm ơn các bạn đã theo dõi bài viết. hẹn gặp các bạn ở các bài viết sau !! :heart_eyes::heart_eyes::heart_eyes::heart_eyes:

Blog: https://phamtuananh1996.github.io

Tham khảo : https://github.com/pulsardev/vue-tour