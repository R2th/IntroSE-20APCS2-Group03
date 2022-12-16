# 1. Mở đầu

Làm việc với javascript thì chắc hẳn các bạn không còn lạ gì với kiểu `object`, nhất là khi bạn xử lý dữ liệu nhận được từ `api`.  Và cách thông dụng nhất để lấy dữ liệu từ `object` là thông qua `property`

```
{
    data: {
        school: {
            class: {
                student: {
                    name: 'pikachu'
                }
            }
        }
    }
}

const name = data.school.class.name;
```

Cách xử lý trên sẽ dễ dàng cho bạn 1 cái bug nếu data trả về null

```
{
    data: null
}

const name = data.school.class.name;

Uncaught TypeError: Cannot read property 'school' of null
```

Để handle case trên thì cách truyền thống là

```
const name = data
    && data.school
    && data.school.class
    && data.school.class.student
    && data.school.class.student.name;
```

Khá là rườm rà...

# 2. Optional chaining

`Optional chaining` là tính năng giúp bạn truy cập property của object nhanh và dễ dàng hơn

```
{
    data: null
}

const name = data?.school?.class?.student?.name;

name = undefined
```

`Optional chaining` sẽ trả ra null nếu phần đứng trước `?.` là `null` hoặc `undefined`.

Tương tự như truy cập `object` qua `property`, chúng ta cũng có thể dùng `optional chaining` cho việc truy cập `object` qua `key`

```
name = data?.['school']?.['class']?.['student']?.['name'];
```

# 3. Chú ý
`Optional chaining`  rất tiện nhưng không nên quá lạm dụng nó. Chúng ta chỉ nên dùng nó cho các `property` là `optional`.

```
{
    data: {
        school: {
            class: {
                student: {
                    name: 'pikachu'
                }
            }
        }
    }
}
```

Với ví dụ trên, `school` là bắt buộc phải có còn `class` không có cũng được thì chúng ta nên viết

```
const name = data.school?.class?.student?.name;
```

Nếu chúng ta dùng `optional chaining` cho `school` thì trong trường hợp `school` là `null` hoặc `undefined` thì code vẫn pass và chúng ta sẽ mất thời gian hơn để debug.