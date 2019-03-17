<?php

namespace App\Repository;

use App\Entity\Dmards;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Dmards|null find($id, $lockMode = null, $lockVersion = null)
 * @method Dmards|null findOneBy(array $criteria, array $orderBy = null)
 * @method Dmards[]    findAll()
 * @method Dmards[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DmardsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Dmards::class);
    }

//    /**
//     * @return Dmards[] Returns an array of Dmards objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Dmards
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
