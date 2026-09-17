const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); //5min Expiry
  return { otp, otpExpiry };
};

export default generateOtp;
