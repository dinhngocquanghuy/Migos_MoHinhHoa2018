function register() {
  var xhr = new XMLHttpRequest();
  var url = "/users/api/register";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log(json);
      alert(json.reason);
      window.location.href = "/users/login";
    } else {
      document.getElementById("error").innerHTML = "Invalid input";
    }
  };
  var username = document.getElementById("txtusername").value;
  var password = document.getElementById("txtpassword").value;
  var fullname = document.getElementById("txtfullname").value;
  var email = document.getElementById("txtemail").value;
  var address = document.getElementById("txtaddress").value;
  var phone = document.getElementById("txtphone").value;
  var role = document.getElementById("role").selectedIndex + 1;

  var data = JSON.stringify({
    username: username,
    password: password,
    fullname: fullname,
    email: email,
    address: address,
    phone: phone,
    role: role
  });
  xhr.send(data);
}

function login() {
  var xhr = new XMLHttpRequest();
  var url = "/users/api/login";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      localStorage.setItem("user", JSON.stringify(json));
      console.log('Local Storage:', json);
      if(json.role == 1){
        window.location.href = "/products/show";
      }
      else{
        window.location.href = "/seller/sellerHome/" + json.id;
      }
    } else {
      document.getElementById("error").innerHTML = "Invalid input";
    }
  };
  var username = document.getElementById("txtusername").value;
  var password = document.getElementById("txtpassword").value;
  var role = document.getElementById("role").selectedIndex + 1;
  var data = JSON.stringify({
    username: username,
    password: password,
    role: role
  });
  xhr.send(data);
}

function edit() {
  console.log(document.getElementById("txtpassword").value);
  if (document.getElementById("txtpassword").value == "") {
    document.getElementById("error").innerHTML = "Invalid input";
  } else {
    var xhr = new XMLHttpRequest();
    var url = "/users/api/edit";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
        alert(json.reason);
        window.location.href = "/users";
      } else {
        document.getElementById("error").innerHTML = "Invalid input";
      }
    };
    var username = document.getElementById("txtusername").value;
    var password = document.getElementById("txtpassword").value;
    var fullname = document.getElementById("txtfullname").value;
    var email = document.getElementById("txtemail").value;
    var address = document.getElementById("txtaddress").value;
    var phone = document.getElementById("txtphone").value;
    var role = document.getElementById("role").selectedIndex + 1;

    var data = JSON.stringify({
      username: username,
      password: password,
      fullname: fullname,
      email: email,
      address: address,
      phone: phone,
      role: role
    });
    xhr.send(data);
  }
}

window.onload = function() {
  var user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  document.getElementById("txtusername").value = user.username;
  //document.getElementById("txtpassword").value = user.username;
  document.getElementById("txtfullname").value = user.fullname;
  document.getElementById("txtemail").value = user.email;
  document.getElementById("txtaddress").value = user.address;
  document.getElementById("txtphone").value = user.phone;
  document.getElementById("role").selectedIndex = user.role - 1;
};
