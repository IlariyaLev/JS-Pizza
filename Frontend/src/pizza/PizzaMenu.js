/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');
//var API = require('../API');


//HTML едемент куди будуть додаватися піци
var $pizza_list = $(".pizzaList");


function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");


    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }


    var pizzasArr = Pizza_List;
    for (var i=0; i<pizzasArr.length; i++){
        showOnePizza(pizzasArr[i]);
    }


}

function isSeaFood(obj) {
        if (obj.content.ocean)
                return true;
        else return false;
    }
function isVegeterian(obj) {
        if (!obj.content.meat && !obj.content.ocean)
                return true;
        else return false;
    }
function isMeat(obj) {
        if (obj.content.meat)
                return true;
        else return false;
    }
function isMushroom(obj) {
        if (obj.content.mushroom)
                return true;
        else return false;
    }
function isPineapple(obj) {
        if (obj.content.pineapple)
                return true;
        else return false;
}


    $(".pizzaType").click(function () {
            $(".nav-pizza").find(".active").removeClass("active");
            $(this).addClass("active");

            var type = $(this).find("a").html();
            switch (type) {
                    case "Vegetarian":
                            filterPizza(isVegeterian);
                            break;
                        case "Pineapple":
                            filterPizza(isPineapple);
                            break;
                        case "Seafood":
                            filterPizza(isSeaFood);
                            break;
                        case "Meat":
                            filterPizza(isMeat);
                            break;
                        case "Mashrooms":
                            filterPizza(isMushroom);
                            break;
                        case "All":
                            filterPizza();
                            break;
                    }

            });


function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    if(filter){
            var pizza_shown = Pizza_List.filter(filter);


               showPizzaList(pizza_shown);
           }else {showPizzaList(Pizza_List);}
}



function initialiseMenu() {
  // API.getPizzaList(function (err,list) {
              // if(err){
                        //alert("Error")
                  // }else{
                        //Pizza_List=$pizza_list;
                        showPizzaList(Pizza_List);
                        $(".number-of-orders").html(Pizza_List.length);
                   // }

               // })
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;