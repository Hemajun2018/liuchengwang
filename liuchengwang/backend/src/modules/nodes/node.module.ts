import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeController } from './node.controller';
import { NodeService } from './node.service';
import { DeliverableController } from './deliverable.controller';
import { DeliverableService } from './deliverable.service';
import { Node } from '../../database/entities/node.entity';
import { Issue } from '../../database/entities/issue.entity';
import { Material } from '../../database/entities/material.entity';
import { Deliverable } from '../../database/entities/deliverable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node, Issue, Material, Deliverable])],
  controllers: [NodeController, DeliverableController],
  providers: [NodeService, DeliverableService],
  exports: [NodeService, DeliverableService],
})
export class NodeModule {} 