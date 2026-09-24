import { NextRequest } from 'next/server';
import { orderController } from '@/server/controllers/order.controller';
import { withAuth } from '@/server/middlewares/withAuth';

export const GET = withAuth((req: NextRequest, { user, params }) =>
  orderController.getDetail(req, user, {
    params: Promise.resolve(params as { id: string }),
  })
);
