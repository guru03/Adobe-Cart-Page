$(window).on("load", function () {

	$.ajax({
		url: 'https://api.myjson.com/bins/qhnfp',
		method: 'get',
		dataType: "json",

		success: function (data) {
			$("#productList").empty();
			$(data).each(function (index, book) {
				$("#productList").append(
					`<div class="column">
					<div class="products">
						<div class="product-img">
							<img src="${book.img_url}"
								class="book-cover" alt="">
						</div>
						<div class="discount">
							<span class="offPrice">${book.discount}%</span><span class="off">off</span>
						</div>
						<div class="book-footer">
							<p>${book.name}</p>
							<div class="price-cart">
								<div class="price-list">
									$<span class="price-cut">${book.price}</span>
									$<span class="real-price">${book.price - (book.price*book.discount/100 )}</span>
								</div>
								<button type="button" class="addCartBtn">Add to Cart</button>
								<input type="hidden" class="bookId" value="${book.id}" readonly="true">
							</div>
						</div>
					</div>
				</div>`
				);
			});
		}
	});
});

var cartItems = 0;
var itemQty = 1;
$("input").prop("readonly", true);

$(document).on('click', '.addCartBtn', function () {
	var bookIdvalue = $(this).closest('.price-cart').find('input:hidden').val();
	var realPrice = $(this).closest('.price-cart').find('.real-price').text();
	var totalOrder = [];
	$(this).text("Go to cart").attr("disabled", 'disabled');
	cartItems++;
	$(".cart-badge").text(cartItems);
	$("#orderSummary").append(
		`<div class="summary-items">
			<div class="item-box">
				<div class="image-name">
					<input type="hidden" class="bookIdValue" value="${bookIdvalue}">
					<img class="img-fluid"
						src="https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg">
					<span class="itemName">Product Name</span>
					<a href="javascript:void(0);" class="remove">Remove</a>
				</div>
			</div>
			<div class="quantity">
				<a href="javascript:void(0)" class="decrease">-</a>
				<input type="text" class="quantityInput" value="1">
				<a href="javascript:void(0)" class="increase">+</a>
			</div>
			<div class="price">
				$<span>${realPrice}</span>
			</div>
		</div>`
	);
	// var itemNumber =  $('#orderSummary .summary-items').length;
	// $('.total-section').find('.itemNumber > span').text(itemNumber);
	// $('#orderSummary .summary-items').each(function(index, value){
	// 	var totalOrder = $(this).find('.price span').text();
	// 	var totalOrderSum =+  totalOrder;
	// 	$('.total-section').find('.totalOrderSum').text(totalOrderSum);
	// });

	//var itemOrder = $(this).find('.price span').text();
	updateTotal()
	
});

$(document).on('click', 'a.remove', function () {
	var removeBookValue = $(this).closest('.summary-items').find('.bookIdValue').val();
	$('#productList .column').each(function (index, value) {
		var removeItems = $(this).find('input:hidden').val();
		if (removeBookValue == removeItems) {
			$(this).find('.addCartBtn').text("Add to cart").removeAttr("disabled", 'disabled');
		}
	});

	cartItems--;
	$(".cart-badge").text(cartItems);
	$(this).closest('.summary-items').remove();

});

$(document).on('click', 'a.increase', function () {
	var increaseBookPrice = 0;
	var increaseBookId = $(this).closest('.summary-items').find('.bookIdValue').val();
	$('#productList .column').each(function (index, value) {
		var removeItems = $(this).find('input:hidden').val();
		if (increaseBookId == removeItems) {
			increaseBookPrice = $(this).find('.real-price').text();
		}
	});

	itemQty++;
	$(this).closest('.quantity').find("input.quantityInput").val(itemQty);
	var addBookprice = Number(increaseBookPrice) * itemQty;
	$(this).closest('.summary-items').find('.price span').text(addBookprice);
});

$(document).on('click', 'a.decrease', function () {
	var totalItemPrice = $(this).closest('.summary-items').find('.price span').text();
	var decreaseBookPrice = 0;
	var decreaseBookId = $(this).closest('.summary-items').find('.bookIdValue').val();
	$('#productList .column').each(function (index, value) {
		var removeItems = $(this).find('input:hidden').val();
		if (decreaseBookId == removeItems) {
			decreaseBookPrice = $(this).find('.real-price').text();
		}
	});
	if (itemQty <= 1) {
		return false;
		$(this).attr("disabled", 'disabled');
	}
	itemQty--;
	$(this).closest('.quantity').find("input.quantityInput").val(itemQty);
	var minusBookprice = totalItemPrice - Number(decreaseBookPrice) ;
	$(this).closest('.summary-items').find('.price span').text(minusBookprice);
});

function updateTotal(){
	var updateTotalSum = [];
	$('#orderSummary .summary-items').each(function(index, value){
		var totalOrder = $(this).find('.price span').text();
		updateTotalSum.push(updateTotalSum);
		// var totalOrderSum =+  totalOrder;
		// $('.total-section').find('.totalOrderSum').text(totalOrderSum);
	});
};