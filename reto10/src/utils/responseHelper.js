export const successResponse = (res, data, mensaje = "Operación exitosa") => {
  res.status(200).json({
    success: true,
    mensaje,
    data,
  });
};

export const errorResponse = (res, error, code = 400) => {
  res.status(code).json({
    success: false,
    error,
  });
};
