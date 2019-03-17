<?php

namespace App\Repository;

use App\Entity\InfoAnswer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method InfoAnswer|null find($id, $lockMode = null, $lockVersion = null)
 * @method InfoAnswer|null findOneBy(array $criteria, array $orderBy = null)
 * @method InfoAnswer[]    findAll()
 * @method InfoAnswer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InfoAnswerRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, InfoAnswer::class);
    }

//    /**
//     * @return InfoAnswer[] Returns an array of InfoAnswer objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?InfoAnswer
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
