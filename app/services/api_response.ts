export default class ApiResponse {
  static success(message: string, data: any = null, code = 200) {
    return {
      status: 'success',
      code,
      message,
      data,
      meta: {
        timestamp: new Date().toISOString(),
      },
    }
  }

  static error(message: string, code = 500, errors: any = null) {
    return {
      status: 'error',
      code,
      message,
      errors,
      meta: {
        timestamp: new Date().toISOString(),
      },
    }
  }
}
