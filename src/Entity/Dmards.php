<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DmardsRepository")
 */
class Dmards
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $dmards;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $datedebut;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $datedarret;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $motifdarret;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Patient", inversedBy="dmards")
     */
    private $patient;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDmards(): ?string
    {
        return $this->dmards;
    }

    public function setDmards(string $dmards): self
    {
        $this->dmards = $dmards;

        return $this;
    }

    public function getDatedebut(): ?string
    {
        return $this->datedebut;
    }

    public function setDatedebut(string $datedebut): self
    {
        $this->datedebut = $datedebut;

        return $this;
    }

    public function getDatedarret(): ?string
    {
        return $this->datedarret;
    }

    public function setDatedarret(string $datedarret): self
    {
        $this->datedarret = $datedarret;

        return $this;
    }

    public function getMotifdarret(): ?string
    {
        return $this->motifdarret;
    }

    public function setMotifdarret(string $motifdarret): self
    {
        $this->motifdarret = $motifdarret;

        return $this;
    }

    public function getPatient(): ?Patient
    {
        return $this->patient;
    }

    public function setPatient(?Patient $patient): self
    {
        $this->patient = $patient;

        return $this;
    }
}
