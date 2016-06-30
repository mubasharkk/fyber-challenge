<?php

namespace AppBundle\Controller;

use AppBundle\Form\DataType;
use AppBundle\Entity\Data;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class DefaultController extends Controller {

  /**
   * @Route("/", name="homepage")
   */
  public function indexAction(Request $request) {
	
	
	$em = $this->getDoctrine()->getManager(); //get the database manager

	$allData = $em->getRepository('AppBundle:Data')->findAll(); // get the profiles
	
	// build form
	$data = new Data();	
	$form = $this->createForm(DataType::class, $data);
	
	$form->add('submit', SubmitType::class, array(
	  'label' => 'Add Row',
	  'attr'  => array('class' => 'btn btn-primary')
	));
	
	//handle submit
	$form->handleRequest($request);
		
	if($form->isSubmitted() && $form->isValid()){
	  	  
	  $em->persist($data);
	  $em->flush();
	  
	  return $this->redirectToRoute('homepage');
	}
	
	
	return $this->render(
	  'data/dataform.html.twig',
	  array('form' => $form->createView(), 'allData' => $allData)
	);	
  }

}
