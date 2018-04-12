/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = window.localStorage;

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $(".center");
var total = 0;
var ordersNumber = 0;

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    function samePizza(obj) {
        return obj.pizza.id === pizza.id && obj.size === size;
    }

    var theSame = Cart.filter(samePizza);
    if (theSame.length > 0) {
        theSame[0].quantity++;
    } else {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
        ordersNumber++;
        updateOrdersNumber();
    }
    // Оновлюємо суму
    total += pizza[size].price;
    updateTotalSum();
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    Cart.splice(Cart.indexOf(cart_item), 1);

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    var savedCart = Storage.getItem("cart");
    if (savedCart) {
        Cart = savedCart;
        total = Storage.getItem("total");
        updateTotalPrice();
        ordersNumber = Storage.getItem("ordersNumber");
        updateOrdersNumber();
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateTotalPrice() {
    $(".price").html(total);
    Storage.setItem("total",total);
}

function updateOrdersNumber() {
    $(".titleAllPizzas-number").html(ordersNumber);
    Storage.setItem("numberOfOrders",numberOfOrders);
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            total += cart_item.pizza[cart_item.size].price;

            //Оновлюємо відображення

            updateTotalPrice();
            updateCart();

        });

        $node.find(".minus").click(function () {
            //Зменшуємо
            if (cart_item.quantity == 1) {
                removeFromCart(cart_item);
                ordersNumber--;
                updateOrdersNumber();
            }
            cart_item.quantity -= 1;
            total -= cart_item.pizza[cart_item.size].price;
            //Оновлюємо відображення
            updateCart();
            updateTotalPrice();
        });
        $node.find(".remove-button").click(function () {
            removeFromCart(cart_item);
            total -= cart_item.pizza[cart_item.size].price * cart_item.quantity;
            ordersNumber--;
            updateOrdersNumber();
            updateTotalPrice();
            //Оновлюємо відображення
            updateCart();
            updateTotal();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

    Storage.setItem("cart", Cart);
    if (Cart.length === 0) {
        $(".order-button").attr("disabled", "disabled");
    } else {
        $(".order-button").removeAttr("disabled");
    }

}

$(".clear").click(function () {
    Cart = [];
    updateCart();
    total = 0;
    updateTotalPrice();
    ordersNumber = 0;
    updateOrdersNumber();
});




$(".order-button").click(function () {
    if (Cart.length !== 0) {
        location.href = "/order.html";
    }
});

$(".edit-button").click(function () {
    if (Cart.length !== 0) {
        location.href = "/";
    }
});

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;