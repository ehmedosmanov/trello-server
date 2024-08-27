import { Module } from '@nestjs/common';
import { WorkspacesController } from './workspaces.controller';

@Module({
  controllers: [WorkspacesController]
})
export class WorkspacesModule {}
