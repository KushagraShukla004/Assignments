//fn is like a anonymous varable, by using it, we can reuse the [(req,res,next)=>{}] func in different parts of our code, making our life easier and our code more organized

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default asyncHandler;
