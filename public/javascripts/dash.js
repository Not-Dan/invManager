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
                        <h5 class="card-title">` + user.uid + `</h5>
                        <p class="card-text">
                            <strong>First Name:</strong> ` + user.fname + `
                            <br/><strong>Last Name:</strong> ` + user.lname + `
                        </p>
                        <button type="button" class="btn btn-secondary btn-block" onclick="deleteUser('users','` + user.uid + `')">Delete</button>
                        </div>
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