export type AppExceptionExport = {
  code: string;
  message: string;
  params: Record<string, unknown>;
  cause?: AppExceptionExport;
};
