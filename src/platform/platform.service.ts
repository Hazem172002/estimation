import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlatformService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) {}
  async platforms(res) {
    let lastPlatform = [];
    const platforms = await this.prisma.users.findFirst({
      where: {
        admin: true,
      },
      include: {
        Platforms: {
          select: {
            featureName: true,
          },
        },
      },
    });
    platforms.Platforms.map((e) => {
      lastPlatform.push(e.featureName);
    });
    lastPlatform = [...new Set(lastPlatform)];
    return this.responseService.success(res, 'kdmsf', lastPlatform);
  }
  async addPlatform(body, res) {
    const { platform } = body;
    let filteredSystemPlatform = [];
    const systemPlatforms = await this.prisma.users.findFirst({
      where: {
        admin: true,
      },
      include: {
        Platforms: {
          select: {
            featureName: true,
          },
        },
      },
    });
    systemPlatforms.Platforms.map((e) => {
      filteredSystemPlatform.push(e.featureName);
    });
    filteredSystemPlatform = [...new Set(filteredSystemPlatform)];
    if (typeof platform === 'string') {
      if (filteredSystemPlatform.includes(platform)) {
        const addPlatform = await this.prisma.users.create({
          data: {
            Platforms: {
              create: {
                featureName: platform,
              },
            },
          },
        });
        return this.responseService.success(res, 'feature added Successfully', {
          userId: addPlatform.id,
        });
      } else {
        return this.responseService.conflict(
          res,
          'this platform is not in my db',
          { platform },
        );
      }
    } else {
      let filteredFeatures = [];
      const addUser = await this.prisma.users.create({
        data: {},
      });
      platform.map((e) => {
        if (filteredSystemPlatform.includes(e)) {
          filteredFeatures.push({ featureName: e, userId: addUser.id });
        }
      });
      if (!filteredFeatures.length) {
        return this.responseService.conflict(
          res,
          'all this features is not in db',
          { platform: platform },
        );
      }
      filteredFeatures = [...new Set(filteredFeatures)];
      await this.prisma.platforms.createMany({
        data: filteredFeatures,
      });
      return this.responseService.success(res, 'platform added successfully', {
        userId: addUser.id,
      });
    }
  }
}
