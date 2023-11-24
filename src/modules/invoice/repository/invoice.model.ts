import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceItemModel } from "./invoice-item.model";

@Table({
    tableName: 'invoice',
    timestamps: false
})

export class InvoiceModel extends Model{

    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;
  
    @Column({ allowNull: false })
    declare street: string;
  
    @Column({ allowNull: false })
    declare number: string;
  
    @Column({ allowNull: true })
    declare complement: string;
  
    @Column({ allowNull: false })
    declare city: string;
  
    @Column({ allowNull: false })
    declare state: string;
  
    @Column({ allowNull: false })
    declare zipcode: string;

    @Column({ allowNull: false })
    declare createdAt: Date;
  
    @Column({ allowNull: false })
    declare updatedAt: Date;

    @HasMany(() => InvoiceItemModel)
    declare items: InvoiceItemModel[];
  
  }