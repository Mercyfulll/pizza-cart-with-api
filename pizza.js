document.addEventListener("alpine:init", () => {
    Alpine.data("pizzaCart", () => {
        return {
            title: 'Pizza cart API',
            pizzas: [],
            cartPizzas:[],
            username: 'Mercyfulll',
            cartId:'',
            cartTotal: 0.00,
            paymentAmount: 0,
            message: '',
            createCart (){
                const createCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/create?username=${this.username}`
                return axios.get(createCartURL)
                    .then(result =>{
                        this.cartId = result.data.cart_code
                    })
            },
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
            pay(amount){
                return axios.post("https://pizza-api.projectcodex.net/api/pizza-cart/pay",
                        {
                            "cart_code": this.cartId,
                            "amount" : amount
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

                if (!this.cartId){
                    this
                    .createCart()
                    .then(() =>{
                        this.showCartData()
                    })
                }
                    
                    
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
            },
            payForCart(){
                this
                .pay(this.paymentAmount)
                .then(result =>{
                    if(result.data.status == "failure"){
                        const msg = document.querySelector('.message')
                        msg.classList.add('crimson')
                        this.message = result.data.message
                        setTimeout(() => this.message = '',3000)
                        
                    }
                    else if (result.data.status == "success"){
                        const msg = document.querySelector('.message')
                        msg.classList.add('green')
                        this.message = result.data.message
                        setTimeout(() => {
                            this.message = '',
                            this.cartId = '',
                            this.cartTotal = 0.00,
                            this.cartPizzas = [],
                            this.paymentAmount = 0,
                            this.createCart()
                        },3000)
                        
                    }
                })
            }
        }
    })
})