function showItemList() {
	var itemListStore = JSON.parse(localStorage.getItem('cart'));
	var table = document.getElementById("tableCart");
	var textSum = document.getElementById("sum");
	var sum = 0; // Tổng giá trị đơn hàng
	if (itemListStore.length != 0)
	{	
		// Thêm hàng cho bảng sản phẩm và tính tổng giá trị
		for (var i = 0; i < itemListStore.length; i++)
			{
				var row = table.insertRow(i + 1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				cell1.innerHTML = "<img src='" + itemListStore[i].image_url + "' class='img-item'>";
				cell2.innerHTML = "<p class='text-center'>" + itemListStore[i].name + "</p";
				cell3.innerHTML = "<p class='text-center'>" + itemListStore[i].price + " VNĐ" + "</p>";
				cell4.innerHTML = "<div class='text-center'> <button class='btn btn-danger' type='submit' onClick='removeItem(" + itemListStore[i].product_id +  ")'> Xóa </button> </div>";
				sum = sum + itemListStore[i].price;
			}
	}
	textSum.innerHTML = sum + " VNĐ";
}
function removeItem(idProduct) {
	
	var cartList = JSON.parse(localStorage.getItem('cart'));
	var newCartList = cartList.filter((cart) => {
		return cart.product_id != idProduct; // Trả về những sản phẩm có Id khác Id bị xóa
	});
	var textSum = document.getElementById("sum"); 
	var sum = 0; // Tổng giá trị đơn hàng
	// Cập nhật lại tổng giá trị sau khi xóa bớt sản phẩm
	for (var i = 0; i < newCartList.length; i++)
	{
		sum = sum + newCartList[i].price;
	}
	textSum.innerHTML = sum + " VNĐ";
	console.log(newCartList);
	localStorage.setItem('cart', JSON.stringify(newCartList));
	console.log(cartList.length);
	// Xóa tất cả các hàng trong bảng và tạo lại bảng
	for (var i = 0; i < cartList.length; i++) {
		document.getElementById("tableCart").deleteRow(1);
	}
	showItemList();
}
function purchase() {
	var buyerInfo = JSON.parse(localStorage.getItem('user'));
	var buyerID = buyerInfo.id;
	console.log(buyerID);
	var req = new XMLHttpRequest();
	req.open('GET', './purchase/getLatestID', false);
	req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	req.send();
	var result = JSON.parse(req.responseText);
	var latestID = result.LatestID;
	
	var cart = JSON.parse(localStorage.getItem('cart'));
	var order = [[latestID + 1, buyerID]];
	console.log(order);
	var orderitem = [];
	for (var i = 0; i < cart.length; i++)
	{
		orderitem[i] = [latestID + 1, cart[i].product_id, 1];
	}
	console.log(orderitem);
	var data = {
		"order": order,
		"orderitem": orderitem
	};
	var buyReq = new XMLHttpRequest();
	buyReq.open('POST', './purchase/buy', false);
	buyReq.setRequestHeader('Content-Type', 'application/json');
	buyReq.send(JSON.stringify(data));
	console.log(data);
}
window.onload = function(e){ 
	showItemList();
};