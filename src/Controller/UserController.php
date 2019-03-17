<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
  /**
   * @Route("/user/list", name="user_list")
   */
  public function user_list(Request $request)
  {
    $users = $this->getDoctrine()
           ->getRepository(User::class)
           ->findAll();
    if (!$users) {
        throw $this->createNotFoundException(
            'No sequence found for  '
        );
    }
    else {
      $users_online = [];
      foreach ($users as $u) {
          array_push($users_online, array('username' => $u->getUsername(),
                                          'email' => $u->getEmail(),
                                        )
          );
      }
    }

    return $this->render('user/list.html.twig',
    array(
          'users' =>  $users_online)
    );
  }


  /**
   * @Route("/user/addinfo", name="user_addinfo")
   */
  public function user_addinfo(Request $request)
  {

    return $this->render('user/addinfo.html.twig',
    array(
          'users' =>  'addinfo')
    );
  }





}
