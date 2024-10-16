-- CreateTable
CREATE TABLE "symbol" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(1) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "symbol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "symbol_price" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "symbol_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(1) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "symbol_price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "symbol_name_key" ON "symbol"("name");

-- AddForeignKey
ALTER TABLE "symbol_price" ADD CONSTRAINT "symbol_price_symbol_id_fkey" FOREIGN KEY ("symbol_id") REFERENCES "symbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
