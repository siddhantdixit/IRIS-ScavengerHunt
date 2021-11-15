
$(document).ready(function(){

	var lv = new LoginValidator();
	var lc = new LoginController();

// main login form //

	$('#login').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	else{
				$("#mygamespinner").fadeIn("fast");
				$("#myloginpanel").fadeOut("fase");
			// append 'remember-me' option to formData to write local cookie //
				// formData.push({name:'remember-me', value:$('#btn_remember').is(":checked")});
				if(formData.length == 3)
				{
					formData.pop();
				}
				formData.push({name:'remember-me', value:$('#btn_remember').is(":checked")});
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			// $("#myloginpanel").slideUp();
			// $("#mygamespinner").slideDown();
			if (status == 'success') window.location.href = '/level';
		},
		error : function(e){
			$("#mygamespinner").fadeOut("fast");
			$("#myloginpanel").fadeIn("fast");

			$("#user-tf").blur();
			$("#pass-tf").blur();
			// $("input:text:visible:second").blur();
			lv.showLoginError('Login Failure', 'Please check your username and/or password');
		}
	});

	$("input:text:visible:first").focus();
	// $('#btn_remember').click(function(){
	// 	var span = $(this).find('span');
	// 	if (span.hasClass('fa-minus-square')){
	// 		span.removeClass('fa-minus-square');
	// 		span.addClass('fa-check-square');
	// 	}	else{
	// 		span.addClass('fa-minus-square');
	// 		span.removeClass('fa-check-square');
	// 	}
	// });

// login retrieval form via email //

	var ev = new EmailValidator();

	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("Please enter a valid email address");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			$('#cancel').html('OK');
			$('#retrieve-password-submit').hide();
			ev.showEmailSuccess("A link to reset your password was emailed to you.");
		},
		error : function(e){
			if (e.responseText == 'account not found'){
				ev.showEmailAlert("Email not found. Are you sure you entered it correctly?");
			}	else{
				$('#cancel').html('OK');
				$('#retrieve-password-submit').hide();
				ev.showEmailAlert("Sorry. There was a problem, please try again later.");
			}
		}
	});

});
