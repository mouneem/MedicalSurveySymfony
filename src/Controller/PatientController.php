<?php

namespace App\Controller;
use App\Entity\Question;
use App\Entity\Biotehrapie;
use App\Entity\Patient;
use App\Entity\Survey;
use App\Entity\Ains;
use App\Entity\Dmards;
use App\Entity\Effet;
use App\Entity\QuestionOption;
use App\Entity\QuestionAnswer;
use App\Entity\InfoAnswer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class PatientController extends AbstractController
{
    /**
     * @Route("/patient", name="patient")
     */
    public function index()
    {
      $patients = $this->getDoctrine()
             ->getRepository(Patient::class)
             ->findAll();
      if (!$patients) {
        return $this->render('patient/add.html.twig');
      }
      else {
        $patient_list = [];
        foreach ($patients as $p) {
            array_push($patient_list, array(
                                       'id' => $p->getId(),
                                       'Nom' => $p->getNom(),
                                       'Prenom' => $p->getPrenom(),
                                       'Email' => $p->getEmail(),
                                       'Numerotel' => $p->getNumerotel(),
                                       'Adress' => $p->getAdress(),
                                       'AddBy' => $p->getAddBy(),
                                       'AddDate' => $p->getAddDate()
                                          )
            );
        }

        return $this->render('patient/index.html.twig', [
            'Patients' => $patient_list,'Patients_list' => $patients, 'controller_name' => "Hello ;) !"
        ]);
      }
    }


    /**
     * @Route("/patient/add", name="add")
     */
    public function addPatient()
    {
      $patients = $this->getDoctrine()
             ->getRepository(Patient::class)
             ->findAll();


        $patient_list = [];
        return $this->render('patient/add.html.twig', [
            'Patients' => $patients, 'controller_name' => "add ;) !"
        ]);
    }



    /**
     * @Route("/add/info/patient", name="addinfo")
     */
    public function addinfo()
    {

        $em = $this->getDoctrine()->getManager();

        $patient_id = $_POST['pat_id'];

        if(!$patient_id)
        {
            throw $this->createNotFoundException('No ID found');
        }

        $pt = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($patient_id);


        $Questions = $this->getDoctrine()->getRepository(Question::class)->findBy(['aboutPatient' => '1']);

        $answers = $this->getDoctrine()->getRepository(InfoAnswer::class)->findBy(['patient' => $patient_id]);
        $done_questions = [];
        foreach ($answers as $ans) {
          array_push($done_questions,$ans->getQuestion());
        }

        $Valid_Questions = [];
        foreach ($Questions as $element) {
          if (!in_array($element,$done_questions )) {
            array_push($Valid_Questions,$element);
          }
        }


        return $this->render('patient/addinformation.html.twig', [
            'Questions' => $Valid_Questions, 'patient' => $pt, 'controller_name' => "add ;) !"
        ]);
    }


    /**
     * @Route("/patient/display", name="patientDisplay")
     */
    public function patientDisplay()
    {

        $patient_id = $_POST['pat_id'];

        $em = $this->getDoctrine()->getManager();

        if(!$patient_id)
        {
            throw $this->createNotFoundException('No ID found');
        }

        $pt = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($patient_id);
        $sr = $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->findAll();

        $qst_done = $this->getDoctrine()->getEntityManager()->getRepository(QuestionAnswer::class)->findBy(['patient'=>$patient_id]);

        $sus = [];
        $surv_done = [];
        foreach ($qst_done as $qq) {
          array_push($sus,$qq->getSurvey());
        }

        foreach ($sus as $value) {
          if (!in_array($value,$surv_done)) {
            array_push($surv_done,$value);
          }
        }


        // $surv_done = array_unique($qst_done);
        $surv_not_done = [];
        foreach ($sr as $s){
          if (!in_array($s, $surv_done)) {
            array_push($surv_not_done, $s);
          }
        }

        $not_done = [];
        foreach ($surv_not_done as $k) {
          if (!in_array($k,$not_done)) {
            array_push($not_done,$k);
          }
        }


        // Calcul
        $answers = $this->getDoctrine()->getEntityManager()->getRepository(QuestionAnswer::class)->findBy(['patient'=>$patient_id,'survey'=>8]);
        $Nbr_rhumatologue = 0 ;
        $Prx_rhumatologue = 0 ;
        $Nbr_intrn = 0 ;
        $Prx_intrn = 0 ;
        $Nbr_intrn = 0 ;
        $Prx_intrn = 0 ;
        $Nbr_generaliste = 0 ;
        $Prx_generaliste = 0 ;
        $Rmbrs1 = 0 ;
        $Cout_paye = 0 ;
        $Cout_paye_autre = 0 ;
        $type = '' ;
        $Nbr_rhumatologue_plc = 0 ;
        $Nbr_prf_plc = 0 ;
        $Nbr_gnrl_plc = 0 ;
        $Nbr_psy_plc = 0 ;
        $Nbr_jr_hosp = 0;
        $Nbr_nuit_hosp = 0;
        $pr_srlg = 0;
        $cout_dplc = 0;
        $prx_jr = 0;
        $n_jr = 0;
        $prx_nuit = 0;
        $n_nuit = 0;

      $nb_main=0;
      $Main_fx=0;
      $nb_pied=0;
      $Pied_fx=0;
      $nb_hanche=0;
      $Hanche_fx=0;
      $nb_rachis=0;
      $Rachis_fx=0;
      $nb_epaule=0;
      $Epaule_fx=0;
      $nb_thorax=0;
      $Thorax_fx=0;
      $nb_dmo=0;
      $DMO_fx=0;
      $nb_autre=0;
      $prix_autre=0;
      $nbr_main=0;
      $prix_main=0;
      $nbr_pied=0;
      $prix_pied=0;
      $nbr_hanche=0;
      $prix_hanche=0;
      $nbr_rachis=0;
      $prix_rachis=0;
      $nbr_epaul=0;
      $prix_epaul=0;
      $nbr_thorax=0;
      $prix_thorax=0;
      $nbr_dmo=0;
      $prix_dmo=0;
      $nbr_autre=0;
      $prix_autre=0;
      $prix_dplcmt=0;

      $nb_vs=0;
$nb_crp=0;
$nb_nfs=0;
$nb_sha=0;
$prr_sha=0;
$nb_shb=0;
$prr_shb=0;
$nb_shc=0;
$prr_shc=0;
$nb_vih=0;
$prr_vih=0;
$nb_idr=0;
$prr_idr=0;
$nb_Quantifierons=0;
$prr_Quantifierons=0;
$nb_bk=0;
$prr_bk=0;
$nb_sys=0;
$prr_sys=0;
$nb_othr=0;
$prr_othr=0;
$nb_prv_vs=0;
$nb_prv_nfs=0;
$nb_prv_shb=0;
$prr_shb=0;
$nb_prv_vih=0;
$prr_vih=0;
$nb_prv_sys=0;
$prr_sys=0;




        foreach ($answers as $answer) {
          // calcule
          if ($answer->getId()== 247) {
            $Nbr_rhumatologue = (int)$answer->getAnswer();
          }
          if ($answer->getId()== 248) {
            $Prx_rhumatologue = (int)$answer->getAnswer();
          }
          if ($answer->getId()== 249) {
            $Nbr_intrn = (int)$answer->getAnswer();
          }
          if ($answer->getId()== 250) {
            $Prx_intrn = (int)$answer->getAnswer();
          }

          if ($answer->getId()== 251) {
            $Nbr_generaliste = (int)$answer->getAnswer();
          }
          if ($answer->getId()== 252) {
            $Prx_generaliste = (int)$answer->getAnswer();
          }


          if ($answer->getId()== 255) {
            $Cout_paye = (int)$answer->getAnswer();
          }
          if ($answer->getId()== 256) {
            $Cout_paye_autre = (int)$answer->getAnswer();
          }
          if ($answer->getId()== 258) {
            $type = (int)$answer->getAnswer();
          }


          if ($answer->getId()== 259) {
            $Nbr_rhumatologue_plc = (int)$answer->getAnswer();
          }
          if ($answer->getId()== 260) {
            $Nbr_prf_plc = (int)$answer->getAnswer();
          }
          if ($answer->getId()== 261) {
            $Nbr_gnrl_plc = (int)$answer->getAnswer();
          }
          if ($answer->getId()== 262) {
            $Nbr_psy_plc = (int)$answer->getAnswer();
          }

          // Hospitalisation
            // Public
            if ($answer->getId()== 266) {
              $Nbr_jr_hosp = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 267) {
              $Nbr_nuit_hosp = (int)$answer->getAnswer();
            }

          // Hospitalisation
            // privée
            if ($answer->getId()== 268) {
              $pr_srlg = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 269) {
              $cout_dplc = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 270) {
              $prx_jr = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 271) {
              $n_jr = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 272) {
              $prx_nuit = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 273) {
              $n_nuit = (int)$answer->getAnswer();
            }

            // Radiology
              // pbl
            if ($answer->getId()== 279) {
              $nb_main = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 280) {
              $nb_pied = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 281) {
              $nb_hanche = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 282) {
              $nb_rachis = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 283) {
              $nb_epaule = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 284) {
              $nb_thorax = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 285) {
              $nb_dmo = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 286) {
              $nb_autre = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 289) {
              $prix_autre = (int)$answer->getAnswer();
            }

            // priv
            if ($answer->getId()== 291) {
              $nbr_main = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 292) {
              $prix_main = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 293) {
              $nbr_pied = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 294) {
              $prix_pied = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 295) {
              $nbr_hanche = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 296) {
              $prix_hanche = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 297) {
              $nbr_rachis = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 298) {
              $prix_rachis = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 299) {
              $nbr_epaul = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 300) {
              $prix_epaul = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 301) {
              $nbr_thorax = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 302) {
              $prix_thorax = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 303) {
              $nbr_dmo = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 304) {
              $prix_dmo = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 305) {
              $nbr_autre = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 308) {
              $prix_autre = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 308) {
              $prix_dplcmt = (int)$answer->getAnswer();
            }

          // biologique
            // public
            if ($answer->getId()== 315) {
              $nb_vs = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 316) {
              $nb_crp = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 317) {
              $nb_nfs = (int)$answer->getAnswer();
            }

            if ($answer->getId()== 319) {
              $nb_sha = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 320) {
              $prr_sha = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 322) {
              $nb_shb = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 323) {
              $prr_shb = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 325) {
              $nb_shc = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 326) {
              $prr_shc = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 328) {
              $nb_vih = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 329) {
              $prr_vih = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 331) {
              $nb_idr = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 332) {
              $prr_idr = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 334) {
              $nb_Quantifierons = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 335) {
              $prr_Quantifierons = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 337) {
              $nb_bk = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 338) {
              $prr_bk = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 340) {
              $nb_sys = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 341) {
              $prr_sys = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 344) {
              $nb_othr = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 345) {
              $prr_othr = (int)$answer->getAnswer();
            }

            // privé
            if ($answer->getId()== 347) {
              $nb_prv_vs = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 348) {
              $nb_prv_nfs = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 350) {
              $nb_prv_shb = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 351) {
              $prr_shb = (int)$answer->getAnswer();
            }
            // // // // //
            if ($answer->getId()== 353) {
              $nb_prv_vih = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 354) {
              $prr_vih = (int)$answer->getAnswer();
            }

            if ($answer->getId()== 356) {
              $nb_prv_Quantifierons = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 357) {
              $prr_Quantifierons = (int)$answer->getAnswer();
            }

            if ($answer->getId()== 359) {
              $nb_prv_sys = (int)$answer->getAnswer();
            }
            if ($answer->getId()== 360) {
              $prr_sys = (int)$answer->getAnswer();
            }


        }

        if ($type = 'Mutualistes (CNSS/CNOPS/FAR)' || $type = 'Mutualistes ') {
          $pr_fx_Rhumatologue = 75;
          $pr_fx_Professeur = 120;
          $pr_fx_Generaliste = 50;
          $pr_fx_Psychiatre = 100;
          $Main_fx = 135 ;
          $Pied_fx = 135 ;
          $Hanche_fx = 135 ;
          $Rachis_fx = 90 ;
          $Epaule_fx = 153 ;
          $Thorax_fx = 144 ;
          $DMO_fx = 420 ;
          $VS_fx =  27;
          $CRP_fx = 90;
          $NFS_fx = 72;

        }
        else {
          $pr_fx_Rhumatologue = 60;
          $pr_fx_Professeur = 100;
          $pr_fx_Generaliste = 40;
          $pr_fx_Psychiatre = 100;
          $Main = 112.5;
          $Pied = 112.5;
          $Hanche = 112.5;
          $Rachis = 75;
          $Epaule = 127.5;
          $Thorax = 120;
          $DMO = 420;
          $VS_fx =  27;
          $CRP_fx = 90;
          $NFS_fx = 72;

        }

        $total_Consultations = $Nbr_rhumatologue*$Prx_rhumatologue+$Nbr_intrn*$Prx_intrn+$Nbr_generaliste*$Prx_generaliste + $Nbr_rhumatologue_plc*$Nbr_prf_plc+$Nbr_gnrl_plc*$Nbr_psy_plc+$pr_fx_Rhumatologue*$pr_fx_Professeur+$pr_fx_Generaliste*$pr_fx_Psychiatre;
        $total_Hosp = $Nbr_jr_hosp*180 +$Nbr_nuit_hosp*500 + $Nbr_jr_hosp*$Nbr_nuit_hosp+$pr_srlg*$cout_dplc+$prx_jr*$n_jr+$prx_nuit*$n_nuit;
        $total_radio = $nb_main*$Main_fx+$nb_pied*$Pied_fx+$nb_hanche*$Hanche_fx+$nb_rachis*$Rachis_fx+$nb_epaule*$Epaule_fx+$nb_thorax*$Thorax_fx+$nb_dmo*$DMO_fx+$nb_autre*$prix_autre+ $nbr_main+$prix_main+$nbr_pied*$prix_pied+$nbr_hanche*$prix_hanche+$nbr_rachis*$prix_rachis+$nbr_epaul*$prix_epaul+$nbr_thorax*$prix_thorax+$nbr_dmo*$prix_dmo+$nbr_autre*$prix_autre+$prix_dplcmt;
        $total_biology = $nb_vs* + $nb_crp* + $nb_nfs* + $nb_sha * $prr_sha + $nb_shb * $prr_shb + $nb_shc * $prr_shc + $nb_vih * $prr_vih + $nb_idr * $prr_idr + $nb_Quantifierons * $prr_Quantifierons + $nb_bk * $prr_bk + $nb_sys * $prr_sys + $nb_othr * $prr_othr   + $nb_prv_vs * 27 + $nb_prv_nfs*72 + $nb_prv_shb*$prr_shb+$nb_prv_vih*$prr_vih+$nb_prv_sys*$prr_sys;
        return $this->render('patient/display.html.twig', [
            'patient' => $pt,
            'surv_done' => $surv_done,
            'surv_not_done' => $not_done,
            'cnslt' => $total_Consultations,
            'hsp' => $total_Hosp,
            'radio' => $total_radio,
            'bio' => $total_biology ,
        ]);
    }


    /**
     * @Route("/patient/add/infoAction", name="addinfoAction")
     */
    public function addinfoAction(Request $request)
    {

          try {
            $res = $_POST['response'];
            $pt = $_POST['patient'];
            $questionId = $_POST['questionId'];


            $em = $this->getDoctrine()->getManager();

            $patient = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($pt);
            if(!$patient){throw $this->createNotFoundException('No ID found');}


            for ($i=0; $i < count($res) ; $i++) {
              if ($res[$i] != '' or $res[$i] != 'Veuillez sélectionner une réponse de votre choix'  ) {
                // code...
              }
              $qa = new InfoAnswer();
              $qa->setPatient($patient);

              if(!$questionId[$i]){throw $this->createNotFoundException('No ID found');}
              $question = $this->getDoctrine()->getEntityManager()->getRepository(Question::class)->Find($questionId[$i]);
              $qa->setQuestion($question);

              $qa->setAnswer($res[$i]);

              $em->persist($qa);
            }

            $em->flush();
            return $this->redirectToRoute('patient');
          } catch (\Exception $e) {
            return $this->redirectToRoute('patient');
          }

    }


    /**
     * @Route("/patient/delete", name="delete_pat")
     */
    public function delete_pat(Request $request)
    {

          $em = $this->getDoctrine()->getManager();

          $pat_id = $_POST['pat_id'];

          if(!$pat_id)
          {
              throw $this->createNotFoundException('No ID found');
          }
          $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($pat_id);

          $em->remove($pat);
          $em->flush();

          return $this->redirectToRoute('patient');
    }

    /**
     * @Route("/info/delete", name="delete_ans")
     */
    public function delete_ans()
    {

          $pat_id = $_POST['ans_id'];

          $em = $this->getDoctrine()->getManager();

          if(!$pat_id)
          {
              throw $this->createNotFoundException('No ID found');
          }

          $QuestionAnswer = $this->getDoctrine()->getEntityManager()->getRepository(InfoAnswer::class)->Find($pat_id);

          if($QuestionAnswer != null)
          {
              $em->remove($QuestionAnswer);
              $em->flush();
          }

          return $this->redirectToRoute('patientDisplay');
    }


    /**
     * @Route("/patient/manage/info", name="manageinfo")
     */
    public function manageinfo()
    {
        $patient_list = [];

        $Questions = $this->getDoctrine()->getRepository(Question::class)->findBy(['aboutPatient' => '1']);


        return $this->render('patient/manage.html.twig', [
            'Questions' => $Questions
        ]);
    }

    /**
     * @Route("/patient/list", name="patientlsit")
     */
    public function patient()
    {
        return $this->redirectToRoute('patient');
    }





    /**
     * @Route("/patients/add/question", name="addquestion")
     */
    public function addquestion()
    {
        $patient_list = [];
        return $this->render('patient/addpatientquestion.html.twig', [
            'Patients' => $patient_list, 'controller_name' => "add ;) !"
        ]);
    }




    /**
     * @Route("/pationadd", name="pationadd")
     */
    public function pationaddAction(Request $request)
    {
          // 1) build the form
           $patient = new Patient();

           $patient->setNom($_POST['Nom'] );
           $patient->setPrenom($_POST['Prenom'] );
           $patient->setEmail($_POST['Email'] );
           $patient->setNumerotel($_POST['Numerotel'] );
           $patient->setAdress($_POST['Adress'] );

           $patient->setCode($_POST['code'] );
           $patient->setNumEntree($_POST['num_entree'] );
           $patient->setDatevisite($_POST['datevisite'] );
           $patient->setSuivipour($_POST['suivipour'] );
           $patient->setBiotherapieencours($_POST['biotherapieencours'] );
           $patient->setAssurance($_POST['assurance'] );
           // get logged user
           $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
           $usr = $this->getUser();
           $patient->setAddBy($usr );
           $patient->setAddDate($_POST['AddDate'] );

           $em = $this->getDoctrine()->getManager();

           $em->persist($patient);
           $em->flush();

           return $this->redirectToRoute('patient');
    }





    /**
    * @Route("/patientquestionAdd", name="patientquestionAdd")
    */
    public function patientquestionAdd(Request $request)
    {
      $em = $this->getDoctrine()->getManager();

      // 1) build the form
      $question = new Question();

      $question->setTitle($_POST['Title'] );
      $question->setQuestion($_POST['Question'] );
      $question->setDescription($_POST['Description'] );
      $question->setAboutPatient(1);
      $question->setType($_POST['Type'] );

      $em->persist($question);
      // $em->flush();

      $Awnsers = $_POST['Awnser'];
      foreach( $Awnsers as $v ) {
        $QuestionOption = new QuestionOption();
        $QuestionOption->setQuestion( $question );
        $QuestionOption->setAwnser($v);
        $em->persist($QuestionOption);
      }
      $em->flush();

      return $this->render('patient/add.html.twig', [
        'controller_name' => "add ;) !"
      ]);
    }






    /**
    * @Route("/patient/{pat_id}", name="patientid")
    */
    public function patientid(Request $request, $pat_id)
    {
          $patient_id = $pat_id;

          $em = $this->getDoctrine()->getManager();

          if(!$patient_id)
          {
              throw $this->createNotFoundException('No ID found');
          }

          $pt = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($patient_id);
          $sr = $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->findAll();

          $qst_done = $this->getDoctrine()->getEntityManager()->getRepository(QuestionAnswer::class)->findBy(['patient'=>$patient_id]);

          $sus = [];
          $surv_done = [];
          foreach ($qst_done as $qq) {
            array_push($sus,$qq->getSurvey());
          }

          foreach ($sus as $value) {
            if (!in_array($value,$surv_done)) {
              array_push($surv_done,$value);
            }
          }


          // $surv_done = array_unique($qst_done);
          $surv_not_done = [];
          foreach ($sr as $s){
            if (!in_array($s, $surv_done)) {
              array_push($surv_not_done, $s);
            }
          }

          $not_done = [];
          foreach ($surv_not_done as $k) {
            if (!in_array($k,$not_done)) {
              array_push($not_done,$k);
            }
          }
          return $this->render('patient/display.html.twig', [
              'patient' => $pt,
              'surv_done' => $surv_done,
              'surv_not_done' => $not_done,
          ]);
    }



    /**
    * @Route("/patient/{pat_id}/add/biotherapie", name="biotherapie")
    */
    public function biotherapie(Request $request, $pat_id)
    {
      return $this->render('patient/biotherapie.html.twig', ['pat_id'=>$pat_id]);
    }

    /**
    * @Route("/patient/{pat_id}/add/ains", name="ains")
    */
    public function ains(Request $request, $pat_id)
    {
      return $this->render('patient/Ains.html.twig', ['pat_id'=>$pat_id]);
    }
    /**
    * @Route("/patient/{pat_id}/add/dmards", name="dmards")
    */
    public function dmards(Request $request, $pat_id)
    {
      return $this->render('patient/dmards.html.twig', ['pat_id'=>$pat_id]);
    }
    /**
    * @Route("/patient/{pat_id}/add/effet", name="effet")
    */
    public function effet(Request $request, $pat_id)
    {
      return $this->render('patient/effet.html.twig', ['pat_id'=>$pat_id]);
    }




            /**
            * @Route("/patient/{pat_id}/add/biotherapieAction", name="biotehAction")
            */
            public function biotehAction(Request $request, $pat_id)
            {
              $em = $this->getDoctrine()->getManager();
              if(!$pat_id )
              {
                  throw $this->createNotFoundException('No ID found');
              }

              $patient = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($pat_id);

              if (isset($_POST['biotherapie'])) {
                $bt = new Biotehrapie();
                $bt->setBiotherapie($_POST['biotherapie']);
                $bt->setDateDebut( \DateTime::createFromFormat('Y-m-d',$_POST['date_debut']));
                $bt->setDatearret($_POST['datearret']);
                $bt->setMotifArret($_POST['motif_arret']);
                $bt->setPatient($patient);
                $em->persist($bt);
              }
              $em->flush();
              return $this->redirect('/patient/'.$pat_id);
            }





        /**
        * @Route("/patient/{pat_id}/add/ainsAction", name="ainsAction")
        */
        public function ainsAction(Request $request, $pat_id)
        {
          $em = $this->getDoctrine()->getManager();
          if(!$pat_id )
          {
              throw $this->createNotFoundException('No ID found');
          }

          $patient = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($pat_id);

          if (isset($_POST['ains'])) {
            $bt = new Ains();
            $bt->setAins($_POST['ains']);
            $bt->setDatedebut($_POST['date_debut']);
            $bt->setDatedarret($_POST['datearret']);
            $bt->setFreq($_POST['freq']);
            $bt->setDose($_POST['dose']);
            $bt->setPatient($patient);
            $em->persist($bt);
          }
          $em->flush();

          return $this->redirect('/patient/'.$pat_id);
        }



        /**
        * @Route("/patient/{pat_id}/adddmardsAction", name="dmardsAction")
        */
        public function dmardsAction(Request $request, $pat_id)
        {
          $em = $this->getDoctrine()->getManager();
          if(!$pat_id )
          {
              throw $this->createNotFoundException('No ID found');
          }

          $patient = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($pat_id);

          if (isset($_POST['Dmards'])) {
            $bt = new Dmards();
            $bt->setDmards($_POST['Dmards']);
            $bt->setDatedebut($_POST['date_debut']);
            $bt->setDatedarret($_POST['datearret']);
            $bt->setMotifdarret($_POST['motif_arret']);
            $bt->setPatient($patient);
            $em->persist($bt);
          }
          $em->flush();

          return $this->redirect('/patient/'.$pat_id);
        }



        /**
        * @Route("/patient/{pat_id}/effetAction", name="effetAction")
        */
        public function effetAction(Request $request, $pat_id)
        {
          $em = $this->getDoctrine()->getManager();
          if(!$pat_id )
          {
              throw $this->createNotFoundException('No ID found');
          }

          $patient = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($pat_id);

          if (isset($_POST['effet'])) {
            $bt = new Effet();
            $bt->setInfection($_POST['infection']);
            $bt->setTtt($_POST['ttt']);
            $bt->setDatedudc($_POST['datedudc']);
            $bt->setDatedeguerison($_POST['datedeguerison']);
            $bt->setPatient($patient);
            $em->persist($bt);
          }
          $em->flush();

          return $this->redirect('/patient/'.$pat_id);
        }


        /**
        * @Route("/patient/export/csv", name="patientExport")
        */
        public function patientExportcsv()
        {
          $em = $this->getDoctrine()->getManager();

          $patients = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->findAll();

          $patient_array = [];
          $file_content = '';

                $file_content = $file_content.
                'Nom'.';'.
                'Prenom'.';'.
                'Email'.';'.
                'Numero telephone'.';'.
                'Adresse'.';'.
                'Ajouter par'.';'.
                'Ajouter le'.';'.
                'Code'.';'.
                'Num Entree'.';'.
                'Date visite'.';'.
                'Suivi pour'.';'.
                'Biotherapie en cours'.';'.
                'Assurance'
                .'
                ';
          foreach ($patients as $pat) {
                $file_content = $file_content.
                $pat->getNom().';'.
                $pat->getPrenom().';'.
                $pat->getEmail().';'.
                $pat->getNumerotel().';'.
                $pat->getAdress().';'.
                $pat->getAddBy().';'.
                $pat->getAddDate().';'.
                $pat->getCode().';'.
                $pat->getNumEntree().';'.
                $pat->getDatevisite().';'.
                $pat->getSuivipour().';'.
                $pat->getBiotherapieencours().';'.
                $pat->getAssurance()
                .'
                ';
          }

          $filename = "patient.csv";

           // The dinamically created content of the file

           $response = new Response($file_content);

           // Create the disposition of the file
           $disposition = $response->headers->makeDisposition(
               ResponseHeaderBag::DISPOSITION_ATTACHMENT,
               $filename
           );

           // Set the content disposition
           $response->headers->set('Content-Disposition', $disposition);

           // Dispatch request
           return $response;

          // return new BinaryFileResponse($publicResourcesFolderPath.$filename);

        }




}
