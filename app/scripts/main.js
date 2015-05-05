'use strict';
/////////////////////Preparacion del documento y definicion de variables///////////
 $(document).ready(function () {
       var clinicas;
       var miTabla;
       var docOriginal;
       var php;
       var validaciones = $('#formulario').validate({
           rules: {
               nombre: {
                   required: true,
                   lettersonlywithspaces: true
               },
               numcolegiado: {
                   digits: true
               },
               clinicas: {
                   required: true,
                   minlength: '1'
               }
           },
           messages:{
                nombre:{
                  required: 'Debes introducir el nombre del doctor',
                  lettersonlywithspaces: 'Introduce solo caracteres'
                },
                colegiado:{
                  digits: 'Introduce solo digitos'
                },
                clinica:{
                  required: 'Debes marcar al menos una clinica'
                }
              },
              submitHandler:function(){}
       });
////////////////////Validacion del Nuevo doctor////////////////////////////////////
function validar(opciones) {
           validaciones.resetForm();
           $('#formulario').show();
           $('#forCrear').fadeout('hide');
           var doctor = $('#Nombre').val();
           var numcolegiado = $('#Colegiado').val();
           var clinicas = $('#inputClinicas').val();
           // validar datos
           if (opciones == 'nuevo') {
                php = 'php/nuevo.php';
           } else {
                php = 'php/modificar_doctor.php';
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
       }// Fin de validar       
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
                $('.listaClinicas').append('<option class="option" value="'+data[index].idclinica+'" >' + data[index].nombre + '</option>');
            });
        })
        .fail(function() {
            console.log('error al cargar la lista de clinicas');
        })
        .always(function() {
            console.log('complete');
        });
/////////////////////carga de los datos de la tabla/////////////////////////////////////////
  miTabla=$('#miTabla').DataTable({
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
           'columns': 
           [
           {
              'data': 'nombre_doctor',
              'render':function(data){
                return '<a href="#" data-toggle="modal" data-target="#forEditar" class="editar" >'+ data +'</a>';
               }
           }, 
           {
              'data': 'numcolegiado'
           },
           {
              'data': 'nombre_clinica'
           },
           {
              'data': 'numcolegiado',
               'render': function(data) {
                   return '<button class="editar btn btn-primary" data-toggle="modal" data-target="#forEditar" >Editar</button>';
               }
           },
           {
              'data': 'nombre_doctor',
               'render': function(data) {
                   return '<button class="borrar btn btn-warning" data-toggle="modal" data-target="#forBorrar" >Borrar</button>';
               }
           }
           ]
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
  $('#forBorrar').fadeIn('1000');
  var nRow = $(this).parents('tr')[0];
      var aData = miTabla.row(nRow).data();
      var nombredoctor = aData.nombre;
  $('#borrarDoctor').click(function(e){
    e.preventDefault();
    $('#forBorrar').modal('hide');
    var resultado=$.ajax({
        data:{
          doctor:nombredoctor
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