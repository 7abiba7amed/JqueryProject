$(function () {
    //Utilities Functions
    function textValidation (e) { //prevent enter any number
        console.log(e);
        console.log(e.keyCode);
        if (e.keyCode >= 48 && e.keyCode <= 57) {
            e.preventDefault();
            $(".error").text("This Input Accept Chars Only");
        }
        else {
            $(".error").text("");
        }
    }
    function numberValidation (e) { //prevent all except numbers
        console.log(e);
        console.log(e.keyCode);
        if (!(e.keyCode >= 48 && e.keyCode <= 57)) {
            e.preventDefault();
            $(".error").text("This Input Accept Numbers Only");
        }
        else {
            $(".error").text("");
        }
    }
    function notEmpty(data){
        if(data == "")
            return false;
        else
            return true;
    }
    function ageValidation(data){
        if(data >= 20 && data <= 60)
            return true;
        else
            return false;
    }
    // keypress validations
    $("#txtName").on("keypress",textValidation)
    $("#txtEName").on("keypress",textValidation)
    $("#txtage").on("keypress",numberValidation)
    $("#txtEAge").on("keypress",numberValidation)
    $("#txtid").on("keypress",numberValidation)
    $("#txtESalary").on("keypress",numberValidation)
    $("#txtsalary").on("keypress",numberValidation)
    // get data
    $("#GetData").on("click", function () {
        $.ajax({
            type: "get",
            url: "http://localhost:3000/employees",
            success: function (res) {
                CreateTr(res);
            }
        });
    });
    
    $("#GetData").trigger("click");

    function CreateTr(DataArrayObject) { // function for display data in table
       $(".data").remove();
        DataArrayObject.forEach(element => {
            let newTr = document.createElement("tr");
            $(newTr).addClass("data");
            for (prop in element) {
                let newTd = document.createElement("td");
                $(newTd).text(element[prop]);
                $(newTr).append(newTd);
            }
            $(newTr).append(`<td><button class="edit">Edit</button></td>`);
            $(newTr).append(`<td><button class="delete">Delete</button></td>`);
            $("#_tbl").append(newTr);
        });
        $(".delete").on("click", function () { // on delete 
            let id= this.parentElement.parentElement.firstElementChild.textContent;
            // popup message
            $("#popUp").css({
                display: 'block'
            })
            $("#confirm").on("click",function(){
                $("#popUp").css({
                    display: 'none'
                })
                deleteEmployee(id);
            })
            $("#cancel").on("click",function(){
                $("#popUp").css({
                    display: 'none'
                })
            })
        });
        $(".edit").on("click", function () { // on edit
            let id= this.parentElement.parentElement.firstElementChild.textContent;
            $("#editForm").css({
                display: 'block'
            });
            $("#_tbl").css({
                display: 'none'
            });
            $("#adding").css({
                display: 'none'
            });
            editEmployee(id)
            
            $("#GetData").on("click",function(){
                $("#editForm").css({
                    display: 'none'
                });
                $("#_tbl").css({
                    display: 'table'
                });
                $("#adding").css({
                    display: 'inline-block'
                });
            });
        });
    }
    $("#adding").on("click", function () {
        $("#addForm").css({
            display: 'block'
        })
        $("#_tbl").css({
            display: 'none'
        })
        $("#adding").css({
            display: 'none'
        })
        $("#GetData").on("click",function(){
            $("#addForm").css({
                display: 'none'
            });
            $("#_tbl").css({
                display: 'table'
            });
            $("#adding").css({
                display: 'inline-block'
            });
        });
    })
    function editEmployee(id) { // function for edit employee
        $("#SavingEdit").on("click", function (){
            let newObject = {
                id: id,
                Name: $("#txtEName").val(),
                Age: $("#txtEAge").val(),
                Salary: $("#txtESalary").val()
            }
            if(notEmpty($("#txtEName").val()) && notEmpty($("#txtEAge").val()) 
                && notEmpty($("#txtESalary").val()))
            {
                if(ageValidation($("#txtEAge").val())){
                    $.ajax({
                        url: 'http://localhost:3000/employees/'+id,
                        type: 'put',
                        data: newObject,
                        success: function (res) {
                            console.log("Done")
                            console.log(res);
                            $("#GetData").trigger("click");
                            $("#_tbl").css({
                                display: 'block'
                            });
                            $("#addForm").css({
                                display: 'none'
                            })
                        }
                    }) 
                }
                else{
                    $(".error").text("Age Must Be From 20 to 60");
                }
            }
            else{
                $(".error").text("All Fields Are Required");
            }
        })
    }
    $("#SavingAdd").on("click", function () { // function for add employee
        let newObject = {
            id: $("#txtid").val(),
            Name: $("#txtName").val(),
            Age: $("#txtage").val(),
            Salary: $("#txtsalary").val()
        }
        if(notEmpty($("#txtid").val()) && notEmpty($("#txtName").val()) 
        && notEmpty($("#txtage").val()) && notEmpty($("#txtsalary").val()))
        {
            if(ageValidation($("#txtage").val())){
                $.ajax({
                    url: 'http://localhost:3000/employees',
                    type: 'post',
                    data: newObject,
                    success: function (res) {
                        console.log("Done")
                        console.log(res);
                        $("#GetData").trigger("click");
                        $("#_tbl").css({
                            display: 'block'
                        });
                        $("#addForm").css({
                            display: 'none'
                        })
                    },
                    catch: 
                        $(".error").text("This ID Is Used Please, Enter Another ID")
                    
                })   
            }
            else{
                $(".error").text("Age Must Be From 20 to 60");
            }
        }
        else{
            $(".error").text("All Fields Are Required");
        }
        
       

    })
    function deleteEmployee (id) { // function for delete employee
        $.ajax({
            url: 'http://localhost:3000/employees/' + id,
            type: 'DELETE',
            success: function (re) {
                console.log(re);
            },
            catch: function (Error) {
                console.log(Error)
            }
        })
    }

});//end of page loading