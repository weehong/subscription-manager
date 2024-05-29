import { Cycle, PrismaClient } from "@prisma/client";

type RequestProp = {
  userId: string;
  name: string;
  currency: string;
  cycle: Cycle;
  price: number;
};

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const limit = 15;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const offset = parseInt(page || "0");

  const data = await prisma.subscription.findMany({
    skip: offset <= 1 ? 0 : offset * limit,
    take: limit,
  });

  return Response.json(data);
}

export async function POST(request: Request) {
  const body: RequestProp = await request.json();
  const data = await prisma.subscription.create({
    data: {
      userId: body.userId,
      name: body.name,
      currency: body.currency,
      cycle: Cycle.MONTHLY,
      price: body.price,
    },
  });

  return Response.json(data);
}
