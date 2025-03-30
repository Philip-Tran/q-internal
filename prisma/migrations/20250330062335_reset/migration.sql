-- CreateEnum
CREATE TYPE "WorkStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE', 'PAUSE');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT,
    "banned" BOOLEAN,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objective" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "progressOnTotalKeyResult" INTEGER NOT NULL,

    CONSTRAINT "objective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_result" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resultNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "objectiveId" TEXT NOT NULL,

    CONSTRAINT "key_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reflex" (
    "id" TEXT NOT NULL,
    "confidentRate" INTEGER NOT NULL,
    "whatCanBeImproved" TEXT NOT NULL,
    "whatToDoToImprove" TEXT NOT NULL,
    "noteToMyself" TEXT NOT NULL,
    "objectiveId" TEXT NOT NULL,

    CONSTRAINT "reflex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress_update" (
    "id" TEXT NOT NULL,
    "confidentRate" INTEGER NOT NULL,
    "objectiveId" TEXT NOT NULL,

    CONSTRAINT "progress_update_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_result_progress_update" (
    "id" TEXT NOT NULL,
    "updatedKeyResultNumber" INTEGER NOT NULL,
    "keyResultId" TEXT NOT NULL,

    CONSTRAINT "key_result_progress_update_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work" (
    "id" TEXT NOT NULL,
    "workName" TEXT NOT NULL,
    "status" "WorkStatus" NOT NULL,

    CONSTRAINT "work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_log" (
    "id" TEXT NOT NULL,
    "logContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workId" TEXT NOT NULL,

    CONSTRAINT "work_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_result" ADD CONSTRAINT "key_result_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflex" ADD CONSTRAINT "reflex_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_update" ADD CONSTRAINT "progress_update_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_result_progress_update" ADD CONSTRAINT "key_result_progress_update_keyResultId_fkey" FOREIGN KEY ("keyResultId") REFERENCES "key_result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_log" ADD CONSTRAINT "work_log_workId_fkey" FOREIGN KEY ("workId") REFERENCES "work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
