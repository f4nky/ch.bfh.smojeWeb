jQuery(document).ready(function($) {
	$.validator.setDefaults({
		submitHandler: function(form) {
			$.ajax({
				type: "POST",
				url: "email.php",
				data: {'val': $("#contact-form").serializeJSON()}
			}).done(function(data) {
				alert(data);
			});
		}
	});
});

jQuery('#contact-form').validate({
	rules: {
		name: 'required',
		email: {required: true, email: true},
		subject: 'required',
		message: 'required'
	},
	messages: {
		required: "Dieses Feld muss ausgefüllt sein.",
		email: {
			required: "Bitte eine E-Mail-Adresse eingeben.",
			email: "Bitte gültige E-Mail-Adresse eingeben."
		},
		subject: "Bitte einen Betreff eingeben.",
		message: "Bitte eine Nachricht eingeben."
	},
	errorClass: 'error',
	highlight: function(label) {
		$(label).closest('.form-group').removeClass('has-success').addClass('has-error');
	},
	success: function(label) {
		$(label).text('Eingabe gültig.').addClass('valid');
		$(label).closest('.form-group').removeClass('has-error').addClass('has-success');
	}
});