<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190312124228 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE ains ADD patient_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE ains ADD CONSTRAINT FK_D7AAD97A6B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('CREATE INDEX IDX_D7AAD97A6B899279 ON ains (patient_id)');
        $this->addSql('ALTER TABLE biotehrapie ADD patient_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE biotehrapie ADD CONSTRAINT FK_5BA80656B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('CREATE INDEX IDX_5BA80656B899279 ON biotehrapie (patient_id)');
        $this->addSql('ALTER TABLE dmards ADD patient_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE dmards ADD CONSTRAINT FK_5F77FD6E6B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('CREATE INDEX IDX_5F77FD6E6B899279 ON dmards (patient_id)');
        $this->addSql('ALTER TABLE effet ADD patient_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE effet ADD CONSTRAINT FK_8A053AAA6B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('CREATE INDEX IDX_8A053AAA6B899279 ON effet (patient_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE ains DROP FOREIGN KEY FK_D7AAD97A6B899279');
        $this->addSql('DROP INDEX IDX_D7AAD97A6B899279 ON ains');
        $this->addSql('ALTER TABLE ains DROP patient_id');
        $this->addSql('ALTER TABLE biotehrapie DROP FOREIGN KEY FK_5BA80656B899279');
        $this->addSql('DROP INDEX IDX_5BA80656B899279 ON biotehrapie');
        $this->addSql('ALTER TABLE biotehrapie DROP patient_id');
        $this->addSql('ALTER TABLE dmards DROP FOREIGN KEY FK_5F77FD6E6B899279');
        $this->addSql('DROP INDEX IDX_5F77FD6E6B899279 ON dmards');
        $this->addSql('ALTER TABLE dmards DROP patient_id');
        $this->addSql('ALTER TABLE effet DROP FOREIGN KEY FK_8A053AAA6B899279');
        $this->addSql('DROP INDEX IDX_8A053AAA6B899279 ON effet');
        $this->addSql('ALTER TABLE effet DROP patient_id');
    }
}
