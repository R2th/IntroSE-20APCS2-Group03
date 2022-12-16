Để nói về cách sử dụng `observable` state trong mobx 6, chúng ta sẽ nói lại một chút về `observable` state là gì?
`Observable` state trong `mobx` sẽ tương tự với `sate` trong trong `react` hay là  `store` trong redux; `Observable` state này có thể là strings, numbers, objects, arrays, Maps, Sets

![](https://images.viblo.asia/6fd610d0-0a7c-4c7c-a523-5831015b9862.png)

* `observable` định nghĩa các properties sẽ được tracked by mobx
* `action` đinh nghĩa các method sẽ modify các `observable` field
* `computed` định nghĩa các getter method sẽ kế thừa và tính toán từ các `observable` state và cache các output này cho những lần sử dụng tiếp theo

Mình có viết một bài về mobx render [ở đây ](https://viblo.asia/p/optimizing-react-rendering-voi-mobx-naQZRv8qZvx)

### Observable trong mobx 5
#### Sử dụng trong class:
```js
import { observable } from "mobx"

class Student {
     @observable students = []
     
     @computed
     get total() {
         return this.students.length
     }
     
     @action
     addStudent(student) {
          this.students.push(student)
     }
}
```

Ở cách dùng như trên, chúng ta sẽ define các `observable`, `computed`, `action` theo cú pháp anotation trên từng properties, getter, method của class

#### Sử dụng trong function:
```js
import { observable } from "mobx"

const Student = observable({
	students: [],
    get total() {
        return this.students.length
    },
    addStudent: mobx.action(function addStudent(student) {
        this.students.push(student)
    }),
});
```

### Observable trong mobx 6
Ở version 6 mới nhất của mobx, thì tất cả các `observable`, `computed`, `action` đều defined trong constructor của class

#### Sử dụng makeObservable trong class:
```js
import { makeObservable, observable, computed, action } from "mobx"

class Student {
    students

    constructor(students) {
        makeObservable(this, {
            students: observable,
            total: computed,
            addStudent: action
        })
        this.students = students
    }

     get total() {
         return this.students.length
     }
     
     addStudent(student) {
          this.students.push(student)
     }
}
```

#### Sử dụng makeAutoObservable trong class:
```js
import { makeAutoObservable } from "mobx"

class Student {
    students

    constructor(students) {
        makeAutoObservable(this)
        this.students = students
    }

     get total() {
         return this.students.length
     }
     
     addStudent(student) {
          this.students.push(student)
     }
}
```

Sử dụng `makeAutoObservable`, mobx sẽ tự động binding các `properties` tương ứng với `observable`, các `getter` method sẽ tương ứng với `computed`, các `method` sẽ tương ứng với `action`

#### Sử dụng trong function:
```js
import { makeAutoObservable } from "mobx"

function Student(students) {
    return makeAutoObservable({
        students,
        get total() {
          return this.students.length
        }
       addStudent(student) {
          this.students.push(student)
      }
    })
}
```

  Chúng ta có thể thấy việc định nghĩa `observable`, `action`, `computed` được defined ngay trong constructor, theo cách này thì mobx có thể quản lý các observable tốt hơn, optimized performance và đối với dev thì chúng ta có thể biết được tất cả các `observable`, `action`, `computed` một cách tổng quát và dễ dàng quản lý hơn.
  
  ### Migrating từ mobx 4/5 lên mobx 6
##### Đối với project sử dụng babel:

  1. Update `loose` properties từ `true` sang `false` `["@babel/plugin-proposal-class-properties", { "loose": false }]`
  2. Từ mobx 6, chúng ta không còn sử dụng các `decorator annotation` nên sẽ remove babel plugin này `plugin-proposal-decorators`