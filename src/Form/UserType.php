<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', TextType::class, array(
                  'label' => false,
                  'attr' => array('class'=>'form-control  sr','placeholder'=>'Nom d\'utilisateur')
              ))
            ->add('email', TextType::class, array(
                  'label' => false,
                  'attr' => array('class'=>'form-control  sr','placeholder'=>'Email')
              ))
              ->add('plainPassword', RepeatedType::class, array(
                 'type' => PasswordType::class,
                 'first_options'  => array('label' => false,'attr' => array('class'=>'form-control sr','placeholder'=>'Mot de passe')),
                 'second_options' => array('label' => false,'attr' => array('class'=>'form-control sr','placeholder'=>'Répeter Mot de passe')),
             ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
