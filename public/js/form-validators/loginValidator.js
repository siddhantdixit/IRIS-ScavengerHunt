
function LoginValidator()
{
// bind a simple alert window to this controller to display any errors //
	// this.loginErrors = $('.modal-alert');
	this.loginErrors = $("#wrongpopup");
	
	this.showLoginError = function(t, m)
	{
		// $('.modal-alert .modal-header h4').text(t);
		// $('.modal-alert .modal-body').html(m);
		$('#modal-title').text(t);
		$('#modal-content').html(m);
		// this.loginErrors.modal('show');
		this.loginErrors.slideDown();
	}
}

LoginValidator.prototype.validateForm = function()
{
	if ($('#user-tf').val() == ''){
		this.showLoginError('Whoops!', 'Please enter a valid username');
		return false;
	}	else if ($('#pass-tf').val() == ''){
		this.showLoginError('Whoops!', 'Please enter a valid password');
		return false;
	}	else{
		return true;
	}
}