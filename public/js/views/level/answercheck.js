const answerapi = () => {
    var enteredtext = $("#sidinput").val();
    if(enteredtext == "")
      return
    $("#sidcont").hide();
    $.post("/level", {answer: enteredtext})
      .done(function(result)
      {
        console.log(result.msg);
        if(result.msg == "NO")
        {
          alert("Wrong Answer");
        }
        else if(result.msg == "YES")
        {
          location.reload();
        }
      })
      .fail(function(result){
        console.log(result);
      })
      .always(function(){
        $("#sidcont").show();
      });
}

$("#sidinput").keypress(function (e) {
  if (e.which == 13) {
    //- $('form#login').submit();
    answerapi();
    return false; //<---- Add this line
  }
});

$("#sidbtn").click(function() {
    answerapi();
});