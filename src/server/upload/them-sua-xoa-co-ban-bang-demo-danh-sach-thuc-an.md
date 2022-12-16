Chào các bạn, đây sẽ là bài thứ 2 trong series của mình. Ở bài trước thì mình đã làm chức năng đăng ký, đăng nhập. Vậy thì hôm nay mình sẽ tiến tới 1 chức năng crud cơ bản là thêm, sửa, xóa danh sách các món ăn.
## Main layout
Trước khi đi vào xây dựng chức năng thì chúng ta cần một khung cho website. Khung đó sẽ chứa những thứ mà chúng ta có thể tái sử dụng lại như menu, footer,... Ở đây thì mình cũng sẽ làm đơn giản thôi nhé, main layout của mình sẽ bao gồm menu dọc bên phải và phần để hiển thị thông báo. Như ở bài trước, ở component `AuthenticatedRoute` mình chỉ return ra 
```javascript
return <Route {...rest} render={props => <Component {...props} />}/>;
```

Thì bây giờ sẽ thành như này
```javascript
import SideBar from '../../../shared/components/sidebar';

 return (
        <div className='body-wrapper'>
            <div className='content-wrapper'>
                <ReduxToastr
                    timeOut={4000}
                    transitionIn='fadeIn'
                    transitionOut='fadeOut'
                    progressBar
                    closeOnToastrClick
                    getState={(state) => state.get('toastr')}
                />
                <Layout className='app-layout'>
                    <SideBar/>
                    <div className='app-layout__right'>
                        <Route {...rest} render={props => <Component {...props} />}/>
                    </div>
                </Layout>
            </div>
        </div>
    )
```

Ở đây bạn sẽ thấy có 2 phần mới chính là `ReduxToastr`,cái này thì bạn chỉ cần cài thư viện `react-redux-toastr` và import vào là được. Còn `<SideBar />` thì mình có import từ thư mục `shared` ,  cấu trúc hiện tại mình đang để như này:
![](https://images.viblo.asia/3a2de33c-c2de-464a-975d-04bc5a5f3c04.png)

Ở trong file `index.js` code sẽ như sau:
```javascript
import React from 'react';
import {Link} from "react-router-dom";
import { Menu, Button } from 'antd';
import {
    ControlOutlined,
    OrderedListOutlined
} from '@ant-design/icons';
import history from '../../../components/routes/history';
import './side-bar.scss';

const SideBar = () => {

    return (
        <div style={{ width: 256 }} className='menu'>
            <Menu
                defaultSelectedKeys={[history.location.pathname]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                className='menu-item-list'
            >
                <Menu.Item key='/setting'>
                    <ControlOutlined />
                    <span><Link to="/setting">Cài đặt</Link></span>
                </Menu.Item>
                <Menu.Item key='/list-food'>
                    <OrderedListOutlined />
                    <span><Link to="/list-food">Món ăn</Link></span>
                </Menu.Item>
            </Menu>
        </div>
    )
};

export default SideBar;
```

Ở đây thì giao diện mình lấy từ trong demo của ant design thôi chứ mình cũng không tự thiết kế đâu :v 
Vậy là hiện tại tất cả những component sử dụng `authenticatdRoute` sẽ đều có chung khung như trên.

## Thêm, sửa, xóa
Có thể bạn đang thắc mắc sao lại không tách ra từng phần cho rõ ràng, thì thật ra mình không tách ra, tất cả việc thêm sửa xóa mình sẽ viết chung ở một giao diện, như vậy mình thấy việc thao tác sẽ dễ dàng hơn rất nhiều. Đầu tiên thì mình sẽ nó về phần dữ liệu. Ở đây mình sẽ có 3 cột: `name`: tên món ăn, `calories`: số lượng calories của món ăn đó, `user_id`: id của user đã tạo ra món ăn. Thật ra trước đó mình có làm phần Cài đặt chung trước rồi nhưng nếu bạn làm phần này được thì bạn sẽ quay lại làm phần đó khá là ez. Ở phần cài đặt chung thì mình có cho người dùng tùy chỉnh số ngày muốn các món ăn quay ra trong list sẽ không thể lặp lại và số lượng calories muốn nạp vào một ngày. Thêm số lượng calories muốn nạp vào vì ngày xưa người yêu cũ mình thích tập gym và thường tính toán lượng calories một ngày phải nạp vào (nghĩ lại mà lệ chảy trong tìm :cry:). Vì những nhu cầu trên nên mình đã xây dựng database phần danh sách các món ăn như kia. 

### Frontend
#### Module
```javascript
import {createAction, handleActions} from 'redux-actions';
import {put, call, takeLatest} from 'redux-saga/effects';
import {fromJS} from 'immutable';
import axios from '../../utils/axios';
import handleResponse from '../../utils/handle-respone';
import history from '../../components/routes/history';

//Action types
export const UPDATE = 'foods/UPDATE';
export const UPDATE_SUCCESSFULLY = 'foods/UPDATE_SUCCESSFULLY';
export const SHOW = 'foods/SHOW';
export const SHOW_SUCCESSFULLY = 'foods/SHOW_SUCCESSFULLY';


//Action creators
export const update = createAction(UPDATE);
export const updateSuccessfully = createAction(UPDATE_SUCCESSFULLY);
export const show = createAction(SHOW);
export const showSuccessfully = createAction(SHOW_SUCCESSFULLY);


// Reducer
const foodsInitialState = fromJS({
    data: []
});

const updateData = (state, action) => state.setIn(['data'], fromJS(action.payload));


export default handleActions({
    [SHOW_SUCCESSFULLY]: updateData
}, foodsInitialState);

// Selectors
export const getFoods = state => state.get('foods').get('data');

// Sagas
export function* foodsSagas() {
    yield takeLatest(update, onUpdate);
    yield takeLatest(show, onShow);
}

function* onUpdate(action) {
    const response = yield call(onUpdateApi, action.payload);

    if (response.status === 200) {
        yield put(updateSuccessfully(response.data.data));
        handleResponse(response);

        return;
    }

    handleResponse(response);
}

function* onShow(action) {
    const response = yield call(onShowApi);

    if (response.status === 200) {
        const {callback} = action.payload;

        if (callback) {
            const {data} = response;

            data.forEach((item, index) => {
                item.key = index;
            });
            
            callback(data);
        }

        yield put(showSuccessfully(response.data));

        return;
    }

    handleResponse(response);
}

// Apis
function onUpdateApi(data) {
    const url = 'api/foods/update';

    return axios.post(url, data)
        .then(response => response)
        .catch(error => error.response);
}

function onShowApi() {
    const url = 'api/foods/show';

    return axios.get(url)
        .then(response => response)
        .catch(error => error.response);
}
```
Phần này thì nếu các bạn đã nắm được về redux thì có lẽ không có gì khó, còn nếu bạn chưa rõ thì có thể đọc thêm hoặc comment phần chưa hiểu mình sẽ giải thích kĩ cho bạn nha. Lúc này, file `rootReducer` của mình sẽ như sau
```
import { combineReducers } from 'redux-immutable';
import { reducer as toastrReducer } from 'react-redux-toastr';
import authenticate from './modules/authenticate';
import setting from './modules/setting';
import foods from './modules/food';

export default function rootReducer(asyncReducers) {
    return combineReducers({
        toastr: toastrReducer,
        authenticate,
        setting,
        foods,
        ...asyncReducers
    });
}
```
Mỗi lần bạn tạo ra một reducer mới thì bạn hãy import vào và thêm nhé.

Còn file `rootSaga`
```javascript
import { all, fork } from 'redux-saga/effects';
import {authenticateSagas} from './modules/authenticate';
import {settingSagas} from './modules/setting';
import {foodsSagas} from "./modules/food";

export default function* rootSaga() {
    yield all([
        fork(authenticateSagas),
        fork(settingSagas),
        fork(foodsSagas)
    ]);
}
```
Ở đây thì mỗi khi có một saga function mới thì bạn nhớ `fork` nhé

#### View
Giờ ta sẽ tạo view, mình sẽ sử dụng editable cell table của ant design nhé, các bạn có thể xem demo ở đây: https://ant.design/components/table/#components-table-demo-edit-row. Các bạn hãy tạo file như sau: `components/pages/list-food/list-food.js`. Sau đó import ở trong `index.js` của routes. 
```javascript
import ListFood from '../pages/list-food/list-food';

 /* List Food */
<AuthenticatedRoute
    exact
    path='/list-food'
    component={ListFood}
 />
```

Và giờ tới file `list-food.js`
```javascript
import React, {useEffect, useState, useRef, useContext} from 'react';
import {useDispatch} from 'react-redux'
import {Form, Input, Button, Popconfirm, Table} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import propsToJS from "../../../utils/prop-to-js";
import {update, show} from "../../../stores/modules/food";

const ListFood = () => {
    const [foodsState, setFoodsState] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(show({callback: setFoodsState}))
    }, []);

    const EditableContext = React.createContext();

    const EditableRow = ({index, ...props}) => {
        const [form] = Form.useForm();

        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
                              title,
                              editable,
                              children,
                              dataIndex,
                              record,
                              handleSave,
                              ...restProps
                          }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef();
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const save = async e => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                onChangeInput(values, record, dataIndex);
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={restProps.rule}
                >
                    <Input onPressEnter={save} onBlur={save} ref={inputRef}/>
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    const onChangeInput = (values, record, nameInput) => {
        const data = [...foodsState];
        const newData = data.map(item => {
            if (item.id === record.id) {
                item[nameInput] = values[nameInput];
            }

            return item
        });

        setFoodsState(newData);
    };

    const handleDelete = key => {
        const data = [...foodsState];
        setFoodsState(data.filter(item => item.key !== key));
    };

    const handleAdd = () => {
        let data = [...foodsState];
        const newData = {
            key: foodsState.length + 1,
            id: null,
            name: 'Nhập tên món ăn',
            calories: 0,
        };

        data.push(newData);
        setFoodsState(data);
    };

    const handleSave = row => {
        const data = [...foodsState];
        dispatch(update(data));
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const renderColumns = [
        {
            title: 'name',
            dataIndex: 'name',
            editable: true,
            rule: [
                {
                    required: true,
                    message: 'name is required.',
                },
            ]
        },
        {
            title: 'calories',
            dataIndex: 'calories',
            editable: true,
            rule: []
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) =>
                foodsState.length ? (
                    <Popconfirm title="Bạn có chắc muốn xóa chứ?" onConfirm={() => handleDelete(record.key)}>
                        <a>Xóa</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const columns = renderColumns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                rule: col.rule
            }),
        };
    });

    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Thêm món
            </Button>
            <Button
                onClick={handleSave}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Lưu lại
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={foodsState}
                columns={columns}
            />
        </div>
    );
};

export default propsToJS(ListFood);
```

Nhìn đoạn code dài ngoằng này chắc cũng hơi choáng, trừ những phần mình lấy từ ant design ra thì mình sẽ giải thích luồng hoạt động của nó nhé. Đầu tiên thì khi truy cập trang này, chúng ta sẽ cần gọi 1 api lấy tất cả các món ăn của user, sau đó sẽ setState danh sách những món đó. Và mình đã sử dụng `useEffect`
```javascript
    const [foodsState, setFoodsState] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(show({callback: setFoodsState}))
    }, []);
   ```
   Khi bạn sử dụng cách này thì hãy cẩn thận việc bị call api một cách vô hạn do việc component cứ bị render lại mỗi lần gọi api nhé, nếu bạn viết code như mình sẽ không bị, nhưng nếu như sau là sẽ bị nè:
   ```javascript
      useEffect(() => {
        dispatch(show({callback: setFoodsState}))
    });
   ```
   Nếu user muốn thêm món thì có thể ấn vào `Thêm món`, ở button đó mình có sử dụng sự kiện `onClick={handleAdd}`
   ```javascript
    const handleAdd = () => {
        let data = [...foodsState];
        const newData = {
            key: foodsState.length + 1,
            id: null,
            name: 'Nhập tên món ăn',
            calories: 0,
        };

        data.push(newData);
        setFoodsState(data);
    };
   ```
   Ở đây, mỗi món ăn sẽ có 1 key khác nhau, và chúng ta sẽ sử dụng key đó để xóa hoặc edit. Và khi xóa thì sẽ như này
   ```javascript
     const handleDelete = key => {
        const data = [...foodsState];
        setFoodsState(data.filter(item => item.key !== key));
    };
   ```
   Còn đây là khi edit
   ```javascript
    const onChangeInput = (values, record, nameInput) => {
        const data = [...foodsState];
        const newData = data.map(item => {
            if (item.id === record.id) {
                item[nameInput] = values[nameInput];
            }

            return item
        });

        setFoodsState(newData);
    };
   ```
   
   Và cuối cùng là save: 
   ```javascript
    const handleSave = () => {
        const data = [...foodsState];
        dispatch(update(data));
    };
   ```
   
   ### Backend
  
  Ở đây thì mình sẽ chỉ show phần code ở `Controller` thôi nhé, còn về các relation và route các kiểu thì mình sẽ bỏ qua. Để hiển thị những món ăn thì đơn giản như sau:
  ```php
   public function show()
   {
        $foods =  Auth::user()->foods;

        return response()->json($foods, 200);
   }
  ```
  
  Còn đây là để thêm, sửa, xóa các món ăn:
  ```php
   public function update(Request $request)
    {
        $data = $request->all();
        $createData = $this->getCreateOrUpdateData($data);
        $updateData = $this->getCreateOrUpdateData($data, false);
        $this->deleteData($data);

        if ($createData) {
            $this->createData($createData);
        }

        if ($updateData) {
            $this->updateData($updateData);
        }

        return response()->json([
            'data' => Auth::user()->foods,
            'message' => 'Lưu thành công',
        ]);

    }

    private function deleteData($data)
    {
        $foodsId = Auth::user()->foods->pluck('id')->toArray();

        $dataId = [];

        foreach ($data as $item) {
            if ($item['id']) {
                array_push($dataId, $item['id']);
            }
        }

        if (array_diff($foodsId, $dataId)) {
            $deletedFoods = Auth::user()->foods->whereIn('id', array_diff($foodsId, $dataId));

            foreach ($deletedFoods as $food) {
                $food->delete();
            }
        }
    }

    private function getCreateOrUpdateData($data, $isCreate = true)
    {
        $result = [];

        foreach ($data as $item) {
            if (($item['id'] === null && $isCreate) || ($item['id'] !== null && !$isCreate)) {
                array_push($result, $item);
            }
        }

        return $result;
    }

    private function createData($data)
    {
        $data = $this->makeData($data);
        Food::insert($data);
    }

    private function updateData($data)
    {
        $dataId = [];

        foreach ($data as $item) {
            if ($item['id']) {
                array_push($dataId, $item['id']);
            }
        }

        $foods = Auth::user()->foods->whereIn('id', $dataId);

        foreach ($foods as $food) {
            foreach ($data as $item) {
                if ($item['id'] == $food->id) {
                    $food->update([
                        'name' => $item['name'],
                        'calories' => $item['calories'],
                    ]);
                }
            }
        }
    }

    private function makeData($data)
    {
        $result = [];

        foreach ($data as $item) {
            array_push($result, [
                'id' => $item['id'],
                'name' => $item['name'],
                'calories' => $item['calories'],
                'user_id' => Auth::user()->id,
            ]);
        }

        return $result;
    }
  ```
 Thêm thì có lẽ không có gì để nói. Ở phần sửa thì đơn giản là mình sẽ tìm những món ăn nào có id trùng với những id đã đẩy lên và sau đó sẽ update. Còn xóa thì mình sẽ so sánh mảng id lúc trước và sau khi submit dữ liệu, nếu sau khi submit mà thiếu mất id nào thì có nghĩa nó đã bị xóa mất.
 
 
Bài viết hôm nay của mình sẽ dừng lại ở đây. Bài lần sau mình sẽ làm chức năng quay số random là sẽ hoàn thiện series này. Cảm ơn các bạn đã đọc. Nếu có điều gì cần tra