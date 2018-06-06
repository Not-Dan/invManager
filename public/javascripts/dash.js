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
        <form id="changePW">
        <div class="form-group"><label for="uid">Username</label><input type="text" name="uid" id="uid" class="form-control"></div>
        <div class="form-group"><label for="pwd">Old Password</label><input type="text" name="pwd" id="pwd" class="form-control"></div>
        <div class="form-group"><label for="npwd">New Password</label><input type="text" name="npwd" id="npwd" class="form-control"></div>
        <div class="form-group"><label for="cpwd">Confirm New Password</label><input type="text" name="cpwd" id="cpwd" class="form-control"></div>
        <button class="btn btn-primary btn-lg">Change Password</button>
      </form>
      </div></div>
        `);
        $(".manager").slideDown();
    });
    $(".btn-group-vertical > button").removeClass("active");
    $("#Change-Password").addClass('active');
}

//add product
function addProduct() {
    $(".manager").slideUp(1000, function () {
        $(".manager").html(`
        <div class="row">
        <div class="col-xs-12 col-sm-12 offset-md-3 col-md-6">
        <form id="addProduct">
        <div class="form-group"><label for="pname">Product Name</label><input type="text" name="pname" id="pname" class="form-control"></div>
        <div class="form-group"><label for="price">Price</label><input type="text" name="price" id="price" class="form-control"></div>
        <div class="form-group"><label for="qty">Quantity</label><input type="text" name="qty" id="qty" class="form-control"></div>
        <div class="form-group"><label for="desc">Description</label><input type="textbox" name="desc" id="desc" class="form-control"></div>
        <button class="btn btn-primary btn-lg">Confirm</button>
      </form>
      </div></div>
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
                            <strong>Price:</strong> ` + product.price + `
                            <br/><strong>Quantity:</strong> ` + product.qty + `
                            <br/><strong>Description:</strong><br /> ` + product.desc + `
                        </p>
                        <div class="btn-group" style="float:right">
                        <button type="button" class="btn btn-secondary" onclick="deleteUser('products','` + product.pid + `')"><i class="fa fa-trash"></i></button>
                        <button type="button" class="btn btn-secondary"><i class="fa fa-edit"></i></button>
                        </div></div>
                    </div>
                </div>                
                `);
                });
            }
        );
    }).delay(1500).slideDown();
}
//delete User
function deleteUser(table,query) {
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