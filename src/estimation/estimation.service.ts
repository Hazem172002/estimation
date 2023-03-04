import { Injectable } from '@nestjs/common';
import { Cost } from 'src/helper/service/cost.service';
import { Hours } from 'src/helper/service/hours.service';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EstimationService {
  constructor(
    private costService: Cost,
    private hourService: Hours,
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) {}
  async getEstimation(body, res) {
    const { estimate } = body;
    let cost = 0;
    let hours = 0;
    if (typeof estimate === 'string') {
      cost = this.costService.getValue(estimate);
      hours = this.hourService.getValue(estimate);
    } else {
      estimate.map((estimates) => {
        cost += this.costService.getValue(estimates);
      });
      estimate.map((estimates) => {
        hours += this.hourService.getValue(estimates);
      });
    }
    return this.responseService.success(
      res,
      'hours and features  Successfully',
      {
        hours: hours,
        cost: cost,
      },
    );
  }
  async userFeatures(body, res) {
    const { userId } = body;
    const userFeatures = await this.features(userId);
    if (!userFeatures) {
      return this.responseService.badRequest(
        res,
        'this user is not in my db',
        userId,
      );
    }
    const functionality = [];
    userFeatures.Functionalities.map((e) => {
      if (e.LearningManagmentSystem.length > 0) {
        functionality.push('Learning Managment');
      }
      if (e.ODCManagment.length > 0) {
        functionality.push('ODCManagment');
      }
      if (e.WorkPlace.length > 0) {
        functionality.push('WorkPlace');
      }
      if (e.jopHub.length > 0) {
        functionality.push('jopHub');
      }
    });
    return this.responseService.success(res, 'as', {
      userFoundations: userFeatures.Foundations,
      userPlatforms: userFeatures.Platforms,
      userFunctionality: functionality,
    });
  }
  async addFeature(body, res) {
    const { userId, feature } = body;
    const filteredUserFeatures = [];
    const filteredSystemFatures = [];
    const lastUserFeatures = [];
    const rejected = [];
    const objUserFeatures = [];
    let hours = 0;
    let cost = 0;
    const isIn = await this.prisma.users.findFirst({
      where: {
        id: userId,
      },
    });
    if (!isIn) {
      return this.responseService.conflict(res, 'this user is not in my db', {
        userId,
      });
    }
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
    systemFeatures.Foundations.map((e) => {
      e.Auth.map((e) => {
        filteredSystemFatures.push(e.featureName);
      });
      e.Help.map((e) => {
        filteredSystemFatures.push(e.featureName);
      });
      e.LandingPage.map((e) => {
        filteredSystemFatures.push(e.featureName);
      });
      e.Settings.map((e) => {
        filteredSystemFatures.push(e.featureName);
      });
    });
    systemFeatures.Functionalities.map((e) => {
      filteredSystemFatures.push(Object.keys(e));
    });
    const flatSystemFeatures = filteredSystemFatures.flat();

    const userFeatures = await this.prisma.features.findMany({
      where: {
        userId: userId,
      },
      select: {
        featureName: true,
      },
    });
    userFeatures.map((e) => {
      filteredUserFeatures.push(e.featureName);
    });
    feature.map((e) => {
      if (!filteredUserFeatures.includes(e)) {
        if (flatSystemFeatures.includes(e)) {
          lastUserFeatures.push(e);
          objUserFeatures.push({ featureName: e, userId: userId });
        } else {
          rejected.push(e);
        }
      } else {
        rejected.push(e);
      }
    });
    if (!lastUserFeatures.length) {
      return this.responseService.conflict(res, 'bad Features');
    }
    await this.prisma.features.createMany({
      data: objUserFeatures,
    });

    const estimate = await this.prisma.estimation.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!estimate) {
      return this.responseService.conflict(res, 'choose platform first');
    }
    hours = estimate.hours;
    cost = estimate.cost;
    lastUserFeatures.map((e) => {
      hours += this.hourService.getValue(e);
      cost += this.costService.getValue(e);
    });

    await this.prisma.estimation.update({
      where: {
        userId: userId,
      },
      data: {
        cost: cost,
        hours: hours,
      },
    });
    return this.responseService.success(res, 'features added succefully', {
      filteredSystemFatures: lastUserFeatures,
    });
  }
  async features(userId) {
    return await this.prisma.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        Platforms: {
          select: {
            featureName: true,
          },
        },
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
  }
}
