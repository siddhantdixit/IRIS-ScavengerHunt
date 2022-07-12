
function LoginValidator()
{
// bind a simple alert window to this controller to display any errors //
	// this.loginErrors = $('.modal-alert');
	this.loginErrors = $("#wrongpopup");
	
	this.showLoginError = function(t, m,infochecked=false)
	{
		// $('.modal-alert .modal-header h4').text(t);
		// $('.modal-alert .modal-body').html(m);
		$('#modal-title').text(t);
		$('#modal-content').html(m);

		if(infochecked)
		{
			$("#resendMailBtn").show();
			$("#icondiv").attr('class', "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10");
			$('#icondiv').html(
				`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>`
			);
		}
		else
		{
			$("#resendMailBtn").hide();
			$("#icondiv").attr('class', "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10");
			$('#icondiv').html(
			`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
		</svg>`
			);
		}
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