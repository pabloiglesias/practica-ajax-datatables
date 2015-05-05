'use strict';
/////////////////////Preparacion del documento y definicion de variables///////////
 $(document).ready(function () {
       var clinicas;
       var docOriginal;
       var validaciones = $('#formulario').validate({
           rules: {
               nombre: {
                   required: true,
                   lettersonly: true
               },
               numcolegiado: {
                   digits: true
               },
               clinicas: {
                   required: true,
                   minlength: '1'
               }
           }
       });
////////////////////Validacion del Nuevo doctor////////////////////////////////////
function validar(opciones) {
           validaciones.resetForm();
           $('#formulario').show();
           $('#forCrear').modal('hide');
           var doctor = $('#Nombre').val();
           var numcolegiado = $('#Colegiado').val();
           var clinicas = $('#inputClinicas').val();
           // validar datos
           if (opciones == 'nuevo') {
               var php = 'php/nuevo.php';
           } else {
               var php = 'php/modificar_doctor.php';
           }
           var promesa = $.ajax({
               data: {
                   docO: docOriginal,
                   doctor: doctor,
                   numcolegiado: numcolegiado,
                   clinicas: clinicas
               },
               dataType: 'json',
               type: 'POST',
               url: php,
           });
           emergentes(promesa);
       }
// Fin de validarDatos       
////////////////////Ventanas emergentes de coontrol////////////////////////////////
function emergentes(resultado){
resultado.done(function(){
var mensaje = doctor[0]['mensaje'];
               if (doctor[0]['estado'] == 0) {
                   $.growl({
                       message: mensaje,
                       style: 'error',
                       title: 'Error !!!',
                   });
                   clinicas.draw();
               } else {
                   $.growl({
                       style: 'notice',
                       title: 'OK !!!',
                       message: mensaje
                   });
                   clinicas.draw();
               }
           });
           resultado.fail(function () {
               $.growl.error({
                   message: 'Error en la consulta.'
               });
});
}//Fin de emegentes
////////////////////CARGA INICIAL DE LA CLINICAS PARA SU POSTERIOR USO//////////////////
 clinicas = $.ajax({
        
        url: 'php/clinicas.php',
        type: 'GET',
        dataType: 'json'

    })
        .done(function(data) {
            $.each(data, function(index) {
                $('.listaClinicas').append('<option class="option" value="'+data[index].id_clinica+'" >' + data[index].nombre + '</option>');
            });
        })
        .fail(function() {
            console.log('error al cargar la lista de clinicas');
        })
        .always(function() {
            console.log('complete');
        });
/////////////////////carga de los datos de la tabla/////////////////////////////////////////
$(document).ready(function(){
$('#miTabla').DataTable({
    	   'processing': true,
           'serverSide': true,
           'ajax': 'php/cargar.php',           
           'language': {
               'sProcessing': 'Procesando...',
               'sLengthMenu': 'Mostrar _MENU_ registros',
               'sZeroRecords': 'No se encontraron resultados',
               'sEmptyTable': 'Ningún dato disponible en esta tabla',
               'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
               'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
               'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
               'sInfoPostFix': '',
               'sSearch': 'Buscar:',
               'sUrl': '',
               'sInfoThousands': ',',
               'sLoadingRecords': 'Cargando...',
               'oPaginate': {
                   'sFirst': 'Primero',
                   'sLast': 'Último',
                   'sNext': 'Siguiente',
                   'sPrevious': 'Anterior'
               },
               'oAria': {
                   'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                   'sSortDescending': ': Activar para ordenar la columna de manera descendente'
               }
           },
           'columns': [{
               'data': 'nombre_doctor'
           }, {
               'data': 'numcolegiado'
           }, {
               'data': 'nombre_clinica'
           }, {
               'data': 'numcolegiado',
                'render': function(data) {
                   return '<button class="editar btn btn-primary" data-toggle="modal" data-target="#forEditar" >Editar</button>';
               }
           },{
               'data': 'nombre_doctor',
                'render': function(data) {
                   return '<button class="borrar btn btn-warning" data-toggle="modal" data-target="#forBorrar" >Borrar</button>';
               }
           }
       	]
       });
});
////////////// Modal ///////////////////////

///////////// Editar doctor/////////////////
$('#miTabla').on('click', '.editar', function (e) {
           e.preventDefault();
           $('#forEditar').fadeIn('300');

           });
//////////////borrar doctor//////////////////////7
$('#miTabla').on('click','.borrar',function (e){
  e.preventDefault();
  $('#forBorrar').fadeIn('300');
  $('#borrarDoctor').click(function(e){
    e.preventDefault();
    $('#forBorrar').hide();
    var resultado=$.ajax({
        data:{
          doctor:nombre_doctor
        },
        url: 'php/borrar.php',
        type: 'POST',
        dataType: 'json'
    });
    emergentes(resultado);
      
});
});//fin de Borrar
//Metodo para Crear Doctor
$('#nuevoDoctor').click(function(e){
  e.preventDefault();
  $('#forCrear').fadeIn('300');
  $('#confimarCrear').click(function(e){
    e.preventDefault();
    if (validaciones.form()){
      validar('nuevo');
    }

  });

});//fin de Nuevo Doctor
});