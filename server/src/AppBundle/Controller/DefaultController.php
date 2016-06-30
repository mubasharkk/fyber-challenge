<?php

namespace AppBundle\Controller;

use AppBundle\Form\DataType;
use AppBundle\Entity\Data;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller {

  /**
   * @Route("/", name="homepage")
   */
  public function indexAction(Request $request) {
	// replace this example code with whatever you need
	return $this->render('default/index.html.twig', [
				'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..'),
	]);
  }

  /**
   * @Route("/data", name="data_submit")
   */
  public function dataAction(Request $request) {
	
	// build form
	$data = new Data();	
	$form = $this->createForm(DataType::class, $data);
	
	//handle submit
	$form->handleRequest($request);
	
	if($form->isSubmitted() && $form->isValid()){
	  
	  return $this->redirectToRoute('/');
	}
	
	
	return $this->render(
	  'data/dataform.html.twig',
	  array('form' => $form->createView())
	);	
  }

}
