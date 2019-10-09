$(function () {
    //Create Cart object
    var cart = new Cart();

    //Create Main Item object
    var item = new Item(
        "Programming books bundle",
        50.0,
        "res/images/image1.jpg",
        [
            "res/images/image1.jpg",
            "res/images/image2.jpg",
            "res/images/image3.jpg",
            "res/images/image4.jpg"
        ]
    );
    //Create and array of 4 Items
    var items = [
        new Item("Java Programming", 23.0, "res/images/image5.jpg"),
        new Item("Programming in C++", 15.0, "res/images/image6.jpg"),
        new Item("Programming and fundamentals of Python", 5.50, "res/images/image7.jpg"),
        new Item("My first coding book", 10.90, "res/images/image8.jpg"),
    ];

    //Calling Initialization function
    init();

    //Handle click event on elements that have "add-to-cart" class
    $('.add-to-cart').click(function (event) {

        //Get "id" attribute of the exact element that was clicked
        let id = $(event.target).attr('id');

        //Search id in cart.selected array
        let index = cart.selected.indexOf(id);

        //If index > -1 means id was found in cart.selected array
        if (index > -1) {

            //Remove id from cart.selected array
            cart.selected.splice(index, 1);

            /**
             * Subtract item price from cart.total,
             * here we also check if id was "main-button" which means that main item "Add to cart" button was clicked
             * if id does not equal "main-button" it means that one of the item buttons on sidebar was clicked
             **/
            cart.total -= (id === "main-button") ? item.price : items[id].price;

            /**
             * With event target we get exact element that was clicked on.
             * We remove from it "remove-from-cart" class
             * We add "add-to-cart" class to it
             * And change it's text to "Add to cart"
            **/
            $(event.target)
                .removeClass("remove-from-cart")
                .addClass("add-to-cart")
                .text("Add to cart");
        }
        else{
            //This block is executed if id was not found in cart.selected array

            //We add id to cart.selected array
            cart.selected.push(id);

            /**
             * Add item price to cart.total,
             * here we also check if id was "main-button" which means that main item "Add to cart" button was clicked
             * if id does not equal "main-button" it means that one of the item buttons on sidebar was clicked
             **/
            cart.total += (id === "main-button") ? item.price : items[id].price;

            /**
             * With event target we get exact element that was clicked on.
             * We remove from it "add-to-cart" class
             * We add "remove-from-cart" class to it
             * And change it's text to "Remove from cart"
             **/
            $(event.target)
                .removeClass("add-to-cart")
                .addClass("remove-from-cart")
                .text("Remove from cart");
        }
        //Call to refreshAmount function
        refreshAmount();
        //Call to refreshTotal function
        refreshTotal();
    });

    //Handle keyup event on textarea that is inside an element with class "comment-box"
    $('.comment-box textarea').keyup(function(event){
        //Check if enter was pressed
        if(event.which === 13){
            //Get the text that is inside textarea
            let text = $(event.target).val();
            //Create an empty "div" element and add a "comment" class to it, set it's text to "text"
            let div = $('<div>').addClass('comment').text(text);
            //Append newly created div to an element with "comment-contents" class on our page
            $('.comment-contents').append(div);
            //Reset textarea value to an empty string
            $(event.target).val("")
        }
    });

    //Handle click event on an image tag inside an element with "thumbnails class"
    $('.thumbnails img').click(function(event){
        //Get the "src" attribute value from the image that was clicked
        let src = $(event.target).attr('src');
        //Replace "src" attribute value on an image with id "item-main-image"
        $('#item-main-image').attr('src', src);
    });

    function refreshTotal() {
        //Set text value of an element with id "total-price" to whatever is cart.total (initially it is 0.0)
        $('#total-price').text(cart.total)
    }

    function refreshAmount() {
        //Set text value of a span element, that is inside element with "cart-container" class
        //to number of selected items
        $('.cart-container span').text(cart.selected.length)
    }

    //Initialization function
    function init() {

        //Set "src" attribute value of an element with id "item-main-image" that is inside an element with id "item-container",
        //to main item image
        $("#item-container #item-main-image").attr('src', item.image);
        //Set text value of a h1 that is inside an element with id "item-container" to main item title - main item price $
        $("#item-container h1").text(item.title + " - " + item.price + "$");

        //Running loop through main item thumbnails
        for (let i = 0; i < item.thumbnails.length; i++) {
            //Create image tag and set it's "src" attribute to a thumbnail image on each lap of the loop
            let img = $('<img>').attr('src', item.thumbnails[i]);
            //Append newly created image to an element with class "thumbnails" that is inside of an element with id "item-container"
            $("#item-container .thumbnails").append(img)
        }

        //Loop through array of items
        for (let i = 0; i < items.length; i++) {
            //Create empty list item tag
            let li = $("<li></li>");
            //Create empty div tag
            let div = $('<div></div>');
            //Create empty h4 tag
            let h4 = $('<h4></h4>');
            //Create empty image tag and set it's "src" attribute to item image.
            let img = $('<img>').attr('src', items[i].image);
            //Create link tag and set it's text to item title - item price $
            let a = $('<a href="#"></a>').text(items[i].title + " - " + items[i].price + "$");
            //Create button, add "add-to-cart" class to it and set it's "id" attribute to i (0,1,2,3 in this case)
            let button = $('<button>Add to cart</button>').addClass("add-to-cart").attr('id', i);

            /**
             * Append link to h4 - resulting html will be:
             * <h4>
             *     <a href="#">...</a>
             * </h4>
             */
            h4.append(a);

            /**
             * Append image tag to div - resulting html will be:
             * <div>
             *     <img src="..."/>
             * </div>
             */
            div.append(img);

            /**
             * Append h4 to div - resulting html will be:
             * <div>
             *     <img src="..."/>
             *     <h4>
             *         <a href="#">...</a>
             *     </h4>
             * </div>
             */
            div.append(h4);

            /**
             * Append button to div - resulting html will be:
             * <div>
             *     <img src="..."/>
             *     <h4>
             *         <a href="#">...</a>
             *     </h4>
             *     <button class="add-to-cart" id="...">Add to cart</button>
             * </div>
             */
            div.append(button);

            /**
             * Append div to list item tag - resulting html will be:
             * <li>
             *     <div>
             *         <img src="..."/>
             *         <h4>
             *             <a href="#">...</a>
             *         </h4>
             *         <button class="add-to-cart" id="...">Add to cart</button>
             *     </div>
             * </li>
             */
            li.append(div);

            //Append li tag to ul element inside and element with "suggested-container" class
            $('.suggested-container ul').append(li)
        }
    }
});
