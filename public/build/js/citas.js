let paso=1,entroPaso2=!1;const cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),btnPaginador(),btnPaginadorEnvent(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora()}function mostarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void alerta(e,"Falta completar datos","arriba");const{nombre:t,fecha:a,hora:o,servicios:n}=cita,c=document.createElement("H3");c.textContent="Resumen de servicios",e.appendChild(c),n.forEach(t=>{const{id:a,nombre:o,precio:n}=t,c=document.createElement("DIV");c.classList.add("contendor-servicio");const r=document.createElement("P");r.textContent=o;const s=document.createElement("P");s.innerHTML="<span>Precio: </span>$"+n,c.appendChild(r),c.appendChild(s),e.appendChild(c)});const r=document.createElement("P");r.innerHTML="<span>Nombre:</span> "+t;const s=new Date(a),i=s.getMonth(),l=s.getDate()+2,d=s.getFullYear(),u=new Date(Date.UTC(d,i,l)).toLocaleDateString("es-AR",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),m=document.createElement("P");m.innerHTML="<span>Fecha:</span> "+u;const p=document.createElement("P");p.innerHTML="<span>Hora:</span> "+o;const h=document.createElement("H3");h.textContent="Resumen de la cita",e.appendChild(h),e.appendChild(r),e.appendChild(m),e.appendChild(p);const v=document.createElement("BUTTON");v.classList.add("btn"),v.classList.add("reserva"),v.textContent="Reservar Cita",v.onclick=reservarCita,e.appendChild(v)}async function reservarCita(){const{id:e,nombre:t,fecha:a,hora:o,servicios:n}=cita,c=n.map(e=>e.id),r=new FormData;r.append("fecha",a),r.append("hora",o),r.append("usuarioId",e),r.append("servicios",c);try{const e="http://localhost:3000/api/citas",t=await fetch(e,{method:"POST",body:r});(await t.json()).resultado&&Swal.fire({icon:"success",title:"Cita creada",text:"Tu cita fue creada correctamente",button:"OK"}).then(()=>{window.location.reload()})}catch(e){Swal.fire({icon:"error",title:":(",text:"Hubo un error al guardar la cita",button:"OK"}).then(()=>{window.location.reload()})}}function btnPaginadorEnvent(){const e=document.querySelector("#siguiente"),t=document.querySelector("#anterior");e.addEventListener("click",sumarPaso),t.addEventListener("click",restarPaso)}function sumarPaso(){paso<3&&(paso++,mostrarSeccion())}function restarPaso(){paso>1&&(paso--,mostrarSeccion())}function comprobarFormularioVacio(){if(entroPaso2){const e=document.querySelector("#hora"),t=document.querySelector("#fecha");let a=!1;""===e.value&&(alerta(e,"Agrege hora"),a=!0),""===t.value&&(alerta(t,"Agrege fecha"),a=!0)}2===paso&&(entroPaso2=!0)}function btnPaginador(){const e=document.querySelector("#siguiente"),t=document.querySelector("#anterior");1==paso?(t.classList.add("ocultar"),e.classList.remove("ocultar")):3==paso?(e.classList.add("ocultar"),t.classList.remove("ocultar")):(e.classList.remove("ocultar"),t.classList.remove("ocultar"))}function mostrarSeccion(){comprobarSeleccionServicios(),comprobarFormularioVacio(),3===paso&&mostarResumen();const e=document.querySelector(".contenedor-secciones");let t=-100/3*(paso-1);e.style.transform=`translateX(${t}%)`,ajustarAlturaSeccion();const a=document.querySelector(".actual");a&&a.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual"),btnPaginador()}function comprobarSeleccionServicios(){if(0===cita.servicios.length&&1!==paso){document.querySelector(".info-paso-1 p").classList.add("alerta")}}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",e=>{paso=parseInt(e.target.dataset.paso),mostrarSeccion()})})}async function consultarAPI(){try{const e="http://localhost:3000/api/servicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){const t=document.querySelector("#servicios");e.forEach(e=>{const{id:a,nombre:o,precio:n}=e,c=document.createElement("P");c.classList.add("nombre-servicio"),c.textContent=o;const r=document.createElement("P");r.classList.add("precio-servicio"),r.textContent="$ "+n;const s=document.createElement("DIV");s.classList.add("servicio"),s.dataset.idServicio=a,s.onclick=function(){seleccionarServicio(e);document.querySelector(".info-paso-1 p").classList.remove("alerta")},s.appendChild(c),s.appendChild(r),t.appendChild(s)}),mostrarSeccion()}function seleccionarServicio(e){const{id:t}=e,{servicios:a}=cita,o=document.querySelector(`[data-id-servicio="${t}"]`);a.some(e=>e.id===t)?(cita.servicios=a.filter(e=>e.id!==t),o.classList.remove("seleccionado")):(cita.servicios=[...a,e],o.classList.add("seleccionado"))}function idCliente(){cita.id=document.querySelector("#id").value}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarHora(){const e=document.querySelector("#hora");e.addEventListener("input",t=>{cita.hora="";const a=t.target.value,o=a.split(":")[0];o<10||o>18?(removeAlerta(e),alerta(e,"No atendemos en ese horario")):(removeAlerta(e),cita.hora=a)})}function seleccionarFecha(){const e=document.querySelector("#fecha");e.addEventListener("input",t=>{cita.fecha="";let a=new Date(t.target.value+"T00:00:00");const o=new Date;o.setHours(0,0,0,0),a<=o?(removeAlerta(e),alerta(e,"Invalid Day")):(removeAlerta(e),a=a.getUTCDay(),[6,0].includes(a)?alerta(e,"No abrimos sabados y domingos"):(removeAlerta(e),cita.fecha=t.target.value))})}function removeAlerta(e){const t=e.parentElement;if(!t.lastElementChild.classList.contains("alerta"))return;e.classList.remove("bordeAlerta");t.lastElementChild.remove(),ajustarAlturaSeccion()}function alerta(e,t,a){if("arriba"===a){const a=document.createElement("P");a.textContent=t,a.classList.add("alerta"),a.classList.add("error"),e.appendChild(a)}else{const a=e.parentElement;if(a.lastElementChild.classList.contains("alerta"))return;const o=document.createElement("LABEL");o.textContent=t,a.appendChild(o),o.classList.add("alerta"),e.classList.add("bordeAlerta")}ajustarAlturaSeccion()}function ajustarAlturaSeccion(){const e=document.querySelector(".contenedor-secciones"),t=document.querySelector("#paso-"+paso);e.style.height=getComputedStyle(t).height}document.addEventListener("DOMContentLoaded",(function(){iniciarApp(),window.addEventListener("resize",()=>{mostrarSeccion()})}));