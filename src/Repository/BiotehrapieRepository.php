<?php

namespace App\Repository;

use App\Entity\Biotehrapie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Biotehrapie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Biotehrapie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Biotehrapie[]    findAll()
 * @method Biotehrapie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BiotehrapieRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Biotehrapie::class);
    }

//    /**
//     * @return Biotehrapie[] Returns an array of Biotehrapie objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Biotehrapie
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
