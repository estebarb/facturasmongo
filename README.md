Sistema de Facturas con MongoDB y PHP
=====================================

En este proyecto se implementó un sistema muy simple para
manejar facturas. Este fue implementado utilizando las 
siguientes herramientas
* MongoDB
* PHP
* HTML
* Javascript
* CSS
Para hacer la parte en el cliente se utilizaron los frameworks
_Angular.js_ y _Twitter Bootstrap_. Para hacer la parte en el
servidor se utilizó el framework _Silex_ y la extensión _MongoClient_.

¿Cómo funciona?
---------------
El sistema está compuesto por páginas estáticas en HTML, que mediante
Javascript llaman a la API del sitio, que está implementada en PHP.

El API tiene un diseño REST, y contiene los siguientes comandos:
<table>
<tr><th>Verbo</th><th>Path</th><th>Descripción</th></tr>
<tr><td>GET</td><td>/api/bill/{id}	</td><td>Obtiene la información de una factura en específico</td></tr>
<tr><td>PUT	</td><td>/api/bill/{id}	</td><td>Recibe un JSON ({"fecha":"...", "pago": 34}) con la información de un pago y la inserta en la factura</td></tr>
<tr><td>DELETE</td><td>/api/bill/{id}</td><td>	Anula una factura</td></tr>
<tr><td>GET</td><td>/api/bill</td><td>	Obtiene información de todas las facturas</td></tr>
<tr><td>POST</td><td>/api/bill</td><td>	Crea una nueva factura con los datos brindados en POST</td></tr>
</table>
Esta API es llamanda con Javascript, utilizando las facilidades que ofrece
_Angular.js_.

Las llamadas a la API se realizan desde 
