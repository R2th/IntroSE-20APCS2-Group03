Mình thì thi thoảng mình cũng viết vài module trên npm để phục vụ cho công việc của riêng mình, và khi đẩy lên npmjs cũng là một cách gì đó để mình giúp đỡ cộng đồng lập trình viên khỏi phải làm lại công việc mà mình đã làm, và mình đã làm điều đó như thế nào? Đi cùng mình nhé...

À, thật ra thì không định viết mấy bài về chủ đề này đâu nhưng bị hỏi nhiều quá và mình lười nên thôi viết luôn một bài cho nó khoẻ.

## 1. Lên ý tưởng

Bước đầu tiên luôn là lên ý tưởng để biết chúng ta cần làm gì và sẽ làm gì. Vì đây là bài hướng dẫn nên mình không đề cập ý tưởng gì cao siêu, giả sử bạn đang sử dụng [node-cache](https://github.com/node-cache/node-cache) và vì một lý do gì đó bạn muốn dùng file `.json` để tiện lưu trữ và kiểm tra thay đổi gì đó.

Bạn thử tìm nhưng chợt nhận ra không có một module nào phù hợp với yêu cầu của bạn cả, hoặc có thì bạn không thích cách xử lý của nó nên bạn quyết định tạo ra một module mới để hỗ trợ công việc của bạn và biết đâu sẽ hỗ trợ cho người xung quanh.

Ý tưởng của bạn sẽ làm theo node-cache với câu slogan của nó: _"A simple caching module that has `set`, `get` and `delete` methods and works a little bit like memcached."_

## 2. Bắt đầu code: 

Xong phần lên ý tưởng thì chúng ta sẽ tiếp tục với phần code

### 2.1: Setup dự án

Mình sẽ dùng những lệnh bình thường như `$ yarn init -y` để tạo ra phần core thôi, ở bài này mình mặc định nghĩ rằng các bạn đã từng làm việc với node.js nhiều lần rồi nên mình sẽ không để cập các bước cơ bản, code mình sau khi setup xong sẽ như bên dưới, hy vọng các bạn không khó chịu với struct của mình.

```bash
├── .gitea
│   └── drone.yml
├── .gitignore
├── .eslintignore
├── .eslintrc.js
├── jest.config.js
├── package.json
├── .prettierrc
├── README.md
├── renovate.json
├── src
│   ├── index.ts
│   └── __tests__
│       └── index.test.ts
├── tsconfig.json
└── yarn.lock
```

Bạn có thể thêm thông tin của repo ở: [https://git.f97.xyz/f97/json-cache](https://git.f97.xyz/f97/json-cache)

### 2.2: Code tính năng

Như đã nói ở đầu bài là module của mình sẽ rất nhỏ và có 3 tính năng chính là: `get`, `set` và `delete`

Vì nhiều lý do nên mình đoán file `index.ts` của mình ban đầu sẽ như thế này: 

```ts
class JsonCache {
    path: string
    constructor (_path: string) {
        this.path = _path
    }

    async set (_key: string, _value: any) {
    }

    async get (_key: string) {
    }

    async delete (_key: string) {
    }
}
export default JsonCache
```

và file `__test__/index.test.ts` sẽ là như thế này:

```ts
import JsonCache from '../'
import os from 'os'

jest.setTimeout(30000)

const cache = new JsonCache(`${os.tmpdir}/json-file-cache.json`)

test('cache.set', async () => {
})

test('cache.get', async () => {
})

test('cache.delete', async () => {
})
```

Mình chỉ viết trước khung xương để tý nữa không bỡ ngỡ thôi, nên có thể mình sẽ thay đổi về sau.

#### 2.2.a: Code method set(_key, _value)

Tại sao method `set` lại được viết trước ư, vì không có set lấy đâu `get` =))) À, ban đầu mình định dùng `fs` để viết file nhưng cuối cùng thì mình lười quá nên quyết định đứng trên vai người khổng lồ, mình dùng module [write-file-atomic](https://github.com/npm/write-file-atomic) của chính npm viết để ghi file cho nhanh. Cuối cùng code ban đầu của mình là như thế này:

```ts
import writeFileAtomic from 'write-file-atomic'

[...]

async set (_key: string, _value: any) {
    const _data = { [_key]: _value }
    return await writeFileAtomic(this.path, JSON.stringify(_data))
}
```

Rồi mình nhận ra nếu như thế này thì chỉ ghi được có một `key` với `value` thôi à, thế là sau  30s sau code nó thành như vầy: 

```ts
import writeFileAtomic from 'write-file-atomic'
import { promises as fs } from 'fs';

const readFile = async (path:string) => {
    try {
        const buffer = await fs.readFile(path)
        return new TextDecoder().decode(buffer)
    } catch (error) {
        // Mình không quan tâm gì cả, cứ err là ghi file mới =))) :luoibieng:
        await fs.writeFile(path, '{}')
        return '{}'
    }
}

[...]

async set (_key: string, _value: any) {
    if(!_key || !_value ) throw new Error('key or value not found')
    const _cache = JSON.parse(await readFile(this.path))
    delete _cache[_key]
    const _data = { ..._cache, [_key]: _value }
    return await writeFileAtomic(this.path, JSON.stringify(_data))
}
```

Rồi sau đó mình sẽ hí hửng đi viết unit test, ở phạm vi bài viết này mình xin phép chỉ test 2 case cơ bản của method set là `happy case` và `value` là `undefined`, nếu bạn viết một module thực cho riêng mình bạn nếu viết test kĩ càng hơn nếu muốn an toàn :3 

```ts
beforeAll(async () => {
  fs.writeFileSync(path, '{}')
})

test('cache.set numbers', async () => {
  await cache.set('numbers', [1, 3, 4, 6, 7, 8])
  expect(fs.readFileSync(path, 'utf8')).toBe('{"numbers":[1,3,4,6,7,8]}')
})

test('cache.set error', async () => {
  await expect(cache.set('something', undefined))
    .rejects
    .toThrow('key or value not found')
})
```

![https://i.imgur.com/8nifoxl.png](https://i.imgur.com/8nifoxl.png)

Yeah, quá tuyệt vời kết quả đạt được test passed cả 4, lý do có 2 cái là `cache.get` với `cache.set` mình setup ngay từ đầu. (Tất nhiên passed rồi mình mới post chứ =))))

#### 2.2.b: Tiếp theo với method get(_key)

method này thì đơn giản, chúng ta chỉ cần đọc file rồi show kết quả với key được truyền vào là okay, ngoài ra phải parse giá trị từ file qua json vì file là string, code như sau:

```ts
[...]
async get (_key: string) {
    const _data = await readFile(this.path)
    return JSON.parse(_data)[_key]
}
```

```ts
[...]
test('cache.get', async () => {
  const _numbers = await cache.get('numbers')
  expect(_numbers).toMatchObject([1, 3, 4, 6, 7, 8])
})
```

Case này mình chỉ code với `happy case`, vì mình thấy quá nhiều dòng thì bài viết dài quá chứ không phải mình lười, thật đấy. Và tất nhiên là test này passed.

#### 2.2.c: cuối cùng là method delete(_key)

Aizz, lười quá... update luôn chung ở phần sau nhé :3 

```ts
[...]
async delete (_key: string) {
    const _cache = JSON.parse(await readFile(this.path))
    delete _cache[_key]
    return await writeFileAtomic(this.path, JSON.stringify(_cache))
}
```

```ts
[...]
test('cache.delete', async () => {
   await cache.delete('numbers')
   expect(fs.readFileSync(path, 'utf8')).toBe('{}')
})
```

## Kết Phần I:


![https://i.imgur.com/81ZGq27.png](https://i.imgur.com/81ZGq27.png )

Về cơ bản chúng ta có thể xong phần code nếu như sau khi chạy lên như trên là được, tất nhiên với một dự án nhỏ như vậy thì cấu trúc như thế này là đủ rồi nhưng nếu làm lớn hơn có thể sẽ khác nữa. Các bạn có thể xem thêm về code tại đây: [f97/json-cache#6cc5cee8c3](https://git.f97.xyz/f97/json-cache/src/commit/6cc5cee8c39ae87dee139a7e3e3d7f16c94cff3f)

_*Note: Mình vừa publish bài viết tại đây: https://f97.xyz/cach-minh-viet-mot-npm-module-phan-1.html nhưng thấy chả ai xem nên đem đi post lung chung cho vui, tại cũng đang rảnh mà :((((_