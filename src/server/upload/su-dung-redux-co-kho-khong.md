### Redux là gì ?
![](https://images.viblo.asia/10041545-25a8-4785-9486-194ed4e6ae5a.jpg)

**Redux** là một thư viện Javascript giúp tạo ra thành một lớp quản lý trạng thái của ứng dụng. Được dựa trên nền tảng tư tưởng của kiến trúc **Flux** do 	[Facebook](https://www.facebook.com/) giới thiệu, do vậy **Redux** thường là bộ đôi kết hợp hoàn hảo với **React** (	[React Js](https://reactjs.org/) và [React Native](https://facebook.github.io/react-native/) ).
Và đương nhiên khi nhắc đến reactJs điều đầu tiên ngưới ta nhớ đến đó chính là redux.

### Redux có khó không?
![](https://images.viblo.asia/da8bad66-c235-43c7-96e7-4addcfb1f6c4.jpg)

Điều may mắn là việc sử dụng Redux js là không quá khó, việc thay đổi trạng thái của ứng dụng, được thực hiện thông qua các hàm thuần tuý. Đưa vào giá trị sự kiện, trạng thái hiện tại và hàm trả về trạng thái tiếp theo. Dù tương lai ứng dụng của bạn có thể rất lớn, nhưng các hàm reducer này thì chỉ cần nhỏ gọn thay đổi trên từng lá của cây trạng thái, và chúng hoàn toàn có thể kết hợp với nhau tạo thành chuỗi sự kiện. Ví dụ: người click vào menu (một sự kiện => thay đổi trạng thái), sau đó router cũng cần thay đổi để phù hợp với ngữ cảnh.

### Kết hợp laravel + Reactjs + Redux
**Link github:** https://github.com/vanquynguyen/redux-crud-API

**Chuẩn bị:** 
- Laravel 5.6 (Server APIs)
- React-App (Client)
- Redux v3.7.2
- ........

**Bắt đầu:**
- **Tạo server cấp phát APIs:**

    Cài đặt project laravel:

    `composer create-project --prefer-dist laravel/laravel redux-server`
    
    Tạo migration cho table products:
    ```
    php artisan make:migration create_products_table
    ```
    Tiếp tục thêm các trường cho table:
    ```
         Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });
    ```
    Tạo model Product cho bảng products:
    ```
    php artisan make:model Product
    ```
    Sau khi tạo xong table và model, tiến hành migrate dữ liệu
    ```
    php artisan migrate
    ```
    Tạo Resource Controller cho project:
    ```
    php artisan make:controller Api/ProductController --resource
    ```
    Thực hiện code chức năng CRUD cho ứng dụng:
    ```
        <?php

        namespace App\Http\Controllers\Api;

        use Illuminate\Http\Request;
        use App\Product;

        class ProductController extends Controller
        {
            /**
             * Display a listing of the resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function index()
            {
                $products = Product::orderBy('created_at', 'desc')->get();

                return response()->json($products);
            }

            /**
             * Show the form for creating a new resource.
             *
             * @return \Illuminate\Http\Response
             */
            public function create()
            {
                //
            }

            /**
             * Store a newly created resource in storage.
             *
             * @param  \Illuminate\Http\Request  $request
             * @return \Illuminate\Http\Response
             */
            public function store(Request $request)
            {
                try {
                    $data = $request->all();
                    $products = Product::create($data); 

                    return response()->json($products);
                } catch (Exception $e) {
                    $response['error'] = true;

                    return response()->json($response);
                }
            }

            /**
             * Display the specified resource.
             *
             * @param  int  $id
             * @return \Illuminate\Http\Response
             */
            public function show($id)
            {
                $products = Product::findOrFail($id);

                return response()->json($products);
            }

            /**
             * Show the form for editing the specified resource.
             *
             * @param  int  $id
             * @return \Illuminate\Http\Response
             */
            public function edit($id)
            {
                //
            }

            /**
             * Update the specified resource in storage.
             *
             * @param  \Illuminate\Http\Request  $request
             * @param  int  $id
             * @return \Illuminate\Http\Response
             */
            public function update(Request $request, $id)
            {
                try {
                    $data = $request->all();
                    $products = Product::find($id)->update($data);

                    return response()->json($products);
                } catch (Exception $e) {
                    $response['error'] = true;

                    return response()->json($response);
                }
            }

            /**
             * Remove the specified resource from storage.
             *
             * @param  int  $id
             * @return \Illuminate\Http\Response
             */
            public function destroy($id)
            {
                try {
                    $products = Product::find($id)->delete();

                    return response()->json($products);
                } catch (Exception $e) {
                    $response['error'] = true;

                    return response()->json($response);
                }
            }
        }
    ```
    Đừng quên khai báo routes nữa nhé:
    
     ```
     Route::group(['middleware' => 'api', 'namespace' => 'Api', 'as' => 'api.'], function () {
        Route::resource('products', 'ProductController', ['except' => ['create', 'edit']]);
    });
     ```
     Sau khi tạo thành công Controller + routes, test thử APIs trên Postman:
    ![](https://images.viblo.asia/224882eb-fadc-451d-b1db-612ff537ff1f.png)
     Done! Vậy là chúng ta đã cung cấp đủ APIs cho ứng dụng CRUD của mình.
    
* **Tạo client react-app và sử dụng reactjs + redux**

    Khởi tạo react-app:
    ```
    npx create-react-app redux-crud-API
    cd redux-crud-API
    npm start
    ```
    
   Cấu trúc thư mục mà mình tham khảo trên trang chủ redux:
   ```
    redux-crud-API
  
    + |- actions
    + |- components
    + |- constants
    + |- page
    + |- reducers
    + |- utils
    + |- App.js
    + |- index.js
    + |- registerServiceWorker.js
    + |- routes.js
   ```
   Sau đây mình sẽ trình bày chi tiết cách lấy dữ liệu bằng redux một cách đơn giản: (Các chức năng khác các bạn có thể làm theo nhé!)
   Thiết lập routes:
   ```
    import React from 'react';
    import HomePage from './pages/HomePage/HomePage';
    import NotFound from './pages/NotFound/NotFound';
    import ProductListPage from './pages/ProductListPage/ProductListPage';

    const routes = [
        {
            path: '/',
            exact: true,
            main: () => <HomePage />
        },
        {
            path: '/product-list',
            exact: false,
            main: () => <ProductListPage />
        },
        {
            path: '',
            exact: false,
            main: () => <NotFound />
        }
    ];

    export default routes;
   ```
     Tạo  ActionType:
     ```
        export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
     ```
     Tạo config.js
     ```
         export const API_URL = 'http://localhost:8000/api';
     ```
     Tạo apiCaller.js:
     ```
        import axios from 'axios';
        import * as Config from './../constants/Config';

        export default function callApi(endpoint, method = 'GET', body) {
            return axios({
                method,
                url: `${Config.API_URL}/${endpoint}`,
                data: body
            }).catch(err => {
                console.log(err);
            });
        }
     ```
     Tạo action:
     ```
        import * as Types from './../constants/ActionType';
        import callApi from './../utils/apiCaller';

        export const actFetchProductsRequest = () => {
            return (dispatch) => {
                return callApi('products', 'GET', null).then(res => {
                    dispatch(actFetchProducts(res.data.data.data));
                });
            }
        }

        export const actFetchProducts = (products) => {
            return {
                type: Types.FETCH_PRODUCTS,
                products
            }
        }
     ```
     Tạo reducer:
     
     products.js : State sẽ chứa dữ liệu của tất cả products, với đúng ActionType sẽ return đúng dữ liệu của nó từ bên action trả về
     ```
        import * as Types from './../constants/ActionType';

        var initialState = [];

        const products = (state = initialState, action) => {
            switch (action.type) {
                case Types.FETCH_PRODUCTS:
                    return [...action.products];
                default: return [...state];
            }
        };

        export default products;
     ```
    Trong file App.js: 
    ```
        import React, { Component } from 'react';
        import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

        import routes from './routes';
        import Menu from './components/Menu/Menu';

        class App extends Component {
            render() {
                return (
                    <Router>
                        <div className="App">
                            <Menu />
                            {this.showContentMenus(routes)}
                        </div>
                    </Router>
                );
            }

            showContentMenus = (routes) => {
                var result = null;
                if (routes.length > 0) {
                    result = routes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        );
                    });
                }
                return <Switch>{result}</Switch>;
            }

        }

        export default App;
    ```
    Trong file index.js
    ```
        import React from 'react';
        import ReactDOM from 'react-dom';
        import App from './App';
        import registerServiceWorker from './registerServiceWorker';
        import { createStore, applyMiddleware } from 'redux';
        import appReducers from './reducers/index';
        import { Provider } from 'react-redux';
        import thunk from 'redux-thunk';

        const store = createStore(
            appReducers,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
            applyMiddleware(thunk)
        );

        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root')
        );
        registerServiceWorker();
    ```
   Dùng mapStateToProps để lấy dữ liệu của state, mapDispatchToProps  dispatch các action request để đảm bảo rằng request có được thực thi không.
    ```
        import React, { Component } from 'react';
        import './ProductListPage.css';
        import { Link } from 'react-router-dom';

        import { connect } from 'react-redux';
        import ProductList from './../../components/ProductList/ProductList';
        import ProductItem from './../../components/ProductItem/ProductItem';
        import { actFetchProductsRequest, actDeleteProductRequest, searchProductRequest } from '../../actions/index';

        class ProductListPage extends Component {

            componentDidMount() {
                // Gọi trước khi component đc render lần đầu tiên
                this.props.fetchAllProducts();
            }

            render() {

                var { products } = this.props;

                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <Link to="/product/add" className="btn btn-primary mb-5">
                                    <i className="glyphicon glyphicon-plus"></i> Thêm Sản Phẩm
                                </Link>
                                <ProductList>
                                    {this.showProducts(products)}
                                </ProductList>
                            </div>
                        </div>
                    </div>
                );
            }

            showProducts(products) {
                var result = null;
                var { onDeleteProduct } = this.props;
                if (products.length > 0) {
                    result = products.map((product, index) => {
                        return <ProductItem product={product} key={index} index={index} onDeleteProduct={onDeleteProduct} />
                    });
                }
                return result;
            }

        }

        const mapStateToProps = state => {
            return {
                products: state.products
            }
        }

        const mapDispatchToProps = (dispatch, props) => {
            return {
                fetchAllProducts: () => {
                    dispatch(actFetchProductsRequest());
                }
            }
        }

        export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
    ```
    Vậy là các bạn đã biết cách lấy dữ liệu sử dụng redux rồi đúng không! Tham khảo thêm link github của minh để hiểu rõ hơn cấu trúc nhé.
    ### Kết luận
    Redux không hề khó, hãy cố gắng nắm thật chắc các kiến thức về reactjs trước khi tìm hiểu về redux. Hãy tự xây dựng cho mình một cấu trúc phù hợp và thoải mái nhất khi sử dụng redux.
    
    **Tham Khảo:**
    
    - Github: https://github.com/vanquynguyen/redux-crud-API
    - Trang chủ reactJs: https://reactjs.org/
    - Trang chủ redux: https://redux.js.org/