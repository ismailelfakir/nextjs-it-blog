import { NextResponse } from 'next/server';

// Standard API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Helper function to create success responses
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      message
    } as ApiResponse<T>,
    { status }
  );
}

// Helper function to create error responses
export function createErrorResponse(
  error: string,
  message?: string,
  status: number = 500
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error,
      message
    } as ApiResponse,
    { status }
  );
}

// Helper function to validate required fields
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): string[] {
  const missingFields: string[] = [];
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      missingFields.push(field);
    }
  }
  
  return missingFields;
}

// Helper function to sanitize query parameters
export function sanitizeQueryParams(searchParams: URLSearchParams) {
  return {
    page: Math.max(1, parseInt(searchParams.get('page') || '1')),
    limit: Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10'))),
    tag: searchParams.get('tag')?.trim() || undefined,
    search: searchParams.get('search')?.trim() || undefined,
    sort: searchParams.get('sort') || 'createdAt',
    order: searchParams.get('order') === 'asc' ? 1 : -1
  };
}