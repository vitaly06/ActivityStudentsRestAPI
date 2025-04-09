import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { GroupeModule } from './groupe/groupe.module';
import { DepartmentModule } from './department/department.module';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { EventJournalModule } from './event-journal/event-journal.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { EventRatingModule } from './event-rating/event-rating.module';
import { CheckAdmin } from './middlewares/admin.middlewares';

@Module({
  imports: [
    StudentModule,
    GroupeModule,
    DepartmentModule,
    EventJournalModule,
    EventModule,
    UserModule,
    AuthModule,
    RoleModule,
    EventRatingModule,
  ],
  controllers: [],
  providers: [PrismaClient, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAdmin).forRoutes(
      { path: 'event/addEvent', method: RequestMethod.POST },
      { path: 'event/:id', method: RequestMethod.DELETE },
      { path: 'event/:id', method: RequestMethod.PUT },
      // { path: 'event', method: RequestMethod.PUT },
      // { path: 'event', method: RequestMethod.DELETE },
      { path: 'auth/register', method: RequestMethod.POST },
    );
  }
}
