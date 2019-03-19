<?php

namespace App\Controller;

use App\Entity\Question;
use App\Entity\Patient;
use App\Entity\User;
use App\Entity\Dmards;
use App\Entity\Effet;
use App\Entity\Ains;
use App\Entity\Biotehrapie;
use App\Entity\Survey;
use App\Entity\QuestionOption;
use App\Entity\QuestionAnswer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SureveyController extends AbstractController
{
    /**
     * @Route("/survey", name="surevey")
     */
    public function index()
    {

      $em = $this->getDoctrine()->getManager();

      $surveys = $this->getDoctrine()
             ->getRepository(Survey::class)
             ->findAll();

        return $this->render('surevey/index.html.twig', [
            'surveys' => $surveys,
        ]);
    }

    /**
     * @Route("survey/add", name="surveyAdd")
     */
    public function surveyAdd()
    {
        return $this->render('surevey/add.html.twig', [
            'controller_name' => 'SureveyController',
        ]);
    }

    /**
     * @Route("survey/addAction", name="surveyAddaction")
     */
    public function surveyAddaction(Request $request)
    {

      // 1) build the form
       $Survey = new Survey();

       // get logged user
       $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
       $usr = $this->getUser();
       $Survey->setCreatedBy($usr );
       $Survey->setTitle($_POST['Title'] );
       $Survey->setDescription($_POST['Description'] );
       $em = $this->getDoctrine()->getManager();
       $em->persist($Survey);
       $Questions = [];
       if (isset($_POST['Question'])) {
         $question = new Question();
         $question->setQuestion($_POST['Question']['qstqst']);
         $question->setDescription($_POST['Question']['qstdescript']);
         $question->setAboutPatient(0);
         $question->setSurvey($Survey);
         $question->setType($_POST['Question']['type']);
         $em->persist($question);
         if ($_POST['Question']['type'] != 'simple') {
           $options = $_POST['option'];
           foreach ($options as $opt) {
             $optit = new QuestionOption();
             $optit->setQuestion($question);
             $optit->setAwnser($opt);
             $em->persist($optit);
           }
         }
       }
       $em->flush();

       $qsts = [];
       $qsts = $this->getDoctrine()->getEntityManager()->getRepository(Question::class)->findBy(['survey' => $Survey->getId()]);

        return $this->render('surevey/add-step2.html.twig', [
            'currentSurevey' => $Survey, 'qsts' => $qsts,
        ]);


      }




    /**
     * @Route("survey/next", name="surveyNext")
     */
    public function surveyNext(Request $request)
    {
      $em = $this->getDoctrine()->getManager();

      $srv_id = $_POST['survey_id'];
      $Survey= $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->Find($srv_id);

      $em->persist($Survey);

       $Questions = [];
       if (isset($_POST['Question']) and $Survey) {
         $question = new Question();
         $question->setQuestion($_POST['Question']['qstqst']);
         $question->setDescription($_POST['Question']['qstdescript']);
         $question->setAboutPatient(0);
         $question->setSurvey($Survey);
         $question->setType($_POST['Question']['type']);
         $em->persist($question);
         if ($_POST['Question']['type'] != 'simple') {
           $options = $_POST['option'];
           foreach ($options as $opt) {
             if ($opt != NULL) {
             $optit = new QuestionOption();
             $optit->setQuestion($question);
             $optit->setAwnser($opt);
             $em->persist($optit);
            }
           }
         }
       }
       $em->flush();

       $qsts = [];
       $qsts = $this->getDoctrine()->getEntityManager()->getRepository(Question::class)->findBy(['survey' => $srv_id]);

        return $this->render('surevey/add-step2.html.twig', [
            'currentSurevey' => $Survey, 'qsts' => $qsts,
        ]);
      }


    /**
     * @Route("survey/save", name="surveySave")
     */
    public function surveySave(Request $request)
    {
      return $this->redirectToRoute('main');
    }

    /**
     * @Route("/survey/delete", name="surveydelete")
     */
    public function surveydelete()
    {
        $srv_id = $_POST['SRV'];
        $em = $this->getDoctrine()->getManager();
        if(!$srv_id)
        {
            throw $this->createNotFoundException('No ID found');
        }
        $srv= $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->Find($srv_id);
        if($srv!= null)
        {
            $em->remove($srv);
            $em->flush();
        }
        return $this->redirectToRoute('SurveyList');
    }

    /**
     * @Route("/answers/delete", name="answerdelete")
     */
    public function answerdelete()
    {
        $srv_id = $_POST['SRV'];
        $pat_id = $_POST['PAT'];
        $em = $this->getDoctrine()->getManager();
        if(!$srv_id)
        {
            throw $this->createNotFoundException('No ID found');
        }

        $qs_ansrs= $this->getDoctrine()->getEntityManager()->getRepository(QuestionAnswer::class)->findBy(['survey' => $srv_id, 'patient'=>$pat_id]);
        if($qs_ansrs!= null)
        {
          foreach ($qs_ansrs as $value) {
            // code...
            $em->remove($value);
          }
          $em->flush();
        }
        return $this->redirectToRoute('patient');
    }

    /**
     * @Route("/question/delete/{qst_id}", name="questiondelete")
     */
    public function questiondelete($qst_id)
    {
        $em = $this->getDoctrine()->getManager();
        if(!$qst_id)
        {
            throw $this->createNotFoundException('No ID found');
        }

        $qs_ansrs= $this->getDoctrine()->getEntityManager()->getRepository(Question::class)->find($qst_id);
        $survey = $qs_ansrs->getSurvey();
        $em->remove($qs_ansrs);
        $em->flush();
        return $this->redirect('/survey/edit/'.$survey->getId());
    }




    /**
     * @Route("survey/create", name="surveycreate")
     */
    public function surveycreate()
    {
       // $em->flush();
        return $this->render('surevey/add.html.twig', [
            'currentSurevey' => 'SureveyController'
        ]);
    }

    /**
     * @Route("survey/create/nextstep", name="surveynextstep")
     */
    public function surveynextstep(Request $request)
    {
        return $this->render('surevey/add.html.twig', [
            'currentSurevey' => 'SureveyController', 'Questions' => $Questions
        ]);
    }


    /**
     * @Route("/survey/{survey_id}/patient/{patient_id}", name="replySurvey")
     */
    public function replySurvey($patient_id,$survey_id)
    {
        $em = $this->getDoctrine()->getManager();

        if(!$survey_id or !$patient_id )
        {
            throw $this->createNotFoundException('No ID found');
        }

        $patient = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($patient_id);



        $questions = $this->getDoctrine()->getEntityManager()->getRepository(Question::class)->findBy(['survey' => $survey_id]);


        $survey = $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->find($survey_id);

        return $this->render('surevey/answer.html.twig', [
            'patient' => $patient, 'survey' => $survey, 'questions' => $questions
        ]);
    }



    /**
     * @Route("/add/survey/reply", name="replySurveyAction")
     */
    public function replySurveyAction()
    {

      $em = $this->getDoctrine()->getManager();

      $pat_id = $_POST['pat_id'];
      $patient = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->Find($pat_id);

      $survey_id = $_POST['survey_id'];
      $survey = $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->find($survey_id);

      // $questions = $_POST['answer'];
      foreach ($_POST['answer'] as $question) {
        if (isset($question['answer'])) {
          if ($question['answer'] != '' and $question['answer'] != 'Veuillez choisire une réponse') {
            if (is_array($question['answer'])) {
              foreach ($question['answer'] as $k) {
                  $answer = new QuestionAnswer();
                  $answer->setAnswer($k);
                  $answer->setQuestion($this->getDoctrine()->getEntityManager()->getRepository(Question::class)->find($question['questionid']));
                  $answer->setPatient($patient);
                  $answer->setSurvey($survey);
                  $em->persist($answer);
                }
              }
              else {
                  $answer = new QuestionAnswer();
                  $answer->setAnswer($question['answer']);
                  $answer->setQuestion($this->getDoctrine()->getEntityManager()->getRepository(Question::class)->find($question['questionid']));
                  $answer->setPatient($patient);
                  $answer->setSurvey($survey);
                  $em->persist($answer);
            }
          }
        }
      }
      $em->flush();

      return $this->redirect('/patient/'.$pat_id);
      // return $this->render('surevey/answer.html.twig', [
      //     'patient' => $patient, 'survey' => $survey, 'questions' => $questions
      // ]);
    }


    /**
     * @Route("/survey/list", name="SurveyList")
     */
    public function surveyList()
    {

      $em = $this->getDoctrine()->getManager();

      $Surveys = $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->findAll();

      return $this->render('surevey/list.html.twig', [ 'survey' => $Surveys,
      ]);
    }

    /**
     * @Route("/survey/edit/{survey_id}", name="Surveyedit")
     */
    public function surveyedit($survey_id)
    {

      $em = $this->getDoctrine()->getManager();

      $Surveys = $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->find($survey_id);

      return $this->render('surevey/edit.html.twig', [ 'survey' => $Surveys,
      ]);
    }


    /**
     * @Route("/add/question/survey/{survey_id}", name="SurveyaddQuestion")
     */
    public function surveyaddQuestion($survey_id)
    {

      $em = $this->getDoctrine()->getManager();

      $Surveys = $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->find($survey_id);
      $qsts = $this->getDoctrine()->getEntityManager()->getRepository(Question::class)->findBy(['survey' => $survey_id]);


      return $this->render('surevey/add-step2.html.twig', [
          'currentSurevey' => $Surveys, 'qsts' => $qsts,
      ]);


    }





    /**
    * @Route("/answers/export/csv", name="answersExport")
    */
    public function answersExportcsv()
    {
      $em = $this->getDoctrine()->getManager();

      $QAs = $this->getDoctrine()->getEntityManager()->getRepository(QuestionAnswer::class)->findAll();

      $patient_array = [];
      $file_content = '';
      $file_content = $file_content.'Id'.';'.'Questionaire'.';'.'Question'.';'.'Nom'.';'.'Reponse'.'
      ';
      foreach ($QAs as $qa) {
        $patient = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($qa->getPatient());
        $question = $this->getDoctrine()->getEntityManager()->getRepository(Question::class)->find($qa->getQuestion());
        $Survey = $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->find($qa->getSurvey());

        if (isset($Survey)) {
          $file_content = $file_content.$qa->getId().';'.$Survey->getTitle().';'.$question->getQuestion().';'.$patient->getNom().' '.$patient->getPrenom().';'.$qa->getAnswer().'
          ';
          // code...
        }
      }

      $filename = "anns.csv";

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


    /**
    * @Route("/answers/exportcsv", name="answersExport2")
    */
    public function answersExportcsv2()
    {
      $em = $this->getDoctrine()->getManager();

      $Srvs = $this->getDoctrine()->getEntityManager()->getRepository(Survey::class)->findAll();


      $file_content = 'Id'.';'.'Questionaire'.';'.'Question'.';'.
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
      'Assurance'.';'.'Reponse'.'
      ';


      foreach ($Srvs as $sv) {
        $QAs = $this->getDoctrine()->getEntityManager()->getRepository(QuestionAnswer::class)->findBy( ['survey' => $sv->getId()] );
        $file_content = $file_content.'#'.$sv->getId().' '.$sv->getTitle().';'.'Reponse: ;'.'
        ';
        foreach ($QAs as $qa) {
          $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($qa->getPatient());
          $question = $this->getDoctrine()->getEntityManager()->getRepository(Question::class)->find($qa->getQuestion());
          $file_content = $file_content.$qa->getId().';'
          .$sv->getTitle().';'
          .$question->getQuestion().';'.
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
          .';'.$qa->getAnswer().'
          ';
          // code...
        }
      }




      $filename = "anns.csv";

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




    /**
    * @Route("/export/data", name="exportData")
    */
    public function exportData()
    {
      $em = $this->getDoctrine()->getManager();

      $dmards = $this->getDoctrine()->getEntityManager()->getRepository(Dmards::class)->findAll();
      $Effet = $this->getDoctrine()->getEntityManager()->getRepository(Effet::class)->findAll();
      $Ains = $this->getDoctrine()->getEntityManager()->getRepository(Ains::class)->findAll();
      $Biotehrapie = $this->getDoctrine()->getEntityManager()->getRepository(Biotehrapie::class)->findAll();


      $file_content = '
      Biotherapie : '.'
      ';

      $file_content = $file_content.'Nom;Prenom;Biotherapie;DateDebut;Datearret;MotifArret;
      ';

      foreach ($Biotehrapie as $value) {
        $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($value->getPatient());
        $file_content = $file_content.$pat->getNom().';'.
                                      $pat->getPrenom().';'.
                                      $value->getBiotherapie().';'.
                                      // $value->getDateDebut().';'.
                                      $value->getDatearret().';'.
                                      $value->getMotifArret().';';

      }



      $file_content = $file_content.'
      Dmards : '.'
      ';

      $file_content = $file_content.'Nom;Prenom;Dmards;Debut;Arret;motif d arret;
      ';

      foreach ($dmards as $value) {
        $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($value->getPatient());
        $file_content = $file_content.$pat->getNom().';'.
                                      $pat->getPrenom().';'.
                                      $value->getDmards().';'.
                                      $value->getDatedebut().';'.
                                      $value->getDatedarret().';'.
                                      $value->getMotifdarret().';';

      }

      $file_content = $file_content.'
      Ains : '.'
      ';

      $file_content = $file_content.'Nom;Prenom;Ains;Dose;Freq;Datedebut; Datedarret;
      ';

      foreach ($Ains as $value) {
        $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($value->getPatient());
        $file_content = $file_content.$pat->getNom().';'.
                                      $pat->getPrenom().';'.
                                      $value->getAins().';'.
                                      $value->getDose().';'.
                                      $value->getFreq().';'.
                                      $value->getDatedebut().';'.
                                      $value->getDatedarret().';';

                                    }


      $file_content = $file_content.'
      Effet : '.'
      ';

      $file_content = $file_content.'Nom;Infection;Datedudc;Ttt;Datedeguerison;
      ';

      foreach ($Effet as $value) {
        $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($value->getPatient());
        $file_content = $file_content.$pat->getNom().';'.
                                      $pat->getPrenom().';'.
                                      $value->getInfection().';'.
                                      $value->getDatedudc().';'.
                                      $value->getTtt().';'.
                                      $value->getDatedeguerison().';';

                                    }




      $filename = "data.csv";

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




    /**
    * @Route("/export/data/{pat_id}", name="exportDataId")
    */
    public function exportDataId($pat_id)
    {
      $em = $this->getDoctrine()->getManager();

      $dmards = $this->getDoctrine()->getEntityManager()->getRepository(Dmards::class)->findBy(['patient'=>$pat_id]);
      $Effet = $this->getDoctrine()->getEntityManager()->getRepository(Effet::class)->findBy(['patient'=>$pat_id]);
      $Ains = $this->getDoctrine()->getEntityManager()->getRepository(Ains::class)->findBy(['patient'=>$pat_id]);
      $Biotehrapie = $this->getDoctrine()->getEntityManager()->getRepository(Biotehrapie::class)->findBy(['patient'=>$pat_id]);


      $file_content = '
      Biotherapie : '.'
      ';

      $file_content = $file_content.'Nom;Prenom;Biotherapie;DateDebut;Datearret;MotifArret;
      ';

      foreach ($Biotehrapie as $value) {
        $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($value->getPatient());
        $file_content = $file_content.$pat->getNom().';'.
                                      $pat->getPrenom().';'.
                                      $value->getBiotherapie().';'.
                                      // $value->getDateDebut().';'.
                                      $value->getDatearret().';'.
                                      $value->getMotifArret().';';

      }



      $file_content = $file_content.'
      Dmards : '.'
      ';

      $file_content = $file_content.'Nom;Prenom;Dmards;Debut;Arret;motif d arret;
      ';

      foreach ($dmards as $value) {
        $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($value->getPatient());
        $file_content = $file_content.$pat->getNom().';'.
                                      $pat->getPrenom().';'.
                                      $value->getDmards().';'.
                                      $value->getDatedebut().';'.
                                      $value->getDatedarret().';'.
                                      $value->getMotifdarret().';';

      }

      $file_content = $file_content.'
      Ains : '.'
      ';

      $file_content = $file_content.'Nom;Prenom;Ains;Dose;Freq;Datedebut; Datedarret;
      ';

      foreach ($Ains as $value) {
        $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($value->getPatient());
        $file_content = $file_content.$pat->getNom().';'.
                                      $pat->getPrenom().';'.
                                      $value->getAins().';'.
                                      $value->getDose().';'.
                                      $value->getFreq().';'.
                                      $value->getDatedebut().';'.
                                      $value->getDatedarret().';';

                                    }


      $file_content = $file_content.'
      Effet : '.'
      ';

      $file_content = $file_content.'Nom;Infection;Datedudc;Ttt;Datedeguerison;
      ';

      foreach ($Effet as $value) {
        $pat = $this->getDoctrine()->getEntityManager()->getRepository(Patient::class)->find($value->getPatient());
        $file_content = $file_content.$pat->getNom().';'.
                                      $pat->getPrenom().';'.
                                      $value->getInfection().';'.
                                      $value->getDatedudc().';'.
                                      $value->getTtt().';'.
                                      $value->getDatedeguerison().';';

                                    }




      $filename = "data.csv";

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
