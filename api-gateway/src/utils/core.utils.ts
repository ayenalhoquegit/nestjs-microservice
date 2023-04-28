import { HttpException } from '@nestjs/common';

export default class CoreUtils {
  static throwRpcError(error: any) {
    throw new HttpException(
      {
        statusCode: error?.statusCode,
        message: error?.message,
      },
      error?.statusCode,
    );
  }
}
