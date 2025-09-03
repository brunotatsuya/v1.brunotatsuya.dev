import { NextResponse } from "next/server";

export function success(data = null, status = 200) {
  const response = { success: true };
  if (data !== null) {
    response.data = data;
  }
  return NextResponse.json(response, { status });
}

export function error(message, status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}

export async function handleAsync(operation) {
  try {
    const result = await operation();
    return success(result);
  } catch (error) {
    const status = getErrorStatus(error.message);
    return error(error.message, status);
  }
}

export async function handleAsyncWithAuth(
  verifyTokenFn,
  operation,
  requireAuth = true
) {
  try {
    if (requireAuth) {
      const decodedResult = verifyTokenFn();
      if (!decodedResult) {
        return error("This route is protected to admin.", 403);
      }
    }

    const result = await operation();
    return success(result);
  } catch (error) {
    const status = getErrorStatus(error.message);
    return error(error.message, status);
  }
}

export function getErrorStatus(message) {
  if (message.includes("not found")) {
    return 404;
  }
  if (message.includes("required") || message.includes("validation")) {
    return 400;
  }
  if (message.includes("unauthorized") || message.includes("protected")) {
    return 403;
  }
  return 400;
}
