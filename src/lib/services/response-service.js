import { NextResponse } from "next/server";

export class ResponseService {
  static success(data = null, status = 200) {
    const response = { success: true };
    if (data !== null) {
      response.data = data;
    }
    return NextResponse.json(response, { status });
  }

  static error(message, status = 400) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status }
    );
  }

  static async handleAsync(operation) {
    try {
      const result = await operation();
      return this.success(result);
    } catch (error) {
      const status = this.getErrorStatus(error.message);
      return this.error(error.message, status);
    }
  }

  static async handleAsyncWithAuth(authService, operation, requireAuth = true) {
    try {
      if (requireAuth) {
        const decodedResult = authService.verifyToken();
        if (!decodedResult) {
          return this.error("This route is protected to admin.", 403);
        }
      }

      const result = await operation();
      return this.success(result);
    } catch (error) {
      const status = this.getErrorStatus(error.message);
      return this.error(error.message, status);
    }
  }

  static getErrorStatus(message) {
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
}
