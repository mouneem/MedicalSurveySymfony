<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PatientRepository")
 */
class Patient
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
    private $nom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $numerotel;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $adress;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="patients")
     */
    private $addBy;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $addDate;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\QuestionAnswer", mappedBy="patient")
     */
    private $questionAnswers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\InfoAnswer", mappedBy="patient")
     */
    private $infoAnswers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Biotehrapie", mappedBy="patient")
     */
    private $biotehrapies;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Dmards", mappedBy="patient")
     */
    private $dmards;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Effet", mappedBy="patient")
     */
    private $effets;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Ains", mappedBy="patient")
     */
    private $ains;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $NumEntree;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $datevisite;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $suivipour;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $biotherapieencours;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $assurance;

    public function __construct()
    {
        $d = new \DateTime();
        $this->addDate = $d->format('Y-m-d H:i:s');
        $this->questionAnswers = new ArrayCollection();
        $this->infoAnswers = new ArrayCollection();
        $this->biotehrapies = new ArrayCollection();
        $this->dmards = new ArrayCollection();
        $this->effets = new ArrayCollection();
        $this->ains = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(?string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(?string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getNumerotel(): ?string
    {
        return $this->numerotel;
    }

    public function setNumerotel(?string $numerotel): self
    {
        $this->numerotel = $numerotel;

        return $this;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(?string $adress): self
    {
        $this->adress = $adress;

        return $this;
    }

    public function getAddBy(): ?User
    {
        return $this->addBy;
    }

    public function setAddBy(?User $addBy): self
    {
        $this->addBy = $addBy;

        return $this;
    }

    public function getAddDate(): ?string
    {
        return $this->addDate;
    }

    public function setAddDate(?string $addDate): self
    {
        $this->addDate = $addDate;

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
            $questionAnswer->setPatient($this);
        }

        return $this;
    }

    public function removeQuestionAnswer(QuestionAnswer $questionAnswer): self
    {
        if ($this->questionAnswers->contains($questionAnswer)) {
            $this->questionAnswers->removeElement($questionAnswer);
            // set the owning side to null (unless already changed)
            if ($questionAnswer->getPatient() === $this) {
                $questionAnswer->setPatient(null);
            }
        }

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
            $infoAnswer->setPatient($this);
        }

        return $this;
    }

    public function removeInfoAnswer(InfoAnswer $infoAnswer): self
    {
        if ($this->infoAnswers->contains($infoAnswer)) {
            $this->infoAnswers->removeElement($infoAnswer);
            // set the owning side to null (unless already changed)
            if ($infoAnswer->getPatient() === $this) {
                $infoAnswer->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Biotehrapie[]
     */
    public function getBiotehrapies(): Collection
    {
        return $this->biotehrapies;
    }

    public function addBiotehrapy(Biotehrapie $biotehrapy): self
    {
        if (!$this->biotehrapies->contains($biotehrapy)) {
            $this->biotehrapies[] = $biotehrapy;
            $biotehrapy->setPatient($this);
        }

        return $this;
    }

    public function removeBiotehrapy(Biotehrapie $biotehrapy): self
    {
        if ($this->biotehrapies->contains($biotehrapy)) {
            $this->biotehrapies->removeElement($biotehrapy);
            // set the owning side to null (unless already changed)
            if ($biotehrapy->getPatient() === $this) {
                $biotehrapy->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Dmards[]
     */
    public function getDmards(): Collection
    {
        return $this->dmards;
    }

    public function addDmard(Dmards $dmard): self
    {
        if (!$this->dmards->contains($dmard)) {
            $this->dmards[] = $dmard;
            $dmard->setPatient($this);
        }

        return $this;
    }

    public function removeDmard(Dmards $dmard): self
    {
        if ($this->dmards->contains($dmard)) {
            $this->dmards->removeElement($dmard);
            // set the owning side to null (unless already changed)
            if ($dmard->getPatient() === $this) {
                $dmard->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Effet[]
     */
    public function getEffets(): Collection
    {
        return $this->effets;
    }

    public function addEffet(Effet $effet): self
    {
        if (!$this->effets->contains($effet)) {
            $this->effets[] = $effet;
            $effet->setPatient($this);
        }

        return $this;
    }

    public function removeEffet(Effet $effet): self
    {
        if ($this->effets->contains($effet)) {
            $this->effets->removeElement($effet);
            // set the owning side to null (unless already changed)
            if ($effet->getPatient() === $this) {
                $effet->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Ains[]
     */
    public function getAins(): Collection
    {
        return $this->ains;
    }

    public function addAin(Ains $ain): self
    {
        if (!$this->ains->contains($ain)) {
            $this->ains[] = $ain;
            $ain->setPatient($this);
        }

        return $this;
    }

    public function removeAin(Ains $ain): self
    {
        if ($this->ains->contains($ain)) {
            $this->ains->removeElement($ain);
            // set the owning side to null (unless already changed)
            if ($ain->getPatient() === $this) {
                $ain->setPatient(null);
            }
        }

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getNumEntree(): ?string
    {
        return $this->NumEntree;
    }

    public function setNumEntree(string $NumEntree): self
    {
        $this->NumEntree = $NumEntree;

        return $this;
    }

    public function getDatevisite(): ?string
    {
        return $this->datevisite;
    }

    public function setDatevisite(string $datevisite): self
    {
        $this->datevisite = $datevisite;

        return $this;
    }

    public function getSuivipour(): ?string
    {
        return $this->suivipour;
    }

    public function setSuivipour(string $suivipour): self
    {
        $this->suivipour = $suivipour;

        return $this;
    }

    public function getBiotherapieencours(): ?string
    {
        return $this->biotherapieencours;
    }

    public function setBiotherapieencours(string $biotherapieencours): self
    {
        $this->biotherapieencours = $biotherapieencours;

        return $this;
    }

    public function getAssurance(): ?string
    {
        return $this->assurance;
    }

    public function setAssurance(string $assurance): self
    {
        $this->assurance = $assurance;

        return $this;
    }




}
