<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\QuestionRepository")
 */
class Question
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $question;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $aboutPatient;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $type;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\QuestionOption", mappedBy="question")
     */
    private $questionOptions;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\QuestionAnswer", mappedBy="question")
     */
    private $questionAnswers;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Survey", inversedBy="questions")
     */
    private $survey;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\InfoAnswer", mappedBy="question")
     */
    private $infoAnswers;

    public function __construct()
    {
        $this->questionOptions = new ArrayCollection();
        $this->options = new ArrayCollection();
        $this->questionAnswers = new ArrayCollection();
        $this->infoAnswers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(?string $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getAboutPatient(): ?bool
    {
        return $this->aboutPatient;
    }

    public function setAboutPatient(?bool $aboutPatient): self
    {
        $this->aboutPatient = $aboutPatient;

        return $this;
    }



    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection|QuestionOption[]
     */
    public function getQuestionOptions(): Collection
    {
        return $this->questionOptions;
    }

    public function addQuestionOption(QuestionOption $questionOption): self
    {
        if (!$this->questionOptions->contains($questionOption)) {
            $this->questionOptions[] = $questionOption;
            $questionOption->setQuestion($this);
        }

        return $this;
    }

    public function removeQuestionOption(QuestionOption $questionOption): self
    {
        if ($this->questionOptions->contains($questionOption)) {
            $this->questionOptions->removeElement($questionOption);
            // set the owning side to null (unless already changed)
            if ($questionOption->getQuestion() === $this) {
                $questionOption->setQuestion(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|QuestionAnswer[]
     */
    public function getQuestionAnswers(): Collection
    {
        return $this->questionAnswers;
    }

    public function addQuestionAnswer(QuestionAnswer $questionAnswer): self
    {
        if (!$this->questionAnswers->contains($questionAnswer)) {
            $this->questionAnswers[] = $questionAnswer;
            $questionAnswer->setQuestion($this);
        }

        return $this;
    }

    public function removeQuestionAnswer(QuestionAnswer $questionAnswer): self
    {
        if ($this->questionAnswers->contains($questionAnswer)) {
            $this->questionAnswers->removeElement($questionAnswer);
            // set the owning side to null (unless already changed)
            if ($questionAnswer->getQuestion() === $this) {
                $questionAnswer->setQuestion(null);
            }
        }

        return $this;
    }

    public function getSurvey(): ?Survey
    {
        return $this->survey;
    }

    public function setSurvey(?Survey $survey): self
    {
        $this->survey = $survey;

        return $this;
    }

    /**
     * @return Collection|InfoAnswer[]
     */
    public function getInfoAnswers(): Collection
    {
        return $this->infoAnswers;
    }

    public function addInfoAnswer(InfoAnswer $infoAnswer): self
    {
        if (!$this->infoAnswers->contains($infoAnswer)) {
            $this->infoAnswers[] = $infoAnswer;
            $infoAnswer->setQuestion($this);
        }

        return $this;
    }

    public function removeInfoAnswer(InfoAnswer $infoAnswer): self
    {
        if ($this->infoAnswers->contains($infoAnswer)) {
            $this->infoAnswers->removeElement($infoAnswer);
            // set the owning side to null (unless already changed)
            if ($infoAnswer->getQuestion() === $this) {
                $infoAnswer->setQuestion(null);
            }
        }

        return $this;
    }
}
