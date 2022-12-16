Chào mừng các bạn trở lại với series tutorial Nestjs của mình. 


Đến hẹn lại lên như đã nói ở bài viết trước bài viết này mình lại cùng xây dựng React App  Chat realtime : Nestjs + Socket.io, React + Redux-Saga nhé . Bắt đầu thôi

### Index series
1.  [Giới thiệu về setup repository + typeorm](https://viblo.asia/p/tich-hop-repository-design-pattern-vao-nestjs-project-using-typeorm-and-mysql-RQqKL6rbl7z).
2.  [Xác thực người dùng trong Nestjs sử dụng Passport JWT](https://viblo.asia/p/xac-thuc-nguoi-dung-trong-nestjs-su-dung-passport-jwt-924lJB7blPM).
3. [Nestjs - Create relationship với Typeorm + mysql](https://viblo.asia/p/nestjs-create-relationship-voi-typeorm-mysql-1Je5EBVjKnL)
4. Tiếp tục series mình lại cùng xây dựng React App  Chat realtime : Nestjs + Socket.io, React + Redux-Saga.

![](https://images.viblo.asia/db0e449d-e4b5-480d-b7f7-d21550b220ef.png)

### 1. Cấu trúc
- Cấu trúc sẽ bao gồm :
    - Server Side: Nestjs + socket.io
    - Client Side: ReactJs + socket-client + redux saga
### 2. Hướng xử lý 
- Server :
    - Tạo mới table "devices" 
    - Khi client connect đến socket gateway: thực hiện lưu socket_id vào table "devices"
    - Khi client disconnect thực hiện xóa socket_id  trong table "devices"
    - Khi có tin nhắn được emit thì tìm tất cả các socket_id của user trong conversation để gửi tin nhắn
 - Client: emit message và receive message

### 3. Server side 
1. Cài đặt các packet
    Ở đây thì mình vẫn sử dụng các pakage của các bài trước và sẽ cần thêm 1 số pakage khác nữa
    ```javascript

     > npm install @nestjs/websockets

     > npm i socket.io

     ```
2.  Xử lý validation cho socket
    ***app.gateway.ts***
    
    ```javascript
    @WebSocketGateway(3006, { cors: true })
    export class AppGateway
      implements
      OnGatewayInit,
      OnGatewayConnection,
      OnGatewayDisconnect
    {
      @WebSocketServer() server: Server;
      private logger: Logger = new Logger('MessageGateway');
      constructor(
        private userService: UsersService,
        private jwtService: JwtService,
      ) {}
      
      //function get user from token
      async getDataUserFromToken(client: Socket): Promise<UserEntity> {
        const authToken: any = client.handshake?.query?.token;
        try {
          const decoded = this.jwtService.verify(authToken);

          return await this.userService.getUserByEmail(decoded.email); // response to function
        } catch (ex) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
      }
    }

    ```
3. Xử lý logic Client connect 

    Vẫn là trong ***app.gateway.ts***
    ```javascript
    @WebSocketGateway(3006, { cors: true })
    export class AppGateway
      implements
      OnGatewayInit,
      OnGatewayConnection,
      OnGatewayDisconnect
    {
      @WebSocketServer() server: Server;
      private logger: Logger = new Logger('MessageGateway');
      constructor(
        private userService: UsersService,
        private deviceService: DeviceService,
        private jwtService: JwtService,
      ) {}
      
      ...
      
      async handleConnection(client: Socket) {
        this.logger.log(client.id, 'Connected..............................');
        const user: UserEntity = await this.getDataUserFromToken(client);

        const device = {
          user_id: user.id,
          type: TypeInformation.socket_id,
          status: false,
          value: client.id,
        };

        await this.deviceService.create(information);
      }
    }
    ...
    
    ```
4. Xử lý logic client disconnect

    Vẫn là trong ***app.gateway.ts***
    
    ```javascript
    @WebSocketGateway(3006, { cors: true })
    export class AppGateway
    {
      ...
      
      async handleDisconnect(client: Socket) {
        const user = await this.getDataUserFromToken(client);
        await this.deviceService.deleteByValue(user.id, client.id);

        // need handle remove socketId to table
        this.logger.log(client.id, 'Disconnect');
      }

        await this.deviceService.create(information);
      }
    }
    ...
    
    ```
 5. Xử lý Listen message và emit message to client

     ```javascript
        @WebSocketGateway(3006, { cors: true })
        export class AppGateway
        {
          ...

          @SubscribeMessage('messages')
          async messages(client: Socket, payload: MessagesInterface) {
           // get all user trong conversation bằng conversation_id
            const conversation = await this.conversationService.findById(
              payload.conversation_id,
              ['users'],
            );
            
            // get all socket id đã lưu trước đó của các user thuộc conversation
            const dataSocketId = await this.deviceService.findSocketId(userId);
            
            // Lưu dữ liệu vào bảng message
            const message = await this.messageService.create({
              user_id: payload.user_id,
              status: false,
              message: payload.message,
              conversation_id: payload.conversation_id,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            
            //emit message đến socket_id
            dataSocketId.map((value) => {
              emit.to(value.value).emit('message-received', {
                id: message.id,
                message: message.message,
                conversation_id: message.conversation_id,
                user_id: message.user_id,
                status: message.status,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt,
              });
            });
      }
    }
    ...
    
    ```
 ### 4. Client Side

  ```javascript 
         > npm i socket.io-client

         > npm i redux-saga

         > npm i @reduxjs/toolkit

         > npm i redux
  ```
     
  1. Setting Redux + Redux saga:
      
      ***store.ts*** : 
      ```javascript
      const rootReducer = combineReducers({
          router: connectRouter(history),
          auth: authReducer,
          chat: chatReducer,
        })

        const sagaMiddleware = createSagaMiddleware()
        export const store = configureStore({
          reducer: rootReducer,
          middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
        });

        sagaMiddleware.run(rootSaga)
        
        export function* rootSaga() {
          yield all([
            authSaga(),
            chatSaga(),
          ])
        }
        
        export type AppDispatch = typeof store.dispatch;
        export type RootState = ReturnType<typeof store.getState>;
        export type AppThunk<ReturnType = void> = ThunkAction<
          ReturnType,
          RootState,
          unknown,
          Action<string>
        >;
      ```
      
      Tiếp đó cần use redux saga trong file  ***App.tsx***
      ```javascript
          import {store} from './store'
          
          ReactDOM.render(
          // <React.StrictMode>
            <Provider store={store}>
              <ConnectedRouter history={history}>
                 // thay vì dùng redux các bạn cũng có thể dùng Connect API cũng dễ dàng cho việc code hơn nhé
                 // trong source mình cũng có để nhé
                {/*<SocketContext.Provider value={{socket}}>*/}
                
                // trong đây mình có dùng style componet material-ui các bạn cũng có thể tham khảo nhé
                  <MuiThemeProvider theme={themes}>  
                    <App />
                    <RouterComponent />
                  </MuiThemeProvider>
                {/*</SocketContext.Provider>*/}
              </ConnectedRouter>
            </Provider>,
          // </React.StrictMode>,
          document.getElementById('root')
        );

      ```
  2.  Tiền hành xử lý logic khi 1 action được dispatch
        
        ***NOTE***: ở đây mình có sử dụng redux toolkit mọi người có thể tìm hiều về nó trước khi đọc tiếp nhé
         ```javascript
         export interface Message {
          id: number;
          user_id: number | string;
          conversation_id: number | string;
          message: string;
        }
        
        export interface Conversation {
          messages: Message[];
          id: number;
          title: string | null;
          sending: boolean;
        }
        
         const initialState: ListConversationState = {
              loading: false,
              error: '',
              conversations: [],
              loaded: false,
        }
        export const chatSlice = createSlice({
              name: 'chat',
              initialState,
              reducers: {
                sendMessage(state, action: PayloadAction<Message>) {
                  state.conversations = state.conversations.map(conversation => {
                         if(conversation.id === action.payload.conversation.id ) {
                         // cái này để hiển thị sending
                             conversation.sending = true
                         }
                         return conversation;
                  });

                  return state;
                },
                
                sendMessageSuccess(state, action: PayloadAction<Message>) {
                    // ở đây ta cần push message received vào list message của conversation đang activce 
                    state.conversations = state.conversations.map(conversation => {
                         if(conversation.id === action.payload.conversation.id ) {
                         // cái này để hiển thị sending
                             conversation.sending = false
                               conversation.messages = conversation.messages 
                               ? [ action.payload,  ...conversation.messages]
                               : [action.payload]
                         }
                         return conversation;
                  });
                }
            }
        })
         ```
  3. Saga middleware
    trong file ***chatSaga.ts*** :
        ```javascript
        import { io, Socket } from 'socket.io-client';
        function connect() {
          const token = getAccessToken();
          const url = process.env.REACT_APP_SOCKET_URL ?? '';
          const socket = io(url, {
            query: { token }
          });

          return new Promise(resolve => {
            socket.on('connect', () => {
              // socket.emit('room', 'room1');
              resolve(socket);
            });
          })
        }
        
        //receive message
        function* read(socket: Socket) {
          while (true) {
                socket.on('message-received', (message) => {
                // dispatch sendMessageSuccess
                 yield put(chatActions.sendMessageSuccess, message)
                });
            ;
          }
        }
        
        //handle send message
        function* send(socket: Socket) {
          while (true) {
            const { payload } = yield take(chatActions.sendMessage.type)

            socket.emit('messages', payload)
          }
        }
        
        function* handleIO(socket: Socket) {
          yield fork(read, socket);
          yield fork(send, socket);
        }
        
        function* flowSocket() {
          const socket: Socket = yield call(connect)
          
          // ta cần 1 task thực hiện send and receive message
          const task: Task = yield fork(handleIO, socket)
          
          // ở đây nếu logout thì cần close connect socket
          yield take(authAction.logout.type)
          yield cancel(task)

        }
        //flow 
        function* flow() {
          while (true) {
            const isLoggedIn = Boolean(getToken())
            const currentUser = Boolean(getUser());
            // ở đây mình cần check điều kiện đã đăng nhập chưa 
            if (isLoggedIn && currentUser) {
              // đã đăng nhập thì cho phép next
              yield call(flowSocket)
            } else {
             // nếu chưa đăng nhạp thì cần lắng nghe việc loginSuccess thì next
              yield take(authAction.loginSuccess)
              yield call(flowSocket)
            }
          }
        }
        
        //root handle
        export default function* chatSaga() {
          yield fork(flow)
        }
        ```
 4. Sử dụng trong component
     ```javascript
         const Index: React.FC = () => {
          const dispatch = useDispatch();
          const chat: ListConversationState = useSelector((state: RootState) => state.chat)
          // const { socket } = useContext(SocketContext);
          const [message, setMessage] = useState('')

          const sendData = () => {
              dispatch(chatActions.sendMessage({
                    message,
                    conversation_id: conversationActive.id,
                    user_id: getUser().id,
                }))
            setMessage('')
          }

          return (
            <div>
              {
                 chat.messages && chat.messages.map((message, index) => <p key={index}>{message.message}</p>)
              }
              <input type='text' value={message} onChange={e => setMessage(e.target.value)} />
              <button onClick={sendData}>
                {/*{ chat.sending ? 'Sending.........' : 'Send'}*/}
                send
              </button>
            </div>
          )
        }
     ```
### 5.  Kết quả và kết luận

 Cuối cùng kết quá sẽ là :
 {@embed: https://www.youtube.com/watch?v=SO8EKAC4W88}
 
Cảm ơn các bạn đã theo dõi series của mình.

Server side: [tại đây](https://github.com/duong120798/nest-project)

Client side: [tại đây](https://github.com/duong120798/redux-saga-typescript)

Sắp tới mình đang định xây dựng series về Nextjs mời các bạn đón đọc