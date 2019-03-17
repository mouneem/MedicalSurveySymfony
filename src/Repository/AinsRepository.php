<?php

namespace App\Repository;

use App\Entity\Ains;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Ains|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ains|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ains[]    findAll()
 * @method Ains[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AinsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Ains::class);
    }

//    /**
//     * @return Ains[] Returns an array of Ains objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Ains
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
