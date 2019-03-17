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
        $patient_list = [];
        return $this->render('patient/add.html.twig', [
            'Patients' => $patient_list, 'controller_name' => "add ;) !"
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
        return $this->render('patient/display.html.twig', [
            'patient' => $pt,
            'surv_done' => $surv_done,
            'surv_not_done' => $not_done,
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

          return $this->redirectToRoute('main');
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

          return $this->redirectToRoute('main');
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

          return $this->redirectToRoute('main');
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
