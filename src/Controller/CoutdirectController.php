<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CoutdirectController extends AbstractController
{
    /**
     * @Route("/coutdirect", name="coutdirect")
     */
    public function index()
    {
        return $this->render('coutdirect/index.html.twig', [
            'controller_name' => 'CoutdirectController',
        ]);
    }
}
