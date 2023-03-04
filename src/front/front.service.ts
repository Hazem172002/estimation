import { Injectable } from '@nestjs/common';
import { TranslatorService } from 'nestjs-translator';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FrontService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
    private translator: TranslatorService,
  ) {}
  async systemFeatures(res) {
    const systemFeatures = await this.prisma.users.findFirst({
      where: {
        admin: true,
      },
      include: {
        Foundations: {
          include: {
            Help: {
              select: {
                featureName: true,
              },
            },
            Settings: {
              select: {
                featureName: true,
              },
            },
            Auth: {
              select: {
                featureName: true,
              },
            },
            LandingPage: {
              select: {
                featureName: true,
              },
            },
          },
        },
        Functionalities: {
          include: {
            LearningManagmentSystem: {
              select: {
                featureName: true,
              },
            },
            ODCManagment: {
              select: {
                featureName: true,
              },
            },
            jopHub: {
              select: {
                featureName: true,
              },
            },
            WorkPlace: {
              select: {
                featureName: true,
              },
            },
          },
        },
      },
    });
    const arHelp = [];
    const arLandingPage = [];
    const arSettings = [];
    const arAuth = [];
    const arFunctionality = [];
    const LearningManagment = [];
    const ODC = [];
    const jopHub = [];
    const workplace = [];
    const arLearningManagment = [];
    const arODC = [];
    const arjopHub = [];
    const arworkplace = [];
    systemFeatures.Functionalities.map((e) => {
      LearningManagment.push(e.LearningManagmentSystem);
      ODC.push(e.ODCManagment);
      jopHub.push(e.jopHub);
      workplace.push(e.WorkPlace);
    });

    systemFeatures.Functionalities[0].LearningManagmentSystem.map((e) => {
      arLearningManagment.push(e.featureName);
    }),
      systemFeatures.Functionalities[0].ODCManagment.map((e) => {
        arODC.push(e.featureName);
      }),
      systemFeatures.Functionalities[0].WorkPlace.map((e) => {
        arworkplace.push(e.featureName);
      }),
      systemFeatures.Functionalities[0].jopHub.map((e) => {
        arjopHub.push(e.featureName);
      }),
      systemFeatures.Foundations[0].Help.map((feature) => {
        arHelp.push(
          this.translator.translate(feature.featureName, { lang: 'ar' }),
        );
      });
    systemFeatures.Foundations[0].LandingPage.map((feature) => {
      arLandingPage.push(
        this.translator.translate(feature.featureName, { lang: 'ar' }),
      );
    });
    systemFeatures.Foundations[0].Settings.map((feature) => {
      arSettings.push(
        this.translator.translate(feature.featureName, { lang: 'ar' }),
      );
    });
    systemFeatures.Foundations[0].Auth.map((feature) => {
      arAuth.push(
        this.translator.translate(feature.featureName, { lang: 'ar' }),
      );
    });
    return this.responseService.success(res, 'System Features', {
      landingPage: {
        en: systemFeatures.Foundations[0].LandingPage,
        ar: arLandingPage,
      },
      settings: systemFeatures.Foundations[0].Settings,
      help: {
        en: systemFeatures.Foundations[0].Help,
        ar: arHelp,
      },
      auth: {
        en: systemFeatures.Foundations[0].Auth,
        ar: arAuth,
      },
      functionality: {
        en: {
          LearningManagment: LearningManagment,
          ODC: ODC,
          jopHub: jopHub,
          workplace: workplace,
        },
        ar: {
          LearningManagment: arLearningManagment,
          ODC: arODC,
          jopHub: arjopHub,
          workplace: arworkplace,
        },
      },
    });
  }
}
