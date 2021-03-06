//Populate Users on Load
$(document).ready(function () {
    getUsers();
});

//change password

function changePass() {
    $(".manager").slideUp(1000, function () {
        $(".manager").html(`
        <div class="row">
        <div class="col-xs-12 col-sm-12 offset-md-3 col-md-6">
        <form method="POST" action="/dashboard/changePW" id="changePW">
        <div class="form-group"><label for="uid">Username</label><input type="text" name="uid" id="uid" class="form-control" required></div>
        <div class="form-group"><label for="pwd">Old Password</label><input type="password" name="pwd" id="pwd" class="form-control" required></div>
        <div class="form-group"><label for="npwd">New Password</label><input type="password" name="npwd" id="npwd" class="form-control" required></div>
        <div class="form-group"><label for="cpwd">Confirm New Password</label><input type="password" name="cpwd" id="cpwd" class="form-control" required></div>
        <button class="btn btn-primary btn-lg">Change Password</button>
      </form>
      </div></div>
      <script>
      $("#changePW").submit(function(){
        if ($("#npwd").val() != $("#cpwd").val()){
            alert("Passwords don't match");
            return false;
        }
    });</script>
        `);
        $(".manager").slideDown();
    });
    $(".btn-group-vertical > button").removeClass("active");
    $("#Change-Password").addClass('active');
}


//Additions

//add product
function addProduct() {
    $(".manager").slideUp(1000, function () {
        $(".manager > .row").html(`
        <div class="col-xs-12 col-sm-12 offset-md-3 col-md-6">
        <form method="POST" action="/dashboard/addProduct" id="addProduct">
        <div class="form-group"><label for="pname">Product Name</label><input type="text" name="pname" id="pname" class="form-control" required></div>
        <div class="form-group"><label for="price">Price</label><input type="text" name="price" id="price" class="form-control" required></div>
        <div class="form-group"><label for="qty">Quantity</label><input type="text" name="qty" id="qty" class="form-control" required></div>
        <div class="form-group"><label for="desc">Description</label><textarea rows="5" name="desc" id="desc" class="form-control" required /><br/>
        <button class="btn btn-primary btn-lg">Confirm</button>
      </form>
      </div>
        `);
        $(".manager").slideDown();
    });
    $(".btn-group-vertical > button").removeClass("active");
    $("#Add-Product").addClass('active');
}

//get all users
function getUsers() {
    $(".manager").slideUp(1000, function () {
        $(".btn-group-vertical > button").removeClass("active");
        $("#Show-Users").addClass('active');
        $(".manager").html("<div class='row'></div>");
        $.ajax({
            url: "dashboard/getUsers",
            type: 'GET',
            timeout: 3000
        }).done(
            function (res) {
                $.each(res, function (collection, user) {
                    $(".manager > .row").append(`
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" id="` + user.uid + `">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">` + user.uid + `<button type="button" class="btn btn-secondary" style="float:right; font-size: 12px;" onclick="deleteUser('users','` + user.uid + `')"><i class="fa fa-trash"></i></button></h5>
                        
                        <hr />
                        <p class="card-text">
                            <strong>First Name:</strong> ` + user.fname + `
                            <br/><strong>Last Name:</strong> ` + user.lname + `
                        </p>
                        </div>
                    </div>
                </div>                
                `);
                });
            }
        );
    }).delay(1500).slideDown();
}
//get all users
function getProducts() {
    $(".manager").slideUp(1000, function () {
        $(".btn-group-vertical > button").removeClass("active");
        $("#Show-Products").addClass('active');
        $(".manager").html("<div class='row'></div>");
        $.ajax({
            url: "dashboard/getProducts",
            type: 'GET',
            timeout: 3000
        }).done(
            function (res) {
                $.each(res, function (collection, product) {
                    $(".manager > .row").append(`
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" id="` + product.pid + `">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">` + product.pname + `</h5>
                        <hr />
                        <p class="card-text">
                            <strong>Price:</strong> $` + product.price + `
                            <br/><strong>Quantity:</strong> ` + product.qty + `
                            <br/><strong>Description:</strong><br /> ` + product.desc + `
                        </p>
                        <div class="btn-group" style="float:right">
                        <button type="button" class="btn btn-secondary" onclick="deleteProduct('` + product.pid + `')"><i class="fa fa-trash"></i></button>
                        <button type="button" class="btn btn-secondary" onclick="editProduct('`+ product.pid +`')"><i class="fa fa-edit"></i></button>
                        </div></div>
                    </div>
                </div>                
                `);
                });
            }
        );
    }).delay(1500).slideDown();
}

//Deletions

//delete User
function deleteUser(query) {
    if (query != null || undefined) {
        if (confirm("Are you sure you would like to delete user: " + query + "?")) {
            $.ajax({
                url: 'dashboard/deleteUser',
                type: 'POST',
                data: {qq: query},
                timeout: 5000
            }).done(
                function () {
                    $("#" + query).fadeOut();
                    $(".manager").prepend(`
                    <div class="alert alert-success" role="alert" id="user-alert" style="display:none">
                       User ` + query + ` has been deleted
                    </div>
                    `);
                    $("#user-alert").slideDown(500).delay(5000).slideUp();
                }
            );
        }
    }
}
//delete product
function deleteProduct(table,query) {
    if (query != null || undefined) {
        if (confirm("Are you sure you would like to delete: " + query + "?")) {
            $.ajax({
                url: 'dashboard/deleteProduct',
                type: 'POST',
                data: {qq: query},
                timeout: 5000
            }).done(
                function () {
                    $("#" + query).fadeOut();
                    $(".manager").prepend(`
                    <div class="alert alert-success" role="alert" id="product-alert" style="display:none">
                       Product ` + query + ` has been deleted
                    </div>
                    `);
                    $("#product-alert").slideDown(500).delay(5000).slideUp();
                }
            );
        }
    }
}
function editProduct(product){
    $.ajax({
        url: 'dashboard/getProduct',
        type: 'GET',
        data: {pid: product},
        timeout: 5000
    }).done(function(data){
        $(".manager").slideUp(1000, function () {
            $(".manager > .row").html(`
            <div class="col-xs-12 col-sm-12 offset-md-3 col-md-6">
            <form id="editProduct">
            <div class="form-group"><label for="pid">Product ID</label><input type="text" name="pid" id="pid" class="form-control" value="`+data[0].pid+`" readonly></div>
            <div class="form-group"><label for="pname">Product Name</label><input type="text" name="pname" id="pname" class="form-control" value="`+data[0].pname+`" required></div>
            <div class="form-group"><label for="price">Price</label><input type="text" name="price" id="price" class="form-control" value="`+data[0].price+`" required></div>
            <div class="form-group"><label for="qty">Quantity</label><input type="text" name="qty" id="qty" class="form-control" value="`+data[0].qty+`" required></div>
            <div class="form-group"><label for="desc">Description</label><textarea rows="5" name="desc" id="desc" class="form-control" required>`+data[0].desc+`</textarea><br/>
            <button class="btn btn-primary btn-lg">Confirm</button>
          </form>
          </div>
            `);
            $(".manager").slideDown();
        });
    });
}
$("#editProduct").submit(function(ev){
    $.ajax({
        url: '/dashboard/editProduct',
        type: 'POST',
        data: $(this).serialize(),
        success: getProducts()
    });
});