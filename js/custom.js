var SERVER_DO = "http://edarshan.org/";
// DB connection
jQuery(document).ready(function(){
	reload_page();
});

function reload_page(){
	//alert("hh");
	$.ajax({
		url:SERVER_DO+"d_order/db.php",
		success:function(response){
			$("#con_success").show();
			$("#con_error").hide();
			//alert(str);
		},
		error: function(xhr, status, error) {
			$("#con_error").show();
			$("#con_success").hide();
			//alert(xhr.responseText);
		}
	});
}


// Add to cart

 $(function () {

    var goToCartIcon = function($addTocartBtn){
      var $cartIcon = $(".my-cart-icon");
      var $image = $('<img width="30px" height="30px" src="' + $addTocartBtn.data("image") + '"/>').css({"position": "fixed", "z-index": "999"});
      $addTocartBtn.prepend($image);
      var position = $cartIcon.position();
      $image.animate({
        top: position.top,
        left: position.left
      }, 500 , "linear", function() {
        $image.remove();
      }); 
    }

    $('.my-cart-btn').myCart({
      currencySymbol: 'Rs.',
      classCartIcon: 'my-cart-icon',
      classCartBadge: 'my-cart-badge',
      classProductQuantity: 'my-product-quantity',
      classProductRemove: 'my-product-remove',
      classCheckoutCart: 'my-cart-checkout',
      affixCartIcon: true,
      showCheckoutModal: true,
      numberOfDecimals: 2,
      /* cartItems: [
        {id: 1, name: 'product 1', summary: 'summary 1', price: 10, quantity: 1, image: 'images/img_1.png'},
        {id: 2, name: 'product 2', summary: 'summary 2', price: 20, quantity: 2, image: 'images/img_2.png'},
        {id: 3, name: 'product 3', summary: 'summary 3', price: 30, quantity: 1, image: 'images/img_3.png'}
      ], */
      clickOnAddToCart: function($addTocart){
        goToCartIcon($addTocart);
      },
      afterAddOnCart: function(products, totalPrice, totalQuantity) {
        console.log("afterAddOnCart", products, totalPrice, totalQuantity);
      },
      clickOnCartIcon: function($cartIcon, products, totalPrice, totalQuantity) {
        console.log("cart icon clicked", $cartIcon, products, totalPrice, totalQuantity);
      },
      checkoutCart: function(products, totalPrice, totalQuantity) {
        var checkoutString = "Total Price: " + totalPrice + "\nTotal Quantity: " + totalQuantity;
        checkoutString += "\n\n id \t name \t summary \t price \t quantity \t image path";
        $.each(products, function(){
          checkoutString += ("\n " + this.id + " \t " + this.name + " \t " + this.summary + " \t " + this.price + " \t " + this.quantity + " \t " + this.image);
        });
        alert(checkoutString)
        console.log("checking out", products, totalPrice, totalQuantity);
      },
      getDiscountPrice: function(products, totalPrice, totalQuantity) {
        console.log("calculating discount", products, totalPrice, totalQuantity);
        return totalPrice * 0.5;
      }
    });

  });
