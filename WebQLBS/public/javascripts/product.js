function add_pro() {
    var xhr = new XMLHttpRequest();
    var url = "/products/api/new_product";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
            alert(json.reason);
            window.location.href = "/";
        } else {
            document.getElementById('error').innerHTML = "Invalid input";
        }
    };
    var product_id = document.getElementById('txtproductid').value;
    var seller_id = document.getElementById('txtuserid').value;
    var name = document.getElementById('txtname').value;
    var price = document.getElementById('txtprice').value;
    var description = document.getElementById('txtdescription').value;
    var image_url = document.getElementById('txtimageurl').value;
    var status = document.getElementById('txtstatus').value;
    var type = document.getElementById('txttype').value;

    var data = JSON.stringify({
        "product_id": product_id,
        "seller_id": seller_id,
        "name": name,
        "price": price,
        "description": description,
        "image_url": image_url,
        "status": status,
        "type": type
    });
    xhr.send(data);
}