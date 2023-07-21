document.addEventListener("alpine:init", () => {
    Alpine.data("pizzaCart", () => {
        return {
            title: 'Pizza cart API',
            pizzas: [],
            cartPizzas:[],
            username: 'Mercyfulll',
            cartId:'RlFqOyo9gT',
            cartTotal: 0.00,
            getCart(){
                const getCartUrl = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/get`
                return axios.get(getCartUrl)
            },
            addPizza(pizzaId){
                return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/add',{
                "cart_code": this.cartId,
                "pizza_id" : pizzaId
                })
            },
            removePizza(pizzaId){
                return axios.post("https://pizza-api.projectcodex.net/api/pizza-cart/remove",{
                "cart_code": this.cartId,
                "pizza_id" : pizzaId
                })
            },
            showCartData(){
                this.getCart().then(result =>{
                    const cartData = result.data;
                    this.cartPizzas = cartData.pizzas;
                    this.cartTotal = cartData.total.toFixed(2);
                })
            },
            init() {
                axios
                    .get('https://pizza-api.projectcodex.net/api/pizzas')
                    .then(result => {
                        console.log(result.data);
                        this.pizzas = result.data.pizzas;
                    })
                    this.showCartData()
                    
            },
            addPizzaToCart(pizzaId){
                this.addPizza(pizzaId).then(()=>{
                    this.showCartData()
            })
            },
            removePizzaFromCart(pizzaId){
                this.removePizza(pizzaId).then(()=>{
                    this.showCartData()
            })
            }
        }
    })
})