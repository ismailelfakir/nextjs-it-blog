import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from '@/lib/auth';

const handler = (req: NextRequest, context: { params: { nextauth: string[] } }) => 
  NextAuth(req, context, authOptions);

export { handler as GET, handler as POST };