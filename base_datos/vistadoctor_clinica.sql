
/* Une las tablas doctores, clinicas y la relación clinica_doctor.
las agrupa por doctor.
Usa la función groun_concat para sacar todos las clinicas del doctor
*/
create or replace view vdoctoresclinicas as
select  d.nombre nombre_doctor , d.numcolegiado, 
replace(GROUP_CONCAT(concat('<li>', c.nombre, '</li>')),',',' ') nombre_clinica from clinica_doctor cd, clinicas c , doctores d
where cd.id_clinica = c.id_clinica and cd.id_doctor = d.id_doctor 
group by cd.id_doctor, d.nombre  , d.numcolegiado

