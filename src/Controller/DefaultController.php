<?php

namespace App\Controller;

use App\Entity\Region;
use App\Entity\User;
use App\Entity\DataBank;
use App\Entity\UserInfo;
use App\Form\RegionType;
use App\Form\DataBankFormType;
use App\Form\UserInfoType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{



        /**
         * @Route("/", name="index")
         */
        public function index()
        {
            return $this->render('main/index.html.twig', [
                'controller_name' => 'MainController',
            ]);
        }

    /**
     * @Route("/add_user_info", name="userInfoAction")
     */
    public function userInfoAction(Request $request)
    {
          // 1) build the form
           $userInfo = new UserInfo();
           $form = $this->createForm(UserInfoType::class, $userInfo);

           // get logged user
            $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
            $user = $this->getUser();

           // 2) handle the submit (will only happen on POST)
           $form->handleRequest($request);
           if ($form->isSubmitted() && $form->isValid()) {

           // 3) Encode the password (you could also do this via Doctrine listener)
           $userInfo->setUser($user);

           $em = $this->getDoctrine()->getManager();

           $em->persist($userInfo);
           $em->flush();
           $this->addFlash('success','Votre profile a été créer avec succée.');

           return $this->redirectToRoute('login');
         }

       return $this->render(
           'form/userinfo.html.twig',
           array('form_userInfo' => $form->createView())
       );
    }


}
