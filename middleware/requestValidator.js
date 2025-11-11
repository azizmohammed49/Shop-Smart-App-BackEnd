import z from "zod";

export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    let errorsArr = [];
    if (error instanceof z.ZodError) {
      errorsArr = error.issues;
    }
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errorsArr?.map((e) => ({ path: e.path[0], message: e.message })),
    });
  }
};
