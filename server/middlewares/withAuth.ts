import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { apiResponse } from '../utils/apiResponse';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  phone?: string | null;
}

export type AuthenticatedRouteHandler = (
  req: NextRequest,
  context: { user: AuthenticatedUser; params?: any }
) => Promise<Response>;

export function withAuth(handler: AuthenticatedRouteHandler) {
  return async (req: NextRequest, segmentData?: any) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return apiResponse.error('Authentication required', 401);
    }

    const user = session.user as AuthenticatedUser;
    const resolvedParams = segmentData?.params ? await segmentData.params : undefined;
    return handler(req, { user, params: resolvedParams });
  };
}

export function withRole(role: 'ADMIN', handler: AuthenticatedRouteHandler) {
  return async (req: NextRequest, segmentData?: any) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return apiResponse.error('Authentication required', 401);
    }

    const user = session.user as AuthenticatedUser;
    if (user.role !== role) {
      return apiResponse.error('Forbidden: insufficient permissions', 403);
    }

    const resolvedParams = segmentData?.params ? await segmentData.params : undefined;
    return handler(req, { user, params: resolvedParams });
  };
}
