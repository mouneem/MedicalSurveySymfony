<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190312122132 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE ains (id INT AUTO_INCREMENT NOT NULL, ains VARCHAR(255) NOT NULL, dose VARCHAR(255) NOT NULL, freq VARCHAR(255) NOT NULL, datedebut VARCHAR(255) NOT NULL, datedarret VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE biotehrapie (id INT AUTO_INCREMENT NOT NULL, biotherapie LONGTEXT NOT NULL, date_debut DATETIME DEFAULT NULL, datearret VARCHAR(255) DEFAULT NULL, motif_arret VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE dmards (id INT AUTO_INCREMENT NOT NULL, dmards VARCHAR(255) NOT NULL, datedebut VARCHAR(255) NOT NULL, datedarret VARCHAR(255) NOT NULL, motifdarret VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE effet (id INT AUTO_INCREMENT NOT NULL, infection VARCHAR(255) NOT NULL, datedudc VARCHAR(255) NOT NULL, ttt VARCHAR(255) NOT NULL, datedeguerison VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE ains');
        $this->addSql('DROP TABLE biotehrapie');
        $this->addSql('DROP TABLE dmards');
        $this->addSql('DROP TABLE effet');
    }
}
