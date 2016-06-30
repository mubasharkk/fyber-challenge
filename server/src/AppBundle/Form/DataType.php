<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

use Symfony\Component\Validator\Constraints as Assert;

class DataType extends AbstractType {

  public function buildForm(FormBuilderInterface $builder, array $options) {
	$builder
	  ->add('text', TextType::class)
	  ->add('number', IntegerType::class, array(
		'constraints' => array(
		  new Assert\Regex(array(
			  'pattern' => '/^[0-9]\d*$/',
			  'message' => 'Please use only positive numbers.'
			  )
		  ),
		)		  
	  ));
  }

  public function configureOptions(OptionsResolver $resolver) {
	$resolver->setDefaults(array(
		'data_class' => 'AppBundle\Entity\Data',
//		'validation_groups' => false,
	));
  }
    
  public function getName(){
	return 'data';	
  }

}
