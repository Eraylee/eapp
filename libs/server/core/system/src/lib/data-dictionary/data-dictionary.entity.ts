import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseEntity } from '@eapp/server/core/base';

@Entity('data-dictionary')
@Tree('materialized-path')
export class DataDictionaryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 ,comment:"数据字典编码" })
  dictionaryCode: string;

  @Column({ type: 'varchar', length: 30, unique: true ,comment:"数据字典名"  })
  dictionaryName: string;

  @Column({ type: 'varchar', length: 50, unique: true,comment:"数据字典名" })
  dictionaryValue: string;

  @TreeChildren({
    cascade: true,
  })
  children: DataDictionaryEntity[];

  @TreeParent()
  parent: DataDictionaryEntity;
}
