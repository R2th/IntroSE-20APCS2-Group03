Trước khi đọc vào bài viết này, nếu bạn chưa có 1 khái niệm hay kiến thức cơ bản gì về typescript hay react thì hãy ghé qua những link này trước khi đọc tiếp nhé:

Typescript: https://www.typescriptlang.org/, React: https://reactjs.org/docs/getting-started.html

Chúng ta sẽ đưa typescript vào ứng dụng React vì những lợi ích của nó mang lại cho ứng dụng, mang lại cho nó tính ổn định hơn, dễ đọc hơn và dễ quản lý hơn, nhưng ưu điểm này sẽ được thấy rõ hơn khi bạn đọc qua docs của typescript.

**1) Khởi tạo Create React App với Typescript:**

bạn có thể copy dòng lệnh sau vào cmd 

``npx create-react-app name-app --typescript``

hoặc ``yarn create react-app app_name --typescript``

Sau khi tạo xong thì có 1 số điều bạn cần phải chú ý:

- Trong project bây giờ có 1 tệp tsconfig.json cấu hình các tùy chọn cho trình biên dịch typescript.
- Các file .js hiện là các file .tsx. Trình biên dịch Typescript sẽ nhận tất cả các file tsx tại thời gian biên dịch.
-  Có 1 file React-app-env.d.ts để tham chiểu các react-scripts types. File này được tự động khởi tạo khi chạy yarn start.

**2) Cài đặt TSLints-React:**

Cài đặt công cụ linting cực kỳ hữu ích với Typescript và React. Các công cụ linting cực kỳ nghiêm ngặt với thiết lập mặc địch của chúng. Chúng ta sẽ cài đặt và lưu global cho nó.

``yarn global add tslint typescript tslint-react``

Sau đó vào trong project của bạn, khởi tạo tslint:

``tslint --init``

Câu lệnh trên sẽ tạo ra file ``tslint.json`` với các default options. chúng ta sẽ thay thế nội dung trong đó với những dòng dưới đây:

```
{
    "defaultSeverity": "error",
    "extends": [
        "tslint-react"
    ],
    "jsRules": {
    },
    "rules": {
        "member-access": false,
        "ordered-imports": false,
        "quotemark": false,
        "no-console": false,
        "semicolon": false,
        "jsx-no-lambda": false
    },
    "rulesDirectory": [
    ],
    "linterOptions": {
        "exclude": [
            "config/**/*.js",
            "node_modules/**/*.ts"
       ]
   }
}
```

**3) Interfaces và Types của Props và State**

Áp dụng interface vào Component sẽ làm cho dữ liệu được sử dụng (như props truyền vào component) phải tuân thủ cấu trúc dữ liệu của nó. Interface có thể được define trong component hay import từ 1 file khác. interface được define như sau:

```
interface DotaHero {
    name: string;
    nickName: string;
    strength: number;
    agility: number;
    inteligent: number;
    attackRange: number;
    speedMovement: number;
}
```

Chúng ta đã tạo ra interface DotaHero có chứa các giá như name, nickName hay strength. Để áp dụng interface vào class components hoặc stateless function components, chúng ta sử dụng cú pháp như sau:
 
 Đối với class components
```
export class MyGame extends React.Component<DotaHero> {
    ...
}
```

Đối với stateless function components
```
function MyGame(props: DotaHero) {
    ...
}
```

Nếu bạn muốn define interface ở trong 1 file khác thì chỉ cần ``export interface DotaHero;`` và import nó ở trong file Component muốn sử dụng nó: ``import { DotaHero } from '../interface/index'``;

**4) Redux với Typescript**

Đầu tiên chúng ta sẽ define interface cho Redux store. Xác định state sẽ dụng trong project và define nó trong interface, ví dụ:

```
export interface MyStore {
    injoker: object;
    ebolaSpirit: object;
    allaHukabar: object;
}
```

Sau đó, define interface cho action types và actions. Action types có thể được define bằng ``const`` và ``type``. VÍ dụ:
```
export const PLANT_MINE = 'PLAY_TECHIES';
export type PLANT_MINE = typeof PLANT_MINE;

export const USE_TOSS = 'PLAY_TINY';
export type USE_TOSS = typeof USE_TOSS;
```
Chú ý rằng, những constant chúng ta đã define được sử dụng như interface type, chúng ta có thể import nó để sử dụng và define interface 
và action type
```
import * as constants from '../constants';

//define action interfaces
export interface PlantMine {
    type: constants.PLANT_MINE;
    mine: string;
}
export interface UseToss {
    type: constants.USE_TOSS;
    toss: string;
}

//define actions
export function plantMine(mine: string): PlantMine ({
   type: constants.SET_LANGUAGE,
   mine,
});
export function useToss(toss string): UseToss ({
   type: constants.SET_COUNTRY,
   toss,
});
```

Cuối cùng chúng ta sẽ define Reducers và tạo ra initial Store.

Để đơn giản việc chỉ định action type trong reducer, chúng ta có thể tận dụng ưu điểm của union types, được giới thiệu trong Typescript 1.
Union type cho chúng ta có khả năng kết hợp nhiều hơn 2 loại type thành 1 loại type. Chúng ta sẽ làm 1 ví dụ trong file actions.

``export type ComboWombo = PlaneMine | UseToss;``

bây giờ chúng ta có thể apply ``ComboWombo`` type trong reducer action, ví dụ
```
import { ComboWombo } from '../actions';
import { MyStore } from '../types/index';
import { PLANT_MINE, USE_TOSS } from '../constants/index';
export function locality(state: StoreState, action: Locality):     StoreState {
  
  switch (action.type) {
    case PLANT_MINE:
      return return { ...state, mine: action.mine};
    case USE_TOSS:
      return { ...state, toss: action.toss};
   }
  return state;
}
```

Tạo initial Store với ``createStore()`` của ``redux``

```
import { createStore } from 'redux';
import { locality } from './reducers/index';
import { MyStore } from './types/index';
const store = createStore<StoreState>(locality, {
   mine: 'Remote Mine',
   toss: 'Centaur',
});
```

**5) mapStateToProps  và mapDispatchToProps**

Vậy với reducers và initial Store hơi khác với React chúng ta hay làm việc như vậy, liệu mapState và mapDispatch có khác biệt gì không.Quan sát ví dụ:

```
// mapStateToProps example

import { MyStore } from '../types/index';
interface LocalityProps = {
    mine: string;
    toss: string;
}
function mapStateToProps (state: MyStore, ownProps: LocalityProps) ({
     mine: state.mine,
     toss: state.toss,
});

// mapDispatchToProps example

const mapDispatchToProps = {
   actions.plantMine,
   actions.useToss,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

như bạn thấy, cũng không có khác biệt quá nhiều so với khi không có typeScript, nhưng rõ ràng là type của các state khi được truyền vào từ reducer sẽ được kiểm soát chặt chẽ hơn so với thông thường.

**6) Tổng kết**

Từ những hướng dẫn cơ bản ở trên về cách áp dụng TypeScript vào React Redux, bạn cũng có thể nhận ra được lợi ích phần nào khi chúng ta áp dụng nó vào dự án phải không nào.

Bài viết của mình đến đây là hết. cảm cơn mọi người đã bỏ thời gian để theo dõi