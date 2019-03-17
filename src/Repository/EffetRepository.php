<?php

namespace App\Repository;

use App\Entity\Effet;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Effet|null find($id, $lockMode = null, $lockVersion = null)
 * @method Effet|null findOneBy(array $criteria, array $orderBy = null)
 * @method Effet[]    findAll()
 * @method Effet[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EffetRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Effet::class);
    }

//    /**
//     * @return Effet[] Returns an array of Effet objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Effet
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
