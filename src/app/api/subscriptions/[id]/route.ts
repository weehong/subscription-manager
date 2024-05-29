import { Cycle, PrismaClient } from "@prisma/client";

type RequestProp = {
  userId: string;
  name: string;
  currency: string;
  cycle: Cycle;
  price: number;
};

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body: RequestProp = await request.json();
  const data = await prisma.subscription.update({
    where: {
      id: parseInt(params.id),
      userId: body.userId,
    },
    data: {
      userId: body.userId,
      name: body.name,
      currency: body.currency,
      cycle: Cycle[body.cycle],
      price: body.price,
    },
  });

  return Response.json(data);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const data = await prisma.subscription.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return Response.json(data);
}
