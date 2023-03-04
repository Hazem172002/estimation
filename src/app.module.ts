import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TranslatorModule } from 'nestjs-translator';
import { Complexity } from './helper/service/complexity.service';
import { Cost } from './helper/service/cost.service';
import { Hours } from './helper/service/hours.service';
import { ResponseService } from './helper/service/response.service';
import { PlatformController } from './platform/platform.controller';
import { PlatformModule } from './platform/platform.module';
import { PlatformService } from './platform/platform.service';
import { EstimationController } from './estimation/estimation.controller';
import { EstimationModule } from './estimation/estimation.module';
import { FrontModule } from './front/front.module';
import { ComplexityController } from './complexity/complexity.controller';
import { ComplexityModule } from './complexity/complexity.module';
import { ComplexityService } from './complexity/complexity.service';
@Module({
  imports: [
    forwardRef(() =>
      TranslatorModule.forRoot({
        global: true,
        defaultLang: 'en',
        translationSource: './src/i18n',
      }),
    ),
    PlatformModule,
    EstimationModule,
    FrontModule,
    ComplexityModule,
  ],
  controllers: [PlatformController, EstimationController, ComplexityController],
  providers: [
    PrismaService,
    Complexity,
    Cost,
    Hours,
    ResponseService,
    PlatformService,
    ComplexityService,
  ],
})
export class AppModule {}
