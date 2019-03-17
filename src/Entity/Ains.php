<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AinsRepository")
 */
class Ains
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
    private $ains;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $dose;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $freq;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $datedebut;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $datedarret;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Patient", inversedBy="ains")
     */
    private $patient;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAins(): ?string
    {
        return $this->ains;
    }

    public function setAins(string $ains): self
    {
        $this->ains = $ains;

        return $this;
    }

    public function getDose(): ?string
    {
        return $this->dose;
    }

    public function setDose(string $dose): self
    {
        $this->dose = $dose;

        return $this;
    }

    public function getFreq(): ?string
    {
        return $this->freq;
    }

    public function setFreq(string $freq): self
    {
        $this->freq = $freq;

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
