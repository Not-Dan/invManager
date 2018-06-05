//Populate Users on Load
$(document).ready(function () {
    getUsers();
});

//get all users
function getUsers() {
    $.ajax({
        url: "dashboard/getUsers",
        type: 'GET',
        timeout: 3000
    }).done(
        function (res) {
            $.each(res, function (collection, user) {
                $(".manager > .row").append(`
                <div class="col-xs-12 col-sm-6 col-md-4" id="`+user.uid+`">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">` + user.uid + `</h5>
                        <p class="card-text">
                            <strong>First Name:</strong> ` + user.fname + `
                            <br/><strong>Last Name:</strong> ` + user.lname + `
                        </p>
                        <button type="button" class="btn btn-secondary btn-block" onclick="deleteUser('` + user.uid + `')">Delete</button>
                        </div>
                    </div>
                </div>                
                `);
            });
        }
    );
}
//delete User
function deleteUser(query) {
    if (query != null || undefined) {
        if(confirm("Are you sure you would like to delete user: "+query+"?")){
            $.ajax({
                url: 'dashboard/deleteUser',
                type: 'POST',
                data: query,
                timeout: 5000
            }).done(
                function(){
                    $("#"+query).fadeOut();
                    $(".manager").prepend(`
                    <div class="alert alert-success" role="alert" id="user-alert" style="display:none">
                       User `+query+` has been deleted
                    </div>
                    `);
                    $("#user-alert").slideDown(500).delay(5000).slideUp();
                }
            );
        }
    }
}