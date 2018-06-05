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
                <div class="col-xs-12 col-sm-6 col-md-4">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">` + user.uid + `</h5>
                        <p class="card-text">
                            <strong>First Name:</strong> ` + user.fname + `
                            <br/><strong>Last Name:</strong> ` + user.lname + `
                        </p>
                        <button type="button" class="btn btn-secondary btn-block" onclick="deleteUser('users', 'uid', '` + user.uid + `')">Delete</button>
                        </div>
                    </div>
                </div>                
                `);
            });
        }
    );
}
//delete User
function deleteUser(table, key, query) {
    if (query != null || undefined) {
        var send = {
            col: table,
            val: key,
            qq: query
        }
        $.ajax({
            url: 'dashboard/deleteUser',
            type: 'POST',
            data: send,
            timeout: 5000
        }).done(
            function(data){
                console.log(data);
            }
        );
    }
}