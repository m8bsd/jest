
/* The code you provided is written in JavaScript and it is used to validate a phone number input field
in a contact form. */
<script>
jQuery(document).ready(function($) {
    // Inputmask for phone number, changle #phone to the ID of your input field
    $('#phone').inputmask('+56999999999', {
        'placeholder': '+56999999999',
        'clearMaskOnLostFocus': true
    });
});
</script>
<script>
document.addEventListener( 'wpcf7submit', function( event ) {
    if ( '1' == event.detail.contactFormId ) { // Cambia '1' por el ID de tu formulario, para multaschilecompra landing, el predeterminado es el 1
        var phoneNumber = document.querySelector( 'input[name="phone"]' ).value;
        var chileanPhoneNumberPattern = /^[+]?[56]?[9]{1}[0-9]{8}$/; // Patrón para números de teléfono chilenos
        if ( !chileanPhoneNumberPattern.test( phoneNumber ) ) {
            alert( 'Por favor, introduce un número de teléfono chileno válido.' );
            event.preventDefault();
        }
    }
}, false );
</script>