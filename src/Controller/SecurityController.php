<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\JsonResponse;


class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('pages/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }


    /**
     * @Route("/logout", name="logout")
     */
    public function logout(Session $session)
    {
      // return $this->render('security/login.html.twig');
   }




    /**
     * @Route("/register", name="register")
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
          // 1) build the form
           $user = new User();
           $form = $this->createForm(UserType::class, $user);

           // 2) handle the submit (will only happen on POST)
           $form->handleRequest($request);
           if ($form->isSubmitted() && $form->isValid()) {

           // 3) Encode the password (you could also do this via Doctrine listener)
           $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
           $user->setPassword($password);

           $em = $this->getDoctrine()->getManager();

           $em->persist($user);
           $em->flush();
           $this->addFlash('success','Votre profile a été créer avec succée.');

           return $this->redirectToRoute('main');
         }

       return $this->render(
           'pages/register.html.twig',
           array('form' => $form->createView())
       );

    }


    /**
     * @Route("/GetRegister", name="getregister")
     */
    public function getregister(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
          // 1) build the form
           $user = new User();
           $form = $this->createForm(UserType::class, $user);
           $form->handleRequest($request);


           if ( $form->isSubmitted() ) {
           // 3) Encode the password (you could also do this via Doctrine listener)
           $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
           $user->setPassword($password);

           $em = $this->getDoctrine()->getManager();

           $em->persist($user);
           $em->flush();
           $this->addFlash('success','Votre profile a été créer avec succée.');

           return $this->json(array('state' => $user->getUsername()));
           }

           return $this->json(array('state' => 'no'));


    }


    /**
     * @Route("/loginregister", name="loginregister")
     */
    public function loginregister()
    {
        return $this->render('pages/login_register.html.twig', [
            'controller_name' => 'ReactController',
        ]);
    }

}
