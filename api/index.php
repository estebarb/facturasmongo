<?php

require_once __DIR__.'/vendor/autoload.php';
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

$app = new Silex\Application();

$m = new MongoClient();
$db = $m->MongoFacturas;
$FacturasDB = $db->facturas;

// Obtiene los datos de una factura:
$app->get('/bill/{id}', function($id) use ($app, $FacturasDB){
	$data = $FacturasDB->findOne(array('_id'=>new MongoId($id)));
	return new Response(json_encode($data),
		200,
		array('Content-Type' => 'application/json'));
});

// Modifica los datos de una factura (básicamente agrega pagos)
$app->put('/bill/{id}', function($id) use ($app){
	$data = array($id => "soy una factura");
	return new Response(json_encode($data),
		200,
		array('Content-Type' => 'application/json'));
});

// Anula una factura (no la borra):
$app->delete('/bill/{id}', function($id) use ($app, $FacturasDB){
	$anulacion = array('$set' => array("anulada"=>true));
	$FacturasDB->update(array('_id'=> new MongoId($id)), $anulacion);
	return new Response('Factura anulada',
		200,
		array('Content-Type' => 'application/json'));
});

// Retorna todas las facturas
$app->get('/bill', function(Request $request) use ($app, $FacturasDB){
	$data = array();
	$cursor = $FacturasDB->find();
	foreach($cursor as $doc){
		$data[] = $doc;
	}
	return new Response(json_encode($data),
		200,
		array('Content-Type' => 'application/json'));
});
// Inserta una nueva factura
$app->post('/bill', function(Request $request) use ($app, $FacturasDB){
	$data = json_decode($request->getContent(), true); 
	if(!$data){
		return new Response("Faltan parámetros o son incorrectos", 400);
	}
	$FacturasDB->insert($data);
	return new Response('Factura agregada', 200);
});

$app->get('/', function() use($app) {
	    return 'API de Facturas MongoDB';
});

$app->run();

