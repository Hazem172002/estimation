-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estimation` (
    `id` VARCHAR(191) NOT NULL,
    `hours` DOUBLE NOT NULL,
    `cost` DOUBLE NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Platforms` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `front` BOOLEAN NOT NULL DEFAULT false,
    `featureName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Foundations` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `platformId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LandingPage` (
    `id` VARCHAR(191) NOT NULL,
    `foundationId` VARCHAR(191) NOT NULL,
    `featureName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Settings` (
    `id` VARCHAR(191) NOT NULL,
    `foundationId` VARCHAR(191) NOT NULL,
    `featureName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Help` (
    `id` VARCHAR(191) NOT NULL,
    `foundationId` VARCHAR(191) NOT NULL,
    `featureName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auth` (
    `id` VARCHAR(191) NOT NULL,
    `foundationId` VARCHAR(191) NOT NULL,
    `featureName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Functionalities` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `platformId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LearningManagmentSystem` (
    `id` VARCHAR(191) NOT NULL,
    `featureName` VARCHAR(191) NOT NULL,
    `functionalityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LearningManagmentSystem_featureName_key`(`featureName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkPlace` (
    `id` VARCHAR(191) NOT NULL,
    `featureName` VARCHAR(191) NOT NULL,
    `functionalityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WorkPlace_featureName_key`(`featureName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ODCManagment` (
    `id` VARCHAR(191) NOT NULL,
    `featureName` VARCHAR(191) NOT NULL,
    `functionalityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ODCManagment_featureName_key`(`featureName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jopHub` (
    `id` VARCHAR(191) NOT NULL,
    `featureName` VARCHAR(191) NOT NULL,
    `functionalityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `jopHub_featureName_key`(`featureName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estimation` ADD CONSTRAINT `Estimation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Platforms` ADD CONSTRAINT `Platforms_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Foundations` ADD CONSTRAINT `Foundations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LandingPage` ADD CONSTRAINT `LandingPage_foundationId_fkey` FOREIGN KEY (`foundationId`) REFERENCES `Foundations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Settings` ADD CONSTRAINT `Settings_foundationId_fkey` FOREIGN KEY (`foundationId`) REFERENCES `Foundations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Help` ADD CONSTRAINT `Help_foundationId_fkey` FOREIGN KEY (`foundationId`) REFERENCES `Foundations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Auth` ADD CONSTRAINT `Auth_foundationId_fkey` FOREIGN KEY (`foundationId`) REFERENCES `Foundations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Functionalities` ADD CONSTRAINT `Functionalities_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningManagmentSystem` ADD CONSTRAINT `LearningManagmentSystem_functionalityId_fkey` FOREIGN KEY (`functionalityId`) REFERENCES `Functionalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkPlace` ADD CONSTRAINT `WorkPlace_functionalityId_fkey` FOREIGN KEY (`functionalityId`) REFERENCES `Functionalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ODCManagment` ADD CONSTRAINT `ODCManagment_functionalityId_fkey` FOREIGN KEY (`functionalityId`) REFERENCES `Functionalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jopHub` ADD CONSTRAINT `jopHub_functionalityId_fkey` FOREIGN KEY (`functionalityId`) REFERENCES `Functionalities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
