/**
 * The function enqueue_inputmask is used to validate phone numbers in contact forms by adding the
 * inputmask script to the WordPress website.
 */
<?php

//funcion para validar el numero de telefono en formularios de contacto
function enqueue_inputmask() {
    wp_enqueue_script('inputmask', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.6/jquery.inputmask.min.js', array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_inputmask');
// fin
?>