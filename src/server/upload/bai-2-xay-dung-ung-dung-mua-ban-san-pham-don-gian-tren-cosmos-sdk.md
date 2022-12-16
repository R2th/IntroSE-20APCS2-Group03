Ở bài trước mình đã giới thiệu qua về các khái niệm và thành phần chính của Cosmos SDK, bài này mình sẽ hướng dẫn các bạn từng bước để xây dựng hoàn chỉnh một luồng mua bán sản phẩm đơn giản để thông qua đó khi bạn muốn costumize theo ý của mình, bạn sẽ biết đầu từ đâu và làm như thế nào. 

Ứng dụng mình sắp xây dựng sẽ có luồng rất đơn giản: Có 2 user là jack và alice, mỗi user được khởi tạo mặc định với ```1000nametoken```, jack sẽ tạo một ```product``` với thông tin gồm ```productID```, ```descriprion```, ```price``` (đơn vị tiền tệ là ```nametoken```) và ```owner```, alice sẽ vào mua lại product của jack, ngay sau đó ```product``` được chuyển quyền sở hữu cho alice và một lượng ```nametoken``` được chuyển từ alice sang cho jack
### 1. Chuẩn bị
Chuẩn bị môi trường cần thiết
```bash
mkdir -p $HOME/go/bin
echo "export GOBIN=\$GOPATH/bin" >> ~/.bash_profile
echo "export PATH=\$PATH:\$GOBIN" >> ~/.bash_profile
source ~/.bash_profile
```
<br><br>

Clone repo mẫu để lấy khung cho project của mình
```bash
# Clone the source of the tutorial repository
git clone https://github.com/cosmos/sdk-tutorials.git
cd sdk-tutorials
cd nameservice
```
trong repo này sẽ có nhiều tutorial nhưng chúng ta sẽ làm việc chính ở ```nameservice```, bạn hoàn toàn có thể đổi ```nameservice``` thành bất cứ tên gì nhưng tạm thời mình cứ để là ```nameservice``` vì nếu đổi thì phải đổi luôn mấy đoạn import, khi nào bạn thành thạo bạn có thể tự đổi sau.
<br><br>

Make install để build các tools ```nscli```, ```nsd``` từ code trong thư mục ```nameservice/x/nameservice/cmd```, đây vẫn là code của ví dụ ```nameservice``` của docs chính của Cosmos SDK, bạn có thể test thêm tại đây. https://tutorials.cosmos.network/nameservice/tutorial/22-build-run.html
```bash
# Install the app into your $GOBIN
make install

# Now you should be able to run the following commands:
nsd help
nscli help
```
Sau đó mở thư mục nameservice từ repo vừa clone về và bắt đầu code thôi nào.

### 2. Types
Ở bước này mình sẽ định nghĩa struct của 1 product. Mở file ```x/nameservice/types/types.go```và thêm định nghĩa ```Product``` như dưới đây
```go
type Product struct {
	ProductID   string         `json:"productID"`
	Description string         `json:"description"`
	Owner       sdk.AccAddress `json:"owner"` // kiểu địa chỉ được định nghĩa trong cosmos sdk ví dụ: cosmos1ug35j0s0mfn6hah5sk076yfjqwxlh4gtfvdfpa
	Price       sdk.Coins      `json:"price"` // kiểu tiền tệ được định nghĩa bởi cosmos sdk ví dụ: [{"denom": "nametoken","amount":"10"}]
}

func NewProduct() Product {
	return Product{}
}
```
### 3. Keeper
#### 3.1 Các function tương tác trực tiếp với store
Ở bước này, ta sẽ định nghĩa các phương thức get, set cho product, các phương thức này được gọi bởi ```handler``` khi nó bắt được Msg. Keeper là thành phần sẽ tương tác trực tiếp với ```store```. Ở file ```x/nameservice/keeper/keeper.go``` ta thêm các dòng sau vào cuối file:
```go

func (k Keeper) GetProduct(ctx sdk.Context, key string) types.Product {
	store := ctx.KVStore(k.storeKey)

	if !k.IsProductPresent(ctx, key) {
		return types.NewProduct()
	}

	bz := store.Get([]byte(key))  // lấy value theo key

	var product types.Product

	k.cdc.MustUnmarshalBinaryBare(bz, &product) // ép kiểu từ []bytes về  struct Product

	return product
}

func (k Keeper) SetProduct(ctx sdk.Context, key string, product types.Product) {
	if product.Owner.Empty() {
		return
	}

	store := ctx.KVStore(k.storeKey)

	store.Set([]byte(key), k.cdc.MustMarshalBinaryBare(product)) // set vào store theo key-value
}

func (k Keeper) DeleteProduct(ctx sdk.Context, key string) {
	store := ctx.KVStore(k.storeKey)
	store.Delete([]byte(key)) # delete value theo key
}

func (k Keeper) IsProductPresent(ctx sdk.Context, key string) bool {
	store := ctx.KVStore(k.storeKey)
	return store.Has([]byte(key)) # check xem key có tồn tại hay không
}

func (k Keeper) GetProductsIterator(ctx sdk.Context) sdk.Iterator { // lấy mảng key
	store := ctx.KVStore(k.storeKey)
	return sdk.KVStorePrefixIterator(store, nil)
}
```
#### 3.2 Định nghĩa các trường hợp query cụ thể để gọi đến hàm tương ứng trong keeper
Thêm dòng sau vào file ```x/nameservice/types/qurier.go```
```go
type QueryResProducts []Product
```

Ở file ```x/nameservice/keeper/querier.go``` chúng ta thêm các đoạn code sau:

- Thêm các constant:
```go
const (
	QueryResolve = "resolve"
	QueryWhois   = "whois"
	QueryNames   = "names"

	QueryProduct     = "product"
	QueryAllProducts = "allProducts"
)
```

- Thêm các hàm query:
```go

func queryProduct(ctx sdk.Context, path []string, req abci.RequestQuery, keeper Keeper) ([]byte, error) { // query một sản phẩm theo productID

	key := "Product-" + path[0] // Tại sao mình lại thêm tiền tố "Product-" ở đây, đọc xuống dưới các bạn sẽ hiểu

	product := keeper.GetProduct(ctx, key)

	res, err := codec.MarshalJSONIndent(keeper.cdc, product)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrJSONMarshal, err.Error())
	}

	return res, nil
}

func queryAllProducts(ctx sdk.Context, req abci.RequestQuery, keeper Keeper) ([]byte, error) { // lấy tất cả products

	var productsList types.QueryResProducts

	iterator := keeper.GetProductsIterator(ctx)

	for ; iterator.Valid(); iterator.Next() {
		key := string(iterator.Key())
		if "Product-" <= key && key <= "Product-zzzzzzzz" {
			product := keeper.GetProduct(ctx, key)
			productsList = append(productsList, product)

		}
	}
	res, err := codec.MarshalJSONIndent(keeper.cdc, productsList)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrJSONMarshal, err.Error())
	}
	return res, nil
}
```
- Thêm các case tương ứng vào trong hàm ```NewQuerier```:
```go
func NewQuerier(keeper Keeper) sdk.Querier {
	return func(ctx sdk.Context, path []string, req abci.RequestQuery) (res []byte, err error) {
		switch path[0] {
		case QueryResolve:
			return queryResolve(ctx, path[1:], req, keeper)
		case QueryWhois:
			return queryWhois(ctx, path[1:], req, keeper)
		case QueryNames:
			return queryNames(ctx, req, keeper)
		case QueryProduct:
			return queryProduct(ctx, path[1:], req, keeper)
		case QueryAllProducts:
			return queryAllProducts(ctx, req, keeper)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "unknown nameservice query endpoint")
		}
	}
}
```

### 4. Messages
Ở bước này, chúng ta sẽ định nghĩa các message về việc ```create```, ```update```, ```delete``` product cũng như ```buy``` product, các message này sẽ được ```handler``` bắt và gọi đến hàm trong keeper tương ứng. Thêm các đoạn code sau vào file ```x/nameservice/types/msgs.go```.
#### 4.1 Message CreateProduct và các function liên quan.

```go
// MsgCreateProduct defines a CreateProduct message
type MsgCreateProduct struct {
	ProductID   string         `json:"productID"`
	Description string         `json:"description"`
	Price       sdk.Coins      `json:"price"`
	Signer      sdk.AccAddress `json:"signer"`
}

// NewMsgCreateProduct is a constructor function for MsgCreateProduct
func NewMsgCreateProduct(productID string, description string, price sdk.Coins, signer sdk.AccAddress) MsgCreateProduct {
	return MsgCreateProduct{
		ProductID:   productID,
		Description: description,
		Price:       price,
		Signer:      signer,
	}
}

// Route should return the name of the module
func (msg MsgCreateProduct) Route() string { return RouterKey }

// Type should return the action
func (msg MsgCreateProduct) Type() string { return "create_product" }

// ValidateBasic runs stateless checks on the message
func (msg MsgCreateProduct) ValidateBasic() error {
	if msg.Signer.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Signer.String())
	}
	if len(msg.ProductID) == 0 || len(msg.Description) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "ProductID and/or Description cannot be empty")
	}
	if !msg.Price.IsAllPositive() {
		return sdkerrors.ErrInsufficientFunds
	}
	return nil
}

// GetSignBytes encodes the message for signing
func (msg MsgCreateProduct) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

// GetSigners defines whose signature is required
func (msg MsgCreateProduct) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Signer}
}

```

#### 4.2 Message UpdateProduct và các function liên quan.
```go
// MsgUpdateProduct defines a UpdateProduct message
type MsgUpdateProduct struct {
	ProductID   string         `json:"productID"`
	Description string         `json:"description"`
	Price       sdk.Coins      `json:"price"`
	Signer      sdk.AccAddress `json:"signer"`
}

// NewMsgUpdateProduct is a constructor function for MsgUpdateProduct
func NewMsgUpdateProduct(productID string, description string, price sdk.Coins, signer sdk.AccAddress) MsgUpdateProduct {
	return MsgUpdateProduct{
		ProductID:   productID,
		Description: description,
		Price:       price,
		Signer:      signer,
	}
}

// Route should return the name of the module
func (msg MsgUpdateProduct) Route() string { return RouterKey }

// Type should return the action
func (msg MsgUpdateProduct) Type() string { return "update_product" }

// ValidateBasic runs stateless checks on the message
func (msg MsgUpdateProduct) ValidateBasic() error {
	if msg.Signer.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Signer.String())
	}
	if len(msg.ProductID) == 0 || len(msg.Description) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "ProductID and/or Description cannot be empty")
	}
	if !msg.Price.IsAllPositive() {
		return sdkerrors.ErrInsufficientFunds
	}
	return nil
}

// GetSignBytes encodes the message for signing
func (msg MsgUpdateProduct) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

// GetSigners defines whose signature is required
func (msg MsgUpdateProduct) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Signer}
}
```

#### 4.3 Message DeleteProduct và các function liên quan.
```go
// MsgDeleteProduct defines a DeleteProduct message
type MsgDeleteProduct struct {
	ProductID   string         `json:"productID"`
	Signer      sdk.AccAddress `json:"signer"`
}

// NewMsgDeleteProduct is a constructor function for MsgUpdateProduct
func NewMsgDeleteProduct(productID string, signer sdk.AccAddress) MsgDeleteProduct {
	return MsgDeleteProduct{
		ProductID:   productID,
		Signer:      signer,
	}
}

// Route should return the name of the module
func (msg MsgUpdateProduct) Route() string { return RouterKey }

// Type should return the action
func (msg MsgUpdateProduct) Type() string { return "update_product" }

// ValidateBasic runs stateless checks on the message
func (msg MsgUpdateProduct) ValidateBasic() error {
	if msg.Signer.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Signer.String())
	}
	if len(msg.ProductID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "ProductID and/or Description cannot be empty")
	}
	return nil
}

// GetSignBytes encodes the message for signing
func (msg MsgDeleteProduct) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

// GetSigners defines whose signature is required
func (msg MsgDeleteProduct) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Signer}
}
```

#### 4.3 Message BuyProduct và các function liên quan.
```go
// MsgBuyProduct defines a DeleteName message
type MsgBuyProduct struct {
	ProductID string         `json:"productID"`
	Signer    sdk.AccAddress `json:"signer"`
}

// NewMsgBuyProduct is a constructor function for MsgBuyProduct
func NewMsgBuyProduct(productID string, signer sdk.AccAddress) MsgBuyProduct {
	return MsgBuyProduct{
		ProductID: productID,
		Signer:    signer,
	}
}

// Route should return the name of the module
func (msg MsgBuyProduct) Route() string { return RouterKey }

// Type should return the action
func (msg MsgBuyProduct) Type() string { return "buy_product" }

// ValidateBasic runs stateless checks on the message
func (msg MsgBuyProduct) ValidateBasic() error {
	if msg.Signer.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, msg.Signer.String())
	}
	if len(msg.ProductID) == 0 {
		return sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, "ProductID cannot be empty")
	}
	return nil
}

// GetSignBytes encodes the message for signing
func (msg MsgBuyProduct) GetSignBytes() []byte {
	return sdk.MustSortJSON(ModuleCdc.MustMarshalJSON(msg))
}

// GetSigners defines whose signature is required
func (msg MsgBuyProduct) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Signer}
}
```
### 5. Concrete, Errors, Alias
#### 5.1 Concrete
Thêm các dòng sau vào hàm ```RegisterCodec``` trong file ```x/nameservice/types/codec.go```
```go
// RegisterCodec registers concrete types on the Amino codec
func RegisterCodec(cdc *codec.Codec) {
	cdc.RegisterConcrete(MsgSetName{}, "nameservice/SetName", nil)
	cdc.RegisterConcrete(MsgBuyName{}, "nameservice/BuyName", nil)
	cdc.RegisterConcrete(MsgDeleteName{}, "nameservice/DeleteName", nil)

	cdc.RegisterConcrete(MsgCreateProduct{}, "nameservice/CreateProduct", nil)
	cdc.RegisterConcrete(MsgUpdateProduct{}, "nameservice/UpdateProduct", nil)
	cdc.RegisterConcrete(MsgDeleteProduct{}, "nameservice/DeleteProduct", nil)
	cdc.RegisterConcrete(MsgBuyProduct{}, "nameservice/BuyProduct", nil)
}
```
#### 5.2 Errors
Thêm các mã lỗi sau vào file ```x/nameservice/types/errors/go```:
```go
var (
	ErrNameDoesNotExist = sdkerrors.Register(ModuleName, 1, "name does not exist")

	ErrProductDoesNotExist  = sdkerrors.Register(ModuleName, 2, "product does not exist")
	ErrProductAlreadyExists = sdkerrors.Register(ModuleName, 3, "product already exists")
)
```
#### 5.3 Alias
File ```x/nameservice/alias.go``` này làm cho các đoạn import ở ```handler.go``` trở nên ngắn gọn hơn:
```go
var (
	NewKeeper        = keeper.NewKeeper
	NewQuerier       = keeper.NewQuerier
	NewMsgBuyName    = types.NewMsgBuyName
	NewMsgSetName    = types.NewMsgSetName
	NewMsgDeleteName = types.NewMsgDeleteName
	NewWhois         = types.NewWhois
	ModuleCdc        = types.ModuleCdc
	RegisterCodec    = types.RegisterCodec

	NewProduct          = types.NewProduct
	NewMsgCreateProduct = types.NewMsgCreateProduct
	NewMsgUpdateProduct = types.NewMsgUpdateProduct
	NewMsgDeleteProduct = types.NewMsgDeleteProduct
	NewMsgBuyProduct    = types.NewMsgBuyProduct
)

type (
	Keeper          = keeper.Keeper
	MsgSetName      = types.MsgSetName
	MsgBuyName      = types.MsgBuyName
	MsgDeleteName   = types.MsgDeleteName
	QueryResResolve = types.QueryResResolve
	QueryResNames   = types.QueryResNames
	Whois           = types.Whois

	Product             = types.Product
	MsgCreateProduct    = types.MsgCreateProduct
	MsgUpdateProduct    = types.MsgUpdateProduct
	MsgDeleteProduct    = types.MsgDeleteProduct
	MsgBuyProduct       = types.MsgBuyProduct
	QueryResAllProducts = types.QueryResAllProducts
)
```

### 6. Handler
 Bước này chúng ta sẽ code các hàm xử lý cho từng loại Msg cụ thể mà Handler bắt được.
 #### 6.1 Xử lý MsgCreateProduct
 ```go
// Handle a message to create product
func handleMsgCreateProduct(ctx sdk.Context, keeper Keeper, msg MsgCreateProduct) (*sdk.Result, error) {
	key := "Product-" + msg.ProductID

	if keeper.IsProductPresent(ctx, key) { // nếu key đã tồn tai thì trả về lỗi
		return nil, sdkerrors.Wrap(types.ErrProductAlreadyExists, msg.ProductID)
	}

	var product = Product{ // khởi tạo một product mới
		ProductID:   msg.ProductID,
		Description: msg.Description,
		Price:       msg.Price,
		Owner:       msg.Signer,
	}

	keeper.SetProduct(ctx, key, product)
	return &sdk.Result{}, nil           
}
 ```
 
  #### 6.2 Xử lý MsgUpdateProduct
  ```go
  
// Handle a message to update product
func handleMsgUpdateProduct(ctx sdk.Context, keeper Keeper, msg MsgUpdateProduct) (*sdk.Result, error) {
	key := "Product-" + msg.ProductID

	if !keeper.IsProductPresent(ctx, key) { // kiểm tra xem product muốn cập nhật có tồn tại không
		return nil, sdkerrors.Wrap(types.ErrProductDoesNotExist, msg.ProductID)
	}

	product := keeper.GetProduct(ctx, key)

	if !msg.Signer.Equals(product.Owner) { // kiểm tả xem người cập nhật product có phải là chủ hiện tại không
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "Incorrect Owner") // nếu không thì trả về lỗi
	}

	product.Description = msg.Description // Cập nhật các trường
	product.Price = msg.Price

	keeper.SetProduct(ctx, key, product) // 
	return &sdk.Result{}, nil            // 
}
  ```
 #### 6.3 Xử lý MsgDeleteProduct
 ```go
// Handle a message to delete product
func handleMsgDeleteProduct(ctx sdk.Context, keeper Keeper, msg MsgDeleteProduct) (*sdk.Result, error) {
	key := "Product-" + msg.ProductID

	if !keeper.IsProductPresent(ctx, key) {
		return nil, sdkerrors.Wrap(types.ErrNameDoesNotExist, msg.ProductID)
	}
	if !msg.Signer.Equals(keeper.GetProduct(ctx, key).Owner) { // kiểm tra xem người muốn xóa product có phải là chủ hiện tại của product không
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "Incorrect Owner")
	}

	keeper.DeleteProduct(ctx, key)
	return &sdk.Result{}, nil
}
 ```

 #### 6.4 Xử lý MsgBuyProduct
 ```go
// Handle a message to buy product
func handleMsgBuyProduct(ctx sdk.Context, keeper Keeper, msg MsgBuyProduct) (*sdk.Result, error) {
	key := "Product-" + msg.ProductID

	if !keeper.IsProductPresent(ctx, key) {
		return nil, sdkerrors.Wrap(types.ErrNameDoesNotExist, msg.ProductID)
	}

	product := keeper.GetProduct(ctx, key)

	if msg.Signer.Equals(product.Owner) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "You are product owner")
	}

	err := keeper.CoinKeeper.SendCoins(ctx, msg.Signer, product.Owner, product.Price) // chuyển một lượng token bằng đúng với price của product từ người mua sang cho người bán
	if err != nil {
		return nil, err
	}

	product.Owner = msg.Signer // chuyển quyền sở hữu cho người mua

	keeper.SetProduct(ctx, key, product) // set lại product
	return &sdk.Result{}, nil
}
 ```
 
#### 6.5 Thêm case trong NewHandler
```go
// NewHandler returns a handler for "nameservice" type messages.
func NewHandler(keeper Keeper) sdk.Handler {
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		switch msg := msg.(type) {
		case MsgSetName:
			return handleMsgSetName(ctx, keeper, msg)
		case MsgBuyName:
			return handleMsgBuyName(ctx, keeper, msg)
		case MsgDeleteName:
			return handleMsgDeleteName(ctx, keeper, msg)
		case MsgCreateProduct:
			return handleMsgCreateProduct(ctx, keeper, msg)
		case MsgUpdateProduct:
			return handleMsgUpdateProduct(ctx, keeper, msg)
		case MsgDeleteProduct:
			return handleMsgDeleteProduct(ctx, keeper, msg)
		case MsgBuyProduct:
			return handleMsgBuyProduct(ctx, keeper, msg)
		default:
			return nil, sdkerrors.Wrap(sdkerrors.ErrUnknownRequest, fmt.Sprintf("Unrecognized nameservice Msg type: %v", msg.Type()))
		}
	}
}
```

### 7 Client Tx
Thành phần cuối cùng là client, mình sẽ chỉ hướng dẫn code client bằng cli (command-line interface), còn bằng rest-server các bạn tự tìm hiểu trong code của nó nhé. 
Các bạn mở file ```x/nameservice/client/cli/tx.go```
#### 7.1 Định nghĩa câu lệnh create-product
```go
func GetCmdCreateProduct(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:  "create-product [productID] [description] [price]",
		Args: cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			inBuf := bufio.NewReader(cmd.InOrStdin())
			cliCtx := context.NewCLIContext().WithCodec(cdc)

			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			coins, err := sdk.ParseCoins(args[2]) // ép về kiểu sdk.Coins trong cosmos sdk
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateProduct(args[0], args[1], coins, cliCtx.GetFromAddress()) // cliCtx.GetFromAddress() hàm này dùng để lấy address của user đã thực hiện lệnh create-product
			err = msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}
```

#### 7.2 Định nghĩa câu lệnh update-product
```go
func GetCmdUpdateProduct(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:  "update-product [productID] [description] [price]",
		Args: cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			inBuf := bufio.NewReader(cmd.InOrStdin())
			cliCtx := context.NewCLIContext().WithCodec(cdc)

			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			coins, err := sdk.ParseCoins(args[2])
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateProduct(args[0], args[1], coins, cliCtx.GetFromAddress())
			err = msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}
```

#### 7.3 Định nghĩa câu lệnh delete-product
```go
func GetCmdDeleteProduct(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:  "delete-product [productID]",
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			inBuf := bufio.NewReader(cmd.InOrStdin())
			cliCtx := context.NewCLIContext().WithCodec(cdc)

			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			msg := types.NewMsgDeleteProduct(args[0], cliCtx.GetFromAddress())
			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}
```
#### 7.4 Định nghĩa câu lệnh buy-product
```go
func GetCmdBuyProduct(cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:  "buy-product [productID]",
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			inBuf := bufio.NewReader(cmd.InOrStdin())
			cliCtx := context.NewCLIContext().WithCodec(cdc)

			txBldr := auth.NewTxBuilderFromCLI(inBuf).WithTxEncoder(utils.GetTxEncoder(cdc))

			msg := types.NewMsgBuyProduct(args[0], cliCtx.GetFromAddress())
			err := msg.ValidateBasic()
			if err != nil {
				return err
			}

			return utils.GenerateOrBroadcastMsgs(cliCtx, txBldr, []sdk.Msg{msg})
		},
	}
}
```
#### 7.5 Thêm tất cả câu lệnh vừa gửi vào hàm GetTxCmd
```go
nameserviceTxCmd.AddCommand(flags.PostCommands(
		GetCmdBuyName(cdc),
		GetCmdSetName(cdc),
		GetCmdDeleteName(cdc),

		GetCmdCreateProduct(cdc),
		GetCmdUpdateProduct(cdc),
		GetCmdDeleteProduct(cdc),
		GetCmdBuyProduct(cdc),
	)...)
```

### 8 Client query
Các bạn mở file ```x/nameservice/client/cli/query.go``` và thêm các câu lệnh query sau:
```go
func GetCmdProduct(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "product [productID]",
		Short: "Query whois info of name",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)
			productID := args[0]

			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/product/%s", queryRoute, productID), nil)
			if err != nil {
				fmt.Printf("could not query product - %s \n", productID)
				return nil
			}

			var out types.Product
			cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintOutput(out)
		},
	}
}

func GetCmdAllProducts(queryRoute string, cdc *codec.Codec) *cobra.Command {
	return &cobra.Command{
		Use:   "all-products",
		Short: "all-products",
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx := context.NewCLIContext().WithCodec(cdc)

			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/allProducts", queryRoute), nil)
			if err != nil {
				fmt.Printf("could not get all products \n")
				return nil
			}

			var out types.QueryResAllProducts
			cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintOutput(out)
		},
	}
}
```
Thêm các câu lệnh vào hàm ```GetQueryCmd```:
```go
nameserviceQueryCmd.AddCommand(flags.GetCommands(
		GetCmdResolveName(storeKey, cdc),
		GetCmdWhois(storeKey, cdc),
		GetCmdNames(storeKey, cdc),

		GetCmdProduct(storeKey, cdc),
		GetCmdAllProducts(storeKey, cdc),
	)...)
```

### Test
Mở terminal trong thư mục ```nameservice``` gốc, chạy lênh sau để make lại tools:
```bash
make install
```

Khởi tạo chain ban đầu và dựng network lên:
```bash
./init.sh
nsd start
```
Để nguyên terminal này cho nó chạy, mở 1 terminal khác và chạy các câu lệnh sau để test:

Lấy thông tin của jack
```bash
nscli query account $(nscli keys show jack -a)
```
Kết quả 
```json
{
  "type": "cosmos-sdk/Account",
  "value": {
    "address": "cosmos1ug35j0s0mfn6hah5sk076yfjqwxlh4gtfvdfpa",
    "coins": [
      {
        "denom": "nametoken",
        "amount": "1000"
      }
    ],
    "public_key": "cosmospub1addwnpepqf2s5xwaguhfcsxyqhtrjmp9g8hw8xx85pk6l7w9du45d2t57ky0jw8vkuw",
    "account_number": 3,
    "sequence": 4
  }
}
```
Jack tạo product
```bash
#jack create product
nscli tx nameservice create-product product01 description01 10nametoken --from jack

#query product01
nscli query nameservice product 01
```
Kết quả
```json
{
  "productID": "product01",
  "description": "description01",
  "owner": "cosmos1ug35j0s0mfn6hah5sk076yfjqwxlh4gtfvdfpa", #đây là địa chỉ của jack
  "price": [
    {
      "denom": "nametoken",
      "amount": "10"
    }
  ]
}
```

alice mua product
```bash
nscli tx nameservice buy-product product01 --from alice
#query product01
nscli query nameservice product 01
```
Kết quả:
```json
{
  "productID": "product01",
  "description": "description01",
  "owner": "cosmos1al3duc73np9aq3uplxt4s6dp7wdg4wswy40gtv", # địa chị của alice
  "price": [
    {
      "denom": "nametoken",
      "amount": "10"
    }
  ]
}
```
Query laị thông tin của alice và jack để thấy ```10nametoken``` đã được chuyển từ alice sang jack:
```bash
nscli query account $(nscli keys show jack -a)
nscli query account $(nscli keys show alice -a)
```
Query tất cả products:
```bash
nscli query nameservice all-products
```
### Tổng kết
Như vậy là đã hoàn thành một luồng mua bán product đơn giản tương tác bằng cli, bài sau mình sẽ hướng dẫn các bạn code client bằng rest-server.
### Tài liệu tham khảo
https://tutorials.cosmos.network/nameservice/tutorial/22-build-run.html