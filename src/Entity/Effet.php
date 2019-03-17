<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EffetRepository")
 */
class Effet
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
    private $infection;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $datedudc;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $ttt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $datedeguerison;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Patient", inversedBy="effets")
     */
    private $patient;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInfection(): ?string
    {
        return $this->infection;
    }

    public function setInfection(string $infection): self
    {
        $this->infection = $infection;

        return $this;
    }

    public function getDatedudc(): ?string
    {
        return $this->datedudc;
    }

    public function setDatedudc(string $datedudc): self
    {
        $this->datedudc = $datedudc;

        return $this;
    }

    public function getTtt(): ?string
    {
        return $this->ttt;
    }

    public function setTtt(string $ttt): self
    {
        $this->ttt = $ttt;

        return $this;
    }

    public function getDatedeguerison(): ?string
    {
        return $this->datedeguerison;
    }

    public function setDatedeguerison(string $datedeguerison): self
    {
        $this->datedeguerison = $datedeguerison;

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
