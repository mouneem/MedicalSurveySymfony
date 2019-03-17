<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BiotehrapieRepository")
 */
class Biotehrapie
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $biotherapie;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateDebut;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $datearret;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $motifArret;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Patient", inversedBy="biotehrapies")
     */
    private $patient;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBiotherapie(): ?string
    {
        return $this->biotherapie;
    }

    public function setBiotherapie(string $biotherapie): self
    {
        $this->biotherapie = $biotherapie;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(?\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDatearret(): ?string
    {
        return $this->datearret;
    }

    public function setDatearret(?string $datearret): self
    {
        $this->datearret = $datearret;

        return $this;
    }

    public function getMotifArret(): ?string
    {
        return $this->motifArret;
    }

    public function setMotifArret(string $motifArret): self
    {
        $this->motifArret = $motifArret;

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
