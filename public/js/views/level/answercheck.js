const answerapi = () => {
    var enteredtext = $("#sidinput").val();
    if(enteredtext == "")
      return
    $("#sidcont").hide();
    $("#myquestionspinner").show();
    $.post("/level", {answer: enteredtext})
      .done(function(result)
      {
        console.log(result.msg);
        if(result.msg == "NO")
        {
          // alert("Wrong Answer");
          $("#wrongpanelmodal").slideDown();
          
        }
        else if(result.msg == "YES")
        {
          $("#rightpanelmodal").slideDown();
        }
      })
      .fail(function(result){
        console.log(result);
      })
      .always(function(){
        $("#sidcont").show();
        $("#myquestionspinner").hide();
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

$(document).ready(function() {
  setTimeout(function() {
    // $("#signInButton").trigger('click');
    $("#mygamespinner").hide();
    $("#mygamecomponents").slideDown();
  }, 1000);
});
